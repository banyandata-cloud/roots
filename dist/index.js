import * as React from 'react';
import React__default, { useState, forwardRef, createElement, isValidElement, useEffect, useRef, Children, cloneElement, useImperativeHandle, useMemo, useReducer, useLayoutEffect } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';
import emStyled from '@emotion/styled';
import { keyframes } from '@emotion/react';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var propTypes$1 = {exports: {}};

var reactIs$1 = {exports: {}};

var reactIs_production_min$1 = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min$1;

function requireReactIs_production_min$1 () {
	if (hasRequiredReactIs_production_min$1) return reactIs_production_min$1;
	hasRequiredReactIs_production_min$1 = 1;
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min$1.AsyncMode=l;reactIs_production_min$1.ConcurrentMode=m;reactIs_production_min$1.ContextConsumer=k;reactIs_production_min$1.ContextProvider=h;reactIs_production_min$1.Element=c;reactIs_production_min$1.ForwardRef=n;reactIs_production_min$1.Fragment=e;reactIs_production_min$1.Lazy=t;reactIs_production_min$1.Memo=r;reactIs_production_min$1.Portal=d;
	reactIs_production_min$1.Profiler=g;reactIs_production_min$1.StrictMode=f;reactIs_production_min$1.Suspense=p;reactIs_production_min$1.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min$1.isConcurrentMode=A;reactIs_production_min$1.isContextConsumer=function(a){return z(a)===k};reactIs_production_min$1.isContextProvider=function(a){return z(a)===h};reactIs_production_min$1.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min$1.isForwardRef=function(a){return z(a)===n};reactIs_production_min$1.isFragment=function(a){return z(a)===e};reactIs_production_min$1.isLazy=function(a){return z(a)===t};
	reactIs_production_min$1.isMemo=function(a){return z(a)===r};reactIs_production_min$1.isPortal=function(a){return z(a)===d};reactIs_production_min$1.isProfiler=function(a){return z(a)===g};reactIs_production_min$1.isStrictMode=function(a){return z(a)===f};reactIs_production_min$1.isSuspense=function(a){return z(a)===p};
	reactIs_production_min$1.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min$1.typeOf=z;
	return reactIs_production_min$1;
}

var reactIs_development$1 = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development$1;

function requireReactIs_development$1 () {
	if (hasRequiredReactIs_development$1) return reactIs_development$1;
	hasRequiredReactIs_development$1 = 1;



	if (process.env.NODE_ENV !== "production") {
	  (function() {

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	reactIs_development$1.AsyncMode = AsyncMode;
	reactIs_development$1.ConcurrentMode = ConcurrentMode;
	reactIs_development$1.ContextConsumer = ContextConsumer;
	reactIs_development$1.ContextProvider = ContextProvider;
	reactIs_development$1.Element = Element;
	reactIs_development$1.ForwardRef = ForwardRef;
	reactIs_development$1.Fragment = Fragment;
	reactIs_development$1.Lazy = Lazy;
	reactIs_development$1.Memo = Memo;
	reactIs_development$1.Portal = Portal;
	reactIs_development$1.Profiler = Profiler;
	reactIs_development$1.StrictMode = StrictMode;
	reactIs_development$1.Suspense = Suspense;
	reactIs_development$1.isAsyncMode = isAsyncMode;
	reactIs_development$1.isConcurrentMode = isConcurrentMode;
	reactIs_development$1.isContextConsumer = isContextConsumer;
	reactIs_development$1.isContextProvider = isContextProvider;
	reactIs_development$1.isElement = isElement;
	reactIs_development$1.isForwardRef = isForwardRef;
	reactIs_development$1.isFragment = isFragment;
	reactIs_development$1.isLazy = isLazy;
	reactIs_development$1.isMemo = isMemo;
	reactIs_development$1.isPortal = isPortal;
	reactIs_development$1.isProfiler = isProfiler;
	reactIs_development$1.isStrictMode = isStrictMode;
	reactIs_development$1.isSuspense = isSuspense;
	reactIs_development$1.isValidElementType = isValidElementType;
	reactIs_development$1.typeOf = typeOf;
	  })();
	}
	return reactIs_development$1;
}

var hasRequiredReactIs;

function requireReactIs () {
	if (hasRequiredReactIs) return reactIs$1.exports;
	hasRequiredReactIs = 1;
	(function (module) {

		if (process.env.NODE_ENV === 'production') {
		  module.exports = requireReactIs_production_min$1();
		} else {
		  module.exports = requireReactIs_development$1();
		}
} (reactIs$1));
	return reactIs$1.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return objectAssign;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;

function requireReactPropTypesSecret () {
	if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
	hasRequiredReactPropTypesSecret = 1;

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	ReactPropTypesSecret_1 = ReactPropTypesSecret;
	return ReactPropTypesSecret_1;
}

var has;
var hasRequiredHas;

function requireHas () {
	if (hasRequiredHas) return has;
	hasRequiredHas = 1;
	has = Function.call.bind(Object.prototype.hasOwnProperty);
	return has;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var checkPropTypes_1;
var hasRequiredCheckPropTypes;

function requireCheckPropTypes () {
	if (hasRequiredCheckPropTypes) return checkPropTypes_1;
	hasRequiredCheckPropTypes = 1;

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret = requireReactPropTypesSecret();
	  var loggedTypeFailures = {};
	  var has = requireHas();

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) { /**/ }
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
	              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	};

	checkPropTypes_1 = checkPropTypes;
	return checkPropTypes_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;

function requireFactoryWithTypeCheckers () {
	if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
	hasRequiredFactoryWithTypeCheckers = 1;

	var ReactIs = requireReactIs();
	var assign = requireObjectAssign();

	var ReactPropTypesSecret = requireReactPropTypesSecret();
	var has = requireHas();
	var checkPropTypes = requireCheckPropTypes();

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bigint: createPrimitiveTypeChecker('bigint'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message, data) {
	    this.message = message;
	    this.data = data && typeof data === 'object' ? data: {};
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError(
	          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
	          {expectedType: expectedType}
	        );
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var expectedTypes = [];
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
	        if (checkerResult == null) {
	          return null;
	        }
	        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
	          expectedTypes.push(checkerResult.data.expectedType);
	        }
	      }
	      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function invalidValidatorError(componentName, location, propFullName, key, type) {
	    return new PropTypeError(
	      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
	      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
	    );
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (has(shapeTypes, key) && typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithTypeCheckers;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;

function requireFactoryWithThrowingShims () {
	if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
	hasRequiredFactoryWithThrowingShims = 1;

	var ReactPropTypesSecret = requireReactPropTypesSecret();

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	factoryWithThrowingShims = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  }	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithThrowingShims;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = requireReactIs();

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  propTypes$1.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes$1.exports = requireFactoryWithThrowingShims()();
}

// BASE URLS
var auth = process.env.REACT_APP_AUTH_BASE_URL;
var encs = process.env.REACT_APP_ENCS_BASE_URL;
var scos = process.env.REACT_APP_SCOS_BASE_URL;
var aws = process.env.REACT_APP_AWS_BASE_URL;
var gcp = process.env.REACT_APP_GCP_BASE_URL;
var oci = process.env.REACT_APP_OCI_BASE_URL;
var pgsql = process.env.REACT_APP_PGSQL_BASE_URL;
var mysql = process.env.REACT_APP_MYSQL_BASE_URL;
var oracle = process.env.REACT_APP_ORACLE_BASE_URL;
var lmosGcp = process.env.REACT_APP_AUDIT_LOG_GCP_BASE_URL;
var lmosAws = process.env.REACT_APP_AUDIT_LOG_AWS_BASE_URL;
var BASE_URLS = {
  auth: auth,
  encs: encs,
  scos: scos,
  aws: aws,
  gcp: gcp,
  oci: oci,
  'lmos-aws': lmosAws,
  'lmos-gcp': lmosGcp,
  pgsql: pgsql,
  mysql: mysql,
  oracle: oracle
};
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

var sumArrayOfObjects = function sumArrayOfObjects(objects) {
  return objects.reduce(function (acc, cur) {
    var keysOfCurrentObject = Object.keys(cur);
    keysOfCurrentObject.forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(cur, key)) {
        acc[key] = (acc[key] || 0) + cur[key];
      }
    });
    return acc;
  }, {});
};
var getSpacedDisplayName = function getSpacedDisplayName(string) {
  return string === null || string === void 0 ? void 0 : string.replace(/-/g, ' ').replace(/\b\w/g, function (s) {
    return s.toUpperCase();
  });
};
var doubleDigitted = function doubleDigitted(number) {
  return number === null || number === void 0 ? void 0 : number.toString().padStart(2, '0');
};
var getJSDateFromEpoch = function getJSDateFromEpoch(epoch) {
  var date = new Date(0);
  date.setUTCSeconds(epoch);
  return date;
};
var getDateFromEpoch = function getDateFromEpoch(epoch) {
  var date = new Date(0);
  date.setUTCSeconds(epoch);
  var paddedDate = date.getDate().toString().padStart(2, '0');
  var month = MONTHS[date.getMonth()];
  var year = date.getFullYear();
  return "".concat(month, " ").concat(paddedDate, ", ").concat(year);
};
var getTimeFromEpoch = function getTimeFromEpoch(epoch) {
  var date = new Date(0);
  date.setUTCSeconds(epoch);
  var hours = doubleDigitted(date.getHours());
  var minutes = doubleDigitted(date.getMinutes());
  var seconds = doubleDigitted(date.getSeconds());
  return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
};
var uniqueArray = function uniqueArray(array) {
  return _toConsumableArray(new Set(array));
};
var uniqueArrayOfObjects = function uniqueArrayOfObjects() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return array.filter(function (value, index, self) {
    return index === self.findIndex(function (t) {
      return t[key] === value[key];
    });
  });
};
var getInitialsOfName = function getInitialsOfName() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var names = name.split(' ');
  var initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
function safeJSONParse(object) {
  try {
    return JSON.parse(object);
  } catch (error) {
    return null;
  }
}
function cloneDeep(object) {
  return safeJSONParse(JSON.stringify(object));
}
function classes() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.join(' ');
}
function inputHelper(event) {
  var _event$target = event.target,
    dataset = _event$target.dataset,
    type = _event$target.type;
  var fieldName = event.target.name;
  var fieldValue = ['checkbox', 'radio'].includes(type) ? event.target.checked : event.target.value;
  return {
    fieldName: fieldName,
    fieldValue: fieldValue,
    dataset: dataset
  };
}
var getCurrentSearchParams = function getCurrentSearchParams(searchParams) {
  var currentSearchParams = {};
  searchParams === null || searchParams === void 0 ? void 0 : searchParams.forEach(function (value, key) {
    currentSearchParams[key] = value;
  });
  return currentSearchParams;
};
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts 'string' to a property path array
 * @param string} string The string to convert
 * @returns {Array} Returns the property path array
 */
var stringToPath = function stringToPath(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
};

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
var get = function get(object, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var pathArr = null;
  var srcObject = object;
  if (Array.isArray(path)) {
    pathArr = _toConsumableArray(path);
  } else if (typeof path === 'string') {
    pathArr = stringToPath(path);
  } else {
    return defaultValue;
  }
  var index = 0;
  var _pathArr = pathArr,
    length = _pathArr.length;
  while (object != null && index < length) {
    var _srcObject, _key$toString;
    var key = pathArr[index++];
    srcObject = (_srcObject = srcObject) === null || _srcObject === void 0 ? void 0 : _srcObject[key === null || key === void 0 ? void 0 : (_key$toString = key.toString) === null || _key$toString === void 0 ? void 0 : _key$toString.call(key)];
    if (srcObject == null) {
      break;
    }
  }
  return index && index === length && srcObject !== undefined ? srcObject : defaultValue;
};
var getToday = function getToday() {
  var date = new Date();
  var month = FULL_MONTHS[date.getMonth()];
  var monthAsNumber = date.getMonth();
  var year = date.getFullYear();
  var dateAsNumber = date.getDate();
  var day = DAYS[date.getDay()];
  var dayAsNumber = date.getDay();
  return {
    month: month,
    monthAsNumber: monthAsNumber,
    year: year,
    dateAsNumber: dateAsNumber,
    day: day,
    dayAsNumber: dayAsNumber
  };
};
var getDatesInAMonth = function getDatesInAMonth(_ref) {
  var month = _ref.month,
    year = _ref.year;
  var date = new Date(Date.UTC(year, month, 1));
  var dates = [];
  var days = [];
  var dateObj = [];
  while (date.getUTCMonth() === month) {
    var dateNumber = new Date(date).getDate();
    var dayNumber = new Date(date).getDay();
    dates.push(dateNumber);
    days.push(dayNumber);
    dateObj.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return {
    dateObj: dateObj,
    dates: dates,
    days: days
  };
};

var AlertIcon = {
  Info: function Info(props) {
    var className = props.className;
    return /*#__PURE__*/jsx("svg", {
      className: className,
      viewBox: "0 0 20 20",
      fill: "#0F62FE",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/jsx("path", {
        d: "M10 1.25C8.26942 1.25 6.57769 1.76318 5.13876 2.72464C3.69983 3.6861 2.57832 5.05267 1.91606 6.65152C1.25379 8.25037 1.08051 10.0097 1.41813 11.707C1.75575 13.4044 2.58911 14.9635 3.81282 16.1872C5.03653 17.4109 6.59563 18.2442 8.29296 18.5819C9.9903 18.9195 11.7496 18.7462 13.3485 18.0839C14.9473 17.4217 16.3139 16.3002 17.2754 14.8612C18.2368 13.4223 18.75 11.7306 18.75 10C18.75 7.67936 17.8281 5.45376 16.1872 3.81282C14.5462 2.17187 12.3206 1.25 10 1.25ZM10 5C10.1854 5 10.3667 5.05498 10.5209 5.158C10.675 5.26101 10.7952 5.40743 10.8661 5.57873C10.9371 5.75004 10.9557 5.93854 10.9195 6.1204C10.8833 6.30225 10.794 6.4693 10.6629 6.60041C10.5318 6.73152 10.3648 6.82081 10.1829 6.85699C10.001 6.89316 9.81254 6.87459 9.64124 6.80364C9.46993 6.73268 9.32351 6.61252 9.2205 6.45835C9.11749 6.30418 9.0625 6.12292 9.0625 5.9375C9.0625 5.68886 9.16128 5.4504 9.33709 5.27459C9.51291 5.09877 9.75136 5 10 5ZM12.5 15.0781H7.5V13.6719H9.29688V10.0781H8.125V8.67188H10.7031V13.6719H12.5V15.0781Z"
      })
    });
  },
  Warning: function Warning(props) {
    var className = props.className;
    return /*#__PURE__*/jsxs("svg", {
      className: className,
      viewBox: "0 0 20 20",
      fill: "#CBA006",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/jsx("rect", {
        x: "1.25",
        y: "1.25",
        width: "17.5",
        height: "17.5",
        rx: "8.75",
        fill: "white"
      }), /*#__PURE__*/jsx("path", {
        d: "M10 1.25C5.1875 1.25 1.25 5.1875 1.25 10C1.25 14.8125 5.1875 18.75 10 18.75C14.8125 18.75 18.75 14.8125 18.75 10C18.75 5.1875 14.8125 1.25 10 1.25ZM9.3125 5H10.6875V11.875H9.3125V5V5ZM10 15.625C9.5 15.625 9.0625 15.1875 9.0625 14.6875C9.0625 14.1875 9.5 13.75 10 13.75C10.5 13.75 10.9375 14.1875 10.9375 14.6875C10.9375 15.1875 10.5 15.625 10 15.625Z"
      })]
    });
  },
  Success: function Success(props) {
    var className = props.className;
    return /*#__PURE__*/jsx("svg", {
      className: className,
      viewBox: "0 0 20 20",
      fill: "#24A148",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/jsx("path", {
        d: "M10 1.25C8.26942 1.25 6.57769 1.76318 5.13876 2.72464C3.69983 3.6861 2.57832 5.05267 1.91606 6.65152C1.25379 8.25037 1.08051 10.0097 1.41813 11.707C1.75575 13.4044 2.58911 14.9635 3.81282 16.1872C5.03653 17.4109 6.59563 18.2442 8.29296 18.5819C9.9903 18.9195 11.7496 18.7462 13.3485 18.0839C14.9473 17.4217 16.3139 16.3002 17.2754 14.8612C18.2368 13.4223 18.75 11.7306 18.75 10C18.75 7.67936 17.8281 5.45376 16.1872 3.81282C14.5462 2.17187 12.3206 1.25 10 1.25ZM8.75 13.4937L5.625 10.3687L6.61875 9.375L8.75 11.5063L13.3813 6.875L14.3788 7.86625L8.75 13.4937Z"
      })
    });
  },
  Danger: function Danger(props) {
    var className = props.className;
    return /*#__PURE__*/jsx("svg", {
      className: className,
      viewBox: "0 0 20 20",
      fill: "#DA1E28",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/jsx("path", {
        d: "M10.0002 1.24992C8.84911 1.24279 7.70808 1.46424 6.64326 1.90144C5.57844 2.33864 4.61101 2.98289 3.79707 3.79683C2.98314 4.61077 2.33889 5.5782 1.90168 6.64302C1.46448 7.70784 1.24303 8.84886 1.25017 9.99992C1.24303 11.151 1.46448 12.292 1.90168 13.3568C2.33889 14.4216 2.98314 15.3891 3.79707 16.203C4.61101 17.017 5.57844 17.6612 6.64326 18.0984C7.70808 18.5356 8.84911 18.7571 10.0002 18.7499C11.1512 18.7571 12.2923 18.5356 13.3571 18.0984C14.4219 17.6612 15.3893 17.017 16.2033 16.203C17.0172 15.3891 17.6615 14.4216 18.0987 13.3568C18.5359 12.292 18.7573 11.151 18.7502 9.99992C18.7573 8.84886 18.5359 7.70784 18.0987 6.64302C17.6615 5.5782 17.0172 4.61077 16.2033 3.79683C15.3893 2.98289 14.4219 2.33864 13.3571 1.90144C12.2923 1.46424 11.1512 1.24279 10.0002 1.24992ZM13.4033 14.3749L5.62517 6.59742L6.59767 5.62492L14.3752 13.403L13.4033 14.3749Z"
      })
    });
  }
};
AlertIcon.Info.defaultProps = {
  className: ''
};
AlertIcon.Warning.defaultProps = {
  className: ''
};
AlertIcon.Success.defaultProps = {
  className: ''
};
AlertIcon.Danger.defaultProps = {
  className: ''
};

var Caret = function Caret(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 16 17",
    fill: "#161616",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M8 11.5L3 6.50005L3.7 5.80005L8 10.1L12.3 5.80005L13 6.50005L8 11.5Z"
    })
  });
};
Caret.defaultProps = {
  className: ''
};

var Cross = function Cross(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 24 25",
    fill: "black",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M13.4099 12.5002L19.7099 6.21019C19.8982 6.02188 20.004 5.76649 20.004 5.50019C20.004 5.23388 19.8982 4.97849 19.7099 4.79019C19.5216 4.60188 19.2662 4.49609 18.9999 4.49609C18.7336 4.49609 18.4782 4.60188 18.2899 4.79019L11.9999 11.0902L5.70994 4.79019C5.52164 4.60188 5.26624 4.49609 4.99994 4.49609C4.73364 4.49609 4.47824 4.60188 4.28994 4.79019C4.10164 4.97849 3.99585 5.23388 3.99585 5.50019C3.99585 5.76649 4.10164 6.02188 4.28994 6.21019L10.5899 12.5002L4.28994 18.7902C4.19621 18.8831 4.12182 18.9937 4.07105 19.1156C4.02028 19.2375 3.99414 19.3682 3.99414 19.5002C3.99414 19.6322 4.02028 19.7629 4.07105 19.8848C4.12182 20.0066 4.19621 20.1172 4.28994 20.2102C4.3829 20.3039 4.4935 20.3783 4.61536 20.4291C4.73722 20.4798 4.86793 20.506 4.99994 20.506C5.13195 20.506 5.26266 20.4798 5.38452 20.4291C5.50638 20.3783 5.61698 20.3039 5.70994 20.2102L11.9999 13.9102L18.2899 20.2102C18.3829 20.3039 18.4935 20.3783 18.6154 20.4291C18.7372 20.4798 18.8679 20.506 18.9999 20.506C19.132 20.506 19.2627 20.4798 19.3845 20.4291C19.5064 20.3783 19.617 20.3039 19.7099 20.2102C19.8037 20.1172 19.8781 20.0066 19.9288 19.8848C19.9796 19.7629 20.0057 19.6322 20.0057 19.5002C20.0057 19.3682 19.9796 19.2375 19.9288 19.1156C19.8781 18.9937 19.8037 18.8831 19.7099 18.7902L13.4099 12.5002Z"
    })
  });
};
Cross.defaultProps = {
  className: ''
};

var Tick = function Tick(props) {
  var className = props.className;
  return /*#__PURE__*/jsxs("svg", {
    className: className,
    viewBox: "0 0 13 12",
    fill: "#0F62FE",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/jsx("g", {
      clipPath: "url(#clip0_638_154)",
      children: /*#__PURE__*/jsx("path", {
        d: "M11.6911 1.6875H10.7549C10.6237 1.6875 10.4991 1.74777 10.4188 1.85089L4.89691 8.84598L2.24914 5.49107C2.20908 5.44022 2.15803 5.3991 2.09981 5.3708C2.04159 5.3425 1.97771 5.32776 1.91298 5.32768H0.976817C0.887085 5.32768 0.837531 5.4308 0.892442 5.50045L4.56075 10.1478C4.73217 10.3647 5.06164 10.3647 5.23441 10.1478L11.7755 1.85893C11.8304 1.79063 11.7808 1.6875 11.6911 1.6875Z"
      })
    }), /*#__PURE__*/jsx("defs", {
      children: /*#__PURE__*/jsx("clipPath", {
        id: "clip0_638_154",
        children: /*#__PURE__*/jsx("rect", {
          width: "12",
          height: "12",
          fill: "white",
          transform: "translate(0.333344)"
        })
      })
    })]
  });
};
Tick.defaultProps = {
  className: ''
};

var BreadcrumbSeperator = function BreadcrumbSeperator(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    "data-elem": "breadcrumb-seperator-icon",
    viewBox: "0 0 24 24",
    stroke: "black",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M14.4809 3.88548L9.51916 20.1145",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
};
BreadcrumbSeperator.defaultProps = {
  className: ''
};

var Calender$1 = function Calender(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    width: "20",
    height: "23",
    viewBox: "0 0 20 23",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M10 18.4966C10.1978 18.4966 10.3911 18.4379 10.5556 18.3281C10.72 18.2182 10.8482 18.062 10.9239 17.8793C10.9996 17.6965 11.0194 17.4955 10.9808 17.3015C10.9422 17.1075 10.847 16.9293 10.7071 16.7895C10.5673 16.6496 10.3891 16.5544 10.1951 16.5158C10.0011 16.4772 9.80004 16.497 9.61732 16.5727C9.43459 16.6484 9.27841 16.7766 9.16853 16.941C9.05865 17.1055 9 17.2988 9 17.4966C9 17.7618 9.10536 18.0162 9.29289 18.2037C9.48043 18.3912 9.73478 18.4966 10 18.4966ZM15 18.4966C15.1978 18.4966 15.3911 18.4379 15.5556 18.3281C15.72 18.2182 15.8482 18.062 15.9239 17.8793C15.9996 17.6965 16.0194 17.4955 15.9808 17.3015C15.9422 17.1075 15.847 16.9293 15.7071 16.7895C15.5673 16.6496 15.3891 16.5544 15.1951 16.5158C15.0011 16.4772 14.8 16.497 14.6173 16.5727C14.4346 16.6484 14.2784 16.7766 14.1685 16.941C14.0586 17.1055 14 17.2988 14 17.4966C14 17.7618 14.1054 18.0162 14.2929 18.2037C14.4804 18.3912 14.7348 18.4966 15 18.4966ZM15 14.4966C15.1978 14.4966 15.3911 14.4379 15.5556 14.3281C15.72 14.2182 15.8482 14.062 15.9239 13.8793C15.9996 13.6965 16.0194 13.4955 15.9808 13.3015C15.9422 13.1075 15.847 12.9293 15.7071 12.7895C15.5673 12.6496 15.3891 12.5544 15.1951 12.5158C15.0011 12.4772 14.8 12.497 14.6173 12.5727C14.4346 12.6484 14.2784 12.7766 14.1685 12.941C14.0586 13.1055 14 13.2988 14 13.4966C14 13.7618 14.1054 14.0162 14.2929 14.2037C14.4804 14.3912 14.7348 14.4966 15 14.4966ZM10 14.4966C10.1978 14.4966 10.3911 14.4379 10.5556 14.3281C10.72 14.2182 10.8482 14.062 10.9239 13.8793C10.9996 13.6965 11.0194 13.4955 10.9808 13.3015C10.9422 13.1075 10.847 12.9293 10.7071 12.7895C10.5673 12.6496 10.3891 12.5544 10.1951 12.5158C10.0011 12.4772 9.80004 12.497 9.61732 12.5727C9.43459 12.6484 9.27841 12.7766 9.16853 12.941C9.05865 13.1055 9 13.2988 9 13.4966C9 13.7618 9.10536 14.0162 9.29289 14.2037C9.48043 14.3912 9.73478 14.4966 10 14.4966ZM17 2.49658H16V1.49658C16 1.23137 15.8946 0.977012 15.7071 0.789475C15.5196 0.601939 15.2652 0.496582 15 0.496582C14.7348 0.496582 14.4804 0.601939 14.2929 0.789475C14.1054 0.977012 14 1.23137 14 1.49658V2.49658H6V1.49658C6 1.23137 5.89464 0.977012 5.70711 0.789475C5.51957 0.601939 5.26522 0.496582 5 0.496582C4.73478 0.496582 4.48043 0.601939 4.29289 0.789475C4.10536 0.977012 4 1.23137 4 1.49658V2.49658H3C2.20435 2.49658 1.44129 2.81265 0.87868 3.37526C0.316071 3.93787 0 4.70093 0 5.49658V19.4966C0 20.2922 0.316071 21.0553 0.87868 21.6179C1.44129 22.1805 2.20435 22.4966 3 22.4966H17C17.7956 22.4966 18.5587 22.1805 19.1213 21.6179C19.6839 21.0553 20 20.2922 20 19.4966V5.49658C20 4.70093 19.6839 3.93787 19.1213 3.37526C18.5587 2.81265 17.7956 2.49658 17 2.49658ZM18 19.4966C18 19.7618 17.8946 20.0162 17.7071 20.2037C17.5196 20.3912 17.2652 20.4966 17 20.4966H3C2.73478 20.4966 2.48043 20.3912 2.29289 20.2037C2.10536 20.0162 2 19.7618 2 19.4966V10.4966H18V19.4966ZM18 8.49658H2V5.49658C2 5.23137 2.10536 4.97701 2.29289 4.78948C2.48043 4.60194 2.73478 4.49658 3 4.49658H4V5.49658C4 5.7618 4.10536 6.01615 4.29289 6.20369C4.48043 6.39122 4.73478 6.49658 5 6.49658C5.26522 6.49658 5.51957 6.39122 5.70711 6.20369C5.89464 6.01615 6 5.7618 6 5.49658V4.49658H14V5.49658C14 5.7618 14.1054 6.01615 14.2929 6.20369C14.4804 6.39122 14.7348 6.49658 15 6.49658C15.2652 6.49658 15.5196 6.39122 15.7071 6.20369C15.8946 6.01615 16 5.7618 16 5.49658V4.49658H17C17.2652 4.49658 17.5196 4.60194 17.7071 4.78948C17.8946 4.97701 18 5.23137 18 5.49658V8.49658ZM5 14.4966C5.19778 14.4966 5.39112 14.4379 5.55557 14.3281C5.72002 14.2182 5.84819 14.062 5.92388 13.8793C5.99957 13.6965 6.01937 13.4955 5.98079 13.3015C5.9422 13.1075 5.84696 12.9293 5.70711 12.7895C5.56725 12.6496 5.38907 12.5544 5.19509 12.5158C5.00111 12.4772 4.80004 12.497 4.61732 12.5727C4.43459 12.6484 4.27841 12.7766 4.16853 12.941C4.05865 13.1055 4 13.2988 4 13.4966C4 13.7618 4.10536 14.0162 4.29289 14.2037C4.48043 14.3912 4.73478 14.4966 5 14.4966ZM5 18.4966C5.19778 18.4966 5.39112 18.4379 5.55557 18.3281C5.72002 18.2182 5.84819 18.062 5.92388 17.8793C5.99957 17.6965 6.01937 17.4955 5.98079 17.3015C5.9422 17.1075 5.84696 16.9293 5.70711 16.7895C5.56725 16.6496 5.38907 16.5544 5.19509 16.5158C5.00111 16.4772 4.80004 16.497 4.61732 16.5727C4.43459 16.6484 4.27841 16.7766 4.16853 16.941C4.05865 17.1055 4 17.2988 4 17.4966C4 17.7618 4.10536 18.0162 4.29289 18.2037C4.48043 18.3912 4.73478 18.4966 5 18.4966Z",
      fill: "#333333"
    })
  });
};
Calender$1.defaultProps = {
  className: ''
};

var Copy = function Copy(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 16 17",
    fill: "#161616",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M2 9.5H1V2.5C1 1.94772 1.44772 1.5 2 1.5H9V2.5H2V9.5ZM14 5.5V14.5H5V5.5H14ZM5 4.5H14C14.5523 4.5 15 4.94772 15 5.5V14.5C15 15.0523 14.5523 15.5 14 15.5H5C4.44772 15.5 4 15.0523 4 14.5V5.5C4 4.94772 4.44772 4.5 5 4.5Z"
    })
  });
};
Copy.defaultProps = {
  className: ''
};

var Download = function Download(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 24 25",
    fill: "#737373",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M8.29 13.79C8.19627 13.883 8.12188 13.9936 8.07111 14.1154C8.02034 14.2373 7.9942 14.368 7.9942 14.5C7.9942 14.632 8.02034 14.7627 8.07111 14.8846C8.12188 15.0064 8.19627 15.117 8.29 15.21L11.29 18.21C11.383 18.3037 11.4936 18.3781 11.6154 18.4289C11.7373 18.4797 11.868 18.5058 12 18.5058C12.132 18.5058 12.2627 18.4797 12.3846 18.4289C12.5064 18.3781 12.617 18.3037 12.71 18.21L15.71 15.21C15.8983 15.0217 16.0041 14.7663 16.0041 14.5C16.0041 14.2337 15.8983 13.9783 15.71 13.79C15.5217 13.6017 15.2663 13.4959 15 13.4959C14.7337 13.4959 14.4783 13.6017 14.29 13.79L13 15.09V3.5C13 3.23478 12.8946 2.98043 12.7071 2.79289C12.5196 2.60536 12.2652 2.5 12 2.5C11.7348 2.5 11.4804 2.60536 11.2929 2.79289C11.1054 2.98043 11 3.23478 11 3.5V15.09L9.71 13.79C9.61704 13.6963 9.50644 13.6219 9.38458 13.5711C9.26272 13.5203 9.13201 13.4942 9 13.4942C8.86799 13.4942 8.73728 13.5203 8.61542 13.5711C8.49356 13.6219 8.38296 13.6963 8.29 13.79ZM18 9.5H16C15.7348 9.5 15.4804 9.60536 15.2929 9.79289C15.1054 9.98043 15 10.2348 15 10.5C15 10.7652 15.1054 11.0196 15.2929 11.2071C15.4804 11.3946 15.7348 11.5 16 11.5H18C18.2652 11.5 18.5196 11.6054 18.7071 11.7929C18.8946 11.9804 19 12.2348 19 12.5V19.5C19 19.7652 18.8946 20.0196 18.7071 20.2071C18.5196 20.3946 18.2652 20.5 18 20.5H6C5.73478 20.5 5.48043 20.3946 5.29289 20.2071C5.10536 20.0196 5 19.7652 5 19.5V12.5C5 12.2348 5.10536 11.9804 5.29289 11.7929C5.48043 11.6054 5.73478 11.5 6 11.5H8C8.26522 11.5 8.51957 11.3946 8.70711 11.2071C8.89464 11.0196 9 10.7652 9 10.5C9 10.2348 8.89464 9.98043 8.70711 9.79289C8.51957 9.60536 8.26522 9.5 8 9.5H6C5.20435 9.5 4.44129 9.81607 3.87868 10.3787C3.31607 10.9413 3 11.7044 3 12.5V19.5C3 20.2956 3.31607 21.0587 3.87868 21.6213C4.44129 22.1839 5.20435 22.5 6 22.5H18C18.7956 22.5 19.5587 22.1839 20.1213 21.6213C20.6839 21.0587 21 20.2956 21 19.5V12.5C21 11.7044 20.6839 10.9413 20.1213 10.3787C19.5587 9.81607 18.7956 9.5 18 9.5Z"
    })
  });
};
Download.defaultProps = {
  className: ''
};

var CheckboxIcon = {
  Checked: function Checked(props) {
    var className = props.className;
    return /*#__PURE__*/jsxs("svg", {
      className: className,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/jsx("rect", {
        x: "0.7",
        y: "0.7",
        width: "22.6",
        height: "22.6",
        rx: "1.3",
        fill: "#2871E6"
      }), /*#__PURE__*/jsx("path", {
        d: "M20 6L9 17L4 12",
        stroke: "white",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), /*#__PURE__*/jsx("rect", {
        x: "0.7",
        y: "0.7",
        width: "22.6",
        height: "22.6",
        rx: "1.3",
        stroke: "#2871E6",
        strokeWidth: "1.4"
      })]
    });
  },
  UnChecked: function UnChecked(props) {
    var className = props.className;
    return /*#__PURE__*/jsx("svg", {
      className: className,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/jsx("rect", {
        x: "0.7",
        y: "0.7",
        width: "22.6",
        height: "22.6",
        rx: "1.3",
        stroke: "#AEB3BC",
        strokeWidth: "1.4"
      })
    });
  }
};
CheckboxIcon.Checked.defaultProps = {
  className: ''
};
CheckboxIcon.UnChecked.defaultProps = {
  className: ''
};

var RadioIcon = {
  Checked: function Checked(props) {
    var className = props.className;
    return /*#__PURE__*/jsxs("svg", {
      className: className,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/jsx("circle", {
        cx: "12",
        cy: "12",
        r: "11.3",
        fill: "#2871E6",
        stroke: "#2871E6",
        strokeWidth: "1.4"
      }), /*#__PURE__*/jsx("circle", {
        cx: "12",
        cy: "12",
        r: "6",
        fill: "white"
      })]
    });
  },
  UnChecked: function UnChecked(props) {
    var className = props.className;
    return /*#__PURE__*/jsx("svg", {
      className: className,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/jsx("circle", {
        cx: "12",
        cy: "12",
        r: "11.3",
        stroke: "#AEB3BC",
        strokeWidth: "1.4"
      })
    });
  }
};
RadioIcon.Checked.defaultProps = {
  className: ''
};
RadioIcon.UnChecked.defaultProps = {
  className: ''
};

var Server = function Server(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "#333333",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M9.99998 11.3333C9.86812 11.3333 9.73923 11.3724 9.6296 11.4457C9.51997 11.5189 9.43452 11.623 9.38406 11.7449C9.3336 11.8667 9.3204 12.0007 9.34612 12.13C9.37185 12.2594 9.43534 12.3781 9.52857 12.4714C9.62181 12.5646 9.7406 12.6281 9.86992 12.6538C9.99924 12.6796 10.1333 12.6664 10.2551 12.6159C10.3769 12.5654 10.481 12.48 10.5543 12.3704C10.6275 12.2607 10.6666 12.1318 10.6666 12C10.6666 11.8232 10.5964 11.6536 10.4714 11.5286C10.3464 11.4036 10.1768 11.3333 9.99998 11.3333ZM5.99998 11.3333H3.99998C3.82317 11.3333 3.6536 11.4036 3.52858 11.5286C3.40355 11.6536 3.33331 11.8232 3.33331 12C3.33331 12.1768 3.40355 12.3464 3.52858 12.4714C3.6536 12.5964 3.82317 12.6666 3.99998 12.6666H5.99998C6.17679 12.6666 6.34636 12.5964 6.47138 12.4714C6.59641 12.3464 6.66665 12.1768 6.66665 12C6.66665 11.8232 6.59641 11.6536 6.47138 11.5286C6.34636 11.4036 6.17679 11.3333 5.99998 11.3333ZM12 11.3333C11.8681 11.3333 11.7392 11.3724 11.6296 11.4457C11.52 11.5189 11.4345 11.623 11.3841 11.7449C11.3336 11.8667 11.3204 12.0007 11.3461 12.13C11.3718 12.2594 11.4353 12.3781 11.5286 12.4714C11.6218 12.5646 11.7406 12.6281 11.8699 12.6538C11.9992 12.6796 12.1333 12.6664 12.2551 12.6159C12.3769 12.5654 12.481 12.48 12.5543 12.3704C12.6275 12.2607 12.6666 12.1318 12.6666 12C12.6666 11.8232 12.5964 11.6536 12.4714 11.5286C12.3464 11.4036 12.1768 11.3333 12 11.3333ZM9.99998 7.33331C9.86812 7.33331 9.73923 7.37241 9.6296 7.44567C9.51997 7.51892 9.43452 7.62304 9.38406 7.74486C9.3336 7.86667 9.3204 8.00072 9.34612 8.13004C9.37185 8.25936 9.43534 8.37815 9.52857 8.47138C9.62181 8.56462 9.7406 8.62811 9.86992 8.65384C9.99924 8.67956 10.1333 8.66636 10.2551 8.6159C10.3769 8.56544 10.481 8.47999 10.5543 8.37036C10.6275 8.26073 10.6666 8.13183 10.6666 7.99998C10.6666 7.82317 10.5964 7.6536 10.4714 7.52857C10.3464 7.40355 10.1768 7.33331 9.99998 7.33331ZM5.99998 7.33331H3.99998C3.82317 7.33331 3.6536 7.40355 3.52858 7.52857C3.40355 7.6536 3.33331 7.82317 3.33331 7.99998C3.33331 8.17679 3.40355 8.34636 3.52858 8.47138C3.6536 8.59641 3.82317 8.66665 3.99998 8.66665H5.99998C6.17679 8.66665 6.34636 8.59641 6.47138 8.47138C6.59641 8.34636 6.66665 8.17679 6.66665 7.99998C6.66665 7.82317 6.59641 7.6536 6.47138 7.52857C6.34636 7.40355 6.17679 7.33331 5.99998 7.33331ZM12 3.33331C11.8681 3.33331 11.7392 3.37241 11.6296 3.44567C11.52 3.51892 11.4345 3.62304 11.3841 3.74486C11.3336 3.86667 11.3204 4.00072 11.3461 4.13004C11.3718 4.25936 11.4353 4.37815 11.5286 4.47138C11.6218 4.56462 11.7406 4.62811 11.8699 4.65384C11.9992 4.67956 12.1333 4.66636 12.2551 4.6159C12.3769 4.56544 12.481 4.47999 12.5543 4.37036C12.6275 4.26073 12.6666 4.13183 12.6666 3.99998C12.6666 3.82317 12.5964 3.6536 12.4714 3.52858C12.3464 3.40355 12.1768 3.33331 12 3.33331ZM12 7.33331C11.8681 7.33331 11.7392 7.37241 11.6296 7.44567C11.52 7.51892 11.4345 7.62304 11.3841 7.74486C11.3336 7.86667 11.3204 8.00072 11.3461 8.13004C11.3718 8.25936 11.4353 8.37815 11.5286 8.47138C11.6218 8.56462 11.7406 8.62811 11.8699 8.65384C11.9992 8.67956 12.1333 8.66636 12.2551 8.6159C12.3769 8.56544 12.481 8.47999 12.5543 8.37036C12.6275 8.26073 12.6666 8.13183 12.6666 7.99998C12.6666 7.82317 12.5964 7.6536 12.4714 7.52857C12.3464 7.40355 12.1768 7.33331 12 7.33331ZM14.6666 3.33331C14.6666 2.80288 14.4559 2.29417 14.0809 1.9191C13.7058 1.54403 13.1971 1.33331 12.6666 1.33331H3.33331C2.80288 1.33331 2.29417 1.54403 1.9191 1.9191C1.54403 2.29417 1.33331 2.80288 1.33331 3.33331V4.66665C1.33625 5.16002 1.52145 5.63489 1.85331 5.99998C1.52145 6.36507 1.33625 6.83994 1.33331 7.33331V8.66665C1.33625 9.16002 1.52145 9.63489 1.85331 9.99998C1.52145 10.3651 1.33625 10.8399 1.33331 11.3333V12.6666C1.33331 13.1971 1.54403 13.7058 1.9191 14.0809C2.29417 14.4559 2.80288 14.6666 3.33331 14.6666H12.6666C13.1971 14.6666 13.7058 14.4559 14.0809 14.0809C14.4559 13.7058 14.6666 13.1971 14.6666 12.6666V11.3333C14.6637 10.8399 14.4785 10.3651 14.1466 9.99998C14.4785 9.63489 14.6637 9.16002 14.6666 8.66665V7.33331C14.6637 6.83994 14.4785 6.36507 14.1466 5.99998C14.4785 5.63489 14.6637 5.16002 14.6666 4.66665V3.33331ZM13.3333 12.6666C13.3333 12.8435 13.2631 13.013 13.1381 13.1381C13.013 13.2631 12.8435 13.3333 12.6666 13.3333H3.33331C3.1565 13.3333 2.98693 13.2631 2.86191 13.1381C2.73688 13.013 2.66665 12.8435 2.66665 12.6666V11.3333C2.66665 11.1565 2.73688 10.9869 2.86191 10.8619C2.98693 10.7369 3.1565 10.6666 3.33331 10.6666H12.6666C12.8435 10.6666 13.013 10.7369 13.1381 10.8619C13.2631 10.9869 13.3333 11.1565 13.3333 11.3333V12.6666ZM13.3333 8.66665C13.3333 8.84346 13.2631 9.01303 13.1381 9.13805C13.013 9.26307 12.8435 9.33331 12.6666 9.33331H3.33331C3.1565 9.33331 2.98693 9.26307 2.86191 9.13805C2.73688 9.01303 2.66665 8.84346 2.66665 8.66665V7.33331C2.66665 7.1565 2.73688 6.98693 2.86191 6.86191C2.98693 6.73688 3.1565 6.66665 3.33331 6.66665H12.6666C12.8435 6.66665 13.013 6.73688 13.1381 6.86191C13.2631 6.98693 13.3333 7.1565 13.3333 7.33331V8.66665ZM13.3333 4.66665C13.3333 4.84346 13.2631 5.01303 13.1381 5.13805C13.013 5.26307 12.8435 5.33331 12.6666 5.33331H3.33331C3.1565 5.33331 2.98693 5.26307 2.86191 5.13805C2.73688 5.01303 2.66665 4.84346 2.66665 4.66665V3.33331C2.66665 3.1565 2.73688 2.98693 2.86191 2.86191C2.98693 2.73688 3.1565 2.66665 3.33331 2.66665H12.6666C12.8435 2.66665 13.013 2.73688 13.1381 2.86191C13.2631 2.98693 13.3333 3.1565 13.3333 3.33331V4.66665ZM9.99998 3.33331C9.86812 3.33331 9.73923 3.37241 9.6296 3.44567C9.51997 3.51892 9.43452 3.62304 9.38406 3.74486C9.3336 3.86667 9.3204 4.00072 9.34612 4.13004C9.37185 4.25936 9.43534 4.37815 9.52857 4.47138C9.62181 4.56462 9.7406 4.62811 9.86992 4.65384C9.99924 4.67956 10.1333 4.66636 10.2551 4.6159C10.3769 4.56544 10.481 4.47999 10.5543 4.37036C10.6275 4.26073 10.6666 4.13183 10.6666 3.99998C10.6666 3.82317 10.5964 3.6536 10.4714 3.52858C10.3464 3.40355 10.1768 3.33331 9.99998 3.33331ZM5.99998 3.33331H3.99998C3.82317 3.33331 3.6536 3.40355 3.52858 3.52858C3.40355 3.6536 3.33331 3.82317 3.33331 3.99998C3.33331 4.17679 3.40355 4.34636 3.52858 4.47138C3.6536 4.59641 3.82317 4.66665 3.99998 4.66665H5.99998C6.17679 4.66665 6.34636 4.59641 6.47138 4.47138C6.59641 4.34636 6.66665 4.17679 6.66665 3.99998C6.66665 3.82317 6.59641 3.6536 6.47138 3.52858C6.34636 3.40355 6.17679 3.33331 5.99998 3.33331Z"
    })
  });
};
Server.defaultProps = {
  className: ''
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$F = ".Arrow-module_right__OPm55 {\n  transform: rotate(0deg);\n}\n\n.Arrow-module_left__mbW5H {\n  transform: rotate(180deg);\n}\n\n.Arrow-module_bottom__TNVV9 {\n  transform: rotate(90deg);\n}\n\n.Arrow-module_top__1YFaI {\n  transform: rotate(270deg);\n}";
var styles$E = {"right":"Arrow-module_right__OPm55","left":"Arrow-module_left__mbW5H","bottom":"Arrow-module_bottom__TNVV9","top":"Arrow-module_top__1YFaI"};
styleInject(css_248z$F);

var Arrow = function Arrow(props) {
  var className = props.className,
    position = props.position;
  return /*#__PURE__*/jsx("svg", {
    className: classes(className, styles$E[position]),
    viewBox: "0 0 25 24",
    fill: "#333333",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M18.8348 11.62C18.7872 11.4973 18.7158 11.3851 18.6248 11.29L13.6248 6.29C13.5316 6.19676 13.4209 6.1228 13.299 6.07234C13.1772 6.02188 13.0467 5.99591 12.9148 5.99591C12.6485 5.99591 12.3931 6.1017 12.2048 6.29C12.1116 6.38324 12.0376 6.49393 11.9871 6.61575C11.9367 6.73758 11.9107 6.86814 11.9107 7C11.9107 7.2663 12.0165 7.5217 12.2048 7.71L15.5048 11H7.91479C7.64958 11 7.39522 11.1054 7.20769 11.2929C7.02015 11.4804 6.91479 11.7348 6.91479 12C6.91479 12.2652 7.02015 12.5196 7.20769 12.7071C7.39522 12.8946 7.64958 13 7.91479 13H15.5048L12.2048 16.29C12.1111 16.383 12.0367 16.4936 11.9859 16.6154C11.9351 16.7373 11.909 16.868 11.909 17C11.909 17.132 11.9351 17.2627 11.9859 17.3846C12.0367 17.5064 12.1111 17.617 12.2048 17.71C12.2978 17.8037 12.4084 17.8781 12.5302 17.9289C12.6521 17.9797 12.7828 18.0058 12.9148 18.0058C13.0468 18.0058 13.1775 17.9797 13.2994 17.9289C13.4212 17.8781 13.5318 17.8037 13.6248 17.71L18.6248 12.71C18.7158 12.6149 18.7872 12.5028 18.8348 12.38C18.9348 12.1365 18.9348 11.8635 18.8348 11.62Z"
    })
  });
};
Arrow.defaultProps = {
  className: '',
  position: 'right'
};

var css_248z$E = ".Chevron-module_left__qo9Uh {\n  transform: rotate(0deg);\n}\n\n.Chevron-module_bottom__xHi8D {\n  transform: rotate(90deg);\n}\n\n.Chevron-module_right__nQXUr {\n  transform: rotate(180deg);\n}\n\n.Chevron-module_top__gWkFh {\n  transform: rotate(270deg);\n}";
var styles$D = {"left":"Chevron-module_left__qo9Uh","bottom":"Chevron-module_bottom__xHi8D","right":"Chevron-module_right__nQXUr","top":"Chevron-module_top__gWkFh"};
styleInject(css_248z$E);

var Chevron = function Chevron(props) {
  var className = props.className,
    position = props.position;
  return /*#__PURE__*/jsx("svg", {
    className: classes(className, styles$D[position]),
    viewBox: "0 0 22 22",
    fill: "none",
    stroke: "white",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M14.3649 16.766L8.78855 11.1896C8.68381 11.0849 8.68381 10.9151 8.78855 10.8104L14.3649 5.23399",
      strokeWidth: "0.893962",
      strokeLinecap: "round"
    })
  });
};
Chevron.defaultProps = {
  className: '',
  position: 'left'
};

var Delete = function Delete(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 18 20",
    fill: "#CD0000",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M7.16667 15.5C7.40978 15.5 7.64294 15.4034 7.81485 15.2315C7.98676 15.0596 8.08333 14.8264 8.08333 14.5833V9.08333C8.08333 8.84021 7.98676 8.60706 7.81485 8.43515C7.64294 8.26324 7.40978 8.16666 7.16667 8.16666C6.92355 8.16666 6.69039 8.26324 6.51849 8.43515C6.34658 8.60706 6.25 8.84021 6.25 9.08333V14.5833C6.25 14.8264 6.34658 15.0596 6.51849 15.2315C6.69039 15.4034 6.92355 15.5 7.16667 15.5ZM16.3333 4.49999H12.6667V3.58333C12.6667 2.85398 12.3769 2.15451 11.8612 1.63878C11.3455 1.12306 10.646 0.833328 9.91667 0.833328H8.08333C7.35399 0.833328 6.65451 1.12306 6.13879 1.63878C5.62306 2.15451 5.33333 2.85398 5.33333 3.58333V4.49999H1.66667C1.42355 4.49999 1.19039 4.59657 1.01849 4.76848C0.846577 4.94039 0.75 5.17355 0.75 5.41666C0.75 5.65978 0.846577 5.89293 1.01849 6.06484C1.19039 6.23675 1.42355 6.33333 1.66667 6.33333H2.58333V16.4167C2.58333 17.146 2.87306 17.8455 3.38879 18.3612C3.90451 18.8769 4.60399 19.1667 5.33333 19.1667H12.6667C13.396 19.1667 14.0955 18.8769 14.6112 18.3612C15.1269 17.8455 15.4167 17.146 15.4167 16.4167V6.33333H16.3333C16.5764 6.33333 16.8096 6.23675 16.9815 6.06484C17.1534 5.89293 17.25 5.65978 17.25 5.41666C17.25 5.17355 17.1534 4.94039 16.9815 4.76848C16.8096 4.59657 16.5764 4.49999 16.3333 4.49999ZM7.16667 3.58333C7.16667 3.34021 7.26324 3.10706 7.43515 2.93515C7.60706 2.76324 7.84022 2.66666 8.08333 2.66666H9.91667C10.1598 2.66666 10.3929 2.76324 10.5648 2.93515C10.7368 3.10706 10.8333 3.34021 10.8333 3.58333V4.49999H7.16667V3.58333ZM13.5833 16.4167C13.5833 16.6598 13.4868 16.8929 13.3148 17.0648C13.1429 17.2368 12.9098 17.3333 12.6667 17.3333H5.33333C5.09022 17.3333 4.85706 17.2368 4.68515 17.0648C4.51324 16.8929 4.41667 16.6598 4.41667 16.4167V6.33333H13.5833V16.4167ZM10.8333 15.5C11.0764 15.5 11.3096 15.4034 11.4815 15.2315C11.6534 15.0596 11.75 14.8264 11.75 14.5833V9.08333C11.75 8.84021 11.6534 8.60706 11.4815 8.43515C11.3096 8.26324 11.0764 8.16666 10.8333 8.16666C10.5902 8.16666 10.3571 8.26324 10.1852 8.43515C10.0132 8.60706 9.91667 8.84021 9.91667 9.08333V14.5833C9.91667 14.8264 10.0132 15.0596 10.1852 15.2315C10.3571 15.4034 10.5902 15.5 10.8333 15.5Z"
    })
  });
};
Delete.defaultProps = {
  className: ''
};

var Plus = function Plus(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 20 21",
    fill: "white",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M10 0.248047C8.02219 0.248047 6.08879 0.834537 4.4443 1.93335C2.79981 3.03216 1.51809 4.59395 0.761209 6.42121C0.00433284 8.24847 -0.193701 10.2591 0.192152 12.1989C0.578004 14.1388 1.53041 15.9206 2.92894 17.3191C4.32746 18.7176 6.10929 19.67 8.0491 20.0559C9.98891 20.4418 11.9996 20.2437 13.8268 19.4868C15.6541 18.73 17.2159 17.4482 18.3147 15.8037C19.4135 14.1593 20 12.2259 20 10.248C20 8.93483 19.7413 7.63447 19.2388 6.42121C18.7363 5.20796 17.9997 4.10556 17.0711 3.17698C16.1425 2.24839 15.0401 1.5118 13.8268 1.00925C12.6136 0.506705 11.3132 0.248047 10 0.248047V0.248047ZM10 18.248C8.41775 18.248 6.87104 17.7789 5.55544 16.8998C4.23985 16.0208 3.21447 14.7713 2.60897 13.3095C2.00347 11.8477 1.84504 10.2392 2.15372 8.68732C2.4624 7.13548 3.22433 5.71001 4.34315 4.59119C5.46197 3.47237 6.88743 2.71045 8.43928 2.40176C9.99113 2.09308 11.5997 2.25151 13.0615 2.85701C14.5233 3.46251 15.7727 4.48789 16.6518 5.80348C17.5308 7.11908 18 8.6658 18 10.248C18 12.3698 17.1572 14.4046 15.6569 15.9049C14.1566 17.4052 12.1217 18.248 10 18.248V18.248ZM14 9.24805H11V6.24805C11 5.98283 10.8946 5.72848 10.7071 5.54094C10.5196 5.3534 10.2652 5.24805 10 5.24805C9.73479 5.24805 9.48043 5.3534 9.2929 5.54094C9.10536 5.72848 9 5.98283 9 6.24805V9.24805H6C5.73479 9.24805 5.48043 9.3534 5.2929 9.54094C5.10536 9.72848 5 9.98283 5 10.248C5 10.5133 5.10536 10.7676 5.2929 10.9552C5.48043 11.1427 5.73479 11.248 6 11.248H9V14.248C9 14.5133 9.10536 14.7676 9.2929 14.9552C9.48043 15.1427 9.73479 15.248 10 15.248C10.2652 15.248 10.5196 15.1427 10.7071 14.9552C10.8946 14.7676 11 14.5133 11 14.248V11.248H14C14.2652 11.248 14.5196 11.1427 14.7071 10.9552C14.8946 10.7676 15 10.5133 15 10.248C15 9.98283 14.8946 9.72848 14.7071 9.54094C14.5196 9.3534 14.2652 9.24805 14 9.24805Z"
    })
  });
};
Plus.defaultProps = {
  className: ''
};

var Edit = function Edit(props) {
  var className = props.className;
  return /*#__PURE__*/jsxs("svg", {
    className: className,
    viewBox: "0 0 16 17",
    fill: "none",
    stroke: "#101010",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/jsxs("g", {
      clipPath: "url(#clip0_7396_6511)",
      children: [/*#__PURE__*/jsx("path", {
        d: "M3.33341 11.4333L2.66675 14.0999L5.33341 13.4333L13.0001 5.7666C13.5524 5.21432 13.5524 4.31889 13.0001 3.7666C12.4478 3.21432 11.5524 3.21432 11.0001 3.7666L3.33341 11.4333Z",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), /*#__PURE__*/jsx("path", {
        d: "M10 4.7666L12 6.7666",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), /*#__PURE__*/jsx("path", {
        d: "M8.66675 14.0999H14.0001",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })]
    }), /*#__PURE__*/jsx("defs", {
      children: /*#__PURE__*/jsx("clipPath", {
        id: "clip0_7396_6511",
        children: /*#__PURE__*/jsx("rect", {
          width: "16",
          height: "16",
          fill: "white",
          transform: "translate(0 0.766602)"
        })
      })
    })]
  });
};
Edit.defaultProps = {
  className: ''
};

var View = function View(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 16 17",
    fill: "black",
    stroke: "#101010",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M14.1542 8.69774L14.1551 8.69995C14.1643 8.72098 14.169 8.74368 14.169 8.76662C14.169 8.78956 14.1643 8.81226 14.1551 8.83329L14.1542 8.8355C12.8627 11.8341 10.4797 13.6 8.00004 13.6C5.52041 13.6 3.13743 11.8341 1.84593 8.8355L1.84593 8.8355L1.84497 8.83329C1.83579 8.81226 1.83105 8.78956 1.83105 8.76662C1.83105 8.74368 1.83579 8.72098 1.84497 8.69995L1.84497 8.69996L1.84593 8.69774C3.13743 5.69916 5.52041 3.93329 8.00004 3.93329C10.4797 3.93329 12.8627 5.69916 14.1542 8.69774ZM2.28022 8.55531L2.18169 8.76662L2.28022 8.97793C3.48618 11.5641 5.63114 13.2666 8.00004 13.2666C10.3689 13.2666 12.5139 11.5641 13.7199 8.97793L13.8184 8.76662L13.7199 8.55531C12.5139 5.96912 10.3689 4.26662 8.00004 4.26662C5.63114 4.26662 3.48618 5.96912 2.28022 8.55531ZM6.79631 6.9651C7.15262 6.72703 7.57152 6.59996 8.00004 6.59996C8.57468 6.59996 9.12578 6.82823 9.53211 7.23456C9.93844 7.64089 10.1667 8.19199 10.1667 8.76662C10.1667 9.19515 10.0396 9.61405 9.80156 9.97036C9.56349 10.3267 9.2251 10.6044 8.82919 10.7684C8.43329 10.9324 7.99764 10.9753 7.57735 10.8917C7.15706 10.8081 6.77099 10.6017 6.46798 10.2987C6.16497 9.99567 5.95861 9.60961 5.87501 9.18932C5.79141 8.76903 5.83432 8.33338 5.99831 7.93747C6.16229 7.54157 6.44 7.20318 6.79631 6.9651ZM6.9815 10.291C7.28299 10.4924 7.63745 10.6 8.00004 10.6C8.48628 10.6 8.95259 10.4068 9.29641 10.063C9.64022 9.71917 9.83338 9.25285 9.83338 8.76662C9.83338 8.40402 9.72585 8.04957 9.52441 7.74808C9.32296 7.44659 9.03663 7.2116 8.70163 7.07284C8.36663 6.93408 7.99801 6.89778 7.64238 6.96851C7.28675 7.03926 6.96008 7.21386 6.70368 7.47026C6.44729 7.72666 6.27268 8.05332 6.20194 8.40896C6.1312 8.76459 6.1675 9.13321 6.30627 9.46821C6.44503 9.80321 6.68001 10.0895 6.9815 10.291Z"
    })
  });
};
View.defaultProps = {
  className: ''
};

var Filter = function Filter(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 24 24",
    fill: "#0F62FE",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V6.17C1.99986 6.58294 2.08497 6.99147 2.25 7.37V7.43C2.39128 7.75097 2.59139 8.04266 2.84 8.29L9 14.41V21C8.99966 21.1699 9.04264 21.3372 9.12487 21.4859C9.20711 21.6346 9.32589 21.7599 9.47 21.85C9.62914 21.9486 9.81277 22.0006 10 22C10.1565 21.9991 10.3107 21.9614 10.45 21.89L14.45 19.89C14.6149 19.8069 14.7536 19.6798 14.8507 19.5227C14.9478 19.3656 14.9994 19.1847 15 19V14.41L21.12 8.29C21.3686 8.04266 21.5687 7.75097 21.71 7.43V7.37C21.8888 6.99443 21.9876 6.58578 22 6.17V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM13.29 13.29C13.1973 13.3834 13.124 13.4943 13.0742 13.6161C13.0245 13.7379 12.9992 13.8684 13 14V18.38L11 19.38V14C11.0008 13.8684 10.9755 13.7379 10.9258 13.6161C10.876 13.4943 10.8027 13.3834 10.71 13.29L5.41 8H18.59L13.29 13.29ZM20 6H4V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V6Z"
    })
  });
};
Filter.defaultProps = {
  className: ''
};

var MagnifyingGlass = function MagnifyingGlass(props) {
  var className = props.className;
  return /*#__PURE__*/jsxs("svg", {
    className: className,
    viewBox: "0 0 19 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/jsx("path", {
      d: "M8.85626 14.0625C12.1182 14.0625 14.7625 11.4182 14.7625 8.15625C14.7625 4.89432 12.1182 2.25 8.85626 2.25C5.59433 2.25 2.95001 4.89432 2.95001 8.15625C2.95001 11.4182 5.59433 14.0625 8.85626 14.0625Z",
      stroke: "#888888",
      strokeWidth: "1.29375",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsx("path", {
      d: "M13.0328 12.3328L16.45 15.75",
      stroke: "#888888",
      strokeWidth: "1.29375",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })]
  });
};
MagnifyingGlass.defaultProps = {
  className: ''
};

var Columns$1 = function Columns(props) {
  var className = props.className;
  return /*#__PURE__*/jsxs("svg", {
    className: className,
    viewBox: "0 0 26 26",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/jsx("path", {
      d: "M11.5935 21.0107L11.5935 4.98934C11.5935 4.54693 11.2393 4.18828 10.8024 4.18828H6.84694C6.41003 4.18828 6.05584 4.54693 6.05584 4.98934L6.05584 21.0107C6.05584 21.4531 6.41003 21.8117 6.84694 21.8117H10.8024C11.2393 21.8117 11.5935 21.4531 11.5935 21.0107Z",
      stroke: "#333333",
      strokeWidth: "1.91877",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsx("path", {
      d: "M20.2955 21.0107V4.98934C20.2955 4.54693 19.9413 4.18828 19.5044 4.18828H15.549C15.1121 4.18828 14.758 4.54693 14.758 4.98934V21.0107C14.758 21.4531 15.1121 21.8117 15.549 21.8117H19.5044C19.9413 21.8117 20.2955 21.4531 20.2955 21.0107Z",
      stroke: "#333333",
      strokeWidth: "1.91877",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })]
  });
};
Columns$1.defaultProps = {
  className: ''
};

var Refresh = function Refresh(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 27 26",
    fill: "#333333",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M22.0565 16.7416H17.2276C16.9449 16.7416 16.6737 16.8539 16.4738 17.0538C16.2739 17.2537 16.1616 17.5249 16.1616 17.8076C16.1616 18.0903 16.2739 18.3614 16.4738 18.5614C16.6737 18.7613 16.9449 18.8736 17.2276 18.8736H19.7859C18.6101 20.1024 17.0937 20.9515 15.4316 21.3119C13.7695 21.6723 12.0375 21.5275 10.4584 20.896C8.87917 20.2646 7.52486 19.1754 6.56944 17.7683C5.61403 16.3613 5.10114 14.7007 5.09669 13C5.09669 12.7173 4.98438 12.4462 4.78447 12.2462C4.58456 12.0463 4.31342 11.934 4.03071 11.934C3.74799 11.934 3.47685 12.0463 3.27694 12.2462C3.07703 12.4462 2.96472 12.7173 2.96472 13C2.97036 15.0817 3.58536 17.1161 4.73383 18.8523C5.8823 20.5885 7.51399 21.9504 9.42751 22.77C11.341 23.5896 13.4527 23.831 15.5018 23.4644C17.5509 23.0978 19.4479 22.1393 20.9585 20.7071V22.5939C20.9585 22.8766 21.0708 23.1477 21.2708 23.3476C21.4707 23.5475 21.7418 23.6598 22.0245 23.6598C22.3072 23.6598 22.5784 23.5475 22.7783 23.3476C22.9782 23.1477 23.0905 22.8766 23.0905 22.5939V17.7969C23.0879 17.5215 22.9787 17.2578 22.786 17.0611C22.5932 16.8643 22.3318 16.7499 22.0565 16.7416ZM16.8225 13C16.8225 12.3675 16.635 11.7492 16.2836 11.2233C15.9322 10.6974 15.4327 10.2875 14.8484 10.0455C14.264 9.80344 13.621 9.74011 13.0007 9.8635C12.3803 9.98689 11.8105 10.2915 11.3633 10.7387C10.916 11.186 10.6115 11.7558 10.4881 12.3761C10.3647 12.9965 10.428 13.6395 10.67 14.2238C10.9121 14.8082 11.322 15.3076 11.8479 15.659C12.3738 16.0104 12.9921 16.198 13.6246 16.198C14.4727 16.198 15.2861 15.861 15.8859 15.2613C16.4856 14.6616 16.8225 13.8482 16.8225 13ZM12.5586 13C12.5586 12.7892 12.6211 12.5831 12.7382 12.4078C12.8554 12.2325 13.0218 12.0958 13.2166 12.0152C13.4114 11.9345 13.6257 11.9134 13.8325 11.9545C14.0393 11.9956 14.2292 12.0972 14.3783 12.2462C14.5274 12.3953 14.6289 12.5853 14.6701 12.792C14.7112 12.9988 14.6901 13.2132 14.6094 13.4079C14.5287 13.6027 14.3921 13.7692 14.2168 13.8863C14.0415 14.0035 13.8354 14.066 13.6246 14.066C13.3418 14.066 13.0707 13.9537 12.8708 13.7538C12.6709 13.5539 12.5586 13.2827 12.5586 13ZM13.6246 2.34016C10.8918 2.34796 8.26638 3.40499 6.29059 5.29294V3.40615C6.29059 3.12343 6.17828 2.85229 5.97837 2.65238C5.77846 2.45247 5.50732 2.34016 5.22461 2.34016C4.94189 2.34016 4.67075 2.45247 4.47084 2.65238C4.27093 2.85229 4.15862 3.12343 4.15862 3.40615V8.20308C4.15862 8.48579 4.27093 8.75693 4.47084 8.95684C4.67075 9.15675 4.94189 9.26906 5.22461 9.26906H10.0215C10.3043 9.26906 10.5754 9.15675 10.7753 8.95684C10.9752 8.75693 11.0875 8.48579 11.0875 8.20308C11.0875 7.92036 10.9752 7.64922 10.7753 7.44931C10.5754 7.2494 10.3043 7.13709 10.0215 7.13709H7.46317C8.63838 5.90894 10.1538 5.06002 11.8149 4.6993C13.4761 4.33858 15.2071 4.48252 16.7859 5.11264C18.3646 5.74276 19.719 6.83031 20.6752 8.2357C21.6315 9.64108 22.1459 11.3002 22.1524 13C22.1524 13.2827 22.2647 13.5539 22.4647 13.7538C22.6646 13.9537 22.9357 14.066 23.2184 14.066C23.5011 14.066 23.7723 13.9537 23.9722 13.7538C24.1721 13.5539 24.2844 13.2827 24.2844 13C24.2844 11.6001 24.0087 10.214 23.473 8.92066C22.9373 7.62735 22.1521 6.45222 21.1622 5.46236C20.1723 4.4725 18.9972 3.6873 17.7039 3.1516C16.4106 2.61589 15.0244 2.34016 13.6246 2.34016Z"
    })
  });
};
Refresh.defaultProps = {
  className: ''
};

var Nut = function Nut(props) {
  var className = props.className;
  return /*#__PURE__*/jsxs("svg", {
    className: className,
    viewBox: "0 0 26 26",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/jsx("path", {
      d: "M22.4023 17.727V8.27303C22.4015 8.1307 22.3632 7.99108 22.2913 7.86826C22.2193 7.74544 22.1163 7.64376 21.9925 7.57348L13.5979 2.82652C13.4794 2.7581 13.345 2.72208 13.2082 2.72208C13.0713 2.72208 12.9369 2.7581 12.8184 2.82652L4.42378 7.57348C4.30001 7.64376 4.19696 7.74544 4.12502 7.86826C4.05308 7.99108 4.0148 8.1307 4.01404 8.27303V17.727C4.0148 17.8693 4.05308 18.0089 4.12502 18.1317C4.19696 18.2546 4.30001 18.3562 4.42378 18.4265L12.8184 23.1735C12.9369 23.2419 13.0713 23.2779 13.2082 23.2779C13.345 23.2779 13.4794 23.2419 13.5979 23.1735L21.9925 18.4265C22.1163 18.3562 22.2193 18.2546 22.2913 18.1317C22.3632 18.0089 22.4015 17.8693 22.4023 17.727V17.727Z",
      stroke: "#333333",
      strokeWidth: "1.91877",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsx("path", {
      d: "M13.2082 16.5977C15.1951 16.5977 16.8059 14.987 16.8059 13C16.8059 11.013 15.1951 9.40231 13.2082 9.40231C11.2212 9.40231 9.61047 11.013 9.61047 13C9.61047 14.987 11.2212 16.5977 13.2082 16.5977Z",
      stroke: "#333333",
      strokeWidth: "1.91877",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })]
  });
};
Nut.defaultProps = {
  className: ''
};

var HalfShade = function HalfShade(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    width: "21",
    height: "21",
    viewBox: "0 0 21 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M19.8301 5.81656C19.0191 4.30102 17.8352 3.01725 16.3901 2.08656C15.0823 1.24524 13.5963 0.720506 12.0502 0.554044C10.5041 0.387583 8.9405 0.583984 7.4836 1.12764C6.0267 1.6713 4.71667 2.54724 3.65758 3.68586C2.59849 4.82447 1.81954 6.19439 1.3826 7.68678C0.945669 9.17916 0.862799 10.7529 1.14058 12.2829C1.41835 13.8129 2.04912 15.2571 2.98277 16.5006C3.91641 17.7442 5.12721 18.7529 6.51895 19.4465C7.91069 20.1402 9.44503 20.4997 11.0001 20.4966H11.2901C12.9891 20.4464 14.6473 19.964 16.1082 19.0949C17.569 18.2258 18.7841 16.9986 19.6388 15.5294C20.4936 14.0601 20.9597 12.3972 20.9931 10.6977C21.0266 8.99828 20.6263 7.31833 19.8301 5.81656ZM10.0001 18.4266C8.0782 18.1706 6.31468 17.2255 5.03741 15.7669C3.76014 14.3082 3.05604 12.4354 3.05604 10.4966C3.05604 8.55774 3.76014 6.68489 5.03741 5.22626C6.31468 3.76763 8.0782 2.82248 10.0001 2.56656V18.4266ZM12.0001 2.56656C12.8646 2.67715 13.7055 2.92706 14.4901 3.30656L12.0001 7.61656V2.56656ZM12.0001 11.5666L16.1701 4.39656C16.7849 4.92451 17.3174 5.54131 17.7501 6.22656L12.0001 16.1866V11.5666ZM13.1501 18.1466L18.7401 8.49656C18.9091 9.14991 18.9964 9.82171 19.0001 10.4966C18.9988 12.2426 18.4264 13.9402 17.3702 15.3305C16.3139 16.7208 14.8318 17.7273 13.1501 18.1966V18.1466Z",
      fill: "#333333"
    })
  });
};
HalfShade.defaultProps = {
  className: ''
};

var AngleDouble = function AngleDouble(props) {
  var className = props.className;
  return /*#__PURE__*/jsx("svg", {
    className: className,
    viewBox: "0 0 19 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M9.30329 6.7771C9.23506 6.70831 9.15389 6.6537 9.06445 6.61644C8.97501 6.57918 8.87908 6.56 8.78219 6.56C8.6853 6.56 8.58937 6.57918 8.49994 6.61644C8.4105 6.6537 8.32932 6.70831 8.26109 6.7771L6.05926 8.97893C5.99047 9.04716 5.93587 9.12833 5.89861 9.21777C5.86135 9.30721 5.84216 9.40314 5.84216 9.50003C5.84216 9.59692 5.86135 9.69285 5.89861 9.78229C5.93587 9.87172 5.99047 9.9529 6.05926 10.0211L8.26109 12.223C8.32932 12.2917 8.4105 12.3464 8.49994 12.3836C8.58937 12.4209 8.6853 12.4401 8.78219 12.4401C8.87908 12.4401 8.97501 12.4209 9.06445 12.3836C9.15389 12.3464 9.23506 12.2917 9.30329 12.223C9.37208 12.1547 9.42669 12.0736 9.46395 11.9841C9.50121 11.8947 9.52039 11.7987 9.52039 11.7019C9.52039 11.605 9.50121 11.509 9.46395 11.4196C9.42669 11.3302 9.37208 11.249 9.30329 11.1808L7.61522 9.50003L9.30329 7.8193C9.37208 7.75107 9.42669 7.66989 9.46395 7.58045C9.50121 7.49102 9.52039 7.39509 9.52039 7.2982C9.52039 7.20131 9.50121 7.10538 9.46395 7.01594C9.42669 6.9265 9.37208 6.84533 9.30329 6.7771ZM11.6519 9.50003L13.3693 7.8193C13.5075 7.68109 13.5852 7.49365 13.5852 7.2982C13.5852 7.10275 13.5075 6.9153 13.3693 6.7771C13.2311 6.63889 13.0437 6.56125 12.8482 6.56125C12.6528 6.56125 12.4653 6.63889 12.3271 6.7771L10.1253 8.97893C10.0565 9.04716 10.0019 9.12833 9.96466 9.21777C9.92739 9.30721 9.90821 9.40314 9.90821 9.50003C9.90821 9.59692 9.92739 9.69285 9.96466 9.78229C10.0019 9.87172 10.0565 9.9529 10.1253 10.0211L12.3271 12.223C12.3954 12.2917 12.4765 12.3464 12.566 12.3836C12.6554 12.4209 12.7514 12.4401 12.8482 12.4401C12.9451 12.4401 13.0411 12.4209 13.1305 12.3836C13.2199 12.3464 13.3011 12.2917 13.3693 12.223C13.4381 12.1547 13.4927 12.0736 13.53 11.9841C13.5673 11.8947 13.5864 11.7987 13.5864 11.7019C13.5864 11.605 13.5673 11.509 13.53 11.4196C13.4927 11.3302 13.4381 11.249 13.3693 11.1808L11.6519 9.50003Z",
      fill: "#110DEF"
    })
  });
};
AngleDouble.defaultProps = {
  className: ''
};

var css_248z$D = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Accordion-module_root__gEN-u {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n}\n.Accordion-module_root__gEN-u .Accordion-module_header__FRvo4 {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem;\n  cursor: pointer;\n}\n.Accordion-module_root__gEN-u .Accordion-module_header__FRvo4 .Accordion-module_icon__xGKgk {\n  transform: rotate(-90deg);\n}\n.Accordion-module_root__gEN-u .Accordion-module_header__FRvo4 .Accordion-module_title__NI140 {\n  flex: 1 1 auto;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.Accordion-module_root__gEN-u .Accordion-module_header__FRvo4:hover {\n  background: var(--background);\n}\n.Accordion-module_root__gEN-u .Accordion-module_header__FRvo4:hover .Accordion-module_icon__xGKgk,\n.Accordion-module_root__gEN-u .Accordion-module_header__FRvo4:hover .Accordion-module_title__NI140 {\n  color: var(--highlight);\n  fill: var(--highlight);\n}\n.Accordion-module_root__gEN-u .Accordion-module_body__JwYl2 {\n  display: none;\n  padding: 0.5rem 1.5rem;\n}\n.Accordion-module_root__gEN-u.Accordion-module_open__uvqfT .Accordion-module_header__FRvo4 .Accordion-module_icon__xGKgk {\n  transform: none;\n}\n.Accordion-module_root__gEN-u.Accordion-module_open__uvqfT .Accordion-module_body__JwYl2 {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n}";
var styles$C = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Accordion-module_root__gEN-u","header":"Accordion-module_header__FRvo4","icon":"Accordion-module_icon__xGKgk","title":"Accordion-module_title__NI140","body":"Accordion-module_body__JwYl2","open":"Accordion-module_open__uvqfT"};
styleInject(css_248z$D);

var Accordion = function Accordion(props) {
  var defaultOpen = props.defaultOpen,
    iconPlacement = props.iconPlacement,
    title = props.title,
    description = props.description,
    children = props.children;
  var _useState = useState(defaultOpen),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  return /*#__PURE__*/jsxs("div", {
    className: classes(styles$C.root, open ? styles$C.open : ''),
    children: [/*#__PURE__*/jsxs("div", {
      role: "button",
      className: styles$C.header,
      onClick: function onClick() {
        setOpen(function (prevState) {
          return !prevState;
        });
      },
      children: [iconPlacement === 'left' && /*#__PURE__*/jsx(Caret, {
        className: styles$C.icon
      }), /*#__PURE__*/jsx("span", {
        className: styles$C.title,
        children: title
      }), iconPlacement === 'right' && /*#__PURE__*/jsx(Caret, {
        className: styles$C.icon
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$C.body,
      children: [description && /*#__PURE__*/jsx("p", {
        children: description
      }), children]
    })]
  });
};
Accordion.propTypes = {
  iconPlacement: propTypes$1.exports.oneOf(['left', 'right', 'none']),
  title: propTypes$1.exports.string,
  description: propTypes$1.exports.string,
  defaultOpen: propTypes$1.exports.bool
};
Accordion.defaultProps = {
  iconPlacement: 'left',
  title: null,
  description: null,
  defaultOpen: false
};

var css_248z$C = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Alert-module_root__l1ZpK {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  position: fixed;\n  padding: 0.938rem;\n  width: 500px;\n}\n.Alert-module_root__l1ZpK.Alert-module_position-bottom-center__ArOSw {\n  left: 50%;\n  bottom: 1rem;\n  transform: translate(-50%, 0);\n}\n.Alert-module_root__l1ZpK.Alert-module_position-top-right__INiLO {\n  right: 1rem;\n  top: 1rem;\n}\n.Alert-module_root__l1ZpK .Alert-module_left__5k1AJ {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n.Alert-module_root__l1ZpK .Alert-module_left__5k1AJ .Alert-module_icons__SBpod {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  padding: 0.313rem 0.938rem 0rem 0rem;\n  height: auto;\n}\n.Alert-module_root__l1ZpK .Alert-module_left__5k1AJ .Alert-module_icons__SBpod .Alert-module_icon__iuX5T {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.Alert-module_root__l1ZpK .Alert-module_left__5k1AJ .Alert-module_content__uYcO4 {\n  padding: 0.188rem 0.938rem 0rem 0rem;\n}\n.Alert-module_root__l1ZpK .Alert-module_left__5k1AJ .Alert-module_content__uYcO4 .Alert-module_title__GSeDp {\n  font-size: 0.875rem;\n  font-weight: 600;\n  padding-right: 2px;\n}\n.Alert-module_root__l1ZpK .Alert-module_left__5k1AJ .Alert-module_content__uYcO4 .Alert-module_description__aMvRm {\n  word-wrap: break-word;\n  height: auto;\n  font-size: 0.875rem;\n  font-weight: 400;\n  margin-bottom: 0.5rem;\n}\n.Alert-module_root__l1ZpK .Alert-module_actions__JDG2T {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 5px;\n}\n.Alert-module_root__l1ZpK .Alert-module_actions__JDG2T .Alert-module_button__lFoVg {\n  padding: 0.313rem 1rem;\n  font-weight: 400;\n}\n.Alert-module_root__l1ZpK .Alert-module_actions__JDG2T .Alert-module_close__LyN5i {\n  padding-top: 0.313rem;\n}\n.Alert-module_root__l1ZpK .Alert-module_actions__JDG2T .Alert-module_close__LyN5i .Alert-module_icon__iuX5T {\n  width: 1.25rem;\n  height: 1.25rem;\n  fill: var(--black);\n}\n.Alert-module_root__l1ZpK.Alert-module_border-default__a-ED7 {\n  border-width: 0.063rem;\n}\n.Alert-module_root__l1ZpK.Alert-module_border-thick-left__5PyWS {\n  border-width: 0.063rem 0.063rem 0.063rem 0.25rem;\n}\n.Alert-module_root__l1ZpK.Alert-module_border-none__-okAl {\n  border-width: 0rem 0rem 0rem 0.25rem;\n}\n.Alert-module_root__l1ZpK.Alert-module_info__dW63t {\n  border-style: solid;\n  border-color: var(--info);\n  background-color: #edf5ff;\n}\n.Alert-module_root__l1ZpK.Alert-module_info__dW63t .Alert-module_icon__iuX5T {\n  fill: var(--info);\n}\n.Alert-module_root__l1ZpK.Alert-module_success__RlEA0 {\n  border-style: solid;\n  border-color: var(--success);\n  background-color: var(--success-bg);\n}\n.Alert-module_root__l1ZpK.Alert-module_success__RlEA0 .Alert-module_icon__iuX5T {\n  fill: var(--success);\n}\n.Alert-module_root__l1ZpK.Alert-module_danger__c21By {\n  border-style: solid;\n  border-color: var(--error);\n  background-color: var(--error-bg);\n}\n.Alert-module_root__l1ZpK.Alert-module_danger__c21By .Alert-module_icon__iuX5T {\n  fill: var(--error);\n}\n.Alert-module_root__l1ZpK.Alert-module_warning__aETXV {\n  border-style: solid;\n  border-color: var(--warning);\n  background-color: var(--warning-bg);\n}\n.Alert-module_root__l1ZpK.Alert-module_warning__aETXV .Alert-module_icon__iuX5T {\n  fill: var(--warning);\n}\n.Alert-module_root__l1ZpK.Alert-module_shadow__hHoKN {\n  box-shadow: 0.125rem 0.5rem 1rem rgba(60, 60, 60, 0.12);\n}";
var styles$B = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"Alert-module_success__RlEA0","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"Alert-module_warning__aETXV","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"Alert-module_info__dW63t","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Alert-module_root__l1ZpK","position-bottom-center":"Alert-module_position-bottom-center__ArOSw","position-top-right":"Alert-module_position-top-right__INiLO","left":"Alert-module_left__5k1AJ","icons":"Alert-module_icons__SBpod","icon":"Alert-module_icon__iuX5T","content":"Alert-module_content__uYcO4","title":"Alert-module_title__GSeDp","description":"Alert-module_description__aMvRm","actions":"Alert-module_actions__JDG2T","button":"Alert-module_button__lFoVg","close":"Alert-module_close__LyN5i","border-default":"Alert-module_border-default__a-ED7","border-thick-left":"Alert-module_border-thick-left__5PyWS","border-none":"Alert-module_border-none__-okAl","danger":"Alert-module_danger__c21By","shadow":"Alert-module_shadow__hHoKN"};
styleInject(css_248z$C);

var css_248z$B = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.BaseCell-module_root__i6f-E {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  gap: 0.5rem;\n  flex: none;\n  height: 3rem;\n  background: var(--white);\n  max-width: 100%;\n  max-height: 100%;\n}\n.BaseCell-module_root__i6f-E > [data-elem*=component] {\n  display: inline-block;\n  max-height: 100%;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_sm__6lhv5 {\n  width: 9.063rem;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_md__d7xeQ {\n  width: 15.625rem;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_lg__z1sA6 {\n  width: 21.875rem;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_auto__55g3t {\n  width: auto;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_border-radius-default__3o5Qv {\n  border-radius: 0.25rem;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_border-radius-round__pE3-j {\n  border-radius: 50%;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_border-radius-ellipse__IhKeq {\n  border-radius: 1.563rem;\n}\n.BaseCell-module_root__i6f-E.BaseCell-module_flexible__JRAXk {\n  flex-grow: 1;\n  flex-shrink: 1;\n  min-width: 3rem;\n}";
var styles$A = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"BaseCell-module_root__i6f-E","sm":"BaseCell-module_sm__6lhv5","md":"BaseCell-module_md__d7xeQ","lg":"BaseCell-module_lg__z1sA6","auto":"BaseCell-module_auto__55g3t","border-radius-default":"BaseCell-module_border-radius-default__3o5Qv","border-radius-round":"BaseCell-module_border-radius-round__pE3-j","border-radius-ellipse":"BaseCell-module_border-radius-ellipse__IhKeq","flexible":"BaseCell-module_flexible__JRAXk"};
styleInject(css_248z$B);

var BaseCell = /*#__PURE__*/forwardRef(function BaseCell(props, ref) {
  var className = props.className,
    size = props.size,
    flexible = props.flexible,
    rounded = props.rounded,
    component1 = props.component1,
    component2 = props.component2,
    component3 = props.component3,
    RootDOM = props.RootDOM,
    attrs = props.attrs,
    radius = props.radius;
  var Component = /*#__PURE__*/createElement(RootDOM, _objectSpread2({
    'data-elem': 'base-cell',
    ref: ref,
    className: classes(className, styles$A.root, styles$A[size], styles$A["border-radius-".concat(radius)], flexible ? styles$A.flexible : '', rounded ? styles$A.rounded : '')
  }, attrs), /*#__PURE__*/jsxs(Fragment, {
    children: [component1 && /*#__PURE__*/jsx("span", {
      "data-elem": "component1",
      children: component1
    }), component2 && /*#__PURE__*/jsx("span", {
      "data-elem": "component2",
      children: component2
    }), component3 && /*#__PURE__*/jsx("span", {
      "data-elem": "component3",
      children: component3
    })]
  }));
  if ( /*#__PURE__*/isValidElement(Component)) {
    return Component;
  }
  return null;
});
BaseCell.propTypes = {
  className: propTypes$1.exports.string,
  component1: propTypes$1.exports.element,
  component2: propTypes$1.exports.element,
  component3: propTypes$1.exports.element,
  size: propTypes$1.exports.oneOf(['sm', 'md', 'lg', 'auto']),
  flexible: propTypes$1.exports.bool,
  radius: propTypes$1.exports.oneOf(['none', 'default', 'round', 'ellipse']),
  RootDOM: propTypes$1.exports.oneOf(['div', 'span', 'button']),
  attrs: propTypes$1.exports.object
};
BaseCell.defaultProps = {
  className: '',
  component1: null,
  component2: null,
  component3: null,
  size: 'sm',
  flexible: false,
  radius: 'none',
  RootDOM: 'div',
  attrs: {}
};

var propTypes = {
  className: propTypes$1.exports.string,
  component1: propTypes$1.exports.element,
  component2: propTypes$1.exports.element,
  component3: propTypes$1.exports.element,
  size: propTypes$1.exports.oneOf(['sm', 'md', 'lg', 'auto']),
  flexible: propTypes$1.exports.bool,
  radius: propTypes$1.exports.oneOf(['none', 'default', 'round', 'ellipse']),
  RootDOM: propTypes$1.exports.oneOf(['div', 'span', 'button']),
  attrs: propTypes$1.exports.object
};
var defaultProps$1 = {
  className: '',
  component1: null,
  component2: null,
  component3: null,
  size: 'sm',
  flexible: false,
  radius: 'none',
  RootDOM: 'div',
  attrs: {}
};

var css_248z$A = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  display: inline-flex;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  outline: none;\n  border: none;\n  background: none;\n  padding: 0.5rem 0.75rem;\n}\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell]:disabled {\n  cursor: not-allowed;\n}\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell].BaseButton-module_contained__WAsSX {\n  background: var(--black);\n  color: var(--white);\n}\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell].BaseButton-module_outlined__pPg3V {\n  color: var(--black);\n  border: 1px solid var(--black);\n}\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell].BaseButton-module_text__IWP1r {\n  color: var(--black);\n}\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell] [data-elem*=component] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell] [data-elem=component2] {\n  min-width: 0;\n}\nbutton.BaseButton-module_root__mVugc[data-elem=base-cell] [data-elem=title] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}";
var styles$z = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"BaseButton-module_root__mVugc","contained":"BaseButton-module_contained__WAsSX","outlined":"BaseButton-module_outlined__pPg3V","text":"BaseButton-module_text__IWP1r"};
styleInject(css_248z$A);

var BaseButton = /*#__PURE__*/forwardRef(function BaseButton(props, ref) {
  var className = props.className,
    component1 = props.component1,
    title = props.title,
    component3 = props.component3,
    size = props.size,
    flexible = props.flexible,
    radius = props.radius,
    disabled = props.disabled,
    type = props.type,
    onClick = props.onClick,
    variant = props.variant;
  var Title = title && /*#__PURE__*/jsx("span", {
    "data-elem": "title",
    children: title
  });
  return /*#__PURE__*/jsx(BaseCell, {
    className: classes(className, styles$z.root, styles$z[variant]),
    ref: ref,
    component1: component1,
    component2: Title,
    component3: component3,
    flexible: flexible,
    radius: radius,
    size: size,
    attrs: {
      disabled: disabled,
      type: type,
      onClick: onClick
    },
    RootDOM: "button"
  });
});
BaseButton.propTypes = _objectSpread2(_objectSpread2({}, BaseCell.propTypes), {}, {
  title: propTypes$1.exports.string,
  disabled: propTypes$1.exports.bool,
  type: propTypes$1.exports.oneOf(['button', 'submit', 'reset']),
  onClick: propTypes$1.exports.func,
  variant: propTypes$1.exports.oneOf(['contained', 'outlined', 'text'])
});
BaseButton.defaultProps = _objectSpread2(_objectSpread2({}, BaseCell.defaultProps), {}, {
  title: null,
  disabled: false,
  type: 'submit',
  onClick: function onClick() {},
  variant: 'contained'
});

var css_248z$z = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Button-module_root__1MwuE[data-elem=base-cell] {\n  cursor: pointer;\n}\n.Button-module_root__1MwuE[data-elem=base-cell] [data-elem=component2] [data-elem=title] {\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_primary__QahMI.Button-module_contained__Xk4Uo {\n  background-color: var(--highlight);\n  color: var(--white);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_primary__QahMI.Button-module_outlined__2dqXl {\n  background-color: transparent;\n  border-color: var(--highlight);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_primary__QahMI.Button-module_outlined__2dqXl, .Button-module_root__1MwuE[data-elem=base-cell].Button-module_primary__QahMI.Button-module_text__xJTsb {\n  color: var(--highlight);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_success__Gu-1v.Button-module_contained__Xk4Uo {\n  background-color: var(--success);\n  color: var(--white);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_success__Gu-1v.Button-module_outlined__2dqXl {\n  background-color: transparent;\n  border-color: var(--success);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_success__Gu-1v.Button-module_outlined__2dqXl, .Button-module_root__1MwuE[data-elem=base-cell].Button-module_success__Gu-1v.Button-module_text__xJTsb {\n  color: var(--success);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_danger__CV3m8.Button-module_contained__Xk4Uo {\n  background-color: var(--error);\n  color: var(--white);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_danger__CV3m8.Button-module_outlined__2dqXl {\n  background-color: transparent;\n  border-color: var(--error);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_danger__CV3m8.Button-module_outlined__2dqXl, .Button-module_root__1MwuE[data-elem=base-cell].Button-module_danger__CV3m8.Button-module_text__xJTsb {\n  color: var(--error);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_warning__IZasP.Button-module_contained__Xk4Uo {\n  background-color: var(--warning);\n  color: var(--white);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_warning__IZasP.Button-module_outlined__2dqXl {\n  background-color: transparent;\n  border-color: var(--warning);\n}\n.Button-module_root__1MwuE[data-elem=base-cell].Button-module_warning__IZasP.Button-module_outlined__2dqXl, .Button-module_root__1MwuE[data-elem=base-cell].Button-module_warning__IZasP.Button-module_text__xJTsb {\n  color: var(--warning);\n}\n.Button-module_root__1MwuE[data-elem=base-cell]:disabled.Button-module_contained__Xk4Uo {\n  background-color: var(--grey4);\n  color: var(--grey);\n}\n.Button-module_root__1MwuE[data-elem=base-cell]:disabled.Button-module_outlined__2dqXl {\n  background-color: transparent;\n  border-color: var(--grey);\n}\n.Button-module_root__1MwuE[data-elem=base-cell]:disabled.Button-module_outlined__2dqXl, .Button-module_root__1MwuE[data-elem=base-cell]:disabled.Button-module_text__xJTsb {\n  color: var(--grey);\n}";
var styles$y = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"Button-module_success__Gu-1v","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"Button-module_warning__IZasP","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Button-module_root__1MwuE","primary":"Button-module_primary__QahMI","contained":"Button-module_contained__Xk4Uo","outlined":"Button-module_outlined__2dqXl","text":"Button-module_text__xJTsb","danger":"Button-module_danger__CV3m8"};
styleInject(css_248z$z);

var Button = /*#__PURE__*/forwardRef(function Button(props, ref) {
  var className = props.className,
    type = props.type,
    LeftComponent = props.leftComponent,
    title = props.title,
    RightComponent = props.rightComponent,
    size = props.size,
    flexible = props.flexible,
    radius = props.radius,
    disabled = props.disabled,
    onClick = props.onClick,
    variant = props.variant,
    color = props.color;
  return /*#__PURE__*/jsx(BaseButton, {
    ref: ref,
    type: type,
    component1: LeftComponent && /*#__PURE__*/jsx(LeftComponent, {}),
    title: title,
    component3: RightComponent && /*#__PURE__*/jsx(RightComponent, {}),
    size: size,
    flexible: flexible,
    radius: radius,
    disabled: disabled,
    onClick: onClick,
    variant: variant,
    className: classes(styles$y.root, styles$y["radius-".concat(radius)], styles$y[variant], styles$y[color], className)
  });
});
Button.propTypes = _objectSpread2(_objectSpread2({}, BaseButton.propTypes), {}, {
  color: propTypes$1.exports.oneOf(['primary', 'success', 'danger', 'warning']),
  leftComponent: propTypes$1.exports.node,
  rightComponent: propTypes$1.exports.node
});
Button.defaultProps = _objectSpread2(_objectSpread2({}, BaseButton.defaultProps), {}, {
  color: 'primary',
  leftComponent: null,
  rightComponent: null,
  radius: 'default'
});

var css_248z$y = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Chip-module_root__EDxQB[data-elem=base-cell] {\n  position: relative;\n}\n.Chip-module_root__EDxQB[data-elem=base-cell] [data-elem=component2] [data-elem=title] {\n  font-weight: 500;\n  font-size: 0.75rem;\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_sm__jWsDU {\n  height: 1.5rem;\n  padding: 0.188rem 0.5rem;\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_md__D7nex {\n  height: 2.25rem;\n  padding: 0.563rem 1rem;\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_status__HPwn0.Chip-module_success__gKoSz {\n  background-color: var(--success-bg);\n  color: var(--success);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_status__HPwn0.Chip-module_info__oGvTs {\n  background-color: var(--info-bg);\n  color: var(--info);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_status__HPwn0.Chip-module_danger__r7AL- {\n  background-color: var(--error-bg);\n  color: var(--error);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_status__HPwn0.Chip-module_warning__k-uii {\n  background-color: var(--warning-bg);\n  color: var(--warning);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_status__HPwn0.Chip-module_default__lJKsA {\n  background-color: var(--grey5);\n  color: var(--grey);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_status__HPwn0:hover {\n  box-shadow: -2px -2px 4px rgba(166, 166, 166, 0.25), 2px 2px 4px rgba(166, 166, 166, 0.24);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n {\n  border-width: 1px;\n  border-style: solid;\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_success__gKoSz {\n  background-color: var(--success-bg);\n  color: var(--success);\n  border-color: var(--success-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_success__gKoSz:hover {\n  background-color: var(--success-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_info__oGvTs {\n  background-color: var(--info-bg);\n  color: var(--info);\n  border-color: var(--info-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_info__oGvTs:hover {\n  background-color: var(--info-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_danger__r7AL- {\n  background-color: var(--error-bg);\n  color: var(--error);\n  border-color: var(--error-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_danger__r7AL-:hover {\n  background-color: var(--error-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_warning__k-uii {\n  background-color: var(--warning-bg);\n  color: var(--warning);\n  border-color: var(--warning-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_warning__k-uii:hover {\n  background-color: var(--warning-outline);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_default__lJKsA {\n  background-color: var(--grey8);\n  color: var(--grey);\n  border-color: var(--grey6);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell].Chip-module_input__gUY7n.Chip-module_default__lJKsA:hover {\n  background-color: var(--grey6);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_status__HPwn0, .Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_input__gUY7n {\n  filter: grayscale(1);\n  border-color: var(--grey4);\n  background-color: var(--grey5);\n  color: var(--grey2);\n}\n.Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_status__HPwn0 [data-elem=component1],\n.Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_status__HPwn0 [data-elem=component3], .Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_input__gUY7n [data-elem=component1],\n.Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_input__gUY7n [data-elem=component3] {\n  opacity: 0.5;\n}\n.Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_status__HPwn0:hover, .Chip-module_root__EDxQB[data-elem=base-cell]:disabled.Chip-module_input__gUY7n:hover {\n  box-shadow: none;\n  background-color: var(--grey5);\n}";
var styles$x = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"Chip-module_success__gKoSz","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"Chip-module_warning__k-uii","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"Chip-module_info__oGvTs","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Chip-module_root__EDxQB","sm":"Chip-module_sm__jWsDU","md":"Chip-module_md__D7nex","status":"Chip-module_status__HPwn0","danger":"Chip-module_danger__r7AL-","default":"Chip-module_default__lJKsA","input":"Chip-module_input__gUY7n"};
styleInject(css_248z$y);

var Chip = function Chip(props) {
  var className = props.className,
    type = props.type,
    LeftComponent = props.leftComponent,
    title = props.title,
    RightComponent = props.rightComponent,
    size = props.size,
    flexible = props.flexible,
    radius = props.radius,
    disabled = props.disabled,
    onClick = props.onClick,
    variant = props.variant,
    color = props.color;
  return /*#__PURE__*/jsx(BaseButton, {
    type: type,
    component1: LeftComponent && /*#__PURE__*/jsx(LeftComponent, {}),
    title: title,
    component3: RightComponent && /*#__PURE__*/jsx(RightComponent, {}),
    size: 'auto',
    flexible: flexible,
    radius: radius,
    disabled: disabled,
    onClick: onClick,
    variant: 'contained',
    className: classes(styles$x.root, styles$x["radius-".concat(radius)], styles$x[variant], styles$x[color], styles$x[size], className)
  });
};
Chip.propTypes = _objectSpread2(_objectSpread2({}, BaseButton.propTypes), {}, {
  size: propTypes$1.exports.oneOf(['sm', 'md']),
  variant: propTypes$1.exports.oneOf(['status', 'input']),
  color: propTypes$1.exports.oneOf(['success', 'info', 'warning', 'danger', 'default']),
  leftComponent: propTypes$1.exports.func,
  rightComponent: propTypes$1.exports.func
});
Chip.defaultProps = _objectSpread2(_objectSpread2({}, BaseButton.defaultProps), {}, {
  size: 'sm',
  variant: 'status',
  color: 'success',
  leftComponent: null,
  rightComponent: null,
  radius: 'default'
});

function getSide(placement) {
  return placement.split('-')[0];
}

function getAlignment(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
}

function getLengthFromAxis(axis) {
  return axis === 'y' ? 'height' : 'width';
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === 'x';
  let coords;

  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;

    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;

    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }

  switch (getAlignment(placement)) {
    case 'start':
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;

    case 'end':
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }

  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */

const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));

  if (process.env.NODE_ENV !== "production") {
    if (platform == null) {
      console.error(['Floating UI: `platform` property was not passed to config. If you', 'want to use Floating UI on the web, install @floating-ui/dom', 'instead of the /core package. Otherwise, you can create your own', '`platform`: https://floating-ui.com/docs/platform'].join(' '));
    }

    if (middleware.filter(_ref => {
      let {
        name
      } = _ref;
      return name === 'autoPlacement' || name === 'flip';
    }).length > 1) {
      throw new Error(['Floating UI: duplicate `flip` and/or `autoPlacement`', 'middleware detected. This will lead to an infinite loop. Ensure only', 'one of either has been passed to the `middleware` array.'].join(' '));
    }
  }

  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;

  for (let i = 0; i < middleware.length; i++) {
    const {
      name,
      fn
    } = middleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = { ...middlewareData,
      [name]: { ...middlewareData[name],
        ...data
      }
    };

    if (process.env.NODE_ENV !== "production") {
      if (resetCount > 50) {
        console.warn(['Floating UI: The middleware lifecycle appears to be running in an', 'infinite loop. This is usually caused by a `reset` continually', 'being returned without a break condition.'].join(' '));
      }
    }

    if (reset && resetCount <= 50) {
      resetCount++;

      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }

        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }

        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }

      i = -1;
      continue;
    }
  }

  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}

function getSideObjectFromPadding(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}

function rectToClientRect(rect) {
  return { ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(middlewareArguments, options) {
  var _await$platform$isEle;

  if (options === void 0) {
    options = {};
  }

  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: elementContext === 'floating' ? { ...rects.floating,
      x,
      y
    } : rects.reference,
    offsetParent: await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating)),
    strategy
  }) : rects[elementContext]);
  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
}

const min$1 = Math.min;
const max$1 = Math.max;

function within(min$1$1, value, max$1$1) {
  return max$1(min$1$1, min$1(value, max$1$1));
}

const hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, matched => hash$1[matched]);
}

function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }

  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';

  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }

  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}

const hash = {
  start: 'end',
  end: 'start'
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, matched => hash[matched]);
}

function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}

/**
 * Changes the placement of the floating element to one that will fit if the
 * initially specified `placement` does not.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'flip',
    options,

    async fn(middlewareArguments) {
      var _middlewareData$flip;

      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = side === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];

      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }

      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
        overflows.push(overflow[main], overflow[cross]);
      }

      overflowsData = [...overflowsData, {
        placement,
        overflows
      }]; // One or more sides is overflowing

      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip2;

        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements[nextIndex];

        if (nextPlacement) {
          // Try next placement and re-run the lifecycle
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        let resetPlacement = 'bottom';

        switch (fallbackStrategy) {
          case 'bestFit':
            {
              var _overflowsData$map$so;

              const placement = (_overflowsData$map$so = overflowsData.map(d => [d, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;

              if (placement) {
                resetPlacement = placement;
              }

              break;
            }

          case 'initialPlacement':
            resetPlacement = initialPlacement;
            break;
        }

        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }

      return {};
    }

  };
};

async function convertValueToCoords(middlewareArguments, value) {
  const {
    placement,
    platform,
    elements
  } = middlewareArguments;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === 'x';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === 'function' ? value(middlewareArguments) : value; // eslint-disable-next-line prefer-const

  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };

  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }

  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
/**
 * Displaces the floating element from its reference element.
 * @see https://floating-ui.com/docs/offset
 */

const offset = function (value) {
  if (value === void 0) {
    value = 0;
  }

  return {
    name: 'offset',
    options: value,

    async fn(middlewareArguments) {
      const {
        x,
        y
      } = middlewareArguments;
      const diffCoords = await convertValueToCoords(middlewareArguments, value);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }

  };
};

function getCrossAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/**
 * Shifts the floating element in order to keep it in view when it will overflow
 * a clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'shift',
    options,

    async fn(middlewareArguments) {
      const {
        x,
        y,
        placement
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = options;
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];

      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min, mainAxisCoord, max);
      }

      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min, crossAxisCoord, max);
      }

      const limitedCoords = limiter.fn({ ...middlewareArguments,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return { ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }

  };
};

/**
 * Provides data to change the size of the floating element. For instance,
 * prevent it from overflowing its clipping boundary or match the width of the
 * reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'size',
    options,

    async fn(middlewareArguments) {
      const {
        placement,
        rects,
        platform,
        elements
      } = middlewareArguments;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = options;
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      let heightSide;
      let widthSide;

      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }

      const xMin = max$1(overflow.left, 0);
      const xMax = max$1(overflow.right, 0);
      const yMin = max$1(overflow.top, 0);
      const yMax = max$1(overflow.bottom, 0);
      const dimensions = {
        availableHeight: rects.floating.height - (['left', 'right'].includes(placement) ? 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max$1(overflow.top, overflow.bottom)) : overflow[heightSide]),
        availableWidth: rects.floating.width - (['top', 'bottom'].includes(placement) ? 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max$1(overflow.left, overflow.right)) : overflow[widthSide])
      };
      await apply({ ...middlewareArguments,
        ...dimensions
      });
      const nextDimensions = await platform.getDimensions(elements.floating);

      if (rects.floating.width !== nextDimensions.width || rects.floating.height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }

      return {};
    }

  };
};

function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}
function getWindow$1(node) {
  if (node == null) {
    return window;
  }

  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getComputedStyle$1(element) {
  return getWindow$1(element).getComputedStyle(element);
}

function getNodeName(node) {
  return isWindow(node) ? '' : node ? (node.nodeName || '').toLowerCase() : '';
}

function getUAString() {
  const uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(item => item.brand + "/" + item.version).join(' ');
  }

  return navigator.userAgent;
}

function isHTMLElement$1(value) {
  return value instanceof getWindow$1(value).HTMLElement;
}
function isElement$1(value) {
  return value instanceof getWindow$1(value).Element;
}
function isNode(value) {
  return value instanceof getWindow$1(value).Node;
}
function isShadowRoot(node) {
  // Browsers without `ShadowRoot` support
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  const OwnElement = getWindow$1(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  // TODO: Try and use feature detection here instead
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element); // This is non-exhaustive but covers the most common CSS properties that
  // create a containing block.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

  return css.transform !== 'none' || css.perspective !== 'none' || isFirefox && css.willChange === 'filter' || isFirefox && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective'].some(value => css.willChange.includes(value)) || ['paint', 'layout', 'strict', 'content'].some( // TS 4.1 compat
  value => {
    const contain = css.contain;
    return contain != null ? contain.includes(value) : false;
  });
}
function isLayoutViewport() {
  // Not Safari
  return !/^((?!chrome|android).)*safari/i.test(getUAString()); // Feature detection for this fails in various ways
  // • Always-visible scrollbar or not
  // • Width of <html>, etc.
  // const vV = win.visualViewport;
  // return vV ? Math.abs(win.innerWidth / vV.scale - vV.width) < 0.5 : true;
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}

const min = Math.min;
const max = Math.max;
const round$1 = Math.round;

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;

  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  const clientRect = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;

  if (includeScale && isHTMLElement$1(element)) {
    scaleX = element.offsetWidth > 0 ? round$1(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round$1(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  const win = isElement$1(element) ? getWindow$1(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
  const width = clientRect.width / scaleX;
  const height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}

function getNodeScroll(element) {
  if (isElement$1(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

function isScaled(element) {
  const rect = getBoundingClientRect(element);
  return round$1(rect.width) !== element.offsetWidth || round$1(rect.height) !== element.offsetHeight;
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement$1(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element, // @ts-ignore - checked above (TS 4.1 compat)
  isOffsetParentAnElement && isScaled(offsetParent), strategy === 'fixed');
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement$1(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // @ts-ignore
    node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    node.parentNode || ( // DOM Element detected
    isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
    getDocumentElement(node) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement$1(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
}

function getContainingBlock(element) {
  let currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement$1(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      const parent = currentNode.parentNode;
      currentNode = isShadowRoot(parent) ? parent.host : parent;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  const window = getWindow$1(element);
  let offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getDimensions(element) {
  if (isHTMLElement$1(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement$1(offsetParent);
  const documentElement = getDocumentElement(offsetParent);

  if (offsetParent === documentElement) {
    return rect;
  }

  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement$1(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } // This doesn't appear to be need to be negated.
    // else if (documentElement) {
    //   offsets.x = getWindowScrollBarX(documentElement);
    // }

  }

  return { ...rect,
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow$1(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width,
    height,
    x,
    y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width,
    height,
    x,
    y
  };
}

function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);

  if (isLastTraversableNode(parentNode)) {
    // @ts-ignore assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement$1(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }

  return getNearestOverflowAncestor(parentNode);
}

function getOverflowAncestors(node, list) {
  var _node$ownerDocument;

  if (list === void 0) {
    list = [];
  }

  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow$1(scrollableAncestor);
  const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
  const updatedList = list.concat(target);
  return isBody ? updatedList : // @ts-ignore: isBody tells us target will be an HTMLElement here
  updatedList.concat(getOverflowAncestors(target));
}

function contains(parent, child) {
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;

    do {
      // use `===` replace node.isSameNode()
      if (next && parent === next) {
        return true;
      } // @ts-ignore: need a better way to handle this...


      next = next.parentNode || next.host;
    } while (next);
  }

  return false;
}

function getNearestParentCapableOfEscapingClipping(element, clippingAncestors) {
  let currentNode = element;

  while (currentNode && !isLastTraversableNode(currentNode) && // @ts-expect-error
  !clippingAncestors.includes(currentNode)) {
    if (isElement$1(currentNode) && ['absolute', 'fixed'].includes(getComputedStyle$1(currentNode).position)) {
      break;
    }

    const parentNode = getParentNode(currentNode);
    currentNode = isShadowRoot(parentNode) ? parentNode.host : parentNode;
  }

  return currentNode;
}

function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, false, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  return {
    top,
    left,
    x: left,
    y: top,
    right: left + element.clientWidth,
    bottom: top + element.clientHeight,
    width: element.clientWidth,
    height: element.clientHeight
  };
}

function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
  if (clippingParent === 'viewport') {
    return rectToClientRect(getViewportRect(element, strategy));
  }

  if (isElement$1(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent, strategy);
  }

  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping ancestor" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingAncestors(element) {
  const clippingAncestors = getOverflowAncestors(element);
  const nearestEscapableParent = getNearestParentCapableOfEscapingClipping(element, clippingAncestors);
  let clipperElement = null;

  if (nearestEscapableParent && isHTMLElement$1(nearestEscapableParent)) {
    const offsetParent = getOffsetParent(nearestEscapableParent);

    if (isOverflowElement(nearestEscapableParent)) {
      clipperElement = nearestEscapableParent;
    } else if (isHTMLElement$1(offsetParent)) {
      clipperElement = offsetParent;
    }
  }

  if (!isElement$1(clipperElement)) {
    return [];
  } // @ts-ignore isElement check ensures we return Array<Element>


  return clippingAncestors.filter(clippingAncestors => clipperElement && isElement$1(clippingAncestors) && contains(clippingAncestors, clipperElement) && getNodeName(clippingAncestors) !== 'body');
} // Gets the maximum area that the element is visible in due to any number of
// clipping ancestors


function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const mainClippingAncestors = boundary === 'clippingAncestors' ? getClippingAncestors(element) : [].concat(boundary);
  const clippingAncestors = [...mainClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

const platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement: isElement$1,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getElementRects: _ref => {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: { ...getDimensions(floating),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: element => Array.from(element.getClientRects()),
  isRTL: element => getComputedStyle$1(element).direction === 'rtl'
};

/**
 * Automatically updates the position of the floating element when necessary.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }

  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...(isElement$1(reference) ? getOverflowAncestors(reference) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  let observer = null;

  if (elementResize) {
    let initialUpdate = true;
    observer = new ResizeObserver(() => {
      if (!initialUpdate) {
        update();
      }

      initialUpdate = false;
    });
    isElement$1(reference) && !animationFrame && observer.observe(reference);
    observer.observe(floating);
  }

  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;

  if (animationFrame) {
    frameLoop();
  }

  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);

    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }

    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }

  update();
  return () => {
    var _observer;

    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;

    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */

const computePosition = (reference, floating, options) => computePosition$1(reference, floating, {
  platform,
  ...options
});

var index$1 = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }

  let length, i, keys;

  if (a && b && typeof a == 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    keys = Object.keys(a);
    length = keys.length;

    if (length !== Object.keys(b).length) {
      return false;
    }

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (i = length; i-- !== 0;) {
      const key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        continue;
      }

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a !== a && b !== b;
}

function useLatestRef$1(value) {
  const ref = React.useRef(value);
  index$1(() => {
    ref.current = value;
  });
  return ref;
}

function useFloating$1(_temp) {
  let {
    middleware,
    placement = 'bottom',
    strategy = 'absolute',
    whileElementsMounted
  } = _temp === void 0 ? {} : _temp;
  const [data, setData] = React.useState({
    // Setting these to `null` will allow the consumer to determine if
    // `computePosition()` has run yet
    x: null,
    y: null,
    strategy,
    placement,
    middlewareData: {}
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);

  if (!deepEqual(latestMiddleware == null ? void 0 : latestMiddleware.map(_ref => {
    let {
      name,
      options
    } = _ref;
    return {
      name,
      options
    };
  }), middleware == null ? void 0 : middleware.map(_ref2 => {
    let {
      name,
      options
    } = _ref2;
    return {
      name,
      options
    };
  }))) {
    setLatestMiddleware(middleware);
  }

  const reference = React.useRef(null);
  const floating = React.useRef(null);
  const cleanupRef = React.useRef(null);
  const dataRef = React.useRef(data);
  const whileElementsMountedRef = useLatestRef$1(whileElementsMounted);
  const update = React.useCallback(() => {
    if (!reference.current || !floating.current) {
      return;
    }

    computePosition(reference.current, floating.current, {
      middleware: latestMiddleware,
      placement,
      strategy
    }).then(data => {
      if (isMountedRef.current && !deepEqual(dataRef.current, data)) {
        dataRef.current = data;
        ReactDOM.flushSync(() => {
          setData(data);
        });
      }
    });
  }, [latestMiddleware, placement, strategy]);
  index$1(() => {
    // Skip first update
    if (isMountedRef.current) {
      update();
    }
  }, [update]);
  const isMountedRef = React.useRef(false);
  index$1(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const runElementMountCallback = React.useCallback(() => {
    if (typeof cleanupRef.current === 'function') {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (reference.current && floating.current) {
      if (whileElementsMountedRef.current) {
        const cleanupFn = whileElementsMountedRef.current(reference.current, floating.current, update);
        cleanupRef.current = cleanupFn;
      } else {
        update();
      }
    }
  }, [update, whileElementsMountedRef]);
  const setReference = React.useCallback(node => {
    reference.current = node;
    runElementMountCallback();
  }, [runElementMountCallback]);
  const setFloating = React.useCallback(node => {
    floating.current = node;
    runElementMountCallback();
  }, [runElementMountCallback]);
  const refs = React.useMemo(() => ({
    reference,
    floating
  }), []);
  return React.useMemo(() => ({ ...data,
    update,
    refs,
    reference: setReference,
    floating: setFloating
  }), [data, update, refs, setReference, setFloating]);
}

var getDefaultParent = function (originalTarget) {
    if (typeof document === 'undefined') {
        return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
};
var counterMap = new WeakMap();
var uncontrolledNodes = new WeakMap();
var markerMap = {};
var lockCount = 0;
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @param {String} [controlAttribute] - html Attribute to control
 * @return {Undo} undo command
 */
var applyAttributeToOthers = function (originalTarget, parentNode, markerName, controlAttribute) {
    var targets = Array.isArray(originalTarget) ? originalTarget : [originalTarget];
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = new Set();
    var elementsToStop = new Set(targets);
    var keep = function (el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function (parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        Array.prototype.forEach.call(parent.children, function (node) {
            if (elementsToKeep.has(node)) {
                deep(node);
            }
            else {
                var attr = node.getAttribute(controlAttribute);
                var alreadyHidden = attr !== null && attr !== 'false';
                var counterValue = (counterMap.get(node) || 0) + 1;
                var markerValue = (markerCounter.get(node) || 0) + 1;
                counterMap.set(node, counterValue);
                markerCounter.set(node, markerValue);
                hiddenNodes.push(node);
                if (counterValue === 1 && alreadyHidden) {
                    uncontrolledNodes.set(node, true);
                }
                if (markerValue === 1) {
                    node.setAttribute(markerName, 'true');
                }
                if (!alreadyHidden) {
                    node.setAttribute(controlAttribute, 'true');
                }
            }
        });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function () {
        hiddenNodes.forEach(function (node) {
            var counterValue = counterMap.get(node) - 1;
            var markerValue = markerCounter.get(node) - 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            if (!counterValue) {
                if (!uncontrolledNodes.has(node)) {
                    node.removeAttribute(controlAttribute);
                }
                uncontrolledNodes.delete(node);
            }
            if (!markerValue) {
                node.removeAttribute(markerName);
            }
        });
        lockCount--;
        if (!lockCount) {
            // clear
            counterMap = new WeakMap();
            counterMap = new WeakMap();
            uncontrolledNodes = new WeakMap();
            markerMap = {};
        }
    };
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var hideOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-aria-hidden'; }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    // we should not hide ariaLive elements - https://github.com/theKashey/aria-hidden/issues/10
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll('[aria-live]')));
    return applyAttributeToOthers(targets, activeParentNode, markerName, 'aria-hidden');
};

var index = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

function createPubSub() {
  const map = new Map();
  return {
    emit(event, data) {
      var _map$get;

      (_map$get = map.get(event)) == null ? void 0 : _map$get.forEach(handler => handler(data));
    },

    on(event, listener) {
      map.set(event, [...(map.get(event) || []), listener]);
    },

    off(event, listener) {
      map.set(event, (map.get(event) || []).filter(l => l !== listener));
    }

  };
}

let serverHandoffComplete = false;
let count = 0;

const genId = () => "floating-ui-" + count++;

function useFloatingId() {
  const [id, setId] = React.useState(() => serverHandoffComplete ? genId() : undefined);
  index(() => {
    if (id == null) {
      setId(genId());
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  React.useEffect(() => {
    if (!serverHandoffComplete) {
      serverHandoffComplete = true;
    }
  }, []);
  return id;
} // `toString()` prevents bundlers from trying to `import { useId } from 'react'`


const useReactId = React[/*#__PURE__*/'useId'.toString()];
/**
 * Uses React 18's built-in `useId()` when available, or falls back to a
 * slightly less performant (requiring a double render) implementation for
 * earlier React versions.
 * @see https://floating-ui.com/docs/useId
 */

const useId = useReactId != null ? useReactId : useFloatingId;

const FloatingNodeContext = /*#__PURE__*/React.createContext(null);
const FloatingTreeContext = /*#__PURE__*/React.createContext(null);
const useFloatingParentNodeId = () => {
  var _React$useContext$id, _React$useContext;

  return (_React$useContext$id = (_React$useContext = React.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) != null ? _React$useContext$id : null;
};
const useFloatingTree = () => React.useContext(FloatingTreeContext);

function getDocument(floating) {
  var _floating$ownerDocume;

  return (_floating$ownerDocume = floating == null ? void 0 : floating.ownerDocument) != null ? _floating$ownerDocume : document;
}

function getWindow(value) {
  var _getDocument$defaultV;

  return (_getDocument$defaultV = getDocument(value).defaultView) != null ? _getDocument$defaultV : window;
}

function isElement(value) {
  return value ? value instanceof getWindow(value).Element : false;
}
function isHTMLElement(value) {
  return value ? value instanceof getWindow(value).HTMLElement : false;
}

// `toString()` prevents bundlers from trying to `import { useInsertionEffect } from 'react'`
const useInsertionEffect = React[/*#__PURE__*/'useInsertionEffect'.toString()];
function useEvent(callback) {
  const ref = React.useRef(() => {
    if (process.env.NODE_ENV !== "production") {
      throw new Error('Cannot call an event handler while rendering.');
    }
  });

  if (useInsertionEffect) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    ref.current = callback;
  }

  return React.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}

function useFloating(_temp) {
  let {
    open = false,
    onOpenChange: unstable_onOpenChange,
    whileElementsMounted,
    placement,
    middleware,
    strategy,
    nodeId
  } = _temp === void 0 ? {} : _temp;
  const [domReference, setDomReference] = React.useState(null);
  const tree = useFloatingTree();
  const domReferenceRef = React.useRef(null);
  const dataRef = React.useRef({});
  const events = React.useState(() => createPubSub())[0];
  const position = useFloating$1({
    placement,
    middleware,
    strategy,
    whileElementsMounted
  });
  const onOpenChange = useEvent(unstable_onOpenChange);
  const refs = React.useMemo(() => ({ ...position.refs,
    domReference: domReferenceRef
  }), [position.refs]);
  const context = React.useMemo(() => ({ ...position,
    refs,
    dataRef,
    nodeId,
    events,
    open,
    onOpenChange,
    _: {
      domReference
    }
  }), [position, nodeId, events, open, onOpenChange, refs, domReference]);
  index(() => {
    const node = tree == null ? void 0 : tree.nodesRef.current.find(node => node.id === nodeId);

    if (node) {
      node.context = context;
    }
  });
  const {
    reference
  } = position;
  const setReference = React.useCallback(node => {
    if (isElement(node) || node === null) {
      context.refs.domReference.current = node;
      setDomReference(node);
    }

    reference(node);
  }, [reference, context.refs]);
  return React.useMemo(() => ({ ...position,
    context,
    refs,
    reference: setReference
  }), [position, refs, context, setReference]);
}

function mergeProps(userProps, propsList, elementKey) {
  const map = new Map();
  return { ...(elementKey === 'floating' && {
      tabIndex: -1
    }),
    ...userProps,
    ...propsList.map(value => value ? value[elementKey] : null).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }

      Object.entries(props).forEach(_ref => {
        let [key, value] = _ref;

        if (key.indexOf('on') === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }

          if (typeof value === 'function') {
            var _map$get;

            (_map$get = map.get(key)) == null ? void 0 : _map$get.push(value);

            acc[key] = function () {
              var _map$get2;

              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.forEach(fn => fn(...args));
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}

const useInteractions = function (propsList) {
  if (propsList === void 0) {
    propsList = [];
  }

  return {
    getReferenceProps: userProps => mergeProps(userProps, propsList, 'reference'),
    getFloatingProps: userProps => mergeProps(userProps, propsList, 'floating'),
    getItemProps: userProps => mergeProps(userProps, propsList, 'item')
  };
};

function getChildren(nodes, id) {
  var _nodes$filter;

  let allChildren = (_nodes$filter = nodes.filter(node => {
    var _node$context;

    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  })) != null ? _nodes$filter : [];
  let currentChildren = allChildren;

  while (currentChildren.length) {
    var _nodes$filter2;

    currentChildren = (_nodes$filter2 = nodes.filter(node => {
      var _currentChildren;

      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some(n => {
        var _node$context2;

        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    })) != null ? _nodes$filter2 : [];
    allChildren = allChildren.concat(currentChildren);
  }

  return allChildren;
}

const DEFAULT_ID = 'floating-ui-root';
const useFloatingPortalNode = function (_temp) {
  let {
    id = DEFAULT_ID,
    enabled = true
  } = _temp === void 0 ? {} : _temp;
  const [portalEl, setPortalEl] = React.useState(null);
  index(() => {
    if (!enabled) {
      return;
    }

    const rootNode = document.getElementById(id);

    if (rootNode) {
      setPortalEl(rootNode);
    } else {
      const newPortalEl = document.createElement('div');
      newPortalEl.id = id;
      setPortalEl(newPortalEl);

      if (!document.body.contains(newPortalEl)) {
        document.body.appendChild(newPortalEl);
      }
    }
  }, [id, enabled]);
  return portalEl;
};
/**
 * Portals your floating element outside of the main app node.
 * @see https://floating-ui.com/docs/FloatingPortal
 */

const FloatingPortal = _ref => {
  let {
    children,
    id = DEFAULT_ID,
    root = null
  } = _ref;
  const portalNode = useFloatingPortalNode({
    id,
    enabled: !root
  });

  if (root) {
    return /*#__PURE__*/createPortal(children, root);
  }

  if (portalNode) {
    return /*#__PURE__*/createPortal(children, portalNode);
  }

  return null;
};

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

// Avoid Chrome DevTools blue warning
function getPlatform() {
  const uaData = navigator.userAgentData;

  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }

  return navigator.platform;
}

const identifier = 'data-floating-ui-scroll-lock';
/**
 * Provides base styling for a fixed overlay element to dim content or block
 * pointer events behind a floating element.
 * It's a regular `<div>`, so it can be styled via any CSS solution you prefer.
 * @see https://floating-ui.com/docs/FloatingOverlay
 */

const FloatingOverlay = /*#__PURE__*/React.forwardRef(function FloatingOverlay(_ref, ref) {
  let {
    lockScroll = false,
    ...rest
  } = _ref;
  index(() => {
    var _window$visualViewpor, _window$visualViewpor2, _window$visualViewpor3, _window$visualViewpor4;

    if (!lockScroll) {
      return;
    }

    const alreadyLocked = document.body.hasAttribute(identifier);

    if (alreadyLocked) {
      return;
    }

    document.body.setAttribute(identifier, ''); // RTL <body> scrollbar

    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? 'paddingLeft' : 'paddingRight';
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth; // Only iOS doesn't respect `overflow: hidden` on document.body, and this
    // technique has fewer side effects.

    if (!/iP(hone|ad|od)|iOS/.test(getPlatform())) {
      Object.assign(document.body.style, {
        overflow: 'hidden',
        [paddingProp]: scrollbarWidth + "px"
      });
      return () => {
        document.body.removeAttribute(identifier);
        Object.assign(document.body.style, {
          overflow: '',
          [paddingProp]: ''
        });
      };
    } // iOS 12 does not support `visuaViewport`.


    const offsetLeft = (_window$visualViewpor = (_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetLeft) != null ? _window$visualViewpor : 0;
    const offsetTop = (_window$visualViewpor3 = (_window$visualViewpor4 = window.visualViewport) == null ? void 0 : _window$visualViewpor4.offsetTop) != null ? _window$visualViewpor3 : 0;
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    Object.assign(document.body.style, {
      position: 'fixed',
      overflow: 'hidden',
      top: -(scrollY - Math.floor(offsetTop)) + "px",
      left: -(scrollX - Math.floor(offsetLeft)) + "px",
      right: '0',
      [paddingProp]: scrollbarWidth + "px"
    });
    return () => {
      Object.assign(document.body.style, {
        position: '',
        overflow: '',
        top: '',
        left: '',
        right: '',
        [paddingProp]: ''
      });
      document.body.removeAttribute(identifier);
      window.scrollTo(scrollX, scrollY);
    };
  }, [lockScroll]);
  return /*#__PURE__*/React.createElement("div", _extends$1({
    ref: ref
  }, rest, {
    style: {
      position: 'fixed',
      overflow: 'auto',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});

/**
 * Find the real active element. Traverses into shadowRoots.
 */
function activeElement(doc) {
  let activeElement = doc.activeElement;

  while (((_activeElement = activeElement) == null ? void 0 : (_activeElement$shadow = _activeElement.shadowRoot) == null ? void 0 : _activeElement$shadow.activeElement) != null) {
    var _activeElement, _activeElement$shadow;

    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement;
}

function getAncestors(nodes, id) {
  var _nodes$find;

  let allAncestors = [];
  let currentParentId = (_nodes$find = nodes.find(node => node.id === id)) == null ? void 0 : _nodes$find.parentId;

  while (currentParentId) {
    const currentNode = nodes.find(node => node.id === currentParentId);
    currentParentId = currentNode == null ? void 0 : currentNode.parentId;

    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }

  return allAncestors;
}

function getTarget(event) {
  if ('composedPath' in event) {
    return event.composedPath()[0];
  } // TS thinks `event` is of type never as it assumes all browsers support
  // `composedPath()`, but browsers without shadow DOM don't.


  return event.target;
}

const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(element) {
  return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}

function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

function useLatestRef(value) {
  const ref = useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}

function focus(el, preventScroll) {
  if (preventScroll === void 0) {
    preventScroll = false;
  }

  // `mousedown` clicks occur before `focus`, so the button will steal the
  // focus unless we wait a frame.
  requestAnimationFrame(() => {
    el == null ? void 0 : el.focus({
      preventScroll
    });
  });
}

const SELECTOR = 'select:not([disabled]),a[href],button:not([disabled]),[tabindex],' + 'iframe,object,embed,area[href],audio[controls],video[controls],' + TYPEABLE_SELECTOR;
const FocusGuard = /*#__PURE__*/React.forwardRef(function FocusGuard(props, ref) {
  return /*#__PURE__*/React.createElement("span", _extends$1({}, props, {
    ref: ref,
    tabIndex: 0,
    style: {
      position: 'fixed',
      opacity: '0',
      pointerEvents: 'none',
      outline: '0'
    }
  }));
});

/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 */
function FloatingFocusManager(_ref) {
  let {
    context: {
      refs,
      nodeId,
      onOpenChange,
      dataRef,
      events
    },
    children,
    order = ['content'],
    endGuard = true,
    initialFocus = 0,
    returnFocus = true,
    modal = true
  } = _ref;
  const orderRef = useLatestRef(order);
  const tree = useFloatingTree();
  const getTabbableElements = React.useCallback(() => {
    return orderRef.current.map(type => {
      if (type === 'reference') {
        return refs.domReference.current;
      }

      if (refs.floating.current && type === 'floating') {
        return refs.floating.current;
      }

      if (type === 'content') {
        var _refs$floating$curren, _refs$floating$curren2;

        return Array.from((_refs$floating$curren = (_refs$floating$curren2 = refs.floating.current) == null ? void 0 : _refs$floating$curren2.querySelectorAll(SELECTOR)) != null ? _refs$floating$curren : []);
      }

      return null;
    }).flat().filter(el => {
      if (el === refs.floating.current || el === refs.domReference.current) {
        return true;
      }

      if (isHTMLElement(el)) {
        var _el$getAttribute;

        const tabIndex = (_el$getAttribute = el.getAttribute('tabindex')) != null ? _el$getAttribute : '0';
        return tabIndex[0].trim() !== '-';
      }
    });
  }, [orderRef, refs]);
  React.useEffect(() => {
    if (!modal) {
      return;
    } // If the floating element has no focusable elements inside it, fallback
    // to focusing the floating element and preventing tab navigation


    const noTabbableContentElements = getTabbableElements().filter(el => el !== refs.floating.current && el !== refs.domReference.current).length === 0;

    function onKeyDown(event) {
      if (event.key === 'Tab') {
        if (noTabbableContentElements) {
          stopEvent(event);
        }

        const els = getTabbableElements();
        const target = getTarget(event);

        if (orderRef.current[0] === 'reference' && target === refs.domReference.current) {
          stopEvent(event);

          if (event.shiftKey) {
            focus(els[els.length - 1]);
          } else {
            focus(els[1]);
          }
        }

        if (orderRef.current[1] === 'floating' && target === refs.floating.current && event.shiftKey) {
          stopEvent(event);
          focus(els[0]);
        }
      }
    }

    const doc = getDocument(refs.floating.current);
    doc.addEventListener('keydown', onKeyDown);
    return () => {
      doc.removeEventListener('keydown', onKeyDown);
    };
  }, [modal, getTabbableElements, orderRef, refs]);
  React.useEffect(() => {
    let isPointerDown = false;

    function onFocusOut(event) {
      var _refs$floating$curren3, _getAncestors;

      const relatedTarget = event.relatedTarget;
      const focusMovedOutsideFloating = !((_refs$floating$curren3 = refs.floating.current) != null && _refs$floating$curren3.contains(relatedTarget));
      const focusMovedOutsideReference = isElement(refs.domReference.current) && !refs.domReference.current.contains(relatedTarget);
      const isChildOpen = tree && getChildren(tree.nodesRef.current, nodeId).length > 0;
      const isParentRelated = tree && event.currentTarget === refs.domReference.current && ((_getAncestors = getAncestors(tree.nodesRef.current, nodeId)) == null ? void 0 : _getAncestors.some(node => {
        var _node$context, _node$context$refs$fl;

        return (_node$context = node.context) == null ? void 0 : (_node$context$refs$fl = _node$context.refs.floating.current) == null ? void 0 : _node$context$refs$fl.contains(relatedTarget);
      }));

      if (focusMovedOutsideFloating && focusMovedOutsideReference && !isChildOpen && !isParentRelated && !isPointerDown) {
        onOpenChange(false);
      }
    }

    function onPointerDown() {
      // In Safari, buttons *lose* focus when pressing them. This causes the
      // reference `focusout` to fire, which closes the floating element.
      isPointerDown = true;
      setTimeout(() => {
        isPointerDown = false;
      });
    }

    const floating = refs.floating.current;
    const reference = refs.domReference.current;

    if (floating && isHTMLElement(reference)) {
      if (!modal) {
        floating.addEventListener('focusout', onFocusOut);
        reference.addEventListener('focusout', onFocusOut);
        reference.addEventListener('pointerdown', onPointerDown);
      }

      let cleanup;

      if (modal) {
        if (orderRef.current.includes('reference')) {
          cleanup = hideOthers([reference, floating]);
        } else {
          cleanup = hideOthers(floating);
        }
      }

      return () => {
        if (!modal) {
          floating.removeEventListener('focusout', onFocusOut);
          reference.removeEventListener('focusout', onFocusOut);
          reference.removeEventListener('pointerdown', onPointerDown);
        }

        cleanup == null ? void 0 : cleanup();
      };
    }
  }, [nodeId, tree, modal, onOpenChange, orderRef, dataRef, getTabbableElements, refs]);
  React.useEffect(() => {
    const floating = refs.floating.current;
    const doc = getDocument(floating);
    let returnFocusValue = returnFocus;
    let preventReturnFocusScroll = false;
    let previouslyFocusedElement = activeElement(doc);

    if (previouslyFocusedElement === doc.body && refs.domReference.current) {
      previouslyFocusedElement = refs.domReference.current;
    }

    if (typeof initialFocus === 'number') {
      var _getTabbableElements$;

      const el = (_getTabbableElements$ = getTabbableElements()[initialFocus]) != null ? _getTabbableElements$ : floating;
      focus(el, el === floating);
    } else if (isHTMLElement(initialFocus.current)) {
      var _initialFocus$current;

      const el = (_initialFocus$current = initialFocus.current) != null ? _initialFocus$current : floating;
      focus(el, el === floating);
    } // Dismissing via outside press should always ignore `returnFocus` to
    // prevent unwanted scrolling.


    function onDismiss(allowReturnFocus) {
      if (allowReturnFocus === void 0) {
        allowReturnFocus = false;
      }

      if (typeof allowReturnFocus === 'object') {
        returnFocusValue = true;
        preventReturnFocusScroll = allowReturnFocus.preventScroll;
      } else {
        returnFocusValue = allowReturnFocus;
      }
    }

    events.on('dismiss', onDismiss);
    return () => {
      events.off('dismiss', onDismiss);

      if (returnFocusValue && isHTMLElement(previouslyFocusedElement)) {
        focus(previouslyFocusedElement, preventReturnFocusScroll);
      }
    };
  }, [getTabbableElements, initialFocus, returnFocus, refs, events]);

  const isTypeableCombobox = () => {
    var _refs$domReference$cu;

    return ((_refs$domReference$cu = refs.domReference.current) == null ? void 0 : _refs$domReference$cu.getAttribute('role')) === 'combobox' && isTypeableElement(refs.domReference.current);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, modal && /*#__PURE__*/React.createElement(FocusGuard, {
    onFocus: event => {
      if (isTypeableCombobox()) {
        return;
      }

      stopEvent(event);
      const els = getTabbableElements();

      if (order[0] === 'reference') {
        focus(els[0]);
      } else {
        focus(els[els.length - 1]);
      }
    }
  }), /*#__PURE__*/React.cloneElement(children, order.includes('floating') ? {
    tabIndex: 0
  } : {}), modal && endGuard && /*#__PURE__*/React.createElement(FocusGuard, {
    onFocus: event => {
      if (isTypeableCombobox()) {
        return;
      }

      stopEvent(event);
      focus(getTabbableElements()[0]);
    }
  }));
}

function usePrevious(value) {
  const ref = useRef();
  index(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * Adds relevant screen reader props for a given element `role`.
 * @see https://floating-ui.com/docs/useRole
 */
const useRole = function (_ref, _temp) {
  let {
    open
  } = _ref;
  let {
    enabled = true,
    role = 'dialog'
  } = _temp === void 0 ? {} : _temp;
  const rootId = useId();
  const referenceId = useId();
  const floatingProps = {
    id: rootId,
    role
  };

  if (!enabled) {
    return {};
  }

  if (role === 'tooltip') {
    return {
      reference: {
        'aria-describedby': open ? rootId : undefined
      },
      floating: floatingProps
    };
  }

  return {
    reference: {
      'aria-expanded': open ? 'true' : 'false',
      'aria-haspopup': role === 'alertdialog' ? 'dialog' : role,
      'aria-controls': open ? rootId : undefined,
      ...(role === 'listbox' && {
        role: 'combobox'
      }),
      ...(role === 'menu' && {
        id: referenceId
      })
    },
    floating: { ...floatingProps,
      ...(role === 'menu' && {
        'aria-labelledby': referenceId
      })
    }
  };
};

function isButtonTarget(event) {
  return isHTMLElement(event.target) && event.target.tagName === 'BUTTON';
}

/**
 * Adds click event listeners that change the open state.
 * @see https://floating-ui.com/docs/useClick
 */
const useClick = function (_ref, _temp) {
  let {
    open,
    onOpenChange,
    dataRef,
    refs
  } = _ref;
  let {
    enabled = true,
    event: eventOption = 'click',
    toggle = true,
    ignoreMouse = false,
    keyboardHandlers = true
  } = _temp === void 0 ? {} : _temp;
  const pointerTypeRef = React.useRef();

  function isSpaceIgnored() {
    return isTypeableElement(refs.domReference.current);
  }

  if (!enabled) {
    return {};
  }

  return {
    reference: {
      onPointerDown(event) {
        pointerTypeRef.current = event.pointerType;
      },

      onMouseDown(event) {
        // Ignore all buttons except for the "main" button.
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        if (event.button !== 0) {
          return;
        }

        if (pointerTypeRef.current === 'mouse' && ignoreMouse) {
          return;
        }

        if (eventOption === 'click') {
          return;
        }

        if (open) {
          if (toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === 'mousedown' : true)) {
            onOpenChange(false);
          }
        } else {
          onOpenChange(true);
        }

        dataRef.current.openEvent = event.nativeEvent;
      },

      onClick(event) {
        if (eventOption === 'mousedown' && pointerTypeRef.current) {
          pointerTypeRef.current = undefined;
          return;
        }

        if (pointerTypeRef.current === 'mouse' && ignoreMouse) {
          return;
        }

        if (open) {
          if (toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === 'click' : true)) {
            onOpenChange(false);
          }
        } else {
          onOpenChange(true);
        }

        dataRef.current.openEvent = event.nativeEvent;
      },

      onKeyDown(event) {
        pointerTypeRef.current = undefined;

        if (!keyboardHandlers) {
          return;
        }

        if (isButtonTarget(event)) {
          return;
        }

        if (event.key === ' ' && !isSpaceIgnored()) {
          // Prvent scrolling
          event.preventDefault();
        }

        if (event.key === 'Enter') {
          if (open) {
            if (toggle) {
              onOpenChange(false);
            }
          } else {
            onOpenChange(true);
          }
        }
      },

      onKeyUp(event) {
        if (!keyboardHandlers) {
          return;
        }

        if (isButtonTarget(event) || isSpaceIgnored()) {
          return;
        }

        if (event.key === ' ') {
          if (open) {
            if (toggle) {
              onOpenChange(false);
            }
          } else {
            onOpenChange(true);
          }
        }
      }

    }
  };
};

/**
 * Check whether the event.target is within the provided node. Uses event.composedPath if available for custom element support.
 *
 * @param event The event whose target/composedPath to check
 * @param node The node to check against
 * @returns Whether the event.target/composedPath is within the node.
 */
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }

  if ('composedPath' in event) {
    return event.composedPath().includes(node);
  } // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't


  const e = event;
  return e.target != null && node.contains(e.target);
}

const bubbleHandlerKeys = {
  pointerdown: 'onPointerDown',
  mousedown: 'onMouseDown',
  click: 'onClick'
};
const captureHandlerKeys = {
  pointerdown: 'onPointerDownCapture',
  mousedown: 'onMouseDownCapture',
  click: 'onClickCapture'
};

/**
 * Adds listeners that dismiss (close) the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */
const useDismiss = function (_ref, _temp) {
  let {
    open,
    onOpenChange,
    refs,
    events,
    nodeId
  } = _ref;
  let {
    enabled = true,
    escapeKey = true,
    outsidePress = true,
    outsidePressEvent = 'pointerdown',
    referencePress = false,
    referencePressEvent = 'pointerdown',
    ancestorScroll = false,
    bubbles = true
  } = _temp === void 0 ? {} : _temp;
  const tree = useFloatingTree();
  const nested = useFloatingParentNodeId() != null;
  const insideReactTreeRef = React.useRef(false);
  React.useEffect(() => {
    if (!open || !enabled) {
      return;
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        if (!bubbles && tree && getChildren(tree.nodesRef.current, nodeId).length > 0) {
          return;
        }

        events.emit('dismiss', {
          preventScroll: false
        });
        onOpenChange(false);
      }
    }

    function onOutsidePress(event) {
      // Given developers can stop the propagation of the synthetic event,
      // we can only be confident with a positive value.
      const insideReactTree = insideReactTreeRef.current;
      insideReactTreeRef.current = false;

      if (insideReactTree) {
        return;
      }

      const target = getTarget(event); // Check if the click occurred on the scrollbar

      if (isElement(target) && refs.floating.current) {
        var _refs$floating$curren;

        const win = (_refs$floating$curren = refs.floating.current.ownerDocument.defaultView) != null ? _refs$floating$curren : window;
        const canScrollX = target.scrollWidth > target.clientWidth;
        const canScrollY = target.scrollHeight > target.clientHeight;
        let xCond = canScrollY && event.offsetX > target.clientWidth; // In some browsers it is possible to change the <body> (or window)
        // scrollbar to the left side, but is very rare and is difficult to
        // check for. Plus, for modal dialogs with backdrops, it is more
        // important that the backdrop is checked but not so much the window.

        if (canScrollY) {
          const isRTL = win.getComputedStyle(target).direction === 'rtl';

          if (isRTL) {
            xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
          }
        }

        if (xCond || canScrollX && event.offsetY > target.clientHeight) {
          return;
        }
      }

      const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some(node => {
        var _node$context;

        return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.refs.floating.current);
      });

      if (isEventTargetWithin(event, refs.floating.current) || isEventTargetWithin(event, refs.domReference.current) || targetIsInsideChildren) {
        return;
      }

      if (!bubbles && tree && getChildren(tree.nodesRef.current, nodeId).length > 0) {
        return;
      }

      events.emit('dismiss', nested ? {
        preventScroll: true
      } : false);
      onOpenChange(false);
    }

    function onScroll() {
      onOpenChange(false);
    }

    const doc = getDocument(refs.floating.current);
    escapeKey && doc.addEventListener('keydown', onKeyDown);
    outsidePress && doc.addEventListener(outsidePressEvent, onOutsidePress);
    const ancestors = (ancestorScroll ? [...(isElement(refs.reference.current) ? getOverflowAncestors(refs.reference.current) : []), ...(isElement(refs.floating.current) ? getOverflowAncestors(refs.floating.current) : [])] : []).filter(ancestor => {
      var _doc$defaultView;

      return (// Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
        ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport)
      );
    });
    ancestors.forEach(ancestor => ancestor.addEventListener('scroll', onScroll, {
      passive: true
    }));
    return () => {
      escapeKey && doc.removeEventListener('keydown', onKeyDown);
      outsidePress && doc.removeEventListener(outsidePressEvent, onOutsidePress);
      ancestors.forEach(ancestor => ancestor.removeEventListener('scroll', onScroll));
    };
  }, [escapeKey, outsidePress, outsidePressEvent, events, tree, nodeId, open, onOpenChange, ancestorScroll, enabled, bubbles, refs, nested]);

  if (!enabled) {
    return {};
  }

  return {
    reference: {
      [bubbleHandlerKeys[referencePressEvent]]: () => {
        if (referencePress) {
          events.emit('dismiss');
          onOpenChange(false);
        }
      }
    },
    floating: {
      [captureHandlerKeys[outsidePressEvent]]: () => {
        insideReactTreeRef.current = true;
      }
    }
  };
};

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

function isDifferentRow(index, cols, prevRow) {
  return Math.floor(index / cols) !== prevRow;
}

function isIndexOutOfBounds(listRef, index) {
  return index < 0 || index >= listRef.current.length;
}

function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index = startingIndex;

  do {
    var _list$index, _list$index2;

    index = index + (decrement ? -amount : amount);
  } while (index >= 0 && index <= list.length - 1 && (disabledIndices ? disabledIndices.includes(index) : list[index] == null || ((_list$index = list[index]) == null ? void 0 : _list$index.hasAttribute('disabled')) || ((_list$index2 = list[index]) == null ? void 0 : _list$index2.getAttribute('aria-disabled')) === 'true'));

  return index;
}

function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case 'vertical':
      return vertical;

    case 'horizontal':
      return horizontal;

    default:
      return vertical || horizontal;
  }
}

function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}

function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === 'Enter' || key == ' ' || key === '';
}

function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}

function isCrossOrientationCloseKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  return doSwitch(orientation, vertical, horizontal);
}

function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}

function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}

/**
 * Adds focus-managed indexed navigation via arrow keys to a list of items
 * within the floating element.
 * @see https://floating-ui.com/docs/useListNavigation
 */
const useListNavigation = function (_ref, _temp2) {
  let {
    open,
    onOpenChange,
    refs
  } = _ref;
  let {
    listRef,
    activeIndex,
    onNavigate: unstable_onNavigate = () => {},
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = 'auto',
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = undefined,
    orientation = 'vertical',
    cols = 1
  } = _temp2 === void 0 ? {
    listRef: {
      current: []
    },
    activeIndex: null,
    onNavigate: () => {}
  } : _temp2;

  if (process.env.NODE_ENV !== "production") {
    if (allowEscape) {
      if (!loop) {
        console.warn(['Floating UI: `useListNavigation` looping must be enabled to allow', 'escaping.'].join(' '));
      }

      if (!virtual) {
        console.warn(['Floating UI: `useListNavigation` must be virtual to allow', 'escaping.'].join(' '));
      }
    }

    if (orientation === 'vertical' && cols > 1) {
      console.warn(['Floating UI: In grid list navigation mode (`cols` > 1), the', '`orientation` should be either "horizontal" or "both".'].join(' '));
    }
  }

  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const previousOpen = usePrevious(open);
  const onNavigate = useEvent(unstable_onNavigate);
  const previousOnNavigate = useEvent(usePrevious(unstable_onNavigate));
  const focusItemOnOpenRef = React.useRef(focusItemOnOpen);
  const indexRef = React.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = React.useRef(null);
  const disabledIndicesRef = useLatestRef(disabledIndices);
  const blockPointerLeaveRef = React.useRef(false);
  const frameRef = React.useRef(-1);
  const [activeId, setActiveId] = React.useState();
  const focusItem = React.useCallback((listRef, indexRef) => {
    // `mousedown` clicks occur before `focus`, so the button will steal the
    // focus unless we wait a frame.
    frameRef.current = requestAnimationFrame(() => {
      if (virtual) {
        var _listRef$current$inde;

        setActiveId((_listRef$current$inde = listRef.current[indexRef.current]) == null ? void 0 : _listRef$current$inde.id);
      } else {
        var _listRef$current$inde2;

        (_listRef$current$inde2 = listRef.current[indexRef.current]) == null ? void 0 : _listRef$current$inde2.focus({
          preventScroll: true
        });
      }
    });
  }, [virtual]); // Sync `selectedIndex` to be the `activeIndex` upon opening the floating
  // element. Also, reset `activeIndex` upon closing the floating element.

  index(() => {
    if (!enabled) {
      return;
    }

    if (!previousOpen && open && focusItemOnOpenRef.current && selectedIndex != null) {
      onNavigate(selectedIndex);
    } // Unset `activeIndex`. Since the user can specify `onNavigate`
    // conditionally (onNavigate: open ? setActiveIndex : setSelectedIndex)
    // we store and call the previous function


    if (previousOpen && !open) {
      cancelAnimationFrame(frameRef.current);
      indexRef.current = -1;
      previousOnNavigate(null);
    }
  }, [open, previousOpen, selectedIndex, listRef, focusItem, enabled, onNavigate, previousOnNavigate]); // Sync `activeIndex` to be the focused item while the floating element is
  // open.

  index(() => {
    if (!enabled) {
      return;
    }

    if (open) {
      if (activeIndex == null) {
        if (selectedIndex != null) {
          return;
        } // Reset while the floating element was open (e.g. the list changed).


        if (previousOpen) {
          indexRef.current = -1;
          focusItem(listRef, indexRef);
        } // Initial sync


        if (!previousOpen && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
          indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinIndex(listRef, disabledIndicesRef.current) : getMaxIndex(listRef, disabledIndicesRef.current);
          onNavigate(indexRef.current);
          focusItem(listRef, indexRef);
        }
      } else if (!isIndexOutOfBounds(listRef, activeIndex)) {
        indexRef.current = activeIndex;
        focusItem(listRef, indexRef);
      }
    }
  }, [open, previousOpen, activeIndex, selectedIndex, nested, listRef, onNavigate, focusItem, enabled, allowEscape, orientation, rtl, virtual, disabledIndicesRef]); // Ensure the parent floating element has focus when a nested child closes
  // to allow arrow key navigation to work after the pointer leaves the child.

  index(() => {
    if (!enabled) {
      return;
    }

    if (!open && previousOpen) {
      var _tree$nodesRef$curren, _tree$nodesRef$curren2;

      const parentFloating = tree == null ? void 0 : (_tree$nodesRef$curren = tree.nodesRef.current.find(node => node.id === parentId)) == null ? void 0 : (_tree$nodesRef$curren2 = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren2.refs.floating.current;

      if (parentFloating && !parentFloating.contains(activeElement(getDocument(parentFloating)))) {
        parentFloating.focus({
          preventScroll: true
        });
      }
    }
  }, [enabled, open, previousOpen, tree, parentId]);
  index(() => {
    keyRef.current = null;
  });

  function onKeyDown(event) {
    blockPointerLeaveRef.current = true;

    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl)) {
      stopEvent(event);
      onOpenChange(false);

      if (isHTMLElement(refs.domReference.current)) {
        refs.domReference.current.focus();
      }

      return;
    }

    const currentIndex = indexRef.current;
    const minIndex = getMinIndex(listRef, disabledIndices);
    const maxIndex = getMaxIndex(listRef, disabledIndices);

    if (event.key === 'Home') {
      indexRef.current = minIndex;
      onNavigate(indexRef.current);
    }

    if (event.key === 'End') {
      indexRef.current = maxIndex;
      onNavigate(indexRef.current);
    } // Grid navigation


    if (cols > 1) {
      const prevIndex = indexRef.current;

      if (event.key === ARROW_UP) {
        stopEvent(event);

        if (prevIndex === -1) {
          indexRef.current = maxIndex;
        } else {
          indexRef.current = findNonDisabledIndex(listRef, {
            startingIndex: prevIndex,
            amount: cols,
            decrement: true,
            disabledIndices
          });

          if (loop && (prevIndex - cols < minIndex || indexRef.current < 0)) {
            const col = prevIndex % cols;
            const maxCol = maxIndex % cols;
            const offset = maxIndex - (maxCol - col);

            if (maxCol === col) {
              indexRef.current = maxIndex;
            } else {
              indexRef.current = maxCol > col ? offset : offset - cols;
            }
          }
        }

        if (isIndexOutOfBounds(listRef, indexRef.current)) {
          indexRef.current = prevIndex;
        }

        onNavigate(indexRef.current);
      }

      if (event.key === ARROW_DOWN) {
        stopEvent(event);

        if (prevIndex === -1) {
          indexRef.current = minIndex;
        } else {
          indexRef.current = findNonDisabledIndex(listRef, {
            startingIndex: prevIndex,
            amount: cols,
            disabledIndices
          });

          if (loop && prevIndex + cols > maxIndex) {
            indexRef.current = findNonDisabledIndex(listRef, {
              startingIndex: prevIndex % cols - cols,
              amount: cols,
              disabledIndices
            });
          }
        }

        if (isIndexOutOfBounds(listRef, indexRef.current)) {
          indexRef.current = prevIndex;
        }

        onNavigate(indexRef.current);
      } // Remains on the same row/column


      if (orientation === 'both') {
        const prevRow = Math.floor(prevIndex / cols);

        if (event.key === ARROW_RIGHT) {
          stopEvent(event);

          if (prevIndex % cols !== cols - 1) {
            indexRef.current = findNonDisabledIndex(listRef, {
              startingIndex: prevIndex,
              disabledIndices
            });

            if (loop && isDifferentRow(indexRef.current, cols, prevRow)) {
              indexRef.current = findNonDisabledIndex(listRef, {
                startingIndex: prevIndex - prevIndex % cols - 1,
                disabledIndices
              });
            }
          } else if (loop) {
            indexRef.current = findNonDisabledIndex(listRef, {
              startingIndex: prevIndex - prevIndex % cols - 1,
              disabledIndices
            });
          }

          if (isDifferentRow(indexRef.current, cols, prevRow)) {
            indexRef.current = prevIndex;
          }
        }

        if (event.key === ARROW_LEFT) {
          stopEvent(event);

          if (prevIndex % cols !== 0) {
            indexRef.current = findNonDisabledIndex(listRef, {
              startingIndex: prevIndex,
              disabledIndices,
              decrement: true
            });

            if (loop && isDifferentRow(indexRef.current, cols, prevRow)) {
              indexRef.current = findNonDisabledIndex(listRef, {
                startingIndex: prevIndex + (cols - prevIndex % cols),
                decrement: true,
                disabledIndices
              });
            }
          } else if (loop) {
            indexRef.current = findNonDisabledIndex(listRef, {
              startingIndex: prevIndex + (cols - prevIndex % cols),
              decrement: true,
              disabledIndices
            });
          }

          if (isDifferentRow(indexRef.current, cols, prevRow)) {
            indexRef.current = prevIndex;
          }
        }

        const lastRow = Math.floor(maxIndex / cols) === prevRow;

        if (isIndexOutOfBounds(listRef, indexRef.current)) {
          if (loop && lastRow) {
            indexRef.current = event.key === ARROW_LEFT ? maxIndex : findNonDisabledIndex(listRef, {
              startingIndex: prevIndex - prevIndex % cols - 1,
              disabledIndices
            });
          } else {
            indexRef.current = prevIndex;
          }
        }

        onNavigate(indexRef.current);
        return;
      }
    }

    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event); // Reset the index if no item is focused.

      if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate(indexRef.current);
        return;
      }

      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loop) {
          indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          });
        } else {
          indexRef.current = Math.min(maxIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else {
        if (loop) {
          indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        } else {
          indexRef.current = Math.max(minIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          }));
        }
      }

      if (isIndexOutOfBounds(listRef, indexRef.current)) {
        onNavigate(null);
      } else {
        onNavigate(indexRef.current);
      }
    }
  }

  if (!enabled) {
    return {};
  }

  return {
    reference: { ...(virtual && open && activeIndex != null && {
        'aria-activedescendant': activeId
      }),

      onKeyDown(event) {
        blockPointerLeaveRef.current = true;

        if (virtual && open) {
          return onKeyDown(event);
        }

        const isNavigationKey = event.key.indexOf('Arrow') === 0 || event.key === 'Enter' || event.key === ' ' || event.key === '';

        if (isNavigationKey) {
          keyRef.current = event.key;
        }

        if (nested) {
          if (isCrossOrientationOpenKey(event.key, orientation, rtl)) {
            stopEvent(event);

            if (open) {
              indexRef.current = getMinIndex(listRef, disabledIndices);
              onNavigate(indexRef.current);
            } else {
              onOpenChange(true);
            }
          }

          return;
        }

        if (isMainOrientationKey(event.key, orientation)) {
          if (selectedIndex != null) {
            indexRef.current = selectedIndex;
          }

          stopEvent(event);

          if (!open && openOnArrowKeyDown) {
            onOpenChange(true);
          } else {
            onKeyDown(event);
          }

          if (open) {
            onNavigate(indexRef.current);
          }
        }
      }

    },
    floating: {
      'aria-orientation': orientation === 'both' ? undefined : orientation,
      ...(virtual && activeIndex != null && {
        'aria-activedescendant': activeId
      }),
      onKeyDown,

      onPointerMove() {
        blockPointerLeaveRef.current = false;
      }

    },
    item: {
      onFocus(_ref2) {
        let {
          currentTarget
        } = _ref2;
        const index = listRef.current.indexOf(currentTarget);

        if (index !== -1) {
          onNavigate(index);
        }
      },

      onClick: _ref3 => {
        let {
          currentTarget
        } = _ref3;
        return currentTarget.focus({
          preventScroll: true
        });
      },
      // Safari
      ...(focusItemOnHover && {
        onMouseMove(_ref4) {
          let {
            currentTarget
          } = _ref4;
          const target = currentTarget;

          if (target) {
            const index = listRef.current.indexOf(target);

            if (index !== -1) {
              onNavigate(index);
            }
          }
        },

        onPointerLeave() {
          if (!blockPointerLeaveRef.current) {
            indexRef.current = -1;
            focusItem(listRef, indexRef);
            onNavigate(null);

            if (!virtual) {
              requestAnimationFrame(() => {
                var _refs$floating$curren;

                (_refs$floating$curren = refs.floating.current) == null ? void 0 : _refs$floating$curren.focus({
                  preventScroll: true
                });
              });
            }
          }
        }

      })
    }
  };
};

/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */
const useTypeahead = function (_ref, _temp) {
  var _ref2;

  let {
    open,
    dataRef
  } = _ref;
  let {
    listRef,
    activeIndex,
    onMatch = () => {},
    enabled = true,
    findMatch = null,
    resetMs = 1000,
    ignoreKeys = [],
    selectedIndex = null
  } = _temp === void 0 ? {
    listRef: {
      current: []
    },
    activeIndex: null
  } : _temp;
  const timeoutIdRef = React.useRef();
  const stringRef = React.useRef('');
  const prevIndexRef = React.useRef((_ref2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref2 : -1);
  const matchIndexRef = React.useRef(null);
  index(() => {
    if (open) {
      clearTimeout(timeoutIdRef.current);
      matchIndexRef.current = null;
      stringRef.current = '';
    }
  }, [open]);
  index(() => {
    // Sync arrow key navigation but not typeahead navigation
    if (open && stringRef.current === '') {
      var _ref3;

      prevIndexRef.current = (_ref3 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref3 : -1;
    }
  }, [open, selectedIndex, activeIndex]);

  function onKeyDown(event) {
    // Correctly scope nested non-portalled floating elements. Since the nested
    // floating element is inside of the another, we find the closest role
    // that indicates the floating element scope.
    const target = getTarget(event.nativeEvent);

    if (isElement(target) && (activeElement(getDocument(target)) !== event.currentTarget ? target.closest('[role="dialog"],[role="menu"],[role="listbox"],[role="tree"],[role="grid"]') !== event.currentTarget : false)) {
      return;
    }

    if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
      dataRef.current.typing = true;

      if (event.key === ' ') {
        stopEvent(event);
      }
    }

    const listContent = listRef.current;

    if (listContent == null || ignoreKeys.includes(event.key) || // Character key
    event.key.length !== 1 || // Modifier key
    event.ctrlKey || event.metaKey || event.altKey) {
      return;
    } // Bail out if the list contains a word like "llama" or "aaron". TODO:
    // allow it in this case, too.


    const allowRapidSuccessionOfFirstLetter = listContent.every(text => {
      var _text$, _text$2;

      return text ? ((_text$ = text[0]) == null ? void 0 : _text$.toLocaleLowerCase()) !== ((_text$2 = text[1]) == null ? void 0 : _text$2.toLocaleLowerCase()) : true;
    }); // Allows the user to cycle through items that start with the same letter
    // in rapid succession

    if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
    }

    stringRef.current += event.key;
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
      dataRef.current.typing = false;
    }, resetMs);
    const prevIndex = prevIndexRef.current;
    const orderedList = [...listContent.slice((prevIndex != null ? prevIndex : 0) + 1), ...listContent.slice(0, (prevIndex != null ? prevIndex : 0) + 1)];
    const str = findMatch ? findMatch(orderedList, stringRef.current) : orderedList.find(text => (text == null ? void 0 : text.toLocaleLowerCase().indexOf(stringRef.current.toLocaleLowerCase())) === 0);
    const index = str ? listContent.indexOf(str) : -1;

    if (index !== -1) {
      onMatch(index);
      matchIndexRef.current = index;
    }
  }

  if (!enabled) {
    return {};
  }

  return {
    reference: {
      onKeyDown
    },
    floating: {
      onKeyDown
    }
  };
};

var css_248z$x = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Popper-module_backdrop__Gsq-k {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.4);\n}\n.Popper-module_backdrop__Gsq-k.Popper-module_transparent__VqWpq {\n  background: none;\n}\n.Popper-module_backdrop__Gsq-k.Popper-module_hide-backdrop__Wkkl- {\n  position: static;\n}";
var styles$w = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","backdrop":"Popper-module_backdrop__Gsq-k","transparent":"Popper-module_transparent__VqWpq","hide-backdrop":"Popper-module_hide-backdrop__Wkkl-"};
styleInject(css_248z$x);

var Popper = function Popper(props) {
  var open = props.open,
    children = props.children,
    wrapperId = props.wrapperId,
    backdrop = props.backdrop,
    className = props.className,
    transparent = props.transparent;
  return /*#__PURE__*/jsx(FloatingPortal, {
    id: wrapperId,
    children: open && /*#__PURE__*/jsx(FloatingOverlay, {
      lockScroll: true,
      className: classes(className, styles$w.backdrop, transparent ? styles$w.transparent : '', backdrop ? '' : styles$w['hide-backdrop']),
      children: children
    })
  });
};
Popper.propTypes = {
  className: propTypes$1.exports.string,
  open: propTypes$1.exports.bool,
  backdrop: propTypes$1.exports.bool,
  wrapperId: propTypes$1.exports.string,
  transparent: propTypes$1.exports.bool
};
Popper.defaultProps = {
  className: '',
  open: false,
  backdrop: true,
  wrapperId: 'default-popper',
  transparent: true
};

var useRowFilter = function useRowFilter(props) {
  var _props$initialState = props.initialState,
    initialState = _props$initialState === void 0 ? {} : _props$initialState,
    _props$length = props.length,
    length = _props$length === void 0 ? 0 : _props$length,
    tableData = props.tableData;
  var _useState = useState(function () {
      return _toConsumableArray(Array(length).keys()).fill(initialState);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    filters = _useState2[0],
    setFilters = _useState2[1];
  useEffect(function () {
    setFilters(_toConsumableArray(Array(length).keys()).fill(initialState));
  }, [initialState, length, tableData]);

  /**
   *
   * @param {number} index - row index
   * @param {string} name - filter name / column id
   * @param {Array} value - filter value / checked items
   */
  var applyFilter = function applyFilter(index, name) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    setFilters(function (prevFilters) {
      var newFilters = cloneDeep(prevFilters);
      newFilters.splice(index, 1, _objectSpread2(_objectSpread2({}, newFilters[index]), {}, _defineProperty({}, name, value)));
      return newFilters;
    });
  };
  return {
    filters: filters,
    applyFilter: applyFilter
  };
};

var useOutsideClickListener = function useOutsideClickListener(ref, callback) {
  useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

var useResize = function useResize(props) {
  var ref = props.ref,
    _props$styles = props.styles,
    styles = _props$styles === void 0 ? {} : _props$styles;
  var MIN_WIDTH = styles.MIN_WIDTH,
    MAX_WIDTH = styles.MAX_WIDTH,
    BORDER_SIZE = styles.BORDER_SIZE;
  useEffect(function () {
    var _ref$current, _ref$current$getBound, _ref$current3;
    var mPos = null;
    var itemRect = ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$getBound = _ref$current.getBoundingClientRect) === null || _ref$current$getBound === void 0 ? void 0 : _ref$current$getBound.call(_ref$current);
    var resize = function resize(event) {
      var dX = event.x - mPos;
      // eslint-disable-next-line no-param-reassign
      var newWidth = parseInt(itemRect.width, 10) + dX;
      if (newWidth > MIN_WIDTH && newWidth < MAX_WIDTH && ref.current != null) {
        ref.current.style.width = "".concat(newWidth, "px");
      }
    };
    var onMouseDown = function onMouseDown(evt) {
      if (itemRect.width - evt.offsetX < BORDER_SIZE) {
        mPos = evt.x;
        document.addEventListener('mousemove', resize);
      }
    };
    var onMouseUp = function onMouseUp(evt) {
      var _ref$current2, _ref$current2$getBoun, _ref$current2$getBoun2;
      mPos = evt.x;
      itemRect.width = ref === null || ref === void 0 ? void 0 : (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : (_ref$current2$getBoun = _ref$current2.getBoundingClientRect) === null || _ref$current2$getBoun === void 0 ? void 0 : (_ref$current2$getBoun2 = _ref$current2$getBoun.call(_ref$current2)) === null || _ref$current2$getBoun2 === void 0 ? void 0 : _ref$current2$getBoun2.width;
      document.removeEventListener('mousemove', resize);
    };
    ref === null || ref === void 0 ? void 0 : (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.addEventListener('mousedown', onMouseDown, false);
    document.documentElement.addEventListener('mouseup', onMouseUp, false);
    return function () {
      var _ref$current4, _ref$current4$removeE;
      ref === null || ref === void 0 ? void 0 : (_ref$current4 = ref.current) === null || _ref$current4 === void 0 ? void 0 : (_ref$current4$removeE = _ref$current4.removeEventListener) === null || _ref$current4$removeE === void 0 ? void 0 : _ref$current4$removeE.call(_ref$current4, 'mousedown', onMouseDown, false);
      document.documentElement.removeEventListener('mouseup', onMouseUp, false);
    };
  }, []);
};

var Alert = function Alert(props) {
  var action = props.action,
    AlertTypeIcon = props.icon,
    showIcon = props.showIcon,
    close = props.close,
    title = props.title,
    description = props.description,
    border = props.border,
    color = props.color,
    shadow = props.shadow,
    open = props.open,
    toggle = props.toggle,
    position = props.position;
  var Icon = null;
  if (AlertTypeIcon != null) {
    Icon = /*#__PURE__*/jsx(AlertTypeIcon, {
      className: styles$B.icon
    });
  } else {
    switch (color) {
      case 'info':
        Icon = /*#__PURE__*/jsx(AlertIcon.Info, {
          className: styles$B.icon
        });
        break;
      case 'warning':
        Icon = /*#__PURE__*/jsx(AlertIcon.Warning, {
          className: styles$B.icon
        });
        break;
      case 'success':
        Icon = /*#__PURE__*/jsx(AlertIcon.Success, {
          className: styles$B.icon
        });
        break;
      case 'danger':
        Icon = /*#__PURE__*/jsx(AlertIcon.Danger, {
          className: styles$B.icon
        });
        break;
      default:
        Icon = /*#__PURE__*/jsx(AlertTypeIcon, {});
        break;
    }
  }
  var ref = useRef(null);
  useOutsideClickListener(ref, function () {
    return toggle(false);
  });
  return /*#__PURE__*/jsx(Popper, {
    open: open,
    className: styles$B.popper,
    id: "alert-popper",
    transparent: false,
    children: /*#__PURE__*/jsxs("div", {
      ref: ref,
      className: classes(styles$B.root, styles$B[color], styles$B["border-".concat(border)], shadow ? styles$B.shadow : '', styles$B["position-".concat(position)]),
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$B.left,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$B.icons,
          children: showIcon && Icon
        }), /*#__PURE__*/jsxs("div", {
          className: styles$B.content,
          children: [/*#__PURE__*/jsx("span", {
            className: styles$B.title,
            children: title
          }), /*#__PURE__*/jsx("span", {
            className: styles$B.description,
            children: description
          })]
        })]
      }), (action || close) && /*#__PURE__*/jsxs("div", {
        className: styles$B.actions,
        children: [action && /*#__PURE__*/jsx(Button, {
          title: action,
          size: "small",
          variant: "text",
          color: "primary",
          className: styles$B.button
        }), close && /*#__PURE__*/jsx("span", {
          onClick: toggle,
          className: styles$B.close,
          children: /*#__PURE__*/jsx(Cross, {
            className: styles$B.icon
          })
        })]
      })]
    })
  });
};
Alert.propTypes = {
  action: propTypes$1.exports.string,
  showIcon: propTypes$1.exports.bool,
  icon: propTypes$1.exports.node,
  title: propTypes$1.exports.string,
  close: propTypes$1.exports.bool,
  description: propTypes$1.exports.string,
  border: propTypes$1.exports.oneOf(['default', 'thick-left', 'none']),
  color: propTypes$1.exports.oneOf(['info', 'success', 'danger', 'warning']),
  shadow: propTypes$1.exports.bool,
  toggle: propTypes$1.exports.func,
  open: propTypes$1.exports.bool,
  position: propTypes$1.exports.oneOf(['bottom-center', 'top-right'])
};
Alert.defaultProps = {
  action: '',
  showIcon: true,
  icon: null,
  title: 'Alert Title',
  close: true,
  description: 'Alert Description in single line',
  border: 'default',
  color: 'info',
  shadow: false,
  toggle: function toggle() {},
  open: true,
  position: 'bottom-center'
};

const common = {
  black: '#000',
  white: '#fff'
};
var common$1 = common;

const red = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
  A100: '#ff8a80',
  A200: '#ff5252',
  A400: '#ff1744',
  A700: '#d50000'
};
var red$1 = red;

const purple = {
  50: '#f3e5f5',
  100: '#e1bee7',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0',
  600: '#8e24aa',
  700: '#7b1fa2',
  800: '#6a1b9a',
  900: '#4a148c',
  A100: '#ea80fc',
  A200: '#e040fb',
  A400: '#d500f9',
  A700: '#aa00ff'
};
var purple$1 = purple;

const blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#2962ff'
};
var blue$1 = blue;

const lightBlue = {
  50: '#e1f5fe',
  100: '#b3e5fc',
  200: '#81d4fa',
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  600: '#039be5',
  700: '#0288d1',
  800: '#0277bd',
  900: '#01579b',
  A100: '#80d8ff',
  A200: '#40c4ff',
  A400: '#00b0ff',
  A700: '#0091ea'
};
var lightBlue$1 = lightBlue;

const green = {
  50: '#e8f5e9',
  100: '#c8e6c9',
  200: '#a5d6a7',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  600: '#43a047',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20',
  A100: '#b9f6ca',
  A200: '#69f0ae',
  A400: '#00e676',
  A700: '#00c853'
};
var green$1 = green;

const orange = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
  A100: '#ffd180',
  A200: '#ffab40',
  A400: '#ff9100',
  A700: '#ff6d00'
};
var orange$1 = orange;

const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#f5f5f5',
  A200: '#eeeeee',
  A400: '#bdbdbd',
  A700: '#616161'
};
var grey$1 = grey;

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/** @license MUI v5.10.8
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function styled$2(tag, options) {
  const stylesFactory = emStyled(tag, options);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';

      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join('\n'));
      } else if (styles.some(style => style === undefined)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }

      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
} // eslint-disable-next-line @typescript-eslint/naming-convention

const internal_processStyles = (tag, processor) => {
  // Emotion attaches all the styles as `__emotion_styles`.
  // Ref: https://github.com/emotion-js/emotion/blob/16d971d0da229596d6bcc39d282ba9753c9ee7cf/packages/styled/src/base.js#L186
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
};

const responsivePropType = process.env.NODE_ENV !== 'production' ? propTypes$1.exports.oneOfType([propTypes$1.exports.number, propTypes$1.exports.string, propTypes$1.exports.object, propTypes$1.exports.array]) : {};
var responsivePropType$1 = responsivePropType;

function chainPropTypes(propType1, propType2) {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}

function isPlainObject(item) {
  return item !== null && typeof item === 'object' && item.constructor === Object;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

function isClassComponent(elementType) {
  // elementType.prototype?.isReactComponent
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}

function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;

  if (propValue == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === 'undefined') {
    return null;
  }

  let warningHint;
  /**
   * Blacklisting instead of whitelisting
   *
   * Blacklisting will miss some components, such as React.Fragment. Those will at least
   * trigger a warning in React.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. "Safe" means there's no public API.
   *
   */

  if (typeof propValue === 'function' && !isClassComponent(propValue)) {
    warningHint = 'Did you accidentally provide a plain function component instead?';
  }

  if (warningHint !== undefined) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` + `Expected an element type that can hold a ref. ${warningHint} ` + 'For more information see https://mui.com/r/caveat-with-refs-guide');
  }

  return null;
}

var elementTypeAcceptingRef$1 = chainPropTypes(propTypes$1.exports.elementType, elementTypeAcceptingRef);

/**
 * WARNING: Don't import this directly.
 * Use `MuiError` from `@mui/utils/macros/MuiError.macro` instead.
 * @param {number} code
 */
function formatMuiErrorMessage(code) {
  // Apply babel-plugin-transform-template-literals in loose mode
  // loose mode is safe iff we're concatenating primitives
  // see https://babeljs.io/docs/en/babel-plugin-transform-template-literals#loose

  /* eslint-disable prefer-template */
  let url = 'https://mui.com/production-error/?code=' + code;

  for (let i = 1; i < arguments.length; i += 1) {
    // rest params over-transpile for this case
    // eslint-disable-next-line prefer-rest-params
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }

  return 'Minified MUI error #' + code + '; visit ' + url + ' for the full message.';
  /* eslint-enable prefer-template */
}

var reactIs = {exports: {}};

var reactIs_production_min = {};

/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min () {
	if (hasRequiredReactIs_production_min) return reactIs_production_min;
	hasRequiredReactIs_production_min = 1;
var b=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),e=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),h=Symbol.for("react.context"),k=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),n=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),t=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");
	function v(a){if("object"===typeof a&&null!==a){var r=a.$$typeof;switch(r){case b:switch(a=a.type,a){case d:case f:case e:case m:case n:return a;default:switch(a=a&&a.$$typeof,a){case k:case h:case l:case q:case p:case g:return a;default:return r}}case c:return r}}}reactIs_production_min.ContextConsumer=h;reactIs_production_min.ContextProvider=g;reactIs_production_min.Element=b;reactIs_production_min.ForwardRef=l;reactIs_production_min.Fragment=d;reactIs_production_min.Lazy=q;reactIs_production_min.Memo=p;reactIs_production_min.Portal=c;reactIs_production_min.Profiler=f;reactIs_production_min.StrictMode=e;reactIs_production_min.Suspense=m;
	reactIs_production_min.SuspenseList=n;reactIs_production_min.isAsyncMode=function(){return !1};reactIs_production_min.isConcurrentMode=function(){return !1};reactIs_production_min.isContextConsumer=function(a){return v(a)===h};reactIs_production_min.isContextProvider=function(a){return v(a)===g};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};reactIs_production_min.isForwardRef=function(a){return v(a)===l};reactIs_production_min.isFragment=function(a){return v(a)===d};reactIs_production_min.isLazy=function(a){return v(a)===q};reactIs_production_min.isMemo=function(a){return v(a)===p};
	reactIs_production_min.isPortal=function(a){return v(a)===c};reactIs_production_min.isProfiler=function(a){return v(a)===f};reactIs_production_min.isStrictMode=function(a){return v(a)===e};reactIs_production_min.isSuspense=function(a){return v(a)===m};reactIs_production_min.isSuspenseList=function(a){return v(a)===n};
	reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===e||a===m||a===n||a===t||"object"===typeof a&&null!==a&&(a.$$typeof===q||a.$$typeof===p||a.$$typeof===g||a.$$typeof===h||a.$$typeof===l||a.$$typeof===u||void 0!==a.getModuleId)?!0:!1};reactIs_production_min.typeOf=v;
	return reactIs_production_min;
}

var reactIs_development = {};

/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development () {
	if (hasRequiredReactIs_development) return reactIs_development;
	hasRequiredReactIs_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	          case REACT_SUSPENSE_LIST_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_SERVER_CONTEXT_TYPE:
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	}
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false;
	var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
	    }
	  }

	  return false;
	}
	function isConcurrentMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
	      hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
	    }
	  }

	  return false;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}
	function isSuspenseList(object) {
	  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
	}

	reactIs_development.ContextConsumer = ContextConsumer;
	reactIs_development.ContextProvider = ContextProvider;
	reactIs_development.Element = Element;
	reactIs_development.ForwardRef = ForwardRef;
	reactIs_development.Fragment = Fragment;
	reactIs_development.Lazy = Lazy;
	reactIs_development.Memo = Memo;
	reactIs_development.Portal = Portal;
	reactIs_development.Profiler = Profiler;
	reactIs_development.StrictMode = StrictMode;
	reactIs_development.Suspense = Suspense;
	reactIs_development.SuspenseList = SuspenseList;
	reactIs_development.isAsyncMode = isAsyncMode;
	reactIs_development.isConcurrentMode = isConcurrentMode;
	reactIs_development.isContextConsumer = isContextConsumer;
	reactIs_development.isContextProvider = isContextProvider;
	reactIs_development.isElement = isElement;
	reactIs_development.isForwardRef = isForwardRef;
	reactIs_development.isFragment = isFragment;
	reactIs_development.isLazy = isLazy;
	reactIs_development.isMemo = isMemo;
	reactIs_development.isPortal = isPortal;
	reactIs_development.isProfiler = isProfiler;
	reactIs_development.isStrictMode = isStrictMode;
	reactIs_development.isSuspense = isSuspense;
	reactIs_development.isSuspenseList = isSuspenseList;
	reactIs_development.isValidElementType = isValidElementType;
	reactIs_development.typeOf = typeOf;
	  })();
	}
	return reactIs_development;
}

(function (module) {

	if (process.env.NODE_ENV === 'production') {
	  module.exports = requireReactIs_production_min();
	} else {
	  module.exports = requireReactIs_development();
	}
} (reactIs));

// https://github.com/JamesMGreene/Function.name/blob/58b314d4a983110c3682f1228f845d39ccca1817/Function.name.js#L3

const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn) {
  const match = `${fn}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || '';
}

function getFunctionComponentName(Component, fallback = '') {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}

function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName);
}
/**
 * cherry-pick from
 * https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 * originally forked from recompose/getDisplayName with added IE11 support
 */


function getDisplayName(Component) {
  if (Component == null) {
    return undefined;
  }

  if (typeof Component === 'string') {
    return Component;
  }

  if (typeof Component === 'function') {
    return getFunctionComponentName(Component, 'Component');
  } // TypeScript can't have components as objects but they exist in the form of `memo` or `Suspense`


  if (typeof Component === 'object') {
    switch (Component.$$typeof) {
      case reactIs.exports.ForwardRef:
        return getWrappedName(Component, Component.render, 'ForwardRef');

      case reactIs.exports.Memo:
        return getWrappedName(Component, Component.type, 'memo');

      default:
        return undefined;
    }
  }

  return undefined;
}

const refType = propTypes$1.exports.oneOfType([propTypes$1.exports.func, propTypes$1.exports.object]);
var refType$1 = refType;

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word in the sentence.
// We only handle the first word.
function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * TODO v5: consider making it private
 *
 * passes {value} to {ref}
 *
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise, make sure to cleanup the previous {ref} if it changes. See
 * https://github.com/mui/material-ui/issues/13539
 *
 * Useful if you want to expose the ref of an inner component to the public API
 * while still using it inside the component.
 * @param ref A ref callback or ref object. If anything falsy, this is a no-op.
 */
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var useEnhancedEffect$1 = useEnhancedEffect;

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */

function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect$1(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => // @ts-expect-error hide `this`
  // tslint:disable-next-line:ban-comma-operator
  (0, ref.current)(...args), []);
}

function useForkRef(...refs) {
  /**
   * This will create a new function if the refs passed to this hook change and are all defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }

    return instance => {
      refs.forEach(ref => {
        setRef(ref, instance);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

// based on https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js
let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout;
const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true
};
/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, i.e. whether it should always match
 * `:focus-visible` when focused.
 * @param {Element} node
 * @returns {boolean}
 */

function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;

  if (tagName === 'INPUT' && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }

  if (tagName === 'TEXTAREA' && !node.readOnly) {
    return true;
  }

  if (node.isContentEditable) {
    return true;
  }

  return false;
}
/**
 * Keep track of our keyboard modality state with `hadKeyboardEvent`.
 * If the most recent user interaction was via the keyboard;
 * and the key press did not include a meta, alt/option, or control key;
 * then the modality is keyboard. Otherwise, the modality is not keyboard.
 * @param {KeyboardEvent} event
 */


function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }

  hadKeyboardEvent = true;
}
/**
 * If at any point a user clicks with a pointing device, ensure that we change
 * the modality away from keyboard.
 * This avoids the situation where a user presses a key on an already focused
 * element, and then clicks on a different element, focusing it with a
 * pointing device, while we still think we're in keyboard modality.
 */


function handlePointerDown() {
  hadKeyboardEvent = false;
}

function handleVisibilityChange() {
  if (this.visibilityState === 'hidden') {
    // If the tab becomes active again, the browser will handle calling focus
    // on the element (Safari actually calls it twice).
    // If this tab change caused a blur on an element with focus-visible,
    // re-apply the class when the user switches back to the tab.
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}

function prepare(doc) {
  doc.addEventListener('keydown', handleKeyDown, true);
  doc.addEventListener('mousedown', handlePointerDown, true);
  doc.addEventListener('pointerdown', handlePointerDown, true);
  doc.addEventListener('touchstart', handlePointerDown, true);
  doc.addEventListener('visibilitychange', handleVisibilityChange, true);
}

function isFocusVisible(event) {
  const {
    target
  } = event;

  try {
    return target.matches(':focus-visible');
  } catch (error) {// Browsers not implementing :focus-visible will throw a SyntaxError.
    // We use our own heuristic for those browsers.
    // Rethrow might be better if it's not the expected error but do we really
    // want to crash if focus-visible malfunctioned?
  } // No need for validFocusTarget check. The user does that by attaching it to
  // focusable events only.


  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}

function useIsFocusVisible() {
  const ref = React.useCallback(node => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React.useRef(false);
  /**
   * Should be called if a blur event is fired
   */

  function handleBlurVisible() {
    // checking against potential state variable does not suffice if we focus and blur synchronously.
    // React wouldn't have time to trigger a re-render so `focusVisible` would be stale.
    // Ideally we would adjust `isFocusVisible(event)` to look at `relatedTarget` for blur events.
    // This doesn't work in IE11 due to https://github.com/facebook/react/issues/3751
    // TODO: check again if React releases their internal changes to focus event handling (https://github.com/facebook/react/pull/19186).
    if (isFocusVisibleRef.current) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }

    return false;
  }
  /**
   * Should be called if a blur event is fired
   */


  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }

    return false;
  }

  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}

function getTypeByValue(value) {
  const valueType = typeof value;

  switch (valueType) {
    case 'number':
      if (Number.isNaN(value)) {
        return 'NaN';
      }

      if (!Number.isFinite(value)) {
        return 'Infinity';
      }

      if (value !== Math.floor(value)) {
        return 'float';
      }

      return 'number';

    case 'object':
      if (value === null) {
        return 'null';
      }

      return value.constructor.name;

    default:
      return valueType;
  }
} // IE 11 support

function ponyfillIsInteger(x) {
  // eslint-disable-next-line no-restricted-globals
  return typeof x === 'number' && isFinite(x) && Math.floor(x) === x;
}

const isInteger = Number.isInteger || ponyfillIsInteger;

function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];

  if (propValue == null || !isInteger(propValue)) {
    const propType = getTypeByValue(propValue);
    return new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
  }

  return null;
}

function validator(props, propName, ...other) {
  const propValue = props[propName];

  if (propValue === undefined) {
    return null;
  }

  return requiredInteger(props, propName, ...other);
}

function validatorNoop() {
  return null;
}

validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;
var integerPropType = process.env.NODE_ENV === 'production' ? validatorNoop : validator;

/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */
function resolveProps(defaultProps, props) {
  const output = _extends({}, props);

  Object.keys(defaultProps).forEach(propName => {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });
  return output;
}

function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach( // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
  // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
  slot => {
    output[slot] = slots[slot].reduce((acc, key) => {
      if (key) {
        acc.push(getUtilityClass(key));

        if (classes && classes[key]) {
          acc.push(classes[key]);
        }
      }

      return acc;
    }, []).join(' ');
  });
  return output;
}

const defaultGenerator = componentName => componentName;

const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },

    generate(componentName) {
      return generate(componentName);
    },

    reset() {
      generate = defaultGenerator;
    }

  };
};

const ClassNameGenerator = createClassNameGenerator();
var ClassNameGenerator$1 = ClassNameGenerator;

const globalStateClassesMapping = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  required: 'required',
  selected: 'selected'
};
function generateUtilityClass(componentName, slot, globalStatePrefix = 'Mui') {
  const globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator$1.generate(componentName)}-${slot}`;
}

function generateUtilityClasses(componentName, slots, globalStatePrefix = 'Mui') {
  const result = {};
  slots.forEach(slot => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}

function merge(acc, item) {
  if (!item) {
    return acc;
  }

  return deepmerge(acc, item, {
    clone: false // No need to clone deep, it's way faster.

  });
}

// For instance with the first breakpoint xs: [xs, sm[.

const values$1 = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screen

};
const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values$1[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};

  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      // key is breakpoint
      if (Object.keys(themeBreakpoints.values || values$1).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }

      return acc;
    }, {});
  }

  const output = styleFromPropValue(propValue);
  return output;
}

function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;

  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;

    if (isBreakpointUnused) {
      delete acc[key];
    }

    return acc;
  }, style);
}

function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== 'string') {
    return null;
  } // Check if CSS variables are used


  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split('.').reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);

    if (val != null) {
      return val;
    }
  }

  return path.split('.').reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }

    return null;
  }, obj);
}

function getValue$1(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (transform) {
    value = transform(value, userValue);
  }

  return value;
}

function style$1(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;

  const fn = props => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};

    const styleFromPropValue = propValueFinal => {
      let value = getValue$1(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue$1(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`, propValueFinal);
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.propTypes = process.env.NODE_ENV !== 'production' ? {
    [prop]: responsivePropType$1
  } : {};
  fn.filterProps = [prop];
  return fn;
}

function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach(prop => {
      acc[prop] = style;
    });
    return acc;
  }, {});

  const fn = props => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }

      return acc;
    }, {});
  };

  fn.propTypes = process.env.NODE_ENV !== 'production' ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);
  return fn;
}

function memoize(fn) {
  const cache = {};
  return arg => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}

const properties = {
  m: 'margin',
  p: 'padding'
};
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom']
};
const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py'
}; // memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec

const getCssProperties = memoize(prop => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
});
const marginKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd'];
const paddingKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd', 'paddingBlock', 'paddingBlockStart', 'paddingBlockEnd'];
const spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;

  const themeSpacing = (_getPath = getPath(theme, themeKey, false)) != null ? _getPath : defaultValue;

  if (typeof themeSpacing === 'number') {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (typeof abs !== 'number') {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }

      return themeSpacing * abs;
    };
  }

  if (Array.isArray(themeSpacing)) {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!Number.isInteger(abs)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` + `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join('\n'));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join('\n'));
        }
      }

      return themeSpacing[abs];
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, 'It should be a number, an array or a function.'].join('\n'));
  }

  return () => undefined;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8, 'spacing');
}
function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }

  const abs = Math.abs(propValue);
  const transformed = transformer(abs);

  if (propValue >= 0) {
    return transformed;
  }

  if (typeof transformed === 'number') {
    return -transformed;
  }

  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return propValue => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}

function resolveCssProperty(props, keys, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (keys.indexOf(prop) === -1) {
    return null;
  }

  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}

function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map(prop => resolveCssProperty(props, keys, prop, transformer)).reduce(merge, {});
}
process.env.NODE_ENV !== 'production' ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
process.env.NODE_ENV !== 'production' ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};

function spacing(props) {
  return style(props, spacingKeys);
}

spacing.propTypes = process.env.NODE_ENV !== 'production' ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;

function getBorder(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return `${value}px solid`;
}

const border = style$1({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder
});
const borderTop = style$1({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder
});
const borderRight = style$1({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder
});
const borderBottom = style$1({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder
});
const borderLeft = style$1({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder
});
const borderColor = style$1({
  prop: 'borderColor',
  themeKey: 'palette'
});
const borderTopColor = style$1({
  prop: 'borderTopColor',
  themeKey: 'palette'
});
const borderRightColor = style$1({
  prop: 'borderRightColor',
  themeKey: 'palette'
});
const borderBottomColor = style$1({
  prop: 'borderBottomColor',
  themeKey: 'palette'
});
const borderLeftColor = style$1({
  prop: 'borderLeftColor',
  themeKey: 'palette'
});
const borderRadius = props => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');

    const styleFromPropValue = propValue => ({
      borderRadius: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }

  return null;
};
borderRadius.propTypes = process.env.NODE_ENV !== 'production' ? {
  borderRadius: responsivePropType$1
} : {};
borderRadius.filterProps = ['borderRadius'];
const borders = compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
var borders$1 = borders;

const displayPrint = style$1({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value
    }
  })
});
const displayRaw = style$1({
  prop: 'display'
});
const overflow = style$1({
  prop: 'overflow'
});
const textOverflow = style$1({
  prop: 'textOverflow'
});
const visibility = style$1({
  prop: 'visibility'
});
const whiteSpace = style$1({
  prop: 'whiteSpace'
});
var display = compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);

const flexBasis = style$1({
  prop: 'flexBasis'
});
const flexDirection = style$1({
  prop: 'flexDirection'
});
const flexWrap = style$1({
  prop: 'flexWrap'
});
const justifyContent = style$1({
  prop: 'justifyContent'
});
const alignItems = style$1({
  prop: 'alignItems'
});
const alignContent = style$1({
  prop: 'alignContent'
});
const order = style$1({
  prop: 'order'
});
const flex = style$1({
  prop: 'flex'
});
const flexGrow = style$1({
  prop: 'flexGrow'
});
const flexShrink = style$1({
  prop: 'flexShrink'
});
const alignSelf = style$1({
  prop: 'alignSelf'
});
const justifyItems = style$1({
  prop: 'justifyItems'
});
const justifySelf = style$1({
  prop: 'justifySelf'
});
const flexbox = compose(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var flexbox$1 = flexbox;

const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');

    const styleFromPropValue = propValue => ({
      gap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }

  return null;
};
gap.propTypes = process.env.NODE_ENV !== 'production' ? {
  gap: responsivePropType$1
} : {};
gap.filterProps = ['gap'];
const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');

    const styleFromPropValue = propValue => ({
      columnGap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }

  return null;
};
columnGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  columnGap: responsivePropType$1
} : {};
columnGap.filterProps = ['columnGap'];
const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');

    const styleFromPropValue = propValue => ({
      rowGap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }

  return null;
};
rowGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  rowGap: responsivePropType$1
} : {};
rowGap.filterProps = ['rowGap'];
const gridColumn = style$1({
  prop: 'gridColumn'
});
const gridRow = style$1({
  prop: 'gridRow'
});
const gridAutoFlow = style$1({
  prop: 'gridAutoFlow'
});
const gridAutoColumns = style$1({
  prop: 'gridAutoColumns'
});
const gridAutoRows = style$1({
  prop: 'gridAutoRows'
});
const gridTemplateColumns = style$1({
  prop: 'gridTemplateColumns'
});
const gridTemplateRows = style$1({
  prop: 'gridTemplateRows'
});
const gridTemplateAreas = style$1({
  prop: 'gridTemplateAreas'
});
const gridArea = style$1({
  prop: 'gridArea'
});
const grid = compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var grid$1 = grid;

function transform$1(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }

  return value;
}

const color = style$1({
  prop: 'color',
  themeKey: 'palette',
  transform: transform$1
});
const bgcolor = style$1({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: transform$1
});
const backgroundColor = style$1({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: transform$1
});
const palette = compose(color, bgcolor, backgroundColor);
var palette$1 = palette;

const position = style$1({
  prop: 'position'
});
const zIndex$2 = style$1({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
const top = style$1({
  prop: 'top'
});
const right = style$1({
  prop: 'right'
});
const bottom = style$1({
  prop: 'bottom'
});
const left = style$1({
  prop: 'left'
});
var positions = compose(position, zIndex$2, top, right, bottom, left);

const boxShadow = style$1({
  prop: 'boxShadow',
  themeKey: 'shadows'
});
var shadows$2 = boxShadow;

function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

const width = style$1({
  prop: 'width',
  transform
});
const maxWidth = props => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = propValue => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;

      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values$1[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };

    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }

  return null;
};
maxWidth.filterProps = ['maxWidth'];
const minWidth = style$1({
  prop: 'minWidth',
  transform
});
const height = style$1({
  prop: 'height',
  transform
});
const maxHeight = style$1({
  prop: 'maxHeight',
  transform
});
const minHeight = style$1({
  prop: 'minHeight',
  transform
});
style$1({
  prop: 'size',
  cssProperty: 'width',
  transform
});
style$1({
  prop: 'size',
  cssProperty: 'height',
  transform
});
const boxSizing = style$1({
  prop: 'boxSizing'
});
const sizing = compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var sizing$1 = sizing;

const fontFamily = style$1({
  prop: 'fontFamily',
  themeKey: 'typography'
});
const fontSize = style$1({
  prop: 'fontSize',
  themeKey: 'typography'
});
const fontStyle = style$1({
  prop: 'fontStyle',
  themeKey: 'typography'
});
const fontWeight = style$1({
  prop: 'fontWeight',
  themeKey: 'typography'
});
const letterSpacing = style$1({
  prop: 'letterSpacing'
});
const textTransform = style$1({
  prop: 'textTransform'
});
const lineHeight = style$1({
  prop: 'lineHeight'
});
const textAlign = style$1({
  prop: 'textAlign'
});
const typographyVariant = style$1({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography'
});
const typography = compose(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
var typography$1 = typography;

const filterPropsMapping = {
  borders: borders$1.filterProps,
  display: display.filterProps,
  flexbox: flexbox$1.filterProps,
  grid: grid$1.filterProps,
  positions: positions.filterProps,
  palette: palette$1.filterProps,
  shadows: shadows$2.filterProps,
  sizing: sizing$1.filterProps,
  spacing: spacing.filterProps,
  typography: typography$1.filterProps
};
const styleFunctionMapping = {
  borders: borders$1,
  display,
  flexbox: flexbox$1,
  grid: grid$1,
  positions,
  palette: palette$1,
  shadows: shadows$2,
  sizing: sizing$1,
  spacing,
  typography: typography$1
};
const propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach(propName => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
} // eslint-disable-next-line @typescript-eslint/naming-convention


function unstable_createStyleFunctionSx(styleFunctionMapping$1 = styleFunctionMapping) {
  const propToStyleFunction = Object.keys(styleFunctionMapping$1).reduce((acc, styleFnName) => {
    styleFunctionMapping$1[styleFnName].filterProps.forEach(propName => {
      acc[propName] = styleFunctionMapping$1[styleFnName];
    });
    return acc;
  }, {});

  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }

  function styleFunctionSx(props) {
    const {
      sx,
      theme = {}
    } = props || {};

    if (!sx) {
      return null; // Emotion & styled-components will neglect null
    }
    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */


    function traverse(sxInput) {
      let sxObject = sxInput;

      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }

      if (!sxObject) {
        return null;
      }

      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css = emptyBreakpoints;
      Object.keys(sxObject).forEach(styleKey => {
        const value = callIfFn(sxObject[styleKey], theme);

        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (propToStyleFunction[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, x => ({
                [styleKey]: x
              }));

              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({
                  sx: value,
                  theme
                });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css);
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}
const styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ['sx'];
var defaultStyleFunctionSx = styleFunctionSx;

const _excluded$e = ["sx"];

const splitProps = props => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach(prop => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};

function extendSxProp(props) {
  const {
    sx: inSx
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$e);

  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;

  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === 'function') {
    finalSx = (...args) => {
      const result = inSx(...args);

      if (!isPlainObject(result)) {
        return systemProps;
      }

      return _extends({}, systemProps, result);
    };
  } else {
    finalSx = _extends({}, systemProps, inSx);
  }

  return _extends({}, otherProps, {
    sx: finalSx
  });
}

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const _excluded$d = ["values", "unit", "step"];

const sortBreakpointsValues = values => {
  const breakpointsAsArray = Object.keys(values).map(key => ({
    key,
    val: values[key]
  })) || []; // Sort in ascending order

  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
}; // Keep in mind that @media is inclusive by the CSS specification.


function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536 // large screen

    },
    unit = 'px',
    step = 5
  } = breakpoints,
        other = _objectWithoutPropertiesLoose(breakpoints, _excluded$d);

  const sortedValues = sortBreakpointsValues(values);
  const keys = Object.keys(sortedValues);

  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` + `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100}${unit})`;
  }

  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  function not(key) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);

    if (keyIndex === 0) {
      return up(keys[1]);
    }

    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }

    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
  }

  return _extends({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}

const shape = {
  borderRadius: 4
};
var shape$1 = shape;

/* tslint:enable:unified-signatures */
function createSpacing(spacingInput = 8) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  } // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage


  const transform = createUnarySpacing({
    spacing: spacingInput
  });

  const spacing = (...argsInput) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }

    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map(argument => {
      const output = transform(argument);
      return typeof output === 'number' ? `${output}px` : output;
    }).join(' ');
  };

  spacing.mui = true;
  return spacing;
}

const _excluded$c = ["breakpoints", "palette", "spacing", "shape"];

function createTheme$1(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options,
        other = _objectWithoutPropertiesLoose(options, _excluded$c);

  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: 'ltr',
    components: {},
    // Inject component definitions.
    palette: _extends({
      mode: 'light'
    }, paletteInput),
    spacing,
    shape: _extends({}, shape$1, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}

const ThemeContext = /*#__PURE__*/React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeContext';
}

var ThemeContext$1 = ThemeContext;

function useTheme$2() {
  const theme = React.useContext(ThemeContext$1);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useTheme$1(defaultTheme = null) {
  const contextTheme = useTheme$2();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

const systemDefaultTheme$1 = createTheme$1();

function useTheme(defaultTheme = systemDefaultTheme$1) {
  return useTheme$1(defaultTheme);
}

const _excluded$b = ["variant"];

function isEmpty$1(string) {
  return string.length === 0;
}
/**
 * Generates string classKey based on the properties provided. It starts with the
 * variant if defined, and then it appends all other properties in alphabetical order.
 * @param {object} props - the properties for which the classKey should be created.
 */


function propsToClassKey(props) {
  const {
    variant
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$b);

  let classKey = variant || '';
  Object.keys(other).sort().forEach(key => {
    if (key === 'color') {
      classKey += isEmpty$1(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty$1(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}

const _excluded$a = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"],
      _excluded2 = ["theme"],
      _excluded3 = ["theme"];

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
} // https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40


function isStringTag(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96;
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const getVariantStyles = (name, theme) => {
  let variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};
  variants.forEach(definition => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;

  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(themeVariant => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach(key => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles.push(styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
}; // Update /system/styled/#api in case if this changes


function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}
const systemDefaultTheme = createTheme$1();

const lowercaseFirstLetter = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

function createStyled(input = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    styleFunctionSx = defaultStyleFunctionSx
  } = input;

  const systemSx = props => {
    const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
    return styleFunctionSx(_extends({}, props, {
      theme
    }));
  };

  systemSx.__mui_systemSx = true;
  return (tag, inputOptions = {}) => {
    // Filter out the `sx` style function from the previous styled component to prevent unnecessary styles generated by the composite components.
    internal_processStyles(tag, styles => styles.filter(style => !(style != null && style.__mui_systemSx)));

    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions,
          options = _objectWithoutPropertiesLoose(inputOptions, _excluded$a); // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.


    const skipVariantsResolver = inputSkipVariantsResolver !== undefined ? inputSkipVariantsResolver : componentSlot && componentSlot !== 'Root' || false;
    const skipSx = inputSkipSx || false;
    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption = shouldForwardProp;

    if (componentSlot === 'Root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }

    const defaultStyledResolver = styled$2(tag, _extends({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));

    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map(stylesArg => {
        // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        return typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg ? _ref => {
          let {
            theme: themeInput
          } = _ref,
              other = _objectWithoutPropertiesLoose(_ref, _excluded2);

          return stylesArg(_extends({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);

          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === 'function' ? slotStyle(_extends({}, props, {
                theme
              })) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }

          return null;
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill(''); // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.

        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      styleArg.__emotion_real !== styleArg) {
        // If the type is function, we need to define the default theme.
        transformedStyleArg = _ref2 => {
          let {
            theme: themeInput
          } = _ref2,
              other = _objectWithoutPropertiesLoose(_ref2, _excluded3);

          return styleArg(_extends({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        };
      }

      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (process.env.NODE_ENV !== 'production') {
        let displayName;

        if (componentName) {
          displayName = `${componentName}${componentSlot || ''}`;
        }

        if (displayName === undefined) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }

        Component.displayName = displayName;
      }

      return Component;
    };

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };
}

function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;

  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }

  return resolveProps(theme.components[name].defaultProps, props);
}

function useThemeProps$1({
  props,
  name,
  defaultTheme
}) {
  const theme = useTheme(defaultTheme);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value, min = 0, max = 1) {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }

  return Math.min(Math.max(min, value), max);
}
/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */


function hexToRgb(color) {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map(n => n + n);
  }

  return colors ? `rgb${colors.length === 4 ? 'a' : ''}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
  }).join(', ')})` : '';
}
/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */


function decomposeColor(color) {
  // Idempotent
  if (color.type) {
    return color;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${color}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color));
  }

  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;

  if (type === 'color') {
    values = values.split(' ');
    colorSpace = values.shift();

    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].slice(1);
    }

    if (['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values = values.split(',');
  }

  values = values.map(value => parseFloat(value));
  return {
    type,
    values,
    colorSpace
  };
}
/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */

function recomposeColor(color) {
  const {
    type,
    colorSpace
  } = color;
  let {
    values
  } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  if (type.indexOf('color') !== -1) {
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}
/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */

function hslToRgb(color) {
  color = decomposeColor(color);
  const {
    values
  } = color;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);

  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (color.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({
    type,
    values: rgb
  });
}
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */

function getLuminance(color) {
  color = decomposeColor(color);
  let rgb = color.type === 'hsl' || color.type === 'hsla' ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map(val => {
    if (color.type !== 'color') {
      val /= 255; // normalized
    }

    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  }); // Truncate at 3 digits

  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */

function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function alpha(color, value) {
  color = decomposeColor(color);
  value = clamp(value);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }

  if (color.type === 'color') {
    color.values[3] = `/${value}`;
  } else {
    color.values[3] = value;
  }

  return recomposeColor(color);
}
/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }

  return recomposeColor(color);
}
/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  } else if (color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (1 - color.values[i]) * coefficient;
    }
  }

  return recomposeColor(color);
}
/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [breakpoints.up('xs')]: {
        '@media (orientation: landscape)': {
          minHeight: 48
        }
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  }, mixins);
}

const _excluded$9 = ["mode", "contrastThreshold", "tonalOffset"];
const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common$1.white,
    default: common$1.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
const dark = {
  text: {
    primary: common$1.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212'
  },
  action: {
    active: common$1.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}

function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue$1[200],
      light: blue$1[50],
      dark: blue$1[400]
    };
  }

  return {
    main: blue$1[700],
    light: blue$1[400],
    dark: blue$1[800]
  };
}

function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: purple$1[200],
      light: purple$1[50],
      dark: purple$1[400]
    };
  }

  return {
    main: purple$1[500],
    light: purple$1[300],
    dark: purple$1[700]
  };
}

function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: red$1[500],
      light: red$1[300],
      dark: red$1[700]
    };
  }

  return {
    main: red$1[700],
    light: red$1[400],
    dark: red$1[800]
  };
}

function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: lightBlue$1[400],
      light: lightBlue$1[300],
      dark: lightBlue$1[700]
    };
  }

  return {
    main: lightBlue$1[700],
    light: lightBlue$1[500],
    dark: lightBlue$1[900]
  };
}

function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: green$1[400],
      light: green$1[300],
      dark: green$1[700]
    };
  }

  return {
    main: green$1[800],
    light: green$1[500],
    dark: green$1[900]
  };
}

function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: orange$1[400],
      light: orange$1[300],
      dark: orange$1[700]
    };
  }

  return {
    main: '#ed6c02',
    // closest to orange[800] that pass 3:1.
    light: orange$1[500],
    dark: orange$1[900]
  };
}

function createPalette(palette) {
  const {
    mode = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette,
        other = _objectWithoutPropertiesLoose(palette, _excluded$9);

  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode); // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54

  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);

      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, 'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n'));
      }
    }

    return contrastText;
  }

  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color = _extends({}, color);

    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }

    if (!color.hasOwnProperty('main')) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : '', mainShade));
    }

    if (typeof color.main !== 'string') {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : '', JSON.stringify(color.main)));
    }

    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);

    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }

    return color;
  };

  const modes = {
    dark,
    light
  };

  if (process.env.NODE_ENV !== 'production') {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }

  const paletteOutput = deepmerge(_extends({
    // A collection of common colors.
    common: _extends({}, common$1),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: 'primary'
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: 'secondary',
      mainShade: 'A400',
      lightShade: 'A200',
      darkShade: 'A700'
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: 'error'
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: 'warning'
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: 'info'
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: 'success'
    }),
    // The grey colors.
    grey: grey$1,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}

const _excluded$8 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const caseAllCaps = {
  textTransform: 'uppercase'
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
/**
 * @see @link{https://m2.material.io/design/typography/the-type-system.html}
 * @see @link{https://m2.material.io/design/typography/understanding-typography.html}
 */

function createTypography(palette, typography) {
  const _ref = typeof typography === 'function' ? typography(palette) : typography,
        {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2
  } = _ref,
        other = _objectWithoutPropertiesLoose(_ref, _excluded$8);

  if (process.env.NODE_ENV !== 'production') {
    if (typeof fontSize !== 'number') {
      console.error('MUI: `fontSize` is required to be a number.');
    }

    if (typeof htmlFontSize !== 'number') {
      console.error('MUI: `htmlFontSize` is required to be a number.');
    }
  }

  const coef = fontSize / 14;

  const pxToRem = pxToRem2 || (size => `${size / htmlFontSize * coef}rem`);

  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => _extends({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight
  }, fontFamily === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing / size)}em`
  } : {}, casing, allVariants);

  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false // No need to clone deep

  });
}

const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;

function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(',');
} // Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss


const shadows = ['none', createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows$1 = shadows;

const _excluded$7 = ["duration", "easing", "delay"];
// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
}; // Follow https://m2.material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing

const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};

function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}

function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }

  const constant = height / 36; // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10

  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);

  const mergedDuration = _extends({}, duration, inputTransitions.duration);

  const create = (props = ['all'], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options,
          other = _objectWithoutPropertiesLoose(options, _excluded$7);

    if (process.env.NODE_ENV !== 'production') {
      const isString = value => typeof value === 'string'; // IE11 support, replace with Number.isNaN
      // eslint-disable-next-line no-restricted-globals


      const isNumber = value => !isNaN(parseFloat(value));

      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }

      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }

      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }

      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }

      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(',')}].`);
      }
    }

    return (Array.isArray(props) ? props : [props]).map(animatedProp => `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`).join(',');
  };

  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}

// We need to centralize the zIndex definitions as they work
// like global values in the browser.
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex$1 = zIndex;

const _excluded$6 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];

function createTheme(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options,
        other = _objectWithoutPropertiesLoose(options, _excluded$6);

  if (options.vars) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : formatMuiErrorMessage(18));
  }

  const palette = createPalette(paletteInput);
  const systemTheme = createTheme$1(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows$1.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex$1)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  if (process.env.NODE_ENV !== 'production') {
    const stateClasses = ['active', 'checked', 'completed', 'disabled', 'error', 'expanded', 'focused', 'focusVisible', 'required', 'selected'];

    const traverse = (node, component) => {
      let key; // eslint-disable-next-line guard-for-in, no-restricted-syntax

      for (key in node) {
        const child = node[key];

        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = generateUtilityClass('', key);
            console.error([`MUI: The \`${component}\` component increases ` + `the CSS specificity of the \`${key}\` internal state.`, 'You can not override it like this: ', JSON.stringify(node, null, 2), '', `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), '', 'https://mui.com/r/state-classes-guide'].join('\n'));
          } // Remove the style to prevent global conflicts.


          node[key] = {};
        }
      }
    };

    Object.keys(muiTheme.components).forEach(component => {
      const styleOverrides = muiTheme.components[component].styleOverrides;

      if (styleOverrides && component.indexOf('Mui') === 0) {
        traverse(styleOverrides, component);
      }
    });
  }

  return muiTheme;
}

const defaultTheme = createTheme();
var defaultTheme$1 = defaultTheme;

function useThemeProps({
  props,
  name
}) {
  return useThemeProps$1({
    props,
    name,
    defaultTheme: defaultTheme$1
  });
}

const rootShouldForwardProp = prop => shouldForwardProp(prop) && prop !== 'classes';
const styled = createStyled({
  defaultTheme: defaultTheme$1,
  rootShouldForwardProp
});
var styled$1 = styled;

function getSvgIconUtilityClass(slot) {
  return generateUtilityClass('MuiSvgIcon', slot);
}
generateUtilityClasses('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);

const _excluded$5 = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];

const useUtilityClasses$4 = ownerState => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ['root', color !== 'inherit' && `color${capitalize(color)}`, `fontSize${capitalize(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};

const SvgIconRoot = styled$1('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'inherit' && styles[`color${capitalize(ownerState.color)}`], styles[`fontSize${capitalize(ownerState.fontSize)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$transitions2$d, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _palette$ownerState$c, _palette, _palette$ownerState$c2, _palette2, _palette2$action, _palette3, _palette3$action;

  return {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    transition: (_theme$transitions = theme.transitions) == null ? void 0 : (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, 'fill', {
      duration: (_theme$transitions2 = theme.transitions) == null ? void 0 : (_theme$transitions2$d = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2$d.shorter
    }),
    fontSize: {
      inherit: 'inherit',
      small: ((_theme$typography = theme.typography) == null ? void 0 : (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || '1.25rem',
      medium: ((_theme$typography2 = theme.typography) == null ? void 0 : (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || '1.5rem',
      large: ((_theme$typography3 = theme.typography) == null ? void 0 : (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || '2.1875rem'
    }[ownerState.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (_palette$ownerState$c = (_palette = (theme.vars || theme).palette) == null ? void 0 : (_palette$ownerState$c2 = _palette[ownerState.color]) == null ? void 0 : _palette$ownerState$c2.main) != null ? _palette$ownerState$c : {
      action: (_palette2 = (theme.vars || theme).palette) == null ? void 0 : (_palette2$action = _palette2.action) == null ? void 0 : _palette2$action.active,
      disabled: (_palette3 = (theme.vars || theme).palette) == null ? void 0 : (_palette3$action = _palette3.action) == null ? void 0 : _palette3$action.disabled,
      inherit: undefined
    }[ownerState.color]
  };
});
const SvgIcon = /*#__PURE__*/React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSvgIcon'
  });

  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$5);

  const ownerState = _extends({}, props, {
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox
  });

  const more = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  const classes = useUtilityClasses$4(ownerState);
  return /*#__PURE__*/jsxs(SvgIconRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref
  }, more, other, {
    ownerState: ownerState,
    children: [children, titleAccess ? /*#__PURE__*/jsx("title", {
      children: titleAccess
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Node passed into the SVG element.
   */
  children: propTypes$1.exports.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: propTypes$1.exports.object,

  /**
   * @ignore
   */
  className: propTypes$1.exports.string,

  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: propTypes$1.exports
  /* @typescript-to-proptypes-ignore */
  .oneOfType([propTypes$1.exports.oneOf(['inherit', 'action', 'disabled', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), propTypes$1.exports.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes$1.exports.elementType,

  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: propTypes$1.exports
  /* @typescript-to-proptypes-ignore */
  .oneOfType([propTypes$1.exports.oneOf(['inherit', 'large', 'medium', 'small']), propTypes$1.exports.string]),

  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: propTypes$1.exports.string,

  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: propTypes$1.exports.bool,

  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: propTypes$1.exports.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: propTypes$1.exports.oneOfType([propTypes$1.exports.arrayOf(propTypes$1.exports.oneOfType([propTypes$1.exports.func, propTypes$1.exports.object, propTypes$1.exports.bool])), propTypes$1.exports.func, propTypes$1.exports.object]),

  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: propTypes$1.exports.string,

  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: propTypes$1.exports.string
} : void 0;
SvgIcon.muiName = 'SvgIcon';
var SvgIcon$1 = SvgIcon;

function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /*#__PURE__*/jsx(SvgIcon$1, _extends({
      "data-testid": `${displayName}Icon`,
      ref: ref
    }, props, {
      children: path
    }));
  }

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon$1.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

var TransitionGroupContext = React__default.createContext(null);

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */

function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && isValidElement(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */

function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!isValidElement(child)) return;
    var hasPrev = (key in prevChildMapping);
    var hasNext = (key in nextChildMapping);
    var prevChild = prevChildMapping[key];
    var isLeaving = isValidElement(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && isValidElement(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};
/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */

var TransitionGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this)); // Initial children should all be entering, dependent on appear


    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  var _proto = TransitionGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  } // node is `undefined` when user provided `nodeRef` prop
  ;

  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    if (this.mounted) {
      this.setState(function (state) {
        var children = _extends({}, state.children);

        delete children[child.key];
        return {
          children: children
        };
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.component,
        childFactory = _this$props.childFactory,
        props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);

    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return /*#__PURE__*/React__default.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }

    return /*#__PURE__*/React__default.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React__default.createElement(Component, props, children));
  };

  return TransitionGroup;
}(React__default.Component);

TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: propTypes$1.exports.any,

  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: propTypes$1.exports.node,

  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: propTypes$1.exports.bool,

  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: propTypes$1.exports.bool,

  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: propTypes$1.exports.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: propTypes$1.exports.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup$1 = TransitionGroup;

function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = React.useState(false);
  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);

  if (!inProp && !leaving) {
    setLeaving(true);
  }

  React.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [onExited, inProp, timeout]);
  return /*#__PURE__*/jsx("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /*#__PURE__*/jsx("span", {
      className: childClassName
    })
  });
}

process.env.NODE_ENV !== "production" ? Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes$1.exports.object.isRequired,
  className: propTypes$1.exports.string,

  /**
   * @ignore - injected from TransitionGroup
   */
  in: propTypes$1.exports.bool,

  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: propTypes$1.exports.func,

  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: propTypes$1.exports.bool,

  /**
   * Diameter of the ripple.
   */
  rippleSize: propTypes$1.exports.number,

  /**
   * Horizontal position of the ripple center.
   */
  rippleX: propTypes$1.exports.number,

  /**
   * Vertical position of the ripple center.
   */
  rippleY: propTypes$1.exports.number,

  /**
   * exit delay
   */
  timeout: propTypes$1.exports.number.isRequired
} : void 0;

const touchRippleClasses = generateUtilityClasses('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);
var touchRippleClasses$1 = touchRippleClasses;

const _excluded$4 = ["center", "classes", "className"];

let _ = t => t,
    _t,
    _t2,
    _t3,
    _t4;
const DURATION = 550;
const DELAY_RIPPLE = 80;
const enterKeyframe = keyframes(_t || (_t = _`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
const exitKeyframe = keyframes(_t2 || (_t2 = _`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
const pulsateKeyframe = keyframes(_t3 || (_t3 = _`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
const TouchRippleRoot = styled$1('span', {
  name: 'MuiTouchRipple',
  slot: 'Root'
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit'
}); // This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.

const TouchRippleRipple = styled$1(Ripple, {
  name: 'MuiTouchRipple',
  slot: 'Ripple'
})(_t4 || (_t4 = _`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses$1.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses$1.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses$1.child, touchRippleClasses$1.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses$1.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut);
/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */

const TouchRipple = /*#__PURE__*/React.forwardRef(function TouchRipple(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTouchRipple'
  });

  const {
    center: centerProp = false,
    classes = {},
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$4);

  const [ripples, setRipples] = React.useState([]);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef(null);
  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]); // Used to filter out mouse emulated events on mobile.

  const ignoringMouseDown = React.useRef(false); // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.

  const startTimer = React.useRef(null); // This is the hook called once the previous timeout is ready.

  const startTimerCommit = React.useRef(null);
  const container = React.useRef(null);
  React.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = React.useCallback(params => {
    const {
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples(oldRipples => [...oldRipples, /*#__PURE__*/jsx(TouchRippleRipple, {
      classes: {
        ripple: clsx(classes.ripple, touchRippleClasses$1.ripple),
        rippleVisible: clsx(classes.rippleVisible, touchRippleClasses$1.rippleVisible),
        ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses$1.ripplePulsate),
        child: clsx(classes.child, touchRippleClasses$1.child),
        childLeaving: clsx(classes.childLeaving, touchRippleClasses$1.childLeaving),
        childPulsate: clsx(classes.childPulsate, touchRippleClasses$1.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate,
      rippleX: rippleX,
      rippleY: rippleY,
      rippleSize: rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start = React.useCallback((event = {}, options = {}, cb) => {
    const {
      pulsate = false,
      center = centerProp || options.pulsate,
      fakeElement = false // For test purposes

    } = options;

    if ((event == null ? void 0 : event.type) === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }

    if ((event == null ? void 0 : event.type) === 'touchstart') {
      ignoringMouseDown.current = true;
    }

    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }; // Get the size of the ripple

    let rippleX;
    let rippleY;
    let rippleSize;

    if (center || event === undefined || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }

    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3); // For some reason the animation is broken on Mobile Chrome if the size is even.

      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    } // Touche devices


    if (event != null && event.touches) {
      // check that this isn't another touchstart due to multitouch
      // otherwise we will only clear a single timer when unmounting while two
      // are running
      if (startTimerCommit.current === null) {
        // Prepare the ripple effect.
        startTimerCommit.current = () => {
          startCommit({
            pulsate,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        }; // Delay the execution of the ripple effect.


        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
      }
    } else {
      startCommit({
        pulsate,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = React.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = React.useCallback((event, cb) => {
    clearTimeout(startTimer.current); // The touch interaction occurs too quickly.
    // We still want to show ripple effect.

    if ((event == null ? void 0 : event.type) === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }

    startTimerCommit.current = null;
    setRipples(oldRipples => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }

      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  React.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /*#__PURE__*/jsx(TouchRippleRoot, _extends({
    className: clsx(touchRippleClasses$1.root, classes.root, className),
    ref: container
  }, other, {
    children: /*#__PURE__*/jsx(TransitionGroup$1, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
process.env.NODE_ENV !== "production" ? TouchRipple.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: propTypes$1.exports.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes$1.exports.object,

  /**
   * @ignore
   */
  className: propTypes$1.exports.string
} : void 0;
var TouchRipple$1 = TouchRipple;

function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}
const buttonBaseClasses = generateUtilityClasses('MuiButtonBase', ['root', 'disabled', 'focusVisible']);
var buttonBaseClasses$1 = buttonBaseClasses;

const _excluded$3 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"];

const useUtilityClasses$3 = ownerState => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible']
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ButtonBaseRoot = styled$1('button', {
  name: 'MuiButtonBase',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // Reset
  textDecoration: 'none',
  // So we take precedent over the style of a native <a /> element.
  color: 'inherit',
  '&::-moz-focus-inner': {
    borderStyle: 'none' // Remove Firefox dotted outline.

  },
  [`&.${buttonBaseClasses$1.disabled}`]: {
    pointerEvents: 'none',
    // Disable link interactions
    cursor: 'default'
  },
  '@media print': {
    colorAdjust: 'exact'
  }
});
/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */

const ButtonBase = /*#__PURE__*/React.forwardRef(function ButtonBase(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiButtonBase'
  });

  const {
    action,
    centerRipple = false,
    children,
    className,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    LinkComponent = 'a',
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$3);

  const buttonRef = React.useRef(null);
  const rippleRef = React.useRef(null);
  const handleRippleRef = useForkRef(rippleRef, touchRippleRef);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);

  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const [mountedState, setMountedState] = React.useState(false);
  React.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple && mountedState) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, mountedState]);

  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback(event => {
      if (eventCallback) {
        eventCallback(event);
      }

      const ignore = skipRippleAction;

      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const handleMouseDown = useRippleHandler('start', onMouseDown);
  const handleContextMenu = useRippleHandler('stop', onContextMenu);
  const handleDragLeave = useRippleHandler('stop', onDragLeave);
  const handleMouseUp = useRippleHandler('stop', onMouseUp);
  const handleMouseLeave = useRippleHandler('stop', event => {
    if (focusVisible) {
      event.preventDefault();
    }

    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler('start', onTouchStart);
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
  const handleTouchMove = useRippleHandler('stop', onTouchMove);
  const handleBlur = useRippleHandler('stop', event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback(event => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);

      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }

    if (onFocus) {
      onFocus(event);
    }
  });

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== 'button' && !(button.tagName === 'A' && button.href);
  };
  /**
   * IE11 shim for https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
   */


  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback(event => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === ' ') {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    } // Keyboard accessibility for non interactive elements


    if (event.target === event.currentTarget && isNonNativeButton() && event.key === 'Enter' && !disabled) {
      event.preventDefault();

      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback(event => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }

    if (onKeyUp) {
      onKeyUp(event);
    } // Keyboard accessibility for non interactive elements


    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === ' ' && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;

  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }

  const buttonProps = {};

  if (ComponentProp === 'button') {
    buttonProps.type = type === undefined ? 'button' : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = 'button';
    }

    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  const handleRef = useForkRef(ref, focusVisibleRef, buttonRef);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(['MUI: The `component` prop provided to ButtonBase is invalid.', 'Please make sure the children prop is rendered in this custom component.'].join('\n'));
      }
    }, [enableTouchRipple]);
  }

  const ownerState = _extends({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });

  const classes = useUtilityClasses$3(ownerState);
  return /*#__PURE__*/jsxs(ButtonBaseRoot, _extends({
    as: ComponentProp,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    onBlur: handleBlur,
    onClick: onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type: type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ?
    /*#__PURE__*/

    /* TouchRipple is only needed client-side, x2 boost on the server. */
    jsx(TouchRipple$1, _extends({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
process.env.NODE_ENV !== "production" ? ButtonBase.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType$1,

  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: propTypes$1.exports.bool,

  /**
   * The content of the component.
   */
  children: propTypes$1.exports.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: propTypes$1.exports.object,

  /**
   * @ignore
   */
  className: propTypes$1.exports.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef$1,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: propTypes$1.exports.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: propTypes$1.exports.bool,

  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: propTypes$1.exports.bool,

  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: propTypes$1.exports.bool,

  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: propTypes$1.exports.string,

  /**
   * @ignore
   */
  href: propTypes$1.exports
  /* @typescript-to-proptypes-ignore */
  .any,

  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: propTypes$1.exports.elementType,

  /**
   * @ignore
   */
  onBlur: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onClick: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onContextMenu: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onDragLeave: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onFocus: propTypes$1.exports.func,

  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onKeyDown: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onKeyUp: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onMouseDown: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onMouseLeave: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onMouseUp: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onTouchEnd: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onTouchMove: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onTouchStart: propTypes$1.exports.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: propTypes$1.exports.oneOfType([propTypes$1.exports.arrayOf(propTypes$1.exports.oneOfType([propTypes$1.exports.func, propTypes$1.exports.object, propTypes$1.exports.bool])), propTypes$1.exports.func, propTypes$1.exports.object]),

  /**
   * @default 0
   */
  tabIndex: propTypes$1.exports.number,

  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: propTypes$1.exports.object,

  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: propTypes$1.exports.oneOfType([propTypes$1.exports.func, propTypes$1.exports.shape({
    current: propTypes$1.exports.shape({
      pulsate: propTypes$1.exports.func.isRequired,
      start: propTypes$1.exports.func.isRequired,
      stop: propTypes$1.exports.func.isRequired
    })
  })]),

  /**
   * @ignore
   */
  type: propTypes$1.exports.oneOfType([propTypes$1.exports.oneOf(['button', 'reset', 'submit']), propTypes$1.exports.string])
} : void 0;
var ButtonBase$1 = ButtonBase;

function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);

const _excluded$2 = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];

const useUtilityClasses$2 = ownerState => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && `align${capitalize(align)}`, gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};

const TypographyRoot = styled$1('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(({
  theme,
  ownerState
}) => _extends({
  margin: 0
}, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== 'inherit' && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}, ownerState.gutterBottom && {
  marginBottom: '0.35em'
}, ownerState.paragraph && {
  marginBottom: 16
}));
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
}; // TODO v6: deprecate these color values in v5.x and remove the transformation in v6

const colorTransformations$1 = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};

const transformDeprecatedColors$1 = color => {
  return colorTransformations$1[color] || color;
};

const Typography = /*#__PURE__*/React.forwardRef(function Typography(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: 'MuiTypography'
  });
  const color = transformDeprecatedColors$1(themeProps.color);
  const props = extendSxProp(_extends({}, themeProps, {
    color
  }));

  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$2);

  const ownerState = _extends({}, props, {
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });

  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses$2(ownerState);
  return /*#__PURE__*/jsx(TypographyRoot, _extends({
    as: Component,
    ref: ref,
    ownerState: ownerState,
    className: clsx(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? Typography.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: propTypes$1.exports.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The content of the component.
   */
  children: propTypes$1.exports.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: propTypes$1.exports.object,

  /**
   * @ignore
   */
  className: propTypes$1.exports.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes$1.exports.elementType,

  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: propTypes$1.exports.bool,

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: propTypes$1.exports.bool,

  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: propTypes$1.exports.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: propTypes$1.exports.oneOfType([propTypes$1.exports.arrayOf(propTypes$1.exports.oneOfType([propTypes$1.exports.func, propTypes$1.exports.object, propTypes$1.exports.bool])), propTypes$1.exports.func, propTypes$1.exports.object]),

  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: propTypes$1.exports
  /* @typescript-to-proptypes-ignore */
  .oneOfType([propTypes$1.exports.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), propTypes$1.exports.string]),

  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: propTypes$1.exports
  /* @typescript-to-proptypes-ignore */
  .object
} : void 0;
var Typography$1 = Typography;

var MoreHorizIcon = createSvgIcon( /*#__PURE__*/jsx("path", {
  d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}), 'MoreHoriz');

const BreadcrumbCollapsedButton = styled$1(ButtonBase$1)(({
  theme
}) => _extends({
  display: 'flex',
  marginLeft: `calc(${theme.spacing(1)} * 0.5)`,
  marginRight: `calc(${theme.spacing(1)} * 0.5)`
}, theme.palette.mode === 'light' ? {
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700]
} : {
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.grey[100]
}, {
  borderRadius: 2,
  '&:hover, &:focus': _extends({}, theme.palette.mode === 'light' ? {
    backgroundColor: theme.palette.grey[200]
  } : {
    backgroundColor: theme.palette.grey[600]
  }),
  '&:active': _extends({
    boxShadow: theme.shadows[0]
  }, theme.palette.mode === 'light' ? {
    backgroundColor: emphasize(theme.palette.grey[200], 0.12)
  } : {
    backgroundColor: emphasize(theme.palette.grey[600], 0.12)
  })
}));
const BreadcrumbCollapsedIcon = styled$1(MoreHorizIcon)({
  width: 24,
  height: 16
});
/**
 * @ignore - internal component.
 */

function BreadcrumbCollapsed(props) {
  const ownerState = props;
  return /*#__PURE__*/jsx("li", {
    children: /*#__PURE__*/jsx(BreadcrumbCollapsedButton, _extends({
      focusRipple: true
    }, props, {
      ownerState: ownerState,
      children: /*#__PURE__*/jsx(BreadcrumbCollapsedIcon, {
        ownerState: ownerState
      })
    }))
  });
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: propTypes$1.exports.object
} : void 0;

function getBreadcrumbsUtilityClass(slot) {
  return generateUtilityClass('MuiBreadcrumbs', slot);
}
const breadcrumbsClasses = generateUtilityClasses('MuiBreadcrumbs', ['root', 'ol', 'li', 'separator']);
var breadcrumbsClasses$1 = breadcrumbsClasses;

const _excluded$1 = ["children", "className", "component", "expandText", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "separator"];

const useUtilityClasses$1 = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator']
  };
  return composeClasses(slots, getBreadcrumbsUtilityClass, classes);
};

const BreadcrumbsRoot = styled$1(Typography$1, {
  name: 'MuiBreadcrumbs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [{
      [`& .${breadcrumbsClasses$1.li}`]: styles.li
    }, styles.root];
  }
})({});
const BreadcrumbsOl = styled$1('ol', {
  name: 'MuiBreadcrumbs',
  slot: 'Ol',
  overridesResolver: (props, styles) => styles.ol
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none'
});
const BreadcrumbsSeparator = styled$1('li', {
  name: 'MuiBreadcrumbs',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})({
  display: 'flex',
  userSelect: 'none',
  marginLeft: 8,
  marginRight: 8
});

function insertSeparators(items, className, separator, ownerState) {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(current, /*#__PURE__*/jsx(BreadcrumbsSeparator, {
        "aria-hidden": true,
        className: className,
        ownerState: ownerState,
        children: separator
      }, `separator-${index}`));
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

const Breadcrumbs = /*#__PURE__*/React.forwardRef(function Breadcrumbs(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiBreadcrumbs'
  });

  const {
    children,
    className,
    component = 'nav',
    expandText = 'Show path',
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    maxItems = 8,
    separator = '/'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$1);

  const [expanded, setExpanded] = React.useState(false);

  const ownerState = _extends({}, props, {
    component,
    expanded,
    expandText,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    separator
  });

  const classes = useUtilityClasses$1(ownerState);
  const listRef = React.useRef(null);

  const renderItemsBeforeAndAfter = allItems => {
    const handleClickExpand = () => {
      setExpanded(true); // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.
      // Moving it to the <ol> or <nav> does not cause any announcement in NVDA.
      // By moving it to some link/button at least we have some announcement.

      const focusable = listRef.current.querySelector('a[href],button,[tabindex]');

      if (focusable) {
        focusable.focus();
      }
    }; // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem


    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(['MUI: You have provided an invalid combination of props to the Breadcrumbs.', `itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`].join('\n'));
      }

      return allItems;
    }

    return [...allItems.slice(0, itemsBeforeCollapse), /*#__PURE__*/jsx(BreadcrumbCollapsed, {
      "aria-label": expandText,
      onClick: handleClickExpand
    }, "ellipsis"), ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length)];
  };

  const allItems = React.Children.toArray(children).filter(child => {
    if (process.env.NODE_ENV !== 'production') {
      if (reactIs.exports.isFragment(child)) {
        console.error(["MUI: The Breadcrumbs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  }).map((child, index) => /*#__PURE__*/jsx("li", {
    className: classes.li,
    children: child
  }, `child-${index}`));
  return /*#__PURE__*/jsx(BreadcrumbsRoot, _extends({
    ref: ref,
    component: component,
    color: "text.secondary",
    className: clsx(classes.root, className),
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/jsx(BreadcrumbsOl, {
      className: classes.ol,
      ref: listRef,
      ownerState: ownerState,
      children: insertSeparators(expanded || maxItems && allItems.length <= maxItems ? allItems : renderItemsBeforeAndAfter(allItems), classes.separator, separator, ownerState)
    })
  }));
});
process.env.NODE_ENV !== "production" ? Breadcrumbs.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: propTypes$1.exports.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: propTypes$1.exports.object,

  /**
   * @ignore
   */
  className: propTypes$1.exports.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes$1.exports.elementType,

  /**
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Show path'
   */
  expandText: propTypes$1.exports.string,

  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse: integerPropType,

  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse: integerPropType,

  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems: integerPropType,

  /**
   * Custom separator node.
   * @default '/'
   */
  separator: propTypes$1.exports.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: propTypes$1.exports.oneOfType([propTypes$1.exports.arrayOf(propTypes$1.exports.oneOfType([propTypes$1.exports.func, propTypes$1.exports.object, propTypes$1.exports.bool])), propTypes$1.exports.func, propTypes$1.exports.object])
} : void 0;
var Breadcrumbs$1 = Breadcrumbs;

function getLinkUtilityClass(slot) {
  return generateUtilityClass('MuiLink', slot);
}
const linkClasses = generateUtilityClasses('MuiLink', ['root', 'underlineNone', 'underlineHover', 'underlineAlways', 'button', 'focusVisible']);
var linkClasses$1 = linkClasses;

const colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};

const transformDeprecatedColors = color => {
  return colorTransformations[color] || color;
};

const getTextDecoration = ({
  theme,
  ownerState
}) => {
  const transformedColor = transformDeprecatedColors(ownerState.color);
  const color = getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
  const channelColor = getPath(theme, `palette.${transformedColor}Channel`);

  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }

  return alpha(color, 0.4);
};

var getTextDecoration$1 = getTextDecoration;

const _excluded = ["className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant", "sx"];

const useUtilityClasses = ownerState => {
  const {
    classes,
    component,
    focusVisible,
    underline
  } = ownerState;
  const slots = {
    root: ['root', `underline${capitalize(underline)}`, component === 'button' && 'button', focusVisible && 'focusVisible']
  };
  return composeClasses(slots, getLinkUtilityClass, classes);
};

const LinkRoot = styled$1(Typography$1, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`underline${capitalize(ownerState.underline)}`], ownerState.component === 'button' && styles.button];
  }
})(({
  theme,
  ownerState
}) => {
  return _extends({}, ownerState.underline === 'none' && {
    textDecoration: 'none'
  }, ownerState.underline === 'hover' && {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }, ownerState.underline === 'always' && _extends({
    textDecoration: 'underline'
  }, ownerState.color !== 'inherit' && {
    textDecorationColor: getTextDecoration$1({
      theme,
      ownerState
    })
  }, {
    '&:hover': {
      textDecorationColor: 'inherit'
    }
  }), ownerState.component === 'button' && {
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.

    },
    [`&.${linkClasses$1.focusVisible}`]: {
      outline: 'auto'
    }
  });
});
const Link = /*#__PURE__*/React.forwardRef(function Link(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiLink'
  });

  const {
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    TypographyClasses,
    underline = 'always',
    variant = 'inherit',
    sx
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handlerRef = useForkRef(ref, focusVisibleRef);

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = event => {
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const ownerState = _extends({}, props, {
    color,
    component,
    focusVisible,
    underline,
    variant
  });

  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/jsx(LinkRoot, _extends({
    color: color,
    className: clsx(classes.root, className),
    classes: TypographyClasses,
    component: component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref: handlerRef,
    ownerState: ownerState,
    variant: variant,
    sx: [...(!Object.keys(colorTransformations).includes(color) ? [{
      color
    }] : []), ...(Array.isArray(sx) ? sx : [sx])]
  }, other));
});
process.env.NODE_ENV !== "production" ? Link.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: propTypes$1.exports.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: propTypes$1.exports.object,

  /**
   * @ignore
   */
  className: propTypes$1.exports.string,

  /**
   * The color of the link.
   * @default 'primary'
   */
  color: propTypes$1.exports
  /* @typescript-to-proptypes-ignore */
  .any,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef$1,

  /**
   * @ignore
   */
  onBlur: propTypes$1.exports.func,

  /**
   * @ignore
   */
  onFocus: propTypes$1.exports.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: propTypes$1.exports.oneOfType([propTypes$1.exports.arrayOf(propTypes$1.exports.oneOfType([propTypes$1.exports.func, propTypes$1.exports.object, propTypes$1.exports.bool])), propTypes$1.exports.func, propTypes$1.exports.object]),

  /**
   * `classes` prop applied to the [`Typography`](/material-ui/api/typography/) element.
   */
  TypographyClasses: propTypes$1.exports.object,

  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: propTypes$1.exports.oneOf(['always', 'hover', 'none']),

  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: propTypes$1.exports
  /* @typescript-to-proptypes-ignore */
  .oneOfType([propTypes$1.exports.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), propTypes$1.exports.string])
} : void 0;
var Link$1 = Link;

var css_248z$w = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Breadcrumbs-module_container__w5vWh {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  width: auto;\n}\n.Breadcrumbs-module_container__w5vWh .Breadcrumbs-module_seperator__sU40m {\n  width: 1.5rem;\n  height: 1.5rem;\n  stroke: var(--grey2);\n}\n.Breadcrumbs-module_container__w5vWh .Breadcrumbs-module_breadcrumb-item__YCE98 {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: var(--grey2);\n}\n.Breadcrumbs-module_container__w5vWh .Breadcrumbs-module_breadcrumb-item__YCE98.Breadcrumbs-module_active__rs4zQ {\n  color: var(--black);\n}";
var styles$v = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","container":"Breadcrumbs-module_container__w5vWh","seperator":"Breadcrumbs-module_seperator__sU40m","breadcrumb-item":"Breadcrumbs-module_breadcrumb-item__YCE98","active":"Breadcrumbs-module_active__rs4zQ"};
styleInject(css_248z$w);

var BreadCrumbs = function BreadCrumbs(props) {
  var crumbs = props.crumbs,
    maxItems = props.maxItems,
    itemsBeforeCollapse = props.itemsBeforeCollapse,
    itemsAfterCollapse = props.itemsAfterCollapse;
  return /*#__PURE__*/jsx("div", {
    className: classes(styles$v.container),
    children: /*#__PURE__*/jsx(Breadcrumbs$1, _objectSpread2(_objectSpread2({}, props), {}, {
      maxItems: maxItems,
      itemsBeforeCollapse: itemsBeforeCollapse,
      itemsAfterCollapse: itemsAfterCollapse,
      separator: /*#__PURE__*/jsx(BreadcrumbSeperator, {
        className: styles$v.seperator
      }),
      "aria-label": "breadcrumb",
      children: crumbs.map(function (crumb, index) {
        var active = index === crumbs.length - 1;
        return /*#__PURE__*/jsx(Link$1, {
          href: " ",
          underline: "hover",
          children: /*#__PURE__*/jsx("span", {
            "data-elem": "breadcrumb-item".concat(active ? '-active' : ''),
            className: classes(styles$v['breadcrumb-item'], active ? styles$v.active : ''),
            children: getSpacedDisplayName(crumb).replace(/-/g, ' ')
          })
        }, crumb);
      })
    }))
  });
};
BreadCrumbs.propTypes = {
  crumbs: propTypes$1.exports.arrayOf(propTypes$1.exports.string),
  maxItems: propTypes$1.exports.number,
  itemsBeforeCollapse: propTypes$1.exports.number,
  itemsAfterCollapse: propTypes$1.exports.number
};
BreadCrumbs.defaultProps = {
  crumbs: [],
  maxItems: 4,
  itemsBeforeCollapse: 2,
  itemsAfterCollapse: 1
};

var css_248z$v = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Header-module_container__E1lPQ {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0rem 1.5625rem;\n}\n.Header-module_container__E1lPQ .Header-module_title__ZbNwD {\n  font-weight: 400;\n  font-size: 0.8rem;\n  color: var(--black);\n}\n.Header-module_container__E1lPQ .Header-module_left-arrow__TlFfv {\n  cursor: pointer;\n  transform: rotate(180deg);\n}\n.Header-module_container__E1lPQ .Header-module_right-arrow__dhGJ5 {\n  cursor: pointer;\n}";
var styles$u = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","container":"Header-module_container__E1lPQ","title":"Header-module_title__ZbNwD","left-arrow":"Header-module_left-arrow__TlFfv","right-arrow":"Header-module_right-arrow__dhGJ5"};
styleInject(css_248z$v);

var Header = function Header(props) {
  var selectedMonth = props.selectedMonth,
    onMonthChange = props.onMonthChange;
  return /*#__PURE__*/jsxs("div", {
    className: styles$u.container,
    children: [/*#__PURE__*/jsx("div", {
      onClick: function onClick() {
        onMonthChange('prev');
      },
      className: styles$u['left-arrow'],
      children: /*#__PURE__*/jsx(Arrow, {})
    }), /*#__PURE__*/jsx("span", {
      className: styles$u.title,
      children: "".concat(selectedMonth.month, " ").concat(selectedMonth.year)
    }), /*#__PURE__*/jsx("div", {
      onClick: function onClick() {
        onMonthChange('next');
      },
      className: styles$u['right-arrow'],
      children: /*#__PURE__*/jsx(Arrow, {})
    })]
  });
};

var css_248z$u = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Calender-module_root__M2Fnh {\n  padding: 1rem 0rem;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}";
var styles$t = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Calender-module_root__M2Fnh"};
styleInject(css_248z$u);

var css_248z$t = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Body-module_root__NTksi {\n  padding: 0.5rem 0.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: stretch;\n}";
var styles$s = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Body-module_root__NTksi"};
styleInject(css_248z$t);

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof$1(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */

function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */

function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.

  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();

  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */

function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

var MILLISECONDS_IN_DAY = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */

function compareAsc(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */

function isSameDay(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */

function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.

function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full days according to the local timezone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
//=> 92
 */


function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastDayNotFull = Number(compareLocalAsc(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */

function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */

function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */

function isLastDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  return endOfDay(date).getTime() === endOfMonth(date).getTime();
}

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates using trunc as a default rounding method.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */

function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  var result; // Check for the difference of less than month

  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      // This will check if the date is end of Feb and assign a higher end of month date
      // to compare it with Jan
      dateLeft.setDate(30);
    }

    dateLeft.setMonth(dateLeft.getMonth() - sign * difference); // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value

    var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign; // Check for cases of one full calendar month

    if (isLastDayOfMonth(toDate(dirtyDateLeft)) && difference === 1 && compareAsc(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }

    result = sign * (difference - Number(isLastMonthNotFull));
  } // Prevent negative zero


  return result === 0 ? 0 : result;
}

/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp (in seconds). Decimal values will be discarded.
 *
 * @param {Number} unixTime - the given Unix timestamp (in seconds)
 * @returns {Date} the date
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * const result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */

function fromUnixTime(dirtyUnixTime) {
  requiredArgs(1, arguments);
  var unixTime = toInteger(dirtyUnixTime);
  return toDate(unixTime * 1000);
}

/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */

function getTime(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  return timestamp;
}

/**
 * @name getUnixTime
 * @category Timestamp Helpers
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05 CET:
 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */

function getUnixTime(dirtyDate) {
  requiredArgs(1, arguments);
  return Math.floor(getTime(dirtyDate) / 1000);
}

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|Number} date - the date that should be after the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */

function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */

function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */

function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */

function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
/**
 * @name sub
 * @category Common Helpers
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Duration} duration - the object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * | Key     | Description                        |
 * |---------|------------------------------------|
 * | years   | Amount of years to be subtracted   |
 * | months  | Amount of months to be subtracted  |
 * | weeks   | Amount of weeks to be subtracted   |
 * | days    | Amount of days to be subtracted    |
 * | hours   | Amount of hours to be subtracted   |
 * | minutes | Amount of minutes to be subtracted |
 * | seconds | Amount of seconds to be subtracted |
 *
 * All values default to 0
 *
 * @returns {Date} the new date with the seconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */

function sub(date, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== 'object') return new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0; // Subtract years and months

  var dateWithoutMonths = subMonths(date, months + years * 12); // Subtract weeks and days

  var dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7); // Subtract hours, minutes and seconds

  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1000;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

var css_248z$s = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Dates-module_dates__0RkBF {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.Dates-module_dates__0RkBF div {\n  flex-basis: 14.28%;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 0.25rem;\n  cursor: pointer;\n  align-self: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.Dates-module_dates__0RkBF div .Dates-module_date__5NG9T {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  vertical-align: middle;\n  border-radius: 1.5rem;\n  height: 2.5rem;\n  width: 2.5rem;\n  font-weight: 400;\n  font-size: 0.8rem;\n  color: var(--black);\n}\n.Dates-module_dates__0RkBF div .Dates-module_selected__i8GeR {\n  background-color: var(--highlight);\n  color: var(--white);\n}\n.Dates-module_dates__0RkBF div .Dates-module_unSelected__4C9hx {\n  background-color: var(--white);\n  border-color: var(--highlight);\n  border-width: 0.125rem;\n  border-style: solid;\n  color: var(--black);\n}\n.Dates-module_dates__0RkBF div .Dates-module_disabled__BVu0J {\n  background: var(--grey5);\n  border-radius: 1.5rem;\n  color: var(--grey);\n}\n.Dates-module_dates__0RkBF div .Dates-module_diffMonth__0-FKW {\n  opacity: 0.6;\n}\n.Dates-module_dates__0RkBF div:hover .Dates-module_date__5NG9T {\n  background: var(--background);\n  color: var(--highlight);\n  box-shadow: 0rem 0.0625rem 0.0625rem rgba(0, 14, 51, 0.05);\n}\n.Dates-module_dates__0RkBF div:hover .Dates-module_selected__i8GeR {\n  background-color: var(--highlight);\n  color: var(--white);\n}\n.Dates-module_dates__0RkBF div:hover .Dates-module_disabled__BVu0J {\n  background: var(--grey5);\n  border-radius: 1.5rem;\n  color: var(--grey);\n}\n.Dates-module_dates__0RkBF .Dates-module_minInRange__T1rWK {\n  background-color: var(--highlight);\n  border-radius: 1.5rem 0rem 0rem 1.5rem;\n}\n.Dates-module_dates__0RkBF .Dates-module_minInRange__T1rWK .Dates-module_date__5NG9T {\n  color: var(--white);\n}\n.Dates-module_dates__0RkBF .Dates-module_minInRange__T1rWK:hover .Dates-module_date__5NG9T {\n  background: var(--highlight);\n  color: var(--white);\n  box-shadow: 0rem 0.0625rem 0.0625rem rgba(0, 14, 51, 0.05);\n}\n.Dates-module_dates__0RkBF .Dates-module_maxInRange__jQ-FJ {\n  background-color: var(--highlight);\n  border-radius: 0rem 1.5rem 1.5rem 0rem;\n}\n.Dates-module_dates__0RkBF .Dates-module_maxInRange__jQ-FJ .Dates-module_date__5NG9T {\n  color: var(--white);\n}\n.Dates-module_dates__0RkBF .Dates-module_maxInRange__jQ-FJ:hover .Dates-module_date__5NG9T {\n  background: var(--highlight);\n  color: var(--white);\n  box-shadow: 0rem 0.0625rem 0.0625rem rgba(0, 14, 51, 0.05);\n}\n.Dates-module_dates__0RkBF .Dates-module_midInRange__Cwj8o {\n  background: var(--background);\n  border-radius: 0rem;\n}\n.Dates-module_dates__0RkBF .Dates-module_midInRange__Cwj8o .Dates-module_date__5NG9T {\n  color: var(--highlight);\n}\n.Dates-module_dates__0RkBF .Dates-module_first-hovered__gZV6n {\n  background: var(--background);\n  border-radius: 0rem 1.5rem 1.5rem 0rem;\n}\n.Dates-module_dates__0RkBF .Dates-module_first-hovered__gZV6n .Dates-module_date__5NG9T {\n  color: var(--highlight);\n}\n.Dates-module_dates__0RkBF .Dates-module_last-hovered__Kthh9 {\n  background: var(--background);\n  border-radius: 1.5rem 0rem 0rem 1.5rem;\n}\n.Dates-module_dates__0RkBF .Dates-module_last-hovered__Kthh9 .Dates-module_date__5NG9T {\n  color: var(--highlight);\n}";
var styles$r = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","dates":"Dates-module_dates__0RkBF","date":"Dates-module_date__5NG9T","selected":"Dates-module_selected__i8GeR","unSelected":"Dates-module_unSelected__4C9hx","disabled":"Dates-module_disabled__BVu0J","diffMonth":"Dates-module_diffMonth__0-FKW","minInRange":"Dates-module_minInRange__T1rWK","maxInRange":"Dates-module_maxInRange__jQ-FJ","midInRange":"Dates-module_midInRange__Cwj8o","first-hovered":"Dates-module_first-hovered__gZV6n","last-hovered":"Dates-module_last-hovered__Kthh9"};
styleInject(css_248z$s);

var getDatesOfLastWeekOfLastMonth = function getDatesOfLastWeekOfLastMonth(_ref) {
  var monthAsNumber = _ref.monthAsNumber,
    year = _ref.year,
    remainingDaysInFirstWeek = _ref.remainingDaysInFirstWeek;
  if (remainingDaysInFirstWeek === 0) {
    return [];
  }
  var month;
  var fullYear;
  if (monthAsNumber === 0) {
    month = 11;
    fullYear = year - 1;
  } else {
    month = monthAsNumber - 1;
    fullYear = year;
  }
  var _getDatesInAMonth = getDatesInAMonth({
      month: month,
      year: fullYear
    }),
    dateObj = _getDatesInAMonth.dateObj;
  return dateObj.slice(-remainingDaysInFirstWeek);
};
var getDatesOfFirstWeekOfNextMonth = function getDatesOfFirstWeekOfNextMonth(_ref2) {
  var monthAsNumber = _ref2.monthAsNumber,
    year = _ref2.year,
    remainingDaysInLastWeek = _ref2.remainingDaysInLastWeek;
  var month;
  var fullYear;
  if (monthAsNumber === 11) {
    month = 0;
    fullYear = year + 1;
  } else {
    month = monthAsNumber + 1;
    fullYear = year;
  }
  var _getDatesInAMonth2 = getDatesInAMonth({
      month: month,
      year: fullYear
    }),
    dateObj = _getDatesInAMonth2.dateObj;
  return dateObj.slice(0, remainingDaysInLastWeek);
};
var getDatesToDisplay = function getDatesToDisplay(_ref3) {
  var monthAsNumber = _ref3.monthAsNumber,
    year = _ref3.year,
    days = _ref3.days,
    dateObj = _ref3.dateObj;
  var _days = _slicedToArray(days, 1),
    firstDay = _days[0];
  var dates = [].concat(_toConsumableArray(getDatesOfLastWeekOfLastMonth({
    monthAsNumber: monthAsNumber,
    year: year,
    remainingDaysInFirstWeek: firstDay
  })), _toConsumableArray(dateObj), _toConsumableArray(getDatesOfFirstWeekOfNextMonth({
    monthAsNumber: monthAsNumber,
    year: year,
    remainingDaysInLastWeek: 7 - (days[days.length - 1] + 1)
  })));
  return dates;
};
var rangeSelection = function rangeSelection(_ref4) {
  var _MONTHS$date$getMonth, _selectedRange$unix, _selectedRange$dates, _selectedRange$unix3, _selectedRange$unix4, _selectedRange$unix5, _selectedRange$unix7;
  var selectedRange = _ref4.selectedRange,
    date = _ref4.date;
  var dateAsNumber = date === null || date === void 0 ? void 0 : date.getDate();
  var month = (_MONTHS$date$getMonth = MONTHS[date === null || date === void 0 ? void 0 : date.getMonth()]) === null || _MONTHS$date$getMonth === void 0 ? void 0 : _MONTHS$date$getMonth.substring(0, 3);
  var year = date === null || date === void 0 ? void 0 : date.getFullYear();
  if (((_selectedRange$unix = selectedRange.unix) === null || _selectedRange$unix === void 0 ? void 0 : _selectedRange$unix[0]) === getUnixTime(date)) {
    return {
      dates: [],
      unix: []
    };
  }
  if (((_selectedRange$dates = selectedRange.dates) === null || _selectedRange$dates === void 0 ? void 0 : _selectedRange$dates.length) < 2) {
    var _selectedRange$dates2, _selectedRange$unix2;
    if (((_selectedRange$dates2 = selectedRange.dates) === null || _selectedRange$dates2 === void 0 ? void 0 : _selectedRange$dates2.length) === 1 && isBefore(date, fromUnixTime((_selectedRange$unix2 = selectedRange.unix) === null || _selectedRange$unix2 === void 0 ? void 0 : _selectedRange$unix2[0]))) {
      return {
        dates: ["".concat(dateAsNumber, " ").concat(month, " ").concat(year)].concat(_toConsumableArray(selectedRange.dates)),
        unix: [getUnixTime(date)].concat(_toConsumableArray(selectedRange.unix))
      };
    }
    return {
      dates: [].concat(_toConsumableArray(selectedRange.dates), ["".concat(dateAsNumber, " ").concat(month, " ").concat(year)]),
      unix: [].concat(_toConsumableArray(selectedRange.unix), [getUnixTime(date)])
    };
  }
  if ((isBefore(date, fromUnixTime((_selectedRange$unix3 = selectedRange.unix) === null || _selectedRange$unix3 === void 0 ? void 0 : _selectedRange$unix3[1])) || isAfter(date, fromUnixTime((_selectedRange$unix4 = selectedRange.unix) === null || _selectedRange$unix4 === void 0 ? void 0 : _selectedRange$unix4[1]))) && isAfter(date, fromUnixTime((_selectedRange$unix5 = selectedRange.unix) === null || _selectedRange$unix5 === void 0 ? void 0 : _selectedRange$unix5[0]))) {
    var _selectedRange$dates3, _selectedRange$unix6;
    return {
      dates: [(_selectedRange$dates3 = selectedRange.dates) === null || _selectedRange$dates3 === void 0 ? void 0 : _selectedRange$dates3[0], "".concat(dateAsNumber, " ").concat(month, " ").concat(year)],
      unix: [(_selectedRange$unix6 = selectedRange.unix) === null || _selectedRange$unix6 === void 0 ? void 0 : _selectedRange$unix6[0], getUnixTime(date)]
    };
  }
  if (isBefore(date, fromUnixTime((_selectedRange$unix7 = selectedRange.unix) === null || _selectedRange$unix7 === void 0 ? void 0 : _selectedRange$unix7[0]))) {
    var _selectedRange$dates4, _selectedRange$unix8;
    return {
      dates: ["".concat(dateAsNumber, " ").concat(month, " ").concat(year), (_selectedRange$dates4 = selectedRange.dates) === null || _selectedRange$dates4 === void 0 ? void 0 : _selectedRange$dates4[1]],
      unix: [getUnixTime(date), (_selectedRange$unix8 = selectedRange.unix) === null || _selectedRange$unix8 === void 0 ? void 0 : _selectedRange$unix8[1]]
    };
  }
  return {
    dates: [],
    unix: []
  };
};

var Dates = function Dates(props) {
  var selectedMonth = props.selectedMonth,
    selectedDate = props.selectedDate,
    setSelectedDate = props.setSelectedDate,
    range = props.range,
    selectedRange = props.selectedRange,
    setSelectedRange = props.setSelectedRange,
    disabledDates = props.disabledDates;
  var monthAsNumber = selectedMonth.monthAsNumber,
    year = selectedMonth.year;
  var _useState = useState(function () {
      return [];
    }),
    _useState2 = _slicedToArray(_useState, 2),
    datesToDisplay = _useState2[0],
    setDatesToDisplay = _useState2[1];
  var _useState3 = useState(function () {
      return null;
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    unSelectedDate = _useState4[0],
    setUnSelectedDate = _useState4[1];
  var _useState5 = useState(function () {
      return null;
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    hoveredEndingDate = _useState6[0],
    setHoveredEndingDate = _useState6[1];
  var _useState7 = useState(function () {
      return getDatesInAMonth({
        month: monthAsNumber,
        year: year
      });
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    datesInMonth = _useState8[0],
    setDatesInMonth = _useState8[1];
  var days = datesInMonth.days,
    dateObj = datesInMonth.dateObj;
  useEffect(function () {
    setDatesInMonth(getDatesInAMonth({
      month: monthAsNumber,
      year: year
    }));
    setUnSelectedDate(null);
  }, [selectedMonth]);
  useEffect(function () {
    setDatesToDisplay(getDatesToDisplay({
      monthAsNumber: monthAsNumber,
      year: year,
      days: days,
      dateObj: dateObj
    }));
  }, [days]);
  var dateSelection = function dateSelection(date) {
    if (range) {
      setHoveredEndingDate(null);
      setSelectedRange(rangeSelection({
        selectedMonth: selectedMonth,
        selectedRange: selectedRange,
        date: date
      }));
      return;
    }
    var dateAsNumber = date.getDate();
    if (selectedDate.date === dateAsNumber) {
      setSelectedDate({});
      setUnSelectedDate(date.toISOString());
      return;
    }
    setUnSelectedDate(null);
    setSelectedDate(_objectSpread2(_objectSpread2({}, selectedDate), {}, {
      month: selectedMonth.month,
      year: selectedMonth.year,
      date: dateAsNumber,
      unix: getUnixTime(date.setHours(23, 59, 59, 59))
    }));
  };
  var onMouseEnterADate = function onMouseEnterADate(date) {
    var _selectedRange$unix;
    if (range && ((_selectedRange$unix = selectedRange.unix) === null || _selectedRange$unix === void 0 ? void 0 : _selectedRange$unix.length) === 1) {
      setHoveredEndingDate(getUnixTime(date));
    }
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$r.dates,
    children: datesToDisplay.map(function (date) {
      var _selectedRange$unix2;
      var dateNumber = date === null || date === void 0 ? void 0 : date.getDate();
      var selectedSingleDate = isSameDay(fromUnixTime(selectedDate.unix), date);
      var _ref = (_selectedRange$unix2 = selectedRange.unix) !== null && _selectedRange$unix2 !== void 0 ? _selectedRange$unix2 : [],
        _ref2 = _slicedToArray(_ref, 2),
        firstItem = _ref2[0],
        lastItem = _ref2[1];
      var isFirstItem = isSameDay(fromUnixTime(firstItem), date);
      var isLastItem = isSameDay(fromUnixTime(lastItem), date);
      var isLastItemHovered = hoveredEndingDate === getUnixTime(date);
      var isFirstItemHovered = isBefore(date, fromUnixTime(firstItem)) && hoveredEndingDate === getUnixTime(date);
      var notSameMonth = date.getMonth() !== monthAsNumber;
      var isUnSelected = unSelectedDate === date.toISOString();
      var isDisabled = disabledDates.includes(date.toDateString());
      var isHoveringBeforeSelectedDate = isBefore(fromUnixTime(hoveredEndingDate), fromUnixTime(firstItem));
      var isMidItem;
      if (hoveredEndingDate) {
        isMidItem = isBefore(date, fromUnixTime(hoveredEndingDate)) && isAfter(date, fromUnixTime(firstItem)) || isAfter(date, fromUnixTime(hoveredEndingDate)) && isBefore(date, fromUnixTime(firstItem));
      } else {
        isMidItem = isBefore(date, fromUnixTime(lastItem)) && isAfter(date, fromUnixTime(firstItem).setHours(23, 59, 59, 59));
      }
      var parentClassNames = classes(isMidItem ? styles$r.midInRange : '', isFirstItem ? isHoveringBeforeSelectedDate ? styles$r.maxInRange : styles$r.minInRange : '', isLastItem ? styles$r.maxInRange : '', isLastItemHovered ? styles$r['first-hovered'] : '', isFirstItemHovered ? styles$r['last-hovered'] : '');
      var childClassNames = classes(date ? styles$r.date : '', selectedSingleDate ? styles$r.selected : '', isUnSelected ? styles$r.unSelected : '', notSameMonth ? styles$r.diffMonth : '', isDisabled ? styles$r.disabled : '');
      return /*#__PURE__*/jsx("div", {
        className: parentClassNames,
        onClick: function onClick() {
          if (!isDisabled) {
            dateSelection(date);
          }
        },
        onMouseEnter: function onMouseEnter() {
          onMouseEnterADate(date);
        },
        children: /*#__PURE__*/jsx("span", {
          className: childClassNames,
          children: dateNumber
        })
      }, date.toDateString());
    })
  });
};

var css_248z$r = ".Days-module_days__72DG8 {\n  display: flex;\n  text-align: center;\n}\n.Days-module_days__72DG8 span {\n  padding: 0.75rem 0.5rem;\n  font-weight: 500;\n  font-size: 0.8rem;\n  color: black;\n  flex-basis: 14.28%;\n}";
var styles$q = {"days":"Days-module_days__72DG8"};
styleInject(css_248z$r);

var Days = function Days() {
  var daysInWeek = DAYS;
  return /*#__PURE__*/jsx("div", {
    className: styles$q.days,
    children: daysInWeek.map(function (day) {
      return /*#__PURE__*/jsx("span", {
        children: day
      }, day);
    })
  });
};

var Body = function Body(props) {
  return /*#__PURE__*/jsxs("div", {
    className: styles$s.root,
    children: [/*#__PURE__*/jsx(Days, {}), /*#__PURE__*/jsx(Dates, _objectSpread2({}, props))]
  });
};

var css_248z$q = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Footer-module_root__1sEdT {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: stretch;\n  margin-inline: 1rem;\n}\n.Footer-module_root__1sEdT .Footer-module_apply__NEROx {\n  margin-top: 0.5rem;\n  width: 100%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.Footer-module_selected-date__kFJ0e {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 1.125rem;\n  background: var(--white);\n  border: 0.0625rem solid var(--grey4);\n  border-radius: 0.25rem;\n  padding-block: 0.875rem;\n}\n.Footer-module_selected-date__kFJ0e .Footer-module_date__r4-GN {\n  font-weight: 500;\n  font-size: 0.875rem;\n  line-height: 1.3125rem;\n}\n.Footer-module_selected-date__kFJ0e .Footer-module_date__r4-GN .Footer-module_value__tBvnj {\n  font-weight: 400;\n}\n\n.Footer-module_date-ranges__VuNtD {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: stretch;\n  margin-top: 0.5rem;\n}\n.Footer-module_date-ranges__VuNtD .Footer-module_date-range__xQFZb {\n  display: flex;\n  align-items: center;\n  padding: 0.875rem 1rem;\n  gap: 1.125rem;\n  cursor: pointer;\n}\n.Footer-module_date-ranges__VuNtD .Footer-module_date-range__xQFZb:hover {\n  background-color: var(--background);\n}\n.Footer-module_date-ranges__VuNtD .Footer-module_date-range__xQFZb span {\n  font-weight: 400;\n  font-size: 0.875rem;\n  line-height: 1.3125rem;\n  color: var(--black);\n}\n.Footer-module_date-ranges__VuNtD .Footer-module_selected__-p-Mt {\n  background-color: var(--background);\n}";
var styles$p = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Footer-module_root__1sEdT","apply":"Footer-module_apply__NEROx","selected-date":"Footer-module_selected-date__kFJ0e","date":"Footer-module_date__r4-GN","value":"Footer-module_value__tBvnj","date-ranges":"Footer-module_date-ranges__VuNtD","date-range":"Footer-module_date-range__xQFZb","selected":"Footer-module_selected__-p-Mt"};
styleInject(css_248z$q);

var getDateAndUnixRange = function getDateAndUnixRange(duration) {
  var startingDate = sub(new Date(), duration);
  startingDate.setHours(0, 0, 0, 0);
  var endingDate = new Date();
  endingDate.setHours(0, 0, 0, 0);
  var dates = ["".concat(startingDate.getDate(), " ").concat(MONTHS[startingDate.getMonth()].substring(0, 3), " ").concat(startingDate.getFullYear()), "".concat(endingDate.getDate(), " ").concat(MONTHS[endingDate.getMonth()].substring(0, 3), " ").concat(endingDate.getFullYear())];
  var unix = [getUnixTime(startingDate), getUnixTime(endingDate)];
  return {
    dates: dates,
    unix: unix
  };
};
var dateRanges = [{
  title: '7 Days',
  dateRange: getDateAndUnixRange({
    days: 7
  })
}, {
  title: '15 Days',
  dateRange: getDateAndUnixRange({
    days: 15
  })
}, {
  title: '1 Month',
  dateRange: getDateAndUnixRange({
    months: 1
  })
}];

var Footer = function Footer(props) {
  var _props$selectedDate = props.selectedDate,
    selectedDate = _props$selectedDate === void 0 ? {} : _props$selectedDate,
    _props$selectedRange = props.selectedRange,
    selectedRange = _props$selectedRange === void 0 ? {} : _props$selectedRange,
    setSelectedRange = props.setSelectedRange,
    range = props.range,
    onApply = props.onApply;
  var date = selectedDate.date,
    month = selectedDate.month,
    year = selectedDate.year;
  var _selectedRange$dates = selectedRange.dates,
    dates = _selectedRange$dates === void 0 ? [] : _selectedRange$dates;
  var monthInShort = month === null || month === void 0 ? void 0 : month.substr(0, 3);
  var datesSelected = date || dates.length === 2;
  var selectFixedDateRange = function selectFixedDateRange(dateRange) {
    setSelectedRange(dateRange);
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$p.root,
    children: [datesSelected && /*#__PURE__*/jsxs("div", {
      className: styles$p['selected-date'],
      children: [/*#__PURE__*/jsx(Calender$1, {}), /*#__PURE__*/jsxs("div", {
        className: styles$p.date,
        children: [dates.length > 0 && /*#__PURE__*/jsx("span", {
          className: styles$p.value,
          children: "".concat(selectedRange.dates[0], " - ").concat(selectedRange.dates[1])
        }), /*#__PURE__*/jsxs("span", {
          className: styles$p.value,
          children: [date, " ", monthInShort, " ", year]
        })]
      })]
    }), range && /*#__PURE__*/jsx("div", {
      className: styles$p['date-ranges'],
      children: dateRanges.map(function (_ref) {
        var _selectedRange$unix;
        var dateRange = _ref.dateRange,
          title = _ref.title;
        var selectedFixedDateRange = dateRange.unix.toString() === ((_selectedRange$unix = selectedRange.unix) === null || _selectedRange$unix === void 0 ? void 0 : _selectedRange$unix.toString());
        return /*#__PURE__*/jsxs("div", {
          className: classes(styles$p['date-range'], selectedFixedDateRange ? styles$p.selected : ''),
          onClick: function onClick() {
            selectFixedDateRange(dateRange);
          },
          children: [/*#__PURE__*/jsx(HalfShade, {}), /*#__PURE__*/jsx("span", {
            children: title
          })]
        }, title);
      })
    }), datesSelected && /*#__PURE__*/jsx(Button, {
      onClick: onApply,
      title: "Apply",
      className: styles$p.apply
    })]
  });
};

var Calender = function Calender(props) {
  var range = props.range,
    selectedDate = props.selectedDate,
    setSelectedDate = props.setSelectedDate,
    selectedRange = props.selectedRange,
    setSelectedRange = props.setSelectedRange,
    onApply = props.onApply,
    disabledDates = props.disabledDates;
  var _getToday = getToday(),
    month = _getToday.month,
    year = _getToday.year,
    monthAsNumber = _getToday.monthAsNumber,
    dayAsNumber = _getToday.dayAsNumber;
  var _useState = useState({
      month: month,
      monthAsNumber: monthAsNumber,
      year: year,
      dayAsNumber: dayAsNumber
    }),
    _useState2 = _slicedToArray(_useState, 2),
    selectedMonth = _useState2[0],
    setSelectedMonth = _useState2[1];
  var onMonthChange = function onMonthChange(switchSide) {
    if (switchSide === 'prev') {
      if (selectedMonth.monthAsNumber === 0) {
        var _previousMonth = FULL_MONTHS[11];
        setSelectedMonth({
          month: _previousMonth,
          monthAsNumber: 11,
          year: selectedMonth.year - 1
        });
        return;
      }
      var previousMonthNumber = selectedMonth.monthAsNumber - 1;
      var previousMonth = FULL_MONTHS[previousMonthNumber];
      setSelectedMonth({
        month: previousMonth,
        monthAsNumber: previousMonthNumber,
        year: selectedMonth.year
      });
      return;
    }
    if (switchSide === 'next') {
      if (selectedMonth.monthAsNumber === 11) {
        var _nextMonth = FULL_MONTHS[0];
        setSelectedMonth({
          month: _nextMonth,
          monthAsNumber: 0,
          year: selectedMonth.year + 1
        });
        return;
      }
      var nextMonthNumber = selectedMonth.monthAsNumber + 1;
      var nextMonth = FULL_MONTHS[nextMonthNumber];
      setSelectedMonth({
        month: nextMonth,
        monthAsNumber: nextMonthNumber,
        year: selectedMonth.year
      });
    }
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$t.root,
    children: [/*#__PURE__*/jsx(Header, {
      selectedMonth: selectedMonth,
      onMonthChange: onMonthChange
    }), /*#__PURE__*/jsx(Body, {
      selectedMonth: selectedMonth,
      range: range,
      selectedDate: selectedDate,
      setSelectedDate: setSelectedDate,
      selectedRange: selectedRange,
      setSelectedRange: setSelectedRange,
      disabledDates: disabledDates
    }), /*#__PURE__*/jsx(Footer, {
      range: range,
      selectedDate: selectedDate,
      selectedRange: selectedRange,
      setSelectedRange: setSelectedRange,
      onApply: onApply
    })]
  });
};

var main = {exports: {}};

(function (module, exports) {
	!function(e,t){module.exports=t(React__default);}(commonjsGlobal,(function(e){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=48)}([function(t,n){t.exports=e;},function(e,t){var n=e.exports={version:"2.6.12"};"number"==typeof __e&&(__e=n);},function(e,t,n){var a=n(26)("wks"),r=n(17),o=n(3).Symbol,i="function"==typeof o;(e.exports=function(e){return a[e]||(a[e]=i&&o[e]||(i?o:r)("Symbol."+e))}).store=a;},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},function(e,t,n){e.exports=!n(8)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}));},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)};},function(e,t,n){var a=n(7),r=n(16);e.exports=n(4)?function(e,t,n){return a.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e};},function(e,t,n){var a=n(10),r=n(35),o=n(23),i=Object.defineProperty;t.f=n(4)?Object.defineProperty:function(e,t,n){if(a(e),t=o(t,!0),a(n),r)try{return i(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return "value"in n&&(e[t]=n.value),e};},function(e,t){e.exports=function(e){try{return !!e()}catch(e){return !0}};},function(e,t,n){var a=n(40),r=n(22);e.exports=function(e){return a(r(e))};},function(e,t,n){var a=n(11);e.exports=function(e){if(!a(e))throw TypeError(e+" is not an object!");return e};},function(e,t){e.exports=function(e){return "object"==typeof e?null!==e:"function"==typeof e};},function(e,t){e.exports={};},function(e,t,n){var a=n(39),r=n(27);e.exports=Object.keys||function(e){return a(e,r)};},function(e,t){e.exports=!0;},function(e,t,n){var a=n(3),r=n(1),o=n(53),i=n(6),s=n(5),c=function(e,t,n){var l,u,f,p=e&c.F,d=e&c.G,b=e&c.S,h=e&c.P,v=e&c.B,m=e&c.W,y=d?r:r[t]||(r[t]={}),g=y.prototype,E=d?a:b?a[t]:(a[t]||{}).prototype;for(l in d&&(n=t),n)(u=!p&&E&&void 0!==E[l])&&s(y,l)||(f=u?E[l]:n[l],y[l]=d&&"function"!=typeof E[l]?n[l]:v&&u?o(f,a):m&&E[l]==f?function(e){var t=function(t,n,a){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,a)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(f):h&&"function"==typeof f?o(Function.call,f):f,h&&((y.virtual||(y.virtual={}))[l]=f,e&c.R&&g&&!g[l]&&i(g,l,f)));};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c;},function(e,t){e.exports=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}};},function(e,t){var n=0,a=Math.random();e.exports=function(e){return "Symbol(".concat(void 0===e?"":e,")_",(++n+a).toString(36))};},function(e,t,n){var a=n(22);e.exports=function(e){return Object(a(e))};},function(e,t){t.f={}.propertyIsEnumerable;},function(e,t,n){var a=n(52)(!0);n(34)(String,"String",(function(e){this._t=String(e),this._i=0;}),(function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=a(t,n),this._i+=e.length,{value:e,done:!1})}));},function(e,t){var n=Math.ceil,a=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?a:n)(e)};},function(e,t){e.exports=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e};},function(e,t,n){var a=n(11);e.exports=function(e,t){if(!a(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!a(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")};},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)};},function(e,t,n){var a=n(26)("keys"),r=n(17);e.exports=function(e){return a[e]||(a[e]=r(e))};},function(e,t,n){var a=n(1),r=n(3),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(e.exports=function(e,t){return o[e]||(o[e]=void 0!==t?t:{})})("versions",[]).push({version:a.version,mode:n(14)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"});},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");},function(e,t,n){var a=n(7).f,r=n(5),o=n(2)("toStringTag");e.exports=function(e,t,n){e&&!r(e=n?e:e.prototype,o)&&a(e,o,{configurable:!0,value:t});};},function(e,t,n){n(62);for(var a=n(3),r=n(6),o=n(12),i=n(2)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),c=0;c<s.length;c++){var l=s[c],u=a[l],f=u&&u.prototype;f&&!f[i]&&r(f,i,l),o[l]=o.Array;}},function(e,t,n){t.f=n(2);},function(e,t,n){var a=n(3),r=n(1),o=n(14),i=n(30),s=n(7).f;e.exports=function(e){var t=r.Symbol||(r.Symbol=o?{}:a.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:i.f(e)});};},function(e,t){t.f=Object.getOwnPropertySymbols;},function(e,t){e.exports=function(e,t,n){return Math.min(Math.max(e,t),n)};},function(e,t,n){var a=n(14),r=n(15),o=n(37),i=n(6),s=n(12),c=n(55),l=n(28),u=n(61),f=n(2)("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};e.exports=function(e,t,n,b,h,v,m){c(n,t,b);var y,g,E,j=function(e){if(!p&&e in O)return O[e];switch(e){case"keys":case"values":return function(){return new n(this,e)}}return function(){return new n(this,e)}},x=t+" Iterator",_="values"==h,k=!1,O=e.prototype,C=O[f]||O["@@iterator"]||h&&O[h],S=C||j(h),w=h?_?j("entries"):S:void 0,A="Array"==t&&O.entries||C;if(A&&(E=u(A.call(new e)))!==Object.prototype&&E.next&&(l(E,x,!0),a||"function"==typeof E[f]||i(E,f,d)),_&&C&&"values"!==C.name&&(k=!0,S=function(){return C.call(this)}),a&&!m||!p&&!k&&O[f]||i(O,f,S),s[t]=S,s[x]=d,h)if(y={values:_?S:j("values"),keys:v?S:j("keys"),entries:w},m)for(g in y)g in O||o(O,g,y[g]);else r(r.P+r.F*(p||k),t,y);return y};},function(e,t,n){e.exports=!n(4)&&!n(8)((function(){return 7!=Object.defineProperty(n(36)("div"),"a",{get:function(){return 7}}).a}));},function(e,t,n){var a=n(11),r=n(3).document,o=a(r)&&a(r.createElement);e.exports=function(e){return o?r.createElement(e):{}};},function(e,t,n){e.exports=n(6);},function(e,t,n){var a=n(10),r=n(56),o=n(27),i=n(25)("IE_PROTO"),s=function(){},c=function(){var e,t=n(36)("iframe"),a=o.length;for(t.style.display="none",n(60).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),c=e.F;a--;)delete c.prototype[o[a]];return c()};e.exports=Object.create||function(e,t){var n;return null!==e?(s.prototype=a(e),n=new s,s.prototype=null,n[i]=e):n=c(),void 0===t?n:r(n,t)};},function(e,t,n){var a=n(5),r=n(9),o=n(57)(!1),i=n(25)("IE_PROTO");e.exports=function(e,t){var n,s=r(e),c=0,l=[];for(n in s)n!=i&&a(s,n)&&l.push(n);for(;t.length>c;)a(s,n=t[c++])&&(~o(l,n)||l.push(n));return l};},function(e,t,n){var a=n(24);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return "String"==a(e)?e.split(""):Object(e)};},function(e,t,n){var a=n(39),r=n(27).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return a(e,r)};},function(e,t,n){var a=n(24),r=n(2)("toStringTag"),o="Arguments"==a(function(){return arguments}());e.exports=function(e){var t,n,i;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),r))?n:o?a(t):"Object"==(i=a(t))&&"function"==typeof t.callee?"Arguments":i};},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")();}catch(e){"object"==typeof window&&(n=window);}e.exports=n;},function(e,t){var n=/-?\d+(\.\d+)?%?/g;e.exports=function(e){return e.match(n)};},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.getBase16Theme=t.createStyling=t.invertTheme=void 0;var a=d(n(49)),r=d(n(76)),o=d(n(81)),i=d(n(89)),s=d(n(93)),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(94)),l=d(n(132)),u=d(n(133)),f=d(n(138)),p=n(139);function d(e){return e&&e.__esModule?e:{default:e}}var b=c.default,h=(0, i.default)(b),v=(0, f.default)(u.default,p.rgb2yuv,(function(e){var t,n=(0, o.default)(e,3),a=n[0],r=n[1],i=n[2];return [(t=a,t<.25?1:t<.5?.9-t:1.1-t),r,i]}),p.yuv2rgb,l.default),m=function(e){return function(t){return {className:[t.className,e.className].filter(Boolean).join(" "),style:(0, r.default)({},t.style||{},e.style||{})}}},y=function(e,t){var n=(0, i.default)(t);for(var o in e)-1===n.indexOf(o)&&n.push(o);return n.reduce((function(n,o){return n[o]=function(e,t){if(void 0===e)return t;if(void 0===t)return e;var n=void 0===e?"undefined":(0, a.default)(e),o=void 0===t?"undefined":(0, a.default)(t);switch(n){case"string":switch(o){case"string":return [t,e].filter(Boolean).join(" ");case"object":return m({className:e,style:t});case"function":return function(n){for(var a=arguments.length,r=Array(a>1?a-1:0),o=1;o<a;o++)r[o-1]=arguments[o];return m({className:e})(t.apply(void 0,[n].concat(r)))}}case"object":switch(o){case"string":return m({className:t,style:e});case"object":return (0, r.default)({},t,e);case"function":return function(n){for(var a=arguments.length,r=Array(a>1?a-1:0),o=1;o<a;o++)r[o-1]=arguments[o];return m({style:e})(t.apply(void 0,[n].concat(r)))}}case"function":switch(o){case"string":return function(n){for(var a=arguments.length,r=Array(a>1?a-1:0),o=1;o<a;o++)r[o-1]=arguments[o];return e.apply(void 0,[m(n)({className:t})].concat(r))};case"object":return function(n){for(var a=arguments.length,r=Array(a>1?a-1:0),o=1;o<a;o++)r[o-1]=arguments[o];return e.apply(void 0,[m(n)({style:t})].concat(r))};case"function":return function(n){for(var a=arguments.length,r=Array(a>1?a-1:0),o=1;o<a;o++)r[o-1]=arguments[o];return e.apply(void 0,[t.apply(void 0,[n].concat(r))].concat(r))}}}}(e[o],t[o]),n}),{})},g=function(e,t){for(var n=arguments.length,o=Array(n>2?n-2:0),s=2;s<n;s++)o[s-2]=arguments[s];if(null===t)return e;Array.isArray(t)||(t=[t]);var c=t.map((function(t){return e[t]})).filter(Boolean),l=c.reduce((function(e,t){return "string"==typeof t?e.className=[e.className,t].filter(Boolean).join(" "):"object"===(void 0===t?"undefined":(0, a.default)(t))?e.style=(0, r.default)({},e.style,t):"function"==typeof t&&(e=(0, r.default)({},e,t.apply(void 0,[e].concat(o)))),e}),{className:"",style:{}});return l.className||delete l.className,0===(0, i.default)(l.style).length&&delete l.style,l},E=t.invertTheme=function(e){return (0, i.default)(e).reduce((function(t,n){return t[n]=/^base/.test(n)?v(e[n]):"scheme"===n?e[n]+":inverted":e[n],t}),{})},j=(t.createStyling=(0, s.default)((function(e){for(var t=arguments.length,n=Array(t>3?t-3:0),a=3;a<t;a++)n[a-3]=arguments[a];var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=o.defaultBase16,u=void 0===l?b:l,f=o.base16Themes,p=void 0===f?null:f,d=j(c,p);d&&(c=(0, r.default)({},d,c));var v=h.reduce((function(e,t){return e[t]=c[t]||u[t],e}),{}),m=(0, i.default)(c).reduce((function(e,t){return -1===h.indexOf(t)?(e[t]=c[t],e):e}),{}),E=e(v),x=y(m,E);return (0, s.default)(g,2).apply(void 0,[x].concat(n))}),3),t.getBase16Theme=function(e,t){if(e&&e.extend&&(e=e.extend),"string"==typeof e){var n=e.split(":"),a=(0, o.default)(n,2),r=a[0],i=a[1];e=(t||{})[r]||c[r],"inverted"===i&&(e=E(e));}return e&&e.hasOwnProperty("base00")?e:void 0});},function(e,t,n){var a,r="object"==typeof Reflect?Reflect:null,o=r&&"function"==typeof r.apply?r.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};a=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var i=Number.isNaN||function(e){return e!=e};function s(){s.init.call(this);}e.exports=s,e.exports.once=function(e,t){return new Promise((function(n,a){function r(){void 0!==o&&e.removeListener("error",o),n([].slice.call(arguments));}var o;"error"!==t&&(o=function(n){e.removeListener(t,r),a(n);},e.once("error",o)),e.once(t,r);}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var c=10;function l(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function u(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function f(e,t,n,a){var r,o,i,s;if(l(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),i=o[t]),void 0===i)i=o[t]=n,++e._eventsCount;else if("function"==typeof i?i=o[t]=a?[n,i]:[i,n]:a?i.unshift(n):i.push(n),(r=u(e))>0&&i.length>r&&!i.warned){i.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+i.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=i.length,s=c,console&&console.warn&&console.warn(s);}return e}function p(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(e,t,n){var a={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=p.bind(a);return r.listener=n,a.wrapFn=r,r}function b(e,t,n){var a=e._events;if(void 0===a)return [];var r=a[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):v(r,r.length)}function h(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(e,t){for(var n=new Array(t),a=0;a<t;++a)n[a]=e[a];return n}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e||e<0||i(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e;}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0;},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||i(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return u(this)},s.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var a="error"===e,r=this._events;if(void 0!==r)a=a&&void 0===r.error;else if(!a)return !1;if(a){var i;if(t.length>0&&(i=t[0]),i instanceof Error)throw i;var s=new Error("Unhandled error."+(i?" ("+i.message+")":""));throw s.context=i,s}var c=r[e];if(void 0===c)return !1;if("function"==typeof c)o(c,this,t);else {var l=c.length,u=v(c,l);for(n=0;n<l;++n)o(u[n],this,t);}return !0},s.prototype.addListener=function(e,t){return f(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return f(this,e,t,!0)},s.prototype.once=function(e,t){return l(t),this.on(e,d(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return l(t),this.prependListener(e,d(this,e,t)),this},s.prototype.removeListener=function(e,t){var n,a,r,o,i;if(l(t),void 0===(a=this._events))return this;if(void 0===(n=a[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete a[e],a.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){i=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop();}(n,r),1===n.length&&(a[e]=n[0]),void 0!==a.removeListener&&this.emit("removeListener",e,i||t);}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,n,a;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(a=0;a<o.length;++a)"removeListener"!==(r=o[a])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(a=t.length-1;a>=0;a--)this.removeListener(e,t[a]);return this},s.prototype.listeners=function(e){return b(this,e,!0)},s.prototype.rawListeners=function(e){return b(this,e,!1)},s.listenerCount=function(e,t){return "function"==typeof e.listenerCount?e.listenerCount(t):h.call(e,t)},s.prototype.listenerCount=h,s.prototype.eventNames=function(){return this._eventsCount>0?a(this._events):[]};},function(e,t,n){e.exports.Dispatcher=n(140);},function(e,t,n){e.exports=n(142);},function(e,t,n){t.__esModule=!0;var a=i(n(50)),r=i(n(65)),o="function"==typeof r.default&&"symbol"==typeof a.default?function(e){return typeof e}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":typeof e};function i(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof r.default&&"symbol"===o(a.default)?function(e){return void 0===e?"undefined":o(e)}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":void 0===e?"undefined":o(e)};},function(e,t,n){e.exports={default:n(51),__esModule:!0};},function(e,t,n){n(20),n(29),e.exports=n(30).f("iterator");},function(e,t,n){var a=n(21),r=n(22);e.exports=function(e){return function(t,n){var o,i,s=String(r(t)),c=a(n),l=s.length;return c<0||c>=l?e?"":void 0:(o=s.charCodeAt(c))<55296||o>56319||c+1===l||(i=s.charCodeAt(c+1))<56320||i>57343?e?s.charAt(c):o:e?s.slice(c,c+2):i-56320+(o-55296<<10)+65536}};},function(e,t,n){var a=n(54);e.exports=function(e,t,n){if(a(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,a){return e.call(t,n,a)};case 3:return function(n,a,r){return e.call(t,n,a,r)}}return function(){return e.apply(t,arguments)}};},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e};},function(e,t,n){var a=n(38),r=n(16),o=n(28),i={};n(6)(i,n(2)("iterator"),(function(){return this})),e.exports=function(e,t,n){e.prototype=a(i,{next:r(1,n)}),o(e,t+" Iterator");};},function(e,t,n){var a=n(7),r=n(10),o=n(13);e.exports=n(4)?Object.defineProperties:function(e,t){r(e);for(var n,i=o(t),s=i.length,c=0;s>c;)a.f(e,n=i[c++],t[n]);return e};},function(e,t,n){var a=n(9),r=n(58),o=n(59);e.exports=function(e){return function(t,n,i){var s,c=a(t),l=r(c.length),u=o(i,l);if(e&&n!=n){for(;l>u;)if((s=c[u++])!=s)return !0}else for(;l>u;u++)if((e||u in c)&&c[u]===n)return e||u||0;return !e&&-1}};},function(e,t,n){var a=n(21),r=Math.min;e.exports=function(e){return e>0?r(a(e),9007199254740991):0};},function(e,t,n){var a=n(21),r=Math.max,o=Math.min;e.exports=function(e,t){return (e=a(e))<0?r(e+t,0):o(e,t)};},function(e,t,n){var a=n(3).document;e.exports=a&&a.documentElement;},function(e,t,n){var a=n(5),r=n(18),o=n(25)("IE_PROTO"),i=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=r(e),a(e,o)?e[o]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?i:null};},function(e,t,n){var a=n(63),r=n(64),o=n(12),i=n(9);e.exports=n(34)(Array,"Array",(function(e,t){this._t=i(e),this._i=0,this._k=t;}),(function(){var e=this._t,t=this._k,n=this._i++;return !e||n>=e.length?(this._t=void 0,r(1)):r(0,"keys"==t?n:"values"==t?e[n]:[n,e[n]])}),"values"),o.Arguments=o.Array,a("keys"),a("values"),a("entries");},function(e,t){e.exports=function(){};},function(e,t){e.exports=function(e,t){return {value:t,done:!!e}};},function(e,t,n){e.exports={default:n(66),__esModule:!0};},function(e,t,n){n(67),n(73),n(74),n(75),e.exports=n(1).Symbol;},function(e,t,n){var a=n(3),r=n(5),o=n(4),i=n(15),s=n(37),c=n(68).KEY,l=n(8),u=n(26),f=n(28),p=n(17),d=n(2),b=n(30),h=n(31),v=n(69),m=n(70),y=n(10),g=n(11),E=n(18),j=n(9),x=n(23),_=n(16),k=n(38),O=n(71),C=n(72),S=n(32),w=n(7),A=n(13),M=C.f,P=w.f,F=O.f,D=a.Symbol,I=a.JSON,R=I&&I.stringify,L=d("_hidden"),B=d("toPrimitive"),N={}.propertyIsEnumerable,z=u("symbol-registry"),T=u("symbols"),q=u("op-symbols"),V=Object.prototype,K="function"==typeof D&&!!S.f,W=a.QObject,H=!W||!W.prototype||!W.prototype.findChild,U=o&&l((function(){return 7!=k(P({},"a",{get:function(){return P(this,"a",{value:7}).a}})).a}))?function(e,t,n){var a=M(V,t);a&&delete V[t],P(e,t,n),a&&e!==V&&P(V,t,a);}:P,G=function(e){var t=T[e]=k(D.prototype);return t._k=e,t},J=K&&"symbol"==typeof D.iterator?function(e){return "symbol"==typeof e}:function(e){return e instanceof D},Y=function(e,t,n){return e===V&&Y(q,t,n),y(e),t=x(t,!0),y(n),r(T,t)?(n.enumerable?(r(e,L)&&e[L][t]&&(e[L][t]=!1),n=k(n,{enumerable:_(0,!1)})):(r(e,L)||P(e,L,_(1,{})),e[L][t]=!0),U(e,t,n)):P(e,t,n)},$=function(e,t){y(e);for(var n,a=v(t=j(t)),r=0,o=a.length;o>r;)Y(e,n=a[r++],t[n]);return e},Q=function(e){var t=N.call(this,e=x(e,!0));return !(this===V&&r(T,e)&&!r(q,e))&&(!(t||!r(this,e)||!r(T,e)||r(this,L)&&this[L][e])||t)},Z=function(e,t){if(e=j(e),t=x(t,!0),e!==V||!r(T,t)||r(q,t)){var n=M(e,t);return !n||!r(T,t)||r(e,L)&&e[L][t]||(n.enumerable=!0),n}},X=function(e){for(var t,n=F(j(e)),a=[],o=0;n.length>o;)r(T,t=n[o++])||t==L||t==c||a.push(t);return a},ee=function(e){for(var t,n=e===V,a=F(n?q:j(e)),o=[],i=0;a.length>i;)!r(T,t=a[i++])||n&&!r(V,t)||o.push(T[t]);return o};K||(s((D=function(){if(this instanceof D)throw TypeError("Symbol is not a constructor!");var e=p(arguments.length>0?arguments[0]:void 0),t=function(n){this===V&&t.call(q,n),r(this,L)&&r(this[L],e)&&(this[L][e]=!1),U(this,e,_(1,n));};return o&&H&&U(V,e,{configurable:!0,set:t}),G(e)}).prototype,"toString",(function(){return this._k})),C.f=Z,w.f=Y,n(41).f=O.f=X,n(19).f=Q,S.f=ee,o&&!n(14)&&s(V,"propertyIsEnumerable",Q,!0),b.f=function(e){return G(d(e))}),i(i.G+i.W+i.F*!K,{Symbol:D});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)d(te[ne++]);for(var ae=A(d.store),re=0;ae.length>re;)h(ae[re++]);i(i.S+i.F*!K,"Symbol",{for:function(e){return r(z,e+="")?z[e]:z[e]=D(e)},keyFor:function(e){if(!J(e))throw TypeError(e+" is not a symbol!");for(var t in z)if(z[t]===e)return t},useSetter:function(){H=!0;},useSimple:function(){H=!1;}}),i(i.S+i.F*!K,"Object",{create:function(e,t){return void 0===t?k(e):$(k(e),t)},defineProperty:Y,defineProperties:$,getOwnPropertyDescriptor:Z,getOwnPropertyNames:X,getOwnPropertySymbols:ee});var oe=l((function(){S.f(1);}));i(i.S+i.F*oe,"Object",{getOwnPropertySymbols:function(e){return S.f(E(e))}}),I&&i(i.S+i.F*(!K||l((function(){var e=D();return "[null]"!=R([e])||"{}"!=R({a:e})||"{}"!=R(Object(e))}))),"JSON",{stringify:function(e){for(var t,n,a=[e],r=1;arguments.length>r;)a.push(arguments[r++]);if(n=t=a[1],(g(t)||void 0!==e)&&!J(e))return m(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!J(t))return t}),a[1]=t,R.apply(I,a)}}),D.prototype[B]||n(6)(D.prototype,B,D.prototype.valueOf),f(D,"Symbol"),f(Math,"Math",!0),f(a.JSON,"JSON",!0);},function(e,t,n){var a=n(17)("meta"),r=n(11),o=n(5),i=n(7).f,s=0,c=Object.isExtensible||function(){return !0},l=!n(8)((function(){return c(Object.preventExtensions({}))})),u=function(e){i(e,a,{value:{i:"O"+ ++s,w:{}}});},f=e.exports={KEY:a,NEED:!1,fastKey:function(e,t){if(!r(e))return "symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,a)){if(!c(e))return "F";if(!t)return "E";u(e);}return e[a].i},getWeak:function(e,t){if(!o(e,a)){if(!c(e))return !0;if(!t)return !1;u(e);}return e[a].w},onFreeze:function(e){return l&&f.NEED&&c(e)&&!o(e,a)&&u(e),e}};},function(e,t,n){var a=n(13),r=n(32),o=n(19);e.exports=function(e){var t=a(e),n=r.f;if(n)for(var i,s=n(e),c=o.f,l=0;s.length>l;)c.call(e,i=s[l++])&&t.push(i);return t};},function(e,t,n){var a=n(24);e.exports=Array.isArray||function(e){return "Array"==a(e)};},function(e,t,n){var a=n(9),r=n(41).f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return i&&"[object Window]"==o.call(e)?function(e){try{return r(e)}catch(e){return i.slice()}}(e):r(a(e))};},function(e,t,n){var a=n(19),r=n(16),o=n(9),i=n(23),s=n(5),c=n(35),l=Object.getOwnPropertyDescriptor;t.f=n(4)?l:function(e,t){if(e=o(e),t=i(t,!0),c)try{return l(e,t)}catch(e){}if(s(e,t))return r(!a.f.call(e,t),e[t])};},function(e,t){},function(e,t,n){n(31)("asyncIterator");},function(e,t,n){n(31)("observable");},function(e,t,n){t.__esModule=!0;var a,r=n(77),o=(a=r)&&a.__esModule?a:{default:a};t.default=o.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);}return e};},function(e,t,n){e.exports={default:n(78),__esModule:!0};},function(e,t,n){n(79),e.exports=n(1).Object.assign;},function(e,t,n){var a=n(15);a(a.S+a.F,"Object",{assign:n(80)});},function(e,t,n){var a=n(4),r=n(13),o=n(32),i=n(19),s=n(18),c=n(40),l=Object.assign;e.exports=!l||n(8)((function(){var e={},t={},n=Symbol(),a="abcdefghijklmnopqrst";return e[n]=7,a.split("").forEach((function(e){t[e]=e;})),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=a}))?function(e,t){for(var n=s(e),l=arguments.length,u=1,f=o.f,p=i.f;l>u;)for(var d,b=c(arguments[u++]),h=f?r(b).concat(f(b)):r(b),v=h.length,m=0;v>m;)d=h[m++],a&&!p.call(b,d)||(n[d]=b[d]);return n}:l;},function(e,t,n){t.__esModule=!0;var a=o(n(82)),r=o(n(85));function o(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if(Array.isArray(e))return e;if((0, a.default)(Object(e)))return function(e,t){var n=[],a=!0,o=!1,i=void 0;try{for(var s,c=(0,r.default)(e);!(a=(s=c.next()).done)&&(n.push(s.value),!t||n.length!==t);a=!0);}catch(e){o=!0,i=e;}finally{try{!a&&c.return&&c.return();}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};},function(e,t,n){e.exports={default:n(83),__esModule:!0};},function(e,t,n){n(29),n(20),e.exports=n(84);},function(e,t,n){var a=n(42),r=n(2)("iterator"),o=n(12);e.exports=n(1).isIterable=function(e){var t=Object(e);return void 0!==t[r]||"@@iterator"in t||o.hasOwnProperty(a(t))};},function(e,t,n){e.exports={default:n(86),__esModule:!0};},function(e,t,n){n(29),n(20),e.exports=n(87);},function(e,t,n){var a=n(10),r=n(88);e.exports=n(1).getIterator=function(e){var t=r(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return a(t.call(e))};},function(e,t,n){var a=n(42),r=n(2)("iterator"),o=n(12);e.exports=n(1).getIteratorMethod=function(e){if(null!=e)return e[r]||e["@@iterator"]||o[a(e)]};},function(e,t,n){e.exports={default:n(90),__esModule:!0};},function(e,t,n){n(91),e.exports=n(1).Object.keys;},function(e,t,n){var a=n(18),r=n(13);n(92)("keys",(function(){return function(e){return r(a(e))}}));},function(e,t,n){var a=n(15),r=n(1),o=n(8);e.exports=function(e,t){var n=(r.Object||{})[e]||Object[e],i={};i[e]=t(n),a(a.S+a.F*o((function(){n(1);})),"Object",i);};},function(e,t,n){(function(t){var n=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]],a=/^\s+|\s+$/g,r=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,o=/\{\n\/\* \[wrapped with (.+)\] \*/,i=/,? & /,s=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^\[object .+?Constructor\]$/,u=/^0o[0-7]+$/i,f=/^(?:0|[1-9]\d*)$/,p=parseInt,d="object"==typeof t&&t&&t.Object===Object&&t,b="object"==typeof self&&self&&self.Object===Object&&self,h=d||b||Function("return this")();function v(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function m(e,t){return !!(e?e.length:0)&&function(e,t,n){if(t!=t)return function(e,t,n,a){var r=e.length,o=n+(a?1:-1);for(;a?o--:++o<r;)if(t(e[o],o,e))return o;return -1}(e,y,n);var a=n-1,r=e.length;for(;++a<r;)if(e[a]===t)return a;return -1}(e,t,0)>-1}function y(e){return e!=e}function g(e,t){for(var n=e.length,a=0;n--;)e[n]===t&&a++;return a}function E(e,t){for(var n=-1,a=e.length,r=0,o=[];++n<a;){var i=e[n];i!==t&&"__lodash_placeholder__"!==i||(e[n]="__lodash_placeholder__",o[r++]=n);}return o}var j,x,_,k=Function.prototype,O=Object.prototype,C=h["__core-js_shared__"],S=(j=/[^.]+$/.exec(C&&C.keys&&C.keys.IE_PROTO||""))?"Symbol(src)_1."+j:"",w=k.toString,A=O.hasOwnProperty,M=O.toString,P=RegExp("^"+w.call(A).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),F=Object.create,D=Math.max,I=Math.min,R=(x=H(Object,"defineProperty"),(_=H.name)&&_.length>2?x:void 0);function L(e){return X(e)?F(e):{}}function B(e){return !(!X(e)||function(e){return !!S&&S in e}(e))&&(function(e){var t=X(e)?M.call(e):"";return "[object Function]"==t||"[object GeneratorFunction]"==t}(e)||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"");}catch(e){}return t}(e)?P:l).test(function(e){if(null!=e){try{return w.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}(e))}function N(e,t,n,a){for(var r=-1,o=e.length,i=n.length,s=-1,c=t.length,l=D(o-i,0),u=Array(c+l),f=!a;++s<c;)u[s]=t[s];for(;++r<i;)(f||r<o)&&(u[n[r]]=e[r]);for(;l--;)u[s++]=e[r++];return u}function z(e,t,n,a){for(var r=-1,o=e.length,i=-1,s=n.length,c=-1,l=t.length,u=D(o-s,0),f=Array(u+l),p=!a;++r<u;)f[r]=e[r];for(var d=r;++c<l;)f[d+c]=t[c];for(;++i<s;)(p||r<o)&&(f[d+n[i]]=e[r++]);return f}function T(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var n=L(e.prototype),a=e.apply(n,t);return X(a)?a:n}}function q(e,t,n,a,r,o,i,s,c,l){var u=128&t,f=1&t,p=2&t,d=24&t,b=512&t,v=p?void 0:T(e);return function m(){for(var y=arguments.length,j=Array(y),x=y;x--;)j[x]=arguments[x];if(d)var _=W(m),k=g(j,_);if(a&&(j=N(j,a,r,d)),o&&(j=z(j,o,i,d)),y-=k,d&&y<l){var O=E(j,_);return V(e,t,q,m.placeholder,n,j,O,s,c,l-y)}var C=f?n:this,S=p?C[e]:e;return y=j.length,s?j=Y(j,s):b&&y>1&&j.reverse(),u&&c<y&&(j.length=c),this&&this!==h&&this instanceof m&&(S=v||T(S)),S.apply(C,j)}}function V(e,t,n,a,r,o,i,s,c,l){var u=8&t;t|=u?32:64,4&(t&=~(u?64:32))||(t&=-4);var f=n(e,t,r,u?o:void 0,u?i:void 0,u?void 0:o,u?void 0:i,s,c,l);return f.placeholder=a,$(f,e,t)}function K(e,t,n,a,r,o,i,s){var c=2&t;if(!c&&"function"!=typeof e)throw new TypeError("Expected a function");var l=a?a.length:0;if(l||(t&=-97,a=r=void 0),i=void 0===i?i:D(te(i),0),s=void 0===s?s:te(s),l-=r?r.length:0,64&t){var u=a,f=r;a=r=void 0;}var p=[e,t,n,a,r,u,f,o,i,s];if(e=p[0],t=p[1],n=p[2],a=p[3],r=p[4],!(s=p[9]=null==p[9]?c?0:e.length:D(p[9]-l,0))&&24&t&&(t&=-25),t&&1!=t)d=8==t||16==t?function(e,t,n){var a=T(e);return function r(){for(var o=arguments.length,i=Array(o),s=o,c=W(r);s--;)i[s]=arguments[s];var l=o<3&&i[0]!==c&&i[o-1]!==c?[]:E(i,c);if((o-=l.length)<n)return V(e,t,q,r.placeholder,void 0,i,l,void 0,void 0,n-o);var u=this&&this!==h&&this instanceof r?a:e;return v(u,this,i)}}(e,t,s):32!=t&&33!=t||r.length?q.apply(void 0,p):function(e,t,n,a){var r=1&t,o=T(e);return function t(){for(var i=-1,s=arguments.length,c=-1,l=a.length,u=Array(l+s),f=this&&this!==h&&this instanceof t?o:e;++c<l;)u[c]=a[c];for(;s--;)u[c++]=arguments[++i];return v(f,r?n:this,u)}}(e,t,n,a);else var d=function(e,t,n){var a=1&t,r=T(e);return function t(){var o=this&&this!==h&&this instanceof t?r:e;return o.apply(a?n:this,arguments)}}(e,t,n);return $(d,e,t)}function W(e){return e.placeholder}function H(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return B(n)?n:void 0}function U(e){var t=e.match(o);return t?t[1].split(i):[]}function G(e,t){var n=t.length,a=n-1;return t[a]=(n>1?"& ":"")+t[a],t=t.join(n>2?", ":" "),e.replace(r,"{\n/* [wrapped with "+t+"] */\n")}function J(e,t){return !!(t=null==t?9007199254740991:t)&&("number"==typeof e||f.test(e))&&e>-1&&e%1==0&&e<t}function Y(e,t){for(var n=e.length,a=I(t.length,n),r=function(e,t){var n=-1,a=e.length;for(t||(t=Array(a));++n<a;)t[n]=e[n];return t}(e);a--;){var o=t[a];e[a]=J(o,n)?r[o]:void 0;}return e}var $=R?function(e,t,n){var a,r=t+"";return R(e,"toString",{configurable:!0,enumerable:!1,value:(a=G(r,Q(U(r),n)),function(){return a})})}:function(e){return e};function Q(e,t){return function(e,t){for(var n=-1,a=e?e.length:0;++n<a&&!1!==t(e[n],n,e););}(n,(function(n){var a="_."+n[0];t&n[1]&&!m(e,a)&&e.push(a);})),e.sort()}function Z(e,t,n){var a=K(e,8,void 0,void 0,void 0,void 0,void 0,t=n?void 0:t);return a.placeholder=Z.placeholder,a}function X(e){var t=typeof e;return !!e&&("object"==t||"function"==t)}function ee(e){return e?(e=function(e){if("number"==typeof e)return e;if(function(e){return "symbol"==typeof e||function(e){return !!e&&"object"==typeof e}(e)&&"[object Symbol]"==M.call(e)}(e))return NaN;if(X(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=X(t)?t+"":t;}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(a,"");var n=c.test(e);return n||u.test(e)?p(e.slice(2),n?2:8):s.test(e)?NaN:+e}(e))===1/0||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}function te(e){var t=ee(e),n=t%1;return t==t?n?t-n:t:0}Z.placeholder={},e.exports=Z;}).call(this,n(43));},function(e,t,n){function a(e){return e&&e.__esModule?e.default:e}t.__esModule=!0;var r=n(95);t.threezerotwofour=a(r);var o=n(96);t.apathy=a(o);var i=n(97);t.ashes=a(i);var s=n(98);t.atelierDune=a(s);var c=n(99);t.atelierForest=a(c);var l=n(100);t.atelierHeath=a(l);var u=n(101);t.atelierLakeside=a(u);var f=n(102);t.atelierSeaside=a(f);var p=n(103);t.bespin=a(p);var d=n(104);t.brewer=a(d);var b=n(105);t.bright=a(b);var h=n(106);t.chalk=a(h);var v=n(107);t.codeschool=a(v);var m=n(108);t.colors=a(m);var y=n(109);t.default=a(y);var g=n(110);t.eighties=a(g);var E=n(111);t.embers=a(E);var j=n(112);t.flat=a(j);var x=n(113);t.google=a(x);var _=n(114);t.grayscale=a(_);var k=n(115);t.greenscreen=a(k);var O=n(116);t.harmonic=a(O);var C=n(117);t.hopscotch=a(C);var S=n(118);t.isotope=a(S);var w=n(119);t.marrakesh=a(w);var A=n(120);t.mocha=a(A);var M=n(121);t.monokai=a(M);var P=n(122);t.ocean=a(P);var F=n(123);t.paraiso=a(F);var D=n(124);t.pop=a(D);var I=n(125);t.railscasts=a(I);var R=n(126);t.shapeshifter=a(R);var L=n(127);t.solarized=a(L);var B=n(128);t.summerfruit=a(B);var N=n(129);t.tomorrow=a(N);var z=n(130);t.tube=a(z);var T=n(131);t.twilight=a(T);},function(e,t,n){t.__esModule=!0,t.default={scheme:"threezerotwofour",author:"jan t. sott (http://github.com/idleberg)",base00:"#090300",base01:"#3a3432",base02:"#4a4543",base03:"#5c5855",base04:"#807d7c",base05:"#a5a2a2",base06:"#d6d5d4",base07:"#f7f7f7",base08:"#db2d20",base09:"#e8bbd0",base0A:"#fded02",base0B:"#01a252",base0C:"#b5e4f4",base0D:"#01a0e4",base0E:"#a16a94",base0F:"#cdab53"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"apathy",author:"jannik siebert (https://github.com/janniks)",base00:"#031A16",base01:"#0B342D",base02:"#184E45",base03:"#2B685E",base04:"#5F9C92",base05:"#81B5AC",base06:"#A7CEC8",base07:"#D2E7E4",base08:"#3E9688",base09:"#3E7996",base0A:"#3E4C96",base0B:"#883E96",base0C:"#963E4C",base0D:"#96883E",base0E:"#4C963E",base0F:"#3E965B"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"ashes",author:"jannik siebert (https://github.com/janniks)",base00:"#1C2023",base01:"#393F45",base02:"#565E65",base03:"#747C84",base04:"#ADB3BA",base05:"#C7CCD1",base06:"#DFE2E5",base07:"#F3F4F5",base08:"#C7AE95",base09:"#C7C795",base0A:"#AEC795",base0B:"#95C7AE",base0C:"#95AEC7",base0D:"#AE95C7",base0E:"#C795AE",base0F:"#C79595"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"atelier dune",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)",base00:"#20201d",base01:"#292824",base02:"#6e6b5e",base03:"#7d7a68",base04:"#999580",base05:"#a6a28c",base06:"#e8e4cf",base07:"#fefbec",base08:"#d73737",base09:"#b65611",base0A:"#cfb017",base0B:"#60ac39",base0C:"#1fad83",base0D:"#6684e1",base0E:"#b854d4",base0F:"#d43552"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"atelier forest",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest)",base00:"#1b1918",base01:"#2c2421",base02:"#68615e",base03:"#766e6b",base04:"#9c9491",base05:"#a8a19f",base06:"#e6e2e0",base07:"#f1efee",base08:"#f22c40",base09:"#df5320",base0A:"#d5911a",base0B:"#5ab738",base0C:"#00ad9c",base0D:"#407ee7",base0E:"#6666ea",base0F:"#c33ff3"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"atelier heath",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath)",base00:"#1b181b",base01:"#292329",base02:"#695d69",base03:"#776977",base04:"#9e8f9e",base05:"#ab9bab",base06:"#d8cad8",base07:"#f7f3f7",base08:"#ca402b",base09:"#a65926",base0A:"#bb8a35",base0B:"#379a37",base0C:"#159393",base0D:"#516aec",base0E:"#7b59c0",base0F:"#cc33cc"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"atelier lakeside",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside/)",base00:"#161b1d",base01:"#1f292e",base02:"#516d7b",base03:"#5a7b8c",base04:"#7195a8",base05:"#7ea2b4",base06:"#c1e4f6",base07:"#ebf8ff",base08:"#d22d72",base09:"#935c25",base0A:"#8a8a0f",base0B:"#568c3b",base0C:"#2d8f6f",base0D:"#257fad",base0E:"#5d5db1",base0F:"#b72dd2"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"atelier seaside",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside/)",base00:"#131513",base01:"#242924",base02:"#5e6e5e",base03:"#687d68",base04:"#809980",base05:"#8ca68c",base06:"#cfe8cf",base07:"#f0fff0",base08:"#e6193c",base09:"#87711d",base0A:"#c3c322",base0B:"#29a329",base0C:"#1999b3",base0D:"#3d62f5",base0E:"#ad2bee",base0F:"#e619c3"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"bespin",author:"jan t. sott",base00:"#28211c",base01:"#36312e",base02:"#5e5d5c",base03:"#666666",base04:"#797977",base05:"#8a8986",base06:"#9d9b97",base07:"#baae9e",base08:"#cf6a4c",base09:"#cf7d34",base0A:"#f9ee98",base0B:"#54be0d",base0C:"#afc4db",base0D:"#5ea6ea",base0E:"#9b859d",base0F:"#937121"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"brewer",author:"timothée poisot (http://github.com/tpoisot)",base00:"#0c0d0e",base01:"#2e2f30",base02:"#515253",base03:"#737475",base04:"#959697",base05:"#b7b8b9",base06:"#dadbdc",base07:"#fcfdfe",base08:"#e31a1c",base09:"#e6550d",base0A:"#dca060",base0B:"#31a354",base0C:"#80b1d3",base0D:"#3182bd",base0E:"#756bb1",base0F:"#b15928"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"bright",author:"chris kempson (http://chriskempson.com)",base00:"#000000",base01:"#303030",base02:"#505050",base03:"#b0b0b0",base04:"#d0d0d0",base05:"#e0e0e0",base06:"#f5f5f5",base07:"#ffffff",base08:"#fb0120",base09:"#fc6d24",base0A:"#fda331",base0B:"#a1c659",base0C:"#76c7b7",base0D:"#6fb3d2",base0E:"#d381c3",base0F:"#be643c"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"chalk",author:"chris kempson (http://chriskempson.com)",base00:"#151515",base01:"#202020",base02:"#303030",base03:"#505050",base04:"#b0b0b0",base05:"#d0d0d0",base06:"#e0e0e0",base07:"#f5f5f5",base08:"#fb9fb1",base09:"#eda987",base0A:"#ddb26f",base0B:"#acc267",base0C:"#12cfc0",base0D:"#6fc2ef",base0E:"#e1a3ee",base0F:"#deaf8f"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"codeschool",author:"brettof86",base00:"#232c31",base01:"#1c3657",base02:"#2a343a",base03:"#3f4944",base04:"#84898c",base05:"#9ea7a6",base06:"#a7cfa3",base07:"#b5d8f6",base08:"#2a5491",base09:"#43820d",base0A:"#a03b1e",base0B:"#237986",base0C:"#b02f30",base0D:"#484d79",base0E:"#c59820",base0F:"#c98344"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"colors",author:"mrmrs (http://clrs.cc)",base00:"#111111",base01:"#333333",base02:"#555555",base03:"#777777",base04:"#999999",base05:"#bbbbbb",base06:"#dddddd",base07:"#ffffff",base08:"#ff4136",base09:"#ff851b",base0A:"#ffdc00",base0B:"#2ecc40",base0C:"#7fdbff",base0D:"#0074d9",base0E:"#b10dc9",base0F:"#85144b"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"default",author:"chris kempson (http://chriskempson.com)",base00:"#181818",base01:"#282828",base02:"#383838",base03:"#585858",base04:"#b8b8b8",base05:"#d8d8d8",base06:"#e8e8e8",base07:"#f8f8f8",base08:"#ab4642",base09:"#dc9656",base0A:"#f7ca88",base0B:"#a1b56c",base0C:"#86c1b9",base0D:"#7cafc2",base0E:"#ba8baf",base0F:"#a16946"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"eighties",author:"chris kempson (http://chriskempson.com)",base00:"#2d2d2d",base01:"#393939",base02:"#515151",base03:"#747369",base04:"#a09f93",base05:"#d3d0c8",base06:"#e8e6df",base07:"#f2f0ec",base08:"#f2777a",base09:"#f99157",base0A:"#ffcc66",base0B:"#99cc99",base0C:"#66cccc",base0D:"#6699cc",base0E:"#cc99cc",base0F:"#d27b53"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"embers",author:"jannik siebert (https://github.com/janniks)",base00:"#16130F",base01:"#2C2620",base02:"#433B32",base03:"#5A5047",base04:"#8A8075",base05:"#A39A90",base06:"#BEB6AE",base07:"#DBD6D1",base08:"#826D57",base09:"#828257",base0A:"#6D8257",base0B:"#57826D",base0C:"#576D82",base0D:"#6D5782",base0E:"#82576D",base0F:"#825757"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"flat",author:"chris kempson (http://chriskempson.com)",base00:"#2C3E50",base01:"#34495E",base02:"#7F8C8D",base03:"#95A5A6",base04:"#BDC3C7",base05:"#e0e0e0",base06:"#f5f5f5",base07:"#ECF0F1",base08:"#E74C3C",base09:"#E67E22",base0A:"#F1C40F",base0B:"#2ECC71",base0C:"#1ABC9C",base0D:"#3498DB",base0E:"#9B59B6",base0F:"#be643c"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"google",author:"seth wright (http://sethawright.com)",base00:"#1d1f21",base01:"#282a2e",base02:"#373b41",base03:"#969896",base04:"#b4b7b4",base05:"#c5c8c6",base06:"#e0e0e0",base07:"#ffffff",base08:"#CC342B",base09:"#F96A38",base0A:"#FBA922",base0B:"#198844",base0C:"#3971ED",base0D:"#3971ED",base0E:"#A36AC7",base0F:"#3971ED"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"grayscale",author:"alexandre gavioli (https://github.com/alexx2/)",base00:"#101010",base01:"#252525",base02:"#464646",base03:"#525252",base04:"#ababab",base05:"#b9b9b9",base06:"#e3e3e3",base07:"#f7f7f7",base08:"#7c7c7c",base09:"#999999",base0A:"#a0a0a0",base0B:"#8e8e8e",base0C:"#868686",base0D:"#686868",base0E:"#747474",base0F:"#5e5e5e"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"green screen",author:"chris kempson (http://chriskempson.com)",base00:"#001100",base01:"#003300",base02:"#005500",base03:"#007700",base04:"#009900",base05:"#00bb00",base06:"#00dd00",base07:"#00ff00",base08:"#007700",base09:"#009900",base0A:"#007700",base0B:"#00bb00",base0C:"#005500",base0D:"#009900",base0E:"#00bb00",base0F:"#005500"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"harmonic16",author:"jannik siebert (https://github.com/janniks)",base00:"#0b1c2c",base01:"#223b54",base02:"#405c79",base03:"#627e99",base04:"#aabcce",base05:"#cbd6e2",base06:"#e5ebf1",base07:"#f7f9fb",base08:"#bf8b56",base09:"#bfbf56",base0A:"#8bbf56",base0B:"#56bf8b",base0C:"#568bbf",base0D:"#8b56bf",base0E:"#bf568b",base0F:"#bf5656"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"hopscotch",author:"jan t. sott",base00:"#322931",base01:"#433b42",base02:"#5c545b",base03:"#797379",base04:"#989498",base05:"#b9b5b8",base06:"#d5d3d5",base07:"#ffffff",base08:"#dd464c",base09:"#fd8b19",base0A:"#fdcc59",base0B:"#8fc13e",base0C:"#149b93",base0D:"#1290bf",base0E:"#c85e7c",base0F:"#b33508"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"isotope",author:"jan t. sott",base00:"#000000",base01:"#404040",base02:"#606060",base03:"#808080",base04:"#c0c0c0",base05:"#d0d0d0",base06:"#e0e0e0",base07:"#ffffff",base08:"#ff0000",base09:"#ff9900",base0A:"#ff0099",base0B:"#33ff00",base0C:"#00ffff",base0D:"#0066ff",base0E:"#cc00ff",base0F:"#3300ff"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"marrakesh",author:"alexandre gavioli (http://github.com/alexx2/)",base00:"#201602",base01:"#302e00",base02:"#5f5b17",base03:"#6c6823",base04:"#86813b",base05:"#948e48",base06:"#ccc37a",base07:"#faf0a5",base08:"#c35359",base09:"#b36144",base0A:"#a88339",base0B:"#18974e",base0C:"#75a738",base0D:"#477ca1",base0E:"#8868b3",base0F:"#b3588e"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"mocha",author:"chris kempson (http://chriskempson.com)",base00:"#3B3228",base01:"#534636",base02:"#645240",base03:"#7e705a",base04:"#b8afad",base05:"#d0c8c6",base06:"#e9e1dd",base07:"#f5eeeb",base08:"#cb6077",base09:"#d28b71",base0A:"#f4bc87",base0B:"#beb55b",base0C:"#7bbda4",base0D:"#8ab3b5",base0E:"#a89bb9",base0F:"#bb9584"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"monokai",author:"wimer hazenberg (http://www.monokai.nl)",base00:"#272822",base01:"#383830",base02:"#49483e",base03:"#75715e",base04:"#a59f85",base05:"#f8f8f2",base06:"#f5f4f1",base07:"#f9f8f5",base08:"#f92672",base09:"#fd971f",base0A:"#f4bf75",base0B:"#a6e22e",base0C:"#a1efe4",base0D:"#66d9ef",base0E:"#ae81ff",base0F:"#cc6633"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"ocean",author:"chris kempson (http://chriskempson.com)",base00:"#2b303b",base01:"#343d46",base02:"#4f5b66",base03:"#65737e",base04:"#a7adba",base05:"#c0c5ce",base06:"#dfe1e8",base07:"#eff1f5",base08:"#bf616a",base09:"#d08770",base0A:"#ebcb8b",base0B:"#a3be8c",base0C:"#96b5b4",base0D:"#8fa1b3",base0E:"#b48ead",base0F:"#ab7967"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"paraiso",author:"jan t. sott",base00:"#2f1e2e",base01:"#41323f",base02:"#4f424c",base03:"#776e71",base04:"#8d8687",base05:"#a39e9b",base06:"#b9b6b0",base07:"#e7e9db",base08:"#ef6155",base09:"#f99b15",base0A:"#fec418",base0B:"#48b685",base0C:"#5bc4bf",base0D:"#06b6ef",base0E:"#815ba4",base0F:"#e96ba8"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"pop",author:"chris kempson (http://chriskempson.com)",base00:"#000000",base01:"#202020",base02:"#303030",base03:"#505050",base04:"#b0b0b0",base05:"#d0d0d0",base06:"#e0e0e0",base07:"#ffffff",base08:"#eb008a",base09:"#f29333",base0A:"#f8ca12",base0B:"#37b349",base0C:"#00aabb",base0D:"#0e5a94",base0E:"#b31e8d",base0F:"#7a2d00"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"railscasts",author:"ryan bates (http://railscasts.com)",base00:"#2b2b2b",base01:"#272935",base02:"#3a4055",base03:"#5a647e",base04:"#d4cfc9",base05:"#e6e1dc",base06:"#f4f1ed",base07:"#f9f7f3",base08:"#da4939",base09:"#cc7833",base0A:"#ffc66d",base0B:"#a5c261",base0C:"#519f50",base0D:"#6d9cbe",base0E:"#b6b3eb",base0F:"#bc9458"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"shapeshifter",author:"tyler benziger (http://tybenz.com)",base00:"#000000",base01:"#040404",base02:"#102015",base03:"#343434",base04:"#555555",base05:"#ababab",base06:"#e0e0e0",base07:"#f9f9f9",base08:"#e92f2f",base09:"#e09448",base0A:"#dddd13",base0B:"#0ed839",base0C:"#23edda",base0D:"#3b48e3",base0E:"#f996e2",base0F:"#69542d"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"solarized",author:"ethan schoonover (http://ethanschoonover.com/solarized)",base00:"#002b36",base01:"#073642",base02:"#586e75",base03:"#657b83",base04:"#839496",base05:"#93a1a1",base06:"#eee8d5",base07:"#fdf6e3",base08:"#dc322f",base09:"#cb4b16",base0A:"#b58900",base0B:"#859900",base0C:"#2aa198",base0D:"#268bd2",base0E:"#6c71c4",base0F:"#d33682"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"summerfruit",author:"christopher corley (http://cscorley.github.io/)",base00:"#151515",base01:"#202020",base02:"#303030",base03:"#505050",base04:"#B0B0B0",base05:"#D0D0D0",base06:"#E0E0E0",base07:"#FFFFFF",base08:"#FF0086",base09:"#FD8900",base0A:"#ABA800",base0B:"#00C918",base0C:"#1faaaa",base0D:"#3777E6",base0E:"#AD00A1",base0F:"#cc6633"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"tomorrow",author:"chris kempson (http://chriskempson.com)",base00:"#1d1f21",base01:"#282a2e",base02:"#373b41",base03:"#969896",base04:"#b4b7b4",base05:"#c5c8c6",base06:"#e0e0e0",base07:"#ffffff",base08:"#cc6666",base09:"#de935f",base0A:"#f0c674",base0B:"#b5bd68",base0C:"#8abeb7",base0D:"#81a2be",base0E:"#b294bb",base0F:"#a3685a"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"london tube",author:"jan t. sott",base00:"#231f20",base01:"#1c3f95",base02:"#5a5758",base03:"#737171",base04:"#959ca1",base05:"#d9d8d8",base06:"#e7e7e8",base07:"#ffffff",base08:"#ee2e24",base09:"#f386a1",base0A:"#ffd204",base0B:"#00853e",base0C:"#85cebc",base0D:"#009ddc",base0E:"#98005d",base0F:"#b06110"},e.exports=t.default;},function(e,t,n){t.__esModule=!0,t.default={scheme:"twilight",author:"david hart (http://hart-dev.com)",base00:"#1e1e1e",base01:"#323537",base02:"#464b50",base03:"#5f5a60",base04:"#838184",base05:"#a7a7a7",base06:"#c3c3c3",base07:"#ffffff",base08:"#cf6a4c",base09:"#cda869",base0A:"#f9ee98",base0B:"#8f9d6a",base0C:"#afc4db",base0D:"#7587a6",base0E:"#9b859d",base0F:"#9b703f"},e.exports=t.default;},function(e,t,n){var a=n(33);function r(e){var t=Math.round(a(e,0,255)).toString(16);return 1==t.length?"0"+t:t}e.exports=function(e){var t=4===e.length?r(255*e[3]):"";return "#"+r(e[0])+r(e[1])+r(e[2])+t};},function(e,t,n){var a=n(134),r=n(135),o=n(136),i=n(137);var s={"#":r,hsl:function(e){var t=a(e),n=i(t);return 4===t.length&&n.push(t[3]),n},rgb:o};function c(e){for(var t in s)if(0===e.indexOf(t))return s[t](e)}c.rgb=o,c.hsl=a,c.hex=r,e.exports=c;},function(e,t,n){var a=n(44),r=n(33);function o(e,t){switch(e=parseFloat(e),t){case 0:return r(e,0,360);case 1:case 2:return r(e,0,100);case 3:return r(e,0,1)}}e.exports=function(e){return a(e).map(o)};},function(e,t){e.exports=function(e){4!==e.length&&5!==e.length||(e=function(e){for(var t="#",n=1;n<e.length;n++){var a=e.charAt(n);t+=a+a;}return t}(e));var t=[parseInt(e.substring(1,3),16),parseInt(e.substring(3,5),16),parseInt(e.substring(5,7),16)];if(9===e.length){var n=parseFloat((parseInt(e.substring(7,9),16)/255).toFixed(2));t.push(n);}return t};},function(e,t,n){var a=n(44),r=n(33);function o(e,t){return t<3?-1!=e.indexOf("%")?Math.round(255*r(parseInt(e,10),0,100)/100):r(parseInt(e,10),0,255):r(parseFloat(e),0,1)}e.exports=function(e){return a(e).map(o)};},function(e,t){e.exports=function(e){var t,n,a,r,o,i=e[0]/360,s=e[1]/100,c=e[2]/100;if(0==s)return [o=255*c,o,o];t=2*c-(n=c<.5?c*(1+s):c+s-c*s),r=[0,0,0];for(var l=0;l<3;l++)(a=i+1/3*-(l-1))<0&&a++,a>1&&a--,o=6*a<1?t+6*(n-t)*a:2*a<1?n:3*a<2?t+(n-t)*(2/3-a)*6:t,r[l]=255*o;return r};},function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t,a="object"==typeof self&&self&&self.Object===Object&&self,r=n||a||Function("return this")();function o(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function i(e,t){for(var n=-1,a=t.length,r=e.length;++n<a;)e[r+n]=t[n];return e}var s=Object.prototype,c=s.hasOwnProperty,l=s.toString,u=r.Symbol,f=s.propertyIsEnumerable,p=u?u.isConcatSpreadable:void 0,d=Math.max;function b(e){return h(e)||function(e){return function(e){return function(e){return !!e&&"object"==typeof e}(e)&&function(e){return null!=e&&function(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}(e.length)&&!function(e){var t=function(e){var t=typeof e;return !!e&&("object"==t||"function"==t)}(e)?l.call(e):"";return "[object Function]"==t||"[object GeneratorFunction]"==t}(e)}(e)}(e)&&c.call(e,"callee")&&(!f.call(e,"callee")||"[object Arguments]"==l.call(e))}(e)||!!(p&&e&&e[p])}var h=Array.isArray;var v,m,y,g=(m=function(e){var t=(e=function e(t,n,a,r,o){var s=-1,c=t.length;for(a||(a=b),o||(o=[]);++s<c;){var l=t[s];n>0&&a(l)?n>1?e(l,n-1,a,r,o):i(o,l):r||(o[o.length]=l);}return o}(e,1)).length,n=t;for(v;n--;)if("function"!=typeof e[n])throw new TypeError("Expected a function");return function(){for(var n=0,a=t?e[n].apply(this,arguments):arguments[0];++n<t;)a=e[n].call(this,a);return a}},y=d(void 0===y?m.length-1:y,0),function(){for(var e=arguments,t=-1,n=d(e.length-y,0),a=Array(n);++t<n;)a[t]=e[y+t];t=-1;for(var r=Array(y+1);++t<y;)r[t]=e[t];return r[y]=a,o(m,this,r)});e.exports=g;}).call(this,n(43));},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.yuv2rgb=function(e){var t,n,a,r=e[0],o=e[1],i=e[2];return t=1*r+0*o+1.13983*i,n=1*r+-.39465*o+-.5806*i,a=1*r+2.02311*o+0*i,t=Math.min(Math.max(0,t),1),n=Math.min(Math.max(0,n),1),a=Math.min(Math.max(0,a),1),[255*t,255*n,255*a]},t.rgb2yuv=function(e){var t=e[0]/255,n=e[1]/255,a=e[2]/255;return [.299*t+.587*n+.114*a,-.14713*t+-.28886*n+.436*a,.615*t+-.51499*n+-.10001*a]};},function(e,t,n){function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=n(141),o=function(){function e(){a(this,"_callbacks",void 0),a(this,"_isDispatching",void 0),a(this,"_isHandled",void 0),a(this,"_isPending",void 0),a(this,"_lastID",void 0),a(this,"_pendingPayload",void 0),this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1;}var t=e.prototype;return t.register=function(e){var t="ID_"+this._lastID++;return this._callbacks[t]=e,t},t.unregister=function(e){this._callbacks[e]||r(!1),delete this._callbacks[e];},t.waitFor=function(e){this._isDispatching||r(!1);for(var t=0;t<e.length;t++){var n=e[t];this._isPending[n]?this._isHandled[n]||r(!1):(this._callbacks[n]||r(!1),this._invokeCallback(n));}},t.dispatch=function(e){this._isDispatching&&r(!1),this._startDispatching(e);try{for(var t in this._callbacks)this._isPending[t]||this._invokeCallback(t);}finally{this._stopDispatching();}},t.isDispatching=function(){return this._isDispatching},t._invokeCallback=function(e){this._isPending[e]=!0,this._callbacks[e](this._pendingPayload),this._isHandled[e]=!0;},t._startDispatching=function(e){for(var t in this._callbacks)this._isPending[t]=!1,this._isHandled[t]=!1;this._pendingPayload=e,this._isDispatching=!0;},t._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1;},e}();e.exports=o;},function(e,t,n){e.exports=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];if(!e){var i;if(void 0===t)i=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {var s=0;(i=new Error(t.replace(/%s/g,(function(){return String(r[s++])})))).name="Invariant Violation";}throw i.framesToPop=1,i}};},function(e,t,n){function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a);}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t));}));}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a);}}function c(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}function l(e,t){return (l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t);}function f(e){return (f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e){return (p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e,t){return !t||"object"!==p(t)&&"function"!=typeof t?d(e):t}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,a=f(e);if(t){var r=f(this).constructor;n=Reflect.construct(a,arguments,r);}else n=a.apply(this,arguments);return b(this,n)}}n.r(t);var v=n(0),m=n.n(v);function y(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);null!=e&&this.setState(e);}function g(e){this.setState(function(t){var n=this.constructor.getDerivedStateFromProps(e,t);return null!=n?n:null}.bind(this));}function E(e,t){try{var n=this.props,a=this.state;this.props=e,this.state=t,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(n,a);}finally{this.props=n,this.state=a;}}function j(e){var t=e.prototype;if(!t||!t.isReactComponent)throw new Error("Can only polyfill class components");if("function"!=typeof e.getDerivedStateFromProps&&"function"!=typeof t.getSnapshotBeforeUpdate)return e;var n=null,a=null,r=null;if("function"==typeof t.componentWillMount?n="componentWillMount":"function"==typeof t.UNSAFE_componentWillMount&&(n="UNSAFE_componentWillMount"),"function"==typeof t.componentWillReceiveProps?a="componentWillReceiveProps":"function"==typeof t.UNSAFE_componentWillReceiveProps&&(a="UNSAFE_componentWillReceiveProps"),"function"==typeof t.componentWillUpdate?r="componentWillUpdate":"function"==typeof t.UNSAFE_componentWillUpdate&&(r="UNSAFE_componentWillUpdate"),null!==n||null!==a||null!==r){var o=e.displayName||e.name,i="function"==typeof e.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+o+" uses "+i+" but also contains the following legacy lifecycles:"+(null!==n?"\n  "+n:"")+(null!==a?"\n  "+a:"")+(null!==r?"\n  "+r:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"==typeof e.getDerivedStateFromProps&&(t.componentWillMount=y,t.componentWillReceiveProps=g),"function"==typeof t.getSnapshotBeforeUpdate){if("function"!=typeof t.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");t.componentWillUpdate=E;var s=t.componentDidUpdate;t.componentDidUpdate=function(e,t,n){var a=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:n;s.call(this,e,t,a);};}return e}function x(e,t){if(null==e)return {};var n,a,r=function(e,t){if(null==e)return {};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n]);}return r}function _(e){var t=function(e){return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}(e);return "number"===t&&(t=isNaN(e)?"nan":(0|e)!=e?"float":"integer"),t}y.__suppressDeprecationWarning=!0,g.__suppressDeprecationWarning=!0,E.__suppressDeprecationWarning=!0;var k={scheme:"rjv-default",author:"mac gainor",base00:"rgba(0, 0, 0, 0)",base01:"rgb(245, 245, 245)",base02:"rgb(235, 235, 235)",base03:"#93a1a1",base04:"rgba(0, 0, 0, 0.3)",base05:"#586e75",base06:"#073642",base07:"#002b36",base08:"#d33682",base09:"#cb4b16",base0A:"#dc322f",base0B:"#859900",base0C:"#6c71c4",base0D:"#586e75",base0E:"#2aa198",base0F:"#268bd2"},O={scheme:"rjv-grey",author:"mac gainor",base00:"rgba(1, 1, 1, 0)",base01:"rgba(1, 1, 1, 0.1)",base02:"rgba(0, 0, 0, 0.2)",base03:"rgba(1, 1, 1, 0.3)",base04:"rgba(0, 0, 0, 0.4)",base05:"rgba(1, 1, 1, 0.5)",base06:"rgba(1, 1, 1, 0.6)",base07:"rgba(1, 1, 1, 0.7)",base08:"rgba(1, 1, 1, 0.8)",base09:"rgba(1, 1, 1, 0.8)",base0A:"rgba(1, 1, 1, 0.8)",base0B:"rgba(1, 1, 1, 0.8)",base0C:"rgba(1, 1, 1, 0.8)",base0D:"rgba(1, 1, 1, 0.8)",base0E:"rgba(1, 1, 1, 0.8)",base0F:"rgba(1, 1, 1, 0.8)"},C={white:"#fff",black:"#000",transparent:"rgba(1, 1, 1, 0)",globalFontFamily:"monospace",globalCursor:"default",indentBlockWidth:"5px",braceFontWeight:"bold",braceCursor:"pointer",ellipsisFontSize:"18px",ellipsisLineHeight:"10px",ellipsisCursor:"pointer",keyMargin:"0px 5px",keyLetterSpacing:"0.5px",keyFontStyle:"none",keyBorderRadius:"3px",keyColonWeight:"bold",keyVerticalAlign:"top",keyOpacity:"0.85",keyOpacityHover:"1",keyValPaddingTop:"3px",keyValPaddingBottom:"3px",keyValPaddingRight:"5px",keyValBorderLeft:"1px solid",keyValBorderHover:"2px solid",keyValPaddingHover:"3px 5px 3px 4px",pushedContentMarginLeft:"6px",variableValuePaddingRight:"6px",nullFontSize:"11px",nullFontWeight:"bold",nullPadding:"1px 2px",nullBorderRadius:"3px",nanFontSize:"11px",nanFontWeight:"bold",nanPadding:"1px 2px",nanBorderRadius:"3px",undefinedFontSize:"11px",undefinedFontWeight:"bold",undefinedPadding:"1px 2px",undefinedBorderRadius:"3px",dataTypeFontSize:"11px",dataTypeMarginRight:"4px",datatypeOpacity:"0.8",objectSizeBorderRadius:"3px",objectSizeFontStyle:"italic",objectSizeMargin:"0px 6px 0px 0px",clipboardCursor:"pointer",clipboardCheckMarginLeft:"-12px",metaDataPadding:"0px 0px 0px 10px",arrayGroupMetaPadding:"0px 0px 0px 4px",iconContainerWidth:"17px",tooltipPadding:"4px",editInputMinWidth:"130px",editInputBorderRadius:"2px",editInputPadding:"5px",editInputMarginRight:"4px",editInputFontFamily:"monospace",iconCursor:"pointer",iconFontSize:"15px",iconPaddingRight:"1px",dateValueMarginLeft:"2px",iconMarginRight:"3px",detectedRowPaddingTop:"3px",addKeyCoverBackground:"rgba(255, 255, 255, 0.3)",addKeyCoverPosition:"absolute",addKeyCoverPositionPx:"0px",addKeyModalWidth:"200px",addKeyModalMargin:"auto",addKeyModalPadding:"10px",addKeyModalRadius:"3px"},S=n(45),w=function(e){var t=function(e){return {backgroundColor:e.base00,ellipsisColor:e.base09,braceColor:e.base07,expandedIcon:e.base0D,collapsedIcon:e.base0E,keyColor:e.base07,arrayKeyColor:e.base0C,objectSize:e.base04,copyToClipboard:e.base0F,copyToClipboardCheck:e.base0D,objectBorder:e.base02,dataTypes:{boolean:e.base0E,date:e.base0D,float:e.base0B,function:e.base0D,integer:e.base0F,string:e.base09,nan:e.base08,null:e.base0A,undefined:e.base05,regexp:e.base0A,background:e.base02},editVariable:{editIcon:e.base0E,cancelIcon:e.base09,removeIcon:e.base09,addIcon:e.base0E,checkIcon:e.base0E,background:e.base01,color:e.base0A,border:e.base07},addKeyModal:{background:e.base05,border:e.base04,color:e.base0A,labelColor:e.base01},validationFailure:{background:e.base09,iconColor:e.base01,fontColor:e.base01}}}(e);return {"app-container":{fontFamily:C.globalFontFamily,cursor:C.globalCursor,backgroundColor:t.backgroundColor,position:"relative"},ellipsis:{display:"inline-block",color:t.ellipsisColor,fontSize:C.ellipsisFontSize,lineHeight:C.ellipsisLineHeight,cursor:C.ellipsisCursor},"brace-row":{display:"inline-block",cursor:"pointer"},brace:{display:"inline-block",cursor:C.braceCursor,fontWeight:C.braceFontWeight,color:t.braceColor},"expanded-icon":{color:t.expandedIcon},"collapsed-icon":{color:t.collapsedIcon},colon:{display:"inline-block",margin:C.keyMargin,color:t.keyColor,verticalAlign:"top"},objectKeyVal:function(e,n){return {style:o({paddingTop:C.keyValPaddingTop,paddingRight:C.keyValPaddingRight,paddingBottom:C.keyValPaddingBottom,borderLeft:C.keyValBorderLeft+" "+t.objectBorder,":hover":{paddingLeft:n.paddingLeft-1+"px",borderLeft:C.keyValBorderHover+" "+t.objectBorder}},n)}},"object-key-val-no-border":{padding:C.keyValPadding},"pushed-content":{marginLeft:C.pushedContentMarginLeft},variableValue:function(e,t){return {style:o({display:"inline-block",paddingRight:C.variableValuePaddingRight,position:"relative"},t)}},"object-name":{display:"inline-block",color:t.keyColor,letterSpacing:C.keyLetterSpacing,fontStyle:C.keyFontStyle,verticalAlign:C.keyVerticalAlign,opacity:C.keyOpacity,":hover":{opacity:C.keyOpacityHover}},"array-key":{display:"inline-block",color:t.arrayKeyColor,letterSpacing:C.keyLetterSpacing,fontStyle:C.keyFontStyle,verticalAlign:C.keyVerticalAlign,opacity:C.keyOpacity,":hover":{opacity:C.keyOpacityHover}},"object-size":{color:t.objectSize,borderRadius:C.objectSizeBorderRadius,fontStyle:C.objectSizeFontStyle,margin:C.objectSizeMargin,cursor:"default"},"data-type-label":{fontSize:C.dataTypeFontSize,marginRight:C.dataTypeMarginRight,opacity:C.datatypeOpacity},boolean:{display:"inline-block",color:t.dataTypes.boolean},date:{display:"inline-block",color:t.dataTypes.date},"date-value":{marginLeft:C.dateValueMarginLeft},float:{display:"inline-block",color:t.dataTypes.float},function:{display:"inline-block",color:t.dataTypes.function,cursor:"pointer",whiteSpace:"pre-line"},"function-value":{fontStyle:"italic"},integer:{display:"inline-block",color:t.dataTypes.integer},string:{display:"inline-block",color:t.dataTypes.string},nan:{display:"inline-block",color:t.dataTypes.nan,fontSize:C.nanFontSize,fontWeight:C.nanFontWeight,backgroundColor:t.dataTypes.background,padding:C.nanPadding,borderRadius:C.nanBorderRadius},null:{display:"inline-block",color:t.dataTypes.null,fontSize:C.nullFontSize,fontWeight:C.nullFontWeight,backgroundColor:t.dataTypes.background,padding:C.nullPadding,borderRadius:C.nullBorderRadius},undefined:{display:"inline-block",color:t.dataTypes.undefined,fontSize:C.undefinedFontSize,padding:C.undefinedPadding,borderRadius:C.undefinedBorderRadius,backgroundColor:t.dataTypes.background},regexp:{display:"inline-block",color:t.dataTypes.regexp},"copy-to-clipboard":{cursor:C.clipboardCursor},"copy-icon":{color:t.copyToClipboard,fontSize:C.iconFontSize,marginRight:C.iconMarginRight,verticalAlign:"top"},"copy-icon-copied":{color:t.copyToClipboardCheck,marginLeft:C.clipboardCheckMarginLeft},"array-group-meta-data":{display:"inline-block",padding:C.arrayGroupMetaPadding},"object-meta-data":{display:"inline-block",padding:C.metaDataPadding},"icon-container":{display:"inline-block",width:C.iconContainerWidth},tooltip:{padding:C.tooltipPadding},removeVarIcon:{verticalAlign:"top",display:"inline-block",color:t.editVariable.removeIcon,cursor:C.iconCursor,fontSize:C.iconFontSize,marginRight:C.iconMarginRight},addVarIcon:{verticalAlign:"top",display:"inline-block",color:t.editVariable.addIcon,cursor:C.iconCursor,fontSize:C.iconFontSize,marginRight:C.iconMarginRight},editVarIcon:{verticalAlign:"top",display:"inline-block",color:t.editVariable.editIcon,cursor:C.iconCursor,fontSize:C.iconFontSize,marginRight:C.iconMarginRight},"edit-icon-container":{display:"inline-block",verticalAlign:"top"},"check-icon":{display:"inline-block",cursor:C.iconCursor,color:t.editVariable.checkIcon,fontSize:C.iconFontSize,paddingRight:C.iconPaddingRight},"cancel-icon":{display:"inline-block",cursor:C.iconCursor,color:t.editVariable.cancelIcon,fontSize:C.iconFontSize,paddingRight:C.iconPaddingRight},"edit-input":{display:"inline-block",minWidth:C.editInputMinWidth,borderRadius:C.editInputBorderRadius,backgroundColor:t.editVariable.background,color:t.editVariable.color,padding:C.editInputPadding,marginRight:C.editInputMarginRight,fontFamily:C.editInputFontFamily},"detected-row":{paddingTop:C.detectedRowPaddingTop},"key-modal-request":{position:C.addKeyCoverPosition,top:C.addKeyCoverPositionPx,left:C.addKeyCoverPositionPx,right:C.addKeyCoverPositionPx,bottom:C.addKeyCoverPositionPx,backgroundColor:C.addKeyCoverBackground},"key-modal":{width:C.addKeyModalWidth,backgroundColor:t.addKeyModal.background,marginLeft:C.addKeyModalMargin,marginRight:C.addKeyModalMargin,padding:C.addKeyModalPadding,borderRadius:C.addKeyModalRadius,marginTop:"15px",position:"relative"},"key-modal-label":{color:t.addKeyModal.labelColor,marginLeft:"2px",marginBottom:"5px",fontSize:"11px"},"key-modal-input-container":{overflow:"hidden"},"key-modal-input":{width:"100%",padding:"3px 6px",fontFamily:"monospace",color:t.addKeyModal.color,border:"none",boxSizing:"border-box",borderRadius:"2px"},"key-modal-cancel":{backgroundColor:t.editVariable.removeIcon,position:"absolute",top:"0px",right:"0px",borderRadius:"0px 3px 0px 3px",cursor:"pointer"},"key-modal-cancel-icon":{color:t.addKeyModal.labelColor,fontSize:C.iconFontSize,transform:"rotate(45deg)"},"key-modal-submit":{color:t.editVariable.addIcon,fontSize:C.iconFontSize,position:"absolute",right:"2px",top:"3px",cursor:"pointer"},"function-ellipsis":{display:"inline-block",color:t.ellipsisColor,fontSize:C.ellipsisFontSize,lineHeight:C.ellipsisLineHeight,cursor:C.ellipsisCursor},"validation-failure":{float:"right",padding:"3px 6px",borderRadius:"2px",cursor:"pointer",color:t.validationFailure.fontColor,backgroundColor:t.validationFailure.background},"validation-failure-label":{marginRight:"6px"},"validation-failure-clear":{position:"relative",verticalAlign:"top",cursor:"pointer",color:t.validationFailure.iconColor,fontSize:C.iconFontSize,transform:"rotate(45deg)"}}};function A(e,t,n){return e||console.error("theme has not been set"),function(e){var t=k;return !1!==e&&"none"!==e||(t=O),Object(S.createStyling)(w,{defaultBase16:t})(e)}(e)(t,n)}var M=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=(e.rjvId,e.type_name),n=e.displayDataTypes,a=e.theme;return n?m.a.createElement("span",Object.assign({className:"data-type-label"},A(a,"data-type-label")),t):null}}]),n}(m.a.PureComponent),P=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props;return m.a.createElement("div",A(e.theme,"boolean"),m.a.createElement(M,Object.assign({type_name:"bool"},e)),e.value?"true":"false")}}]),n}(m.a.PureComponent),F=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props;return m.a.createElement("div",A(e.theme,"date"),m.a.createElement(M,Object.assign({type_name:"date"},e)),m.a.createElement("span",Object.assign({className:"date-value"},A(e.theme,"date-value")),e.value.toLocaleTimeString("en-us",{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})))}}]),n}(m.a.PureComponent),D=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props;return m.a.createElement("div",A(e.theme,"float"),m.a.createElement(M,Object.assign({type_name:"float"},e)),this.props.value)}}]),n}(m.a.PureComponent);function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function R(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return "Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}function L(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=R(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,r=function(){};return {s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,s=!1;return {s:function(){n=e[Symbol.iterator]();},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,o=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw o}}}}function B(e){return function(e){if(Array.isArray(e))return I(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||R(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var N=n(46),z=new(n(47).Dispatcher),T=new(function(e){u(n,e);var t=h(n);function n(){var e;i(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return (e=t.call.apply(t,[this].concat(r))).objects={},e.set=function(t,n,a,r){void 0===e.objects[t]&&(e.objects[t]={}),void 0===e.objects[t][n]&&(e.objects[t][n]={}),e.objects[t][n][a]=r;},e.get=function(t,n,a,r){return void 0===e.objects[t]||void 0===e.objects[t][n]||null==e.objects[t][n][a]?r:e.objects[t][n][a]},e.handleAction=function(t){var n=t.rjvId,a=t.data;switch(t.name){case"RESET":e.emit("reset-"+n);break;case"VARIABLE_UPDATED":t.data.updated_src=e.updateSrc(n,a),e.set(n,"action","variable-update",o(o({},a),{},{type:"variable-edited"})),e.emit("variable-update-"+n);break;case"VARIABLE_REMOVED":t.data.updated_src=e.updateSrc(n,a),e.set(n,"action","variable-update",o(o({},a),{},{type:"variable-removed"})),e.emit("variable-update-"+n);break;case"VARIABLE_ADDED":t.data.updated_src=e.updateSrc(n,a),e.set(n,"action","variable-update",o(o({},a),{},{type:"variable-added"})),e.emit("variable-update-"+n);break;case"ADD_VARIABLE_KEY_REQUEST":e.set(n,"action","new-key-request",a),e.emit("add-key-request-"+n);}},e.updateSrc=function(t,n){var a=n.name,r=n.namespace,o=n.new_value,i=(n.existing_value,n.variable_removed);r.shift();var s,c=e.get(t,"global","src"),l=e.deepCopy(c,B(r)),u=l,f=L(r);try{for(f.s();!(s=f.n()).done;){u=u[s.value];}}catch(e){f.e(e);}finally{f.f();}return i?"array"==_(u)?u.splice(a,1):delete u[a]:null!==a?u[a]=o:l=o,e.set(t,"global","src",l),l},e.deepCopy=function(t,n){var a,r=_(t),i=n.shift();return "array"==r?a=B(t):"object"==r&&(a=o({},t)),void 0!==i&&(a[i]=e.deepCopy(t[i],n)),a},e}return n}(N.EventEmitter));z.register(T.handleAction.bind(T));var q=T,V=function(e){u(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).toggleCollapsed=function(){a.setState({collapsed:!a.state.collapsed},(function(){q.set(a.props.rjvId,a.props.namespace,"collapsed",a.state.collapsed);}));},a.getFunctionDisplay=function(e){var t=d(a).props;return e?m.a.createElement("span",null,a.props.value.toString().slice(9,-1).replace(/\{[\s\S]+/,""),m.a.createElement("span",{className:"function-collapsed",style:{fontWeight:"bold"}},m.a.createElement("span",null,"{"),m.a.createElement("span",A(t.theme,"ellipsis"),"..."),m.a.createElement("span",null,"}"))):a.props.value.toString().slice(9,-1)},a.state={collapsed:q.get(e.rjvId,e.namespace,"collapsed",!0)},a}return c(n,[{key:"render",value:function(){var e=this.props,t=this.state.collapsed;return m.a.createElement("div",A(e.theme,"function"),m.a.createElement(M,Object.assign({type_name:"function"},e)),m.a.createElement("span",Object.assign({},A(e.theme,"function-value"),{className:"rjv-function-container",onClick:this.toggleCollapsed}),this.getFunctionDisplay(t)))}}]),n}(m.a.PureComponent),K=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){return m.a.createElement("div",A(this.props.theme,"nan"),"NaN")}}]),n}(m.a.PureComponent),W=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){return m.a.createElement("div",A(this.props.theme,"null"),"NULL")}}]),n}(m.a.PureComponent),H=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props;return m.a.createElement("div",A(e.theme,"integer"),m.a.createElement(M,Object.assign({type_name:"int"},e)),this.props.value)}}]),n}(m.a.PureComponent),U=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props;return m.a.createElement("div",A(e.theme,"regexp"),m.a.createElement(M,Object.assign({type_name:"regexp"},e)),this.props.value.toString())}}]),n}(m.a.PureComponent),G=function(e){u(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).toggleCollapsed=function(){a.setState({collapsed:!a.state.collapsed},(function(){q.set(a.props.rjvId,a.props.namespace,"collapsed",a.state.collapsed);}));},a.state={collapsed:q.get(e.rjvId,e.namespace,"collapsed",!0)},a}return c(n,[{key:"render",value:function(){this.state.collapsed;var e=this.props,t=e.collapseStringsAfterLength,n=e.theme,a=e.value,r={style:{cursor:"default"}};return "integer"===_(t)&&a.length>t&&(r.style.cursor="pointer",this.state.collapsed&&(a=m.a.createElement("span",null,a.substring(0,t),m.a.createElement("span",A(n,"ellipsis")," ...")))),m.a.createElement("div",A(n,"string"),m.a.createElement(M,Object.assign({type_name:"string"},e)),m.a.createElement("span",Object.assign({className:"string-value"},r,{onClick:this.toggleCollapsed}),'"',a,'"'))}}]),n}(m.a.PureComponent),J=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){return m.a.createElement("div",A(this.props.theme,"undefined"),"undefined")}}]),n}(m.a.PureComponent);function Y(){return (Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);}return e}).apply(this,arguments)}var $=v.useLayoutEffect,Q=function(e){var t=Object(v.useRef)(e);return $((function(){t.current=e;})),t},Z=function(e,t){"function"!=typeof e?e.current=t:e(t);},X=function(e,t){var n=Object(v.useRef)();return Object(v.useCallback)((function(a){e.current=a,n.current&&Z(n.current,null),n.current=t,t&&Z(t,a);}),[t])},ee={"min-height":"0","max-height":"none",height:"0",visibility:"hidden",overflow:"hidden",position:"absolute","z-index":"-1000",top:"0",right:"0"},te=function(e){Object.keys(ee).forEach((function(t){e.style.setProperty(t,ee[t],"important");}));},ne=null;var ae=function(){},re=["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth","boxSizing","fontFamily","fontSize","fontStyle","fontWeight","letterSpacing","lineHeight","paddingBottom","paddingLeft","paddingRight","paddingTop","tabSize","textIndent","textRendering","textTransform","width"],oe=!!document.documentElement.currentStyle,ie=function(e,t){var n=e.cacheMeasurements,a=e.maxRows,r=e.minRows,o=e.onChange,i=void 0===o?ae:o,s=e.onHeightChange,c=void 0===s?ae:s,l=function(e,t){if(null==e)return {};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["cacheMeasurements","maxRows","minRows","onChange","onHeightChange"]);var u,f=void 0!==l.value,p=Object(v.useRef)(null),d=X(p,t),b=Object(v.useRef)(0),h=Object(v.useRef)(),m=function(){var e=p.current,t=n&&h.current?h.current:function(e){var t=window.getComputedStyle(e);if(null===t)return null;var n,a=(n=t,re.reduce((function(e,t){return e[t]=n[t],e}),{})),r=a.boxSizing;return ""===r?null:(oe&&"border-box"===r&&(a.width=parseFloat(a.width)+parseFloat(a.borderRightWidth)+parseFloat(a.borderLeftWidth)+parseFloat(a.paddingRight)+parseFloat(a.paddingLeft)+"px"),{sizingStyle:a,paddingSize:parseFloat(a.paddingBottom)+parseFloat(a.paddingTop),borderSize:parseFloat(a.borderBottomWidth)+parseFloat(a.borderTopWidth)})}(e);if(t){h.current=t;var o=function(e,t,n,a){void 0===n&&(n=1),void 0===a&&(a=1/0),ne||((ne=document.createElement("textarea")).setAttribute("tab-index","-1"),ne.setAttribute("aria-hidden","true"),te(ne)),null===ne.parentNode&&document.body.appendChild(ne);var r=e.paddingSize,o=e.borderSize,i=e.sizingStyle,s=i.boxSizing;Object.keys(i).forEach((function(e){var t=e;ne.style[t]=i[t];})),te(ne),ne.value=t;var c=function(e,t){var n=e.scrollHeight;return "border-box"===t.sizingStyle.boxSizing?n+t.borderSize:n-t.paddingSize}(ne,e);ne.value="x";var l=ne.scrollHeight-r,u=l*n;"border-box"===s&&(u=u+r+o),c=Math.max(u,c);var f=l*a;return "border-box"===s&&(f=f+r+o),[c=Math.min(f,c),l]}(t,e.value||e.placeholder||"x",r,a),i=o[0],s=o[1];b.current!==i&&(b.current=i,e.style.setProperty("height",i+"px","important"),c(i,{rowHeight:s}));}};return Object(v.useLayoutEffect)(m),u=Q(m),Object(v.useLayoutEffect)((function(){var e=function(e){u.current(e);};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e);}}),[]),Object(v.createElement)("textarea",Y({},l,{onChange:function(e){f||m(),i(e);},ref:d}))},se=Object(v.forwardRef)(ie);function ce(e){e=e.trim();try{if("["===(e=JSON.stringify(JSON.parse(e)))[0])return le("array",JSON.parse(e));if("{"===e[0])return le("object",JSON.parse(e));if(e.match(/\-?\d+\.\d+/)&&e.match(/\-?\d+\.\d+/)[0]===e)return le("float",parseFloat(e));if(e.match(/\-?\d+e-\d+/)&&e.match(/\-?\d+e-\d+/)[0]===e)return le("float",Number(e));if(e.match(/\-?\d+/)&&e.match(/\-?\d+/)[0]===e)return le("integer",parseInt(e));if(e.match(/\-?\d+e\+\d+/)&&e.match(/\-?\d+e\+\d+/)[0]===e)return le("integer",Number(e))}catch(e){}switch(e=e.toLowerCase()){case"undefined":return le("undefined",void 0);case"nan":return le("nan",NaN);case"null":return le("null",null);case"true":return le("boolean",!0);case"false":return le("boolean",!1);default:if(e=Date.parse(e))return le("date",new Date(e))}return le(!1,null)}function le(e,t){return {type:e,value:t}}var ue=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 24 24",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("path",{d:"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7"})))}}]),n}(m.a.PureComponent),fe=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 24 24",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("path",{d:"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"})))}}]),n}(m.a.PureComponent),pe=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]),a=xe(t).style;return m.a.createElement("span",n,m.a.createElement("svg",{fill:a.color,width:a.height,height:a.width,style:a,viewBox:"0 0 1792 1792"},m.a.createElement("path",{d:"M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"})))}}]),n}(m.a.PureComponent),de=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]),a=xe(t).style;return m.a.createElement("span",n,m.a.createElement("svg",{fill:a.color,width:a.height,height:a.width,style:a,viewBox:"0 0 1792 1792"},m.a.createElement("path",{d:"M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"})))}}]),n}(m.a.PureComponent),be=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",{style:o(o({},xe(t).style),{},{paddingLeft:"2px",verticalAlign:"top"}),viewBox:"0 0 15 15",fill:"currentColor"},m.a.createElement("path",{d:"M0 14l6-6-6-6z"})))}}]),n}(m.a.PureComponent),he=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",{style:o(o({},xe(t).style),{},{paddingLeft:"2px",verticalAlign:"top"}),viewBox:"0 0 15 15",fill:"currentColor"},m.a.createElement("path",{d:"M0 5l6 6 6-6z"})))}}]),n}(m.a.PureComponent),ve=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 40 40",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("g",null,m.a.createElement("path",{d:"m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z"}))))}}]),n}(m.a.PureComponent),me=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 40 40",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("g",null,m.a.createElement("path",{d:"m28.6 25q0-0.5-0.4-1l-4-4 4-4q0.4-0.5 0.4-1 0-0.6-0.4-1.1l-2-2q-0.4-0.4-1-0.4-0.6 0-1 0.4l-4.1 4.1-4-4.1q-0.4-0.4-1-0.4-0.6 0-1 0.4l-2 2q-0.5 0.5-0.5 1.1 0 0.5 0.5 1l4 4-4 4q-0.5 0.5-0.5 1 0 0.7 0.5 1.1l2 2q0.4 0.4 1 0.4 0.6 0 1-0.4l4-4.1 4.1 4.1q0.4 0.4 1 0.4 0.6 0 1-0.4l2-2q0.4-0.4 0.4-1z m8.7-5q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z"}))))}}]),n}(m.a.PureComponent),ye=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 40 40",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("g",null,m.a.createElement("path",{d:"m30.1 21.4v-2.8q0-0.6-0.4-1t-1-0.5h-5.7v-5.7q0-0.6-0.4-1t-1-0.4h-2.9q-0.6 0-1 0.4t-0.4 1v5.7h-5.7q-0.6 0-1 0.5t-0.5 1v2.8q0 0.6 0.5 1t1 0.5h5.7v5.7q0 0.5 0.4 1t1 0.4h2.9q0.6 0 1-0.4t0.4-1v-5.7h5.7q0.6 0 1-0.5t0.4-1z m7.2-1.4q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z"}))))}}]),n}(m.a.PureComponent),ge=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 40 40",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("g",null,m.a.createElement("path",{d:"m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z"}))))}}]),n}(m.a.PureComponent),Ee=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 40 40",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("g",null,m.a.createElement("path",{d:"m19.8 26.4l2.6-2.6-3.4-3.4-2.6 2.6v1.3h2.2v2.1h1.2z m9.8-16q-0.3-0.4-0.7 0l-7.8 7.8q-0.4 0.4 0 0.7t0.7 0l7.8-7.8q0.4-0.4 0-0.7z m1.8 13.2v4.3q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q1.4 0 2.6 0.5 0.3 0.2 0.4 0.5 0.1 0.4-0.2 0.7l-1.1 1.1q-0.3 0.3-0.7 0.1-0.5-0.1-1-0.1h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-2.9q0-0.2 0.2-0.4l1.4-1.5q0.3-0.3 0.8-0.1t0.4 0.6z m-2.1-16.5l6.4 6.5-15 15h-6.4v-6.5z m9.9 3l-2.1 2-6.4-6.4 2.1-2q0.6-0.7 1.5-0.7t1.5 0.7l3.4 3.4q0.6 0.6 0.6 1.5t-0.6 1.5z"}))))}}]),n}(m.a.PureComponent),je=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.style,n=x(e,["style"]);return m.a.createElement("span",n,m.a.createElement("svg",Object.assign({},xe(t),{viewBox:"0 0 40 40",fill:"currentColor",preserveAspectRatio:"xMidYMid meet"}),m.a.createElement("g",null,m.a.createElement("path",{d:"m31.7 16.4q0-0.6-0.4-1l-2.1-2.1q-0.4-0.4-1-0.4t-1 0.4l-9.1 9.1-5-5q-0.5-0.4-1-0.4t-1 0.4l-2.1 2q-0.4 0.4-0.4 1 0 0.6 0.4 1l8.1 8.1q0.4 0.4 1 0.4 0.6 0 1-0.4l12.2-12.1q0.4-0.4 0.4-1z m5.6 3.6q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z"}))))}}]),n}(m.a.PureComponent);function xe(e){return e||(e={}),{style:o(o({verticalAlign:"middle"},e),{},{color:e.color?e.color:"#000000",height:"1em",width:"1em"})}}var _e=function(e){u(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).copiedTimer=null,a.handleCopy=function(){var e=document.createElement("textarea"),t=a.props,n=t.clickCallback,r=t.src,o=t.namespace;e.innerHTML=JSON.stringify(a.clipboardValue(r),null,"  "),document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),a.copiedTimer=setTimeout((function(){a.setState({copied:!1});}),5500),a.setState({copied:!0},(function(){"function"==typeof n&&n({src:r,namespace:o,name:o[o.length-1]});}));},a.getClippyIcon=function(){var e=a.props.theme;return a.state.copied?m.a.createElement("span",null,m.a.createElement(ve,Object.assign({className:"copy-icon"},A(e,"copy-icon"))),m.a.createElement("span",A(e,"copy-icon-copied"),"✔")):m.a.createElement(ve,Object.assign({className:"copy-icon"},A(e,"copy-icon")))},a.clipboardValue=function(e){switch(_(e)){case"function":case"regexp":return e.toString();default:return e}},a.state={copied:!1},a}return c(n,[{key:"componentWillUnmount",value:function(){this.copiedTimer&&(clearTimeout(this.copiedTimer),this.copiedTimer=null);}},{key:"render",value:function(){var e=this.props,t=(e.src,e.theme),n=e.hidden,a=e.rowHovered,r=A(t,"copy-to-clipboard").style,i="inline";return n&&(i="none"),m.a.createElement("span",{className:"copy-to-clipboard-container",title:"Copy to clipboard",style:{verticalAlign:"top",display:a?"inline-block":"none"}},m.a.createElement("span",{style:o(o({},r),{},{display:i}),onClick:this.handleCopy},this.getClippyIcon()))}}]),n}(m.a.PureComponent),ke=function(e){u(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).getEditIcon=function(){var e=a.props,t=e.variable,n=e.theme;return m.a.createElement("div",{className:"click-to-edit",style:{verticalAlign:"top",display:a.state.hovered?"inline-block":"none"}},m.a.createElement(Ee,Object.assign({className:"click-to-edit-icon"},A(n,"editVarIcon"),{onClick:function(){a.prepopInput(t);}})))},a.prepopInput=function(e){if(!1!==a.props.onEdit){var t=function(e){var t;switch(_(e)){case"undefined":t="undefined";break;case"nan":t="NaN";break;case"string":t=e;break;case"date":case"function":case"regexp":t=e.toString();break;default:try{t=JSON.stringify(e,null,"  ");}catch(e){t="";}}return t}(e.value),n=ce(t);a.setState({editMode:!0,editValue:t,parsedInput:{type:n.type,value:n.value}});}},a.getRemoveIcon=function(){var e=a.props,t=e.variable,n=e.namespace,r=e.theme,o=e.rjvId;return m.a.createElement("div",{className:"click-to-remove",style:{verticalAlign:"top",display:a.state.hovered?"inline-block":"none"}},m.a.createElement(me,Object.assign({className:"click-to-remove-icon"},A(r,"removeVarIcon"),{onClick:function(){z.dispatch({name:"VARIABLE_REMOVED",rjvId:o,data:{name:t.name,namespace:n,existing_value:t.value,variable_removed:!0}});}})))},a.getValue=function(e,t){var n=!t&&e.type,r=d(a).props;switch(n){case!1:return a.getEditInput();case"string":return m.a.createElement(G,Object.assign({value:e.value},r));case"integer":return m.a.createElement(H,Object.assign({value:e.value},r));case"float":return m.a.createElement(D,Object.assign({value:e.value},r));case"boolean":return m.a.createElement(P,Object.assign({value:e.value},r));case"function":return m.a.createElement(V,Object.assign({value:e.value},r));case"null":return m.a.createElement(W,r);case"nan":return m.a.createElement(K,r);case"undefined":return m.a.createElement(J,r);case"date":return m.a.createElement(F,Object.assign({value:e.value},r));case"regexp":return m.a.createElement(U,Object.assign({value:e.value},r));default:return m.a.createElement("div",{className:"object-value"},JSON.stringify(e.value))}},a.getEditInput=function(){var e=a.props.theme,t=a.state.editValue;return m.a.createElement("div",null,m.a.createElement(se,Object.assign({type:"text",inputRef:function(e){return e&&e.focus()},value:t,className:"variable-editor",onChange:function(e){var t=e.target.value,n=ce(t);a.setState({editValue:t,parsedInput:{type:n.type,value:n.value}});},onKeyDown:function(e){switch(e.key){case"Escape":a.setState({editMode:!1,editValue:""});break;case"Enter":(e.ctrlKey||e.metaKey)&&a.submitEdit(!0);}e.stopPropagation();},placeholder:"update this value",minRows:2},A(e,"edit-input"))),m.a.createElement("div",A(e,"edit-icon-container"),m.a.createElement(me,Object.assign({className:"edit-cancel"},A(e,"cancel-icon"),{onClick:function(){a.setState({editMode:!1,editValue:""});}})),m.a.createElement(je,Object.assign({className:"edit-check string-value"},A(e,"check-icon"),{onClick:function(){a.submitEdit();}})),m.a.createElement("div",null,a.showDetected())))},a.submitEdit=function(e){var t=a.props,n=t.variable,r=t.namespace,o=t.rjvId,i=a.state,s=i.editValue,c=i.parsedInput,l=s;e&&c.type&&(l=c.value),a.setState({editMode:!1}),z.dispatch({name:"VARIABLE_UPDATED",rjvId:o,data:{name:n.name,namespace:r,existing_value:n.value,new_value:l,variable_removed:!1}});},a.showDetected=function(){var e=a.props,t=e.theme,n=(e.variable,e.namespace,e.rjvId,a.state.parsedInput),r=(n.type,n.value,a.getDetectedInput());if(r)return m.a.createElement("div",null,m.a.createElement("div",A(t,"detected-row"),r,m.a.createElement(je,{className:"edit-check detected",style:o({verticalAlign:"top",paddingLeft:"3px"},A(t,"check-icon").style),onClick:function(){a.submitEdit(!0);}})))},a.getDetectedInput=function(){var e=a.state.parsedInput,t=e.type,n=e.value,r=d(a).props,i=r.theme;if(!1!==t)switch(t.toLowerCase()){case"object":return m.a.createElement("span",null,m.a.createElement("span",{style:o(o({},A(i,"brace").style),{},{cursor:"default"})},"{"),m.a.createElement("span",{style:o(o({},A(i,"ellipsis").style),{},{cursor:"default"})},"..."),m.a.createElement("span",{style:o(o({},A(i,"brace").style),{},{cursor:"default"})},"}"));case"array":return m.a.createElement("span",null,m.a.createElement("span",{style:o(o({},A(i,"brace").style),{},{cursor:"default"})},"["),m.a.createElement("span",{style:o(o({},A(i,"ellipsis").style),{},{cursor:"default"})},"..."),m.a.createElement("span",{style:o(o({},A(i,"brace").style),{},{cursor:"default"})},"]"));case"string":return m.a.createElement(G,Object.assign({value:n},r));case"integer":return m.a.createElement(H,Object.assign({value:n},r));case"float":return m.a.createElement(D,Object.assign({value:n},r));case"boolean":return m.a.createElement(P,Object.assign({value:n},r));case"function":return m.a.createElement(V,Object.assign({value:n},r));case"null":return m.a.createElement(W,r);case"nan":return m.a.createElement(K,r);case"undefined":return m.a.createElement(J,r);case"date":return m.a.createElement(F,Object.assign({value:new Date(n)},r))}},a.state={editMode:!1,editValue:"",hovered:!1,renameKey:!1,parsedInput:{type:!1,value:null}},a}return c(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.variable,a=t.singleIndent,r=t.type,i=t.theme,s=t.namespace,c=t.indentWidth,l=t.enableClipboard,u=t.onEdit,f=t.onDelete,p=t.onSelect,d=t.displayArrayKey,b=t.quotesOnKeys,h=this.state.editMode;return m.a.createElement("div",Object.assign({},A(i,"objectKeyVal",{paddingLeft:c*a}),{onMouseEnter:function(){return e.setState(o(o({},e.state),{},{hovered:!0}))},onMouseLeave:function(){return e.setState(o(o({},e.state),{},{hovered:!1}))},className:"variable-row",key:n.name}),"array"==r?d?m.a.createElement("span",Object.assign({},A(i,"array-key"),{key:n.name+"_"+s}),n.name,m.a.createElement("div",A(i,"colon"),":")):null:m.a.createElement("span",null,m.a.createElement("span",Object.assign({},A(i,"object-name"),{className:"object-key",key:n.name+"_"+s}),!!b&&m.a.createElement("span",{style:{verticalAlign:"top"}},'"'),m.a.createElement("span",{style:{display:"inline-block"}},n.name),!!b&&m.a.createElement("span",{style:{verticalAlign:"top"}},'"')),m.a.createElement("span",A(i,"colon"),":")),m.a.createElement("div",Object.assign({className:"variable-value",onClick:!1===p&&!1===u?null:function(t){var a=B(s);(t.ctrlKey||t.metaKey)&&!1!==u?e.prepopInput(n):!1!==p&&(a.shift(),p(o(o({},n),{},{namespace:a})));}},A(i,"variableValue",{cursor:!1===p?"default":"pointer"})),this.getValue(n,h)),l?m.a.createElement(_e,{rowHovered:this.state.hovered,hidden:h,src:n.value,clickCallback:l,theme:i,namespace:[].concat(B(s),[n.name])}):null,!1!==u&&0==h?this.getEditIcon():null,!1!==f&&0==h?this.getRemoveIcon():null)}}]),n}(m.a.PureComponent),Oe=function(e){u(n,e);var t=h(n);function n(){var e;i(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return (e=t.call.apply(t,[this].concat(r))).getObjectSize=function(){var t=e.props,n=t.size,a=t.theme;if(t.displayObjectSize)return m.a.createElement("span",Object.assign({className:"object-size"},A(a,"object-size")),n," item",1===n?"":"s")},e.getAddAttribute=function(t){var n=e.props,a=n.theme,r=n.namespace,i=n.name,s=n.src,c=n.rjvId,l=n.depth;return m.a.createElement("span",{className:"click-to-add",style:{verticalAlign:"top",display:t?"inline-block":"none"}},m.a.createElement(ye,Object.assign({className:"click-to-add-icon"},A(a,"addVarIcon"),{onClick:function(){var e={name:l>0?i:null,namespace:r.splice(0,r.length-1),existing_value:s,variable_removed:!1,key_name:null};"object"===_(s)?z.dispatch({name:"ADD_VARIABLE_KEY_REQUEST",rjvId:c,data:e}):z.dispatch({name:"VARIABLE_ADDED",rjvId:c,data:o(o({},e),{},{new_value:[].concat(B(s),[null])})});}})))},e.getRemoveObject=function(t){var n=e.props,a=n.theme,r=(n.hover,n.namespace),o=n.name,i=n.src,s=n.rjvId;if(1!==r.length)return m.a.createElement("span",{className:"click-to-remove",style:{display:t?"inline-block":"none"}},m.a.createElement(me,Object.assign({className:"click-to-remove-icon"},A(a,"removeVarIcon"),{onClick:function(){z.dispatch({name:"VARIABLE_REMOVED",rjvId:s,data:{name:o,namespace:r.splice(0,r.length-1),existing_value:i,variable_removed:!0}});}})))},e.render=function(){var t=e.props,n=t.theme,a=t.onDelete,r=t.onAdd,o=t.enableClipboard,i=t.src,s=t.namespace,c=t.rowHovered;return m.a.createElement("div",Object.assign({},A(n,"object-meta-data"),{className:"object-meta-data",onClick:function(e){e.stopPropagation();}}),e.getObjectSize(),o?m.a.createElement(_e,{rowHovered:c,clickCallback:o,src:i,theme:n,namespace:s}):null,!1!==r?e.getAddAttribute(c):null,!1!==a?e.getRemoveObject(c):null)},e}return n}(m.a.PureComponent);function Ce(e){var t=e.parent_type,n=e.namespace,a=e.quotesOnKeys,r=e.theme,o=e.jsvRoot,i=e.name,s=e.displayArrayKey,c=e.name?e.name:"";return !o||!1!==i&&null!==i?"array"==t?s?m.a.createElement("span",Object.assign({},A(r,"array-key"),{key:n}),m.a.createElement("span",{className:"array-key"},c),m.a.createElement("span",A(r,"colon"),":")):m.a.createElement("span",null):m.a.createElement("span",Object.assign({},A(r,"object-name"),{key:n}),m.a.createElement("span",{className:"object-key"},a&&m.a.createElement("span",{style:{verticalAlign:"top"}},'"'),m.a.createElement("span",null,c),a&&m.a.createElement("span",{style:{verticalAlign:"top"}},'"')),m.a.createElement("span",A(r,"colon"),":")):m.a.createElement("span",null)}function Se(e){var t=e.theme;switch(e.iconStyle){case"triangle":return m.a.createElement(he,Object.assign({},A(t,"expanded-icon"),{className:"expanded-icon"}));case"square":return m.a.createElement(pe,Object.assign({},A(t,"expanded-icon"),{className:"expanded-icon"}));default:return m.a.createElement(ue,Object.assign({},A(t,"expanded-icon"),{className:"expanded-icon"}))}}function we(e){var t=e.theme;switch(e.iconStyle){case"triangle":return m.a.createElement(be,Object.assign({},A(t,"collapsed-icon"),{className:"collapsed-icon"}));case"square":return m.a.createElement(de,Object.assign({},A(t,"collapsed-icon"),{className:"collapsed-icon"}));default:return m.a.createElement(fe,Object.assign({},A(t,"collapsed-icon"),{className:"collapsed-icon"}))}}var Ae=function(e){u(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).toggleCollapsed=function(e){var t=[];for(var n in a.state.expanded)t.push(a.state.expanded[n]);t[e]=!t[e],a.setState({expanded:t});},a.state={expanded:[]},a}return c(n,[{key:"getExpandedIcon",value:function(e){var t=this.props,n=t.theme,a=t.iconStyle;return this.state.expanded[e]?m.a.createElement(Se,{theme:n,iconStyle:a}):m.a.createElement(we,{theme:n,iconStyle:a})}},{key:"render",value:function(){var e=this,t=this.props,n=t.src,a=t.groupArraysAfterLength,r=(t.depth,t.name),o=t.theme,i=t.jsvRoot,s=t.namespace,c=(t.parent_type,x(t,["src","groupArraysAfterLength","depth","name","theme","jsvRoot","namespace","parent_type"])),l=0,u=5*this.props.indentWidth;i||(l=5*this.props.indentWidth);var f=a,p=Math.ceil(n.length/f);return m.a.createElement("div",Object.assign({className:"object-key-val"},A(o,i?"jsv-root":"objectKeyVal",{paddingLeft:l})),m.a.createElement(Ce,this.props),m.a.createElement("span",null,m.a.createElement(Oe,Object.assign({size:n.length},this.props))),B(Array(p)).map((function(t,a){return m.a.createElement("div",Object.assign({key:a,className:"object-key-val array-group"},A(o,"objectKeyVal",{marginLeft:6,paddingLeft:u})),m.a.createElement("span",A(o,"brace-row"),m.a.createElement("div",Object.assign({className:"icon-container"},A(o,"icon-container"),{onClick:function(t){e.toggleCollapsed(a);}}),e.getExpandedIcon(a)),e.state.expanded[a]?m.a.createElement(Fe,Object.assign({key:r+a,depth:0,name:!1,collapsed:!1,groupArraysAfterLength:f,index_offset:a*f,src:n.slice(a*f,a*f+f),namespace:s,type:"array",parent_type:"array_group",theme:o},c)):m.a.createElement("span",Object.assign({},A(o,"brace"),{onClick:function(t){e.toggleCollapsed(a);},className:"array-group-brace"}),"[",m.a.createElement("div",Object.assign({},A(o,"array-group-meta-data"),{className:"array-group-meta-data"}),m.a.createElement("span",Object.assign({className:"object-size"},A(o,"object-size")),a*f," - ",a*f+f>n.length?n.length:a*f+f)),"]")))})))}}]),n}(m.a.PureComponent),Me=function(e){u(n,e);var t=h(n);function n(e){var a;i(this,n),(a=t.call(this,e)).toggleCollapsed=function(){a.setState({expanded:!a.state.expanded},(function(){q.set(a.props.rjvId,a.props.namespace,"expanded",a.state.expanded);}));},a.getObjectContent=function(e,t,n){return m.a.createElement("div",{className:"pushed-content object-container"},m.a.createElement("div",Object.assign({className:"object-content"},A(a.props.theme,"pushed-content")),a.renderObjectContents(t,n)))},a.getEllipsis=function(){return 0===a.state.size?null:m.a.createElement("div",Object.assign({},A(a.props.theme,"ellipsis"),{className:"node-ellipsis",onClick:a.toggleCollapsed}),"...")},a.getObjectMetaData=function(e){var t=a.props,n=(t.rjvId,t.theme,a.state),r=n.size,o=n.hovered;return m.a.createElement(Oe,Object.assign({rowHovered:o,size:r},a.props))},a.renderObjectContents=function(e,t){var n,r=a.props,o=r.depth,i=r.parent_type,s=r.index_offset,c=r.groupArraysAfterLength,l=r.namespace,u=a.state.object_type,f=[],p=Object.keys(e||{});return a.props.sortKeys&&"array"!==u&&(p=p.sort()),p.forEach((function(r){if(n=new Pe(r,e[r]),"array_group"===i&&s&&(n.name=parseInt(n.name)+s),e.hasOwnProperty(r))if("object"===n.type)f.push(m.a.createElement(Fe,Object.assign({key:n.name,depth:o+1,name:n.name,src:n.value,namespace:l.concat(n.name),parent_type:u},t)));else if("array"===n.type){var p=Fe;c&&n.value.length>c&&(p=Ae),f.push(m.a.createElement(p,Object.assign({key:n.name,depth:o+1,name:n.name,src:n.value,namespace:l.concat(n.name),type:"array",parent_type:u},t)));}else f.push(m.a.createElement(ke,Object.assign({key:n.name+"_"+l,variable:n,singleIndent:5,namespace:l,type:a.props.type},t)));})),f};var r=n.getState(e);return a.state=o(o({},r),{},{prevProps:{}}),a}return c(n,[{key:"getBraceStart",value:function(e,t){var n=this,a=this.props,r=a.src,o=a.theme,i=a.iconStyle;if("array_group"===a.parent_type)return m.a.createElement("span",null,m.a.createElement("span",A(o,"brace"),"array"===e?"[":"{"),t?this.getObjectMetaData(r):null);var s=t?Se:we;return m.a.createElement("span",null,m.a.createElement("span",Object.assign({onClick:function(e){n.toggleCollapsed();}},A(o,"brace-row")),m.a.createElement("div",Object.assign({className:"icon-container"},A(o,"icon-container")),m.a.createElement(s,{theme:o,iconStyle:i})),m.a.createElement(Ce,this.props),m.a.createElement("span",A(o,"brace"),"array"===e?"[":"{")),t?this.getObjectMetaData(r):null)}},{key:"render",value:function(){var e=this,t=this.props,n=t.depth,a=t.src,r=(t.namespace,t.name,t.type,t.parent_type),i=t.theme,s=t.jsvRoot,c=t.iconStyle,l=x(t,["depth","src","namespace","name","type","parent_type","theme","jsvRoot","iconStyle"]),u=this.state,f=u.object_type,p=u.expanded,d={};return s||"array_group"===r?"array_group"===r&&(d.borderLeft=0,d.display="inline"):d.paddingLeft=5*this.props.indentWidth,m.a.createElement("div",Object.assign({className:"object-key-val",onMouseEnter:function(){return e.setState(o(o({},e.state),{},{hovered:!0}))},onMouseLeave:function(){return e.setState(o(o({},e.state),{},{hovered:!1}))}},A(i,s?"jsv-root":"objectKeyVal",d)),this.getBraceStart(f,p),p?this.getObjectContent(n,a,o({theme:i,iconStyle:c},l)):this.getEllipsis(),m.a.createElement("span",{className:"brace-row"},m.a.createElement("span",{style:o(o({},A(i,"brace").style),{},{paddingLeft:p?"3px":"0px"})},"array"===f?"]":"}"),p?null:this.getObjectMetaData(a)))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a=t.prevProps;return e.src!==a.src||e.collapsed!==a.collapsed||e.name!==a.name||e.namespace!==a.namespace||e.rjvId!==a.rjvId?o(o({},n.getState(e)),{},{prevProps:e}):null}}]),n}(m.a.PureComponent);Me.getState=function(e){var t=Object.keys(e.src).length,n=(!1===e.collapsed||!0!==e.collapsed&&e.collapsed>e.depth)&&(!e.shouldCollapse||!1===e.shouldCollapse({name:e.name,src:e.src,type:_(e.src),namespace:e.namespace}))&&0!==t;return {expanded:q.get(e.rjvId,e.namespace,"expanded",n),object_type:"array"===e.type?"array":"object",parent_type:"array"===e.type?"array":"object",size:t,hovered:!1}};var Pe=function e(t,n){i(this,e),this.name=t,this.value=n,this.type=_(n);};j(Me);var Fe=Me,De=function(e){u(n,e);var t=h(n);function n(){var e;i(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return (e=t.call.apply(t,[this].concat(r))).render=function(){var t=d(e).props,n=[t.name],a=Fe;return Array.isArray(t.src)&&t.groupArraysAfterLength&&t.src.length>t.groupArraysAfterLength&&(a=Ae),m.a.createElement("div",{className:"pretty-json-container object-container"},m.a.createElement("div",{className:"object-content"},m.a.createElement(a,Object.assign({namespace:n,depth:0,jsvRoot:!0},t))))},e}return n}(m.a.PureComponent),Ie=function(e){u(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).closeModal=function(){z.dispatch({rjvId:a.props.rjvId,name:"RESET"});},a.submit=function(){a.props.submit(a.state.input);},a.state={input:e.input?e.input:""},a}return c(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.theme,a=t.rjvId,r=t.isValid,o=this.state.input,i=r(o);return m.a.createElement("div",Object.assign({className:"key-modal-request"},A(n,"key-modal-request"),{onClick:this.closeModal}),m.a.createElement("div",Object.assign({},A(n,"key-modal"),{onClick:function(e){e.stopPropagation();}}),m.a.createElement("div",A(n,"key-modal-label"),"Key Name:"),m.a.createElement("div",{style:{position:"relative"}},m.a.createElement("input",Object.assign({},A(n,"key-modal-input"),{className:"key-modal-input",ref:function(e){return e&&e.focus()},spellCheck:!1,value:o,placeholder:"...",onChange:function(t){e.setState({input:t.target.value});},onKeyPress:function(t){i&&"Enter"===t.key?e.submit():"Escape"===t.key&&e.closeModal();}})),i?m.a.createElement(je,Object.assign({},A(n,"key-modal-submit"),{className:"key-modal-submit",onClick:function(t){return e.submit()}})):null),m.a.createElement("span",A(n,"key-modal-cancel"),m.a.createElement(ge,Object.assign({},A(n,"key-modal-cancel-icon"),{className:"key-modal-cancel",onClick:function(){z.dispatch({rjvId:a,name:"RESET"});}})))))}}]),n}(m.a.PureComponent),Re=function(e){u(n,e);var t=h(n);function n(){var e;i(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return (e=t.call.apply(t,[this].concat(r))).isValid=function(t){var n=e.props.rjvId,a=q.get(n,"action","new-key-request");return ""!=t&&-1===Object.keys(a.existing_value).indexOf(t)},e.submit=function(t){var n=e.props.rjvId,a=q.get(n,"action","new-key-request");a.new_value=o({},a.existing_value),a.new_value[t]=e.props.defaultValue,z.dispatch({name:"VARIABLE_ADDED",rjvId:n,data:a});},e}return c(n,[{key:"render",value:function(){var e=this.props,t=e.active,n=e.theme,a=e.rjvId;return t?m.a.createElement(Ie,{rjvId:a,theme:n,isValid:this.isValid,submit:this.submit}):null}}]),n}(m.a.PureComponent),Le=function(e){u(n,e);var t=h(n);function n(){return i(this,n),t.apply(this,arguments)}return c(n,[{key:"render",value:function(){var e=this.props,t=e.message,n=e.active,a=e.theme,r=e.rjvId;return n?m.a.createElement("div",Object.assign({className:"validation-failure"},A(a,"validation-failure"),{onClick:function(){z.dispatch({rjvId:r,name:"RESET"});}}),m.a.createElement("span",A(a,"validation-failure-label"),t),m.a.createElement(ge,A(a,"validation-failure-clear"))):null}}]),n}(m.a.PureComponent),Be=function(e){u(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).rjvId=Date.now().toString(),a.getListeners=function(){return {reset:a.resetState,"variable-update":a.updateSrc,"add-key-request":a.addKeyRequest}},a.updateSrc=function(){var e,t=q.get(a.rjvId,"action","variable-update"),n=t.name,r=t.namespace,o=t.new_value,i=t.existing_value,s=(t.variable_removed,t.updated_src),c=t.type,l=a.props,u=l.onEdit,f=l.onDelete,p=l.onAdd,d={existing_src:a.state.src,new_value:o,updated_src:s,name:n,namespace:r,existing_value:i};switch(c){case"variable-added":e=p(d);break;case"variable-edited":e=u(d);break;case"variable-removed":e=f(d);}!1!==e?(q.set(a.rjvId,"global","src",s),a.setState({src:s})):a.setState({validationFailure:!0});},a.addKeyRequest=function(){a.setState({addKeyRequest:!0});},a.resetState=function(){a.setState({validationFailure:!1,addKeyRequest:!1});},a.state={addKeyRequest:!1,editKeyRequest:!1,validationFailure:!1,src:n.defaultProps.src,name:n.defaultProps.name,theme:n.defaultProps.theme,validationMessage:n.defaultProps.validationMessage,prevSrc:n.defaultProps.src,prevName:n.defaultProps.name,prevTheme:n.defaultProps.theme},a}return c(n,[{key:"componentDidMount",value:function(){q.set(this.rjvId,"global","src",this.state.src);var e=this.getListeners();for(var t in e)q.on(t+"-"+this.rjvId,e[t]);this.setState({addKeyRequest:!1,editKeyRequest:!1});}},{key:"componentDidUpdate",value:function(e,t){!1!==t.addKeyRequest&&this.setState({addKeyRequest:!1}),!1!==t.editKeyRequest&&this.setState({editKeyRequest:!1}),e.src!==this.state.src&&q.set(this.rjvId,"global","src",this.state.src);}},{key:"componentWillUnmount",value:function(){var e=this.getListeners();for(var t in e)q.removeListener(t+"-"+this.rjvId,e[t]);}},{key:"render",value:function(){var e=this.state,t=e.validationFailure,n=e.validationMessage,a=e.addKeyRequest,r=e.theme,i=e.src,s=e.name,c=this.props,l=c.style,u=c.defaultValue;return m.a.createElement("div",{className:"react-json-view",style:o(o({},A(r,"app-container").style),l)},m.a.createElement(Le,{message:n,active:t,theme:r,rjvId:this.rjvId}),m.a.createElement(De,Object.assign({},this.props,{src:i,name:s,theme:r,type:_(i),rjvId:this.rjvId})),m.a.createElement(Re,{active:a,theme:r,rjvId:this.rjvId,defaultValue:u}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){if(e.src!==t.prevSrc||e.name!==t.prevName||e.theme!==t.prevTheme){var a={src:e.src,name:e.name,theme:e.theme,validationMessage:e.validationMessage,prevSrc:e.src,prevName:e.name,prevTheme:e.theme};return n.validateState(a)}return null}}]),n}(m.a.PureComponent);Be.defaultProps={src:{},name:"root",theme:"rjv-default",collapsed:!1,collapseStringsAfterLength:!1,shouldCollapse:!1,sortKeys:!1,quotesOnKeys:!0,groupArraysAfterLength:100,indentWidth:4,enableClipboard:!0,displayObjectSize:!0,displayDataTypes:!0,onEdit:!1,onDelete:!1,onAdd:!1,onSelect:!1,iconStyle:"triangle",style:{},validationMessage:"Validation Error",defaultValue:null,displayArrayKey:!0},Be.validateState=function(e){var t={};return "object"!==_(e.theme)||function(e){var t=["base00","base01","base02","base03","base04","base05","base06","base07","base08","base09","base0A","base0B","base0C","base0D","base0E","base0F"];if("object"===_(e)){for(var n=0;n<t.length;n++)if(!(t[n]in e))return !1;return !0}return !1}(e.theme)||(console.error("react-json-view error:","theme prop must be a theme name or valid base-16 theme object.",'defaulting to "rjv-default" theme'),t.theme="rjv-default"),"object"!==_(e.src)&&"array"!==_(e.src)&&(console.error("react-json-view error:","src property must be a valid json object"),t.name="ERROR",t.src={message:"src property must be a valid json object"}),o(o({},e),t)},j(Be);t.default=Be;}])}));
} (main));

var ReactJson = /*@__PURE__*/getDefaultExportFromCjs(main.exports);

var css_248z$p = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.CodeSnippet-module_root__DwI00 {\n  padding: 0.5rem, 1rem;\n}\n.CodeSnippet-module_root__DwI00 .CodeSnippet-module_copy__evfwO {\n  position: absolute;\n  right: 1.25rem;\n  top: 1.25rem;\n  cursor: pointer;\n}\n.CodeSnippet-module_root__DwI00 .CodeSnippet-module_copy__evfwO .CodeSnippet-module_icon__D6dmB {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.CodeSnippet-module_root__DwI00 .CodeSnippet-module_copy__evfwO .CodeSnippet-module_notCopied__J2bl4 {\n  display: none;\n}\n.CodeSnippet-module_root__DwI00 .CodeSnippet-module_copy__evfwO .CodeSnippet-module_copied__8xo5B {\n  position: absolute;\n  right: 1.375rem;\n  top: 2.188rem;\n  padding: 0.5rem;\n  border-radius: 0.25rem;\n  background-color: var(--highlight);\n  color: var(--grey10);\n}";
var styles$o = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"CodeSnippet-module_root__DwI00","copy":"CodeSnippet-module_copy__evfwO","icon":"CodeSnippet-module_icon__D6dmB","notCopied":"CodeSnippet-module_notCopied__J2bl4","copied":"CodeSnippet-module_copied__8xo5B"};
styleInject(css_248z$p);

var CodeSnippet = function CodeSnippet(props) {
  var showIcon = props.showIcon,
    src = props.src;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    copiedState = _useState2[0],
    setCopiedState = _useState2[1];
  setTimeout(function () {
    setCopiedState(false);
  }, 2.0 * 1000);
  return /*#__PURE__*/jsxs("div", {
    className: styles$o.root,
    children: [/*#__PURE__*/jsx(ReactJson, _objectSpread2(_objectSpread2({}, props), {}, {
      theme: "apathy:inverted",
      name: null,
      iconStyle: "triangle",
      indentWidth: 4,
      displayDataTypes: false,
      src: src
    })), showIcon && /*#__PURE__*/jsxs("div", {
      className: styles$o.copy,
      onClick: function onClick() {
        navigator.clipboard.writeText(JSON.stringify(src));
        setCopiedState(true);
      },
      children: [/*#__PURE__*/jsx(Copy, {
        className: styles$o.icon
      }), /*#__PURE__*/jsx("div", {
        className: copiedState ? styles$o.copied : styles$o.notCopied,
        children: copiedState ? 'Copied' : ''
      })]
    })]
  });
};
CodeSnippet.propTypes = {
  showIcon: propTypes$1.exports.bool
};
CodeSnippet.defaultProps = {
  showIcon: true
};

var css_248z$o = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.DatePicker-module_root__pWgbK {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  gap: 0.5rem;\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_label__TaavL {\n  font-weight: 400;\n  font-size: 0.75rem;\n  color: var(--black);\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_container__mDxYJ {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  background: var(--white);\n  border: 0.0625rem solid #d9d9d9;\n  border-radius: 0.25rem;\n  border: 0.0625rem solid var(--grey5);\n  padding: 0.75rem 1rem;\n  cursor: pointer;\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_container__mDxYJ .DatePicker-module_placeholder__bJ4zY {\n  font-weight: 400;\n  font-size: 1rem;\n  color: var(--grey1);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_container__mDxYJ .DatePicker-module_value__Dzh9C {\n  font-weight: 400;\n  font-size: 1rem;\n  color: var(--black);\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_container__mDxYJ .DatePicker-module_value__Dzh9C span {\n  font-weight: 500;\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_container__mDxYJ .DatePicker-module_input__Xnk6R {\n  display: none;\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_container__mDxYJ .DatePicker-module_down-arrow__Bsna6 {\n  transform: rotate(270deg);\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_container__mDxYJ .DatePicker-module_up-arrow__yjk9M {\n  transform: rotate(90deg);\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_disabled__lloGH {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  background: var(--grey10);\n  border: 0.0625rem solid #d9d9d9;\n  border-radius: 0.25rem;\n  border: 0.0625rem solid var(--grey5);\n  padding: 0.75rem 1rem;\n  cursor: pointer;\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_disabled__lloGH .DatePicker-module_down-arrow__Bsna6 {\n  transform: rotate(270deg);\n  fill: var(--grey3);\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_disabled__lloGH .DatePicker-module_placeholder__bJ4zY {\n  font-weight: 400;\n  font-size: 1rem;\n  color: var(--grey3);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.DatePicker-module_root__pWgbK.DatePicker-module_open__7ff-- {\n  border-color: var(--highlight);\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_error__mp88e {\n  border: 0.0938rem solid var(--error);\n}\n.DatePicker-module_root__pWgbK .DatePicker-module_error-text__wxtb- {\n  font-weight: 400;\n  font-size: 0.75rem;\n  line-height: 0.9375rem;\n  color: var(--error);\n}\n\n.DatePicker-module_popper__EFyrT {\n  display: none;\n  background: var(--white);\n  border: 0.0625rem solid #d9d9d9;\n  box-shadow: 0px 0.5rem 1.25rem rgba(24, 24, 24, 0.08);\n  border-radius: 0.25rem;\n  overflow: auto;\n}\n.DatePicker-module_popper__EFyrT.DatePicker-module_open__7ff-- {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  position: absolute;\n}";
var styles$n = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"DatePicker-module_error__mp88e","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"DatePicker-module_root__pWgbK","label":"DatePicker-module_label__TaavL","container":"DatePicker-module_container__mDxYJ","placeholder":"DatePicker-module_placeholder__bJ4zY","value":"DatePicker-module_value__Dzh9C","input":"DatePicker-module_input__Xnk6R","down-arrow":"DatePicker-module_down-arrow__Bsna6","up-arrow":"DatePicker-module_up-arrow__yjk9M","disabled":"DatePicker-module_disabled__lloGH","open":"DatePicker-module_open__7ff--","error-text":"DatePicker-module_error-text__wxtb-","popper":"DatePicker-module_popper__EFyrT"};
styleInject(css_248z$o);

var isMaxRangeExceeded = function isMaxRangeExceeded(_ref) {
  var maxRange = _ref.maxRange,
    selectedRange = _ref.selectedRange;
  if (maxRange === null) {
    return false;
  }
  var value = maxRange.value,
    type = maxRange.type;
  var unix = selectedRange.unix;
  var _unix = _slicedToArray(unix, 2),
    firstDateInRange = _unix[0],
    secondDateInRange = _unix[1];
  var diffInMonth = differenceInMonths(fromUnixTime(secondDateInRange), fromUnixTime(firstDateInRange));
  var diffInDays = differenceInDays(fromUnixTime(secondDateInRange), fromUnixTime(firstDateInRange));
  if (type === 'months') {
    return diffInMonth <= value && diffInDays < value * 30;
  }
  if (type === 'days') {
    return diffInDays <= value;
  }
  return false;
};

var DatePicker = function DatePicker(props) {
  // eslint-disable-next-line object-curly-newline
  var placeholder = props.placeholder,
    label = props.label,
    range = props.range,
    onApply = props.onApply,
    disabledDates = props.disabledDates,
    maxRange = props.maxRange,
    value = props.value,
    disabled = props.disabled;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = useState(function () {
      return {
        dates: [],
        unix: []
      };
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedRange = _useState4[0],
    setSelectedRange = _useState4[1];
  var _useState5 = useState(function () {
      return '';
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedDate = _useState6[0],
    setSelectedDate = _useState6[1];
  var _useState7 = useState(function () {
      return '';
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var datePickerRef = useRef();
  var sDate = fromUnixTime(value);
  var displayValue = '';
  if (!range && value) {
    var _sDate$getMonth$toStr;
    displayValue = " ".concat(sDate.getDate(), " ").concat(MONTHS[(_sDate$getMonth$toStr = sDate.getMonth().toString()) === null || _sDate$getMonth$toStr === void 0 ? void 0 : _sDate$getMonth$toStr.substring(0, 3)], " ").concat(sDate.getFullYear());
  }
  var _useFloating = useFloating({
      open: open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [offset(5), flip({
        padding: 8
      }), size({
        apply: function apply(_ref) {
          var rects = _ref.rects,
            availableHeight = _ref.availableHeight,
            elements = _ref.elements;
          Object.assign(elements.floating.style, {
            width: "".concat(rects.reference.width, "px"),
            maxHeight: "".concat(availableHeight, "px")
          });
        },
        padding: 8
      })]
    }),
    x = _useFloating.x,
    y = _useFloating.y,
    reference = _useFloating.reference,
    floating = _useFloating.floating,
    strategy = _useFloating.strategy,
    context = _useFloating.context;
  useOutsideClickListener(floating, function () {
    return setOpen(false);
  });
  var _useInteractions = useInteractions([useClick(context, {
      enabled: !disabled
    }), useDismiss(context)]),
    getReferenceProps = _useInteractions.getReferenceProps,
    getFloatingProps = _useInteractions.getFloatingProps;
  var apply = function apply() {
    if (selectedRange.dates.length === 2) {
      if (!isMaxRangeExceeded({
        maxRange: maxRange,
        selectedRange: selectedRange
      })) {
        setError('Invalid range of dates');
        setOpen(false);
        return;
      }
      setError('');
      onApply(selectedRange.unix);
      setOpen(false);
    } else {
      onApply(selectedDate.unix);
      setOpen(false);
    }
  };
  var calenderProps = {
    selectedDate: selectedDate,
    setSelectedDate: setSelectedDate,
    selectedRange: selectedRange,
    setSelectedRange: setSelectedRange,
    range: range,
    onApply: function onApply() {
      apply();
    },
    disabledDates: disabledDates
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$n.root,
    ref: datePickerRef,
    children: [label && /*#__PURE__*/jsx("span", {
      className: styles$n.label,
      children: label
    }), /*#__PURE__*/jsxs("div", _objectSpread2(_objectSpread2({
      ref: reference,
      className: classes(styles$n.container, disabled ? styles$n.disabled : '', open ? styles$n.open : '', error ? styles$n.error : '')
    }, getReferenceProps()), {}, {
      children: [!displayValue && /*#__PURE__*/jsx("span", {
        className: styles$n.placeholder,
        children: placeholder
      }), displayValue && /*#__PURE__*/jsxs("span", {
        className: styles$n.value,
        children: ["Selected Date: ", /*#__PURE__*/jsx("span", {
          children: displayValue
        })]
      }), /*#__PURE__*/jsx("input", {
        className: styles$n.input,
        value: displayValue
      }), /*#__PURE__*/jsx(Arrow, {
        className: classes(open ? styles$n['up-arrow'] : styles$n['down-arrow'])
      })]
    })), error && /*#__PURE__*/jsx("div", {
      className: styles$n['error-text'],
      children: error
    }), /*#__PURE__*/jsx(Popper, {
      open: open,
      wrapperid: "datePicker-popper",
      children: open && /*#__PURE__*/jsx("div", _objectSpread2(_objectSpread2({}, getFloatingProps({
        role: 'group',
        ref: floating,
        onKeyDown: function onKeyDown(event) {
          if (event.key === 'Tab') {
            setOpen(false);
          }
        },
        style: {
          position: strategy,
          top: y !== null && y !== void 0 ? y : 0,
          left: x !== null && x !== void 0 ? x : 0
        }
      })), {}, {
        className: classes(styles$n.popper, open ? styles$n.open : ''),
        children: /*#__PURE__*/jsx(Calender, _objectSpread2({}, calenderProps))
      }))
    })]
  });
};
DatePicker.propTypes = {
  placeholder: propTypes$1.exports.string,
  label: propTypes$1.exports.string,
  range: propTypes$1.exports.bool,
  onApply: propTypes$1.exports.func,
  value: propTypes$1.exports.string,
  disabled: propTypes$1.exports.bool,
  disabledDates: propTypes$1.exports.arrayOf(propTypes$1.exports.string),
  maxRange: propTypes$1.exports.shape({
    value: propTypes$1.exports.number,
    type: propTypes$1.exports.string
  })
};
DatePicker.defaultProps = {
  placeholder: '',
  label: '',
  range: false,
  onApply: null,
  disabled: false,
  disabledDates: [],
  maxRange: null,
  value: ''
};

var css_248z$n = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.HierarchyItem-module_root__xmuT5 {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  flex: 1;\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_header__f6M5W {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem;\n  cursor: pointer;\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_header__f6M5W .HierarchyItem-module_icon__8cxN- {\n  transform: rotate(-90deg);\n  width: 1.5rem;\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_header__f6M5W .HierarchyItem-module_title__CiLbz {\n  flex: 1 1 auto;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_header__f6M5W:hover {\n  background: var(--background);\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_header__f6M5W:hover .HierarchyItem-module_icon__8cxN-,\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_header__f6M5W:hover .HierarchyItem-module_title__CiLbz,\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_header__f6M5W:hover .HierarchyItem-module_title__CiLbz svg {\n  color: var(--highlight);\n  fill: var(--highlight);\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_body__Ki7zD {\n  display: none;\n  flex: 1 0 auto;\n  padding: 0px 0rem 0px 0.25rem;\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_body__Ki7zD .HierarchyItem-module_tail__6j167 {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  flex: 0 0 1.6rem;\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_body__Ki7zD .HierarchyItem-module_tail__6j167::after {\n  content: \"\";\n  display: block;\n  margin: auto;\n  width: 1px;\n  flex: 1;\n  background: var(--grey1);\n}\n.HierarchyItem-module_root__xmuT5 .HierarchyItem-module_body__Ki7zD .HierarchyItem-module_children__LEvjl {\n  flex: 1 0 auto;\n}\n.HierarchyItem-module_root__xmuT5.HierarchyItem-module_open__z-239 > .HierarchyItem-module_header__f6M5W .HierarchyItem-module_icon__8cxN- {\n  transform: none;\n}\n.HierarchyItem-module_root__xmuT5.HierarchyItem-module_open__z-239 > .HierarchyItem-module_body__Ki7zD {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  gap: 0.25rem;\n  height: auto;\n}";
var styles$m = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"HierarchyItem-module_root__xmuT5","header":"HierarchyItem-module_header__f6M5W","icon":"HierarchyItem-module_icon__8cxN-","title":"HierarchyItem-module_title__CiLbz","body":"HierarchyItem-module_body__Ki7zD","tail":"HierarchyItem-module_tail__6j167","children":"HierarchyItem-module_children__LEvjl","open":"HierarchyItem-module_open__z-239"};
styleInject(css_248z$n);

var HierarchyItem = function HierarchyItem(props) {
  var defaultOpen = props.defaultOpen,
    iconPlacement = props.iconPlacement,
    title = props.title,
    children = props.children,
    _onClick = props.onClick;
  var _useState = useState(defaultOpen),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  return /*#__PURE__*/jsxs("div", {
    className: classes(styles$m.root, open ? styles$m.open : ''),
    children: [/*#__PURE__*/jsxs("div", {
      role: "button",
      className: styles$m.header,
      onClick: function onClick() {
        setOpen(function (prevState) {
          var newState = !prevState;
          _onClick(newState);
          return newState;
        });
      },
      children: [iconPlacement === 'left' && /*#__PURE__*/jsx(Caret, {
        className: styles$m.icon
      }), /*#__PURE__*/jsx("span", {
        className: styles$m.title,
        children: title
      }), iconPlacement === 'right' && /*#__PURE__*/jsx(Caret, {
        className: styles$m.icon
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$m.body,
      children: [/*#__PURE__*/jsx("div", {
        className: styles$m.tail
      }), /*#__PURE__*/jsx("div", {
        className: styles$m.children,
        children: children
      })]
    })]
  });
};
HierarchyItem.propTypes = {
  iconPlacement: propTypes$1.exports.oneOf(['left', 'right', 'none']),
  title: propTypes$1.exports.string,
  defaultOpen: propTypes$1.exports.bool,
  onClick: propTypes$1.exports.func
};
HierarchyItem.defaultProps = {
  iconPlacement: 'left',
  title: null,
  defaultOpen: false,
  onClick: function onClick() {}
};

var css_248z$m = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.HierarchyBrowser-module_root__j3ioY {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  width: 20rem;\n  position: relative;\n}\n.HierarchyBrowser-module_root__j3ioY .HierarchyBrowser-module_header__b9The {\n  padding: 0.5rem;\n  background: var(--dark-grey);\n  color: var(--white);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.HierarchyBrowser-module_root__j3ioY .HierarchyBrowser-module_body__EUy5V {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  overflow: auto;\n}\n.HierarchyBrowser-module_root__j3ioY .HierarchyBrowser-module_item__YXgKC {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 0.25rem;\n}\n.HierarchyBrowser-module_root__j3ioY .HierarchyBrowser-module_item__YXgKC .HierarchyBrowser-module_item-icon__U1YXT {\n  width: 1rem;\n}\n.HierarchyBrowser-module_root__j3ioY::after {\n  position: absolute;\n  right: 0;\n  content: \"\";\n  width: 1px;\n  height: 100%;\n  background: var(--grey4);\n}\n.HierarchyBrowser-module_root__j3ioY:hover::after {\n  width: 3px;\n  cursor: col-resize;\n}";
var styles$l = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"HierarchyBrowser-module_root__j3ioY","header":"HierarchyBrowser-module_header__b9The","body":"HierarchyBrowser-module_body__EUy5V","item":"HierarchyBrowser-module_item__YXgKC","item-icon":"HierarchyBrowser-module_item-icon__U1YXT"};
styleInject(css_248z$m);

var BORDER_SIZE = 4;
var MIN_WIDTH = 220;
var MAX_WIDTH = document.documentElement.getBoundingClientRect().width;
var Title = function Title(props) {
  var item = props.item;
  var Icon = null;
  switch (item.id) {
    case 'database':
    case 'schema':
    case 'object':
      Icon = Server;
      break;
  }
  return /*#__PURE__*/jsxs("span", {
    className: styles$l.item,
    children: [Icon && /*#__PURE__*/jsx(Icon, {
      className: styles$l['item-icon']
    }), /*#__PURE__*/jsx("span", {
      className: styles$l['item-title'],
      children: item === null || item === void 0 ? void 0 : item.title
    }), /*#__PURE__*/jsxs("span", {
      className: styles$l['item-count'],
      children: ["(", item === null || item === void 0 ? void 0 : item.count, ")"]
    })]
  });
};
var HierarchyBrowser = function HierarchyBrowser(props) {
  var className = props.className,
    metadata = props.metadata,
    onItemClick = props.onItemClick;
  var browserRef = useRef(null);
  useResize({
    ref: browserRef,
    styles: {
      MIN_WIDTH: MIN_WIDTH,
      MAX_WIDTH: MAX_WIDTH,
      BORDER_SIZE: BORDER_SIZE
    }
  });
  var handleItemClick = function handleItemClick(item, pathString) {
    return function (open) {
      onItemClick(item, pathString, open);
    };
  };
  var renderTree = function renderTree(data) {
    var pathString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (data == null) {
      return null;
    }
    var hasChildren = (data === null || data === void 0 ? void 0 : data.list) != null;
    return /*#__PURE__*/jsx(HierarchyItem, {
      title: /*#__PURE__*/jsx(Title, {
        item: data
      }),
      iconPlacement: hasChildren ? 'left' : 'none',
      onClick: handleItemClick(data, pathString),
      children: hasChildren && data.list.map(function (item, idx) {
        return renderTree(item, "".concat(pathString).concat(pathString.length > 0 ? '.' : '', "list[").concat(idx, "]"));
      })
    });
  };
  return /*#__PURE__*/jsxs("div", {
    ref: browserRef,
    className: classes(styles$l.root, className),
    children: [/*#__PURE__*/jsx("div", {
      className: styles$l.header,
      children: "Browser"
    }), /*#__PURE__*/jsx("div", {
      className: styles$l.body,
      children: renderTree(metadata)
    })]
  });
};
HierarchyBrowser.propTypes = {
  className: propTypes$1.exports.string,
  metadata: propTypes$1.exports.objectOf({
    title: propTypes$1.exports.string,
    id: propTypes$1.exports.string,
    count: propTypes$1.exports.number,
    list: propTypes$1.exports.array
  }),
  onItemClick: propTypes$1.exports.func
};
HierarchyBrowser.defaultProps = {
  className: '',
  metadata: {},
  onItemClick: function onItemClick() {}
};

var css_248z$l = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.TextField-module_root__cxliV {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.TextField-module_root__cxliV label {\n  width: 100%;\n  max-width: 100%;\n  font-weight: 400;\n  font-size: 0.75rem;\n  line-height: 1.125rem;\n  letter-spacing: 0.32px;\n  color: var(--grey);\n  height: 100%;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0rem 0.5rem;\n  max-width: 100%;\n  width: 100%;\n  border-color: var(--grey4);\n  border-style: solid;\n  border-radius: 0.25rem;\n  height: 100%;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr .TextField-module_icon__ZP1kq {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem*=component] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] {\n  flex: 1;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB {\n  -moz-appearance: textfield;\n  flex: 1;\n  background-color: transparent;\n  border: none;\n  font-weight: 400;\n  font-size: 0.875rem;\n  line-height: 1.125rem;\n  letter-spacing: 0.16px;\n  color: var(--black);\n  width: 100%;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB::-webkit-outer-spin-button, .TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB:focus {\n  outline: none;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB:disabled {\n  background: var(--grey9);\n  color: var(--grey3);\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB.TextField-module_sm__NtUhK {\n  padding: 0.5rem 0rem;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB.TextField-module_md__X9UkD {\n  padding: 0.688rem 0rem;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr > [data-elem=component2] .TextField-module_input__XtpAB.TextField-module_lg__CnIeo {\n  padding: 1rem 0rem;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr.TextField-module_type-textarea__pzmyo {\n  padding: 0;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr.TextField-module_type-textarea__pzmyo > [data-elem=component2] .TextField-module_input__XtpAB {\n  resize: vertical;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr.TextField-module_type-textarea__pzmyo > [data-elem=component2] .TextField-module_input__XtpAB.TextField-module_md__X9UkD {\n  padding: 0.313rem 0.75rem;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr.TextField-module_type-textarea__pzmyo > [data-elem=component2] .TextField-module_input__XtpAB.TextField-module_lg__CnIeo {\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr:focus-within {\n  border: 0.063rem solid var(--info);\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr:focus-within.TextField-module_feedback-error__Co5mv {\n  border-color: var(--error);\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr.TextField-module_border-default__lIsd3 {\n  border-width: 0.063rem;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr.TextField-module_border-bottom__78YVX {\n  border-width: 0rem 0rem 0.063rem 0rem;\n}\n.TextField-module_root__cxliV label .TextField-module_input-wrapper__jQiRr.TextField-module_border-none__o0wUl {\n  border-width: 0rem;\n}\n.TextField-module_root__cxliV .TextField-module_bottom__T-Irz {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  min-height: 2rem;\n  width: 100%;\n  gap: 1rem;\n  color: var(--grey3);\n  font-size: 0.75rem;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.TextField-module_root__cxliV .TextField-module_bottom__T-Irz .TextField-module_feedback__-Un1k {\n  flex: 1;\n  margin-right: auto;\n}\n.TextField-module_root__cxliV .TextField-module_bottom__T-Irz .TextField-module_feedback__-Un1k.TextField-module_feedback-error__Co5mv {\n  color: var(--error);\n  fill: var(--error);\n}\n.TextField-module_root__cxliV .TextField-module_bottom__T-Irz .TextField-module_feedback__-Un1k.TextField-module_feedback-success__TI4mz {\n  color: var(--success);\n  fill: var(--success);\n}\n.TextField-module_root__cxliV .TextField-module_bottom__T-Irz .TextField-module_count__aVqOg {\n  text-align: right;\n  margin-left: auto;\n}\n.TextField-module_root__cxliV .TextField-module_bottom__T-Irz .TextField-module_count__aVqOg.TextField-module_exceeded__9eaex {\n  color: var(--error);\n}";
var styles$k = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"TextField-module_root__cxliV","input-wrapper":"TextField-module_input-wrapper__jQiRr","icon":"TextField-module_icon__ZP1kq","input":"TextField-module_input__XtpAB","sm":"TextField-module_sm__NtUhK","md":"TextField-module_md__X9UkD","lg":"TextField-module_lg__CnIeo","type-textarea":"TextField-module_type-textarea__pzmyo","feedback-error":"TextField-module_feedback-error__Co5mv","border-default":"TextField-module_border-default__lIsd3","border-bottom":"TextField-module_border-bottom__78YVX","border-none":"TextField-module_border-none__o0wUl","bottom":"TextField-module_bottom__T-Irz","feedback":"TextField-module_feedback__-Un1k","feedback-success":"TextField-module_feedback-success__TI4mz","count":"TextField-module_count__aVqOg","exceeded":"TextField-module_exceeded__9eaex"};
styleInject(css_248z$l);

var TextField = /*#__PURE__*/forwardRef(function TextField(props, inputRef) {
  var _inputValue$length;
  var id = props.id,
    name = props.name,
    label = props.label,
    placeholder = props.placeholder,
    type = props.type,
    value = props.value,
    defaultValue = props.defaultValue,
    onBlur = props.onBlur,
    onChange = props.onChange,
    size = props.size,
    border = props.border,
    LeftComponent = props.LeftComponent,
    RightComponent = props.RightComponent,
    className = props.className,
    disabled = props.disabled,
    inputProps = props.inputProps,
    feedback = props.feedback,
    count = props.count,
    feedbackAndCount = props.feedbackAndCount;
  var _useRef = useRef(value !== undefined),
    isControlled = _useRef.current;

  // for uncontrolled input
  var _useState = useState(defaultValue),
    _useState2 = _slicedToArray(_useState, 2),
    uncontrolledValue = _useState2[0],
    setUncontrolledValue = _useState2[1];
  var handleChange = function handleChange(event) {
    var _inputHelper = inputHelper(event),
      fieldValue = _inputHelper.fieldValue;
    if (isControlled) {
      onChange(event, fieldValue);
    } else {
      setUncontrolledValue(fieldValue);
    }
  };
  var inputValue = isControlled ? value !== null && value !== void 0 ? value : '' : uncontrolledValue;
  var Input = /*#__PURE__*/createElement(type === 'textarea' ? 'textarea' : 'input', _objectSpread2({
    id: id,
    name: name,
    disabled: disabled,
    type: type,
    defaultValue: defaultValue,
    placeholder: placeholder,
    onBlur: onBlur,
    'data-elem': 'input',
    ref: inputRef,
    value: inputValue,
    onChange: handleChange,
    className: classes(styles$k[size], styles$k.input)
  }, inputProps));
  return /*#__PURE__*/jsxs("div", {
    className: classes(styles$k.root, className),
    children: [/*#__PURE__*/jsxs("label", {
      children: [label, /*#__PURE__*/jsx(BaseCell, {
        className: classes(styles$k['input-wrapper'], styles$k["border-".concat(border)], styles$k["type-".concat(type)], feedback != null ? styles$k["feedback-".concat(feedback === null || feedback === void 0 ? void 0 : feedback.type)] : ''),
        component1: LeftComponent && /*#__PURE__*/jsx(LeftComponent, {}),
        component2: Input,
        component3: RightComponent && /*#__PURE__*/jsx(RightComponent, {})
      })]
    }), feedbackAndCount && /*#__PURE__*/jsxs("div", {
      className: styles$k.bottom,
      children: [feedback != null && /*#__PURE__*/jsx("div", {
        "data-elem": "feedback",
        className: classes(styles$k.feedback, styles$k["feedback-".concat(feedback.type)]),
        children: feedback.text
      }), (count === null || count === void 0 ? void 0 : count.limit) != null && /*#__PURE__*/jsxs("div", {
        "data-elem": "count",
        className: classes(styles$k.count, (inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) > count.limit ? styles$k.exceeded : ''),
        children: [(_inputValue$length = inputValue.length) !== null && _inputValue$length !== void 0 ? _inputValue$length : 0, "/", count.limit]
      })]
    })]
  });
});
TextField.propTypes = {
  id: propTypes$1.exports.string,
  name: propTypes$1.exports.string,
  disabled: propTypes$1.exports.bool,
  label: propTypes$1.exports.oneOfType([propTypes$1.exports.string, propTypes$1.exports.number]),
  placeholder: propTypes$1.exports.oneOfType([propTypes$1.exports.string, propTypes$1.exports.number]),
  type: propTypes$1.exports.oneOf(['text', 'email', 'password', 'number', 'textarea']),
  value: propTypes$1.exports.oneOfType([propTypes$1.exports.string, propTypes$1.exports.number]),
  defaultValue: propTypes$1.exports.string,
  onChange: propTypes$1.exports.func,
  size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
  border: propTypes$1.exports.oneOf(['default', 'bottom', 'none']),
  LeftComponent: propTypes$1.exports.node,
  RightComponent: propTypes$1.exports.node,
  // eslint-disable-next-line react/forbid-prop-types
  inputProps: propTypes$1.exports.object,
  count: propTypes$1.exports.shape({
    limit: propTypes$1.exports.number
  }),
  feedback: propTypes$1.exports.shape({
    text: propTypes$1.exports.node,
    type: propTypes$1.exports.oneOf(['error', 'success', 'default'])
  }),
  feedbackAndCount: propTypes$1.exports.bool
};
TextField.defaultProps = {
  id: null,
  name: null,
  disabled: false,
  label: '',
  placeholder: '',
  type: 'text',
  value: undefined,
  defaultValue: '',
  onChange: function onChange() {},
  size: 'md',
  border: 'default',
  LeftComponent: null,
  RightComponent: null,
  inputProps: {},
  count: null,
  feedback: null,
  feedbackAndCount: false
};

var css_248z$k = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.CheckBox-module_root__Kl-MJ {\n  cursor: pointer;\n  gap: 10px;\n}\n.CheckBox-module_root__Kl-MJ.CheckBox-module_position-left__-J-Kn {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.CheckBox-module_root__Kl-MJ.CheckBox-module_position-right__E2z34 {\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: flex-end;\n  align-items: center;\n}\n.CheckBox-module_root__Kl-MJ input[type=checkbox] {\n  opacity: 0;\n  z-index: 1;\n  position: absolute;\n  width: 1px;\n  height: 1px;\n}\n.CheckBox-module_root__Kl-MJ.CheckBox-module_disabled__GCLi9 {\n  cursor: default;\n}\n.CheckBox-module_root__Kl-MJ .CheckBox-module_icon__-tYzW {\n  display: inline-block;\n}\n.CheckBox-module_root__Kl-MJ .CheckBox-module_icon__-tYzW.CheckBox-module_icon-sm__uPZWz {\n  width: 1rem;\n  height: 1rem;\n}\n.CheckBox-module_root__Kl-MJ .CheckBox-module_icon__-tYzW.CheckBox-module_icon-md__vS4-L {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.CheckBox-module_root__Kl-MJ .CheckBox-module_icon__-tYzW.CheckBox-module_icon-lg__ABtTM {\n  width: 1.5rem;\n  height: 2rem;\n}\n.CheckBox-module_root__Kl-MJ [data-elem=label] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}";
var styles$j = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"CheckBox-module_root__Kl-MJ","position-left":"CheckBox-module_position-left__-J-Kn","position-right":"CheckBox-module_position-right__E2z34","disabled":"CheckBox-module_disabled__GCLi9","icon":"CheckBox-module_icon__-tYzW","icon-sm":"CheckBox-module_icon-sm__uPZWz","icon-md":"CheckBox-module_icon-md__vS4-L","icon-lg":"CheckBox-module_icon-lg__ABtTM"};
styleInject(css_248z$k);

var Checkbox = function Checkbox(props) {
  // eslint-disable-next-line object-curly-newline
  var label = props.label,
    onChange = props.onChange,
    defaultChecked = props.defaultChecked,
    checked = props.checked,
    position = props.position,
    size = props.size,
    className = props.className,
    disabled = props.disabled;
  var _useRef = useRef(checked !== undefined),
    isControlled = _useRef.current;

  // for uncontrolled input
  var _useState = useState(defaultChecked),
    _useState2 = _slicedToArray(_useState, 2),
    uncontrolledChecked = _useState2[0],
    setUncontrolledChecked = _useState2[1];
  var handleChange = function handleChange(event) {
    var _inputHelper = inputHelper(event),
      fieldValue = _inputHelper.fieldValue;
    if (isControlled) {
      onChange(event, fieldValue);
    } else {
      setUncontrolledChecked(fieldValue);
    }
  };
  var isChecked = isControlled ? checked : uncontrolledChecked;
  return /*#__PURE__*/jsxs("label", {
    className: classes(styles$j.root, styles$j["position-".concat(position)], className, disabled ? styles$j.disabled : ''),
    children: [/*#__PURE__*/jsx("input", _objectSpread2(_objectSpread2({
      disabled: disabled,
      type: "checkbox",
      defaultChecked: defaultChecked
    }, isControlled ? {
      checked: checked
    } : {}), {}, {
      onChange: handleChange
    })), isChecked ? /*#__PURE__*/jsx(CheckboxIcon.Checked, {
      "data-elem": "icon",
      className: classes(styles$j["icon-".concat(size)], styles$j.icon)
    }) : /*#__PURE__*/jsx(CheckboxIcon.UnChecked, {
      "data-elem": "icon",
      className: classes(styles$j["icon-".concat(size)], styles$j.icon)
    }), label && /*#__PURE__*/jsx("span", {
      "data-elem": "label",
      children: label
    })]
  });
};
Checkbox.propTypes = {
  disabled: propTypes$1.exports.bool,
  label: propTypes$1.exports.string,
  defaultChecked: propTypes$1.exports.bool,
  checked: propTypes$1.exports.bool,
  position: propTypes$1.exports.oneOf(['left', 'right']),
  size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
  onChange: propTypes$1.exports.func
};
Checkbox.defaultProps = {
  disabled: false,
  label: null,
  defaultChecked: false,
  checked: undefined,
  position: 'right',
  size: 'sm',
  onChange: function onChange() {}
};

var css_248z$j = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Radio-module_root__kkJ8b {\n  cursor: pointer;\n  gap: 10px;\n}\n.Radio-module_root__kkJ8b.Radio-module_position-left__-1sCs {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.Radio-module_root__kkJ8b.Radio-module_position-right__J-HKs {\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: flex-end;\n  align-items: center;\n}\n.Radio-module_root__kkJ8b.Radio-module_disabled__324Eo {\n  cursor: default;\n}\n.Radio-module_root__kkJ8b input[type=radio] {\n  opacity: 0;\n  z-index: 1;\n  position: absolute;\n  width: 1px;\n  height: 1px;\n}\n.Radio-module_root__kkJ8b .Radio-module_icon__hNiVk {\n  display: inline-block;\n}\n.Radio-module_root__kkJ8b .Radio-module_icon__hNiVk.Radio-module_icon-sm__ypLCQ {\n  width: 1rem;\n  height: 1rem;\n}\n.Radio-module_root__kkJ8b .Radio-module_icon__hNiVk.Radio-module_icon-md__Hxsom {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.Radio-module_root__kkJ8b .Radio-module_icon__hNiVk.Radio-module_icon-lg__JCq-7 {\n  width: 1.5rem;\n  height: 2rem;\n}\n.Radio-module_root__kkJ8b [data-elem=label] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}";
var styles$i = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Radio-module_root__kkJ8b","position-left":"Radio-module_position-left__-1sCs","position-right":"Radio-module_position-right__J-HKs","disabled":"Radio-module_disabled__324Eo","icon":"Radio-module_icon__hNiVk","icon-sm":"Radio-module_icon-sm__ypLCQ","icon-md":"Radio-module_icon-md__Hxsom","icon-lg":"Radio-module_icon-lg__JCq-7"};
styleInject(css_248z$j);

var Radio = function Radio(props) {
  // eslint-disable-next-line object-curly-newline
  var label = props.label,
    checked = props.checked,
    defaultChecked = props.defaultChecked,
    onChange = props.onChange,
    position = props.position,
    size = props.size,
    className = props.className,
    disabled = props.disabled;
  var _useRef = useRef(checked !== undefined),
    isControlled = _useRef.current;

  // for uncontrolled input
  var _useState = useState(defaultChecked),
    _useState2 = _slicedToArray(_useState, 2),
    uncontrolledChecked = _useState2[0],
    setUncontrolledChecked = _useState2[1];
  var handleChange = function handleChange(event) {
    var _inputHelper = inputHelper(event),
      fieldValue = _inputHelper.fieldValue;
    if (isControlled) {
      onChange(event, fieldValue);
    } else {
      setUncontrolledChecked(fieldValue);
    }
  };
  var isChecked = isControlled ? checked : uncontrolledChecked;
  return /*#__PURE__*/jsxs("label", {
    className: classes(styles$i.root, styles$i["position-".concat(position)], className, disabled ? styles$i.disabled : ''),
    children: [/*#__PURE__*/jsx("input", {
      disabled: disabled,
      type: "radio",
      checked: isChecked,
      onChange: handleChange
    }), isChecked ? /*#__PURE__*/jsx(RadioIcon.Checked, {
      "data-elem": "icon",
      className: classes(styles$i["icon-".concat(size)], styles$i.icon)
    }) : /*#__PURE__*/jsx(RadioIcon.UnChecked, {
      "data-elem": "icon",
      className: classes(styles$i["icon-".concat(size)], styles$i.icon)
    }), label && /*#__PURE__*/jsx("span", {
      "data-elem": "label",
      children: label
    })]
  });
};
Radio.propTypes = {
  disabled: propTypes$1.exports.bool,
  label: propTypes$1.exports.string,
  checked: propTypes$1.exports.bool,
  defaultChecked: propTypes$1.exports.bool,
  position: propTypes$1.exports.oneOf(['left', 'right']),
  size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
  onChange: propTypes$1.exports.func
};
Radio.defaultProps = {
  disabled: false,
  label: null,
  checked: undefined,
  defaultChecked: false,
  position: 'left',
  size: 'sm',
  onChange: function onChange() {}
};

var css_248z$i = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Dropdown-module_root__mkOMI {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  gap: 0.5rem;\n  position: relative;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n  max-width: 100%;\n}\n.Dropdown-module_root__mkOMI .Dropdown-module_label__YkFsR {\n  font-size: 0.75rem;\n  color: var(--grey);\n  width: auto;\n}\n.Dropdown-module_root__mkOMI .Dropdown-module_header__EOpC- {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  max-width: 100%;\n  position: relative;\n}\n.Dropdown-module_root__mkOMI .Dropdown-module_header__EOpC- .Dropdown-module_select__Thb6Y {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  width: 25rem;\n  max-width: 100%;\n  gap: 0.5rem;\n  background: var(--white);\n  outline: none;\n  border: 1px solid var(--grey5);\n  border-radius: 0.25rem;\n  padding: 0.75rem 0.75rem 0.75rem 1rem;\n  cursor: pointer;\n}\n.Dropdown-module_root__mkOMI .Dropdown-module_header__EOpC- .Dropdown-module_select__Thb6Y .Dropdown-module_placeholder__B2kmJ {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  color: var(--black);\n}\n.Dropdown-module_root__mkOMI .Dropdown-module_header__EOpC- .Dropdown-module_select__Thb6Y .Dropdown-module_icon__YsokN {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.Dropdown-module_root__mkOMI .Dropdown-module_header__EOpC- .Dropdown-module_input__LYIeG {\n  position: absolute;\n  opacity: 0;\n  width: 1px;\n  height: 1px;\n}\n.Dropdown-module_root__mkOMI .Dropdown-module_header__EOpC- .Dropdown-module_input__LYIeG:focus + .Dropdown-module_select__Thb6Y {\n  border-color: var(--highlight);\n}\n.Dropdown-module_root__mkOMI.Dropdown-module_open__dEH0H .Dropdown-module_header__EOpC- {\n  border-color: var(--highlight);\n}\n.Dropdown-module_root__mkOMI.Dropdown-module_disabled__eLZhs .Dropdown-module_select__Thb6Y {\n  background: var(--grey10);\n  cursor: not-allowed;\n}\n\n.Dropdown-module_body__BDZmr {\n  display: none;\n  position: absolute;\n  top: calc(100% + 0.5rem);\n  z-index: 999;\n  background: var(--white);\n  width: auto;\n  border: 0.063rem solid var(--grey5);\n  box-shadow: 0rem 0.5rem 1.25rem rgba(24, 24, 24, 0.08);\n  border-radius: 0.25rem;\n  padding: 1rem;\n  overflow-y: auto;\n  min-height: 4rem;\n  outline: none;\n}\n.Dropdown-module_body__BDZmr.Dropdown-module_open__dEH0H {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n}";
var styles$h = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Dropdown-module_root__mkOMI","label":"Dropdown-module_label__YkFsR","header":"Dropdown-module_header__EOpC-","select":"Dropdown-module_select__Thb6Y","placeholder":"Dropdown-module_placeholder__B2kmJ","icon":"Dropdown-module_icon__YsokN","input":"Dropdown-module_input__LYIeG","open":"Dropdown-module_open__dEH0H","disabled":"Dropdown-module_disabled__eLZhs","body":"Dropdown-module_body__BDZmr"};
styleInject(css_248z$i);

var Dropdown = /*#__PURE__*/forwardRef(function Dropdown(props, inputRef) {
  var _selectedOptions$map, _ref2, _selectedOptions$;
  // eslint-disable-next-line object-curly-newline
  var className = props.className,
    popperClassName = props.popperClassName,
    value = props.value,
    onChange = props.onChange,
    children = props.children,
    label = props.label,
    placeholder = props.placeholder,
    multi = props.multi,
    disabled = props.disabled;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    activeIndex = _useState4[0],
    setActiveIndex = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedIndex = _useState6[0],
    setSelectedIndex = _useState6[1];
  var listRef = useRef([]);
  var isControlled = value !== undefined;

  // for uncontrolled input
  var _useState7 = useState(value),
    _useState8 = _slicedToArray(_useState7, 2),
    uncontrolledValue = _useState8[0],
    setUncontrolledValue = _useState8[1];
  var _useFloating = useFloating({
      open: open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [offset(5), flip({
        padding: 8
      }), size({
        apply: function apply(_ref) {
          var rects = _ref.rects,
            availableHeight = _ref.availableHeight,
            elements = _ref.elements;
          Object.assign(elements.floating.style, {
            width: "".concat(rects.reference.width, "px"),
            minWidth: 'fit-content',
            maxHeight: "".concat(availableHeight, "px")
          });
        },
        padding: 8
      })]
    }),
    x = _useFloating.x,
    y = _useFloating.y,
    reference = _useFloating.reference,
    floating = _useFloating.floating,
    strategy = _useFloating.strategy,
    context = _useFloating.context;
  var _useInteractions = useInteractions([useClick(context, {
      enabled: !disabled
    }), useRole(context, {
      role: 'listbox'
    }), useListNavigation(context, {
      listRef: listRef,
      activeIndex: activeIndex,
      selectedIndex: selectedIndex,
      onNavigate: setActiveIndex,
      focusItemOnHover: true
    }), useTypeahead(context, {
      listRef: listRef,
      onMatch: open ? setActiveIndex : setSelectedIndex,
      activeIndex: activeIndex,
      selectedIndex: selectedIndex,
      findMatch: function findMatch(list, typedString) {
        return list.find(function (elem) {
          var _elem$textContent;
          return (elem === null || elem === void 0 ? void 0 : (_elem$textContent = elem.textContent) === null || _elem$textContent === void 0 ? void 0 : _elem$textContent.toLowerCase().indexOf(typedString)) === 0;
        });
      }
    }), useDismiss(context)]),
    getReferenceProps = _useInteractions.getReferenceProps,
    getFloatingProps = _useInteractions.getFloatingProps,
    getItemProps = _useInteractions.getItemProps;
  var onSelect = function onSelect(event) {
    var _inputHelper = inputHelper(event),
      dataset = _inputHelper.dataset;
    var itemValue = dataset.value,
      index = dataset.index,
      selected = dataset.selected,
      elem = dataset.elem;
    if (elem === 'dropdown-item') {
      setSelectedIndex(parseInt(index, 10));
      if (multi) {
        if (isControlled) {
          if (selected === 'true') {
            onChange === null || onChange === void 0 ? void 0 : onChange(event, value.filter(function (val) {
              return val !== itemValue;
            }));
          } else {
            onChange === null || onChange === void 0 ? void 0 : onChange(event, [].concat(_toConsumableArray(value !== null && value !== void 0 ? value : []), [itemValue]));
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if (selected === 'true') {
            setUncontrolledValue(uncontrolledValue.filter(function (val) {
              return val !== itemValue;
            }));
          } else {
            setUncontrolledValue([].concat(_toConsumableArray(uncontrolledValue !== null && uncontrolledValue !== void 0 ? uncontrolledValue : []), [itemValue]));
          }
        }
      } else {
        if (isControlled) {
          onChange(event, itemValue.toString());
        } else {
          setUncontrolledValue(itemValue.toString());
        }
        setActiveIndex(null);
        setOpen(false);
      }
    }
  };
  var onNavigate = function onNavigate(event) {
    var selectKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
    if (selectKey) {
      event.stopPropagation();
      onSelect(event);
    }
  };
  var onClick = function onClick(event) {
    onSelect(event);
  };
  useImperativeHandle(inputRef, function () {
    return {
      value: function value() {
        var _inputRef$current$val, _inputRef$current$val2, _inputRef$current$val3, _inputValue$;
        var inputValue = (_inputRef$current$val = (_inputRef$current$val2 = inputRef.current.value) === null || _inputRef$current$val2 === void 0 ? void 0 : (_inputRef$current$val3 = _inputRef$current$val2.split) === null || _inputRef$current$val3 === void 0 ? void 0 : _inputRef$current$val3.call(_inputRef$current$val2, ', ')) !== null && _inputRef$current$val !== void 0 ? _inputRef$current$val : [];
        if (multi) {
          return inputRef;
        }
        return (_inputValue$ = inputValue === null || inputValue === void 0 ? void 0 : inputValue[0]) !== null && _inputValue$ !== void 0 ? _inputValue$ : null;
      }
    };
  }, []);
  useOutsideClickListener(floating, function () {
    return setOpen(false);
  });
  var selectedOptions = useMemo(function () {
    var inputValue = uncontrolledValue;
    if (isControlled) {
      inputValue = value;
    }
    var options = [];
    if (inputValue != null && inputValue !== '') {
      children === null || children === void 0 ? void 0 : children.forEach(function (child) {
        var _inputValue$toString$, _inputValue, _inputValue$toString, _inputValue$toString$2, _inputValue$toString$3, _child$props, _child$props$value, _child$props$value$to, _inputValue2, _child$props2, _child$props2$value, _child$props2$value$t;
        if (multi && ((_inputValue$toString$ = (_inputValue = inputValue) === null || _inputValue === void 0 ? void 0 : (_inputValue$toString = _inputValue.toString) === null || _inputValue$toString === void 0 ? void 0 : (_inputValue$toString$2 = _inputValue$toString.call(_inputValue)) === null || _inputValue$toString$2 === void 0 ? void 0 : (_inputValue$toString$3 = _inputValue$toString$2.indexOf) === null || _inputValue$toString$3 === void 0 ? void 0 : _inputValue$toString$3.call(_inputValue$toString$2, child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : (_child$props$value = _child$props.value) === null || _child$props$value === void 0 ? void 0 : (_child$props$value$to = _child$props$value.toString) === null || _child$props$value$to === void 0 ? void 0 : _child$props$value$to.call(_child$props$value))) !== null && _inputValue$toString$ !== void 0 ? _inputValue$toString$ : -1) !== -1 || !multi && ((_inputValue2 = inputValue) === null || _inputValue2 === void 0 ? void 0 : _inputValue2.toString()) === (child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : (_child$props2$value = _child$props2.value) === null || _child$props2$value === void 0 ? void 0 : (_child$props2$value$t = _child$props2$value.toString) === null || _child$props2$value$t === void 0 ? void 0 : _child$props2$value$t.call(_child$props2$value))) {
          var _child$props3, _child$props4, _child$props4$value, _child$props4$value$t;
          options.push({
            title: child === null || child === void 0 ? void 0 : (_child$props3 = child.props) === null || _child$props3 === void 0 ? void 0 : _child$props3.title,
            value: child === null || child === void 0 ? void 0 : (_child$props4 = child.props) === null || _child$props4 === void 0 ? void 0 : (_child$props4$value = _child$props4.value) === null || _child$props4$value === void 0 ? void 0 : (_child$props4$value$t = _child$props4$value.toString) === null || _child$props4$value$t === void 0 ? void 0 : _child$props4$value$t.call(_child$props4$value)
          });
        }
      });
    }
    return options;
  }, [value, uncontrolledValue, multi]);
  var items = children.map(function (child, index) {
    var selected = false;
    if (selectedOptions.find(function (option) {
      var _child$props5, _child$props5$value, _child$props5$value$t;
      return option.value === (child === null || child === void 0 ? void 0 : (_child$props5 = child.props) === null || _child$props5 === void 0 ? void 0 : (_child$props5$value = _child$props5.value) === null || _child$props5$value === void 0 ? void 0 : (_child$props5$value$t = _child$props5$value.toString) === null || _child$props5$value$t === void 0 ? void 0 : _child$props5$value$t.call(_child$props5$value));
    })) {
      selected = true;
    }
    return /*#__PURE__*/React__default.cloneElement(child, _objectSpread2({}, getItemProps({
      onKeyDown: onNavigate,
      dataAttrs: {
        'data-index': index
      },
      selected: selected,
      ref: function ref(node) {
        listRef.current[index] = node;
      }
    })));
  });
  return /*#__PURE__*/jsxs("div", {
    className: classes(className, styles$h.root, open ? styles$h.open : '', disabled ? styles$h.disabled : ''),
    children: [label && /*#__PURE__*/jsx("div", {
      "data-elem": "label",
      className: styles$h.label,
      children: /*#__PURE__*/jsx("span", {
        children: label
      })
    }), /*#__PURE__*/jsxs("div", _objectSpread2(_objectSpread2({
      "data-elem": "header",
      className: styles$h.header,
      ref: reference
    }, getReferenceProps()), {}, {
      children: [/*#__PURE__*/jsx("input", {
        ref: inputRef,
        disabled: disabled,
        tabIndex: 0,
        className: styles$h.input,
        onKeyDown: function onKeyDown(event) {
          var validKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
          if (validKey) {
            setOpen(true);
          }
        },
        value: selectedOptions === null || selectedOptions === void 0 ? void 0 : (_selectedOptions$map = selectedOptions.map(function (option) {
          return option === null || option === void 0 ? void 0 : option.value;
        })) === null || _selectedOptions$map === void 0 ? void 0 : _selectedOptions$map.join(', ')
      }), /*#__PURE__*/jsxs("div", {
        "data-elem": "select",
        role: "button",
        className: styles$h.select,
        children: [/*#__PURE__*/jsx("span", {
          "data-elem": "placeholder",
          className: styles$h.placeholder,
          children: (_ref2 = (selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) > 1 ? "".concat(selectedOptions.length, " options selected") : selectedOptions === null || selectedOptions === void 0 ? void 0 : (_selectedOptions$ = selectedOptions[0]) === null || _selectedOptions$ === void 0 ? void 0 : _selectedOptions$.title) !== null && _ref2 !== void 0 ? _ref2 : placeholder
        }), /*#__PURE__*/jsx(Caret, {
          "data-elem": "icon",
          className: classes(styles$h.icon, styles$h['drop-icon'])
        })]
      })]
    })), /*#__PURE__*/jsx(Popper, {
      open: open,
      wrapperId: "dropdown-popper",
      children: open && /*#__PURE__*/jsx(FloatingFocusManager, {
        context: context,
        initialFocus: selectedIndex,
        children: /*#__PURE__*/jsx("div", _objectSpread2(_objectSpread2({}, getFloatingProps({
          'data-elem': 'body',
          role: 'group',
          ref: floating,
          onKeyDown: function onKeyDown(event) {
            if (event.key === 'Tab') {
              setOpen(false);
            }
          },
          style: {
            position: strategy,
            top: y !== null && y !== void 0 ? y : 0,
            left: x !== null && x !== void 0 ? x : 0
          },
          onClick: onClick,
          className: classes(styles$h.body, popperClassName, open ? styles$h.open : '')
        })), {}, {
          children: items
        }))
      })
    })]
  });
});
Dropdown.propTypes = {
  popperClassName: propTypes$1.exports.string,
  className: propTypes$1.exports.string,
  disabled: propTypes$1.exports.bool,
  label: propTypes$1.exports.string,
  value: propTypes$1.exports.oneOfType([propTypes$1.exports.string, propTypes$1.exports.arrayOf(propTypes$1.exports.string)]),
  placeholder: propTypes$1.exports.string,
  // search: PropTypes.bool,
  // max: PropTypes.number,
  multi: propTypes$1.exports.bool,
  onChange: propTypes$1.exports.func
};
Dropdown.defaultProps = {
  popperClassName: '',
  className: '',
  disabled: false,
  label: null,
  value: undefined,
  placeholder: 'Select an option',
  // search: false,
  // max: null,
  multi: false,
  onChange: null
};

var css_248z$h = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.DropdownItem-module_root__su9HU {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 0.75rem;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  color: var(--grey);\n  outline: none;\n}\n.DropdownItem-module_root__su9HU:hover, .DropdownItem-module_root__su9HU:focus {\n  background: var(--grey6);\n}\n.DropdownItem-module_root__su9HU.DropdownItem-module_selected__Iwplc {\n  background: var(--info-bg);\n}";
var styles$g = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"DropdownItem-module_root__su9HU","selected":"DropdownItem-module_selected__Iwplc"};
styleInject(css_248z$h);

var DropdownItem = /*#__PURE__*/forwardRef(function DropdownItem(props, ref) {
  // eslint-disable-next-line object-curly-newline
  var title = props.title,
    value = props.value,
    variant = props.variant,
    selected = props.selected,
    onKeyDown = props.onKeyDown,
    onClick = props.onClick,
    dataAttrs = props.dataAttrs,
    className = props.className;
  var action = null;
  switch (variant) {
    case 'checkbox':
      action = /*#__PURE__*/jsx(Checkbox, {
        checked: selected
      });
      break;
    case 'radio':
      action = /*#__PURE__*/jsx("input", {
        type: "radio"
      });
      break;
  }
  return /*#__PURE__*/jsxs("div", _objectSpread2(_objectSpread2({
    ref: ref,
    className: classes(className, styles$g.root, selected ? styles$g.selected : ''),
    "data-elem": "dropdown-item",
    "data-variant": variant,
    "data-value": value,
    "data-selected": selected,
    onClick: onClick
  }, _objectSpread2({}, dataAttrs)), {}, {
    tabIndex: 0,
    role: "option",
    "aria-selected": selected,
    onKeyDown: onKeyDown,
    children: [action, /*#__PURE__*/jsx("span", {
      "data-elem": "title",
      children: title
    })]
  }));
});
DropdownItem.propTypes = {
  className: propTypes$1.exports.string,
  title: propTypes$1.exports.node,
  variant: propTypes$1.exports.oneOf(['default', 'checkbox', 'radio']),
  selected: propTypes$1.exports.bool,
  // eslint-disable-next-line react/forbid-prop-types
  dataAttrs: propTypes$1.exports.object
};
DropdownItem.defaultProps = {
  className: '',
  title: '',
  variant: 'default',
  dataAttrs: {},
  selected: false
};

var css_248z$g = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.BaseModal-module_root__LxSI- {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  top: 50%;\n  left: 50%;\n  right: auto;\n  bottom: auto;\n  transform: translate(-50%, -50%);\n  max-height: 100%;\n  width: 50%;\n  position: fixed;\n  background: #ffffff;\n  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.13);\n  border-radius: 5px;\n  outline: none;\n}\n.BaseModal-module_root__LxSI- .BaseModal-module_body__lpl93 {\n  overflow-y: scroll;\n  padding: 0 15px;\n}\n.BaseModal-module_root__LxSI- .BaseModal-module_header__NnvhY,\n.BaseModal-module_root__LxSI- .BaseModal-module_footer__y6uXQ {\n  padding: 15px;\n}\n.BaseModal-module_root__LxSI- .BaseModal-module_footer__y6uXQ {\n  margin-top: auto;\n}\n.BaseModal-module_root__LxSI- .BaseModal-module_closeModal__93jQs {\n  position: absolute;\n  right: 20px;\n  top: 20px;\n}\n.BaseModal-module_root__LxSI- .BaseModal-module_closeModal__93jQs .BaseModal-module_closeIcon__-Q4wM {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--black);\n}";
var styles$f = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"BaseModal-module_root__LxSI-","body":"BaseModal-module_body__lpl93","header":"BaseModal-module_header__NnvhY","footer":"BaseModal-module_footer__y6uXQ","closeModal":"BaseModal-module_closeModal__93jQs","closeIcon":"BaseModal-module_closeIcon__-Q4wM"};
styleInject(css_248z$g);

var BaseModal = function BaseModal(props) {
  var className = props.className,
    renderHeader = props.renderHeader,
    children = props.children,
    renderFooter = props.renderFooter,
    toggle = props.toggle,
    open = props.open;
  var ref = useRef(null);
  useOutsideClickListener(ref, function () {
    return toggle(false);
  });
  if (open) {
    return /*#__PURE__*/jsx(Popper, {
      open: open,
      transparent: false,
      id: "base-modal-popper",
      children: /*#__PURE__*/jsxs("div", {
        className: classes(styles$f.root, className),
        ref: ref,
        children: [renderHeader && /*#__PURE__*/jsx("div", {
          "data-elem": "header",
          className: styles$f.header,
          children: renderHeader
        }), /*#__PURE__*/jsx("div", {
          "data-elem": "body",
          className: styles$f.body,
          children: children
        }), renderFooter && /*#__PURE__*/jsx("div", {
          "data-elem": "footer",
          className: styles$f.footer,
          children: renderFooter
        }), /*#__PURE__*/jsx("div", {
          className: styles$f.closeModal,
          onClick: toggle,
          children: /*#__PURE__*/jsx(Cross, {
            className: styles$f.closeIcon
          })
        })]
      })
    });
  }
  return null;
};
BaseModal.propTypes = {
  className: propTypes$1.exports.string,
  renderHeader: propTypes$1.exports.element,
  renderFooter: propTypes$1.exports.element,
  toggle: propTypes$1.exports.func
};
BaseModal.defaultProps = {
  className: '',
  renderHeader: null,
  renderFooter: null,
  toggle: function toggle() {}
};

var css_248z$f = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.PageHeader-module_root__RW2kD {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%;\n  background-color: transparent;\n  gap: 4px;\n}\n.PageHeader-module_root__RW2kD.PageHeader-module_theme-dark__X5zgh {\n  color: var(--white);\n}\n.PageHeader-module_root__RW2kD.PageHeader-module_theme-dark__X5zgh .PageHeader-module_breadcrumb__v0tnM [data-elem=breadcrumb-item-active] {\n  color: var(--white);\n}\n.PageHeader-module_root__RW2kD.PageHeader-module_theme-light__Tercn {\n  color: var(--dark-grey);\n}\n.PageHeader-module_root__RW2kD .PageHeader-module_description__G3-qZ {\n  color: var(--grey);\n}\n.PageHeader-module_root__RW2kD .PageHeader-module_contents__w0Y7e {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.PageHeader-module_root__RW2kD .PageHeader-module_contents__w0Y7e .PageHeader-module_left__fqL7M,\n.PageHeader-module_root__RW2kD .PageHeader-module_contents__w0Y7e .PageHeader-module_right__KgzBp {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 10px;\n}\n.PageHeader-module_root__RW2kD .PageHeader-module_contents__w0Y7e .PageHeader-module_left__fqL7M .PageHeader-module_title__sDcrr {\n  font-size: 2.25rem;\n  font-weight: 600;\n  line-height: 3.375rem;\n}\n.PageHeader-module_root__RW2kD .PageHeader-module_contents__w0Y7e .PageHeader-module_left__fqL7M .PageHeader-module_chip__pr-6S {\n  font-weight: 500;\n  background: var(--highlight);\n  color: var(--white);\n}\n.PageHeader-module_root__RW2kD .PageHeader-module_description__G3-qZ {\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5rem;\n}\n\n.PageHeader-module_download__RCFoC,\n.PageHeader-module_calender__ecLCu {\n  width: 1.5rem;\n  height: 1.5rem;\n}";
var styles$e = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"PageHeader-module_root__RW2kD","theme-dark":"PageHeader-module_theme-dark__X5zgh","breadcrumb":"PageHeader-module_breadcrumb__v0tnM","theme-light":"PageHeader-module_theme-light__Tercn","description":"PageHeader-module_description__G3-qZ","contents":"PageHeader-module_contents__w0Y7e","left":"PageHeader-module_left__fqL7M","right":"PageHeader-module_right__KgzBp","title":"PageHeader-module_title__sDcrr","chip":"PageHeader-module_chip__pr-6S","download":"PageHeader-module_download__RCFoC","calender":"PageHeader-module_calender__ecLCu"};
styleInject(css_248z$f);

var PageHeader = function PageHeader(props) {
  var theme = props.theme,
    title = props.title,
    description = props.description,
    children = props.children,
    chipTitle = props.chipTitle,
    RightAction = props.rightAction,
    crumbsProps = props.crumbsProps;
  return /*#__PURE__*/jsxs("div", {
    className: classes(styles$e.root, styles$e["theme-".concat(theme)]),
    children: [/*#__PURE__*/jsx("div", {
      className: styles$e.breadcrumb,
      children: /*#__PURE__*/jsx(BreadCrumbs, _objectSpread2({}, _objectSpread2(_objectSpread2({}, crumbsProps), {}, {
        className: styles$e.breadcrumb
      })))
    }), /*#__PURE__*/jsxs("div", {
      className: styles$e.contents,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$e.left,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$e.title,
          children: title
        }), chipTitle && /*#__PURE__*/jsx(Chip, {
          className: styles$e.chip,
          size: "sm",
          title: chipTitle,
          radius: "ellipse",
          variant: "status"
        })]
      }), RightAction && /*#__PURE__*/jsx("div", {
        className: styles$e.right,
        children: /*#__PURE__*/jsx(RightAction, {})
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$e.description,
      children: description
    }), children]
  });
};
PageHeader.propTypes = {
  title: propTypes$1.exports.string,
  description: propTypes$1.exports.string,
  theme: propTypes$1.exports.oneOf(['dark', 'light']),
  chipTitle: propTypes$1.exports.string,
  crumbsProps: propTypes$1.exports.shape(BreadCrumbs.propTypes),
  rightAction: propTypes$1.exports.node
};
PageHeader.defaultProps = {
  title: 'Page Header',
  description: '',
  theme: 'light',
  chipTitle: null,
  crumbsProps: {},
  rightAction: null
};

/* eslint-disable max-classes-per-file */
var Page = /*#__PURE__*/_createClass(function Page(_ref) {
  var number = _ref.number,
    _ref$active = _ref.active,
    active = _ref$active === void 0 ? false : _ref$active,
    _ref$ellipsis = _ref.ellipsis,
    ellipsis = _ref$ellipsis === void 0 ? false : _ref$ellipsis;
  _classCallCheck(this, Page);
  this.number = number;
  this.ellipsis = ellipsis;
  this.active = active;
});
var PaginationList = /*#__PURE__*/_createClass(function PaginationList(_ref2) {
  var curr = _ref2.curr,
    total = _ref2.total,
    _ref2$limit = _ref2.limit,
    limit = _ref2$limit === void 0 ? 7 : _ref2$limit;
  _classCallCheck(this, PaginationList);
  this.pages = getPagination(curr, total, limit);
});
function getPagination(curr, total, limit) {
  if (total <= limit) {
    return _toConsumableArray(Array(total).keys()).map(function (page) {
      return new Page({
        number: page + 1,
        active: page + 1 === curr
      });
    });
  }
  var pages = [new Page({
    number: 1
  })];
  if (curr - 1 <= limit - 3) {
    for (var i = 1; i <= limit - 3; i++) {
      pages.push(new Page({
        number: 1 + i,
        active: 1 + i === curr
      }));
      if (i === limit - 3) {
        pages.push(new Page({
          number: 1 + i + 1,
          ellipsis: true
        }));
      }
    }
  } else if (total - curr <= limit - 3) {
    for (var _i = limit - 3; _i > 0; _i--) {
      if (_i === limit - 3) {
        pages.push(new Page({
          number: total - _i - 1,
          ellipsis: true
        }));
      }
      pages.push(new Page({
        number: total - _i
      }));
    }
  } else {
    var mod = (curr - (limit - 2)) % (limit - 4) || limit - 4;
    var first = curr - (mod - 1);
    for (var _i2 = 0; _i2 < limit - 4; _i2++) {
      if (_i2 === 0) {
        pages.push(new Page({
          number: first + _i2 - 1,
          ellipsis: true
        }));
      }
      pages.push(new Page({
        number: first + _i2
      }));
      if (_i2 === limit - 4 - 1) {
        pages.push(new Page({
          number: first + _i2 + 1,
          ellipsis: true
        }));
      }
    }
  }
  pages.push(new Page({
    number: total
  }));
  return pages;
}

var css_248z$e = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Pagination-module_root__ieicG {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: stretch;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  padding: 0.625rem 2.125rem;\n  background: var(--dark-grey);\n  margin-top: auto;\n  width: 100%;\n  height: 3.5rem;\n  overflow: auto;\n  transition-property: background-color, color, bottom, width;\n  transition-duration: 0.33s;\n  transition-timing-function: ease-out;\n}\n.Pagination-module_root__ieicG::-webkit-scrollbar {\n  display: none;\n}\n.Pagination-module_root__ieicG.Pagination-module_floating__gP2b8 {\n  background: var(--dark-grey-o-85);\n  position: absolute;\n  border-radius: 6.25rem;\n  width: 82%;\n  bottom: 3rem;\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv,\n.Pagination-module_root__ieicG .Pagination-module_pagination__aQxKw,\n.Pagination-module_root__ieicG .Pagination-module_jump-to-page__-6AxX,\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  height: 100%;\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv {\n  display: none;\n  gap: 0.75rem;\n  background-color: var(--grey);\n  padding: 0;\n  border-radius: 0.3125rem;\n}\n@media (min-width: 992px) {\n  .Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv > [data-elem*=component] {\n  overflow: hidden;\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv > [data-elem=component2] {\n  display: flex;\n  flex: 1 0 auto;\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv .Pagination-module_text__ND-Go {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  height: 100%;\n  display: block;\n  padding: 0.5rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--white);\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv .Pagination-module_dropdown__607D- > [data-elem=header] > [data-elem=select] {\n  height: 2.375rem;\n  width: auto;\n  min-width: -webkit-fit-content;\n  min-width: -moz-fit-content;\n  min-width: fit-content;\n  padding: 0.625rem;\n  background-color: var(--grey);\n  border: none;\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv .Pagination-module_dropdown__607D- > [data-elem=header] > [data-elem=select] > [data-elem=placeholder] {\n  color: var(--white);\n  font-size: 0.875rem;\n}\n.Pagination-module_root__ieicG .Pagination-module_row-switcher__nZkYv .Pagination-module_dropdown__607D- > [data-elem=header] > [data-elem=select] > svg {\n  fill: var(--white);\n  width: 0.813rem;\n  height: 0.813rem;\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 1.25rem;\n  flex: 1 1 100%;\n}\n@media (min-width: 992px) {\n  .Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c {\n    flex: 1 1 60%;\n  }\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_button__Rzuor.Pagination-module_disable__hNaU1 {\n  pointer-events: none;\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_button__Rzuor [data-elem=title] {\n  color: var(--white);\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_button__Rzuor .Pagination-module_icon__PBYkw {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_pageSelect__O-ABx {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.625rem;\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_pageSelect__O-ABx .Pagination-module_number__-5138 {\n  cursor: pointer;\n  border-radius: 50%;\n  background-color: #e0e0e0;\n  color: var(--black);\n  width: 2.313rem;\n  line-height: 2.313rem;\n  text-align: center;\n  font-size: 1rem;\n  border: 1px solid transparent;\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_pageSelect__O-ABx .Pagination-module_number__-5138:not([data-active=true]) {\n  display: none;\n}\n@media (min-width: 768px) {\n  .Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_pageSelect__O-ABx .Pagination-module_number__-5138:not([data-active=true]) {\n    display: block;\n  }\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_pageSelect__O-ABx .Pagination-module_number__-5138:hover {\n  border: 1px solid var(--highlight);\n  color: var(--highlight);\n  background: var(--background);\n}\n.Pagination-module_root__ieicG .Pagination-module_page-numbers__2Ms7c > .Pagination-module_pageSelect__O-ABx .Pagination-module_number__-5138.Pagination-module_active__dNUtF {\n  background-color: var(--highlight);\n  color: var(--white);\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT {\n  display: none;\n  padding: 0;\n  flex: 0 1 20%;\n  background: transparent;\n}\n@media (min-width: 992px) {\n  .Pagination-module_root__ieicG .Pagination-module_form__zFQlT {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n  }\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT > [data-elem*=component] {\n  width: 100%;\n  height: 100%;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT > [data-elem*=component] > * {\n  height: 100%;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX {\n  width: 100%;\n  background: transparent;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: stretch;\n  gap: 0.75rem;\n  padding: 0;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX > [data-elem*=component] {\n  overflow: hidden;\n  height: 100%;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX .Pagination-module_button__Rzuor {\n  background-color: var(--grey);\n  height: 100%;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX .Pagination-module_button__Rzuor [data-elem=left] {\n  overflow: hidden;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX .Pagination-module_button__Rzuor [data-elem=left] [data-elem=title] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX .Pagination-module_button__Rzuor .Pagination-module_icon__PBYkw {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--white);\n  flex-shrink: 0;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX .Pagination-module_inputbox__lr2C- {\n  width: 5rem;\n  max-width: 100%;\n  height: 100%;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX .Pagination-module_inputbox__lr2C- [data-elem=base-cell] {\n  border-radius: 0.313rem;\n  background-color: var(--grey);\n  color: var(--white);\n  border-color: var(--grey);\n  width: 4.875rem;\n}\n.Pagination-module_root__ieicG .Pagination-module_form__zFQlT .Pagination-module_jump-to-page__-6AxX .Pagination-module_inputbox__lr2C- [data-elem=base-cell] [data-elem=input] {\n  text-align: center;\n  color: var(--white);\n  background-color: var(--grey);\n  border: none;\n  width: 100%;\n}\n\n.Pagination-module_pagination-test__-HOe8 {\n  height: 80%;\n  width: 100%;\n  overflow: scroll;\n  background-color: powderblue;\n  display: flex;\n  flex-direction: column;\n}\n\n.Pagination-module_dropdown-popper__-6mRt {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  padding: 0.25rem;\n}\n.Pagination-module_dropdown-popper__-6mRt::-webkit-scrollbar {\n  display: none;\n}";
var styles$d = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Pagination-module_root__ieicG","floating":"Pagination-module_floating__gP2b8","row-switcher":"Pagination-module_row-switcher__nZkYv","pagination":"Pagination-module_pagination__aQxKw","jump-to-page":"Pagination-module_jump-to-page__-6AxX","form":"Pagination-module_form__zFQlT","text":"Pagination-module_text__ND-Go","dropdown":"Pagination-module_dropdown__607D-","page-numbers":"Pagination-module_page-numbers__2Ms7c","button":"Pagination-module_button__Rzuor","disable":"Pagination-module_disable__hNaU1","icon":"Pagination-module_icon__PBYkw","pageSelect":"Pagination-module_pageSelect__O-ABx","number":"Pagination-module_number__-5138","active":"Pagination-module_active__dNUtF","inputbox":"Pagination-module_inputbox__lr2C-","pagination-test":"Pagination-module_pagination-test__-HOe8","dropdown-popper":"Pagination-module_dropdown-popper__-6mRt"};
styleInject(css_248z$e);

var dropdownOptions = ['10', '25', '50', '100', '200', '250'];
var reducer = function reducer(state, _ref) {
  var type = _ref.type,
    payload = _ref.payload;
  switch (type) {
    case 'NEXT_PAGE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentPage: state.currentPage + 1
      });
    case 'PREV_PAGE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentPage: state.currentPage - 1
      });
    case 'SET_PAGE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentPage: payload
      });
    case 'SET_STEP':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        step: payload
      });
    case 'SET_TOTAL_PAGES':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        totalPages: payload
      });
    default:
      return state;
  }
};
var usePagination = function usePagination(props) {
  var _props$totalPages = props.totalPages,
    totalPages = _props$totalPages === void 0 ? null : _props$totalPages,
    _props$currentPage = props.currentPage,
    currentPage = _props$currentPage === void 0 ? null : _props$currentPage,
    _props$step = props.step,
    step = _props$step === void 0 ? 10 : _props$step;
  var _useReducer = useReducer(reducer, {
      totalPages: totalPages,
      currentPage: currentPage,
      step: step
    }),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    paginationState = _useReducer2[0],
    paginationDispatch = _useReducer2[1];
  useEffect(function () {
    if (paginationState.currentPage > totalPages && totalPages != null) {
      paginationDispatch({
        type: 'SET_PAGE',
        payload: totalPages
      });
    }
    paginationDispatch({
      type: 'SET_TOTAL_PAGES',
      payload: totalPages
    });
  }, [totalPages]);
  return [paginationState, paginationDispatch];
};
var Pagination = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
    floating = props.floating,
    paginationState = props.paginationState,
    paginationDispatch = props.paginationDispatch;
  var totalPages = paginationState.totalPages,
    currentPage = paginationState.currentPage,
    step = paginationState.step;
  var paginationList = new PaginationList({
    curr: currentPage,
    total: totalPages
  });
  var jumpPageRef = useRef(null);
  var _onChange = function onChange(action) {
    paginationDispatch(action);
  };
  useEffect(function () {
    props.onChange({
      currentPage: currentPage,
      step: step,
      totalPages: totalPages
    });
  }, [currentPage, step]);
  return /*#__PURE__*/jsxs("div", {
    ref: ref,
    className: classes(styles$d.root, className, floating ? styles$d.floating : ''),
    children: [/*#__PURE__*/jsx(BaseCell, {
      flexible: true,
      className: styles$d['row-switcher'],
      component1: /*#__PURE__*/jsx("span", {
        title: "Rows per page",
        className: styles$d.text,
        children: "Rows per page"
      }),
      component2: /*#__PURE__*/jsx(Dropdown, {
        className: styles$d.dropdown,
        popperClassName: styles$d['dropdown-popper'],
        value: step,
        placeholder: null,
        onChange: function onChange(e, newStep) {
          _onChange({
            type: 'SET_STEP',
            payload: newStep
          });
        },
        children: dropdownOptions.map(function (item) {
          return /*#__PURE__*/jsx(DropdownItem, {
            title: item,
            value: item
          }, item);
        })
      })
    }), /*#__PURE__*/jsxs("div", {
      className: styles$d['page-numbers'],
      children: [/*#__PURE__*/jsx(Button, {
        size: "auto",
        flexible: true,
        disabled: currentPage === 1,
        title: "Prev",
        onClick: function onClick() {
          _onChange({
            type: 'PREV_PAGE'
          });
        },
        className: classes(styles$d.button),
        leftComponent: function leftComponent() {
          return /*#__PURE__*/jsx(Chevron, {
            className: styles$d.icon,
            position: "left"
          });
        },
        variant: "text"
      }), /*#__PURE__*/jsx("div", {
        className: styles$d.pageSelect,
        children: paginationList.pages.map(function (page) {
          var active = currentPage === page.number;
          return /*#__PURE__*/jsx("span", {
            title: "Page ".concat(page.number),
            onClick: function onClick() {
              _onChange({
                type: 'SET_PAGE',
                payload: page.number
              });
            },
            "data-active": active,
            className: classes(active ? styles$d.active : '', styles$d.number),
            children: page.ellipsis ? '...' : page.number
          }, page.number);
        })
      }), /*#__PURE__*/jsx(Button, {
        size: "auto",
        flexible: true,
        disabled: currentPage === totalPages,
        title: "Next",
        onClick: function onClick() {
          _onChange({
            type: 'NEXT_PAGE'
          });
        },
        className: classes(styles$d.button),
        rightComponent: function rightComponent() {
          return /*#__PURE__*/jsx(Chevron, {
            className: styles$d.icon,
            position: "right"
          });
        },
        variant: "text"
      })]
    }), /*#__PURE__*/jsx(BaseCell, {
      flexible: true,
      className: styles$d.form,
      component1: /*#__PURE__*/jsx("form", {
        onSubmit: function onSubmit(e) {
          var _jumpPageRef$current;
          e.preventDefault();
          _onChange({
            type: 'SET_PAGE',
            payload: parseInt(jumpPageRef === null || jumpPageRef === void 0 ? void 0 : (_jumpPageRef$current = jumpPageRef.current) === null || _jumpPageRef$current === void 0 ? void 0 : _jumpPageRef$current.value, 10)
          });
        },
        children: /*#__PURE__*/jsx(BaseCell, {
          flexible: true,
          className: styles$d['jump-to-page'],
          component1: /*#__PURE__*/jsx(TextField, {
            inputProps: {
              min: 1,
              max: totalPages,
              required: true
            },
            ref: jumpPageRef,
            type: "number",
            className: styles$d.inputbox
          }),
          component2: /*#__PURE__*/jsx(Button, {
            title: "Jump to page",
            size: "medium",
            variant: "contained",
            className: styles$d.button,
            rightComponent: function rightComponent() {
              return /*#__PURE__*/jsx(Arrow, {
                className: styles$d.icon
              });
            }
          })
        })
      })
    })]
  });
});
Pagination.propTypes = {
  className: propTypes$1.exports.string,
  floating: propTypes$1.exports.bool,
  paginationState: propTypes$1.exports.shape({
    totalPages: propTypes$1.exports.number,
    currentPage: propTypes$1.exports.number,
    step: propTypes$1.exports.number
  }),
  paginationDispatch: propTypes$1.exports.func,
  onChange: propTypes$1.exports.func
};
Pagination.defaultProps = {
  className: '',
  floating: false,
  paginationState: {
    totalPages: null,
    currentPage: null,
    step: null
  },
  paginationDispatch: function paginationDispatch() {},
  onChange: function onChange() {}
};

var css_248z$d = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Stepper-module_root__cvNJm {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  position: relative;\n  z-index: 1;\n  gap: 0.5rem;\n  flex: 1;\n  cursor: default;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s:last-child {\n  flex: 0 1 auto;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s:last-child .Stepper-module_title__V9fw3::after {\n  display: none;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_left__BSaSz {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  width: 1.5rem;\n  height: 1.5rem;\n  background: var(--white);\n  border: 0.063rem solid var(--grey2);\n  border-radius: 2rem;\n  font-size: 1rem;\n  color: var(--grey2);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_left__BSaSz .Stepper-module_icon__HwVpw {\n  width: 0.75rem;\n  height: 0.75rem;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_left__BSaSz .Stepper-module_icon__HwVpw.Stepper-module_error-icon__TnLh- {\n  fill: var(--error);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_left__BSaSz .Stepper-module_icon__HwVpw.Stepper-module_completion-icon__Ahge- {\n  fill: var(--highlight);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_left__BSaSz .Stepper-module_progress__hBk0m {\n  position: absolute;\n  z-index: -1;\n  inset: -0.3rem;\n  border-radius: 2rem;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_left__BSaSz .Stepper-module_progress__hBk0m::after {\n  position: absolute;\n  content: \"\";\n  inset: 0.15rem;\n  background: white;\n  border-radius: 2rem;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_right__eFhp- {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex: 1;\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_right__eFhp- .Stepper-module_title__V9fw3 {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  gap: 0.75rem;\n  width: 100%;\n  font-size: 1rem;\n  color: var(--grey2);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_right__eFhp- .Stepper-module_title__V9fw3::after {\n  content: \"\";\n  flex: 1;\n  min-width: 1.5rem;\n  border-bottom: 0.063rem solid;\n  margin-top: 0.75rem;\n  border-bottom-color: var(--grey2);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s .Stepper-module_right__eFhp- .Stepper-module_description__DOJeD {\n  font-size: 0.75rem;\n  color: var(--grey2);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_active__38cZS .Stepper-module_left__BSaSz {\n  background: var(--highlight);\n  color: var(--white);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_active__38cZS .Stepper-module_left__BSaSz, .Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_completed__2KWB- .Stepper-module_left__BSaSz {\n  border-color: var(--highlight);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_active__38cZS .Stepper-module_right__eFhp- .Stepper-module_title__V9fw3, .Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_completed__2KWB- .Stepper-module_right__eFhp- .Stepper-module_title__V9fw3 {\n  color: var(--black);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_active__38cZS .Stepper-module_right__eFhp- .Stepper-module_description__DOJeD, .Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_completed__2KWB- .Stepper-module_right__eFhp- .Stepper-module_description__DOJeD {\n  color: var(--grey);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_completed__2KWB- .Stepper-module_right__eFhp- .Stepper-module_title__V9fw3::after {\n  border-bottom-color: var(--highlight);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_error__-Ti-0 .Stepper-module_left__BSaSz {\n  background: var(--white);\n  border-color: var(--error);\n  color: var(--error);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_error__-Ti-0 .Stepper-module_right__eFhp- .Stepper-module_title__V9fw3 {\n  color: var(--error);\n}\n.Stepper-module_root__cvNJm .Stepper-module_step__M5Y-s.Stepper-module_error__-Ti-0 .Stepper-module_right__eFhp- .Stepper-module_description__DOJeD {\n  color: rgba(var(--error), 0.6);\n}";
var styles$c = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"Stepper-module_error__-Ti-0","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Stepper-module_root__cvNJm","step":"Stepper-module_step__M5Y-s","title":"Stepper-module_title__V9fw3","left":"Stepper-module_left__BSaSz","icon":"Stepper-module_icon__HwVpw","error-icon":"Stepper-module_error-icon__TnLh-","completion-icon":"Stepper-module_completion-icon__Ahge-","progress":"Stepper-module_progress__hBk0m","right":"Stepper-module_right__eFhp-","description":"Stepper-module_description__DOJeD","active":"Stepper-module_active__38cZS","completed":"Stepper-module_completed__2KWB-"};
styleInject(css_248z$d);

var css_248z$c = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n:export {\n  white: var(--white);\n  black: var(--black);\n  dark-grey: var(--dark-grey);\n  dark-grey-o-85: var(--dark-grey-o-85);\n  grey: var(--grey);\n  grey1: var(--grey1);\n  grey2: var(--grey2);\n  grey3: var(--grey3);\n  grey4: var(--grey4);\n  grey5: var(--grey5);\n  grey6: var(--grey6);\n  grey7: var(--grey7);\n  grey8: var(--grey8);\n  grey9: var(--grey9);\n  grey10: var(--grey10);\n  highlight: var(--highlight);\n  dark-blue: var(--dark-blue);\n  background: var(--background);\n  banyan-blue: var(--banyan-blue);\n  banyan-orange: var(--banyan-orange);\n  banyan-pink: var(--banyan-pink);\n  banyan-gradient: var(--banyan-gradient);\n  error: var(--error);\n  error-bg: var(--error-bg);\n  error-outline: var(--error-outline);\n  success: var(--success);\n  success-bg: var(--success-bg);\n  success-outline: var(--success-outline);\n  warning: var(--warning);\n  warning-bg: var(--warning-bg);\n  warning-outline: var(--warning-outline);\n  info: var(--info);\n  info-bg: var(--info-bg);\n  info-outline: var(--info-outline);\n}";
styleInject(css_248z$c);

var Step = function Step(props) {
  var title = props.title,
    description = props.description,
    active = props.active,
    completion = props.completion,
    error = props.error,
    index = props.index;
  var display = /*#__PURE__*/jsx("span", {
    className: styles$c.text,
    children: index + 1
  });
  if (error === true) {
    display = /*#__PURE__*/jsx(Cross, {
      className: classes(styles$c.icon, styles$c['error-icon'])
    });
  } else if (completion === 1) {
    display = /*#__PURE__*/jsx(Tick, {
      className: classes(styles$c.icon, styles$c['completion-icon'])
    });
  }
  return /*#__PURE__*/jsxs("div", {
    className: classes(styles$c.step, active ? styles$c.active : '', completion === 1 ? styles$c.completed : '', error ? styles$c.error : ''),
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$c.left,
      children: [display, active === true && completion > 0 && completion < 1 && /*#__PURE__*/jsx("div", {
        className: styles$c.progress,
        style: {
          backgroundImage: "conic-gradient(".concat(css_248z$c.highlight, ", ").concat(completion * 100, "%, transparent 0%)")
        }
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$c.right,
      children: [/*#__PURE__*/jsx("span", {
        className: styles$c.title,
        children: title
      }), description != null && /*#__PURE__*/jsx("span", {
        className: styles$c.description,
        children: description
      })]
    })]
  });
};
var Stepper = function Stepper(props) {
  var steps = props.steps;
  return /*#__PURE__*/jsx("div", {
    className: styles$c.root,
    children: steps.map(function (step, index) {
      return /*#__PURE__*/jsx(Step, _objectSpread2(_objectSpread2({}, step), {}, {
        index: index,
        total: steps.length
      }), "".concat(step.title, "-").concat(step.description));
    })
  });
};
Stepper.propTypes = {
  steps: propTypes$1.exports.arrayOf(propTypes$1.exports.shape({
    title: propTypes$1.exports.string.isRequired,
    description: propTypes$1.exports.string,
    active: propTypes$1.exports.bool,
    completion: propTypes$1.exports.number,
    error: propTypes$1.exports.bool
  }))
};
Stepper.defaultProps = {
  steps: []
};

var SIZE_MAP = {
  sm: 9.063,
  md: 15.625,
  lg: 21.875
};
var TableColumn = /*#__PURE__*/_createClass(function TableColumn(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id,
    _ref$sort = _ref.sort,
    sort = _ref$sort === void 0 ? false : _ref$sort,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'md' : _ref$size,
    _ref$flexible = _ref.flexible,
    flexible = _ref$flexible === void 0 ? false : _ref$flexible,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$multiLine = _ref.multiLine,
    multiLine = _ref$multiLine === void 0 ? false : _ref$multiLine,
    _ref$sticky = _ref.sticky,
    sticky = _ref$sticky === void 0 ? null : _ref$sticky;
  _classCallCheck(this, TableColumn);
  this.title = title;
  this.id = id;
  this.sort = sort;
  this.size = size;
  this.sizeInRem = SIZE_MAP[size];
  if (flexible === 'true' || flexible === true) {
    this.flexible = true;
  } else {
    this.flexible = false;
  }
  this.style = style;
  this.multiLine = multiLine;
  this.sticky = sticky;
});

var css_248z$b = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.TableCell-module_root__0-5fC[data-elem=base-cell] {\n  background: var(--white);\n  border-bottom: 1px solid var(--grey4);\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell] > [data-elem*=component] {\n  overflow: hidden;\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell] > [data-elem*=component] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  flex: 1;\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell] > [data-elem*=component] .TableCell-module_cell-text__MqZRq {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  display: inline-block;\n  width: 100%;\n  font-size: 0.875rem;\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell].TableCell-module_header-cell__cDXlM {\n  background: var(--grey7);\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell].TableCell-module_header-cell__cDXlM .TableCell-module_cell-text__MqZRq {\n  font-weight: 600;\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell].TableCell-module_body-cell__Z2M7H .TableCell-module_cell-text__MqZRq.TableCell-module_multi-line__8cWJW {\n  white-space: normal;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  font-size: 0.75rem;\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell].TableCell-module_sticky-left__clzyD {\n  box-shadow: -2px -2px 4px rgba(166, 166, 166, 0.25), 2px 2px 4px rgba(166, 166, 166, 0.24);\n  position: -webkit-sticky;\n  position: sticky;\n  left: 0;\n}\n.TableCell-module_root__0-5fC[data-elem=base-cell].TableCell-module_sticky-right__U9Kgq {\n  box-shadow: -2px -2px 4px rgba(166, 166, 166, 0.25), 2px 2px 4px rgba(166, 166, 166, 0.24);\n  position: -webkit-sticky;\n  position: sticky;\n  right: 0;\n}";
var styles$b = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"TableCell-module_root__0-5fC","cell-text":"TableCell-module_cell-text__MqZRq","header-cell":"TableCell-module_header-cell__cDXlM","body-cell":"TableCell-module_body-cell__Z2M7H","multi-line":"TableCell-module_multi-line__8cWJW","sticky-left":"TableCell-module_sticky-left__clzyD","sticky-right":"TableCell-module_sticky-right__U9Kgq"};
styleInject(css_248z$b);

var TableCell = function TableCell(props) {
  var className = props.className,
    size = props.size,
    flexible = props.flexible,
    rounded = props.rounded,
    component1 = props.component1,
    component3 = props.component3,
    RootDOM = props.RootDOM,
    attrs = props.attrs,
    radius = props.radius,
    style = props.style,
    multiLine = props.multiLine,
    type = props.type,
    cellContent = props.cellContent,
    cellTitle = props.cellTitle,
    sticky = props.sticky;
  return /*#__PURE__*/jsx(BaseCell, {
    className: classes(styles$b.root, className, styles$b["".concat(type, "-cell")], styles$b["sticky-".concat(sticky)]),
    attrs: _objectSpread2({
      style: style
    }, attrs),
    size: size,
    flexible: flexible,
    rounded: rounded,
    component1: component1,
    component2: /*#__PURE__*/jsx("span", _objectSpread2(_objectSpread2({}, _objectSpread2(_objectSpread2({}, cellTitle != null ? {
      title: cellTitle
    } : {}), {}, {
      className: classes(styles$b['cell-text'], multiLine ? styles$b['multi-line'] : ''),
      style: style
    })), {}, {
      children: cellContent
    })),
    component3: component3,
    RootDOM: RootDOM,
    radius: radius
  });
};
TableCell.propTypes = _objectSpread2(_objectSpread2({}, BaseCell.propTypes), {}, {
  title: propTypes$1.exports.string,
  id: propTypes$1.exports.string,
  size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
  flexible: propTypes$1.exports.bool,
  sort: propTypes$1.exports.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: propTypes$1.exports.object,
  multiLine: propTypes$1.exports.bool,
  sticky: propTypes$1.exports.oneOf(['left', 'right', 'none']),
  cellContent: propTypes$1.exports.node,
  cellTitle: propTypes$1.exports.string
});
TableCell.defaultProps = _objectSpread2(_objectSpread2({}, BaseCell.defaultProps), {}, {
  cellContent: null,
  cellTitle: null
});

var css_248z$a = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.TableRow-module_root__tyJjH {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.TableRow-module_root__tyJjH.TableRow-module_header-row__p3gQZ {\n  background: var(--grey6);\n}\n.TableRow-module_root__tyJjH.TableRow-module_body-row__BzIwB {\n  background: var(--white);\n}\n.TableRow-module_root__tyJjH.TableRow-module_body-row__BzIwB:hover > [data-elem=base-cell] {\n  background: var(--info-bg);\n}\n.TableRow-module_root__tyJjH.TableRow-module_body-row__BzIwB.TableRow-module_selected__GJlEC > [data-elem=base-cell] {\n  background: var(--background);\n}";
var styles$a = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"TableRow-module_root__tyJjH","header-row":"TableRow-module_header-row__p3gQZ","body-row":"TableRow-module_body-row__BzIwB","selected":"TableRow-module_selected__GJlEC"};
styleInject(css_248z$a);

var TableRow = function TableRow(props) {
  var _headerData$map;
  var type = props.type,
    headerData = props.headerData,
    datum = props.datum,
    selected = props.selected,
    customCells = props.customCells,
    className = props.className,
    setActiveData = props.setActiveData;
  return /*#__PURE__*/jsx("tr", {
    "data-elem": "table-row",
    className: classes(className, styles$a.root, selected ? styles$a.selected : '', styles$a["".concat(type, "-row")]),
    children: headerData === null || headerData === void 0 ? void 0 : (_headerData$map = headerData.map) === null || _headerData$map === void 0 ? void 0 : _headerData$map.call(headerData, function (item) {
      var _customCells$type;
      var cellContent = null;
      if (type === 'header') {
        cellContent = item.title;
      } else if (type === 'body') {
        cellContent = datum === null || datum === void 0 ? void 0 : datum[item.id];
      }
      var cellProps = _objectSpread2(_objectSpread2(_objectSpread2({}, props), item), {}, {
        setActiveData: setActiveData,
        key: item.id,
        datum: datum,
        cellContent: cellContent,
        cellTitle: cellContent,
        type: type
      });
      var CustomCell = customCells === null || customCells === void 0 ? void 0 : (_customCells$type = customCells[type]) === null || _customCells$type === void 0 ? void 0 : _customCells$type[item.id];
      if (CustomCell != null) {
        // eslint-disable-next-line react/jsx-key
        return /*#__PURE__*/jsx(CustomCell, _objectSpread2({}, cellProps));
      }
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/jsx-key
        jsx(TableCell, _objectSpread2({}, cellProps))
      );
    })
  });
};
TableRow.propTypes = {
  className: propTypes$1.exports.string,
  type: propTypes$1.exports.oneOf(['header', 'body']),
  datum: propTypes$1.exports.object,
  customCells: propTypes$1.exports.shape({
    header: propTypes$1.exports.object,
    body: propTypes$1.exports.object
  }),
  headerData: propTypes$1.exports.arrayOf(propTypes$1.exports.shape({
    title: propTypes$1.exports.string,
    id: propTypes$1.exports.string,
    size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
    flexible: propTypes$1.exports.bool,
    sort: propTypes$1.exports.bool,
    style: propTypes$1.exports.object,
    multiLine: propTypes$1.exports.bool
  })),
  setActiveData: propTypes$1.exports.func,
  selected: propTypes$1.exports.bool
};
TableRow.defaultProps = {
  className: '',
  type: 'body',
  datum: {},
  customCells: {
    header: null,
    body: null
  },
  headerData: [],
  setActiveData: function setActiveData() {},
  selected: false
};

var css_248z$9 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.TableBody-module_root__uXmOm {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n}";
var styles$9 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"TableBody-module_root__uXmOm"};
styleInject(css_248z$9);

/* eslint-disable react/forbid-prop-types */
var TableBody = function TableBody(props) {
  var tableData = props.tableData,
    uniqueKey = props.uniqueKey,
    activeData = props.activeData,
    setActiveData = props.setActiveData,
    headerData = props.headerData,
    customCells = props.customCells,
    className = props.className;
  return /*#__PURE__*/jsx("tbody", {
    "data-elem": "table-body",
    className: classes(styles$9.root, className),
    children: tableData === null || tableData === void 0 ? void 0 : tableData.map(function (datum) {
      var key = datum === null || datum === void 0 ? void 0 : datum.id;
      var selected = uniqueKey.length > 0 && (uniqueKey === null || uniqueKey === void 0 ? void 0 : uniqueKey.each(function (e) {
        key += "".concat(datum === null || datum === void 0 ? void 0 : datum[e], "-");
        return (datum === null || datum === void 0 ? void 0 : datum[e]) === (activeData === null || activeData === void 0 ? void 0 : activeData[e]);
      }));
      return /*#__PURE__*/jsx(TableRow, {
        datum: datum,
        selected: selected,
        headerData: headerData,
        customCells: customCells,
        setActiveData: setActiveData
      }, key);
    })
  });
};
TableBody.propTypes = {
  className: propTypes$1.exports.string,
  headerData: propTypes$1.exports.arrayOf(propTypes$1.exports.shape({
    title: propTypes$1.exports.string,
    id: propTypes$1.exports.string,
    size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
    flexible: propTypes$1.exports.bool,
    sort: propTypes$1.exports.bool,
    style: propTypes$1.exports.object,
    multiLine: propTypes$1.exports.bool
  })),
  tableData: propTypes$1.exports.arrayOf(propTypes$1.exports.object),
  uniqueKey: propTypes$1.exports.arrayOf(propTypes$1.exports.string),
  activeData: propTypes$1.exports.object,
  setActiveData: propTypes$1.exports.func,
  customCells: propTypes$1.exports.shape({
    header: propTypes$1.exports.object,
    body: propTypes$1.exports.object
  })
};
TableBody.defaultProps = {
  className: '',
  headerData: [],
  tableData: [],
  uniqueKey: [],
  activeData: {},
  setActiveData: function setActiveData() {},
  customCells: {
    header: null,
    body: null
  }
};

var css_248z$8 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.TableHeader-module_root__tJ-19 {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n}";
var styles$8 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"TableHeader-module_root__tJ-19"};
styleInject(css_248z$8);

/* eslint-disable react/forbid-prop-types */
var TableHeader = function TableHeader(props) {
  var headerData = props.headerData,
    customCells = props.customCells;
  return /*#__PURE__*/jsx("thead", {
    "data-elem": "table-header",
    className: styles$8.root,
    children: /*#__PURE__*/jsx(TableRow, {
      type: "header",
      headerData: headerData,
      customCells: customCells
    })
  });
};
TableHeader.propTypes = {
  headerData: propTypes$1.exports.arrayOf(propTypes$1.exports.shape({
    title: propTypes$1.exports.string,
    id: propTypes$1.exports.string,
    size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
    flexible: propTypes$1.exports.bool,
    sort: propTypes$1.exports.bool,
    style: propTypes$1.exports.object,
    multiLine: propTypes$1.exports.bool
  })),
  customCells: propTypes$1.exports.shape({
    header: propTypes$1.exports.object,
    body: propTypes$1.exports.object
  })
};
TableHeader.defaultProps = {
  headerData: [],
  customCells: {
    header: null,
    body: null
  }
};

var css_248z$7 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.BaseTable-module_root__buLTn {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  background: var(--white);\n  overflow: auto;\n}";
var styles$7 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"BaseTable-module_root__buLTn"};
styleInject(css_248z$7);

/* eslint-disable react/forbid-prop-types */
var BaseTable = /*#__PURE__*/forwardRef(function BaseTable(props, ref) {
  var headerData = props.headerData,
    customCells = props.customCells,
    tableData = props.tableData,
    uniqueKey = props.uniqueKey,
    activeData = props.activeData,
    setActiveData = props.setActiveData,
    className = props.className;
  var transformedHeaderData = headerData.map(function (header) {
    return new TableColumn(header);
  });
  return /*#__PURE__*/jsxs("table", {
    ref: ref,
    "data-elem": "table",
    className: classes(className, styles$7.root),
    children: [/*#__PURE__*/jsx(TableHeader, {
      headerData: transformedHeaderData,
      customCells: customCells
    }), /*#__PURE__*/jsx(TableBody, {
      ref: ref,
      headerData: transformedHeaderData,
      customCells: customCells,
      tableData: tableData,
      uniqueKey: uniqueKey,
      activeData: activeData,
      setActiveData: setActiveData
    })]
  });
});
BaseTable.propTypes = {
  className: propTypes$1.exports.string,
  headerData: propTypes$1.exports.arrayOf(propTypes$1.exports.shape({
    title: propTypes$1.exports.string,
    id: propTypes$1.exports.string,
    size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
    flexible: propTypes$1.exports.bool,
    sort: propTypes$1.exports.bool,
    style: propTypes$1.exports.object,
    multiLine: propTypes$1.exports.bool
  })),
  tableData: propTypes$1.exports.arrayOf(propTypes$1.exports.object),
  uniqueKey: propTypes$1.exports.arrayOf(propTypes$1.exports.string),
  activeData: propTypes$1.exports.object,
  setActiveData: propTypes$1.exports.func,
  customCells: propTypes$1.exports.shape({
    header: propTypes$1.exports.object,
    body: propTypes$1.exports.object
  })
};
BaseTable.defaultProps = {
  className: '',
  headerData: [],
  tableData: [],
  uniqueKey: [],
  activeData: {},
  setActiveData: function setActiveData() {},
  customCells: {
    header: null,
    body: null
  }
};

var css_248z$6 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.TableChips-module_root__bKfBs[data-elem=base-cell] {\n  padding: 0.5rem 1.5rem;\n  width: 100%;\n  background: var(--grey8);\n  border-radius: 0.25rem 0.25rem 0 0;\n}\n.TableChips-module_root__bKfBs[data-elem=base-cell] > [data-elem=component1] .TableChips-module_back__aapO6 {\n  height: 2rem;\n  width: 2rem;\n}\n.TableChips-module_root__bKfBs[data-elem=base-cell] > [data-elem=component1] .TableChips-module_back__aapO6 [data-elem=component1] .TableChips-module_icon__wAaBh {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--white);\n}\n.TableChips-module_root__bKfBs[data-elem=base-cell] > [data-elem=component2] {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 0.5rem;\n  overflow-x: auto;\n  flex: 1;\n}\n.TableChips-module_root__bKfBs[data-elem=base-cell] > [data-elem=component2]::-webkit-scrollbar {\n  display: none;\n}\n.TableChips-module_root__bKfBs[data-elem=base-cell] > [data-elem=component2] .TableChips-module_chip__8v81L .TableChips-module_chip-icon__5CxH8 {\n  width: 0.875rem;\n  height: 0.875rem;\n}";
var styles$6 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"TableChips-module_root__bKfBs","back":"TableChips-module_back__aapO6","icon":"TableChips-module_icon__wAaBh","chip":"TableChips-module_chip__8v81L","chip-icon":"TableChips-module_chip-icon__5CxH8"};
styleInject(css_248z$6);

var TableChips = function TableChips(props) {
  var showBack = props.showBack,
    chips = props.chips,
    className = props.className,
    style = props.style;
  return /*#__PURE__*/jsx(BaseCell, {
    flexible: true,
    className: classes(className, styles$6.root),
    attrs: {
      style: style
    },
    component1: showBack && /*#__PURE__*/jsx(Button, {
      size: "auto",
      radius: "round",
      className: styles$6.back,
      leftComponent: function leftComponent() {
        return /*#__PURE__*/jsx(Arrow, {
          className: styles$6.icon,
          position: "left"
        });
      }
    }),
    component2: chips.map(function (chip) {
      return /*#__PURE__*/jsx(Chip, {
        variant: "input",
        disabled: chip.disabled,
        className: styles$6.chip,
        title: "".concat(chip.label, " : ").concat(chip.value),
        leftComponent: function leftComponent(iconProps) {
          var Icon = chip.icon;
          if ( /*#__PURE__*/isValidElement( /*#__PURE__*/jsx(Icon, {}))) {
            return /*#__PURE__*/jsx(Icon, _objectSpread2(_objectSpread2({}, iconProps), {}, {
              className: styles$6['chip-icon']
            }));
          }
          return null;
        }
      }, chip.key);
    })
  });
};
TableChips.propTypes = {
  className: propTypes$1.exports.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: propTypes$1.exports.object,
  showBack: propTypes$1.exports.bool,
  chips: propTypes$1.exports.arrayOf(propTypes$1.exports.shape({
    key: propTypes$1.exports.string,
    icon: propTypes$1.exports.func,
    label: propTypes$1.exports.oneOfType([propTypes$1.exports.number, propTypes$1.exports.string]),
    value: propTypes$1.exports.oneOfType([propTypes$1.exports.number, propTypes$1.exports.string]),
    disabled: propTypes$1.exports.bool
  }))
};
TableChips.defaultProps = {
  className: '',
  style: {},
  showBack: false,
  chips: []
};

var css_248z$5 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Popover-module_root__F8vwF {\n  box-shadow: -2px -2px 4px rgba(166, 166, 166, 0.25), 2px 2px 4px rgba(166, 166, 166, 0.24);\n  background-color: var(--white);\n  padding: 1rem;\n  border-radius: 0.25rem;\n}";
var styles$5 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Popover-module_root__F8vwF"};
styleInject(css_248z$5);

var Popover = function Popover(props) {
  var children = props.children,
    anchorEl = props.anchorEl,
    open = props.open,
    setOpen = props.setOpen,
    className = props.className,
    transparent = props.transparent,
    onClose = props.onClose;
  var _useFloating = useFloating({
      open: open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [offset(5), shift(), flip({
        padding: 8
      }), size({
        apply: function apply(_ref) {
          var rects = _ref.rects,
            availableHeight = _ref.availableHeight,
            elements = _ref.elements;
          Object.assign(elements.floating.style, {
            width: "".concat(rects.reference.width, "px"),
            minWidth: 'fit-content',
            maxHeight: "".concat(availableHeight, "px")
          });
        },
        padding: 8
      })]
    }),
    x = _useFloating.x,
    y = _useFloating.y,
    reference = _useFloating.reference,
    floating = _useFloating.floating,
    strategy = _useFloating.strategy,
    context = _useFloating.context;
  var _useInteractions = useInteractions([useDismiss(context)]),
    getFloatingProps = _useInteractions.getFloatingProps;
  useEffect(function () {
    if (open === false) {
      onClose();
    }
  }, [open]);
  useLayoutEffect(function () {
    reference(anchorEl);
  }, [anchorEl]);
  return /*#__PURE__*/jsx(Popper, {
    open: open,
    wrapperId: "popover",
    transparent: transparent,
    children: /*#__PURE__*/jsx("div", _objectSpread2(_objectSpread2({}, getFloatingProps({
      ref: floating,
      style: {
        position: strategy,
        top: y !== null && y !== void 0 ? y : 0,
        left: x !== null && x !== void 0 ? x : 0
      },
      className: classes(styles$5.root, className)
    })), {}, {
      children: children
    }))
  });
};
Popover.propTypes = {
  anchorEl: propTypes$1.exports.element,
  open: propTypes$1.exports.bool.isRequired,
  setOpen: propTypes$1.exports.func.isRequired,
  transparent: propTypes$1.exports.bool,
  onClose: propTypes$1.exports.func
};
Popover.defaultProps = {
  anchorEl: null,
  transparent: true,
  onClose: function onClose() {}
};

var css_248z$4 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Columns-module_popover__mIzP7 {\n  height: 100%;\n}\n\n.Columns-module_root__h8zNT {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  gap: 1rem;\n  position: relative;\n  height: 100%;\n  max-width: 100%;\n}\n.Columns-module_root__h8zNT .Columns-module_header__o6vXc {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  gap: 1.5rem;\n  width: 100%;\n  padding: 0;\n  height: auto;\n}\n.Columns-module_root__h8zNT .Columns-module_header__o6vXc > [data-elem=component1] {\n  font-weight: 500;\n}\n.Columns-module_root__h8zNT .Columns-module_header__o6vXc > [data-elem=component2] .Columns-module_search__ReBBj {\n  width: 100%;\n}\n.Columns-module_root__h8zNT .Columns-module_close__1QpLP {\n  position: absolute;\n  top: -1rem;\n  right: -1rem;\n}\n.Columns-module_root__h8zNT .Columns-module_close__1QpLP .Columns-module_icon__X2w-M {\n  width: 1rem;\n  height: 1rem;\n}\n.Columns-module_root__h8zNT .Columns-module_body__SN45m {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  gap: 0.5rem;\n  overflow-y: auto;\n  flex: 1 1 auto;\n}\n.Columns-module_root__h8zNT .Columns-module_body__SN45m .Columns-module_item__tklQj {\n  height: 3rem;\n}\n.Columns-module_root__h8zNT .Columns-module_body__SN45m .Columns-module_item__tklQj > [data-elem=title] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.Columns-module_root__h8zNT .Columns-module_footer__i21sD .Columns-module_expand__InU6q .Columns-module_icon__X2w-M {\n  width: 1.5rem;\n  height: 1.5rem;\n  transform: rotate(180deg);\n}\n.Columns-module_root__h8zNT.Columns-module_expanded__tky-i .Columns-module_header__o6vXc {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  padding-right: 2rem;\n}\n.Columns-module_root__h8zNT.Columns-module_expanded__tky-i .Columns-module_header__o6vXc > [data-elem=component2] {\n  flex: 1;\n}\n.Columns-module_root__h8zNT.Columns-module_expanded__tky-i .Columns-module_close__1QpLP {\n  top: -0.25rem;\n}\n.Columns-module_root__h8zNT.Columns-module_expanded__tky-i .Columns-module_body__SN45m {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  flex: 0 1 auto;\n}\n.Columns-module_root__h8zNT.Columns-module_expanded__tky-i .Columns-module_body__SN45m .Columns-module_item__tklQj {\n  overflow: hidden;\n}\n.Columns-module_root__h8zNT.Columns-module_expanded__tky-i .Columns-module_footer__i21sD {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  margin-top: auto;\n}\n.Columns-module_root__h8zNT.Columns-module_expanded__tky-i .Columns-module_footer__i21sD .Columns-module_expand__InU6q .Columns-module_icon__X2w-M {\n  transform: rotate(0deg);\n}";
var styles$4 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","popover":"Columns-module_popover__mIzP7","root":"Columns-module_root__h8zNT","header":"Columns-module_header__o6vXc","search":"Columns-module_search__ReBBj","close":"Columns-module_close__1QpLP","icon":"Columns-module_icon__X2w-M","body":"Columns-module_body__SN45m","item":"Columns-module_item__tklQj","footer":"Columns-module_footer__i21sD","expand":"Columns-module_expand__InU6q","expanded":"Columns-module_expanded__tky-i"};
styleInject(css_248z$4);

var Columns = function Columns(props) {
  var open = props.open,
    setOpen = props.setOpen,
    anchorEl = props.anchorEl,
    columns = props.columns,
    hiddenColumns = props.hiddenColumns,
    setHiddenColumns = props.setHiddenColumns;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    expanded = _useState2[0],
    setExpanded = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    search = _useState4[0],
    setSearch = _useState4[1];
  return /*#__PURE__*/jsx(Popover, {
    anchorEl: anchorEl,
    open: open,
    setOpen: setOpen,
    className: styles$4.popover,
    onClose: function onClose() {
      setSearch(null);
    },
    children: /*#__PURE__*/jsxs("div", {
      className: classes(styles$4.root, expanded ? styles$4.expanded : ''),
      children: [/*#__PURE__*/jsx(BaseCell, {
        className: styles$4.header,
        component1: "Columns",
        component2: /*#__PURE__*/jsx(TextField, {
          className: styles$4.search,
          placeholder: "Search Column name",
          value: search,
          onChange: function onChange(e) {
            var _inputHelper = inputHelper(e),
              fieldValue = _inputHelper.fieldValue;
            setSearch(fieldValue);
          }
        })
      }), /*#__PURE__*/jsx(Button, {
        className: styles$4.close,
        size: "auto",
        radius: "round",
        variant: "text",
        leftComponent: function leftComponent() {
          return /*#__PURE__*/jsx(Cross, {
            className: styles$4.icon
          });
        },
        onClick: function onClick() {
          setOpen(false);
        }
      }), /*#__PURE__*/jsx("div", {
        className: styles$4.body,
        children: columns === null || columns === void 0 ? void 0 : columns.filter(function (col) {
          var _col$id;
          return (col === null || col === void 0 ? void 0 : (_col$id = col.id) === null || _col$id === void 0 ? void 0 : _col$id.toLowerCase().indexOf(search === null || search === void 0 ? void 0 : search.toLowerCase())) !== -1 && search != null && search !== '' || search == null || search === '';
        }).map(function (col) {
          var selected = [null, false, undefined].includes(hiddenColumns === null || hiddenColumns === void 0 ? void 0 : hiddenColumns[col === null || col === void 0 ? void 0 : col.id]);
          return /*#__PURE__*/jsx(DropdownItem, {
            className: styles$4.item,
            selected: selected,
            title: col.title,
            variant: "checkbox",
            onClick: function onClick() {
              if (selected) {
                setHiddenColumns(_objectSpread2(_objectSpread2({}, hiddenColumns), {}, _defineProperty({}, col.id, true)));
              } else {
                setHiddenColumns(_objectSpread2(_objectSpread2({}, hiddenColumns), {}, _defineProperty({}, col.id, false)));
              }
            }
          }, col.id);
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$4.footer,
        children: /*#__PURE__*/jsx(Chip, {
          className: styles$4.expand,
          size: "sm",
          radius: "ellipse",
          color: "default",
          title: expanded ? 'See Less' : 'See More',
          rightComponent: function rightComponent() {
            return /*#__PURE__*/jsx(AngleDouble, {
              className: styles$4.icon
            });
          },
          onClick: function onClick() {
            setExpanded(function (prev) {
              return !prev;
            });
          }
        })
      })]
    })
  });
};

var css_248z$3 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.TableFilters-module_root__MLaDb[data-elem=base-cell] {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  overflow-x: auto;\n  padding: 0.5rem;\n  gap: 1.25rem;\n  width: 100%;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell]::-webkit-scrollbar {\n  display: none;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] .TableFilters-module_icon__-IqJX {\n  width: 1.5rem;\n  height: 1.5rem;\n  flex-shrink: 0;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] .TableFilters-module_icon-button__UkfXm {\n  padding: 0rem;\n  height: 100%;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem*=component] {\n  height: 100%;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] .TableFilters-module_left__DwOSZ,\n.TableFilters-module_root__MLaDb[data-elem=base-cell] .TableFilters-module_center__eQVxw,\n.TableFilters-module_root__MLaDb[data-elem=base-cell] .TableFilters-module_right__sRGhc {\n  height: 100%;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem=component1] .TableFilters-module_left__DwOSZ {\n  gap: 1rem;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem=component1] .TableFilters-module_left__DwOSZ [data-elem=left] {\n  gap: 1rem;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem=component1] .TableFilters-module_left__DwOSZ .TableFilters-module_filter-value__TbEOe {\n  color: var(--white);\n  background: var(--highlight);\n  padding: 0.125rem 0.5rem;\n  border-radius: 50%;\n  font-size: 0.813rem;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem=component2] {\n  flex: 1;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem=component2] .TableFilters-module_center__eQVxw {\n  width: 100%;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem=component2] .TableFilters-module_center__eQVxw [data-elem=base-cell] {\n  background: var(--grey5);\n  border-color: var(--grey5);\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] > [data-elem=component2] .TableFilters-module_center__eQVxw .TableFilters-module_icon__-IqJX {\n  width: 1.25rem;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] .TableFilters-module_right__sRGhc {\n  width: auto;\n  padding: 0;\n  gap: 2.5rem;\n}\n.TableFilters-module_root__MLaDb[data-elem=base-cell] .TableFilters-module_right__sRGhc > [data-elem*=component] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}";
var styles$3 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"TableFilters-module_root__MLaDb","icon":"TableFilters-module_icon__-IqJX","icon-button":"TableFilters-module_icon-button__UkfXm","left":"TableFilters-module_left__DwOSZ","center":"TableFilters-module_center__eQVxw","right":"TableFilters-module_right__sRGhc","filter-value":"TableFilters-module_filter-value__TbEOe"};
styleInject(css_248z$3);

var TableFilters = function TableFilters(props) {
  var className = props.className,
    style = props.style,
    onRefresh = props.onRefresh,
    onSearch = props.onSearch,
    searchValue = props.searchValue,
    filterValue = props.filterValue,
    headerData = props.headerData,
    hiddenColumns = props.hiddenColumns,
    setHiddenColumns = props.setHiddenColumns;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    openColumns = _useState2[0],
    setOpenColumns = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    anchorEl = _useState4[0],
    setAnchorEl = _useState4[1];
  return /*#__PURE__*/jsx(BaseCell, {
    flexible: true,
    className: classes(styles$3.root, className),
    attrs: {
      style: style
    },
    component1: /*#__PURE__*/jsx(Button, {
      className: styles$3.left,
      title: "Filter",
      variant: "outlined",
      leftComponent: function leftComponent() {
        return /*#__PURE__*/jsx(Filter, {
          className: styles$3.icon
        });
      },
      rightComponent: function rightComponent() {
        if (filterValue !== null && filterValue !== void 0 && filterValue.applied) {
          return /*#__PURE__*/jsx("div", {
            className: styles$3['filter-value'],
            children: filterValue === null || filterValue === void 0 ? void 0 : filterValue.applied
          });
        }
        return null;
      }
    }),
    component2: /*#__PURE__*/jsx(TextField, {
      className: styles$3.center,
      value: searchValue,
      onChange: onSearch,
      LeftComponent: function LeftComponent() {
        return /*#__PURE__*/jsx(MagnifyingGlass, {
          className: styles$3.icon
        });
      },
      placeholder: "Search"
    }),
    component3: /*#__PURE__*/jsx(BaseCell, {
      flexible: true,
      className: styles$3.right,
      component1: /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Button, {
          ref: function ref(el) {
            setAnchorEl(el);
          },
          size: "auto",
          className: styles$3['icon-button'],
          variant: "text",
          leftComponent: function leftComponent() {
            return /*#__PURE__*/jsx(Columns$1, {
              className: styles$3.icon
            });
          },
          onClick: function onClick() {
            setOpenColumns(function (prev) {
              return !prev;
            });
          }
        }), /*#__PURE__*/jsx(Columns, {
          anchorEl: anchorEl,
          open: openColumns,
          setOpen: setOpenColumns,
          columns: headerData,
          hiddenColumns: hiddenColumns,
          setHiddenColumns: setHiddenColumns
        })]
      }),
      component2: /*#__PURE__*/jsx(Button, {
        size: "auto",
        className: styles$3['icon-button'],
        variant: "text",
        onClick: onRefresh,
        leftComponent: function leftComponent() {
          return /*#__PURE__*/jsx(Refresh, {
            className: styles$3.icon
          });
        }
      }),
      component3: /*#__PURE__*/jsx(Button, {
        size: "auto",
        className: styles$3['icon-button'],
        variant: "text",
        leftComponent: function leftComponent() {
          return /*#__PURE__*/jsx(Nut, {
            className: styles$3.icon
          });
        }
      })
    })
  });
};
TableFilters.propTypes = {
  className: propTypes$1.exports.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: propTypes$1.exports.object,
  onRefresh: propTypes$1.exports.func,
  onSearch: propTypes$1.exports.func,
  searchValue: propTypes$1.exports.string,
  filterValue: propTypes$1.exports.shape({
    applied: propTypes$1.exports.number
  })
};
TableFilters.defaultProps = {
  className: '',
  style: {},
  onRefresh: function onRefresh() {},
  onSearch: function onSearch() {},
  searchValue: null,
  filterValue: {
    applied: 4
  }
};

var css_248z$2 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Table-module_root__dLWEm {\n  position: relative;\n  border-style: solid;\n  border-color: var(--grey4);\n  border-width: 1px 1px 0px 1px;\n  border-radius: 0.25rem;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n}\n.Table-module_root__dLWEm .Table-module_table__Oh-P6 {\n  height: calc(100% - 6rem);\n  padding-bottom: 3.5rem;\n}\n.Table-module_root__dLWEm .Table-module_pagination__DBIS0 {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.Table-module_root__dLWEm .Table-module_pagination__DBIS0.Table-module_floating__x8-m7 {\n  bottom: 1rem;\n}\n.Table-module_root__dLWEm .Table-module_chips__BY-oI,\n.Table-module_root__dLWEm .Table-module_filters__RUDdW,\n.Table-module_root__dLWEm .Table-module_table__Oh-P6 > [data-elem=table-header] {\n  position: -webkit-sticky;\n  position: sticky;\n  z-index: 1;\n  top: 0;\n}";
var styles$2 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Table-module_root__dLWEm","table":"Table-module_table__Oh-P6","pagination":"Table-module_pagination__DBIS0","floating":"Table-module_floating__x8-m7","chips":"Table-module_chips__BY-oI","filters":"Table-module_filters__RUDdW"};
styleInject(css_248z$2);

var INTERSECTION = 1;
var STEP = 0.1;
var THRESHOLD = [];
for (var i = 0; i < INTERSECTION; i += STEP) {
  THRESHOLD.push(i);
}
var Table = function Table(props) {
  var className = props.className,
    headerData = props.headerData,
    tableData = props.tableData,
    uniqueKey = props.uniqueKey,
    activeData = props.activeData,
    setActiveData = props.setActiveData,
    customCells = props.customCells,
    chipsData = props.chipsData,
    filtersData = props.filtersData,
    paginationData = props.paginationData;
  var ref = useRef(null);
  var paginationRef = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    floating = _useState2[0],
    setFloating = _useState2[1];
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    hiddenColumns = _useState4[0],
    setHiddenColumns = _useState4[1];
  var visibileColumns = headerData.filter(function (header) {
    return [null, false, undefined].includes(hiddenColumns === null || hiddenColumns === void 0 ? void 0 : hiddenColumns[header === null || header === void 0 ? void 0 : header.id]);
  });

  // for pagination docking using intersection observer
  useEffect(function () {
    var tableElem = ref.current;
    if (tableElem) {
      var lastRow = tableElem.querySelector('[data-elem="table-body"] [data-elem="table-row"]:last-child');
      if (lastRow) {
        var lastRowHeight = parseInt(getComputedStyle(lastRow).height.slice(0, -2), 10);
        var handleIntersect = function handleIntersect(entries) {
          entries.forEach(function (entry) {
            var _entry$intersectionRe;
            // if the target is visibile
            if (entry.isIntersecting && entry.intersectionRatio >= INTERSECTION || (entry === null || entry === void 0 ? void 0 : (_entry$intersectionRe = entry.intersectionRect) === null || _entry$intersectionRe === void 0 ? void 0 : _entry$intersectionRe.height) === lastRowHeight) {
              setFloating(false);
            } else {
              setFloating(true);
            }
          });
        };
        var options = {
          threshold: THRESHOLD
        };
        var observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(lastRow);
      }
    }
  }, [tableData]);

  // for dynamically resizing table vertically acc to provided addons
  useEffect(function () {
    var tableElem = ref.current;
    if (tableElem) {
      var totalAddons = [chipsData, filtersData].filter(Boolean).length;
      tableElem.style.height = "calc(100% - ".concat(totalAddons * 3, "rem)");
    }
  }, [chipsData, filtersData]);

  // setting body and header min-width to allow horizontal sticky column beyond viewport width
  useEffect(function () {
    var tableElem = ref.current;
    if (tableElem) {
      var tableHeaderElem = tableElem.querySelector('[data-elem="table-header"]');
      var tableBodyElem = tableElem.querySelector('[data-elem="table-body"]');
      if (tableHeaderElem && tableBodyElem) {
        var minWidth = 0;
        visibileColumns.forEach(function (header) {
          minWidth += new TableColumn(header).sizeInRem;
        });
        tableHeaderElem.style.minWidth = "".concat(minWidth, "rem");
        tableBodyElem.style.minWidth = "".concat(minWidth, "rem");
      }
    }
  }, [hiddenColumns, headerData]);

  // set the hidden columns state
  useEffect(function () {
    setHiddenColumns({});
  }, [headerData]);
  return /*#__PURE__*/jsxs("div", {
    className: classes(styles$2.root, className),
    children: [chipsData != null && /*#__PURE__*/jsx(TableChips, _objectSpread2({
      className: styles$2.chips
    }, chipsData)), filtersData != null && /*#__PURE__*/jsx(TableFilters, _objectSpread2({
      className: styles$2.filters
    }, _objectSpread2(_objectSpread2({}, filtersData), {}, {
      headerData: headerData,
      hiddenColumns: hiddenColumns,
      setHiddenColumns: setHiddenColumns
    }))), /*#__PURE__*/jsx(BaseTable, {
      ref: ref,
      headerData: visibileColumns,
      tableData: tableData,
      uniqueKey: uniqueKey,
      activeData: activeData,
      setActiveData: setActiveData,
      customCells: customCells,
      className: styles$2.table
    }), paginationData != null && /*#__PURE__*/jsx(Pagination, _objectSpread2(_objectSpread2({
      className: classes(styles$2.pagination, floating ? styles$2.floating : ''),
      ref: paginationRef
    }, paginationData), {}, {
      floating: floating
    }))]
  });
};
Table.propTypes = {
  className: propTypes$1.exports.string,
  headerData: propTypes$1.exports.arrayOf(propTypes$1.exports.shape({
    title: propTypes$1.exports.string,
    id: propTypes$1.exports.string,
    size: propTypes$1.exports.oneOf(['sm', 'md', 'lg']),
    flexible: propTypes$1.exports.bool,
    sort: propTypes$1.exports.bool,
    style: propTypes$1.exports.object,
    multiLine: propTypes$1.exports.bool
  })),
  tableData: propTypes$1.exports.arrayOf(propTypes$1.exports.object),
  uniqueKey: propTypes$1.exports.arrayOf(propTypes$1.exports.string),
  activeData: propTypes$1.exports.object,
  setActiveData: propTypes$1.exports.func,
  customCells: propTypes$1.exports.shape({
    header: propTypes$1.exports.object,
    body: propTypes$1.exports.object
  }),
  chipsData: propTypes$1.exports.shape(_objectSpread2({}, TableChips.propTypes)),
  filtersData: propTypes$1.exports.shape(_objectSpread2({}, TableFilters.propTypes)),
  paginationData: propTypes$1.exports.shape(_objectSpread2({}, Pagination.propTypes))
};
Table.defaultProps = {
  className: '',
  headerData: [],
  tableData: [],
  uniqueKey: [],
  activeData: {},
  setActiveData: function setActiveData() {},
  customCells: {
    header: null,
    body: null
  },
  chipsData: null,
  filtersData: null,
  paginationData: null
};

var css_248z$1 = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Tabs-module_root__nulvq {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n.Tabs-module_tab-view__rxH8t, .Tabs-module_tab-view-selected__zs7od {\n  cursor: pointer;\n  margin-right: 0.25rem;\n  padding: 0.5rem 0rem 0.5rem 0.5rem;\n  text-align: left;\n  font-size: 1rem;\n  font-weight: 500;\n  color: var(--dark-grey);\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M-, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M- .Tabs-module_left__K9fac, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_left__K9fac {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M- .Tabs-module_left__K9fac .Tabs-module_icon-container__ux2qb, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_left__K9fac .Tabs-module_icon-container__ux2qb {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M- .Tabs-module_left__K9fac .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_left__K9fac .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--dark-grey);\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_saperator__tHmCM, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_saperator__tHmCM {\n  border-right: 0.031rem solid var(--grey3);\n  border-radius: 0.625rem;\n  height: 1.438rem;\n  margin: 0rem 0rem 0rem 1rem;\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_icon-container__ux2qb, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_icon-container__ux2qb {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n.Tabs-module_tab-view__rxH8t .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv, .Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--dark-grey);\n}\n.Tabs-module_tab-view__rxH8t:hover, .Tabs-module_tab-view-selected__zs7od:hover {\n  background-color: var(--background);\n  border-radius: 0.25rem;\n  color: var(--highlight);\n}\n.Tabs-module_tab-view__rxH8t:hover .Tabs-module_content__2C7M- .Tabs-module_left__K9fac .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv, .Tabs-module_tab-view-selected__zs7od:hover .Tabs-module_content__2C7M- .Tabs-module_left__K9fac .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--highlight);\n}\n.Tabs-module_tab-view__rxH8t:hover .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_saperator__tHmCM, .Tabs-module_tab-view-selected__zs7od:hover .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_saperator__tHmCM {\n  border-right: 0.031rem solid var(--highlight);\n  border-radius: 0.625rem;\n  height: 1.438rem;\n  margin: 0rem 0rem 0rem 1rem;\n}\n.Tabs-module_tab-view__rxH8t:hover .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv, .Tabs-module_tab-view-selected__zs7od:hover .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--highlight);\n}\n\n.Tabs-module_tab-view-selected__zs7od {\n  color: var(--highlight);\n  border-bottom: 0.125rem solid var(--highlight);\n}\n.Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_left__K9fac .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--highlight);\n}\n.Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_saperator__tHmCM {\n  border-right: 0.031rem solid var(--highlight);\n  border-radius: 0.625rem;\n  height: 1.438rem;\n  margin: 0rem 0rem 0rem 1rem;\n}\n.Tabs-module_tab-view-selected__zs7od .Tabs-module_content__2C7M- .Tabs-module_right__BSiOE .Tabs-module_icon-container__ux2qb .Tabs-module_icon__lqSvv {\n  width: 1.5rem;\n  height: 1.5rem;\n  fill: var(--highlight);\n}";
var styles$1 = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Tabs-module_root__nulvq","tab-view":"Tabs-module_tab-view__rxH8t","tab-view-selected":"Tabs-module_tab-view-selected__zs7od","content":"Tabs-module_content__2C7M-","left":"Tabs-module_left__K9fac","icon-container":"Tabs-module_icon-container__ux2qb","icon":"Tabs-module_icon__lqSvv","right":"Tabs-module_right__BSiOE","saperator":"Tabs-module_saperator__tHmCM"};
styleInject(css_248z$1);

var Tabs = function Tabs(props) {
  var tabs = props.tabs,
    selectedTab = props.selectedTab,
    setSelectedTab = props.setSelectedTab;
  var tabViewClassName = function tabViewClassName(id) {
    return id === selectedTab ? "".concat(styles$1['tab-view-selected']) : "".concat(styles$1['tab-view']);
  };
  var onTabClick = function onTabClick(id) {
    setSelectedTab(id);
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$1.root,
    children: tabs === null || tabs === void 0 ? void 0 : tabs.map(function (tab) {
      var id = tab.id,
        title = tab.title,
        LeftIcon = tab.leftIcon,
        RightIcon = tab.rightIcon;
      return /*#__PURE__*/jsx("div", {
        onClick: function onClick() {
          return onTabClick(id);
        },
        className: tabViewClassName(id),
        children: /*#__PURE__*/jsxs("div", {
          className: styles$1.content,
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$1.left,
            children: [/*#__PURE__*/jsx("div", {
              style: {
                paddingRight: LeftIcon ? 5 : 0
              },
              children: /*#__PURE__*/jsx("span", {
                className: styles$1['icon-container'],
                children: LeftIcon && /*#__PURE__*/jsx(LeftIcon, {
                  className: classes(styles$1.icon)
                })
              })
            }), /*#__PURE__*/jsx("span", {
              style: {
                paddingRight: !RightIcon ? 8 : 0
              },
              children: title
            })]
          }), RightIcon && /*#__PURE__*/jsxs("div", {
            className: styles$1.right,
            children: [/*#__PURE__*/jsx("vl", {
              className: styles$1.saperator
            }), /*#__PURE__*/jsx("span", {
              className: styles$1['icon-container'],
              children: /*#__PURE__*/jsx(RightIcon, {
                className: classes(styles$1.icon)
              })
            })]
          })]
        })
      }, tab);
    })
  });
};
Tabs.propTypes = {
  tabs: propTypes$1.exports.arrayOf(propTypes$1.exports.string),
  selectedTab: propTypes$1.exports.string,
  setSelectedTab: propTypes$1.exports.string
};
Tabs.defaultProps = {
  tabs: [{
    id: '1',
    title: 'Tab1',
    leftIcon: '',
    rightIcon: ''
  }, {
    id: '2',
    title: 'Tab2',
    leftIcon: '',
    rightIcon: ''
  }, {
    id: '3',
    title: 'Tab3',
    leftIcon: '',
    rightIcon: ''
  }, {
    id: '4',
    title: 'Tab4',
    leftIcon: '',
    rightIcon: ''
  }],
  selectedTab: 'Tab1',
  setSelectedTab: 'None'
};

var css_248z = ":root {\n  --white: #ffffff;\n  --black: #000000;\n  --dark-grey: #333333;\n  --dark-grey-o-85: rgba(51, 51, 51, 0.85);\n  --grey: #737373;\n  --grey1: #888888;\n  --grey2: #a6a6a6;\n  --grey3: #bbbbbb;\n  --grey4: #c4c4c4;\n  --grey5: #dddddd;\n  --grey6: #e8e8e8;\n  --grey7: #eeeeee;\n  --grey8: #f2f2f2;\n  --grey9: #eff0f0;\n  --grey10: #f7f7f7;\n  --highlight: #0f62fe;\n  --dark-blue: #001833;\n  --background: #d0e2ff;\n  --banyan-blue: #00037c;\n  --banyan-orange: #ff892a;\n  --banyan-pink: #ff1597;\n  --banyan-gradient: linear-gradient(\n  \t84.71deg,\n  \tvar(--banyan-pink) 0.48%,\n  \tvar(--banyan-orange) 99.57%\n  );\n  --error: #da1e28;\n  --error-bg: #fff1f1;\n  --error-outline: rgba(218, 30, 40, 0.08);\n  --success: #24a148;\n  --success-bg: #defbe6;\n  --success-outline: rgba(36, 161, 72, 0.08);\n  --warning: #f1c21b;\n  --warning-bg: #fff8e1;\n  --warning-outline: rgba(203, 160, 6, 0.08);\n  --info: #0043ce;\n  --info-bg: #edf5ff;\n  --info-outline: #2864db98;\n}\n\n.Tooltip-module_root__9-btv {\n  display: inline-block;\n  position: relative;\n}\n.Tooltip-module_tooltip__va-Bl {\n  text-align: center;\n  position: fixed;\n  border-radius: 0.25rem;\n  min-width: auto;\n  max-width: 12rem;\n  padding: 0.375rem;\n  font-size: 0.875rem;\n  font-family: sans-serif;\n  line-height: 1;\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_light__SGd28 {\n  color: var(--black);\n  background: var(--grey7);\n  border-color: var(--black);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_dark__mj1PC {\n  color: var(--white);\n  background: var(--black);\n  border-color: var(--white);\n}\n.Tooltip-module_tooltip__va-Bl::before {\n  content: \"\";\n  border: solid transparent;\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-width: 0.375rem;\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_top__mqs5K::before {\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, 0%);\n  border-top-style: solid;\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_top__mqs5K.Tooltip-module_light__SGd28::before {\n  border-top-color: var(--grey7);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_top__mqs5K.Tooltip-module_dark__mj1PC::before {\n  border-top-color: var(--black);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_bottom__8Ne5W::before {\n  top: 0%;\n  left: 50%;\n  transform: translate(-50%, -100%);\n  border-bottom-style: solid;\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_bottom__8Ne5W.Tooltip-module_light__SGd28::before {\n  border-bottom-color: var(--grey7);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_bottom__8Ne5W.Tooltip-module_dark__mj1PC::before {\n  border-bottom-color: var(--black);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_left__hT5y-::before {\n  top: 50%;\n  left: 100%;\n  transform: translate(0%, -50%);\n  border-left-style: solid;\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_left__hT5y-.Tooltip-module_light__SGd28::before {\n  border-left-color: var(--grey7);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_left__hT5y-.Tooltip-module_dark__mj1PC::before {\n  border-left-color: var(--black);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_right__Glh2U::before {\n  top: 50%;\n  left: 0%;\n  transform: translate(-100%, -50%);\n  border-right-style: solid;\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_right__Glh2U.Tooltip-module_light__SGd28::before {\n  border-right-color: var(--grey7);\n}\n.Tooltip-module_tooltip__va-Bl.Tooltip-module_right__Glh2U.Tooltip-module_dark__mj1PC::before {\n  border-right-color: var(--black);\n}";
var styles = {"white":"var(--white)","black":"var(--black)","dark-grey":"var(--dark-grey)","dark-grey-o-85":"var(--dark-grey-o-85)","grey":"var(--grey)","grey1":"var(--grey1)","grey2":"var(--grey2)","grey3":"var(--grey3)","grey4":"var(--grey4)","grey5":"var(--grey5)","grey6":"var(--grey6)","grey7":"var(--grey7)","grey8":"var(--grey8)","grey9":"var(--grey9)","grey10":"var(--grey10)","highlight":"var(--highlight)","dark-blue":"var(--dark-blue)","background":"var(--background)","banyan-blue":"var(--banyan-blue)","banyan-orange":"var(--banyan-orange)","banyan-pink":"var(--banyan-pink)","banyan-gradient":"var(--banyan-gradient)","error":"var(--error)","error-bg":"var(--error-bg)","error-outline":"var(--error-outline)","success":"var(--success)","success-bg":"var(--success-bg)","success-outline":"var(--success-outline)","warning":"var(--warning)","warning-bg":"var(--warning-bg)","warning-outline":"var(--warning-outline)","info":"var(--info)","info-bg":"var(--info-bg)","info-outline":"var(--info-outline)","root":"Tooltip-module_root__9-btv","tooltip":"Tooltip-module_tooltip__va-Bl","light":"Tooltip-module_light__SGd28","dark":"Tooltip-module_dark__mj1PC","top":"Tooltip-module_top__mqs5K","bottom":"Tooltip-module_bottom__8Ne5W","left":"Tooltip-module_left__hT5y-","right":"Tooltip-module_right__Glh2U"};
styleInject(css_248z);

var getPositionStyles = function getPositionStyles(_ref) {
  var _anchor$current$getBo, _anchor$current, _anchor$current$getBo2, _anchor$current$getBo3, _anchor$current$getBo4, _anchor$current2, _anchor$current2$getB, _anchor$current2$getB2, _anchor$current$getBo5, _anchor$current3, _anchor$current3$getB, _anchor$current3$getB2, _anchor$current$getBo6, _anchor$current4, _anchor$current4$getB, _anchor$current4$getB2, _anchor$current$getBo7, _anchor$current5, _anchor$current5$getB, _anchor$current5$getB2, _anchor$current$getBo8, _anchor$current6, _anchor$current6$getB, _anchor$current6$getB2, _anchor$current$getBo9, _anchor$current7, _anchor$current7$getB, _anchor$current7$getB2, _anchor$current$getBo10, _anchor$current8, _anchor$current8$getB, _anchor$current8$getB2, _anchor$current$getBo11, _anchor$current9, _anchor$current9$getB, _anchor$current9$getB2, _anchor$current$getBo12, _anchor$current10, _anchor$current10$get, _anchor$current10$get2, _anchor$current$getBo13, _anchor$current11, _anchor$current11$get, _anchor$current11$get2, _anchor$current$getBo14, _anchor$current12, _anchor$current12$get, _anchor$current12$get2;
  var position = _ref.position,
    anchor = _ref.anchor,
    content = _ref.content;
  var style = {
    width: "calc(".concat(content.length / 2, "rem + 0.75rem)")
  };
  switch (position) {
    case 'top':
      return _objectSpread2(_objectSpread2({}, style), {}, {
        top: "calc(".concat((_anchor$current$getBo = anchor === null || anchor === void 0 ? void 0 : (_anchor$current = anchor.current) === null || _anchor$current === void 0 ? void 0 : (_anchor$current$getBo2 = _anchor$current.getBoundingClientRect) === null || _anchor$current$getBo2 === void 0 ? void 0 : (_anchor$current$getBo3 = _anchor$current$getBo2.call(_anchor$current)) === null || _anchor$current$getBo3 === void 0 ? void 0 : _anchor$current$getBo3.top) !== null && _anchor$current$getBo !== void 0 ? _anchor$current$getBo : 0, "px - 0.375rem)"),
        left: "calc(".concat(((_anchor$current$getBo4 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current2 = anchor.current) === null || _anchor$current2 === void 0 ? void 0 : (_anchor$current2$getB = _anchor$current2.getBoundingClientRect) === null || _anchor$current2$getB === void 0 ? void 0 : (_anchor$current2$getB2 = _anchor$current2$getB.call(_anchor$current2)) === null || _anchor$current2$getB2 === void 0 ? void 0 : _anchor$current2$getB2.left) !== null && _anchor$current$getBo4 !== void 0 ? _anchor$current$getBo4 : 0) + ((_anchor$current$getBo5 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current3 = anchor.current) === null || _anchor$current3 === void 0 ? void 0 : (_anchor$current3$getB = _anchor$current3.getBoundingClientRect) === null || _anchor$current3$getB === void 0 ? void 0 : (_anchor$current3$getB2 = _anchor$current3$getB.call(_anchor$current3)) === null || _anchor$current3$getB2 === void 0 ? void 0 : _anchor$current3$getB2.width) !== null && _anchor$current$getBo5 !== void 0 ? _anchor$current$getBo5 : 0) / 2, "px"),
        transform: 'translate(-50%, -100%)'
      });
    case 'bottom':
      return _objectSpread2(_objectSpread2({}, style), {}, {
        top: "calc(".concat((_anchor$current$getBo6 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current4 = anchor.current) === null || _anchor$current4 === void 0 ? void 0 : (_anchor$current4$getB = _anchor$current4.getBoundingClientRect) === null || _anchor$current4$getB === void 0 ? void 0 : (_anchor$current4$getB2 = _anchor$current4$getB.call(_anchor$current4)) === null || _anchor$current4$getB2 === void 0 ? void 0 : _anchor$current4$getB2.bottom) !== null && _anchor$current$getBo6 !== void 0 ? _anchor$current$getBo6 : 0, "px + 0.375rem)"),
        left: "calc(".concat(((_anchor$current$getBo7 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current5 = anchor.current) === null || _anchor$current5 === void 0 ? void 0 : (_anchor$current5$getB = _anchor$current5.getBoundingClientRect) === null || _anchor$current5$getB === void 0 ? void 0 : (_anchor$current5$getB2 = _anchor$current5$getB.call(_anchor$current5)) === null || _anchor$current5$getB2 === void 0 ? void 0 : _anchor$current5$getB2.left) !== null && _anchor$current$getBo7 !== void 0 ? _anchor$current$getBo7 : 0) + ((_anchor$current$getBo8 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current6 = anchor.current) === null || _anchor$current6 === void 0 ? void 0 : (_anchor$current6$getB = _anchor$current6.getBoundingClientRect) === null || _anchor$current6$getB === void 0 ? void 0 : (_anchor$current6$getB2 = _anchor$current6$getB.call(_anchor$current6)) === null || _anchor$current6$getB2 === void 0 ? void 0 : _anchor$current6$getB2.width) !== null && _anchor$current$getBo8 !== void 0 ? _anchor$current$getBo8 : 0) / 2, "px"),
        transform: 'translate(-50%, 0%)'
      });
    case 'left':
      return _objectSpread2(_objectSpread2({}, style), {}, {
        top: "calc(".concat(((_anchor$current$getBo9 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current7 = anchor.current) === null || _anchor$current7 === void 0 ? void 0 : (_anchor$current7$getB = _anchor$current7.getBoundingClientRect) === null || _anchor$current7$getB === void 0 ? void 0 : (_anchor$current7$getB2 = _anchor$current7$getB.call(_anchor$current7)) === null || _anchor$current7$getB2 === void 0 ? void 0 : _anchor$current7$getB2.top) !== null && _anchor$current$getBo9 !== void 0 ? _anchor$current$getBo9 : 0) + ((_anchor$current$getBo10 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current8 = anchor.current) === null || _anchor$current8 === void 0 ? void 0 : (_anchor$current8$getB = _anchor$current8.getBoundingClientRect) === null || _anchor$current8$getB === void 0 ? void 0 : (_anchor$current8$getB2 = _anchor$current8$getB.call(_anchor$current8)) === null || _anchor$current8$getB2 === void 0 ? void 0 : _anchor$current8$getB2.height) !== null && _anchor$current$getBo10 !== void 0 ? _anchor$current$getBo10 : 0) / 2, "px)"),
        left: "calc(".concat((_anchor$current$getBo11 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current9 = anchor.current) === null || _anchor$current9 === void 0 ? void 0 : (_anchor$current9$getB = _anchor$current9.getBoundingClientRect) === null || _anchor$current9$getB === void 0 ? void 0 : (_anchor$current9$getB2 = _anchor$current9$getB.call(_anchor$current9)) === null || _anchor$current9$getB2 === void 0 ? void 0 : _anchor$current9$getB2.left) !== null && _anchor$current$getBo11 !== void 0 ? _anchor$current$getBo11 : 0, "px - 0.375rem"),
        transform: 'translate(-100%, -50%)'
      });
    case 'right':
      return _objectSpread2(_objectSpread2({}, style), {}, {
        top: "calc(".concat(((_anchor$current$getBo12 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current10 = anchor.current) === null || _anchor$current10 === void 0 ? void 0 : (_anchor$current10$get = _anchor$current10.getBoundingClientRect) === null || _anchor$current10$get === void 0 ? void 0 : (_anchor$current10$get2 = _anchor$current10$get.call(_anchor$current10)) === null || _anchor$current10$get2 === void 0 ? void 0 : _anchor$current10$get2.top) !== null && _anchor$current$getBo12 !== void 0 ? _anchor$current$getBo12 : 0) + ((_anchor$current$getBo13 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current11 = anchor.current) === null || _anchor$current11 === void 0 ? void 0 : (_anchor$current11$get = _anchor$current11.getBoundingClientRect) === null || _anchor$current11$get === void 0 ? void 0 : (_anchor$current11$get2 = _anchor$current11$get.call(_anchor$current11)) === null || _anchor$current11$get2 === void 0 ? void 0 : _anchor$current11$get2.height) !== null && _anchor$current$getBo13 !== void 0 ? _anchor$current$getBo13 : 0) / 2, "px)"),
        left: "calc(".concat((_anchor$current$getBo14 = anchor === null || anchor === void 0 ? void 0 : (_anchor$current12 = anchor.current) === null || _anchor$current12 === void 0 ? void 0 : (_anchor$current12$get = _anchor$current12.getBoundingClientRect) === null || _anchor$current12$get === void 0 ? void 0 : (_anchor$current12$get2 = _anchor$current12$get.call(_anchor$current12)) === null || _anchor$current12$get2 === void 0 ? void 0 : _anchor$current12$get2.right) !== null && _anchor$current$getBo14 !== void 0 ? _anchor$current$getBo14 : 0, "px + 0.375rem"),
        transform: 'translate(0%, -50%)'
      });
    default:
      return {};
  }
};
var Tooltip = function Tooltip(props) {
  var children = props.children,
    position = props.position,
    content = props.content,
    variant = props.variant;
  var timeoutRef = useRef(null);
  var tooltipRef = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var showTip = function showTip() {
    timeoutRef.current = setTimeout(function () {
      setOpen(true);
    }, 0);
  };
  var hideTip = function hideTip() {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };
  return /*#__PURE__*/jsxs("div", {
    ref: tooltipRef,
    className: classes(styles.root, styles[variant])
    // When to show the tooltip
    ,
    onMouseEnter: showTip,
    onMouseLeave: hideTip,
    children: [children, /*#__PURE__*/jsx(Popper, {
      open: open,
      backdrop: false,
      anchorEl: tooltipRef,
      wrapperId: "tooltip-popper",
      children: /*#__PURE__*/jsx("div", {
        className: classes(styles.tooltip, styles[position], styles[variant]),
        style: _objectSpread2({}, getPositionStyles({
          position: position,
          anchor: tooltipRef,
          content: content
        })),
        children: content
      })
    })]
  });
};
Tooltip.propTypes = {
  variant: propTypes$1.exports.oneOf(['light', 'dark']),
  content: propTypes$1.exports.string,
  position: propTypes$1.exports.oneOf(['right', 'top', 'bottom', 'left'])
};
Tooltip.defaultProps = {
  variant: 'light',
  content: 'Tooltip Info',
  position: 'top'
};

export { Accordion, Alert, AlertIcon, AngleDouble as AngleDoubleIcon, Arrow as ArrowIcon, BASE_URLS, BaseButton, BaseCell, BaseModal, BaseTable, BreadCrumbs, BreadcrumbSeperator as BreadcrumbSeperatorIcon, Button, Calender, Calender$1 as CalenderIcon, Caret as CaretIcon, Checkbox, CheckboxIcon, Chevron as ChevronIcon, Chip, CodeSnippet, Columns$1 as ColumnsIcon, Copy as CopyIcon, Cross as CrossIcon, DAYS, DatePicker, Delete as DeleteIcon, Download as DownloadIcon, Dropdown, DropdownItem, Edit as EditIcon, FULL_MONTHS, Filter as FilterIcon, HalfShade as HalfShadeIcon, HierarchyBrowser, HierarchyItem, MONTHS, MagnifyingGlass as MagnifyingGlassIcon, Nut as NutIcon, PageHeader, Pagination, PaginationList, Plus as PlusIcon, Popover, Popper, Radio, RadioIcon, Refresh as RefreshIcon, Server as ServerIcon, Stepper, Table, TableCell, TableColumn, Tabs, TextField, Tick as TickIcon, Tooltip, View as ViewIcon, classes, cloneDeep, defaultProps$1 as defaultProps, doubleDigitted, get, getCurrentSearchParams, getDateFromEpoch, getDatesInAMonth, getInitialsOfName, getJSDateFromEpoch, getPagination, getSpacedDisplayName, getTimeFromEpoch, getToday, inputHelper, propTypes, stringToPath, sumArrayOfObjects, uniqueArray, uniqueArrayOfObjects, useOutsideClickListener, usePagination, useResize, useRowFilter };
