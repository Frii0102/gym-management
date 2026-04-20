const pool = require('../db')

const showLogin = (req, res) => {
    res.render('login', { error: null })
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        const user = result.rows[0]

        if (!user || user.password_hash !== password) {
            return res.render('login', {
                error: 'Невірний email або пароль'
            })
        }

        req.session.user = {
            user_id: user.user_id,
            full_name: user.full_name,
            role: user.role
        }

        res.redirect('/')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}

module.exports = { showLogin, login, logout }