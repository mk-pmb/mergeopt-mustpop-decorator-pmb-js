// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import 'usnam-pmb';
import test from 'p-tape';
import pImmediate from 'p-immediate';

import decorate from '..';

const rx = {
  loo: / Unsupported leftover option/i,
  noo: / is not a[\w ]* Object/i,
};

async function immed(x) {
  await pImmediate();
  return x;
}


test('Basics: Warming up', async(t) => {
  t.plan(12);

  function f(popOpt) {
    const r = {
      a: popOpt.mustBe('bool', 'a'),
      b: popOpt.mustBe('bool | neg int', 'b'),
      c: popOpt.mustBe('undef | nonEmpty str', 'c'),
      t: (this && this.t),
    };
    if (this && this.w) { return this.w(r); }
    return r;
  }

  const g = decorate(f, { a: true, b: false });
  t.deepEqual(g(), { a: true, b: false, c: undefined, t: undefined });
  t.throws(() => g('foo'), rx.noo);
  t.throws(() => g(false), rx.noo);
  t.throws(() => g(null), rx.noo);
  t.throws(() => g({ c: 22 }), /: c must be /);
  t.throws(() => g({ b: 22 }), /: b must be /);
  t.throws(() => g({ b: -3.14 }), /: b must be /);
  t.throws(() => g({ d: 0 }), rx.loo);

  const o = { g, t: 'hello' };
  t.deepEqual(o.g(), { a: true, b: false, c: undefined, t: 'hello' });
  t.deepEqual(o.g({ b: -22, c: 'doge' }),
    { a: true, b: -22, c: 'doge', t: 'hello' });

  o.w = immed;
  t.deepEqual(await o.g(), { a: true, b: false, c: undefined, t: 'hello' });
  t.rejects(o.g({ d: 0 }), rx.loo);
});





























/* scroll */
