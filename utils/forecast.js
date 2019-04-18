const request = require('request');
const geocode = require('./geocode');

function getForecast(latitude, longitude, callback) {
    const darkSkySecretKey = process.env.DARKSKYSECRETKEY;
    request({
        url: `https://api.darksky.net/forecast/${darkSkySecretKey}/${latitude},${longitude}`,
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