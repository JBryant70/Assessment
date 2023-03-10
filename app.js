// init project
const app = require('./server');

// Listen on port 8080
var listener = app.listen(8080, function () {
    console.log("Listening on port " + listener.address().port);
});