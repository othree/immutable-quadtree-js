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
  it('Clean', function () {
    var e = d.clean('0');
    e.query('0').length.should.equal(0);
    var f = d.clean('001');
    f.query('000').length.should.equal(1);
    f.query('001').length.should.equal(0);
    f.query('002').length.should.equal(0);
    f.query('003').length.should.equal(0);
  });
  it('Empty Query', function () {
    var e = d.clean();
    e.query().length.should.equal(0);
  });
});
