require('mocha');

var should = require('should');

var ImmutableQuadTree = require('../');

describe('Immutable QuadTree', function () {
  var a = new ImmutableQuadTree(4);
  var b = a.add('0000', {_id: 'ABC'});
  var c = b.add('0000', {_id: 'ABC'});
  var d = c.add('0010', {_id: 'BBB'});

  it('Immutable Equality Check', function () {
    a.should.not.equal(b);
    b.should.equal(c);
    c.should.not.equal(d);
  });
});
