require('mocha');

var should = require('should');

var ImmutableQuadTree = require('../');

describe('Immutable QuadTree', function () {
  var a = new ImmutableQuadTree(4);

  var ABC = {id: 'ABC'};
  var BBB = {id: 'BBB'};

  var b = a.add('0000', ABC);
  var c = b.add('0000', ABC);
  var d = c.add('0010', BBB);

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
  it('Keep', function () {
    var e = d.keep('001');
    e.query('001').length.should.equal(1);
    var f = d.keep('000');
    f.query('000').length.should.equal(1);
    f.query('001').length.should.equal(0);
    f.query('002').length.should.equal(0);
    f.query('003').length.should.equal(0);
  });
  it('Empty Route Query', function () {
    var e = d.clean();
    e.query().length.should.equal(0);
  });
  it('Query', function () {
    var list = d.query();
    list.length.should.equal(2);
    list[0].should.equal(ABC);
    list[1].should.equal(BBB);
  });

  var aa = new ImmutableQuadTree(4, {
    datatype: ImmutableQuadTree.ObjectType,
    identity: function (o) { return o._id; }
  });

  var CBA = {_id: 'CBA'};
  var AAA = {_id: 'AAA'};

  var bb = aa.add('0000', CBA);
  var cc = bb.add('0000', AAA);
  var dd = cc.add('0010', AAA);

  it('Identity', function () {
    var list = dd.query('0000');
    list.length.should.equal(2);
    list.should.containDeep([CBA]);
    list.should.containDeep([AAA]);
  });
});
