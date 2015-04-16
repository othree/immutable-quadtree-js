(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.ImmutableQuadTree = factory()
}(this, function () {
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

var ImmutableArrayType = (function () {
    function ImmutableArrayType(identity) {
        this.cons = Array;
        this.identity = identity || function (obj) { return obj; };
    }
    ImmutableArrayType.prototype.add = function (obj, data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        var i, id, flag = false;
        var newobj = obj.slice();
        if (data.length) {
            newobj = newobj.concat(data);
            flag = true;
        }
        if (flag) {
            return newobj;
        }
        //no change
        return obj;
    };
    ImmutableArrayType.prototype.remove = function (obj, data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        var i, j, id, self = this;
        var newobj = obj.slice();
        for (i = 0; i < data.length; i++) {
            id = this.identity(data[i]);
            newobj = newobj.filter(function (elem) {
                var jd = self.identity(elem);
                return id !== jd;
            });
        }
        if (newobj.length !== obj.length) {
            return newobj;
        }
        //no change
        return obj;
    };
    ImmutableArrayType.prototype.map = function (f) {
        return function (obj) {
            var k, newv, newobj;
            for (k in obj) {
                if (obj[k]) {
                    newv = f(obj[k]);
                    if (newv && newv !== obj[k]) {
                        if (!newobj) {
                            newobj = obj.slice();
                        }
                        newobj[k] = newv;
                    }
                }
            }
            return newobj || obj;
        };
    };
    return ImmutableArrayType;
})();
;
var Quaternary = (function () {
    function Quaternary(base) {
        var i;
        if (base) {
            this.children = base.children.slice();
            this.children_len = base.children_len;
        }
        else {
            this.children = [];
            this.children_len = 0;
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
        if (!this.children[i] && data) {
            this.children_len++;
        }
        else if (this.children[i] && !data) {
            this.children_len--;
        }
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
/// <reference path="quaternary.ts" />
var QuadTreeRotue = (function () {
    function QuadTreeRotue() {
    }
    QuadTreeRotue.prototype._fullRouteGuard = function (route, levels) {
        if (!route) {
            return;
        }
        if (typeof route !== 'string'
            || route.length !== levels
            || /[^0-3]/.test(route)) {
            throw (new Error("Route incorrect"));
        }
    };
    QuadTreeRotue.prototype._partialRouteGuard = function (route, levels) {
        if (!route) {
            return;
        }
        if (typeof route !== 'string'
            || route.length > levels
            || /[^0-3]/.test(route)) {
            throw (new Error("Route incorrect"));
        }
    };
    QuadTreeRotue.prototype._parse = function (route) {
        var nr = [], i;
        if (!route) {
            return nr;
        }
        for (i = 0; i < route.length; i++) {
            nr.push(parseInt(route[i]));
        }
        return nr;
    };
    QuadTreeRotue.prototype._goto = function (route, current) {
        var i, nodes = [current];
        for (i = 0; i < route.length; i++) {
            current = current.getChild(route[i]);
            if (!current) {
                break;
            }
            nodes.push(current);
        }
        return {
            current: current,
            route: route,
            nodes: nodes
        };
    };
    QuadTreeRotue.prototype._replace = function (path, node) {
        var route = path.route;
        var nodes = path.nodes;
        var i, parent, current = node;
        for (i = route.length - 1; i >= 0; i--) {
            parent = nodes[i];
            if (parent) {
                current = nodes[i].setChild(route[i], current);
            }
            else {
                parent = new Quaternary();
                parent._setChild(route[i], current);
                current = parent;
            }
        }
        return current;
    };
    return QuadTreeRotue;
})();
/**
 * @callback identity
 * @description Grab id from given data. Id is used to make sure data points are unique, no duplication.
 *     This is only interface defination. Default identity function will grab *id* property of given object.
 *     If id of data point isn't *id*. You will need to define your own identity function follow this interface.
 * @param {object} data Data to grab id.
 * @return {string} id
 */
/**
 * @callback mapfunc
 * @description Mapping function
 * @param {T} data Data received
 * @return {?T} If return, then map will create a new data store.
 *     If you don't make any change, return nothing.
 * @template T
 */
/**
 * @class ImmutableObjectType
 * @description Leaf node data type tool for native object. Behaves like immutable map
 * @param {identity} [identity] function to get data id
 * @template T
 * @inner
 */
var ImmutableObjectType = (function () {
    function ImmutableObjectType(identity) {
        this.cons = Object;
        this.identity = identity || function (obj) { return obj.id; };
    }
    /**
     * @method add
     * @description Add data to the object
     * @param {Object} obj The data store native object
     * @param {T} data Data to store to the object
     * @return {Object} Return new object if any change, original object if no change
     * @memberof ImmutableObjectType
     */
    ImmutableObjectType.prototype.add = function (obj, data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        var i, id, flag = false;
        var newobj = Object.assign({}, obj);
        for (i = 0; i < data.length; i++) {
            id = this.identity(data[i]);
            if (!obj[id]) {
                newobj[id] = data[i];
                flag = true;
            }
        }
        if (flag) {
            return newobj;
        }
        //no change
        return obj;
    };
    /**
     * @method remove
     * @description Remove data from the object
     * @param {Object} obj The data store native object
     * @param {T} data Data to remove from the object
     * @return {Object} Return new object if any change, original object if no change
     * @memberof ImmutableObjectType
     */
    ImmutableObjectType.prototype.remove = function (obj, data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        var i, id, flag = false;
        var newobj = Object.assign({}, obj);
        for (i = 0; i < data.length; i++) {
            id = this.identity(data[i]);
            if (obj[id]) {
                newobj[id] = null;
                delete newobj[id];
                flag = true;
            }
        }
        if (flag) {
            return newobj;
        }
        //no change
        return obj;
    };
    /**
     * @method map
     * @description Map f function on all data, behaves like immutable.
     * @param {mapfunc} f Mapping function
     * @return {Object} Return new object if any change, original object if no change
     * @memberof ImmutableObjectType
     */
    ImmutableObjectType.prototype.map = function (f) {
        return function (obj) {
            var k, newv, newobj;
            for (k in obj) {
                if (obj[k]) {
                    newv = f(obj[k]);
                    if (newv && newv !== obj[k]) {
                        if (!newobj) {
                            newobj = Object.assign({}, obj);
                        }
                        newobj[k] = newv;
                    }
                }
            }
            return newobj || obj;
        };
    };
    return ImmutableObjectType;
})();
;
/// <reference path="quadtree-route.ts" />
/// <reference path="quaternary.ts" />
/// <reference path="immutable-object-type.ts" />
/// <reference path="immutable-array-type.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * A string only contains `0`, `1`, `2`, `3`
 * @typedef {string} route
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
 * @template T
 */
var ImmutableQuadTree = (function (_super) {
    __extends(ImmutableQuadTree, _super);
    function ImmutableQuadTree(levels, options, root) {
        if (options === void 0) { options = {}; }
        _super.call(this);
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
     * @return {ImmutableQuadTree} New tree
     * @memberof ImmutableQuadTree
     */
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
    /**
     * @method add
     * @description Add data to leaf node
     * @param {route} qroute Full length route.
     * @param {T} data Data store to leaf node
     * @return {ImmutableQuadTree} New tree if any change. Self if no change.
     * @memberof ImmutableQuadTree
     */
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
    /**
     * @method remove
     * @description Remove data to leaf node
     * @param {route} qroute Full length route.
     * @param {T} data Data store to leaf node
     * @return {ImmutableQuadTree} New tree if any change. Self if no change.
     * @memberof ImmutableQuadTree
     */
    ImmutableQuadTree.prototype.remove = function (qroute, data) {
        this._fullRouteGuard(qroute, this._levels);
        var leafs, newleafs, newnode;
        var route = this._parse(qroute);
        var path = this._goto(route, this._root);
        if (path.current) {
            leafs = path.current.getData();
            newleafs = this._dt.remove(leafs, data);
            //no change
            if (leafs === newleafs) {
                return this;
            }
            newnode = path.current.setData(newleafs);
            return new ImmutableQuadTree(this._levels, this._options, this._replace(path, newnode));
        }
        return this;
    };
    /**
     * @method clean
     * @description Clean all data under route
     * @param {?route} qroute Route to clean.
     * @return {ImmutableQuadTree} New tree if any change. Self if no change.
     * @memberof ImmutableQuadTree
     */
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
    /**
     * @method keep
     * @description Remove all data except given route.
     * @param {?route} qroute Data under the route will keep
     * @return {ImmutableQuadTree} New tree if any change. Self if no change.
     * @memberof ImmutableQuadTree
     */
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
    /**
     * @method query
     * @description Query all data under qroute
     * @param {?route} qroute Data under the route will return
     * @return {Array.<T>} Array of query data on leaf nodes
     * @memberof ImmutableQuadTree
     */
    ImmutableQuadTree.prototype.query = function (qroute) {
        var list = [];
        this.map(qroute, function (data) {
            list.push(data);
        });
        return list;
    };
    Object.defineProperty(ImmutableQuadTree.prototype, "list", {
        /**
         * @property query
         * @description Getter to query all data under root
         * @return {Array.<T>} Array of all data on leaf nodes
         * @memberof ImmutableQuadTree
         */
        get: function () {
            return this.query();
        },
        enumerable: true,
        configurable: true
    });
    ImmutableQuadTree.ObjectType = ImmutableObjectType;
    ImmutableQuadTree.ArrayType = ImmutableArrayType;
    return ImmutableQuadTree;
})(QuadTreeRotue);

  return ImmutableQuadTree;

}));
