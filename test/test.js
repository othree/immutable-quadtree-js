require('mocha');

var should = require('should');
var expect = require('expect');

var ImmutableQuadTree = require('../');

describe('Immutable QuadTree Native Map', function () {
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
  it('Route Guard', function () {
    should.throws(function () {a.query('00000')}, Error);
    should.throws(function () {a.query('abcd')}, Error);
    should.throws(function () {a.query('000a')}, Error);
    should.throws(function () {a.query(123)}, Error);
    should.throws(function () {a.query({k: 'v'})}, Error);
    should.throws(function () {a.query(true)}, Error);

    should.throws(function () {a.remove('000')}, Error);
    should.throws(function () {a.remove('00000')}, Error);
    should.throws(function () {a.remove('abcd')}, Error);
    should.throws(function () {a.remove('000a')}, Error);
    should.throws(function () {a.remove(123)}, Error);
    should.throws(function () {a.remove({k: 'v'})}, Error);
    should.throws(function () {a.remove(true)}, Error);
  });
  it('Remove', function () {
    var e = d.remove('0000', ABC);
    e.should.not.equal(d);
    e.query('0').length.should.equal(1);
    var f = d.remove('0010', BBB);
    f.query('000').length.should.equal(1);
    f.query('001').length.should.equal(0);
    var g = f.remove('0000', BBB);
    g.query('000').length.should.equal(1);
    g.query('001').length.should.equal(0);
    var h = g.remove('0000', ABC);
    h.query('000').length.should.equal(0);
    h.query('001').length.should.equal(0);
    var i = h.remove('0000', ABC);
    i.should.equal(h);
    var j = h.remove('2000', ABC);
    j.should.equal(h);
  });
  it('Clean', function () {
    var e = d.clean('0');
    e.query('0').length.should.equal(0);
    var f = d.clean('001');
    f.query('000').length.should.equal(1);
    f.query('001').length.should.equal(0);
    f.query('002').length.should.equal(0);
    f.query('003').length.should.equal(0);
    var g = f.clean('001');
    g.should.equal(f);
  });
  it('Keep', function () {
    var e = d.keep('001');
    e.query('001').length.should.equal(1);
    var f = d.keep('000');
    f.query('000').length.should.equal(1);
    f.query('001').length.should.equal(0);
    f.query('002').length.should.equal(0);
    f.query('003').length.should.equal(0);
    var g = f.keep('000');
    g.should.equal(f);
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
  it('List', function () {
    var list1 = d.query();
    var list2 = d.list;
    list1.length.should.equal(list2.length);
    list1.length.should.equal(2);
    list1[0].should.equal(list2[0]);
    list1[1].should.equal(list2[1]);
  });
  it('Map', function () {
    var e = d.map(null, function (elem) {
      return {
        id: elem.id,
        value: 1
      };
    });
    e.should.not.equal(d);
    var g = d.map(null, function (elem) {
    });
    g.should.equal(d);
  });
  it('Reduce', function () {
    d.reduce('', function (prev, curr) {
      return prev + curr.id;
    }, '__').should.equal('__ABCBBB');

    d.reduce('001', function (prev, curr) {
      return prev + curr.id;
    }, '').should.equal('BBB');
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

describe('Immutable QuadTree Native Set', function () {
  var a = new ImmutableQuadTree(4, {
    datatype: ImmutableQuadTree.ArrayType
  });

  var ABC = {id: 'ABC'};
  var BBB = {id: 'BBB'};

  var b = a.add('0000', ABC);
  var c = b.add('0000', ABC);
  var d = c.add('0010', BBB);

  it('Immutable Equality Check', function () {
    a.should.not.equal(b);
    b.should.not.equal(c);
    c.should.not.equal(d);
  });
  it('Add', function () {
    var e = d.add('0000', ABC);
    e.should.not.equal(d);
    e.query('0').length.should.equal(4);

    var f = e.add('0000');
    f.should.equal(e);
  });
  it('Remove', function () {
    var e = d.remove('0000', ABC);
    e.should.not.equal(d);
    e.query('0').length.should.equal(1);
    var f = d.remove('0010', BBB);
    f.query('000').length.should.equal(2);
    f.query('001').length.should.equal(0);
    var g = f.remove('0010', BBB);
    g.query('000').length.should.equal(2);
    g.query('001').length.should.equal(0);
    var h = f.remove('0010');
    h.query('000').length.should.equal(2);
    h.query('001').length.should.equal(0);
  });
  it('Query', function () {
    var list = d.query();
    list.length.should.equal(3);
    list[0].should.equal(ABC);
    list[1].should.equal(ABC);
    list[2].should.equal(BBB);

    d.query('000').length.should.equal(2);
  });
  it('Map', function () {
    var e = d.map(null, function (elem) {
      return {
        id: elem.id,
        value: 1
      };
    });
    e.should.not.equal(d);
    var g = d.map(null, function (elem) {
    });
    g.should.equal(d);
  });
});

Immutable = require('../src/vendor/immutable');

describe('Immutable QuadTree Native Set', function () {
  
  var a = new ImmutableQuadTree(4, {
    datatype: ImmutableQuadTree.MapType
  });

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
  it('Add', function () {
    var e = d.add('0000', ABC);
    e.should.equal(d);
    e.query('0').length.should.equal(2);

    var f = e.add('0000');
    f.should.equal(e);
  });
  it('Remove', function () {
    var e = d.remove('0000', ABC);
    e.should.not.equal(d);
    e.query('000').length.should.equal(0);
    e.query('001').length.should.equal(1);
    var f = d.remove('0010', BBB);
    f.query('000').length.should.equal(1);
    f.query('001').length.should.equal(0);
    var g = f.remove('0010', BBB);
    g.query('000').length.should.equal(1);
    g.query('001').length.should.equal(0);
    var h = f.remove('0010');
    h.query('000').length.should.equal(1);
    h.query('001').length.should.equal(0);
  });
  it('Query', function () {
    var list = d.query();
    list.length.should.equal(2);
    list[0].should.equal(ABC);
    list[1].should.equal(BBB);

    d.query('000').length.should.equal(1);
  });
  it('Map', function () {
    var e = d.map(null, function (elem) {
      return {
        id: elem.id,
        value: 1
      };
    });
    e.should.not.equal(d);
    var g = d.map(null, function (elem) {
    });
    g.should.equal(d);
  });
});
