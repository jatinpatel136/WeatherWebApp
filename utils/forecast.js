const request = require('request');
const geocode = require('./geocode');

function getForecast(latitude, longitude, callback) {
    const GoogleKey = process.env.GoogleKey;
    // check documentation of https://openweathermap.org/api/one-call-api to get all essential weather data for some specific location
    request({ 
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${GoogleKey}`,
        json: true,
        rejectUnauthorized: false
    }, (error, response, body) => {
        if (error)
            callback("Unable to reach forecast api server");
        else {
            callback(null, response, body);
        }
    });
}

module.exports = {
    getForecast
};