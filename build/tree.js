/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-object-type.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuadTree = (function (_super) {
    __extends(QuadTree, _super);
    function QuadTree(root, levels, options) {
        _super.call(this);
        options.datatype = options.datatype || ImmutableObjectType;
        this._levels = levels;
        this._root = root || new Quaternary();
        this._dt = new options.datatype();
        this._options = options;
    }
    QuadTree.prototype._replaceRoute = function (node, route, nodeRoute) {
        var i, parent, current;
        for (i = nodeRoute.length; i > 0; i--) {
            parent = nodeRoute[i - 1];
            if (parent) {
                current = nodeRoute[i - 1].setChild(route[i], current);
            }
            else {
                parent = new Quaternary();
                parent._setChild(route[i], current);
                current = parent;
            }
        }
        return new QuadTree(current, this._levels, this._options);
    };
    QuadTree.prototype.map = function (qroute, f) {
        this._partialRouteGuard(qroute, this._levels);
        var route = this._parse(qroute);
        var i;
        var leafs, newleafs, newnode;
        var child, current = this._root, parent;
        var nodeRoute = [this._root];
        for (i = 0; i < route.length; i++) {
            child = current.getChild(route[i]);
            if (!child) {
                break;
            }
            current = child;
            nodeRoute.push(current);
        }
        newnode = current.map(this._dt.map(f));
        return current === newnode ?
            this :
            this._replaceRoute(newnode, route, nodeRoute);
    };
    QuadTree.prototype.add = function (qroute, data) {
        this._fullRouteGuard(qroute, this._levels);
        var route = this._parse(qroute);
        var i;
        var leafs, newleafs;
        var child, current = this._root, parent;
        var nodeRoute = [this._root];
        for (i = 0; i < route.length; i++) {
            child = current.getChild(route[i]);
            current = child;
            nodeRoute.push(current);
            if (!current) {
                break;
            }
        }
        if (current) {
            leafs = current.getData();
            newleafs = this._dt.add(leafs, data);
            //no change
            if (leafs === newleafs) {
                return this;
            }
            current = current.setData(newleafs);
        }
        else {
            leafs = new this._dt.cons();
            newleafs = this._dt.add(leafs, data);
            current = new Quaternary();
            current._setData(newleafs);
        }
        for (i = route.length - 1; i > 0; i--) {
            parent = nodeRoute[i - 1];
            if (parent) {
                current = nodeRoute[i - 1].setChild(route[i], current);
            }
            else {
                parent = new Quaternary();
                parent._setChild(route[i], current);
                current = parent;
            }
        }
        return new QuadTree(current, this._levels, this._options);
    };
    return QuadTree;
})(QuadTreeRotue);
