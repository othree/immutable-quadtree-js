class ImmutableObjectType {
  cons: any;
  constructor () {
    this.cons = Object; 
  }
  add (obj, data: Array<any>) {
    if (!Array.isArray(data)) { data = [data]; }

    var i, flag = false;
    var newobj = Object.create(obj);

    for (i = 0; i < data.length; i++) {
      if (newobj[data[i]._id]) {
        newobj[data[i]._id] = data[i];
        flag = true;
      }
    }
    if (flag) { return newobj; }
    //no change
    else { return obj; }
  }
};

