const pool = require('../db')

const getAll = async (req, res) => {
    const result = await pool.query(`
        SELECT s.*, u.full_name AS user_name
        FROM subscriptions s
        JOIN users u ON s.user_id = u.user_id
    `)

    res.render('subscriptions', { subscriptions: result.rows })
}

const create = async (req, res) => {
    const { user_id, type, start_date, end_date } = req.body

    await pool.query(
        'INSERT INTO subscriptions (user_id, type, start_date, end_date) VALUES ($1, $2, $3, $4)',
        [user_id, type, start_date, end_date]
    )

    res.redirect('/subscriptions')
}

const chartByType = async (req, res) => {
    const result = await pool.query(`
        SELECT type, COUNT(*)::int AS count
        FROM subscriptions
        GROUP BY type
        ORDER BY type
    `)

    res.render('subscriptions-chart', {
        chartData: JSON.stringify(result.rows)
    })
}

module.exports = { getAll, create, chartByType }