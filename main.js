'use strict';

var Lazy = {

// generate is a function that makes a new LazyArray instance with the callback;
  generate: function(callback) {
    return new Lazy.LazyArray({generator: callback})
  },

  LazyArray: function(opts) {
    this.generator = opts.generator;
    this.queue = [];
  }
};


Lazy.LazyArray.prototype.take = function(n) {
  var self = this;
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(this.generator());
  }
  this.queue.forEach(function(opts) {
    arr = arr[opts.name](opts.fn)
  });
  this.queue = [];
  return arr;
};

Lazy.LazyArray.prototype.map = function(callback) {
  this.queue.push({name: 'map', fn: callback});
  return this;
};
