const express = require('express')
const pool = require('./db')
require('dotenv').config()

const app = express()
app.use(express.json())

// Users
app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
})

app.post('/users', async (req, res) => {
    const { full_name, email, password_hash, phone, role } = req.body
    const result = await pool.query(
        'INSERT INTO users (full_name, email, password_hash, phone, role) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [full_name, email, password_hash, phone, role]
    )
    res.json(result.rows[0])
})

// Trainers
app.get('/trainers', async (req, res) => {
    const result = await pool.query('SELECT * FROM trainers')
    res.json(result.rows)
})

app.post('/trainers', async (req, res) => {
    const { full_name, specialization, bio, photo_url } = req.body
    const result = await pool.query(
        'INSERT INTO trainers (full_name, specialization, bio, photo_url) VALUES ($1,$2,$3,$4) RETURNING *',
        [full_name, specialization, bio, photo_url]
    )
    res.json(result.rows[0])
})

// Locations
app.get('/locations', async (req, res) => {
    const result = await pool.query('SELECT * FROM locations')
    res.json(result.rows)
})

app.post('/locations', async (req, res) => {
    const { name, address, city } = req.body
    const result = await pool.query(
        'INSERT INTO locations (name, address, city) VALUES ($1,$2,$3) RETURNING *',
        [name, address, city]
    )
    res.json(result.rows[0])
})

// Trainings
app.get('/trainings', async (req, res) => {
    const result = await pool.query('SELECT * FROM trainings')
    res.json(result.rows)
})

app.post('/trainings', async (req, res) => {
    const { created_by, trainer_id, location_id, title, start_time, duration_min, capacity } = req.body
    const result = await pool.query(
        'INSERT INTO trainings (created_by, trainer_id, location_id, title, start_time, duration_min, capacity) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [created_by, trainer_id, location_id, title, start_time, duration_min, capacity]
    )
    res.json(result.rows[0])
})

// Bookings
app.get('/bookings', async (req, res) => {
    const result = await pool.query('SELECT * FROM bookings')
    res.json(result.rows)
})

app.post('/bookings', async (req, res) => {
    const { user_id, training_id } = req.body
    const result = await pool.query(
        'INSERT INTO bookings (user_id, training_id) VALUES ($1,$2) RETURNING *',
        [user_id, training_id]
    )
    res.json(result.rows[0])
})

// Subscriptions
app.get('/subscriptions', async (req, res) => {
    const result = await pool.query('SELECT * FROM subscriptions')
    res.json(result.rows)
})

app.post('/subscriptions', async (req, res) => {
    const { user_id, type, start_date, end_date } = req.body
    const result = await pool.query(
        'INSERT INTO subscriptions (user_id, type, start_date, end_date) VALUES ($1,$2,$3,$4) RETURNING *',
        [user_id, type, start_date, end_date]
    )
    res.json(result.rows[0])
})

// Payments
app.get('/payments', async (req, res) => {
    const result = await pool.query('SELECT * FROM payments')
    res.json(result.rows)
})

app.post('/payments', async (req, res) => {
    const { subscription_id, amount, status } = req.body
    const result = await pool.query(
        'INSERT INTO payments (subscription_id, amount, status) VALUES ($1,$2,$3) RETURNING *',
        [subscription_id, amount, status]
    )
    res.json(result.rows[0])
})

// Reviews
app.get('/reviews', async (req, res) => {
    const result = await pool.query('SELECT * FROM reviews')
    res.json(result.rows)
})

app.post('/reviews', async (req, res) => {
    const { user_id, training_id, rating, comment } = req.body
    const result = await pool.query(
        'INSERT INTO reviews (user_id, training_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING *',
        [user_id, training_id, rating, comment]
    )
    res.json(result.rows[0])
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
