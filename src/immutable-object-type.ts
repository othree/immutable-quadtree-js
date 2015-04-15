
/**
 * @callback identity
 * @description Grab id from given data. Id is used to make sure data points are unique, no duplication.
 *     This is only interface defination. Default identity function will grab *id* property of given object.
 *     If id of data point isn't *id*. You will need to define your own identity function follow this interface.
 * @param {object} data Data to grab id.
 * @return {string} id
 * @inner
 */

/**
 * @class ImmutableObjectType
 * @description Leaf node data type tool for native object
 * @param {identity} identity function to get data id
 * @inner
 */
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
    return obj;
  }
  remove (obj, data: Array<any>) {
    if (!Array.isArray(data)) { data = [data]; }

    var i, id, flag = false;
    var newobj = (<any>Object).assign({}, obj);

    for (i = 0; i < data.length; i++) {
      id = this.identity(data[i]);
      if (obj[id]) {
        newobj[id] = null;
        delete newobj[id];
        flag = true;
      }
    }
    if (flag) { return newobj; }
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
              newobj = (<any>Object).assign({}, obj);
            }
            newobj[k] = newv;
          }
        }
      }
      return newobj || obj;
    }
  }
};

