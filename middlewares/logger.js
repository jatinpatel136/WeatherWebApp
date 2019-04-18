//duration between request and response

var log = (req, res, next) => {
    var start = Date.now();
    res.on('finish', () => {
        console.log("server took " + (Date.now() - start) + 'ms to serve the request');
    })
    next();
}

module.exports = { log };