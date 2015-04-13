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
    this._levels = levels;
    this._root = root || new Quaternary();

    if (options.datatype) {
      this._dt = new options.datatype();
    } else {
      this._dt = new ImmutableMapType();
    }

    this._options = options;
    this._Data = new this._dt.cons();
  }
  add(qroute: string, data: Array<any>|any) {
    this._fullRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var i;
    var leafs;
    var child, current:Quaternary = this._root, parent;
    var nodeRoute = [this._root];

    if (Array.isArray(data)) {
        data = [data];
    }

    for (i = 0; i < route.length; i++) {
      child = current.getChild(route[i]);
      if (!child) {
        break;
      }
      current = child;
      nodeRoute.push(current);
    }

    if (nodeRoute[this._levels - 1]) {
      leafs = current.getData();
      leafs = this._dt.add(leafs, data)
      current = current.setData(leafs);
    } else {
      leafs = new this._Data();
      leafs = this._dt.add(leafs, data)
      current = new Quaternary();
      current._setData(leafs);
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
