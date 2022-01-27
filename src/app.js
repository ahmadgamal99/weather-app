const path      = require('path');
const express   = require('express');
const geocode   = require('./utils/geocode');
const forecast  = require('./utils/forecast');
const app       = express();
const pubDir    = path.join(__dirname , '../public' );
const viewsPath = path.join(__dirname , '../views');
const port      = process.env.PORT || 3000;

app.use( express.static( pubDir ) );

app.set('view engine','ejs')

app.set('views',viewsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if ( ! req.query.address )
    {
        return res.send({
            error:"You have to provide the address !"
        })
    }

    let encodedAddress = encodeURIComponent( req.query.address );
    geocode(encodedAddress, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            return  res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})