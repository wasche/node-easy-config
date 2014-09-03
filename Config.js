'use strict';

var _ = require('underscore');
var fs = require('fs');
var fsOptions = {encoding: 'utf-8'};

var Config = function(path, defaults){
  this.data = _.extend({}, defaults);
  path && this.path(path);
};

Config.prototype.path = function(path){
  if (!path){
    return this.filename;
  }

  if ('user' === path.slice(0,4)){
    this.filename = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + path.slice(4);
  } else {
    this.filename = path;
  }

  return this;
};

Config.prototype.load = function(callback){
  if (typeof callback === 'function'){
    var self = this;
    fs.readFile(this.filename, fsOptions, function(err, data){
      if (err){ throw err; }
      callback(self.load(JSON.parse(data)));
    });
  } else if (typeof callback === 'string'){
    this.path(callback);
    this.load();
  } else if (typeof callback === 'object'){
    this.data = _.extend(this.data, callback);
  } else {
    var str = fs.readFileSync(this.filename, fsOptions);
    var json = JSON.parse(str);
    this.load(json);
  }
  return this;
};

Config.prototype.get = function(key){
  return this.data[key];
};

Config.prototype.set = function(key, value){
  this.data[key] = value;
  return this;
};

Config.prototype.rm = function(key){
  delete this.data[key];
  return this;
};

Config.prototype.save = function(path, callback){
  var str = JSON.stringify(this.data, null, 2);
  path && this.path(path);
  if (typeof callback === 'function'){
    var self = this;
    fs.writeFile(this.filename, str, fsOptions, function(err){
      if (err){ throw err; }
      callback(self);
    });
  } else {
    fs.writeFileSync(this.filename, str, fsOptions);
  }
  return this;
};

Config.prototype.json = function(){
  return _.clone(this.data);
};

Config.create = function(path, defaults){
  return new Config(path, defaults).load();
};

Config.read = function(path, defaults){
  return new Config(path, defaults).load().json();
};

module.exports = Config;