'use strict';

var ctags = require('javascript-ctags');
var ctagsModule = require.cache[require.resolve('javascript-ctags')];
var generate = ctagsModule.require('./generate');
var Parser = ctagsModule.require('./parser');
var through = require('through2');
var File = require('vinyl');
var Progress = require('progress');

module.exports = function(file) {

  file = file || 'tags';
  var cache = {};
  var parser = new Parser();

  function transform(file, enc, cb) {
    cache[file.path] = parser.parse(file.contents.toString('utf-8'));
    cb(null);
  };

  function flush(cb) {
    var contents = generate(
        Object.keys(cache).map(function(path) {return {filename: path, entries: cache[path]};})
    ).join('\n');
    // clear cache (ensure that there are no tags for deleted files)
    cache = {};
    this.push(new File({
      path: file,
      contents: new Buffer(contents),
    }));
    cb();
  };

  return through.obj(transform, flush);
};
