const pool = require('../db')

const getAll = async (req, res) => {
    const result = await pool.query(`
    SELECT p.*, s.type AS subscription_type, u.full_name AS user_name
    FROM payments p
    JOIN subscriptions s ON p.subscription_id = s.subscription_id
    JOIN users u ON s.user_id = u.user_id
  `)
    res.render('payments', { payments: result.rows })
}

const create = async (req, res) => {
    const { subscription_id, amount, status } = req.body
    await pool.query(
        'INSERT INTO payments (subscription_id, amount, status) VALUES ($1,$2,$3)',
        [subscription_id, amount, status]
    )
    res.redirect('/payments')
}

module.exports = { getAll, create }