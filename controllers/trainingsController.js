const pool = require('../db')

const getAll = async (req, res) => {
    try {
        const trainings = await pool.query(`
            SELECT t.*, tr.full_name AS trainer_name, l.name AS location_name
            FROM trainings t
            JOIN trainers tr ON t.trainer_id = tr.trainer_id
            JOIN locations l ON t.location_id = l.location_id
            ORDER BY t.start_time
        `)

        const trainers = await pool.query(`
            SELECT trainer_id, full_name
            FROM trainers
            ORDER BY trainer_id
        `)

        const locations = await pool.query(`
            SELECT location_id, name
            FROM locations
            ORDER BY location_id
        `)

        res.render('trainings', {
            trainings: trainings.rows,
            trainers: trainers.rows,
            locations: locations.rows
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const create = async (req, res) => {
    try {
        const { trainer_id, location_id, title, start_time, duration_min, capacity } = req.body
        const created_by = req.session.user.user_id

        await pool.query(
            `INSERT INTO trainings (created_by, trainer_id, location_id, title, start_time, duration_min, capacity)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [created_by, trainer_id, location_id, title, start_time, duration_min, capacity]
        )

        res.redirect('/trainings')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getAll, create }