const pool = require('../db')

const getAll = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT location_id, name, address, city
            FROM locations
            ORDER BY location_id
        `)

        res.render('locations', { locations: result.rows })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const create = async (req, res) => {
    try {
        const { name, address, city } = req.body

        await pool.query(
            `INSERT INTO locations (name, address, city)
             VALUES ($1, $2, $3)`,
            [name, address, city]
        )

        res.redirect('/locations')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getAll, create }