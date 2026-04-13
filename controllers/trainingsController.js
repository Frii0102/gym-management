const pool = require('../db')

const getAll = async (req, res) => {
    const trainings = await pool.query(`
    SELECT t.*, tr.full_name AS trainer_name, l.name AS location_name
    FROM trainings t
    JOIN trainers tr ON t.trainer_id = tr.trainer_id
    JOIN locations l ON t.location_id = l.location_id
  `)
    const trainers = await pool.query('SELECT * FROM trainers')
    const locations = await pool.query('SELECT * FROM locations')

    res.render('trainings', {
        trainings: trainings.rows,
        trainers: trainers.rows,
        locations: locations.rows
    })
}

const create = async (req, res) => {
    const { created_by, trainer_id, location_id, title, start_time, duration_min, capacity } = req.body
    await pool.query(
        'INSERT INTO trainings (created_by, trainer_id, location_id, title, start_time, duration_min, capacity) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [created_by, trainer_id, location_id, title, start_time, duration_min, capacity]
    )
    res.redirect('/trainings')
}

module.exports = { getAll, create }