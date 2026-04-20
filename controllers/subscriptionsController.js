const pool = require('../db')
const XLSX = require('xlsx')

const getAll = async (req, res) => {
    const result = await pool.query(`
        SELECT s.*, u.full_name AS user_name
        FROM subscriptions s
        JOIN users u ON s.user_id = u.user_id
        ORDER BY s.subscription_id
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

const exportExcel = async (req, res) => {
    const result = await pool.query(`
        SELECT subscription_id, user_id, type, start_date, end_date
        FROM subscriptions
        ORDER BY subscription_id
    `)

    const data = result.rows.map(item => ({
        subscription_id: item.subscription_id,
        user_id: item.user_id,
        type: item.type,
        start_date: item.start_date,
        end_date: item.end_date
    }))

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscriptions')

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    res.setHeader(
        'Content-Disposition',
        'attachment; filename="subscriptions.xlsx"'
    )
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    res.send(buffer)
}

const importExcel = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Файл не завантажено')
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet)

    for (const row of data) {
        await pool.query(
            `INSERT INTO subscriptions (user_id, type, start_date, end_date)
             VALUES ($1, $2, $3, $4)`,
            [row.user_id, row.type, row.start_date, row.end_date]
        )
    }

    res.redirect('/subscriptions')
}

module.exports = { getAll, create, chartByType, exportExcel, importExcel }