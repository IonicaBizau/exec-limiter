# exec-limiter [![Support this project][donate-now]][paypal-donations]

Limit the shell execution commands to <x> calls same time.

## Installation

```sh
$ npm i exec-limiter
```

## Example

```js
// Dependencies
var ExecLimiter = require("exec-limiter");

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

// #4
el.add("ls", ["-l"], { ignoreStdout: false }, function (err, stdout) {
    console.log(err || "The spawned 'ls -l' returned:\n" + stdout);
});

// These will be executed like below:
//
// Timeline: 0-1-2-3-4-5-6-7-8-9-10-11
//
//       #1: ==========
//       #2: ==============
//       #3:            ============
//       #4:               ==
//
// Notice how they run in parallel, but not more than 2 in the same time.
```

## Documentation

### `ExecLimiter(limit)`
Creates a new instance of `ExecLimiter`.

#### Params
- **Number** `limit`: The limit of commands to run same time.

#### Return
- **ExecLimiter** The `ExecLimiter` instance.

### `add(command, args, options, callback)`
Adds a new command to run in the buffer.

Usage:

```js
el.add(command, fn); // exec
el.add(command, args, fn); // spawn
el.add(command, options, fn); // exec
el.add(command, args, options, fn); // spawn
```

#### Params
- **String** `command`: The command to run as string.
- **Object** `args`: The command arguments as array of strings (optional).
- **Object** `options`: The options passed to the spawn/exec function, but extended with the following fields:
 - `ignoreStdout` (Boolean): If `false`, then the stdout output will be stored ant called back.
- **Function** `callback`: The callback function.

#### Return
- **ExecLimiter** The `ExecLimiter` instance.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`engine-tools`](https://github.com/jillix/engine-tools) by jillix

 - [`gpm`](https://github.com/IonicaBizau/node-gpm)

 - [`gry`](https://github.com/IonicaBizau/node-gry)

 - [`npmreserve`](https://github.com/IonicaBizau/npmreserve)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md