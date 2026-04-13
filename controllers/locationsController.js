const pool = require('../db')

const getAll = async (req, res) => {
    const result = await pool.query('SELECT * FROM locations')
    res.render('locations', { locations: result.rows })
}

const create = async (req, res) => {
    const { name, address, city } = req.body
    await pool.query(
        'INSERT INTO locations (name, address, city) VALUES ($1,$2,$3)',
        [name, address, city]
    )
    res.redirect('/locations')
}

module.exports = { getAll, create }