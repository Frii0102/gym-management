const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
require('dotenv').config()

const usersController = require('./controllers/usersController')
const trainersController = require('./controllers/trainersController')
const trainingsController = require('./controllers/trainingsController')
const bookingsController = require('./controllers/bookingsController')
const locationsController = require('./controllers/locationsController')
const subscriptionsController = require('./controllers/subscriptionsController')
const paymentsController = require('./controllers/paymentsController')
const reviewsController = require('./controllers/reviewsController')

const app = express()

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
        }
    }
}))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.render('index'))

app.get('/users', usersController.getAll)
app.post('/users', usersController.create)

app.get('/trainers', trainersController.getAll)
app.post('/trainers', trainersController.create)

app.get('/trainings', trainingsController.getAll)
app.post('/trainings', trainingsController.create)

app.get('/bookings', bookingsController.getAll)
app.post('/bookings', bookingsController.create)

app.get('/locations', locationsController.getAll)
app.post('/locations', locationsController.create)

app.get('/subscriptions', subscriptionsController.getAll)
app.post('/subscriptions', subscriptionsController.create)

app.get('/payments', paymentsController.getAll)
app.post('/payments', paymentsController.create)

app.get('/reviews', reviewsController.getAll)
app.post('/reviews', reviewsController.create)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})