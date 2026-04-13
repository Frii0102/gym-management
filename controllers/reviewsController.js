const pool = require('../db')

const getAll = async (req, res) => {
    const result = await pool.query(`
    SELECT r.*, u.full_name AS user_name, t.title AS training_title
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    JOIN trainings t ON r.training_id = t.training_id
  `)
    res.render('reviews', { reviews: result.rows })
}

const create = async (req, res) => {
    const { user_id, training_id, rating, comment } = req.body
    await pool.query(
        'INSERT INTO reviews (user_id, training_id, rating, comment) VALUES ($1,$2,$3,$4)',
        [user_id, training_id, rating, comment]
    )
    res.redirect('/reviews')
}

module.exports = { getAll, create }