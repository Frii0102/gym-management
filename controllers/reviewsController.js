const pool = require('../db')

const getAll = async (req, res) => {
    try {
        const reviews = await pool.query(`
            SELECT r.*, u.full_name AS user_name, t.title AS training_title
            FROM reviews r
            JOIN users u ON r.user_id = u.user_id
            JOIN trainings t ON r.training_id = t.training_id
            ORDER BY r.review_id
        `)

        const trainings = await pool.query(`
            SELECT training_id, title
            FROM trainings
            ORDER BY training_id
        `)

        let users = { rows: [] }

        if (req.session.user && req.session.user.role === 'admin') {
            users = await pool.query(`
                SELECT user_id, full_name
                FROM users
                ORDER BY user_id
            `)
        }

        res.render('reviews', {
            reviews: reviews.rows,
            users: users.rows,
            trainings: trainings.rows,
            isAdminUser: req.session.user && req.session.user.role === 'admin'
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const create = async (req, res) => {
    try {
        const { training_id, rating, comment } = req.body

        let user_id

        if (req.session.user.role === 'admin') {
            user_id = req.body.user_id
        } else {
            user_id = req.session.user.user_id
        }

        await pool.query(
            'INSERT INTO reviews (user_id, training_id, rating, comment) VALUES ($1, $2, $3, $4)',
            [user_id, training_id, rating, comment]
        )

        res.redirect('/reviews')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getAll, create }