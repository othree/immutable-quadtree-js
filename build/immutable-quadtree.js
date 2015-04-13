var ImmutableObjectType = (function () {
    function ImmutableObjectType() {
        this.cons = Object;
    }
    ImmutableObjectType.prototype.add = function (obj, data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        var i, flag = false;
        var newobj = Object.create(obj);
        for (i = 0; i < data.length; i++) {
            if (newobj[data[i]._id]) {
                newobj[data[i]._id] = data[i];
                flag = true;
            }
        }
        if (flag) {
            return newobj;
        }
        else {
            return obj;
        }
    };
    ImmutableObjectType.prototype.map = function (f) {
        return function (obj) {
            var k, newv, newobj;
            for (k in obj) {
                newv = f(obj[k]);
                if (newv && newv !== obj[k]) {
                    if (!newobj) {
                        newobj = Object.create(obj);
                    }
                    newobj[k] = newv;
                }
            }
            return newobj || obj;
        };
    };
    return ImmutableObjectType;
})();
;
var QuadTreeRotue = (function () {
    function QuadTreeRotue() {
    }
    QuadTreeRotue.prototype._fullRouteGuard = function (route, levels) {
        if (typeof route !== 'string'
            || route.length !== levels
            || /[^0-3]/.test(route)) {
            throw (new Error("Route incorrect"));
        }
    };
    QuadTreeRotue.prototype._partialRouteGuard = function (route, levels) {
        if (typeof route !== 'string'
            || route.length > levels
            || /[^0-3]/.test(route)) {
            throw (new Error("Route incorrect"));
        }
    };
    QuadTreeRotue.prototype._parse = function (route) {
        var nr = [], i;
        for (i = 0; i < route.length; i++) {
            nr.push(parseInt(route[i]));
        }
        return nr;
    };
    return QuadTreeRotue;
})();
var Quaternary = (function () {
    function Quaternary(base) {
        var i;
        if (base) {
            this.children = base.children.slice();
        }
        else {
            this.children = [];
        }
        this.data = null;
    }
    Quaternary.prototype._setData = function (data) {
        this.data = data;
    };
    Quaternary.prototype.setData = function (data) {
        if (data === this.data) {
            return this;
        }
        var nq = new Quaternary(this);
        nq._setData(data);
        return nq;
    };
    Quaternary.prototype.getData = function () {
        return this.data;
    };
    Quaternary.prototype._setChild = function (i, data) {
        this.children[i] = data;
    };
    Quaternary.prototype.setChild = function (i, data) {
        if (data === this.children[i]) {
            return this;
        }
        var nq = new Quaternary(this);
        nq._setChild(i, data);
        return nq;
    };
    Quaternary.prototype.getChild = function (i) {
        return this.children[i];
    };
    Quaternary.prototype.hasChild = function (i) {
        return this.children[i] ? true : false;
    };
    Quaternary.prototype.map = function (f) {
        var i, nq, flag = false;
        var leaf = this.data, newleaf;
        var child, newchild, newchildren = [];
        if (leaf) {
            newleaf = f(leaf);
            if (newleaf && newleaf !== leaf) {
                return this.setData(newleaf);
            }
        }
        else {
            for (i in this.children) {
                if (this.children[i]) {
                    child = this.children[i];
                    newchild = child.map(f);
                    if (child !== newchild) {
                        newchildren.push(i, newchild);
                    }
                }
            }
            if (newchildren.length) {
                nq = new Quaternary(this);
                for (i = 0; i < newchildren.length; i++) {
                    nq._setChild(newchildren[i][0], newchildren[i][1]);
                }
                return nq;
            }
        }
        return this;
    };
    return Quaternary;
})();
;
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
