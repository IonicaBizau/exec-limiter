// Dependencies
var Exec = require("child_process").exec
  , LimitIt = require("limit-it")
  ;

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
    if (this.constructor !== ExecLimiter) {
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
 * @param {String} command The command to run.
 * @param {Object} options The options to pass to the exec function.
 * @param {Function} callback The callback function.
 * @return {ExecLimiter} The `ExecLimiter` instance.
 */
ExecLimiter.prototype.add = function (command, options, callback) {

    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    this.limitIt.add(Exec, [command, options], callback);
    return this;
};

module.exports = ExecLimiter;
