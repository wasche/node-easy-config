

## Usage

### .load()

Loads the configuration from file.

### .get(key)

Returns a configuration value by `key`. Keys with dots are supported to access deep values.

### .set(key, value)

Sets a configuration value for `key`. Keys with dots are supported to access deep values.

### .rm(key)

Removes configuration named `key`. Keys with dots are supported to access deep values.

### .save(where, callback)

Saves changes to `where`. The `where` argument can be a path to a configuration file or:

- `user` to save it in the configuration file located in the home directory

### .json()

### #create(cwd)

```
var config = require('easy-config').create();
// You can also specify a working directory
var config2 = require('easy-config').create('./some/path');
```

### #read(cwd)

Alias for:

```
var configObj = (new Config(cwd)).load().json();
```

## License

Released under the [MIT License (MIT)](http://opensource.org/licenses/mit-license.php)
