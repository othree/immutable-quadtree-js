
class ImmutableArrayType {
  cons: any;
  identity: (any) => string;
  constructor (identity?: (any) => string) {
    this.cons = Array; 
    this.identity = identity || function (obj) { return obj; }
  }
  add (obj, data: Array<any>) {
    if (!Array.isArray(data)) { data = [data]; }

    var i, id, flag = false;
    var newobj = obj.slice();

    if (data.length) {
      newobj = newobj.concat(data)
      flag = true;
    }
    if (flag) { return newobj; }
    //no change
    return obj;
  }
  remove (obj, data: Array<any>) {
    if (!Array.isArray(data)) { data = [data]; }

    var i, j, id, self = this;
    var newobj = obj.slice();

    for (i = 0; i < data.length; i++) {
      id = this.identity(data[i]);
      newobj = newobj.filter(function (elem) {
        var jd = self.identity(elem);
        return id !== jd;
      });
    }

    if (newobj.length !== obj.length) { return newobj; }
    //no change
    return obj;
  }
  map (f: (any) => any): (Object) => Object {
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
    }
  }
};

