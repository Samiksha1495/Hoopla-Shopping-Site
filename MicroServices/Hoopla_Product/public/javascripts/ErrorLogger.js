var fs = require('fs');

var logger = function (err, req, res, next) {
    if (err) {
        fs.appendFile('ErrorLogger.txt', err.stack + "\n", function (err) {
            if (err) {
                console.log("Could not log the errors");
            }
        });
        res.status(500);
        res.json({ "message": err.message })
    }
    next();
}

module.exports = logger;