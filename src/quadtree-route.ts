
class QuadTreeRotue {
  _fullRouteGuard(route: string, levels: number) {
    if (typeof route !== 'string'
     || route.length !== levels
     || /[^0-3]/.test(route) ) {
      throw(new Error("Route incorrect"))
    }
  }
  _partialRouteGuard(route: string, levels: number) {
    if (typeof route !== 'string'
     || route.length > levels
     || /[^0-3]/.test(route) ) {
      throw(new Error("Route incorrect"))
    }
  }
  _parse(route: string): Array<number> {
    var nr = [], i;
    for (i = 0; i < route.length; i++) {
      nr.push(parseInt(route[i]));
    }
    return nr;
  }
}
