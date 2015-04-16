
declare var Immutable: any;

/**
 * @class ImmutableMapType
 * @description Leaf node data type tool for FB's Immutable.Map
 * @param {identity} [identity] function to get data id
 * @template T
 * @inner
 */
class ImmutableMapType {
  cons: any;
  identity: (any) => string;
  constructor (identity?: (any) => string) {
    if (!Immutable) { throw('No Immutable Available.'); }
    this.cons = Immutable.Map; 
    this.identity = identity || function (obj) { return obj.id; };
  }
  /**
   * @method add
   * @description Add data to the object
   * @param {Immutable.Map} obj The data store immutable map
   * @param {T} data Data to store to the object
   * @return {Immutable.Map} Return new object if any change, original object if no change
   * @memberof ImmutableMapType
   */
  add (obj, data: any[]) {
    if (!data) { return obj; }
    if (!Array.isArray(data)) { data = [data]; }

    var self = this;

    return obj.withMutations(function (map) {
      var i, id;
      for (i = 0; i < data.length; i++) {
        id = self.identity(data[i]);
        if (!map.has(id)) {
          map = map.set(id, data[i]);
        }
      }
      return map;
    });
  }
  /**
   * @method remove
   * @description Remove data from the object
   * @param {Immutable.Map} obj The data store immutable map
   * @param {T} data Data to remove from the object
   * @return {Immutable.Map} Return new object if any change, original object if no change
   * @memberof ImmutableMapType
   */
  remove (obj, data: Array<any>) {
    if (!data) { return obj; }
    if (!Array.isArray(data)) { data = [data]; }

    var self = this;

    return obj.withMutations(function (map) {
      var i, id;
      for (i = 0; i < data.length; i++) {
        id = self.identity(data[i]);
        map = map.remove(id, data[i]);
      }
      return map;
    });
  }
  /**
   * @method map
   * @description Map f function on all data, behaves like immutable.
   * @param {mapfunc} f Mapping function
   * @return {mapperfunc} Function iterator over immutable map
   * @memberof ImmutableMapType
   */
  map (f: (any) => any): (Object) => Object {
    return function (obj) {
      return obj.withMutations(function (map) {
        obj.forEach(function (v, k) {
          var newv = f(v);
          if (newv && newv !== v) {
            map = map.set(k, newv);
          }
        });
        return map;
      });
    }
  }
};

