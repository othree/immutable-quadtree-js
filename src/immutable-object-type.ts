
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
 * @callback mapperfunc
 * @description Iterator over native data store object.
 * @param {T} data Native data store object
 * @return {T} Return new object if any change.
 * @template T
 */


/**
 * @class ImmutableObjectType
 * @description Leaf node data type tool for native object. Behaves like immutable map
 * @param {identity} [identity] function to get data id
 * @template T
 * @inner
 */
class ImmutableObjectType {
  cons: any;
  identity: (any) => string;
  constructor (identity?: (any) => string) {
    this.cons = Object; 
    this.identity = identity || function (obj) { return obj.id; }
  }
  /**
   * @method add
   * @description Add data to the object
   * @param {Object} obj The data store native object
   * @param {T} data Data to store to the object
   * @return {Object} Return new object if any change, original object if no change
   * @memberof ImmutableObjectType
   */
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
  /**
   * @method remove
   * @description Remove data from the object
   * @param {Object} obj The data store native object
   * @param {T} data Data to remove from the object
   * @return {Object} Return new object if any change, original object if no change
   * @memberof ImmutableObjectType
   */
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
  /**
   * @method map
   * @description Map f function on all data, behaves like immutable.
   * @param {mapfunc} f Mapping function
   * @return {mapperfunc} Function iterator over data store object
   * @memberof ImmutableObjectType
   */
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

