
declare var Immutable: any;

/**
 * @class ImmutableListType
 * @description Leaf node data type tool for FB's Immutable.Map
 * @param {identity} [identity] function to get data id
 * @template T
 * @inner
 */
class ImmutableListType {
  cons: any;
  identity: (any) => string;
  constructor (identity?: (any) => string) {
    if (!Immutable) { throw('No Immutable Available.'); }
    this.cons = Immutable.List; 
    this.identity = identity || function (obj) { return obj.id; };
  }
  /**
   * @method add
   * @description Add data to the object
   * @param {Immutable.List} obj The data store immutable list
   * @param {T} data Data to store to the object
   * @return {Immutable.List} Return new object if any change, original object if no change
   * @memberof ImmutableListType
   */
  add (obj, data: any[]) {
    if (!data) { return obj; }
    if (!Array.isArray(data)) { data = [data]; }

    var self = this;

    return obj.withMutations(function (list) {
      var i, id;
      for (i = 0; i < data.length; i++) {
        list = list.push(data[i]);
      }
      return list;
    });
  }
  /**
   * @method remove
   * @description Remove data from the list
   * @param {Immutable.List} obj The data store immutable list
   * @param {T} data Data to remove from the object
   * @return {Immutable.List} Return new object if any change, original object if no change
   * @memberof ImmutableListType
   */
  remove (obj, data: Array<any>) {
    if (!data) { return obj; }
    if (!Array.isArray(data)) { data = [data]; }

    var self = this;

    return obj.withMutations(function (list) {
      var i, id;
      for (i = 0; i < data.length; i++) {
        id = self.identity(data[i]);
        list = list.filter(function (v) {
          return self.identity(v) !== id;
        });
      }
      return list;
    });
  }
  /**
   * @method map
   * @description Map f function on all data, behaves like immutable.
   * @param {mapfunc} f Mapping function
   * @return {mapperfunc} Function iterator over immutable map
   * @memberof ImmutableListType
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

