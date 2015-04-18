/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-object-type.ts" />
/// <reference path="immutable-array-type.ts" />
/// <reference path="immutable-map-type.ts" />
/// <reference path="immutable-list-type.ts" />

/**
 * A string only contains `0`, `1`, `2`, `3`
 * @typedef {string} route
 */

/**
 * @callback reducefunc
 * @description Reducing function
 * @param {S} prev Previous value
 * @param {T} curr Current value, the data received
 * @return {S} Returned reduced value
 * @template T, S
 */


/**
 * @class ImmutableQuadTree
 * @description Basic Immutable Quad Tree class
 * @param {number} levels Quad tree levels
 * @param options Options
 * @param options.datatype Leaf node data tool
 * @param options.identity Function to get id of leaf data
 * @property {ImmutableObjectType} ObjectType Native object(map) data type tool
 * @property {ImmutableArrayType} ArrayType Native array(list) data type tool
 * @property {ImmutableMapType} MapType Immutable Map data type tool
 * @property {ImmutableListType} ListType Immutable List data type tool
 * @template T, S
 */
class ImmutableQuadtree extends QuadtreeRotue {
  _root: Quaternary;
  _levels: number;
  _options: Object;
  _dt: any;
  public static ObjectType = ImmutableObjectType;
  public static ArrayType  = ImmutableArrayType;
  public static MapType  = ImmutableMapType;
  public static ListType  = ImmutableListType;
  constructor(levels: number, options:any = {}, root?: Quaternary) {
    super();
    options.datatype = options.datatype || ImmutableObjectType;
    this._levels = levels;
    this._root = root || new Quaternary();
    this._dt = new options.datatype(options.identity);
    this._options = options;
  }
  /**
   * @method map
   * @description Map to every leaf data since given route.
   * @param {string} qroute Route of map root.
   * @param {mapfunc} f Function will execute on every leaf data.
   * @return {ImmutableQuadtree} New tree
   * @memberof ImmutableQuadtree
   */
  map(qroute: string, f: (any) => any): ImmutableQuadtree {
    this._partialRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);

    //no data
    if (!path.current) { return this; }

    var newnode = path.current.map(this._dt.map(f));

    return path.current === newnode ?
      this :
      new ImmutableQuadtree(this._levels, this._options, this._replace(path, newnode));
  }
  /**
   * @method reduce
   * @description Reduce every leaf data since given route.
   * @param {string} qroute Route of reduce root.
   * @param {reducefunc} f Reducing function
   * @return {S} Reduced value
   * @memberof ImmutableQuadtree
   */
  reduce(qroute: string, f: (prev:any, curr:any) => any, init: any): any {
    this.map(qroute, function (data) {
      init = f(init, data);
    });
    return init;
  }
  /**
   * @method add
   * @description Add data to leaf node
   * @param {route} qroute Full length route.
   * @param {T} data Data store to leaf node
   * @return {ImmutableQuadtree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadtree
   */
  add(qroute: string, data: any[]|any): ImmutableQuadtree {
    this._fullRouteGuard(qroute, this._levels);
    var leafs, newleafs, newnode;
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);

    if (path.current) {
      leafs = path.current.getData();
      newleafs = this._dt.add(leafs, data)
      //no change
      if (leafs === newleafs) { return this; }
      newnode = path.current.setData(newleafs);
    } else {
      leafs = new this._dt.cons();
      newleafs = this._dt.add(leafs, data)
      newnode = new Quaternary();
      newnode._setData(newleafs);
    }
    return new ImmutableQuadtree(this._levels, this._options, this._replace(path, newnode));
  }
  /**
   * @method remove
   * @description Remove data to leaf node
   * @param {route} qroute Full length route.
   * @param {T} data Data store to leaf node
   * @return {ImmutableQuadtree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadtree
   */
  remove(qroute: string, data: any[]|any): ImmutableQuadtree {
    this._fullRouteGuard(qroute, this._levels);
    var leafs, newleafs, newnode;
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);

    if (path.current) {
      leafs = path.current.getData();
      newleafs = this._dt.remove(leafs, data)
      //no change
      if (leafs === newleafs) { return this; }
      newnode = path.current.setData(newleafs);
      return new ImmutableQuadtree(this._levels, this._options, this._replace(path, newnode));
    }
    return this;
  }
  /**
   * @method clean
   * @description Clean all data under route
   * @param {?route} qroute Route to clean.
   * @return {ImmutableQuadtree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadtree
   */
  clean(qroute?: string): ImmutableQuadtree {
    this._partialRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);
    if (path.current && path.current.children.length) {
      return new ImmutableQuadtree(this._levels, this._options, this._replace(path, null));
    } else {
      return this;
    }
  }
  /**
   * @method keep
   * @description Remove all data except given route.
   * @param {?route} qroute Data under the route will keep
   * @return {ImmutableQuadtree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadtree
   */
  keep(qroute?: string): ImmutableQuadtree {
    this._partialRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);
    var i, changed = false;

    for (i = 0; i < path.nodes.length - 1; i++) {
      if (path.nodes[i].children_len > 1) {
        changed = true;
        break;
      }
    }
    if (changed) {
      path.nodes = [];
      return new ImmutableQuadtree(this._levels, this._options, this._replace(path, path.current));
    } else {
      return this;
    }
  }
  /**
   * @method query
   * @description Query all data under qroute
   * @param {?route} qroute Data under the route will return
   * @return {Array.<T>} Array of query data on leaf nodes
   * @memberof ImmutableQuadtree
   */
  query(qroute?: string): any[] {
    var list = [];
    this.map(qroute, function (data) {
      list.push(data);
    })
    return list;
  }
  /**
   * @property query
   * @description Getter to query all data under root
   * @return {Array.<T>} Array of all data on leaf nodes
   * @memberof ImmutableQuadtree
   */
  get list() {
    return this.query();
  }
}
