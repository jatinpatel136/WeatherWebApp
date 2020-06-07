const express = require('express');
require('custom-env').env();
const app = express();
const logger = require('./middlewares/logger');

const bodyParser = require('body-parser');
var geocode = require('./utils/geocode');
var forecast = require('./utils/forecast');

app.use(express.static(__dirname + '/public'));
//app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(bodyParser.json());
app.use(logger.log);

// base route path that will handle request
app.get('/', (request, response) => {
    response.status(200).send(200, "<h2>Hello From Express</h2>");
});

app.get('/weather', (req, res) => {
    res.sendFile(__dirname + '/public/weather.html');
});

app.post('/weather', (req, res) => {
    if (req.body) {
        console.log(req.body);
        geocode.getLocation(req.body.location, function (error, location) {
            if (error)
                console.log(error);
            else {
                console.log("data from OpenWeatherMap api : " + JSON.stringify(location, undefined, 2));

                forecast.getForecast(location.response.body.coord.lat, location.response.body.coord.lon, function (error, response, forecast) {
                    if (error)
                        console.log(error);
                    else {
                        console.log("data from forecast api: " + JSON.stringify(forecast));
                        res.status(200).send({ 'message': 'POST weather API ' + 'timezone ' + forecast.timezone +' current weather' + JSON.stringify(forecast.current.weather) });
                    }
                });
            }
        });
    }
})

app.listen(3000, () => {
    console.log('Server started listening at port 3000');
});