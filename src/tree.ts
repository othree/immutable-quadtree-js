/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-object-type.ts" />

class ImmutableQuadTree extends QuadTreeRotue {
  _root: Quaternary;
  _levels: number;
  _options: Object;
  _dt: any;
  constructor(levels: number, options:any = {}, root?: Quaternary) {
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

    //no data
    if (!path.current) { return this; }

    var newnode = path.current.map(this._dt.map(f));

    return path.current === newnode ?
      this :
      new ImmutableQuadTree(this._levels, this._options, this._replace(path, newnode));
  }
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
  query(qroute): any[] {
    var list = [];
    this.map(qroute, function (data) {
      list.push(data);
    })
    return list;
  }
}
