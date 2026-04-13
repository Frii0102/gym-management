const pool = require('../db')

const getAll = async (req, res) => {
    const result = await pool.query('SELECT * FROM users')
    res.render('users', { users: result.rows })
}

const create = async (req, res) => {
    const { full_name, email, password_hash, phone, role } = req.body
    await pool.query(
        'INSERT INTO users (full_name, email, password_hash, phone, role) VALUES ($1,$2,$3,$4,$5)',
        [full_name, email, password_hash, phone, role]
    )
    res.redirect('/users')
}

module.exports = { getAll, create }