const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Dharmil Shah',
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Dharmil Shah'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Hello',
        name: 'Dharmil Shah'
    })
})

app.get('/weather', (req,res) => {
    console.log(req.query.search+'here3')
    if (!req.query.place) {
        return res.send({
            error: 'You must provide search parameter.'
        })
    }

    geoCode(req.query.place,(error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(longitude,latitude,location+'here')
        forecast(latitude,longitude,(error,data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            console.log(data+'here2')
            forecast_str = data.summary+' It is currently '+data.temperature+' degrees out. There is a ' + data.precipProbability + '% chance of rain.' 
            console.log(forecast_str)
            res.send({
                forecast: forecast_str,
                //forecast: data.temperature,
                location
            })
        })
    })
})

app.get('/products',(req,res) => {
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Dharmil Shah',
        errorMsg: 'Help article not found.'
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        errorMsg: 'Page not found.',
        name: 'Dharmil Shah',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log("Server is up on 3000")
})