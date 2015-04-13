/// <reference path="immutable-map-rool.ts" />

import Immutable = require('immutable');

class IMtype {
  constructor () {
    this.cons = Immutable.Map;
  }
  add (obj, data:Array<object>) {
    return obj.withMutations(function (map) {
      var i;
      for (i = 0; i < data.length; i++) { map.set(data[i]._id, data[i]); }
    });
  }
}
