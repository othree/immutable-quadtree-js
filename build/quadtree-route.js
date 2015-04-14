/// <reference path="quaternary.ts" />
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
        var i, parent, current;
        for (i = nodes.length; i > 0; i--) {
            parent = nodes[i - 1];
            if (parent) {
                current = nodes[i - 1].setChild(route[i], current);
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
