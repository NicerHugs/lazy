'use strict';

var Lazy = {

// generate is a function that makes a new LazyArray instance with the callback;
  generate: function(callback) {
    return new Lazy.LazyArray({generator: callback})
  },

  LazyArray: function(opts) {
    this.generator = opts.generator;
  }
};


Lazy.LazyArray.prototype.take = function(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(this.generator());
  }
  return arr;
};
