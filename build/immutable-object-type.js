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
