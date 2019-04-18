const request = require("request");

function getLocation(address, callback) {
    const googleKey = process.env.GoogleKey;
    request({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + googleKey,
        json: true,
        rejectUnauthorized: false
    }, (error, response, body) => {
        if (error)
            callback("Unable to reach google server");
        else {
            callback(null, {
                latitude: body.results[0].geometry.location.lat,
                long: body.results[0].geometry.location.lng,
                address: body.results[0].formatted_address
            });
        }

    });
}

module.exports = {
    getLocation
}