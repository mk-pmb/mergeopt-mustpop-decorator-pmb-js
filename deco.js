/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
/*globals Promise:true*/
'use strict';

var EX, dfLeftoversMsg = 'Unsupported leftover option(s)',
  objPop = require('objpop'),
  mergeOpt = require('merge-options'),
  is = require('typechecks-pmb'),
  mustBe = require('typechecks-pmb/must-be');


function assumePromise(promising, result) {
  if (promising === false) { return false; }
  if (!result) { return false; }
  return is.fun(result.then);
}


EX = function decorate(origFunc, dfOpt, metaOpt) {
  if (!metaOpt) { metaOpt = false; }
  var popOpt, result,
    promising = metaOpt.promising,
    leftoversMsg = metaOpt.leftoversMsg,
    optArgIdx = (+metaOpt.optArgIdx || 0),
    merge = (metaOpt.mergeOpt || mergeOpt);
  popOpt = Object.assign({
    leftoversMsg: (leftoversMsg || dfLeftoversMsg),
    mustBe: (metaOpt.validate || mustBe),
  }, metaOpt.popOpt);

  function decorated() {
    var args = Array.from(arguments), origOpt = args[optArgIdx], popper;
    popper = objPop(merge(dfOpt, origOpt), popOpt);
    args[optArgIdx] = popper;
    result = origFunc.apply(this, args);
    if (leftoversMsg === false) { return result; }
    if (promising || assumePromise(promising, result)) {
      return Promise.resolve(result).then(function verifyEmpty() {
        popper.expectEmpty();
        return result;
      });
    }
    popper.expectEmpty();
    return result;
  }

  return decorated;
};



module.exports = EX;
