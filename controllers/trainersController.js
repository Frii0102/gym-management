const pool = require('../db')

const getAll = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT trainer_id, full_name, specialization, bio, photo_url
            FROM trainers
            ORDER BY trainer_id
        `)

        res.render('trainers', { trainers: result.rows })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const create = async (req, res) => {
    try {
        const { full_name, specialization, bio, photo_url } = req.body

        await pool.query(
            `INSERT INTO trainers (full_name, specialization, bio, photo_url)
             VALUES ($1, $2, $3, $4)`,
            [full_name, specialization, bio, photo_url]
        )

        res.redirect('/trainers')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getAll, create }