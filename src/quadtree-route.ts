/// <reference path="quaternary.ts" />

interface Path {
  current: Quaternary;
  route: number[];
  nodes: Quaternary[];
}

class QuadtreeRotue {
  _fullRouteGuard(route: string, levels: number) {
    if (typeof route !== 'string'
     || route.length !== levels
     || /[^0-3]/.test(route) ) {
      throw(new Error("Route incorrect"))
    }
  }
  _partialRouteGuard(route: string, levels: number) {
    if (!route) { return; }
    if (typeof route !== 'string'
     || route.length > levels
     || /[^0-3]/.test(route) ) {
      throw(new Error("Route incorrect"))
    }
  }
  _parse(route?: string): number[] {
    var nr = [], i;
    if (!route) { return nr; }
    for (i = 0; i < route.length; i++) {
      nr.push(parseInt(route[i]));
    }
    return nr;
  }
  _goto(route: number[], current): Path {
    var i, nodes = [current];
    for (i = 0; i < route.length; i++) {
      current = current.getChild(route[i]);
      if (!current) { break; }
      nodes.push(current);
    }
    return {
      current: current,
      route: route,
      nodes: nodes
    }
  }
  _replace (path: Path, node?: Quaternary): Quaternary {
    var route = path.route;
    var nodes = path.nodes;
    var i, parent, current = node;

    for (i = route.length - 1; i >= 0; i--) {
      parent = nodes[i];
      if (parent) {
        current = nodes[i].setChild(route[i], current); 
      } else {
        parent = new Quaternary();
        parent._setChild(route[i], current);
        current = parent;
      }
    }
    return current;
  }
}
