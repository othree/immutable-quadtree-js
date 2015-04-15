class ImmutableObjectType {
  cons: any;
  identity: (any) => string;
  constructor (identity?: (any) => string) {
    this.cons = Object; 
    this.identity = identity || function (obj) { return obj.id; }
  }
  add (obj, data: Array<any>) {
    if (!Array.isArray(data)) { data = [data]; }

    var i, id, flag = false;
    var newobj = (<any>Object).assign({}, obj);

    for (i = 0; i < data.length; i++) {
      id = this.identity(data[i]);
      if (!obj[id]) {
        newobj[id] = data[i];
        flag = true;
      }
    }
    if (flag) { return newobj; }
    //no change
    else { return obj; }
  }
  map (f: (any) => any): (Object) => Object {
    return function (obj) {
      var k, newv, newobj;
      for (k in obj) {
        newv = f(obj[k]);
        if (newv && newv !== obj[k]) {
          if (!newobj) {
            newobj = (<any>Object).assign({}, obj);
          }
          newobj[k] = newv;
        }
      }
      return newobj || obj;
    }
  }
};

