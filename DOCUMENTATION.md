## Documentation

You can see below the API reference of this module.

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

