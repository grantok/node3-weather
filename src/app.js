const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// paths
const pubDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// handlebars
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)

// static websvr
app.use(express.static(pubDir))

//paths
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'grant'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Grant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is a test message',
        name: 'Grant'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                dataString: forecastData.dataString,
                icons: forecastData.icons,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide search'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Help article not found',
        name: 'Grant'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        url: req.originalUrl,
        name: 'Grant'
    })
})


app.listen(port, () => {
    console.log(`Started on ${port}`)
})