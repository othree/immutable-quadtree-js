
class Quaternary {
  children: Array<Quaternary|void>;
  data: any;
  constructor(base: Quaternary) {
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
};
