# immutable-quadtree-js
Immutable Quadtree in JS

## Example

    var a = new ImmutableQuadTree(4);
    var b = a.add('0000', {_id: 'ABC'});
    var c = b.add('0000', {_id: 'ABC'});
    var d = c.add('0010', {_id: 'BBB'});

    a === b; // false
    b === c; // true
    c === d; // false

    var e = d.keep('001');
