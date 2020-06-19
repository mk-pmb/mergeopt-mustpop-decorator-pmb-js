
<!--#echo json="package.json" key="name" underline="=" -->
mergeopt-mustpop-decorator-pmb
==============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Wrap a function to modify its options object argument to be merged with
default options and wrapped in an objPop instance with type checking.
<!--/#echo -->



API
---

This module exports one function:

### decorate(origFunc, dfOpt, metaOpt)

Returns the wrapper function, based on your function `origFunc`
and default options `dfOpt`.

`metaOpt` is an optional options object that supports these keys:

* `optArgIdx`: Which argument to `origFunc` will be the options object.
  Defaults to `0`, i.e. first argument.
* `mergeOpt`: The options merging function to be used.
  If false-y, the default (`merge-options`) will be used.
* `validate`: The validator function to be used.
  If false-y, the default (`typechecks-pmb/must-be`) will be used.
* `leftoversMsg`: Error message in case some keys from the (copy of the)
  options object have not been popped.
  If false-y, this check is skipped.
  Defaults to something like `'Unsupported leftover options'`.
* `popOpt`: Custom options to pass along to `objpop`.
* `promising`: Boolean, whether `origFunc` is expected to return a Promise
  or then-able.
  Can also be (and defaults to) `null`, in which case the function result
  is treated as a promise if it has a `.then` method.
  This determines whether the






Usage
-----

:TODO:

<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
