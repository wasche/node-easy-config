var Config = require('../Config');
var assert = require('assert');
var tmp = require('tmp');
var fs = require('fs');

process.chdir(__dirname);

/* global describe, it */
describe('Config', function(){

  describe('#ctor()', function(){

    it('should respect defaults', function(){
      var cfg = new Config(null, {a: 1});
      assert.equal(1, cfg.data.a);
    });

    it('should set the path', function(){
      var cfg = new Config('./foo.ini');
      assert.equal('./foo.ini', cfg.filename);
    });

  });

  describe('#path()', function(){

    it('should return the path when no args', function(){
      var cfg = new Config('path');
      assert.equal('path', cfg.path());
    });

    it('should set the path when arg is present', function(){
      var cfg = new Config('old/path');
      cfg.path('new/path');
      assert.equal('new/path', cfg.filename);
    });

  });

  describe('#get()', function(){

    it('should return the associated value', function(){
      var cfg = new Config(null, {a: 1, b: 2});
      assert.equal(1, cfg.get('a'));
    });

  });
  
  describe('#set()', function(){

    it('should update the associated value', function(){
      var cfg = new Config(null, {a: 1, b: 2});
      cfg.set('a', 3);
      assert.equal(3, cfg.data.a);
    });

  });
  
  describe('#rm()', function(){

    it('should remove the given key', function(){
      var cfg = new Config(null, {a: 1, b: 2});
      cfg.rm('a');
      assert.ok(!cfg.data.a);
    });

  });
  
  describe('#json()', function(){

    it('should return a plain object', function(){
      var cfg = new Config(null, {a: 1, b: 2});
      assert.deepEqual({a: 1, b: 2}, cfg.json());
    });

    it('should return a copy', function(){
      var cfg = new Config(null, {a: 1, b: 2});
      cfg.json().a = 3;
      assert.equal(1, cfg.data.a);
    });

  });
  
  describe('#load()', function(){

    it('should load from relative paths', function(){
      var cfg = new Config('./data/sample.json');
      assert.doesNotThrow(function(){ cfg.load(); });
      assert.equal(1, cfg.data.a);
    });

    it('should load from absolute paths', function(){
      var cfg = new Config(__dirname + '/data/sample.json');
      assert.doesNotThrow(function(){ cfg.load(); });
      assert.equal(1, cfg.data.a);
    });

    it('should load from direct objects', function(){
      var cfg = new Config();
      cfg.load({a: 1, b: 2});
      assert.equal(1, cfg.data.a);
    });

    it('should load from other files', function(){
      var cfg = new Config();
      assert.doesNotThrow(function(){ cfg.load('./data/sample.json'); });
      assert.equal(1, cfg.data.a);
    });

    it('should set path when loading from direct file', function(){
      var cfg = new Config();
      assert.doesNotThrow(function(){ cfg.load('./data/sample.json'); });
      assert.equal('./data/sample.json', cfg.filename);
    });

    it('should load asyncronously when given a callback', function(done){
      var cfg = new Config('./data/sample.json');
      cfg.load(function(c){
        assert.equal(1, c.data.a);
        done();
      });
    });

  });
  
  describe('#save()', function(){

    it('should write pretty files', function(done){
      var cfg = new Config(null, {a: 1, b:2 });
      tmp.tmpName(function(err, path){
        assert.doesNotThrow(function(){ cfg.save(path); });
        assert.equal("{\n  \"a\": 1,\n  \"b\": 2\n}", fs.readFileSync(path, 'utf-8'));
        done();
      });
    });

    it('should set the path', function(done){
      var cfg = new Config(null, {a: 1, b:2 });
      tmp.tmpName(function(err, path){
        assert.doesNotThrow(function(){ cfg.save(path); });
        assert.equal(path, cfg.filename);
        done();
      });
    });

    it('should write asyncronously when given a callback', function(done){
      tmp.tmpName(function(err, path){
        var cfg = new Config(path, {a: 1, b:2 });
        assert.doesNotThrow(function(){
          cfg.save(null, function(c){
            done();
          });
        });
      });
    });

  });
  
  describe('.create()', function(){

    it('should automatically load', function(){
      var cfg = Config.create('./data/sample.json');
      assert.equal(1, cfg.data.a);
    });

  });
  
  describe('.read()', function(){});

});