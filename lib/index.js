// Dependencies
var cp = require("child_process");
var LimitIt = require("limit-it");
var Typpy = require("typpy");

/**
 * ExecLimiter
 * Creates a new instance of `ExecLimiter`.
 *
 * @name ExecLimiter
 * @function
 * @param {Number} limit The limit of commands to run same time.
 * @return {ExecLimiter} The `ExecLimiter` instance.
 */
function ExecLimiter(limit) {
    if (Typpy(this) !== "execlimiter") {
        return new ExecLimiter(limit);
    }
    this.limitIt = new LimitIt(limit);
}

/**
 * add
 * Adds a new command to run in the buffer.
 *
 * @name add
 * @function
 * @param {String} command The command to run as string.
 * @param {Object} args    The command arguments as array of strings (optional).
 * @param {Object} options The options to pass to the exec/spawn function (optional).
 * @param {Function} callback The callback function.
 * @return {ExecLimiter} The `ExecLimiter` instance.
 */
ExecLimiter.prototype.add = function (command, args, options, callback) {

    var useExec = false;

    // check the optional parameters
    if (typeof args === "function") {
        callback = args;
        options = {};
        args = [];
        useExec = true;
    } else if (typeof options === "function") {
        callback = options;
        // we must have either the args or the options
        if (args instanceof Array) {
            options = {};
        } else {
            options = args;
            args = [];
            useExec = true;
        }
    }

    // prepare the arguments for the limit-it call
    var largs = [];

    if (useExec) {
        // watch for whitespaces in values
        for (var i in args) {
            command += " \"" + args[i] + "\"";
        }
        largs = [command, options];
    } else {
        largs = [command, args, options];
    }

    function spawner(command, args, options, callback) {
        var child = cp.spawn(command, args, options);
        var err;
        child.stderr.on("data", function (data) {
            err = err || "";
            err += data;
        });
        child.on("close", function (code) {
            var error = null;
            if (code) {
                var error = new Error(err);
                error.code = code;
            }
            callback(error);
        });
    }

    this.limitIt.add(useExec ? cp.exec : spawner, largs, callback);
    return this;
};

module.exports = ExecLimiter;
