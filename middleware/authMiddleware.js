const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Доступ заборонено')
    }

    next()
}

module.exports = { isAuthenticated, isAdmin }