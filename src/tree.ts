/// <reference path="quaternary.ts" />
/// <reference path="immutable-map-tool.ts" />


class QuadTree {
  _root: Quaternary;
  _levels: number;
  _options: Object;
  _Data: any;
  constructor(root: Quaternary, levels: number, options = {datatype: IMtype}) {
    this._levels = levels;
    this._root = root || new Quaternary();
    this._options = options;
    this._dt = new options.datatype();
    this._Data = new this._tool.cons();
  }
  _fullRouteGuard(route: string) {
    if (typeof route !== 'string'
     || route.length !== this._levels
     || /[^0-3]/.test(route) ) {
      throw(new Error("Route incorrect"))
    }
  }
  _partialRouteGuard(route: string) {
    if (typeof route !== 'string'
     || route.length > this._levels
     || /[^0-3]/.test(route) ) {
      throw(new Error("Route incorrect"))
    }
  }
  _parse(route: string): Array<number> {
    var nr = [], i;
    for (i = 0; i < route.length; i++) {
      nr.push(parseInt(route[i]));
    }
    return nr;
  }
  add(qroute: string, data: Array<any>|any) {
    this._fullRouteGuard(qroute);
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
