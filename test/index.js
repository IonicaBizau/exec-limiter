var ExecLimiter = require("../lib");
var assert = require("assert");

var el = new ExecLimiter(10);

describe("ExecLimiter", function() {

    describe("#add()", function() {

        describe("errors", function() {

            var command = "ls";

            it("spawn: " + command + " - should finish gracefully", function(done) {
                el.add(command, [], done);
            });

            it("exec: " + command + " - should finish gracefully", function(done) {
                el.add(command, done);
            });
        });

        describe("exec vs. spawn", function() {
            // all tests must finish in less than 4 seconds
            this.timeout(4000);

            var tts = 2;
            var command = "sleep";

            it("spawn: " + command + " " + tts + " - should wait at least " + tts + " seconds before it finishes", function(done) {
                var start = Date.now();
                el.add(command, [tts], function(err) {
                    var end = Date.now();
                    done(end - start < tts * 1000 ? "did not finish in more than " + tts + " seconds" : undefined);
                });
            });

            it("exec: " + command + " " + tts + " - should wait at least " + tts + " seconds before it finishes", function(done) {
                var start = Date.now();
                el.add(command + " " + tts, function(err) {
                    var end = Date.now();
                    done(end - start < tts * 1000 ? "did not finish in more than " + tts + " seconds" : undefined);
                });
            });
        });
    });
});

