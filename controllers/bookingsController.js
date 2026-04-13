const pool = require('../db')

const getAll = async (req, res) => {
    const bookings = await pool.query(`
    SELECT b.*, u.full_name AS user_name, t.title AS training_title
    FROM bookings b
    JOIN users u ON b.user_id = u.user_id
    JOIN trainings t ON b.training_id = t.training_id
  `)
    const users = await pool.query('SELECT * FROM users')
    const trainings = await pool.query('SELECT * FROM trainings')

    res.render('bookings', {
        bookings: bookings.rows,
        users: users.rows,
        trainings: trainings.rows
    })
}

const create = async (req, res) => {
    const { user_id, training_id } = req.body
    await pool.query(
        'INSERT INTO bookings (user_id, training_id) VALUES ($1,$2)',
        [user_id, training_id]
    )
    res.redirect('/bookings')
}

module.exports = { getAll, create }