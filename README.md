

## Usage

### .load()

Loads the configuration from file.

### .get(key)

Returns a configuration value by ``key``. Keys with dots are supported to access deep values.

### .set(key, value)

Sets a configuration value for ``key``. Keys with dots are supported to access deep values.

### .rm(key)

Removes configuration named ``key``. Keys with dots are supported to access deep values.

### .save(where, callback)

Saves changes to ``where``. The ``where`` argument can be a path to a configuration file or:

- ``local`` to save it in the configured current working directory (defaulting to ``process.cwd``)
- ``user`` to save it in the configuration file located in the home directory

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

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
