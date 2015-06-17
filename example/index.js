// Dependencies
var ExecLimiter = require("../lib");

// Constants
const COMMAND = "sleep 5; date;";

// Create an instance of exec limiter
var el = new ExecLimiter(10)
  , i = 0
  , c = 0
  ;

// Exec the command 30 times, but not more than 10 same time
for (; i < 30; ++i) {
    el.add(COMMAND, function (err, stdout) {
        console.log((++c) + "> " + stdout);
    });
}
