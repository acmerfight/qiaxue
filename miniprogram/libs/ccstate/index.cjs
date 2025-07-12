'use strict';

var globalId = 0;
var generateToString = function generateToString(id, prefix, debugLabel) {
  var label = "".concat(prefix).concat(String(id)).concat(debugLabel ? ':' + debugLabel : '');
  return function () {
    return label;
  };
};
function state(init, options) {
  var id = globalId++;
  var ret = {
    id: id,
    init: init,
    toString: generateToString(id, 'S', options === null || options === void 0 ? void 0 : options.debugLabel)
  };
  if (options !== null && options !== void 0 && options.debugLabel) {
    ret.debugLabel = options.debugLabel;
  }
  return ret;
}
function computed(read, options) {
  var id = globalId++;
  var ret = {
    id: id,
    read: read,
    toString: generateToString(id, 'CPT', options === null || options === void 0 ? void 0 : options.debugLabel)
  };
  if (options !== null && options !== void 0 && options.debugLabel) {
    ret.debugLabel = options.debugLabel;
  }
  return ret;
}
function command(write, options) {
  var id = globalId++;
  var ret = {
    id: id,
    write: write,
    toString: generateToString(id, 'CMD', options === null || options === void 0 ? void 0 : options.debugLabel)
  };
  if (options !== null && options !== void 0 && options.debugLabel) {
    ret.debugLabel = options.debugLabel;
  }
  return ret;
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _createClass(e, r, t) {
  return Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function withSetInterceptor(fn, writable$, interceptor) {
  if (!interceptor) {
    return fn();
  }
  var result = {
    called: false
  };
  var wrappedFn = function wrappedFn() {
    result = {
      called: true,
      data: fn()
    };
    return result.data;
  };
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }
  if ('write' in writable$) {
    interceptor.apply(void 0, [writable$, wrappedFn].concat(args));
  } else {
    interceptor(writable$, wrappedFn, args[0]);
  }
  if (!result.called) {
    throw new Error('interceptor must call fn sync');
  }
  return result.data;
}
function withGetInterceptor(fn, signal, interceptor) {
  if (!interceptor) {
    return fn();
  }
  var result = {
    called: false
  };
  interceptor(signal, function () {
    result = {
      called: true,
      data: fn()
    };
    return result.data;
  });
  if (!result.called) {
    throw new Error('interceptor must call fn sync');
  }
  return result.data;
}
function withComputedInterceptor(fn, signal, interceptor) {
  if (!interceptor) {
    return fn();
  }
  var result = {
    called: false
  };
  interceptor(signal, function () {
    result = {
      called: true,
      data: fn()
    };
    return result.data.val;
  });
  if (!result.called) {
    throw new Error('interceptor must call fn sync');
  }
  return result.data;
}
function withGeValInterceptor(fn, signal, interceptor) {
  if (!interceptor) {
    return fn();
  }
  var result = {
    called: false
  };
  interceptor(signal, function () {
    result = {
      called: true,
      data: fn()
    };
    return result.data;
  });
  if (!result.called) {
    throw new Error('interceptor must call fn sync');
  }
  return result.data;
}

function canReadAsCompute(atom) {
  return 'read' in atom;
}
function isComputedState(state) {
  return 'dependencies' in state;
}

function currentValue(signal, context) {
  var _context$stateMap$get;
  return (_context$stateMap$get = context.stateMap.get(signal)) === null || _context$stateMap$get === void 0 ? void 0 : _context$stateMap$get.val;
}
function shouldDistinct(signal, value, context) {
  return currentValue(signal, context) === value;
}
function shouldDistinctError(signal, context) {
  var _context$stateMap$get2;
  return ((_context$stateMap$get2 = context.stateMap.get(signal)) === null || _context$stateMap$get2 === void 0 ? void 0 : _context$stateMap$get2.error) !== undefined;
}

function checkEpoch(readComputed, computedState, context, mutation) {
  var _iterator = _createForOfIteratorHelper(computedState.dependencies.entries()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _context$stateMap$get;
      var _step$value = _slicedToArray(_step.value, 2),
        dep = _step$value[0],
        epoch = _step$value[1];
      var depEpoch = canReadAsCompute(dep) ? readComputed(dep, context, mutation).epoch : (_context$stateMap$get = context.stateMap.get(dep)) === null || _context$stateMap$get === void 0 ? void 0 : _context$stateMap$get.epoch;
      if (depEpoch !== epoch) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return true;
}
function tryGetCached(readComputed, computed$, context, mutation) {
  var signalState = context.stateMap.get(computed$);
  if (!signalState) {
    return undefined;
  }

  // If a computed is marked as potentially dirty, we should perform a
  // thorough epoch check. Alternatively, we can check the mounted state since
  // a mounted computed is always re-evaluated immediately.
  var mayDirty = mutation === null || mutation === void 0 ? void 0 : mutation.potentialDirtyIds.has(computed$.id);
  if (!mayDirty && signalState.mounted) {
    return signalState;
  }
  if (checkEpoch(readComputed, signalState, context, mutation)) {
    if (mayDirty) {
      mutation === null || mutation === void 0 || mutation.potentialDirtyIds["delete"](computed$.id);
    }
    return signalState;
  }
  return undefined;
}
function wrapGet(readSignal, mount, callerComputed$, callerState, context, mutation) {
  var readDeps = new Map();
  return [function (dep$) {
    var depState = readSignal(dep$, context, mutation);
    if (callerState.dependencies === readDeps) {
      readDeps.set(dep$, depState.epoch);
      var callerMounted = !!callerState.mounted;
      if (callerMounted && !depState.mounted) {
        mount(dep$, context, mutation).readDepts.add(callerComputed$);
      } else if (callerMounted && depState.mounted) {
        depState.mounted.readDepts.add(callerComputed$);
      }
    }
    if ('error' in depState) {
      throw depState.error;
    }
    return depState.val;
  }, readDeps];
}
function getOrInitComputedState(computed$, context) {
  var computedState = context.stateMap.get(computed$);
  if (!computedState) {
    computedState = {
      dependencies: new Map(),
      epoch: -1
    };
    context.stateMap.set(computed$, computedState);
  }
  return computedState;
}
function cleanupMissingDependencies(unmount, computed$, lastDeps, currDeps, context, mutation) {
  var _iterator2 = _createForOfIteratorHelper(lastDeps.keys()),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var key = _step2.value;
      if (!currDeps.has(key)) {
        var _depState$mounted;
        var depState = context.stateMap.get(key);
        depState === null || depState === void 0 || (_depState$mounted = depState.mounted) === null || _depState$mounted === void 0 || _depState$mounted.readDepts["delete"](computed$);
        unmount(key, context, mutation);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function evaluateComputed(readSignal, mount, unmount, computed$, context, mutation) {
  var computedState = getOrInitComputedState(computed$, context);
  var lastDeps = computedState.dependencies;
  var _wrapGet = wrapGet(readSignal, mount, computed$, computedState, context, mutation),
    _wrapGet2 = _slicedToArray(_wrapGet, 2),
    _get = _wrapGet2[0],
    dependencies = _wrapGet2[1];
  computedState.dependencies = dependencies;
  var result;
  try {
    result = {
      value: computed$.read(function (depAtom) {
        var _context$interceptor;
        return withGeValInterceptor(function () {
          return _get(depAtom);
        }, depAtom, (_context$interceptor = context.interceptor) === null || _context$interceptor === void 0 ? void 0 : _context$interceptor.get);
      }, {
        get signal() {
          var _computedState$abortC, _computed$$debugLabel;
          (_computedState$abortC = computedState.abortController) === null || _computedState$abortC === void 0 || _computedState$abortC.abort("abort ".concat((_computed$$debugLabel = computed$.debugLabel) !== null && _computed$$debugLabel !== void 0 ? _computed$$debugLabel : 'anonymous', " atom"));
          computedState.abortController = new AbortController();
          return computedState.abortController.signal;
        }
      })
    };
  } catch (error) {
    result = {
      error: error
    };
  }
  mutation === null || mutation === void 0 || mutation.potentialDirtyIds["delete"](computed$.id);
  cleanupMissingDependencies(unmount, computed$, lastDeps, dependencies, context, mutation);
  if ('error' in result) {
    if (!shouldDistinctError(computed$, context)) {
      computedState.error = result.error;
      delete computedState.val;
      computedState.epoch += 1;
    }
  } else if (!shouldDistinct(computed$, result.value, context)) {
    computedState.val = result.value;
    delete computedState.error;
    computedState.epoch += 1;
  }
  return computedState;
}

// Dirty markers are just 'potentially' dirty because we don't know if
// dependencies result will change. Pushing a computed to dirty markers doesn't
// mean it will re-evaluate immediately, just marks it for epoch checking in
// #tryGetCached. So the propagation is greedy to mark all dependants as dirty
function pushDirtyMarkers(signalState, context, mutation) {
  var _signalState$mounted$, _signalState$mounted;
  var queue = Array.from((_signalState$mounted$ = (_signalState$mounted = signalState.mounted) === null || _signalState$mounted === void 0 ? void 0 : _signalState$mounted.readDepts) !== null && _signalState$mounted$ !== void 0 ? _signalState$mounted$ : []);
  while (queue.length > 0) {
    var nextQueue = [];
    var _iterator = _createForOfIteratorHelper(queue),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var computed$ = _step.value;
        mutation.potentialDirtyIds.add(computed$.id);
        var computedState = context.stateMap.get(computed$);
        // This computed$ is read from other computed$'s readDepts, so it must not be null and must have mounted
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        var _iterator2 = _createForOfIteratorHelper(computedState.mounted.readDepts),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var dep = _step2.value;
            nextQueue.push(dep);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    queue = nextQueue;
  }
}
function pullEvaluate(readComputed, signalState, context, mutation) {
  var _signalState$mounted$2, _signalState$mounted2, _signalState$mounted$3, _signalState$mounted3;
  var queue = Array.from((_signalState$mounted$2 = (_signalState$mounted2 = signalState.mounted) === null || _signalState$mounted2 === void 0 ? void 0 : _signalState$mounted2.readDepts) !== null && _signalState$mounted$2 !== void 0 ? _signalState$mounted$2 : []);
  var oldValues = new Map();
  var oldErrors = new Map();
  while (queue.length > 0) {
    var nextQueue = [];
    var _iterator3 = _createForOfIteratorHelper(queue),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _context$stateMap$get;
        var computed$ = _step3.value;
        var oldState = context.stateMap.get(computed$);
        oldValues.set(computed$, oldState === null || oldState === void 0 ? void 0 : oldState.val);
        oldErrors.set(computed$, oldState === null || oldState === void 0 ? void 0 : oldState.error);
        var readDepts = (_context$stateMap$get = context.stateMap.get(computed$)) === null || _context$stateMap$get === void 0 || (_context$stateMap$get = _context$stateMap$get.mounted) === null || _context$stateMap$get === void 0 ? void 0 : _context$stateMap$get.readDepts;
        if (readDepts) {
          for (var _i = 0, _Array$from = Array.from(readDepts); _i < _Array$from.length; _i++) {
            var dep = _Array$from[_i];
            nextQueue.push(dep);
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    queue = nextQueue;
  }
  queue = Array.from((_signalState$mounted$3 = (_signalState$mounted3 = signalState.mounted) === null || _signalState$mounted3 === void 0 ? void 0 : _signalState$mounted3.readDepts) !== null && _signalState$mounted$3 !== void 0 ? _signalState$mounted$3 : []);
  while (queue.length > 0) {
    var _nextQueue = [];
    var _iterator4 = _createForOfIteratorHelper(queue),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _computedState$mounte;
        var _computed$ = _step4.value;
        var computedState = readComputed(_computed$, context, mutation);
        var isSameWithOldValue = !computedState.error && oldValues.has(_computed$) && oldValues.get(_computed$) === computedState.val;
        var isSameError = computedState.error && Boolean(oldErrors.get(_computed$));
        if (isSameWithOldValue || isSameError) {
          continue;
        }
        var _readDepts = (_computedState$mounte = computedState.mounted) === null || _computedState$mounte === void 0 ? void 0 : _computedState$mounte.readDepts;
        if (_readDepts) {
          for (var _i2 = 0, _Array$from2 = Array.from(_readDepts); _i2 < _Array$from2.length; _i2++) {
            var _dep = _Array$from2[_i2];
            _nextQueue.push(_dep);
          }
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    queue = _nextQueue;
  }
}
function propagationChanges(readComputed, signalState, context, mutation) {
  pushDirtyMarkers(signalState, context, mutation);
  pullEvaluate(readComputed, signalState, context, mutation);
}
function innerSetState(readComputed, signal$, context, mutation, val) {
  var newValue;
  if (typeof val === 'function') {
    var _ref, _context$stateMap$get2;
    var updater = val;
    newValue = updater((_ref = (_context$stateMap$get2 = context.stateMap.get(signal$)) === null || _context$stateMap$get2 === void 0 ? void 0 : _context$stateMap$get2.val) !== null && _ref !== void 0 ? _ref : signal$.init);
  } else {
    newValue = val;
  }
  if (shouldDistinct(signal$, newValue, context)) {
    return;
  }
  var signalState = context.stateMap.get(signal$);
  if (!signalState) {
    context.stateMap.set(signal$, {
      val: newValue,
      epoch: 0
    });
    return;
  }
  signalState.val = newValue;
  signalState.epoch += 1;
  propagationChanges(readComputed, signalState, context, mutation);
  return undefined;
}
function set(readComputed, writable$, context, mutation) {
  if ('read' in writable$) {
    return;
  }
  for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }
  if ('write' in writable$) {
    return writable$.write.apply(writable$, [mutation.visitor].concat(args));
  }
  innerSetState(readComputed, writable$, context, mutation, args[0]);
  return;
}

/**
 * Creates a mutation operation context. The Mutation remains unique throughout
 * the mutation cycle and can track side effects produced by this mutation operation
 *
 * This tracking is implemented by coloring the visitor function, so the Mutation
 * needs to wrap get & set functions and ensure that all get & set operations
 * executed in the mutation context come from the same Mutation
 *
 * @param context
 * @param get
 * @param set
 * @returns
 */
function createMutation(context, _get, _set) {
  var mutation = {
    potentialDirtyIds: new Set(),
    visitor: {
      get: function get(signal$) {
        return _get(signal$, context, mutation);
      },
      set: function set(signal$) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        return _set.apply(void 0, [signal$, context].concat(args));
      }
    }
  };
  return mutation;
}

function readState(state, context) {
  var atomState = context.stateMap.get(state);
  if (!atomState) {
    var initState = {
      val: state.init,
      epoch: 0
    };
    context.stateMap.set(state, initState);
    return initState;
  }
  return atomState;
}

function unmountComputedDependencies(computed$, computedState, context, mutation) {
  for (var _i = 0, _Array$from = Array.from(computedState.dependencies); _i < _Array$from.length; _i++) {
    var _context$stateMap$get;
    var _Array$from$_i = _slicedToArray(_Array$from[_i], 1),
      dep = _Array$from$_i[0];
    (_context$stateMap$get = context.stateMap.get(dep)) === null || _context$stateMap$get === void 0 || (_context$stateMap$get = _context$stateMap$get.mounted) === null || _context$stateMap$get === void 0 || _context$stateMap$get.readDepts["delete"](computed$);
    unmount(dep, context);
  }
}
function mountComputedDependencies(readSignal, computed$, computedState, context, mutation) {
  for (var _i2 = 0, _Array$from2 = Array.from(computedState.dependencies); _i2 < _Array$from2.length; _i2++) {
    var _Array$from2$_i = _slicedToArray(_Array$from2[_i2], 1),
      dep = _Array$from2$_i[0];
    var mounted = mount$1(readSignal, dep, context, mutation);
    mounted.readDepts.add(computed$);
  }
}
function initMount(readSignal, signal$, context, mutation) {
  var _context$interceptor, _context$interceptor$;
  (_context$interceptor = context.interceptor) === null || _context$interceptor === void 0 || (_context$interceptor$ = _context$interceptor.mount) === null || _context$interceptor$ === void 0 || _context$interceptor$.call(_context$interceptor, signal$);
  var signalState = readSignal(signal$, context, mutation);
  signalState.mounted = {
    readDepts: new Set()
  };
  if (isComputedState(signalState)) {
    mountComputedDependencies(readSignal, signal$, signalState, context, mutation);
  }
  return signalState.mounted;
}
function mount$1(readSignal, signal$, context, mutation) {
  var _context$stateMap$get2;
  var mounted = (_context$stateMap$get2 = context.stateMap.get(signal$)) === null || _context$stateMap$get2 === void 0 ? void 0 : _context$stateMap$get2.mounted;
  if (mounted) {
    return mounted;
  }
  return initMount(readSignal, signal$, context, mutation);
}
function doUnmount(signal$, signalState, context, mutation) {
  var _context$interceptor2, _context$interceptor3;
  (_context$interceptor2 = context.interceptor) === null || _context$interceptor2 === void 0 || (_context$interceptor3 = _context$interceptor2.unmount) === null || _context$interceptor3 === void 0 || _context$interceptor3.call(_context$interceptor2, signal$);
  if (isComputedState(signalState)) {
    unmountComputedDependencies(signal$, signalState, context);
  }
  signalState.mounted = undefined;
}
function unmount(signal$, context, mutation) {
  var signalState = context.stateMap.get(signal$);
  if (!(signalState !== null && signalState !== void 0 && signalState.mounted) || signalState.mounted.readDepts.size) {
    return;
  }
  doUnmount(signal$, signalState, context);
}

var _readComputed = function readComputed(computed$, context, mutation) {
  var _context$interceptor;
  var cachedState = tryGetCached(_readComputed, computed$, context, mutation);
  if (cachedState) {
    return cachedState;
  }
  return withComputedInterceptor(function () {
    return evaluateComputed(readSignal, mount, unmount, computed$, context, mutation);
  }, computed$, (_context$interceptor = context.interceptor) === null || _context$interceptor === void 0 ? void 0 : _context$interceptor.computed);
};
function readSignal(signal$, context, mutation) {
  if (canReadAsCompute(signal$)) {
    return _readComputed(signal$, context, mutation);
  }
  return readState(signal$, context);
}
function mount(signal$, context, mutation) {
  return mount$1(readSignal, signal$, context, mutation);
}
var storeGet = function storeGet(signal, context, mutation) {
  var _context$interceptor2;
  return withGetInterceptor(function () {
    var signalState = readSignal(signal, context, mutation);
    if ('error' in signalState) {
      throw signalState.error;
    }
    return signalState.val;
  }, signal, (_context$interceptor2 = context.interceptor) === null || _context$interceptor2 === void 0 ? void 0 : _context$interceptor2.get);
};
var _storeSet = function storeSet(atom, context) {
  var _context$interceptor3;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return withSetInterceptor.apply(void 0, [function () {
    var mutation = createMutation(context, storeGet, _storeSet);
    return set.apply(void 0, [_readComputed, atom, context, mutation].concat(args));
  }, atom, (_context$interceptor3 = context.interceptor) === null || _context$interceptor3 === void 0 ? void 0 : _context$interceptor3.set].concat(args));
};
var storeWatch = function storeWatch(watchFn, context, options) {
  var _options$signal;
  var computed$ = computed(function (get, _ref) {
    var signal = _ref.signal;
    var childSignal;
    var obOptions = {
      get signal() {
        if (!childSignal) {
          childSignal = options !== null && options !== void 0 && options.signal ? AbortSignal.any([options.signal, signal]) : signal;
        }
        return childSignal;
      }
    };
    watchFn(get, obOptions);
  }, {
    debugLabel: options === null || options === void 0 ? void 0 : options.debugLabel
  });
  mount$1(readSignal, computed$, context);
  options === null || options === void 0 || (_options$signal = options.signal) === null || _options$signal === void 0 || _options$signal.addEventListener('abort', function () {
    unmount(computed$, context);
  }, {
    once: true
  });
};
var StoreImpl = /*#__PURE__*/_createClass(function StoreImpl(_options) {
  var _this = this,
    _this$options;
  _classCallCheck(this, StoreImpl);
  _defineProperty(this, "stateMap", new WeakMap());
  _defineProperty(this, "get", function (atom) {
    return storeGet(atom, _this.context);
  });
  _defineProperty(this, "set", function (atom) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return _storeSet.apply(void 0, [atom, _this.context].concat(args));
  });
  _defineProperty(this, "watch", function (watchFn, options) {
    storeWatch(watchFn, _this.context, options);
  });
  this.options = _options;
  this.context = {
    stateMap: this.stateMap,
    interceptor: (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.interceptor
  };
});
function createStore() {
  return new StoreImpl();
}

var DebugStoreImpl = /*#__PURE__*/function (_StoreImpl) {
  function DebugStoreImpl() {
    var _this;
    _classCallCheck(this, DebugStoreImpl);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DebugStoreImpl, [].concat(args));
    _defineProperty(_this, "getReadDependencies", function (atom) {
      var atomState = _this.context.stateMap.get(atom);
      if (!atomState) {
        return [atom];
      }
      if (!('dependencies' in atomState)) {
        return [atom];
      }
      return [atom].concat(_toConsumableArray(Array.from(atomState.dependencies).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          key = _ref2[0];
        return _this.getReadDependencies(key);
      })));
    });
    _defineProperty(_this, "getReadDependents", function (atom) {
      var _atomState$mounted$re, _atomState$mounted;
      var atomState = _this.context.stateMap.get(atom);
      if (!atomState) {
        return [atom];
      }
      return [atom].concat(_toConsumableArray(Array.from((_atomState$mounted$re = (_atomState$mounted = atomState.mounted) === null || _atomState$mounted === void 0 ? void 0 : _atomState$mounted.readDepts) !== null && _atomState$mounted$re !== void 0 ? _atomState$mounted$re : []).map(function (key) {
        return _this.getReadDependents(key);
      })));
    });
    _defineProperty(_this, "isMounted", function (atom) {
      var mountState = _this.stateMap.get(atom);
      return (mountState === null || mountState === void 0 ? void 0 : mountState.mounted) !== undefined;
    });
    _defineProperty(_this, "getDependenciesGraph", function (computed$) {
      var stateMap = _this.context.stateMap;
      function fillDependenciesGraph(computed$, result) {
        var computedState = stateMap.get(computed$);
        var _iterator = _createForOfIteratorHelper(computedState.dependencies.entries()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
              child$ = _step$value[0],
              epoch = _step$value[1];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
            var childState = stateMap.get(child$);
            result.push([{
              signal: computed$,
              val: computedState.val,
              epoch: computedState.epoch
            }, {
              signal: child$,
              val: childState.val,
              epoch: childState.epoch
            }, epoch]);
            if (canReadAsCompute(child$)) {
              fillDependenciesGraph(child$, result);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      var result = [];
      fillDependenciesGraph(computed$, result);
      return result;
    });
    return _this;
  }
  _inherits(DebugStoreImpl, _StoreImpl);
  return _createClass(DebugStoreImpl);
}(StoreImpl);
function createDebugStoreInternal(interceptor) {
  return new DebugStoreImpl({
    interceptor: interceptor
  });
}

var ConsoleInterceptor = /*#__PURE__*/_createClass(function ConsoleInterceptor(watches) {
  var _this = this;
  _classCallCheck(this, ConsoleInterceptor);
  _defineProperty(this, "shouldLog", function (atom, action) {
    return _this.watches.some(function (watch) {
      var atomMatched = false;
      if (typeof watch.target === 'string') {
        atomMatched = atom.toString().includes(watch.target);
      } else if (watch.target instanceof RegExp) {
        atomMatched = watch.target.test(atom.toString());
      } else {
        atomMatched = watch.target === atom;
      }
      if (!atomMatched) {
        return false;
      }
      return !watch.actions || watch.actions.has(action);
    });
  });
  _defineProperty(this, "get", function (atom$, fn) {
    if (!_this.shouldLog(atom$, 'get')) {
      fn();
      return;
    }
    console.group('[R][GET] ' + atom$.toString());
    console.log('ret:', fn());
    console.groupEnd();
  });
  _defineProperty(this, "computed", function (atom$, fn) {
    if (!_this.shouldLog(atom$, 'computed')) {
      fn();
      return;
    }
    console.group('[R][CPT] ' + atom$.toString());
    console.log('ret:', fn());
    console.groupEnd();
  });
  _defineProperty(this, "set", function (atom$, fn) {
    var _console;
    if (!_this.shouldLog(atom$, 'set')) {
      fn();
      return;
    }
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    (_console = console).group.apply(_console, ['[R][SET] ' + atom$.toString(), '('].concat(args, [')']));
    console.log('ret:', fn());
    console.groupEnd();
  });
  _defineProperty(this, "mount", function (atom$) {
    if (!_this.shouldLog(atom$, 'mount')) {
      return;
    }
    console.log('[R][MNT] ' + atom$.toString());
  });
  _defineProperty(this, "unmount", function (atom$) {
    if (!_this.shouldLog(atom$, 'unmount')) {
      return;
    }
    console.log('[R][UNM] ' + atom$.toString());
  });
  this.watches = watches;
});
function createDebugStore() {
  var watches = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defaultActions = arguments.length > 1 ? arguments[1] : undefined;
  var parsedDefaultActions = defaultActions ? new Set(defaultActions) : undefined;
  var parsedWatches = watches.map(function (watch) {
    if (typeof watch === 'string' || watch instanceof RegExp) {
      return {
        target: watch,
        actions: parsedDefaultActions
      };
    }
    if ('target' in watch) {
      return watch;
    }
    return {
      target: watch,
      actions: parsedDefaultActions
    };
  });
  var interceptor = new ConsoleInterceptor(parsedWatches);
  return createDebugStoreInternal(interceptor);
}

exports.command = command;
exports.computed = computed;
exports.createDebugStore = createDebugStore;
exports.createStore = createStore;
exports.state = state;
//# sourceMappingURL=index.cjs.map
