const pool = require('../db')

const getAll = async (req, res) => {
    const result = await pool.query('SELECT * FROM trainers')
    res.render('trainers', { trainers: result.rows })
}

const create = async (req, res) => {
    const { full_name, specialization, bio, photo_url } = req.body
    await pool.query(
        'INSERT INTO trainers (full_name, specialization, bio, photo_url) VALUES ($1,$2,$3,$4)',
        [full_name, specialization, bio, photo_url]
    )
    res.redirect('/trainers')
}

module.exports = { getAll, create }