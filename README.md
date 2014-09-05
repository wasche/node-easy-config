## Installation

```
npm install easy-config-json
```

## Usage

Anywhere a `path` is given, it may start with `~`, in which case the remaining
portion is assumed to be relative to the user's home directory.

### ctor([path], [defaults])

Creates a new Config object.

If `path` is given, sets the path so it doesn't need to be given to `#load` or `#save`.
If `defaults` is given, copies the values.

### .path([path])

If `path` is given, sets the path and returns itself. Otherwise, returns the path.

### .load([function|string|object])

Loads the configuration from file.

- If passed a function, loads asyncronously, then calls the function, passing itself.
- If passed a string, loads from the specified file. Returns itself for chaining.
- If passed an object, merges it with existing config. Returns itself for chaining.

### .save([path], [callback])

Persists changes to disk. If `path` is given, updates the path and saves to the
specified file. If callback is given, saves asyncronously, then calls the callback,
passing itself.

### .get(key)

Returns a configuration value by `key`. Keys with dots are supported to access deep values.

### .set(key, value)

Sets a configuration value for `key`. Keys with dots are supported to access deep values.
Returns itself for chaining.

### .rm(key)

Removes configuration named `key`. Keys with dots are supported to access deep values.
Returns itself for chaining.

### .json()

Returns a plain object containing a copy of the configuration.

### #create(cwd)

Shortcut for creating and loading a Config object. Takes the same arguments as when
constructing a Config object.

### #read(cwd)

Shortcut for creating, loading, and calling `#json()`.

## License

Released under the [MIT License (MIT)](http://opensource.org/licenses/mit-license.php)
