/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-object-type.ts" />
/// <reference path="immutable-array-type.ts" />

/**
 * @class ImmutableQuadTree
 * @description Basic Immutable Quad Tree class
 * @param {number} levels Quad tree levels
 * @param options Options
 * @param options.datatype Leaf node data tool
 * @param options.identity Function to get id of leaf data
 * @property {ImmutableObjectType} ObjectType Native object(map) data type tool
 * @property {ImmutableArrayType} ArrayType Native array(list) data type tool
 */
class ImmutableQuadTree extends QuadTreeRotue {
  _root: Quaternary;
  _levels: number;
  _options: Object;
  _dt: any;
  public static ObjectType = ImmutableObjectType;
  public static ArrayType  = ImmutableArrayType;
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
   * @param {function} f Function will execute on every leaf data.
   * @return {ImmutableQuadTree} New tree
   * @memberof ImmutableQuadTree
   */
  map(qroute: string, f: (any) => any): ImmutableQuadTree {
    this._partialRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);

    //no data
    if (!path.current) { return this; }

    var newnode = path.current.map(this._dt.map(f));

    return path.current === newnode ?
      this :
      new ImmutableQuadTree(this._levels, this._options, this._replace(path, newnode));
  }
  /**
   * @method add
   * @description Add data to leaf node
   * @param {string} qroute Full length route.
   * @param {any} data Data store to leaf node
   * @return {ImmutableQuadTree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadTree
   */
  add(qroute: string, data: any[]|any): ImmutableQuadTree {
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
    return new ImmutableQuadTree(this._levels, this._options, this._replace(path, newnode));
  }
  /**
   * @method remove
   * @description Remove data to leaf node
   * @param {string} qroute Full length route.
   * @param {any} data Data store to leaf node
   * @return {ImmutableQuadTree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadTree
   */
  remove(qroute: string, data: any[]|any): ImmutableQuadTree {
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
      return new ImmutableQuadTree(this._levels, this._options, this._replace(path, newnode));
    }
    return this;
  }
  /**
   * @method clean
   * @description Clean all data under route
   * @param {string} qroute Route to clean.
   * @return {ImmutableQuadTree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadTree
   */
  clean(qroute?: string): ImmutableQuadTree {
    this._partialRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);
    if (path.current && path.current.children.length) {
      return new ImmutableQuadTree(this._levels, this._options, this._replace(path, null));
    } else {
      return this;
    }
  }
  /**
   * @method keep
   * @description Remove all data except given route.
   * @param {string} qroute Data under the route will keep
   * @return {ImmutableQuadTree} New tree if any change. Self if no change.
   * @memberof ImmutableQuadTree
   */
  keep(qroute?: string): ImmutableQuadTree {
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
      return new ImmutableQuadTree(this._levels, this._options, this._replace(path, path.current));
    } else {
      return this;
    }
  }
  query(qroute?: string): any[] {
    var list = [];
    this.map(qroute, function (data) {
      list.push(data);
    })
    return list;
  }
  get list() {
    return this.query();
  }
}
