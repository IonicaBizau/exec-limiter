// Dependencies
var ExecLimiter = require("../lib");

// Constants
const COMMAND = "sleep 5; date;";

// Create an instance of exec limiter
var el = new ExecLimiter(2);

// #1
el.add("sleep 5", function (err) {
    console.log(err || "Waited 5 seconds for the first time.");
});

// #2
el.add("sleep", ["7"], function (err) {
    console.log(err || "Waited another 7 seconds but probably I was ran in parallel with the other process.");
});

// #3
el.add("sleep 5", function (err) {
    console.log(err || "I was ran in parallel with the second process and finished fine.");
});

// These will be executed like below:
//
// Timeline: 0-1-2-3-4-5-6-7-8-9-10
//       #1: ==========
//       #2: ==============
//       #3:            ============
//
// Notice how they run in parallel, but not more than 2 in the same time.
