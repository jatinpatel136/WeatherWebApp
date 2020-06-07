const request = require("request");

function getLocation(address, callback) {
    const googleKey = process.env.GoogleKey;
    console.log(googleKey);
    request({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + address + "&appid=" + googleKey,
        json: true,
        rejectUnauthorized: false
    }, (error, response, body) => {
        if (error)
            callback("Unable to reach google server");
        else {
            callback(null, {
                response
            });
        }

    });
}

module.exports = {
    getLocation
}