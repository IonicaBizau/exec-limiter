# Exec Limiter
Limit the shell execution commands to **<x>** calls same time.

## Installation
Run the following commands to download and install the application:

```sh
$ npm install -g exec-limiter
```

## Example

```js
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
```

## Documentation
### `ExecLimiter(limit)`
Creates a new instance of `ExecLimiter`.

#### Params
- **Number** `limit`: The limit of commands to run same time.

#### Return
- **ExecLimiter** The `ExecLimiter` instance.

### `add(command, options, callback)`
Adds a new command to run in the buffer.

#### Params
- **String** `command`: The command to run.
- **Object** `options`: The options to pass to the exec function.
- **Function** `callback`: The callback function.

#### Return
- **ExecLimiter** The `ExecLimiter` instance.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
