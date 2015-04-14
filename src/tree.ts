/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-object-type.ts" />

class ImmutableQuadTree extends QuadTreeRotue {
  _root: Quaternary;
  _levels: number;
  _options: Object;
  _dt: any;
  constructor(root: Quaternary, levels: number, options) {
    super();
    options.datatype = options.datatype || ImmutableObjectType;
    this._levels = levels;
    this._root = root || new Quaternary();
    this._dt = new options.datatype();
    this._options = options;
  }
  map(qroute: string, f: (any) => any): ImmutableQuadTree {
    this._partialRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var path = this._goto(route, this._root);

    if (!path.current) {
      return this;
    }

    var newnode = path.current.map(this._dt.map(f));

    return path.current === newnode ?
      this :
      new ImmutableQuadTree(this._replace(path, newnode), this._levels, this._options);

  }
  add(qroute: string, data: any[]|any): ImmutableQuadTree {
    this._fullRouteGuard(qroute, this._levels);
    var route = this._parse(qroute);
    var i;
    var leafs, newleafs;
    var child, current:Quaternary = this._root, parent;
    var nodeRoute = [this._root];

    for (i = 0; i < route.length; i++) {
      child = current.getChild(route[i]);
      current = child;
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
      leafs = new this._dt.cons();
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

    return new ImmutableQuadTree(current, this._levels, this._options);

  }
}
