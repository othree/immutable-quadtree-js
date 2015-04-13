
class Quaternary {
  children: Quaternary[];
  data: any;
  constructor(base?: Quaternary) {
    var i;
    if (base) {
      this.children = base.children.slice();
    } else {
      this.children = [];
    }
    this.data = null;
  }
  _setData(data: any): void {
    this.data = data;
  }
  setData(data: any): Quaternary {
    if (data === this.data) {
      return this;
    }
    var nq = new Quaternary(this);
    nq._setData(data);
    return nq;
  }
  getData(): any {
    return this.data;
  }
  _setChild(i: number, data: Quaternary): void {
    this.children[i] = data;
  }
  setChild(i: number, data: Quaternary): Quaternary {
    if (data === this.children[i]) {
      return this;
    }
    var nq = new Quaternary(this);
    nq._setChild(i, data);
    return nq;
  }
  getChild(i: number): Quaternary|void {
    return this.children[i];
  }
  hasChild(i: number): boolean {
    return this.children[i] ? true : false;
  }
  map(f: (any) => any): Quaternary {
    var i, nq, flag = false;
    var leaf = this.data, newleaf;
    var child, newchild, newchildren = [];
    if (leaf) {
      newleaf = f(leaf);
      if (newleaf && newleaf !== leaf) {
        return this.setData(newleaf);
      }
    } else {
      for (i in this.children) {
        if (this.children[i]) {
          child = this.children[i]
          newchild = child.map(f);
          if (child !== newchild) {
            newchildren.push(i, newchild)
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
  }
};
