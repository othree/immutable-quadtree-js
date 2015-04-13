/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-map-type.ts" />

class QuadTree extends QuadTreeRotue {
  _root: Quaternary;
  _levels: number;
  _options: Object;
  _dt: any;
  _Data: any;
  constructor(root: Quaternary, levels: number, options) {
    super();
    options.datatype = options.datatype || ImmutableMapType;
    this._levels = levels;
    this._root = root || new Quaternary();
    this._dt = new options.datatype();
    this._options = options;
    this._Data = new this._dt.cons;
  }
  add(qroute: string, data: Array<any>|any): QuadTree {
    this._fullRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var i;
    var leafs, newleafs;
    var current:Quaternary = this._root, parent;
    var nodeRoute = [this._root];

    for (i = 0; i < route.length; i++) {
      current = current.getChild(route[i]);
      nodeRoute.push(current);
      if (!current) { break; }
    }

    if (current) {
      leafs = current.getData();
      newleafs = this._dt.add(leafs, data)
      //no change
      if (leafs === newleafs) { return this; }
      current = current.setData(newleafs);
    } else {
      leafs = new this._Data();
      newleafs = this._dt.add(leafs, data)
      current = new Quaternary();
      current._setData(newleafs);
    }

    for (i = route.length -1; i > 0; i--) {
      parent = nodeRoute[i - 1];
      if (parent) {
        current = nodeRoute[i - 1].setChild(route[i], current); 
      } else {
        parent = new Quaternary();
        parent._setChild(route[i], current);
        current = parent;
      }
    }

    return new QuadTree(current, this._levels, this._options);

  }
}
