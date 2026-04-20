const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const multer = require('multer')
require('dotenv').config()

const usersController = require('./controllers/usersController')
const trainersController = require('./controllers/trainersController')
const trainingsController = require('./controllers/trainingsController')
const bookingsController = require('./controllers/bookingsController')
const locationsController = require('./controllers/locationsController')
const subscriptionsController = require('./controllers/subscriptionsController')
const paymentsController = require('./controllers/paymentsController')
const reviewsController = require('./controllers/reviewsController')
const authController = require('./controllers/authController')

const { isAuthenticated, isAdmin } = require('./middleware/authMiddleware')

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            if (!date) return ''
            return new Date(date).toLocaleString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        },
        isAdmin: (user) => {
            return user && user.role === 'admin'
        }
    }
}))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'gym-secret-key',
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user || null
    next()
})

app.get('/login', authController.showLogin)
app.post('/login', authController.login)
app.get('/logout', authController.logout)

app.get('/', isAuthenticated, (req, res) => res.render('index'))

app.get('/users', isAuthenticated, isAdmin, usersController.getAll)
app.post('/users', isAuthenticated, isAdmin, usersController.create)

app.get('/trainers', isAuthenticated, trainersController.getAll)
app.post('/trainers', isAuthenticated, isAdmin, trainersController.create)

app.get('/locations', isAuthenticated, locationsController.getAll)
app.post('/locations', isAuthenticated, isAdmin, locationsController.create)

app.get('/trainings', isAuthenticated, trainingsController.getAll)
app.post('/trainings', isAuthenticated, isAdmin, trainingsController.create)

app.get('/bookings', isAuthenticated, isAdmin, bookingsController.getAll)
app.post('/bookings', isAuthenticated, isAdmin, bookingsController.create)

app.get('/subscriptions', isAuthenticated, isAdmin, subscriptionsController.getAll)
app.post('/subscriptions', isAuthenticated, isAdmin, subscriptionsController.create)
app.get('/subscriptions/chart', isAuthenticated, isAdmin, subscriptionsController.chartByType)
app.get('/subscriptions/export', isAuthenticated, isAdmin, subscriptionsController.exportExcel)
app.post('/subscriptions/import', isAuthenticated, isAdmin, upload.single('excelFile'), subscriptionsController.importExcel)

app.get('/payments', isAuthenticated, isAdmin, paymentsController.getAll)
app.post('/payments', isAuthenticated, isAdmin, paymentsController.create)

app.get('/reviews', isAuthenticated, reviewsController.getAll)
app.post('/reviews', isAuthenticated, reviewsController.create)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})