/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-object-type.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ImmutableQuadTree = (function (_super) {
    __extends(ImmutableQuadTree, _super);
    function ImmutableQuadTree(levels, options, root) {
        if (options === void 0) { options = {}; }
        _super.call(this);
        options.datatype = options.datatype || ImmutableObjectType;
        this._levels = levels;
        this._root = root || new Quaternary();
        this._dt = new options.datatype();
        this._options = options;
    }
    ImmutableQuadTree.prototype.map = function (qroute, f) {
        this._partialRouteGuard(qroute, this._levels);
        var route = this._parse(qroute);
        var path = this._goto(route, this._root);
        //no data
        if (!path.current) {
            return this;
        }
        var newnode = path.current.map(this._dt.map(f));
        return path.current === newnode ?
            this :
            new ImmutableQuadTree(this._levels, this._options, this._replace(path, newnode));
    };
    ImmutableQuadTree.prototype.add = function (qroute, data) {
        this._fullRouteGuard(qroute, this._levels);
        var leafs, newleafs, newnode;
        var route = this._parse(qroute);
        var path = this._goto(route, this._root);
        if (path.current) {
            leafs = path.current.getData();
            newleafs = this._dt.add(leafs, data);
            //no change
            if (leafs === newleafs) {
                return this;
            }
            newnode = path.current.setData(newleafs);
        }
        else {
            leafs = new this._dt.cons();
            newleafs = this._dt.add(leafs, data);
            newnode = new Quaternary();
            newnode._setData(newleafs);
        }
        return new ImmutableQuadTree(this._levels, this._options, this._replace(path, newnode));
    };
    ImmutableQuadTree.prototype.clean = function (qroute) {
        this._partialRouteGuard(qroute, this._levels);
        var route = this._parse(qroute);
        var path = this._goto(route, this._root);
        if (path.current && path.current.children.length) {
            return new ImmutableQuadTree(this._levels, this._options, this._replace(path, null));
        }
        else {
            return this;
        }
    };
    ImmutableQuadTree.prototype.keep = function (qroute) {
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
        }
        else {
            return this;
        }
    };
    return ImmutableQuadTree;
})(QuadTreeRotue);
