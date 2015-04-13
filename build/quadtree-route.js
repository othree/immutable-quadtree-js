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
