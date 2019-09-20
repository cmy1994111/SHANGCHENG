(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 14:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 188:
/*!*******************************************************************************************!*\
  !*** C:/Users/PC/Documents/HBuilderProjects/0916-shop/components/xiujun-evaluate/list.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //测试数据
var listData = [{
  header_img: "http://cs.zhangkaixing.com/face/face_2.jpg",
  user_name: "测试1",
  rate: 5,
  create_time: "2019-04-12",
  content: "好评",
  imgs: [
  'http://cs.zhangkaixing.com/face/face.jpg',
  'http://cs.zhangkaixing.com/face/p10.jpg',
  'http://cs.zhangkaixing.com/face/face_14.jpg',
  'http://cs.zhangkaixing.com/face/face.jpg',
  'http://cs.zhangkaixing.com/face/p10.jpg'] },


{
  content: "中评",
  create_time: "2019-04-12",
  header_img: "http://cs.zhangkaixing.com/face/face_12.jpg",
  user_name: "测试2",
  rate: 4
  // imgs:[]
},
{
  content: "",
  create_time: "2019-04-12",
  header_img: "http://cs.zhangkaixing.com/face/face_15.jpg",
  user_name: "测试3",
  rate: 2
  // imgs:[]
}, {
  content: "好评",
  create_time: "2019-04-12",
  header_img: "http://cs.zhangkaixing.com/face/face_2.jpg",
  user_name: "测试1",
  rate: 5,
  imgs: [
  'http://cs.zhangkaixing.com/face/face.jpg',
  'http://cs.zhangkaixing.com/face/p10.jpg',
  'http://cs.zhangkaixing.com/face/face_14.jpg',
  'http://cs.zhangkaixing.com/face/face.jpg',
  'http://cs.zhangkaixing.com/face/p10.jpg'] },


{
  content: "中评",
  create_time: "2019-04-12",
  header_img: "http://cs.zhangkaixing.com/face/face_12.jpg",
  user_name: "测试2",
  rate: 3.5
  // imgs:[]
},
{
  content: "",
  create_time: "2019-04-12",
  header_img: "http://cs.zhangkaixing.com/face/face_15.jpg",
  user_name: "测试3",
  rate: 2.3
  // imgs:[]
}];var _default =

listData;exports.default = _default;

/***/ }),

/***/ 196:
/*!****************************************************************************!*\
  !*** C:/Users/PC/Documents/HBuilderProjects/0916-shop/common/city.data.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var tb=[{
"label":"北京",
"value":"2",
"childrens":[{
"label":"北京市",
"value":"52",
"childrens":[{
"label":"东城区",
"value":"500",
"childrens":[]},
{
"label":"西城区",
"value":"501",
"childrens":[]},
{
"label":"海淀区",
"value":"502",
"childrens":[]},
{
"label":"朝阳区",
"value":"503",
"childrens":[]},
{
"label":"崇文区",
"value":"504",
"childrens":[]},
{
"label":"宣武区",
"value":"505",
"childrens":[]},
{
"label":"丰台区",
"value":"506",
"childrens":[]},
{
"label":"石景山区",
"value":"507",
"childrens":[]},
{
"label":"房山区",
"value":"508",
"childrens":[]},
{
"label":"门头沟区",
"value":"509",
"childrens":[]},
{
"label":"通州区",
"value":"510",
"childrens":[]},
{
"label":"顺义区",
"value":"511",
"childrens":[]},
{
"label":"昌平区",
"value":"512",
"childrens":[]},
{
"label":"怀柔区",
"value":"513",
"childrens":[]},
{
"label":"平谷区",
"value":"514",
"childrens":[]},
{
"label":"大兴区",
"value":"515",
"childrens":[]},
{
"label":"密云县",
"value":"516",
"childrens":[]},
{
"label":"延庆县",
"value":"517",
"childrens":[]}]}]},


{
"label":"安徽省",
"value":"3",
"childrens":[{
"label":"安庆市",
"value":"36",
"childrens":[{
"label":"迎江区",
"value":"398",
"childrens":[]},
{
"label":"大观区",
"value":"399",
"childrens":[]},
{
"label":"宜秀区",
"value":"400",
"childrens":[]},
{
"label":"桐城市",
"value":"401",
"childrens":[]},
{
"label":"怀宁县",
"value":"402",
"childrens":[]},
{
"label":"枞阳县",
"value":"403",
"childrens":[]},
{
"label":"潜山县",
"value":"404",
"childrens":[]},
{
"label":"太湖县",
"value":"405",
"childrens":[]},
{
"label":"宿松县",
"value":"406",
"childrens":[]},
{
"label":"望江县",
"value":"407",
"childrens":[]},
{
"label":"岳西县",
"value":"408",
"childrens":[]}]},

{
"label":"蚌埠市",
"value":"37",
"childrens":[{
"label":"中市区",
"value":"409",
"childrens":[]},
{
"label":"东市区",
"value":"410",
"childrens":[]},
{
"label":"西市区",
"value":"411",
"childrens":[]},
{
"label":"郊区",
"value":"412",
"childrens":[]},
{
"label":"怀远县",
"value":"413",
"childrens":[]},
{
"label":"五河县",
"value":"414",
"childrens":[]},
{
"label":"固镇县",
"value":"415",
"childrens":[]}]},

{
"label":"巢湖市",
"value":"38",
"childrens":[{
"label":"居巢区",
"value":"416",
"childrens":[]},
{
"label":"庐江县",
"value":"417",
"childrens":[]},
{
"label":"无为县",
"value":"418",
"childrens":[]},
{
"label":"含山县",
"value":"419",
"childrens":[]},
{
"label":"和县",
"value":"420",
"childrens":[]}]},

{
"label":"池州市",
"value":"39",
"childrens":[{
"label":"贵池区",
"value":"421",
"childrens":[]},
{
"label":"东至县",
"value":"422",
"childrens":[]},
{
"label":"石台县",
"value":"423",
"childrens":[]},
{
"label":"青阳县",
"value":"424",
"childrens":[]}]},

{
"label":"滁州市",
"value":"40",
"childrens":[{
"label":"琅琊区",
"value":"425",
"childrens":[]},
{
"label":"南谯区",
"value":"426",
"childrens":[]},
{
"label":"天长市",
"value":"427",
"childrens":[]},
{
"label":"明光市",
"value":"428",
"childrens":[]},
{
"label":"来安县",
"value":"429",
"childrens":[]},
{
"label":"全椒县",
"value":"430",
"childrens":[]},
{
"label":"定远县",
"value":"431",
"childrens":[]},
{
"label":"凤阳县",
"value":"432",
"childrens":[]}]},

{
"label":"阜阳市",
"value":"41",
"childrens":[{
"label":"蚌山区",
"value":"433",
"childrens":[]},
{
"label":"龙子湖区",
"value":"434",
"childrens":[]},
{
"label":"禹会区",
"value":"435",
"childrens":[]},
{
"label":"淮上区",
"value":"436",
"childrens":[]},
{
"label":"颍州区",
"value":"437",
"childrens":[]},
{
"label":"颍东区",
"value":"438",
"childrens":[]},
{
"label":"颍泉区",
"value":"439",
"childrens":[]},
{
"label":"界首市",
"value":"440",
"childrens":[]},
{
"label":"临泉县",
"value":"441",
"childrens":[]},
{
"label":"太和县",
"value":"442",
"childrens":[]},
{
"label":"阜南县",
"value":"443",
"childrens":[]},
{
"label":"颖上县",
"value":"444",
"childrens":[]}]},

{
"label":"淮北市",
"value":"42",
"childrens":[{
"label":"相山区",
"value":"445",
"childrens":[]},
{
"label":"杜集区",
"value":"446",
"childrens":[]},
{
"label":"烈山区",
"value":"447",
"childrens":[]},
{
"label":"濉溪县",
"value":"448",
"childrens":[]}]},

{
"label":"淮南市",
"value":"43",
"childrens":[{
"label":"田家庵区",
"value":"449",
"childrens":[]},
{
"label":"大通区",
"value":"450",
"childrens":[]},
{
"label":"谢家集区",
"value":"451",
"childrens":[]},
{
"label":"八公山区",
"value":"452",
"childrens":[]},
{
"label":"潘集区",
"value":"453",
"childrens":[]},
{
"label":"凤台县",
"value":"454",
"childrens":[]}]},

{
"label":"黄山市",
"value":"44",
"childrens":[{
"label":"屯溪区",
"value":"455",
"childrens":[]},
{
"label":"黄山区",
"value":"456",
"childrens":[]},
{
"label":"徽州区",
"value":"457",
"childrens":[]},
{
"label":"歙县",
"value":"458",
"childrens":[]},
{
"label":"休宁县",
"value":"459",
"childrens":[]},
{
"label":"黟县",
"value":"460",
"childrens":[]},
{
"label":"祁门县",
"value":"461",
"childrens":[]}]},

{
"label":"六安市",
"value":"45",
"childrens":[{
"label":"金安区",
"value":"462",
"childrens":[]},
{
"label":"裕安区",
"value":"463",
"childrens":[]},
{
"label":"寿县",
"value":"464",
"childrens":[]},
{
"label":"霍邱县",
"value":"465",
"childrens":[]},
{
"label":"舒城县",
"value":"466",
"childrens":[]},
{
"label":"金寨县",
"value":"467",
"childrens":[]},
{
"label":"霍山县",
"value":"468",
"childrens":[]}]},

{
"label":"马鞍山市",
"value":"46",
"childrens":[{
"label":"雨山区",
"value":"469",
"childrens":[]},
{
"label":"花山区",
"value":"470",
"childrens":[]},
{
"label":"金家庄区",
"value":"471",
"childrens":[]},
{
"label":"当涂县",
"value":"472",
"childrens":[]}]},

{
"label":"宿州市",
"value":"47",
"childrens":[{
"label":"埇桥区",
"value":"473",
"childrens":[]},
{
"label":"砀山县",
"value":"474",
"childrens":[]},
{
"label":"萧县",
"value":"475",
"childrens":[]},
{
"label":"灵璧县",
"value":"476",
"childrens":[]},
{
"label":"泗县",
"value":"477",
"childrens":[]}]},

{
"label":"铜陵市",
"value":"48",
"childrens":[{
"label":"铜官山区",
"value":"478",
"childrens":[]},
{
"label":"狮子山区",
"value":"479",
"childrens":[]},
{
"label":"郊区",
"value":"480",
"childrens":[]},
{
"label":"铜陵县",
"value":"481",
"childrens":[]}]},

{
"label":"芜湖市",
"value":"49",
"childrens":[{
"label":"镜湖区",
"value":"482",
"childrens":[]},
{
"label":"弋江区",
"value":"483",
"childrens":[]},
{
"label":"鸠江区",
"value":"484",
"childrens":[]},
{
"label":"三山区",
"value":"485",
"childrens":[]},
{
"label":"芜湖县",
"value":"486",
"childrens":[]},
{
"label":"繁昌县",
"value":"487",
"childrens":[]},
{
"label":"南陵县",
"value":"488",
"childrens":[]}]},

{
"label":"宣城市",
"value":"50",
"childrens":[{
"label":"宣州区",
"value":"489",
"childrens":[]},
{
"label":"宁国市",
"value":"490",
"childrens":[]},
{
"label":"郎溪县",
"value":"491",
"childrens":[]},
{
"label":"广德县",
"value":"492",
"childrens":[]},
{
"label":"泾县",
"value":"493",
"childrens":[]},
{
"label":"绩溪县",
"value":"494",
"childrens":[]},
{
"label":"旌德县",
"value":"495",
"childrens":[]}]},

{
"label":"亳州市",
"value":"51",
"childrens":[{
"label":"涡阳县",
"value":"496",
"childrens":[]},
{
"label":"蒙城县",
"value":"497",
"childrens":[]},
{
"label":"利辛县",
"value":"498",
"childrens":[]},
{
"label":"谯城区",
"value":"499",
"childrens":[]}]},

{
"label":"合肥市",
"value":"3401",
"childrens":[{
"label":"庐阳区",
"value":"3402",
"childrens":[]},
{
"label":"瑶海区",
"value":"3403",
"childrens":[]},
{
"label":"蜀山区",
"value":"3404",
"childrens":[]},
{
"label":"包河区",
"value":"3405",
"childrens":[]},
{
"label":"长丰县",
"value":"3406",
"childrens":[]},
{
"label":"肥东县",
"value":"3407",
"childrens":[]},
{
"label":"肥西县",
"value":"3408",
"childrens":[]}]}]},


{
"label":"福建省",
"value":"4",
"childrens":[{
"label":"福州市",
"value":"53",
"childrens":[{
"label":"鼓楼区",
"value":"518",
"childrens":[]},
{
"label":"台江区",
"value":"519",
"childrens":[]},
{
"label":"仓山区",
"value":"520",
"childrens":[]},
{
"label":"马尾区",
"value":"521",
"childrens":[]},
{
"label":"晋安区",
"value":"522",
"childrens":[]},
{
"label":"福清市",
"value":"523",
"childrens":[]},
{
"label":"长乐市",
"value":"524",
"childrens":[]},
{
"label":"闽侯县",
"value":"525",
"childrens":[]},
{
"label":"连江县",
"value":"526",
"childrens":[]},
{
"label":"罗源县",
"value":"527",
"childrens":[]},
{
"label":"闽清县",
"value":"528",
"childrens":[]},
{
"label":"永泰县",
"value":"529",
"childrens":[]},
{
"label":"平潭县",
"value":"530",
"childrens":[]}]},

{
"label":"龙岩市",
"value":"54",
"childrens":[{
"label":"新罗区",
"value":"531",
"childrens":[]},
{
"label":"漳平市",
"value":"532",
"childrens":[]},
{
"label":"长汀县",
"value":"533",
"childrens":[]},
{
"label":"永定县",
"value":"534",
"childrens":[]},
{
"label":"上杭县",
"value":"535",
"childrens":[]},
{
"label":"武平县",
"value":"536",
"childrens":[]},
{
"label":"连城县",
"value":"537",
"childrens":[]}]},

{
"label":"南平市",
"value":"55",
"childrens":[{
"label":"延平区",
"value":"538",
"childrens":[]},
{
"label":"邵武市",
"value":"539",
"childrens":[]},
{
"label":"武夷山市",
"value":"540",
"childrens":[]},
{
"label":"建瓯市",
"value":"541",
"childrens":[]},
{
"label":"建阳市",
"value":"542",
"childrens":[]},
{
"label":"顺昌县",
"value":"543",
"childrens":[]},
{
"label":"浦城县",
"value":"544",
"childrens":[]},
{
"label":"光泽县",
"value":"545",
"childrens":[]},
{
"label":"松溪县",
"value":"546",
"childrens":[]},
{
"label":"政和县",
"value":"547",
"childrens":[]}]},

{
"label":"宁德市",
"value":"56",
"childrens":[{
"label":"蕉城区",
"value":"548",
"childrens":[]},
{
"label":"福安市",
"value":"549",
"childrens":[]},
{
"label":"福鼎市",
"value":"550",
"childrens":[]},
{
"label":"霞浦县",
"value":"551",
"childrens":[]},
{
"label":"古田县",
"value":"552",
"childrens":[]},
{
"label":"屏南县",
"value":"553",
"childrens":[]},
{
"label":"寿宁县",
"value":"554",
"childrens":[]},
{
"label":"周宁县",
"value":"555",
"childrens":[]},
{
"label":"柘荣县",
"value":"556",
"childrens":[]}]},

{
"label":"莆田市",
"value":"57",
"childrens":[{
"label":"城厢区",
"value":"557",
"childrens":[]},
{
"label":"涵江区",
"value":"558",
"childrens":[]},
{
"label":"荔城区",
"value":"559",
"childrens":[]},
{
"label":"秀屿区",
"value":"560",
"childrens":[]},
{
"label":"仙游县",
"value":"561",
"childrens":[]}]},

{
"label":"泉州市",
"value":"58",
"childrens":[{
"label":"鲤城区",
"value":"562",
"childrens":[]},
{
"label":"丰泽区",
"value":"563",
"childrens":[]},
{
"label":"洛江区",
"value":"564",
"childrens":[]},
{
"label":"清濛开发区",
"value":"565",
"childrens":[]},
{
"label":"泉港区",
"value":"566",
"childrens":[]},
{
"label":"石狮市",
"value":"567",
"childrens":[]},
{
"label":"晋江市",
"value":"568",
"childrens":[]},
{
"label":"南安市",
"value":"569",
"childrens":[]},
{
"label":"惠安县",
"value":"570",
"childrens":[]},
{
"label":"安溪县",
"value":"571",
"childrens":[]},
{
"label":"永春县",
"value":"572",
"childrens":[]},
{
"label":"德化县",
"value":"573",
"childrens":[]},
{
"label":"金门县",
"value":"574",
"childrens":[]}]},

{
"label":"三明市",
"value":"59",
"childrens":[{
"label":"梅列区",
"value":"575",
"childrens":[]},
{
"label":"三元区",
"value":"576",
"childrens":[]},
{
"label":"永安市",
"value":"577",
"childrens":[]},
{
"label":"明溪县",
"value":"578",
"childrens":[]},
{
"label":"清流县",
"value":"579",
"childrens":[]},
{
"label":"宁化县",
"value":"580",
"childrens":[]},
{
"label":"大田县",
"value":"581",
"childrens":[]},
{
"label":"尤溪县",
"value":"582",
"childrens":[]},
{
"label":"沙县",
"value":"583",
"childrens":[]},
{
"label":"将乐县",
"value":"584",
"childrens":[]},
{
"label":"泰宁县",
"value":"585",
"childrens":[]},
{
"label":"建宁县",
"value":"586",
"childrens":[]}]},

{
"label":"厦门市",
"value":"60",
"childrens":[{
"label":"思明区",
"value":"587",
"childrens":[]},
{
"label":"海沧区",
"value":"588",
"childrens":[]},
{
"label":"湖里区",
"value":"589",
"childrens":[]},
{
"label":"集美区",
"value":"590",
"childrens":[]},
{
"label":"同安区",
"value":"591",
"childrens":[]},
{
"label":"翔安区",
"value":"592",
"childrens":[]}]},

{
"label":"漳州市",
"value":"61",
"childrens":[{
"label":"芗城区",
"value":"593",
"childrens":[]},
{
"label":"龙文区",
"value":"594",
"childrens":[]},
{
"label":"龙海市",
"value":"595",
"childrens":[]},
{
"label":"云霄县",
"value":"596",
"childrens":[]},
{
"label":"漳浦县",
"value":"597",
"childrens":[]},
{
"label":"诏安县",
"value":"598",
"childrens":[]},
{
"label":"长泰县",
"value":"599",
"childrens":[]},
{
"label":"东山县",
"value":"600",
"childrens":[]},
{
"label":"南靖县",
"value":"601",
"childrens":[]},
{
"label":"平和县",
"value":"602",
"childrens":[]},
{
"label":"华安县",
"value":"603",
"childrens":[]}]}]},


{
"label":"甘肃省",
"value":"5",
"childrens":[{
"label":"兰州市",
"value":"62",
"childrens":[{
"label":"皋兰县",
"value":"604",
"childrens":[]},
{
"label":"城关区",
"value":"605",
"childrens":[]},
{
"label":"七里河区",
"value":"606",
"childrens":[]},
{
"label":"西固区",
"value":"607",
"childrens":[]},
{
"label":"安宁区",
"value":"608",
"childrens":[]},
{
"label":"红古区",
"value":"609",
"childrens":[]},
{
"label":"永登县",
"value":"610",
"childrens":[]},
{
"label":"榆中县",
"value":"611",
"childrens":[]}]},

{
"label":"白银市",
"value":"63",
"childrens":[{
"label":"白银区",
"value":"612",
"childrens":[]},
{
"label":"平川区",
"value":"613",
"childrens":[]},
{
"label":"会宁县",
"value":"614",
"childrens":[]},
{
"label":"景泰县",
"value":"615",
"childrens":[]},
{
"label":"靖远县",
"value":"616",
"childrens":[]}]},

{
"label":"定西市",
"value":"64",
"childrens":[{
"label":"临洮县",
"value":"617",
"childrens":[]},
{
"label":"陇西县",
"value":"618",
"childrens":[]},
{
"label":"通渭县",
"value":"619",
"childrens":[]},
{
"label":"渭源县",
"value":"620",
"childrens":[]},
{
"label":"漳县",
"value":"621",
"childrens":[]},
{
"label":"岷县",
"value":"622",
"childrens":[]},
{
"label":"安定区",
"value":"623",
"childrens":[]},
{
"label":"安定区",
"value":"624",
"childrens":[]}]},

{
"label":"甘南市",
"value":"65",
"childrens":[{
"label":"合作市",
"value":"625",
"childrens":[]},
{
"label":"临潭县",
"value":"626",
"childrens":[]},
{
"label":"卓尼县",
"value":"627",
"childrens":[]},
{
"label":"舟曲县",
"value":"628",
"childrens":[]},
{
"label":"迭部县",
"value":"629",
"childrens":[]},
{
"label":"玛曲县",
"value":"630",
"childrens":[]},
{
"label":"碌曲县",
"value":"631",
"childrens":[]},
{
"label":"夏河县",
"value":"632",
"childrens":[]}]},

{
"label":"嘉峪关市",
"value":"66",
"childrens":[{
"label":"嘉峪关市",
"value":"633",
"childrens":[]}]},

{
"label":"金昌市",
"value":"67",
"childrens":[{
"label":"金川区",
"value":"634",
"childrens":[]},
{
"label":"永昌县",
"value":"635",
"childrens":[]}]},

{
"label":"酒泉市",
"value":"68",
"childrens":[{
"label":"肃州区",
"value":"636",
"childrens":[]},
{
"label":"玉门市",
"value":"637",
"childrens":[]},
{
"label":"敦煌市",
"value":"638",
"childrens":[]},
{
"label":"金塔县",
"value":"639",
"childrens":[]},
{
"label":"瓜州县",
"value":"640",
"childrens":[]},
{
"label":"肃北",
"value":"641",
"childrens":[]},
{
"label":"阿克塞",
"value":"642",
"childrens":[]}]},

{
"label":"临夏市",
"value":"69",
"childrens":[{
"label":"临夏市",
"value":"643",
"childrens":[]},
{
"label":"临夏县",
"value":"644",
"childrens":[]},
{
"label":"康乐县",
"value":"645",
"childrens":[]},
{
"label":"永靖县",
"value":"646",
"childrens":[]},
{
"label":"广河县",
"value":"647",
"childrens":[]},
{
"label":"和政县",
"value":"648",
"childrens":[]},
{
"label":"东乡族自治县",
"value":"649",
"childrens":[]},
{
"label":"积石山",
"value":"650",
"childrens":[]}]},

{
"label":"陇南市",
"value":"70",
"childrens":[{
"label":"成县",
"value":"651",
"childrens":[]},
{
"label":"徽县",
"value":"652",
"childrens":[]},
{
"label":"康县",
"value":"653",
"childrens":[]},
{
"label":"礼县",
"value":"654",
"childrens":[]},
{
"label":"两当县",
"value":"655",
"childrens":[]},
{
"label":"文县",
"value":"656",
"childrens":[]},
{
"label":"西和县",
"value":"657",
"childrens":[]},
{
"label":"宕昌县",
"value":"658",
"childrens":[]},
{
"label":"武都区",
"value":"659",
"childrens":[]}]},

{
"label":"平凉市",
"value":"71",
"childrens":[{
"label":"崇信县",
"value":"660",
"childrens":[]},
{
"label":"华亭县",
"value":"661",
"childrens":[]},
{
"label":"静宁县",
"value":"662",
"childrens":[]},
{
"label":"灵台县",
"value":"663",
"childrens":[]},
{
"label":"崆峒区",
"value":"664",
"childrens":[]},
{
"label":"庄浪县",
"value":"665",
"childrens":[]},
{
"label":"泾川县",
"value":"666",
"childrens":[]}]},

{
"label":"庆阳市",
"value":"72",
"childrens":[{
"label":"合水县",
"value":"667",
"childrens":[]},
{
"label":"华池县",
"value":"668",
"childrens":[]},
{
"label":"环县",
"value":"669",
"childrens":[]},
{
"label":"宁县",
"value":"670",
"childrens":[]},
{
"label":"庆城县",
"value":"671",
"childrens":[]},
{
"label":"西峰区",
"value":"672",
"childrens":[]},
{
"label":"镇原县",
"value":"673",
"childrens":[]},
{
"label":"正宁县",
"value":"674",
"childrens":[]}]},

{
"label":"天水市",
"value":"73",
"childrens":[{
"label":"甘谷县",
"value":"675",
"childrens":[]},
{
"label":"秦安县",
"value":"676",
"childrens":[]},
{
"label":"清水县",
"value":"677",
"childrens":[]},
{
"label":"秦州区",
"value":"678",
"childrens":[]},
{
"label":"麦积区",
"value":"679",
"childrens":[]},
{
"label":"武山县",
"value":"680",
"childrens":[]},
{
"label":"张家川",
"value":"681",
"childrens":[]}]},

{
"label":"武威市",
"value":"74",
"childrens":[{
"label":"古浪县",
"value":"682",
"childrens":[]},
{
"label":"民勤县",
"value":"683",
"childrens":[]},
{
"label":"天祝",
"value":"684",
"childrens":[]},
{
"label":"凉州区",
"value":"685",
"childrens":[]}]},

{
"label":"张掖市",
"value":"75",
"childrens":[{
"label":"高台县",
"value":"686",
"childrens":[]},
{
"label":"临泽县",
"value":"687",
"childrens":[]},
{
"label":"民乐县",
"value":"688",
"childrens":[]},
{
"label":"山丹县",
"value":"689",
"childrens":[]},
{
"label":"肃南",
"value":"690",
"childrens":[]},
{
"label":"甘州区",
"value":"691",
"childrens":[]}]}]},


{
"label":"广东省",
"value":"6",
"childrens":[{
"label":"广州市",
"value":"76",
"childrens":[{
"label":"从化市",
"value":"692",
"childrens":[]},
{
"label":"天河区",
"value":"693",
"childrens":[]},
{
"label":"东山区",
"value":"694",
"childrens":[]},
{
"label":"白云区",
"value":"695",
"childrens":[]},
{
"label":"海珠区",
"value":"696",
"childrens":[]},
{
"label":"荔湾区",
"value":"697",
"childrens":[]},
{
"label":"越秀区",
"value":"698",
"childrens":[]},
{
"label":"黄埔区",
"value":"699",
"childrens":[]},
{
"label":"番禺区",
"value":"700",
"childrens":[]},
{
"label":"花都区",
"value":"701",
"childrens":[]},
{
"label":"增城区",
"value":"702",
"childrens":[]},
{
"label":"从化区",
"value":"703",
"childrens":[]},
{
"label":"市郊",
"value":"704",
"childrens":[]}]},

{
"label":"深圳市",
"value":"77",
"childrens":[{
"label":"福田区",
"value":"705",
"childrens":[]},
{
"label":"罗湖区",
"value":"706",
"childrens":[]},
{
"label":"南山区",
"value":"707",
"childrens":[]},
{
"label":"宝安区",
"value":"708",
"childrens":[]},
{
"label":"龙岗区",
"value":"709",
"childrens":[]},
{
"label":"盐田区",
"value":"710",
"childrens":[]}]},

{
"label":"潮州市",
"value":"78",
"childrens":[{
"label":"湘桥区",
"value":"711",
"childrens":[]},
{
"label":"潮安县",
"value":"712",
"childrens":[]},
{
"label":"饶平县",
"value":"713",
"childrens":[]}]},

{
"label":"东莞市",
"value":"79",
"childrens":[{
"label":"南城区",
"value":"714",
"childrens":[]},
{
"label":"东城区",
"value":"715",
"childrens":[]},
{
"label":"万江区",
"value":"716",
"childrens":[]},
{
"label":"莞城区",
"value":"717",
"childrens":[]},
{
"label":"石龙镇",
"value":"718",
"childrens":[]},
{
"label":"虎门镇",
"value":"719",
"childrens":[]},
{
"label":"麻涌镇",
"value":"720",
"childrens":[]},
{
"label":"道滘镇",
"value":"721",
"childrens":[]},
{
"label":"石碣镇",
"value":"722",
"childrens":[]},
{
"label":"沙田镇",
"value":"723",
"childrens":[]},
{
"label":"望牛墩镇",
"value":"724",
"childrens":[]},
{
"label":"洪梅镇",
"value":"725",
"childrens":[]},
{
"label":"茶山镇",
"value":"726",
"childrens":[]},
{
"label":"寮步镇",
"value":"727",
"childrens":[]},
{
"label":"大岭山镇",
"value":"728",
"childrens":[]},
{
"label":"大朗镇",
"value":"729",
"childrens":[]},
{
"label":"黄江镇",
"value":"730",
"childrens":[]},
{
"label":"樟木头",
"value":"731",
"childrens":[]},
{
"label":"凤岗镇",
"value":"732",
"childrens":[]},
{
"label":"塘厦镇",
"value":"733",
"childrens":[]},
{
"label":"谢岗镇",
"value":"734",
"childrens":[]},
{
"label":"厚街镇",
"value":"735",
"childrens":[]},
{
"label":"清溪镇",
"value":"736",
"childrens":[]},
{
"label":"常平镇",
"value":"737",
"childrens":[]},
{
"label":"桥头镇",
"value":"738",
"childrens":[]},
{
"label":"横沥镇",
"value":"739",
"childrens":[]},
{
"label":"东坑镇",
"value":"740",
"childrens":[]},
{
"label":"企石镇",
"value":"741",
"childrens":[]},
{
"label":"石排镇",
"value":"742",
"childrens":[]},
{
"label":"长安镇",
"value":"743",
"childrens":[]},
{
"label":"中堂镇",
"value":"744",
"childrens":[]},
{
"label":"高埗镇",
"value":"745",
"childrens":[]}]},

{
"label":"佛山市",
"value":"80",
"childrens":[{
"label":"禅城区",
"value":"746",
"childrens":[]},
{
"label":"南海区",
"value":"747",
"childrens":[]},
{
"label":"顺德区",
"value":"748",
"childrens":[]},
{
"label":"三水区",
"value":"749",
"childrens":[]},
{
"label":"高明区",
"value":"750",
"childrens":[]}]},

{
"label":"河源市",
"value":"81",
"childrens":[{
"label":"东源县",
"value":"751",
"childrens":[]},
{
"label":"和平县",
"value":"752",
"childrens":[]},
{
"label":"源城区",
"value":"753",
"childrens":[]},
{
"label":"连平县",
"value":"754",
"childrens":[]},
{
"label":"龙川县",
"value":"755",
"childrens":[]},
{
"label":"紫金县",
"value":"756",
"childrens":[]}]},

{
"label":"惠州市",
"value":"82",
"childrens":[{
"label":"惠阳区",
"value":"757",
"childrens":[]},
{
"label":"惠城区",
"value":"758",
"childrens":[]},
{
"label":"大亚湾",
"value":"759",
"childrens":[]},
{
"label":"博罗县",
"value":"760",
"childrens":[]},
{
"label":"惠东县",
"value":"761",
"childrens":[]},
{
"label":"龙门县",
"value":"762",
"childrens":[]}]},

{
"label":"江门市",
"value":"83",
"childrens":[{
"label":"江海区",
"value":"763",
"childrens":[]},
{
"label":"蓬江区",
"value":"764",
"childrens":[]},
{
"label":"新会区",
"value":"765",
"childrens":[]},
{
"label":"台山市",
"value":"766",
"childrens":[]},
{
"label":"开平市",
"value":"767",
"childrens":[]},
{
"label":"鹤山市",
"value":"768",
"childrens":[]},
{
"label":"恩平市",
"value":"769",
"childrens":[]}]},

{
"label":"揭阳市",
"value":"84",
"childrens":[{
"label":"榕城区",
"value":"770",
"childrens":[]},
{
"label":"普宁市",
"value":"771",
"childrens":[]},
{
"label":"揭东县",
"value":"772",
"childrens":[]},
{
"label":"揭西县",
"value":"773",
"childrens":[]},
{
"label":"惠来县",
"value":"774",
"childrens":[]}]},

{
"label":"茂名市",
"value":"85",
"childrens":[{
"label":"茂南区",
"value":"775",
"childrens":[]},
{
"label":"茂港区",
"value":"776",
"childrens":[]},
{
"label":"高州市",
"value":"777",
"childrens":[]},
{
"label":"化州市",
"value":"778",
"childrens":[]},
{
"label":"信宜市",
"value":"779",
"childrens":[]},
{
"label":"电白县",
"value":"780",
"childrens":[]}]},

{
"label":"梅州市",
"value":"86",
"childrens":[{
"label":"梅县",
"value":"781",
"childrens":[]},
{
"label":"梅江区",
"value":"782",
"childrens":[]},
{
"label":"兴宁市",
"value":"783",
"childrens":[]},
{
"label":"大埔县",
"value":"784",
"childrens":[]},
{
"label":"丰顺县",
"value":"785",
"childrens":[]},
{
"label":"五华县",
"value":"786",
"childrens":[]},
{
"label":"平远县",
"value":"787",
"childrens":[]},
{
"label":"蕉岭县",
"value":"788",
"childrens":[]}]},

{
"label":"清远市",
"value":"87",
"childrens":[{
"label":"清城区",
"value":"789",
"childrens":[]},
{
"label":"英德市",
"value":"790",
"childrens":[]},
{
"label":"连州市",
"value":"791",
"childrens":[]},
{
"label":"佛冈县",
"value":"792",
"childrens":[]},
{
"label":"阳山县",
"value":"793",
"childrens":[]},
{
"label":"清新县",
"value":"794",
"childrens":[]},
{
"label":"连山",
"value":"795",
"childrens":[]},
{
"label":"连南",
"value":"796",
"childrens":[]}]},

{
"label":"汕头市",
"value":"88",
"childrens":[{
"label":"南澳县",
"value":"797",
"childrens":[]},
{
"label":"潮阳区",
"value":"798",
"childrens":[]},
{
"label":"澄海区",
"value":"799",
"childrens":[]},
{
"label":"龙湖区",
"value":"800",
"childrens":[]},
{
"label":"金平区",
"value":"801",
"childrens":[]},
{
"label":"濠江区",
"value":"802",
"childrens":[]},
{
"label":"潮南区",
"value":"803",
"childrens":[]}]},

{
"label":"汕尾市",
"value":"89",
"childrens":[{
"label":"城区",
"value":"804",
"childrens":[]},
{
"label":"陆丰市",
"value":"805",
"childrens":[]},
{
"label":"海丰县",
"value":"806",
"childrens":[]},
{
"label":"陆河县",
"value":"807",
"childrens":[]}]},

{
"label":"韶关市",
"value":"90",
"childrens":[{
"label":"曲江县",
"value":"808",
"childrens":[]},
{
"label":"浈江区",
"value":"809",
"childrens":[]},
{
"label":"武江区",
"value":"810",
"childrens":[]},
{
"label":"曲江区",
"value":"811",
"childrens":[]},
{
"label":"乐昌市",
"value":"812",
"childrens":[]},
{
"label":"南雄市",
"value":"813",
"childrens":[]},
{
"label":"始兴县",
"value":"814",
"childrens":[]},
{
"label":"仁化县",
"value":"815",
"childrens":[]},
{
"label":"翁源县",
"value":"816",
"childrens":[]},
{
"label":"新丰县",
"value":"817",
"childrens":[]},
{
"label":"乳源",
"value":"818",
"childrens":[]}]},

{
"label":"阳江市",
"value":"91",
"childrens":[{
"label":"江城区",
"value":"819",
"childrens":[]},
{
"label":"阳春市",
"value":"820",
"childrens":[]},
{
"label":"阳西县",
"value":"821",
"childrens":[]},
{
"label":"阳东县",
"value":"822",
"childrens":[]}]},

{
"label":"云浮市",
"value":"92",
"childrens":[{
"label":"云城区",
"value":"823",
"childrens":[]},
{
"label":"罗定市",
"value":"824",
"childrens":[]},
{
"label":"新兴县",
"value":"825",
"childrens":[]},
{
"label":"郁南县",
"value":"826",
"childrens":[]},
{
"label":"云安县",
"value":"827",
"childrens":[]}]},

{
"label":"湛江市",
"value":"93",
"childrens":[{
"label":"赤坎区",
"value":"828",
"childrens":[]},
{
"label":"霞山区",
"value":"829",
"childrens":[]},
{
"label":"坡头区",
"value":"830",
"childrens":[]},
{
"label":"麻章区",
"value":"831",
"childrens":[]},
{
"label":"廉江市",
"value":"832",
"childrens":[]},
{
"label":"雷州市",
"value":"833",
"childrens":[]},
{
"label":"吴川市",
"value":"834",
"childrens":[]},
{
"label":"遂溪县",
"value":"835",
"childrens":[]},
{
"label":"徐闻县",
"value":"836",
"childrens":[]}]},

{
"label":"肇庆市",
"value":"94",
"childrens":[{
"label":"肇庆市",
"value":"837",
"childrens":[]},
{
"label":"高要市",
"value":"838",
"childrens":[]},
{
"label":"四会市",
"value":"839",
"childrens":[]},
{
"label":"广宁县",
"value":"840",
"childrens":[]},
{
"label":"怀集县",
"value":"841",
"childrens":[]},
{
"label":"封开县",
"value":"842",
"childrens":[]},
{
"label":"德庆县",
"value":"843",
"childrens":[]}]},

{
"label":"中山市",
"value":"95",
"childrens":[{
"label":"石岐街道",
"value":"844",
"childrens":[]},
{
"label":"东区街道",
"value":"845",
"childrens":[]},
{
"label":"西区街道",
"value":"846",
"childrens":[]},
{
"label":"环城街道",
"value":"847",
"childrens":[]},
{
"label":"中山港街道",
"value":"848",
"childrens":[]},
{
"label":"五桂山街道",
"value":"849",
"childrens":[]}]},

{
"label":"珠海市",
"value":"96",
"childrens":[{
"label":"香洲区",
"value":"850",
"childrens":[]},
{
"label":"斗门区",
"value":"851",
"childrens":[]},
{
"label":"金湾区",
"value":"852",
"childrens":[]}]}]},


{
"label":"广西壮族自治区",
"value":"7",
"childrens":[{
"label":"南宁市",
"value":"97",
"childrens":[{
"label":"邕宁区",
"value":"853",
"childrens":[]},
{
"label":"青秀区",
"value":"854",
"childrens":[]},
{
"label":"兴宁区",
"value":"855",
"childrens":[]},
{
"label":"良庆区",
"value":"856",
"childrens":[]},
{
"label":"西乡塘区",
"value":"857",
"childrens":[]},
{
"label":"江南区",
"value":"858",
"childrens":[]},
{
"label":"武鸣县",
"value":"859",
"childrens":[]},
{
"label":"隆安县",
"value":"860",
"childrens":[]},
{
"label":"马山县",
"value":"861",
"childrens":[]},
{
"label":"上林县",
"value":"862",
"childrens":[]},
{
"label":"宾阳县",
"value":"863",
"childrens":[]},
{
"label":"横县",
"value":"864",
"childrens":[]}]},

{
"label":"桂林市",
"value":"98",
"childrens":[{
"label":"秀峰区",
"value":"865",
"childrens":[]},
{
"label":"叠彩区",
"value":"866",
"childrens":[]},
{
"label":"象山区",
"value":"867",
"childrens":[]},
{
"label":"七星区",
"value":"868",
"childrens":[]},
{
"label":"雁山区",
"value":"869",
"childrens":[]},
{
"label":"阳朔县",
"value":"870",
"childrens":[]},
{
"label":"临桂县",
"value":"871",
"childrens":[]},
{
"label":"灵川县",
"value":"872",
"childrens":[]},
{
"label":"全州县",
"value":"873",
"childrens":[]},
{
"label":"平乐县",
"value":"874",
"childrens":[]},
{
"label":"兴安县",
"value":"875",
"childrens":[]},
{
"label":"灌阳县",
"value":"876",
"childrens":[]},
{
"label":"荔浦县",
"value":"877",
"childrens":[]},
{
"label":"资源县",
"value":"878",
"childrens":[]},
{
"label":"永福县",
"value":"879",
"childrens":[]},
{
"label":"龙胜",
"value":"880",
"childrens":[]},
{
"label":"恭城",
"value":"881",
"childrens":[]}]},

{
"label":"百色市",
"value":"99",
"childrens":[{
"label":"右江区",
"value":"882",
"childrens":[]},
{
"label":"凌云县",
"value":"883",
"childrens":[]},
{
"label":"平果县",
"value":"884",
"childrens":[]},
{
"label":"西林县",
"value":"885",
"childrens":[]},
{
"label":"乐业县",
"value":"886",
"childrens":[]},
{
"label":"德保县",
"value":"887",
"childrens":[]},
{
"label":"田林县",
"value":"888",
"childrens":[]},
{
"label":"田阳县",
"value":"889",
"childrens":[]},
{
"label":"靖西县",
"value":"890",
"childrens":[]},
{
"label":"田东县",
"value":"891",
"childrens":[]},
{
"label":"那坡县",
"value":"892",
"childrens":[]},
{
"label":"隆林",
"value":"893",
"childrens":[]}]},

{
"label":"北海市",
"value":"100",
"childrens":[{
"label":"海城区",
"value":"894",
"childrens":[]},
{
"label":"银海区",
"value":"895",
"childrens":[]},
{
"label":"铁山港区",
"value":"896",
"childrens":[]},
{
"label":"合浦县",
"value":"897",
"childrens":[]}]},

{
"label":"崇左市",
"value":"101",
"childrens":[{
"label":"江州区",
"value":"898",
"childrens":[]},
{
"label":"凭祥市",
"value":"899",
"childrens":[]},
{
"label":"宁明县",
"value":"900",
"childrens":[]},
{
"label":"扶绥县",
"value":"901",
"childrens":[]},
{
"label":"龙州县",
"value":"902",
"childrens":[]},
{
"label":"大新县",
"value":"903",
"childrens":[]},
{
"label":"天等县",
"value":"904",
"childrens":[]}]},

{
"label":"防城港市",
"value":"102",
"childrens":[{
"label":"港口区",
"value":"905",
"childrens":[]},
{
"label":"防城区",
"value":"906",
"childrens":[]},
{
"label":"东兴市",
"value":"907",
"childrens":[]},
{
"label":"上思县",
"value":"908",
"childrens":[]}]},

{
"label":"贵港市",
"value":"103",
"childrens":[{
"label":"港北区",
"value":"909",
"childrens":[]},
{
"label":"港南区",
"value":"910",
"childrens":[]},
{
"label":"覃塘区",
"value":"911",
"childrens":[]},
{
"label":"桂平市",
"value":"912",
"childrens":[]},
{
"label":"平南县",
"value":"913",
"childrens":[]}]},

{
"label":"河池市",
"value":"104",
"childrens":[{
"label":"金城江区",
"value":"914",
"childrens":[]},
{
"label":"宜州市",
"value":"915",
"childrens":[]},
{
"label":"天峨县",
"value":"916",
"childrens":[]},
{
"label":"凤山县",
"value":"917",
"childrens":[]},
{
"label":"南丹县",
"value":"918",
"childrens":[]},
{
"label":"东兰县",
"value":"919",
"childrens":[]},
{
"label":"都安",
"value":"920",
"childrens":[]},
{
"label":"罗城",
"value":"921",
"childrens":[]},
{
"label":"巴马",
"value":"922",
"childrens":[]},
{
"label":"环江",
"value":"923",
"childrens":[]},
{
"label":"大化",
"value":"924",
"childrens":[]}]},

{
"label":"贺州市",
"value":"105",
"childrens":[{
"label":"八步区",
"value":"925",
"childrens":[]},
{
"label":"钟山县",
"value":"926",
"childrens":[]},
{
"label":"昭平县",
"value":"927",
"childrens":[]},
{
"label":"富川",
"value":"928",
"childrens":[]}]},

{
"label":"来宾市",
"value":"106",
"childrens":[{
"label":"兴宾区",
"value":"929",
"childrens":[]},
{
"label":"合山市",
"value":"930",
"childrens":[]},
{
"label":"象州县",
"value":"931",
"childrens":[]},
{
"label":"武宣县",
"value":"932",
"childrens":[]},
{
"label":"忻城县",
"value":"933",
"childrens":[]},
{
"label":"金秀",
"value":"934",
"childrens":[]}]},

{
"label":"柳州市",
"value":"107",
"childrens":[{
"label":"城中区",
"value":"935",
"childrens":[]},
{
"label":"鱼峰区",
"value":"936",
"childrens":[]},
{
"label":"柳北区",
"value":"937",
"childrens":[]},
{
"label":"柳南区",
"value":"938",
"childrens":[]},
{
"label":"柳江县",
"value":"939",
"childrens":[]},
{
"label":"柳城县",
"value":"940",
"childrens":[]},
{
"label":"鹿寨县",
"value":"941",
"childrens":[]},
{
"label":"融安县",
"value":"942",
"childrens":[]},
{
"label":"融水",
"value":"943",
"childrens":[]},
{
"label":"三江",
"value":"944",
"childrens":[]}]},

{
"label":"钦州市",
"value":"108",
"childrens":[{
"label":"钦南区",
"value":"945",
"childrens":[]},
{
"label":"钦北区",
"value":"946",
"childrens":[]},
{
"label":"灵山县",
"value":"947",
"childrens":[]},
{
"label":"浦北县",
"value":"948",
"childrens":[]}]},

{
"label":"梧州市",
"value":"109",
"childrens":[{
"label":"万秀区",
"value":"949",
"childrens":[]},
{
"label":"蝶山区",
"value":"950",
"childrens":[]},
{
"label":"长洲区",
"value":"951",
"childrens":[]},
{
"label":"岑溪市",
"value":"952",
"childrens":[]},
{
"label":"苍梧县",
"value":"953",
"childrens":[]},
{
"label":"藤县",
"value":"954",
"childrens":[]},
{
"label":"蒙山县",
"value":"955",
"childrens":[]}]},

{
"label":"玉林市",
"value":"110",
"childrens":[{
"label":"玉州区",
"value":"956",
"childrens":[]},
{
"label":"北流市",
"value":"957",
"childrens":[]},
{
"label":"容县",
"value":"958",
"childrens":[]},
{
"label":"陆川县",
"value":"959",
"childrens":[]},
{
"label":"博白县",
"value":"960",
"childrens":[]},
{
"label":"兴业县",
"value":"961",
"childrens":[]}]}]},


{
"label":"贵州省",
"value":"8",
"childrens":[{
"label":"贵阳市",
"value":"111",
"childrens":[{
"label":"南明区",
"value":"962",
"childrens":[]},
{
"label":"云岩区",
"value":"963",
"childrens":[]},
{
"label":"花溪区",
"value":"964",
"childrens":[]},
{
"label":"乌当区",
"value":"965",
"childrens":[]},
{
"label":"白云区",
"value":"966",
"childrens":[]},
{
"label":"小河区",
"value":"967",
"childrens":[]},
{
"label":"金阳新区",
"value":"968",
"childrens":[]},
{
"label":"新天园区",
"value":"969",
"childrens":[]},
{
"label":"清镇市",
"value":"970",
"childrens":[]},
{
"label":"开阳县",
"value":"971",
"childrens":[]},
{
"label":"修文县",
"value":"972",
"childrens":[]},
{
"label":"息烽县",
"value":"973",
"childrens":[]}]},

{
"label":"安顺市",
"value":"112",
"childrens":[{
"label":"西秀区",
"value":"974",
"childrens":[]},
{
"label":"关岭",
"value":"975",
"childrens":[]},
{
"label":"镇宁",
"value":"976",
"childrens":[]},
{
"label":"紫云",
"value":"977",
"childrens":[]},
{
"label":"平坝县",
"value":"978",
"childrens":[]},
{
"label":"普定县",
"value":"979",
"childrens":[]}]},

{
"label":"毕节市",
"value":"113",
"childrens":[{
"label":"毕节市",
"value":"980",
"childrens":[]},
{
"label":"大方县",
"value":"981",
"childrens":[]},
{
"label":"黔西县",
"value":"982",
"childrens":[]},
{
"label":"金沙县",
"value":"983",
"childrens":[]},
{
"label":"织金县",
"value":"984",
"childrens":[]},
{
"label":"纳雍县",
"value":"985",
"childrens":[]},
{
"label":"赫章县",
"value":"986",
"childrens":[]},
{
"label":"威宁",
"value":"987",
"childrens":[]}]},

{
"label":"六盘水市",
"value":"114",
"childrens":[{
"label":"钟山区",
"value":"988",
"childrens":[]},
{
"label":"六枝特区",
"value":"989",
"childrens":[]},
{
"label":"水城县",
"value":"990",
"childrens":[]},
{
"label":"盘县",
"value":"991",
"childrens":[]}]},

{
"label":"黔东南苗族侗族自治州",
"value":"115",
"childrens":[{
"label":"凯里市",
"value":"992",
"childrens":[]},
{
"label":"黄平县",
"value":"993",
"childrens":[]},
{
"label":"施秉县",
"value":"994",
"childrens":[]},
{
"label":"三穗县",
"value":"995",
"childrens":[]},
{
"label":"镇远县",
"value":"996",
"childrens":[]},
{
"label":"岑巩县",
"value":"997",
"childrens":[]},
{
"label":"天柱县",
"value":"998",
"childrens":[]},
{
"label":"锦屏县",
"value":"999",
"childrens":[]},
{
"label":"剑河县",
"value":"1000",
"childrens":[]},
{
"label":"台江县",
"value":"1001",
"childrens":[]},
{
"label":"黎平县",
"value":"1002",
"childrens":[]},
{
"label":"榕江县",
"value":"1003",
"childrens":[]},
{
"label":"从江县",
"value":"1004",
"childrens":[]},
{
"label":"雷山县",
"value":"1005",
"childrens":[]},
{
"label":"麻江县",
"value":"1006",
"childrens":[]},
{
"label":"丹寨县",
"value":"1007",
"childrens":[]}]},

{
"label":"黔南布依族苗族自治州",
"value":"116",
"childrens":[{
"label":"都匀市",
"value":"1008",
"childrens":[]},
{
"label":"福泉市",
"value":"1009",
"childrens":[]},
{
"label":"荔波县",
"value":"1010",
"childrens":[]},
{
"label":"贵定县",
"value":"1011",
"childrens":[]},
{
"label":"瓮安县",
"value":"1012",
"childrens":[]},
{
"label":"独山县",
"value":"1013",
"childrens":[]},
{
"label":"平塘县",
"value":"1014",
"childrens":[]},
{
"label":"罗甸县",
"value":"1015",
"childrens":[]},
{
"label":"长顺县",
"value":"1016",
"childrens":[]},
{
"label":"龙里县",
"value":"1017",
"childrens":[]},
{
"label":"惠水县",
"value":"1018",
"childrens":[]},
{
"label":"三都",
"value":"1019",
"childrens":[]}]},

{
"label":"黔西南布依族苗族自治州",
"value":"117",
"childrens":[{
"label":"兴义市",
"value":"1020",
"childrens":[]},
{
"label":"兴仁县",
"value":"1021",
"childrens":[]},
{
"label":"普安县",
"value":"1022",
"childrens":[]},
{
"label":"晴隆县",
"value":"1023",
"childrens":[]},
{
"label":"贞丰县",
"value":"1024",
"childrens":[]},
{
"label":"望谟县",
"value":"1025",
"childrens":[]},
{
"label":"册亨县",
"value":"1026",
"childrens":[]},
{
"label":"安龙县",
"value":"1027",
"childrens":[]}]},

{
"label":"铜仁市",
"value":"118",
"childrens":[{
"label":"铜仁市",
"value":"1028",
"childrens":[]},
{
"label":"江口县",
"value":"1029",
"childrens":[]},
{
"label":"石阡县",
"value":"1030",
"childrens":[]},
{
"label":"思南县",
"value":"1031",
"childrens":[]},
{
"label":"德江县",
"value":"1032",
"childrens":[]},
{
"label":"玉屏",
"value":"1033",
"childrens":[]},
{
"label":"印江",
"value":"1034",
"childrens":[]},
{
"label":"沿河",
"value":"1035",
"childrens":[]},
{
"label":"松桃",
"value":"1036",
"childrens":[]},
{
"label":"万山特区",
"value":"1037",
"childrens":[]}]},

{
"label":"遵义市",
"value":"119",
"childrens":[{
"label":"红花岗区",
"value":"1038",
"childrens":[]},
{
"label":"务川县",
"value":"1039",
"childrens":[]},
{
"label":"道真县",
"value":"1040",
"childrens":[]},
{
"label":"汇川区",
"value":"1041",
"childrens":[]},
{
"label":"赤水市",
"value":"1042",
"childrens":[]},
{
"label":"仁怀市",
"value":"1043",
"childrens":[]},
{
"label":"遵义县",
"value":"1044",
"childrens":[]},
{
"label":"桐梓县",
"value":"1045",
"childrens":[]},
{
"label":"绥阳县",
"value":"1046",
"childrens":[]},
{
"label":"正安县",
"value":"1047",
"childrens":[]},
{
"label":"凤冈县",
"value":"1048",
"childrens":[]},
{
"label":"湄潭县",
"value":"1049",
"childrens":[]},
{
"label":"余庆县",
"value":"1050",
"childrens":[]},
{
"label":"习水县",
"value":"1051",
"childrens":[]},
{
"label":"道真",
"value":"1052",
"childrens":[]},
{
"label":"务川",
"value":"1053",
"childrens":[]}]}]},


{
"label":"海南省",
"value":"9",
"childrens":[{
"label":"海口市",
"value":"120",
"childrens":[{
"label":"秀英区",
"value":"1054",
"childrens":[]},
{
"label":"龙华区",
"value":"1055",
"childrens":[]},
{
"label":"琼山区",
"value":"1056",
"childrens":[]},
{
"label":"美兰区",
"value":"1057",
"childrens":[]}]},

{
"label":"三亚市",
"value":"121",
"childrens":[]},
{
"label":"白沙黎族自治县",
"value":"122",
"childrens":[]},
{
"label":"保亭黎族苗族自治县",
"value":"123",
"childrens":[]},
{
"label":"昌江黎族自治县",
"value":"124",
"childrens":[]},
{
"label":"澄迈县市",
"value":"125",
"childrens":[]},
{
"label":"定安县市",
"value":"126",
"childrens":[]},
{
"label":"东方市",
"value":"127",
"childrens":[]},
{
"label":"乐东黎族自治县",
"value":"128",
"childrens":[]},
{
"label":"临高县市",
"value":"129",
"childrens":[]},
{
"label":"陵水黎族自治县",
"value":"130",
"childrens":[]},
{
"label":"琼海市",
"value":"131",
"childrens":[]},
{
"label":"琼中黎族苗族自治县",
"value":"132",
"childrens":[]},
{
"label":"屯昌县市",
"value":"133",
"childrens":[]},
{
"label":"万宁市",
"value":"134",
"childrens":[]},
{
"label":"文昌市",
"value":"135",
"childrens":[]},
{
"label":"五指山市",
"value":"136",
"childrens":[]},
{
"label":"儋州市",
"value":"137",
"childrens":[{
"label":"市区",
"value":"1058",
"childrens":[]},
{
"label":"洋浦开发区",
"value":"1059",
"childrens":[]},
{
"label":"那大镇",
"value":"1060",
"childrens":[]},
{
"label":"王五镇",
"value":"1061",
"childrens":[]},
{
"label":"雅星镇",
"value":"1062",
"childrens":[]},
{
"label":"大成镇",
"value":"1063",
"childrens":[]},
{
"label":"中和镇",
"value":"1064",
"childrens":[]},
{
"label":"峨蔓镇",
"value":"1065",
"childrens":[]},
{
"label":"南丰镇",
"value":"1066",
"childrens":[]},
{
"label":"白马井镇",
"value":"1067",
"childrens":[]},
{
"label":"兰洋镇",
"value":"1068",
"childrens":[]},
{
"label":"和庆镇",
"value":"1069",
"childrens":[]},
{
"label":"海头镇",
"value":"1070",
"childrens":[]},
{
"label":"排浦镇",
"value":"1071",
"childrens":[]},
{
"label":"东成镇",
"value":"1072",
"childrens":[]},
{
"label":"光村镇",
"value":"1073",
"childrens":[]},
{
"label":"木棠镇",
"value":"1074",
"childrens":[]},
{
"label":"新州镇",
"value":"1075",
"childrens":[]},
{
"label":"三都镇",
"value":"1076",
"childrens":[]},
{
"label":"其他",
"value":"1077",
"childrens":[]}]}]},


{
"label":"河北省",
"value":"10",
"childrens":[{
"label":"石家庄市",
"value":"138",
"childrens":[{
"label":"长安区",
"value":"1078",
"childrens":[]},
{
"label":"桥东区",
"value":"1079",
"childrens":[]},
{
"label":"桥西区",
"value":"1080",
"childrens":[]},
{
"label":"新华区",
"value":"1081",
"childrens":[]},
{
"label":"裕华区",
"value":"1082",
"childrens":[]},
{
"label":"井陉矿区",
"value":"1083",
"childrens":[]},
{
"label":"高新区",
"value":"1084",
"childrens":[]},
{
"label":"辛集市",
"value":"1085",
"childrens":[]},
{
"label":"藁城市",
"value":"1086",
"childrens":[]},
{
"label":"晋州市",
"value":"1087",
"childrens":[]},
{
"label":"新乐市",
"value":"1088",
"childrens":[]},
{
"label":"鹿泉市",
"value":"1089",
"childrens":[]},
{
"label":"井陉县",
"value":"1090",
"childrens":[]},
{
"label":"正定县",
"value":"1091",
"childrens":[]},
{
"label":"栾城县",
"value":"1092",
"childrens":[]},
{
"label":"行唐县",
"value":"1093",
"childrens":[]},
{
"label":"灵寿县",
"value":"1094",
"childrens":[]},
{
"label":"高邑县",
"value":"1095",
"childrens":[]},
{
"label":"深泽县",
"value":"1096",
"childrens":[]},
{
"label":"赞皇县",
"value":"1097",
"childrens":[]},
{
"label":"无极县",
"value":"1098",
"childrens":[]},
{
"label":"平山县",
"value":"1099",
"childrens":[]},
{
"label":"元氏县",
"value":"1100",
"childrens":[]},
{
"label":"赵县",
"value":"1101",
"childrens":[]}]},

{
"label":"保定市",
"value":"139",
"childrens":[{
"label":"新市区",
"value":"1102",
"childrens":[]},
{
"label":"南市区",
"value":"1103",
"childrens":[]},
{
"label":"北市区",
"value":"1104",
"childrens":[]},
{
"label":"涿州市",
"value":"1105",
"childrens":[]},
{
"label":"定州市",
"value":"1106",
"childrens":[]},
{
"label":"安国市",
"value":"1107",
"childrens":[]},
{
"label":"高碑店市",
"value":"1108",
"childrens":[]},
{
"label":"满城县",
"value":"1109",
"childrens":[]},
{
"label":"清苑县",
"value":"1110",
"childrens":[]},
{
"label":"涞水县",
"value":"1111",
"childrens":[]},
{
"label":"阜平县",
"value":"1112",
"childrens":[]},
{
"label":"徐水县",
"value":"1113",
"childrens":[]},
{
"label":"定兴县",
"value":"1114",
"childrens":[]},
{
"label":"唐县",
"value":"1115",
"childrens":[]},
{
"label":"高阳县",
"value":"1116",
"childrens":[]},
{
"label":"容城县",
"value":"1117",
"childrens":[]},
{
"label":"涞源县",
"value":"1118",
"childrens":[]},
{
"label":"望都县",
"value":"1119",
"childrens":[]},
{
"label":"安新县",
"value":"1120",
"childrens":[]},
{
"label":"易县",
"value":"1121",
"childrens":[]},
{
"label":"曲阳县",
"value":"1122",
"childrens":[]},
{
"label":"蠡县",
"value":"1123",
"childrens":[]},
{
"label":"顺平县",
"value":"1124",
"childrens":[]},
{
"label":"博野县",
"value":"1125",
"childrens":[]},
{
"label":"雄县",
"value":"1126",
"childrens":[]}]},

{
"label":"沧州市",
"value":"140",
"childrens":[{
"label":"运河区",
"value":"1127",
"childrens":[]},
{
"label":"新华区",
"value":"1128",
"childrens":[]},
{
"label":"泊头市",
"value":"1129",
"childrens":[]},
{
"label":"任丘市",
"value":"1130",
"childrens":[]},
{
"label":"黄骅市",
"value":"1131",
"childrens":[]},
{
"label":"河间市",
"value":"1132",
"childrens":[]},
{
"label":"沧县",
"value":"1133",
"childrens":[]},
{
"label":"青县",
"value":"1134",
"childrens":[]},
{
"label":"东光县",
"value":"1135",
"childrens":[]},
{
"label":"海兴县",
"value":"1136",
"childrens":[]},
{
"label":"盐山县",
"value":"1137",
"childrens":[]},
{
"label":"肃宁县",
"value":"1138",
"childrens":[]},
{
"label":"南皮县",
"value":"1139",
"childrens":[]},
{
"label":"吴桥县",
"value":"1140",
"childrens":[]},
{
"label":"献县",
"value":"1141",
"childrens":[]},
{
"label":"孟村",
"value":"1142",
"childrens":[]}]},

{
"label":"承德市",
"value":"141",
"childrens":[{
"label":"双桥区",
"value":"1143",
"childrens":[]},
{
"label":"双滦区",
"value":"1144",
"childrens":[]},
{
"label":"鹰手营子矿区",
"value":"1145",
"childrens":[]},
{
"label":"承德县",
"value":"1146",
"childrens":[]},
{
"label":"兴隆县",
"value":"1147",
"childrens":[]},
{
"label":"平泉县",
"value":"1148",
"childrens":[]},
{
"label":"滦平县",
"value":"1149",
"childrens":[]},
{
"label":"隆化县",
"value":"1150",
"childrens":[]},
{
"label":"丰宁",
"value":"1151",
"childrens":[]},
{
"label":"宽城",
"value":"1152",
"childrens":[]},
{
"label":"围场",
"value":"1153",
"childrens":[]}]},

{
"label":"邯郸市",
"value":"142",
"childrens":[{
"label":"从台区",
"value":"1154",
"childrens":[]},
{
"label":"复兴区",
"value":"1155",
"childrens":[]},
{
"label":"邯山区",
"value":"1156",
"childrens":[]},
{
"label":"峰峰矿区",
"value":"1157",
"childrens":[]},
{
"label":"武安市",
"value":"1158",
"childrens":[]},
{
"label":"邯郸县",
"value":"1159",
"childrens":[]},
{
"label":"临漳县",
"value":"1160",
"childrens":[]},
{
"label":"成安县",
"value":"1161",
"childrens":[]},
{
"label":"大名县",
"value":"1162",
"childrens":[]},
{
"label":"涉县",
"value":"1163",
"childrens":[]},
{
"label":"磁县",
"value":"1164",
"childrens":[]},
{
"label":"肥乡县",
"value":"1165",
"childrens":[]},
{
"label":"永年县",
"value":"1166",
"childrens":[]},
{
"label":"邱县",
"value":"1167",
"childrens":[]},
{
"label":"鸡泽县",
"value":"1168",
"childrens":[]},
{
"label":"广平县",
"value":"1169",
"childrens":[]},
{
"label":"馆陶县",
"value":"1170",
"childrens":[]},
{
"label":"魏县",
"value":"1171",
"childrens":[]},
{
"label":"曲周县",
"value":"1172",
"childrens":[]}]},

{
"label":"衡水市",
"value":"143",
"childrens":[{
"label":"桃城区",
"value":"1173",
"childrens":[]},
{
"label":"冀州市",
"value":"1174",
"childrens":[]},
{
"label":"深州市",
"value":"1175",
"childrens":[]},
{
"label":"枣强县",
"value":"1176",
"childrens":[]},
{
"label":"武邑县",
"value":"1177",
"childrens":[]},
{
"label":"武强县",
"value":"1178",
"childrens":[]},
{
"label":"饶阳县",
"value":"1179",
"childrens":[]},
{
"label":"安平县",
"value":"1180",
"childrens":[]},
{
"label":"故城县",
"value":"1181",
"childrens":[]},
{
"label":"景县",
"value":"1182",
"childrens":[]},
{
"label":"阜城县",
"value":"1183",
"childrens":[]}]},

{
"label":"廊坊市",
"value":"144",
"childrens":[{
"label":"安次区",
"value":"1184",
"childrens":[]},
{
"label":"广阳区",
"value":"1185",
"childrens":[]},
{
"label":"霸州市",
"value":"1186",
"childrens":[]},
{
"label":"三河市",
"value":"1187",
"childrens":[]},
{
"label":"固安县",
"value":"1188",
"childrens":[]},
{
"label":"永清县",
"value":"1189",
"childrens":[]},
{
"label":"香河县",
"value":"1190",
"childrens":[]},
{
"label":"大城县",
"value":"1191",
"childrens":[]},
{
"label":"文安县",
"value":"1192",
"childrens":[]},
{
"label":"大厂",
"value":"1193",
"childrens":[]}]},

{
"label":"秦皇岛市",
"value":"145",
"childrens":[{
"label":"海港区",
"value":"1194",
"childrens":[]},
{
"label":"山海关区",
"value":"1195",
"childrens":[]},
{
"label":"北戴河区",
"value":"1196",
"childrens":[]},
{
"label":"昌黎县",
"value":"1197",
"childrens":[]},
{
"label":"抚宁县",
"value":"1198",
"childrens":[]},
{
"label":"卢龙县",
"value":"1199",
"childrens":[]},
{
"label":"青龙",
"value":"1200",
"childrens":[]}]},

{
"label":"唐山市",
"value":"146",
"childrens":[{
"label":"路北区",
"value":"1201",
"childrens":[]},
{
"label":"路南区",
"value":"1202",
"childrens":[]},
{
"label":"古冶区",
"value":"1203",
"childrens":[]},
{
"label":"开平区",
"value":"1204",
"childrens":[]},
{
"label":"丰南区",
"value":"1205",
"childrens":[]},
{
"label":"丰润区",
"value":"1206",
"childrens":[]},
{
"label":"遵化市",
"value":"1207",
"childrens":[]},
{
"label":"迁安市",
"value":"1208",
"childrens":[]},
{
"label":"滦县",
"value":"1209",
"childrens":[]},
{
"label":"滦南县",
"value":"1210",
"childrens":[]},
{
"label":"乐亭县",
"value":"1211",
"childrens":[]},
{
"label":"迁西县",
"value":"1212",
"childrens":[]},
{
"label":"玉田县",
"value":"1213",
"childrens":[]},
{
"label":"唐海县",
"value":"1214",
"childrens":[]}]},

{
"label":"邢台市",
"value":"147",
"childrens":[{
"label":"桥东区",
"value":"1215",
"childrens":[]},
{
"label":"桥西区",
"value":"1216",
"childrens":[]},
{
"label":"南宫市",
"value":"1217",
"childrens":[]},
{
"label":"沙河市",
"value":"1218",
"childrens":[]},
{
"label":"邢台县",
"value":"1219",
"childrens":[]},
{
"label":"临城县",
"value":"1220",
"childrens":[]},
{
"label":"内丘县",
"value":"1221",
"childrens":[]},
{
"label":"柏乡县",
"value":"1222",
"childrens":[]},
{
"label":"隆尧县",
"value":"1223",
"childrens":[]},
{
"label":"任县",
"value":"1224",
"childrens":[]},
{
"label":"南和县",
"value":"1225",
"childrens":[]},
{
"label":"宁晋县",
"value":"1226",
"childrens":[]},
{
"label":"巨鹿县",
"value":"1227",
"childrens":[]},
{
"label":"新河县",
"value":"1228",
"childrens":[]},
{
"label":"广宗县",
"value":"1229",
"childrens":[]},
{
"label":"平乡县",
"value":"1230",
"childrens":[]},
{
"label":"威县",
"value":"1231",
"childrens":[]},
{
"label":"清河县",
"value":"1232",
"childrens":[]},
{
"label":"临西县",
"value":"1233",
"childrens":[]}]},

{
"label":"张家口市",
"value":"148",
"childrens":[{
"label":"桥西区",
"value":"1234",
"childrens":[]},
{
"label":"桥东区",
"value":"1235",
"childrens":[]},
{
"label":"宣化区",
"value":"1236",
"childrens":[]},
{
"label":"下花园区",
"value":"1237",
"childrens":[]},
{
"label":"宣化县",
"value":"1238",
"childrens":[]},
{
"label":"张北县",
"value":"1239",
"childrens":[]},
{
"label":"康保县",
"value":"1240",
"childrens":[]},
{
"label":"沽源县",
"value":"1241",
"childrens":[]},
{
"label":"尚义县",
"value":"1242",
"childrens":[]},
{
"label":"蔚县",
"value":"1243",
"childrens":[]},
{
"label":"阳原县",
"value":"1244",
"childrens":[]},
{
"label":"怀安县",
"value":"1245",
"childrens":[]},
{
"label":"万全县",
"value":"1246",
"childrens":[]},
{
"label":"怀来县",
"value":"1247",
"childrens":[]},
{
"label":"涿鹿县",
"value":"1248",
"childrens":[]},
{
"label":"赤城县",
"value":"1249",
"childrens":[]},
{
"label":"崇礼县",
"value":"1250",
"childrens":[]}]}]},


{
"label":"河南省",
"value":"11",
"childrens":[{
"label":"郑州市",
"value":"149",
"childrens":[{
"label":"金水区",
"value":"1251",
"childrens":[]},
{
"label":"邙山区",
"value":"1252",
"childrens":[]},
{
"label":"二七区",
"value":"1253",
"childrens":[]},
{
"label":"管城区",
"value":"1254",
"childrens":[]},
{
"label":"中原区",
"value":"1255",
"childrens":[]},
{
"label":"上街区",
"value":"1256",
"childrens":[]},
{
"label":"惠济区",
"value":"1257",
"childrens":[]},
{
"label":"郑东新区",
"value":"1258",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"1259",
"childrens":[]},
{
"label":"高新开发区",
"value":"1260",
"childrens":[]},
{
"label":"出口加工区",
"value":"1261",
"childrens":[]},
{
"label":"巩义市",
"value":"1262",
"childrens":[]},
{
"label":"荥阳市",
"value":"1263",
"childrens":[]},
{
"label":"新密市",
"value":"1264",
"childrens":[]},
{
"label":"新郑市",
"value":"1265",
"childrens":[]},
{
"label":"登封市",
"value":"1266",
"childrens":[]},
{
"label":"中牟县",
"value":"1267",
"childrens":[]}]},

{
"label":"洛阳市",
"value":"150",
"childrens":[{
"label":"西工区",
"value":"1268",
"childrens":[]},
{
"label":"老城区",
"value":"1269",
"childrens":[]},
{
"label":"涧西区",
"value":"1270",
"childrens":[]},
{
"label":"瀍河回族区",
"value":"1271",
"childrens":[]},
{
"label":"洛龙区",
"value":"1272",
"childrens":[]},
{
"label":"吉利区",
"value":"1273",
"childrens":[]},
{
"label":"偃师市",
"value":"1274",
"childrens":[]},
{
"label":"孟津县",
"value":"1275",
"childrens":[]},
{
"label":"新安县",
"value":"1276",
"childrens":[]},
{
"label":"栾川县",
"value":"1277",
"childrens":[]},
{
"label":"嵩县",
"value":"1278",
"childrens":[]},
{
"label":"汝阳县",
"value":"1279",
"childrens":[]},
{
"label":"宜阳县",
"value":"1280",
"childrens":[]},
{
"label":"洛宁县",
"value":"1281",
"childrens":[]},
{
"label":"伊川县",
"value":"1282",
"childrens":[]}]},

{
"label":"开封市",
"value":"151",
"childrens":[{
"label":"鼓楼区",
"value":"1283",
"childrens":[]},
{
"label":"龙亭区",
"value":"1284",
"childrens":[]},
{
"label":"顺河回族区",
"value":"1285",
"childrens":[]},
{
"label":"金明区",
"value":"1286",
"childrens":[]},
{
"label":"禹王台区",
"value":"1287",
"childrens":[]},
{
"label":"杞县",
"value":"1288",
"childrens":[]},
{
"label":"通许县",
"value":"1289",
"childrens":[]},
{
"label":"尉氏县",
"value":"1290",
"childrens":[]},
{
"label":"开封县",
"value":"1291",
"childrens":[]},
{
"label":"兰考县",
"value":"1292",
"childrens":[]}]},

{
"label":"安阳市",
"value":"152",
"childrens":[{
"label":"北关区",
"value":"1293",
"childrens":[]},
{
"label":"文峰区",
"value":"1294",
"childrens":[]},
{
"label":"殷都区",
"value":"1295",
"childrens":[]},
{
"label":"龙安区",
"value":"1296",
"childrens":[]},
{
"label":"林州市",
"value":"1297",
"childrens":[]},
{
"label":"安阳县",
"value":"1298",
"childrens":[]},
{
"label":"汤阴县",
"value":"1299",
"childrens":[]},
{
"label":"滑县",
"value":"1300",
"childrens":[]},
{
"label":"内黄县",
"value":"1301",
"childrens":[]}]},

{
"label":"鹤壁市",
"value":"153",
"childrens":[{
"label":"淇滨区",
"value":"1302",
"childrens":[]},
{
"label":"山城区",
"value":"1303",
"childrens":[]},
{
"label":"鹤山区",
"value":"1304",
"childrens":[]},
{
"label":"浚县",
"value":"1305",
"childrens":[]},
{
"label":"淇县",
"value":"1306",
"childrens":[]}]},

{
"label":"济源市",
"value":"154",
"childrens":[{
"label":"济源市",
"value":"1307",
"childrens":[]}]},

{
"label":"焦作市",
"value":"155",
"childrens":[{
"label":"解放区",
"value":"1308",
"childrens":[]},
{
"label":"中站区",
"value":"1309",
"childrens":[]},
{
"label":"马村区",
"value":"1310",
"childrens":[]},
{
"label":"山阳区",
"value":"1311",
"childrens":[]},
{
"label":"沁阳市",
"value":"1312",
"childrens":[]},
{
"label":"孟州市",
"value":"1313",
"childrens":[]},
{
"label":"修武县",
"value":"1314",
"childrens":[]},
{
"label":"博爱县",
"value":"1315",
"childrens":[]},
{
"label":"武陟县",
"value":"1316",
"childrens":[]},
{
"label":"温县",
"value":"1317",
"childrens":[]}]},

{
"label":"南阳市",
"value":"156",
"childrens":[{
"label":"卧龙区",
"value":"1318",
"childrens":[]},
{
"label":"宛城区",
"value":"1319",
"childrens":[]},
{
"label":"邓州市",
"value":"1320",
"childrens":[]},
{
"label":"南召县",
"value":"1321",
"childrens":[]},
{
"label":"方城县",
"value":"1322",
"childrens":[]},
{
"label":"西峡县",
"value":"1323",
"childrens":[]},
{
"label":"镇平县",
"value":"1324",
"childrens":[]},
{
"label":"内乡县",
"value":"1325",
"childrens":[]},
{
"label":"淅川县",
"value":"1326",
"childrens":[]},
{
"label":"社旗县",
"value":"1327",
"childrens":[]},
{
"label":"唐河县",
"value":"1328",
"childrens":[]},
{
"label":"新野县",
"value":"1329",
"childrens":[]},
{
"label":"桐柏县",
"value":"1330",
"childrens":[]}]},

{
"label":"平顶山市",
"value":"157",
"childrens":[{
"label":"新华区",
"value":"1331",
"childrens":[]},
{
"label":"卫东区",
"value":"1332",
"childrens":[]},
{
"label":"湛河区",
"value":"1333",
"childrens":[]},
{
"label":"石龙区",
"value":"1334",
"childrens":[]},
{
"label":"舞钢市",
"value":"1335",
"childrens":[]},
{
"label":"汝州市",
"value":"1336",
"childrens":[]},
{
"label":"宝丰县",
"value":"1337",
"childrens":[]},
{
"label":"叶县",
"value":"1338",
"childrens":[]},
{
"label":"鲁山县",
"value":"1339",
"childrens":[]},
{
"label":"郏县",
"value":"1340",
"childrens":[]}]},

{
"label":"三门峡市",
"value":"158",
"childrens":[{
"label":"湖滨区",
"value":"1341",
"childrens":[]},
{
"label":"义马市",
"value":"1342",
"childrens":[]},
{
"label":"灵宝市",
"value":"1343",
"childrens":[]},
{
"label":"渑池县",
"value":"1344",
"childrens":[]},
{
"label":"陕县",
"value":"1345",
"childrens":[]},
{
"label":"卢氏县",
"value":"1346",
"childrens":[]}]},

{
"label":"商丘市",
"value":"159",
"childrens":[{
"label":"梁园区",
"value":"1347",
"childrens":[]},
{
"label":"睢阳区",
"value":"1348",
"childrens":[]},
{
"label":"永城市",
"value":"1349",
"childrens":[]},
{
"label":"民权县",
"value":"1350",
"childrens":[]},
{
"label":"睢县",
"value":"1351",
"childrens":[]},
{
"label":"宁陵县",
"value":"1352",
"childrens":[]},
{
"label":"虞城县",
"value":"1353",
"childrens":[]},
{
"label":"柘城县",
"value":"1354",
"childrens":[]},
{
"label":"夏邑县",
"value":"1355",
"childrens":[]}]},

{
"label":"新乡市",
"value":"160",
"childrens":[{
"label":"卫滨区",
"value":"1356",
"childrens":[]},
{
"label":"红旗区",
"value":"1357",
"childrens":[]},
{
"label":"凤泉区",
"value":"1358",
"childrens":[]},
{
"label":"牧野区",
"value":"1359",
"childrens":[]},
{
"label":"卫辉市",
"value":"1360",
"childrens":[]},
{
"label":"辉县市",
"value":"1361",
"childrens":[]},
{
"label":"新乡县",
"value":"1362",
"childrens":[]},
{
"label":"获嘉县",
"value":"1363",
"childrens":[]},
{
"label":"原阳县",
"value":"1364",
"childrens":[]},
{
"label":"延津县",
"value":"1365",
"childrens":[]},
{
"label":"封丘县",
"value":"1366",
"childrens":[]},
{
"label":"长垣县",
"value":"1367",
"childrens":[]}]},

{
"label":"信阳市",
"value":"161",
"childrens":[{
"label":"浉河区",
"value":"1368",
"childrens":[]},
{
"label":"平桥区",
"value":"1369",
"childrens":[]},
{
"label":"罗山县",
"value":"1370",
"childrens":[]},
{
"label":"光山县",
"value":"1371",
"childrens":[]},
{
"label":"新县",
"value":"1372",
"childrens":[]},
{
"label":"商城县",
"value":"1373",
"childrens":[]},
{
"label":"固始县",
"value":"1374",
"childrens":[]},
{
"label":"潢川县",
"value":"1375",
"childrens":[]},
{
"label":"淮滨县",
"value":"1376",
"childrens":[]},
{
"label":"息县",
"value":"1377",
"childrens":[]}]},

{
"label":"许昌市",
"value":"162",
"childrens":[{
"label":"魏都区",
"value":"1378",
"childrens":[]},
{
"label":"禹州市",
"value":"1379",
"childrens":[]},
{
"label":"长葛市",
"value":"1380",
"childrens":[]},
{
"label":"许昌县",
"value":"1381",
"childrens":[]},
{
"label":"鄢陵县",
"value":"1382",
"childrens":[]},
{
"label":"襄城县",
"value":"1383",
"childrens":[]}]},

{
"label":"周口市",
"value":"163",
"childrens":[{
"label":"川汇区",
"value":"1384",
"childrens":[]},
{
"label":"项城市",
"value":"1385",
"childrens":[]},
{
"label":"扶沟县",
"value":"1386",
"childrens":[]},
{
"label":"西华县",
"value":"1387",
"childrens":[]},
{
"label":"商水县",
"value":"1388",
"childrens":[]},
{
"label":"沈丘县",
"value":"1389",
"childrens":[]},
{
"label":"郸城县",
"value":"1390",
"childrens":[]},
{
"label":"淮阳县",
"value":"1391",
"childrens":[]},
{
"label":"太康县",
"value":"1392",
"childrens":[]},
{
"label":"鹿邑县",
"value":"1393",
"childrens":[]}]},

{
"label":"驻马店市",
"value":"164",
"childrens":[{
"label":"驿城区",
"value":"1394",
"childrens":[]},
{
"label":"西平县",
"value":"1395",
"childrens":[]},
{
"label":"上蔡县",
"value":"1396",
"childrens":[]},
{
"label":"平舆县",
"value":"1397",
"childrens":[]},
{
"label":"正阳县",
"value":"1398",
"childrens":[]},
{
"label":"确山县",
"value":"1399",
"childrens":[]},
{
"label":"泌阳县",
"value":"1400",
"childrens":[]},
{
"label":"汝南县",
"value":"1401",
"childrens":[]},
{
"label":"遂平县",
"value":"1402",
"childrens":[]},
{
"label":"新蔡县",
"value":"1403",
"childrens":[]}]},

{
"label":"漯河市",
"value":"165",
"childrens":[{
"label":"郾城区",
"value":"1404",
"childrens":[]},
{
"label":"源汇区",
"value":"1405",
"childrens":[]},
{
"label":"召陵区",
"value":"1406",
"childrens":[]},
{
"label":"舞阳县",
"value":"1407",
"childrens":[]},
{
"label":"临颍县",
"value":"1408",
"childrens":[]}]},

{
"label":"濮阳市",
"value":"166",
"childrens":[{
"label":"华龙区",
"value":"1409",
"childrens":[]},
{
"label":"清丰县",
"value":"1410",
"childrens":[]},
{
"label":"南乐县",
"value":"1411",
"childrens":[]},
{
"label":"范县",
"value":"1412",
"childrens":[]},
{
"label":"台前县",
"value":"1413",
"childrens":[]},
{
"label":"濮阳县",
"value":"1414",
"childrens":[]}]}]},


{
"label":"黑龙江省",
"value":"12",
"childrens":[{
"label":"哈尔滨市",
"value":"167",
"childrens":[{
"label":"道里区",
"value":"1415",
"childrens":[]},
{
"label":"南岗区",
"value":"1416",
"childrens":[]},
{
"label":"动力区",
"value":"1417",
"childrens":[]},
{
"label":"平房区",
"value":"1418",
"childrens":[]},
{
"label":"香坊区",
"value":"1419",
"childrens":[]},
{
"label":"太平区",
"value":"1420",
"childrens":[]},
{
"label":"道外区",
"value":"1421",
"childrens":[]},
{
"label":"阿城区",
"value":"1422",
"childrens":[]},
{
"label":"呼兰区",
"value":"1423",
"childrens":[]},
{
"label":"松北区",
"value":"1424",
"childrens":[]},
{
"label":"尚志市",
"value":"1425",
"childrens":[]},
{
"label":"双城市",
"value":"1426",
"childrens":[]},
{
"label":"五常市",
"value":"1427",
"childrens":[]},
{
"label":"方正县",
"value":"1428",
"childrens":[]},
{
"label":"宾县",
"value":"1429",
"childrens":[]},
{
"label":"依兰县",
"value":"1430",
"childrens":[]},
{
"label":"巴彦县",
"value":"1431",
"childrens":[]},
{
"label":"通河县",
"value":"1432",
"childrens":[]},
{
"label":"木兰县",
"value":"1433",
"childrens":[]},
{
"label":"延寿县",
"value":"1434",
"childrens":[]}]},

{
"label":"大庆市",
"value":"168",
"childrens":[{
"label":"萨尔图区",
"value":"1435",
"childrens":[]},
{
"label":"红岗区",
"value":"1436",
"childrens":[]},
{
"label":"龙凤区",
"value":"1437",
"childrens":[]},
{
"label":"让胡路区",
"value":"1438",
"childrens":[]},
{
"label":"大同区",
"value":"1439",
"childrens":[]},
{
"label":"肇州县",
"value":"1440",
"childrens":[]},
{
"label":"肇源县",
"value":"1441",
"childrens":[]},
{
"label":"林甸县",
"value":"1442",
"childrens":[]},
{
"label":"杜尔伯特",
"value":"1443",
"childrens":[]}]},

{
"label":"大兴安岭市",
"value":"169",
"childrens":[{
"label":"呼玛县",
"value":"1444",
"childrens":[]},
{
"label":"漠河县",
"value":"1445",
"childrens":[]},
{
"label":"塔河县",
"value":"1446",
"childrens":[]}]},

{
"label":"鹤岗市",
"value":"170",
"childrens":[{
"label":"兴山区",
"value":"1447",
"childrens":[]},
{
"label":"工农区",
"value":"1448",
"childrens":[]},
{
"label":"南山区",
"value":"1449",
"childrens":[]},
{
"label":"兴安区",
"value":"1450",
"childrens":[]},
{
"label":"向阳区",
"value":"1451",
"childrens":[]},
{
"label":"东山区",
"value":"1452",
"childrens":[]},
{
"label":"萝北县",
"value":"1453",
"childrens":[]},
{
"label":"绥滨县",
"value":"1454",
"childrens":[]}]},

{
"label":"黑河市",
"value":"171",
"childrens":[{
"label":"爱辉区",
"value":"1455",
"childrens":[]},
{
"label":"五大连池市",
"value":"1456",
"childrens":[]},
{
"label":"北安市",
"value":"1457",
"childrens":[]},
{
"label":"嫩江县",
"value":"1458",
"childrens":[]},
{
"label":"逊克县",
"value":"1459",
"childrens":[]},
{
"label":"孙吴县",
"value":"1460",
"childrens":[]}]},

{
"label":"鸡西市",
"value":"172",
"childrens":[{
"label":"鸡冠区",
"value":"1461",
"childrens":[]},
{
"label":"恒山区",
"value":"1462",
"childrens":[]},
{
"label":"城子河区",
"value":"1463",
"childrens":[]},
{
"label":"滴道区",
"value":"1464",
"childrens":[]},
{
"label":"梨树区",
"value":"1465",
"childrens":[]},
{
"label":"虎林市",
"value":"1466",
"childrens":[]},
{
"label":"密山市",
"value":"1467",
"childrens":[]},
{
"label":"鸡东县",
"value":"1468",
"childrens":[]}]},

{
"label":"佳木斯市",
"value":"173",
"childrens":[{
"label":"前进区",
"value":"1469",
"childrens":[]},
{
"label":"郊区",
"value":"1470",
"childrens":[]},
{
"label":"向阳区",
"value":"1471",
"childrens":[]},
{
"label":"东风区",
"value":"1472",
"childrens":[]},
{
"label":"同江市",
"value":"1473",
"childrens":[]},
{
"label":"富锦市",
"value":"1474",
"childrens":[]},
{
"label":"桦南县",
"value":"1475",
"childrens":[]},
{
"label":"桦川县",
"value":"1476",
"childrens":[]},
{
"label":"汤原县",
"value":"1477",
"childrens":[]},
{
"label":"抚远县",
"value":"1478",
"childrens":[]}]},

{
"label":"牡丹江市",
"value":"174",
"childrens":[{
"label":"爱民区",
"value":"1479",
"childrens":[]},
{
"label":"东安区",
"value":"1480",
"childrens":[]},
{
"label":"阳明区",
"value":"1481",
"childrens":[]},
{
"label":"西安区",
"value":"1482",
"childrens":[]},
{
"label":"绥芬河市",
"value":"1483",
"childrens":[]},
{
"label":"海林市",
"value":"1484",
"childrens":[]},
{
"label":"宁安市",
"value":"1485",
"childrens":[]},
{
"label":"穆棱市",
"value":"1486",
"childrens":[]},
{
"label":"东宁县",
"value":"1487",
"childrens":[]},
{
"label":"林口县",
"value":"1488",
"childrens":[]}]},

{
"label":"七台河市",
"value":"175",
"childrens":[{
"label":"桃山区",
"value":"1489",
"childrens":[]},
{
"label":"新兴区",
"value":"1490",
"childrens":[]},
{
"label":"茄子河区",
"value":"1491",
"childrens":[]},
{
"label":"勃利县",
"value":"1492",
"childrens":[]}]},

{
"label":"齐齐哈尔市",
"value":"176",
"childrens":[{
"label":"龙沙区",
"value":"1493",
"childrens":[]},
{
"label":"昂昂溪区",
"value":"1494",
"childrens":[]},
{
"label":"铁峰区",
"value":"1495",
"childrens":[]},
{
"label":"建华区",
"value":"1496",
"childrens":[]},
{
"label":"富拉尔基区",
"value":"1497",
"childrens":[]},
{
"label":"碾子山区",
"value":"1498",
"childrens":[]},
{
"label":"梅里斯达斡尔区",
"value":"1499",
"childrens":[]},
{
"label":"讷河市",
"value":"1500",
"childrens":[]},
{
"label":"龙江县",
"value":"1501",
"childrens":[]},
{
"label":"依安县",
"value":"1502",
"childrens":[]},
{
"label":"泰来县",
"value":"1503",
"childrens":[]},
{
"label":"甘南县",
"value":"1504",
"childrens":[]},
{
"label":"富裕县",
"value":"1505",
"childrens":[]},
{
"label":"克山县",
"value":"1506",
"childrens":[]},
{
"label":"克东县",
"value":"1507",
"childrens":[]},
{
"label":"拜泉县",
"value":"1508",
"childrens":[]}]},

{
"label":"双鸭山市",
"value":"177",
"childrens":[{
"label":"尖山区",
"value":"1509",
"childrens":[]},
{
"label":"岭东区",
"value":"1510",
"childrens":[]},
{
"label":"四方台区",
"value":"1511",
"childrens":[]},
{
"label":"宝山区",
"value":"1512",
"childrens":[]},
{
"label":"集贤县",
"value":"1513",
"childrens":[]},
{
"label":"友谊县",
"value":"1514",
"childrens":[]},
{
"label":"宝清县",
"value":"1515",
"childrens":[]},
{
"label":"饶河县",
"value":"1516",
"childrens":[]}]},

{
"label":"绥化市",
"value":"178",
"childrens":[{
"label":"北林区",
"value":"1517",
"childrens":[]},
{
"label":"安达市",
"value":"1518",
"childrens":[]},
{
"label":"肇东市",
"value":"1519",
"childrens":[]},
{
"label":"海伦市",
"value":"1520",
"childrens":[]},
{
"label":"望奎县",
"value":"1521",
"childrens":[]},
{
"label":"兰西县",
"value":"1522",
"childrens":[]},
{
"label":"青冈县",
"value":"1523",
"childrens":[]},
{
"label":"庆安县",
"value":"1524",
"childrens":[]},
{
"label":"明水县",
"value":"1525",
"childrens":[]},
{
"label":"绥棱县",
"value":"1526",
"childrens":[]}]},

{
"label":"伊春市",
"value":"179",
"childrens":[{
"label":"伊春区",
"value":"1527",
"childrens":[]},
{
"label":"带岭区",
"value":"1528",
"childrens":[]},
{
"label":"南岔区",
"value":"1529",
"childrens":[]},
{
"label":"金山屯区",
"value":"1530",
"childrens":[]},
{
"label":"西林区",
"value":"1531",
"childrens":[]},
{
"label":"美溪区",
"value":"1532",
"childrens":[]},
{
"label":"乌马河区",
"value":"1533",
"childrens":[]},
{
"label":"翠峦区",
"value":"1534",
"childrens":[]},
{
"label":"友好区",
"value":"1535",
"childrens":[]},
{
"label":"上甘岭区",
"value":"1536",
"childrens":[]},
{
"label":"五营区",
"value":"1537",
"childrens":[]},
{
"label":"红星区",
"value":"1538",
"childrens":[]},
{
"label":"新青区",
"value":"1539",
"childrens":[]},
{
"label":"汤旺河区",
"value":"1540",
"childrens":[]},
{
"label":"乌伊岭区",
"value":"1541",
"childrens":[]},
{
"label":"铁力市",
"value":"1542",
"childrens":[]},
{
"label":"嘉荫县",
"value":"1543",
"childrens":[]}]}]},


{
"label":"湖北省",
"value":"13",
"childrens":[{
"label":"武汉市",
"value":"180",
"childrens":[{
"label":"江岸区",
"value":"1544",
"childrens":[]},
{
"label":"武昌区",
"value":"1545",
"childrens":[]},
{
"label":"江汉区",
"value":"1546",
"childrens":[]},
{
"label":"硚口区",
"value":"1547",
"childrens":[]},
{
"label":"汉阳区",
"value":"1548",
"childrens":[]},
{
"label":"青山区",
"value":"1549",
"childrens":[]},
{
"label":"洪山区",
"value":"1550",
"childrens":[]},
{
"label":"东西湖区",
"value":"1551",
"childrens":[]},
{
"label":"汉南区",
"value":"1552",
"childrens":[]},
{
"label":"蔡甸区",
"value":"1553",
"childrens":[]},
{
"label":"江夏区",
"value":"1554",
"childrens":[]},
{
"label":"黄陂区",
"value":"1555",
"childrens":[]},
{
"label":"新洲区",
"value":"1556",
"childrens":[]},
{
"label":"经济开发区",
"value":"1557",
"childrens":[]}]},

{
"label":"仙桃市",
"value":"181",
"childrens":[{
"label":"仙桃市",
"value":"1558",
"childrens":[]}]},

{
"label":"鄂州市",
"value":"182",
"childrens":[{
"label":"鄂城区",
"value":"1559",
"childrens":[]},
{
"label":"华容区",
"value":"1560",
"childrens":[]},
{
"label":"梁子湖区",
"value":"1561",
"childrens":[]}]},

{
"label":"黄冈市",
"value":"183",
"childrens":[{
"label":"黄州区",
"value":"1562",
"childrens":[]},
{
"label":"麻城市",
"value":"1563",
"childrens":[]},
{
"label":"武穴市",
"value":"1564",
"childrens":[]},
{
"label":"团风县",
"value":"1565",
"childrens":[]},
{
"label":"红安县",
"value":"1566",
"childrens":[]},
{
"label":"罗田县",
"value":"1567",
"childrens":[]},
{
"label":"英山县",
"value":"1568",
"childrens":[]},
{
"label":"浠水县",
"value":"1569",
"childrens":[]},
{
"label":"蕲春县",
"value":"1570",
"childrens":[]},
{
"label":"黄梅县",
"value":"1571",
"childrens":[]}]},

{
"label":"黄石市",
"value":"184",
"childrens":[{
"label":"黄石港区",
"value":"1572",
"childrens":[]},
{
"label":"西塞山区",
"value":"1573",
"childrens":[]},
{
"label":"下陆区",
"value":"1574",
"childrens":[]},
{
"label":"铁山区",
"value":"1575",
"childrens":[]},
{
"label":"大冶市",
"value":"1576",
"childrens":[]},
{
"label":"阳新县",
"value":"1577",
"childrens":[]}]},

{
"label":"荆门市",
"value":"185",
"childrens":[{
"label":"东宝区",
"value":"1578",
"childrens":[]},
{
"label":"掇刀区",
"value":"1579",
"childrens":[]},
{
"label":"钟祥市",
"value":"1580",
"childrens":[]},
{
"label":"京山县",
"value":"1581",
"childrens":[]},
{
"label":"沙洋县",
"value":"1582",
"childrens":[]}]},

{
"label":"荆州市",
"value":"186",
"childrens":[{
"label":"沙市区",
"value":"1583",
"childrens":[]},
{
"label":"荆州区",
"value":"1584",
"childrens":[]},
{
"label":"石首市",
"value":"1585",
"childrens":[]},
{
"label":"洪湖市",
"value":"1586",
"childrens":[]},
{
"label":"松滋市",
"value":"1587",
"childrens":[]},
{
"label":"公安县",
"value":"1588",
"childrens":[]},
{
"label":"监利县",
"value":"1589",
"childrens":[]},
{
"label":"江陵县",
"value":"1590",
"childrens":[]}]},

{
"label":"潜江市",
"value":"187",
"childrens":[{
"label":"潜江市",
"value":"1591",
"childrens":[]}]},

{
"label":"神农架林区",
"value":"188",
"childrens":[{
"label":"神农架林区",
"value":"1592",
"childrens":[]}]},

{
"label":"十堰市",
"value":"189",
"childrens":[{
"label":"张湾区",
"value":"1593",
"childrens":[]},
{
"label":"茅箭区",
"value":"1594",
"childrens":[]},
{
"label":"丹江口市",
"value":"1595",
"childrens":[]},
{
"label":"郧县",
"value":"1596",
"childrens":[]},
{
"label":"郧西县",
"value":"1597",
"childrens":[]},
{
"label":"竹山县",
"value":"1598",
"childrens":[]},
{
"label":"竹溪县",
"value":"1599",
"childrens":[]},
{
"label":"房县",
"value":"1600",
"childrens":[]}]},

{
"label":"随州市",
"value":"190",
"childrens":[{
"label":"曾都区",
"value":"1601",
"childrens":[]},
{
"label":"广水市",
"value":"1602",
"childrens":[]}]},

{
"label":"天门市",
"value":"191",
"childrens":[{
"label":"天门市",
"value":"1603",
"childrens":[]}]},

{
"label":"咸宁市",
"value":"192",
"childrens":[{
"label":"咸安区",
"value":"1604",
"childrens":[]},
{
"label":"赤壁市",
"value":"1605",
"childrens":[]},
{
"label":"嘉鱼县",
"value":"1606",
"childrens":[]},
{
"label":"通城县",
"value":"1607",
"childrens":[]},
{
"label":"崇阳县",
"value":"1608",
"childrens":[]},
{
"label":"通山县",
"value":"1609",
"childrens":[]}]},

{
"label":"襄樊市",
"value":"193",
"childrens":[{
"label":"襄城区",
"value":"1610",
"childrens":[]},
{
"label":"樊城区",
"value":"1611",
"childrens":[]},
{
"label":"襄阳区",
"value":"1612",
"childrens":[]},
{
"label":"老河口市",
"value":"1613",
"childrens":[]},
{
"label":"枣阳市",
"value":"1614",
"childrens":[]},
{
"label":"宜城市",
"value":"1615",
"childrens":[]},
{
"label":"南漳县",
"value":"1616",
"childrens":[]},
{
"label":"谷城县",
"value":"1617",
"childrens":[]},
{
"label":"保康县",
"value":"1618",
"childrens":[]}]},

{
"label":"孝感市",
"value":"194",
"childrens":[{
"label":"孝南区",
"value":"1619",
"childrens":[]},
{
"label":"应城市",
"value":"1620",
"childrens":[]},
{
"label":"安陆市",
"value":"1621",
"childrens":[]},
{
"label":"汉川市",
"value":"1622",
"childrens":[]},
{
"label":"孝昌县",
"value":"1623",
"childrens":[]},
{
"label":"大悟县",
"value":"1624",
"childrens":[]},
{
"label":"云梦县",
"value":"1625",
"childrens":[]}]},

{
"label":"宜昌市",
"value":"195",
"childrens":[{
"label":"长阳",
"value":"1626",
"childrens":[]},
{
"label":"五峰",
"value":"1627",
"childrens":[]},
{
"label":"西陵区",
"value":"1628",
"childrens":[]},
{
"label":"伍家岗区",
"value":"1629",
"childrens":[]},
{
"label":"点军区",
"value":"1630",
"childrens":[]},
{
"label":"猇亭区",
"value":"1631",
"childrens":[]},
{
"label":"夷陵区",
"value":"1632",
"childrens":[]},
{
"label":"宜都市",
"value":"1633",
"childrens":[]},
{
"label":"当阳市",
"value":"1634",
"childrens":[]},
{
"label":"枝江市",
"value":"1635",
"childrens":[]},
{
"label":"远安县",
"value":"1636",
"childrens":[]},
{
"label":"兴山县",
"value":"1637",
"childrens":[]},
{
"label":"秭归县",
"value":"1638",
"childrens":[]}]},

{
"label":"恩施土家族苗族自治州",
"value":"196",
"childrens":[{
"label":"恩施市",
"value":"1639",
"childrens":[]},
{
"label":"利川市",
"value":"1640",
"childrens":[]},
{
"label":"建始县",
"value":"1641",
"childrens":[]},
{
"label":"巴东县",
"value":"1642",
"childrens":[]},
{
"label":"宣恩县",
"value":"1643",
"childrens":[]},
{
"label":"咸丰县",
"value":"1644",
"childrens":[]},
{
"label":"来凤县",
"value":"1645",
"childrens":[]},
{
"label":"鹤峰县",
"value":"1646",
"childrens":[]}]}]},


{
"label":"湖南省",
"value":"14",
"childrens":[{
"label":"长沙市",
"value":"197",
"childrens":[{
"label":"岳麓区",
"value":"1647",
"childrens":[]},
{
"label":"芙蓉区",
"value":"1648",
"childrens":[]},
{
"label":"天心区",
"value":"1649",
"childrens":[]},
{
"label":"开福区",
"value":"1650",
"childrens":[]},
{
"label":"雨花区",
"value":"1651",
"childrens":[]},
{
"label":"开发区",
"value":"1652",
"childrens":[]},
{
"label":"浏阳市",
"value":"1653",
"childrens":[]},
{
"label":"长沙县",
"value":"1654",
"childrens":[]},
{
"label":"望城县",
"value":"1655",
"childrens":[]},
{
"label":"宁乡县",
"value":"1656",
"childrens":[]}]},

{
"label":"张家界市",
"value":"198",
"childrens":[{
"label":"永定区",
"value":"1657",
"childrens":[]},
{
"label":"武陵源区",
"value":"1658",
"childrens":[]},
{
"label":"慈利县",
"value":"1659",
"childrens":[]},
{
"label":"桑植县",
"value":"1660",
"childrens":[]}]},

{
"label":"常德市",
"value":"199",
"childrens":[{
"label":"武陵区",
"value":"1661",
"childrens":[]},
{
"label":"鼎城区",
"value":"1662",
"childrens":[]},
{
"label":"津市市",
"value":"1663",
"childrens":[]},
{
"label":"安乡县",
"value":"1664",
"childrens":[]},
{
"label":"汉寿县",
"value":"1665",
"childrens":[]},
{
"label":"澧县",
"value":"1666",
"childrens":[]},
{
"label":"临澧县",
"value":"1667",
"childrens":[]},
{
"label":"桃源县",
"value":"1668",
"childrens":[]},
{
"label":"石门县",
"value":"1669",
"childrens":[]}]},

{
"label":"郴州市",
"value":"200",
"childrens":[{
"label":"北湖区",
"value":"1670",
"childrens":[]},
{
"label":"苏仙区",
"value":"1671",
"childrens":[]},
{
"label":"资兴市",
"value":"1672",
"childrens":[]},
{
"label":"桂阳县",
"value":"1673",
"childrens":[]},
{
"label":"宜章县",
"value":"1674",
"childrens":[]},
{
"label":"永兴县",
"value":"1675",
"childrens":[]},
{
"label":"嘉禾县",
"value":"1676",
"childrens":[]},
{
"label":"临武县",
"value":"1677",
"childrens":[]},
{
"label":"汝城县",
"value":"1678",
"childrens":[]},
{
"label":"桂东县",
"value":"1679",
"childrens":[]},
{
"label":"安仁县",
"value":"1680",
"childrens":[]}]},

{
"label":"衡阳市",
"value":"201",
"childrens":[{
"label":"雁峰区",
"value":"1681",
"childrens":[]},
{
"label":"珠晖区",
"value":"1682",
"childrens":[]},
{
"label":"石鼓区",
"value":"1683",
"childrens":[]},
{
"label":"蒸湘区",
"value":"1684",
"childrens":[]},
{
"label":"南岳区",
"value":"1685",
"childrens":[]},
{
"label":"耒阳市",
"value":"1686",
"childrens":[]},
{
"label":"常宁市",
"value":"1687",
"childrens":[]},
{
"label":"衡阳县",
"value":"1688",
"childrens":[]},
{
"label":"衡南县",
"value":"1689",
"childrens":[]},
{
"label":"衡山县",
"value":"1690",
"childrens":[]},
{
"label":"衡东县",
"value":"1691",
"childrens":[]},
{
"label":"祁东县",
"value":"1692",
"childrens":[]}]},

{
"label":"怀化市",
"value":"202",
"childrens":[{
"label":"鹤城区",
"value":"1693",
"childrens":[]},
{
"label":"靖州",
"value":"1694",
"childrens":[]},
{
"label":"麻阳",
"value":"1695",
"childrens":[]},
{
"label":"通道",
"value":"1696",
"childrens":[]},
{
"label":"新晃",
"value":"1697",
"childrens":[]},
{
"label":"芷江",
"value":"1698",
"childrens":[]},
{
"label":"沅陵县",
"value":"1699",
"childrens":[]},
{
"label":"辰溪县",
"value":"1700",
"childrens":[]},
{
"label":"溆浦县",
"value":"1701",
"childrens":[]},
{
"label":"中方县",
"value":"1702",
"childrens":[]},
{
"label":"会同县",
"value":"1703",
"childrens":[]},
{
"label":"洪江市",
"value":"1704",
"childrens":[]}]},

{
"label":"娄底市",
"value":"203",
"childrens":[{
"label":"娄星区",
"value":"1705",
"childrens":[]},
{
"label":"冷水江市",
"value":"1706",
"childrens":[]},
{
"label":"涟源市",
"value":"1707",
"childrens":[]},
{
"label":"双峰县",
"value":"1708",
"childrens":[]},
{
"label":"新化县",
"value":"1709",
"childrens":[]}]},

{
"label":"邵阳市",
"value":"204",
"childrens":[{
"label":"城步",
"value":"1710",
"childrens":[]},
{
"label":"双清区",
"value":"1711",
"childrens":[]},
{
"label":"大祥区",
"value":"1712",
"childrens":[]},
{
"label":"北塔区",
"value":"1713",
"childrens":[]},
{
"label":"武冈市",
"value":"1714",
"childrens":[]},
{
"label":"邵东县",
"value":"1715",
"childrens":[]},
{
"label":"新邵县",
"value":"1716",
"childrens":[]},
{
"label":"邵阳县",
"value":"1717",
"childrens":[]},
{
"label":"隆回县",
"value":"1718",
"childrens":[]},
{
"label":"洞口县",
"value":"1719",
"childrens":[]},
{
"label":"绥宁县",
"value":"1720",
"childrens":[]},
{
"label":"新宁县",
"value":"1721",
"childrens":[]}]},

{
"label":"湘潭市",
"value":"205",
"childrens":[{
"label":"岳塘区",
"value":"1722",
"childrens":[]},
{
"label":"雨湖区",
"value":"1723",
"childrens":[]},
{
"label":"湘乡市",
"value":"1724",
"childrens":[]},
{
"label":"韶山市",
"value":"1725",
"childrens":[]},
{
"label":"湘潭县",
"value":"1726",
"childrens":[]}]},

{
"label":"湘西土家族苗族自治州",
"value":"206",
"childrens":[{
"label":"吉首市",
"value":"1727",
"childrens":[]},
{
"label":"泸溪县",
"value":"1728",
"childrens":[]},
{
"label":"凤凰县",
"value":"1729",
"childrens":[]},
{
"label":"花垣县",
"value":"1730",
"childrens":[]},
{
"label":"保靖县",
"value":"1731",
"childrens":[]},
{
"label":"古丈县",
"value":"1732",
"childrens":[]},
{
"label":"永顺县",
"value":"1733",
"childrens":[]},
{
"label":"龙山县",
"value":"1734",
"childrens":[]}]},

{
"label":"益阳市",
"value":"207",
"childrens":[{
"label":"赫山区",
"value":"1735",
"childrens":[]},
{
"label":"资阳区",
"value":"1736",
"childrens":[]},
{
"label":"沅江市",
"value":"1737",
"childrens":[]},
{
"label":"南县",
"value":"1738",
"childrens":[]},
{
"label":"桃江县",
"value":"1739",
"childrens":[]},
{
"label":"安化县",
"value":"1740",
"childrens":[]}]},

{
"label":"永州市",
"value":"208",
"childrens":[{
"label":"江华",
"value":"1741",
"childrens":[]},
{
"label":"冷水滩区",
"value":"1742",
"childrens":[]},
{
"label":"零陵区",
"value":"1743",
"childrens":[]},
{
"label":"祁阳县",
"value":"1744",
"childrens":[]},
{
"label":"东安县",
"value":"1745",
"childrens":[]},
{
"label":"双牌县",
"value":"1746",
"childrens":[]},
{
"label":"道县",
"value":"1747",
"childrens":[]},
{
"label":"江永县",
"value":"1748",
"childrens":[]},
{
"label":"宁远县",
"value":"1749",
"childrens":[]},
{
"label":"蓝山县",
"value":"1750",
"childrens":[]},
{
"label":"新田县",
"value":"1751",
"childrens":[]}]},

{
"label":"岳阳市",
"value":"209",
"childrens":[{
"label":"岳阳楼区",
"value":"1752",
"childrens":[]},
{
"label":"君山区",
"value":"1753",
"childrens":[]},
{
"label":"云溪区",
"value":"1754",
"childrens":[]},
{
"label":"汨罗市",
"value":"1755",
"childrens":[]},
{
"label":"临湘市",
"value":"1756",
"childrens":[]},
{
"label":"岳阳县",
"value":"1757",
"childrens":[]},
{
"label":"华容县",
"value":"1758",
"childrens":[]},
{
"label":"湘阴县",
"value":"1759",
"childrens":[]},
{
"label":"平江县",
"value":"1760",
"childrens":[]}]},

{
"label":"株洲市",
"value":"210",
"childrens":[{
"label":"天元区",
"value":"1761",
"childrens":[]},
{
"label":"荷塘区",
"value":"1762",
"childrens":[]},
{
"label":"芦淞区",
"value":"1763",
"childrens":[]},
{
"label":"石峰区",
"value":"1764",
"childrens":[]},
{
"label":"醴陵市",
"value":"1765",
"childrens":[]},
{
"label":"株洲县",
"value":"1766",
"childrens":[]},
{
"label":"攸县",
"value":"1767",
"childrens":[]},
{
"label":"茶陵县",
"value":"1768",
"childrens":[]},
{
"label":"炎陵县",
"value":"1769",
"childrens":[]}]}]},


{
"label":"吉林省",
"value":"15",
"childrens":[{
"label":"长春市",
"value":"211",
"childrens":[{
"label":"朝阳区",
"value":"1770",
"childrens":[]},
{
"label":"宽城区",
"value":"1771",
"childrens":[]},
{
"label":"二道区",
"value":"1772",
"childrens":[]},
{
"label":"南关区",
"value":"1773",
"childrens":[]},
{
"label":"绿园区",
"value":"1774",
"childrens":[]},
{
"label":"双阳区",
"value":"1775",
"childrens":[]},
{
"label":"净月潭开发区",
"value":"1776",
"childrens":[]},
{
"label":"高新技术开发区",
"value":"1777",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"1778",
"childrens":[]},
{
"label":"汽车产业开发区",
"value":"1779",
"childrens":[]},
{
"label":"德惠市",
"value":"1780",
"childrens":[]},
{
"label":"九台市",
"value":"1781",
"childrens":[]},
{
"label":"榆树市",
"value":"1782",
"childrens":[]},
{
"label":"农安县",
"value":"1783",
"childrens":[]}]},

{
"label":"吉林市",
"value":"212",
"childrens":[{
"label":"船营区",
"value":"1784",
"childrens":[]},
{
"label":"昌邑区",
"value":"1785",
"childrens":[]},
{
"label":"龙潭区",
"value":"1786",
"childrens":[]},
{
"label":"丰满区",
"value":"1787",
"childrens":[]},
{
"label":"蛟河市",
"value":"1788",
"childrens":[]},
{
"label":"桦甸市",
"value":"1789",
"childrens":[]},
{
"label":"舒兰市",
"value":"1790",
"childrens":[]},
{
"label":"磐石市",
"value":"1791",
"childrens":[]},
{
"label":"永吉县",
"value":"1792",
"childrens":[]}]},

{
"label":"白城市",
"value":"213",
"childrens":[{
"label":"洮北区",
"value":"1793",
"childrens":[]},
{
"label":"洮南市",
"value":"1794",
"childrens":[]},
{
"label":"大安市",
"value":"1795",
"childrens":[]},
{
"label":"镇赉县",
"value":"1796",
"childrens":[]},
{
"label":"通榆县",
"value":"1797",
"childrens":[]}]},

{
"label":"白山市",
"value":"214",
"childrens":[{
"label":"江源区",
"value":"1798",
"childrens":[]},
{
"label":"八道江区",
"value":"1799",
"childrens":[]},
{
"label":"长白",
"value":"1800",
"childrens":[]},
{
"label":"临江市",
"value":"1801",
"childrens":[]},
{
"label":"抚松县",
"value":"1802",
"childrens":[]},
{
"label":"靖宇县",
"value":"1803",
"childrens":[]}]},

{
"label":"辽源市",
"value":"215",
"childrens":[{
"label":"龙山区",
"value":"1804",
"childrens":[]},
{
"label":"西安区",
"value":"1805",
"childrens":[]},
{
"label":"东丰县",
"value":"1806",
"childrens":[]},
{
"label":"东辽县",
"value":"1807",
"childrens":[]}]},

{
"label":"四平市",
"value":"216",
"childrens":[{
"label":"铁西区",
"value":"1808",
"childrens":[]},
{
"label":"铁东区",
"value":"1809",
"childrens":[]},
{
"label":"伊通",
"value":"1810",
"childrens":[]},
{
"label":"公主岭市",
"value":"1811",
"childrens":[]},
{
"label":"双辽市",
"value":"1812",
"childrens":[]},
{
"label":"梨树县",
"value":"1813",
"childrens":[]}]},

{
"label":"松原市",
"value":"217",
"childrens":[{
"label":"前郭尔罗斯",
"value":"1814",
"childrens":[]},
{
"label":"宁江区",
"value":"1815",
"childrens":[]},
{
"label":"长岭县",
"value":"1816",
"childrens":[]},
{
"label":"乾安县",
"value":"1817",
"childrens":[]},
{
"label":"扶余县",
"value":"1818",
"childrens":[]}]},

{
"label":"通化市",
"value":"218",
"childrens":[{
"label":"东昌区",
"value":"1819",
"childrens":[]},
{
"label":"二道江区",
"value":"1820",
"childrens":[]},
{
"label":"梅河口市",
"value":"1821",
"childrens":[]},
{
"label":"集安市",
"value":"1822",
"childrens":[]},
{
"label":"通化县",
"value":"1823",
"childrens":[]},
{
"label":"辉南县",
"value":"1824",
"childrens":[]},
{
"label":"柳河县",
"value":"1825",
"childrens":[]}]},

{
"label":"延边朝鲜族自治州",
"value":"219",
"childrens":[{
"label":"延吉市",
"value":"1826",
"childrens":[]},
{
"label":"图们市",
"value":"1827",
"childrens":[]},
{
"label":"敦化市",
"value":"1828",
"childrens":[]},
{
"label":"珲春市",
"value":"1829",
"childrens":[]},
{
"label":"龙井市",
"value":"1830",
"childrens":[]},
{
"label":"和龙市",
"value":"1831",
"childrens":[]},
{
"label":"安图县",
"value":"1832",
"childrens":[]},
{
"label":"汪清县",
"value":"1833",
"childrens":[]}]}]},


{
"label":"江苏省",
"value":"16",
"childrens":[{
"label":"南京市",
"value":"220",
"childrens":[{
"label":"玄武区",
"value":"1834",
"childrens":[]},
{
"label":"鼓楼区",
"value":"1835",
"childrens":[]},
{
"label":"白下区",
"value":"1836",
"childrens":[]},
{
"label":"建邺区",
"value":"1837",
"childrens":[]},
{
"label":"秦淮区",
"value":"1838",
"childrens":[]},
{
"label":"雨花台区",
"value":"1839",
"childrens":[]},
{
"label":"下关区",
"value":"1840",
"childrens":[]},
{
"label":"栖霞区",
"value":"1841",
"childrens":[]},
{
"label":"浦口区",
"value":"1842",
"childrens":[]},
{
"label":"江宁区",
"value":"1843",
"childrens":[]},
{
"label":"六合区",
"value":"1844",
"childrens":[]},
{
"label":"溧水县",
"value":"1845",
"childrens":[]},
{
"label":"高淳县",
"value":"1846",
"childrens":[]}]},

{
"label":"苏州市",
"value":"221",
"childrens":[{
"label":"沧浪区",
"value":"1847",
"childrens":[]},
{
"label":"金阊区",
"value":"1848",
"childrens":[]},
{
"label":"平江区",
"value":"1849",
"childrens":[]},
{
"label":"虎丘区",
"value":"1850",
"childrens":[]},
{
"label":"吴中区",
"value":"1851",
"childrens":[]},
{
"label":"相城区",
"value":"1852",
"childrens":[]},
{
"label":"园区",
"value":"1853",
"childrens":[]},
{
"label":"新区",
"value":"1854",
"childrens":[]},
{
"label":"常熟市",
"value":"1855",
"childrens":[]},
{
"label":"张家港市",
"value":"1856",
"childrens":[]},
{
"label":"玉山镇",
"value":"1857",
"childrens":[]},
{
"label":"巴城镇",
"value":"1858",
"childrens":[]},
{
"label":"周市镇",
"value":"1859",
"childrens":[]},
{
"label":"陆家镇",
"value":"1860",
"childrens":[]},
{
"label":"花桥镇",
"value":"1861",
"childrens":[]},
{
"label":"淀山湖镇",
"value":"1862",
"childrens":[]},
{
"label":"张浦镇",
"value":"1863",
"childrens":[]},
{
"label":"周庄镇",
"value":"1864",
"childrens":[]},
{
"label":"千灯镇",
"value":"1865",
"childrens":[]},
{
"label":"锦溪镇",
"value":"1866",
"childrens":[]},
{
"label":"开发区",
"value":"1867",
"childrens":[]},
{
"label":"吴江市",
"value":"1868",
"childrens":[]},
{
"label":"太仓市",
"value":"1869",
"childrens":[]}]},

{
"label":"无锡市",
"value":"222",
"childrens":[{
"label":"崇安区",
"value":"1870",
"childrens":[]},
{
"label":"北塘区",
"value":"1871",
"childrens":[]},
{
"label":"南长区",
"value":"1872",
"childrens":[]},
{
"label":"锡山区",
"value":"1873",
"childrens":[]},
{
"label":"惠山区",
"value":"1874",
"childrens":[]},
{
"label":"滨湖区",
"value":"1875",
"childrens":[]},
{
"label":"新区",
"value":"1876",
"childrens":[]},
{
"label":"江阴市",
"value":"1877",
"childrens":[]},
{
"label":"宜兴市",
"value":"1878",
"childrens":[]}]},

{
"label":"常州市",
"value":"223",
"childrens":[{
"label":"天宁区",
"value":"1879",
"childrens":[]},
{
"label":"钟楼区",
"value":"1880",
"childrens":[]},
{
"label":"戚墅堰区",
"value":"1881",
"childrens":[]},
{
"label":"郊区",
"value":"1882",
"childrens":[]},
{
"label":"新北区",
"value":"1883",
"childrens":[]},
{
"label":"武进区",
"value":"1884",
"childrens":[]},
{
"label":"溧阳市",
"value":"1885",
"childrens":[]},
{
"label":"金坛市",
"value":"1886",
"childrens":[]}]},

{
"label":"淮安市",
"value":"224",
"childrens":[{
"label":"清河区",
"value":"1887",
"childrens":[]},
{
"label":"清浦区",
"value":"1888",
"childrens":[]},
{
"label":"楚州区",
"value":"1889",
"childrens":[]},
{
"label":"淮阴区",
"value":"1890",
"childrens":[]},
{
"label":"涟水县",
"value":"1891",
"childrens":[]},
{
"label":"洪泽县",
"value":"1892",
"childrens":[]},
{
"label":"盱眙县",
"value":"1893",
"childrens":[]},
{
"label":"金湖县",
"value":"1894",
"childrens":[]}]},

{
"label":"连云港市",
"value":"225",
"childrens":[{
"label":"新浦区",
"value":"1895",
"childrens":[]},
{
"label":"连云区",
"value":"1896",
"childrens":[]},
{
"label":"海州区",
"value":"1897",
"childrens":[]},
{
"label":"赣榆县",
"value":"1898",
"childrens":[]},
{
"label":"东海县",
"value":"1899",
"childrens":[]},
{
"label":"灌云县",
"value":"1900",
"childrens":[]},
{
"label":"灌南县",
"value":"1901",
"childrens":[]}]},

{
"label":"南通市",
"value":"226",
"childrens":[{
"label":"崇川区",
"value":"1902",
"childrens":[]},
{
"label":"港闸区",
"value":"1903",
"childrens":[]},
{
"label":"经济开发区",
"value":"1904",
"childrens":[]},
{
"label":"启东市",
"value":"1905",
"childrens":[]},
{
"label":"如皋市",
"value":"1906",
"childrens":[]},
{
"label":"通州市",
"value":"1907",
"childrens":[]},
{
"label":"海门市",
"value":"1908",
"childrens":[]},
{
"label":"海安县",
"value":"1909",
"childrens":[]},
{
"label":"如东县",
"value":"1910",
"childrens":[]}]},

{
"label":"宿迁市",
"value":"227",
"childrens":[{
"label":"宿城区",
"value":"1911",
"childrens":[]},
{
"label":"宿豫区",
"value":"1912",
"childrens":[]},
{
"label":"宿豫县",
"value":"1913",
"childrens":[]},
{
"label":"沭阳县",
"value":"1914",
"childrens":[]},
{
"label":"泗阳县",
"value":"1915",
"childrens":[]},
{
"label":"泗洪县",
"value":"1916",
"childrens":[]}]},

{
"label":"泰州市",
"value":"228",
"childrens":[{
"label":"海陵区",
"value":"1917",
"childrens":[]},
{
"label":"高港区",
"value":"1918",
"childrens":[]},
{
"label":"兴化市",
"value":"1919",
"childrens":[]},
{
"label":"靖江市",
"value":"1920",
"childrens":[]},
{
"label":"泰兴市",
"value":"1921",
"childrens":[]},
{
"label":"姜堰市",
"value":"1922",
"childrens":[]}]},

{
"label":"徐州市",
"value":"229",
"childrens":[{
"label":"云龙区",
"value":"1923",
"childrens":[]},
{
"label":"鼓楼区",
"value":"1924",
"childrens":[]},
{
"label":"九里区",
"value":"1925",
"childrens":[]},
{
"label":"贾汪区",
"value":"1926",
"childrens":[]},
{
"label":"泉山区",
"value":"1927",
"childrens":[]},
{
"label":"新沂市",
"value":"1928",
"childrens":[]},
{
"label":"邳州市",
"value":"1929",
"childrens":[]},
{
"label":"丰县",
"value":"1930",
"childrens":[]},
{
"label":"沛县",
"value":"1931",
"childrens":[]},
{
"label":"铜山县",
"value":"1932",
"childrens":[]},
{
"label":"睢宁县",
"value":"1933",
"childrens":[]}]},

{
"label":"盐城市",
"value":"230",
"childrens":[{
"label":"城区",
"value":"1934",
"childrens":[]},
{
"label":"亭湖区",
"value":"1935",
"childrens":[]},
{
"label":"盐都区",
"value":"1936",
"childrens":[]},
{
"label":"盐都县",
"value":"1937",
"childrens":[]},
{
"label":"东台市",
"value":"1938",
"childrens":[]},
{
"label":"大丰市",
"value":"1939",
"childrens":[]},
{
"label":"响水县",
"value":"1940",
"childrens":[]},
{
"label":"滨海县",
"value":"1941",
"childrens":[]},
{
"label":"阜宁县",
"value":"1942",
"childrens":[]},
{
"label":"射阳县",
"value":"1943",
"childrens":[]},
{
"label":"建湖县",
"value":"1944",
"childrens":[]}]},

{
"label":"扬州市",
"value":"231",
"childrens":[{
"label":"广陵区",
"value":"1945",
"childrens":[]},
{
"label":"维扬区",
"value":"1946",
"childrens":[]},
{
"label":"邗江区",
"value":"1947",
"childrens":[]},
{
"label":"仪征市",
"value":"1948",
"childrens":[]},
{
"label":"高邮市",
"value":"1949",
"childrens":[]},
{
"label":"江都市",
"value":"1950",
"childrens":[]},
{
"label":"宝应县",
"value":"1951",
"childrens":[]}]},

{
"label":"镇江市",
"value":"232",
"childrens":[{
"label":"京口区",
"value":"1952",
"childrens":[]},
{
"label":"润州区",
"value":"1953",
"childrens":[]},
{
"label":"丹徒区",
"value":"1954",
"childrens":[]},
{
"label":"丹阳市",
"value":"1955",
"childrens":[]},
{
"label":"扬中市",
"value":"1956",
"childrens":[]},
{
"label":"句容市",
"value":"1957",
"childrens":[]}]}]},


{
"label":"江西省",
"value":"17",
"childrens":[{
"label":"南昌市",
"value":"233",
"childrens":[{
"label":"东湖区",
"value":"1958",
"childrens":[]},
{
"label":"西湖区",
"value":"1959",
"childrens":[]},
{
"label":"青云谱区",
"value":"1960",
"childrens":[]},
{
"label":"湾里区",
"value":"1961",
"childrens":[]},
{
"label":"青山湖区",
"value":"1962",
"childrens":[]},
{
"label":"红谷滩新区",
"value":"1963",
"childrens":[]},
{
"label":"昌北区",
"value":"1964",
"childrens":[]},
{
"label":"高新区",
"value":"1965",
"childrens":[]},
{
"label":"南昌县",
"value":"1966",
"childrens":[]},
{
"label":"新建县",
"value":"1967",
"childrens":[]},
{
"label":"安义县",
"value":"1968",
"childrens":[]},
{
"label":"进贤县",
"value":"1969",
"childrens":[]}]},

{
"label":"抚州市",
"value":"234",
"childrens":[{
"label":"临川区",
"value":"1970",
"childrens":[]},
{
"label":"南城县",
"value":"1971",
"childrens":[]},
{
"label":"黎川县",
"value":"1972",
"childrens":[]},
{
"label":"南丰县",
"value":"1973",
"childrens":[]},
{
"label":"崇仁县",
"value":"1974",
"childrens":[]},
{
"label":"乐安县",
"value":"1975",
"childrens":[]},
{
"label":"宜黄县",
"value":"1976",
"childrens":[]},
{
"label":"金溪县",
"value":"1977",
"childrens":[]},
{
"label":"资溪县",
"value":"1978",
"childrens":[]},
{
"label":"东乡县",
"value":"1979",
"childrens":[]},
{
"label":"广昌县",
"value":"1980",
"childrens":[]}]},

{
"label":"赣州市",
"value":"235",
"childrens":[{
"label":"章贡区",
"value":"1981",
"childrens":[]},
{
"label":"于都县",
"value":"1982",
"childrens":[]},
{
"label":"瑞金市",
"value":"1983",
"childrens":[]},
{
"label":"南康市",
"value":"1984",
"childrens":[]},
{
"label":"赣县",
"value":"1985",
"childrens":[]},
{
"label":"信丰县",
"value":"1986",
"childrens":[]},
{
"label":"大余县",
"value":"1987",
"childrens":[]},
{
"label":"上犹县",
"value":"1988",
"childrens":[]},
{
"label":"崇义县",
"value":"1989",
"childrens":[]},
{
"label":"安远县",
"value":"1990",
"childrens":[]},
{
"label":"龙南县",
"value":"1991",
"childrens":[]},
{
"label":"定南县",
"value":"1992",
"childrens":[]},
{
"label":"全南县",
"value":"1993",
"childrens":[]},
{
"label":"宁都县",
"value":"1994",
"childrens":[]},
{
"label":"兴国县",
"value":"1995",
"childrens":[]},
{
"label":"会昌县",
"value":"1996",
"childrens":[]},
{
"label":"寻乌县",
"value":"1997",
"childrens":[]},
{
"label":"石城县",
"value":"1998",
"childrens":[]}]},

{
"label":"吉安市",
"value":"236",
"childrens":[{
"label":"安福县",
"value":"1999",
"childrens":[]},
{
"label":"吉州区",
"value":"2000",
"childrens":[]},
{
"label":"青原区",
"value":"2001",
"childrens":[]},
{
"label":"井冈山市",
"value":"2002",
"childrens":[]},
{
"label":"吉安县",
"value":"2003",
"childrens":[]},
{
"label":"吉水县",
"value":"2004",
"childrens":[]},
{
"label":"峡江县",
"value":"2005",
"childrens":[]},
{
"label":"新干县",
"value":"2006",
"childrens":[]},
{
"label":"永丰县",
"value":"2007",
"childrens":[]},
{
"label":"泰和县",
"value":"2008",
"childrens":[]},
{
"label":"遂川县",
"value":"2009",
"childrens":[]},
{
"label":"万安县",
"value":"2010",
"childrens":[]},
{
"label":"永新县",
"value":"2011",
"childrens":[]}]},

{
"label":"景德镇市",
"value":"237",
"childrens":[{
"label":"珠山区",
"value":"2012",
"childrens":[]},
{
"label":"昌江区",
"value":"2013",
"childrens":[]},
{
"label":"乐平市",
"value":"2014",
"childrens":[]},
{
"label":"浮梁县",
"value":"2015",
"childrens":[]}]},

{
"label":"九江市",
"value":"238",
"childrens":[{
"label":"浔阳区",
"value":"2016",
"childrens":[]},
{
"label":"庐山区",
"value":"2017",
"childrens":[]},
{
"label":"瑞昌市",
"value":"2018",
"childrens":[]},
{
"label":"九江县",
"value":"2019",
"childrens":[]},
{
"label":"武宁县",
"value":"2020",
"childrens":[]},
{
"label":"修水县",
"value":"2021",
"childrens":[]},
{
"label":"永修县",
"value":"2022",
"childrens":[]},
{
"label":"德安县",
"value":"2023",
"childrens":[]},
{
"label":"星子县",
"value":"2024",
"childrens":[]},
{
"label":"都昌县",
"value":"2025",
"childrens":[]},
{
"label":"湖口县",
"value":"2026",
"childrens":[]},
{
"label":"彭泽县",
"value":"2027",
"childrens":[]}]},

{
"label":"萍乡市",
"value":"239",
"childrens":[{
"label":"安源区",
"value":"2028",
"childrens":[]},
{
"label":"湘东区",
"value":"2029",
"childrens":[]},
{
"label":"莲花县",
"value":"2030",
"childrens":[]},
{
"label":"芦溪县",
"value":"2031",
"childrens":[]},
{
"label":"上栗县",
"value":"2032",
"childrens":[]}]},

{
"label":"上饶市",
"value":"240",
"childrens":[{
"label":"信州区",
"value":"2033",
"childrens":[]},
{
"label":"德兴市",
"value":"2034",
"childrens":[]},
{
"label":"上饶县",
"value":"2035",
"childrens":[]},
{
"label":"广丰县",
"value":"2036",
"childrens":[]},
{
"label":"玉山县",
"value":"2037",
"childrens":[]},
{
"label":"铅山县",
"value":"2038",
"childrens":[]},
{
"label":"横峰县",
"value":"2039",
"childrens":[]},
{
"label":"弋阳县",
"value":"2040",
"childrens":[]},
{
"label":"余干县",
"value":"2041",
"childrens":[]},
{
"label":"波阳县",
"value":"2042",
"childrens":[]},
{
"label":"万年县",
"value":"2043",
"childrens":[]},
{
"label":"婺源县",
"value":"2044",
"childrens":[]}]},

{
"label":"新余市",
"value":"241",
"childrens":[{
"label":"渝水区",
"value":"2045",
"childrens":[]},
{
"label":"分宜县",
"value":"2046",
"childrens":[]}]},

{
"label":"宜春市",
"value":"242",
"childrens":[{
"label":"袁州区",
"value":"2047",
"childrens":[]},
{
"label":"丰城市",
"value":"2048",
"childrens":[]},
{
"label":"樟树市",
"value":"2049",
"childrens":[]},
{
"label":"高安市",
"value":"2050",
"childrens":[]},
{
"label":"奉新县",
"value":"2051",
"childrens":[]},
{
"label":"万载县",
"value":"2052",
"childrens":[]},
{
"label":"上高县",
"value":"2053",
"childrens":[]},
{
"label":"宜丰县",
"value":"2054",
"childrens":[]},
{
"label":"靖安县",
"value":"2055",
"childrens":[]},
{
"label":"铜鼓县",
"value":"2056",
"childrens":[]}]},

{
"label":"鹰潭市",
"value":"243",
"childrens":[{
"label":"月湖区",
"value":"2057",
"childrens":[]},
{
"label":"贵溪市",
"value":"2058",
"childrens":[]},
{
"label":"余江县",
"value":"2059",
"childrens":[]}]}]},


{
"label":"辽宁省",
"value":"18",
"childrens":[{
"label":"沈阳市",
"value":"244",
"childrens":[{
"label":"沈河区",
"value":"2060",
"childrens":[]},
{
"label":"皇姑区",
"value":"2061",
"childrens":[]},
{
"label":"和平区",
"value":"2062",
"childrens":[]},
{
"label":"大东区",
"value":"2063",
"childrens":[]},
{
"label":"铁西区",
"value":"2064",
"childrens":[]},
{
"label":"苏家屯区",
"value":"2065",
"childrens":[]},
{
"label":"东陵区",
"value":"2066",
"childrens":[]},
{
"label":"沈北新区",
"value":"2067",
"childrens":[]},
{
"label":"于洪区",
"value":"2068",
"childrens":[]},
{
"label":"浑南新区",
"value":"2069",
"childrens":[]},
{
"label":"新民市",
"value":"2070",
"childrens":[]},
{
"label":"辽中县",
"value":"2071",
"childrens":[]},
{
"label":"康平县",
"value":"2072",
"childrens":[]},
{
"label":"法库县",
"value":"2073",
"childrens":[]}]},

{
"label":"大连市",
"value":"245",
"childrens":[{
"label":"西岗区",
"value":"2074",
"childrens":[]},
{
"label":"中山区",
"value":"2075",
"childrens":[]},
{
"label":"沙河口区",
"value":"2076",
"childrens":[]},
{
"label":"甘井子区",
"value":"2077",
"childrens":[]},
{
"label":"旅顺口区",
"value":"2078",
"childrens":[]},
{
"label":"金州区",
"value":"2079",
"childrens":[]},
{
"label":"开发区",
"value":"2080",
"childrens":[]},
{
"label":"瓦房店市",
"value":"2081",
"childrens":[]},
{
"label":"普兰店市",
"value":"2082",
"childrens":[]},
{
"label":"庄河市",
"value":"2083",
"childrens":[]},
{
"label":"长海县",
"value":"2084",
"childrens":[]}]},

{
"label":"鞍山市",
"value":"246",
"childrens":[{
"label":"铁东区",
"value":"2085",
"childrens":[]},
{
"label":"铁西区",
"value":"2086",
"childrens":[]},
{
"label":"立山区",
"value":"2087",
"childrens":[]},
{
"label":"千山区",
"value":"2088",
"childrens":[]},
{
"label":"岫岩",
"value":"2089",
"childrens":[]},
{
"label":"海城市",
"value":"2090",
"childrens":[]},
{
"label":"台安县",
"value":"2091",
"childrens":[]}]},

{
"label":"本溪市",
"value":"247",
"childrens":[{
"label":"本溪",
"value":"2092",
"childrens":[]},
{
"label":"平山区",
"value":"2093",
"childrens":[]},
{
"label":"明山区",
"value":"2094",
"childrens":[]},
{
"label":"溪湖区",
"value":"2095",
"childrens":[]},
{
"label":"南芬区",
"value":"2096",
"childrens":[]},
{
"label":"桓仁",
"value":"2097",
"childrens":[]}]},

{
"label":"朝阳市",
"value":"248",
"childrens":[{
"label":"双塔区",
"value":"2098",
"childrens":[]},
{
"label":"龙城区",
"value":"2099",
"childrens":[]},
{
"label":"喀喇沁左翼蒙古族自治县",
"value":"2100",
"childrens":[]},
{
"label":"北票市",
"value":"2101",
"childrens":[]},
{
"label":"凌源市",
"value":"2102",
"childrens":[]},
{
"label":"朝阳县",
"value":"2103",
"childrens":[]},
{
"label":"建平县",
"value":"2104",
"childrens":[]}]},

{
"label":"丹东市",
"value":"249",
"childrens":[{
"label":"振兴区",
"value":"2105",
"childrens":[]},
{
"label":"元宝区",
"value":"2106",
"childrens":[]},
{
"label":"振安区",
"value":"2107",
"childrens":[]},
{
"label":"宽甸",
"value":"2108",
"childrens":[]},
{
"label":"东港市",
"value":"2109",
"childrens":[]},
{
"label":"凤城市",
"value":"2110",
"childrens":[]}]},

{
"label":"抚顺市",
"value":"250",
"childrens":[{
"label":"顺城区",
"value":"2111",
"childrens":[]},
{
"label":"新抚区",
"value":"2112",
"childrens":[]},
{
"label":"东洲区",
"value":"2113",
"childrens":[]},
{
"label":"望花区",
"value":"2114",
"childrens":[]},
{
"label":"清原",
"value":"2115",
"childrens":[]},
{
"label":"新宾",
"value":"2116",
"childrens":[]},
{
"label":"抚顺县",
"value":"2117",
"childrens":[]}]},

{
"label":"阜新市",
"value":"251",
"childrens":[{
"label":"阜新",
"value":"2118",
"childrens":[]},
{
"label":"海州区",
"value":"2119",
"childrens":[]},
{
"label":"新邱区",
"value":"2120",
"childrens":[]},
{
"label":"太平区",
"value":"2121",
"childrens":[]},
{
"label":"清河门区",
"value":"2122",
"childrens":[]},
{
"label":"细河区",
"value":"2123",
"childrens":[]},
{
"label":"彰武县",
"value":"2124",
"childrens":[]}]},

{
"label":"葫芦岛市",
"value":"252",
"childrens":[{
"label":"龙港区",
"value":"2125",
"childrens":[]},
{
"label":"南票区",
"value":"2126",
"childrens":[]},
{
"label":"连山区",
"value":"2127",
"childrens":[]},
{
"label":"兴城市",
"value":"2128",
"childrens":[]},
{
"label":"绥中县",
"value":"2129",
"childrens":[]},
{
"label":"建昌县",
"value":"2130",
"childrens":[]}]},

{
"label":"锦州市",
"value":"253",
"childrens":[{
"label":"太和区",
"value":"2131",
"childrens":[]},
{
"label":"古塔区",
"value":"2132",
"childrens":[]},
{
"label":"凌河区",
"value":"2133",
"childrens":[]},
{
"label":"凌海市",
"value":"2134",
"childrens":[]},
{
"label":"北镇市",
"value":"2135",
"childrens":[]},
{
"label":"黑山县",
"value":"2136",
"childrens":[]},
{
"label":"义县",
"value":"2137",
"childrens":[]}]},

{
"label":"辽阳市",
"value":"254",
"childrens":[{
"label":"白塔区",
"value":"2138",
"childrens":[]},
{
"label":"文圣区",
"value":"2139",
"childrens":[]},
{
"label":"宏伟区",
"value":"2140",
"childrens":[]},
{
"label":"太子河区",
"value":"2141",
"childrens":[]},
{
"label":"弓长岭区",
"value":"2142",
"childrens":[]},
{
"label":"灯塔市",
"value":"2143",
"childrens":[]},
{
"label":"辽阳县",
"value":"2144",
"childrens":[]}]},

{
"label":"盘锦市",
"value":"255",
"childrens":[{
"label":"双台子区",
"value":"2145",
"childrens":[]},
{
"label":"兴隆台区",
"value":"2146",
"childrens":[]},
{
"label":"大洼县",
"value":"2147",
"childrens":[]},
{
"label":"盘山县",
"value":"2148",
"childrens":[]}]},

{
"label":"铁岭市",
"value":"256",
"childrens":[{
"label":"银州区",
"value":"2149",
"childrens":[]},
{
"label":"清河区",
"value":"2150",
"childrens":[]},
{
"label":"调兵山市",
"value":"2151",
"childrens":[]},
{
"label":"开原市",
"value":"2152",
"childrens":[]},
{
"label":"铁岭县",
"value":"2153",
"childrens":[]},
{
"label":"西丰县",
"value":"2154",
"childrens":[]},
{
"label":"昌图县",
"value":"2155",
"childrens":[]}]},

{
"label":"营口市",
"value":"257",
"childrens":[{
"label":"站前区",
"value":"2156",
"childrens":[]},
{
"label":"西市区",
"value":"2157",
"childrens":[]},
{
"label":"鲅鱼圈区",
"value":"2158",
"childrens":[]},
{
"label":"老边区",
"value":"2159",
"childrens":[]},
{
"label":"盖州市",
"value":"2160",
"childrens":[]},
{
"label":"大石桥市",
"value":"2161",
"childrens":[]}]}]},


{
"label":"内蒙古自治区",
"value":"19",
"childrens":[{
"label":"呼和浩特市",
"value":"258",
"childrens":[{
"label":"回民区",
"value":"2162",
"childrens":[]},
{
"label":"玉泉区",
"value":"2163",
"childrens":[]},
{
"label":"新城区",
"value":"2164",
"childrens":[]},
{
"label":"赛罕区",
"value":"2165",
"childrens":[]},
{
"label":"清水河县",
"value":"2166",
"childrens":[]},
{
"label":"土默特左旗",
"value":"2167",
"childrens":[]},
{
"label":"托克托县",
"value":"2168",
"childrens":[]},
{
"label":"和林格尔县",
"value":"2169",
"childrens":[]},
{
"label":"武川县",
"value":"2170",
"childrens":[]}]},

{
"label":"阿拉善盟",
"value":"259",
"childrens":[{
"label":"阿拉善左旗",
"value":"2171",
"childrens":[]},
{
"label":"阿拉善右旗",
"value":"2172",
"childrens":[]},
{
"label":"额济纳旗",
"value":"2173",
"childrens":[]}]},

{
"label":"巴彦淖尔市",
"value":"260",
"childrens":[{
"label":"临河区",
"value":"2174",
"childrens":[]},
{
"label":"五原县",
"value":"2175",
"childrens":[]},
{
"label":"磴口县",
"value":"2176",
"childrens":[]},
{
"label":"乌拉特前旗",
"value":"2177",
"childrens":[]},
{
"label":"乌拉特中旗",
"value":"2178",
"childrens":[]},
{
"label":"乌拉特后旗",
"value":"2179",
"childrens":[]},
{
"label":"杭锦后旗",
"value":"2180",
"childrens":[]}]},

{
"label":"包头市",
"value":"261",
"childrens":[{
"label":"昆都仑区",
"value":"2181",
"childrens":[]},
{
"label":"青山区",
"value":"2182",
"childrens":[]},
{
"label":"东河区",
"value":"2183",
"childrens":[]},
{
"label":"九原区",
"value":"2184",
"childrens":[]},
{
"label":"石拐区",
"value":"2185",
"childrens":[]},
{
"label":"白云矿区",
"value":"2186",
"childrens":[]},
{
"label":"土默特右旗",
"value":"2187",
"childrens":[]},
{
"label":"固阳县",
"value":"2188",
"childrens":[]},
{
"label":"达尔罕茂明安联合旗",
"value":"2189",
"childrens":[]}]},

{
"label":"赤峰市",
"value":"262",
"childrens":[{
"label":"红山区",
"value":"2190",
"childrens":[]},
{
"label":"元宝山区",
"value":"2191",
"childrens":[]},
{
"label":"松山区",
"value":"2192",
"childrens":[]},
{
"label":"阿鲁科尔沁旗",
"value":"2193",
"childrens":[]},
{
"label":"巴林左旗",
"value":"2194",
"childrens":[]},
{
"label":"巴林右旗",
"value":"2195",
"childrens":[]},
{
"label":"林西县",
"value":"2196",
"childrens":[]},
{
"label":"克什克腾旗",
"value":"2197",
"childrens":[]},
{
"label":"翁牛特旗",
"value":"2198",
"childrens":[]},
{
"label":"喀喇沁旗",
"value":"2199",
"childrens":[]},
{
"label":"宁城县",
"value":"2200",
"childrens":[]},
{
"label":"敖汉旗",
"value":"2201",
"childrens":[]}]},

{
"label":"鄂尔多斯市",
"value":"263",
"childrens":[{
"label":"东胜区",
"value":"2202",
"childrens":[]},
{
"label":"达拉特旗",
"value":"2203",
"childrens":[]},
{
"label":"准格尔旗",
"value":"2204",
"childrens":[]},
{
"label":"鄂托克前旗",
"value":"2205",
"childrens":[]},
{
"label":"鄂托克旗",
"value":"2206",
"childrens":[]},
{
"label":"杭锦旗",
"value":"2207",
"childrens":[]},
{
"label":"乌审旗",
"value":"2208",
"childrens":[]},
{
"label":"伊金霍洛旗",
"value":"2209",
"childrens":[]}]},

{
"label":"呼伦贝尔市",
"value":"264",
"childrens":[{
"label":"海拉尔区",
"value":"2210",
"childrens":[]},
{
"label":"莫力达瓦",
"value":"2211",
"childrens":[]},
{
"label":"满洲里市",
"value":"2212",
"childrens":[]},
{
"label":"牙克石市",
"value":"2213",
"childrens":[]},
{
"label":"扎兰屯市",
"value":"2214",
"childrens":[]},
{
"label":"额尔古纳市",
"value":"2215",
"childrens":[]},
{
"label":"根河市",
"value":"2216",
"childrens":[]},
{
"label":"阿荣旗",
"value":"2217",
"childrens":[]},
{
"label":"鄂伦春自治旗",
"value":"2218",
"childrens":[]},
{
"label":"鄂温克族自治旗",
"value":"2219",
"childrens":[]},
{
"label":"陈巴尔虎旗",
"value":"2220",
"childrens":[]},
{
"label":"新巴尔虎左旗",
"value":"2221",
"childrens":[]},
{
"label":"新巴尔虎右旗",
"value":"2222",
"childrens":[]}]},

{
"label":"通辽市",
"value":"265",
"childrens":[{
"label":"科尔沁区",
"value":"2223",
"childrens":[]},
{
"label":"霍林郭勒市",
"value":"2224",
"childrens":[]},
{
"label":"科尔沁左翼中旗",
"value":"2225",
"childrens":[]},
{
"label":"科尔沁左翼后旗",
"value":"2226",
"childrens":[]},
{
"label":"开鲁县",
"value":"2227",
"childrens":[]},
{
"label":"库伦旗",
"value":"2228",
"childrens":[]},
{
"label":"奈曼旗",
"value":"2229",
"childrens":[]},
{
"label":"扎鲁特旗",
"value":"2230",
"childrens":[]}]},

{
"label":"乌海市",
"value":"266",
"childrens":[{
"label":"海勃湾区",
"value":"2231",
"childrens":[]},
{
"label":"乌达区",
"value":"2232",
"childrens":[]},
{
"label":"海南区",
"value":"2233",
"childrens":[]}]},

{
"label":"乌兰察布市市",
"value":"267",
"childrens":[{
"label":"化德县",
"value":"2234",
"childrens":[]},
{
"label":"集宁区",
"value":"2235",
"childrens":[]},
{
"label":"丰镇市",
"value":"2236",
"childrens":[]},
{
"label":"卓资县",
"value":"2237",
"childrens":[]},
{
"label":"商都县",
"value":"2238",
"childrens":[]},
{
"label":"兴和县",
"value":"2239",
"childrens":[]},
{
"label":"凉城县",
"value":"2240",
"childrens":[]},
{
"label":"察哈尔右翼前旗",
"value":"2241",
"childrens":[]},
{
"label":"察哈尔右翼中旗",
"value":"2242",
"childrens":[]},
{
"label":"察哈尔右翼后旗",
"value":"2243",
"childrens":[]},
{
"label":"四子王旗",
"value":"2244",
"childrens":[]}]},

{
"label":"锡林郭勒盟",
"value":"268",
"childrens":[{
"label":"二连浩特市",
"value":"2245",
"childrens":[]},
{
"label":"锡林浩特市",
"value":"2246",
"childrens":[]},
{
"label":"阿巴嘎旗",
"value":"2247",
"childrens":[]},
{
"label":"苏尼特左旗",
"value":"2248",
"childrens":[]},
{
"label":"苏尼特右旗",
"value":"2249",
"childrens":[]},
{
"label":"东乌珠穆沁旗",
"value":"2250",
"childrens":[]},
{
"label":"西乌珠穆沁旗",
"value":"2251",
"childrens":[]},
{
"label":"太仆寺旗",
"value":"2252",
"childrens":[]},
{
"label":"镶黄旗",
"value":"2253",
"childrens":[]},
{
"label":"正镶白旗",
"value":"2254",
"childrens":[]},
{
"label":"正蓝旗",
"value":"2255",
"childrens":[]},
{
"label":"多伦县",
"value":"2256",
"childrens":[]}]},

{
"label":"兴安盟",
"value":"269",
"childrens":[{
"label":"乌兰浩特市",
"value":"2257",
"childrens":[]},
{
"label":"阿尔山市",
"value":"2258",
"childrens":[]},
{
"label":"科尔沁右翼前旗",
"value":"2259",
"childrens":[]},
{
"label":"科尔沁右翼中旗",
"value":"2260",
"childrens":[]},
{
"label":"扎赉特旗",
"value":"2261",
"childrens":[]},
{
"label":"突泉县",
"value":"2262",
"childrens":[]}]}]},


{
"label":"宁夏回族自治区",
"value":"20",
"childrens":[{
"label":"银川市",
"value":"270",
"childrens":[{
"label":"西夏区",
"value":"2263",
"childrens":[]},
{
"label":"金凤区",
"value":"2264",
"childrens":[]},
{
"label":"兴庆区",
"value":"2265",
"childrens":[]},
{
"label":"灵武市",
"value":"2266",
"childrens":[]},
{
"label":"永宁县",
"value":"2267",
"childrens":[]},
{
"label":"贺兰县",
"value":"2268",
"childrens":[]}]},

{
"label":"固原市",
"value":"271",
"childrens":[{
"label":"原州区",
"value":"2269",
"childrens":[]},
{
"label":"海原县",
"value":"2270",
"childrens":[]},
{
"label":"西吉县",
"value":"2271",
"childrens":[]},
{
"label":"隆德县",
"value":"2272",
"childrens":[]},
{
"label":"泾源县",
"value":"2273",
"childrens":[]},
{
"label":"彭阳县",
"value":"2274",
"childrens":[]}]},

{
"label":"石嘴山市",
"value":"272",
"childrens":[{
"label":"惠农县",
"value":"2275",
"childrens":[]},
{
"label":"大武口区",
"value":"2276",
"childrens":[]},
{
"label":"惠农区",
"value":"2277",
"childrens":[]},
{
"label":"陶乐县",
"value":"2278",
"childrens":[]},
{
"label":"平罗县",
"value":"2279",
"childrens":[]}]},

{
"label":"吴忠市",
"value":"273",
"childrens":[{
"label":"利通区",
"value":"2280",
"childrens":[]},
{
"label":"中卫县",
"value":"2281",
"childrens":[]},
{
"label":"青铜峡市",
"value":"2282",
"childrens":[]},
{
"label":"中宁县",
"value":"2283",
"childrens":[]},
{
"label":"盐池县",
"value":"2284",
"childrens":[]},
{
"label":"同心县",
"value":"2285",
"childrens":[]}]},

{
"label":"中卫市",
"value":"274",
"childrens":[{
"label":"沙坡头区",
"value":"2286",
"childrens":[]},
{
"label":"海原县",
"value":"2287",
"childrens":[]},
{
"label":"中宁县",
"value":"2288",
"childrens":[]}]}]},


{
"label":"青海省",
"value":"21",
"childrens":[{
"label":"西宁市",
"value":"275",
"childrens":[{
"label":"城中区",
"value":"2289",
"childrens":[]},
{
"label":"城东区",
"value":"2290",
"childrens":[]},
{
"label":"城西区",
"value":"2291",
"childrens":[]},
{
"label":"城北区",
"value":"2292",
"childrens":[]},
{
"label":"湟中县",
"value":"2293",
"childrens":[]},
{
"label":"湟源县",
"value":"2294",
"childrens":[]},
{
"label":"大通",
"value":"2295",
"childrens":[]}]},

{
"label":"果洛藏族自治州",
"value":"276",
"childrens":[{
"label":"玛沁县",
"value":"2296",
"childrens":[]},
{
"label":"班玛县",
"value":"2297",
"childrens":[]},
{
"label":"甘德县",
"value":"2298",
"childrens":[]},
{
"label":"达日县",
"value":"2299",
"childrens":[]},
{
"label":"久治县",
"value":"2300",
"childrens":[]},
{
"label":"玛多县",
"value":"2301",
"childrens":[]}]},

{
"label":"海北藏族自治州",
"value":"277",
"childrens":[{
"label":"海晏县",
"value":"2302",
"childrens":[]},
{
"label":"祁连县",
"value":"2303",
"childrens":[]},
{
"label":"刚察县",
"value":"2304",
"childrens":[]},
{
"label":"门源",
"value":"2305",
"childrens":[]}]},

{
"label":"海东市",
"value":"278",
"childrens":[{
"label":"平安县",
"value":"2306",
"childrens":[]},
{
"label":"乐都县",
"value":"2307",
"childrens":[]},
{
"label":"民和",
"value":"2308",
"childrens":[]},
{
"label":"互助",
"value":"2309",
"childrens":[]},
{
"label":"化隆",
"value":"2310",
"childrens":[]},
{
"label":"循化",
"value":"2311",
"childrens":[]}]},

{
"label":"海南藏族自治州",
"value":"279",
"childrens":[{
"label":"共和县",
"value":"2312",
"childrens":[]},
{
"label":"同德县",
"value":"2313",
"childrens":[]},
{
"label":"贵德县",
"value":"2314",
"childrens":[]},
{
"label":"兴海县",
"value":"2315",
"childrens":[]},
{
"label":"贵南县",
"value":"2316",
"childrens":[]}]},

{
"label":"海西蒙古族藏族自治州",
"value":"280",
"childrens":[{
"label":"德令哈市",
"value":"2317",
"childrens":[]},
{
"label":"格尔木市",
"value":"2318",
"childrens":[]},
{
"label":"乌兰县",
"value":"2319",
"childrens":[]},
{
"label":"都兰县",
"value":"2320",
"childrens":[]},
{
"label":"天峻县",
"value":"2321",
"childrens":[]}]},

{
"label":"黄南藏族自治州",
"value":"281",
"childrens":[{
"label":"同仁县",
"value":"2322",
"childrens":[]},
{
"label":"尖扎县",
"value":"2323",
"childrens":[]},
{
"label":"泽库县",
"value":"2324",
"childrens":[]},
{
"label":"河南蒙古族自治县",
"value":"2325",
"childrens":[]}]},

{
"label":"玉树藏族自治州",
"value":"282",
"childrens":[{
"label":"玉树县",
"value":"2326",
"childrens":[]},
{
"label":"杂多县",
"value":"2327",
"childrens":[]},
{
"label":"称多县",
"value":"2328",
"childrens":[]},
{
"label":"治多县",
"value":"2329",
"childrens":[]},
{
"label":"囊谦县",
"value":"2330",
"childrens":[]},
{
"label":"曲麻莱县",
"value":"2331",
"childrens":[]}]}]},


{
"label":"山东省",
"value":"22",
"childrens":[{
"label":"济南市",
"value":"283",
"childrens":[{
"label":"市中区",
"value":"2332",
"childrens":[]},
{
"label":"历下区",
"value":"2333",
"childrens":[]},
{
"label":"天桥区",
"value":"2334",
"childrens":[]},
{
"label":"槐荫区",
"value":"2335",
"childrens":[]},
{
"label":"历城区",
"value":"2336",
"childrens":[]},
{
"label":"长清区",
"value":"2337",
"childrens":[]},
{
"label":"章丘市",
"value":"2338",
"childrens":[]},
{
"label":"平阴县",
"value":"2339",
"childrens":[]},
{
"label":"济阳县",
"value":"2340",
"childrens":[]},
{
"label":"商河县",
"value":"2341",
"childrens":[]}]},

{
"label":"青岛市",
"value":"284",
"childrens":[{
"label":"市南区",
"value":"2342",
"childrens":[]},
{
"label":"市北区",
"value":"2343",
"childrens":[]},
{
"label":"城阳区",
"value":"2344",
"childrens":[]},
{
"label":"四方区",
"value":"2345",
"childrens":[]},
{
"label":"李沧区",
"value":"2346",
"childrens":[]},
{
"label":"黄岛区",
"value":"2347",
"childrens":[]},
{
"label":"崂山区",
"value":"2348",
"childrens":[]},
{
"label":"胶州市",
"value":"2349",
"childrens":[]},
{
"label":"即墨市",
"value":"2350",
"childrens":[]},
{
"label":"平度市",
"value":"2351",
"childrens":[]},
{
"label":"胶南市",
"value":"2352",
"childrens":[]},
{
"label":"莱西市",
"value":"2353",
"childrens":[]}]},

{
"label":"滨州市",
"value":"285",
"childrens":[{
"label":"滨城区",
"value":"2354",
"childrens":[]},
{
"label":"惠民县",
"value":"2355",
"childrens":[]},
{
"label":"阳信县",
"value":"2356",
"childrens":[]},
{
"label":"无棣县",
"value":"2357",
"childrens":[]},
{
"label":"沾化县",
"value":"2358",
"childrens":[]},
{
"label":"博兴县",
"value":"2359",
"childrens":[]},
{
"label":"邹平县",
"value":"2360",
"childrens":[]}]},

{
"label":"德州市",
"value":"286",
"childrens":[{
"label":"德城区",
"value":"2361",
"childrens":[]},
{
"label":"陵县",
"value":"2362",
"childrens":[]},
{
"label":"乐陵市",
"value":"2363",
"childrens":[]},
{
"label":"禹城市",
"value":"2364",
"childrens":[]},
{
"label":"宁津县",
"value":"2365",
"childrens":[]},
{
"label":"庆云县",
"value":"2366",
"childrens":[]},
{
"label":"临邑县",
"value":"2367",
"childrens":[]},
{
"label":"齐河县",
"value":"2368",
"childrens":[]},
{
"label":"平原县",
"value":"2369",
"childrens":[]},
{
"label":"夏津县",
"value":"2370",
"childrens":[]},
{
"label":"武城县",
"value":"2371",
"childrens":[]}]},

{
"label":"东营市",
"value":"287",
"childrens":[{
"label":"东营区",
"value":"2372",
"childrens":[]},
{
"label":"河口区",
"value":"2373",
"childrens":[]},
{
"label":"垦利县",
"value":"2374",
"childrens":[]},
{
"label":"利津县",
"value":"2375",
"childrens":[]},
{
"label":"广饶县",
"value":"2376",
"childrens":[]}]},

{
"label":"菏泽市",
"value":"288",
"childrens":[{
"label":"牡丹区",
"value":"2377",
"childrens":[]},
{
"label":"曹县",
"value":"2378",
"childrens":[]},
{
"label":"单县",
"value":"2379",
"childrens":[]},
{
"label":"成武县",
"value":"2380",
"childrens":[]},
{
"label":"巨野县",
"value":"2381",
"childrens":[]},
{
"label":"郓城县",
"value":"2382",
"childrens":[]},
{
"label":"鄄城县",
"value":"2383",
"childrens":[]},
{
"label":"定陶县",
"value":"2384",
"childrens":[]},
{
"label":"东明县",
"value":"2385",
"childrens":[]}]},

{
"label":"济宁市",
"value":"289",
"childrens":[{
"label":"市中区",
"value":"2386",
"childrens":[]},
{
"label":"任城区",
"value":"2387",
"childrens":[]},
{
"label":"曲阜市",
"value":"2388",
"childrens":[]},
{
"label":"兖州市",
"value":"2389",
"childrens":[]},
{
"label":"邹城市",
"value":"2390",
"childrens":[]},
{
"label":"微山县",
"value":"2391",
"childrens":[]},
{
"label":"鱼台县",
"value":"2392",
"childrens":[]},
{
"label":"金乡县",
"value":"2393",
"childrens":[]},
{
"label":"嘉祥县",
"value":"2394",
"childrens":[]},
{
"label":"汶上县",
"value":"2395",
"childrens":[]},
{
"label":"泗水县",
"value":"2396",
"childrens":[]},
{
"label":"梁山县",
"value":"2397",
"childrens":[]}]},

{
"label":"莱芜市",
"value":"290",
"childrens":[{
"label":"莱城区",
"value":"2398",
"childrens":[]},
{
"label":"钢城区",
"value":"2399",
"childrens":[]}]},

{
"label":"聊城市",
"value":"291",
"childrens":[{
"label":"东昌府区",
"value":"2400",
"childrens":[]},
{
"label":"临清市",
"value":"2401",
"childrens":[]},
{
"label":"阳谷县",
"value":"2402",
"childrens":[]},
{
"label":"莘县",
"value":"2403",
"childrens":[]},
{
"label":"茌平县",
"value":"2404",
"childrens":[]},
{
"label":"东阿县",
"value":"2405",
"childrens":[]},
{
"label":"冠县",
"value":"2406",
"childrens":[]},
{
"label":"高唐县",
"value":"2407",
"childrens":[]}]},

{
"label":"临沂市",
"value":"292",
"childrens":[{
"label":"兰山区",
"value":"2408",
"childrens":[]},
{
"label":"罗庄区",
"value":"2409",
"childrens":[]},
{
"label":"河东区",
"value":"2410",
"childrens":[]},
{
"label":"沂南县",
"value":"2411",
"childrens":[]},
{
"label":"郯城县",
"value":"2412",
"childrens":[]},
{
"label":"沂水县",
"value":"2413",
"childrens":[]},
{
"label":"苍山县",
"value":"2414",
"childrens":[]},
{
"label":"费县",
"value":"2415",
"childrens":[]},
{
"label":"平邑县",
"value":"2416",
"childrens":[]},
{
"label":"莒南县",
"value":"2417",
"childrens":[]},
{
"label":"蒙阴县",
"value":"2418",
"childrens":[]},
{
"label":"临沭县",
"value":"2419",
"childrens":[]}]},

{
"label":"日照市",
"value":"293",
"childrens":[{
"label":"东港区",
"value":"2420",
"childrens":[]},
{
"label":"岚山区",
"value":"2421",
"childrens":[]},
{
"label":"五莲县",
"value":"2422",
"childrens":[]},
{
"label":"莒县",
"value":"2423",
"childrens":[]}]},

{
"label":"泰安市",
"value":"294",
"childrens":[{
"label":"泰山区",
"value":"2424",
"childrens":[]},
{
"label":"岱岳区",
"value":"2425",
"childrens":[]},
{
"label":"新泰市",
"value":"2426",
"childrens":[]},
{
"label":"肥城市",
"value":"2427",
"childrens":[]},
{
"label":"宁阳县",
"value":"2428",
"childrens":[]},
{
"label":"东平县",
"value":"2429",
"childrens":[]}]},

{
"label":"威海市",
"value":"295",
"childrens":[{
"label":"荣成市",
"value":"2430",
"childrens":[]},
{
"label":"乳山市",
"value":"2431",
"childrens":[]},
{
"label":"环翠区",
"value":"2432",
"childrens":[]},
{
"label":"文登市",
"value":"2433",
"childrens":[]}]},

{
"label":"潍坊市",
"value":"296",
"childrens":[{
"label":"潍城区",
"value":"2434",
"childrens":[]},
{
"label":"寒亭区",
"value":"2435",
"childrens":[]},
{
"label":"坊子区",
"value":"2436",
"childrens":[]},
{
"label":"奎文区",
"value":"2437",
"childrens":[]},
{
"label":"青州市",
"value":"2438",
"childrens":[]},
{
"label":"诸城市",
"value":"2439",
"childrens":[]},
{
"label":"寿光市",
"value":"2440",
"childrens":[]},
{
"label":"安丘市",
"value":"2441",
"childrens":[]},
{
"label":"高密市",
"value":"2442",
"childrens":[]},
{
"label":"昌邑市",
"value":"2443",
"childrens":[]},
{
"label":"临朐县",
"value":"2444",
"childrens":[]},
{
"label":"昌乐县",
"value":"2445",
"childrens":[]}]},

{
"label":"烟台市",
"value":"297",
"childrens":[{
"label":"芝罘区",
"value":"2446",
"childrens":[]},
{
"label":"福山区",
"value":"2447",
"childrens":[]},
{
"label":"牟平区",
"value":"2448",
"childrens":[]},
{
"label":"莱山区",
"value":"2449",
"childrens":[]},
{
"label":"开发区",
"value":"2450",
"childrens":[]},
{
"label":"龙口市",
"value":"2451",
"childrens":[]},
{
"label":"莱阳市",
"value":"2452",
"childrens":[]},
{
"label":"莱州市",
"value":"2453",
"childrens":[]},
{
"label":"蓬莱市",
"value":"2454",
"childrens":[]},
{
"label":"招远市",
"value":"2455",
"childrens":[]},
{
"label":"栖霞市",
"value":"2456",
"childrens":[]},
{
"label":"海阳市",
"value":"2457",
"childrens":[]},
{
"label":"长岛县",
"value":"2458",
"childrens":[]}]},

{
"label":"枣庄市",
"value":"298",
"childrens":[{
"label":"市中区",
"value":"2459",
"childrens":[]},
{
"label":"山亭区",
"value":"2460",
"childrens":[]},
{
"label":"峄城区",
"value":"2461",
"childrens":[]},
{
"label":"台儿庄区",
"value":"2462",
"childrens":[]},
{
"label":"薛城区",
"value":"2463",
"childrens":[]},
{
"label":"滕州市",
"value":"2464",
"childrens":[]}]},

{
"label":"淄博市",
"value":"299",
"childrens":[{
"label":"张店区",
"value":"2465",
"childrens":[]},
{
"label":"临淄区",
"value":"2466",
"childrens":[]},
{
"label":"淄川区",
"value":"2467",
"childrens":[]},
{
"label":"博山区",
"value":"2468",
"childrens":[]},
{
"label":"周村区",
"value":"2469",
"childrens":[]},
{
"label":"桓台县",
"value":"2470",
"childrens":[]},
{
"label":"高青县",
"value":"2471",
"childrens":[]},
{
"label":"沂源县",
"value":"2472",
"childrens":[]}]}]},


{
"label":"山西省",
"value":"23",
"childrens":[{
"label":"太原市",
"value":"300",
"childrens":[{
"label":"杏花岭区",
"value":"2473",
"childrens":[]},
{
"label":"小店区",
"value":"2474",
"childrens":[]},
{
"label":"迎泽区",
"value":"2475",
"childrens":[]},
{
"label":"尖草坪区",
"value":"2476",
"childrens":[]},
{
"label":"万柏林区",
"value":"2477",
"childrens":[]},
{
"label":"晋源区",
"value":"2478",
"childrens":[]},
{
"label":"高新开发区",
"value":"2479",
"childrens":[]},
{
"label":"民营经济开发区",
"value":"2480",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"2481",
"childrens":[]},
{
"label":"清徐县",
"value":"2482",
"childrens":[]},
{
"label":"阳曲县",
"value":"2483",
"childrens":[]},
{
"label":"娄烦县",
"value":"2484",
"childrens":[]},
{
"label":"古交市",
"value":"2485",
"childrens":[]}]},

{
"label":"长治市",
"value":"301",
"childrens":[{
"label":"城区",
"value":"2486",
"childrens":[]},
{
"label":"郊区",
"value":"2487",
"childrens":[]},
{
"label":"沁县",
"value":"2488",
"childrens":[]},
{
"label":"潞城市",
"value":"2489",
"childrens":[]},
{
"label":"长治县",
"value":"2490",
"childrens":[]},
{
"label":"襄垣县",
"value":"2491",
"childrens":[]},
{
"label":"屯留县",
"value":"2492",
"childrens":[]},
{
"label":"平顺县",
"value":"2493",
"childrens":[]},
{
"label":"黎城县",
"value":"2494",
"childrens":[]},
{
"label":"壶关县",
"value":"2495",
"childrens":[]},
{
"label":"长子县",
"value":"2496",
"childrens":[]},
{
"label":"武乡县",
"value":"2497",
"childrens":[]},
{
"label":"沁源县",
"value":"2498",
"childrens":[]}]},

{
"label":"大同市",
"value":"302",
"childrens":[{
"label":"城区",
"value":"2499",
"childrens":[]},
{
"label":"矿区",
"value":"2500",
"childrens":[]},
{
"label":"南郊区",
"value":"2501",
"childrens":[]},
{
"label":"新荣区",
"value":"2502",
"childrens":[]},
{
"label":"阳高县",
"value":"2503",
"childrens":[]},
{
"label":"天镇县",
"value":"2504",
"childrens":[]},
{
"label":"广灵县",
"value":"2505",
"childrens":[]},
{
"label":"灵丘县",
"value":"2506",
"childrens":[]},
{
"label":"浑源县",
"value":"2507",
"childrens":[]},
{
"label":"左云县",
"value":"2508",
"childrens":[]},
{
"label":"大同县",
"value":"2509",
"childrens":[]}]},

{
"label":"晋城市",
"value":"303",
"childrens":[{
"label":"城区",
"value":"2510",
"childrens":[]},
{
"label":"高平市",
"value":"2511",
"childrens":[]},
{
"label":"沁水县",
"value":"2512",
"childrens":[]},
{
"label":"阳城县",
"value":"2513",
"childrens":[]},
{
"label":"陵川县",
"value":"2514",
"childrens":[]},
{
"label":"泽州县",
"value":"2515",
"childrens":[]}]},

{
"label":"晋中市",
"value":"304",
"childrens":[{
"label":"榆次区",
"value":"2516",
"childrens":[]},
{
"label":"介休市",
"value":"2517",
"childrens":[]},
{
"label":"榆社县",
"value":"2518",
"childrens":[]},
{
"label":"左权县",
"value":"2519",
"childrens":[]},
{
"label":"和顺县",
"value":"2520",
"childrens":[]},
{
"label":"昔阳县",
"value":"2521",
"childrens":[]},
{
"label":"寿阳县",
"value":"2522",
"childrens":[]},
{
"label":"太谷县",
"value":"2523",
"childrens":[]},
{
"label":"祁县",
"value":"2524",
"childrens":[]},
{
"label":"平遥县",
"value":"2525",
"childrens":[]},
{
"label":"灵石县",
"value":"2526",
"childrens":[]}]},

{
"label":"临汾市",
"value":"305",
"childrens":[{
"label":"尧都区",
"value":"2527",
"childrens":[]},
{
"label":"侯马市",
"value":"2528",
"childrens":[]},
{
"label":"霍州市",
"value":"2529",
"childrens":[]},
{
"label":"曲沃县",
"value":"2530",
"childrens":[]},
{
"label":"翼城县",
"value":"2531",
"childrens":[]},
{
"label":"襄汾县",
"value":"2532",
"childrens":[]},
{
"label":"洪洞县",
"value":"2533",
"childrens":[]},
{
"label":"吉县",
"value":"2534",
"childrens":[]},
{
"label":"安泽县",
"value":"2535",
"childrens":[]},
{
"label":"浮山县",
"value":"2536",
"childrens":[]},
{
"label":"古县",
"value":"2537",
"childrens":[]},
{
"label":"乡宁县",
"value":"2538",
"childrens":[]},
{
"label":"大宁县",
"value":"2539",
"childrens":[]},
{
"label":"隰县",
"value":"2540",
"childrens":[]},
{
"label":"永和县",
"value":"2541",
"childrens":[]},
{
"label":"蒲县",
"value":"2542",
"childrens":[]},
{
"label":"汾西县",
"value":"2543",
"childrens":[]}]},

{
"label":"吕梁市",
"value":"306",
"childrens":[{
"label":"离石市",
"value":"2544",
"childrens":[]},
{
"label":"离石区",
"value":"2545",
"childrens":[]},
{
"label":"孝义市",
"value":"2546",
"childrens":[]},
{
"label":"汾阳市",
"value":"2547",
"childrens":[]},
{
"label":"文水县",
"value":"2548",
"childrens":[]},
{
"label":"交城县",
"value":"2549",
"childrens":[]},
{
"label":"兴县",
"value":"2550",
"childrens":[]},
{
"label":"临县",
"value":"2551",
"childrens":[]},
{
"label":"柳林县",
"value":"2552",
"childrens":[]},
{
"label":"石楼县",
"value":"2553",
"childrens":[]},
{
"label":"岚县",
"value":"2554",
"childrens":[]},
{
"label":"方山县",
"value":"2555",
"childrens":[]},
{
"label":"中阳县",
"value":"2556",
"childrens":[]},
{
"label":"交口县",
"value":"2557",
"childrens":[]}]},

{
"label":"朔州市",
"value":"307",
"childrens":[{
"label":"朔城区",
"value":"2558",
"childrens":[]},
{
"label":"平鲁区",
"value":"2559",
"childrens":[]},
{
"label":"山阴县",
"value":"2560",
"childrens":[]},
{
"label":"应县",
"value":"2561",
"childrens":[]},
{
"label":"右玉县",
"value":"2562",
"childrens":[]},
{
"label":"怀仁县",
"value":"2563",
"childrens":[]}]},

{
"label":"忻州市",
"value":"308",
"childrens":[{
"label":"忻府区",
"value":"2564",
"childrens":[]},
{
"label":"原平市",
"value":"2565",
"childrens":[]},
{
"label":"定襄县",
"value":"2566",
"childrens":[]},
{
"label":"五台县",
"value":"2567",
"childrens":[]},
{
"label":"代县",
"value":"2568",
"childrens":[]},
{
"label":"繁峙县",
"value":"2569",
"childrens":[]},
{
"label":"宁武县",
"value":"2570",
"childrens":[]},
{
"label":"静乐县",
"value":"2571",
"childrens":[]},
{
"label":"神池县",
"value":"2572",
"childrens":[]},
{
"label":"五寨县",
"value":"2573",
"childrens":[]},
{
"label":"岢岚县",
"value":"2574",
"childrens":[]},
{
"label":"河曲县",
"value":"2575",
"childrens":[]},
{
"label":"保德县",
"value":"2576",
"childrens":[]},
{
"label":"偏关县",
"value":"2577",
"childrens":[]}]},

{
"label":"阳泉市",
"value":"309",
"childrens":[{
"label":"城区",
"value":"2578",
"childrens":[]},
{
"label":"矿区",
"value":"2579",
"childrens":[]},
{
"label":"郊区",
"value":"2580",
"childrens":[]},
{
"label":"平定县",
"value":"2581",
"childrens":[]},
{
"label":"盂县",
"value":"2582",
"childrens":[]}]},

{
"label":"运城市",
"value":"310",
"childrens":[{
"label":"盐湖区",
"value":"2583",
"childrens":[]},
{
"label":"永济市",
"value":"2584",
"childrens":[]},
{
"label":"河津市",
"value":"2585",
"childrens":[]},
{
"label":"临猗县",
"value":"2586",
"childrens":[]},
{
"label":"万荣县",
"value":"2587",
"childrens":[]},
{
"label":"闻喜县",
"value":"2588",
"childrens":[]},
{
"label":"稷山县",
"value":"2589",
"childrens":[]},
{
"label":"新绛县",
"value":"2590",
"childrens":[]},
{
"label":"绛县",
"value":"2591",
"childrens":[]},
{
"label":"垣曲县",
"value":"2592",
"childrens":[]},
{
"label":"夏县",
"value":"2593",
"childrens":[]},
{
"label":"平陆县",
"value":"2594",
"childrens":[]},
{
"label":"芮城县",
"value":"2595",
"childrens":[]}]}]},


{
"label":"陕西省",
"value":"24",
"childrens":[{
"label":"西安市",
"value":"311",
"childrens":[{
"label":"莲湖区",
"value":"2596",
"childrens":[]},
{
"label":"新城区",
"value":"2597",
"childrens":[]},
{
"label":"碑林区",
"value":"2598",
"childrens":[]},
{
"label":"雁塔区",
"value":"2599",
"childrens":[]},
{
"label":"灞桥区",
"value":"2600",
"childrens":[]},
{
"label":"未央区",
"value":"2601",
"childrens":[]},
{
"label":"阎良区",
"value":"2602",
"childrens":[]},
{
"label":"临潼区",
"value":"2603",
"childrens":[]},
{
"label":"长安区",
"value":"2604",
"childrens":[]},
{
"label":"蓝田县",
"value":"2605",
"childrens":[]},
{
"label":"周至县",
"value":"2606",
"childrens":[]},
{
"label":"户县",
"value":"2607",
"childrens":[]},
{
"label":"高陵县",
"value":"2608",
"childrens":[]}]},

{
"label":"安康市",
"value":"312",
"childrens":[{
"label":"汉滨区",
"value":"2609",
"childrens":[]},
{
"label":"汉阴县",
"value":"2610",
"childrens":[]},
{
"label":"石泉县",
"value":"2611",
"childrens":[]},
{
"label":"宁陕县",
"value":"2612",
"childrens":[]},
{
"label":"紫阳县",
"value":"2613",
"childrens":[]},
{
"label":"岚皋县",
"value":"2614",
"childrens":[]},
{
"label":"平利县",
"value":"2615",
"childrens":[]},
{
"label":"镇坪县",
"value":"2616",
"childrens":[]},
{
"label":"旬阳县",
"value":"2617",
"childrens":[]},
{
"label":"白河县",
"value":"2618",
"childrens":[]}]},

{
"label":"宝鸡市",
"value":"313",
"childrens":[{
"label":"陈仓区",
"value":"2619",
"childrens":[]},
{
"label":"渭滨区",
"value":"2620",
"childrens":[]},
{
"label":"金台区",
"value":"2621",
"childrens":[]},
{
"label":"凤翔县",
"value":"2622",
"childrens":[]},
{
"label":"岐山县",
"value":"2623",
"childrens":[]},
{
"label":"扶风县",
"value":"2624",
"childrens":[]},
{
"label":"眉县",
"value":"2625",
"childrens":[]},
{
"label":"陇县",
"value":"2626",
"childrens":[]},
{
"label":"千阳县",
"value":"2627",
"childrens":[]},
{
"label":"麟游县",
"value":"2628",
"childrens":[]},
{
"label":"凤县",
"value":"2629",
"childrens":[]},
{
"label":"太白县",
"value":"2630",
"childrens":[]}]},

{
"label":"汉中市",
"value":"314",
"childrens":[{
"label":"汉台区",
"value":"2631",
"childrens":[]},
{
"label":"南郑县",
"value":"2632",
"childrens":[]},
{
"label":"城固县",
"value":"2633",
"childrens":[]},
{
"label":"洋县",
"value":"2634",
"childrens":[]},
{
"label":"西乡县",
"value":"2635",
"childrens":[]},
{
"label":"勉县",
"value":"2636",
"childrens":[]},
{
"label":"宁强县",
"value":"2637",
"childrens":[]},
{
"label":"略阳县",
"value":"2638",
"childrens":[]},
{
"label":"镇巴县",
"value":"2639",
"childrens":[]},
{
"label":"留坝县",
"value":"2640",
"childrens":[]},
{
"label":"佛坪县",
"value":"2641",
"childrens":[]}]},

{
"label":"商洛市",
"value":"315",
"childrens":[{
"label":"商州区",
"value":"2642",
"childrens":[]},
{
"label":"洛南县",
"value":"2643",
"childrens":[]},
{
"label":"丹凤县",
"value":"2644",
"childrens":[]},
{
"label":"商南县",
"value":"2645",
"childrens":[]},
{
"label":"山阳县",
"value":"2646",
"childrens":[]},
{
"label":"镇安县",
"value":"2647",
"childrens":[]},
{
"label":"柞水县",
"value":"2648",
"childrens":[]}]},

{
"label":"铜川市",
"value":"316",
"childrens":[{
"label":"耀州区",
"value":"2649",
"childrens":[]},
{
"label":"王益区",
"value":"2650",
"childrens":[]},
{
"label":"印台区",
"value":"2651",
"childrens":[]},
{
"label":"宜君县",
"value":"2652",
"childrens":[]}]},

{
"label":"渭南市",
"value":"317",
"childrens":[{
"label":"临渭区",
"value":"2653",
"childrens":[]},
{
"label":"韩城市",
"value":"2654",
"childrens":[]},
{
"label":"华阴市",
"value":"2655",
"childrens":[]},
{
"label":"华县",
"value":"2656",
"childrens":[]},
{
"label":"潼关县",
"value":"2657",
"childrens":[]},
{
"label":"大荔县",
"value":"2658",
"childrens":[]},
{
"label":"合阳县",
"value":"2659",
"childrens":[]},
{
"label":"澄城县",
"value":"2660",
"childrens":[]},
{
"label":"蒲城县",
"value":"2661",
"childrens":[]},
{
"label":"白水县",
"value":"2662",
"childrens":[]},
{
"label":"富平县",
"value":"2663",
"childrens":[]}]},

{
"label":"咸阳市",
"value":"318",
"childrens":[{
"label":"秦都区",
"value":"2664",
"childrens":[]},
{
"label":"渭城区",
"value":"2665",
"childrens":[]},
{
"label":"杨陵区",
"value":"2666",
"childrens":[]},
{
"label":"兴平市",
"value":"2667",
"childrens":[]},
{
"label":"三原县",
"value":"2668",
"childrens":[]},
{
"label":"泾阳县",
"value":"2669",
"childrens":[]},
{
"label":"乾县",
"value":"2670",
"childrens":[]},
{
"label":"礼泉县",
"value":"2671",
"childrens":[]},
{
"label":"永寿县",
"value":"2672",
"childrens":[]},
{
"label":"彬县",
"value":"2673",
"childrens":[]},
{
"label":"长武县",
"value":"2674",
"childrens":[]},
{
"label":"旬邑县",
"value":"2675",
"childrens":[]},
{
"label":"淳化县",
"value":"2676",
"childrens":[]},
{
"label":"武功县",
"value":"2677",
"childrens":[]}]},

{
"label":"延安市",
"value":"319",
"childrens":[{
"label":"吴起县",
"value":"2678",
"childrens":[]},
{
"label":"宝塔区",
"value":"2679",
"childrens":[]},
{
"label":"延长县",
"value":"2680",
"childrens":[]},
{
"label":"延川县",
"value":"2681",
"childrens":[]},
{
"label":"子长县",
"value":"2682",
"childrens":[]},
{
"label":"安塞县",
"value":"2683",
"childrens":[]},
{
"label":"志丹县",
"value":"2684",
"childrens":[]},
{
"label":"甘泉县",
"value":"2685",
"childrens":[]},
{
"label":"富县",
"value":"2686",
"childrens":[]},
{
"label":"洛川县",
"value":"2687",
"childrens":[]},
{
"label":"宜川县",
"value":"2688",
"childrens":[]},
{
"label":"黄龙县",
"value":"2689",
"childrens":[]},
{
"label":"黄陵县",
"value":"2690",
"childrens":[]}]},

{
"label":"榆林市",
"value":"320",
"childrens":[{
"label":"榆阳区",
"value":"2691",
"childrens":[]},
{
"label":"神木县",
"value":"2692",
"childrens":[]},
{
"label":"府谷县",
"value":"2693",
"childrens":[]},
{
"label":"横山县",
"value":"2694",
"childrens":[]},
{
"label":"靖边县",
"value":"2695",
"childrens":[]},
{
"label":"定边县",
"value":"2696",
"childrens":[]},
{
"label":"绥德县",
"value":"2697",
"childrens":[]},
{
"label":"米脂县",
"value":"2698",
"childrens":[]},
{
"label":"佳县",
"value":"2699",
"childrens":[]},
{
"label":"吴堡县",
"value":"2700",
"childrens":[]},
{
"label":"清涧县",
"value":"2701",
"childrens":[]},
{
"label":"子洲县",
"value":"2702",
"childrens":[]}]}]},


{
"label":"上海",
"value":"25",
"childrens":[{
"label":"上海市",
"value":"321",
"childrens":[{
"label":"长宁区",
"value":"2703",
"childrens":[]},
{
"label":"闸北区",
"value":"2704",
"childrens":[]},
{
"label":"闵行区",
"value":"2705",
"childrens":[]},
{
"label":"徐汇区",
"value":"2706",
"childrens":[]},
{
"label":"浦东新区",
"value":"2707",
"childrens":[]},
{
"label":"杨浦区",
"value":"2708",
"childrens":[]},
{
"label":"普陀区",
"value":"2709",
"childrens":[]},
{
"label":"静安区",
"value":"2710",
"childrens":[]},
{
"label":"卢湾区",
"value":"2711",
"childrens":[]},
{
"label":"虹口区",
"value":"2712",
"childrens":[]},
{
"label":"黄浦区",
"value":"2713",
"childrens":[]},
{
"label":"南汇区",
"value":"2714",
"childrens":[]},
{
"label":"松江区",
"value":"2715",
"childrens":[]},
{
"label":"嘉定区",
"value":"2716",
"childrens":[]},
{
"label":"宝山区",
"value":"2717",
"childrens":[]},
{
"label":"青浦区",
"value":"2718",
"childrens":[]},
{
"label":"金山区",
"value":"2719",
"childrens":[]},
{
"label":"奉贤区",
"value":"2720",
"childrens":[]},
{
"label":"崇明县",
"value":"2721",
"childrens":[]}]}]},


{
"label":"四川省",
"value":"26",
"childrens":[{
"label":"成都市",
"value":"322",
"childrens":[{
"label":"青羊区",
"value":"2722",
"childrens":[]},
{
"label":"锦江区",
"value":"2723",
"childrens":[]},
{
"label":"金牛区",
"value":"2724",
"childrens":[]},
{
"label":"武侯区",
"value":"2725",
"childrens":[]},
{
"label":"成华区",
"value":"2726",
"childrens":[]},
{
"label":"龙泉驿区",
"value":"2727",
"childrens":[]},
{
"label":"青白江区",
"value":"2728",
"childrens":[]},
{
"label":"新都区",
"value":"2729",
"childrens":[]},
{
"label":"温江区",
"value":"2730",
"childrens":[]},
{
"label":"高新区",
"value":"2731",
"childrens":[]},
{
"label":"高新西区",
"value":"2732",
"childrens":[]},
{
"label":"都江堰市",
"value":"2733",
"childrens":[]},
{
"label":"彭州市",
"value":"2734",
"childrens":[]},
{
"label":"邛崃市",
"value":"2735",
"childrens":[]},
{
"label":"崇州市",
"value":"2736",
"childrens":[]},
{
"label":"金堂县",
"value":"2737",
"childrens":[]},
{
"label":"双流县",
"value":"2738",
"childrens":[]},
{
"label":"郫县",
"value":"2739",
"childrens":[]},
{
"label":"大邑县",
"value":"2740",
"childrens":[]},
{
"label":"蒲江县",
"value":"2741",
"childrens":[]},
{
"label":"新津县",
"value":"2742",
"childrens":[]},
{
"label":"都江堰市",
"value":"2743",
"childrens":[]},
{
"label":"彭州市",
"value":"2744",
"childrens":[]},
{
"label":"邛崃市",
"value":"2745",
"childrens":[]},
{
"label":"崇州市",
"value":"2746",
"childrens":[]},
{
"label":"金堂县",
"value":"2747",
"childrens":[]},
{
"label":"双流县",
"value":"2748",
"childrens":[]},
{
"label":"郫县",
"value":"2749",
"childrens":[]},
{
"label":"大邑县",
"value":"2750",
"childrens":[]},
{
"label":"蒲江县",
"value":"2751",
"childrens":[]},
{
"label":"新津县",
"value":"2752",
"childrens":[]}]},

{
"label":"绵阳市",
"value":"323",
"childrens":[{
"label":"涪城区",
"value":"2753",
"childrens":[]},
{
"label":"游仙区",
"value":"2754",
"childrens":[]},
{
"label":"江油市",
"value":"2755",
"childrens":[]},
{
"label":"盐亭县",
"value":"2756",
"childrens":[]},
{
"label":"三台县",
"value":"2757",
"childrens":[]},
{
"label":"平武县",
"value":"2758",
"childrens":[]},
{
"label":"安县",
"value":"2759",
"childrens":[]},
{
"label":"梓潼县",
"value":"2760",
"childrens":[]},
{
"label":"北川县",
"value":"2761",
"childrens":[]}]},

{
"label":"阿坝藏族羌族自治州",
"value":"324",
"childrens":[{
"label":"马尔康县",
"value":"2762",
"childrens":[]},
{
"label":"汶川县",
"value":"2763",
"childrens":[]},
{
"label":"理县",
"value":"2764",
"childrens":[]},
{
"label":"茂县",
"value":"2765",
"childrens":[]},
{
"label":"松潘县",
"value":"2766",
"childrens":[]},
{
"label":"九寨沟县",
"value":"2767",
"childrens":[]},
{
"label":"金川县",
"value":"2768",
"childrens":[]},
{
"label":"小金县",
"value":"2769",
"childrens":[]},
{
"label":"黑水县",
"value":"2770",
"childrens":[]},
{
"label":"壤塘县",
"value":"2771",
"childrens":[]},
{
"label":"阿坝县",
"value":"2772",
"childrens":[]},
{
"label":"若尔盖县",
"value":"2773",
"childrens":[]},
{
"label":"红原县",
"value":"2774",
"childrens":[]}]},

{
"label":"巴中市",
"value":"325",
"childrens":[{
"label":"巴州区",
"value":"2775",
"childrens":[]},
{
"label":"通江县",
"value":"2776",
"childrens":[]},
{
"label":"南江县",
"value":"2777",
"childrens":[]},
{
"label":"平昌县",
"value":"2778",
"childrens":[]}]},

{
"label":"达州市",
"value":"326",
"childrens":[{
"label":"通川区",
"value":"2779",
"childrens":[]},
{
"label":"万源市",
"value":"2780",
"childrens":[]},
{
"label":"达县",
"value":"2781",
"childrens":[]},
{
"label":"宣汉县",
"value":"2782",
"childrens":[]},
{
"label":"开江县",
"value":"2783",
"childrens":[]},
{
"label":"大竹县",
"value":"2784",
"childrens":[]},
{
"label":"渠县",
"value":"2785",
"childrens":[]}]},

{
"label":"德阳市",
"value":"327",
"childrens":[{
"label":"旌阳区",
"value":"2786",
"childrens":[]},
{
"label":"广汉市",
"value":"2787",
"childrens":[]},
{
"label":"什邡市",
"value":"2788",
"childrens":[]},
{
"label":"绵竹市",
"value":"2789",
"childrens":[]},
{
"label":"罗江县",
"value":"2790",
"childrens":[]},
{
"label":"中江县",
"value":"2791",
"childrens":[]}]},

{
"label":"甘孜藏族自治州",
"value":"328",
"childrens":[{
"label":"康定县",
"value":"2792",
"childrens":[]},
{
"label":"丹巴县",
"value":"2793",
"childrens":[]},
{
"label":"泸定县",
"value":"2794",
"childrens":[]},
{
"label":"炉霍县",
"value":"2795",
"childrens":[]},
{
"label":"九龙县",
"value":"2796",
"childrens":[]},
{
"label":"甘孜县",
"value":"2797",
"childrens":[]},
{
"label":"雅江县",
"value":"2798",
"childrens":[]},
{
"label":"新龙县",
"value":"2799",
"childrens":[]},
{
"label":"道孚县",
"value":"2800",
"childrens":[]},
{
"label":"白玉县",
"value":"2801",
"childrens":[]},
{
"label":"理塘县",
"value":"2802",
"childrens":[]},
{
"label":"德格县",
"value":"2803",
"childrens":[]},
{
"label":"乡城县",
"value":"2804",
"childrens":[]},
{
"label":"石渠县",
"value":"2805",
"childrens":[]},
{
"label":"稻城县",
"value":"2806",
"childrens":[]},
{
"label":"色达县",
"value":"2807",
"childrens":[]},
{
"label":"巴塘县",
"value":"2808",
"childrens":[]},
{
"label":"得荣县",
"value":"2809",
"childrens":[]}]},

{
"label":"广安市",
"value":"329",
"childrens":[{
"label":"广安区",
"value":"2810",
"childrens":[]},
{
"label":"华蓥市",
"value":"2811",
"childrens":[]},
{
"label":"岳池县",
"value":"2812",
"childrens":[]},
{
"label":"武胜县",
"value":"2813",
"childrens":[]},
{
"label":"邻水县",
"value":"2814",
"childrens":[]}]},

{
"label":"广元市",
"value":"330",
"childrens":[{
"label":"利州区",
"value":"2815",
"childrens":[]},
{
"label":"元坝区",
"value":"2816",
"childrens":[]},
{
"label":"朝天区",
"value":"2817",
"childrens":[]},
{
"label":"旺苍县",
"value":"2818",
"childrens":[]},
{
"label":"青川县",
"value":"2819",
"childrens":[]},
{
"label":"剑阁县",
"value":"2820",
"childrens":[]},
{
"label":"苍溪县",
"value":"2821",
"childrens":[]}]},

{
"label":"乐山市",
"value":"331",
"childrens":[{
"label":"峨眉山市",
"value":"2822",
"childrens":[]},
{
"label":"乐山市",
"value":"2823",
"childrens":[]},
{
"label":"犍为县",
"value":"2824",
"childrens":[]},
{
"label":"井研县",
"value":"2825",
"childrens":[]},
{
"label":"夹江县",
"value":"2826",
"childrens":[]},
{
"label":"沐川县",
"value":"2827",
"childrens":[]},
{
"label":"峨边",
"value":"2828",
"childrens":[]},
{
"label":"马边",
"value":"2829",
"childrens":[]}]},

{
"label":"凉山市",
"value":"332",
"childrens":[{
"label":"西昌市",
"value":"2830",
"childrens":[]},
{
"label":"盐源县",
"value":"2831",
"childrens":[]},
{
"label":"德昌县",
"value":"2832",
"childrens":[]},
{
"label":"会理县",
"value":"2833",
"childrens":[]},
{
"label":"会东县",
"value":"2834",
"childrens":[]},
{
"label":"宁南县",
"value":"2835",
"childrens":[]},
{
"label":"普格县",
"value":"2836",
"childrens":[]},
{
"label":"布拖县",
"value":"2837",
"childrens":[]},
{
"label":"金阳县",
"value":"2838",
"childrens":[]},
{
"label":"昭觉县",
"value":"2839",
"childrens":[]},
{
"label":"喜德县",
"value":"2840",
"childrens":[]},
{
"label":"冕宁县",
"value":"2841",
"childrens":[]},
{
"label":"越西县",
"value":"2842",
"childrens":[]},
{
"label":"甘洛县",
"value":"2843",
"childrens":[]},
{
"label":"美姑县",
"value":"2844",
"childrens":[]},
{
"label":"雷波县",
"value":"2845",
"childrens":[]},
{
"label":"木里",
"value":"2846",
"childrens":[]}]},

{
"label":"眉山市",
"value":"333",
"childrens":[{
"label":"东坡区",
"value":"2847",
"childrens":[]},
{
"label":"仁寿县",
"value":"2848",
"childrens":[]},
{
"label":"彭山县",
"value":"2849",
"childrens":[]},
{
"label":"洪雅县",
"value":"2850",
"childrens":[]},
{
"label":"丹棱县",
"value":"2851",
"childrens":[]},
{
"label":"青神县",
"value":"2852",
"childrens":[]}]},

{
"label":"南充市",
"value":"334",
"childrens":[{
"label":"阆中市",
"value":"2853",
"childrens":[]},
{
"label":"南部县",
"value":"2854",
"childrens":[]},
{
"label":"营山县",
"value":"2855",
"childrens":[]},
{
"label":"蓬安县",
"value":"2856",
"childrens":[]},
{
"label":"仪陇县",
"value":"2857",
"childrens":[]},
{
"label":"顺庆区",
"value":"2858",
"childrens":[]},
{
"label":"高坪区",
"value":"2859",
"childrens":[]},
{
"label":"嘉陵区",
"value":"2860",
"childrens":[]},
{
"label":"西充县",
"value":"2861",
"childrens":[]}]},

{
"label":"内江市",
"value":"335",
"childrens":[{
"label":"市中区",
"value":"2862",
"childrens":[]},
{
"label":"东兴区",
"value":"2863",
"childrens":[]},
{
"label":"威远县",
"value":"2864",
"childrens":[]},
{
"label":"资中县",
"value":"2865",
"childrens":[]},
{
"label":"隆昌县",
"value":"2866",
"childrens":[]}]},

{
"label":"攀枝花市",
"value":"336",
"childrens":[{
"label":"东  区",
"value":"2867",
"childrens":[]},
{
"label":"西  区",
"value":"2868",
"childrens":[]},
{
"label":"仁和区",
"value":"2869",
"childrens":[]},
{
"label":"米易县",
"value":"2870",
"childrens":[]},
{
"label":"盐边县",
"value":"2871",
"childrens":[]}]},

{
"label":"遂宁市",
"value":"337",
"childrens":[{
"label":"船山区",
"value":"2872",
"childrens":[]},
{
"label":"安居区",
"value":"2873",
"childrens":[]},
{
"label":"蓬溪县",
"value":"2874",
"childrens":[]},
{
"label":"射洪县",
"value":"2875",
"childrens":[]},
{
"label":"大英县",
"value":"2876",
"childrens":[]}]},

{
"label":"雅安市",
"value":"338",
"childrens":[{
"label":"雨城区",
"value":"2877",
"childrens":[]},
{
"label":"名山县",
"value":"2878",
"childrens":[]},
{
"label":"荥经县",
"value":"2879",
"childrens":[]},
{
"label":"汉源县",
"value":"2880",
"childrens":[]},
{
"label":"石棉县",
"value":"2881",
"childrens":[]},
{
"label":"天全县",
"value":"2882",
"childrens":[]},
{
"label":"芦山县",
"value":"2883",
"childrens":[]},
{
"label":"宝兴县",
"value":"2884",
"childrens":[]}]},

{
"label":"宜宾市",
"value":"339",
"childrens":[{
"label":"翠屏区",
"value":"2885",
"childrens":[]},
{
"label":"宜宾县",
"value":"2886",
"childrens":[]},
{
"label":"南溪县",
"value":"2887",
"childrens":[]},
{
"label":"江安县",
"value":"2888",
"childrens":[]},
{
"label":"长宁县",
"value":"2889",
"childrens":[]},
{
"label":"高县",
"value":"2890",
"childrens":[]},
{
"label":"珙县",
"value":"2891",
"childrens":[]},
{
"label":"筠连县",
"value":"2892",
"childrens":[]},
{
"label":"兴文县",
"value":"2893",
"childrens":[]},
{
"label":"屏山县",
"value":"2894",
"childrens":[]}]},

{
"label":"资阳市",
"value":"340",
"childrens":[{
"label":"雁江区",
"value":"2895",
"childrens":[]},
{
"label":"简阳市",
"value":"2896",
"childrens":[]},
{
"label":"安岳县",
"value":"2897",
"childrens":[]},
{
"label":"乐至县",
"value":"2898",
"childrens":[]}]},

{
"label":"自贡市",
"value":"341",
"childrens":[{
"label":"大安区",
"value":"2899",
"childrens":[]},
{
"label":"自流井区",
"value":"2900",
"childrens":[]},
{
"label":"贡井区",
"value":"2901",
"childrens":[]},
{
"label":"沿滩区",
"value":"2902",
"childrens":[]},
{
"label":"荣县",
"value":"2903",
"childrens":[]},
{
"label":"富顺县",
"value":"2904",
"childrens":[]}]},

{
"label":"泸州市",
"value":"342",
"childrens":[{
"label":"江阳区",
"value":"2905",
"childrens":[]},
{
"label":"纳溪区",
"value":"2906",
"childrens":[]},
{
"label":"龙马潭区",
"value":"2907",
"childrens":[]},
{
"label":"泸县",
"value":"2908",
"childrens":[]},
{
"label":"合江县",
"value":"2909",
"childrens":[]},
{
"label":"叙永县",
"value":"2910",
"childrens":[]},
{
"label":"古蔺县",
"value":"2911",
"childrens":[]}]}]},


{
"label":"天津",
"value":"27",
"childrens":[{
"label":"天津市",
"value":"343",
"childrens":[{
"label":"和平区",
"value":"2912",
"childrens":[]},
{
"label":"河西区",
"value":"2913",
"childrens":[]},
{
"label":"南开区",
"value":"2914",
"childrens":[]},
{
"label":"河北区",
"value":"2915",
"childrens":[]},
{
"label":"河东区",
"value":"2916",
"childrens":[]},
{
"label":"红桥区",
"value":"2917",
"childrens":[]},
{
"label":"东丽区",
"value":"2918",
"childrens":[]},
{
"label":"津南区",
"value":"2919",
"childrens":[]},
{
"label":"西青区",
"value":"2920",
"childrens":[]},
{
"label":"北辰区",
"value":"2921",
"childrens":[]},
{
"label":"塘沽区",
"value":"2922",
"childrens":[]},
{
"label":"汉沽区",
"value":"2923",
"childrens":[]},
{
"label":"大港区",
"value":"2924",
"childrens":[]},
{
"label":"武清区",
"value":"2925",
"childrens":[]},
{
"label":"宝坻区",
"value":"2926",
"childrens":[]},
{
"label":"经济开发区",
"value":"2927",
"childrens":[]},
{
"label":"宁河县",
"value":"2928",
"childrens":[]},
{
"label":"静海县",
"value":"2929",
"childrens":[]},
{
"label":"蓟县",
"value":"2930",
"childrens":[]}]}]},


{
"label":"西藏自治区",
"value":"28",
"childrens":[{
"label":"拉萨市",
"value":"344",
"childrens":[{
"label":"城关区",
"value":"2931",
"childrens":[]},
{
"label":"林周县",
"value":"2932",
"childrens":[]},
{
"label":"当雄县",
"value":"2933",
"childrens":[]},
{
"label":"尼木县",
"value":"2934",
"childrens":[]},
{
"label":"曲水县",
"value":"2935",
"childrens":[]},
{
"label":"堆龙德庆县",
"value":"2936",
"childrens":[]},
{
"label":"达孜县",
"value":"2937",
"childrens":[]},
{
"label":"墨竹工卡县",
"value":"2938",
"childrens":[]}]},

{
"label":"阿里市",
"value":"345",
"childrens":[{
"label":"噶尔县",
"value":"2939",
"childrens":[]},
{
"label":"普兰县",
"value":"2940",
"childrens":[]},
{
"label":"札达县",
"value":"2941",
"childrens":[]},
{
"label":"日土县",
"value":"2942",
"childrens":[]},
{
"label":"革吉县",
"value":"2943",
"childrens":[]},
{
"label":"改则县",
"value":"2944",
"childrens":[]},
{
"label":"措勤县",
"value":"2945",
"childrens":[]}]},

{
"label":"昌都市",
"value":"346",
"childrens":[{
"label":"昌都县",
"value":"2946",
"childrens":[]},
{
"label":"江达县",
"value":"2947",
"childrens":[]},
{
"label":"贡觉县",
"value":"2948",
"childrens":[]},
{
"label":"类乌齐县",
"value":"2949",
"childrens":[]},
{
"label":"丁青县",
"value":"2950",
"childrens":[]},
{
"label":"察雅县",
"value":"2951",
"childrens":[]},
{
"label":"八宿县",
"value":"2952",
"childrens":[]},
{
"label":"左贡县",
"value":"2953",
"childrens":[]},
{
"label":"芒康县",
"value":"2954",
"childrens":[]},
{
"label":"洛隆县",
"value":"2955",
"childrens":[]},
{
"label":"边坝县",
"value":"2956",
"childrens":[]}]},

{
"label":"林芝市",
"value":"347",
"childrens":[{
"label":"林芝县",
"value":"2957",
"childrens":[]},
{
"label":"工布江达县",
"value":"2958",
"childrens":[]},
{
"label":"米林县",
"value":"2959",
"childrens":[]},
{
"label":"墨脱县",
"value":"2960",
"childrens":[]},
{
"label":"波密县",
"value":"2961",
"childrens":[]},
{
"label":"察隅县",
"value":"2962",
"childrens":[]},
{
"label":"朗县",
"value":"2963",
"childrens":[]}]},

{
"label":"那曲市",
"value":"348",
"childrens":[{
"label":"那曲县",
"value":"2964",
"childrens":[]},
{
"label":"嘉黎县",
"value":"2965",
"childrens":[]},
{
"label":"比如县",
"value":"2966",
"childrens":[]},
{
"label":"聂荣县",
"value":"2967",
"childrens":[]},
{
"label":"安多县",
"value":"2968",
"childrens":[]},
{
"label":"申扎县",
"value":"2969",
"childrens":[]},
{
"label":"索县",
"value":"2970",
"childrens":[]},
{
"label":"班戈县",
"value":"2971",
"childrens":[]},
{
"label":"巴青县",
"value":"2972",
"childrens":[]},
{
"label":"尼玛县",
"value":"2973",
"childrens":[]}]},

{
"label":"日喀则市",
"value":"349",
"childrens":[{
"label":"日喀则市",
"value":"2974",
"childrens":[]},
{
"label":"南木林县",
"value":"2975",
"childrens":[]},
{
"label":"江孜县",
"value":"2976",
"childrens":[]},
{
"label":"定日县",
"value":"2977",
"childrens":[]},
{
"label":"萨迦县",
"value":"2978",
"childrens":[]},
{
"label":"拉孜县",
"value":"2979",
"childrens":[]},
{
"label":"昂仁县",
"value":"2980",
"childrens":[]},
{
"label":"谢通门县",
"value":"2981",
"childrens":[]},
{
"label":"白朗县",
"value":"2982",
"childrens":[]},
{
"label":"仁布县",
"value":"2983",
"childrens":[]},
{
"label":"康马县",
"value":"2984",
"childrens":[]},
{
"label":"定结县",
"value":"2985",
"childrens":[]},
{
"label":"仲巴县",
"value":"2986",
"childrens":[]},
{
"label":"亚东县",
"value":"2987",
"childrens":[]},
{
"label":"吉隆县",
"value":"2988",
"childrens":[]},
{
"label":"聂拉木县",
"value":"2989",
"childrens":[]},
{
"label":"萨嘎县",
"value":"2990",
"childrens":[]},
{
"label":"岗巴县",
"value":"2991",
"childrens":[]}]},

{
"label":"山南市",
"value":"350",
"childrens":[{
"label":"乃东县",
"value":"2992",
"childrens":[]},
{
"label":"扎囊县",
"value":"2993",
"childrens":[]},
{
"label":"贡嘎县",
"value":"2994",
"childrens":[]},
{
"label":"桑日县",
"value":"2995",
"childrens":[]},
{
"label":"琼结县",
"value":"2996",
"childrens":[]},
{
"label":"曲松县",
"value":"2997",
"childrens":[]},
{
"label":"措美县",
"value":"2998",
"childrens":[]},
{
"label":"洛扎县",
"value":"2999",
"childrens":[]},
{
"label":"加查县",
"value":"3000",
"childrens":[]},
{
"label":"隆子县",
"value":"3001",
"childrens":[]},
{
"label":"错那县",
"value":"3002",
"childrens":[]},
{
"label":"浪卡子县",
"value":"3003",
"childrens":[]}]}]},


{
"label":"新疆维吾尔自治区",
"value":"29",
"childrens":[{
"label":"乌鲁木齐市",
"value":"351",
"childrens":[{
"label":"天山区",
"value":"3004",
"childrens":[]},
{
"label":"沙依巴克区",
"value":"3005",
"childrens":[]},
{
"label":"新市区",
"value":"3006",
"childrens":[]},
{
"label":"水磨沟区",
"value":"3007",
"childrens":[]},
{
"label":"头屯河区",
"value":"3008",
"childrens":[]},
{
"label":"达坂城区",
"value":"3009",
"childrens":[]},
{
"label":"米东区",
"value":"3010",
"childrens":[]},
{
"label":"乌鲁木齐县",
"value":"3011",
"childrens":[]}]},

{
"label":"阿克苏地区",
"value":"352",
"childrens":[{
"label":"阿克苏市",
"value":"3012",
"childrens":[]},
{
"label":"温宿县",
"value":"3013",
"childrens":[]},
{
"label":"库车县",
"value":"3014",
"childrens":[]},
{
"label":"沙雅县",
"value":"3015",
"childrens":[]},
{
"label":"新和县",
"value":"3016",
"childrens":[]},
{
"label":"拜城县",
"value":"3017",
"childrens":[]},
{
"label":"乌什县",
"value":"3018",
"childrens":[]},
{
"label":"阿瓦提县",
"value":"3019",
"childrens":[]},
{
"label":"柯坪县",
"value":"3020",
"childrens":[]}]},

{
"label":"阿拉尔市",
"value":"353",
"childrens":[{
"label":"阿拉尔市",
"value":"3021",
"childrens":[]}]},

{
"label":"巴音郭楞蒙古自治州",
"value":"354",
"childrens":[{
"label":"库尔勒市",
"value":"3022",
"childrens":[]},
{
"label":"轮台县",
"value":"3023",
"childrens":[]},
{
"label":"尉犁县",
"value":"3024",
"childrens":[]},
{
"label":"若羌县",
"value":"3025",
"childrens":[]},
{
"label":"且末县",
"value":"3026",
"childrens":[]},
{
"label":"焉耆",
"value":"3027",
"childrens":[]},
{
"label":"和静县",
"value":"3028",
"childrens":[]},
{
"label":"和硕县",
"value":"3029",
"childrens":[]},
{
"label":"博湖县",
"value":"3030",
"childrens":[]}]},

{
"label":"博尔塔拉蒙古自治州",
"value":"355",
"childrens":[{
"label":"博乐市",
"value":"3031",
"childrens":[]},
{
"label":"精河县",
"value":"3032",
"childrens":[]},
{
"label":"温泉县",
"value":"3033",
"childrens":[]}]},

{
"label":"昌吉回族自治州",
"value":"356",
"childrens":[{
"label":"呼图壁县",
"value":"3034",
"childrens":[]},
{
"label":"米泉市",
"value":"3035",
"childrens":[]},
{
"label":"昌吉市",
"value":"3036",
"childrens":[]},
{
"label":"阜康市",
"value":"3037",
"childrens":[]},
{
"label":"玛纳斯县",
"value":"3038",
"childrens":[]},
{
"label":"奇台县",
"value":"3039",
"childrens":[]},
{
"label":"吉木萨尔县",
"value":"3040",
"childrens":[]},
{
"label":"木垒",
"value":"3041",
"childrens":[]}]},

{
"label":"哈密市",
"value":"357",
"childrens":[{
"label":"哈密市",
"value":"3042",
"childrens":[]},
{
"label":"伊吾县",
"value":"3043",
"childrens":[]},
{
"label":"巴里坤",
"value":"3044",
"childrens":[]}]},

{
"label":"和田地区",
"value":"358",
"childrens":[{
"label":"和田市",
"value":"3045",
"childrens":[]},
{
"label":"和田县",
"value":"3046",
"childrens":[]},
{
"label":"墨玉县",
"value":"3047",
"childrens":[]},
{
"label":"皮山县",
"value":"3048",
"childrens":[]},
{
"label":"洛浦县",
"value":"3049",
"childrens":[]},
{
"label":"策勒县",
"value":"3050",
"childrens":[]},
{
"label":"于田县",
"value":"3051",
"childrens":[]},
{
"label":"民丰县",
"value":"3052",
"childrens":[]}]},

{
"label":"喀什地区",
"value":"359",
"childrens":[{
"label":"喀什市",
"value":"3053",
"childrens":[]},
{
"label":"疏附县",
"value":"3054",
"childrens":[]},
{
"label":"疏勒县",
"value":"3055",
"childrens":[]},
{
"label":"英吉沙县",
"value":"3056",
"childrens":[]},
{
"label":"泽普县",
"value":"3057",
"childrens":[]},
{
"label":"莎车县",
"value":"3058",
"childrens":[]},
{
"label":"叶城县",
"value":"3059",
"childrens":[]},
{
"label":"麦盖提县",
"value":"3060",
"childrens":[]},
{
"label":"岳普湖县",
"value":"3061",
"childrens":[]},
{
"label":"伽师县",
"value":"3062",
"childrens":[]},
{
"label":"巴楚县",
"value":"3063",
"childrens":[]},
{
"label":"塔什库尔干",
"value":"3064",
"childrens":[]}]},

{
"label":"克拉玛依市",
"value":"360",
"childrens":[{
"label":"克拉玛依市",
"value":"3065",
"childrens":[]}]},

{
"label":"克孜勒苏柯尔克孜自治州",
"value":"361",
"childrens":[{
"label":"阿图什市",
"value":"3066",
"childrens":[]},
{
"label":"阿克陶县",
"value":"3067",
"childrens":[]},
{
"label":"阿合奇县",
"value":"3068",
"childrens":[]},
{
"label":"乌恰县",
"value":"3069",
"childrens":[]}]},

{
"label":"石河子市",
"value":"362",
"childrens":[{
"label":"石河子市",
"value":"3070",
"childrens":[]}]},

{
"label":"图木舒克市",
"value":"363",
"childrens":[{
"label":"图木舒克市",
"value":"3071",
"childrens":[]}]},

{
"label":"吐鲁番市",
"value":"364",
"childrens":[{
"label":"吐鲁番市",
"value":"3072",
"childrens":[]},
{
"label":"鄯善县",
"value":"3073",
"childrens":[]},
{
"label":"托克逊县",
"value":"3074",
"childrens":[]}]},

{
"label":"五家渠市",
"value":"365",
"childrens":[{
"label":"五家渠市",
"value":"3075",
"childrens":[]}]},

{
"label":"伊犁哈萨克自治州",
"value":"366",
"childrens":[{
"label":"阿勒泰市",
"value":"3076",
"childrens":[]},
{
"label":"布克赛尔",
"value":"3077",
"childrens":[]},
{
"label":"伊宁市",
"value":"3078",
"childrens":[]},
{
"label":"布尔津县",
"value":"3079",
"childrens":[]},
{
"label":"奎屯市",
"value":"3080",
"childrens":[]},
{
"label":"乌苏市",
"value":"3081",
"childrens":[]},
{
"label":"额敏县",
"value":"3082",
"childrens":[]},
{
"label":"富蕴县",
"value":"3083",
"childrens":[]},
{
"label":"伊宁县",
"value":"3084",
"childrens":[]},
{
"label":"福海县",
"value":"3085",
"childrens":[]},
{
"label":"霍城县",
"value":"3086",
"childrens":[]},
{
"label":"沙湾县",
"value":"3087",
"childrens":[]},
{
"label":"巩留县",
"value":"3088",
"childrens":[]},
{
"label":"哈巴河县",
"value":"3089",
"childrens":[]},
{
"label":"托里县",
"value":"3090",
"childrens":[]},
{
"label":"青河县",
"value":"3091",
"childrens":[]},
{
"label":"新源县",
"value":"3092",
"childrens":[]},
{
"label":"裕民县",
"value":"3093",
"childrens":[]},
{
"label":"和布克赛尔",
"value":"3094",
"childrens":[]},
{
"label":"吉木乃县",
"value":"3095",
"childrens":[]},
{
"label":"昭苏县",
"value":"3096",
"childrens":[]},
{
"label":"特克斯县",
"value":"3097",
"childrens":[]},
{
"label":"尼勒克县",
"value":"3098",
"childrens":[]},
{
"label":"察布查尔",
"value":"3099",
"childrens":[]}]}]},


{
"label":"云南省",
"value":"30",
"childrens":[{
"label":"昆明市",
"value":"367",
"childrens":[{
"label":"盘龙区",
"value":"3100",
"childrens":[]},
{
"label":"五华区",
"value":"3101",
"childrens":[]},
{
"label":"官渡区",
"value":"3102",
"childrens":[]},
{
"label":"西山区",
"value":"3103",
"childrens":[]},
{
"label":"东川区",
"value":"3104",
"childrens":[]},
{
"label":"安宁市",
"value":"3105",
"childrens":[]},
{
"label":"呈贡县",
"value":"3106",
"childrens":[]},
{
"label":"晋宁县",
"value":"3107",
"childrens":[]},
{
"label":"富民县",
"value":"3108",
"childrens":[]},
{
"label":"宜良县",
"value":"3109",
"childrens":[]},
{
"label":"嵩明县",
"value":"3110",
"childrens":[]},
{
"label":"石林县",
"value":"3111",
"childrens":[]},
{
"label":"禄劝",
"value":"3112",
"childrens":[]},
{
"label":"寻甸",
"value":"3113",
"childrens":[]}]},

{
"label":"怒江傈傈族自治州",
"value":"368",
"childrens":[{
"label":"兰坪",
"value":"3114",
"childrens":[]},
{
"label":"泸水县",
"value":"3115",
"childrens":[]},
{
"label":"福贡县",
"value":"3116",
"childrens":[]},
{
"label":"贡山",
"value":"3117",
"childrens":[]}]},

{
"label":"普洱市",
"value":"369",
"childrens":[{
"label":"宁洱",
"value":"3118",
"childrens":[]},
{
"label":"思茅区",
"value":"3119",
"childrens":[]},
{
"label":"墨江",
"value":"3120",
"childrens":[]},
{
"label":"景东",
"value":"3121",
"childrens":[]},
{
"label":"景谷",
"value":"3122",
"childrens":[]},
{
"label":"镇沅",
"value":"3123",
"childrens":[]},
{
"label":"江城",
"value":"3124",
"childrens":[]},
{
"label":"孟连",
"value":"3125",
"childrens":[]},
{
"label":"澜沧",
"value":"3126",
"childrens":[]},
{
"label":"西盟",
"value":"3127",
"childrens":[]}]},

{
"label":"丽江市",
"value":"370",
"childrens":[{
"label":"古城区",
"value":"3128",
"childrens":[]},
{
"label":"宁蒗",
"value":"3129",
"childrens":[]},
{
"label":"玉龙",
"value":"3130",
"childrens":[]},
{
"label":"永胜县",
"value":"3131",
"childrens":[]},
{
"label":"华坪县",
"value":"3132",
"childrens":[]}]},

{
"label":"保山市",
"value":"371",
"childrens":[{
"label":"隆阳区",
"value":"3133",
"childrens":[]},
{
"label":"施甸县",
"value":"3134",
"childrens":[]},
{
"label":"腾冲县",
"value":"3135",
"childrens":[]},
{
"label":"龙陵县",
"value":"3136",
"childrens":[]},
{
"label":"昌宁县",
"value":"3137",
"childrens":[]}]},

{
"label":"楚雄彝族自治州",
"value":"372",
"childrens":[{
"label":"楚雄市",
"value":"3138",
"childrens":[]},
{
"label":"双柏县",
"value":"3139",
"childrens":[]},
{
"label":"牟定县",
"value":"3140",
"childrens":[]},
{
"label":"南华县",
"value":"3141",
"childrens":[]},
{
"label":"姚安县",
"value":"3142",
"childrens":[]},
{
"label":"大姚县",
"value":"3143",
"childrens":[]},
{
"label":"永仁县",
"value":"3144",
"childrens":[]},
{
"label":"元谋县",
"value":"3145",
"childrens":[]},
{
"label":"武定县",
"value":"3146",
"childrens":[]},
{
"label":"禄丰县",
"value":"3147",
"childrens":[]}]},

{
"label":"大理白簇自治州",
"value":"373",
"childrens":[{
"label":"大理市",
"value":"3148",
"childrens":[]},
{
"label":"祥云县",
"value":"3149",
"childrens":[]},
{
"label":"宾川县",
"value":"3150",
"childrens":[]},
{
"label":"弥渡县",
"value":"3151",
"childrens":[]},
{
"label":"永平县",
"value":"3152",
"childrens":[]},
{
"label":"云龙县",
"value":"3153",
"childrens":[]},
{
"label":"洱源县",
"value":"3154",
"childrens":[]},
{
"label":"剑川县",
"value":"3155",
"childrens":[]},
{
"label":"鹤庆县",
"value":"3156",
"childrens":[]},
{
"label":"漾濞",
"value":"3157",
"childrens":[]},
{
"label":"南涧",
"value":"3158",
"childrens":[]},
{
"label":"巍山",
"value":"3159",
"childrens":[]}]},

{
"label":"德宏傣族景颇族自治州",
"value":"374",
"childrens":[{
"label":"潞西市",
"value":"3160",
"childrens":[]},
{
"label":"瑞丽市",
"value":"3161",
"childrens":[]},
{
"label":"梁河县",
"value":"3162",
"childrens":[]},
{
"label":"盈江县",
"value":"3163",
"childrens":[]},
{
"label":"陇川县",
"value":"3164",
"childrens":[]}]},

{
"label":"迪庆藏族自治州",
"value":"375",
"childrens":[{
"label":"香格里拉县",
"value":"3165",
"childrens":[]},
{
"label":"德钦县",
"value":"3166",
"childrens":[]},
{
"label":"维西",
"value":"3167",
"childrens":[]}]},

{
"label":"红河哈尼族彝族自治州",
"value":"376",
"childrens":[{
"label":"泸西县",
"value":"3168",
"childrens":[]},
{
"label":"蒙自县",
"value":"3169",
"childrens":[]},
{
"label":"个旧市",
"value":"3170",
"childrens":[]},
{
"label":"开远市",
"value":"3171",
"childrens":[]},
{
"label":"绿春县",
"value":"3172",
"childrens":[]},
{
"label":"建水县",
"value":"3173",
"childrens":[]},
{
"label":"石屏县",
"value":"3174",
"childrens":[]},
{
"label":"弥勒县",
"value":"3175",
"childrens":[]},
{
"label":"元阳县",
"value":"3176",
"childrens":[]},
{
"label":"红河县",
"value":"3177",
"childrens":[]},
{
"label":"金平",
"value":"3178",
"childrens":[]},
{
"label":"河口",
"value":"3179",
"childrens":[]},
{
"label":"屏边",
"value":"3180",
"childrens":[]}]},

{
"label":"临沧市",
"value":"377",
"childrens":[{
"label":"临翔区",
"value":"3181",
"childrens":[]},
{
"label":"凤庆县",
"value":"3182",
"childrens":[]},
{
"label":"云县",
"value":"3183",
"childrens":[]},
{
"label":"永德县",
"value":"3184",
"childrens":[]},
{
"label":"镇康县",
"value":"3185",
"childrens":[]},
{
"label":"双江",
"value":"3186",
"childrens":[]},
{
"label":"耿马",
"value":"3187",
"childrens":[]},
{
"label":"沧源",
"value":"3188",
"childrens":[]}]},

{
"label":"曲靖市",
"value":"378",
"childrens":[{
"label":"麒麟区",
"value":"3189",
"childrens":[]},
{
"label":"宣威市",
"value":"3190",
"childrens":[]},
{
"label":"马龙县",
"value":"3191",
"childrens":[]},
{
"label":"陆良县",
"value":"3192",
"childrens":[]},
{
"label":"师宗县",
"value":"3193",
"childrens":[]},
{
"label":"罗平县",
"value":"3194",
"childrens":[]},
{
"label":"富源县",
"value":"3195",
"childrens":[]},
{
"label":"会泽县",
"value":"3196",
"childrens":[]},
{
"label":"沾益县",
"value":"3197",
"childrens":[]}]},

{
"label":"文山壮族苗族自治州",
"value":"379",
"childrens":[{
"label":"文山县",
"value":"3198",
"childrens":[]},
{
"label":"砚山县",
"value":"3199",
"childrens":[]},
{
"label":"西畴县",
"value":"3200",
"childrens":[]},
{
"label":"麻栗坡县",
"value":"3201",
"childrens":[]},
{
"label":"马关县",
"value":"3202",
"childrens":[]},
{
"label":"丘北县",
"value":"3203",
"childrens":[]},
{
"label":"广南县",
"value":"3204",
"childrens":[]},
{
"label":"富宁县",
"value":"3205",
"childrens":[]}]},

{
"label":"西双版纳傣族自治州",
"value":"380",
"childrens":[{
"label":"景洪市",
"value":"3206",
"childrens":[]},
{
"label":"勐海县",
"value":"3207",
"childrens":[]},
{
"label":"勐腊县",
"value":"3208",
"childrens":[]}]},

{
"label":"玉溪市",
"value":"381",
"childrens":[{
"label":"红塔区",
"value":"3209",
"childrens":[]},
{
"label":"江川县",
"value":"3210",
"childrens":[]},
{
"label":"澄江县",
"value":"3211",
"childrens":[]},
{
"label":"通海县",
"value":"3212",
"childrens":[]},
{
"label":"华宁县",
"value":"3213",
"childrens":[]},
{
"label":"易门县",
"value":"3214",
"childrens":[]},
{
"label":"峨山",
"value":"3215",
"childrens":[]},
{
"label":"新平",
"value":"3216",
"childrens":[]},
{
"label":"元江",
"value":"3217",
"childrens":[]}]},

{
"label":"昭通市",
"value":"382",
"childrens":[{
"label":"昭阳区",
"value":"3218",
"childrens":[]},
{
"label":"鲁甸县",
"value":"3219",
"childrens":[]},
{
"label":"巧家县",
"value":"3220",
"childrens":[]},
{
"label":"盐津县",
"value":"3221",
"childrens":[]},
{
"label":"大关县",
"value":"3222",
"childrens":[]},
{
"label":"永善县",
"value":"3223",
"childrens":[]},
{
"label":"绥江县",
"value":"3224",
"childrens":[]},
{
"label":"镇雄县",
"value":"3225",
"childrens":[]},
{
"label":"彝良县",
"value":"3226",
"childrens":[]},
{
"label":"威信县",
"value":"3227",
"childrens":[]},
{
"label":"水富县",
"value":"3228",
"childrens":[]}]}]},


{
"label":"浙江省",
"value":"31",
"childrens":[{
"label":"杭州市",
"value":"383",
"childrens":[{
"label":"西湖区",
"value":"3229",
"childrens":[]},
{
"label":"上城区",
"value":"3230",
"childrens":[]},
{
"label":"下城区",
"value":"3231",
"childrens":[]},
{
"label":"拱墅区",
"value":"3232",
"childrens":[]},
{
"label":"滨江区",
"value":"3233",
"childrens":[]},
{
"label":"江干区",
"value":"3234",
"childrens":[]},
{
"label":"萧山区",
"value":"3235",
"childrens":[]},
{
"label":"余杭区",
"value":"3236",
"childrens":[]},
{
"label":"市郊",
"value":"3237",
"childrens":[]},
{
"label":"建德市",
"value":"3238",
"childrens":[]},
{
"label":"富阳市",
"value":"3239",
"childrens":[]},
{
"label":"临安市",
"value":"3240",
"childrens":[]},
{
"label":"桐庐县",
"value":"3241",
"childrens":[]},
{
"label":"淳安县",
"value":"3242",
"childrens":[]}]},

{
"label":"湖州市",
"value":"384",
"childrens":[{
"label":"吴兴区",
"value":"3243",
"childrens":[]},
{
"label":"南浔区",
"value":"3244",
"childrens":[]},
{
"label":"德清县",
"value":"3245",
"childrens":[]},
{
"label":"长兴县",
"value":"3246",
"childrens":[]},
{
"label":"安吉县",
"value":"3247",
"childrens":[]}]},

{
"label":"嘉兴市",
"value":"385",
"childrens":[{
"label":"南湖区",
"value":"3248",
"childrens":[]},
{
"label":"秀洲区",
"value":"3249",
"childrens":[]},
{
"label":"海宁市",
"value":"3250",
"childrens":[]},
{
"label":"嘉善县",
"value":"3251",
"childrens":[]},
{
"label":"平湖市",
"value":"3252",
"childrens":[]},
{
"label":"桐乡市",
"value":"3253",
"childrens":[]},
{
"label":"海盐县",
"value":"3254",
"childrens":[]}]},

{
"label":"金华市",
"value":"386",
"childrens":[{
"label":"婺城区",
"value":"3255",
"childrens":[]},
{
"label":"金东区",
"value":"3256",
"childrens":[]},
{
"label":"兰溪市",
"value":"3257",
"childrens":[]},
{
"label":"市区",
"value":"3258",
"childrens":[]},
{
"label":"佛堂镇",
"value":"3259",
"childrens":[]},
{
"label":"上溪镇",
"value":"3260",
"childrens":[]},
{
"label":"义亭镇",
"value":"3261",
"childrens":[]},
{
"label":"大陈镇",
"value":"3262",
"childrens":[]},
{
"label":"苏溪镇",
"value":"3263",
"childrens":[]},
{
"label":"赤岸镇",
"value":"3264",
"childrens":[]},
{
"label":"东阳市",
"value":"3265",
"childrens":[]},
{
"label":"永康市",
"value":"3266",
"childrens":[]},
{
"label":"武义县",
"value":"3267",
"childrens":[]},
{
"label":"浦江县",
"value":"3268",
"childrens":[]},
{
"label":"磐安县",
"value":"3269",
"childrens":[]}]},

{
"label":"丽水市",
"value":"387",
"childrens":[{
"label":"莲都区",
"value":"3270",
"childrens":[]},
{
"label":"龙泉市",
"value":"3271",
"childrens":[]},
{
"label":"青田县",
"value":"3272",
"childrens":[]},
{
"label":"缙云县",
"value":"3273",
"childrens":[]},
{
"label":"遂昌县",
"value":"3274",
"childrens":[]},
{
"label":"松阳县",
"value":"3275",
"childrens":[]},
{
"label":"云和县",
"value":"3276",
"childrens":[]},
{
"label":"庆元县",
"value":"3277",
"childrens":[]},
{
"label":"景宁",
"value":"3278",
"childrens":[]}]},

{
"label":"宁波市",
"value":"388",
"childrens":[{
"label":"海曙区",
"value":"3279",
"childrens":[]},
{
"label":"江东区",
"value":"3280",
"childrens":[]},
{
"label":"江北区",
"value":"3281",
"childrens":[]},
{
"label":"镇海区",
"value":"3282",
"childrens":[]},
{
"label":"北仑区",
"value":"3283",
"childrens":[]},
{
"label":"鄞州区",
"value":"3284",
"childrens":[]},
{
"label":"余姚市",
"value":"3285",
"childrens":[]},
{
"label":"慈溪市",
"value":"3286",
"childrens":[]},
{
"label":"奉化市",
"value":"3287",
"childrens":[]},
{
"label":"象山县",
"value":"3288",
"childrens":[]},
{
"label":"宁海县",
"value":"3289",
"childrens":[]}]},

{
"label":"绍兴市",
"value":"389",
"childrens":[{
"label":"越城区",
"value":"3290",
"childrens":[]},
{
"label":"上虞市",
"value":"3291",
"childrens":[]},
{
"label":"嵊州市",
"value":"3292",
"childrens":[]},
{
"label":"绍兴县",
"value":"3293",
"childrens":[]},
{
"label":"新昌县",
"value":"3294",
"childrens":[]},
{
"label":"诸暨市",
"value":"3295",
"childrens":[]}]},

{
"label":"台州市",
"value":"390",
"childrens":[{
"label":"椒江区",
"value":"3296",
"childrens":[]},
{
"label":"黄岩区",
"value":"3297",
"childrens":[]},
{
"label":"路桥区",
"value":"3298",
"childrens":[]},
{
"label":"温岭市",
"value":"3299",
"childrens":[]},
{
"label":"临海市",
"value":"3300",
"childrens":[]},
{
"label":"玉环县",
"value":"3301",
"childrens":[]},
{
"label":"三门县",
"value":"3302",
"childrens":[]},
{
"label":"天台县",
"value":"3303",
"childrens":[]},
{
"label":"仙居县",
"value":"3304",
"childrens":[]}]},

{
"label":"温州市",
"value":"391",
"childrens":[{
"label":"鹿城区",
"value":"3305",
"childrens":[]},
{
"label":"龙湾区",
"value":"3306",
"childrens":[]},
{
"label":"瓯海区",
"value":"3307",
"childrens":[]},
{
"label":"瑞安市",
"value":"3308",
"childrens":[]},
{
"label":"乐清市",
"value":"3309",
"childrens":[]},
{
"label":"洞头县",
"value":"3310",
"childrens":[]},
{
"label":"永嘉县",
"value":"3311",
"childrens":[]},
{
"label":"平阳县",
"value":"3312",
"childrens":[]},
{
"label":"苍南县",
"value":"3313",
"childrens":[]},
{
"label":"文成县",
"value":"3314",
"childrens":[]},
{
"label":"泰顺县",
"value":"3315",
"childrens":[]}]},

{
"label":"舟山市",
"value":"392",
"childrens":[{
"label":"定海区",
"value":"3316",
"childrens":[]},
{
"label":"普陀区",
"value":"3317",
"childrens":[]},
{
"label":"岱山县",
"value":"3318",
"childrens":[]},
{
"label":"嵊泗县",
"value":"3319",
"childrens":[]}]},

{
"label":"衢州市",
"value":"393",
"childrens":[{
"label":"衢州市",
"value":"3320",
"childrens":[]},
{
"label":"江山市",
"value":"3321",
"childrens":[]},
{
"label":"常山县",
"value":"3322",
"childrens":[]},
{
"label":"开化县",
"value":"3323",
"childrens":[]},
{
"label":"龙游县",
"value":"3324",
"childrens":[]}]}]},


{
"label":"重庆",
"value":"32",
"childrens":[{
"label":"重庆市",
"value":"394",
"childrens":[{
"label":"合川区",
"value":"3325",
"childrens":[]},
{
"label":"江津区",
"value":"3326",
"childrens":[]},
{
"label":"南川区",
"value":"3327",
"childrens":[]},
{
"label":"永川区",
"value":"3328",
"childrens":[]},
{
"label":"南岸区",
"value":"3329",
"childrens":[]},
{
"label":"渝北区",
"value":"3330",
"childrens":[]},
{
"label":"万盛区",
"value":"3331",
"childrens":[]},
{
"label":"大渡口区",
"value":"3332",
"childrens":[]},
{
"label":"万州区",
"value":"3333",
"childrens":[]},
{
"label":"北碚区",
"value":"3334",
"childrens":[]},
{
"label":"沙坪坝区",
"value":"3335",
"childrens":[]},
{
"label":"巴南区",
"value":"3336",
"childrens":[]},
{
"label":"涪陵区",
"value":"3337",
"childrens":[]},
{
"label":"江北区",
"value":"3338",
"childrens":[]},
{
"label":"九龙坡区",
"value":"3339",
"childrens":[]},
{
"label":"渝中区",
"value":"3340",
"childrens":[]},
{
"label":"黔江开发区",
"value":"3341",
"childrens":[]},
{
"label":"长寿区",
"value":"3342",
"childrens":[]},
{
"label":"双桥区",
"value":"3343",
"childrens":[]},
{
"label":"綦江县",
"value":"3344",
"childrens":[]},
{
"label":"潼南县",
"value":"3345",
"childrens":[]},
{
"label":"铜梁县",
"value":"3346",
"childrens":[]},
{
"label":"大足县",
"value":"3347",
"childrens":[]},
{
"label":"荣昌县",
"value":"3348",
"childrens":[]},
{
"label":"璧山县",
"value":"3349",
"childrens":[]},
{
"label":"垫江县",
"value":"3350",
"childrens":[]},
{
"label":"武隆县",
"value":"3351",
"childrens":[]},
{
"label":"丰都县",
"value":"3352",
"childrens":[]},
{
"label":"城口县",
"value":"3353",
"childrens":[]},
{
"label":"梁平县",
"value":"3354",
"childrens":[]},
{
"label":"开县",
"value":"3355",
"childrens":[]},
{
"label":"巫溪县",
"value":"3356",
"childrens":[]},
{
"label":"巫山县",
"value":"3357",
"childrens":[]},
{
"label":"奉节县",
"value":"3358",
"childrens":[]},
{
"label":"云阳县",
"value":"3359",
"childrens":[]},
{
"label":"忠县",
"value":"3360",
"childrens":[]},
{
"label":"石柱",
"value":"3361",
"childrens":[]},
{
"label":"彭水",
"value":"3362",
"childrens":[]},
{
"label":"酉阳",
"value":"3363",
"childrens":[]},
{
"label":"秀山",
"value":"3364",
"childrens":[]}]}]},


{
"label":"香港",
"value":"33",
"childrens":[{
"label":"香港",
"value":"395",
"childrens":[{
"label":"沙田区",
"value":"3365",
"childrens":[]},
{
"label":"东区",
"value":"3366",
"childrens":[]},
{
"label":"观塘区",
"value":"3367",
"childrens":[]},
{
"label":"黄大仙区",
"value":"3368",
"childrens":[]},
{
"label":"九龙城区",
"value":"3369",
"childrens":[]},
{
"label":"屯门区",
"value":"3370",
"childrens":[]},
{
"label":"葵青区",
"value":"3371",
"childrens":[]},
{
"label":"元朗区",
"value":"3372",
"childrens":[]},
{
"label":"深水埗区",
"value":"3373",
"childrens":[]},
{
"label":"西贡区",
"value":"3374",
"childrens":[]},
{
"label":"大埔区",
"value":"3375",
"childrens":[]},
{
"label":"湾仔区",
"value":"3376",
"childrens":[]},
{
"label":"油尖旺区",
"value":"3377",
"childrens":[]},
{
"label":"北区",
"value":"3378",
"childrens":[]},
{
"label":"南区",
"value":"3379",
"childrens":[]},
{
"label":"荃湾区",
"value":"3380",
"childrens":[]},
{
"label":"中西区",
"value":"3381",
"childrens":[]},
{
"label":"离岛区",
"value":"3382",
"childrens":[]}]}]},


{
"label":"澳门",
"value":"34",
"childrens":[{
"label":"澳门",
"value":"396",
"childrens":[{
"label":"澳门",
"value":"3383",
"childrens":[]}]}]},


{
"label":"台湾",
"value":"35",
"childrens":[{
"label":"台湾",
"value":"397",
"childrens":[{
"label":"台北",
"value":"3384",
"childrens":[]},
{
"label":"高雄",
"value":"3385",
"childrens":[]},
{
"label":"基隆",
"value":"3386",
"childrens":[]},
{
"label":"台中",
"value":"3387",
"childrens":[]},
{
"label":"台南",
"value":"3388",
"childrens":[]},
{
"label":"新竹",
"value":"3389",
"childrens":[]},
{
"label":"嘉义",
"value":"3390",
"childrens":[]},
{
"label":"宜兰县",
"value":"3391",
"childrens":[]},
{
"label":"桃园县",
"value":"3392",
"childrens":[]},
{
"label":"苗栗县",
"value":"3393",
"childrens":[]},
{
"label":"彰化县",
"value":"3394",
"childrens":[]},
{
"label":"南投县",
"value":"3395",
"childrens":[]},
{
"label":"云林县",
"value":"3396",
"childrens":[]},
{
"label":"屏东县",
"value":"3397",
"childrens":[]},
{
"label":"台东县",
"value":"3398",
"childrens":[]},
{
"label":"花莲县",
"value":"3399",
"childrens":[]},
{
"label":"澎湖县",
"value":"3400",
"childrens":[]}]}]}];



var jd=[{
"label":"北京",
"value":"1",
"childrens":[{
"label":"朝阳区",
"value":"72",
"childrens":[{
"label":"三环以内",
"value":"2799",
"childrens":[]},
{
"label":"三环到四环之间",
"value":"2819",
"childrens":[]},
{
"label":"四环到五环之间",
"value":"2839",
"childrens":[]},
{
"label":"五环到六环之间",
"value":"2840",
"childrens":[]},
{
"label":"管庄",
"value":"4137",
"childrens":[]},
{
"label":"北苑",
"value":"4139",
"childrens":[]},
{
"label":"定福庄",
"value":"4211",
"childrens":[]}]},

{
"label":"海淀区",
"value":"2800",
"childrens":[{
"label":"三环以内",
"value":"2848",
"childrens":[]},
{
"label":"三环到四环之间",
"value":"2849",
"childrens":[]},
{
"label":"四环到五环之间",
"value":"2850",
"childrens":[]},
{
"label":"五环到六环之间",
"value":"2851",
"childrens":[]},
{
"label":"六环以外",
"value":"2852",
"childrens":[]},
{
"label":"西三旗",
"value":"4134",
"childrens":[]},
{
"label":"西二旗",
"value":"4209",
"childrens":[]}]},

{
"label":"西城区",
"value":"2801",
"childrens":[{
"label":"内环到二环里",
"value":"2827",
"childrens":[]},
{
"label":"二环到三环",
"value":"2853",
"childrens":[]}]},

{
"label":"东城区",
"value":"2802",
"childrens":[{
"label":"内环到三环里",
"value":"2821",
"childrens":[]}]},

{
"label":"崇文区",
"value":"2803",
"childrens":[{
"label":"一环到二环",
"value":"2829",
"childrens":[]},
{
"label":"二环到三环",
"value":"2842",
"childrens":[]}]},

{
"label":"宣武区",
"value":"2804",
"childrens":[{
"label":"内环到三环里",
"value":"2828",
"childrens":[]}]},

{
"label":"丰台区",
"value":"2805",
"childrens":[{
"label":"四环到五环之间",
"value":"2832",
"childrens":[]},
{
"label":"二环到三环",
"value":"2854",
"childrens":[]},
{
"label":"三环到四环之间",
"value":"2855",
"childrens":[]},
{
"label":"五环到六环之间",
"value":"10339",
"childrens":[]},
{
"label":"六环之外",
"value":"10340",
"childrens":[]}]},

{
"label":"石景山区",
"value":"2806",
"childrens":[{
"label":"四环到五环内",
"value":"2831",
"childrens":[]},
{
"label":"石景山城区",
"value":"4187",
"childrens":[]},
{
"label":"八大处科技园区",
"value":"4188",
"childrens":[]}]},

{
"label":"门头沟",
"value":"2807",
"childrens":[{
"label":"龙泉镇",
"value":"2843",
"childrens":[]},
{
"label":"城区",
"value":"6491",
"childrens":[]},
{
"label":"永定镇",
"value":"10341",
"childrens":[]},
{
"label":"大台镇",
"value":"10342",
"childrens":[]},
{
"label":"潭柘寺镇",
"value":"51528",
"childrens":[]},
{
"label":"王平镇",
"value":"51529",
"childrens":[]},
{
"label":"军庄镇",
"value":"51530",
"childrens":[]},
{
"label":"妙峰山镇",
"value":"51531",
"childrens":[]},
{
"label":"雁翅镇",
"value":"51532",
"childrens":[]},
{
"label":"斋堂镇",
"value":"51533",
"childrens":[]},
{
"label":"清水镇",
"value":"51534",
"childrens":[]}]},

{
"label":"房山区",
"value":"2808",
"childrens":[{
"label":"城区",
"value":"2844",
"childrens":[]},
{
"label":"大安山乡",
"value":"6492",
"childrens":[]},
{
"label":"大石窝镇",
"value":"51535",
"childrens":[]},
{
"label":"窦店镇",
"value":"51536",
"childrens":[]},
{
"label":"佛子庄乡",
"value":"51537",
"childrens":[]},
{
"label":"韩村河镇",
"value":"51538",
"childrens":[]},
{
"label":"河北镇",
"value":"51539",
"childrens":[]},
{
"label":"良乡镇",
"value":"51540",
"childrens":[]},
{
"label":"琉璃河镇",
"value":"51541",
"childrens":[]},
{
"label":"南窑乡",
"value":"51542",
"childrens":[]},
{
"label":"蒲洼乡",
"value":"51543",
"childrens":[]},
{
"label":"青龙湖镇",
"value":"51544",
"childrens":[]},
{
"label":"十渡镇",
"value":"51545",
"childrens":[]},
{
"label":"石楼镇",
"value":"51546",
"childrens":[]},
{
"label":"史家营乡",
"value":"51547",
"childrens":[]},
{
"label":"霞云岭乡",
"value":"51548",
"childrens":[]},
{
"label":"新镇",
"value":"51549",
"childrens":[]},
{
"label":"阎村镇",
"value":"51550",
"childrens":[]},
{
"label":"燕山地区",
"value":"51551",
"childrens":[]},
{
"label":"张坊镇",
"value":"51552",
"childrens":[]},
{
"label":"长沟镇",
"value":"51553",
"childrens":[]},
{
"label":"长阳镇",
"value":"51554",
"childrens":[]},
{
"label":"周口店镇",
"value":"51555",
"childrens":[]}]},

{
"label":"通州区",
"value":"2809",
"childrens":[{
"label":"六环内（马驹桥镇）",
"value":"51556",
"childrens":[]},
{
"label":"六环外（马驹桥镇）",
"value":"51557",
"childrens":[]},
{
"label":"永顺镇",
"value":"51558",
"childrens":[]},
{
"label":"梨园镇",
"value":"51559",
"childrens":[]},
{
"label":"宋庄镇",
"value":"51560",
"childrens":[]},
{
"label":"漷县镇",
"value":"51561",
"childrens":[]},
{
"label":"张家湾镇",
"value":"51562",
"childrens":[]},
{
"label":"西集镇",
"value":"51563",
"childrens":[]},
{
"label":"永乐店镇",
"value":"51564",
"childrens":[]},
{
"label":"潞城镇",
"value":"51565",
"childrens":[]},
{
"label":"台湖镇",
"value":"51566",
"childrens":[]},
{
"label":"于家务乡",
"value":"51567",
"childrens":[]},
{
"label":"中仓街道",
"value":"51568",
"childrens":[]},
{
"label":"新华街道",
"value":"51569",
"childrens":[]},
{
"label":"玉桥街道",
"value":"51570",
"childrens":[]},
{
"label":"北苑街道",
"value":"51571",
"childrens":[]},
{
"label":"次渠镇",
"value":"51572",
"childrens":[]}]},

{
"label":"大兴区",
"value":"2810",
"childrens":[{
"label":"四环至五环之间",
"value":"4194",
"childrens":[]},
{
"label":"六环以外",
"value":"4205",
"childrens":[]},
{
"label":"五环至六环之间",
"value":"6501",
"childrens":[]},
{
"label":"亦庄经济开发区",
"value":"51573",
"childrens":[]}]},

{
"label":"顺义区",
"value":"2812",
"childrens":[{
"label":"李桥镇",
"value":"51574",
"childrens":[]},
{
"label":"李遂镇",
"value":"51575",
"childrens":[]},
{
"label":"龙湾屯镇",
"value":"51576",
"childrens":[]},
{
"label":"马坡地镇",
"value":"51577",
"childrens":[]},
{
"label":"木林镇",
"value":"51578",
"childrens":[]},
{
"label":"南彩镇",
"value":"51579",
"childrens":[]},
{
"label":"南法信地区",
"value":"51580",
"childrens":[]},
{
"label":"牛栏山地区",
"value":"51581",
"childrens":[]},
{
"label":"仁和地区",
"value":"51582",
"childrens":[]},
{
"label":"胜利街道",
"value":"51583",
"childrens":[]},
{
"label":"石园街道",
"value":"51584",
"childrens":[]},
{
"label":"双丰街道",
"value":"51585",
"childrens":[]},
{
"label":"天竺地区",
"value":"51586",
"childrens":[]},
{
"label":"旺泉街道",
"value":"51587",
"childrens":[]},
{
"label":"杨镇地区",
"value":"51588",
"childrens":[]},
{
"label":"张镇",
"value":"51589",
"childrens":[]},
{
"label":"赵全营镇",
"value":"51590",
"childrens":[]}]},

{
"label":"怀柔区",
"value":"2814",
"childrens":[{
"label":"郊区",
"value":"2847",
"childrens":[]},
{
"label":"城区以内",
"value":"6115",
"childrens":[]}]},

{
"label":"密云区",
"value":"2816",
"childrens":[{
"label":"城区以外",
"value":"2862",
"childrens":[]},
{
"label":"城区",
"value":"6667",
"childrens":[]}]},

{
"label":"昌平区",
"value":"2901",
"childrens":[{
"label":"城区以外",
"value":"2906",
"childrens":[]},
{
"label":"六环以内",
"value":"4135",
"childrens":[]},
{
"label":"城区",
"value":"4136",
"childrens":[]}]},

{
"label":"平谷区",
"value":"2953",
"childrens":[{
"label":"城区以外",
"value":"2954",
"childrens":[]},
{
"label":"城区",
"value":"6666",
"childrens":[]}]},

{
"label":"延庆县",
"value":"3065",
"childrens":[{
"label":"延庆镇",
"value":"51591",
"childrens":[]},
{
"label":"城区",
"value":"51592",
"childrens":[]},
{
"label":"康庄镇",
"value":"51593",
"childrens":[]},
{
"label":"八达岭镇",
"value":"51594",
"childrens":[]},
{
"label":"永宁镇",
"value":"51595",
"childrens":[]},
{
"label":"旧县镇",
"value":"51596",
"childrens":[]},
{
"label":"张山营镇",
"value":"51597",
"childrens":[]},
{
"label":"四海镇",
"value":"51598",
"childrens":[]},
{
"label":"千家店镇",
"value":"51599",
"childrens":[]},
{
"label":"沈家营镇",
"value":"51600",
"childrens":[]},
{
"label":"大榆树镇",
"value":"51601",
"childrens":[]},
{
"label":"井庄镇",
"value":"51602",
"childrens":[]},
{
"label":"大庄科乡",
"value":"51603",
"childrens":[]},
{
"label":"刘斌堡乡",
"value":"51604",
"childrens":[]},
{
"label":"香营乡",
"value":"51605",
"childrens":[]},
{
"label":"珍珠泉乡",
"value":"51606",
"childrens":[]}]}]},


{
"label":"上海",
"value":"2",
"childrens":[{
"label":"黄浦区",
"value":"78",
"childrens":[{
"label":"城区",
"value":"79",
"childrens":[]}]},

{
"label":"徐汇区",
"value":"2813",
"childrens":[{
"label":"城区",
"value":"2863",
"childrens":[]}]},

{
"label":"长宁区",
"value":"2815",
"childrens":[{
"label":"城区",
"value":"2870",
"childrens":[]}]},

{
"label":"静安区",
"value":"2817",
"childrens":[{
"label":"城区",
"value":"2873",
"childrens":[]}]},

{
"label":"闸北区",
"value":"2820",
"childrens":[{
"label":"城区",
"value":"2879",
"childrens":[]}]},

{
"label":"虹口区",
"value":"2822",
"childrens":[{
"label":"城区",
"value":"2856",
"childrens":[]}]},

{
"label":"杨浦区",
"value":"2823",
"childrens":[{
"label":"城区",
"value":"2884",
"childrens":[]}]},

{
"label":"宝山区",
"value":"2824",
"childrens":[{
"label":"罗店镇",
"value":"2889",
"childrens":[]},
{
"label":"大场镇",
"value":"2890",
"childrens":[]},
{
"label":"杨行镇",
"value":"2891",
"childrens":[]},
{
"label":"月浦镇",
"value":"51607",
"childrens":[]},
{
"label":"罗泾镇",
"value":"51608",
"childrens":[]},
{
"label":"顾村镇",
"value":"51609",
"childrens":[]},
{
"label":"高境镇",
"value":"51610",
"childrens":[]},
{
"label":"庙行镇",
"value":"51611",
"childrens":[]},
{
"label":"淞南镇",
"value":"51612",
"childrens":[]},
{
"label":"宝山城市工业园区",
"value":"51613",
"childrens":[]},
{
"label":"城区",
"value":"51614",
"childrens":[]}]},

{
"label":"闵行区",
"value":"2825",
"childrens":[{
"label":"城区",
"value":"2892",
"childrens":[]},
{
"label":"莘庄镇",
"value":"51615",
"childrens":[]},
{
"label":"七宝镇",
"value":"51616",
"childrens":[]},
{
"label":"浦江镇",
"value":"51617",
"childrens":[]},
{
"label":"梅陇镇",
"value":"51618",
"childrens":[]},
{
"label":"虹桥镇",
"value":"51619",
"childrens":[]},
{
"label":"马桥镇",
"value":"51620",
"childrens":[]},
{
"label":"吴泾镇",
"value":"51621",
"childrens":[]},
{
"label":"华漕镇",
"value":"51622",
"childrens":[]},
{
"label":"颛桥镇",
"value":"51623",
"childrens":[]}]},

{
"label":"嘉定区",
"value":"2826",
"childrens":[{
"label":"城区",
"value":"2864",
"childrens":[]},
{
"label":"南翔镇",
"value":"51624",
"childrens":[]},
{
"label":"马陆镇",
"value":"51625",
"childrens":[]},
{
"label":"华亭镇",
"value":"51626",
"childrens":[]},
{
"label":"江桥镇",
"value":"51627",
"childrens":[]},
{
"label":"菊园新区",
"value":"51628",
"childrens":[]},
{
"label":"安亭镇",
"value":"51629",
"childrens":[]},
{
"label":"徐行镇",
"value":"51630",
"childrens":[]},
{
"label":"嘉定工业区",
"value":"51631",
"childrens":[]},
{
"label":"外冈镇",
"value":"51632",
"childrens":[]}]},

{
"label":"浦东新区",
"value":"2830",
"childrens":[{
"label":"城区",
"value":"2894",
"childrens":[]},
{
"label":"川沙新区",
"value":"2895",
"childrens":[]},
{
"label":"高桥镇",
"value":"2897",
"childrens":[]},
{
"label":"北蔡镇",
"value":"51633",
"childrens":[]},
{
"label":"合庆镇",
"value":"51634",
"childrens":[]},
{
"label":"唐镇",
"value":"51635",
"childrens":[]},
{
"label":"曹路镇",
"value":"51636",
"childrens":[]},
{
"label":"金桥镇",
"value":"51637",
"childrens":[]},
{
"label":"高行镇",
"value":"51638",
"childrens":[]},
{
"label":"高东镇",
"value":"51639",
"childrens":[]},
{
"label":"张江镇",
"value":"51640",
"childrens":[]},
{
"label":"三林镇",
"value":"51641",
"childrens":[]},
{
"label":"南汇新城镇",
"value":"51642",
"childrens":[]},
{
"label":"祝桥镇",
"value":"51643",
"childrens":[]},
{
"label":"新场镇",
"value":"51644",
"childrens":[]},
{
"label":"惠南镇",
"value":"51645",
"childrens":[]},
{
"label":"康桥镇",
"value":"51646",
"childrens":[]},
{
"label":"宣桥镇",
"value":"51647",
"childrens":[]},
{
"label":"书院镇",
"value":"51648",
"childrens":[]},
{
"label":"大团镇",
"value":"51649",
"childrens":[]},
{
"label":"周浦镇",
"value":"51650",
"childrens":[]},
{
"label":"芦潮港镇",
"value":"51651",
"childrens":[]},
{
"label":"泥城镇",
"value":"51652",
"childrens":[]},
{
"label":"航头镇",
"value":"51653",
"childrens":[]},
{
"label":"万祥镇",
"value":"51654",
"childrens":[]},
{
"label":"老港镇",
"value":"51655",
"childrens":[]}]},

{
"label":"青浦区",
"value":"2833",
"childrens":[{
"label":"城区",
"value":"2869",
"childrens":[]},
{
"label":"朱家角镇",
"value":"51657",
"childrens":[]},
{
"label":"赵巷镇",
"value":"51658",
"childrens":[]},
{
"label":"徐泾镇",
"value":"51659",
"childrens":[]},
{
"label":"华新镇",
"value":"51660",
"childrens":[]},
{
"label":"重固镇",
"value":"51661",
"childrens":[]},
{
"label":"白鹤镇",
"value":"51662",
"childrens":[]},
{
"label":"练塘镇",
"value":"51663",
"childrens":[]},
{
"label":"金泽镇",
"value":"51664",
"childrens":[]}]},

{
"label":"松江区",
"value":"2834",
"childrens":[{
"label":"城区",
"value":"2866",
"childrens":[]},
{
"label":"泗泾镇",
"value":"51665",
"childrens":[]},
{
"label":"佘山镇",
"value":"51666",
"childrens":[]},
{
"label":"车墩镇",
"value":"51667",
"childrens":[]},
{
"label":"新桥镇",
"value":"51668",
"childrens":[]},
{
"label":"洞泾镇",
"value":"51669",
"childrens":[]},
{
"label":"九亭镇",
"value":"51670",
"childrens":[]},
{
"label":"泖港镇",
"value":"51671",
"childrens":[]},
{
"label":"石湖荡镇",
"value":"51672",
"childrens":[]},
{
"label":"新浜镇",
"value":"51673",
"childrens":[]},
{
"label":"叶榭镇",
"value":"51674",
"childrens":[]},
{
"label":"小昆山镇",
"value":"51675",
"childrens":[]}]},

{
"label":"金山区",
"value":"2835",
"childrens":[{
"label":"城区",
"value":"2868",
"childrens":[]},
{
"label":"金山工业区",
"value":"51676",
"childrens":[]},
{
"label":"朱泾镇",
"value":"51677",
"childrens":[]},
{
"label":"枫泾镇",
"value":"51678",
"childrens":[]},
{
"label":"张堰镇",
"value":"51679",
"childrens":[]},
{
"label":"亭林镇",
"value":"51680",
"childrens":[]},
{
"label":"吕巷镇",
"value":"51681",
"childrens":[]},
{
"label":"廊下镇",
"value":"51682",
"childrens":[]},
{
"label":"金山卫镇",
"value":"51683",
"childrens":[]},
{
"label":"漕泾镇",
"value":"51684",
"childrens":[]},
{
"label":"山阳镇",
"value":"51685",
"childrens":[]}]},

{
"label":"南汇区",
"value":"2836",
"childrens":[{
"label":"祝桥镇",
"value":"2903",
"childrens":[]},
{
"label":"新场镇",
"value":"2904",
"childrens":[]},
{
"label":"惠南镇",
"value":"2935",
"childrens":[]},
{
"label":"康桥镇",
"value":"2937",
"childrens":[]},
{
"label":"宣桥镇",
"value":"2938",
"childrens":[]},
{
"label":"书院镇",
"value":"2939",
"childrens":[]},
{
"label":"大团镇",
"value":"2940",
"childrens":[]},
{
"label":"周浦镇",
"value":"2941",
"childrens":[]},
{
"label":"芦潮港镇",
"value":"2942",
"childrens":[]},
{
"label":"泥城镇",
"value":"2943",
"childrens":[]},
{
"label":"六灶镇",
"value":"2944",
"childrens":[]},
{
"label":"航头镇",
"value":"2945",
"childrens":[]},
{
"label":"万祥镇",
"value":"2946",
"childrens":[]},
{
"label":"老港镇",
"value":"2947",
"childrens":[]},
{
"label":"申港街道",
"value":"4159",
"childrens":[]},
{
"label":"临港新城",
"value":"4180",
"childrens":[]}]},

{
"label":"奉贤区",
"value":"2837",
"childrens":[{
"label":"南桥镇",
"value":"2888",
"childrens":[]},
{
"label":"奉城镇",
"value":"51686",
"childrens":[]},
{
"label":"四团镇",
"value":"51687",
"childrens":[]},
{
"label":"柘林镇",
"value":"51688",
"childrens":[]},
{
"label":"庄行镇",
"value":"51689",
"childrens":[]},
{
"label":"金汇镇",
"value":"51690",
"childrens":[]},
{
"label":"青村镇",
"value":"51691",
"childrens":[]},
{
"label":"海湾镇",
"value":"51692",
"childrens":[]}]},

{
"label":"普陀区",
"value":"2841",
"childrens":[{
"label":"城区",
"value":"2876",
"childrens":[]}]},

{
"label":"崇明县",
"value":"2919",
"childrens":[{
"label":"堡镇",
"value":"51693",
"childrens":[]},
{
"label":"庙镇",
"value":"51694",
"childrens":[]},
{
"label":"陈家镇",
"value":"51695",
"childrens":[]},
{
"label":"城桥镇",
"value":"51696",
"childrens":[]},
{
"label":"东平镇",
"value":"51697",
"childrens":[]},
{
"label":"港西镇",
"value":"51698",
"childrens":[]},
{
"label":"港沿镇",
"value":"51699",
"childrens":[]},
{
"label":"建设镇",
"value":"51700",
"childrens":[]},
{
"label":"绿华镇",
"value":"51701",
"childrens":[]},
{
"label":"三星镇",
"value":"51702",
"childrens":[]},
{
"label":"竖新镇",
"value":"51703",
"childrens":[]},
{
"label":"向化镇",
"value":"51704",
"childrens":[]},
{
"label":"新海镇",
"value":"51705",
"childrens":[]},
{
"label":"新河镇",
"value":"51706",
"childrens":[]},
{
"label":"中兴镇",
"value":"51707",
"childrens":[]},
{
"label":"长兴乡",
"value":"51708",
"childrens":[]},
{
"label":"横沙乡",
"value":"51709",
"childrens":[]},
{
"label":"新村乡",
"value":"51710",
"childrens":[]}]}]},


{
"label":"天津",
"value":"3",
"childrens":[{
"label":"东丽区",
"value":"51711",
"childrens":[{
"label":"全境",
"value":"51729",
"childrens":[]}]},

{
"label":"和平区",
"value":"51712",
"childrens":[{
"label":"全境",
"value":"51731",
"childrens":[]}]},

{
"label":"河北区",
"value":"51713",
"childrens":[{
"label":"全境",
"value":"51732",
"childrens":[]}]},

{
"label":"河东区",
"value":"51714",
"childrens":[{
"label":"全境",
"value":"51733",
"childrens":[]}]},

{
"label":"河西区",
"value":"51715",
"childrens":[{
"label":"全境",
"value":"51734",
"childrens":[]}]},

{
"label":"红桥区",
"value":"51716",
"childrens":[{
"label":"全境",
"value":"51735",
"childrens":[]}]},

{
"label":"蓟县",
"value":"51717",
"childrens":[{
"label":"全境",
"value":"51736",
"childrens":[]}]},

{
"label":"静海县",
"value":"51718",
"childrens":[{
"label":"全境",
"value":"51737",
"childrens":[]}]},

{
"label":"南开区",
"value":"51719",
"childrens":[{
"label":"全境",
"value":"51738",
"childrens":[]}]},

{
"label":"塘沽区",
"value":"51720",
"childrens":[{
"label":"全境",
"value":"51739",
"childrens":[]}]},

{
"label":"西青区",
"value":"51721",
"childrens":[{
"label":"全境",
"value":"51740",
"childrens":[]},
{
"label":"其他地区",
"value":"51741",
"childrens":[]},
{
"label":"杨柳青，中北，精武，大寺镇，环外海泰及外环内",
"value":"51742",
"childrens":[]}]},

{
"label":"武清区",
"value":"51722",
"childrens":[{
"label":"全境",
"value":"51743",
"childrens":[]}]},

{
"label":"津南区",
"value":"51723",
"childrens":[{
"label":"咸水沽镇，海河教育园，海河科技园",
"value":"51744",
"childrens":[]},
{
"label":"双港，辛庄",
"value":"51745",
"childrens":[]},
{
"label":"其他地区",
"value":"51746",
"childrens":[]}]},

{
"label":"汉沽区",
"value":"51724",
"childrens":[{
"label":"汉沽区街里，汉沽开发区",
"value":"51747",
"childrens":[]},
{
"label":"其他地区",
"value":"51748",
"childrens":[]}]},

{
"label":"大港区",
"value":"51725",
"childrens":[{
"label":"大港油田",
"value":"51749",
"childrens":[]},
{
"label":"主城区内",
"value":"51750",
"childrens":[]},
{
"label":"主城区外",
"value":"51751",
"childrens":[]}]},

{
"label":"北辰区",
"value":"51726",
"childrens":[{
"label":"外环内",
"value":"51752",
"childrens":[]},
{
"label":"外环外双街镇，河北工大新校，屈店工业园",
"value":"51753",
"childrens":[]},
{
"label":"外环外其他地区",
"value":"51754",
"childrens":[]}]},

{
"label":"宝坻区",
"value":"51727",
"childrens":[{
"label":"城关镇，马家店开发区，天宝工业园",
"value":"51755",
"childrens":[]},
{
"label":"其他地区",
"value":"51756",
"childrens":[]}]},

{
"label":"宁河县",
"value":"51728",
"childrens":[{
"label":"芦台镇，经济开发区，贸易开发区",
"value":"51757",
"childrens":[]},
{
"label":"其他地区",
"value":"51758",
"childrens":[]}]},

{
"label":"城区",
"value":"52047",
"childrens":[]},
{
"label":"长寿湖镇",
"value":"52048",
"childrens":[]},
{
"label":"领封镇",
"value":"52049",
"childrens":[]},
{
"label":"但渡镇",
"value":"52050",
"childrens":[]},
{
"label":"云集镇",
"value":"52051",
"childrens":[]},
{
"label":"双龙镇",
"value":"52052",
"childrens":[]},
{
"label":"龙河镇",
"value":"52053",
"childrens":[]},
{
"label":"石堰镇",
"value":"52054",
"childrens":[]},
{
"label":"云台镇",
"value":"52055",
"childrens":[]},
{
"label":"海棠镇",
"value":"52056",
"childrens":[]},
{
"label":"葛兰镇",
"value":"52057",
"childrens":[]},
{
"label":"新市镇",
"value":"52058",
"childrens":[]},
{
"label":"八颗镇",
"value":"52059",
"childrens":[]},
{
"label":"洪湖镇",
"value":"52060",
"childrens":[]},
{
"label":"万顺镇",
"value":"52061",
"childrens":[]}]},

{
"label":"重庆",
"value":"4",
"childrens":[{
"label":"万州区",
"value":"113",
"childrens":[{
"label":"城区",
"value":"9775",
"childrens":[]},
{
"label":"白土镇",
"value":"9786",
"childrens":[]},
{
"label":"白羊镇",
"value":"9787",
"childrens":[]},
{
"label":"大周镇",
"value":"9788",
"childrens":[]},
{
"label":"弹子镇",
"value":"9789",
"childrens":[]},
{
"label":"分水镇",
"value":"9790",
"childrens":[]},
{
"label":"甘宁镇",
"value":"9791",
"childrens":[]},
{
"label":"高峰镇",
"value":"9792",
"childrens":[]},
{
"label":"高梁镇",
"value":"9793",
"childrens":[]},
{
"label":"后山镇",
"value":"9794",
"childrens":[]},
{
"label":"李河镇",
"value":"9795",
"childrens":[]},
{
"label":"龙驹镇",
"value":"9796",
"childrens":[]},
{
"label":"龙沙镇",
"value":"9797",
"childrens":[]},
{
"label":"罗田镇",
"value":"9798",
"childrens":[]},
{
"label":"孙家镇",
"value":"9799",
"childrens":[]},
{
"label":"太安镇",
"value":"9800",
"childrens":[]},
{
"label":"太龙镇",
"value":"9801",
"childrens":[]},
{
"label":"天城镇",
"value":"9802",
"childrens":[]},
{
"label":"武陵镇",
"value":"9803",
"childrens":[]},
{
"label":"响水镇",
"value":"9804",
"childrens":[]},
{
"label":"小周镇",
"value":"9805",
"childrens":[]},
{
"label":"新田镇",
"value":"9806",
"childrens":[]},
{
"label":"新乡镇",
"value":"9807",
"childrens":[]},
{
"label":"熊家镇",
"value":"9808",
"childrens":[]},
{
"label":"余家镇",
"value":"9809",
"childrens":[]},
{
"label":"长岭镇",
"value":"9810",
"childrens":[]},
{
"label":"长坪镇",
"value":"9811",
"childrens":[]},
{
"label":"长滩镇",
"value":"9812",
"childrens":[]},
{
"label":"走马镇",
"value":"9813",
"childrens":[]},
{
"label":"瀼渡镇",
"value":"9814",
"childrens":[]},
{
"label":"茨竹乡",
"value":"9815",
"childrens":[]},
{
"label":"柱山乡",
"value":"9816",
"childrens":[]},
{
"label":"燕山乡",
"value":"9817",
"childrens":[]},
{
"label":"溪口乡",
"value":"9818",
"childrens":[]},
{
"label":"普子乡",
"value":"9819",
"childrens":[]},
{
"label":"地宝乡",
"value":"9820",
"childrens":[]},
{
"label":"铁峰乡",
"value":"9821",
"childrens":[]},
{
"label":"黄柏乡",
"value":"9822",
"childrens":[]},
{
"label":"九池乡",
"value":"9823",
"childrens":[]},
{
"label":"梨树乡",
"value":"9824",
"childrens":[]},
{
"label":"郭村乡",
"value":"9825",
"childrens":[]},
{
"label":"恒合乡",
"value":"9826",
"childrens":[]}]},

{
"label":"涪陵区",
"value":"114",
"childrens":[{
"label":"城区",
"value":"9893",
"childrens":[]},
{
"label":"李渡镇",
"value":"9898",
"childrens":[]},
{
"label":"白涛镇",
"value":"9899",
"childrens":[]},
{
"label":"百胜镇",
"value":"9900",
"childrens":[]},
{
"label":"堡子镇",
"value":"9901",
"childrens":[]},
{
"label":"焦石镇",
"value":"9902",
"childrens":[]},
{
"label":"蔺市镇",
"value":"9903",
"childrens":[]},
{
"label":"龙桥镇",
"value":"9904",
"childrens":[]},
{
"label":"龙潭镇",
"value":"9905",
"childrens":[]},
{
"label":"马武镇",
"value":"9906",
"childrens":[]},
{
"label":"南沱镇",
"value":"9907",
"childrens":[]},
{
"label":"青羊镇",
"value":"9908",
"childrens":[]},
{
"label":"清溪镇",
"value":"9909",
"childrens":[]},
{
"label":"石沱镇",
"value":"9910",
"childrens":[]},
{
"label":"新妙镇",
"value":"9911",
"childrens":[]},
{
"label":"义和镇",
"value":"9912",
"childrens":[]},
{
"label":"增福乡",
"value":"9913",
"childrens":[]},
{
"label":"珍溪镇",
"value":"9914",
"childrens":[]},
{
"label":"镇安镇",
"value":"9915",
"childrens":[]},
{
"label":"致韩镇",
"value":"9916",
"childrens":[]},
{
"label":"土地坡乡",
"value":"9917",
"childrens":[]},
{
"label":"武陵山乡",
"value":"9918",
"childrens":[]},
{
"label":"中峰乡",
"value":"9919",
"childrens":[]},
{
"label":"梓里乡",
"value":"9920",
"childrens":[]},
{
"label":"丛林乡",
"value":"9921",
"childrens":[]},
{
"label":"大木乡",
"value":"9922",
"childrens":[]},
{
"label":"惠民乡",
"value":"9923",
"childrens":[]},
{
"label":"酒店乡",
"value":"9924",
"childrens":[]},
{
"label":"聚宝乡",
"value":"9925",
"childrens":[]},
{
"label":"卷洞乡",
"value":"9926",
"childrens":[]},
{
"label":"两汇乡",
"value":"9927",
"childrens":[]},
{
"label":"罗云乡",
"value":"9928",
"childrens":[]},
{
"label":"明家乡",
"value":"9929",
"childrens":[]},
{
"label":"仁义乡",
"value":"9930",
"childrens":[]},
{
"label":"山窝乡",
"value":"9931",
"childrens":[]},
{
"label":"石和乡",
"value":"9932",
"childrens":[]},
{
"label":"石龙乡",
"value":"9933",
"childrens":[]},
{
"label":"太和乡",
"value":"9934",
"childrens":[]},
{
"label":"天台乡",
"value":"9935",
"childrens":[]},
{
"label":"同乐乡",
"value":"9936",
"childrens":[]},
{
"label":"新村乡",
"value":"9937",
"childrens":[]}]},

{
"label":"梁平区",
"value":"115",
"childrens":[{
"label":"梁山镇",
"value":"9938",
"childrens":[]},
{
"label":"柏家镇",
"value":"9939",
"childrens":[]},
{
"label":"碧山镇",
"value":"9940",
"childrens":[]},
{
"label":"大观镇",
"value":"9941",
"childrens":[]},
{
"label":"福禄镇",
"value":"9942",
"childrens":[]},
{
"label":"合兴镇",
"value":"9943",
"childrens":[]},
{
"label":"和林镇",
"value":"9944",
"childrens":[]},
{
"label":"虎城镇",
"value":"9945",
"childrens":[]},
{
"label":"回龙镇",
"value":"9946",
"childrens":[]},
{
"label":"金带镇",
"value":"9947",
"childrens":[]},
{
"label":"聚奎镇",
"value":"9948",
"childrens":[]},
{
"label":"礼让镇",
"value":"9949",
"childrens":[]},
{
"label":"龙门镇",
"value":"9950",
"childrens":[]},
{
"label":"明达镇",
"value":"9951",
"childrens":[]},
{
"label":"蟠龙镇",
"value":"9952",
"childrens":[]},
{
"label":"屏锦镇",
"value":"9953",
"childrens":[]},
{
"label":"仁贤镇",
"value":"9954",
"childrens":[]},
{
"label":"石安镇",
"value":"9955",
"childrens":[]},
{
"label":"文化镇",
"value":"9956",
"childrens":[]},
{
"label":"新盛镇",
"value":"9957",
"childrens":[]},
{
"label":"荫平镇",
"value":"9958",
"childrens":[]},
{
"label":"袁驿镇",
"value":"9959",
"childrens":[]},
{
"label":"云龙镇",
"value":"9960",
"childrens":[]},
{
"label":"竹山镇",
"value":"9961",
"childrens":[]},
{
"label":"安胜乡",
"value":"9962",
"childrens":[]},
{
"label":"铁门乡",
"value":"9963",
"childrens":[]},
{
"label":"紫照乡",
"value":"9964",
"childrens":[]},
{
"label":"曲水乡",
"value":"9965",
"childrens":[]},
{
"label":"龙胜乡",
"value":"9966",
"childrens":[]},
{
"label":"城北乡",
"value":"9967",
"childrens":[]},
{
"label":"城东乡",
"value":"9968",
"childrens":[]},
{
"label":"复平乡",
"value":"9969",
"childrens":[]},
{
"label":"县城内",
"value":"51759",
"childrens":[]}]},

{
"label":"南川区",
"value":"119",
"childrens":[{
"label":"城区",
"value":"9970",
"childrens":[]},
{
"label":"大观镇",
"value":"9974",
"childrens":[]},
{
"label":"大有镇",
"value":"9975",
"childrens":[]},
{
"label":"合溪镇",
"value":"9976",
"childrens":[]},
{
"label":"金山镇",
"value":"9977",
"childrens":[]},
{
"label":"鸣玉镇",
"value":"9978",
"childrens":[]},
{
"label":"南平镇",
"value":"9979",
"childrens":[]},
{
"label":"三泉镇",
"value":"9980",
"childrens":[]},
{
"label":"神童镇",
"value":"9981",
"childrens":[]},
{
"label":"石墙镇",
"value":"9982",
"childrens":[]},
{
"label":"水江镇",
"value":"9983",
"childrens":[]},
{
"label":"头渡镇",
"value":"9984",
"childrens":[]},
{
"label":"兴隆镇",
"value":"9985",
"childrens":[]},
{
"label":"冷水关乡",
"value":"9986",
"childrens":[]},
{
"label":"德隆乡",
"value":"9987",
"childrens":[]},
{
"label":"峰岩乡",
"value":"9988",
"childrens":[]},
{
"label":"福寿乡",
"value":"9989",
"childrens":[]},
{
"label":"古花乡",
"value":"9990",
"childrens":[]},
{
"label":"河图乡",
"value":"9991",
"childrens":[]},
{
"label":"民主乡",
"value":"9992",
"childrens":[]},
{
"label":"木凉乡",
"value":"9993",
"childrens":[]},
{
"label":"乾丰乡",
"value":"9994",
"childrens":[]},
{
"label":"庆元乡",
"value":"9995",
"childrens":[]},
{
"label":"石莲乡",
"value":"9996",
"childrens":[]},
{
"label":"石溪乡",
"value":"9997",
"childrens":[]},
{
"label":"铁村乡",
"value":"9998",
"childrens":[]},
{
"label":"土溪乡",
"value":"9999",
"childrens":[]},
{
"label":"鱼泉乡",
"value":"10000",
"childrens":[]},
{
"label":"中桥乡",
"value":"10001",
"childrens":[]},
{
"label":"太平场镇",
"value":"51760",
"childrens":[]}]},

{
"label":"潼南区",
"value":"123",
"childrens":[{
"label":"县城内",
"value":"9754",
"childrens":[]},
{
"label":"柏梓镇",
"value":"9756",
"childrens":[]},
{
"label":"宝龙镇",
"value":"9757",
"childrens":[]},
{
"label":"崇龛镇",
"value":"9758",
"childrens":[]},
{
"label":"古溪镇",
"value":"9759",
"childrens":[]},
{
"label":"龙形镇",
"value":"9760",
"childrens":[]},
{
"label":"米心镇",
"value":"9761",
"childrens":[]},
{
"label":"群力镇",
"value":"9762",
"childrens":[]},
{
"label":"上和镇",
"value":"9763",
"childrens":[]},
{
"label":"双江镇",
"value":"9764",
"childrens":[]},
{
"label":"太安镇",
"value":"9765",
"childrens":[]},
{
"label":"塘坝镇",
"value":"9766",
"childrens":[]},
{
"label":"卧佛镇",
"value":"9767",
"childrens":[]},
{
"label":"五桂镇",
"value":"9768",
"childrens":[]},
{
"label":"小渡镇",
"value":"9769",
"childrens":[]},
{
"label":"新胜镇",
"value":"9770",
"childrens":[]},
{
"label":"玉溪镇",
"value":"9771",
"childrens":[]},
{
"label":"别口乡",
"value":"9772",
"childrens":[]},
{
"label":"田家乡",
"value":"9773",
"childrens":[]},
{
"label":"寿桥乡",
"value":"9774",
"childrens":[]}]},

{
"label":"大足区",
"value":"126",
"childrens":[{
"label":"龙滩子区",
"value":"51761",
"childrens":[]},
{
"label":"龙水镇",
"value":"51762",
"childrens":[]},
{
"label":"智凤镇",
"value":"51763",
"childrens":[]},
{
"label":"宝顶镇",
"value":"51764",
"childrens":[]},
{
"label":"中敖镇",
"value":"51765",
"childrens":[]},
{
"label":"三驱镇",
"value":"51766",
"childrens":[]},
{
"label":"宝兴镇",
"value":"51767",
"childrens":[]},
{
"label":"玉龙镇",
"value":"51768",
"childrens":[]},
{
"label":"石马镇",
"value":"51769",
"childrens":[]},
{
"label":"拾万镇",
"value":"51770",
"childrens":[]},
{
"label":"回龙镇",
"value":"51771",
"childrens":[]},
{
"label":"金山镇",
"value":"51772",
"childrens":[]},
{
"label":"万古镇",
"value":"51773",
"childrens":[]},
{
"label":"国梁镇",
"value":"51774",
"childrens":[]},
{
"label":"雍溪镇",
"value":"51775",
"childrens":[]},
{
"label":"珠溪镇",
"value":"51776",
"childrens":[]},
{
"label":"龙石镇",
"value":"51777",
"childrens":[]},
{
"label":"邮亭镇",
"value":"51778",
"childrens":[]},
{
"label":"铁山镇",
"value":"51779",
"childrens":[]},
{
"label":"高升镇",
"value":"51780",
"childrens":[]},
{
"label":"季家镇",
"value":"51781",
"childrens":[]},
{
"label":"古龙镇",
"value":"51782",
"childrens":[]},
{
"label":"高坪镇",
"value":"51783",
"childrens":[]},
{
"label":"双路镇",
"value":"51784",
"childrens":[]},
{
"label":"通桥镇",
"value":"51785",
"childrens":[]},
{
"label":"城区",
"value":"51786",
"childrens":[]}]},

{
"label":"黔江区",
"value":"128",
"childrens":[{
"label":"城区",
"value":"10002",
"childrens":[]},
{
"label":"阿蓬江镇",
"value":"10007",
"childrens":[]},
{
"label":"小南海镇",
"value":"10008",
"childrens":[]},
{
"label":"鹅池镇",
"value":"10009",
"childrens":[]},
{
"label":"冯家镇",
"value":"10010",
"childrens":[]},
{
"label":"黑溪镇",
"value":"10011",
"childrens":[]},
{
"label":"黄溪镇",
"value":"10012",
"childrens":[]},
{
"label":"金溪镇",
"value":"10013",
"childrens":[]},
{
"label":"黎水镇",
"value":"10014",
"childrens":[]},
{
"label":"邻鄂镇",
"value":"10015",
"childrens":[]},
{
"label":"马喇镇",
"value":"10016",
"childrens":[]},
{
"label":"石会镇",
"value":"10017",
"childrens":[]},
{
"label":"石家镇",
"value":"10018",
"childrens":[]},
{
"label":"濯水镇",
"value":"10019",
"childrens":[]},
{
"label":"白石乡",
"value":"10020",
"childrens":[]},
{
"label":"白土乡",
"value":"10021",
"childrens":[]},
{
"label":"金洞乡",
"value":"10022",
"childrens":[]},
{
"label":"蓬东乡",
"value":"10023",
"childrens":[]},
{
"label":"沙坝乡",
"value":"10024",
"childrens":[]},
{
"label":"杉岭乡",
"value":"10025",
"childrens":[]},
{
"label":"水市乡",
"value":"10026",
"childrens":[]},
{
"label":"水田乡",
"value":"10027",
"childrens":[]},
{
"label":"太极乡",
"value":"10028",
"childrens":[]},
{
"label":"五里乡",
"value":"10029",
"childrens":[]},
{
"label":"新华乡",
"value":"10030",
"childrens":[]},
{
"label":"中塘乡",
"value":"10031",
"childrens":[]},
{
"label":"正阳镇",
"value":"51787",
"childrens":[]},
{
"label":"舟白镇",
"value":"51788",
"childrens":[]}]},

{
"label":"武隆区",
"value":"129",
"childrens":[{
"label":"仙女山镇",
"value":"10032",
"childrens":[]},
{
"label":"巷口镇",
"value":"10033",
"childrens":[]},
{
"label":"白马镇",
"value":"10034",
"childrens":[]},
{
"label":"火炉镇",
"value":"10035",
"childrens":[]},
{
"label":"江口镇",
"value":"10036",
"childrens":[]},
{
"label":"平桥镇",
"value":"10037",
"childrens":[]},
{
"label":"桐梓镇",
"value":"10038",
"childrens":[]},
{
"label":"土坎镇",
"value":"10039",
"childrens":[]},
{
"label":"鸭江镇",
"value":"10040",
"childrens":[]},
{
"label":"羊角镇",
"value":"10041",
"childrens":[]},
{
"label":"长坝镇",
"value":"10042",
"childrens":[]},
{
"label":"白云乡",
"value":"10043",
"childrens":[]},
{
"label":"沧沟乡",
"value":"10044",
"childrens":[]},
{
"label":"凤来乡",
"value":"10045",
"childrens":[]},
{
"label":"浩口乡",
"value":"10046",
"childrens":[]},
{
"label":"和顺乡",
"value":"10047",
"childrens":[]},
{
"label":"后坪乡",
"value":"10048",
"childrens":[]},
{
"label":"黄莺乡",
"value":"10049",
"childrens":[]},
{
"label":"接龙乡",
"value":"10050",
"childrens":[]},
{
"label":"庙垭乡",
"value":"10051",
"childrens":[]},
{
"label":"石桥乡",
"value":"10052",
"childrens":[]},
{
"label":"双河乡",
"value":"10053",
"childrens":[]},
{
"label":"铁矿乡",
"value":"10054",
"childrens":[]},
{
"label":"土地乡",
"value":"10055",
"childrens":[]},
{
"label":"文复乡",
"value":"10056",
"childrens":[]},
{
"label":"赵家乡",
"value":"10057",
"childrens":[]},
{
"label":"县城内",
"value":"51789",
"childrens":[]}]},

{
"label":"丰都县",
"value":"130",
"childrens":[{
"label":"县城内",
"value":"10058",
"childrens":[]},
{
"label":"南天湖镇",
"value":"10059",
"childrens":[]},
{
"label":"许明寺镇",
"value":"10060",
"childrens":[]},
{
"label":"包鸾镇",
"value":"10061",
"childrens":[]},
{
"label":"董家镇",
"value":"10062",
"childrens":[]},
{
"label":"高家镇",
"value":"10063",
"childrens":[]},
{
"label":"虎威镇",
"value":"10064",
"childrens":[]},
{
"label":"江池镇",
"value":"10065",
"childrens":[]},
{
"label":"龙河镇",
"value":"10066",
"childrens":[]},
{
"label":"名山镇",
"value":"10067",
"childrens":[]},
{
"label":"三元镇",
"value":"10068",
"childrens":[]},
{
"label":"社坛镇",
"value":"10069",
"childrens":[]},
{
"label":"十直镇",
"value":"10070",
"childrens":[]},
{
"label":"树人镇",
"value":"10071",
"childrens":[]},
{
"label":"双路镇",
"value":"10072",
"childrens":[]},
{
"label":"武平镇",
"value":"10073",
"childrens":[]},
{
"label":"兴义镇",
"value":"10074",
"childrens":[]},
{
"label":"湛普镇",
"value":"10075",
"childrens":[]},
{
"label":"镇江镇",
"value":"10076",
"childrens":[]},
{
"label":"太平坝乡",
"value":"10077",
"childrens":[]},
{
"label":"双龙场乡",
"value":"10078",
"childrens":[]},
{
"label":"保合乡",
"value":"10079",
"childrens":[]},
{
"label":"崇兴乡",
"value":"10080",
"childrens":[]},
{
"label":"都督乡",
"value":"10081",
"childrens":[]},
{
"label":"暨龙乡",
"value":"10082",
"childrens":[]},
{
"label":"栗子乡",
"value":"10083",
"childrens":[]},
{
"label":"龙孔乡",
"value":"10084",
"childrens":[]},
{
"label":"青龙乡",
"value":"10085",
"childrens":[]},
{
"label":"仁沙乡",
"value":"10086",
"childrens":[]},
{
"label":"三坝乡",
"value":"10087",
"childrens":[]},
{
"label":"三建乡",
"value":"10088",
"childrens":[]}]},

{
"label":"奉节县",
"value":"131",
"childrens":[{
"label":"县城内",
"value":"51790",
"childrens":[]},
{
"label":"永安镇",
"value":"51791",
"childrens":[]},
{
"label":"白帝镇",
"value":"51792",
"childrens":[]},
{
"label":"草堂镇",
"value":"51793",
"childrens":[]},
{
"label":"大树镇",
"value":"51794",
"childrens":[]},
{
"label":"汾河镇",
"value":"51795",
"childrens":[]},
{
"label":"公平镇",
"value":"51796",
"childrens":[]},
{
"label":"甲高镇",
"value":"51797",
"childrens":[]},
{
"label":"康乐镇",
"value":"51798",
"childrens":[]},
{
"label":"青龙镇",
"value":"51799",
"childrens":[]},
{
"label":"吐祥镇",
"value":"51800",
"childrens":[]},
{
"label":"新民镇",
"value":"51801",
"childrens":[]},
{
"label":"兴隆镇",
"value":"51802",
"childrens":[]},
{
"label":"羊市镇",
"value":"51803",
"childrens":[]},
{
"label":"朱衣镇",
"value":"51804",
"childrens":[]},
{
"label":"竹园镇",
"value":"51805",
"childrens":[]},
{
"label":"安坪乡",
"value":"51806",
"childrens":[]},
{
"label":"冯坪乡",
"value":"51807",
"childrens":[]},
{
"label":"鹤峰乡",
"value":"51808",
"childrens":[]},
{
"label":"红土乡",
"value":"51809",
"childrens":[]},
{
"label":"康坪乡",
"value":"51810",
"childrens":[]},
{
"label":"龙桥乡",
"value":"51811",
"childrens":[]},
{
"label":"平安乡",
"value":"51812",
"childrens":[]},
{
"label":"石岗乡",
"value":"51813",
"childrens":[]},
{
"label":"太和乡",
"value":"51814",
"childrens":[]},
{
"label":"五马乡",
"value":"51815",
"childrens":[]},
{
"label":"新政乡",
"value":"51816",
"childrens":[]},
{
"label":"岩湾乡",
"value":"51817",
"childrens":[]},
{
"label":"云雾乡",
"value":"51818",
"childrens":[]},
{
"label":"长安乡",
"value":"51819",
"childrens":[]}]},

{
"label":"开县",
"value":"132",
"childrens":[{
"label":"九龙山镇",
"value":"9831",
"childrens":[]},
{
"label":"大进镇",
"value":"9832",
"childrens":[]},
{
"label":"敦好镇",
"value":"9833",
"childrens":[]},
{
"label":"高桥镇",
"value":"9834",
"childrens":[]},
{
"label":"郭家镇",
"value":"9835",
"childrens":[]},
{
"label":"和谦镇",
"value":"9836",
"childrens":[]},
{
"label":"河堰镇",
"value":"9837",
"childrens":[]},
{
"label":"厚坝镇",
"value":"9838",
"childrens":[]},
{
"label":"临江镇",
"value":"9839",
"childrens":[]},
{
"label":"南门镇",
"value":"9840",
"childrens":[]},
{
"label":"南雅镇",
"value":"9841",
"childrens":[]},
{
"label":"渠口镇",
"value":"9842",
"childrens":[]},
{
"label":"铁桥镇",
"value":"9843",
"childrens":[]},
{
"label":"温泉镇",
"value":"9844",
"childrens":[]},
{
"label":"义和镇",
"value":"9845",
"childrens":[]},
{
"label":"长沙镇",
"value":"9846",
"childrens":[]},
{
"label":"赵家镇",
"value":"9847",
"childrens":[]},
{
"label":"镇安镇",
"value":"9848",
"childrens":[]},
{
"label":"中和镇",
"value":"9849",
"childrens":[]},
{
"label":"竹溪镇",
"value":"9850",
"childrens":[]},
{
"label":"三汇口乡",
"value":"9851",
"childrens":[]},
{
"label":"白桥乡",
"value":"9852",
"childrens":[]},
{
"label":"大德乡",
"value":"9853",
"childrens":[]},
{
"label":"关面乡",
"value":"9854",
"childrens":[]},
{
"label":"金峰乡",
"value":"9855",
"childrens":[]},
{
"label":"麻柳乡",
"value":"9856",
"childrens":[]},
{
"label":"满月乡",
"value":"9857",
"childrens":[]},
{
"label":"谭家乡",
"value":"9858",
"childrens":[]},
{
"label":"天和乡",
"value":"9859",
"childrens":[]},
{
"label":"巫山镇",
"value":"9860",
"childrens":[]},
{
"label":"五通乡",
"value":"9861",
"childrens":[]},
{
"label":"紫水乡",
"value":"9862",
"childrens":[]},
{
"label":"县城内",
"value":"51821",
"childrens":[]},
{
"label":"白桥镇",
"value":"51822",
"childrens":[]},
{
"label":"大德镇",
"value":"51823",
"childrens":[]},
{
"label":"金峰镇",
"value":"51824",
"childrens":[]},
{
"label":"谭家镇",
"value":"51825",
"childrens":[]},
{
"label":"天和镇",
"value":"51826",
"childrens":[]},
{
"label":"白泉乡",
"value":"51827",
"childrens":[]},
{
"label":"岳溪镇",
"value":"51828",
"childrens":[]}]},

{
"label":"云阳县",
"value":"133",
"childrens":[{
"label":"县城内",
"value":"10089",
"childrens":[]},
{
"label":"云阳镇",
"value":"10091",
"childrens":[]},
{
"label":"巴阳镇",
"value":"10092",
"childrens":[]},
{
"label":"凤鸣镇",
"value":"10093",
"childrens":[]},
{
"label":"高阳镇",
"value":"10094",
"childrens":[]},
{
"label":"故陵镇",
"value":"10095",
"childrens":[]},
{
"label":"红狮镇",
"value":"10096",
"childrens":[]},
{
"label":"黄石镇",
"value":"10097",
"childrens":[]},
{
"label":"江口镇",
"value":"10098",
"childrens":[]},
{
"label":"龙角镇",
"value":"10099",
"childrens":[]},
{
"label":"路阳镇",
"value":"10100",
"childrens":[]},
{
"label":"南溪镇",
"value":"10101",
"childrens":[]},
{
"label":"农坝镇",
"value":"10102",
"childrens":[]},
{
"label":"盘龙镇",
"value":"10103",
"childrens":[]},
{
"label":"平安镇",
"value":"10104",
"childrens":[]},
{
"label":"渠马镇",
"value":"10105",
"childrens":[]},
{
"label":"人和镇",
"value":"10106",
"childrens":[]},
{
"label":"桑坪镇",
"value":"10107",
"childrens":[]},
{
"label":"沙市镇",
"value":"10108",
"childrens":[]},
{
"label":"双土镇",
"value":"10109",
"childrens":[]},
{
"label":"鱼泉镇",
"value":"10110",
"childrens":[]},
{
"label":"云安镇",
"value":"10111",
"childrens":[]},
{
"label":"洞鹿乡",
"value":"10112",
"childrens":[]},
{
"label":"后叶乡",
"value":"10113",
"childrens":[]},
{
"label":"龙洞乡",
"value":"10114",
"childrens":[]},
{
"label":"毛坝乡",
"value":"10115",
"childrens":[]},
{
"label":"泥溪乡",
"value":"10116",
"childrens":[]},
{
"label":"票草乡",
"value":"10117",
"childrens":[]},
{
"label":"普安乡",
"value":"10118",
"childrens":[]},
{
"label":"栖霞乡",
"value":"10119",
"childrens":[]},
{
"label":"清水乡",
"value":"10120",
"childrens":[]},
{
"label":"上坝乡",
"value":"10121",
"childrens":[]},
{
"label":"石门乡",
"value":"10122",
"childrens":[]},
{
"label":"双龙乡",
"value":"10123",
"childrens":[]},
{
"label":"水口乡",
"value":"10124",
"childrens":[]},
{
"label":"外郎乡",
"value":"10125",
"childrens":[]},
{
"label":"新津乡",
"value":"10126",
"childrens":[]},
{
"label":"堰坪乡",
"value":"10127",
"childrens":[]},
{
"label":"养鹿乡",
"value":"10128",
"childrens":[]},
{
"label":"耀灵乡",
"value":"10129",
"childrens":[]},
{
"label":"云硐乡",
"value":"10130",
"childrens":[]}]},

{
"label":"忠县",
"value":"134",
"childrens":[{
"label":"忠州镇",
"value":"10131",
"childrens":[]},
{
"label":"拔山镇",
"value":"10132",
"childrens":[]},
{
"label":"白石镇",
"value":"10133",
"childrens":[]},
{
"label":"东溪镇",
"value":"10134",
"childrens":[]},
{
"label":"复兴镇",
"value":"10135",
"childrens":[]},
{
"label":"官坝镇",
"value":"10136",
"childrens":[]},
{
"label":"花桥镇",
"value":"10137",
"childrens":[]},
{
"label":"黄金镇",
"value":"10138",
"childrens":[]},
{
"label":"金鸡镇",
"value":"10139",
"childrens":[]},
{
"label":"马灌镇",
"value":"10140",
"childrens":[]},
{
"label":"任家镇",
"value":"10141",
"childrens":[]},
{
"label":"汝溪镇",
"value":"10142",
"childrens":[]},
{
"label":"三汇镇",
"value":"10143",
"childrens":[]},
{
"label":"石宝镇",
"value":"10144",
"childrens":[]},
{
"label":"石黄镇",
"value":"10145",
"childrens":[]},
{
"label":"双桂镇",
"value":"10146",
"childrens":[]},
{
"label":"乌杨镇",
"value":"10147",
"childrens":[]},
{
"label":"新生镇",
"value":"10148",
"childrens":[]},
{
"label":"洋渡镇",
"value":"10149",
"childrens":[]},
{
"label":"野鹤镇",
"value":"10150",
"childrens":[]},
{
"label":"永丰镇",
"value":"10151",
"childrens":[]},
{
"label":"金声乡",
"value":"10152",
"childrens":[]},
{
"label":"磨子乡",
"value":"10153",
"childrens":[]},
{
"label":"善广乡",
"value":"10154",
"childrens":[]},
{
"label":"石子乡",
"value":"10155",
"childrens":[]},
{
"label":"涂井乡",
"value":"10156",
"childrens":[]},
{
"label":"兴峰乡",
"value":"10157",
"childrens":[]},
{
"label":"新立镇",
"value":"51829",
"childrens":[]},
{
"label":"县城内",
"value":"51830",
"childrens":[]}]},

{
"label":"巫溪县",
"value":"135",
"childrens":[{
"label":"城厢镇",
"value":"10158",
"childrens":[]},
{
"label":"凤凰镇",
"value":"10159",
"childrens":[]},
{
"label":"古路镇",
"value":"10160",
"childrens":[]},
{
"label":"尖山镇",
"value":"10161",
"childrens":[]},
{
"label":"宁厂镇",
"value":"10162",
"childrens":[]},
{
"label":"上磺镇",
"value":"10163",
"childrens":[]},
{
"label":"文峰镇",
"value":"10164",
"childrens":[]},
{
"label":"下堡镇",
"value":"10165",
"childrens":[]},
{
"label":"徐家镇",
"value":"10166",
"childrens":[]},
{
"label":"朝阳洞乡",
"value":"10167",
"childrens":[]},
{
"label":"大河乡",
"value":"10168",
"childrens":[]},
{
"label":"峰灵乡",
"value":"10169",
"childrens":[]},
{
"label":"花台乡",
"value":"10170",
"childrens":[]},
{
"label":"兰英乡",
"value":"10171",
"childrens":[]},
{
"label":"菱角乡",
"value":"10172",
"childrens":[]},
{
"label":"蒲莲乡",
"value":"10173",
"childrens":[]},
{
"label":"胜利乡",
"value":"10174",
"childrens":[]},
{
"label":"双阳乡",
"value":"10175",
"childrens":[]},
{
"label":"塘坊乡",
"value":"10176",
"childrens":[]},
{
"label":"天星乡",
"value":"10177",
"childrens":[]},
{
"label":"天元乡",
"value":"10178",
"childrens":[]},
{
"label":"田坝乡",
"value":"10179",
"childrens":[]},
{
"label":"通城乡",
"value":"10180",
"childrens":[]},
{
"label":"土城乡",
"value":"10181",
"childrens":[]},
{
"label":"乌龙乡",
"value":"10182",
"childrens":[]},
{
"label":"鱼鳞乡",
"value":"10183",
"childrens":[]},
{
"label":"长桂乡",
"value":"10184",
"childrens":[]},
{
"label":"中岗乡",
"value":"10185",
"childrens":[]},
{
"label":"中梁乡",
"value":"10186",
"childrens":[]},
{
"label":"县城内",
"value":"51831",
"childrens":[]}]},

{
"label":"巫山县",
"value":"136",
"childrens":[{
"label":"巫峡镇",
"value":"10187",
"childrens":[]},
{
"label":"大昌镇",
"value":"10188",
"childrens":[]},
{
"label":"福田镇",
"value":"10189",
"childrens":[]},
{
"label":"官渡镇",
"value":"10190",
"childrens":[]},
{
"label":"官阳镇",
"value":"10191",
"childrens":[]},
{
"label":"龙溪镇",
"value":"10192",
"childrens":[]},
{
"label":"骡坪镇",
"value":"10193",
"childrens":[]},
{
"label":"庙堂乡",
"value":"10194",
"childrens":[]},
{
"label":"庙宇镇",
"value":"10195",
"childrens":[]},
{
"label":"双龙镇",
"value":"10196",
"childrens":[]},
{
"label":"铜鼓镇",
"value":"10197",
"childrens":[]},
{
"label":"抱龙镇",
"value":"10198",
"childrens":[]},
{
"label":"大溪乡",
"value":"10199",
"childrens":[]},
{
"label":"当阳乡",
"value":"10200",
"childrens":[]},
{
"label":"邓家乡",
"value":"10201",
"childrens":[]},
{
"label":"笃坪乡",
"value":"10202",
"childrens":[]},
{
"label":"红椿乡",
"value":"10203",
"childrens":[]},
{
"label":"建平乡",
"value":"10204",
"childrens":[]},
{
"label":"金坪乡",
"value":"10205",
"childrens":[]},
{
"label":"两坪乡",
"value":"10206",
"childrens":[]},
{
"label":"龙井乡",
"value":"10207",
"childrens":[]},
{
"label":"培石乡",
"value":"10208",
"childrens":[]},
{
"label":"平河乡",
"value":"10209",
"childrens":[]},
{
"label":"曲尺乡",
"value":"10210",
"childrens":[]},
{
"label":"三溪乡",
"value":"10211",
"childrens":[]},
{
"label":"竹贤乡",
"value":"10212",
"childrens":[]},
{
"label":"县城内",
"value":"51832",
"childrens":[]}]},

{
"label":"石柱县",
"value":"137",
"childrens":[{
"label":"南宾镇",
"value":"10213",
"childrens":[]},
{
"label":"黄水镇",
"value":"10214",
"childrens":[]},
{
"label":"临溪镇",
"value":"10215",
"childrens":[]},
{
"label":"龙沙镇",
"value":"10216",
"childrens":[]},
{
"label":"马武镇",
"value":"10217",
"childrens":[]},
{
"label":"沙子镇",
"value":"10218",
"childrens":[]},
{
"label":"王场镇",
"value":"10219",
"childrens":[]},
{
"label":"西沱镇",
"value":"10220",
"childrens":[]},
{
"label":"下路镇",
"value":"10221",
"childrens":[]},
{
"label":"沿溪镇",
"value":"10222",
"childrens":[]},
{
"label":"渔池镇",
"value":"10223",
"childrens":[]},
{
"label":"悦崃镇",
"value":"10224",
"childrens":[]},
{
"label":"大歇乡",
"value":"10225",
"childrens":[]},
{
"label":"枫木乡",
"value":"10226",
"childrens":[]},
{
"label":"河嘴乡",
"value":"10227",
"childrens":[]},
{
"label":"黄鹤乡",
"value":"10228",
"childrens":[]},
{
"label":"金铃乡",
"value":"10229",
"childrens":[]},
{
"label":"金竹乡",
"value":"10230",
"childrens":[]},
{
"label":"冷水乡",
"value":"10231",
"childrens":[]},
{
"label":"黎场乡",
"value":"10232",
"childrens":[]},
{
"label":"六塘乡",
"value":"10233",
"childrens":[]},
{
"label":"龙潭乡",
"value":"10234",
"childrens":[]},
{
"label":"桥头乡",
"value":"10235",
"childrens":[]},
{
"label":"三河乡",
"value":"10236",
"childrens":[]},
{
"label":"三益乡",
"value":"10237",
"childrens":[]},
{
"label":"石家乡",
"value":"10238",
"childrens":[]},
{
"label":"万朝乡",
"value":"10239",
"childrens":[]},
{
"label":"王家乡",
"value":"10240",
"childrens":[]},
{
"label":"洗新乡",
"value":"10241",
"childrens":[]},
{
"label":"新乐乡",
"value":"10242",
"childrens":[]},
{
"label":"中益乡",
"value":"10243",
"childrens":[]},
{
"label":"县城内",
"value":"51833",
"childrens":[]}]},

{
"label":"彭水县",
"value":"138",
"childrens":[{
"label":"县城内",
"value":"10244",
"childrens":[]},
{
"label":"保家镇",
"value":"10245",
"childrens":[]},
{
"label":"高谷镇",
"value":"10246",
"childrens":[]},
{
"label":"黄家镇",
"value":"10247",
"childrens":[]},
{
"label":"连湖镇",
"value":"10248",
"childrens":[]},
{
"label":"龙射镇",
"value":"10249",
"childrens":[]},
{
"label":"鹿角镇",
"value":"10250",
"childrens":[]},
{
"label":"普子镇",
"value":"10251",
"childrens":[]},
{
"label":"桑柘镇",
"value":"10252",
"childrens":[]},
{
"label":"万足镇",
"value":"10253",
"childrens":[]},
{
"label":"郁山镇",
"value":"10254",
"childrens":[]},
{
"label":"梅子垭乡",
"value":"10255",
"childrens":[]},
{
"label":"鞍子乡",
"value":"10256",
"childrens":[]},
{
"label":"大垭乡",
"value":"10257",
"childrens":[]},
{
"label":"棣棠乡",
"value":"10258",
"childrens":[]},
{
"label":"靛水乡",
"value":"10259",
"childrens":[]},
{
"label":"朗溪乡",
"value":"10260",
"childrens":[]},
{
"label":"联合乡",
"value":"10261",
"childrens":[]},
{
"label":"龙塘乡",
"value":"10262",
"childrens":[]},
{
"label":"龙溪乡",
"value":"10263",
"childrens":[]},
{
"label":"芦塘乡",
"value":"10264",
"childrens":[]},
{
"label":"鹿鸣乡",
"value":"10265",
"childrens":[]},
{
"label":"平安乡",
"value":"10266",
"childrens":[]},
{
"label":"迁乔乡",
"value":"10267",
"childrens":[]},
{
"label":"乔梓乡",
"value":"10268",
"childrens":[]},
{
"label":"润溪乡",
"value":"10269",
"childrens":[]},
{
"label":"三义乡",
"value":"10270",
"childrens":[]},
{
"label":"善感乡",
"value":"10271",
"childrens":[]},
{
"label":"石柳乡",
"value":"10272",
"childrens":[]},
{
"label":"石盘乡",
"value":"10273",
"childrens":[]},
{
"label":"双龙乡",
"value":"10274",
"childrens":[]},
{
"label":"太原乡",
"value":"10275",
"childrens":[]},
{
"label":"桐楼乡",
"value":"10276",
"childrens":[]},
{
"label":"小厂乡",
"value":"10277",
"childrens":[]},
{
"label":"新田乡",
"value":"10278",
"childrens":[]},
{
"label":"岩东乡",
"value":"10279",
"childrens":[]},
{
"label":"长滩乡",
"value":"10280",
"childrens":[]},
{
"label":"诸佛乡",
"value":"10281",
"childrens":[]},
{
"label":"走马乡",
"value":"10282",
"childrens":[]}]},

{
"label":"垫江县",
"value":"139",
"childrens":[{
"label":"桂溪镇",
"value":"10283",
"childrens":[]},
{
"label":"澄溪镇",
"value":"10284",
"childrens":[]},
{
"label":"高安镇",
"value":"10285",
"childrens":[]},
{
"label":"高峰镇",
"value":"10286",
"childrens":[]},
{
"label":"鹤游镇",
"value":"10287",
"childrens":[]},
{
"label":"普顺镇",
"value":"10288",
"childrens":[]},
{
"label":"沙坪镇",
"value":"10289",
"childrens":[]},
{
"label":"太平镇",
"value":"10290",
"childrens":[]},
{
"label":"五洞镇",
"value":"10291",
"childrens":[]},
{
"label":"新民镇",
"value":"10292",
"childrens":[]},
{
"label":"砚台镇",
"value":"10293",
"childrens":[]},
{
"label":"永安镇",
"value":"10294",
"childrens":[]},
{
"label":"周嘉镇",
"value":"10295",
"childrens":[]},
{
"label":"白家乡",
"value":"10296",
"childrens":[]},
{
"label":"包家乡",
"value":"10297",
"childrens":[]},
{
"label":"曹回乡",
"value":"10298",
"childrens":[]},
{
"label":"大石乡",
"value":"10299",
"childrens":[]},
{
"label":"杠家乡",
"value":"10300",
"childrens":[]},
{
"label":"黄沙乡",
"value":"10301",
"childrens":[]},
{
"label":"裴兴乡",
"value":"10302",
"childrens":[]},
{
"label":"三溪乡",
"value":"10303",
"childrens":[]},
{
"label":"沙河乡",
"value":"10304",
"childrens":[]},
{
"label":"永平乡",
"value":"10305",
"childrens":[]},
{
"label":"长龙乡",
"value":"10306",
"childrens":[]},
{
"label":"坪山镇",
"value":"51834",
"childrens":[]},
{
"label":"县城内",
"value":"51835",
"childrens":[]}]},

{
"label":"酉阳县",
"value":"140",
"childrens":[{
"label":"钟多镇",
"value":"10307",
"childrens":[]},
{
"label":"苍岭镇",
"value":"10308",
"childrens":[]},
{
"label":"车田乡",
"value":"10309",
"childrens":[]},
{
"label":"大溪镇",
"value":"10310",
"childrens":[]},
{
"label":"丁市镇",
"value":"10311",
"childrens":[]},
{
"label":"泔溪镇",
"value":"10312",
"childrens":[]},
{
"label":"龚滩镇",
"value":"10313",
"childrens":[]},
{
"label":"黑水镇",
"value":"10314",
"childrens":[]},
{
"label":"后溪镇",
"value":"10315",
"childrens":[]},
{
"label":"李溪镇",
"value":"10316",
"childrens":[]},
{
"label":"龙潭镇",
"value":"10317",
"childrens":[]},
{
"label":"麻旺镇",
"value":"10318",
"childrens":[]},
{
"label":"小河镇",
"value":"10319",
"childrens":[]},
{
"label":"兴隆镇",
"value":"10320",
"childrens":[]},
{
"label":"酉酬镇",
"value":"10321",
"childrens":[]},
{
"label":"南腰界乡",
"value":"10322",
"childrens":[]},
{
"label":"后坪坝乡",
"value":"10323",
"childrens":[]},
{
"label":"板溪乡",
"value":"10324",
"childrens":[]},
{
"label":"官清乡",
"value":"10325",
"childrens":[]},
{
"label":"花田乡",
"value":"10326",
"childrens":[]},
{
"label":"江丰乡",
"value":"10327",
"childrens":[]},
{
"label":"可大乡",
"value":"10328",
"childrens":[]},
{
"label":"浪坪乡",
"value":"10329",
"childrens":[]},
{
"label":"两罾乡",
"value":"10330",
"childrens":[]},
{
"label":"毛坝乡",
"value":"10331",
"childrens":[]},
{
"label":"庙溪乡",
"value":"10332",
"childrens":[]},
{
"label":"木叶乡",
"value":"10333",
"childrens":[]},
{
"label":"楠木乡",
"value":"10334",
"childrens":[]},
{
"label":"偏柏乡",
"value":"10335",
"childrens":[]},
{
"label":"清泉乡",
"value":"10336",
"childrens":[]},
{
"label":"双泉乡",
"value":"10337",
"childrens":[]},
{
"label":"天馆乡",
"value":"10338",
"childrens":[]},
{
"label":"铜鼓乡",
"value":"51836",
"childrens":[]},
{
"label":"涂市乡",
"value":"51837",
"childrens":[]},
{
"label":"万木乡",
"value":"51838",
"childrens":[]},
{
"label":"五福乡",
"value":"51839",
"childrens":[]},
{
"label":"宜居乡",
"value":"51840",
"childrens":[]},
{
"label":"腴地乡",
"value":"51841",
"childrens":[]},
{
"label":"板桥乡",
"value":"51842",
"childrens":[]},
{
"label":"县城内",
"value":"51843",
"childrens":[]}]},

{
"label":"秀山县",
"value":"141",
"childrens":[{
"label":"清溪场镇",
"value":"51844",
"childrens":[]},
{
"label":"中和镇",
"value":"51845",
"childrens":[]},
{
"label":"隘口镇",
"value":"51846",
"childrens":[]},
{
"label":"峨溶镇",
"value":"51847",
"childrens":[]},
{
"label":"官庄镇",
"value":"51848",
"childrens":[]},
{
"label":"洪安镇",
"value":"51849",
"childrens":[]},
{
"label":"蓝桥镇",
"value":"51850",
"childrens":[]},
{
"label":"龙池镇",
"value":"51851",
"childrens":[]},
{
"label":"梅江镇",
"value":"51852",
"childrens":[]},
{
"label":"平凯镇",
"value":"51853",
"childrens":[]},
{
"label":"溶溪镇",
"value":"51854",
"childrens":[]},
{
"label":"石堤镇",
"value":"51855",
"childrens":[]},
{
"label":"石耶镇",
"value":"51856",
"childrens":[]},
{
"label":"雅江镇",
"value":"51857",
"childrens":[]},
{
"label":"巴家乡",
"value":"51858",
"childrens":[]},
{
"label":"保安乡",
"value":"51859",
"childrens":[]},
{
"label":"岑溪乡",
"value":"51860",
"childrens":[]},
{
"label":"大溪乡",
"value":"51861",
"childrens":[]},
{
"label":"干川乡",
"value":"51862",
"childrens":[]},
{
"label":"膏田乡",
"value":"51863",
"childrens":[]},
{
"label":"官舟乡",
"value":"51864",
"childrens":[]},
{
"label":"海洋乡",
"value":"51865",
"childrens":[]},
{
"label":"里仁乡",
"value":"51866",
"childrens":[]},
{
"label":"妙泉乡",
"value":"51867",
"childrens":[]},
{
"label":"平马乡",
"value":"51868",
"childrens":[]},
{
"label":"宋农乡",
"value":"51869",
"childrens":[]},
{
"label":"溪口乡",
"value":"51870",
"childrens":[]},
{
"label":"孝溪乡",
"value":"51871",
"childrens":[]},
{
"label":"涌洞乡",
"value":"51872",
"childrens":[]},
{
"label":"中平乡",
"value":"51873",
"childrens":[]},
{
"label":"钟灵乡",
"value":"51874",
"childrens":[]},
{
"label":"县城内",
"value":"51875",
"childrens":[]}]},

{
"label":"城口县",
"value":"4164",
"childrens":[{
"label":"龙田乡",
"value":"51876",
"childrens":[]},
{
"label":"明中乡",
"value":"51877",
"childrens":[]},
{
"label":"双河乡",
"value":"51878",
"childrens":[]},
{
"label":"咸宜乡",
"value":"51879",
"childrens":[]},
{
"label":"沿河乡",
"value":"51880",
"childrens":[]},
{
"label":"治平乡",
"value":"51881",
"childrens":[]},
{
"label":"周溪乡",
"value":"51882",
"childrens":[]},
{
"label":"左岚乡",
"value":"51883",
"childrens":[]},
{
"label":"县城内",
"value":"51884",
"childrens":[]}]},

{
"label":"璧山区",
"value":"51885",
"childrens":[{
"label":"县城内",
"value":"51904",
"childrens":[]},
{
"label":"青杠镇",
"value":"51905",
"childrens":[]},
{
"label":"来凤镇",
"value":"51906",
"childrens":[]},
{
"label":"丁家镇",
"value":"51907",
"childrens":[]},
{
"label":"大路镇",
"value":"51908",
"childrens":[]},
{
"label":"八塘镇",
"value":"51909",
"childrens":[]},
{
"label":"七塘镇",
"value":"51910",
"childrens":[]},
{
"label":"河边镇",
"value":"51911",
"childrens":[]},
{
"label":"福禄镇",
"value":"51912",
"childrens":[]},
{
"label":"大兴镇",
"value":"51913",
"childrens":[]},
{
"label":"正兴镇",
"value":"51914",
"childrens":[]},
{
"label":"广普镇",
"value":"51915",
"childrens":[]},
{
"label":"三合镇",
"value":"51916",
"childrens":[]},
{
"label":"健龙镇",
"value":"51917",
"childrens":[]}]},

{
"label":"荣昌区",
"value":"51886",
"childrens":[{
"label":"县城内",
"value":"51918",
"childrens":[]},
{
"label":"广顺镇",
"value":"51919",
"childrens":[]},
{
"label":"安富镇",
"value":"51920",
"childrens":[]},
{
"label":"峰高镇",
"value":"51921",
"childrens":[]},
{
"label":"双河镇",
"value":"51922",
"childrens":[]},
{
"label":"直升镇",
"value":"51923",
"childrens":[]},
{
"label":"路孔镇",
"value":"51924",
"childrens":[]},
{
"label":"清江镇",
"value":"51925",
"childrens":[]},
{
"label":"仁义镇",
"value":"51926",
"childrens":[]},
{
"label":"河包镇",
"value":"51927",
"childrens":[]},
{
"label":"古昌镇",
"value":"51928",
"childrens":[]},
{
"label":"吴家镇",
"value":"51929",
"childrens":[]},
{
"label":"观胜镇",
"value":"51930",
"childrens":[]},
{
"label":"铜鼓镇",
"value":"51931",
"childrens":[]},
{
"label":"清流镇",
"value":"51932",
"childrens":[]},
{
"label":"盘龙镇",
"value":"51933",
"childrens":[]},
{
"label":"远觉镇",
"value":"51934",
"childrens":[]},
{
"label":"清升镇",
"value":"51935",
"childrens":[]},
{
"label":"荣隆镇",
"value":"51936",
"childrens":[]},
{
"label":"龙集镇",
"value":"51937",
"childrens":[]}]},

{
"label":"铜梁区",
"value":"51887",
"childrens":[{
"label":"县城内",
"value":"51938",
"childrens":[]},
{
"label":"土桥镇",
"value":"51939",
"childrens":[]},
{
"label":"二坪镇",
"value":"51940",
"childrens":[]},
{
"label":"水口镇",
"value":"51941",
"childrens":[]},
{
"label":"安居镇",
"value":"51942",
"childrens":[]},
{
"label":"白羊镇",
"value":"51943",
"childrens":[]},
{
"label":"平潭镇",
"value":"51944",
"childrens":[]},
{
"label":"石鱼镇",
"value":"51945",
"childrens":[]},
{
"label":"福果镇",
"value":"51946",
"childrens":[]},
{
"label":"维新镇",
"value":"51947",
"childrens":[]},
{
"label":"高楼镇",
"value":"51948",
"childrens":[]},
{
"label":"大庙镇",
"value":"51949",
"childrens":[]},
{
"label":"围龙镇",
"value":"51950",
"childrens":[]},
{
"label":"华兴镇",
"value":"51951",
"childrens":[]},
{
"label":"永嘉镇",
"value":"51952",
"childrens":[]},
{
"label":"安溪镇",
"value":"51953",
"childrens":[]},
{
"label":"西河镇",
"value":"51954",
"childrens":[]},
{
"label":"太平镇",
"value":"51955",
"childrens":[]},
{
"label":"旧县镇",
"value":"51956",
"childrens":[]},
{
"label":"龙峰镇",
"value":"51957",
"childrens":[]},
{
"label":"少云镇",
"value":"51958",
"childrens":[]},
{
"label":"蒲吕镇",
"value":"51959",
"childrens":[]},
{
"label":"侣俸镇",
"value":"51960",
"childrens":[]},
{
"label":"小林乡",
"value":"51961",
"childrens":[]},
{
"label":"双山乡",
"value":"51962",
"childrens":[]},
{
"label":"庆隆乡",
"value":"51963",
"childrens":[]}]},

{
"label":"合川区",
"value":"51888",
"childrens":[{
"label":"香龙镇",
"value":"51964",
"childrens":[]},
{
"label":"钱塘镇",
"value":"51965",
"childrens":[]},
{
"label":"龙市镇",
"value":"51966",
"childrens":[]},
{
"label":"燕窝镇",
"value":"51967",
"childrens":[]},
{
"label":"太和镇",
"value":"51968",
"childrens":[]},
{
"label":"渭沱镇",
"value":"51969",
"childrens":[]},
{
"label":"双槐镇",
"value":"51970",
"childrens":[]},
{
"label":"城区",
"value":"51971",
"childrens":[]}]},

{
"label":"巴南区",
"value":"51889",
"childrens":[{
"label":"南泉镇",
"value":"51972",
"childrens":[]},
{
"label":"一品镇",
"value":"51973",
"childrens":[]},
{
"label":"南彭镇",
"value":"51974",
"childrens":[]},
{
"label":"惠民镇",
"value":"51975",
"childrens":[]},
{
"label":"麻柳嘴镇",
"value":"51976",
"childrens":[]},
{
"label":"天星寺镇",
"value":"51977",
"childrens":[]},
{
"label":"双河口镇",
"value":"51978",
"childrens":[]},
{
"label":"届石镇",
"value":"51979",
"childrens":[]},
{
"label":"安澜镇",
"value":"51980",
"childrens":[]},
{
"label":"跳石镇",
"value":"51981",
"childrens":[]},
{
"label":"木洞镇",
"value":"51982",
"childrens":[]},
{
"label":"丰盛镇",
"value":"51983",
"childrens":[]},
{
"label":"二圣镇",
"value":"51984",
"childrens":[]},
{
"label":"东泉镇",
"value":"51985",
"childrens":[]},
{
"label":"姜家镇",
"value":"51986",
"childrens":[]},
{
"label":"接龙镇",
"value":"51987",
"childrens":[]},
{
"label":"石滩镇",
"value":"51988",
"childrens":[]},
{
"label":"石龙镇",
"value":"51989",
"childrens":[]},
{
"label":"城区",
"value":"51990",
"childrens":[]}]},

{
"label":"北碚区",
"value":"51890",
"childrens":[{
"label":"城区",
"value":"51991",
"childrens":[]},
{
"label":"三圣镇",
"value":"51992",
"childrens":[]},
{
"label":"东阳镇",
"value":"51993",
"childrens":[]},
{
"label":"蔡家岗镇",
"value":"51994",
"childrens":[]},
{
"label":"童家溪镇",
"value":"51995",
"childrens":[]},
{
"label":"施家梁镇",
"value":"51996",
"childrens":[]},
{
"label":"金刀峡镇",
"value":"51997",
"childrens":[]},
{
"label":"澄江镇",
"value":"51998",
"childrens":[]},
{
"label":"水土镇",
"value":"51999",
"childrens":[]},
{
"label":"歇马镇",
"value":"52000",
"childrens":[]},
{
"label":"天府镇",
"value":"52001",
"childrens":[]},
{
"label":"复兴镇",
"value":"52002",
"childrens":[]},
{
"label":"静观镇",
"value":"52003",
"childrens":[]},
{
"label":"柳荫镇",
"value":"52004",
"childrens":[]}]},

{
"label":"江津区",
"value":"51891",
"childrens":[{
"label":"城区",
"value":"52005",
"childrens":[]},
{
"label":"双福镇",
"value":"52006",
"childrens":[]},
{
"label":"四面山镇",
"value":"52007",
"childrens":[]},
{
"label":"支坪镇",
"value":"52008",
"childrens":[]},
{
"label":"白沙镇",
"value":"52009",
"childrens":[]},
{
"label":"珞璜镇",
"value":"52010",
"childrens":[]},
{
"label":"柏林镇",
"value":"52011",
"childrens":[]},
{
"label":"蔡家镇",
"value":"52012",
"childrens":[]},
{
"label":"慈云镇",
"value":"52013",
"childrens":[]},
{
"label":"杜市镇",
"value":"52014",
"childrens":[]},
{
"label":"广兴镇",
"value":"52015",
"childrens":[]},
{
"label":"嘉平镇",
"value":"52016",
"childrens":[]},
{
"label":"贾嗣镇",
"value":"52017",
"childrens":[]},
{
"label":"李市镇",
"value":"52018",
"childrens":[]},
{
"label":"龙华镇",
"value":"52019",
"childrens":[]},
{
"label":"石蟆镇",
"value":"52020",
"childrens":[]},
{
"label":"石门镇",
"value":"52021",
"childrens":[]},
{
"label":"塘河镇",
"value":"52022",
"childrens":[]},
{
"label":"吴滩镇",
"value":"52023",
"childrens":[]},
{
"label":"西湖镇",
"value":"52024",
"childrens":[]},
{
"label":"夏坝镇",
"value":"52025",
"childrens":[]},
{
"label":"先锋镇",
"value":"52026",
"childrens":[]},
{
"label":"永兴镇",
"value":"52027",
"childrens":[]},
{
"label":"油溪镇",
"value":"52028",
"childrens":[]},
{
"label":"中山镇",
"value":"52029",
"childrens":[]},
{
"label":"朱阳镇",
"value":"52030",
"childrens":[]}]},

{
"label":"渝北区",
"value":"51892",
"childrens":[{
"label":"城区",
"value":"52031",
"childrens":[]},
{
"label":"兴隆镇",
"value":"52032",
"childrens":[]},
{
"label":"统景镇",
"value":"52033",
"childrens":[]},
{
"label":"石船镇",
"value":"52034",
"childrens":[]},
{
"label":"木耳镇",
"value":"52035",
"childrens":[]},
{
"label":"洛碛镇",
"value":"52036",
"childrens":[]},
{
"label":"龙兴镇",
"value":"52037",
"childrens":[]},
{
"label":"古路镇",
"value":"52038",
"childrens":[]},
{
"label":"大塆镇",
"value":"52039",
"childrens":[]},
{
"label":"大盛镇",
"value":"52040",
"childrens":[]},
{
"label":"茨竹镇",
"value":"52041",
"childrens":[]},
{
"label":"玉峰山镇",
"value":"52042",
"childrens":[]},
{
"label":"悦来镇",
"value":"52043",
"childrens":[]},
{
"label":"王家镇",
"value":"52044",
"childrens":[]},
{
"label":"两路镇",
"value":"52045",
"childrens":[]},
{
"label":"礼嘉镇",
"value":"52046",
"childrens":[]}]},

{
"label":"长寿区",
"value":"51893",
"childrens":[]},
{
"label":"永川区",
"value":"51894",
"childrens":[{
"label":"城区",
"value":"52062",
"childrens":[]},
{
"label":"双竹镇",
"value":"52063",
"childrens":[]},
{
"label":"三教镇",
"value":"52064",
"childrens":[]},
{
"label":"大安镇",
"value":"52065",
"childrens":[]},
{
"label":"陈食镇",
"value":"52066",
"childrens":[]},
{
"label":"板桥镇",
"value":"52067",
"childrens":[]},
{
"label":"宝峰镇",
"value":"52068",
"childrens":[]},
{
"label":"临江镇",
"value":"52069",
"childrens":[]},
{
"label":"红炉镇",
"value":"52070",
"childrens":[]},
{
"label":"吉安镇",
"value":"52071",
"childrens":[]},
{
"label":"金龙镇",
"value":"52072",
"childrens":[]},
{
"label":"来苏镇",
"value":"52073",
"childrens":[]},
{
"label":"青峰镇",
"value":"52074",
"childrens":[]},
{
"label":"双石镇",
"value":"52075",
"childrens":[]},
{
"label":"松溉镇",
"value":"52076",
"childrens":[]},
{
"label":"五间镇",
"value":"52077",
"childrens":[]},
{
"label":"仙龙镇",
"value":"52078",
"childrens":[]},
{
"label":"永荣镇",
"value":"52079",
"childrens":[]},
{
"label":"朱沱镇",
"value":"52080",
"childrens":[]},
{
"label":"何埂镇",
"value":"52081",
"childrens":[]}]},

{
"label":"江北区",
"value":"51895",
"childrens":[{
"label":"内环以内",
"value":"52082",
"childrens":[]},
{
"label":"寸滩镇",
"value":"52083",
"childrens":[]},
{
"label":"郭家沱镇",
"value":"52084",
"childrens":[]},
{
"label":"铁山坪镇",
"value":"52085",
"childrens":[]},
{
"label":"鱼嘴镇",
"value":"52086",
"childrens":[]},
{
"label":"复盛镇",
"value":"52087",
"childrens":[]},
{
"label":"五宝镇",
"value":"52088",
"childrens":[]},
{
"label":"大石坝镇",
"value":"52089",
"childrens":[]}]},

{
"label":"南岸区",
"value":"51896",
"childrens":[{
"label":"城区",
"value":"52090",
"childrens":[]},
{
"label":"内环以内",
"value":"52091",
"childrens":[]},
{
"label":"茶园新区",
"value":"52092",
"childrens":[]},
{
"label":"鸡冠石镇",
"value":"52093",
"childrens":[]},
{
"label":"长生桥镇",
"value":"52094",
"childrens":[]},
{
"label":"峡口镇",
"value":"52095",
"childrens":[]},
{
"label":"广阳镇",
"value":"52096",
"childrens":[]},
{
"label":"迎龙镇",
"value":"52097",
"childrens":[]}]},

{
"label":"九龙坡区",
"value":"51897",
"childrens":[{
"label":"内环以内",
"value":"52098",
"childrens":[]},
{
"label":"白市驿镇",
"value":"52099",
"childrens":[]},
{
"label":"铜罐驿镇",
"value":"52100",
"childrens":[]},
{
"label":"华岩镇",
"value":"52101",
"childrens":[]},
{
"label":"巴福镇",
"value":"52102",
"childrens":[]},
{
"label":"含谷镇",
"value":"52103",
"childrens":[]},
{
"label":"金凤镇",
"value":"52104",
"childrens":[]},
{
"label":"石板镇",
"value":"52105",
"childrens":[]},
{
"label":"陶家镇",
"value":"52106",
"childrens":[]},
{
"label":"西彭镇",
"value":"52107",
"childrens":[]},
{
"label":"走马镇",
"value":"52108",
"childrens":[]}]},

{
"label":"沙坪坝区",
"value":"51898",
"childrens":[{
"label":"内环以内",
"value":"52109",
"childrens":[]},
{
"label":"陈家桥镇",
"value":"52110",
"childrens":[]},
{
"label":"歌乐山镇",
"value":"52111",
"childrens":[]},
{
"label":"青木关镇",
"value":"52112",
"childrens":[]},
{
"label":"回龙坝镇",
"value":"52113",
"childrens":[]},
{
"label":"大学城",
"value":"52114",
"childrens":[]},
{
"label":"虎溪镇",
"value":"52115",
"childrens":[]},
{
"label":"西永镇",
"value":"52116",
"childrens":[]},
{
"label":"土主镇",
"value":"52117",
"childrens":[]},
{
"label":"井口镇",
"value":"52118",
"childrens":[]},
{
"label":"曾家镇",
"value":"52119",
"childrens":[]},
{
"label":"凤凰镇",
"value":"52120",
"childrens":[]},
{
"label":"中梁镇",
"value":"52121",
"childrens":[]}]},

{
"label":"大渡口区",
"value":"51899",
"childrens":[{
"label":"内环以内",
"value":"52123",
"childrens":[]},
{
"label":"茄子溪镇",
"value":"52124",
"childrens":[]},
{
"label":"建胜镇",
"value":"52125",
"childrens":[]},
{
"label":"跳蹬镇",
"value":"52126",
"childrens":[]}]},

{
"label":"綦江区",
"value":"51900",
"childrens":[{
"label":"城区",
"value":"52127",
"childrens":[]},
{
"label":"三江镇",
"value":"52128",
"childrens":[]},
{
"label":"安稳镇",
"value":"52129",
"childrens":[]},
{
"label":"打通镇",
"value":"52130",
"childrens":[]},
{
"label":"丁山镇",
"value":"52131",
"childrens":[]},
{
"label":"东溪镇",
"value":"52132",
"childrens":[]},
{
"label":"扶欢镇",
"value":"52133",
"childrens":[]},
{
"label":"赶水镇",
"value":"52134",
"childrens":[]},
{
"label":"郭扶镇",
"value":"52135",
"childrens":[]},
{
"label":"横山镇",
"value":"52136",
"childrens":[]},
{
"label":"隆盛镇",
"value":"52137",
"childrens":[]},
{
"label":"三角镇",
"value":"52138",
"childrens":[]},
{
"label":"石壕镇",
"value":"52139",
"childrens":[]},
{
"label":"石角镇",
"value":"52140",
"childrens":[]},
{
"label":"新盛镇",
"value":"52141",
"childrens":[]},
{
"label":"永城镇",
"value":"52142",
"childrens":[]},
{
"label":"永新镇",
"value":"52143",
"childrens":[]},
{
"label":"中峰镇",
"value":"52144",
"childrens":[]},
{
"label":"纂塘镇",
"value":"52145",
"childrens":[]},
{
"label":"丛林镇",
"value":"52146",
"childrens":[]},
{
"label":"关坝镇",
"value":"52147",
"childrens":[]},
{
"label":"黑山镇",
"value":"52148",
"childrens":[]},
{
"label":"金桥镇",
"value":"52149",
"childrens":[]},
{
"label":"南桐镇",
"value":"52150",
"childrens":[]},
{
"label":"青年镇",
"value":"52151",
"childrens":[]},
{
"label":"石林镇",
"value":"52152",
"childrens":[]},
{
"label":"万东镇",
"value":"52153",
"childrens":[]}]},

{
"label":"渝中区",
"value":"51901",
"childrens":[{
"label":"全境",
"value":"52155",
"childrens":[]}]},

{
"label":"高新区",
"value":"51902",
"childrens":[{
"label":"全境",
"value":"52156",
"childrens":[]}]},

{
"label":"北部新区",
"value":"51903",
"childrens":[{
"label":"全境",
"value":"52157",
"childrens":[]}]}]},


{
"label":"河北",
"value":"5",
"childrens":[{
"label":"石家庄市",
"value":"142",
"childrens":[{
"label":"辛集市",
"value":"143",
"childrens":[{
"label":"辛集镇",
"value":"5008",
"childrens":[]},
{
"label":"旧城镇",
"value":"5009",
"childrens":[]},
{
"label":"张古庄镇",
"value":"5010",
"childrens":[]},
{
"label":"位伯镇",
"value":"5011",
"childrens":[]},
{
"label":"新垒头镇",
"value":"5012",
"childrens":[]},
{
"label":"新城镇",
"value":"5013",
"childrens":[]},
{
"label":"南智丘镇",
"value":"5014",
"childrens":[]},
{
"label":"王口镇",
"value":"5015",
"childrens":[]},
{
"label":"天宫营乡",
"value":"5016",
"childrens":[]},
{
"label":"前营乡",
"value":"5017",
"childrens":[]},
{
"label":"马庄乡",
"value":"5018",
"childrens":[]},
{
"label":"和睦井乡",
"value":"5019",
"childrens":[]},
{
"label":"田家庄乡",
"value":"5020",
"childrens":[]},
{
"label":"中里厢乡",
"value":"5021",
"childrens":[]},
{
"label":"小辛庄乡",
"value":"5022",
"childrens":[]}]},

{
"label":"晋州市",
"value":"145",
"childrens":[{
"label":"晋州镇",
"value":"5037",
"childrens":[]},
{
"label":"总十庄镇",
"value":"5038",
"childrens":[]},
{
"label":"营里镇",
"value":"5039",
"childrens":[]},
{
"label":"桃园镇",
"value":"5040",
"childrens":[]},
{
"label":"东卓宿镇",
"value":"5041",
"childrens":[]},
{
"label":"马于镇",
"value":"5042",
"childrens":[]},
{
"label":"小樵镇",
"value":"5043",
"childrens":[]},
{
"label":"槐树镇",
"value":"5044",
"childrens":[]},
{
"label":"东里庄镇",
"value":"5045",
"childrens":[]},
{
"label":"周家庄乡",
"value":"5046",
"childrens":[]},
{
"label":"城区",
"value":"52166",
"childrens":[]}]},

{
"label":"新乐市",
"value":"146",
"childrens":[{
"label":"城区",
"value":"5047",
"childrens":[]},
{
"label":"化皮镇",
"value":"5048",
"childrens":[]},
{
"label":"承安镇",
"value":"5049",
"childrens":[]},
{
"label":"正莫镇",
"value":"5050",
"childrens":[]},
{
"label":"南大岳镇",
"value":"5051",
"childrens":[]},
{
"label":"杜固镇",
"value":"5052",
"childrens":[]},
{
"label":"邯邰镇",
"value":"5053",
"childrens":[]},
{
"label":"东王镇",
"value":"5054",
"childrens":[]},
{
"label":"马头铺镇",
"value":"5055",
"childrens":[]},
{
"label":"协神乡",
"value":"5056",
"childrens":[]},
{
"label":"木村乡",
"value":"5057",
"childrens":[]},
{
"label":"大岳镇",
"value":"52167",
"childrens":[]},
{
"label":"彭家庄乡",
"value":"52168",
"childrens":[]}]},

{
"label":"井陉县",
"value":"153",
"childrens":[{
"label":"城区",
"value":"52169",
"childrens":[]},
{
"label":"微水镇",
"value":"52170",
"childrens":[]},
{
"label":"南障城镇",
"value":"52171",
"childrens":[]},
{
"label":"苍岩山镇",
"value":"52172",
"childrens":[]},
{
"label":"天长镇",
"value":"52173",
"childrens":[]},
{
"label":"秀林镇",
"value":"52174",
"childrens":[]},
{
"label":"南峪镇",
"value":"52175",
"childrens":[]},
{
"label":"上安镇",
"value":"52176",
"childrens":[]},
{
"label":"威州镇",
"value":"52177",
"childrens":[]},
{
"label":"小作镇",
"value":"52178",
"childrens":[]},
{
"label":"测鱼镇",
"value":"52179",
"childrens":[]},
{
"label":"吴家窑乡",
"value":"52180",
"childrens":[]},
{
"label":"南王庄乡",
"value":"52181",
"childrens":[]},
{
"label":"于家乡",
"value":"52182",
"childrens":[]},
{
"label":"北正乡",
"value":"52183",
"childrens":[]},
{
"label":"孙庄乡",
"value":"52184",
"childrens":[]},
{
"label":"南陉乡",
"value":"52185",
"childrens":[]},
{
"label":"辛庄乡",
"value":"52186",
"childrens":[]}]},

{
"label":"栾城县",
"value":"154",
"childrens":[{
"label":"城区",
"value":"52188",
"childrens":[]},
{
"label":"栾城镇",
"value":"52189",
"childrens":[]},
{
"label":"楼底镇",
"value":"52190",
"childrens":[]},
{
"label":"窦妪镇",
"value":"52191",
"childrens":[]},
{
"label":"冶河镇",
"value":"52192",
"childrens":[]},
{
"label":"郄马镇",
"value":"52193",
"childrens":[]},
{
"label":"柳林屯乡",
"value":"52194",
"childrens":[]},
{
"label":"南高乡",
"value":"52195",
"childrens":[]},
{
"label":"西营乡",
"value":"52196",
"childrens":[]}]},

{
"label":"行唐县",
"value":"156",
"childrens":[{
"label":"城区",
"value":"52197",
"childrens":[]},
{
"label":"龙州镇",
"value":"52198",
"childrens":[]},
{
"label":"口头镇",
"value":"52199",
"childrens":[]},
{
"label":"南桥镇",
"value":"52200",
"childrens":[]},
{
"label":"上碑镇",
"value":"52201",
"childrens":[]},
{
"label":"九口子乡",
"value":"52202",
"childrens":[]},
{
"label":"独羊岗乡",
"value":"52203",
"childrens":[]},
{
"label":"上阎庄乡",
"value":"52204",
"childrens":[]},
{
"label":"安乡县",
"value":"52205",
"childrens":[]},
{
"label":"城寨乡",
"value":"52206",
"childrens":[]},
{
"label":"只里乡",
"value":"52207",
"childrens":[]},
{
"label":"市同乡",
"value":"52208",
"childrens":[]},
{
"label":"翟营乡",
"value":"52209",
"childrens":[]},
{
"label":"玉亭乡",
"value":"52210",
"childrens":[]},
{
"label":"北河乡",
"value":"52211",
"childrens":[]},
{
"label":"上方乡",
"value":"52212",
"childrens":[]}]},

{
"label":"灵寿县",
"value":"157",
"childrens":[{
"label":"城区",
"value":"52213",
"childrens":[]},
{
"label":"灵寿镇",
"value":"52214",
"childrens":[]},
{
"label":"青同镇",
"value":"52215",
"childrens":[]},
{
"label":"塔上镇",
"value":"52216",
"childrens":[]},
{
"label":"陈庄镇",
"value":"52217",
"childrens":[]},
{
"label":"慈峪镇",
"value":"52218",
"childrens":[]},
{
"label":"岔头镇",
"value":"52219",
"childrens":[]},
{
"label":"三圣院乡",
"value":"52220",
"childrens":[]},
{
"label":"北谭庄乡",
"value":"52221",
"childrens":[]},
{
"label":"北洼乡",
"value":"52222",
"childrens":[]},
{
"label":"牛城乡",
"value":"52223",
"childrens":[]},
{
"label":"狗台乡",
"value":"52224",
"childrens":[]},
{
"label":"南寨乡",
"value":"52225",
"childrens":[]},
{
"label":"燕川乡",
"value":"52226",
"childrens":[]},
{
"label":"南营乡",
"value":"52227",
"childrens":[]},
{
"label":"寨头乡",
"value":"52228",
"childrens":[]}]},

{
"label":"高邑县",
"value":"158",
"childrens":[{
"label":"城区",
"value":"52229",
"childrens":[]},
{
"label":"高邑镇",
"value":"52230",
"childrens":[]},
{
"label":"大营镇",
"value":"52231",
"childrens":[]},
{
"label":"富村镇",
"value":"52232",
"childrens":[]},
{
"label":"中韩乡",
"value":"52233",
"childrens":[]},
{
"label":"万城乡",
"value":"52234",
"childrens":[]}]},

{
"label":"赵县",
"value":"159",
"childrens":[{
"label":"城区",
"value":"52235",
"childrens":[]},
{
"label":"赵州镇",
"value":"52236",
"childrens":[]},
{
"label":"北王里镇",
"value":"52237",
"childrens":[]},
{
"label":"新寨店镇",
"value":"52238",
"childrens":[]},
{
"label":"南柏舍镇",
"value":"52239",
"childrens":[]},
{
"label":"沙河店镇",
"value":"52240",
"childrens":[]},
{
"label":"范庄镇",
"value":"52241",
"childrens":[]},
{
"label":"韩村镇",
"value":"52242",
"childrens":[]},
{
"label":"前大章乡",
"value":"52243",
"childrens":[]},
{
"label":"王西章乡",
"value":"52244",
"childrens":[]},
{
"label":"谢庄乡",
"value":"52245",
"childrens":[]},
{
"label":"高村乡",
"value":"52246",
"childrens":[]}]},

{
"label":"赞皇县",
"value":"160",
"childrens":[{
"label":"城区",
"value":"52247",
"childrens":[]},
{
"label":"赞皇镇",
"value":"52248",
"childrens":[]},
{
"label":"院头镇",
"value":"52249",
"childrens":[]},
{
"label":"南邢郭乡",
"value":"52250",
"childrens":[]},
{
"label":"南清河乡",
"value":"52251",
"childrens":[]},
{
"label":"西阳泽乡",
"value":"52252",
"childrens":[]},
{
"label":"黄北坪乡",
"value":"52253",
"childrens":[]},
{
"label":"嶂石岩乡",
"value":"52254",
"childrens":[]},
{
"label":"石龙门乡",
"value":"52255",
"childrens":[]},
{
"label":"徐亭乡",
"value":"52256",
"childrens":[]},
{
"label":"张楞乡",
"value":"52257",
"childrens":[]},
{
"label":"土门乡",
"value":"52258",
"childrens":[]}]},

{
"label":"深泽县",
"value":"161",
"childrens":[{
"label":"城区",
"value":"52259",
"childrens":[]},
{
"label":"深泽镇",
"value":"52260",
"childrens":[]},
{
"label":"铁杆镇",
"value":"52261",
"childrens":[]},
{
"label":"白庄乡",
"value":"52262",
"childrens":[]},
{
"label":"赵八乡",
"value":"52263",
"childrens":[]},
{
"label":"桥头乡",
"value":"52264",
"childrens":[]},
{
"label":"留村乡",
"value":"52265",
"childrens":[]}]},

{
"label":"无极县",
"value":"162",
"childrens":[{
"label":"城区",
"value":"52278",
"childrens":[]},
{
"label":"无极镇",
"value":"52279",
"childrens":[]},
{
"label":"张段固镇",
"value":"52280",
"childrens":[]},
{
"label":"郭庄镇",
"value":"52281",
"childrens":[]},
{
"label":"大陈镇",
"value":"52282",
"childrens":[]},
{
"label":"北苏镇",
"value":"52283",
"childrens":[]},
{
"label":"七汲镇",
"value":"52284",
"childrens":[]},
{
"label":"里城道乡",
"value":"52285",
"childrens":[]},
{
"label":"东侯坊乡",
"value":"52286",
"childrens":[]},
{
"label":"高头乡",
"value":"52287",
"childrens":[]},
{
"label":"郝庄乡",
"value":"52288",
"childrens":[]},
{
"label":"南流乡",
"value":"52289",
"childrens":[]}]},

{
"label":"元氏县",
"value":"163",
"childrens":[{
"label":"城区",
"value":"52290",
"childrens":[]},
{
"label":"槐阳镇",
"value":"52291",
"childrens":[]},
{
"label":"宋曹镇",
"value":"52292",
"childrens":[]},
{
"label":"南因镇",
"value":"52293",
"childrens":[]},
{
"label":"殷村镇",
"value":"52294",
"childrens":[]},
{
"label":"姬村镇",
"value":"52295",
"childrens":[]},
{
"label":"南佐镇",
"value":"52296",
"childrens":[]},
{
"label":"黑水河乡",
"value":"52297",
"childrens":[]},
{
"label":"东张乡",
"value":"52298",
"childrens":[]},
{
"label":"苏阳乡",
"value":"52299",
"childrens":[]},
{
"label":"赵同乡",
"value":"52300",
"childrens":[]},
{
"label":"北褚乡",
"value":"52301",
"childrens":[]},
{
"label":"马村乡",
"value":"52302",
"childrens":[]},
{
"label":"北正乡",
"value":"52303",
"childrens":[]},
{
"label":"苏村乡",
"value":"52304",
"childrens":[]},
{
"label":"前仙乡",
"value":"52305",
"childrens":[]}]},

{
"label":"井陉矿区",
"value":"3182",
"childrens":[{
"label":"城区",
"value":"52306",
"childrens":[]},
{
"label":"贾庄镇",
"value":"52307",
"childrens":[]},
{
"label":"凤山镇",
"value":"52308",
"childrens":[]},
{
"label":"横涧乡",
"value":"52309",
"childrens":[]}]},

{
"label":"平山县",
"value":"4158",
"childrens":[{
"label":"县城内",
"value":"52310",
"childrens":[]},
{
"label":"平山镇",
"value":"52311",
"childrens":[]},
{
"label":"东回舍镇",
"value":"52312",
"childrens":[]},
{
"label":"孟家庄镇",
"value":"52313",
"childrens":[]},
{
"label":"蛟潭庄镇",
"value":"52314",
"childrens":[]},
{
"label":"西柏坡镇",
"value":"52315",
"childrens":[]},
{
"label":"古月镇",
"value":"52316",
"childrens":[]},
{
"label":"温塘镇",
"value":"52317",
"childrens":[]},
{
"label":"南甸镇",
"value":"52318",
"childrens":[]},
{
"label":"岗南镇",
"value":"52319",
"childrens":[]},
{
"label":"下槐镇",
"value":"52320",
"childrens":[]},
{
"label":"小觉镇",
"value":"52321",
"childrens":[]},
{
"label":"下口镇",
"value":"52322",
"childrens":[]},
{
"label":"上观音堂乡",
"value":"52323",
"childrens":[]},
{
"label":"西大吾乡",
"value":"52324",
"childrens":[]},
{
"label":"上三汲乡",
"value":"52325",
"childrens":[]},
{
"label":"东王坡乡",
"value":"52326",
"childrens":[]},
{
"label":"苏家庄乡",
"value":"52327",
"childrens":[]},
{
"label":"杨家桥乡",
"value":"52328",
"childrens":[]},
{
"label":"合河口乡",
"value":"52329",
"childrens":[]},
{
"label":"两河乡",
"value":"52330",
"childrens":[]},
{
"label":"宅北乡",
"value":"52331",
"childrens":[]},
{
"label":"北冶乡",
"value":"52332",
"childrens":[]},
{
"label":"营里乡",
"value":"52333",
"childrens":[]}]},

{
"label":"藁城区",
"value":"52158",
"childrens":[{
"label":"廉州镇",
"value":"52334",
"childrens":[]},
{
"label":"贾市庄镇",
"value":"52335",
"childrens":[]},
{
"label":"张家庄镇",
"value":"52336",
"childrens":[]},
{
"label":"前西关镇",
"value":"52337",
"childrens":[]},
{
"label":"兴安镇",
"value":"52338",
"childrens":[]},
{
"label":"常安镇",
"value":"52339",
"childrens":[]},
{
"label":"梅花镇",
"value":"52340",
"childrens":[]},
{
"label":"丘头镇",
"value":"52341",
"childrens":[]},
{
"label":"岗上镇",
"value":"52342",
"childrens":[]},
{
"label":"南董镇",
"value":"52343",
"childrens":[]},
{
"label":"南孟镇",
"value":"52344",
"childrens":[]},
{
"label":"西关镇",
"value":"52345",
"childrens":[]},
{
"label":"增村镇",
"value":"52346",
"childrens":[]},
{
"label":"九门乡",
"value":"52347",
"childrens":[]}]},

{
"label":"鹿泉市",
"value":"52159",
"childrens":[{
"label":"城区",
"value":"52348",
"childrens":[]},
{
"label":"获鹿镇",
"value":"52349",
"childrens":[]},
{
"label":"信息产业园",
"value":"52350",
"childrens":[]},
{
"label":"寺家庄镇",
"value":"52351",
"childrens":[]},
{
"label":"黄壁庄镇",
"value":"52352",
"childrens":[]},
{
"label":"山尹村镇",
"value":"52353",
"childrens":[]},
{
"label":"铜冶镇",
"value":"52354",
"childrens":[]},
{
"label":"上庄镇",
"value":"52355",
"childrens":[]},
{
"label":"李村镇",
"value":"52356",
"childrens":[]},
{
"label":"宜安镇",
"value":"52357",
"childrens":[]},
{
"label":"大河镇",
"value":"52358",
"childrens":[]},
{
"label":"白鹿泉乡",
"value":"52359",
"childrens":[]},
{
"label":"石井乡",
"value":"52360",
"childrens":[]},
{
"label":"上寨乡",
"value":"52361",
"childrens":[]}]},

{
"label":"正定县",
"value":"52160",
"childrens":[{
"label":"城区",
"value":"52362",
"childrens":[]},
{
"label":"正定镇",
"value":"52363",
"childrens":[]},
{
"label":"曲阳桥乡",
"value":"52364",
"childrens":[]},
{
"label":"西平乐乡",
"value":"52365",
"childrens":[]},
{
"label":"北早现乡",
"value":"52366",
"childrens":[]},
{
"label":"南牛乡",
"value":"52367",
"childrens":[]},
{
"label":"南楼乡",
"value":"52368",
"childrens":[]},
{
"label":"诸福屯镇",
"value":"52369",
"childrens":[]},
{
"label":"新城铺镇",
"value":"52370",
"childrens":[]},
{
"label":"新安镇",
"value":"52371",
"childrens":[]}]},

{
"label":"新华区",
"value":"52161",
"childrens":[{
"label":"城区",
"value":"52372",
"childrens":[]},
{
"label":"杜北乡",
"value":"52373",
"childrens":[]},
{
"label":"西三庄乡",
"value":"52374",
"childrens":[]},
{
"label":"大郭镇",
"value":"52375",
"childrens":[]},
{
"label":"赵陵铺镇",
"value":"52376",
"childrens":[]}]},

{
"label":"桥西区",
"value":"52162",
"childrens":[]},
{
"label":"桥东区",
"value":"52163",
"childrens":[{
"label":"城区",
"value":"52377",
"childrens":[]},
{
"label":"桃园镇",
"value":"52378",
"childrens":[]}]},

{
"label":"裕华区",
"value":"52164",
"childrens":[{
"label":"宋营镇",
"value":"52379",
"childrens":[]},
{
"label":"方村镇",
"value":"52380",
"childrens":[]},
{
"label":"城区",
"value":"52381",
"childrens":[]}]},

{
"label":"长安区",
"value":"52165",
"childrens":[{
"label":"城区",
"value":"52382",
"childrens":[]},
{
"label":"西兆通镇",
"value":"52383",
"childrens":[]},
{
"label":"南村镇",
"value":"52384",
"childrens":[]},
{
"label":"高营镇",
"value":"52385",
"childrens":[]}]}]},


{
"label":"邯郸市",
"value":"148",
"childrens":[{
"label":"邯郸县",
"value":"167",
"childrens":[{
"label":"河沙镇镇",
"value":"52390",
"childrens":[]},
{
"label":"黄粱梦镇",
"value":"52391",
"childrens":[]},
{
"label":"户村镇",
"value":"52392",
"childrens":[]},
{
"label":"尚璧镇",
"value":"52393",
"childrens":[]},
{
"label":"南吕固乡",
"value":"52394",
"childrens":[]},
{
"label":"兼庄乡",
"value":"52395",
"childrens":[]},
{
"label":"代召乡",
"value":"52396",
"childrens":[]},
{
"label":"三陵乡",
"value":"52397",
"childrens":[]},
{
"label":"康庄乡",
"value":"52398",
"childrens":[]},
{
"label":"南堡乡",
"value":"52399",
"childrens":[]},
{
"label":"城区",
"value":"52400",
"childrens":[]}]},

{
"label":"峰峰矿区",
"value":"168",
"childrens":[{
"label":"临水镇",
"value":"52401",
"childrens":[]},
{
"label":"峰峰镇",
"value":"52402",
"childrens":[]},
{
"label":"彭城镇",
"value":"52403",
"childrens":[]},
{
"label":"和村镇",
"value":"52404",
"childrens":[]},
{
"label":"义井镇",
"value":"52405",
"childrens":[]},
{
"label":"界城镇",
"value":"52406",
"childrens":[]},
{
"label":"新坡镇",
"value":"52407",
"childrens":[]},
{
"label":"大峪镇",
"value":"52408",
"childrens":[]},
{
"label":"大社镇",
"value":"52409",
"childrens":[]}]},

{
"label":"曲周县",
"value":"169",
"childrens":[{
"label":"河南疃镇",
"value":"52434",
"childrens":[]},
{
"label":"第四疃镇",
"value":"52435",
"childrens":[]},
{
"label":"曲周镇",
"value":"52436",
"childrens":[]},
{
"label":"安寨镇",
"value":"52437",
"childrens":[]},
{
"label":"南里岳乡",
"value":"62438",
"childrens":[]},
{
"label":"大河道乡",
"value":"62440",
"childrens":[]},
{
"label":"槐桥乡",
"value":"62441",
"childrens":[]},
{
"label":"白寨乡",
"value":"62442",
"childrens":[]},
{
"label":"依庄乡",
"value":"62443",
"childrens":[]},
{
"label":"城区",
"value":"62445",
"childrens":[]}]},

{
"label":"馆陶县",
"value":"170",
"childrens":[{
"label":"魏僧寨镇",
"value":"62450",
"childrens":[]},
{
"label":"馆陶镇",
"value":"62451",
"childrens":[]},
{
"label":"房寨镇",
"value":"62453",
"childrens":[]},
{
"label":"柴堡镇",
"value":"62455",
"childrens":[]},
{
"label":"寿山寺乡",
"value":"62457",
"childrens":[]},
{
"label":"南徐村乡",
"value":"62459",
"childrens":[]},
{
"label":"王桥乡",
"value":"62460",
"childrens":[]},
{
"label":"路桥乡",
"value":"62461",
"childrens":[]},
{
"label":"城区",
"value":"62462",
"childrens":[]}]},

{
"label":"魏县",
"value":"171",
"childrens":[{
"label":"张二庄镇",
"value":"62470",
"childrens":[]},
{
"label":"魏城镇",
"value":"62471",
"childrens":[]},
{
"label":"德政镇",
"value":"62472",
"childrens":[]},
{
"label":"北皋镇",
"value":"62473",
"childrens":[]},
{
"label":"双井镇",
"value":"62475",
"childrens":[]},
{
"label":"牙里镇",
"value":"62476",
"childrens":[]},
{
"label":"车往镇",
"value":"62478",
"childrens":[]},
{
"label":"回隆镇",
"value":"62479",
"childrens":[]},
{
"label":"东代固乡",
"value":"62481",
"childrens":[]},
{
"label":"棘针寨乡",
"value":"62484",
"childrens":[]},
{
"label":"沙口集乡",
"value":"62485",
"childrens":[]},
{
"label":"野胡拐乡",
"value":"62486",
"childrens":[]},
{
"label":"仕望集乡",
"value":"62487",
"childrens":[]},
{
"label":"南双庙乡",
"value":"62488",
"childrens":[]},
{
"label":"大辛庄乡",
"value":"62489",
"childrens":[]},
{
"label":"大马村乡",
"value":"62490",
"childrens":[]},
{
"label":"北台头乡",
"value":"62491",
"childrens":[]},
{
"label":"大磨乡",
"value":"62492",
"childrens":[]},
{
"label":"院堡乡",
"value":"62493",
"childrens":[]},
{
"label":"边马乡",
"value":"62494",
"childrens":[]},
{
"label":"泊口乡",
"value":"62495",
"childrens":[]},
{
"label":"泊空乡",
"value":"62496",
"childrens":[]},
{
"label":"前大磨乡",
"value":"62497",
"childrens":[]},
{
"label":"城区",
"value":"62498",
"childrens":[]}]},

{
"label":"成安县",
"value":"172",
"childrens":[{
"label":"漳河店镇",
"value":"52506",
"childrens":[]},
{
"label":"李家疃镇",
"value":"52507",
"childrens":[]},
{
"label":"成安镇",
"value":"52508",
"childrens":[]},
{
"label":"商城镇",
"value":"52509",
"childrens":[]},
{
"label":"柏寺营乡",
"value":"52510",
"childrens":[]},
{
"label":"北乡义乡",
"value":"52511",
"childrens":[]},
{
"label":"道东堡乡",
"value":"52512",
"childrens":[]},
{
"label":"辛义乡",
"value":"52513",
"childrens":[]},
{
"label":"长巷巷",
"value":"52514",
"childrens":[]},
{
"label":"城区",
"value":"52515",
"childrens":[]}]},

{
"label":"大名县",
"value":"173",
"childrens":[{
"label":"龙王庙镇",
"value":"52516",
"childrens":[]},
{
"label":"大名镇",
"value":"52517",
"childrens":[]},
{
"label":"杨桥镇",
"value":"52518",
"childrens":[]},
{
"label":"万堤镇",
"value":"52521",
"childrens":[]},
{
"label":"束馆镇",
"value":"52522",
"childrens":[]},
{
"label":"金滩镇",
"value":"52523",
"childrens":[]},
{
"label":"西付集乡",
"value":"52524",
"childrens":[]},
{
"label":"西未庄乡",
"value":"52525",
"childrens":[]},
{
"label":"沙圪塔乡",
"value":"52529",
"childrens":[]},
{
"label":"黄金堤乡",
"value":"52530",
"childrens":[]},
{
"label":"张铁集乡",
"value":"52531",
"childrens":[]},
{
"label":"孙甘店乡\\r\\n",
"value":"52532",
"childrens":[]},
{
"label":"红庙乡",
"value":"52533",
"childrens":[]},
{
"label":"旧治乡",
"value":"52535",
"childrens":[]},
{
"label":"王村乡",
"value":"52536",
"childrens":[]},
{
"label":"铺上乡",
"value":"52538",
"childrens":[]},
{
"label":"大街乡",
"value":"52540",
"childrens":[]},
{
"label":"埝头乡\\r\\n",
"value":"52542",
"childrens":[]},
{
"label":"北峰乡",
"value":"52543",
"childrens":[]},
{
"label":"营镇乡",
"value":"52545",
"childrens":[]}]},

{
"label":"涉县",
"value":"174",
"childrens":[{
"label":"城区",
"value":"52548",
"childrens":[]},
{
"label":"河南店镇",
"value":"52549",
"childrens":[]},
{
"label":"涉城镇\\r\\n",
"value":"52551",
"childrens":[]},
{
"label":"索堡镇\\r\\n",
"value":"52552",
"childrens":[]},
{
"label":"西戌镇",
"value":"52553",
"childrens":[]},
{
"label":"井店镇",
"value":"52554",
"childrens":[]},
{
"label":"更乐镇\\r\\n",
"value":"52555",
"childrens":[]},
{
"label":"西达镇\\r\\n",
"value":"52556",
"childrens":[]},
{
"label":"固新镇",
"value":"52557",
"childrens":[]},
{
"label":"偏城镇",
"value":"52558",
"childrens":[]},
{
"label":"神头乡",
"value":"52559",
"childrens":[]},
{
"label":"辽城乡",
"value":"52560",
"childrens":[]},
{
"label":"偏店乡",
"value":"52561",
"childrens":[]},
{
"label":"龙虎乡\\r\\n",
"value":"52562",
"childrens":[]},
{
"label":"木井乡\\r\\n",
"value":"52563",
"childrens":[]},
{
"label":"关防乡\\r\\n",
"value":"52564",
"childrens":[]},
{
"label":"合漳乡",
"value":"52565",
"childrens":[]},
{
"label":"鹿头乡\\r\\n",
"value":"52566",
"childrens":[]}]},

{
"label":"鸡泽县",
"value":"175",
"childrens":[{
"label":"城区",
"value":"52567",
"childrens":[]},
{
"label":"鸡泽镇",
"value":"52568",
"childrens":[]},
{
"label":"小寨镇\\r\\n",
"value":"52569",
"childrens":[]},
{
"label":"双塔镇\\r\\n",
"value":"52570",
"childrens":[]},
{
"label":"曹庄镇",
"value":"52571",
"childrens":[]},
{
"label":"浮图店乡",
"value":"52572",
"childrens":[]},
{
"label":"吴官营乡",
"value":"52573",
"childrens":[]},
{
"label":"凤正乡",
"value":"52574",
"childrens":[]}]},

{
"label":"邱县",
"value":"176",
"childrens":[{
"label":"城区",
"value":"52575",
"childrens":[]},
{
"label":"新马头镇\\r\\n",
"value":"52576",
"childrens":[]},
{
"label":"香城固镇\\r\\n",
"value":"52577",
"childrens":[]},
{
"label":"梁二庄镇\\r\\n",
"value":"52578",
"childrens":[]},
{
"label":"邱城镇\\r\\n",
"value":"52579",
"childrens":[]},
{
"label":"古城营乡\\r\\n",
"value":"52581",
"childrens":[]},
{
"label":"南辛店乡\\r\\n",
"value":"52583",
"childrens":[]},
{
"label":"陈村乡\\r\\n",
"value":"52584",
"childrens":[]}]},

{
"label":"广平县",
"value":"177",
"childrens":[{
"label":"城区",
"value":"52588",
"childrens":[]},
{
"label":"平固店镇",
"value":"52589",
"childrens":[]},
{
"label":"广平镇\\r\\n",
"value":"52590",
"childrens":[]},
{
"label":"胜营镇\\r\\n",
"value":"52591",
"childrens":[]},
{
"label":"十里铺乡\\r\\n",
"value":"52592",
"childrens":[]},
{
"label":"南韩村乡",
"value":"52593",
"childrens":[]},
{
"label":"南阳堡乡\\r\\n",
"value":"52594",
"childrens":[]},
{
"label":"东张孟乡\\r\\n",
"value":"52595",
"childrens":[]}]},

{
"label":"肥乡县",
"value":"178",
"childrens":[{
"label":"城区",
"value":"52596",
"childrens":[]},
{
"label":"天台山镇\\r\\n",
"value":"52597",
"childrens":[]},
{
"label":"肥乡镇\\r\\n",
"value":"52598",
"childrens":[]},
{
"label":"大西韩乡\\r\\n",
"value":"52599",
"childrens":[]},
{
"label":"辛安镇乡",
"value":"52600",
"childrens":[]},
{
"label":"毛演堡乡\\r\\n",
"value":"52601",
"childrens":[]},
{
"label":"屯庄营乡",
"value":"52603",
"childrens":[]},
{
"label":"东漳堡乡",
"value":"52606",
"childrens":[]},
{
"label":"元固乡",
"value":"52608",
"childrens":[]},
{
"label":"旧店乡",
"value":"52626",
"childrens":[]}]},

{
"label":"磁县",
"value":"180",
"childrens":[{
"label":"城区",
"value":"52627",
"childrens":[]},
{
"label":"讲武城镇\\r\\n",
"value":"52628",
"childrens":[]},
{
"label":"西光录镇",
"value":"52629",
"childrens":[]},
{
"label":"林坦镇",
"value":"52630",
"childrens":[]},
{
"label":"观台镇\\r\\n",
"value":"52631",
"childrens":[]},
{
"label":"高臾镇",
"value":"52632",
"childrens":[]},
{
"label":"岳城镇",
"value":"52633",
"childrens":[]},
{
"label":"白土镇",
"value":"52634",
"childrens":[]},
{
"label":"磁州镇",
"value":"52635",
"childrens":[]},
{
"label":"黄沙镇",
"value":"52636",
"childrens":[]},
{
"label":"时村营乡\\r\\n",
"value":"52637",
"childrens":[]},
{
"label":"辛庄营乡",
"value":"52638",
"childrens":[]},
{
"label":"花官营乡",
"value":"52639",
"childrens":[]},
{
"label":"路村营乡\\r\\n",
"value":"52640",
"childrens":[]},
{
"label":"西固义乡\\r\\n",
"value":"52641",
"childrens":[]},
{
"label":"北贾壁乡\\r\\n",
"value":"52642",
"childrens":[]},
{
"label":"台城乡",
"value":"52643",
"childrens":[]},
{
"label":"都党乡\\r\\n",
"value":"52644",
"childrens":[]},
{
"label":"南城乡",
"value":"52645",
"childrens":[]},
{
"label":"陶泉乡",
"value":"52646",
"childrens":[]}]},

{
"label":"临漳县",
"value":"3077",
"childrens":[]},
{
"label":"永年县",
"value":"3187",
"childrens":[]},
{
"label":"丛台区",
"value":"52386",
"childrens":[]},
{
"label":"邯山区",
"value":"52387",
"childrens":[]},
{
"label":"复兴区",
"value":"52388",
"childrens":[]},
{
"label":"武安市",
"value":"52389",
"childrens":[]}]},

{
"label":"邢台市",
"value":"164",
"childrens":[{
"label":"邢台县",
"value":"183",
"childrens":[]},
{
"label":"南宫市",
"value":"184",
"childrens":[{
"label":"苏村镇",
"value":"5218",
"childrens":[]},
{
"label":"高村镇",
"value":"5219",
"childrens":[]},
{
"label":"垂杨镇",
"value":"5220",
"childrens":[]},
{
"label":"明化镇",
"value":"5221",
"childrens":[]},
{
"label":"段芦头镇",
"value":"5222",
"childrens":[]},
{
"label":"紫冢镇",
"value":"5223",
"childrens":[]},
{
"label":"大村乡",
"value":"5224",
"childrens":[]},
{
"label":"南便乡",
"value":"5225",
"childrens":[]},
{
"label":"大屯乡",
"value":"5226",
"childrens":[]},
{
"label":"王道寨乡",
"value":"5227",
"childrens":[]},
{
"label":"吴村乡",
"value":"5228",
"childrens":[]}]},

{
"label":"沙河市",
"value":"185",
"childrens":[{
"label":"褡裢街道",
"value":"5229",
"childrens":[]},
{
"label":"桥东街道",
"value":"5230",
"childrens":[]},
{
"label":"桥西街道",
"value":"5231",
"childrens":[]},
{
"label":"赞善街道",
"value":"5232",
"childrens":[]},
{
"label":"周庄街道",
"value":"5233",
"childrens":[]},
{
"label":"沙河城镇",
"value":"5234",
"childrens":[]},
{
"label":"新城镇",
"value":"5235",
"childrens":[]},
{
"label":"白塔镇",
"value":"5236",
"childrens":[]},
{
"label":"十里亭镇",
"value":"5237",
"childrens":[]},
{
"label":"綦村镇",
"value":"5238",
"childrens":[]},
{
"label":"留村乡",
"value":"5239",
"childrens":[]},
{
"label":"册井乡",
"value":"5240",
"childrens":[]},
{
"label":"刘石岗乡",
"value":"5241",
"childrens":[]},
{
"label":"柴关乡",
"value":"5242",
"childrens":[]},
{
"label":"蝉房乡",
"value":"5243",
"childrens":[]}]},

{
"label":"柏乡县",
"value":"186",
"childrens":[]},
{
"label":"任县",
"value":"187",
"childrens":[]},
{
"label":"清河县",
"value":"188",
"childrens":[]},
{
"label":"隆尧县",
"value":"189",
"childrens":[]},
{
"label":"临城县",
"value":"190",
"childrens":[]},
{
"label":"广宗县",
"value":"191",
"childrens":[]},
{
"label":"临西县",
"value":"192",
"childrens":[]},
{
"label":"内丘县",
"value":"193",
"childrens":[]},
{
"label":"平乡县",
"value":"194",
"childrens":[]},
{
"label":"巨鹿县",
"value":"195",
"childrens":[]},
{
"label":"新河县",
"value":"196",
"childrens":[]},
{
"label":"南和县",
"value":"197",
"childrens":[]},
{
"label":"宁晋县",
"value":"257",
"childrens":[]},
{
"label":"威县",
"value":"3098",
"childrens":[]},
{
"label":"桥西区",
"value":"52983",
"childrens":[]},
{
"label":"桥东区",
"value":"52984",
"childrens":[]}]},

{
"label":"保定市",
"value":"199",
"childrens":[{
"label":"安国市",
"value":"203",
"childrens":[{
"label":"祁州药市街道",
"value":"5283",
"childrens":[]},
{
"label":"祁州镇",
"value":"5284",
"childrens":[]},
{
"label":"伍仁桥镇",
"value":"5285",
"childrens":[]},
{
"label":"石佛镇",
"value":"5286",
"childrens":[]},
{
"label":"郑章镇",
"value":"5287",
"childrens":[]},
{
"label":"大五女镇",
"value":"5288",
"childrens":[]},
{
"label":"明官店乡",
"value":"5289",
"childrens":[]},
{
"label":"南娄底乡",
"value":"5290",
"childrens":[]},
{
"label":"西安国城乡",
"value":"5291",
"childrens":[]},
{
"label":"西佛落乡",
"value":"5292",
"childrens":[]},
{
"label":"北段村乡",
"value":"5293",
"childrens":[]}]},

{
"label":"满城区",
"value":"205",
"childrens":[]},
{
"label":"清苑县",
"value":"206",
"childrens":[]},
{
"label":"涞水县",
"value":"207",
"childrens":[]},
{
"label":"阜平县",
"value":"208",
"childrens":[]},
{
"label":"定兴县",
"value":"210",
"childrens":[]},
{
"label":"唐县",
"value":"211",
"childrens":[]},
{
"label":"高阳县",
"value":"212",
"childrens":[]},
{
"label":"容城县",
"value":"213",
"childrens":[]},
{
"label":"涞源县",
"value":"214",
"childrens":[]},
{
"label":"望都县",
"value":"215",
"childrens":[]},
{
"label":"易县",
"value":"217",
"childrens":[]},
{
"label":"曲阳县",
"value":"218",
"childrens":[]},
{
"label":"蠡县",
"value":"219",
"childrens":[]},
{
"label":"顺平县",
"value":"220",
"childrens":[]},
{
"label":"博野县",
"value":"221",
"childrens":[]},
{
"label":"雄县",
"value":"222",
"childrens":[]},
{
"label":"新市区",
"value":"3190",
"childrens":[]},
{
"label":"北市区",
"value":"3191",
"childrens":[]},
{
"label":"南市区",
"value":"3192",
"childrens":[]},
{
"label":"安新县",
"value":"3193",
"childrens":[]},
{
"label":"涿州市",
"value":"52988",
"childrens":[]},
{
"label":"定州市",
"value":"52989",
"childrens":[]},
{
"label":"高碑店市",
"value":"52990",
"childrens":[]},
{
"label":"莲池区",
"value":"52991",
"childrens":[]}]},

{
"label":"张家口市",
"value":"224",
"childrens":[{
"label":"宣化县",
"value":"225",
"childrens":[]},
{
"label":"康保县",
"value":"226",
"childrens":[]},
{
"label":"张北县",
"value":"227",
"childrens":[]},
{
"label":"阳原县",
"value":"228",
"childrens":[]},
{
"label":"赤城县",
"value":"229",
"childrens":[]},
{
"label":"怀安县",
"value":"230",
"childrens":[]},
{
"label":"怀来县",
"value":"231",
"childrens":[]},
{
"label":"崇礼县",
"value":"232",
"childrens":[]},
{
"label":"尚义县",
"value":"233",
"childrens":[]},
{
"label":"蔚县",
"value":"234",
"childrens":[]},
{
"label":"涿鹿县",
"value":"235",
"childrens":[]},
{
"label":"万全县",
"value":"236",
"childrens":[]},
{
"label":"下花园区",
"value":"238",
"childrens":[]},
{
"label":"沽源县",
"value":"3156",
"childrens":[]},
{
"label":"宣化区",
"value":"4046",
"childrens":[]},
{
"label":"桥西区",
"value":"52995",
"childrens":[]},
{
"label":"桥东区",
"value":"52996",
"childrens":[]}]},

{
"label":"承德市",
"value":"239",
"childrens":[{
"label":"兴隆县",
"value":"241",
"childrens":[]},
{
"label":"平泉县",
"value":"242",
"childrens":[]},
{
"label":"滦平县",
"value":"243",
"childrens":[]},
{
"label":"丰宁县",
"value":"245",
"childrens":[]},
{
"label":"围场县",
"value":"246",
"childrens":[]},
{
"label":"宽城县",
"value":"247",
"childrens":[]},
{
"label":"隆化县",
"value":"2767",
"childrens":[]},
{
"label":"承德县",
"value":"3092",
"childrens":[]},
{
"label":"双滦区",
"value":"3197",
"childrens":[]},
{
"label":"鹰手营子矿区",
"value":"3198",
"childrens":[]},
{
"label":"双桥区",
"value":"52997",
"childrens":[]}]},

{
"label":"秦皇岛市",
"value":"248",
"childrens":[{
"label":"卢龙县",
"value":"261",
"childrens":[]},
{
"label":"青龙县",
"value":"262",
"childrens":[]},
{
"label":"昌黎县",
"value":"263",
"childrens":[]},
{
"label":"北戴河区",
"value":"2990",
"childrens":[]},
{
"label":"抚宁县",
"value":"4093",
"childrens":[]},
{
"label":"海港区",
"value":"52998",
"childrens":[]},
{
"label":"山海关区",
"value":"52999",
"childrens":[]}]},

{
"label":"唐山市",
"value":"258",
"childrens":[{
"label":"遵化市",
"value":"2756",
"childrens":[{
"label":"遵化镇",
"value":"5071",
"childrens":[]},
{
"label":"堡子店镇",
"value":"5072",
"childrens":[]},
{
"label":"马兰峪镇",
"value":"5073",
"childrens":[]},
{
"label":"平安城镇",
"value":"5074",
"childrens":[]},
{
"label":"东新庄镇",
"value":"5075",
"childrens":[]},
{
"label":"新店子镇",
"value":"5076",
"childrens":[]},
{
"label":"党峪镇",
"value":"5077",
"childrens":[]},
{
"label":"地北头镇",
"value":"5078",
"childrens":[]},
{
"label":"东旧寨镇",
"value":"5079",
"childrens":[]},
{
"label":"铁厂镇",
"value":"5080",
"childrens":[]},
{
"label":"苏家洼镇",
"value":"5081",
"childrens":[]},
{
"label":"建明镇",
"value":"5082",
"childrens":[]},
{
"label":"石门镇",
"value":"5083",
"childrens":[]},
{
"label":"崔家庄乡",
"value":"5084",
"childrens":[]},
{
"label":"西留村乡",
"value":"5085",
"childrens":[]},
{
"label":"西下营乡",
"value":"5086",
"childrens":[]},
{
"label":"汤泉乡",
"value":"5087",
"childrens":[]},
{
"label":"兴旺寨乡",
"value":"5088",
"childrens":[]},
{
"label":"东陵乡",
"value":"5089",
"childrens":[]},
{
"label":"刘备寨乡",
"value":"5090",
"childrens":[]},
{
"label":"团瓢庄乡",
"value":"5091",
"childrens":[]},
{
"label":"娘娘庄乡",
"value":"5092",
"childrens":[]},
{
"label":"西三里乡",
"value":"5093",
"childrens":[]},
{
"label":"侯家寨乡",
"value":"5094",
"childrens":[]},
{
"label":"小厂乡",
"value":"5095",
"childrens":[]}]},

{
"label":"丰南区",
"value":"2757",
"childrens":[]},
{
"label":"迁西县",
"value":"2759",
"childrens":[]},
{
"label":"滦南县",
"value":"2760",
"childrens":[]},
{
"label":"玉田县",
"value":"2762",
"childrens":[]},
{
"label":"曹妃甸区",
"value":"2763",
"childrens":[]},
{
"label":"乐亭县",
"value":"2764",
"childrens":[]},
{
"label":"滦县",
"value":"2765",
"childrens":[]},
{
"label":"古冶区",
"value":"3202",
"childrens":[]},
{
"label":"开平区",
"value":"3203",
"childrens":[]},
{
"label":"路北区",
"value":"53004",
"childrens":[]},
{
"label":"路南区",
"value":"53006",
"childrens":[]},
{
"label":"迁安市",
"value":"53007",
"childrens":[]},
{
"label":"丰润区",
"value":"53008",
"childrens":[]}]},

{
"label":"沧州市",
"value":"264",
"childrens":[{
"label":"沧县",
"value":"265",
"childrens":[]},
{
"label":"泊头市",
"value":"266",
"childrens":[{
"label":"解放街道",
"value":"5115",
"childrens":[]},
{
"label":"河东街道",
"value":"5116",
"childrens":[]},
{
"label":"古楼街道",
"value":"5117",
"childrens":[]},
{
"label":"泊镇",
"value":"5118",
"childrens":[]},
{
"label":"交河镇",
"value":"5119",
"childrens":[]},
{
"label":"齐桥镇",
"value":"5120",
"childrens":[]},
{
"label":"寺门村镇",
"value":"5121",
"childrens":[]},
{
"label":"郝村镇",
"value":"5122",
"childrens":[]},
{
"label":"富镇",
"value":"5123",
"childrens":[]},
{
"label":"文庙镇",
"value":"5124",
"childrens":[]},
{
"label":"洼里王镇",
"value":"5125",
"childrens":[]},
{
"label":"王武镇",
"value":"5126",
"childrens":[]},
{
"label":"营子镇",
"value":"5127",
"childrens":[]},
{
"label":"四营乡",
"value":"5128",
"childrens":[]},
{
"label":"西辛店乡",
"value":"5129",
"childrens":[]}]},

{
"label":"河间市",
"value":"268",
"childrens":[{
"label":"瀛州镇",
"value":"5130",
"childrens":[]},
{
"label":"米各庄镇",
"value":"5131",
"childrens":[]},
{
"label":"景和镇",
"value":"5132",
"childrens":[]},
{
"label":"卧佛堂镇",
"value":"5133",
"childrens":[]},
{
"label":"束城镇",
"value":"5134",
"childrens":[]},
{
"label":"留古寺镇",
"value":"5135",
"childrens":[]},
{
"label":"沙河桥镇",
"value":"5136",
"childrens":[]},
{
"label":"故仙乡",
"value":"5137",
"childrens":[]},
{
"label":"黎民居乡",
"value":"5138",
"childrens":[]},
{
"label":"兴村乡",
"value":"5139",
"childrens":[]},
{
"label":"沙洼乡",
"value":"5140",
"childrens":[]},
{
"label":"西九吉乡",
"value":"5141",
"childrens":[]},
{
"label":"北石槽乡",
"value":"5142",
"childrens":[]},
{
"label":"诗经村乡",
"value":"5143",
"childrens":[]},
{
"label":"郭家村乡",
"value":"5144",
"childrens":[]},
{
"label":"时村乡",
"value":"5145",
"childrens":[]},
{
"label":"行别营乡",
"value":"5146",
"childrens":[]},
{
"label":"尊祖庄乡",
"value":"5147",
"childrens":[]},
{
"label":"龙华店乡",
"value":"5148",
"childrens":[]},
{
"label":"果子洼回族乡",
"value":"5149",
"childrens":[]}]},

{
"label":"献县",
"value":"269",
"childrens":[]},
{
"label":"肃宁县",
"value":"270",
"childrens":[]},
{
"label":"青县",
"value":"271",
"childrens":[]},
{
"label":"东光县",
"value":"272",
"childrens":[]},
{
"label":"吴桥县",
"value":"273",
"childrens":[]},
{
"label":"南皮县",
"value":"276",
"childrens":[]},
{
"label":"盐山县",
"value":"277",
"childrens":[]},
{
"label":"海兴县",
"value":"278",
"childrens":[]},
{
"label":"孟村县",
"value":"279",
"childrens":[]},
{
"label":"运河区",
"value":"53009",
"childrens":[]},
{
"label":"新华区",
"value":"53010",
"childrens":[]},
{
"label":"任丘市",
"value":"53011",
"childrens":[]},
{
"label":"黄骅市",
"value":"53012",
"childrens":[]}]},

{
"label":"廊坊市",
"value":"274",
"childrens":[{
"label":"固安县",
"value":"284",
"childrens":[]},
{
"label":"永清县",
"value":"285",
"childrens":[]},
{
"label":"香河县",
"value":"286",
"childrens":[]},
{
"label":"大城县",
"value":"287",
"childrens":[]},
{
"label":"文安县",
"value":"288",
"childrens":[]},
{
"label":"大厂县",
"value":"289",
"childrens":[]},
{
"label":"安次区",
"value":"3206",
"childrens":[]},
{
"label":"广阳区",
"value":"3207",
"childrens":[]},
{
"label":"开发区",
"value":"4097",
"childrens":[]},
{
"label":"三河市",
"value":"53013",
"childrens":[]},
{
"label":"霸州市",
"value":"53014",
"childrens":[]}]},

{
"label":"衡水市",
"value":"275",
"childrens":[{
"label":"冀州市",
"value":"291",
"childrens":[{
"label":"冀州镇",
"value":"5186",
"childrens":[]},
{
"label":"魏屯镇",
"value":"5187",
"childrens":[]},
{
"label":"官道李镇",
"value":"5188",
"childrens":[]},
{
"label":"南午村镇",
"value":"5189",
"childrens":[]},
{
"label":"周村镇",
"value":"5190",
"childrens":[]},
{
"label":"码头李镇",
"value":"5191",
"childrens":[]},
{
"label":"西王镇",
"value":"5192",
"childrens":[]},
{
"label":"门庄乡",
"value":"5193",
"childrens":[]},
{
"label":"徐家庄乡",
"value":"5194",
"childrens":[]},
{
"label":"北漳淮乡",
"value":"5195",
"childrens":[]},
{
"label":"小寨乡",
"value":"5196",
"childrens":[]}]},

{
"label":"深州市",
"value":"292",
"childrens":[{
"label":"唐奉镇",
"value":"5197",
"childrens":[]},
{
"label":"深州镇",
"value":"5198",
"childrens":[]},
{
"label":"辰时镇",
"value":"5199",
"childrens":[]},
{
"label":"榆科镇",
"value":"5200",
"childrens":[]},
{
"label":"魏桥镇",
"value":"5201",
"childrens":[]},
{
"label":"大堤镇",
"value":"5202",
"childrens":[]},
{
"label":"前磨头镇",
"value":"5203",
"childrens":[]},
{
"label":"王家井镇",
"value":"5204",
"childrens":[]},
{
"label":"护驾迟镇",
"value":"5205",
"childrens":[]},
{
"label":"兵曹乡",
"value":"5206",
"childrens":[]},
{
"label":"穆村乡",
"value":"5207",
"childrens":[]},
{
"label":"东安庄乡",
"value":"5208",
"childrens":[]},
{
"label":"北溪村乡",
"value":"5209",
"childrens":[]},
{
"label":"大冯营乡",
"value":"5210",
"childrens":[]},
{
"label":"乔屯乡",
"value":"5211",
"childrens":[]},
{
"label":"太古庄乡",
"value":"5212",
"childrens":[]},
{
"label":"大屯乡",
"value":"5213",
"childrens":[]}]},

{
"label":"饶阳县",
"value":"293",
"childrens":[]},
{
"label":"枣强县",
"value":"294",
"childrens":[]},
{
"label":"故城县",
"value":"295",
"childrens":[]},
{
"label":"阜城县",
"value":"296",
"childrens":[]},
{
"label":"安平县",
"value":"297",
"childrens":[]},
{
"label":"武邑县",
"value":"298",
"childrens":[]},
{
"label":"景县",
"value":"299",
"childrens":[]},
{
"label":"武强县",
"value":"300",
"childrens":[]},
{
"label":"桃城区",
"value":"53015",
"childrens":[]}]}]},


{
"label":"山西",
"value":"6",
"childrens":[{
"label":"太原市",
"value":"303",
"childrens":[{
"label":"阳曲县",
"value":"304",
"childrens":[]},
{
"label":"古交市",
"value":"305",
"childrens":[{
"label":"东曲街道",
"value":"5318",
"childrens":[]},
{
"label":"西曲街道",
"value":"5319",
"childrens":[]},
{
"label":"桃园街道",
"value":"5320",
"childrens":[]},
{
"label":"屯兰街道",
"value":"5321",
"childrens":[]},
{
"label":"河口镇",
"value":"5322",
"childrens":[]},
{
"label":"镇城底镇",
"value":"5323",
"childrens":[]},
{
"label":"马兰镇",
"value":"5324",
"childrens":[]},
{
"label":"阁上乡",
"value":"5325",
"childrens":[]},
{
"label":"加乐泉乡",
"value":"5326",
"childrens":[]},
{
"label":"梭峪乡",
"value":"5327",
"childrens":[]},
{
"label":"岔口乡",
"value":"5328",
"childrens":[]},
{
"label":"常安乡",
"value":"5329",
"childrens":[]},
{
"label":"原相乡",
"value":"5330",
"childrens":[]},
{
"label":"邢家社乡",
"value":"5331",
"childrens":[]}]},

{
"label":"娄烦县",
"value":"306",
"childrens":[]},
{
"label":"清徐县",
"value":"307",
"childrens":[]},
{
"label":"小店区",
"value":"53515",
"childrens":[]},
{
"label":"迎泽区",
"value":"53516",
"childrens":[]},
{
"label":"晋源区",
"value":"53517",
"childrens":[]},
{
"label":"万柏林区",
"value":"53518",
"childrens":[]},
{
"label":"尖草坪区",
"value":"53519",
"childrens":[]},
{
"label":"杏花岭区",
"value":"53520",
"childrens":[]}]},

{
"label":"大同市",
"value":"309",
"childrens":[{
"label":"大同县",
"value":"310",
"childrens":[]},
{
"label":"天镇县",
"value":"311",
"childrens":[]},
{
"label":"灵丘县",
"value":"312",
"childrens":[]},
{
"label":"阳高县",
"value":"313",
"childrens":[]},
{
"label":"左云县",
"value":"314",
"childrens":[]},
{
"label":"浑源县",
"value":"315",
"childrens":[]},
{
"label":"广灵县",
"value":"316",
"childrens":[]},
{
"label":"新荣区",
"value":"3214",
"childrens":[]},
{
"label":"南郊区",
"value":"3216",
"childrens":[]},
{
"label":"矿区",
"value":"3217",
"childrens":[]},
{
"label":"城区",
"value":"53521",
"childrens":[]}]},

{
"label":"阳泉市",
"value":"318",
"childrens":[{
"label":"盂县",
"value":"319",
"childrens":[]},
{
"label":"平定县",
"value":"320",
"childrens":[]},
{
"label":"郊区",
"value":"321",
"childrens":[]},
{
"label":"矿区",
"value":"3219",
"childrens":[]},
{
"label":"城区",
"value":"53522",
"childrens":[]}]},

{
"label":"晋城市",
"value":"325",
"childrens":[{
"label":"高平市",
"value":"326",
"childrens":[{
"label":"北城街道",
"value":"5332",
"childrens":[]},
{
"label":"东城街道",
"value":"5333",
"childrens":[]},
{
"label":"南城街道",
"value":"5334",
"childrens":[]},
{
"label":"米山镇",
"value":"5335",
"childrens":[]},
{
"label":"三甲镇",
"value":"5336",
"childrens":[]},
{
"label":"陈区镇",
"value":"5337",
"childrens":[]},
{
"label":"北诗镇",
"value":"5338",
"childrens":[]},
{
"label":"河西镇",
"value":"5339",
"childrens":[]},
{
"label":"马村镇",
"value":"5340",
"childrens":[]},
{
"label":"野川镇",
"value":"5341",
"childrens":[]},
{
"label":"寺庄镇",
"value":"5342",
"childrens":[]},
{
"label":"神农镇",
"value":"5343",
"childrens":[]},
{
"label":"建宁乡",
"value":"5344",
"childrens":[]},
{
"label":"石末乡",
"value":"5345",
"childrens":[]},
{
"label":"原村乡",
"value":"5346",
"childrens":[]},
{
"label":"永录乡",
"value":"5347",
"childrens":[]}]},

{
"label":"阳城县",
"value":"327",
"childrens":[]},
{
"label":"沁水县",
"value":"328",
"childrens":[]},
{
"label":"陵川县",
"value":"329",
"childrens":[]},
{
"label":"泽州县",
"value":"2967",
"childrens":[]},
{
"label":"城 区",
"value":"3073",
"childrens":[]}]},

{
"label":"朔州市",
"value":"330",
"childrens":[{
"label":"山阴县",
"value":"331",
"childrens":[]},
{
"label":"右玉县",
"value":"332",
"childrens":[]},
{
"label":"应县",
"value":"333",
"childrens":[]},
{
"label":"怀仁县",
"value":"334",
"childrens":[]},
{
"label":"朔城区",
"value":"335",
"childrens":[]},
{
"label":"平鲁区",
"value":"3118",
"childrens":[]}]},

{
"label":"晋中市",
"value":"336",
"childrens":[{
"label":"介休市",
"value":"338",
"childrens":[{
"label":"北关街道",
"value":"5348",
"childrens":[]},
{
"label":"西关街道",
"value":"5349",
"childrens":[]},
{
"label":"东南街道",
"value":"5350",
"childrens":[]},
{
"label":"西南街道",
"value":"5351",
"childrens":[]},
{
"label":"北坛街道",
"value":"5352",
"childrens":[]},
{
"label":"义安镇",
"value":"5353",
"childrens":[]},
{
"label":"张兰镇",
"value":"5354",
"childrens":[]},
{
"label":"连福镇",
"value":"5355",
"childrens":[]},
{
"label":"洪山镇",
"value":"5356",
"childrens":[]},
{
"label":"龙凤镇",
"value":"5357",
"childrens":[]},
{
"label":"绵山镇",
"value":"5358",
"childrens":[]},
{
"label":"义棠镇",
"value":"5359",
"childrens":[]},
{
"label":"城关乡",
"value":"5360",
"childrens":[]},
{
"label":"宋古乡",
"value":"5361",
"childrens":[]},
{
"label":"三佳乡",
"value":"5362",
"childrens":[]}]},

{
"label":"昔阳县",
"value":"339",
"childrens":[]},
{
"label":"祁县",
"value":"341",
"childrens":[]},
{
"label":"左权县",
"value":"342",
"childrens":[]},
{
"label":"寿阳县",
"value":"343",
"childrens":[]},
{
"label":"太谷县",
"value":"344",
"childrens":[]},
{
"label":"和顺县",
"value":"345",
"childrens":[]},
{
"label":"灵石县",
"value":"346",
"childrens":[]},
{
"label":"平遥县",
"value":"347",
"childrens":[]},
{
"label":"榆社县",
"value":"348",
"childrens":[]},
{
"label":"榆次区",
"value":"53523",
"childrens":[]}]},

{
"label":"忻州市",
"value":"350",
"childrens":[{
"label":"原平市",
"value":"351",
"childrens":[{
"label":"北城街道",
"value":"5363",
"childrens":[]},
{
"label":"南城街道",
"value":"5364",
"childrens":[]},
{
"label":"东社镇",
"value":"5365",
"childrens":[]},
{
"label":"苏龙口镇",
"value":"5366",
"childrens":[]},
{
"label":"崞阳镇",
"value":"5367",
"childrens":[]},
{
"label":"大牛店镇",
"value":"5368",
"childrens":[]},
{
"label":"长梁沟镇",
"value":"5370",
"childrens":[]},
{
"label":"轩岗镇",
"value":"5371",
"childrens":[]},
{
"label":"新原乡",
"value":"5372",
"childrens":[]},
{
"label":"南白乡",
"value":"5373",
"childrens":[]},
{
"label":"子干乡",
"value":"5374",
"childrens":[]},
{
"label":"沿沟乡",
"value":"5376",
"childrens":[]},
{
"label":"大林乡",
"value":"5377",
"childrens":[]},
{
"label":"西镇乡",
"value":"5378",
"childrens":[]},
{
"label":"解村乡",
"value":"5379",
"childrens":[]},
{
"label":"王家庄乡",
"value":"5380",
"childrens":[]},
{
"label":"楼板寨乡",
"value":"5381",
"childrens":[]},
{
"label":"段家堡乡",
"value":"5382",
"childrens":[]}]},

{
"label":"代县",
"value":"352",
"childrens":[]},
{
"label":"神池县",
"value":"353",
"childrens":[]},
{
"label":"五寨县",
"value":"354",
"childrens":[]},
{
"label":"五台县",
"value":"358",
"childrens":[]},
{
"label":"偏关县",
"value":"359",
"childrens":[]},
{
"label":"宁武县",
"value":"360",
"childrens":[]},
{
"label":"静乐县",
"value":"361",
"childrens":[]},
{
"label":"繁峙县",
"value":"362",
"childrens":[]},
{
"label":"河曲县",
"value":"363",
"childrens":[]},
{
"label":"保德县",
"value":"364",
"childrens":[]},
{
"label":"定襄县",
"value":"365",
"childrens":[]},
{
"label":"忻府区",
"value":"366",
"childrens":[]},
{
"label":"岢岚县",
"value":"367",
"childrens":[]}]},

{
"label":"吕梁市",
"value":"368",
"childrens":[{
"label":"离石区",
"value":"369",
"childrens":[]},
{
"label":"孝义市",
"value":"370",
"childrens":[{
"label":"新义街道",
"value":"5383",
"childrens":[]},
{
"label":"中阳楼街道",
"value":"5384",
"childrens":[]},
{
"label":"振兴街道",
"value":"5385",
"childrens":[]},
{
"label":"阳泉曲镇",
"value":"5387",
"childrens":[]},
{
"label":"下堡镇",
"value":"5388",
"childrens":[]},
{
"label":"西辛庄镇",
"value":"5389",
"childrens":[]},
{
"label":"高阳镇",
"value":"5390",
"childrens":[]},
{
"label":"梧桐镇",
"value":"5391",
"childrens":[]},
{
"label":"柱濮镇",
"value":"5392",
"childrens":[]},
{
"label":"大孝堡乡",
"value":"5393",
"childrens":[]},
{
"label":"下栅乡",
"value":"5394",
"childrens":[]},
{
"label":"驿马乡",
"value":"5395",
"childrens":[]},
{
"label":"南阳乡",
"value":"5396",
"childrens":[]},
{
"label":"杜村乡",
"value":"5397",
"childrens":[]}]},

{
"label":"汾阳市",
"value":"371",
"childrens":[{
"label":"文峰街道",
"value":"5398",
"childrens":[]},
{
"label":"太和桥街道",
"value":"5399",
"childrens":[]},
{
"label":"贾家庄镇",
"value":"5400",
"childrens":[]},
{
"label":"杏花村镇",
"value":"5401",
"childrens":[]},
{
"label":"冀村镇",
"value":"5402",
"childrens":[]},
{
"label":"肖家庄镇",
"value":"5403",
"childrens":[]},
{
"label":"演武镇",
"value":"5404",
"childrens":[]},
{
"label":"三泉镇",
"value":"5405",
"childrens":[]},
{
"label":"石庄镇",
"value":"5406",
"childrens":[]},
{
"label":"杨家庄镇",
"value":"5407",
"childrens":[]},
{
"label":"峪道河镇",
"value":"5408",
"childrens":[]},
{
"label":"西河乡",
"value":"5409",
"childrens":[]},
{
"label":"阳城乡",
"value":"5410",
"childrens":[]},
{
"label":"栗家庄乡",
"value":"5411",
"childrens":[]}]},

{
"label":"文水县",
"value":"372",
"childrens":[]},
{
"label":"中阳县",
"value":"373",
"childrens":[]},
{
"label":"兴县",
"value":"374",
"childrens":[]},
{
"label":"临县",
"value":"375",
"childrens":[]},
{
"label":"方山县",
"value":"376",
"childrens":[]},
{
"label":"柳林县",
"value":"377",
"childrens":[]},
{
"label":"岚县",
"value":"378",
"childrens":[]},
{
"label":"交口县",
"value":"3235",
"childrens":[]},
{
"label":"交城县",
"value":"3236",
"childrens":[]},
{
"label":"石楼县",
"value":"3237",
"childrens":[]}]},

{
"label":"临汾市",
"value":"379",
"childrens":[{
"label":"侯马市",
"value":"380",
"childrens":[{
"label":"路东街道",
"value":"5412",
"childrens":[]},
{
"label":"路西街道",
"value":"5413",
"childrens":[]},
{
"label":"浍滨街道",
"value":"5414",
"childrens":[]},
{
"label":"上马街道",
"value":"5415",
"childrens":[]},
{
"label":"张村街道",
"value":"5416",
"childrens":[]},
{
"label":"新田乡",
"value":"5417",
"childrens":[]},
{
"label":"高村乡",
"value":"5418",
"childrens":[]},
{
"label":"凤城乡",
"value":"5419",
"childrens":[]}]},

{
"label":"霍州市",
"value":"381",
"childrens":[{
"label":"鼓楼街道",
"value":"5420",
"childrens":[]},
{
"label":"北环路街道",
"value":"5421",
"childrens":[]},
{
"label":"南环路街道",
"value":"5422",
"childrens":[]},
{
"label":"开元街道",
"value":"5423",
"childrens":[]},
{
"label":"退沙街道",
"value":"5424",
"childrens":[]},
{
"label":"白龙镇",
"value":"5425",
"childrens":[]},
{
"label":"辛置镇",
"value":"5426",
"childrens":[]},
{
"label":"大张镇",
"value":"5427",
"childrens":[]},
{
"label":"李曹镇",
"value":"5428",
"childrens":[]},
{
"label":"陶唐峪乡",
"value":"5429",
"childrens":[]},
{
"label":"三教乡",
"value":"5430",
"childrens":[]},
{
"label":"师庄乡",
"value":"5431",
"childrens":[]}]},

{
"label":"汾西县",
"value":"382",
"childrens":[]},
{
"label":"吉县",
"value":"383",
"childrens":[]},
{
"label":"安泽县",
"value":"384",
"childrens":[]},
{
"label":"浮山县",
"value":"386",
"childrens":[]},
{
"label":"大宁县",
"value":"387",
"childrens":[]},
{
"label":"古县",
"value":"388",
"childrens":[]},
{
"label":"隰县",
"value":"389",
"childrens":[]},
{
"label":"襄汾县",
"value":"390",
"childrens":[]},
{
"label":"翼城县",
"value":"391",
"childrens":[]},
{
"label":"永和县",
"value":"392",
"childrens":[]},
{
"label":"乡宁县",
"value":"393",
"childrens":[]},
{
"label":"洪洞县",
"value":"395",
"childrens":[]},
{
"label":"蒲县",
"value":"396",
"childrens":[]},
{
"label":"曲沃县",
"value":"3136",
"childrens":[]},
{
"label":"尧都区",
"value":"53524",
"childrens":[]}]},

{
"label":"运城市",
"value":"398",
"childrens":[{
"label":"河津市",
"value":"399",
"childrens":[{
"label":"城区街道",
"value":"5432",
"childrens":[]},
{
"label":"清涧街道",
"value":"5433",
"childrens":[]},
{
"label":"樊村镇",
"value":"5434",
"childrens":[]},
{
"label":"僧楼镇",
"value":"5435",
"childrens":[]},
{
"label":"小梁乡",
"value":"5436",
"childrens":[]},
{
"label":"柴家乡",
"value":"5437",
"childrens":[]},
{
"label":"赵家庄乡",
"value":"5438",
"childrens":[]},
{
"label":"下化乡",
"value":"5439",
"childrens":[]},
{
"label":"阳村乡",
"value":"5440",
"childrens":[]}]},

{
"label":"永济市",
"value":"400",
"childrens":[{
"label":"城西街道",
"value":"5441",
"childrens":[]},
{
"label":"城北街道",
"value":"5442",
"childrens":[]},
{
"label":"城东街道",
"value":"5443",
"childrens":[]},
{
"label":"虞乡镇",
"value":"5444",
"childrens":[]},
{
"label":"卿头镇",
"value":"5445",
"childrens":[]},
{
"label":"开张镇",
"value":"5446",
"childrens":[]},
{
"label":"枵栳镇",
"value":"5447",
"childrens":[]},
{
"label":"蒲州镇",
"value":"5448",
"childrens":[]},
{
"label":"韩阳镇",
"value":"5449",
"childrens":[]},
{
"label":"张营镇",
"value":"5450",
"childrens":[]}]},

{
"label":"新绛县",
"value":"402",
"childrens":[]},
{
"label":"平陆县",
"value":"403",
"childrens":[]},
{
"label":"垣曲县",
"value":"404",
"childrens":[]},
{
"label":"绛县",
"value":"405",
"childrens":[]},
{
"label":"稷山县",
"value":"406",
"childrens":[]},
{
"label":"芮城县",
"value":"407",
"childrens":[]},
{
"label":"夏县",
"value":"408",
"childrens":[]},
{
"label":"临猗县",
"value":"409",
"childrens":[]},
{
"label":"万荣县",
"value":"410",
"childrens":[]},
{
"label":"闻喜县",
"value":"3233",
"childrens":[]},
{
"label":"盐湖区",
"value":"53525",
"childrens":[]}]},

{
"label":"长治市",
"value":"3074",
"childrens":[{
"label":"长治县",
"value":"3075",
"childrens":[]},
{
"label":"潞城市",
"value":"3109",
"childrens":[{
"label":"潞华街道",
"value":"5309",
"childrens":[]},
{
"label":"成家川街道",
"value":"5310",
"childrens":[]},
{
"label":"店上镇",
"value":"5311",
"childrens":[]},
{
"label":"微子镇",
"value":"5312",
"childrens":[]},
{
"label":"辛安泉镇",
"value":"5313",
"childrens":[]},
{
"label":"翟店镇",
"value":"5314",
"childrens":[]},
{
"label":"合室乡",
"value":"5315",
"childrens":[]},
{
"label":"黄牛蹄乡",
"value":"5316",
"childrens":[]},
{
"label":"史迥乡",
"value":"5317",
"childrens":[]}]},

{
"label":"郊区",
"value":"3222",
"childrens":[]},
{
"label":"襄垣县",
"value":"3223",
"childrens":[]},
{
"label":"屯留县",
"value":"3224",
"childrens":[]},
{
"label":"平顺县",
"value":"3225",
"childrens":[]},
{
"label":"黎城县",
"value":"3226",
"childrens":[]},
{
"label":"壶关县",
"value":"3227",
"childrens":[]},
{
"label":"长子县",
"value":"3228",
"childrens":[]},
{
"label":"武乡县",
"value":"3229",
"childrens":[]},
{
"label":"沁县",
"value":"3230",
"childrens":[]},
{
"label":"沁源县",
"value":"3231",
"childrens":[]},
{
"label":"城区",
"value":"53526",
"childrens":[]}]}]},


{
"label":"河南",
"value":"7",
"childrens":[{
"label":"郑州市",
"value":"412",
"childrens":[{
"label":"新密市",
"value":"415",
"childrens":[]},
{
"label":"登封市",
"value":"416",
"childrens":[]},
{
"label":"上街区",
"value":"2782",
"childrens":[]},
{
"label":"惠济区",
"value":"3544",
"childrens":[]},
{
"label":"金水区",
"value":"3545",
"childrens":[]},
{
"label":"管城区",
"value":"3546",
"childrens":[]},
{
"label":"二七区",
"value":"3547",
"childrens":[]},
{
"label":"中原区",
"value":"3548",
"childrens":[]},
{
"label":"郑东新区",
"value":"4337",
"childrens":[]},
{
"label":"新郑区",
"value":"53175",
"childrens":[]},
{
"label":"巩义市",
"value":"53176",
"childrens":[]},
{
"label":"荥阳区",
"value":"53177",
"childrens":[]},
{
"label":"中牟县",
"value":"53178",
"childrens":[]},
{
"label":"经济开发区",
"value":"53179",
"childrens":[]},
{
"label":"高新技术开发区",
"value":"53180",
"childrens":[]}]},

{
"label":"开封市",
"value":"420",
"childrens":[{
"label":"开封县",
"value":"421",
"childrens":[]},
{
"label":"杞县",
"value":"422",
"childrens":[]},
{
"label":"兰考县",
"value":"423",
"childrens":[]},
{
"label":"尉氏县",
"value":"425",
"childrens":[]},
{
"label":"通许县",
"value":"3127",
"childrens":[]},
{
"label":"金明区",
"value":"53181",
"childrens":[]},
{
"label":"龙亭区",
"value":"53182",
"childrens":[]},
{
"label":"顺河区",
"value":"53183",
"childrens":[]},
{
"label":"鼓楼区",
"value":"53184",
"childrens":[]},
{
"label":"禹王台区",
"value":"53185",
"childrens":[]}]},

{
"label":"洛阳市",
"value":"427",
"childrens":[{
"label":"偃师市",
"value":"428",
"childrens":[{
"label":"城关镇",
"value":"5684",
"childrens":[]},
{
"label":"首阳山镇",
"value":"5685",
"childrens":[]},
{
"label":"翟镇镇",
"value":"5687",
"childrens":[]},
{
"label":"岳滩镇",
"value":"5688",
"childrens":[]},
{
"label":"顾县镇",
"value":"5689",
"childrens":[]},
{
"label":"缑氏镇",
"value":"5690",
"childrens":[]},
{
"label":"府店镇",
"value":"5691",
"childrens":[]},
{
"label":"高龙镇",
"value":"5692",
"childrens":[]},
{
"label":"诸葛镇",
"value":"5696",
"childrens":[]},
{
"label":"山化乡",
"value":"5697",
"childrens":[]},
{
"label":"邙岭乡",
"value":"5698",
"childrens":[]},
{
"label":"大口乡",
"value":"5699",
"childrens":[]}]},

{
"label":"孟津县",
"value":"429",
"childrens":[]},
{
"label":"汝阳县",
"value":"430",
"childrens":[]},
{
"label":"伊川县",
"value":"431",
"childrens":[]},
{
"label":"洛宁县",
"value":"432",
"childrens":[]},
{
"label":"宜阳县",
"value":"434",
"childrens":[]},
{
"label":"栾川县",
"value":"435",
"childrens":[]},
{
"label":"新安县",
"value":"436",
"childrens":[]},
{
"label":"吉利区",
"value":"3555",
"childrens":[]},
{
"label":"涧西区",
"value":"3556",
"childrens":[]},
{
"label":"瀍河区",
"value":"3557",
"childrens":[]},
{
"label":"老城区",
"value":"3558",
"childrens":[]},
{
"label":"西工区",
"value":"3559",
"childrens":[]},
{
"label":"嵩县",
"value":"4150",
"childrens":[]},
{
"label":"伊滨区",
"value":"53186",
"childrens":[]},
{
"label":"洛龙区",
"value":"53187",
"childrens":[]}]},

{
"label":"平顶山市",
"value":"438",
"childrens":[{
"label":"汝州市",
"value":"439",
"childrens":[{
"label":"煤山街道",
"value":"5700",
"childrens":[]},
{
"label":"风穴路街道",
"value":"5701",
"childrens":[]},
{
"label":"钟楼街道",
"value":"5702",
"childrens":[]},
{
"label":"洗耳河街道",
"value":"5703",
"childrens":[]},
{
"label":"汝南街道",
"value":"5704",
"childrens":[]},
{
"label":"寄料镇",
"value":"5705",
"childrens":[]},
{
"label":"温泉镇",
"value":"5706",
"childrens":[]},
{
"label":"临汝镇",
"value":"5707",
"childrens":[]},
{
"label":"小屯镇",
"value":"5708",
"childrens":[]},
{
"label":"杨楼镇",
"value":"5709",
"childrens":[]},
{
"label":"蟒川镇",
"value":"5710",
"childrens":[]},
{
"label":"王寨乡",
"value":"5711",
"childrens":[]},
{
"label":"陵头镇",
"value":"5712",
"childrens":[]},
{
"label":"庙下乡",
"value":"5713",
"childrens":[]},
{
"label":"纸坊乡",
"value":"5714",
"childrens":[]},
{
"label":"米庙镇",
"value":"5715",
"childrens":[]},
{
"label":"骑岭乡",
"value":"5716",
"childrens":[]},
{
"label":"大峪乡",
"value":"5717",
"childrens":[]},
{
"label":"夏店乡",
"value":"5718",
"childrens":[]},
{
"label":"焦村乡",
"value":"5719",
"childrens":[]}]},

{
"label":"舞钢市",
"value":"440",
"childrens":[{
"label":"垭口街道",
"value":"5720",
"childrens":[]},
{
"label":"寺坡街道",
"value":"5721",
"childrens":[]},
{
"label":"朱兰街道",
"value":"5722",
"childrens":[]},
{
"label":"院岭街道",
"value":"5723",
"childrens":[]},
{
"label":"尚店镇",
"value":"5724",
"childrens":[]},
{
"label":"八台镇",
"value":"5725",
"childrens":[]},
{
"label":"尹集镇",
"value":"5726",
"childrens":[]},
{
"label":"枣林乡",
"value":"5727",
"childrens":[]},
{
"label":"庙街乡",
"value":"5728",
"childrens":[]},
{
"label":"铁山乡",
"value":"5729",
"childrens":[]},
{
"label":"武功乡",
"value":"5730",
"childrens":[]},
{
"label":"杨庄乡",
"value":"5731",
"childrens":[]}]},

{
"label":"郏县",
"value":"441",
"childrens":[]},
{
"label":"叶县",
"value":"442",
"childrens":[]},
{
"label":"鲁山县",
"value":"443",
"childrens":[]},
{
"label":"宝丰县",
"value":"444",
"childrens":[]},
{
"label":"石龙区",
"value":"3560",
"childrens":[]},
{
"label":"湛河区",
"value":"53188",
"childrens":[]},
{
"label":"卫东区",
"value":"53189",
"childrens":[]},
{
"label":"新华区",
"value":"53190",
"childrens":[]}]},

{
"label":"焦作市",
"value":"446",
"childrens":[{
"label":"沁阳市",
"value":"447",
"childrens":[{
"label":"覃怀街道",
"value":"5732",
"childrens":[]},
{
"label":"怀庆街道",
"value":"5733",
"childrens":[]},
{
"label":"太行街道",
"value":"5734",
"childrens":[]},
{
"label":"沁园街道",
"value":"5735",
"childrens":[]},
{
"label":"崇义镇",
"value":"5736",
"childrens":[]},
{
"label":"西向镇",
"value":"5737",
"childrens":[]},
{
"label":"西万镇",
"value":"5738",
"childrens":[]},
{
"label":"柏香镇",
"value":"5739",
"childrens":[]},
{
"label":"山王庄镇",
"value":"5740",
"childrens":[]},
{
"label":"紫陵镇",
"value":"5741",
"childrens":[]},
{
"label":"常平乡",
"value":"5742",
"childrens":[]},
{
"label":"王召乡",
"value":"5743",
"childrens":[]},
{
"label":"王曲乡",
"value":"5744",
"childrens":[]}]},

{
"label":"孟州市",
"value":"448",
"childrens":[{
"label":"大定街道",
"value":"5745",
"childrens":[]},
{
"label":"会昌街道",
"value":"5746",
"childrens":[]},
{
"label":"河阳街道",
"value":"5747",
"childrens":[]},
{
"label":"河雍街道",
"value":"5748",
"childrens":[]},
{
"label":"化工镇",
"value":"5749",
"childrens":[]},
{
"label":"南庄镇",
"value":"5750",
"childrens":[]},
{
"label":"城伯镇",
"value":"5751",
"childrens":[]},
{
"label":"谷旦镇",
"value":"5752",
"childrens":[]},
{
"label":"西虢镇",
"value":"5753",
"childrens":[]},
{
"label":"赵和镇",
"value":"5754",
"childrens":[]},
{
"label":"槐树乡",
"value":"5755",
"childrens":[]}]},

{
"label":"修武县",
"value":"449",
"childrens":[]},
{
"label":"温县",
"value":"450",
"childrens":[]},
{
"label":"武陟县",
"value":"451",
"childrens":[]},
{
"label":"博爱县",
"value":"452",
"childrens":[]},
{
"label":"山阳区",
"value":"453",
"childrens":[]},
{
"label":"解放区",
"value":"3566",
"childrens":[]},
{
"label":"马村区",
"value":"53191",
"childrens":[]},
{
"label":"中站区",
"value":"53192",
"childrens":[]}]},

{
"label":"鹤壁市",
"value":"454",
"childrens":[{
"label":"浚县",
"value":"455",
"childrens":[]},
{
"label":"淇县",
"value":"456",
"childrens":[]},
{
"label":"鹤山区",
"value":"457",
"childrens":[]},
{
"label":"山城区",
"value":"3567",
"childrens":[]},
{
"label":"淇滨区",
"value":"53193",
"childrens":[]}]},

{
"label":"新乡市",
"value":"458",
"childrens":[{
"label":"卫辉市",
"value":"459",
"childrens":[{
"label":"汲水镇",
"value":"5756",
"childrens":[]},
{
"label":"太公泉镇",
"value":"5757",
"childrens":[]},
{
"label":"孙杏村镇",
"value":"5758",
"childrens":[]},
{
"label":"后河镇",
"value":"5759",
"childrens":[]},
{
"label":"李源屯镇",
"value":"5760",
"childrens":[]},
{
"label":"唐庄镇",
"value":"5761",
"childrens":[]},
{
"label":"上乐村镇",
"value":"5762",
"childrens":[]},
{
"label":"狮豹头乡",
"value":"5763",
"childrens":[]},
{
"label":"安都乡",
"value":"5764",
"childrens":[]},
{
"label":"顿坊店乡",
"value":"5765",
"childrens":[]},
{
"label":"柳庄乡",
"value":"5766",
"childrens":[]},
{
"label":"庞寨乡",
"value":"5767",
"childrens":[]},
{
"label":"城郊乡",
"value":"5768",
"childrens":[]}]},

{
"label":"辉县市",
"value":"460",
"childrens":[{
"label":"城关街道",
"value":"5769",
"childrens":[]},
{
"label":"胡桥街道",
"value":"5770",
"childrens":[]},
{
"label":"薄壁镇",
"value":"5771",
"childrens":[]},
{
"label":"峪河镇",
"value":"5772",
"childrens":[]},
{
"label":"百泉镇",
"value":"5773",
"childrens":[]},
{
"label":"孟庄镇",
"value":"5774",
"childrens":[]},
{
"label":"常村镇",
"value":"5775",
"childrens":[]},
{
"label":"吴村镇",
"value":"5776",
"childrens":[]},
{
"label":"南村镇",
"value":"5777",
"childrens":[]},
{
"label":"南寨镇",
"value":"5778",
"childrens":[]},
{
"label":"上八里镇",
"value":"5779",
"childrens":[]},
{
"label":"北云门镇",
"value":"5780",
"childrens":[]},
{
"label":"占城镇",
"value":"5781",
"childrens":[]},
{
"label":"黄水乡",
"value":"5782",
"childrens":[]},
{
"label":"高庄乡",
"value":"5783",
"childrens":[]},
{
"label":"张村乡",
"value":"5784",
"childrens":[]},
{
"label":"洪洲乡",
"value":"5785",
"childrens":[]},
{
"label":"西平罗乡",
"value":"5786",
"childrens":[]},
{
"label":"拍石头乡",
"value":"5787",
"childrens":[]},
{
"label":"赵固乡",
"value":"5788",
"childrens":[]},
{
"label":"沙窑乡",
"value":"5789",
"childrens":[]},
{
"label":"冀屯镇",
"value":"5790",
"childrens":[]}]},

{
"label":"新乡县",
"value":"461",
"childrens":[]},
{
"label":"获嘉县",
"value":"462",
"childrens":[]},
{
"label":"原阳县",
"value":"463",
"childrens":[]},
{
"label":"长垣县",
"value":"464",
"childrens":[]},
{
"label":"延津县",
"value":"465",
"childrens":[]},
{
"label":"封丘县",
"value":"466",
"childrens":[]},
{
"label":"凤泉区",
"value":"3570",
"childrens":[]},
{
"label":"牧野区",
"value":"53194",
"childrens":[]},
{
"label":"红旗区",
"value":"53195",
"childrens":[]},
{
"label":"卫滨区",
"value":"53196",
"childrens":[]}]},

{
"label":"安阳市",
"value":"468",
"childrens":[{
"label":"林州市",
"value":"469",
"childrens":[{
"label":"开元街道",
"value":"5622",
"childrens":[]},
{
"label":"振林街道",
"value":"5623",
"childrens":[]},
{
"label":"龙山街道",
"value":"5624",
"childrens":[]},
{
"label":"桂园街道",
"value":"5625",
"childrens":[]},
{
"label":"合涧镇",
"value":"5626",
"childrens":[]},
{
"label":"临淇镇",
"value":"5627",
"childrens":[]},
{
"label":"东姚镇",
"value":"5628",
"childrens":[]},
{
"label":"横水镇",
"value":"5629",
"childrens":[]},
{
"label":"河顺镇",
"value":"5630",
"childrens":[]},
{
"label":"任村镇",
"value":"5631",
"childrens":[]},
{
"label":"姚村镇",
"value":"5632",
"childrens":[]},
{
"label":"陵阳镇",
"value":"5633",
"childrens":[]},
{
"label":"原康镇",
"value":"5634",
"childrens":[]},
{
"label":"五龙镇",
"value":"5635",
"childrens":[]},
{
"label":"采桑镇",
"value":"5636",
"childrens":[]},
{
"label":"东岗镇",
"value":"5637",
"childrens":[]},
{
"label":"桂林镇",
"value":"5638",
"childrens":[]},
{
"label":"城郊乡",
"value":"5639",
"childrens":[]},
{
"label":"茶店乡",
"value":"5640",
"childrens":[]},
{
"label":"石板岩乡",
"value":"5641",
"childrens":[]}]},

{
"label":"安阳县",
"value":"470",
"childrens":[]},
{
"label":"滑县",
"value":"471",
"childrens":[]},
{
"label":"汤阴县",
"value":"472",
"childrens":[]},
{
"label":"内黄县",
"value":"473",
"childrens":[]},
{
"label":"龙安区",
"value":"53197",
"childrens":[]},
{
"label":"殷都区",
"value":"53198",
"childrens":[]},
{
"label":"文峰区",
"value":"53199",
"childrens":[]},
{
"label":"开发区",
"value":"53200",
"childrens":[]},
{
"label":"北关区",
"value":"53201",
"childrens":[]}]},

{
"label":"濮阳市",
"value":"475",
"childrens":[{
"label":"濮阳县",
"value":"476",
"childrens":[]},
{
"label":"南乐县",
"value":"477",
"childrens":[]},
{
"label":"台前县",
"value":"478",
"childrens":[]},
{
"label":"清丰县",
"value":"479",
"childrens":[]},
{
"label":"范县",
"value":"480",
"childrens":[]},
{
"label":"华龙区",
"value":"481",
"childrens":[]}]},

{
"label":"许昌市",
"value":"482",
"childrens":[{
"label":"禹州市",
"value":"483",
"childrens":[{
"label":"颍川街道",
"value":"5642",
"childrens":[]},
{
"label":"夏都街道",
"value":"5643",
"childrens":[]},
{
"label":"韩城街道",
"value":"5644",
"childrens":[]},
{
"label":"钧台街道",
"value":"5645",
"childrens":[]},
{
"label":"火龙镇",
"value":"5646",
"childrens":[]},
{
"label":"顺店镇",
"value":"5647",
"childrens":[]},
{
"label":"方山镇",
"value":"5648",
"childrens":[]},
{
"label":"神垕镇",
"value":"5649",
"childrens":[]},
{
"label":"鸿畅镇",
"value":"5650",
"childrens":[]},
{
"label":"梁北镇",
"value":"5651",
"childrens":[]},
{
"label":"古城镇",
"value":"5652",
"childrens":[]},
{
"label":"无梁镇",
"value":"5653",
"childrens":[]},
{
"label":"文殊镇",
"value":"5654",
"childrens":[]},
{
"label":"朱阁镇",
"value":"5655",
"childrens":[]},
{
"label":"苌庄乡",
"value":"5656",
"childrens":[]},
{
"label":"花石乡",
"value":"5657",
"childrens":[]},
{
"label":"鸠山镇",
"value":"5658",
"childrens":[]},
{
"label":"磨街乡",
"value":"5659",
"childrens":[]},
{
"label":"张得乡",
"value":"5660",
"childrens":[]},
{
"label":"小吕乡",
"value":"5661",
"childrens":[]},
{
"label":"范坡镇",
"value":"5662",
"childrens":[]},
{
"label":"褚河镇",
"value":"5663",
"childrens":[]},
{
"label":"郭连镇",
"value":"5664",
"childrens":[]},
{
"label":"山货乡",
"value":"5665",
"childrens":[]},
{
"label":"浅井镇",
"value":"5666",
"childrens":[]},
{
"label":"方岗乡",
"value":"5667",
"childrens":[]}]},

{
"label":"长葛市",
"value":"484",
"childrens":[{
"label":"建设路街道",
"value":"5668",
"childrens":[]},
{
"label":"长兴路街道",
"value":"5669",
"childrens":[]},
{
"label":"长社路街道",
"value":"5670",
"childrens":[]},
{
"label":"金桥路街道",
"value":"5671",
"childrens":[]},
{
"label":"和尚桥镇",
"value":"5672",
"childrens":[]},
{
"label":"坡胡镇",
"value":"5673",
"childrens":[]},
{
"label":"后河镇",
"value":"5674",
"childrens":[]},
{
"label":"石固镇",
"value":"5675",
"childrens":[]},
{
"label":"老城镇",
"value":"5676",
"childrens":[]},
{
"label":"南席镇",
"value":"5677",
"childrens":[]},
{
"label":"大周镇",
"value":"5678",
"childrens":[]},
{
"label":"董村镇",
"value":"5679",
"childrens":[]},
{
"label":"增福庙乡",
"value":"5680",
"childrens":[]},
{
"label":"官亭乡",
"value":"5681",
"childrens":[]},
{
"label":"石象乡",
"value":"5682",
"childrens":[]},
{
"label":"古桥乡",
"value":"5683",
"childrens":[]}]},

{
"label":"许昌县",
"value":"485",
"childrens":[]},
{
"label":"鄢陵县",
"value":"486",
"childrens":[]},
{
"label":"襄城县",
"value":"487",
"childrens":[]},
{
"label":"魏都区",
"value":"488",
"childrens":[]}]},

{
"label":"漯河市",
"value":"489",
"childrens":[{
"label":"郾城区",
"value":"490",
"childrens":[]},
{
"label":"临颍县",
"value":"492",
"childrens":[]},
{
"label":"召陵区",
"value":"493",
"childrens":[]},
{
"label":"舞阳县",
"value":"494",
"childrens":[]},
{
"label":"源汇区",
"value":"3576",
"childrens":[]}]},

{
"label":"三门峡市",
"value":"495",
"childrens":[{
"label":"义马市",
"value":"496",
"childrens":[{
"label":"千秋路街道",
"value":"5841",
"childrens":[]},
{
"label":"朝阳路街道",
"value":"5842",
"childrens":[]},
{
"label":"新义街街道",
"value":"5843",
"childrens":[]},
{
"label":"常村路街道",
"value":"5844",
"childrens":[]},
{
"label":"泰山路街道",
"value":"5845",
"childrens":[]},
{
"label":"新区街道",
"value":"5846",
"childrens":[]},
{
"label":"东区街道",
"value":"5847",
"childrens":[]}]},

{
"label":"灵宝市",
"value":"497",
"childrens":[{
"label":"城关镇",
"value":"5848",
"childrens":[]},
{
"label":"尹庄镇",
"value":"5849",
"childrens":[]},
{
"label":"朱阳镇",
"value":"5850",
"childrens":[]},
{
"label":"阳平镇",
"value":"5851",
"childrens":[]},
{
"label":"故县镇",
"value":"5852",
"childrens":[]},
{
"label":"豫灵镇",
"value":"5853",
"childrens":[]},
{
"label":"大王镇",
"value":"5854",
"childrens":[]},
{
"label":"阳店镇",
"value":"5855",
"childrens":[]},
{
"label":"函谷关镇",
"value":"5856",
"childrens":[]},
{
"label":"焦村镇",
"value":"5857",
"childrens":[]},
{
"label":"川口乡",
"value":"5858",
"childrens":[]},
{
"label":"寺河乡",
"value":"5859",
"childrens":[]},
{
"label":"苏村乡",
"value":"5860",
"childrens":[]},
{
"label":"五亩乡",
"value":"5861",
"childrens":[]},
{
"label":"西阎乡",
"value":"5862",
"childrens":[]}]},

{
"label":"陕县",
"value":"498",
"childrens":[]},
{
"label":"卢氏县",
"value":"499",
"childrens":[]},
{
"label":"渑池县",
"value":"3113",
"childrens":[]},
{
"label":"湖滨区",
"value":"53202",
"childrens":[]}]},

{
"label":"南阳市",
"value":"502",
"childrens":[{
"label":"邓州市",
"value":"503",
"childrens":[{
"label":"古城街道",
"value":"5595",
"childrens":[]},
{
"label":"花洲街道",
"value":"5596",
"childrens":[]},
{
"label":"湍河街道",
"value":"5597",
"childrens":[]},
{
"label":"罗庄镇",
"value":"5598",
"childrens":[]},
{
"label":"汲滩镇",
"value":"5599",
"childrens":[]},
{
"label":"穰东镇",
"value":"5600",
"childrens":[]},
{
"label":"孟楼镇",
"value":"5601",
"childrens":[]},
{
"label":"林扒镇",
"value":"5602",
"childrens":[]},
{
"label":"构林镇",
"value":"5603",
"childrens":[]},
{
"label":"十林镇",
"value":"5604",
"childrens":[]},
{
"label":"张村镇",
"value":"5605",
"childrens":[]},
{
"label":"都司镇",
"value":"5606",
"childrens":[]},
{
"label":"赵集镇",
"value":"5607",
"childrens":[]},
{
"label":"刘集镇",
"value":"5608",
"childrens":[]},
{
"label":"桑庄镇",
"value":"5609",
"childrens":[]},
{
"label":"彭桥镇",
"value":"5610",
"childrens":[]},
{
"label":"张楼乡",
"value":"5611",
"childrens":[]},
{
"label":"白牛乡",
"value":"5612",
"childrens":[]},
{
"label":"夏集乡",
"value":"5613",
"childrens":[]},
{
"label":"裴营乡",
"value":"5614",
"childrens":[]},
{
"label":"文渠乡",
"value":"5615",
"childrens":[]},
{
"label":"高集乡",
"value":"5616",
"childrens":[]},
{
"label":"陶营乡",
"value":"5617",
"childrens":[]},
{
"label":"小杨营乡",
"value":"5618",
"childrens":[]},
{
"label":"腰店乡",
"value":"5619",
"childrens":[]},
{
"label":"龙堰乡",
"value":"5620",
"childrens":[]},
{
"label":"九龙乡",
"value":"5621",
"childrens":[]}]},

{
"label":"桐柏县",
"value":"504",
"childrens":[]},
{
"label":"方城县",
"value":"505",
"childrens":[]},
{
"label":"淅川县",
"value":"506",
"childrens":[]},
{
"label":"镇平县",
"value":"507",
"childrens":[]},
{
"label":"唐河县",
"value":"508",
"childrens":[]},
{
"label":"南召县",
"value":"509",
"childrens":[]},
{
"label":"内乡县",
"value":"510",
"childrens":[]},
{
"label":"新野县",
"value":"511",
"childrens":[]},
{
"label":"社旗县",
"value":"512",
"childrens":[]},
{
"label":"西峡县",
"value":"515",
"childrens":[]},
{
"label":"卧龙区",
"value":"53203",
"childrens":[]},
{
"label":"宛城区",
"value":"53204",
"childrens":[]}]},

{
"label":"商丘市",
"value":"517",
"childrens":[{
"label":"永城市",
"value":"518",
"childrens":[{
"label":"演集镇",
"value":"5791",
"childrens":[]},
{
"label":"城关镇",
"value":"5792",
"childrens":[]},
{
"label":"芒山镇",
"value":"5793",
"childrens":[]},
{
"label":"高庄镇",
"value":"5794",
"childrens":[]},
{
"label":"酂城镇",
"value":"5795",
"childrens":[]},
{
"label":"裴桥镇",
"value":"5796",
"childrens":[]},
{
"label":"马桥镇",
"value":"5797",
"childrens":[]},
{
"label":"薛湖镇",
"value":"5798",
"childrens":[]},
{
"label":"蒋口镇",
"value":"5799",
"childrens":[]},
{
"label":"陈集镇",
"value":"5800",
"childrens":[]},
{
"label":"十八里镇",
"value":"5801",
"childrens":[]},
{
"label":"城厢乡",
"value":"5802",
"childrens":[]},
{
"label":"候岭乡",
"value":"5803",
"childrens":[]},
{
"label":"黄口乡",
"value":"5804",
"childrens":[]},
{
"label":"新桥乡",
"value":"5805",
"childrens":[]},
{
"label":"双桥乡",
"value":"5806",
"childrens":[]},
{
"label":"王集乡",
"value":"5807",
"childrens":[]},
{
"label":"条河乡",
"value":"5815",
"childrens":[]},
{
"label":"刘河乡",
"value":"5816",
"childrens":[]},
{
"label":"陈官庄乡",
"value":"5817",
"childrens":[]}]},

{
"label":"宁陵县",
"value":"519",
"childrens":[]},
{
"label":"虞城县",
"value":"520",
"childrens":[]},
{
"label":"民权县",
"value":"521",
"childrens":[]},
{
"label":"夏邑县",
"value":"522",
"childrens":[]},
{
"label":"柘城县",
"value":"523",
"childrens":[]},
{
"label":"睢县",
"value":"524",
"childrens":[]},
{
"label":"睢阳区",
"value":"53205",
"childrens":[]},
{
"label":"梁园区",
"value":"53206",
"childrens":[]}]},

{
"label":"周口市",
"value":"527",
"childrens":[{
"label":"项城市",
"value":"529",
"childrens":[{
"label":"花园街道",
"value":"5820",
"childrens":[]},
{
"label":"水寨街道",
"value":"5821",
"childrens":[]},
{
"label":"东方街道",
"value":"5822",
"childrens":[]},
{
"label":"莲花街道",
"value":"5823",
"childrens":[]},
{
"label":"光武街道",
"value":"5824",
"childrens":[]},
{
"label":"千佛阁街道",
"value":"5825",
"childrens":[]},
{
"label":"南顿镇",
"value":"5826",
"childrens":[]},
{
"label":"孙店镇",
"value":"5827",
"childrens":[]},
{
"label":"李寨镇",
"value":"5828",
"childrens":[]},
{
"label":"贾岭镇",
"value":"5829",
"childrens":[]},
{
"label":"高寺镇",
"value":"5830",
"childrens":[]},
{
"label":"新桥镇",
"value":"5831",
"childrens":[]},
{
"label":"付集镇",
"value":"5832",
"childrens":[]},
{
"label":"官会镇",
"value":"5833",
"childrens":[]},
{
"label":"丁集镇",
"value":"5834",
"childrens":[]},
{
"label":"郑郭镇",
"value":"5835",
"childrens":[]},
{
"label":"秣陵镇",
"value":"5836",
"childrens":[]},
{
"label":"王明口镇",
"value":"5837",
"childrens":[]},
{
"label":"永丰乡",
"value":"5838",
"childrens":[]},
{
"label":"范集镇",
"value":"5839",
"childrens":[]},
{
"label":"三店乡",
"value":"5840",
"childrens":[]}]},

{
"label":"商水县",
"value":"530",
"childrens":[]},
{
"label":"淮阳县",
"value":"531",
"childrens":[]},
{
"label":"太康县",
"value":"532",
"childrens":[]},
{
"label":"鹿邑县",
"value":"533",
"childrens":[]},
{
"label":"西华县",
"value":"534",
"childrens":[]},
{
"label":"扶沟县",
"value":"535",
"childrens":[]},
{
"label":"沈丘县",
"value":"536",
"childrens":[]},
{
"label":"郸城县",
"value":"537",
"childrens":[]},
{
"label":"东新区",
"value":"53207",
"childrens":[]},
{
"label":"经济开发区",
"value":"53208",
"childrens":[]},
{
"label":"川汇区",
"value":"53209",
"childrens":[]}]},

{
"label":"驻马店市",
"value":"538",
"childrens":[{
"label":"确山县",
"value":"540",
"childrens":[]},
{
"label":"新蔡县",
"value":"541",
"childrens":[]},
{
"label":"上蔡县",
"value":"542",
"childrens":[]},
{
"label":"泌阳县",
"value":"543",
"childrens":[]},
{
"label":"西平县",
"value":"544",
"childrens":[]},
{
"label":"遂平县",
"value":"545",
"childrens":[]},
{
"label":"汝南县",
"value":"546",
"childrens":[]},
{
"label":"平舆县",
"value":"547",
"childrens":[]},
{
"label":"正阳县",
"value":"548",
"childrens":[]},
{
"label":"驿城区",
"value":"53210",
"childrens":[]}]},

{
"label":"信阳市",
"value":"549",
"childrens":[{
"label":"潢川县",
"value":"551",
"childrens":[]},
{
"label":"淮滨县",
"value":"552",
"childrens":[]},
{
"label":"息县",
"value":"553",
"childrens":[]},
{
"label":"新县",
"value":"554",
"childrens":[]},
{
"label":"固始县",
"value":"556",
"childrens":[]},
{
"label":"罗山县",
"value":"557",
"childrens":[]},
{
"label":"光山县",
"value":"558",
"childrens":[]},
{
"label":"商城县",
"value":"3119",
"childrens":[]},
{
"label":"平桥区",
"value":"53211",
"childrens":[]},
{
"label":"浉河区",
"value":"53212",
"childrens":[]}]},

{
"label":"济源市",
"value":"2780",
"childrens":[{
"label":"五龙口镇",
"value":"53213",
"childrens":[]},
{
"label":"下冶镇",
"value":"53214",
"childrens":[]},
{
"label":"轵城镇",
"value":"53215",
"childrens":[]},
{
"label":"王屋镇",
"value":"53216",
"childrens":[]},
{
"label":"思礼镇",
"value":"53217",
"childrens":[]},
{
"label":"邵原镇",
"value":"53218",
"childrens":[]},
{
"label":"坡头镇",
"value":"53219",
"childrens":[]},
{
"label":"梨林镇",
"value":"53220",
"childrens":[]},
{
"label":"克井镇",
"value":"53221",
"childrens":[]},
{
"label":"大峪镇",
"value":"53222",
"childrens":[]},
{
"label":"承留镇",
"value":"53223",
"childrens":[]},
{
"label":"城区",
"value":"53224",
"childrens":[]}]}]},


{
"label":"辽宁",
"value":"8",
"childrens":[{
"label":"沈阳市",
"value":"560",
"childrens":[{
"label":"苏家屯区",
"value":"567",
"childrens":[]},
{
"label":"新民市",
"value":"569",
"childrens":[]},
{
"label":"法库县",
"value":"570",
"childrens":[]},
{
"label":"辽中县",
"value":"571",
"childrens":[]},
{
"label":"康平县",
"value":"572",
"childrens":[]},
{
"label":"皇姑区",
"value":"53402",
"childrens":[]},
{
"label":"铁西区",
"value":"53403",
"childrens":[]},
{
"label":"大东区",
"value":"53404",
"childrens":[]},
{
"label":"沈河区",
"value":"53405",
"childrens":[]},
{
"label":"东陵区",
"value":"53406",
"childrens":[]},
{
"label":"于洪区",
"value":"53407",
"childrens":[]},
{
"label":"和平区",
"value":"53408",
"childrens":[]},
{
"label":"浑南新区",
"value":"53409",
"childrens":[]},
{
"label":"沈北新区",
"value":"53410",
"childrens":[]}]},

{
"label":"大连市",
"value":"573",
"childrens":[{
"label":"普兰店市",
"value":"574",
"childrens":[]},
{
"label":"瓦房店市",
"value":"575",
"childrens":[]},
{
"label":"庄河市",
"value":"576",
"childrens":[]},
{
"label":"长海县",
"value":"577",
"childrens":[]},
{
"label":"沙河口区",
"value":"3261",
"childrens":[]},
{
"label":"西岗区",
"value":"3263",
"childrens":[]},
{
"label":"中山区",
"value":"4468",
"childrens":[]},
{
"label":"甘井子区",
"value":"5909",
"childrens":[]},
{
"label":"高新园区",
"value":"6561",
"childrens":[]},
{
"label":"大连开发区",
"value":"6627",
"childrens":[]},
{
"label":"金州区",
"value":"53411",
"childrens":[]},
{
"label":"旅顺口区",
"value":"53412",
"childrens":[]}]},

{
"label":"鞍山市",
"value":"579",
"childrens":[{
"label":"台安县",
"value":"580",
"childrens":[]},
{
"label":"海城市",
"value":"581",
"childrens":[]},
{
"label":"岫岩县",
"value":"583",
"childrens":[]},
{
"label":"铁东区",
"value":"3264",
"childrens":[]},
{
"label":"立山区",
"value":"3266",
"childrens":[]},
{
"label":"铁西区",
"value":"53413",
"childrens":[]},
{
"label":"千山区",
"value":"53414",
"childrens":[]}]},

{
"label":"抚顺市",
"value":"584",
"childrens":[{
"label":"抚顺县",
"value":"585",
"childrens":[]},
{
"label":"新宾县",
"value":"586",
"childrens":[]},
{
"label":"清原县",
"value":"587",
"childrens":[]},
{
"label":"望花区",
"value":"3268",
"childrens":[]},
{
"label":"东洲区",
"value":"3269",
"childrens":[]},
{
"label":"新抚区",
"value":"3270",
"childrens":[]},
{
"label":"顺城区",
"value":"3271",
"childrens":[]}]},

{
"label":"本溪市",
"value":"589",
"childrens":[{
"label":"桓仁县",
"value":"591",
"childrens":[]},
{
"label":"南芬区",
"value":"3275",
"childrens":[]},
{
"label":"本溪县",
"value":"53415",
"childrens":[]},
{
"label":"平山区",
"value":"53416",
"childrens":[]},
{
"label":"溪湖区",
"value":"53417",
"childrens":[]},
{
"label":"明山区",
"value":"53418",
"childrens":[]}]},

{
"label":"丹东市",
"value":"593",
"childrens":[{
"label":"宽甸县",
"value":"596",
"childrens":[]},
{
"label":"元宝区",
"value":"53419",
"childrens":[]},
{
"label":"振兴区",
"value":"53420",
"childrens":[]},
{
"label":"振安区",
"value":"53421",
"childrens":[]},
{
"label":"东港市",
"value":"53422",
"childrens":[]},
{
"label":"凤城市",
"value":"53423",
"childrens":[]}]},

{
"label":"锦州市",
"value":"598",
"childrens":[{
"label":"义县",
"value":"599",
"childrens":[]},
{
"label":"凌海市",
"value":"600",
"childrens":[]},
{
"label":"北镇市",
"value":"601",
"childrens":[]},
{
"label":"黑山县",
"value":"602",
"childrens":[]},
{
"label":"古塔区",
"value":"4912",
"childrens":[]},
{
"label":"凌河区",
"value":"4913",
"childrens":[]},
{
"label":"太和区",
"value":"4914",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"6790",
"childrens":[]}]},

{
"label":"葫芦岛市",
"value":"604",
"childrens":[{
"label":"绥中县",
"value":"606",
"childrens":[]},
{
"label":"建昌县",
"value":"607",
"childrens":[]},
{
"label":"南票区",
"value":"608",
"childrens":[]},
{
"label":"龙港区",
"value":"3300",
"childrens":[]},
{
"label":"连山区",
"value":"53424",
"childrens":[]},
{
"label":"兴城区",
"value":"53425",
"childrens":[]}]},

{
"label":"营口市",
"value":"609",
"childrens":[{
"label":"大石桥市",
"value":"610",
"childrens":[]},
{
"label":"盖州市",
"value":"611",
"childrens":[]},
{
"label":"老边区",
"value":"3282",
"childrens":[]},
{
"label":"西市区",
"value":"3283",
"childrens":[]},
{
"label":"站前区",
"value":"6628",
"childrens":[]},
{
"label":"鲅鱼圈区",
"value":"53426",
"childrens":[]}]},

{
"label":"盘锦市",
"value":"613",
"childrens":[{
"label":"盘山县",
"value":"614",
"childrens":[]},
{
"label":"大洼县",
"value":"615",
"childrens":[]},
{
"label":"兴隆台区",
"value":"53427",
"childrens":[]},
{
"label":"双台子区",
"value":"53428",
"childrens":[]}]},

{
"label":"阜新市",
"value":"617",
"childrens":[{
"label":"阜新县",
"value":"618",
"childrens":[]},
{
"label":"彰武县",
"value":"619",
"childrens":[]},
{
"label":"清河门区",
"value":"3286",
"childrens":[]},
{
"label":"新邱区",
"value":"3288",
"childrens":[]},
{
"label":"海州区",
"value":"53429",
"childrens":[]},
{
"label":"太平区",
"value":"53430",
"childrens":[]},
{
"label":"细河区",
"value":"53431",
"childrens":[]}]},

{
"label":"辽阳市",
"value":"621",
"childrens":[{
"label":"辽阳县",
"value":"623",
"childrens":[]},
{
"label":"太子河区",
"value":"3290",
"childrens":[]},
{
"label":"弓长岭区",
"value":"3291",
"childrens":[]},
{
"label":"宏伟区",
"value":"3292",
"childrens":[]},
{
"label":"白塔区",
"value":"53432",
"childrens":[]},
{
"label":"文圣区",
"value":"53433",
"childrens":[]},
{
"label":"灯塔市",
"value":"53434",
"childrens":[]}]},

{
"label":"朝阳市",
"value":"632",
"childrens":[{
"label":"凌源市",
"value":"633",
"childrens":[]},
{
"label":"北票市",
"value":"634",
"childrens":[]},
{
"label":"喀喇沁左翼县",
"value":"635",
"childrens":[]},
{
"label":"朝阳县",
"value":"636",
"childrens":[]},
{
"label":"建平县",
"value":"637",
"childrens":[]},
{
"label":"龙城区",
"value":"3299",
"childrens":[]},
{
"label":"双塔区",
"value":"53435",
"childrens":[]}]},

{
"label":"铁岭市",
"value":"6858",
"childrens":[{
"label":"银州区",
"value":"6859",
"childrens":[]},
{
"label":"清河区",
"value":"6860",
"childrens":[]},
{
"label":"开原市",
"value":"6862",
"childrens":[]},
{
"label":"铁岭县",
"value":"6863",
"childrens":[]},
{
"label":"西丰县",
"value":"6864",
"childrens":[]},
{
"label":"昌图县",
"value":"6865",
"childrens":[]},
{
"label":"调兵山市",
"value":"53436",
"childrens":[]}]}]},


{
"label":"吉林",
"value":"9",
"childrens":[{
"label":"长春市",
"value":"639",
"childrens":[{
"label":"榆树市",
"value":"640",
"childrens":[]},
{
"label":"九台市",
"value":"641",
"childrens":[]},
{
"label":"农安县",
"value":"642",
"childrens":[]},
{
"label":"德惠市",
"value":"3172",
"childrens":[]},
{
"label":"双阳区",
"value":"3306",
"childrens":[]},
{
"label":"朝阳区",
"value":"53441",
"childrens":[]},
{
"label":"南关区",
"value":"53442",
"childrens":[]},
{
"label":"宽城区",
"value":"53443",
"childrens":[]},
{
"label":"二道区",
"value":"53444",
"childrens":[]},
{
"label":"绿园区",
"value":"53445",
"childrens":[]},
{
"label":"净月区",
"value":"53446",
"childrens":[]},
{
"label":"汽车产业开发区",
"value":"53447",
"childrens":[]},
{
"label":"高新技术开发区",
"value":"53448",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"53449",
"childrens":[]}]},

{
"label":"吉林市",
"value":"644",
"childrens":[{
"label":"舒兰市",
"value":"645",
"childrens":[]},
{
"label":"桦甸市",
"value":"646",
"childrens":[]},
{
"label":"蛟河市",
"value":"647",
"childrens":[]},
{
"label":"磐石市",
"value":"648",
"childrens":[]},
{
"label":"永吉县",
"value":"649",
"childrens":[]},
{
"label":"昌邑区",
"value":"53437",
"childrens":[]},
{
"label":"龙潭区",
"value":"53438",
"childrens":[]},
{
"label":"船营区",
"value":"53439",
"childrens":[]},
{
"label":"丰满区",
"value":"53440",
"childrens":[]}]},

{
"label":"四平市",
"value":"651",
"childrens":[{
"label":"公主岭市",
"value":"652",
"childrens":[]},
{
"label":"双辽市",
"value":"653",
"childrens":[]},
{
"label":"梨树县",
"value":"654",
"childrens":[]},
{
"label":"伊通县",
"value":"656",
"childrens":[]},
{
"label":"铁东区",
"value":"6641",
"childrens":[]},
{
"label":"铁西区",
"value":"6642",
"childrens":[]}]},

{
"label":"通化市",
"value":"657",
"childrens":[{
"label":"梅河口市",
"value":"658",
"childrens":[]},
{
"label":"集安市",
"value":"659",
"childrens":[]},
{
"label":"通化县",
"value":"660",
"childrens":[]},
{
"label":"辉南县",
"value":"661",
"childrens":[]},
{
"label":"柳河县",
"value":"662",
"childrens":[]},
{
"label":"二道江区",
"value":"663",
"childrens":[]},
{
"label":"东昌区",
"value":"3311",
"childrens":[]}]},

{
"label":"白山市",
"value":"664",
"childrens":[{
"label":"临江市",
"value":"665",
"childrens":[]},
{
"label":"江源区",
"value":"669",
"childrens":[]},
{
"label":"靖宇县",
"value":"671",
"childrens":[]},
{
"label":"抚松县",
"value":"672",
"childrens":[]},
{
"label":"长白县",
"value":"673",
"childrens":[]},
{
"label":"浑江区",
"value":"53450",
"childrens":[]}]},

{
"label":"松原市",
"value":"674",
"childrens":[{
"label":"乾安县",
"value":"675",
"childrens":[]},
{
"label":"长岭县",
"value":"676",
"childrens":[]},
{
"label":"扶余县",
"value":"677",
"childrens":[]},
{
"label":"宁江区",
"value":"53451",
"childrens":[]},
{
"label":"前郭县",
"value":"53452",
"childrens":[]}]},

{
"label":"白城市",
"value":"681",
"childrens":[{
"label":"大安市",
"value":"682",
"childrens":[]},
{
"label":"洮南市",
"value":"683",
"childrens":[]},
{
"label":"通榆县",
"value":"684",
"childrens":[]},
{
"label":"镇赉县",
"value":"685",
"childrens":[]},
{
"label":"洮北区",
"value":"686",
"childrens":[]}]},

{
"label":"延边州",
"value":"687",
"childrens":[{
"label":"图们市",
"value":"3312",
"childrens":[]},
{
"label":"敦化市",
"value":"3313",
"childrens":[]},
{
"label":"珲春市",
"value":"3314",
"childrens":[]},
{
"label":"龙井市",
"value":"3315",
"childrens":[]},
{
"label":"和龙市",
"value":"3316",
"childrens":[]},
{
"label":"汪清县",
"value":"3317",
"childrens":[]},
{
"label":"安图县",
"value":"3318",
"childrens":[]},
{
"label":"延吉市",
"value":"53453",
"childrens":[]}]},

{
"label":"辽源市",
"value":"2992",
"childrens":[{
"label":"龙山区",
"value":"2993",
"childrens":[]},
{
"label":"西安区",
"value":"2994",
"childrens":[]},
{
"label":"东丰县",
"value":"2995",
"childrens":[]},
{
"label":"东辽县",
"value":"2996",
"childrens":[]}]}]},


{
"label":"黑龙江",
"value":"10",
"childrens":[{
"label":"哈尔滨市",
"value":"698",
"childrens":[{
"label":"阿城区",
"value":"699",
"childrens":[]},
{
"label":"尚志市",
"value":"700",
"childrens":[]},
{
"label":"双城市",
"value":"701",
"childrens":[]},
{
"label":"五常市",
"value":"702",
"childrens":[]},
{
"label":"方正县",
"value":"704",
"childrens":[]},
{
"label":"宾县",
"value":"705",
"childrens":[]},
{
"label":"依兰县",
"value":"706",
"childrens":[]},
{
"label":"巴彦县",
"value":"707",
"childrens":[]},
{
"label":"通河县",
"value":"708",
"childrens":[]},
{
"label":"木兰县",
"value":"709",
"childrens":[]},
{
"label":"延寿县",
"value":"710",
"childrens":[]},
{
"label":"呼兰区",
"value":"53454",
"childrens":[]},
{
"label":"松北区",
"value":"53455",
"childrens":[]},
{
"label":"道里区",
"value":"53456",
"childrens":[]},
{
"label":"南岗区",
"value":"53457",
"childrens":[]},
{
"label":"道外区",
"value":"53458",
"childrens":[]},
{
"label":"香坊区",
"value":"53459",
"childrens":[]},
{
"label":"平房区",
"value":"53460",
"childrens":[]}]},

{
"label":"齐齐哈尔市",
"value":"712",
"childrens":[{
"label":"梅里斯区",
"value":"713",
"childrens":[]},
{
"label":"昂昂溪区",
"value":"714",
"childrens":[]},
{
"label":"富拉尔基区",
"value":"715",
"childrens":[]},
{
"label":"碾子山区",
"value":"716",
"childrens":[]},
{
"label":"讷河市",
"value":"717",
"childrens":[]},
{
"label":"富裕县",
"value":"718",
"childrens":[]},
{
"label":"拜泉县",
"value":"719",
"childrens":[]},
{
"label":"甘南县",
"value":"720",
"childrens":[]},
{
"label":"依安县",
"value":"721",
"childrens":[]},
{
"label":"克山县",
"value":"722",
"childrens":[]},
{
"label":"龙江县",
"value":"723",
"childrens":[]},
{
"label":"克东县",
"value":"724",
"childrens":[]},
{
"label":"泰来县",
"value":"725",
"childrens":[]},
{
"label":"建华区",
"value":"53461",
"childrens":[]},
{
"label":"龙沙区",
"value":"53462",
"childrens":[]},
{
"label":"铁锋区",
"value":"53463",
"childrens":[]}]},

{
"label":"鹤岗市",
"value":"727",
"childrens":[{
"label":"萝北县",
"value":"728",
"childrens":[]},
{
"label":"绥滨县",
"value":"729",
"childrens":[]},
{
"label":"兴山区",
"value":"3334",
"childrens":[]},
{
"label":"向阳区",
"value":"3335",
"childrens":[]},
{
"label":"工农区",
"value":"3336",
"childrens":[]},
{
"label":"南山区",
"value":"3337",
"childrens":[]},
{
"label":"兴安区",
"value":"3338",
"childrens":[]},
{
"label":"东山区",
"value":"3339",
"childrens":[]}]},

{
"label":"双鸭山市",
"value":"731",
"childrens":[{
"label":"集贤县",
"value":"733",
"childrens":[]},
{
"label":"宝清县",
"value":"734",
"childrens":[]},
{
"label":"友谊县",
"value":"735",
"childrens":[]},
{
"label":"饶河县",
"value":"736",
"childrens":[]},
{
"label":"尖山区",
"value":"3340",
"childrens":[]},
{
"label":"岭东区",
"value":"3341",
"childrens":[]},
{
"label":"四方台区",
"value":"3342",
"childrens":[]},
{
"label":"宝山区",
"value":"3343",
"childrens":[]}]},

{
"label":"鸡西市",
"value":"737",
"childrens":[{
"label":"密山市",
"value":"739",
"childrens":[]},
{
"label":"虎林市",
"value":"740",
"childrens":[]},
{
"label":"鸡东县",
"value":"741",
"childrens":[]},
{
"label":"恒山区",
"value":"3329",
"childrens":[]},
{
"label":"滴道区",
"value":"3330",
"childrens":[]},
{
"label":"梨树区",
"value":"3331",
"childrens":[]},
{
"label":"城子河区",
"value":"3332",
"childrens":[]},
{
"label":"麻山区",
"value":"3333",
"childrens":[]},
{
"label":"鸡冠区",
"value":"53464",
"childrens":[]}]},

{
"label":"大庆市",
"value":"742",
"childrens":[{
"label":"萨尔图区",
"value":"744",
"childrens":[]},
{
"label":"龙凤区",
"value":"745",
"childrens":[]},
{
"label":"让胡路区",
"value":"746",
"childrens":[]},
{
"label":"红岗区",
"value":"747",
"childrens":[]},
{
"label":"大同区",
"value":"748",
"childrens":[]},
{
"label":"林甸县",
"value":"749",
"childrens":[]},
{
"label":"肇州县",
"value":"750",
"childrens":[]},
{
"label":"肇源县",
"value":"751",
"childrens":[]},
{
"label":"杜尔伯特县",
"value":"752",
"childrens":[]}]},

{
"label":"伊春市",
"value":"753",
"childrens":[{
"label":"铁力市",
"value":"754",
"childrens":[]},
{
"label":"嘉荫县",
"value":"755",
"childrens":[]},
{
"label":"伊春区",
"value":"3344",
"childrens":[]},
{
"label":"南岔区",
"value":"3345",
"childrens":[]},
{
"label":"友好区",
"value":"3346",
"childrens":[]},
{
"label":"西林区",
"value":"3347",
"childrens":[]},
{
"label":"翠峦区",
"value":"3348",
"childrens":[]},
{
"label":"新青区",
"value":"3349",
"childrens":[]},
{
"label":"美溪区",
"value":"3350",
"childrens":[]},
{
"label":"金山屯区",
"value":"3351",
"childrens":[]},
{
"label":"五营区",
"value":"3352",
"childrens":[]},
{
"label":"乌马河区",
"value":"3353",
"childrens":[]},
{
"label":"汤旺河区",
"value":"3354",
"childrens":[]},
{
"label":"带岭区",
"value":"3355",
"childrens":[]},
{
"label":"乌伊岭区",
"value":"3356",
"childrens":[]},
{
"label":"红星区",
"value":"3357",
"childrens":[]},
{
"label":"上甘岭区",
"value":"3358",
"childrens":[]}]},

{
"label":"牡丹江市",
"value":"757",
"childrens":[{
"label":"海林市",
"value":"758",
"childrens":[]},
{
"label":"宁安市",
"value":"760",
"childrens":[]},
{
"label":"穆棱市",
"value":"761",
"childrens":[]},
{
"label":"林口县",
"value":"762",
"childrens":[]},
{
"label":"东宁县",
"value":"763",
"childrens":[]},
{
"label":"爱民区",
"value":"3367",
"childrens":[]},
{
"label":"东安区",
"value":"3368",
"childrens":[]},
{
"label":"阳明区",
"value":"3369",
"childrens":[]},
{
"label":"西安区",
"value":"3370",
"childrens":[]},
{
"label":"绥芬河市",
"value":"4148",
"childrens":[]}]},

{
"label":"佳木斯市",
"value":"765",
"childrens":[{
"label":"同江市",
"value":"766",
"childrens":[]},
{
"label":"富锦市",
"value":"767",
"childrens":[]},
{
"label":"桦川县",
"value":"768",
"childrens":[]},
{
"label":"抚远县",
"value":"769",
"childrens":[]},
{
"label":"桦南县",
"value":"770",
"childrens":[]},
{
"label":"汤原县",
"value":"771",
"childrens":[]},
{
"label":"前进区",
"value":"53465",
"childrens":[]},
{
"label":"向阳区",
"value":"53466",
"childrens":[]},
{
"label":"东风区",
"value":"53467",
"childrens":[]},
{
"label":"郊区",
"value":"53468",
"childrens":[]}]},

{
"label":"七台河市",
"value":"773",
"childrens":[{
"label":"勃利县",
"value":"774",
"childrens":[]},
{
"label":"桃山区",
"value":"3364",
"childrens":[]},
{
"label":"新兴区",
"value":"3365",
"childrens":[]},
{
"label":"茄子河区",
"value":"3366",
"childrens":[]},
{
"label":"金沙新区",
"value":"53469",
"childrens":[]}]},

{
"label":"黑河市",
"value":"776",
"childrens":[{
"label":"北安市",
"value":"777",
"childrens":[]},
{
"label":"五大连池市",
"value":"778",
"childrens":[]},
{
"label":"逊克县",
"value":"779",
"childrens":[]},
{
"label":"孙吴县",
"value":"780",
"childrens":[]},
{
"label":"嫩江县",
"value":"3096",
"childrens":[]},
{
"label":"爱辉区",
"value":"3371",
"childrens":[]}]},

{
"label":"绥化市",
"value":"782",
"childrens":[{
"label":"安达市",
"value":"784",
"childrens":[]},
{
"label":"肇东市",
"value":"785",
"childrens":[]},
{
"label":"海伦市",
"value":"786",
"childrens":[]},
{
"label":"绥棱县",
"value":"787",
"childrens":[]},
{
"label":"兰西县",
"value":"788",
"childrens":[]},
{
"label":"明水县",
"value":"789",
"childrens":[]},
{
"label":"青冈县",
"value":"790",
"childrens":[]},
{
"label":"庆安县",
"value":"791",
"childrens":[]},
{
"label":"望奎县",
"value":"792",
"childrens":[]},
{
"label":"北林区",
"value":"6712",
"childrens":[]}]},

{
"label":"大兴安岭地区",
"value":"793",
"childrens":[{
"label":"呼玛县",
"value":"794",
"childrens":[]},
{
"label":"塔河县",
"value":"795",
"childrens":[]},
{
"label":"漠河县",
"value":"796",
"childrens":[]},
{
"label":"加格达奇区",
"value":"4114",
"childrens":[]},
{
"label":"松岭区",
"value":"4115",
"childrens":[]},
{
"label":"呼中区",
"value":"4116",
"childrens":[]},
{
"label":"新林区",
"value":"53470",
"childrens":[]}]}]},


{
"label":"内蒙古",
"value":"11",
"childrens":[{
"label":"呼和浩特市",
"value":"799",
"childrens":[{
"label":"土默特左旗",
"value":"801",
"childrens":[]},
{
"label":"和林格尔县",
"value":"802",
"childrens":[]},
{
"label":"武川县",
"value":"803",
"childrens":[]},
{
"label":"托克托县",
"value":"804",
"childrens":[]},
{
"label":"清水河县",
"value":"3133",
"childrens":[]},
{
"label":"玉泉区",
"value":"3240",
"childrens":[]},
{
"label":"赛罕区",
"value":"3241",
"childrens":[]},
{
"label":"回民区",
"value":"53471",
"childrens":[]},
{
"label":"新城区",
"value":"53472",
"childrens":[]}]},

{
"label":"包头市",
"value":"805",
"childrens":[{
"label":"固阳县",
"value":"807",
"childrens":[]},
{
"label":"土默特右旗",
"value":"808",
"childrens":[]},
{
"label":"达茂联合旗",
"value":"809",
"childrens":[]},
{
"label":"石拐区",
"value":"3245",
"childrens":[]},
{
"label":"白云矿区",
"value":"3246",
"childrens":[]},
{
"label":"东河区",
"value":"53473",
"childrens":[]},
{
"label":"九原区",
"value":"53474",
"childrens":[]},
{
"label":"青山区",
"value":"53475",
"childrens":[]},
{
"label":"昆都仑区",
"value":"53476",
"childrens":[]}]},

{
"label":"乌海市",
"value":"810",
"childrens":[{
"label":"海勃湾区",
"value":"811",
"childrens":[]},
{
"label":"海南区",
"value":"3248",
"childrens":[]},
{
"label":"乌达区",
"value":"3249",
"childrens":[]}]},

{
"label":"赤峰市",
"value":"812",
"childrens":[{
"label":"宁城县",
"value":"814",
"childrens":[]},
{
"label":"敖汉旗",
"value":"815",
"childrens":[]},
{
"label":"喀喇沁旗",
"value":"816",
"childrens":[]},
{
"label":"翁牛特旗",
"value":"817",
"childrens":[]},
{
"label":"巴林右旗",
"value":"818",
"childrens":[]},
{
"label":"林西县",
"value":"819",
"childrens":[]},
{
"label":"克什克腾旗",
"value":"820",
"childrens":[]},
{
"label":"巴林左旗",
"value":"821",
"childrens":[]},
{
"label":"阿鲁科尔沁旗",
"value":"822",
"childrens":[]},
{
"label":"元宝山区",
"value":"3199",
"childrens":[]},
{
"label":"松山区",
"value":"3251",
"childrens":[]},
{
"label":"红山区",
"value":"53477",
"childrens":[]}]},

{
"label":"乌兰察布市",
"value":"823",
"childrens":[{
"label":"集宁区",
"value":"824",
"childrens":[]},
{
"label":"丰镇市",
"value":"825",
"childrens":[]},
{
"label":"兴和县",
"value":"826",
"childrens":[]},
{
"label":"卓资县",
"value":"827",
"childrens":[]},
{
"label":"商都县",
"value":"828",
"childrens":[]},
{
"label":"凉城县",
"value":"829",
"childrens":[]},
{
"label":"化德县",
"value":"830",
"childrens":[]},
{
"label":"察哈尔右翼前旗",
"value":"831",
"childrens":[]},
{
"label":"察哈尔右翼中旗",
"value":"832",
"childrens":[]},
{
"label":"察哈尔右翼后旗",
"value":"833",
"childrens":[]},
{
"label":"四子王旗",
"value":"834",
"childrens":[]}]},

{
"label":"锡林郭勒盟",
"value":"835",
"childrens":[{
"label":"锡林浩特市",
"value":"836",
"childrens":[]},
{
"label":"二连浩特市",
"value":"837",
"childrens":[]},
{
"label":"多伦县",
"value":"838",
"childrens":[]},
{
"label":"阿巴嘎旗",
"value":"839",
"childrens":[]},
{
"label":"西乌珠穆沁旗",
"value":"840",
"childrens":[]},
{
"label":"东乌珠穆沁旗",
"value":"841",
"childrens":[]},
{
"label":"苏尼特右旗",
"value":"842",
"childrens":[]},
{
"label":"苏尼特左旗",
"value":"843",
"childrens":[]},
{
"label":"太仆寺旗",
"value":"844",
"childrens":[]},
{
"label":"正镶白旗",
"value":"845",
"childrens":[]},
{
"label":"正蓝旗",
"value":"846",
"childrens":[]},
{
"label":"镶黄旗",
"value":"847",
"childrens":[]}]},

{
"label":"呼伦贝尔市",
"value":"848",
"childrens":[{
"label":"海拉尔区",
"value":"849",
"childrens":[]},
{
"label":"满洲里市",
"value":"850",
"childrens":[]},
{
"label":"牙克石市",
"value":"851",
"childrens":[]},
{
"label":"扎兰屯市",
"value":"852",
"childrens":[]},
{
"label":"根河市",
"value":"853",
"childrens":[]},
{
"label":"额尔古纳市",
"value":"854",
"childrens":[]},
{
"label":"陈巴尔虎旗",
"value":"855",
"childrens":[]},
{
"label":"阿荣旗",
"value":"856",
"childrens":[]},
{
"label":"新巴尔虎左旗",
"value":"857",
"childrens":[]},
{
"label":"新巴尔虎右旗",
"value":"858",
"childrens":[]},
{
"label":"鄂伦春旗",
"value":"859",
"childrens":[]},
{
"label":"莫力达瓦旗",
"value":"860",
"childrens":[]},
{
"label":"鄂温克族旗",
"value":"861",
"childrens":[]}]},

{
"label":"鄂尔多斯市",
"value":"870",
"childrens":[{
"label":"东胜区",
"value":"871",
"childrens":[]},
{
"label":"准格尔旗",
"value":"872",
"childrens":[]},
{
"label":"伊金霍洛旗",
"value":"874",
"childrens":[]},
{
"label":"乌审旗",
"value":"875",
"childrens":[]},
{
"label":"杭锦旗",
"value":"876",
"childrens":[]},
{
"label":"鄂托克旗",
"value":"877",
"childrens":[]},
{
"label":"鄂托克前旗",
"value":"878",
"childrens":[]},
{
"label":"达拉特旗",
"value":"879",
"childrens":[]},
{
"label":"康巴什新区",
"value":"53478",
"childrens":[]}]},

{
"label":"巴彦淖尔市",
"value":"880",
"childrens":[{
"label":"临河区",
"value":"881",
"childrens":[]},
{
"label":"五原县",
"value":"882",
"childrens":[]},
{
"label":"磴口县",
"value":"883",
"childrens":[]},
{
"label":"杭锦后旗",
"value":"884",
"childrens":[]},
{
"label":"乌拉特中旗",
"value":"885",
"childrens":[]},
{
"label":"乌拉特后旗",
"value":"888",
"childrens":[]},
{
"label":"乌拉特前旗",
"value":"890",
"childrens":[]}]},

{
"label":"阿拉善盟",
"value":"891",
"childrens":[{
"label":"阿拉善右旗",
"value":"892",
"childrens":[]},
{
"label":"阿拉善左旗",
"value":"893",
"childrens":[]},
{
"label":"额济纳旗",
"value":"894",
"childrens":[]}]},

{
"label":"兴安盟",
"value":"895",
"childrens":[{
"label":"乌兰浩特市",
"value":"896",
"childrens":[]},
{
"label":"阿尔山市",
"value":"897",
"childrens":[]},
{
"label":"突泉县",
"value":"898",
"childrens":[]},
{
"label":"扎赍特旗",
"value":"899",
"childrens":[]},
{
"label":"科尔沁右翼前旗",
"value":"900",
"childrens":[]},
{
"label":"科尔沁右翼中旗",
"value":"901",
"childrens":[]}]},

{
"label":"通辽市",
"value":"902",
"childrens":[{
"label":"霍林郭勒市",
"value":"3142",
"childrens":[]},
{
"label":"开鲁县",
"value":"3252",
"childrens":[]},
{
"label":"库伦旗",
"value":"3253",
"childrens":[]},
{
"label":"奈曼旗",
"value":"3254",
"childrens":[]},
{
"label":"扎鲁特旗",
"value":"3255",
"childrens":[]},
{
"label":"科尔沁左翼中旗",
"value":"3256",
"childrens":[]},
{
"label":"科尔沁左翼后旗",
"value":"3258",
"childrens":[]},
{
"label":"科尔沁区",
"value":"53479",
"childrens":[]}]}]},


{
"label":"江苏",
"value":"12",
"childrens":[{
"label":"南京市",
"value":"904",
"childrens":[{
"label":"江宁区",
"value":"905",
"childrens":[{
"label":"丹阳镇",
"value":"52411",
"childrens":[]},
{
"label":"谷里镇",
"value":"52412",
"childrens":[]},
{
"label":"横溪镇",
"value":"52413",
"childrens":[]},
{
"label":"江宁镇",
"value":"52414",
"childrens":[]},
{
"label":"陆郎镇",
"value":"52415",
"childrens":[]},
{
"label":"秣陵镇",
"value":"52416",
"childrens":[]},
{
"label":"禄口镇",
"value":"52417",
"childrens":[]},
{
"label":"陶吴镇",
"value":"52418",
"childrens":[]},
{
"label":"铜山镇",
"value":"52419",
"childrens":[]},
{
"label":"朱门镇",
"value":"52420",
"childrens":[]},
{
"label":"东善桥镇",
"value":"52421",
"childrens":[]},
{
"label":"淳化镇",
"value":"52422",
"childrens":[]},
{
"label":"湖熟镇",
"value":"52423",
"childrens":[]},
{
"label":"汤山镇",
"value":"52424",
"childrens":[]},
{
"label":"城区",
"value":"52425",
"childrens":[]}]},

{
"label":"高淳区",
"value":"907",
"childrens":[{
"label":"淳溪镇",
"value":"52426",
"childrens":[]},
{
"label":"东坝镇",
"value":"52427",
"childrens":[]},
{
"label":"古柏镇",
"value":"52428",
"childrens":[]},
{
"label":"固城镇",
"value":"52429",
"childrens":[]},
{
"label":"漆桥镇",
"value":"52430",
"childrens":[]},
{
"label":"桠溪镇",
"value":"52431",
"childrens":[]},
{
"label":"阳江镇",
"value":"52432",
"childrens":[]},
{
"label":"砖墙镇",
"value":"52433",
"childrens":[]}]},

{
"label":"六合区",
"value":"908",
"childrens":[{
"label":"竹镇",
"value":"52439",
"childrens":[]},
{
"label":"东沟镇",
"value":"52444",
"childrens":[]},
{
"label":"瓜埠镇",
"value":"52446",
"childrens":[]},
{
"label":"龙袍镇",
"value":"52447",
"childrens":[]},
{
"label":"马鞍镇",
"value":"52448",
"childrens":[]},
{
"label":"马集镇",
"value":"52449",
"childrens":[]},
{
"label":"心篁镇",
"value":"52452",
"childrens":[]},
{
"label":"玉带镇",
"value":"52454",
"childrens":[]},
{
"label":"八百镇",
"value":"52456",
"childrens":[]},
{
"label":"新集镇",
"value":"52458",
"childrens":[]},
{
"label":"梵集街镇",
"value":"52463",
"childrens":[]},
{
"label":"化工园区",
"value":"52464",
"childrens":[]},
{
"label":"沿江工业开发区",
"value":"52465",
"childrens":[]},
{
"label":"城区",
"value":"52466",
"childrens":[]},
{
"label":"冶山镇",
"value":"52467",
"childrens":[]},
{
"label":"横梁镇",
"value":"52468",
"childrens":[]},
{
"label":"八百桥镇",
"value":"52469",
"childrens":[]}]},

{
"label":"溧水区",
"value":"3024",
"childrens":[{
"label":"白马镇",
"value":"52474",
"childrens":[]},
{
"label":"东屏镇",
"value":"52477",
"childrens":[]},
{
"label":"和凤镇",
"value":"52480",
"childrens":[]},
{
"label":"洪蓝镇",
"value":"52482",
"childrens":[]},
{
"label":"晶桥镇",
"value":"52483",
"childrens":[]},
{
"label":"永阳镇",
"value":"52503",
"childrens":[]},
{
"label":"柘塘镇",
"value":"52504",
"childrens":[]},
{
"label":"石湫镇",
"value":"52505",
"childrens":[]}]},

{
"label":"玄武区",
"value":"3373",
"childrens":[]},
{
"label":"秦淮区",
"value":"3375",
"childrens":[]},
{
"label":"建邺区",
"value":"3376",
"childrens":[{
"label":"江心洲",
"value":"52519",
"childrens":[]},
{
"label":"城区",
"value":"52520",
"childrens":[]}]},

{
"label":"鼓楼区",
"value":"3377",
"childrens":[]},
{
"label":"栖霞区",
"value":"3378",
"childrens":[{
"label":"龙潭镇",
"value":"52526",
"childrens":[]},
{
"label":"城区",
"value":"52527",
"childrens":[]},
{
"label":"八卦洲",
"value":"52528",
"childrens":[]}]},

{
"label":"雨花台区",
"value":"3379",
"childrens":[]},
{
"label":"浦口区",
"value":"52410",
"childrens":[{
"label":"城区",
"value":"52534",
"childrens":[]},
{
"label":"桥林镇",
"value":"52537",
"childrens":[]},
{
"label":"汤泉镇",
"value":"52539",
"childrens":[]},
{
"label":"珠江镇",
"value":"52541",
"childrens":[]},
{
"label":"乌江镇",
"value":"52544",
"childrens":[]},
{
"label":"永宁镇",
"value":"52546",
"childrens":[]},
{
"label":"星甸镇",
"value":"52547",
"childrens":[]},
{
"label":"石桥镇",
"value":"52550",
"childrens":[]}]}]},


{
"label":"徐州市",
"value":"911",
"childrens":[{
"label":"铜山区",
"value":"914",
"childrens":[{
"label":"城区",
"value":"52602",
"childrens":[]},
{
"label":"伊庄镇",
"value":"52604",
"childrens":[]},
{
"label":"徐庄镇",
"value":"52605",
"childrens":[]},
{
"label":"棠张镇",
"value":"52607",
"childrens":[]},
{
"label":"大许镇",
"value":"52609",
"childrens":[]},
{
"label":"柳新镇",
"value":"52610",
"childrens":[]},
{
"label":"汉王镇",
"value":"52611",
"childrens":[]},
{
"label":"铜山镇",
"value":"52612",
"childrens":[]},
{
"label":"柳泉镇",
"value":"52613",
"childrens":[]},
{
"label":"何桥镇",
"value":"52614",
"childrens":[]},
{
"label":"马坡镇",
"value":"52615",
"childrens":[]},
{
"label":"大彭镇",
"value":"52616",
"childrens":[]},
{
"label":"郑集镇",
"value":"52617",
"childrens":[]},
{
"label":"张集镇",
"value":"52618",
"childrens":[]},
{
"label":"刘集镇",
"value":"52619",
"childrens":[]},
{
"label":"黄集镇",
"value":"52620",
"childrens":[]},
{
"label":"单集镇",
"value":"52621",
"childrens":[]},
{
"label":"利国镇",
"value":"52622",
"childrens":[]},
{
"label":"茅村镇",
"value":"52623",
"childrens":[]},
{
"label":"房村镇",
"value":"52624",
"childrens":[]},
{
"label":"三堡镇",
"value":"52625",
"childrens":[]}]},

{
"label":"睢宁县",
"value":"915",
"childrens":[{
"label":"高作镇",
"value":"52647",
"childrens":[]},
{
"label":"桃园镇",
"value":"52648",
"childrens":[]},
{
"label":"岚山镇",
"value":"52649",
"childrens":[]},
{
"label":"官山镇",
"value":"52650",
"childrens":[]},
{
"label":"古邳镇",
"value":"52651",
"childrens":[]},
{
"label":"姚集镇",
"value":"52652",
"childrens":[]},
{
"label":"魏集镇",
"value":"52653",
"childrens":[]},
{
"label":"王集镇",
"value":"52654",
"childrens":[]},
{
"label":"沙集镇",
"value":"52655",
"childrens":[]},
{
"label":"邱集镇",
"value":"52656",
"childrens":[]},
{
"label":"梁集镇",
"value":"52657",
"childrens":[]},
{
"label":"李集镇",
"value":"52658",
"childrens":[]},
{
"label":"双沟镇",
"value":"52659",
"childrens":[]},
{
"label":"睢城镇",
"value":"52660",
"childrens":[]},
{
"label":"凌城镇",
"value":"52661",
"childrens":[]},
{
"label":"庆安镇",
"value":"52662",
"childrens":[]},
{
"label":"城区",
"value":"52663",
"childrens":[]}]},

{
"label":"沛县",
"value":"916",
"childrens":[{
"label":"张庄镇",
"value":"52664",
"childrens":[]},
{
"label":"朱寨镇",
"value":"52665",
"childrens":[]},
{
"label":"张寨镇",
"value":"52666",
"childrens":[]},
{
"label":"胡寨镇",
"value":"52667",
"childrens":[]},
{
"label":"杨屯镇",
"value":"52668",
"childrens":[]},
{
"label":"大屯镇",
"value":"52669",
"childrens":[]},
{
"label":"栖山镇",
"value":"52670",
"childrens":[]},
{
"label":"魏庙镇",
"value":"52671",
"childrens":[]},
{
"label":"鹿楼镇",
"value":"52672",
"childrens":[]},
{
"label":"河口镇",
"value":"52673",
"childrens":[]},
{
"label":"安国镇",
"value":"52674",
"childrens":[]},
{
"label":"龙固镇",
"value":"52675",
"childrens":[]},
{
"label":"五段镇",
"value":"52676",
"childrens":[]},
{
"label":"沛城镇",
"value":"52677",
"childrens":[]},
{
"label":"敬安镇",
"value":"52678",
"childrens":[]},
{
"label":"城区",
"value":"52679",
"childrens":[]}]},

{
"label":"丰县",
"value":"917",
"childrens":[{
"label":"大沙河镇",
"value":"52680",
"childrens":[]},
{
"label":"赵庄镇",
"value":"52681",
"childrens":[]},
{
"label":"师寨镇",
"value":"52682",
"childrens":[]},
{
"label":"梁寨镇",
"value":"52683",
"childrens":[]},
{
"label":"首羡镇",
"value":"52684",
"childrens":[]},
{
"label":"华山镇",
"value":"52685",
"childrens":[]},
{
"label":"孙楼镇",
"value":"52686",
"childrens":[]},
{
"label":"宋楼镇",
"value":"52687",
"childrens":[]},
{
"label":"范楼镇",
"value":"52688",
"childrens":[]},
{
"label":"欢口镇",
"value":"52689",
"childrens":[]},
{
"label":"顺河镇",
"value":"52690",
"childrens":[]},
{
"label":"王沟镇",
"value":"52691",
"childrens":[]},
{
"label":"常店镇",
"value":"52692",
"childrens":[]},
{
"label":"凤城镇",
"value":"52693",
"childrens":[]},
{
"label":"城区",
"value":"52694",
"childrens":[]}]},

{
"label":"贾汪区",
"value":"3388",
"childrens":[{
"label":"城区",
"value":"52695",
"childrens":[]},
{
"label":"青山泉镇",
"value":"52696",
"childrens":[]},
{
"label":"紫庄镇",
"value":"52697",
"childrens":[]},
{
"label":"江庄镇",
"value":"52698",
"childrens":[]},
{
"label":"大吴镇",
"value":"52699",
"childrens":[]},
{
"label":"贾汪镇",
"value":"52700",
"childrens":[]},
{
"label":"汴塘镇",
"value":"52701",
"childrens":[]},
{
"label":"塔山镇",
"value":"52702",
"childrens":[]}]},

{
"label":"金山桥开发区",
"value":"4223",
"childrens":[]},
{
"label":"铜山经济技术开发区",
"value":"4224",
"childrens":[]},
{
"label":"八段工业园区",
"value":"4228",
"childrens":[]},
{
"label":"鼓楼区",
"value":"52580",
"childrens":[{
"label":"城区",
"value":"52703",
"childrens":[]},
{
"label":"大黄山镇",
"value":"52704",
"childrens":[]},
{
"label":"大庙镇",
"value":"52705",
"childrens":[]}]},

{
"label":"邳州市",
"value":"52582",
"childrens":[{
"label":"宿羊山镇",
"value":"52706",
"childrens":[]},
{
"label":"车辐山镇",
"value":"52707",
"childrens":[]},
{
"label":"燕子埠镇",
"value":"52708",
"childrens":[]},
{
"label":"八义集镇",
"value":"52709",
"childrens":[]},
{
"label":"邹庄镇",
"value":"52710",
"childrens":[]},
{
"label":"碾庄镇",
"value":"52711",
"childrens":[]},
{
"label":"戴庄镇",
"value":"52712",
"childrens":[]},
{
"label":"戴圩镇",
"value":"52713",
"childrens":[]},
{
"label":"港上镇",
"value":"52714",
"childrens":[]},
{
"label":"议堂镇",
"value":"52715",
"childrens":[]},
{
"label":"土山镇",
"value":"52716",
"childrens":[]},
{
"label":"八路镇",
"value":"52717",
"childrens":[]},
{
"label":"邢楼镇",
"value":"52718",
"childrens":[]},
{
"label":"陈楼镇",
"value":"52719",
"childrens":[]},
{
"label":"四户镇",
"value":"52720",
"childrens":[]},
{
"label":"官湖镇",
"value":"52721",
"childrens":[]},
{
"label":"运河镇",
"value":"52722",
"childrens":[]},
{
"label":"新河镇",
"value":"52723",
"childrens":[]},
{
"label":"岔河镇",
"value":"52724",
"childrens":[]},
{
"label":"铁富镇",
"value":"52725",
"childrens":[]},
{
"label":"赵墩镇",
"value":"52726",
"childrens":[]},
{
"label":"占城镇",
"value":"52727",
"childrens":[]},
{
"label":"邳城镇",
"value":"52728",
"childrens":[]},
{
"label":"炮车镇",
"value":"52729",
"childrens":[]}]},

{
"label":"泉山区",
"value":"52585",
"childrens":[]},
{
"label":"新沂市",
"value":"52586",
"childrens":[{
"label":"双塘镇",
"value":"52730",
"childrens":[]},
{
"label":"新安镇",
"value":"52731",
"childrens":[]},
{
"label":"北沟镇",
"value":"52732",
"childrens":[]},
{
"label":"瓦窑镇",
"value":"52733",
"childrens":[]},
{
"label":"高流镇",
"value":"52734",
"childrens":[]},
{
"label":"唐店镇",
"value":"52735",
"childrens":[]},
{
"label":"合沟镇",
"value":"52736",
"childrens":[]},
{
"label":"港头镇",
"value":"52737",
"childrens":[]},
{
"label":"时集镇",
"value":"52738",
"childrens":[]},
{
"label":"棋盘镇",
"value":"52739",
"childrens":[]},
{
"label":"窑湾镇",
"value":"52740",
"childrens":[]},
{
"label":"阿湖镇",
"value":"52741",
"childrens":[]},
{
"label":"邵店镇",
"value":"52742",
"childrens":[]},
{
"label":"草桥镇",
"value":"52743",
"childrens":[]},
{
"label":"新店镇",
"value":"52744",
"childrens":[]},
{
"label":"马陵山镇",
"value":"52745",
"childrens":[]}]},

{
"label":"云龙区",
"value":"52587",
"childrens":[]}]},

{
"label":"连云港市",
"value":"919",
"childrens":[{
"label":"赣榆县",
"value":"920",
"childrens":[{
"label":"城区",
"value":"52747",
"childrens":[]},
{
"label":"宋庄镇",
"value":"52748",
"childrens":[]},
{
"label":"厉庄镇",
"value":"52749",
"childrens":[]},
{
"label":"班庄镇",
"value":"52750",
"childrens":[]},
{
"label":"罗阳镇",
"value":"52751",
"childrens":[]},
{
"label":"城西镇",
"value":"52752",
"childrens":[]},
{
"label":"柘汪镇",
"value":"52753",
"childrens":[]},
{
"label":"海头镇",
"value":"52754",
"childrens":[]},
{
"label":"城头镇",
"value":"52755",
"childrens":[]},
{
"label":"墩尚镇",
"value":"52756",
"childrens":[]},
{
"label":"塔山镇",
"value":"52757",
"childrens":[]},
{
"label":"金山镇",
"value":"52758",
"childrens":[]},
{
"label":"石桥镇",
"value":"52759",
"childrens":[]},
{
"label":"赣马镇",
"value":"52760",
"childrens":[]},
{
"label":"黑林镇",
"value":"52761",
"childrens":[]},
{
"label":"青口镇",
"value":"52762",
"childrens":[]},
{
"label":"沙河镇",
"value":"52763",
"childrens":[]},
{
"label":"门河镇",
"value":"52764",
"childrens":[]},
{
"label":"欢墩镇",
"value":"52765",
"childrens":[]}]},

{
"label":"灌云县",
"value":"921",
"childrens":[{
"label":"城区",
"value":"52766",
"childrens":[]},
{
"label":"燕尾港镇",
"value":"52767",
"childrens":[]},
{
"label":"同兴镇",
"value":"52768",
"childrens":[]},
{
"label":"伊山镇",
"value":"52769",
"childrens":[]},
{
"label":"龙苴镇",
"value":"52770",
"childrens":[]},
{
"label":"杨集镇",
"value":"52771",
"childrens":[]},
{
"label":"圩丰镇",
"value":"52772",
"childrens":[]},
{
"label":"四队镇",
"value":"52773",
"childrens":[]},
{
"label":"东王集乡",
"value":"52774",
"childrens":[]},
{
"label":"侍庄乡",
"value":"52775",
"childrens":[]},
{
"label":"小伊乡",
"value":"52776",
"childrens":[]},
{
"label":"白蚬乡",
"value":"52777",
"childrens":[]},
{
"label":"穆圩乡",
"value":"52778",
"childrens":[]},
{
"label":"伊芦乡",
"value":"52779",
"childrens":[]},
{
"label":"图河乡",
"value":"52780",
"childrens":[]},
{
"label":"鲁河乡",
"value":"52781",
"childrens":[]},
{
"label":"陡沟乡",
"value":"52782",
"childrens":[]},
{
"label":"南岗乡",
"value":"52783",
"childrens":[]},
{
"label":"下车乡",
"value":"52784",
"childrens":[]},
{
"label":"沂北乡",
"value":"52785",
"childrens":[]}]},

{
"label":"东海县",
"value":"922",
"childrens":[{
"label":"城区",
"value":"52786",
"childrens":[]},
{
"label":"石梁河镇",
"value":"52787",
"childrens":[]},
{
"label":"白塔埠镇",
"value":"52788",
"childrens":[]},
{
"label":"洪庄镇",
"value":"52789",
"childrens":[]},
{
"label":"牛山镇",
"value":"52790",
"childrens":[]},
{
"label":"房山镇",
"value":"52791",
"childrens":[]},
{
"label":"温泉镇",
"value":"52792",
"childrens":[]},
{
"label":"平明镇",
"value":"52793",
"childrens":[]},
{
"label":"石榴镇",
"value":"52794",
"childrens":[]},
{
"label":"桃林镇",
"value":"52795",
"childrens":[]},
{
"label":"青湖镇",
"value":"52796",
"childrens":[]},
{
"label":"安峰镇",
"value":"52797",
"childrens":[]},
{
"label":"双店镇",
"value":"52798",
"childrens":[]},
{
"label":"黄川镇",
"value":"52799",
"childrens":[]},
{
"label":"山左口乡",
"value":"52800",
"childrens":[]},
{
"label":"曲阳乡",
"value":"52801",
"childrens":[]},
{
"label":"张湾乡",
"value":"52802",
"childrens":[]},
{
"label":"李埝乡",
"value":"52803",
"childrens":[]},
{
"label":"石湖乡",
"value":"52804",
"childrens":[]},
{
"label":"横沟乡",
"value":"52805",
"childrens":[]},
{
"label":"驼峰乡",
"value":"52806",
"childrens":[]},
{
"label":"南辰乡",
"value":"52807",
"childrens":[]}]},

{
"label":"灌南县",
"value":"923",
"childrens":[{
"label":"城区",
"value":"52808",
"childrens":[]},
{
"label":"孟兴庄镇",
"value":"52809",
"childrens":[]},
{
"label":"北陈集镇",
"value":"52810",
"childrens":[]},
{
"label":"堆沟港镇",
"value":"52811",
"childrens":[]},
{
"label":"长茂镇",
"value":"52812",
"childrens":[]},
{
"label":"百禄镇",
"value":"52813",
"childrens":[]},
{
"label":"三口镇",
"value":"52814",
"childrens":[]},
{
"label":"汤沟镇",
"value":"52815",
"childrens":[]},
{
"label":"张店镇",
"value":"52816",
"childrens":[]},
{
"label":"新安镇",
"value":"52817",
"childrens":[]},
{
"label":"花园乡",
"value":"52818",
"childrens":[]},
{
"label":"田楼乡",
"value":"52819",
"childrens":[]},
{
"label":"新集乡",
"value":"52820",
"childrens":[]},
{
"label":"李集乡",
"value":"52821",
"childrens":[]},
{
"label":"五队乡",
"value":"52822",
"childrens":[]}]},

{
"label":"连云区",
"value":"4248",
"childrens":[{
"label":"城区",
"value":"52823",
"childrens":[]},
{
"label":"板桥镇",
"value":"52824",
"childrens":[]},
{
"label":"徐圩镇",
"value":"52825",
"childrens":[]},
{
"label":"东辛农场",
"value":"52826",
"childrens":[]},
{
"label":"连岛",
"value":"52827",
"childrens":[]},
{
"label":"朝阳镇",
"value":"52828",
"childrens":[]},
{
"label":"前三岛乡",
"value":"52829",
"childrens":[]},
{
"label":"高公岛乡",
"value":"52830",
"childrens":[]},
{
"label":"宿城乡",
"value":"52831",
"childrens":[]}]},

{
"label":"海州区",
"value":"52746",
"childrens":[{
"label":"城区",
"value":"52832",
"childrens":[]},
{
"label":"南城镇",
"value":"52833",
"childrens":[]},
{
"label":"浦南镇",
"value":"52834",
"childrens":[]},
{
"label":"云台乡",
"value":"52835",
"childrens":[]},
{
"label":"岗埠农场",
"value":"52836",
"childrens":[]},
{
"label":"板浦镇",
"value":"52837",
"childrens":[]},
{
"label":"锦屏镇",
"value":"52838",
"childrens":[]},
{
"label":"新坝镇",
"value":"52839",
"childrens":[]},
{
"label":"宁海乡",
"value":"52840",
"childrens":[]}]}]},


{
"label":"淮安市",
"value":"925",
"childrens":[{
"label":"洪泽县",
"value":"929",
"childrens":[{
"label":"城区",
"value":"52847",
"childrens":[]},
{
"label":"高良涧镇",
"value":"52848",
"childrens":[]},
{
"label":"东双沟镇",
"value":"52849",
"childrens":[]},
{
"label":"老子山镇",
"value":"52850",
"childrens":[]},
{
"label":"西顺河镇",
"value":"52851",
"childrens":[]},
{
"label":"岔河镇",
"value":"52852",
"childrens":[]},
{
"label":"共和镇",
"value":"52853",
"childrens":[]},
{
"label":"黄集镇",
"value":"52854",
"childrens":[]},
{
"label":"蒋坝镇",
"value":"52855",
"childrens":[]},
{
"label":"仁和镇",
"value":"52856",
"childrens":[]},
{
"label":"三河镇",
"value":"52857",
"childrens":[]},
{
"label":"万集镇",
"value":"52858",
"childrens":[]},
{
"label":"朱坝镇",
"value":"52859",
"childrens":[]}]},

{
"label":"金湖县",
"value":"930",
"childrens":[{
"label":"城区",
"value":"52860",
"childrens":[]},
{
"label":"黎城镇",
"value":"52861",
"childrens":[]},
{
"label":"陈桥镇",
"value":"52862",
"childrens":[]},
{
"label":"戴楼镇",
"value":"52863",
"childrens":[]},
{
"label":"金北镇",
"value":"52864",
"childrens":[]},
{
"label":"金南镇",
"value":"52865",
"childrens":[]},
{
"label":"吕良镇",
"value":"52866",
"childrens":[]},
{
"label":"闵桥镇",
"value":"52867",
"childrens":[]},
{
"label":"前锋镇",
"value":"52868",
"childrens":[]},
{
"label":"塔集镇",
"value":"52869",
"childrens":[]},
{
"label":"涂沟镇",
"value":"52870",
"childrens":[]},
{
"label":"银集镇",
"value":"52871",
"childrens":[]}]},

{
"label":"盱眙县",
"value":"931",
"childrens":[{
"label":"城区",
"value":"52872",
"childrens":[]},
{
"label":"盱城镇",
"value":"52873",
"childrens":[]},
{
"label":"鲍集镇",
"value":"52874",
"childrens":[]},
{
"label":"仇集镇",
"value":"52875",
"childrens":[]},
{
"label":"官滩镇",
"value":"52876",
"childrens":[]},
{
"label":"管镇镇",
"value":"52877",
"childrens":[]},
{
"label":"桂五镇",
"value":"52878",
"childrens":[]},
{
"label":"河桥镇",
"value":"52879",
"childrens":[]},
{
"label":"淮河镇",
"value":"52880",
"childrens":[]},
{
"label":"旧铺镇",
"value":"52881",
"childrens":[]},
{
"label":"马坝镇",
"value":"52882",
"childrens":[]},
{
"label":"铁佛镇",
"value":"52883",
"childrens":[]},
{
"label":"观音寺镇",
"value":"52884",
"childrens":[]},
{
"label":"黄花塘镇",
"value":"52885",
"childrens":[]},
{
"label":"明祖陵镇",
"value":"52886",
"childrens":[]},
{
"label":"古桑乡",
"value":"52887",
"childrens":[]},
{
"label":"穆店乡",
"value":"52888",
"childrens":[]},
{
"label":"王店乡",
"value":"52889",
"childrens":[]},
{
"label":"维桥乡",
"value":"52890",
"childrens":[]},
{
"label":"兴隆乡",
"value":"52891",
"childrens":[]}]},

{
"label":"经济开发区",
"value":"4305",
"childrens":[]},
{
"label":"淮安区",
"value":"52841",
"childrens":[{
"label":"博里镇",
"value":"52892",
"childrens":[]},
{
"label":"车桥镇",
"value":"52893",
"childrens":[]},
{
"label":"仇桥镇",
"value":"52894",
"childrens":[]},
{
"label":"范集镇",
"value":"52895",
"childrens":[]},
{
"label":"复兴镇",
"value":"52896",
"childrens":[]},
{
"label":"淮城镇",
"value":"52897",
"childrens":[]},
{
"label":"季桥镇",
"value":"52898",
"childrens":[]},
{
"label":"泾口镇",
"value":"52899",
"childrens":[]},
{
"label":"林集镇",
"value":"52900",
"childrens":[]},
{
"label":"流均镇",
"value":"52901",
"childrens":[]},
{
"label":"马甸镇",
"value":"52902",
"childrens":[]},
{
"label":"南闸镇",
"value":"52903",
"childrens":[]},
{
"label":"平桥镇",
"value":"52904",
"childrens":[]},
{
"label":"钦工镇",
"value":"52905",
"childrens":[]},
{
"label":"上河镇",
"value":"52906",
"childrens":[]},
{
"label":"施河镇",
"value":"52907",
"childrens":[]},
{
"label":"顺河镇",
"value":"52908",
"childrens":[]},
{
"label":"苏嘴镇",
"value":"52909",
"childrens":[]},
{
"label":"溪河镇",
"value":"52910",
"childrens":[]},
{
"label":"席桥镇",
"value":"52911",
"childrens":[]},
{
"label":"朱桥镇",
"value":"52912",
"childrens":[]},
{
"label":"建淮乡",
"value":"52913",
"childrens":[]},
{
"label":"城东乡",
"value":"52914",
"childrens":[]},
{
"label":"茭陵乡",
"value":"52915",
"childrens":[]},
{
"label":"三堡乡",
"value":"52916",
"childrens":[]},
{
"label":"宋集乡",
"value":"52917",
"childrens":[]}]},

{
"label":"清河区",
"value":"52842",
"childrens":[{
"label":"城区",
"value":"52918",
"childrens":[]},
{
"label":"南马厂乡",
"value":"52919",
"childrens":[]},
{
"label":"钵池乡",
"value":"52920",
"childrens":[]},
{
"label":"徐杨乡",
"value":"52921",
"childrens":[]}]},

{
"label":"淮阴区",
"value":"52843",
"childrens":[{
"label":"三树镇",
"value":"52922",
"childrens":[]},
{
"label":"王兴镇",
"value":"52923",
"childrens":[]},
{
"label":"吴城镇",
"value":"52924",
"childrens":[]},
{
"label":"吴集镇",
"value":"52925",
"childrens":[]},
{
"label":"五里镇",
"value":"52926",
"childrens":[]},
{
"label":"徐溜镇",
"value":"52927",
"childrens":[]},
{
"label":"渔沟镇",
"value":"52928",
"childrens":[]},
{
"label":"赵集镇",
"value":"52929",
"childrens":[]},
{
"label":"王营镇",
"value":"52930",
"childrens":[]},
{
"label":"老张集乡",
"value":"52931",
"childrens":[]},
{
"label":"刘老庄乡",
"value":"52932",
"childrens":[]},
{
"label":"古寨乡",
"value":"52933",
"childrens":[]},
{
"label":"韩桥乡",
"value":"52934",
"childrens":[]},
{
"label":"凌桥乡",
"value":"52935",
"childrens":[]},
{
"label":"新渡乡",
"value":"52936",
"childrens":[]},
{
"label":"袁集乡",
"value":"52937",
"childrens":[]},
{
"label":"棉花庄镇",
"value":"52938",
"childrens":[]},
{
"label":"南陈集镇",
"value":"52939",
"childrens":[]},
{
"label":"西宋集镇",
"value":"52940",
"childrens":[]},
{
"label":"丁集镇",
"value":"52941",
"childrens":[]},
{
"label":"码头镇",
"value":"52942",
"childrens":[]}]},

{
"label":"清浦区",
"value":"52844",
"childrens":[{
"label":"城区",
"value":"52943",
"childrens":[]},
{
"label":"和平镇",
"value":"52944",
"childrens":[]},
{
"label":"武墩镇",
"value":"52945",
"childrens":[]},
{
"label":"盐河镇",
"value":"52946",
"childrens":[]},
{
"label":"黄码乡",
"value":"52947",
"childrens":[]},
{
"label":"城南乡",
"value":"52948",
"childrens":[]}]},

{
"label":"涟水县",
"value":"52845",
"childrens":[{
"label":"城区",
"value":"52949",
"childrens":[]},
{
"label":"涟城镇",
"value":"52950",
"childrens":[]},
{
"label":"陈师镇",
"value":"52951",
"childrens":[]},
{
"label":"高沟镇",
"value":"52952",
"childrens":[]},
{
"label":"朱码镇",
"value":"52953",
"childrens":[]},
{
"label":"保滩镇",
"value":"52954",
"childrens":[]},
{
"label":"岔庙镇",
"value":"52955",
"childrens":[]},
{
"label":"成集镇",
"value":"52956",
"childrens":[]},
{
"label":"大东镇",
"value":"52957",
"childrens":[]},
{
"label":"红窑镇",
"value":"52958",
"childrens":[]},
{
"label":"梁岔镇",
"value":"52959",
"childrens":[]},
{
"label":"南集镇",
"value":"52960",
"childrens":[]},
{
"label":"前进镇",
"value":"52961",
"childrens":[]},
{
"label":"石湖镇",
"value":"52962",
"childrens":[]},
{
"label":"唐集镇",
"value":"52963",
"childrens":[]},
{
"label":"五港镇",
"value":"52964",
"childrens":[]},
{
"label":"义兴镇",
"value":"52965",
"childrens":[]},
{
"label":"东胡集镇",
"value":"52966",
"childrens":[]},
{
"label":"黄营乡",
"value":"52967",
"childrens":[]},
{
"label":"徐集乡",
"value":"52968",
"childrens":[]}]},

{
"label":"清江浦区",
"value":"52846",
"childrens":[{
"label":"黄码乡",
"value":"52969",
"childrens":[]},
{
"label":"盐河镇",
"value":"52970",
"childrens":[]},
{
"label":"城区",
"value":"52971",
"childrens":[]},
{
"label":"和平镇",
"value":"52972",
"childrens":[]},
{
"label":"武墩镇",
"value":"52973",
"childrens":[]}]}]},


{
"label":"宿迁市",
"value":"933",
"childrens":[{
"label":"宿豫区",
"value":"934",
"childrens":[]},
{
"label":"泗洪县",
"value":"937",
"childrens":[]},
{
"label":"宿城区",
"value":"3407",
"childrens":[]},
{
"label":"沭阳县",
"value":"8558",
"childrens":[]},
{
"label":"泗阳县",
"value":"8559",
"childrens":[]},
{
"label":"宿迁经济开发区",
"value":"52974",
"childrens":[]}]},

{
"label":"盐城市",
"value":"939",
"childrens":[{
"label":"东台市",
"value":"940",
"childrens":[]},
{
"label":"大丰市",
"value":"941",
"childrens":[]},
{
"label":"建湖县",
"value":"945",
"childrens":[]},
{
"label":"响水县",
"value":"946",
"childrens":[]},
{
"label":"阜宁县",
"value":"948",
"childrens":[]},
{
"label":"滨海县",
"value":"949",
"childrens":[]},
{
"label":"射阳县",
"value":"52975",
"childrens":[]},
{
"label":"亭湖区",
"value":"52976",
"childrens":[]},
{
"label":"盐都区",
"value":"52977",
"childrens":[]}]},

{
"label":"扬州市",
"value":"951",
"childrens":[{
"label":"广陵区",
"value":"955",
"childrens":[]},
{
"label":"邗江区",
"value":"956",
"childrens":[]},
{
"label":"宝应县",
"value":"957",
"childrens":[]},
{
"label":"仪征市",
"value":"52978",
"childrens":[]},
{
"label":"高邮市",
"value":"52979",
"childrens":[]},
{
"label":"江都区",
"value":"52980",
"childrens":[]}]},

{
"label":"泰州市",
"value":"959",
"childrens":[{
"label":"泰兴市",
"value":"960",
"childrens":[]},
{
"label":"靖江市",
"value":"962",
"childrens":[]},
{
"label":"兴化市",
"value":"963",
"childrens":[]},
{
"label":"高港区",
"value":"3405",
"childrens":[]},
{
"label":"海陵区",
"value":"3406",
"childrens":[]},
{
"label":"泰州医药高新区",
"value":"52981",
"childrens":[]},
{
"label":"姜堰区",
"value":"52982",
"childrens":[]}]},

{
"label":"南通市",
"value":"965",
"childrens":[{
"label":"通州区",
"value":"967",
"childrens":[]},
{
"label":"如东县",
"value":"970",
"childrens":[]},
{
"label":"海安县",
"value":"2774",
"childrens":[]},
{
"label":"港闸区",
"value":"3394",
"childrens":[]},
{
"label":"崇川区",
"value":"3395",
"childrens":[]},
{
"label":"南通经济技术开发区",
"value":"4385",
"childrens":[]},
{
"label":"如皋市",
"value":"52985",
"childrens":[]},
{
"label":"海门市",
"value":"52986",
"childrens":[]},
{
"label":"启东市",
"value":"52987",
"childrens":[]}]},

{
"label":"镇江市",
"value":"972",
"childrens":[{
"label":"扬中市",
"value":"973",
"childrens":[]},
{
"label":"丹徒区",
"value":"976",
"childrens":[]},
{
"label":"润州区",
"value":"3403",
"childrens":[]},
{
"label":"京口区",
"value":"3404",
"childrens":[]},
{
"label":"镇江新区",
"value":"4916",
"childrens":[]},
{
"label":"丹阳市",
"value":"52992",
"childrens":[]},
{
"label":"句容市",
"value":"52993",
"childrens":[]},
{
"label":"丹徒新区",
"value":"52994",
"childrens":[]}]},

{
"label":"常州市",
"value":"978",
"childrens":[{
"label":"金坛市",
"value":"980",
"childrens":[]},
{
"label":"溧阳市",
"value":"981",
"childrens":[]},
{
"label":"新北区",
"value":"2927",
"childrens":[]},
{
"label":"钟楼区",
"value":"3392",
"childrens":[]},
{
"label":"天宁区",
"value":"3393",
"childrens":[]},
{
"label":"武进区",
"value":"4459",
"childrens":[]}]},

{
"label":"无锡市",
"value":"984",
"childrens":[{
"label":"崇安区",
"value":"3381",
"childrens":[]},
{
"label":"南长区",
"value":"3382",
"childrens":[]},
{
"label":"北塘区",
"value":"3383",
"childrens":[]},
{
"label":"锡山区",
"value":"3384",
"childrens":[]},
{
"label":"惠山区",
"value":"3385",
"childrens":[]},
{
"label":"新区",
"value":"4029",
"childrens":[]},
{
"label":"江阴市",
"value":"53000",
"childrens":[]},
{
"label":"宜兴市",
"value":"53001",
"childrens":[]},
{
"label":"滨湖区",
"value":"53002",
"childrens":[]},
{
"label":"新吴区",
"value":"53003",
"childrens":[]},
{
"label":"梁溪区",
"value":"53005",
"childrens":[]}]},

{
"label":"苏州市",
"value":"988",
"childrens":[{
"label":"常熟市",
"value":"993",
"childrens":[]},
{
"label":"张家港市",
"value":"994",
"childrens":[]},
{
"label":"相城区",
"value":"3082",
"childrens":[]},
{
"label":"金阊区",
"value":"3083",
"childrens":[]},
{
"label":"虎丘区",
"value":"3085",
"childrens":[]},
{
"label":"平江区",
"value":"3087",
"childrens":[]},
{
"label":"沧浪区",
"value":"3088",
"childrens":[]},
{
"label":"工业园区",
"value":"3444",
"childrens":[]},
{
"label":"高新区",
"value":"3742",
"childrens":[]},
{
"label":"太仓市",
"value":"4346",
"childrens":[]},
{
"label":"吴江区",
"value":"53016",
"childrens":[]},
{
"label":"吴中区",
"value":"53017",
"childrens":[]},
{
"label":"姑苏区",
"value":"53018",
"childrens":[]},
{
"label":"昆山市",
"value":"53019",
"childrens":[]}]}]},


{
"label":"山东",
"value":"13",
"childrens":[{
"label":"济南市",
"value":"1000",
"childrens":[{
"label":"长清区",
"value":"1002",
"childrens":[]},
{
"label":"平阴县",
"value":"1003",
"childrens":[]},
{
"label":"济阳县",
"value":"1004",
"childrens":[]},
{
"label":"商河县",
"value":"1005",
"childrens":[]},
{
"label":"高新区",
"value":"4277",
"childrens":[]},
{
"label":"历城区",
"value":"53527",
"childrens":[]},
{
"label":"天桥区",
"value":"53528",
"childrens":[]},
{
"label":"槐荫区",
"value":"53529",
"childrens":[]},
{
"label":"历下区",
"value":"53530",
"childrens":[]},
{
"label":"市中区",
"value":"53531",
"childrens":[]},
{
"label":"章丘区",
"value":"53532",
"childrens":[]}]},

{
"label":"青岛市",
"value":"1007",
"childrens":[{
"label":"莱西市",
"value":"1014",
"childrens":[]},
{
"label":"四方区",
"value":"3519",
"childrens":[]},
{
"label":"市北区",
"value":"3520",
"childrens":[]},
{
"label":"市南区",
"value":"3521",
"childrens":[]},
{
"label":"李沧区",
"value":"4909",
"childrens":[]},
{
"label":"黄岛区",
"value":"5505",
"childrens":[]},
{
"label":"即墨区",
"value":"53533",
"childrens":[]},
{
"label":"城阳区",
"value":"53534",
"childrens":[]},
{
"label":"崂山区",
"value":"53535",
"childrens":[]},
{
"label":"胶州市",
"value":"53536",
"childrens":[]},
{
"label":"平度市",
"value":"53537",
"childrens":[]}]},

{
"label":"淄博市",
"value":"1016",
"childrens":[{
"label":"高青县",
"value":"1019",
"childrens":[]},
{
"label":"沂源县",
"value":"1020",
"childrens":[]},
{
"label":"桓台县",
"value":"1021",
"childrens":[]},
{
"label":"周村区",
"value":"2924",
"childrens":[]},
{
"label":"淄川区",
"value":"2962",
"childrens":[]},
{
"label":"博山区",
"value":"2968",
"childrens":[]},
{
"label":"临淄区",
"value":"2969",
"childrens":[]},
{
"label":"张店区",
"value":"53538",
"childrens":[]}]},

{
"label":"枣庄市",
"value":"1022",
"childrens":[{
"label":"山亭区",
"value":"3522",
"childrens":[]},
{
"label":"台儿庄区",
"value":"3523",
"childrens":[]},
{
"label":"峄城区",
"value":"3524",
"childrens":[]},
{
"label":"薛城区",
"value":"3525",
"childrens":[]},
{
"label":"市中区",
"value":"3526",
"childrens":[]},
{
"label":"滕州区",
"value":"53539",
"childrens":[]}]},

{
"label":"东营市",
"value":"1025",
"childrens":[{
"label":"河口区",
"value":"1026",
"childrens":[]},
{
"label":"广饶县",
"value":"1027",
"childrens":[]},
{
"label":"利津县",
"value":"1028",
"childrens":[]},
{
"label":"垦利县",
"value":"1029",
"childrens":[]},
{
"label":"东营区",
"value":"53540",
"childrens":[]}]},

{
"label":"潍坊市",
"value":"1032",
"childrens":[{
"label":"青州市",
"value":"1033",
"childrens":[]},
{
"label":"诸城市",
"value":"1034",
"childrens":[]},
{
"label":"安丘市",
"value":"1036",
"childrens":[]},
{
"label":"高密市",
"value":"1037",
"childrens":[]},
{
"label":"昌邑市",
"value":"1038",
"childrens":[]},
{
"label":"昌乐县",
"value":"1039",
"childrens":[]},
{
"label":"临朐县",
"value":"1041",
"childrens":[]},
{
"label":"坊子区",
"value":"3530",
"childrens":[]},
{
"label":"潍城区",
"value":"53541",
"childrens":[]},
{
"label":"奎文区",
"value":"53542",
"childrens":[]},
{
"label":"高新区",
"value":"53543",
"childrens":[]},
{
"label":"寒亭区",
"value":"53544",
"childrens":[]},
{
"label":"寿光市",
"value":"53545",
"childrens":[]}]},

{
"label":"烟台市",
"value":"1042",
"childrens":[{
"label":"莱阳市",
"value":"1044",
"childrens":[]},
{
"label":"招远市",
"value":"1047",
"childrens":[]},
{
"label":"蓬莱市",
"value":"1048",
"childrens":[]},
{
"label":"栖霞市",
"value":"1049",
"childrens":[]},
{
"label":"海阳市",
"value":"1050",
"childrens":[]},
{
"label":"长岛县",
"value":"1051",
"childrens":[]},
{
"label":"芝罘区",
"value":"3126",
"childrens":[]},
{
"label":"莱山区",
"value":"3528",
"childrens":[]},
{
"label":"开发区",
"value":"53546",
"childrens":[]}]},

{
"label":"威海市",
"value":"1053",
"childrens":[{
"label":"乳山市",
"value":"1054",
"childrens":[]},
{
"label":"环翠区",
"value":"4144",
"childrens":[]},
{
"label":"荣成市",
"value":"53547",
"childrens":[]},
{
"label":"文登市",
"value":"53548",
"childrens":[]}]},

{
"label":"莱芜市",
"value":"1058",
"childrens":[{
"label":"莱城区",
"value":"1059",
"childrens":[]},
{
"label":"钢城区",
"value":"3539",
"childrens":[]}]},

{
"label":"德州市",
"value":"1060",
"childrens":[{
"label":"乐陵市",
"value":"1061",
"childrens":[]},
{
"label":"禹城市",
"value":"1062",
"childrens":[]},
{
"label":"陵县",
"value":"1063",
"childrens":[]},
{
"label":"宁津县",
"value":"1064",
"childrens":[]},
{
"label":"武城县",
"value":"1066",
"childrens":[]},
{
"label":"庆云县",
"value":"1067",
"childrens":[]},
{
"label":"平原县",
"value":"1068",
"childrens":[]},
{
"label":"临邑县",
"value":"1069",
"childrens":[]},
{
"label":"夏津县",
"value":"1071",
"childrens":[]},
{
"label":"德城区",
"value":"3542",
"childrens":[]},
{
"label":"齐河县",
"value":"53549",
"childrens":[]}]},

{
"label":"临沂市",
"value":"1072",
"childrens":[{
"label":"沂南县",
"value":"1073",
"childrens":[]},
{
"label":"沂水县",
"value":"1074",
"childrens":[]},
{
"label":"苍山县",
"value":"1075",
"childrens":[]},
{
"label":"费县",
"value":"1076",
"childrens":[]},
{
"label":"平邑县",
"value":"1077",
"childrens":[]},
{
"label":"蒙阴县",
"value":"1078",
"childrens":[]},
{
"label":"临沭县",
"value":"1079",
"childrens":[]},
{
"label":"莒南县",
"value":"2926",
"childrens":[]},
{
"label":"郯城县",
"value":"2974",
"childrens":[]},
{
"label":"罗庄区",
"value":"3540",
"childrens":[]},
{
"label":"兰山区",
"value":"53550",
"childrens":[]},
{
"label":"河东区",
"value":"53551",
"childrens":[]},
{
"label":"兰陵县",
"value":"53552",
"childrens":[]}]},

{
"label":"聊城市",
"value":"1081",
"childrens":[{
"label":"临清市",
"value":"1082",
"childrens":[]},
{
"label":"阳谷县",
"value":"1084",
"childrens":[]},
{
"label":"茌平县",
"value":"1085",
"childrens":[]},
{
"label":"莘县",
"value":"1086",
"childrens":[]},
{
"label":"东阿县",
"value":"1087",
"childrens":[]},
{
"label":"冠县",
"value":"1088",
"childrens":[]},
{
"label":"高唐县",
"value":"4043",
"childrens":[]},
{
"label":"东昌府区",
"value":"53554",
"childrens":[]}]},

{
"label":"滨州市",
"value":"1090",
"childrens":[{
"label":"邹平县",
"value":"1092",
"childrens":[]},
{
"label":"沾化县",
"value":"1093",
"childrens":[]},
{
"label":"惠民县",
"value":"1094",
"childrens":[]},
{
"label":"博兴县",
"value":"1095",
"childrens":[]},
{
"label":"阳信县",
"value":"1096",
"childrens":[]},
{
"label":"无棣县",
"value":"2772",
"childrens":[]},
{
"label":"北海新区",
"value":"53555",
"childrens":[]},
{
"label":"滨城区",
"value":"53556",
"childrens":[]}]},

{
"label":"菏泽市",
"value":"1099",
"childrens":[{
"label":"单县",
"value":"1101",
"childrens":[]},
{
"label":"曹县",
"value":"1102",
"childrens":[]},
{
"label":"定陶县",
"value":"1103",
"childrens":[]},
{
"label":"巨野县",
"value":"1104",
"childrens":[]},
{
"label":"成武县",
"value":"1105",
"childrens":[]},
{
"label":"东明县",
"value":"1106",
"childrens":[]},
{
"label":"郓城县",
"value":"1107",
"childrens":[]},
{
"label":"鄄城县",
"value":"2773",
"childrens":[]},
{
"label":"牡丹区",
"value":"3543",
"childrens":[]}]},

{
"label":"日照市",
"value":"1108",
"childrens":[{
"label":"五莲县",
"value":"2934",
"childrens":[]},
{
"label":"莒县",
"value":"3068",
"childrens":[]},
{
"label":"岚山区",
"value":"4113",
"childrens":[]},
{
"label":"新市区",
"value":"4196",
"childrens":[]},
{
"label":"东港区",
"value":"53557",
"childrens":[]}]},

{
"label":"泰安市",
"value":"1112",
"childrens":[{
"label":"东平县",
"value":"3132",
"childrens":[]},
{
"label":"宁阳县",
"value":"3535",
"childrens":[]},
{
"label":"岱岳区",
"value":"53558",
"childrens":[]},
{
"label":"泰山区",
"value":"53559",
"childrens":[]},
{
"label":"肥城市",
"value":"53560",
"childrens":[]},
{
"label":"新泰市",
"value":"53561",
"childrens":[]}]},

{
"label":"济宁市",
"value":"2900",
"childrens":[{
"label":"梁山县",
"value":"2908",
"childrens":[]},
{
"label":"兖州市",
"value":"2910",
"childrens":[]},
{
"label":"微山县",
"value":"2912",
"childrens":[]},
{
"label":"汶上县",
"value":"2913",
"childrens":[]},
{
"label":"泗水县",
"value":"2914",
"childrens":[]},
{
"label":"嘉祥县",
"value":"2915",
"childrens":[]},
{
"label":"鱼台县",
"value":"2916",
"childrens":[]},
{
"label":"金乡县",
"value":"2917",
"childrens":[]},
{
"label":"任城区",
"value":"3533",
"childrens":[]},
{
"label":"邹城市",
"value":"53562",
"childrens":[]},
{
"label":"市中区",
"value":"53563",
"childrens":[]},
{
"label":"曲阜市",
"value":"53564",
"childrens":[]},
{
"label":"高新区",
"value":"53565",
"childrens":[]}]}]},


{
"label":"安徽",
"value":"14",
"childrens":[{
"label":"铜陵市",
"value":"1114",
"childrens":[{
"label":"郊区",
"value":"53480",
"childrens":[]},
{
"label":"义安区",
"value":"53481",
"childrens":[]},
{
"label":"铜官区",
"value":"53482",
"childrens":[]},
{
"label":"枞阳县",
"value":"53483",
"childrens":[]}]},

{
"label":"合肥市",
"value":"1116",
"childrens":[{
"label":"肥东县",
"value":"1119",
"childrens":[]},
{
"label":"庐江县",
"value":"1190",
"childrens":[]},
{
"label":"包河区",
"value":"3431",
"childrens":[]},
{
"label":"蜀山区",
"value":"3432",
"childrens":[]},
{
"label":"瑶海区",
"value":"3433",
"childrens":[]},
{
"label":"庐阳区",
"value":"3434",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"4173",
"childrens":[]},
{
"label":"高新技术开发区",
"value":"4192",
"childrens":[]},
{
"label":"北城新区",
"value":"6117",
"childrens":[]},
{
"label":"滨湖新区",
"value":"6118",
"childrens":[]},
{
"label":"政务文化新区",
"value":"6119",
"childrens":[]},
{
"label":"新站综合开发试验区",
"value":"6120",
"childrens":[]},
{
"label":"肥西县",
"value":"53484",
"childrens":[]},
{
"label":"巢湖市",
"value":"53485",
"childrens":[]},
{
"label":"长丰县",
"value":"53486",
"childrens":[]}]},

{
"label":"淮南市",
"value":"1121",
"childrens":[{
"label":"凤台县",
"value":"1122",
"childrens":[{
"label":"夏集镇",
"value":"8167",
"childrens":[]},
{
"label":"尚塘乡",
"value":"8168",
"childrens":[]},
{
"label":"朱马店镇",
"value":"8169",
"childrens":[]},
{
"label":"顾桥镇",
"value":"8170",
"childrens":[]},
{
"label":"经济开发区",
"value":"8171",
"childrens":[]},
{
"label":"岳张集镇",
"value":"8172",
"childrens":[]},
{
"label":"新集镇",
"value":"8173",
"childrens":[]},
{
"label":"丁集乡",
"value":"8174",
"childrens":[]},
{
"label":"桂集镇",
"value":"8175",
"childrens":[]},
{
"label":"钱庙乡",
"value":"8176",
"childrens":[]},
{
"label":"大兴集乡",
"value":"8177",
"childrens":[]},
{
"label":"李冲回族乡",
"value":"8178",
"childrens":[]},
{
"label":"杨村乡",
"value":"8179",
"childrens":[]},
{
"label":"凤凰镇",
"value":"8180",
"childrens":[]},
{
"label":"毛集镇",
"value":"8181",
"childrens":[]},
{
"label":"古店乡",
"value":"8182",
"childrens":[]},
{
"label":"焦岗湖镇",
"value":"8183",
"childrens":[]},
{
"label":"刘集乡",
"value":"8184",
"childrens":[]},
{
"label":"城关镇",
"value":"8185",
"childrens":[]},
{
"label":"关店乡",
"value":"8186",
"childrens":[]}]},

{
"label":"田家庵区",
"value":"3447",
"childrens":[{
"label":"淮滨街道",
"value":"8239",
"childrens":[]},
{
"label":"史院乡",
"value":"8240",
"childrens":[]},
{
"label":"洞山街道",
"value":"8241",
"childrens":[]},
{
"label":"泉山街道",
"value":"8242",
"childrens":[]},
{
"label":"曹庵镇",
"value":"8243",
"childrens":[]},
{
"label":"公园街道",
"value":"8244",
"childrens":[]},
{
"label":"新淮街道",
"value":"8245",
"childrens":[]},
{
"label":"龙泉街道",
"value":"8246",
"childrens":[]},
{
"label":"国庆街道",
"value":"8247",
"childrens":[]},
{
"label":"田东街道",
"value":"8248",
"childrens":[]},
{
"label":"安成镇",
"value":"8249",
"childrens":[]},
{
"label":"朝阳街道",
"value":"8250",
"childrens":[]},
{
"label":"舜耕镇",
"value":"8251",
"childrens":[]},
{
"label":"三和乡",
"value":"8252",
"childrens":[]}]},

{
"label":"大通区",
"value":"3448",
"childrens":[{
"label":"大通街道",
"value":"8233",
"childrens":[]},
{
"label":"上窑镇",
"value":"8234",
"childrens":[]},
{
"label":"孔店乡",
"value":"8235",
"childrens":[]},
{
"label":"洛河镇",
"value":"8236",
"childrens":[]},
{
"label":"九龙岗镇",
"value":"8237",
"childrens":[]},
{
"label":"淮南经济开发区",
"value":"8238",
"childrens":[]}]},

{
"label":"谢家集区",
"value":"3449",
"childrens":[{
"label":"唐山镇",
"value":"8253",
"childrens":[]},
{
"label":"李郢孜镇",
"value":"8254",
"childrens":[]},
{
"label":"平山街道",
"value":"8255",
"childrens":[]},
{
"label":"孤堆乡",
"value":"8256",
"childrens":[]},
{
"label":"谢家集街道",
"value":"8257",
"childrens":[]},
{
"label":"望峰岗镇",
"value":"8258",
"childrens":[]},
{
"label":"谢三村街道",
"value":"8259",
"childrens":[]},
{
"label":"蔡家岗街道",
"value":"8260",
"childrens":[]},
{
"label":"孙庙乡",
"value":"8261",
"childrens":[]},
{
"label":"立新街道",
"value":"8262",
"childrens":[]},
{
"label":"杨公镇",
"value":"8263",
"childrens":[]}]},

{
"label":"八公山区",
"value":"3450",
"childrens":[{
"label":"毕家岗街道",
"value":"8227",
"childrens":[]},
{
"label":"妙山林场",
"value":"8228",
"childrens":[]},
{
"label":"土坝孜街道",
"value":"8229",
"childrens":[]},
{
"label":"八公山镇",
"value":"8230",
"childrens":[]},
{
"label":"新庄孜街道",
"value":"8231",
"childrens":[]},
{
"label":"山王镇",
"value":"8232",
"childrens":[]}]},

{
"label":"潘集区",
"value":"3451",
"childrens":[{
"label":"架河镇",
"value":"8156",
"childrens":[]},
{
"label":"平圩镇",
"value":"8157",
"childrens":[]},
{
"label":"潘集镇",
"value":"8158",
"childrens":[]},
{
"label":"田集街道",
"value":"8159",
"childrens":[]},
{
"label":"贺疃乡",
"value":"8160",
"childrens":[]},
{
"label":"祁集乡",
"value":"8161",
"childrens":[]},
{
"label":"芦集镇",
"value":"8162",
"childrens":[]},
{
"label":"古沟回族乡",
"value":"8163",
"childrens":[]},
{
"label":"泥河镇",
"value":"8164",
"childrens":[]},
{
"label":"高皇镇",
"value":"8165",
"childrens":[]},
{
"label":"夹沟乡",
"value":"8166",
"childrens":[]}]},

{
"label":"淮南高新技术开发区",
"value":"4960",
"childrens":[]},
{
"label":"寿县",
"value":"53487",
"childrens":[]}]},

{
"label":"淮北市",
"value":"1124",
"childrens":[{
"label":"杜集区",
"value":"53488",
"childrens":[]},
{
"label":"烈山区",
"value":"53489",
"childrens":[]},
{
"label":"濉溪县",
"value":"53490",
"childrens":[]},
{
"label":"相山区",
"value":"53491",
"childrens":[]}]},

{
"label":"芜湖市",
"value":"1127",
"childrens":[{
"label":"芜湖县",
"value":"1128",
"childrens":[]},
{
"label":"繁昌县",
"value":"1129",
"childrens":[]},
{
"label":"南陵县",
"value":"1130",
"childrens":[]},
{
"label":"无为县",
"value":"1189",
"childrens":[]},
{
"label":"镜湖区",
"value":"3438",
"childrens":[]},
{
"label":"弋江区",
"value":"4172",
"childrens":[]},
{
"label":"鸠江区",
"value":"53492",
"childrens":[]},
{
"label":"三山区",
"value":"53493",
"childrens":[]}]},

{
"label":"蚌埠市",
"value":"1132",
"childrens":[{
"label":"怀远县",
"value":"1133",
"childrens":[]},
{
"label":"固镇县",
"value":"1134",
"childrens":[]},
{
"label":"五河县",
"value":"1135",
"childrens":[]},
{
"label":"蚌山区",
"value":"3442",
"childrens":[]},
{
"label":"淮上区",
"value":"53494",
"childrens":[]},
{
"label":"龙子湖区",
"value":"53495",
"childrens":[]},
{
"label":"禹会区",
"value":"53496",
"childrens":[]}]},

{
"label":"马鞍山市",
"value":"1137",
"childrens":[{
"label":"当涂县",
"value":"1138",
"childrens":[]},
{
"label":"含山县",
"value":"1187",
"childrens":[]},
{
"label":"和县",
"value":"1188",
"childrens":[]},
{
"label":"博望区",
"value":"6963",
"childrens":[]},
{
"label":"花山区",
"value":"53497",
"childrens":[]},
{
"label":"雨山区",
"value":"53498",
"childrens":[]}]},

{
"label":"安庆市",
"value":"1140",
"childrens":[{
"label":"桐城市",
"value":"1141",
"childrens":[]},
{
"label":"宿松县",
"value":"1142",
"childrens":[]},
{
"label":"枞阳县",
"value":"1143",
"childrens":[]},
{
"label":"太湖县",
"value":"1144",
"childrens":[]},
{
"label":"怀宁县",
"value":"1145",
"childrens":[]},
{
"label":"岳西县",
"value":"1146",
"childrens":[]},
{
"label":"望江县",
"value":"1147",
"childrens":[]},
{
"label":"潜山县",
"value":"1148",
"childrens":[]},
{
"label":"大观区",
"value":"4075",
"childrens":[]},
{
"label":"宜秀区",
"value":"53499",
"childrens":[]},
{
"label":"迎江区",
"value":"53500",
"childrens":[]}]},

{
"label":"黄山市",
"value":"1151",
"childrens":[{
"label":"休宁县",
"value":"1153",
"childrens":[]},
{
"label":"歙县",
"value":"1154",
"childrens":[]},
{
"label":"黟县",
"value":"1155",
"childrens":[]},
{
"label":"祁门县",
"value":"1156",
"childrens":[]},
{
"label":"黄山区",
"value":"3464",
"childrens":[]},
{
"label":"徽州区",
"value":"53501",
"childrens":[]},
{
"label":"屯溪区",
"value":"53502",
"childrens":[]}]},

{
"label":"滁州市",
"value":"1159",
"childrens":[{
"label":"明光市",
"value":"1161",
"childrens":[]},
{
"label":"全椒县",
"value":"1162",
"childrens":[]},
{
"label":"来安县",
"value":"1163",
"childrens":[]},
{
"label":"定远县",
"value":"1164",
"childrens":[]},
{
"label":"凤阳县",
"value":"1165",
"childrens":[]},
{
"label":"南谯区",
"value":"3467",
"childrens":[]},
{
"label":"琅琊区",
"value":"53503",
"childrens":[]},
{
"label":"天长市",
"value":"53504",
"childrens":[]}]},

{
"label":"阜阳市",
"value":"1167",
"childrens":[{
"label":"界首市",
"value":"1168",
"childrens":[]},
{
"label":"太和县",
"value":"1169",
"childrens":[]},
{
"label":"阜南县",
"value":"1170",
"childrens":[]},
{
"label":"颍上县",
"value":"1171",
"childrens":[]},
{
"label":"临泉县",
"value":"1172",
"childrens":[]},
{
"label":"经济开发区",
"value":"4832",
"childrens":[]},
{
"label":"颍泉区",
"value":"53505",
"childrens":[]},
{
"label":"颍州区",
"value":"53506",
"childrens":[]},
{
"label":"颍东区",
"value":"53507",
"childrens":[]}]},

{
"label":"亳州市",
"value":"1174",
"childrens":[{
"label":"利辛县",
"value":"1176",
"childrens":[]},
{
"label":"蒙城县",
"value":"1177",
"childrens":[]},
{
"label":"涡阳县",
"value":"1178",
"childrens":[]},
{
"label":"谯城区",
"value":"53508",
"childrens":[]}]},

{
"label":"宿州市",
"value":"1180",
"childrens":[{
"label":"灵璧县",
"value":"1181",
"childrens":[]},
{
"label":"泗县",
"value":"1182",
"childrens":[]},
{
"label":"萧县",
"value":"1183",
"childrens":[]},
{
"label":"砀山县",
"value":"1184",
"childrens":[]},
{
"label":"经济开发区",
"value":"6006",
"childrens":[]},
{
"label":"埇桥区",
"value":"53509",
"childrens":[]}]},

{
"label":"池州市",
"value":"1201",
"childrens":[{
"label":"东至县",
"value":"1202",
"childrens":[]},
{
"label":"石台县",
"value":"1203",
"childrens":[]},
{
"label":"青阳县",
"value":"1204",
"childrens":[]},
{
"label":"贵池区",
"value":"53510",
"childrens":[]}]},

{
"label":"六安市",
"value":"1206",
"childrens":[{
"label":"寿县",
"value":"1207",
"childrens":[]},
{
"label":"霍山县",
"value":"1208",
"childrens":[]},
{
"label":"金寨县",
"value":"1209",
"childrens":[]},
{
"label":"霍邱县",
"value":"1210",
"childrens":[]},
{
"label":"舒城县",
"value":"1211",
"childrens":[]},
{
"label":"金安区",
"value":"53511",
"childrens":[]},
{
"label":"裕安区",
"value":"53512",
"childrens":[]},
{
"label":"叶集区",
"value":"53513",
"childrens":[]}]},

{
"label":"宣城市",
"value":"2971",
"childrens":[{
"label":"泾县",
"value":"2972",
"childrens":[]},
{
"label":"旌德县",
"value":"3128",
"childrens":[]},
{
"label":"宁国市",
"value":"3147",
"childrens":[]},
{
"label":"郎溪县",
"value":"3477",
"childrens":[]},
{
"label":"广德县",
"value":"3478",
"childrens":[]},
{
"label":"绩溪县",
"value":"3479",
"childrens":[]},
{
"label":"宣州区",
"value":"53514",
"childrens":[]}]}]},


{
"label":"浙江",
"value":"15",
"childrens":[{
"label":"宁波市",
"value":"1158",
"childrens":[{
"label":"慈溪市",
"value":"1224",
"childrens":[]},
{
"label":"奉化市",
"value":"1226",
"childrens":[]},
{
"label":"宁海县",
"value":"1227",
"childrens":[]},
{
"label":"象山县",
"value":"1228",
"childrens":[]},
{
"label":"海曙区",
"value":"3412",
"childrens":[]},
{
"label":"江东区",
"value":"3413",
"childrens":[]},
{
"label":"高新科技开发区",
"value":"4253",
"childrens":[]},
{
"label":"北仑区",
"value":"53108",
"childrens":[]},
{
"label":"镇海区",
"value":"53109",
"childrens":[]},
{
"label":"鄞州区",
"value":"53110",
"childrens":[]},
{
"label":"江北区",
"value":"53111",
"childrens":[]},
{
"label":"余姚市",
"value":"53112",
"childrens":[]}]},

{
"label":"杭州市",
"value":"1213",
"childrens":[{
"label":"余杭区",
"value":"1214",
"childrens":[]},
{
"label":"萧山区",
"value":"1215",
"childrens":[]},
{
"label":"富阳市",
"value":"1217",
"childrens":[]},
{
"label":"桐庐县",
"value":"1218",
"childrens":[]},
{
"label":"建德市",
"value":"1219",
"childrens":[]},
{
"label":"淳安县",
"value":"1220",
"childrens":[]},
{
"label":"江干区",
"value":"2963",
"childrens":[]},
{
"label":"滨江区",
"value":"3038",
"childrens":[]},
{
"label":"上城区",
"value":"3408",
"childrens":[]},
{
"label":"下城区",
"value":"3409",
"childrens":[]},
{
"label":"拱墅区",
"value":"3410",
"childrens":[]},
{
"label":"西湖区",
"value":"3411",
"childrens":[]},
{
"label":"下沙区",
"value":"4285",
"childrens":[]},
{
"label":"临安市",
"value":"53113",
"childrens":[]}]},

{
"label":"温州市",
"value":"1233",
"childrens":[{
"label":"文成县",
"value":"1237",
"childrens":[]},
{
"label":"平阳县",
"value":"1238",
"childrens":[]},
{
"label":"泰顺县",
"value":"1239",
"childrens":[]},
{
"label":"洞头县",
"value":"1240",
"childrens":[]},
{
"label":"苍南县",
"value":"1241",
"childrens":[]},
{
"label":"龙湾区",
"value":"3416",
"childrens":[]},
{
"label":"茶山高教园区",
"value":"4342",
"childrens":[]},
{
"label":"瑞安市",
"value":"53114",
"childrens":[]},
{
"label":"乐青市",
"value":"53115",
"childrens":[]},
{
"label":"鹿城区",
"value":"53116",
"childrens":[]},
{
"label":"瓯海区",
"value":"53117",
"childrens":[]},
{
"label":"永嘉县",
"value":"53118",
"childrens":[]}]},

{
"label":"嘉兴市",
"value":"1243",
"childrens":[{
"label":"海宁市",
"value":"1244",
"childrens":[]},
{
"label":"海盐县",
"value":"1248",
"childrens":[]},
{
"label":"南湖区",
"value":"3418",
"childrens":[]},
{
"label":"秀洲区",
"value":"3419",
"childrens":[]},
{
"label":"桐乡市",
"value":"4429",
"childrens":[]},
{
"label":"平湖市",
"value":"4430",
"childrens":[]},
{
"label":"嘉善县",
"value":"4431",
"childrens":[]}]},

{
"label":"湖州市",
"value":"1250",
"childrens":[{
"label":"长兴县",
"value":"1251",
"childrens":[]},
{
"label":"德清县",
"value":"1252",
"childrens":[]},
{
"label":"安吉县",
"value":"1253",
"childrens":[]},
{
"label":"南浔区",
"value":"4130",
"childrens":[]},
{
"label":"吴兴区",
"value":"53119",
"childrens":[]}]},

{
"label":"绍兴市",
"value":"1255",
"childrens":[{
"label":"诸暨市",
"value":"1257",
"childrens":[]},
{
"label":"上虞区",
"value":"1258",
"childrens":[]},
{
"label":"嵊州市",
"value":"1259",
"childrens":[]},
{
"label":"新昌县",
"value":"1260",
"childrens":[]},
{
"label":"柯桥区",
"value":"53120",
"childrens":[]},
{
"label":"越城区",
"value":"53121",
"childrens":[]}]},

{
"label":"金华市",
"value":"1262",
"childrens":[{
"label":"金东区",
"value":"1263",
"childrens":[{
"label":"孝顺镇",
"value":"8307",
"childrens":[]},
{
"label":"赤松镇",
"value":"8308",
"childrens":[]},
{
"label":"曹宅镇",
"value":"8309",
"childrens":[]},
{
"label":"傅村镇",
"value":"8310",
"childrens":[]},
{
"label":"岭下镇",
"value":"8311",
"childrens":[]},
{
"label":"源东乡",
"value":"8312",
"childrens":[]},
{
"label":"东孝街道",
"value":"8313",
"childrens":[]},
{
"label":"塘雅镇",
"value":"8314",
"childrens":[]},
{
"label":"江东镇",
"value":"8315",
"childrens":[]},
{
"label":"澧浦镇",
"value":"8316",
"childrens":[]},
{
"label":"多湖街道",
"value":"8317",
"childrens":[]}]},

{
"label":"兰溪市",
"value":"1264",
"childrens":[{
"label":"女埠街道",
"value":"8264",
"childrens":[]},
{
"label":"马涧镇",
"value":"8265",
"childrens":[]},
{
"label":"水亭畲族乡",
"value":"8266",
"childrens":[]},
{
"label":"赤溪街道",
"value":"8267",
"childrens":[]},
{
"label":"灵洞乡",
"value":"8268",
"childrens":[]},
{
"label":"黄店镇",
"value":"8269",
"childrens":[]},
{
"label":"横溪镇",
"value":"8270",
"childrens":[]},
{
"label":"诸葛镇",
"value":"8271",
"childrens":[]},
{
"label":"香溪镇",
"value":"8272",
"childrens":[]},
{
"label":"云山街道",
"value":"8273",
"childrens":[]},
{
"label":"兰江街道",
"value":"8274",
"childrens":[]},
{
"label":"柏社乡",
"value":"8275",
"childrens":[]},
{
"label":"梅江镇",
"value":"8276",
"childrens":[]},
{
"label":"上华街道",
"value":"8277",
"childrens":[]},
{
"label":"游埠镇",
"value":"8278",
"childrens":[]},
{
"label":"永昌街道",
"value":"8279",
"childrens":[]}]},

{
"label":"婺城区",
"value":"1265",
"childrens":[{
"label":"安地镇",
"value":"8280",
"childrens":[]},
{
"label":"琅琊镇",
"value":"8281",
"childrens":[]},
{
"label":"竹马乡",
"value":"8282",
"childrens":[]},
{
"label":"新狮街道",
"value":"8283",
"childrens":[]},
{
"label":"江南街道",
"value":"8284",
"childrens":[]},
{
"label":"沙畈乡",
"value":"8285",
"childrens":[]},
{
"label":"城东街道",
"value":"8286",
"childrens":[]},
{
"label":"苏孟乡",
"value":"8287",
"childrens":[]},
{
"label":"汤溪镇",
"value":"8288",
"childrens":[]},
{
"label":"雅畈镇",
"value":"8289",
"childrens":[]},
{
"label":"洋埠镇",
"value":"8290",
"childrens":[]},
{
"label":"白龙桥镇",
"value":"8291",
"childrens":[]},
{
"label":"城中街道",
"value":"8292",
"childrens":[]},
{
"label":"箬阳乡",
"value":"8293",
"childrens":[]},
{
"label":"城西街道",
"value":"8294",
"childrens":[]},
{
"label":"长山乡",
"value":"8295",
"childrens":[]},
{
"label":"蒋堂镇",
"value":"8296",
"childrens":[]},
{
"label":"罗店镇",
"value":"8297",
"childrens":[]},
{
"label":"西关街道",
"value":"8298",
"childrens":[]},
{
"label":"城北街道",
"value":"8299",
"childrens":[]},
{
"label":"莘畈乡",
"value":"8300",
"childrens":[]},
{
"label":"乾西乡",
"value":"8301",
"childrens":[]},
{
"label":"塔石乡",
"value":"8302",
"childrens":[]},
{
"label":"罗埠镇",
"value":"8303",
"childrens":[]},
{
"label":"秋滨街道",
"value":"8304",
"childrens":[]},
{
"label":"岭上乡",
"value":"8305",
"childrens":[]},
{
"label":"三江街道",
"value":"8306",
"childrens":[]}]},

{
"label":"义乌市",
"value":"1266",
"childrens":[{
"label":"城西街道",
"value":"8372",
"childrens":[]},
{
"label":"北苑街道",
"value":"8373",
"childrens":[]},
{
"label":"廿三里街道",
"value":"8374",
"childrens":[]},
{
"label":"稠城街道",
"value":"8375",
"childrens":[]},
{
"label":"上溪镇",
"value":"8376",
"childrens":[]},
{
"label":"苏溪镇",
"value":"8377",
"childrens":[]},
{
"label":"江东街道",
"value":"8378",
"childrens":[]},
{
"label":"佛堂镇",
"value":"8379",
"childrens":[]},
{
"label":"后宅街道",
"value":"8380",
"childrens":[]},
{
"label":"义亭镇",
"value":"8381",
"childrens":[]},
{
"label":"大陈镇",
"value":"8382",
"childrens":[]},
{
"label":"赤岸镇",
"value":"8383",
"childrens":[]},
{
"label":"稠江街道",
"value":"8384",
"childrens":[]}]},

{
"label":"东阳市",
"value":"1267",
"childrens":[{
"label":"湖溪镇",
"value":"8385",
"childrens":[]},
{
"label":"三单乡",
"value":"8386",
"childrens":[]},
{
"label":"吴宁街道",
"value":"8387",
"childrens":[]},
{
"label":"城东街道",
"value":"8388",
"childrens":[]},
{
"label":"白云街道",
"value":"8389",
"childrens":[]},
{
"label":"东阳江镇",
"value":"8390",
"childrens":[]},
{
"label":"横店镇",
"value":"8391",
"childrens":[]},
{
"label":"南市街道",
"value":"8392",
"childrens":[]},
{
"label":"虎鹿镇",
"value":"8393",
"childrens":[]},
{
"label":"马宅镇",
"value":"8394",
"childrens":[]},
{
"label":"歌山镇",
"value":"8395",
"childrens":[]},
{
"label":"画水镇",
"value":"8396",
"childrens":[]},
{
"label":"佐村镇",
"value":"8397",
"childrens":[]},
{
"label":"南马镇",
"value":"8398",
"childrens":[]},
{
"label":"千祥镇",
"value":"8399",
"childrens":[]},
{
"label":"六石街道",
"value":"8400",
"childrens":[]},
{
"label":"江北街道",
"value":"8401",
"childrens":[]},
{
"label":"巍山镇",
"value":"8402",
"childrens":[]}]},

{
"label":"永康市",
"value":"1268",
"childrens":[{
"label":"花街镇",
"value":"8403",
"childrens":[]},
{
"label":"芝英镇",
"value":"8404",
"childrens":[]},
{
"label":"江南街道",
"value":"8405",
"childrens":[]},
{
"label":"前仓镇",
"value":"8406",
"childrens":[]},
{
"label":"龙山镇",
"value":"8407",
"childrens":[]},
{
"label":"西城街道",
"value":"8408",
"childrens":[]},
{
"label":"舟山镇",
"value":"8409",
"childrens":[]},
{
"label":"方岩镇",
"value":"8410",
"childrens":[]},
{
"label":"东城街道",
"value":"8411",
"childrens":[]},
{
"label":"桥下镇",
"value":"8412",
"childrens":[]},
{
"label":"古山镇",
"value":"8413",
"childrens":[]},
{
"label":"西溪镇",
"value":"8414",
"childrens":[]},
{
"label":"八字墙乡",
"value":"8415",
"childrens":[]},
{
"label":"清溪镇",
"value":"8416",
"childrens":[]},
{
"label":"石柱镇",
"value":"8417",
"childrens":[]},
{
"label":"唐先镇",
"value":"8418",
"childrens":[]},
{
"label":"象珠镇",
"value":"8419",
"childrens":[]}]},

{
"label":"武义县",
"value":"1269",
"childrens":[{
"label":"三港乡",
"value":"8318",
"childrens":[]},
{
"label":"桃溪镇",
"value":"8319",
"childrens":[]},
{
"label":"履坦镇",
"value":"8320",
"childrens":[]},
{
"label":"壶山街道",
"value":"8321",
"childrens":[]},
{
"label":"熟溪街道",
"value":"8322",
"childrens":[]},
{
"label":"新宅镇",
"value":"8323",
"childrens":[]},
{
"label":"大溪口乡",
"value":"8324",
"childrens":[]},
{
"label":"坦洪乡",
"value":"8325",
"childrens":[]},
{
"label":"大田乡",
"value":"8326",
"childrens":[]},
{
"label":"桐琴镇",
"value":"8327",
"childrens":[]},
{
"label":"白洋街道",
"value":"8328",
"childrens":[]},
{
"label":"王宅镇",
"value":"8329",
"childrens":[]},
{
"label":"泉溪镇",
"value":"8330",
"childrens":[]},
{
"label":"西联乡",
"value":"8331",
"childrens":[]},
{
"label":"茭道镇",
"value":"8332",
"childrens":[]},
{
"label":"俞源乡",
"value":"8333",
"childrens":[]},
{
"label":"柳城畲族镇",
"value":"8334",
"childrens":[]},
{
"label":"白姆乡",
"value":"8335",
"childrens":[]}]},

{
"label":"浦江县",
"value":"1270",
"childrens":[{
"label":"仙华街道",
"value":"8336",
"childrens":[]},
{
"label":"花桥乡",
"value":"8337",
"childrens":[]},
{
"label":"浦南街道",
"value":"8338",
"childrens":[]},
{
"label":"中余乡",
"value":"8339",
"childrens":[]},
{
"label":"郑家坞镇",
"value":"8340",
"childrens":[]},
{
"label":"岩头镇",
"value":"8341",
"childrens":[]},
{
"label":"治平乡",
"value":"8342",
"childrens":[]},
{
"label":"白马镇",
"value":"8343",
"childrens":[]},
{
"label":"郑宅镇",
"value":"8344",
"childrens":[]},
{
"label":"大畈乡",
"value":"8345",
"childrens":[]},
{
"label":"虞宅乡",
"value":"8346",
"childrens":[]},
{
"label":"浦阳街道",
"value":"8347",
"childrens":[]},
{
"label":"杭坪镇",
"value":"8348",
"childrens":[]},
{
"label":"前吴乡",
"value":"8349",
"childrens":[]},
{
"label":"黄宅镇",
"value":"8350",
"childrens":[]},
{
"label":"檀溪镇",
"value":"8351",
"childrens":[]},
{
"label":"潘宅镇",
"value":"8352",
"childrens":[]}]},

{
"label":"磐安县",
"value":"1271",
"childrens":[{
"label":"胡宅乡",
"value":"8353",
"childrens":[]},
{
"label":"玉山镇",
"value":"8354",
"childrens":[]},
{
"label":"方前镇",
"value":"8355",
"childrens":[]},
{
"label":"双溪乡",
"value":"8356",
"childrens":[]},
{
"label":"窈川乡",
"value":"8357",
"childrens":[]},
{
"label":"仁川镇",
"value":"8358",
"childrens":[]},
{
"label":"万苍乡",
"value":"8359",
"childrens":[]},
{
"label":"尚湖镇",
"value":"8360",
"childrens":[]},
{
"label":"双峰乡",
"value":"8361",
"childrens":[]},
{
"label":"大盘镇",
"value":"8362",
"childrens":[]},
{
"label":"高二乡",
"value":"8363",
"childrens":[]},
{
"label":"安文镇",
"value":"8364",
"childrens":[]},
{
"label":"深泽乡",
"value":"8365",
"childrens":[]},
{
"label":"九和乡",
"value":"8366",
"childrens":[]},
{
"label":"维新乡",
"value":"8367",
"childrens":[]},
{
"label":"新渥镇",
"value":"8368",
"childrens":[]},
{
"label":"尖山镇",
"value":"8369",
"childrens":[]},
{
"label":"冷水镇",
"value":"8370",
"childrens":[]},
{
"label":"盘峰乡",
"value":"8371",
"childrens":[]}]}]},


{
"label":"衢州市",
"value":"1273",
"childrens":[{
"label":"江山市",
"value":"1275",
"childrens":[]},
{
"label":"常山县",
"value":"1276",
"childrens":[]},
{
"label":"开化县",
"value":"1277",
"childrens":[]},
{
"label":"龙游县",
"value":"1278",
"childrens":[]},
{
"label":"柯城区",
"value":"53122",
"childrens":[]},
{
"label":"衢江区",
"value":"53123",
"childrens":[]}]},

{
"label":"丽水市",
"value":"1280",
"childrens":[{
"label":"龙泉市",
"value":"1281",
"childrens":[]},
{
"label":"缙云县",
"value":"1282",
"childrens":[]},
{
"label":"遂昌县",
"value":"1283",
"childrens":[]},
{
"label":"松阳县",
"value":"1284",
"childrens":[]},
{
"label":"景宁县",
"value":"1285",
"childrens":[]},
{
"label":"云和县",
"value":"1286",
"childrens":[]},
{
"label":"青田县",
"value":"1288",
"childrens":[]},
{
"label":"庆元县",
"value":"3045",
"childrens":[]},
{
"label":"莲都区",
"value":"53124",
"childrens":[]}]},

{
"label":"台州市",
"value":"1290",
"childrens":[{
"label":"临海市",
"value":"1291",
"childrens":[]},
{
"label":"三门县",
"value":"1294",
"childrens":[]},
{
"label":"天台县",
"value":"1295",
"childrens":[]},
{
"label":"仙居县",
"value":"1296",
"childrens":[]},
{
"label":"黄岩区",
"value":"53125",
"childrens":[]},
{
"label":"椒江区",
"value":"53126",
"childrens":[]},
{
"label":"路桥区",
"value":"53127",
"childrens":[]},
{
"label":"温岭区",
"value":"53128",
"childrens":[]},
{
"label":"玉环县",
"value":"53129",
"childrens":[]}]},

{
"label":"舟山市",
"value":"1298",
"childrens":[{
"label":"岱山县",
"value":"1300",
"childrens":[]},
{
"label":"嵊泗县",
"value":"1301",
"childrens":[]},
{
"label":"普陀区",
"value":"53131",
"childrens":[]},
{
"label":"定海区",
"value":"53132",
"childrens":[]}]}]},


{
"label":"福建",
"value":"16",
"childrens":[{
"label":"福州市",
"value":"1303",
"childrens":[{
"label":"长乐市",
"value":"1305",
"childrens":[]},
{
"label":"平潭县",
"value":"1308",
"childrens":[]},
{
"label":"连江县",
"value":"1309",
"childrens":[]},
{
"label":"罗源县",
"value":"1312",
"childrens":[]},
{
"label":"永泰县",
"value":"1313",
"childrens":[]},
{
"label":"闽清县",
"value":"1314",
"childrens":[]},
{
"label":"台江区",
"value":"3483",
"childrens":[]},
{
"label":"鼓楼区",
"value":"3484",
"childrens":[]},
{
"label":"晋安区",
"value":"53133",
"childrens":[]},
{
"label":"仓山区",
"value":"53134",
"childrens":[]},
{
"label":"马尾区",
"value":"53135",
"childrens":[]},
{
"label":"福清市",
"value":"53136",
"childrens":[]},
{
"label":"闽侯县",
"value":"53137",
"childrens":[]}]},

{
"label":"厦门市",
"value":"1315",
"childrens":[{
"label":"思明区",
"value":"1316",
"childrens":[]},
{
"label":"湖里区",
"value":"3486",
"childrens":[]},
{
"label":"翔安区",
"value":"3489",
"childrens":[]},
{
"label":"海沧区",
"value":"53138",
"childrens":[]},
{
"label":"集美区",
"value":"53139",
"childrens":[]},
{
"label":"同安区",
"value":"53140",
"childrens":[]}]},

{
"label":"三明市",
"value":"1317",
"childrens":[{
"label":"永安市",
"value":"1319",
"childrens":[]},
{
"label":"明溪县",
"value":"1320",
"childrens":[]},
{
"label":"将乐县",
"value":"1321",
"childrens":[]},
{
"label":"大田县",
"value":"1322",
"childrens":[]},
{
"label":"宁化县",
"value":"1323",
"childrens":[]},
{
"label":"建宁县",
"value":"1324",
"childrens":[]},
{
"label":"沙县",
"value":"1325",
"childrens":[]},
{
"label":"尤溪县",
"value":"1326",
"childrens":[]},
{
"label":"清流县",
"value":"1327",
"childrens":[]},
{
"label":"泰宁县",
"value":"1328",
"childrens":[]},
{
"label":"梅列区",
"value":"53141",
"childrens":[]},
{
"label":"三元区",
"value":"53142",
"childrens":[]}]},

{
"label":"莆田市",
"value":"1329",
"childrens":[{
"label":"仙游县",
"value":"1331",
"childrens":[]},
{
"label":"涵江区",
"value":"3022",
"childrens":[]},
{
"label":"秀屿区",
"value":"3492",
"childrens":[]},
{
"label":"城厢区",
"value":"53143",
"childrens":[]},
{
"label":"荔城区",
"value":"53144",
"childrens":[]}]},

{
"label":"泉州市",
"value":"1332",
"childrens":[{
"label":"石狮市",
"value":"1334",
"childrens":[]},
{
"label":"南安市",
"value":"1336",
"childrens":[]},
{
"label":"惠安县",
"value":"1337",
"childrens":[]},
{
"label":"安溪县",
"value":"1338",
"childrens":[]},
{
"label":"德化县",
"value":"1339",
"childrens":[]},
{
"label":"永春县",
"value":"1340",
"childrens":[]},
{
"label":"泉港区",
"value":"3117",
"childrens":[]},
{
"label":"金门县",
"value":"3495",
"childrens":[]},
{
"label":"洛江区",
"value":"3498",
"childrens":[]},
{
"label":"鲤城区",
"value":"53145",
"childrens":[]},
{
"label":"丰泽区",
"value":"53146",
"childrens":[]},
{
"label":"晋江区",
"value":"53147",
"childrens":[]}]},

{
"label":"漳州市",
"value":"1341",
"childrens":[{
"label":"龙海市",
"value":"1343",
"childrens":[]},
{
"label":"平和县",
"value":"1344",
"childrens":[]},
{
"label":"南靖县",
"value":"1345",
"childrens":[]},
{
"label":"诏安县",
"value":"1346",
"childrens":[]},
{
"label":"漳浦县",
"value":"1347",
"childrens":[]},
{
"label":"华安县",
"value":"1348",
"childrens":[]},
{
"label":"云霄县",
"value":"1349",
"childrens":[]},
{
"label":"东山县",
"value":"1350",
"childrens":[]},
{
"label":"长泰县",
"value":"1351",
"childrens":[]},
{
"label":"芗城区",
"value":"3499",
"childrens":[]},
{
"label":"龙文区",
"value":"3500",
"childrens":[]}]},

{
"label":"南平市",
"value":"1352",
"childrens":[{
"label":"建瓯市",
"value":"1354",
"childrens":[]},
{
"label":"邵武市",
"value":"1355",
"childrens":[]},
{
"label":"武夷山市",
"value":"1356",
"childrens":[]},
{
"label":"建阳市",
"value":"1357",
"childrens":[]},
{
"label":"松溪县",
"value":"1358",
"childrens":[]},
{
"label":"顺昌县",
"value":"1359",
"childrens":[]},
{
"label":"浦城县",
"value":"1360",
"childrens":[]},
{
"label":"政和县",
"value":"1361",
"childrens":[]},
{
"label":"光泽县",
"value":"2956",
"childrens":[]},
{
"label":"延平区",
"value":"53148",
"childrens":[]}]},

{
"label":"龙岩市",
"value":"1362",
"childrens":[{
"label":"漳平市",
"value":"1364",
"childrens":[]},
{
"label":"长汀县",
"value":"1365",
"childrens":[]},
{
"label":"武平县",
"value":"1366",
"childrens":[]},
{
"label":"永定县",
"value":"1367",
"childrens":[]},
{
"label":"上杭县",
"value":"1368",
"childrens":[]},
{
"label":"连城县",
"value":"1369",
"childrens":[]},
{
"label":"新罗区",
"value":"53149",
"childrens":[]}]},

{
"label":"宁德市",
"value":"1370",
"childrens":[{
"label":"福安市",
"value":"1372",
"childrens":[]},
{
"label":"福鼎市",
"value":"1373",
"childrens":[]},
{
"label":"寿宁县",
"value":"1374",
"childrens":[]},
{
"label":"霞浦县",
"value":"1375",
"childrens":[]},
{
"label":"柘荣县",
"value":"1376",
"childrens":[]},
{
"label":"屏南县",
"value":"1377",
"childrens":[]},
{
"label":"古田县",
"value":"1378",
"childrens":[]},
{
"label":"周宁县",
"value":"1379",
"childrens":[]},
{
"label":"蕉城区",
"value":"53150",
"childrens":[]},
{
"label":"东侨开发区",
"value":"53151",
"childrens":[]}]}]},


{
"label":"湖北",
"value":"17",
"childrens":[{
"label":"武汉市",
"value":"1381",
"childrens":[{
"label":"江岸区",
"value":"1386",
"childrens":[]},
{
"label":"武昌区",
"value":"3079",
"childrens":[]},
{
"label":"江汉区",
"value":"3582",
"childrens":[]},
{
"label":"硚口区",
"value":"3583",
"childrens":[]},
{
"label":"武汉经济技术开发区",
"value":"4424",
"childrens":[]},
{
"label":"蔡甸区",
"value":"53566",
"childrens":[]},
{
"label":"江夏区",
"value":"53567",
"childrens":[]},
{
"label":"新洲区",
"value":"53568",
"childrens":[]},
{
"label":"黄陂区",
"value":"53569",
"childrens":[]},
{
"label":"汉阳区",
"value":"53570",
"childrens":[]},
{
"label":"青山区",
"value":"53571",
"childrens":[]},
{
"label":"洪山区",
"value":"53572",
"childrens":[]},
{
"label":"汉南区",
"value":"53573",
"childrens":[]},
{
"label":"东西湖区",
"value":"53574",
"childrens":[]}]},

{
"label":"黄石市",
"value":"1387",
"childrens":[{
"label":"黄石港区",
"value":"1389",
"childrens":[]},
{
"label":"铁山区",
"value":"1392",
"childrens":[]},
{
"label":"大冶市",
"value":"1393",
"childrens":[]},
{
"label":"阳新县",
"value":"1394",
"childrens":[]},
{
"label":"下陆区",
"value":"53575",
"childrens":[]},
{
"label":"西塞山区",
"value":"53576",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"53577",
"childrens":[]}]},

{
"label":"襄阳市",
"value":"1396",
"childrens":[{
"label":"老河口市",
"value":"1397",
"childrens":[]},
{
"label":"枣阳市",
"value":"1398",
"childrens":[]},
{
"label":"宜城市",
"value":"1399",
"childrens":[]},
{
"label":"南漳县",
"value":"1401",
"childrens":[]},
{
"label":"保康县",
"value":"1402",
"childrens":[]},
{
"label":"谷城县",
"value":"1403",
"childrens":[]},
{
"label":"樊城区",
"value":"53578",
"childrens":[]},
{
"label":"襄城区",
"value":"53579",
"childrens":[]},
{
"label":"襄州区",
"value":"53580",
"childrens":[]}]},

{
"label":"十堰市",
"value":"1405",
"childrens":[{
"label":"丹江口市",
"value":"1406",
"childrens":[]},
{
"label":"房县",
"value":"1407",
"childrens":[]},
{
"label":"竹山县",
"value":"1408",
"childrens":[]},
{
"label":"竹溪县",
"value":"1409",
"childrens":[]},
{
"label":"郧县",
"value":"1410",
"childrens":[]},
{
"label":"郧西县",
"value":"1411",
"childrens":[]},
{
"label":"茅箭区",
"value":"53581",
"childrens":[]},
{
"label":"张湾区",
"value":"53582",
"childrens":[]}]},

{
"label":"荆州市",
"value":"1413",
"childrens":[{
"label":"江陵县",
"value":"1414",
"childrens":[{
"label":"资市镇",
"value":"7632",
"childrens":[]},
{
"label":"滩桥镇",
"value":"7633",
"childrens":[]},
{
"label":"熊河镇",
"value":"7634",
"childrens":[]},
{
"label":"白马寺镇",
"value":"7635",
"childrens":[]},
{
"label":"沙岗镇",
"value":"7636",
"childrens":[]},
{
"label":"普济镇",
"value":"7637",
"childrens":[]},
{
"label":"郝穴镇",
"value":"7638",
"childrens":[]},
{
"label":"马家寨乡",
"value":"7639",
"childrens":[]},
{
"label":"秦市乡",
"value":"7640",
"childrens":[]},
{
"label":"江北监狱",
"value":"7641",
"childrens":[]},
{
"label":"江陵县工业园区",
"value":"7642",
"childrens":[]},
{
"label":"三湖管理区",
"value":"7643",
"childrens":[]},
{
"label":"六合垸管理区",
"value":"7644",
"childrens":[]}]},

{
"label":"洪湖市",
"value":"1415",
"childrens":[{
"label":"新堤街道",
"value":"7589",
"childrens":[]},
{
"label":"滨湖街道",
"value":"7590",
"childrens":[]},
{
"label":"螺山镇",
"value":"7591",
"childrens":[]},
{
"label":"乌林镇",
"value":"7592",
"childrens":[]},
{
"label":"龙口镇",
"value":"7593",
"childrens":[]},
{
"label":"燕窝镇",
"value":"7594",
"childrens":[]},
{
"label":"新滩镇",
"value":"7595",
"childrens":[]},
{
"label":"峰口镇",
"value":"7596",
"childrens":[]},
{
"label":"曹市镇",
"value":"7597",
"childrens":[]},
{
"label":"府场镇",
"value":"7598",
"childrens":[]},
{
"label":"戴家场镇",
"value":"7599",
"childrens":[]},
{
"label":"瞿家湾镇",
"value":"7600",
"childrens":[]},
{
"label":"沙口镇",
"value":"7601",
"childrens":[]},
{
"label":"万全镇",
"value":"7602",
"childrens":[]},
{
"label":"汊河镇",
"value":"7603",
"childrens":[]},
{
"label":"黄家口镇",
"value":"7604",
"childrens":[]},
{
"label":"老湾乡",
"value":"7605",
"childrens":[]},
{
"label":"小港管理区",
"value":"7606",
"childrens":[]},
{
"label":"大同湖管理区",
"value":"7607",
"childrens":[]},
{
"label":"大沙湖管理区",
"value":"7608",
"childrens":[]}]},

{
"label":"石首市",
"value":"1416",
"childrens":[{
"label":"绣林街道",
"value":"7670",
"childrens":[]},
{
"label":"笔架山街道",
"value":"7671",
"childrens":[]},
{
"label":"新厂镇",
"value":"7672",
"childrens":[]},
{
"label":"横沟市镇",
"value":"7673",
"childrens":[]},
{
"label":"大垸镇",
"value":"7674",
"childrens":[]},
{
"label":"小河口镇",
"value":"7675",
"childrens":[]},
{
"label":"桃花山镇",
"value":"7676",
"childrens":[]},
{
"label":"调关镇",
"value":"7677",
"childrens":[]},
{
"label":"东升镇",
"value":"7678",
"childrens":[]},
{
"label":"高基庙镇",
"value":"7679",
"childrens":[]},
{
"label":"南口镇",
"value":"7680",
"childrens":[]},
{
"label":"高陵镇",
"value":"7681",
"childrens":[]},
{
"label":"团山寺镇",
"value":"7682",
"childrens":[]},
{
"label":"久合垸乡",
"value":"7683",
"childrens":[]},
{
"label":"天鹅洲开发区",
"value":"7684",
"childrens":[]}]},

{
"label":"松滋市",
"value":"1417",
"childrens":[{
"label":"新江口镇",
"value":"7685",
"childrens":[]},
{
"label":"南海镇",
"value":"7686",
"childrens":[]},
{
"label":"八宝镇",
"value":"7687",
"childrens":[]},
{
"label":"宛市镇",
"value":"7688",
"childrens":[]},
{
"label":"老城镇",
"value":"7689",
"childrens":[]},
{
"label":"陈店镇",
"value":"7690",
"childrens":[]},
{
"label":"王家桥镇",
"value":"7691",
"childrens":[]},
{
"label":"斯家场镇",
"value":"7692",
"childrens":[]},
{
"label":"杨林市镇",
"value":"7693",
"childrens":[]},
{
"label":"纸厂河镇",
"value":"7694",
"childrens":[]},
{
"label":"街河市镇",
"value":"7695",
"childrens":[]},
{
"label":"危水镇",
"value":"7696",
"childrens":[]},
{
"label":"刘家场镇",
"value":"7697",
"childrens":[]},
{
"label":"沙道观镇",
"value":"7698",
"childrens":[]},
{
"label":"万家乡",
"value":"7699",
"childrens":[]},
{
"label":"卸甲坪土家族乡",
"value":"7700",
"childrens":[]}]},

{
"label":"监利县",
"value":"1418",
"childrens":[{
"label":"容城镇",
"value":"7609",
"childrens":[]},
{
"label":"朱河镇",
"value":"7610",
"childrens":[]},
{
"label":"新沟镇",
"value":"7611",
"childrens":[]},
{
"label":"龚场镇",
"value":"7612",
"childrens":[]},
{
"label":"周老嘴镇",
"value":"7613",
"childrens":[]},
{
"label":"黄歇口镇",
"value":"7614",
"childrens":[]},
{
"label":"汪桥镇",
"value":"7615",
"childrens":[]},
{
"label":"程集镇",
"value":"7616",
"childrens":[]},
{
"label":"分盐镇",
"value":"7617",
"childrens":[]},
{
"label":"毛市镇",
"value":"7618",
"childrens":[]},
{
"label":"福田寺镇",
"value":"7619",
"childrens":[]},
{
"label":"上车湾镇",
"value":"7620",
"childrens":[]},
{
"label":"汴河镇",
"value":"7621",
"childrens":[]},
{
"label":"尺八镇",
"value":"7622",
"childrens":[]},
{
"label":"白螺镇",
"value":"7623",
"childrens":[]},
{
"label":"网市镇",
"value":"7624",
"childrens":[]},
{
"label":"三洲镇",
"value":"7625",
"childrens":[]},
{
"label":"桥市镇",
"value":"7626",
"childrens":[]},
{
"label":"红城乡",
"value":"7627",
"childrens":[]},
{
"label":"棋盘乡",
"value":"7628",
"childrens":[]},
{
"label":"柘木乡",
"value":"7629",
"childrens":[]},
{
"label":"人民大垸农场管理区",
"value":"7630",
"childrens":[]},
{
"label":"荒湖农场管理区",
"value":"7631",
"childrens":[]}]},

{
"label":"公安县",
"value":"1419",
"childrens":[{
"label":"埠河镇",
"value":"7573",
"childrens":[]},
{
"label":"斗湖堤镇",
"value":"7574",
"childrens":[]},
{
"label":"夹竹园镇",
"value":"7575",
"childrens":[]},
{
"label":"闸口镇",
"value":"7576",
"childrens":[]},
{
"label":"杨家厂镇",
"value":"7577",
"childrens":[]},
{
"label":"麻豪口镇",
"value":"7578",
"childrens":[]},
{
"label":"藕池镇",
"value":"7579",
"childrens":[]},
{
"label":"黄山头镇",
"value":"7580",
"childrens":[]},
{
"label":"孟家溪镇",
"value":"7581",
"childrens":[]},
{
"label":"南平镇",
"value":"7582",
"childrens":[]},
{
"label":"章庄铺镇",
"value":"7583",
"childrens":[]},
{
"label":"狮子口镇",
"value":"7584",
"childrens":[]},
{
"label":"斑竹垱镇",
"value":"7585",
"childrens":[]},
{
"label":"毛家港镇",
"value":"7586",
"childrens":[]},
{
"label":"甘家厂乡",
"value":"7587",
"childrens":[]},
{
"label":"章田寺乡",
"value":"7588",
"childrens":[]}]},

{
"label":"沙市区",
"value":"3593",
"childrens":[{
"label":"中山街道",
"value":"7657",
"childrens":[]},
{
"label":"崇文街道",
"value":"7658",
"childrens":[]},
{
"label":"解放街道",
"value":"7659",
"childrens":[]},
{
"label":"胜利街道",
"value":"7660",
"childrens":[]},
{
"label":"朝阳街道",
"value":"7661",
"childrens":[]},
{
"label":"联合街道",
"value":"7662",
"childrens":[]},
{
"label":"锣场镇",
"value":"7663",
"childrens":[]},
{
"label":"岑河镇",
"value":"7664",
"childrens":[]},
{
"label":"观音当镇",
"value":"7665",
"childrens":[]},
{
"label":"关沮镇",
"value":"7666",
"childrens":[]},
{
"label":"立新乡",
"value":"7667",
"childrens":[]},
{
"label":"岑河原种场",
"value":"7668",
"childrens":[]},
{
"label":"沙市农场",
"value":"7669",
"childrens":[]}]},

{
"label":"荆州区",
"value":"4078",
"childrens":[{
"label":"西城街道",
"value":"7645",
"childrens":[]},
{
"label":"东城街道",
"value":"7646",
"childrens":[]},
{
"label":"城南街道",
"value":"7647",
"childrens":[]},
{
"label":"纪南镇",
"value":"7648",
"childrens":[]},
{
"label":"川店镇",
"value":"7649",
"childrens":[]},
{
"label":"马山镇",
"value":"7650",
"childrens":[]},
{
"label":"八岭山镇",
"value":"7651",
"childrens":[]},
{
"label":"李埠镇",
"value":"7652",
"childrens":[]},
{
"label":"弥市镇",
"value":"7653",
"childrens":[]},
{
"label":"郢城镇",
"value":"7654",
"childrens":[]},
{
"label":"太湖港管理区",
"value":"7655",
"childrens":[]},
{
"label":"菱角湖管理区",
"value":"7656",
"childrens":[]}]}]},


{
"label":"宜昌市",
"value":"1421",
"childrens":[{
"label":"当阳市",
"value":"1423",
"childrens":[{
"label":"玉阳街道",
"value":"7493",
"childrens":[]},
{
"label":"坝陵街道",
"value":"7494",
"childrens":[]},
{
"label":"玉泉街道",
"value":"7495",
"childrens":[]},
{
"label":"两河镇",
"value":"7496",
"childrens":[]},
{
"label":"河溶镇",
"value":"7497",
"childrens":[]},
{
"label":"育溪镇",
"value":"7498",
"childrens":[]},
{
"label":"庙前镇",
"value":"7499",
"childrens":[]},
{
"label":"王店镇",
"value":"7500",
"childrens":[]},
{
"label":"半月镇",
"value":"7501",
"childrens":[]},
{
"label":"草埠湖镇",
"value":"7502",
"childrens":[]}]},

{
"label":"枝江市",
"value":"1424",
"childrens":[{
"label":"马家店街道",
"value":"7503",
"childrens":[]},
{
"label":"安福寺镇",
"value":"7504",
"childrens":[]},
{
"label":"白洋镇",
"value":"7505",
"childrens":[]},
{
"label":"顾家店镇",
"value":"7506",
"childrens":[]},
{
"label":"董市镇",
"value":"7507",
"childrens":[]},
{
"label":"仙女镇",
"value":"7508",
"childrens":[]},
{
"label":"问安镇",
"value":"7509",
"childrens":[]},
{
"label":"七星台镇",
"value":"7510",
"childrens":[]},
{
"label":"百里洲镇",
"value":"7511",
"childrens":[]}]},

{
"label":"夷陵区",
"value":"1425",
"childrens":[{
"label":"小溪塔街道办",
"value":"7422",
"childrens":[]},
{
"label":"夷陵经济开发区",
"value":"7423",
"childrens":[]},
{
"label":"樟村坪镇",
"value":"7424",
"childrens":[]},
{
"label":"雾渡河镇",
"value":"7425",
"childrens":[]},
{
"label":"分乡镇",
"value":"7426",
"childrens":[]},
{
"label":"太平溪镇",
"value":"7427",
"childrens":[]},
{
"label":"三斗坪镇",
"value":"7428",
"childrens":[]},
{
"label":"乐天溪镇",
"value":"7429",
"childrens":[]},
{
"label":"龙泉镇",
"value":"7430",
"childrens":[]},
{
"label":"鸦鹊岭镇",
"value":"7431",
"childrens":[]},
{
"label":"下堡坪乡",
"value":"7432",
"childrens":[]},
{
"label":"邓村乡",
"value":"7433",
"childrens":[]},
{
"label":"黄花乡",
"value":"7434",
"childrens":[]},
{
"label":"三峡坝区",
"value":"7435",
"childrens":[]}]},

{
"label":"秭归县",
"value":"1426",
"childrens":[{
"label":"茅坪镇",
"value":"7451",
"childrens":[]},
{
"label":"归州镇",
"value":"7452",
"childrens":[]},
{
"label":"屈原镇",
"value":"7453",
"childrens":[]},
{
"label":"沙镇溪镇",
"value":"7454",
"childrens":[]},
{
"label":"两河口镇",
"value":"7455",
"childrens":[]},
{
"label":"郭家坝镇",
"value":"7456",
"childrens":[]},
{
"label":"杨林桥镇",
"value":"7457",
"childrens":[]},
{
"label":"九畹溪镇",
"value":"7458",
"childrens":[]},
{
"label":"水田坝乡",
"value":"7459",
"childrens":[]},
{
"label":"泄滩乡",
"value":"7460",
"childrens":[]},
{
"label":"梅家河乡",
"value":"7461",
"childrens":[]},
{
"label":"磨坪乡",
"value":"7462",
"childrens":[]}]},

{
"label":"兴山县",
"value":"1427",
"childrens":[{
"label":"古夫镇",
"value":"7443",
"childrens":[]},
{
"label":"昭君镇",
"value":"7444",
"childrens":[]},
{
"label":"峡口镇",
"value":"7445",
"childrens":[]},
{
"label":"南阳镇",
"value":"7446",
"childrens":[]},
{
"label":"黄粮镇",
"value":"7447",
"childrens":[]},
{
"label":"水月寺镇",
"value":"7448",
"childrens":[]},
{
"label":"高桥乡",
"value":"7449",
"childrens":[]},
{
"label":"榛子乡",
"value":"7450",
"childrens":[]}]},

{
"label":"远安县",
"value":"1428",
"childrens":[{
"label":"鸣凤镇",
"value":"7436",
"childrens":[]},
{
"label":"花林寺镇",
"value":"7437",
"childrens":[]},
{
"label":"旧县镇",
"value":"7438",
"childrens":[]},
{
"label":"洋坪镇",
"value":"7439",
"childrens":[]},
{
"label":"茅坪场镇",
"value":"7440",
"childrens":[]},
{
"label":"荷花镇",
"value":"7441",
"childrens":[]},
{
"label":"河口乡",
"value":"7442",
"childrens":[]}]},

{
"label":"五峰土家族自治县",
"value":"1429",
"childrens":[{
"label":"五峰镇",
"value":"7474",
"childrens":[]},
{
"label":"长乐坪镇",
"value":"7475",
"childrens":[]},
{
"label":"渔洋关镇",
"value":"7476",
"childrens":[]},
{
"label":"仁和坪镇",
"value":"7477",
"childrens":[]},
{
"label":"湾潭镇",
"value":"7478",
"childrens":[]},
{
"label":"付家堰乡",
"value":"7479",
"childrens":[]},
{
"label":"牛庄乡",
"value":"7480",
"childrens":[]},
{
"label":"采花乡",
"value":"7481",
"childrens":[]}]},

{
"label":"长阳土家族自治县",
"value":"1430",
"childrens":[{
"label":"龙舟坪镇",
"value":"7463",
"childrens":[]},
{
"label":"高家堰镇",
"value":"7464",
"childrens":[]},
{
"label":"磨市镇",
"value":"7465",
"childrens":[]},
{
"label":"都镇湾镇",
"value":"7466",
"childrens":[]},
{
"label":"资丘镇",
"value":"7467",
"childrens":[]},
{
"label":"渔峡口镇",
"value":"7468",
"childrens":[]},
{
"label":"榔坪镇",
"value":"7469",
"childrens":[]},
{
"label":"贺家坪镇",
"value":"7470",
"childrens":[]},
{
"label":"大堰乡",
"value":"7471",
"childrens":[]},
{
"label":"鸭子口乡",
"value":"7472",
"childrens":[]},
{
"label":"火烧坪乡",
"value":"7473",
"childrens":[]}]},

{
"label":"宜都市",
"value":"3594",
"childrens":[{
"label":"陆城街道",
"value":"8098",
"childrens":[]},
{
"label":"红花套镇",
"value":"8099",
"childrens":[]},
{
"label":"高坝洲镇",
"value":"8100",
"childrens":[]},
{
"label":"聂家河镇",
"value":"8101",
"childrens":[]},
{
"label":"松木坪镇",
"value":"8102",
"childrens":[]},
{
"label":"枝城镇",
"value":"8103",
"childrens":[]},
{
"label":"姚家店镇",
"value":"8104",
"childrens":[]},
{
"label":"五眼泉镇",
"value":"8105",
"childrens":[]},
{
"label":"潘家湾土家族乡",
"value":"8106",
"childrens":[]},
{
"label":"王家畈乡",
"value":"8107",
"childrens":[]},
{
"label":"松宜矿区管理委员会",
"value":"8137",
"childrens":[]}]},

{
"label":"猇亭区",
"value":"3595",
"childrens":[{
"label":"古老背街道",
"value":"7419",
"childrens":[]},
{
"label":"虎牙街道",
"value":"7420",
"childrens":[]},
{
"label":"云池街道",
"value":"7421",
"childrens":[]}]},

{
"label":"点军区",
"value":"3596",
"childrens":[{
"label":"点军街道",
"value":"7414",
"childrens":[]},
{
"label":"艾家镇",
"value":"7415",
"childrens":[]},
{
"label":"桥边镇",
"value":"7416",
"childrens":[]},
{
"label":"联棚乡",
"value":"7417",
"childrens":[]},
{
"label":"土城乡",
"value":"7418",
"childrens":[]}]},

{
"label":"伍家岗区",
"value":"3597",
"childrens":[{
"label":"大公桥街道",
"value":"7409",
"childrens":[]},
{
"label":"万寿桥街道",
"value":"7410",
"childrens":[]},
{
"label":"宝塔河街道",
"value":"7411",
"childrens":[]},
{
"label":"伍家岗街道",
"value":"7412",
"childrens":[]},
{
"label":"伍家乡",
"value":"7413",
"childrens":[]}]},

{
"label":"西陵区",
"value":"3598",
"childrens":[{
"label":"西陵街道",
"value":"7400",
"childrens":[]},
{
"label":"学院街道",
"value":"7401",
"childrens":[]},
{
"label":"云集街道",
"value":"7402",
"childrens":[]},
{
"label":"西坝街道",
"value":"7403",
"childrens":[]},
{
"label":"葛洲坝街道",
"value":"7404",
"childrens":[]},
{
"label":"夜明珠街道",
"value":"7405",
"childrens":[]},
{
"label":"开发区",
"value":"7406",
"childrens":[]},
{
"label":"窑湾乡",
"value":"7407",
"childrens":[]},
{
"label":"峡口风景区",
"value":"7408",
"childrens":[]}]}]},


{
"label":"孝感市",
"value":"1432",
"childrens":[{
"label":"汉川市",
"value":"1435",
"childrens":[]},
{
"label":"云梦县",
"value":"1437",
"childrens":[]},
{
"label":"大悟县",
"value":"1438",
"childrens":[]},
{
"label":"孝昌县",
"value":"1439",
"childrens":[]},
{
"label":"孝南区",
"value":"53583",
"childrens":[]},
{
"label":"应城市",
"value":"53584",
"childrens":[]},
{
"label":"安陆市",
"value":"53585",
"childrens":[]}]},

{
"label":"黄冈市",
"value":"1441",
"childrens":[{
"label":"红安县",
"value":"1444",
"childrens":[]},
{
"label":"罗田县",
"value":"1445",
"childrens":[]},
{
"label":"黄梅县",
"value":"1447",
"childrens":[]},
{
"label":"英山县",
"value":"1448",
"childrens":[]},
{
"label":"团风县",
"value":"1449",
"childrens":[]},
{
"label":"黄州区",
"value":"53586",
"childrens":[]},
{
"label":"蕲春县",
"value":"53587",
"childrens":[]},
{
"label":"麻城市",
"value":"53588",
"childrens":[]},
{
"label":"武穴市",
"value":"53589",
"childrens":[]},
{
"label":"浠水县",
"value":"53590",
"childrens":[]}]},

{
"label":"咸宁市",
"value":"1458",
"childrens":[{
"label":"嘉鱼县",
"value":"1461",
"childrens":[]},
{
"label":"通山县",
"value":"1462",
"childrens":[]},
{
"label":"崇阳县",
"value":"1463",
"childrens":[]},
{
"label":"通城县",
"value":"1464",
"childrens":[]},
{
"label":"咸安区",
"value":"53591",
"childrens":[]},
{
"label":"赤壁市",
"value":"53592",
"childrens":[]}]},

{
"label":"恩施州",
"value":"1466",
"childrens":[{
"label":"恩施市",
"value":"1467",
"childrens":[]},
{
"label":"利川市",
"value":"1468",
"childrens":[]},
{
"label":"建始县",
"value":"1469",
"childrens":[]},
{
"label":"来凤县",
"value":"1470",
"childrens":[]},
{
"label":"巴东县",
"value":"1471",
"childrens":[]},
{
"label":"鹤峰县",
"value":"1472",
"childrens":[]},
{
"label":"宣恩县",
"value":"1473",
"childrens":[]},
{
"label":"咸丰县",
"value":"1474",
"childrens":[]}]},

{
"label":"鄂州市",
"value":"1475",
"childrens":[{
"label":"梁子湖区",
"value":"3601",
"childrens":[]},
{
"label":"华容区",
"value":"3602",
"childrens":[]},
{
"label":"鄂城区",
"value":"53593",
"childrens":[]}]},

{
"label":"荆门市",
"value":"1477",
"childrens":[{
"label":"京山县",
"value":"1478",
"childrens":[{
"label":"新市镇",
"value":"7527",
"childrens":[]},
{
"label":"永兴镇",
"value":"7528",
"childrens":[]},
{
"label":"曹武镇",
"value":"7529",
"childrens":[]},
{
"label":"罗店镇",
"value":"7530",
"childrens":[]},
{
"label":"宋河镇",
"value":"7531",
"childrens":[]},
{
"label":"坪坝镇",
"value":"7532",
"childrens":[]},
{
"label":"三阳镇",
"value":"7533",
"childrens":[]},
{
"label":"绿林镇",
"value":"7534",
"childrens":[]},
{
"label":"杨集镇",
"value":"7535",
"childrens":[]},
{
"label":"孙桥镇",
"value":"7536",
"childrens":[]},
{
"label":"石龙镇",
"value":"7537",
"childrens":[]},
{
"label":"永漋镇",
"value":"7538",
"childrens":[]},
{
"label":"雁门口镇",
"value":"7539",
"childrens":[]},
{
"label":"钱场镇",
"value":"7540",
"childrens":[]},
{
"label":"八里途开发区",
"value":"7541",
"childrens":[]},
{
"label":"县原种场",
"value":"7542",
"childrens":[]},
{
"label":"屈家岭管理区",
"value":"8144",
"childrens":[]}]},

{
"label":"钟祥市",
"value":"2973",
"childrens":[{
"label":"郢中街道",
"value":"7556",
"childrens":[]},
{
"label":"洋梓镇",
"value":"7557",
"childrens":[]},
{
"label":"长寿镇",
"value":"7558",
"childrens":[]},
{
"label":"丰乐镇",
"value":"7559",
"childrens":[]},
{
"label":"胡集镇",
"value":"7560",
"childrens":[]},
{
"label":"双河镇",
"value":"7561",
"childrens":[]},
{
"label":"磷矿镇",
"value":"7562",
"childrens":[]},
{
"label":"文集镇",
"value":"7563",
"childrens":[]},
{
"label":"冷水镇",
"value":"7564",
"childrens":[]},
{
"label":"石牌镇",
"value":"7565",
"childrens":[]},
{
"label":"旧口镇",
"value":"7566",
"childrens":[]},
{
"label":"柴湖镇",
"value":"7567",
"childrens":[]},
{
"label":"长滩镇",
"value":"7568",
"childrens":[]},
{
"label":"东桥镇",
"value":"7569",
"childrens":[]},
{
"label":"客店镇",
"value":"7570",
"childrens":[]},
{
"label":"张集镇",
"value":"7571",
"childrens":[]},
{
"label":"九里回族乡",
"value":"7572",
"childrens":[]}]},

{
"label":"沙洋县",
"value":"3055",
"childrens":[{
"label":"沙洋镇",
"value":"7543",
"childrens":[]},
{
"label":"五里铺镇",
"value":"7544",
"childrens":[]},
{
"label":"十里铺镇",
"value":"7545",
"childrens":[]},
{
"label":"纪山镇",
"value":"7546",
"childrens":[]},
{
"label":"拾回桥镇",
"value":"7547",
"childrens":[]},
{
"label":"后港镇",
"value":"7548",
"childrens":[]},
{
"label":"毛李镇",
"value":"7549",
"childrens":[]},
{
"label":"官当镇",
"value":"7550",
"childrens":[]},
{
"label":"李市镇",
"value":"7551",
"childrens":[]},
{
"label":"马良镇",
"value":"7552",
"childrens":[]},
{
"label":"高阳镇",
"value":"7553",
"childrens":[]},
{
"label":"沈集镇",
"value":"7554",
"childrens":[]},
{
"label":"曾集镇",
"value":"7555",
"childrens":[]}]},

{
"label":"掇刀区",
"value":"3599",
"childrens":[{
"label":"掇刀石街道",
"value":"7522",
"childrens":[]},
{
"label":"白庙街道",
"value":"7523",
"childrens":[]},
{
"label":"团林铺镇",
"value":"7524",
"childrens":[]},
{
"label":"麻城镇",
"value":"7525",
"childrens":[]},
{
"label":"荆门经济开发区",
"value":"7526",
"childrens":[]}]},

{
"label":"东宝区",
"value":"3600",
"childrens":[{
"label":"龙泉街道",
"value":"7512",
"childrens":[]},
{
"label":"泉口街道",
"value":"7513",
"childrens":[]},
{
"label":"栗溪镇",
"value":"7514",
"childrens":[]},
{
"label":"子陵镇",
"value":"7515",
"childrens":[]},
{
"label":"漳河镇",
"value":"7516",
"childrens":[]},
{
"label":"马河镇",
"value":"7517",
"childrens":[]},
{
"label":"石桥驿镇",
"value":"7518",
"childrens":[]},
{
"label":"牌楼镇",
"value":"7519",
"childrens":[]},
{
"label":"仙居乡",
"value":"7520",
"childrens":[]},
{
"label":"东宝工业园区",
"value":"7521",
"childrens":[]}]}]},


{
"label":"随州市",
"value":"1479",
"childrens":[{
"label":"广水市",
"value":"3163",
"childrens":[{
"label":"应山街道",
"value":"7013",
"childrens":[]},
{
"label":"广水街道",
"value":"7014",
"childrens":[]},
{
"label":"武胜关镇",
"value":"7015",
"childrens":[]},
{
"label":"杨寨镇",
"value":"7016",
"childrens":[]},
{
"label":"陈巷镇",
"value":"7017",
"childrens":[]},
{
"label":"长岭镇",
"value":"7018",
"childrens":[]},
{
"label":"马坪镇",
"value":"7019",
"childrens":[]},
{
"label":"关庙镇",
"value":"7020",
"childrens":[]},
{
"label":"余店镇",
"value":"7021",
"childrens":[]},
{
"label":"吴店镇",
"value":"7022",
"childrens":[]},
{
"label":"郝店镇",
"value":"7023",
"childrens":[]},
{
"label":"蔡河镇",
"value":"7024",
"childrens":[]},
{
"label":"城郊乡",
"value":"7025",
"childrens":[]},
{
"label":"李店乡",
"value":"7026",
"childrens":[]},
{
"label":"太平乡",
"value":"7027",
"childrens":[]},
{
"label":"骆店乡",
"value":"7028",
"childrens":[]},
{
"label":"中华山林场",
"value":"7029",
"childrens":[]},
{
"label":"三潭风景区",
"value":"7030",
"childrens":[]}]},

{
"label":"曾都区",
"value":"3164",
"childrens":[{
"label":"北郊",
"value":"7031",
"childrens":[]},
{
"label":"南郊",
"value":"7032",
"childrens":[]},
{
"label":"东城",
"value":"7033",
"childrens":[]},
{
"label":"西城",
"value":"7034",
"childrens":[]},
{
"label":"城东新区",
"value":"7035",
"childrens":[]},
{
"label":"城南新区",
"value":"7036",
"childrens":[]},
{
"label":"万店镇",
"value":"7037",
"childrens":[]},
{
"label":"何店镇",
"value":"7038",
"childrens":[]},
{
"label":"洛阳镇",
"value":"7039",
"childrens":[]},
{
"label":"府河镇",
"value":"7040",
"childrens":[]},
{
"label":"淅河镇",
"value":"7041",
"childrens":[]},
{
"label":"新型工业基地",
"value":"7042",
"childrens":[]},
{
"label":"经济开发区",
"value":"7043",
"childrens":[]}]},

{
"label":"随县",
"value":"7357",
"childrens":[{
"label":"厉山镇",
"value":"7358",
"childrens":[]},
{
"label":"高城镇",
"value":"7377",
"childrens":[]},
{
"label":"殷店镇",
"value":"7378",
"childrens":[]},
{
"label":"草店镇",
"value":"7379",
"childrens":[]},
{
"label":"小林镇",
"value":"7380",
"childrens":[]},
{
"label":"淮河镇",
"value":"7381",
"childrens":[]},
{
"label":"万和镇",
"value":"7382",
"childrens":[]},
{
"label":"尚市镇",
"value":"7383",
"childrens":[]},
{
"label":"唐县镇",
"value":"7384",
"childrens":[]},
{
"label":"吴山镇",
"value":"7385",
"childrens":[]},
{
"label":"新街镇",
"value":"7386",
"childrens":[]},
{
"label":"安居镇",
"value":"7387",
"childrens":[]},
{
"label":"环潭镇",
"value":"7388",
"childrens":[]},
{
"label":"洪山镇",
"value":"7389",
"childrens":[]},
{
"label":"长岗镇",
"value":"7390",
"childrens":[]},
{
"label":"三里岗镇",
"value":"7391",
"childrens":[]},
{
"label":"柳林镇",
"value":"7392",
"childrens":[]},
{
"label":"均川镇",
"value":"7393",
"childrens":[]},
{
"label":"万福店镇",
"value":"7394",
"childrens":[]}]}]},


{
"label":"潜江市",
"value":"2922",
"childrens":[{
"label":"园林",
"value":"53594",
"childrens":[]},
{
"label":"杨市",
"value":"53595",
"childrens":[]},
{
"label":"周矶",
"value":"53596",
"childrens":[]},
{
"label":"广华",
"value":"53597",
"childrens":[]},
{
"label":"泰丰",
"value":"53598",
"childrens":[]},
{
"label":"竹根滩镇",
"value":"53599",
"childrens":[]},
{
"label":"高石碑镇",
"value":"53600",
"childrens":[]},
{
"label":"积玉口镇",
"value":"53601",
"childrens":[]},
{
"label":"渔洋镇",
"value":"53602",
"childrens":[]},
{
"label":"王场镇",
"value":"53603",
"childrens":[]},
{
"label":"熊口镇",
"value":"53604",
"childrens":[]},
{
"label":"老新镇",
"value":"53605",
"childrens":[]},
{
"label":"浩口镇",
"value":"53606",
"childrens":[]},
{
"label":"张金镇",
"value":"53607",
"childrens":[]},
{
"label":"龙湾镇",
"value":"53608",
"childrens":[]},
{
"label":"江汉石油管理局",
"value":"53609",
"childrens":[]},
{
"label":"钱江经济开发区",
"value":"53610",
"childrens":[]},
{
"label":"西大垸管理区",
"value":"53611",
"childrens":[]},
{
"label":"运粮湖管理区",
"value":"53612",
"childrens":[]},
{
"label":"周矶管理区",
"value":"53613",
"childrens":[]},
{
"label":"后湖管理区",
"value":"53614",
"childrens":[]},
{
"label":"熊口管理区",
"value":"53615",
"childrens":[]},
{
"label":"总口管理区",
"value":"53616",
"childrens":[]},
{
"label":"高场原种场",
"value":"53617",
"childrens":[]},
{
"label":"浩口原种场",
"value":"53618",
"childrens":[]}]},

{
"label":"天门市",
"value":"2980",
"childrens":[{
"label":"侨乡街道开发区",
"value":"53619",
"childrens":[]},
{
"label":"竟陵街道",
"value":"53620",
"childrens":[]},
{
"label":"杨林街道",
"value":"53621",
"childrens":[]},
{
"label":"佛子山镇",
"value":"53622",
"childrens":[]},
{
"label":"多宝镇",
"value":"53623",
"childrens":[]},
{
"label":"拖市镇",
"value":"53624",
"childrens":[]},
{
"label":"张港镇",
"value":"53625",
"childrens":[]},
{
"label":"蒋场镇",
"value":"53626",
"childrens":[]},
{
"label":"汪场镇",
"value":"53627",
"childrens":[]},
{
"label":"渔薪镇",
"value":"53628",
"childrens":[]},
{
"label":"黄坛镇",
"value":"53629",
"childrens":[]},
{
"label":"岳口镇",
"value":"53630",
"childrens":[]},
{
"label":"横林镇",
"value":"53631",
"childrens":[]},
{
"label":"彭市镇",
"value":"53632",
"childrens":[]},
{
"label":"麻洋镇",
"value":"53633",
"childrens":[]},
{
"label":"多祥镇",
"value":"53634",
"childrens":[]},
{
"label":"干驿镇",
"value":"53635",
"childrens":[]},
{
"label":"马湾镇",
"value":"53636",
"childrens":[]},
{
"label":"卢市镇",
"value":"53637",
"childrens":[]},
{
"label":"小板镇",
"value":"53638",
"childrens":[]},
{
"label":"九真镇",
"value":"53639",
"childrens":[]},
{
"label":"皂市镇",
"value":"53640",
"childrens":[]},
{
"label":"胡市镇",
"value":"53641",
"childrens":[]},
{
"label":"石河镇",
"value":"53642",
"childrens":[]},
{
"label":"净潭乡",
"value":"53643",
"childrens":[]},
{
"label":"蒋湖农场",
"value":"53644",
"childrens":[]},
{
"label":"白茅湖农场",
"value":"53645",
"childrens":[]},
{
"label":"沉湖管委会",
"value":"53646",
"childrens":[]}]},

{
"label":"仙桃市",
"value":"2983",
"childrens":[{
"label":"郑场镇",
"value":"53647",
"childrens":[]},
{
"label":"毛嘴镇",
"value":"53648",
"childrens":[]},
{
"label":"豆河镇",
"value":"53649",
"childrens":[]},
{
"label":"三伏潭镇",
"value":"53650",
"childrens":[]},
{
"label":"胡场镇",
"value":"53651",
"childrens":[]},
{
"label":"长埫口镇",
"value":"53652",
"childrens":[]},
{
"label":"西流河镇",
"value":"53653",
"childrens":[]},
{
"label":"沙湖镇",
"value":"53654",
"childrens":[]},
{
"label":"杨林尾镇",
"value":"53655",
"childrens":[]},
{
"label":"彭场镇",
"value":"53656",
"childrens":[]},
{
"label":"张沟镇",
"value":"53657",
"childrens":[]},
{
"label":"郭河镇",
"value":"53658",
"childrens":[]},
{
"label":"沔城镇",
"value":"53659",
"childrens":[]},
{
"label":"通海口镇",
"value":"53660",
"childrens":[]},
{
"label":"陈场镇",
"value":"53661",
"childrens":[]},
{
"label":"工业园区",
"value":"53662",
"childrens":[]},
{
"label":"久合垸原种场",
"value":"53663",
"childrens":[]},
{
"label":"沙湖原种场",
"value":"53664",
"childrens":[]},
{
"label":"排湖渔场",
"value":"53665",
"childrens":[]},
{
"label":"五湖渔场",
"value":"53666",
"childrens":[]},
{
"label":"赵西垸林场",
"value":"53667",
"childrens":[]},
{
"label":"畜禽良种场",
"value":"53668",
"childrens":[]},
{
"label":"城区",
"value":"53669",
"childrens":[]}]},

{
"label":"神农架林区",
"value":"3154",
"childrens":[{
"label":"松柏镇",
"value":"53670",
"childrens":[]},
{
"label":"阳日镇",
"value":"53671",
"childrens":[]},
{
"label":"木鱼镇",
"value":"53672",
"childrens":[]},
{
"label":"红坪镇",
"value":"53673",
"childrens":[]},
{
"label":"新华镇",
"value":"53674",
"childrens":[]},
{
"label":"宋洛乡",
"value":"53675",
"childrens":[]},
{
"label":"九湖乡",
"value":"53676",
"childrens":[]},
{
"label":"下谷坪乡",
"value":"53677",
"childrens":[]}]}]},


{
"label":"湖南",
"value":"18",
"childrens":[{
"label":"长沙市",
"value":"1482",
"childrens":[{
"label":"望城区",
"value":"1485",
"childrens":[]},
{
"label":"芙蓉区",
"value":"3606",
"childrens":[]},
{
"label":"岳麓区",
"value":"53225",
"childrens":[]},
{
"label":"雨花区",
"value":"53226",
"childrens":[]},
{
"label":"开福区",
"value":"53227",
"childrens":[]},
{
"label":"天心区",
"value":"53228",
"childrens":[]},
{
"label":"浏阳区",
"value":"53229",
"childrens":[]},
{
"label":"长沙县",
"value":"53230",
"childrens":[]},
{
"label":"宁乡县",
"value":"53231",
"childrens":[]}]},

{
"label":"株洲市",
"value":"1488",
"childrens":[{
"label":"醴陵市",
"value":"1489",
"childrens":[]},
{
"label":"株洲县",
"value":"1490",
"childrens":[]},
{
"label":"攸县",
"value":"1491",
"childrens":[]},
{
"label":"茶陵县",
"value":"1492",
"childrens":[]},
{
"label":"炎陵县",
"value":"1493",
"childrens":[]},
{
"label":"天元区",
"value":"53232",
"childrens":[]},
{
"label":"石峰区",
"value":"53233",
"childrens":[]},
{
"label":"芦淞区",
"value":"53234",
"childrens":[]},
{
"label":"荷塘区",
"value":"53235",
"childrens":[]},
{
"label":"云龙示范区",
"value":"53236",
"childrens":[]}]},

{
"label":"湘潭市",
"value":"1495",
"childrens":[{
"label":"湘乡市",
"value":"1496",
"childrens":[]},
{
"label":"湘潭县",
"value":"1497",
"childrens":[]},
{
"label":"韶山市",
"value":"1498",
"childrens":[]},
{
"label":"雨湖区",
"value":"53237",
"childrens":[]},
{
"label":"岳塘区",
"value":"53238",
"childrens":[]}]},

{
"label":"韶山市",
"value":"1499",
"childrens":[{
"label":"韶山市区内",
"value":"1500",
"childrens":[]}]},

{
"label":"衡阳市",
"value":"1501",
"childrens":[{
"label":"常宁市",
"value":"1502",
"childrens":[]},
{
"label":"衡阳县",
"value":"1503",
"childrens":[]},
{
"label":"耒阳市",
"value":"1504",
"childrens":[]},
{
"label":"衡东县",
"value":"1505",
"childrens":[]},
{
"label":"衡南县",
"value":"1506",
"childrens":[]},
{
"label":"衡山县",
"value":"1507",
"childrens":[]},
{
"label":"祁东县",
"value":"1508",
"childrens":[]},
{
"label":"南岳区",
"value":"1509",
"childrens":[]},
{
"label":"蒸湘区",
"value":"53239",
"childrens":[]},
{
"label":"石鼓区",
"value":"53240",
"childrens":[]},
{
"label":"珠晖区",
"value":"53241",
"childrens":[]},
{
"label":"雁峰区",
"value":"53242",
"childrens":[]}]},

{
"label":"邵阳市",
"value":"1511",
"childrens":[{
"label":"武冈市",
"value":"1512",
"childrens":[]},
{
"label":"邵东县",
"value":"1513",
"childrens":[]},
{
"label":"洞口县",
"value":"1514",
"childrens":[]},
{
"label":"新邵县",
"value":"1515",
"childrens":[]},
{
"label":"绥宁县",
"value":"1516",
"childrens":[]},
{
"label":"新宁县",
"value":"1517",
"childrens":[]},
{
"label":"邵阳县",
"value":"1518",
"childrens":[]},
{
"label":"隆回县",
"value":"1519",
"childrens":[]},
{
"label":"城步县",
"value":"1520",
"childrens":[]},
{
"label":"大祥区",
"value":"53243",
"childrens":[]},
{
"label":"双清区",
"value":"53244",
"childrens":[]},
{
"label":"北塔区",
"value":"53245",
"childrens":[]}]},

{
"label":"岳阳市",
"value":"1522",
"childrens":[{
"label":"临湘市",
"value":"1523",
"childrens":[]},
{
"label":"汨罗市",
"value":"1524",
"childrens":[]},
{
"label":"岳阳县",
"value":"1525",
"childrens":[]},
{
"label":"湘阴县",
"value":"1526",
"childrens":[]},
{
"label":"华容县",
"value":"1527",
"childrens":[]},
{
"label":"平江县",
"value":"1528",
"childrens":[]},
{
"label":"君山区",
"value":"3619",
"childrens":[]},
{
"label":"云溪区",
"value":"3620",
"childrens":[]},
{
"label":"岳阳楼区",
"value":"53246",
"childrens":[]}]},

{
"label":"常德市",
"value":"1530",
"childrens":[{
"label":"津市市",
"value":"1532",
"childrens":[]},
{
"label":"澧县",
"value":"1533",
"childrens":[]},
{
"label":"临澧县",
"value":"1534",
"childrens":[]},
{
"label":"桃源县",
"value":"1535",
"childrens":[]},
{
"label":"汉寿县",
"value":"1536",
"childrens":[]},
{
"label":"石门县",
"value":"1537",
"childrens":[]},
{
"label":"安乡县",
"value":"1538",
"childrens":[]},
{
"label":"鼎城区",
"value":"53247",
"childrens":[]},
{
"label":"武陵区",
"value":"53248",
"childrens":[]}]},

{
"label":"张家界市",
"value":"1540",
"childrens":[{
"label":"慈利县",
"value":"1541",
"childrens":[]},
{
"label":"桑植县",
"value":"1542",
"childrens":[]},
{
"label":"武陵源区",
"value":"1543",
"childrens":[]},
{
"label":"永定区",
"value":"3622",
"childrens":[]}]},

{
"label":"郴州市",
"value":"1544",
"childrens":[{
"label":"资兴市",
"value":"1545",
"childrens":[]},
{
"label":"宜章县",
"value":"1546",
"childrens":[]},
{
"label":"安仁县",
"value":"1547",
"childrens":[]},
{
"label":"汝城县",
"value":"1548",
"childrens":[]},
{
"label":"嘉禾县",
"value":"1549",
"childrens":[]},
{
"label":"临武县",
"value":"1550",
"childrens":[]},
{
"label":"桂东县",
"value":"1551",
"childrens":[]},
{
"label":"永兴县",
"value":"1552",
"childrens":[]},
{
"label":"桂阳县",
"value":"1553",
"childrens":[]},
{
"label":"北湖区",
"value":"53249",
"childrens":[]},
{
"label":"苏仙区",
"value":"53250",
"childrens":[]}]},

{
"label":"益阳市",
"value":"1555",
"childrens":[{
"label":"南县",
"value":"1556",
"childrens":[]},
{
"label":"桃江县",
"value":"1557",
"childrens":[]},
{
"label":"安化县",
"value":"1558",
"childrens":[]},
{
"label":"沅江市",
"value":"1565",
"childrens":[]},
{
"label":"赫山区",
"value":"53251",
"childrens":[]},
{
"label":"资阳区",
"value":"53252",
"childrens":[]}]},

{
"label":"永州市",
"value":"1560",
"childrens":[{
"label":"祁阳县",
"value":"1563",
"childrens":[]},
{
"label":"双牌县",
"value":"1564",
"childrens":[]},
{
"label":"道县",
"value":"1566",
"childrens":[]},
{
"label":"江永县",
"value":"1567",
"childrens":[]},
{
"label":"江华县",
"value":"1568",
"childrens":[]},
{
"label":"宁远县",
"value":"1569",
"childrens":[]},
{
"label":"新田县",
"value":"1570",
"childrens":[]},
{
"label":"蓝山县",
"value":"1571",
"childrens":[]},
{
"label":"东安县",
"value":"1572",
"childrens":[]},
{
"label":"零陵区",
"value":"1573",
"childrens":[]},
{
"label":"冷水滩区",
"value":"53253",
"childrens":[]}]},

{
"label":"怀化市",
"value":"1574",
"childrens":[{
"label":"洪江市",
"value":"1575",
"childrens":[]},
{
"label":"会同县",
"value":"1576",
"childrens":[]},
{
"label":"溆浦县",
"value":"1578",
"childrens":[]},
{
"label":"辰溪县",
"value":"1579",
"childrens":[]},
{
"label":"靖州县",
"value":"1580",
"childrens":[]},
{
"label":"通道县",
"value":"1581",
"childrens":[]},
{
"label":"芷江县",
"value":"1582",
"childrens":[]},
{
"label":"新晃县",
"value":"1583",
"childrens":[]},
{
"label":"麻阳县",
"value":"1584",
"childrens":[]},
{
"label":"沅陵县",
"value":"3070",
"childrens":[]},
{
"label":"中方县",
"value":"3626",
"childrens":[]},
{
"label":"中方县",
"value":"53254",
"childrens":[]},
{
"label":"鹤城区",
"value":"53255",
"childrens":[]}]},

{
"label":"娄底市",
"value":"1586",
"childrens":[{
"label":"冷水江市",
"value":"1588",
"childrens":[]},
{
"label":"涟源市",
"value":"1589",
"childrens":[]},
{
"label":"新化县",
"value":"1590",
"childrens":[]},
{
"label":"双峰县",
"value":"1591",
"childrens":[]},
{
"label":"娄星区",
"value":"53256",
"childrens":[]}]},

{
"label":"湘西州",
"value":"1592",
"childrens":[{
"label":"吉首市",
"value":"1593",
"childrens":[]},
{
"label":"古丈县",
"value":"1594",
"childrens":[]},
{
"label":"龙山县",
"value":"1595",
"childrens":[]},
{
"label":"永顺县",
"value":"1596",
"childrens":[]},
{
"label":"泸溪县",
"value":"1597",
"childrens":[]},
{
"label":"凤凰县",
"value":"1598",
"childrens":[]},
{
"label":"花垣县",
"value":"1599",
"childrens":[]},
{
"label":"保靖县",
"value":"1600",
"childrens":[]}]}]},


{
"label":"广东",
"value":"19",
"childrens":[{
"label":"广州市",
"value":"1601",
"childrens":[{
"label":"天河区",
"value":"3633",
"childrens":[]},
{
"label":"海珠区",
"value":"3634",
"childrens":[]},
{
"label":"荔湾区",
"value":"3635",
"childrens":[]},
{
"label":"越秀区",
"value":"3637",
"childrens":[]},
{
"label":"番禺区",
"value":"53039",
"childrens":[]},
{
"label":"花都区",
"value":"53040",
"childrens":[]},
{
"label":"白云区",
"value":"53041",
"childrens":[]},
{
"label":"南沙区",
"value":"53042",
"childrens":[]},
{
"label":"黄埔区",
"value":"53043",
"childrens":[]},
{
"label":"增城区",
"value":"53044",
"childrens":[]},
{
"label":"从化区",
"value":"53045",
"childrens":[]},
{
"label":"广州大学城",
"value":"53046",
"childrens":[]}]},

{
"label":"深圳市",
"value":"1607",
"childrens":[{
"label":"南山区",
"value":"3155",
"childrens":[]},
{
"label":"罗湖区",
"value":"3638",
"childrens":[]},
{
"label":"福田区",
"value":"3639",
"childrens":[]},
{
"label":"宝安区",
"value":"4773",
"childrens":[]},
{
"label":"光明新区",
"value":"6675",
"childrens":[]},
{
"label":"坪山新区",
"value":"6736",
"childrens":[]},
{
"label":"大鹏新区",
"value":"6737",
"childrens":[]},
{
"label":"龙岗区",
"value":"53047",
"childrens":[]},
{
"label":"盐田区",
"value":"53048",
"childrens":[]},
{
"label":"龙华区",
"value":"53049",
"childrens":[]}]},

{
"label":"珠海市",
"value":"1609",
"childrens":[{
"label":"斗门区",
"value":"53050",
"childrens":[]},
{
"label":"金湾区",
"value":"53051",
"childrens":[]},
{
"label":"香洲区",
"value":"53052",
"childrens":[]}]},

{
"label":"汕头市",
"value":"1611",
"childrens":[{
"label":"南澳县",
"value":"1614",
"childrens":[]},
{
"label":"龙湖区",
"value":"53053",
"childrens":[]},
{
"label":"金平区",
"value":"53054",
"childrens":[]},
{
"label":"澄海区",
"value":"53055",
"childrens":[]},
{
"label":"潮阳区",
"value":"53056",
"childrens":[]},
{
"label":"潮南区",
"value":"53057",
"childrens":[]},
{
"label":"濠江区",
"value":"53058",
"childrens":[]}]},

{
"label":"韶关市",
"value":"1617",
"childrens":[{
"label":"南雄市",
"value":"1618",
"childrens":[{
"label":"百顺镇",
"value":"6275",
"childrens":[]},
{
"label":"邓坊镇",
"value":"6276",
"childrens":[]},
{
"label":"湖口镇",
"value":"6277",
"childrens":[]},
{
"label":"黄坑镇",
"value":"6278",
"childrens":[]},
{
"label":"江头镇",
"value":"6279",
"childrens":[]},
{
"label":"界址镇",
"value":"6280",
"childrens":[]},
{
"label":"澜河镇",
"value":"6281",
"childrens":[]},
{
"label":"帽子峰镇",
"value":"6282",
"childrens":[]},
{
"label":"南亩镇",
"value":"6283",
"childrens":[]},
{
"label":"水口镇",
"value":"6284",
"childrens":[]},
{
"label":"坪田镇",
"value":"6285",
"childrens":[]},
{
"label":"全安镇",
"value":"6286",
"childrens":[]},
{
"label":"乌迳镇",
"value":"6287",
"childrens":[]},
{
"label":"油山镇",
"value":"6289",
"childrens":[]},
{
"label":"珠玑镇",
"value":"6290",
"childrens":[]},
{
"label":"主田镇",
"value":"6291",
"childrens":[]},
{
"label":"古市镇",
"value":"6292",
"childrens":[]},
{
"label":"精细化工基地",
"value":"9162",
"childrens":[]}]},

{
"label":"乐昌市",
"value":"1619",
"childrens":[{
"label":"白石镇",
"value":"6293",
"childrens":[]},
{
"label":"北乡镇",
"value":"6294",
"childrens":[]},
{
"label":"大源镇",
"value":"6295",
"childrens":[]},
{
"label":"黄圃镇",
"value":"6296",
"childrens":[]},
{
"label":"九峰镇",
"value":"6297",
"childrens":[]},
{
"label":"廊田镇",
"value":"6298",
"childrens":[]},
{
"label":"两江镇",
"value":"6300",
"childrens":[]},
{
"label":"梅花镇",
"value":"6301",
"childrens":[]},
{
"label":"坪石镇",
"value":"6302",
"childrens":[]},
{
"label":"庆云镇",
"value":"6303",
"childrens":[]},
{
"label":"三溪镇",
"value":"6304",
"childrens":[]},
{
"label":"沙坪镇",
"value":"6305",
"childrens":[]},
{
"label":"五山镇",
"value":"6306",
"childrens":[]},
{
"label":"秀水镇",
"value":"6307",
"childrens":[]},
{
"label":"云岩镇",
"value":"6308",
"childrens":[]},
{
"label":"长来镇",
"value":"6309",
"childrens":[]},
{
"label":"河南镇",
"value":"9160",
"childrens":[]},
{
"label":"乐城镇",
"value":"9161",
"childrens":[]}]},

{
"label":"仁化县",
"value":"1620",
"childrens":[{
"label":"城口镇",
"value":"6310",
"childrens":[]},
{
"label":"大桥镇",
"value":"6311",
"childrens":[]},
{
"label":"董塘镇",
"value":"6313",
"childrens":[]},
{
"label":"扶溪镇",
"value":"6314",
"childrens":[]},
{
"label":"红山镇",
"value":"6315",
"childrens":[]},
{
"label":"黄坑镇",
"value":"6316",
"childrens":[]},
{
"label":"石塘镇",
"value":"6317",
"childrens":[]},
{
"label":"闻韶镇",
"value":"6318",
"childrens":[]},
{
"label":"长江镇",
"value":"6319",
"childrens":[]},
{
"label":"周田镇",
"value":"6320",
"childrens":[]}]},

{
"label":"始兴县",
"value":"1621",
"childrens":[{
"label":"隘子镇",
"value":"6321",
"childrens":[]},
{
"label":"城南镇",
"value":"6322",
"childrens":[]},
{
"label":"澄江镇",
"value":"6323",
"childrens":[]},
{
"label":"顿岗镇",
"value":"6324",
"childrens":[]},
{
"label":"罗坝镇",
"value":"6325",
"childrens":[]},
{
"label":"马市镇",
"value":"6326",
"childrens":[]},
{
"label":"深渡水瑶族乡",
"value":"6327",
"childrens":[]},
{
"label":"沈所镇",
"value":"6328",
"childrens":[]},
{
"label":"司前镇",
"value":"6329",
"childrens":[]},
{
"label":"太平镇",
"value":"6330",
"childrens":[]}]},

{
"label":"翁源县",
"value":"1622",
"childrens":[{
"label":"坝仔镇",
"value":"6331",
"childrens":[]},
{
"label":"官渡镇",
"value":"6332",
"childrens":[]},
{
"label":"江尾镇",
"value":"6333",
"childrens":[]},
{
"label":"龙仙镇",
"value":"6334",
"childrens":[]},
{
"label":"翁城镇",
"value":"6335",
"childrens":[]},
{
"label":"新江镇",
"value":"6336",
"childrens":[]},
{
"label":"周陂镇",
"value":"6337",
"childrens":[]},
{
"label":"铁龙林场",
"value":"9155",
"childrens":[]}]},

{
"label":"新丰县",
"value":"1624",
"childrens":[{
"label":"黄礤镇",
"value":"6348",
"childrens":[]},
{
"label":"回龙镇",
"value":"6349",
"childrens":[]},
{
"label":"马头镇",
"value":"6350",
"childrens":[]},
{
"label":"梅坑镇",
"value":"6351",
"childrens":[]},
{
"label":"沙田镇",
"value":"6352",
"childrens":[]},
{
"label":"遥田镇",
"value":"6353",
"childrens":[]}]},

{
"label":"乳源瑶族自治县",
"value":"1625",
"childrens":[{
"label":"必背镇",
"value":"6354",
"childrens":[]},
{
"label":"大布镇",
"value":"6355",
"childrens":[]},
{
"label":"大桥镇",
"value":"6356",
"childrens":[]},
{
"label":"东坪镇",
"value":"6357",
"childrens":[]},
{
"label":"桂头镇",
"value":"6358",
"childrens":[]},
{
"label":"洛阳镇",
"value":"6359",
"childrens":[]},
{
"label":"乳城镇",
"value":"6360",
"childrens":[]},
{
"label":"一六镇",
"value":"6361",
"childrens":[]},
{
"label":"游溪镇",
"value":"6362",
"childrens":[]},
{
"label":"天井山林场",
"value":"9156",
"childrens":[]},
{
"label":"乳阳林业局",
"value":"9157",
"childrens":[]}]},

{
"label":"曲江区",
"value":"1626",
"childrens":[{
"label":"马坝镇",
"value":"8193",
"childrens":[]},
{
"label":"樟市镇",
"value":"8194",
"childrens":[]},
{
"label":"韶关冶炼厂",
"value":"8195",
"childrens":[]},
{
"label":"沙溪镇",
"value":"8196",
"childrens":[]},
{
"label":"韶关钢铁集团有限公司",
"value":"8197",
"childrens":[]},
{
"label":"小坑镇",
"value":"8198",
"childrens":[]},
{
"label":"乌石镇",
"value":"8199",
"childrens":[]},
{
"label":"枫湾镇",
"value":"8200",
"childrens":[]},
{
"label":"罗坑镇",
"value":"8201",
"childrens":[]},
{
"label":"韶关十六冶金建设公司",
"value":"8202",
"childrens":[]},
{
"label":"白土镇",
"value":"8203",
"childrens":[]},
{
"label":"大塘镇",
"value":"8204",
"childrens":[]},
{
"label":"韶关发电厂",
"value":"8205",
"childrens":[]},
{
"label":"曲江区大宝山矿",
"value":"8206",
"childrens":[]}]},

{
"label":"武江区",
"value":"3643",
"childrens":[{
"label":"重阳镇",
"value":"8207",
"childrens":[]},
{
"label":"西河片区",
"value":"8208",
"childrens":[]},
{
"label":"江湾镇",
"value":"8209",
"childrens":[]},
{
"label":"龙归镇",
"value":"8210",
"childrens":[]},
{
"label":"沙洲尾",
"value":"8211",
"childrens":[]},
{
"label":"西联镇",
"value":"8212",
"childrens":[]},
{
"label":"沐溪工业园",
"value":"8213",
"childrens":[]}]},

{
"label":"浈江区",
"value":"3644",
"childrens":[{
"label":"东联片区",
"value":"8214",
"childrens":[]},
{
"label":"东河片区",
"value":"8216",
"childrens":[]},
{
"label":"韶关大学",
"value":"8217",
"childrens":[]},
{
"label":"犁市镇",
"value":"8219",
"childrens":[]},
{
"label":"花坪镇",
"value":"8221",
"childrens":[]},
{
"label":"乐园镇",
"value":"8222",
"childrens":[]},
{
"label":"五里亭",
"value":"8223",
"childrens":[]},
{
"label":"十里亭镇",
"value":"8225",
"childrens":[]},
{
"label":"南郊片区",
"value":"8226",
"childrens":[]}]}]},


{
"label":"河源市",
"value":"1627",
"childrens":[{
"label":"和平县",
"value":"1628",
"childrens":[{
"label":"阳明镇",
"value":"6010",
"childrens":[]},
{
"label":"彭寨镇",
"value":"6011",
"childrens":[]},
{
"label":"东水镇",
"value":"6012",
"childrens":[]},
{
"label":"林寨镇",
"value":"6013",
"childrens":[]},
{
"label":"热水镇",
"value":"6014",
"childrens":[]},
{
"label":"大坝镇",
"value":"6015",
"childrens":[]},
{
"label":"上陵镇",
"value":"6016",
"childrens":[]},
{
"label":"下车镇",
"value":"6017",
"childrens":[]},
{
"label":"贝墩镇",
"value":"6018",
"childrens":[]},
{
"label":"古寨镇",
"value":"6019",
"childrens":[]},
{
"label":"礼士镇",
"value":"6020",
"childrens":[]},
{
"label":"公白镇",
"value":"6021",
"childrens":[]},
{
"label":"合水镇",
"value":"6022",
"childrens":[]},
{
"label":"青州镇",
"value":"6023",
"childrens":[]},
{
"label":"浰源镇",
"value":"6024",
"childrens":[]},
{
"label":"优胜镇",
"value":"6025",
"childrens":[]}]},

{
"label":"龙川县",
"value":"1629",
"childrens":[{
"label":"老隆镇",
"value":"6026",
"childrens":[]},
{
"label":"四都镇",
"value":"6027",
"childrens":[]},
{
"label":"黄石镇",
"value":"6028",
"childrens":[]},
{
"label":"细坳镇",
"value":"6029",
"childrens":[]},
{
"label":"车田镇",
"value":"6030",
"childrens":[]},
{
"label":"贝岭镇",
"value":"6031",
"childrens":[]},
{
"label":"黎咀镇",
"value":"6032",
"childrens":[]},
{
"label":"上坪镇",
"value":"6033",
"childrens":[]},
{
"label":"丰稔镇",
"value":"6034",
"childrens":[]},
{
"label":"赤光镇",
"value":"6035",
"childrens":[]},
{
"label":"龙母镇",
"value":"6036",
"childrens":[]},
{
"label":"回龙镇",
"value":"6037",
"childrens":[]},
{
"label":"铁场镇",
"value":"6038",
"childrens":[]},
{
"label":"登云镇",
"value":"6039",
"childrens":[]},
{
"label":"通衢镇",
"value":"6040",
"childrens":[]},
{
"label":"鹤市镇",
"value":"6041",
"childrens":[]},
{
"label":"黄布镇",
"value":"6043",
"childrens":[]},
{
"label":"紫市镇",
"value":"6044",
"childrens":[]},
{
"label":"佗城镇",
"value":"6045",
"childrens":[]},
{
"label":"岩镇",
"value":"6046",
"childrens":[]},
{
"label":"新田镇",
"value":"6047",
"childrens":[]},
{
"label":"附城镇",
"value":"6048",
"childrens":[]},
{
"label":"义都镇",
"value":"6049",
"childrens":[]},
{
"label":"麻布岗镇",
"value":"6050",
"childrens":[]}]},

{
"label":"紫金县",
"value":"1630",
"childrens":[{
"label":"紫城镇",
"value":"6051",
"childrens":[]},
{
"label":"附城镇",
"value":"6052",
"childrens":[]},
{
"label":"九和镇",
"value":"6053",
"childrens":[]},
{
"label":"上义镇",
"value":"6054",
"childrens":[]},
{
"label":"蓝塘镇",
"value":"6055",
"childrens":[]},
{
"label":"凤安镇",
"value":"6056",
"childrens":[]},
{
"label":"义容镇",
"value":"6057",
"childrens":[]},
{
"label":"古竹镇",
"value":"6058",
"childrens":[]},
{
"label":"临江镇",
"value":"6059",
"childrens":[]},
{
"label":"柏埔镇",
"value":"6060",
"childrens":[]},
{
"label":"敬梓镇",
"value":"6061",
"childrens":[]},
{
"label":"乌石镇",
"value":"6062",
"childrens":[]},
{
"label":"水墩镇",
"value":"6063",
"childrens":[]},
{
"label":"南岭镇",
"value":"6064",
"childrens":[]},
{
"label":"苏区镇",
"value":"6065",
"childrens":[]},
{
"label":"瓦溪镇",
"value":"6066",
"childrens":[]},
{
"label":"好义镇",
"value":"6067",
"childrens":[]},
{
"label":"中坝镇",
"value":"6068",
"childrens":[]},
{
"label":"龙窝镇",
"value":"6069",
"childrens":[]}]},

{
"label":"连平县",
"value":"1631",
"childrens":[{
"label":"元善镇",
"value":"6071",
"childrens":[]},
{
"label":"上坪镇",
"value":"6072",
"childrens":[]},
{
"label":"内莞镇",
"value":"6073",
"childrens":[]},
{
"label":"陂头镇",
"value":"6074",
"childrens":[]},
{
"label":"溪山镇",
"value":"6075",
"childrens":[]},
{
"label":"隆街镇",
"value":"6076",
"childrens":[]},
{
"label":"田源镇",
"value":"6077",
"childrens":[]},
{
"label":"油溪镇",
"value":"6078",
"childrens":[]},
{
"label":"忠信镇",
"value":"6079",
"childrens":[]},
{
"label":"高莞镇",
"value":"6080",
"childrens":[]},
{
"label":"大湖镇",
"value":"6081",
"childrens":[]},
{
"label":"三角镇",
"value":"6082",
"childrens":[]},
{
"label":"绣缎镇",
"value":"6083",
"childrens":[]}]},

{
"label":"源城区",
"value":"53059",
"childrens":[]},
{
"label":"东源县",
"value":"53060",
"childrens":[]}]},

{
"label":"梅州市",
"value":"1634",
"childrens":[{
"label":"兴宁市",
"value":"1635",
"childrens":[{
"label":"罗浮镇",
"value":"8519",
"childrens":[]},
{
"label":"罗岗镇",
"value":"8520",
"childrens":[]},
{
"label":"坭陂镇",
"value":"8521",
"childrens":[]},
{
"label":"石马镇",
"value":"8522",
"childrens":[]},
{
"label":"合水镇",
"value":"8523",
"childrens":[]},
{
"label":"新陂镇",
"value":"8524",
"childrens":[]},
{
"label":"永和镇",
"value":"8525",
"childrens":[]},
{
"label":"刁坊镇",
"value":"8526",
"childrens":[]},
{
"label":"径南镇",
"value":"8527",
"childrens":[]},
{
"label":"水口镇",
"value":"8528",
"childrens":[]},
{
"label":"黄陂镇",
"value":"8529",
"childrens":[]},
{
"label":"黄槐镇",
"value":"8531",
"childrens":[]},
{
"label":"宁中镇",
"value":"8532",
"childrens":[]},
{
"label":"龙田镇",
"value":"8533",
"childrens":[]},
{
"label":"叶塘镇",
"value":"8534",
"childrens":[]},
{
"label":"新圩镇",
"value":"8535",
"childrens":[]},
{
"label":"大坪镇",
"value":"8536",
"childrens":[]}]},

{
"label":"梅县",
"value":"1636",
"childrens":[{
"label":"畲江镇",
"value":"8420",
"childrens":[]},
{
"label":"雁洋镇",
"value":"8421",
"childrens":[]},
{
"label":"石扇镇",
"value":"8422",
"childrens":[]},
{
"label":"白渡镇",
"value":"8423",
"childrens":[]},
{
"label":"梅西镇",
"value":"8424",
"childrens":[]},
{
"label":"南口镇",
"value":"8425",
"childrens":[]},
{
"label":"城东镇",
"value":"8426",
"childrens":[]},
{
"label":"梅县新城",
"value":"8427",
"childrens":[]},
{
"label":"梅南镇",
"value":"8428",
"childrens":[]},
{
"label":"程江镇",
"value":"8429",
"childrens":[]},
{
"label":"西阳镇",
"value":"8430",
"childrens":[]},
{
"label":"水车镇",
"value":"8431",
"childrens":[]},
{
"label":"松源镇",
"value":"8432",
"childrens":[]},
{
"label":"松口镇",
"value":"8433",
"childrens":[]},
{
"label":"梅西水库",
"value":"8434",
"childrens":[]},
{
"label":"桃尧镇",
"value":"8435",
"childrens":[]},
{
"label":"丙村镇",
"value":"8436",
"childrens":[]},
{
"label":"隆文镇",
"value":"8437",
"childrens":[]},
{
"label":"扶大镇",
"value":"8438",
"childrens":[]},
{
"label":"大坪镇",
"value":"8439",
"childrens":[]},
{
"label":"石坑镇",
"value":"8440",
"childrens":[]}]},

{
"label":"蕉岭县",
"value":"1637",
"childrens":[{
"label":"文福镇",
"value":"8509",
"childrens":[]},
{
"label":"新铺镇",
"value":"8510",
"childrens":[]},
{
"label":"三圳镇",
"value":"8511",
"childrens":[]},
{
"label":"蓝坊镇",
"value":"8512",
"childrens":[]},
{
"label":"南礤镇",
"value":"8513",
"childrens":[]},
{
"label":"广福镇",
"value":"8514",
"childrens":[]},
{
"label":"华侨农场",
"value":"8515",
"childrens":[]},
{
"label":"蕉城镇",
"value":"8516",
"childrens":[]},
{
"label":"长潭镇",
"value":"8517",
"childrens":[]}]},

{
"label":"大埔县",
"value":"1638",
"childrens":[{
"label":"青溪镇",
"value":"8447",
"childrens":[]},
{
"label":"银江镇",
"value":"8448",
"childrens":[]},
{
"label":"湖寮镇",
"value":"8449",
"childrens":[]},
{
"label":"三河镇",
"value":"8450",
"childrens":[]},
{
"label":"大麻镇",
"value":"8451",
"childrens":[]},
{
"label":"洲瑞镇",
"value":"8452",
"childrens":[]},
{
"label":"桃源镇",
"value":"8453",
"childrens":[]},
{
"label":"丰溪林场",
"value":"8454",
"childrens":[]},
{
"label":"光德镇",
"value":"8455",
"childrens":[]},
{
"label":"枫朗镇",
"value":"8456",
"childrens":[]},
{
"label":"洲瑞林场",
"value":"8457",
"childrens":[]},
{
"label":"高陂镇",
"value":"8458",
"childrens":[]},
{
"label":"大埔林场",
"value":"8459",
"childrens":[]},
{
"label":"大东镇",
"value":"8460",
"childrens":[]},
{
"label":"茶阳镇",
"value":"8461",
"childrens":[]},
{
"label":"百侯镇",
"value":"8462",
"childrens":[]},
{
"label":"西河镇",
"value":"8463",
"childrens":[]}]},

{
"label":"丰顺县",
"value":"1639",
"childrens":[{
"label":"汤南镇",
"value":"8464",
"childrens":[]},
{
"label":"汤西镇",
"value":"8465",
"childrens":[]},
{
"label":"砂田镇",
"value":"8466",
"childrens":[]},
{
"label":"大龙华镇",
"value":"8467",
"childrens":[]},
{
"label":"埔寨镇",
"value":"8468",
"childrens":[]},
{
"label":"八乡山镇",
"value":"8469",
"childrens":[]},
{
"label":"潘田镇",
"value":"8470",
"childrens":[]},
{
"label":"龙岗镇",
"value":"8471",
"childrens":[]},
{
"label":"黄金镇",
"value":"8472",
"childrens":[]},
{
"label":"建桥镇",
"value":"8473",
"childrens":[]},
{
"label":"汤坑镇",
"value":"8474",
"childrens":[]},
{
"label":"留隍镇",
"value":"8475",
"childrens":[]},
{
"label":"北斗镇",
"value":"8476",
"childrens":[]},
{
"label":"埔寨农场",
"value":"8477",
"childrens":[]},
{
"label":"丰良镇",
"value":"8478",
"childrens":[]},
{
"label":"潭江镇",
"value":"8479",
"childrens":[]},
{
"label":"小胜镇",
"value":"8480",
"childrens":[]}]},

{
"label":"五华县",
"value":"1640",
"childrens":[{
"label":"棉洋镇",
"value":"8481",
"childrens":[]},
{
"label":"郭田镇",
"value":"8482",
"childrens":[]},
{
"label":"潭下镇",
"value":"8483",
"childrens":[]},
{
"label":"周江镇",
"value":"8484",
"childrens":[]},
{
"label":"岐岭镇",
"value":"8485",
"childrens":[]},
{
"label":"横陂镇",
"value":"8486",
"childrens":[]},
{
"label":"华城镇",
"value":"8487",
"childrens":[]},
{
"label":"安流镇",
"value":"8488",
"childrens":[]},
{
"label":"转水镇",
"value":"8489",
"childrens":[]},
{
"label":"华阳镇",
"value":"8490",
"childrens":[]},
{
"label":"长布镇",
"value":"8491",
"childrens":[]},
{
"label":"水寨镇",
"value":"8492",
"childrens":[]},
{
"label":"河东镇",
"value":"8493",
"childrens":[]},
{
"label":"梅林镇",
"value":"8494",
"childrens":[]},
{
"label":"龙村镇",
"value":"8495",
"childrens":[]},
{
"label":"双华镇",
"value":"8496",
"childrens":[]}]},

{
"label":"平远县",
"value":"1641",
"childrens":[{
"label":"热柘镇",
"value":"8497",
"childrens":[]},
{
"label":"长田镇",
"value":"8498",
"childrens":[]},
{
"label":"大柘镇",
"value":"8499",
"childrens":[]},
{
"label":"仁居镇",
"value":"8500",
"childrens":[]},
{
"label":"泗水镇",
"value":"8501",
"childrens":[]},
{
"label":"河头镇",
"value":"8502",
"childrens":[]},
{
"label":"上举镇",
"value":"8503",
"childrens":[]},
{
"label":"差干镇",
"value":"8504",
"childrens":[]},
{
"label":"八尺镇",
"value":"8505",
"childrens":[]},
{
"label":"石正镇",
"value":"8506",
"childrens":[]},
{
"label":"东石镇",
"value":"8507",
"childrens":[]},
{
"label":"中行镇",
"value":"8508",
"childrens":[]}]},

{
"label":"梅江区",
"value":"1642",
"childrens":[{
"label":"江北片区",
"value":"8441",
"childrens":[]},
{
"label":"三角镇",
"value":"8442",
"childrens":[]},
{
"label":"城北镇",
"value":"8444",
"childrens":[]},
{
"label":"江南市区",
"value":"8445",
"childrens":[]},
{
"label":"长沙镇",
"value":"8446",
"childrens":[]}]}]},


{
"label":"惠州市",
"value":"1643",
"childrens":[{
"label":"龙门县",
"value":"1647",
"childrens":[]},
{
"label":"惠阳区",
"value":"53061",
"childrens":[]},
{
"label":"大亚湾区",
"value":"53062",
"childrens":[]},
{
"label":"惠城区",
"value":"53063",
"childrens":[]},
{
"label":"惠东县",
"value":"53064",
"childrens":[]},
{
"label":"博罗县",
"value":"53065",
"childrens":[]}]},

{
"label":"汕尾市",
"value":"1650",
"childrens":[{
"label":"陆河县",
"value":"1653",
"childrens":[{
"label":"河田镇",
"value":"6145",
"childrens":[]},
{
"label":"新田镇",
"value":"6146",
"childrens":[]},
{
"label":"南万镇",
"value":"6147",
"childrens":[]},
{
"label":"螺溪镇",
"value":"6148",
"childrens":[]},
{
"label":"河口镇",
"value":"6149",
"childrens":[]},
{
"label":"东坑镇",
"value":"6150",
"childrens":[]},
{
"label":"水唇镇",
"value":"6151",
"childrens":[]},
{
"label":"上护镇",
"value":"6152",
"childrens":[]}]},

{
"label":"海丰县",
"value":"3037",
"childrens":[{
"label":"海城镇",
"value":"6153",
"childrens":[]},
{
"label":"梅陇镇",
"value":"6154",
"childrens":[]},
{
"label":"附城镇",
"value":"6155",
"childrens":[]},
{
"label":"联安镇",
"value":"6156",
"childrens":[]},
{
"label":"陶河镇",
"value":"6157",
"childrens":[]},
{
"label":"可塘镇",
"value":"6158",
"childrens":[]},
{
"label":"赤坑镇",
"value":"6159",
"childrens":[]},
{
"label":"公平镇",
"value":"6160",
"childrens":[]},
{
"label":"城东镇",
"value":"6161",
"childrens":[]},
{
"label":"黄羌镇",
"value":"6162",
"childrens":[]},
{
"label":"平东镇",
"value":"6163",
"childrens":[]},
{
"label":"鹅埠镇",
"value":"6164",
"childrens":[]},
{
"label":"赤石镇",
"value":"6165",
"childrens":[]},
{
"label":"鮜门镇",
"value":"6166",
"childrens":[]},
{
"label":"小漠镇",
"value":"6167",
"childrens":[]},
{
"label":"大湖镇",
"value":"6168",
"childrens":[]}]},

{
"label":"城区",
"value":"53067",
"childrens":[]},
{
"label":"陆丰市",
"value":"53068",
"childrens":[]}]},

{
"label":"东莞市",
"value":"1655",
"childrens":[{
"label":"中堂镇",
"value":"2950",
"childrens":[]},
{
"label":"东坑镇",
"value":"3041",
"childrens":[]},
{
"label":"道滘镇",
"value":"3078",
"childrens":[]},
{
"label":"沙田镇",
"value":"3097",
"childrens":[]},
{
"label":"高埗镇",
"value":"3100",
"childrens":[]},
{
"label":"石龙镇",
"value":"3102",
"childrens":[]},
{
"label":"石排镇",
"value":"3104",
"childrens":[]},
{
"label":"企石镇",
"value":"3105",
"childrens":[]},
{
"label":"石碣镇",
"value":"3111",
"childrens":[]},
{
"label":"洪梅镇",
"value":"3116",
"childrens":[]},
{
"label":"麻涌镇",
"value":"3120",
"childrens":[]},
{
"label":"桥头镇",
"value":"3134",
"childrens":[]},
{
"label":"望牛墩镇",
"value":"3151",
"childrens":[]},
{
"label":"茶山镇",
"value":"3171",
"childrens":[]},
{
"label":"谢岗镇",
"value":"4087",
"childrens":[]},
{
"label":"松山湖",
"value":"4147",
"childrens":[]},
{
"label":"莞城区",
"value":"4255",
"childrens":[]},
{
"label":"南城区",
"value":"4256",
"childrens":[]},
{
"label":"长安镇",
"value":"4760",
"childrens":[]},
{
"label":"寮步镇",
"value":"4866",
"childrens":[]},
{
"label":"大岭山镇",
"value":"4871",
"childrens":[]},
{
"label":"常平镇",
"value":"4886",
"childrens":[]},
{
"label":"厚街镇",
"value":"4910",
"childrens":[]},
{
"label":"万江区",
"value":"4911",
"childrens":[]},
{
"label":"樟木头镇",
"value":"4932",
"childrens":[]},
{
"label":"大朗镇",
"value":"4980",
"childrens":[]},
{
"label":"塘厦镇",
"value":"5457",
"childrens":[]},
{
"label":"凤岗镇",
"value":"5473",
"childrens":[]},
{
"label":"清溪镇",
"value":"5869",
"childrens":[]},
{
"label":"横沥镇",
"value":"5905",
"childrens":[]},
{
"label":"东城区",
"value":"53069",
"childrens":[]},
{
"label":"黄江镇",
"value":"53070",
"childrens":[]},
{
"label":"虎门镇",
"value":"53071",
"childrens":[]}]},

{
"label":"中山市",
"value":"1657",
"childrens":[{
"label":"南朗镇",
"value":"2777",
"childrens":[]},
{
"label":"小榄镇",
"value":"2902",
"childrens":[]},
{
"label":"古镇",
"value":"2957",
"childrens":[]},
{
"label":"坦洲镇",
"value":"3001",
"childrens":[]},
{
"label":"黄圃镇",
"value":"3007",
"childrens":[]},
{
"label":"三乡镇",
"value":"3016",
"childrens":[]},
{
"label":"东凤镇",
"value":"3067",
"childrens":[]},
{
"label":"横栏镇",
"value":"3112",
"childrens":[]},
{
"label":"三角镇",
"value":"3143",
"childrens":[]},
{
"label":"南头镇",
"value":"3176",
"childrens":[]},
{
"label":"沙溪镇",
"value":"3743",
"childrens":[]},
{
"label":"五桂山镇",
"value":"4042",
"childrens":[]},
{
"label":"阜沙镇",
"value":"4076",
"childrens":[]},
{
"label":"东升镇",
"value":"4080",
"childrens":[]},
{
"label":"板芙镇",
"value":"4102",
"childrens":[]},
{
"label":"神湾镇",
"value":"4127",
"childrens":[]},
{
"label":"港口镇",
"value":"4141",
"childrens":[]},
{
"label":"大涌镇",
"value":"4190",
"childrens":[]},
{
"label":"火炬开发区",
"value":"4852",
"childrens":[]},
{
"label":"民众镇",
"value":"8540",
"childrens":[]},
{
"label":"沙朗镇",
"value":"53072",
"childrens":[]},
{
"label":"城区",
"value":"53073",
"childrens":[]}]},

{
"label":"江门市",
"value":"1659",
"childrens":[{
"label":"台山市",
"value":"53074",
"childrens":[]},
{
"label":"新会区",
"value":"53075",
"childrens":[]},
{
"label":"鹤山市",
"value":"53076",
"childrens":[]},
{
"label":"江海区",
"value":"53077",
"childrens":[]},
{
"label":"蓬江区",
"value":"53078",
"childrens":[]},
{
"label":"开平市",
"value":"53079",
"childrens":[]},
{
"label":"恩平市",
"value":"53080",
"childrens":[]}]},

{
"label":"佛山市",
"value":"1666",
"childrens":[{
"label":"顺德区",
"value":"1669",
"childrens":[]},
{
"label":"禅城区",
"value":"53081",
"childrens":[]},
{
"label":"高明区",
"value":"53082",
"childrens":[]},
{
"label":"三水区",
"value":"53083",
"childrens":[]},
{
"label":"南海区",
"value":"53084",
"childrens":[]}]},

{
"label":"阳江市",
"value":"1672",
"childrens":[{
"label":"阳春市",
"value":"1673",
"childrens":[{
"label":"八甲镇",
"value":"6475",
"childrens":[]},
{
"label":"陂面镇",
"value":"6476",
"childrens":[]},
{
"label":"合水镇",
"value":"6477",
"childrens":[]},
{
"label":"春湾镇",
"value":"6479",
"childrens":[]},
{
"label":"岗美镇",
"value":"6480",
"childrens":[]},
{
"label":"圭岗镇",
"value":"6481",
"childrens":[]},
{
"label":"石望镇",
"value":"6482",
"childrens":[]},
{
"label":"河口镇",
"value":"6483",
"childrens":[]},
{
"label":"河塱镇",
"value":"6484",
"childrens":[]},
{
"label":"松柏镇",
"value":"6485",
"childrens":[]},
{
"label":"马水镇",
"value":"6486",
"childrens":[]},
{
"label":"三甲镇",
"value":"6487",
"childrens":[]},
{
"label":"双窖镇",
"value":"6488",
"childrens":[]},
{
"label":"潭水镇",
"value":"6489",
"childrens":[]},
{
"label":"永宁镇",
"value":"6490",
"childrens":[]}]},

{
"label":"阳西县",
"value":"1674",
"childrens":[{
"label":"织篢镇",
"value":"6493",
"childrens":[]},
{
"label":"程村镇",
"value":"6494",
"childrens":[]},
{
"label":"溪头镇",
"value":"6495",
"childrens":[]},
{
"label":"上洋镇",
"value":"6496",
"childrens":[]},
{
"label":"沙扒镇",
"value":"6497",
"childrens":[]},
{
"label":"儒洞镇",
"value":"6498",
"childrens":[]},
{
"label":"新圩镇",
"value":"6499",
"childrens":[]},
{
"label":"塘口镇",
"value":"6500",
"childrens":[]}]},

{
"label":"江城区",
"value":"53085",
"childrens":[]},
{
"label":"阳东县",
"value":"53086",
"childrens":[]}]},

{
"label":"湛江市",
"value":"1677",
"childrens":[{
"label":"雷州市",
"value":"1679",
"childrens":[{
"label":"白沙镇",
"value":"6385",
"childrens":[]},
{
"label":"北和镇",
"value":"6386",
"childrens":[]},
{
"label":"东里镇",
"value":"6387",
"childrens":[]},
{
"label":"附城镇",
"value":"6388",
"childrens":[]},
{
"label":"纪家镇",
"value":"6389",
"childrens":[]},
{
"label":"雷高镇",
"value":"6391",
"childrens":[]},
{
"label":"龙门镇",
"value":"6392",
"childrens":[]},
{
"label":"南兴镇",
"value":"6393",
"childrens":[]},
{
"label":"企水镇",
"value":"6394",
"childrens":[]},
{
"label":"沈塘镇",
"value":"6395",
"childrens":[]},
{
"label":"松竹镇",
"value":"6396",
"childrens":[]},
{
"label":"覃斗镇",
"value":"6397",
"childrens":[]},
{
"label":"唐家镇",
"value":"6398",
"childrens":[]},
{
"label":"调风镇",
"value":"6399",
"childrens":[]},
{
"label":"乌石镇",
"value":"6400",
"childrens":[]},
{
"label":"客路镇",
"value":"6402",
"childrens":[]},
{
"label":"杨家镇",
"value":"6404",
"childrens":[]},
{
"label":"英利镇",
"value":"6405",
"childrens":[]}]},

{
"label":"吴川市",
"value":"1680",
"childrens":[{
"label":"黄坡镇",
"value":"6410",
"childrens":[]},
{
"label":"兰石镇",
"value":"6411",
"childrens":[]},
{
"label":"覃巴镇",
"value":"6413",
"childrens":[]},
{
"label":"塘缀镇",
"value":"6415",
"childrens":[]},
{
"label":"王村港",
"value":"6416",
"childrens":[]},
{
"label":"吴阳镇",
"value":"6417",
"childrens":[]},
{
"label":"樟铺镇",
"value":"6418",
"childrens":[]},
{
"label":"长岐镇",
"value":"6419",
"childrens":[]},
{
"label":"振文镇",
"value":"6420",
"childrens":[]},
{
"label":"浅水镇",
"value":"6422",
"childrens":[]}]},

{
"label":"徐闻县",
"value":"1682",
"childrens":[{
"label":"和安镇",
"value":"6424",
"childrens":[]},
{
"label":"曲界镇",
"value":"6425",
"childrens":[]},
{
"label":"锦和镇",
"value":"6426",
"childrens":[]},
{
"label":"新寮镇",
"value":"6427",
"childrens":[]},
{
"label":"下洋镇",
"value":"6428",
"childrens":[]},
{
"label":"前山镇",
"value":"6429",
"childrens":[]},
{
"label":"龙塘镇",
"value":"6430",
"childrens":[]},
{
"label":"海安镇",
"value":"6431",
"childrens":[]},
{
"label":"迈陈镇",
"value":"6432",
"childrens":[]},
{
"label":"西连镇",
"value":"6433",
"childrens":[]},
{
"label":"下桥镇",
"value":"6434",
"childrens":[]},
{
"label":"南山镇",
"value":"6435",
"childrens":[]},
{
"label":"城北乡",
"value":"6436",
"childrens":[]},
{
"label":"角尾乡",
"value":"6437",
"childrens":[]}]},

{
"label":"坡头区",
"value":"3646",
"childrens":[{
"label":"坡头镇",
"value":"6447",
"childrens":[]},
{
"label":"龙头镇",
"value":"6448",
"childrens":[]},
{
"label":"乾塘镇",
"value":"6449",
"childrens":[]},
{
"label":"南三镇",
"value":"6450",
"childrens":[]},
{
"label":"官渡镇",
"value":"6451",
"childrens":[]}]},

{
"label":"赤坎区",
"value":"53087",
"childrens":[]},
{
"label":"霞山区",
"value":"53088",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"53089",
"childrens":[]},
{
"label":"麻章区",
"value":"53090",
"childrens":[]},
{
"label":"遂溪县",
"value":"53091",
"childrens":[]},
{
"label":"廉江市",
"value":"53092",
"childrens":[]}]},

{
"label":"茂名市",
"value":"1684",
"childrens":[{
"label":"信宜市",
"value":"1687",
"childrens":[{
"label":"白石镇",
"value":"6219",
"childrens":[]},
{
"label":"北界镇",
"value":"6220",
"childrens":[]},
{
"label":"茶山镇",
"value":"6221",
"childrens":[]},
{
"label":"池洞镇",
"value":"6222",
"childrens":[]},
{
"label":"大成镇",
"value":"6223",
"childrens":[]},
{
"label":"丁堡镇",
"value":"6224",
"childrens":[]},
{
"label":"贵子镇",
"value":"6226",
"childrens":[]},
{
"label":"合水镇",
"value":"6227",
"childrens":[]},
{
"label":"洪冠镇",
"value":"6228",
"childrens":[]},
{
"label":"怀乡镇",
"value":"6229",
"childrens":[]},
{
"label":"金垌镇",
"value":"6230",
"childrens":[]},
{
"label":"平塘镇",
"value":"6231",
"childrens":[]},
{
"label":"钱排镇",
"value":"6232",
"childrens":[]},
{
"label":"水口镇",
"value":"6233",
"childrens":[]},
{
"label":"思贺镇",
"value":"6234",
"childrens":[]},
{
"label":"新宝镇",
"value":"6235",
"childrens":[]},
{
"label":"镇隆镇",
"value":"6236",
"childrens":[]},
{
"label":"朱砂镇",
"value":"6237",
"childrens":[]}]},

{
"label":"茂南区",
"value":"53093",
"childrens":[]},
{
"label":"电白区",
"value":"53094",
"childrens":[]},
{
"label":"高州市",
"value":"53095",
"childrens":[]},
{
"label":"化州市",
"value":"53096",
"childrens":[]}]},

{
"label":"肇庆市",
"value":"1690",
"childrens":[{
"label":"广宁县",
"value":"1693",
"childrens":[]},
{
"label":"德庆县",
"value":"1694",
"childrens":[]},
{
"label":"怀集县",
"value":"1695",
"childrens":[]},
{
"label":"封开县",
"value":"1696",
"childrens":[]},
{
"label":"鼎湖区",
"value":"1697",
"childrens":[]},
{
"label":"端州区",
"value":"4781",
"childrens":[]},
{
"label":"四会市",
"value":"53097",
"childrens":[]},
{
"label":"高要市",
"value":"53098",
"childrens":[]}]},

{
"label":"云浮市",
"value":"1698",
"childrens":[{
"label":"云安县",
"value":"1700",
"childrens":[{
"label":"六都镇",
"value":"6525",
"childrens":[]},
{
"label":"前锋镇",
"value":"6526",
"childrens":[]},
{
"label":"南盛镇",
"value":"6527",
"childrens":[]},
{
"label":"富林镇",
"value":"6528",
"childrens":[]},
{
"label":"镇安镇",
"value":"6529",
"childrens":[]},
{
"label":"白石镇",
"value":"6530",
"childrens":[]},
{
"label":"高村镇",
"value":"6531",
"childrens":[]},
{
"label":"石城镇",
"value":"6532",
"childrens":[]}]},

{
"label":"新兴县",
"value":"1701",
"childrens":[{
"label":"新城镇",
"value":"6533",
"childrens":[]},
{
"label":"水台镇",
"value":"6534",
"childrens":[]},
{
"label":"车岗镇",
"value":"6535",
"childrens":[]},
{
"label":"东成镇",
"value":"6536",
"childrens":[]},
{
"label":"稔村镇",
"value":"6537",
"childrens":[]},
{
"label":"太平镇",
"value":"6538",
"childrens":[]},
{
"label":"六祖镇",
"value":"6539",
"childrens":[]},
{
"label":"大江镇",
"value":"6540",
"childrens":[]},
{
"label":"河头镇",
"value":"6541",
"childrens":[]},
{
"label":"天堂镇",
"value":"6542",
"childrens":[]},
{
"label":"簕竹镇",
"value":"6543",
"childrens":[]},
{
"label":"里洞镇",
"value":"6544",
"childrens":[]}]},

{
"label":"郁南县",
"value":"1702",
"childrens":[{
"label":"都城镇",
"value":"6545",
"childrens":[]},
{
"label":"东坝镇",
"value":"6546",
"childrens":[]},
{
"label":"宋桂镇",
"value":"6547",
"childrens":[]},
{
"label":"连滩镇",
"value":"6548",
"childrens":[]},
{
"label":"大湾镇",
"value":"6549",
"childrens":[]},
{
"label":"建城镇",
"value":"6551",
"childrens":[]},
{
"label":"千官镇",
"value":"6552",
"childrens":[]},
{
"label":"通门镇",
"value":"6553",
"childrens":[]},
{
"label":"桂圩镇",
"value":"6554",
"childrens":[]},
{
"label":"宝珠镇",
"value":"6555",
"childrens":[]},
{
"label":"历洞镇",
"value":"6556",
"childrens":[]},
{
"label":"大方镇",
"value":"6557",
"childrens":[]},
{
"label":"南江口镇",
"value":"6558",
"childrens":[]},
{
"label":"平台镇",
"value":"6559",
"childrens":[]}]},

{
"label":"云城区",
"value":"53100",
"childrens":[]},
{
"label":"罗定市",
"value":"53101",
"childrens":[]}]},

{
"label":"清远市",
"value":"1704",
"childrens":[{
"label":"连州市",
"value":"1795",
"childrens":[]},
{
"label":"佛冈县",
"value":"1796",
"childrens":[]},
{
"label":"阳山县",
"value":"1797",
"childrens":[]},
{
"label":"清新县",
"value":"1798",
"childrens":[]},
{
"label":"连山县",
"value":"1799",
"childrens":[]},
{
"label":"连南县",
"value":"1800",
"childrens":[]},
{
"label":"清城区",
"value":"53102",
"childrens":[]},
{
"label":"英德市",
"value":"53103",
"childrens":[]}]},

{
"label":"潮州市",
"value":"1705",
"childrens":[{
"label":"饶平县",
"value":"1707",
"childrens":[]},
{
"label":"枫溪区",
"value":"4238",
"childrens":[]},
{
"label":"湘桥区",
"value":"53104",
"childrens":[]},
{
"label":"潮安区",
"value":"53105",
"childrens":[]}]},

{
"label":"揭阳市",
"value":"1709",
"childrens":[{
"label":"揭西县",
"value":"1712",
"childrens":[{
"label":"龙潭镇",
"value":"6086",
"childrens":[]},
{
"label":"南山镇",
"value":"6087",
"childrens":[]},
{
"label":"五经富镇",
"value":"6088",
"childrens":[]},
{
"label":"京溪园镇",
"value":"6089",
"childrens":[]},
{
"label":"灰寨镇",
"value":"6090",
"childrens":[]},
{
"label":"塔头镇",
"value":"6091",
"childrens":[]},
{
"label":"东园镇",
"value":"6092",
"childrens":[]},
{
"label":"棉湖镇",
"value":"6093",
"childrens":[]},
{
"label":"金和镇",
"value":"6094",
"childrens":[]},
{
"label":"大溪镇",
"value":"6095",
"childrens":[]},
{
"label":"钱坑镇",
"value":"6096",
"childrens":[]},
{
"label":"坪上镇",
"value":"6097",
"childrens":[]},
{
"label":"五云镇",
"value":"6098",
"childrens":[]},
{
"label":"上砂镇",
"value":"6099",
"childrens":[]},
{
"label":"良田乡",
"value":"6100",
"childrens":[]}]},

{
"label":"惠来县",
"value":"1713",
"childrens":[{
"label":"惠城镇",
"value":"6101",
"childrens":[]},
{
"label":"华湖镇",
"value":"6102",
"childrens":[]},
{
"label":"仙庵镇",
"value":"6103",
"childrens":[]},
{
"label":"靖海镇",
"value":"6104",
"childrens":[]},
{
"label":"周田镇",
"value":"6105",
"childrens":[]},
{
"label":"前詹镇",
"value":"6106",
"childrens":[]},
{
"label":"神泉镇",
"value":"6107",
"childrens":[]},
{
"label":"东陇镇",
"value":"6108",
"childrens":[]},
{
"label":"岐石镇",
"value":"6109",
"childrens":[]},
{
"label":"隆江镇",
"value":"6110",
"childrens":[]},
{
"label":"溪西镇",
"value":"6111",
"childrens":[]},
{
"label":"鳌江镇",
"value":"6112",
"childrens":[]},
{
"label":"东港镇",
"value":"6113",
"childrens":[]},
{
"label":"葵潭镇",
"value":"6114",
"childrens":[]}]},

{
"label":"东山区",
"value":"5484",
"childrens":[]},
{
"label":"普宁市",
"value":"5864",
"childrens":[]},
{
"label":"榕城区",
"value":"53106",
"childrens":[]},
{
"label":"揭东县",
"value":"53107",
"childrens":[]}]}]},


{
"label":"广西",
"value":"20",
"childrens":[{
"label":"南宁市",
"value":"1715",
"childrens":[{
"label":"武鸣县",
"value":"1716",
"childrens":[]},
{
"label":"邕宁区",
"value":"1724",
"childrens":[]},
{
"label":"宾阳县",
"value":"3005",
"childrens":[]},
{
"label":"横县",
"value":"3650",
"childrens":[]},
{
"label":"上林县",
"value":"3651",
"childrens":[]},
{
"label":"隆安县",
"value":"3652",
"childrens":[]},
{
"label":"马山县",
"value":"3653",
"childrens":[]},
{
"label":"良庆区",
"value":"53678",
"childrens":[]},
{
"label":"江南区",
"value":"53679",
"childrens":[]},
{
"label":"兴宁区",
"value":"53680",
"childrens":[]},
{
"label":"青秀区",
"value":"53681",
"childrens":[]},
{
"label":"西乡塘区",
"value":"53682",
"childrens":[]}]},

{
"label":"柳州市",
"value":"1720",
"childrens":[{
"label":"柳江县",
"value":"1721",
"childrens":[]},
{
"label":"柳城县",
"value":"1722",
"childrens":[]},
{
"label":"鹿寨县",
"value":"1725",
"childrens":[]},
{
"label":"融安县",
"value":"3659",
"childrens":[]},
{
"label":"三江县",
"value":"3660",
"childrens":[]},
{
"label":"融水县",
"value":"3661",
"childrens":[]},
{
"label":"鱼峰区",
"value":"53683",
"childrens":[]},
{
"label":"城中区",
"value":"53684",
"childrens":[]},
{
"label":"柳南区",
"value":"53685",
"childrens":[]},
{
"label":"柳北区",
"value":"53686",
"childrens":[]}]},

{
"label":"桂林市",
"value":"1726",
"childrens":[{
"label":"阳朔县",
"value":"1727",
"childrens":[]},
{
"label":"临桂县",
"value":"1728",
"childrens":[]},
{
"label":"灵川县",
"value":"1729",
"childrens":[]},
{
"label":"全州县",
"value":"1730",
"childrens":[]},
{
"label":"平乐县",
"value":"1731",
"childrens":[]},
{
"label":"兴安县",
"value":"1732",
"childrens":[]},
{
"label":"灌阳县",
"value":"1733",
"childrens":[]},
{
"label":"荔浦县",
"value":"1734",
"childrens":[]},
{
"label":"资源县",
"value":"1735",
"childrens":[]},
{
"label":"永福县",
"value":"1736",
"childrens":[]},
{
"label":"龙胜县",
"value":"1738",
"childrens":[]},
{
"label":"恭城县",
"value":"3666",
"childrens":[]},
{
"label":"象山区",
"value":"3670",
"childrens":[]},
{
"label":"雁山区",
"value":"4457",
"childrens":[]},
{
"label":"秀峰区",
"value":"53687",
"childrens":[]},
{
"label":"叠彩区",
"value":"53688",
"childrens":[]},
{
"label":"七星区",
"value":"53689",
"childrens":[]}]},

{
"label":"梧州市",
"value":"1740",
"childrens":[{
"label":"岑溪市",
"value":"1741",
"childrens":[]},
{
"label":"苍梧县",
"value":"1742",
"childrens":[]},
{
"label":"藤县",
"value":"1743",
"childrens":[]},
{
"label":"蒙山县",
"value":"1744",
"childrens":[]},
{
"label":"万秀区",
"value":"53690",
"childrens":[]},
{
"label":"蝶山区",
"value":"53691",
"childrens":[]},
{
"label":"长洲区",
"value":"53692",
"childrens":[]},
{
"label":"龙圩区",
"value":"53693",
"childrens":[]}]},

{
"label":"北海市",
"value":"1746",
"childrens":[{
"label":"合浦县",
"value":"1747",
"childrens":[]},
{
"label":"铁山港区",
"value":"1748",
"childrens":[]},
{
"label":"海城区",
"value":"53694",
"childrens":[]},
{
"label":"银海区",
"value":"53695",
"childrens":[]}]},

{
"label":"防城港市",
"value":"1749",
"childrens":[{
"label":"东兴市",
"value":"1750",
"childrens":[]},
{
"label":"上思县",
"value":"1751",
"childrens":[]},
{
"label":"防城区",
"value":"53696",
"childrens":[]},
{
"label":"港口区",
"value":"53697",
"childrens":[]}]},

{
"label":"钦州市",
"value":"1753",
"childrens":[{
"label":"浦北县",
"value":"1754",
"childrens":[]},
{
"label":"灵山县",
"value":"1755",
"childrens":[]},
{
"label":"钦北区",
"value":"2999",
"childrens":[]},
{
"label":"钦南区",
"value":"53698",
"childrens":[]}]},

{
"label":"贵港市",
"value":"1757",
"childrens":[{
"label":"桂平市",
"value":"1758",
"childrens":[]},
{
"label":"平南县",
"value":"1759",
"childrens":[]},
{
"label":"覃塘区",
"value":"1760",
"childrens":[]},
{
"label":"港南区",
"value":"53699",
"childrens":[]},
{
"label":"港北区",
"value":"53700",
"childrens":[]}]},

{
"label":"玉林市",
"value":"1761",
"childrens":[{
"label":"北流市",
"value":"1762",
"childrens":[]},
{
"label":"容县",
"value":"1763",
"childrens":[]},
{
"label":"博白县",
"value":"1764",
"childrens":[]},
{
"label":"陆川县",
"value":"1765",
"childrens":[]},
{
"label":"兴业县",
"value":"1766",
"childrens":[]},
{
"label":"玉州区",
"value":"53701",
"childrens":[]},
{
"label":"福绵区",
"value":"53702",
"childrens":[]}]},

{
"label":"贺州市",
"value":"1792",
"childrens":[{
"label":"钟山县",
"value":"1803",
"childrens":[]},
{
"label":"昭平县",
"value":"1804",
"childrens":[]},
{
"label":"富川县",
"value":"1805",
"childrens":[]},
{
"label":"平桂管理区",
"value":"53703",
"childrens":[]},
{
"label":"八步区",
"value":"53704",
"childrens":[]}]},

{
"label":"百色市",
"value":"1806",
"childrens":[{
"label":"右江区",
"value":"1807",
"childrens":[]},
{
"label":"平果县",
"value":"1808",
"childrens":[]},
{
"label":"乐业县",
"value":"1809",
"childrens":[]},
{
"label":"田阳县",
"value":"1810",
"childrens":[]},
{
"label":"西林县",
"value":"1811",
"childrens":[]},
{
"label":"田林县",
"value":"1812",
"childrens":[]},
{
"label":"德保县",
"value":"1813",
"childrens":[]},
{
"label":"靖西县",
"value":"1814",
"childrens":[]},
{
"label":"田东县",
"value":"1815",
"childrens":[]},
{
"label":"那坡县",
"value":"1816",
"childrens":[]},
{
"label":"隆林县",
"value":"1817",
"childrens":[]},
{
"label":"凌云县",
"value":"3678",
"childrens":[]}]},

{
"label":"河池市",
"value":"1818",
"childrens":[{
"label":"宜州市",
"value":"1820",
"childrens":[]},
{
"label":"天峨县",
"value":"1821",
"childrens":[]},
{
"label":"凤山县",
"value":"1822",
"childrens":[]},
{
"label":"南丹县",
"value":"1823",
"childrens":[]},
{
"label":"东兰县",
"value":"1824",
"childrens":[]},
{
"label":"巴马县",
"value":"1825",
"childrens":[]},
{
"label":"环江县",
"value":"1826",
"childrens":[]},
{
"label":"罗城县",
"value":"2991",
"childrens":[]},
{
"label":"大化县",
"value":"3152",
"childrens":[]},
{
"label":"都安县",
"value":"3679",
"childrens":[]},
{
"label":"金城江区",
"value":"3680",
"childrens":[]}]},

{
"label":"来宾市",
"value":"3044",
"childrens":[{
"label":"兴宾区",
"value":"3046",
"childrens":[]},
{
"label":"合山市",
"value":"3047",
"childrens":[]},
{
"label":"忻城县",
"value":"3048",
"childrens":[]},
{
"label":"武宣县",
"value":"3049",
"childrens":[]},
{
"label":"象州县",
"value":"3050",
"childrens":[]},
{
"label":"金秀县",
"value":"3051",
"childrens":[]}]},

{
"label":"崇左市",
"value":"3168",
"childrens":[{
"label":"江州区",
"value":"3169",
"childrens":[]},
{
"label":"凭祥市",
"value":"3681",
"childrens":[]},
{
"label":"扶绥县",
"value":"3682",
"childrens":[]},
{
"label":"大新县",
"value":"3683",
"childrens":[]},
{
"label":"天等县",
"value":"3684",
"childrens":[]},
{
"label":"宁明县",
"value":"3685",
"childrens":[]},
{
"label":"龙州县",
"value":"3686",
"childrens":[]}]}]},


{
"label":"江西",
"value":"21",
"childrens":[{
"label":"南昌市",
"value":"1827",
"childrens":[{
"label":"南昌县",
"value":"1828",
"childrens":[]},
{
"label":"进贤县",
"value":"1829",
"childrens":[]},
{
"label":"安义县",
"value":"1830",
"childrens":[]},
{
"label":"新建县",
"value":"3502",
"childrens":[]},
{
"label":"湾里区",
"value":"3504",
"childrens":[]},
{
"label":"青云谱区",
"value":"3505",
"childrens":[]},
{
"label":"西湖区",
"value":"3506",
"childrens":[]},
{
"label":"东湖区",
"value":"3507",
"childrens":[]},
{
"label":"高新区",
"value":"4039",
"childrens":[]},
{
"label":"昌北区",
"value":"4101",
"childrens":[]},
{
"label":"青山湖区",
"value":"53705",
"childrens":[]},
{
"label":"红谷滩新区",
"value":"53706",
"childrens":[]}]},

{
"label":"景德镇市",
"value":"1832",
"childrens":[{
"label":"乐平市",
"value":"1833",
"childrens":[]},
{
"label":"浮梁县",
"value":"1834",
"childrens":[]},
{
"label":"珠山区",
"value":"3508",
"childrens":[]},
{
"label":"昌江区",
"value":"53707",
"childrens":[]}]},

{
"label":"萍乡市",
"value":"1836",
"childrens":[{
"label":"湘东区",
"value":"1837",
"childrens":[]},
{
"label":"莲花县",
"value":"1838",
"childrens":[]},
{
"label":"上栗县",
"value":"1839",
"childrens":[]},
{
"label":"芦溪县",
"value":"1840",
"childrens":[]},
{
"label":"安源区",
"value":"53708",
"childrens":[]}]},

{
"label":"新余市",
"value":"1842",
"childrens":[{
"label":"分宜县",
"value":"1843",
"childrens":[]},
{
"label":"渝水区",
"value":"53709",
"childrens":[]}]},

{
"label":"九江市",
"value":"1845",
"childrens":[{
"label":"柴桑区",
"value":"1846",
"childrens":[]},
{
"label":"瑞昌市",
"value":"1847",
"childrens":[]},
{
"label":"泸州市",
"value":"1848",
"childrens":[]},
{
"label":"武宁县",
"value":"1849",
"childrens":[]},
{
"label":"彭泽县",
"value":"1850",
"childrens":[]},
{
"label":"永修县",
"value":"1851",
"childrens":[]},
{
"label":"修水县",
"value":"1852",
"childrens":[]},
{
"label":"湖口县",
"value":"1853",
"childrens":[]},
{
"label":"德安县",
"value":"1854",
"childrens":[]},
{
"label":"都昌县",
"value":"1855",
"childrens":[]},
{
"label":"共青城市",
"value":"4161",
"childrens":[]},
{
"label":"经济技术开发区",
"value":"53710",
"childrens":[]},
{
"label":"八里湖新区",
"value":"53711",
"childrens":[]},
{
"label":"庐山风景名胜区",
"value":"53712",
"childrens":[]},
{
"label":"濂溪区",
"value":"53713",
"childrens":[]},
{
"label":"浔阳区",
"value":"53714",
"childrens":[]}]},

{
"label":"鹰潭市",
"value":"1857",
"childrens":[{
"label":"余江县",
"value":"1858",
"childrens":[]},
{
"label":"贵溪市",
"value":"1859",
"childrens":[]},
{
"label":"月湖区",
"value":"1860",
"childrens":[]},
{
"label":"龙虎山风景旅游区",
"value":"53715",
"childrens":[]}]},

{
"label":"上饶市",
"value":"1861",
"childrens":[{
"label":"德兴市",
"value":"1863",
"childrens":[]},
{
"label":"广丰县",
"value":"1864",
"childrens":[]},
{
"label":"鄱阳县",
"value":"1865",
"childrens":[]},
{
"label":"婺源县",
"value":"1866",
"childrens":[]},
{
"label":"余干县",
"value":"1867",
"childrens":[]},
{
"label":"横峰县",
"value":"1868",
"childrens":[]},
{
"label":"弋阳县",
"value":"1869",
"childrens":[]},
{
"label":"铅山县",
"value":"1870",
"childrens":[]},
{
"label":"玉山县",
"value":"1871",
"childrens":[]},
{
"label":"万年县",
"value":"1872",
"childrens":[]},
{
"label":"信州区",
"value":"53716",
"childrens":[]},
{
"label":"上饶县",
"value":"53717",
"childrens":[]}]},

{
"label":"宜春市",
"value":"1874",
"childrens":[{
"label":"丰城市",
"value":"1875",
"childrens":[]},
{
"label":"樟树市",
"value":"1876",
"childrens":[]},
{
"label":"高安市",
"value":"1877",
"childrens":[]},
{
"label":"铜鼓县",
"value":"1878",
"childrens":[]},
{
"label":"靖安县",
"value":"1879",
"childrens":[]},
{
"label":"宜丰县",
"value":"1880",
"childrens":[]},
{
"label":"奉新县",
"value":"1881",
"childrens":[]},
{
"label":"万载县",
"value":"1882",
"childrens":[]},
{
"label":"上高县",
"value":"1883",
"childrens":[]},
{
"label":"袁州区",
"value":"53718",
"childrens":[]}]},

{
"label":"抚州市",
"value":"1885",
"childrens":[{
"label":"南丰县",
"value":"1887",
"childrens":[]},
{
"label":"乐安县",
"value":"1888",
"childrens":[]},
{
"label":"金溪县",
"value":"1889",
"childrens":[]},
{
"label":"南城县",
"value":"1890",
"childrens":[]},
{
"label":"东乡县",
"value":"1891",
"childrens":[]},
{
"label":"资溪县",
"value":"1892",
"childrens":[]},
{
"label":"宜黄县",
"value":"1893",
"childrens":[]},
{
"label":"崇仁县",
"value":"1894",
"childrens":[]},
{
"label":"黎川县",
"value":"1895",
"childrens":[]},
{
"label":"广昌县",
"value":"1896",
"childrens":[]},
{
"label":"临川区",
"value":"53719",
"childrens":[]}]},

{
"label":"吉安市",
"value":"1898",
"childrens":[{
"label":"井冈山市",
"value":"1899",
"childrens":[]},
{
"label":"吉安县",
"value":"1900",
"childrens":[]},
{
"label":"永丰县",
"value":"1901",
"childrens":[]},
{
"label":"永新县",
"value":"1902",
"childrens":[]},
{
"label":"新干县",
"value":"1903",
"childrens":[]},
{
"label":"泰和县",
"value":"1904",
"childrens":[]},
{
"label":"峡江县",
"value":"1905",
"childrens":[]},
{
"label":"遂川县",
"value":"1906",
"childrens":[]},
{
"label":"安福县",
"value":"1907",
"childrens":[]},
{
"label":"吉水县",
"value":"1908",
"childrens":[]},
{
"label":"万安县",
"value":"1909",
"childrens":[]},
{
"label":"青原区",
"value":"53720",
"childrens":[]},
{
"label":"吉州区",
"value":"53721",
"childrens":[]}]},

{
"label":"赣州市",
"value":"1911",
"childrens":[{
"label":"南康市",
"value":"1912",
"childrens":[]},
{
"label":"瑞金市",
"value":"1913",
"childrens":[]},
{
"label":"石城县",
"value":"1914",
"childrens":[]},
{
"label":"安远县",
"value":"1915",
"childrens":[]},
{
"label":"赣县",
"value":"1916",
"childrens":[]},
{
"label":"宁都县",
"value":"1917",
"childrens":[]},
{
"label":"寻乌县",
"value":"1918",
"childrens":[]},
{
"label":"兴国县",
"value":"1919",
"childrens":[]},
{
"label":"定南县",
"value":"1920",
"childrens":[]},
{
"label":"上犹县",
"value":"1921",
"childrens":[]},
{
"label":"于都县",
"value":"1922",
"childrens":[]},
{
"label":"龙南县",
"value":"1923",
"childrens":[]},
{
"label":"崇义县",
"value":"1924",
"childrens":[]},
{
"label":"大余县",
"value":"1925",
"childrens":[]},
{
"label":"信丰县",
"value":"1926",
"childrens":[]},
{
"label":"全南县",
"value":"1927",
"childrens":[]},
{
"label":"会昌县",
"value":"1928",
"childrens":[]},
{
"label":"章贡区",
"value":"53722",
"childrens":[]}]}]},


{
"label":"四川",
"value":"22",
"childrens":[{
"label":"成都市",
"value":"1930",
"childrens":[{
"label":"高新西区",
"value":"4284",
"childrens":[]},
{
"label":"新都区",
"value":"53257",
"childrens":[]},
{
"label":"温江区",
"value":"53258",
"childrens":[]},
{
"label":"龙泉驿区",
"value":"53259",
"childrens":[]},
{
"label":"青白江区",
"value":"53260",
"childrens":[]},
{
"label":"彭州市",
"value":"53261",
"childrens":[]},
{
"label":"崇州市",
"value":"53262",
"childrens":[]},
{
"label":"邛崃市",
"value":"53263",
"childrens":[]},
{
"label":"都江堰市",
"value":"53264",
"childrens":[]},
{
"label":"郫都区",
"value":"53265",
"childrens":[]},
{
"label":"新津县",
"value":"53266",
"childrens":[]},
{
"label":"双流区",
"value":"53267",
"childrens":[]},
{
"label":"大邑县",
"value":"53268",
"childrens":[]},
{
"label":"蒲江县",
"value":"53269",
"childrens":[]},
{
"label":"金堂县",
"value":"53270",
"childrens":[]},
{
"label":"青羊区",
"value":"53271",
"childrens":[]},
{
"label":"锦江区",
"value":"53272",
"childrens":[]},
{
"label":"金牛区",
"value":"53273",
"childrens":[]},
{
"label":"武侯区",
"value":"53274",
"childrens":[]},
{
"label":"成华区",
"value":"53275",
"childrens":[]},
{
"label":"高新区",
"value":"53276",
"childrens":[]},
{
"label":"简阳市",
"value":"53277",
"childrens":[]}]},

{
"label":"自贡市",
"value":"1946",
"childrens":[{
"label":"荣县",
"value":"1947",
"childrens":[]},
{
"label":"富顺县",
"value":"1948",
"childrens":[]},
{
"label":"自流井区",
"value":"1949",
"childrens":[]},
{
"label":"沿滩区",
"value":"3895",
"childrens":[]},
{
"label":"大安区",
"value":"53278",
"childrens":[]},
{
"label":"贡井区",
"value":"53279",
"childrens":[]}]},

{
"label":"攀枝花市",
"value":"1950",
"childrens":[{
"label":"米易县",
"value":"1951",
"childrens":[]},
{
"label":"盐边县",
"value":"1952",
"childrens":[]},
{
"label":"仁和区",
"value":"1953",
"childrens":[]},
{
"label":"西区",
"value":"3896",
"childrens":[]},
{
"label":"东区",
"value":"53280",
"childrens":[]}]},

{
"label":"泸州市",
"value":"1954",
"childrens":[{
"label":"泸县",
"value":"1955",
"childrens":[]},
{
"label":"合江县",
"value":"1956",
"childrens":[]},
{
"label":"叙永县",
"value":"1957",
"childrens":[]},
{
"label":"古蔺县",
"value":"1958",
"childrens":[]},
{
"label":"纳溪区",
"value":"3898",
"childrens":[]},
{
"label":"江阳区",
"value":"53281",
"childrens":[]},
{
"label":"龙马潭区",
"value":"53282",
"childrens":[]}]},

{
"label":"绵阳市",
"value":"1960",
"childrens":[{
"label":"盐亭县",
"value":"1970",
"childrens":[]},
{
"label":"三台县",
"value":"1971",
"childrens":[]},
{
"label":"平武县",
"value":"1972",
"childrens":[]},
{
"label":"北川县",
"value":"1973",
"childrens":[]},
{
"label":"安县",
"value":"1974",
"childrens":[]},
{
"label":"梓潼县",
"value":"1975",
"childrens":[]},
{
"label":"江油市",
"value":"53283",
"childrens":[]},
{
"label":"涪城区",
"value":"53284",
"childrens":[]},
{
"label":"游仙区",
"value":"53285",
"childrens":[]},
{
"label":"高新区",
"value":"53286",
"childrens":[]},
{
"label":"经开区",
"value":"53287",
"childrens":[]}]},

{
"label":"德阳市",
"value":"1962",
"childrens":[{
"label":"罗江县",
"value":"1965",
"childrens":[]},
{
"label":"中江县",
"value":"1966",
"childrens":[]},
{
"label":"广汉市",
"value":"53288",
"childrens":[]},
{
"label":"什邡市",
"value":"53289",
"childrens":[]},
{
"label":"旌阳区",
"value":"53290",
"childrens":[]},
{
"label":"绵竹市",
"value":"53291",
"childrens":[]}]},

{
"label":"广元市",
"value":"1977",
"childrens":[{
"label":"青川县",
"value":"1978",
"childrens":[]},
{
"label":"旺苍县",
"value":"1979",
"childrens":[]},
{
"label":"剑阁县",
"value":"1980",
"childrens":[]},
{
"label":"苍溪县",
"value":"1981",
"childrens":[]},
{
"label":"元坝区",
"value":"3901",
"childrens":[]},
{
"label":"朝天区",
"value":"3902",
"childrens":[]},
{
"label":"利州区",
"value":"53292",
"childrens":[]}]},

{
"label":"遂宁市",
"value":"1983",
"childrens":[{
"label":"射洪县",
"value":"1984",
"childrens":[{
"label":"太和镇",
"value":"7771",
"childrens":[]},
{
"label":"大榆镇",
"value":"8108",
"childrens":[]},
{
"label":"广兴镇",
"value":"8109",
"childrens":[]},
{
"label":"金华镇",
"value":"8110",
"childrens":[]},
{
"label":"沱牌镇",
"value":"8111",
"childrens":[]},
{
"label":"太乙镇",
"value":"8112",
"childrens":[]},
{
"label":"金家镇",
"value":"8113",
"childrens":[]},
{
"label":"复兴镇",
"value":"8114",
"childrens":[]},
{
"label":"天仙镇",
"value":"8115",
"childrens":[]},
{
"label":"仁和镇",
"value":"8116",
"childrens":[]},
{
"label":"青岗镇",
"value":"8117",
"childrens":[]},
{
"label":"洋溪镇",
"value":"8118",
"childrens":[]},
{
"label":"香山镇",
"value":"8119",
"childrens":[]},
{
"label":"明星镇",
"value":"8120",
"childrens":[]},
{
"label":"涪西镇",
"value":"8121",
"childrens":[]},
{
"label":"陈古镇",
"value":"8122",
"childrens":[]},
{
"label":"凤来镇",
"value":"8123",
"childrens":[]},
{
"label":"潼射镇",
"value":"8124",
"childrens":[]},
{
"label":"曹碑镇",
"value":"8125",
"childrens":[]},
{
"label":"官升镇",
"value":"8126",
"childrens":[]},
{
"label":"瞿河乡",
"value":"8127",
"childrens":[]},
{
"label":"伏河乡",
"value":"8128",
"childrens":[]},
{
"label":"青堤乡",
"value":"8129",
"childrens":[]},
{
"label":"双溪乡",
"value":"8130",
"childrens":[]},
{
"label":"文升乡",
"value":"8131",
"childrens":[]},
{
"label":"万林乡",
"value":"8132",
"childrens":[]},
{
"label":"太兴乡",
"value":"8133",
"childrens":[]},
{
"label":"东岳乡",
"value":"8134",
"childrens":[]},
{
"label":"金鹤乡",
"value":"8135",
"childrens":[]},
{
"label":"玉太乡",
"value":"8136",
"childrens":[]}]},

{
"label":"蓬溪县",
"value":"1985",
"childrens":[{
"label":"赤城镇",
"value":"7738",
"childrens":[]},
{
"label":"新会镇",
"value":"7739",
"childrens":[]},
{
"label":"文井镇",
"value":"7740",
"childrens":[]},
{
"label":"明月镇",
"value":"7741",
"childrens":[]},
{
"label":"常乐镇",
"value":"7742",
"childrens":[]},
{
"label":"天福镇",
"value":"7743",
"childrens":[]},
{
"label":"红江镇",
"value":"7744",
"childrens":[]},
{
"label":"宝梵镇",
"value":"7745",
"childrens":[]},
{
"label":"大石镇",
"value":"7746",
"childrens":[]},
{
"label":"吉祥镇",
"value":"7747",
"childrens":[]},
{
"label":"鸣凤镇",
"value":"7748",
"childrens":[]},
{
"label":"任隆镇",
"value":"7749",
"childrens":[]},
{
"label":"三凤镇",
"value":"7750",
"childrens":[]},
{
"label":"高坪镇",
"value":"7751",
"childrens":[]},
{
"label":"蓬南镇",
"value":"7752",
"childrens":[]},
{
"label":"群利镇",
"value":"7753",
"childrens":[]},
{
"label":"下东乡",
"value":"7754",
"childrens":[]},
{
"label":"新星乡",
"value":"7755",
"childrens":[]},
{
"label":"罗戈乡",
"value":"7756",
"childrens":[]},
{
"label":"板桥乡",
"value":"7757",
"childrens":[]},
{
"label":"槐花乡",
"value":"7758",
"childrens":[]},
{
"label":"吉星乡",
"value":"7759",
"childrens":[]},
{
"label":"黄泥乡",
"value":"7760",
"childrens":[]},
{
"label":"荷叶乡",
"value":"7761",
"childrens":[]},
{
"label":"金龙乡",
"value":"7762",
"childrens":[]},
{
"label":"农兴乡",
"value":"7763",
"childrens":[]},
{
"label":"新胜乡",
"value":"7764",
"childrens":[]},
{
"label":"回水乡",
"value":"7765",
"childrens":[]},
{
"label":"群力乡",
"value":"7766",
"childrens":[]},
{
"label":"高升乡",
"value":"7767",
"childrens":[]},
{
"label":"金桥乡",
"value":"7768",
"childrens":[]},
{
"label":"城南新区",
"value":"7769",
"childrens":[]},
{
"label":"上游工业园管理委员会",
"value":"7770",
"childrens":[]}]},

{
"label":"大英县",
"value":"1986",
"childrens":[{
"label":"蓬莱镇",
"value":"7772",
"childrens":[]},
{
"label":"隆盛镇",
"value":"7773",
"childrens":[]},
{
"label":"回马镇",
"value":"7774",
"childrens":[]},
{
"label":"天保镇",
"value":"7775",
"childrens":[]},
{
"label":"河边镇",
"value":"7776",
"childrens":[]},
{
"label":"卓筒井镇",
"value":"7777",
"childrens":[]},
{
"label":"玉峰镇",
"value":"7778",
"childrens":[]},
{
"label":"象山镇",
"value":"7779",
"childrens":[]},
{
"label":"通仙乡",
"value":"7780",
"childrens":[]},
{
"label":"金元乡",
"value":"7781",
"childrens":[]},
{
"label":"智水乡",
"value":"7782",
"childrens":[]},
{
"label":"寸塘口乡",
"value":"8148",
"childrens":[]},
{
"label":"福禄乡",
"value":"8149",
"childrens":[]},
{
"label":"民主镇",
"value":"8150",
"childrens":[]},
{
"label":"郪口镇",
"value":"8151",
"childrens":[]},
{
"label":"石门镇",
"value":"8152",
"childrens":[]},
{
"label":"五方乡",
"value":"8153",
"childrens":[]},
{
"label":"星花乡",
"value":"8154",
"childrens":[]}]},

{
"label":"安居区",
"value":"1987",
"childrens":[{
"label":"安居镇",
"value":"7717",
"childrens":[]},
{
"label":"东禅镇",
"value":"7718",
"childrens":[]},
{
"label":"分水镇",
"value":"7719",
"childrens":[]},
{
"label":"石洞镇",
"value":"7720",
"childrens":[]},
{
"label":"拦江镇",
"value":"7721",
"childrens":[]},
{
"label":"保石镇",
"value":"7722",
"childrens":[]},
{
"label":"白马镇",
"value":"7723",
"childrens":[]},
{
"label":"中兴镇",
"value":"7724",
"childrens":[]},
{
"label":"横山镇",
"value":"7725",
"childrens":[]},
{
"label":"会龙镇",
"value":"7726",
"childrens":[]},
{
"label":"三家镇",
"value":"7727",
"childrens":[]},
{
"label":"玉丰镇",
"value":"7728",
"childrens":[]},
{
"label":"西眉镇",
"value":"7729",
"childrens":[]},
{
"label":"磨溪镇",
"value":"7730",
"childrens":[]},
{
"label":"聚贤乡",
"value":"7731",
"childrens":[]},
{
"label":"莲花乡",
"value":"7732",
"childrens":[]},
{
"label":"观音乡",
"value":"7733",
"childrens":[]},
{
"label":"步云乡",
"value":"7734",
"childrens":[]},
{
"label":"常理乡",
"value":"7735",
"childrens":[]},
{
"label":"大安乡",
"value":"7736",
"childrens":[]},
{
"label":"马家乡",
"value":"7737",
"childrens":[]}]},

{
"label":"船山区",
"value":"4961",
"childrens":[{
"label":"慈音街道",
"value":"7701",
"childrens":[]},
{
"label":"九莲街道",
"value":"7702",
"childrens":[]},
{
"label":"龙凤镇",
"value":"7703",
"childrens":[]},
{
"label":"仁里镇",
"value":"7704",
"childrens":[]},
{
"label":"复桥镇",
"value":"7705",
"childrens":[]},
{
"label":"永兴镇",
"value":"7706",
"childrens":[]},
{
"label":"河沙镇",
"value":"7707",
"childrens":[]},
{
"label":"新桥镇",
"value":"7708",
"childrens":[]},
{
"label":"桂花镇",
"value":"7709",
"childrens":[]},
{
"label":"西宁乡",
"value":"7710",
"childrens":[]},
{
"label":"老池乡",
"value":"7711",
"childrens":[]},
{
"label":"保升乡",
"value":"7712",
"childrens":[]},
{
"label":"唐家乡",
"value":"7713",
"childrens":[]},
{
"label":"高升街街道",
"value":"8036",
"childrens":[]},
{
"label":"凯旋路街道",
"value":"8037",
"childrens":[]},
{
"label":"南津路街道",
"value":"8038",
"childrens":[]},
{
"label":"镇江寺街道",
"value":"8039",
"childrens":[]},
{
"label":"育才路街道",
"value":"8040",
"childrens":[]},
{
"label":"介福路街道",
"value":"8041",
"childrens":[]},
{
"label":"嘉禾街道",
"value":"8042",
"childrens":[]},
{
"label":"广德寺街道",
"value":"8043",
"childrens":[]},
{
"label":"富源路街道",
"value":"8044",
"childrens":[]},
{
"label":"龙坪街道",
"value":"8045",
"childrens":[]},
{
"label":"灵泉寺街道",
"value":"8046",
"childrens":[]},
{
"label":"南强镇",
"value":"8147",
"childrens":[]},
{
"label":"西山路街道",
"value":"8189",
"childrens":[]},
{
"label":"北固乡",
"value":"8190",
"childrens":[]},
{
"label":"微电子工业园",
"value":"8191",
"childrens":[]},
{
"label":"河东新区",
"value":"8192",
"childrens":[]}]}]},


{
"label":"内江市",
"value":"1988",
"childrens":[{
"label":"资中县",
"value":"1989",
"childrens":[{
"label":"重龙镇",
"value":"7833",
"childrens":[]},
{
"label":"水南镇",
"value":"7834",
"childrens":[]},
{
"label":"甘露镇",
"value":"7835",
"childrens":[]},
{
"label":"归德镇",
"value":"7836",
"childrens":[]},
{
"label":"鱼溪镇",
"value":"7837",
"childrens":[]},
{
"label":"金李井镇",
"value":"7838",
"childrens":[]},
{
"label":"铁佛镇",
"value":"7839",
"childrens":[]},
{
"label":"球溪镇",
"value":"7840",
"childrens":[]},
{
"label":"顺河场镇",
"value":"7841",
"childrens":[]},
{
"label":"龙结镇",
"value":"7842",
"childrens":[]},
{
"label":"罗泉镇",
"value":"7843",
"childrens":[]},
{
"label":"发轮镇",
"value":"7844",
"childrens":[]},
{
"label":"兴隆街镇",
"value":"7845",
"childrens":[]},
{
"label":"银山镇",
"value":"7846",
"childrens":[]},
{
"label":"宋家镇",
"value":"7847",
"childrens":[]},
{
"label":"太平镇",
"value":"7848",
"childrens":[]},
{
"label":"骝马镇",
"value":"7849",
"childrens":[]},
{
"label":"苏家湾镇",
"value":"7850",
"childrens":[]},
{
"label":"新桥镇",
"value":"7851",
"childrens":[]},
{
"label":"明心寺镇",
"value":"7852",
"childrens":[]},
{
"label":"双河镇",
"value":"7853",
"childrens":[]},
{
"label":"公民镇",
"value":"7854",
"childrens":[]},
{
"label":"龙江镇",
"value":"7855",
"childrens":[]},
{
"label":"双龙镇",
"value":"7856",
"childrens":[]},
{
"label":"高楼镇",
"value":"7857",
"childrens":[]},
{
"label":"陈家镇",
"value":"7858",
"childrens":[]},
{
"label":"配龙镇",
"value":"7859",
"childrens":[]},
{
"label":"走马镇",
"value":"7860",
"childrens":[]},
{
"label":"孟塘镇",
"value":"7861",
"childrens":[]},
{
"label":"马鞍镇",
"value":"7862",
"childrens":[]},
{
"label":"狮子镇",
"value":"7863",
"childrens":[]},
{
"label":"板栗桠乡",
"value":"7864",
"childrens":[]},
{
"label":"龙山乡",
"value":"7865",
"childrens":[]}]},

{
"label":"隆昌县",
"value":"1990",
"childrens":[{
"label":"金鹅镇",
"value":"7866",
"childrens":[]},
{
"label":"古湖街道",
"value":"7867",
"childrens":[]},
{
"label":"山川镇",
"value":"7868",
"childrens":[]},
{
"label":"响石镇",
"value":"7869",
"childrens":[]},
{
"label":"圣灯镇",
"value":"7870",
"childrens":[]},
{
"label":"黄家镇",
"value":"7871",
"childrens":[]},
{
"label":"双凤镇",
"value":"7872",
"childrens":[]},
{
"label":"龙市镇",
"value":"7873",
"childrens":[]},
{
"label":"迎祥镇",
"value":"7874",
"childrens":[]},
{
"label":"界市镇",
"value":"7875",
"childrens":[]},
{
"label":"石碾镇",
"value":"7876",
"childrens":[]},
{
"label":"周兴镇",
"value":"7877",
"childrens":[]},
{
"label":"渔箭镇",
"value":"7878",
"childrens":[]},
{
"label":"石燕桥镇",
"value":"7879",
"childrens":[]},
{
"label":"李市镇",
"value":"7880",
"childrens":[]},
{
"label":"胡家镇",
"value":"7881",
"childrens":[]},
{
"label":"云顶镇",
"value":"7882",
"childrens":[]},
{
"label":"桂花井乡",
"value":"7883",
"childrens":[]},
{
"label":"普润乡",
"value":"7884",
"childrens":[]}]},

{
"label":"威远县",
"value":"1991",
"childrens":[{
"label":"严陵镇",
"value":"7832",
"childrens":[]},
{
"label":"铺子湾镇",
"value":"8048",
"childrens":[]},
{
"label":"新店镇",
"value":"8049",
"childrens":[]},
{
"label":"向义镇",
"value":"8050",
"childrens":[]},
{
"label":"界牌镇",
"value":"8051",
"childrens":[]},
{
"label":"龙会镇",
"value":"8052",
"childrens":[]},
{
"label":"高石镇",
"value":"8053",
"childrens":[]},
{
"label":"东联镇",
"value":"8054",
"childrens":[]},
{
"label":"靖和镇",
"value":"8055",
"childrens":[]},
{
"label":"镇西镇",
"value":"8056",
"childrens":[]},
{
"label":"庆卫镇",
"value":"8057",
"childrens":[]},
{
"label":"山王镇",
"value":"8058",
"childrens":[]},
{
"label":"黄荆沟镇",
"value":"8059",
"childrens":[]},
{
"label":"观英滩镇",
"value":"8060",
"childrens":[]},
{
"label":"新场镇",
"value":"8061",
"childrens":[]},
{
"label":"连界镇",
"value":"8062",
"childrens":[]},
{
"label":"越溪镇",
"value":"8063",
"childrens":[]},
{
"label":"两河镇",
"value":"8064",
"childrens":[]},
{
"label":"碗厂镇",
"value":"8065",
"childrens":[]},
{
"label":"小河镇",
"value":"8066",
"childrens":[]}]},

{
"label":"市中区",
"value":"1992",
"childrens":[{
"label":"城东街道",
"value":"7783",
"childrens":[]},
{
"label":"城南街道",
"value":"7784",
"childrens":[]},
{
"label":"城西街道",
"value":"7785",
"childrens":[]},
{
"label":"玉溪街道",
"value":"7786",
"childrens":[]},
{
"label":"牌楼街道",
"value":"7787",
"childrens":[]},
{
"label":"壕子口街道",
"value":"7788",
"childrens":[]},
{
"label":"白马镇",
"value":"7789",
"childrens":[]},
{
"label":"史家镇",
"value":"7790",
"childrens":[]},
{
"label":"凌家镇",
"value":"7791",
"childrens":[]},
{
"label":"朝阳镇",
"value":"7792",
"childrens":[]},
{
"label":"永安镇",
"value":"7793",
"childrens":[]},
{
"label":"全安镇",
"value":"7794",
"childrens":[]},
{
"label":"靖民镇",
"value":"7795",
"childrens":[]},
{
"label":"乐贤镇",
"value":"7796",
"childrens":[]},
{
"label":"沱江乡",
"value":"7797",
"childrens":[]},
{
"label":"交通乡",
"value":"7798",
"childrens":[]},
{
"label":"四合乡",
"value":"7799",
"childrens":[]},
{
"label":"凤鸣乡",
"value":"7800",
"childrens":[]},
{
"label":"伏龙乡",
"value":"7801",
"childrens":[]},
{
"label":"龚家乡",
"value":"7802",
"childrens":[]}]},

{
"label":"东兴区",
"value":"3121",
"childrens":[{
"label":"东兴街道",
"value":"7803",
"childrens":[]},
{
"label":"西林街道",
"value":"7804",
"childrens":[]},
{
"label":"新江街道",
"value":"7805",
"childrens":[]},
{
"label":"田家镇",
"value":"7806",
"childrens":[]},
{
"label":"郭北镇",
"value":"7807",
"childrens":[]},
{
"label":"高梁镇",
"value":"7808",
"childrens":[]},
{
"label":"白合镇",
"value":"7809",
"childrens":[]},
{
"label":"顺河镇",
"value":"7810",
"childrens":[]},
{
"label":"胜利镇",
"value":"7811",
"childrens":[]},
{
"label":"高桥镇",
"value":"7812",
"childrens":[]},
{
"label":"双才镇",
"value":"7813",
"childrens":[]},
{
"label":"小河口镇",
"value":"7814",
"childrens":[]},
{
"label":"杨家镇",
"value":"7815",
"childrens":[]},
{
"label":"椑木镇",
"value":"7816",
"childrens":[]},
{
"label":"石子镇",
"value":"7817",
"childrens":[]},
{
"label":"太安乡",
"value":"7818",
"childrens":[]},
{
"label":"苏家乡",
"value":"7819",
"childrens":[]},
{
"label":"富溪乡",
"value":"7820",
"childrens":[]},
{
"label":"同福乡",
"value":"7821",
"childrens":[]},
{
"label":"椑南乡",
"value":"7822",
"childrens":[]},
{
"label":"永东乡",
"value":"7823",
"childrens":[]},
{
"label":"永福乡",
"value":"7824",
"childrens":[]},
{
"label":"新店乡",
"value":"7825",
"childrens":[]},
{
"label":"双桥乡",
"value":"7826",
"childrens":[]},
{
"label":"平坦乡",
"value":"7827",
"childrens":[]},
{
"label":"中山乡",
"value":"7828",
"childrens":[]},
{
"label":"大治乡",
"value":"7829",
"childrens":[]},
{
"label":"柳桥乡",
"value":"7830",
"childrens":[]},
{
"label":"三烈乡",
"value":"7831",
"childrens":[]}]}]},


{
"label":"乐山市",
"value":"1993",
"childrens":[{
"label":"五通桥区",
"value":"1994",
"childrens":[]},
{
"label":"沙湾区",
"value":"1995",
"childrens":[]},
{
"label":"金口河区",
"value":"1996",
"childrens":[]},
{
"label":"夹江县",
"value":"1998",
"childrens":[]},
{
"label":"井研县",
"value":"1999",
"childrens":[]},
{
"label":"犍为县",
"value":"2000",
"childrens":[]},
{
"label":"沐川县",
"value":"2001",
"childrens":[]},
{
"label":"峨边县",
"value":"2002",
"childrens":[]},
{
"label":"马边县",
"value":"2003",
"childrens":[]},
{
"label":"市中区",
"value":"53293",
"childrens":[]},
{
"label":"峨眉山市",
"value":"53294",
"childrens":[]}]},

{
"label":"宜宾市",
"value":"2005",
"childrens":[{
"label":"宜宾县",
"value":"2006",
"childrens":[{
"label":"柏溪镇",
"value":"6971",
"childrens":[]},
{
"label":"喜捷镇",
"value":"6972",
"childrens":[]},
{
"label":"观音镇",
"value":"6973",
"childrens":[]},
{
"label":"横江镇",
"value":"6974",
"childrens":[]},
{
"label":"永兴镇",
"value":"6975",
"childrens":[]},
{
"label":"白花镇",
"value":"6976",
"childrens":[]},
{
"label":"柳嘉镇",
"value":"6977",
"childrens":[]},
{
"label":"泥溪镇",
"value":"6978",
"childrens":[]},
{
"label":"蕨溪镇",
"value":"6979",
"childrens":[]},
{
"label":"商州镇",
"value":"6980",
"childrens":[]},
{
"label":"高场镇",
"value":"6981",
"childrens":[]},
{
"label":"安边镇",
"value":"6982",
"childrens":[]},
{
"label":"双龙镇",
"value":"6983",
"childrens":[]},
{
"label":"李场镇",
"value":"6984",
"childrens":[]},
{
"label":"合什镇",
"value":"6985",
"childrens":[]},
{
"label":"古罗镇",
"value":"6986",
"childrens":[]},
{
"label":"孔滩镇",
"value":"6987",
"childrens":[]},
{
"label":"复龙镇",
"value":"6988",
"childrens":[]},
{
"label":"古柏乡",
"value":"6989",
"childrens":[]},
{
"label":"王场乡",
"value":"6990",
"childrens":[]},
{
"label":"双谊乡",
"value":"6991",
"childrens":[]},
{
"label":"隆兴乡",
"value":"6992",
"childrens":[]},
{
"label":"泥南乡",
"value":"6993",
"childrens":[]},
{
"label":"龙池乡",
"value":"6994",
"childrens":[]},
{
"label":"普安乡",
"value":"6995",
"childrens":[]},
{
"label":"凤仪乡",
"value":"6996",
"childrens":[]}]},

{
"label":"南溪区",
"value":"2007",
"childrens":[]},
{
"label":"江安县",
"value":"2008",
"childrens":[]},
{
"label":"长宁县",
"value":"2009",
"childrens":[]},
{
"label":"兴文县",
"value":"2010",
"childrens":[]},
{
"label":"珙县",
"value":"2011",
"childrens":[]},
{
"label":"高县",
"value":"2012",
"childrens":[]},
{
"label":"屏山县",
"value":"2013",
"childrens":[]},
{
"label":"筠连县",
"value":"2015",
"childrens":[]},
{
"label":"翠屏区",
"value":"53295",
"childrens":[]}]},

{
"label":"广安市",
"value":"2016",
"childrens":[{
"label":"岳池县",
"value":"2017",
"childrens":[{
"label":"九龙镇",
"value":"7934",
"childrens":[]},
{
"label":"花园镇",
"value":"7935",
"childrens":[]},
{
"label":"坪滩镇",
"value":"7936",
"childrens":[]},
{
"label":"龙孔镇",
"value":"7937",
"childrens":[]},
{
"label":"镇裕镇",
"value":"7938",
"childrens":[]},
{
"label":"白庙镇",
"value":"7939",
"childrens":[]},
{
"label":"酉溪镇",
"value":"7940",
"childrens":[]},
{
"label":"同兴镇",
"value":"7941",
"childrens":[]},
{
"label":"兴隆镇",
"value":"7942",
"childrens":[]},
{
"label":"秦溪镇",
"value":"7943",
"childrens":[]},
{
"label":"顾县镇",
"value":"7944",
"childrens":[]},
{
"label":"苟角镇",
"value":"7945",
"childrens":[]},
{
"label":"天平镇",
"value":"7946",
"childrens":[]},
{
"label":"石垭镇",
"value":"7947",
"childrens":[]},
{
"label":"乔家镇",
"value":"7948",
"childrens":[]},
{
"label":"罗渡镇",
"value":"7949",
"childrens":[]},
{
"label":"裕民镇",
"value":"7950",
"childrens":[]},
{
"label":"中和镇",
"value":"7951",
"childrens":[]},
{
"label":"新场镇",
"value":"7952",
"childrens":[]},
{
"label":"普安镇",
"value":"7953",
"childrens":[]},
{
"label":"赛龙镇",
"value":"7954",
"childrens":[]},
{
"label":"临溪镇",
"value":"7955",
"childrens":[]},
{
"label":"朝阳乡",
"value":"7956",
"childrens":[]},
{
"label":"北城乡",
"value":"7957",
"childrens":[]},
{
"label":"镇龙乡",
"value":"7958",
"childrens":[]},
{
"label":"粽粑乡",
"value":"7959",
"childrens":[]},
{
"label":"排楼乡",
"value":"7960",
"childrens":[]},
{
"label":"西板乡",
"value":"7961",
"childrens":[]},
{
"label":"嘉陵乡",
"value":"7962",
"childrens":[]},
{
"label":"石鼓乡",
"value":"7963",
"childrens":[]},
{
"label":"平安乡",
"value":"7964",
"childrens":[]},
{
"label":"恐龙乡",
"value":"7965",
"childrens":[]},
{
"label":"团结乡",
"value":"7966",
"childrens":[]},
{
"label":"黄龙乡",
"value":"7967",
"childrens":[]},
{
"label":"双鄢乡",
"value":"7968",
"childrens":[]},
{
"label":"东板乡",
"value":"7969",
"childrens":[]},
{
"label":"长田乡",
"value":"7970",
"childrens":[]},
{
"label":"鱼峰乡",
"value":"7971",
"childrens":[]},
{
"label":"大石乡",
"value":"7972",
"childrens":[]},
{
"label":"花板乡",
"value":"7973",
"childrens":[]},
{
"label":"大佛乡",
"value":"7974",
"childrens":[]},
{
"label":"齐福乡",
"value":"7975",
"childrens":[]},
{
"label":"伏龙乡",
"value":"7976",
"childrens":[]}]},

{
"label":"武胜县",
"value":"2018",
"childrens":[{
"label":"沿口镇",
"value":"7977",
"childrens":[]},
{
"label":"中心镇",
"value":"8068",
"childrens":[]},
{
"label":"烈面镇",
"value":"8069",
"childrens":[]},
{
"label":"飞龙镇",
"value":"8070",
"childrens":[]},
{
"label":"乐善镇",
"value":"8071",
"childrens":[]},
{
"label":"万善镇",
"value":"8072",
"childrens":[]},
{
"label":"龙女镇",
"value":"8073",
"childrens":[]},
{
"label":"三溪镇",
"value":"8074",
"childrens":[]},
{
"label":"赛马镇",
"value":"8075",
"childrens":[]},
{
"label":"胜利镇",
"value":"8076",
"childrens":[]},
{
"label":"金牛镇",
"value":"8077",
"childrens":[]},
{
"label":"清平镇",
"value":"8078",
"childrens":[]},
{
"label":"街子镇",
"value":"8079",
"childrens":[]},
{
"label":"万隆镇",
"value":"8080",
"childrens":[]},
{
"label":"礼安镇",
"value":"8081",
"childrens":[]},
{
"label":"华封镇",
"value":"8082",
"childrens":[]},
{
"label":"鸣钟乡",
"value":"8083",
"childrens":[]},
{
"label":"真静乡",
"value":"8084",
"childrens":[]},
{
"label":"猛山乡",
"value":"8085",
"childrens":[]},
{
"label":"双星乡",
"value":"8086",
"childrens":[]},
{
"label":"龙庭乡",
"value":"8087",
"childrens":[]},
{
"label":"石盘乡",
"value":"8088",
"childrens":[]},
{
"label":"旧县乡",
"value":"8089",
"childrens":[]},
{
"label":"鼓匠乡",
"value":"8090",
"childrens":[]},
{
"label":"白坪乡",
"value":"8091",
"childrens":[]},
{
"label":"永胜乡",
"value":"8092",
"childrens":[]},
{
"label":"新学乡",
"value":"8093",
"childrens":[]},
{
"label":"宝箴塞乡",
"value":"8094",
"childrens":[]},
{
"label":"金光乡",
"value":"8095",
"childrens":[]},
{
"label":"八一乡",
"value":"8096",
"childrens":[]},
{
"label":"高石乡",
"value":"8097",
"childrens":[]}]},

{
"label":"邻水县",
"value":"2019",
"childrens":[{
"label":"鼎屏镇",
"value":"7978",
"childrens":[]},
{
"label":"城北镇",
"value":"7979",
"childrens":[]},
{
"label":"城南镇",
"value":"7980",
"childrens":[]},
{
"label":"柑子镇",
"value":"7981",
"childrens":[]},
{
"label":"龙安镇",
"value":"7982",
"childrens":[]},
{
"label":"观音桥镇",
"value":"7983",
"childrens":[]},
{
"label":"牟家镇",
"value":"7984",
"childrens":[]},
{
"label":"合流镇",
"value":"7985",
"childrens":[]},
{
"label":"坛同镇",
"value":"7986",
"childrens":[]},
{
"label":"高滩镇",
"value":"7987",
"childrens":[]},
{
"label":"九龙镇",
"value":"7988",
"childrens":[]},
{
"label":"御临镇",
"value":"7989",
"childrens":[]},
{
"label":"袁市镇",
"value":"7990",
"childrens":[]},
{
"label":"丰禾镇",
"value":"7991",
"childrens":[]},
{
"label":"八耳镇",
"value":"7992",
"childrens":[]},
{
"label":"石永镇",
"value":"7993",
"childrens":[]},
{
"label":"兴仁镇",
"value":"7994",
"childrens":[]},
{
"label":"王家镇",
"value":"7995",
"childrens":[]},
{
"label":"太和乡",
"value":"7996",
"childrens":[]},
{
"label":"新镇乡",
"value":"7997",
"childrens":[]},
{
"label":"冷家乡",
"value":"7998",
"childrens":[]},
{
"label":"长安乡",
"value":"7999",
"childrens":[]},
{
"label":"西天乡",
"value":"8000",
"childrens":[]},
{
"label":"梁板乡",
"value":"8001",
"childrens":[]},
{
"label":"甘坝乡",
"value":"8002",
"childrens":[]},
{
"label":"四海乡",
"value":"8003",
"childrens":[]},
{
"label":"九峰乡",
"value":"8004",
"childrens":[]},
{
"label":"椿木乡",
"value":"8005",
"childrens":[]},
{
"label":"华蓥乡",
"value":"8006",
"childrens":[]},
{
"label":"子中乡",
"value":"8007",
"childrens":[]},
{
"label":"风垭乡",
"value":"8008",
"childrens":[]},
{
"label":"黎家乡",
"value":"8009",
"childrens":[]},
{
"label":"龙桥乡",
"value":"8010",
"childrens":[]},
{
"label":"关河乡",
"value":"8011",
"childrens":[]},
{
"label":"两河乡",
"value":"8012",
"childrens":[]},
{
"label":"长滩乡",
"value":"8013",
"childrens":[]},
{
"label":"凉山乡",
"value":"8014",
"childrens":[]},
{
"label":"复盛乡",
"value":"8015",
"childrens":[]},
{
"label":"古路乡",
"value":"8016",
"childrens":[]},
{
"label":"荆坪乡",
"value":"8017",
"childrens":[]},
{
"label":"柳塘乡",
"value":"8018",
"childrens":[]},
{
"label":"石滓乡",
"value":"8019",
"childrens":[]},
{
"label":"护邻乡",
"value":"8020",
"childrens":[]},
{
"label":"同石乡",
"value":"8021",
"childrens":[]},
{
"label":"三古乡",
"value":"8022",
"childrens":[]}]},

{
"label":"广安区",
"value":"2020",
"childrens":[{
"label":"浓洄街道",
"value":"7885",
"childrens":[]},
{
"label":"北辰街道",
"value":"7886",
"childrens":[]},
{
"label":"奎阁街道",
"value":"7887",
"childrens":[]},
{
"label":"广福街道",
"value":"7888",
"childrens":[]},
{
"label":"万盛街道",
"value":"7889",
"childrens":[]},
{
"label":"中桥街道",
"value":"7890",
"childrens":[]},
{
"label":"枣山镇",
"value":"7891",
"childrens":[]},
{
"label":"官盛镇",
"value":"7892",
"childrens":[]},
{
"label":"协兴镇",
"value":"7893",
"childrens":[]},
{
"label":"浓溪镇",
"value":"7894",
"childrens":[]},
{
"label":"悦来镇",
"value":"7895",
"childrens":[]},
{
"label":"兴平镇",
"value":"7896",
"childrens":[]},
{
"label":"井河镇",
"value":"7897",
"childrens":[]},
{
"label":"花桥镇",
"value":"7898",
"childrens":[]},
{
"label":"龙台镇",
"value":"7899",
"childrens":[]},
{
"label":"肖溪镇",
"value":"7900",
"childrens":[]},
{
"label":"恒升镇",
"value":"7901",
"childrens":[]},
{
"label":"石笋镇",
"value":"7902",
"childrens":[]},
{
"label":"白市镇",
"value":"7903",
"childrens":[]},
{
"label":"大安镇",
"value":"7904",
"childrens":[]},
{
"label":"观阁镇",
"value":"7905",
"childrens":[]},
{
"label":"广兴镇",
"value":"7906",
"childrens":[]},
{
"label":"前锋镇",
"value":"7907",
"childrens":[]},
{
"label":"桂兴镇",
"value":"7908",
"childrens":[]},
{
"label":"代市镇",
"value":"7909",
"childrens":[]},
{
"label":"观塘镇",
"value":"7910",
"childrens":[]},
{
"label":"护安镇",
"value":"7911",
"childrens":[]},
{
"label":"穿石乡",
"value":"7912",
"childrens":[]},
{
"label":"广门乡",
"value":"7913",
"childrens":[]},
{
"label":"广罗乡",
"value":"7914",
"childrens":[]},
{
"label":"方坪乡",
"value":"7915",
"childrens":[]},
{
"label":"化龙乡",
"value":"7916",
"childrens":[]},
{
"label":"大龙乡",
"value":"7917",
"childrens":[]},
{
"label":"崇望乡",
"value":"7918",
"childrens":[]},
{
"label":"龙安乡",
"value":"7919",
"childrens":[]},
{
"label":"彭家乡",
"value":"7920",
"childrens":[]},
{
"label":"杨坪乡",
"value":"7921",
"childrens":[]},
{
"label":"郑山乡",
"value":"7922",
"childrens":[]},
{
"label":"蒲莲乡",
"value":"7923",
"childrens":[]},
{
"label":"大有乡",
"value":"7924",
"childrens":[]},
{
"label":"消河乡",
"value":"7925",
"childrens":[]},
{
"label":"东岳乡",
"value":"7926",
"childrens":[]},
{
"label":"苏溪乡",
"value":"7927",
"childrens":[]},
{
"label":"白马乡",
"value":"7928",
"childrens":[]},
{
"label":"光辉乡",
"value":"7929",
"childrens":[]},
{
"label":"龙滩乡",
"value":"7930",
"childrens":[]},
{
"label":"小井乡",
"value":"7931",
"childrens":[]},
{
"label":"新桥乡",
"value":"7932",
"childrens":[]},
{
"label":"虎城乡",
"value":"7933",
"childrens":[]}]},

{
"label":"华蓥市",
"value":"2021",
"childrens":[{
"label":"双河街道",
"value":"8023",
"childrens":[]},
{
"label":"古桥街道",
"value":"8024",
"childrens":[]},
{
"label":"华龙街道",
"value":"8025",
"childrens":[]},
{
"label":"天池镇",
"value":"8026",
"childrens":[]},
{
"label":"禄市镇",
"value":"8027",
"childrens":[]},
{
"label":"永兴镇",
"value":"8028",
"childrens":[]},
{
"label":"明月镇",
"value":"8029",
"childrens":[]},
{
"label":"阳和镇",
"value":"8030",
"childrens":[]},
{
"label":"高兴镇",
"value":"8031",
"childrens":[]},
{
"label":"观音溪镇",
"value":"8032",
"childrens":[]},
{
"label":"溪口镇",
"value":"8033",
"childrens":[]},
{
"label":"庆华镇",
"value":"8034",
"childrens":[]},
{
"label":"红岩乡",
"value":"8035",
"childrens":[]}]},

{
"label":"前锋区",
"value":"53296",
"childrens":[]}]},

{
"label":"南充市",
"value":"2022",
"childrens":[{
"label":"仪陇县",
"value":"2028",
"childrens":[]},
{
"label":"蓬安县",
"value":"2029",
"childrens":[]},
{
"label":"营山县",
"value":"2030",
"childrens":[]},
{
"label":"南部县",
"value":"53297",
"childrens":[]},
{
"label":"顺庆区",
"value":"53298",
"childrens":[]},
{
"label":"高坪区",
"value":"53299",
"childrens":[]},
{
"label":"嘉陵区",
"value":"53300",
"childrens":[]},
{
"label":"西充县",
"value":"53301",
"childrens":[]},
{
"label":"阆中市",
"value":"53302",
"childrens":[]}]},

{
"label":"达州市",
"value":"2033",
"childrens":[{
"label":"通川区",
"value":"2034",
"childrens":[{
"label":"东城街道",
"value":"7044",
"childrens":[]},
{
"label":"西城街道",
"value":"7045",
"childrens":[]},
{
"label":"朝阳街道",
"value":"7046",
"childrens":[]},
{
"label":"西外镇",
"value":"7047",
"childrens":[]},
{
"label":"北外镇",
"value":"7048",
"childrens":[]},
{
"label":"罗江镇",
"value":"7049",
"childrens":[]},
{
"label":"蒲家镇",
"value":"7050",
"childrens":[]},
{
"label":"复兴镇",
"value":"7051",
"childrens":[]},
{
"label":"双龙镇",
"value":"7052",
"childrens":[]},
{
"label":"魏兴镇",
"value":"7053",
"childrens":[]},
{
"label":"盘石乡",
"value":"7054",
"childrens":[]},
{
"label":"东岳乡",
"value":"7055",
"childrens":[]},
{
"label":"新村乡",
"value":"7056",
"childrens":[]}]},

{
"label":"达县",
"value":"2035",
"childrens":[{
"label":"南外镇",
"value":"7057",
"childrens":[]},
{
"label":"亭子镇",
"value":"7058",
"childrens":[]},
{
"label":"福善镇",
"value":"7059",
"childrens":[]},
{
"label":"麻柳镇",
"value":"7060",
"childrens":[]},
{
"label":"檀木镇",
"value":"7061",
"childrens":[]},
{
"label":"大树镇",
"value":"7062",
"childrens":[]},
{
"label":"南岳镇",
"value":"7063",
"childrens":[]},
{
"label":"万家镇",
"value":"7064",
"childrens":[]},
{
"label":"景市镇",
"value":"7065",
"childrens":[]},
{
"label":"百节镇",
"value":"7066",
"childrens":[]},
{
"label":"赵家镇",
"value":"7067",
"childrens":[]},
{
"label":"河市镇",
"value":"7068",
"childrens":[]},
{
"label":"石板镇",
"value":"7069",
"childrens":[]},
{
"label":"金垭镇",
"value":"7070",
"childrens":[]},
{
"label":"渡市镇",
"value":"7071",
"childrens":[]},
{
"label":"管村镇",
"value":"7072",
"childrens":[]},
{
"label":"石梯镇",
"value":"7073",
"childrens":[]},
{
"label":"石桥镇",
"value":"7074",
"childrens":[]},
{
"label":"堡子镇",
"value":"7075",
"childrens":[]},
{
"label":"江陵镇",
"value":"7076",
"childrens":[]},
{
"label":"碑庙镇",
"value":"7077",
"childrens":[]},
{
"label":"大风乡",
"value":"7078",
"childrens":[]},
{
"label":"江阳乡",
"value":"7079",
"childrens":[]},
{
"label":"东兴乡",
"value":"7080",
"childrens":[]},
{
"label":"安仁乡",
"value":"7081",
"childrens":[]},
{
"label":"葫芦乡",
"value":"7082",
"childrens":[]},
{
"label":"大滩乡",
"value":"7083",
"childrens":[]},
{
"label":"花红乡",
"value":"7084",
"childrens":[]},
{
"label":"黄庭乡",
"value":"7085",
"childrens":[]},
{
"label":"黄都乡",
"value":"7086",
"childrens":[]},
{
"label":"平滩乡",
"value":"7087",
"childrens":[]},
{
"label":"碑高乡",
"value":"7088",
"childrens":[]},
{
"label":"马家乡",
"value":"7089",
"childrens":[]},
{
"label":"木子乡",
"value":"7090",
"childrens":[]},
{
"label":"双庙乡",
"value":"7091",
"childrens":[]},
{
"label":"斌郎乡",
"value":"7092",
"childrens":[]},
{
"label":"幺塘乡",
"value":"7093",
"childrens":[]},
{
"label":"陈家乡",
"value":"7094",
"childrens":[]},
{
"label":"龙会乡",
"value":"7095",
"childrens":[]},
{
"label":"罐子乡",
"value":"7096",
"childrens":[]},
{
"label":"申家乡",
"value":"7097",
"childrens":[]},
{
"label":"草兴乡",
"value":"7098",
"childrens":[]},
{
"label":"木头乡",
"value":"7099",
"childrens":[]},
{
"label":"金檀乡",
"value":"7100",
"childrens":[]},
{
"label":"大堰乡",
"value":"7101",
"childrens":[]},
{
"label":"赵固乡",
"value":"7102",
"childrens":[]},
{
"label":"九岭乡",
"value":"7103",
"childrens":[]},
{
"label":"桥湾乡",
"value":"7104",
"childrens":[]},
{
"label":"五四乡",
"value":"7105",
"childrens":[]},
{
"label":"银铁乡",
"value":"7106",
"childrens":[]},
{
"label":"沿河乡",
"value":"7107",
"childrens":[]},
{
"label":"香隆乡",
"value":"7108",
"childrens":[]},
{
"label":"永进乡",
"value":"7109",
"childrens":[]},
{
"label":"洛车乡",
"value":"7110",
"childrens":[]},
{
"label":"道让乡",
"value":"7111",
"childrens":[]},
{
"label":"虎让乡",
"value":"7112",
"childrens":[]},
{
"label":"米城乡",
"value":"7113",
"childrens":[]},
{
"label":"龙滩乡",
"value":"7114",
"childrens":[]},
{
"label":"梓桐乡",
"value":"7115",
"childrens":[]},
{
"label":"北山乡",
"value":"7116",
"childrens":[]},
{
"label":"金石乡",
"value":"7117",
"childrens":[]},
{
"label":"安云乡",
"value":"7118",
"childrens":[]},
{
"label":"青宁乡",
"value":"7119",
"childrens":[]},
{
"label":"檬双乡",
"value":"7120",
"childrens":[]}]},

{
"label":"大竹县",
"value":"2036",
"childrens":[{
"label":"竹阳镇",
"value":"7195",
"childrens":[]},
{
"label":"乌木镇",
"value":"7196",
"childrens":[]},
{
"label":"团坝镇",
"value":"7197",
"childrens":[]},
{
"label":"杨家镇",
"value":"7198",
"childrens":[]},
{
"label":"清河镇",
"value":"7199",
"childrens":[]},
{
"label":"柏林镇",
"value":"7200",
"childrens":[]},
{
"label":"石河镇",
"value":"7201",
"childrens":[]},
{
"label":"双拱镇",
"value":"7202",
"childrens":[]},
{
"label":"石桥铺镇",
"value":"7203",
"childrens":[]},
{
"label":"观音镇",
"value":"7204",
"childrens":[]},
{
"label":"周家镇",
"value":"7205",
"childrens":[]},
{
"label":"石子镇",
"value":"7206",
"childrens":[]},
{
"label":"文星镇",
"value":"7207",
"childrens":[]},
{
"label":"妈妈镇",
"value":"7208",
"childrens":[]},
{
"label":"高穴镇",
"value":"7209",
"childrens":[]},
{
"label":"欧家镇",
"value":"7210",
"childrens":[]},
{
"label":"庙坝镇",
"value":"7211",
"childrens":[]},
{
"label":"清水镇",
"value":"7212",
"childrens":[]},
{
"label":"城西乡",
"value":"7213",
"childrens":[]},
{
"label":"竹北乡",
"value":"7214",
"childrens":[]},
{
"label":"东柳乡",
"value":"7215",
"childrens":[]},
{
"label":"朝阳乡",
"value":"7216",
"childrens":[]},
{
"label":"人和乡",
"value":"7217",
"childrens":[]},
{
"label":"中华乡",
"value":"7218",
"childrens":[]},
{
"label":"黄家乡",
"value":"7219",
"childrens":[]},
{
"label":"柏家乡",
"value":"7220",
"childrens":[]},
{
"label":"李家乡",
"value":"7221",
"childrens":[]},
{
"label":"月华乡",
"value":"7222",
"childrens":[]},
{
"label":"二郎乡",
"value":"7223",
"childrens":[]},
{
"label":"蒲包乡",
"value":"7224",
"childrens":[]},
{
"label":"永胜乡",
"value":"7225",
"childrens":[]},
{
"label":"新生乡",
"value":"7226",
"childrens":[]},
{
"label":"安吉乡",
"value":"7227",
"childrens":[]},
{
"label":"白坝乡",
"value":"7228",
"childrens":[]},
{
"label":"双溪乡",
"value":"7229",
"childrens":[]},
{
"label":"高明乡",
"value":"7230",
"childrens":[]},
{
"label":"八渡乡",
"value":"7231",
"childrens":[]},
{
"label":"中和乡",
"value":"7232",
"childrens":[]},
{
"label":"杨通乡",
"value":"7233",
"childrens":[]},
{
"label":"天城乡",
"value":"7234",
"childrens":[]},
{
"label":"四合乡",
"value":"7235",
"childrens":[]},
{
"label":"张家乡",
"value":"7236",
"childrens":[]},
{
"label":"童家乡",
"value":"7237",
"childrens":[]},
{
"label":"神合乡",
"value":"7238",
"childrens":[]},
{
"label":"金鸡乡",
"value":"7239",
"childrens":[]},
{
"label":"黄滩乡",
"value":"7240",
"childrens":[]},
{
"label":"牌坊乡",
"value":"7241",
"childrens":[]},
{
"label":"姚市乡",
"value":"7242",
"childrens":[]},
{
"label":"莲印乡",
"value":"7243",
"childrens":[]},
{
"label":"川主乡",
"value":"7244",
"childrens":[]}]},

{
"label":"渠县",
"value":"2037",
"childrens":[{
"label":"渠江镇",
"value":"7245",
"childrens":[]},
{
"label":"天星镇",
"value":"7246",
"childrens":[]},
{
"label":"临巴镇",
"value":"7247",
"childrens":[]},
{
"label":"土溪镇",
"value":"7248",
"childrens":[]},
{
"label":"三汇镇",
"value":"7249",
"childrens":[]},
{
"label":"文崇镇",
"value":"7250",
"childrens":[]},
{
"label":"涌兴镇",
"value":"7251",
"childrens":[]},
{
"label":"贵福镇",
"value":"7252",
"childrens":[]},
{
"label":"岩峰镇",
"value":"7253",
"childrens":[]},
{
"label":"静边镇",
"value":"7254",
"childrens":[]},
{
"label":"清溪场镇",
"value":"7255",
"childrens":[]},
{
"label":"宝城镇",
"value":"7256",
"childrens":[]},
{
"label":"有庆镇",
"value":"7257",
"childrens":[]},
{
"label":"鲜渡镇",
"value":"7258",
"childrens":[]},
{
"label":"琅琊镇",
"value":"7259",
"childrens":[]},
{
"label":"渠南乡",
"value":"7260",
"childrens":[]},
{
"label":"渠北乡",
"value":"7261",
"childrens":[]},
{
"label":"青龙乡",
"value":"7262",
"childrens":[]},
{
"label":"板桥乡",
"value":"7263",
"childrens":[]},
{
"label":"锡溪乡",
"value":"7264",
"childrens":[]},
{
"label":"龙潭乡",
"value":"7265",
"childrens":[]},
{
"label":"河东乡",
"value":"7266",
"childrens":[]},
{
"label":"李馥乡",
"value":"7267",
"childrens":[]},
{
"label":"青神乡",
"value":"7268",
"childrens":[]},
{
"label":"流溪乡",
"value":"7269",
"childrens":[]},
{
"label":"东安乡",
"value":"7270",
"childrens":[]},
{
"label":"汇东乡",
"value":"7271",
"childrens":[]},
{
"label":"汇南乡",
"value":"7272",
"childrens":[]},
{
"label":"汇北乡",
"value":"7273",
"childrens":[]},
{
"label":"丰乐乡",
"value":"7274",
"childrens":[]},
{
"label":"报恩乡",
"value":"7275",
"childrens":[]},
{
"label":"安北乡",
"value":"7276",
"childrens":[]},
{
"label":"平安乡",
"value":"7277",
"childrens":[]},
{
"label":"千佛乡",
"value":"7278",
"childrens":[]},
{
"label":"柏水乡",
"value":"7279",
"childrens":[]},
{
"label":"大义乡",
"value":"7280",
"childrens":[]},
{
"label":"义和乡",
"value":"7281",
"childrens":[]},
{
"label":"水口乡",
"value":"7282",
"childrens":[]},
{
"label":"三板乡",
"value":"7283",
"childrens":[]},
{
"label":"巨光乡",
"value":"7284",
"childrens":[]},
{
"label":"蔡和乡",
"value":"7285",
"childrens":[]},
{
"label":"鹤林乡",
"value":"7286",
"childrens":[]},
{
"label":"白兔乡",
"value":"7287",
"childrens":[]},
{
"label":"青丝乡",
"value":"7288",
"childrens":[]},
{
"label":"万寿乡",
"value":"7289",
"childrens":[]},
{
"label":"射洪乡",
"value":"7290",
"childrens":[]},
{
"label":"望江乡",
"value":"7291",
"childrens":[]},
{
"label":"和乐乡",
"value":"7292",
"childrens":[]},
{
"label":"龙凤乡",
"value":"7293",
"childrens":[]},
{
"label":"新市乡",
"value":"7294",
"childrens":[]},
{
"label":"宋家乡",
"value":"7295",
"childrens":[]},
{
"label":"拱市乡",
"value":"7296",
"childrens":[]},
{
"label":"中滩乡",
"value":"7297",
"childrens":[]},
{
"label":"屏西乡",
"value":"7298",
"childrens":[]},
{
"label":"定远乡",
"value":"7299",
"childrens":[]},
{
"label":"嘉禾乡",
"value":"7300",
"childrens":[]},
{
"label":"李渡乡",
"value":"7301",
"childrens":[]},
{
"label":"望溪乡",
"value":"7302",
"childrens":[]},
{
"label":"双土乡",
"value":"7303",
"childrens":[]},
{
"label":"卷硐乡",
"value":"7304",
"childrens":[]}]},

{
"label":"万源市",
"value":"2038",
"childrens":[{
"label":"太平镇",
"value":"7305",
"childrens":[]},
{
"label":"青花镇",
"value":"7306",
"childrens":[]},
{
"label":"旧院镇",
"value":"7307",
"childrens":[]},
{
"label":"罗文镇",
"value":"7308",
"childrens":[]},
{
"label":"河口镇",
"value":"7309",
"childrens":[]},
{
"label":"草坝镇",
"value":"7310",
"childrens":[]},
{
"label":"竹峪镇",
"value":"7311",
"childrens":[]},
{
"label":"大竹镇",
"value":"7312",
"childrens":[]},
{
"label":"黄钟镇",
"value":"7313",
"childrens":[]},
{
"label":"官渡镇",
"value":"7314",
"childrens":[]},
{
"label":"白沙镇",
"value":"7315",
"childrens":[]},
{
"label":"沙滩镇",
"value":"7316",
"childrens":[]},
{
"label":"茶垭乡",
"value":"7317",
"childrens":[]},
{
"label":"长石乡",
"value":"7318",
"childrens":[]},
{
"label":"白羊乡",
"value":"7319",
"childrens":[]},
{
"label":"铁矿乡",
"value":"7320",
"childrens":[]},
{
"label":"固军乡",
"value":"7321",
"childrens":[]},
{
"label":"井溪乡",
"value":"7322",
"childrens":[]},
{
"label":"堰塘乡",
"value":"7323",
"childrens":[]},
{
"label":"蜂桶乡",
"value":"7324",
"childrens":[]},
{
"label":"花楼乡",
"value":"7325",
"childrens":[]},
{
"label":"长坝乡",
"value":"7326",
"childrens":[]},
{
"label":"曾家乡",
"value":"7327",
"childrens":[]},
{
"label":"大沙乡",
"value":"7328",
"childrens":[]},
{
"label":"秦河乡",
"value":"7329",
"childrens":[]},
{
"label":"庙垭乡",
"value":"7330",
"childrens":[]},
{
"label":"鹰背乡",
"value":"7331",
"childrens":[]},
{
"label":"石窝乡",
"value":"7332",
"childrens":[]},
{
"label":"玉带乡",
"value":"7333",
"childrens":[]},
{
"label":"新店乡",
"value":"7334",
"childrens":[]},
{
"label":"魏家乡",
"value":"7335",
"childrens":[]},
{
"label":"柳黄乡",
"value":"7336",
"childrens":[]},
{
"label":"溪口乡",
"value":"7337",
"childrens":[]},
{
"label":"永宁乡",
"value":"7338",
"childrens":[]},
{
"label":"虹桥乡",
"value":"7339",
"childrens":[]},
{
"label":"康乐乡",
"value":"7340",
"childrens":[]},
{
"label":"白果乡",
"value":"7341",
"childrens":[]},
{
"label":"钟亭乡",
"value":"7342",
"childrens":[]},
{
"label":"庙子乡",
"value":"7343",
"childrens":[]},
{
"label":"紫溪乡",
"value":"7344",
"childrens":[]},
{
"label":"庙坡乡",
"value":"7345",
"childrens":[]},
{
"label":"梨树乡",
"value":"7346",
"childrens":[]},
{
"label":"皮窝乡",
"value":"7347",
"childrens":[]},
{
"label":"丝罗乡",
"value":"7348",
"childrens":[]},
{
"label":"罐坝乡",
"value":"7349",
"childrens":[]},
{
"label":"石人乡",
"value":"7350",
"childrens":[]},
{
"label":"赵塘乡",
"value":"7351",
"childrens":[]},
{
"label":"中坪乡",
"value":"7352",
"childrens":[]},
{
"label":"八台乡",
"value":"7353",
"childrens":[]},
{
"label":"花萼乡",
"value":"7354",
"childrens":[]},
{
"label":"曹家乡",
"value":"7355",
"childrens":[]},
{
"label":"石塘乡",
"value":"7356",
"childrens":[]}]},

{
"label":"宣汉县",
"value":"2039",
"childrens":[{
"label":"东乡镇",
"value":"7121",
"childrens":[]},
{
"label":"君塘镇",
"value":"7122",
"childrens":[]},
{
"label":"清溪镇",
"value":"7123",
"childrens":[]},
{
"label":"普光镇",
"value":"7124",
"childrens":[]},
{
"label":"天生镇",
"value":"7125",
"childrens":[]},
{
"label":"柏树镇",
"value":"7126",
"childrens":[]},
{
"label":"芭蕉镇",
"value":"7127",
"childrens":[]},
{
"label":"南坝镇",
"value":"7128",
"childrens":[]},
{
"label":"五宝镇",
"value":"7129",
"childrens":[]},
{
"label":"峰城镇",
"value":"7130",
"childrens":[]},
{
"label":"土黄镇",
"value":"7131",
"childrens":[]},
{
"label":"华景镇",
"value":"7132",
"childrens":[]},
{
"label":"樊哙镇",
"value":"7133",
"childrens":[]},
{
"label":"新华镇",
"value":"7134",
"childrens":[]},
{
"label":"黄金镇",
"value":"7135",
"childrens":[]},
{
"label":"胡家镇",
"value":"7136",
"childrens":[]},
{
"label":"毛坝镇",
"value":"7137",
"childrens":[]},
{
"label":"双河镇",
"value":"7138",
"childrens":[]},
{
"label":"大成镇",
"value":"7139",
"childrens":[]},
{
"label":"明月乡",
"value":"7140",
"childrens":[]},
{
"label":"红岭乡",
"value":"7141",
"childrens":[]},
{
"label":"柳池乡",
"value":"7142",
"childrens":[]},
{
"label":"三河乡",
"value":"7143",
"childrens":[]},
{
"label":"老君乡",
"value":"7144",
"childrens":[]},
{
"label":"黄石乡",
"value":"7145",
"childrens":[]},
{
"label":"七里乡",
"value":"7146",
"childrens":[]},
{
"label":"庙安乡",
"value":"7147",
"childrens":[]},
{
"label":"天宝乡",
"value":"7148",
"childrens":[]},
{
"label":"东林乡",
"value":"7149",
"childrens":[]},
{
"label":"下八乡",
"value":"7150",
"childrens":[]},
{
"label":"凉风乡",
"value":"7151",
"childrens":[]},
{
"label":"上峡乡",
"value":"7152",
"childrens":[]},
{
"label":"塔河乡",
"value":"7153",
"childrens":[]},
{
"label":"茶河乡",
"value":"7154",
"childrens":[]},
{
"label":"天台乡",
"value":"7155",
"childrens":[]},
{
"label":"观山乡",
"value":"7156",
"childrens":[]},
{
"label":"南坪乡",
"value":"7157",
"childrens":[]},
{
"label":"凤林乡",
"value":"7158",
"childrens":[]},
{
"label":"桃花乡",
"value":"7159",
"childrens":[]},
{
"label":"白马乡",
"value":"7160",
"childrens":[]},
{
"label":"漆碑乡",
"value":"7161",
"childrens":[]},
{
"label":"三墩土家族乡",
"value":"7162",
"childrens":[]},
{
"label":"漆树土家族乡",
"value":"7163",
"childrens":[]},
{
"label":"龙泉土家族乡",
"value":"7164",
"childrens":[]},
{
"label":"渡口土家族乡",
"value":"7165",
"childrens":[]},
{
"label":"石铁乡",
"value":"7166",
"childrens":[]},
{
"label":"厂溪乡",
"value":"7167",
"childrens":[]},
{
"label":"红峰乡",
"value":"7168",
"childrens":[]},
{
"label":"凤鸣乡",
"value":"7169",
"childrens":[]},
{
"label":"花池乡",
"value":"7170",
"childrens":[]},
{
"label":"土主乡",
"value":"7171",
"childrens":[]},
{
"label":"庆云乡",
"value":"7172",
"childrens":[]},
{
"label":"马渡乡",
"value":"7173",
"childrens":[]},
{
"label":"隘口乡",
"value":"7174",
"childrens":[]}]},

{
"label":"开江县",
"value":"2040",
"childrens":[{
"label":"新宁镇",
"value":"7175",
"childrens":[]},
{
"label":"普安镇",
"value":"7176",
"childrens":[]},
{
"label":"回龙镇",
"value":"7177",
"childrens":[]},
{
"label":"天师镇",
"value":"7178",
"childrens":[]},
{
"label":"永兴镇",
"value":"7179",
"childrens":[]},
{
"label":"讲治镇",
"value":"7180",
"childrens":[]},
{
"label":"甘棠镇",
"value":"7181",
"childrens":[]},
{
"label":"任市镇",
"value":"7182",
"childrens":[]},
{
"label":"广福镇",
"value":"7183",
"childrens":[]},
{
"label":"长岭镇",
"value":"7184",
"childrens":[]},
{
"label":"长田乡",
"value":"7185",
"childrens":[]},
{
"label":"骑龙乡",
"value":"7186",
"childrens":[]},
{
"label":"新太乡",
"value":"7187",
"childrens":[]},
{
"label":"灵岩乡",
"value":"7188",
"childrens":[]},
{
"label":"沙坝场乡",
"value":"7189",
"childrens":[]},
{
"label":"梅家乡",
"value":"7190",
"childrens":[]},
{
"label":"宝石乡",
"value":"7191",
"childrens":[]},
{
"label":"靖安乡",
"value":"7192",
"childrens":[]},
{
"label":"新街乡",
"value":"7193",
"childrens":[]},
{
"label":"拔妙乡",
"value":"7194",
"childrens":[]}]}]},


{
"label":"巴中市",
"value":"2042",
"childrens":[{
"label":"南江县",
"value":"2044",
"childrens":[]},
{
"label":"平昌县",
"value":"2045",
"childrens":[]},
{
"label":"通江县",
"value":"2046",
"childrens":[]},
{
"label":"巴州区",
"value":"3904",
"childrens":[]},
{
"label":"恩阳区",
"value":"53303",
"childrens":[]}]},

{
"label":"雅安市",
"value":"2047",
"childrens":[{
"label":"芦山县",
"value":"2049",
"childrens":[]},
{
"label":"石棉县",
"value":"2052",
"childrens":[]},
{
"label":"名山区",
"value":"2053",
"childrens":[]},
{
"label":"天全县",
"value":"2054",
"childrens":[]},
{
"label":"荥经县",
"value":"2055",
"childrens":[]},
{
"label":"汉源县",
"value":"2056",
"childrens":[]},
{
"label":"宝兴县",
"value":"2057",
"childrens":[]},
{
"label":"雨城区",
"value":"53304",
"childrens":[]}]},

{
"label":"眉山市",
"value":"2058",
"childrens":[{
"label":"仁寿县",
"value":"2060",
"childrens":[]},
{
"label":"彭山县",
"value":"2061",
"childrens":[]},
{
"label":"洪雅县",
"value":"2062",
"childrens":[]},
{
"label":"丹棱县",
"value":"2063",
"childrens":[]},
{
"label":"青神县",
"value":"2064",
"childrens":[]},
{
"label":"东坡区",
"value":"53305",
"childrens":[]}]},

{
"label":"资阳市",
"value":"2065",
"childrens":[{
"label":"安岳县",
"value":"2068",
"childrens":[]},
{
"label":"乐至县",
"value":"2069",
"childrens":[]},
{
"label":"雁江区",
"value":"3905",
"childrens":[]},
{
"label":"简阳市",
"value":"53306",
"childrens":[]}]},

{
"label":"阿坝州",
"value":"2070",
"childrens":[{
"label":"马尔康县",
"value":"2071",
"childrens":[]},
{
"label":"九寨沟县",
"value":"2072",
"childrens":[]},
{
"label":"红原县",
"value":"2073",
"childrens":[]},
{
"label":"阿坝县",
"value":"2075",
"childrens":[]},
{
"label":"理县",
"value":"2076",
"childrens":[]},
{
"label":"若尔盖县",
"value":"2077",
"childrens":[]},
{
"label":"金川县",
"value":"2078",
"childrens":[]},
{
"label":"小金县",
"value":"2079",
"childrens":[]},
{
"label":"黑水县",
"value":"2080",
"childrens":[]},
{
"label":"松潘县",
"value":"2081",
"childrens":[]},
{
"label":"壤塘县",
"value":"2082",
"childrens":[]},
{
"label":"茂县",
"value":"2083",
"childrens":[]},
{
"label":"汶川县",
"value":"53307",
"childrens":[]}]},

{
"label":"甘孜州",
"value":"2084",
"childrens":[{
"label":"康定县",
"value":"2085",
"childrens":[]},
{
"label":"泸定县",
"value":"2086",
"childrens":[]},
{
"label":"九龙县",
"value":"2087",
"childrens":[]},
{
"label":"丹巴县",
"value":"2088",
"childrens":[]},
{
"label":"道孚县",
"value":"2089",
"childrens":[]},
{
"label":"炉霍县",
"value":"2090",
"childrens":[]},
{
"label":"色达县",
"value":"2091",
"childrens":[]},
{
"label":"甘孜县",
"value":"2092",
"childrens":[]},
{
"label":"新龙县",
"value":"2093",
"childrens":[]},
{
"label":"白玉县",
"value":"2094",
"childrens":[]},
{
"label":"德格县",
"value":"2095",
"childrens":[]},
{
"label":"石渠县",
"value":"2096",
"childrens":[]},
{
"label":"雅江县",
"value":"2097",
"childrens":[]},
{
"label":"理塘县",
"value":"2098",
"childrens":[]},
{
"label":"巴塘县",
"value":"2099",
"childrens":[]},
{
"label":"稻城县",
"value":"2100",
"childrens":[]},
{
"label":"乡城县",
"value":"2101",
"childrens":[]},
{
"label":"得荣县",
"value":"2102",
"childrens":[]}]},

{
"label":"凉山州",
"value":"2103",
"childrens":[{
"label":"美姑县",
"value":"2105",
"childrens":[]},
{
"label":"昭觉县",
"value":"2106",
"childrens":[]},
{
"label":"会理县",
"value":"2107",
"childrens":[]},
{
"label":"会东县",
"value":"2108",
"childrens":[]},
{
"label":"普格县",
"value":"2109",
"childrens":[]},
{
"label":"宁南县",
"value":"2110",
"childrens":[]},
{
"label":"德昌县",
"value":"2111",
"childrens":[]},
{
"label":"冕宁县",
"value":"2112",
"childrens":[]},
{
"label":"盐源县",
"value":"2113",
"childrens":[]},
{
"label":"金阳县",
"value":"2114",
"childrens":[]},
{
"label":"布拖县",
"value":"2115",
"childrens":[]},
{
"label":"雷波县",
"value":"2116",
"childrens":[]},
{
"label":"越西县",
"value":"2117",
"childrens":[]},
{
"label":"喜德县",
"value":"2118",
"childrens":[]},
{
"label":"甘洛县",
"value":"2119",
"childrens":[]},
{
"label":"木里县",
"value":"2120",
"childrens":[]},
{
"label":"西昌市",
"value":"53308",
"childrens":[]}]}]},


{
"label":"海南",
"value":"23",
"childrens":[{
"label":"海口市",
"value":"2121",
"childrens":[{
"label":"秀英区",
"value":"53309",
"childrens":[]},
{
"label":"龙华区",
"value":"53310",
"childrens":[]},
{
"label":"琼山区",
"value":"53311",
"childrens":[]},
{
"label":"美兰区",
"value":"53312",
"childrens":[]}]},

{
"label":"儋州市",
"value":"3034",
"childrens":[{
"label":"那大镇",
"value":"3125",
"childrens":[]},
{
"label":"和庆镇",
"value":"3733",
"childrens":[]},
{
"label":"南丰镇",
"value":"3734",
"childrens":[]},
{
"label":"大成镇",
"value":"3735",
"childrens":[]},
{
"label":"雅星镇",
"value":"3736",
"childrens":[]},
{
"label":"兰洋镇",
"value":"3737",
"childrens":[]},
{
"label":"光村镇",
"value":"3738",
"childrens":[]},
{
"label":"木棠镇",
"value":"3739",
"childrens":[]},
{
"label":"海头镇",
"value":"3740",
"childrens":[]},
{
"label":"峨蔓镇",
"value":"3741",
"childrens":[]},
{
"label":"三都镇",
"value":"3744",
"childrens":[]},
{
"label":"王五镇",
"value":"3745",
"childrens":[]},
{
"label":"白马井镇",
"value":"3746",
"childrens":[]},
{
"label":"中和镇",
"value":"3747",
"childrens":[]},
{
"label":"排浦镇",
"value":"3748",
"childrens":[]},
{
"label":"东成镇",
"value":"3749",
"childrens":[]},
{
"label":"新州镇",
"value":"3750",
"childrens":[]},
{
"label":"洋浦经济开发区",
"value":"3751",
"childrens":[]},
{
"label":"富克镇",
"value":"4214",
"childrens":[]},
{
"label":"西培农场",
"value":"53313",
"childrens":[]},
{
"label":"西联农场",
"value":"53314",
"childrens":[]},
{
"label":"蓝洋农场",
"value":"53315",
"childrens":[]},
{
"label":"八一农场",
"value":"53316",
"childrens":[]},
{
"label":"西华农场",
"value":"53317",
"childrens":[]},
{
"label":"西庆农场",
"value":"53318",
"childrens":[]},
{
"label":"西流农场",
"value":"53319",
"childrens":[]},
{
"label":"新盈农场",
"value":"53320",
"childrens":[]},
{
"label":"龙山农场",
"value":"53321",
"childrens":[]},
{
"label":"红岭农场",
"value":"53322",
"childrens":[]},
{
"label":"热作学院",
"value":"53323",
"childrens":[]}]},

{
"label":"琼海市",
"value":"3115",
"childrens":[{
"label":"嘉积镇",
"value":"3720",
"childrens":[]},
{
"label":"万泉镇",
"value":"3721",
"childrens":[]},
{
"label":"石壁镇",
"value":"3722",
"childrens":[]},
{
"label":"中原镇",
"value":"3723",
"childrens":[]},
{
"label":"博鳌镇",
"value":"3724",
"childrens":[]},
{
"label":"阳江镇",
"value":"3725",
"childrens":[]},
{
"label":"龙江镇",
"value":"3727",
"childrens":[]},
{
"label":"潭门镇",
"value":"3728",
"childrens":[]},
{
"label":"塔洋镇",
"value":"3729",
"childrens":[]},
{
"label":"长坡镇",
"value":"3730",
"childrens":[]},
{
"label":"大路镇",
"value":"3731",
"childrens":[]},
{
"label":"会山镇",
"value":"3732",
"childrens":[]},
{
"label":"彬村山华侨农场",
"value":"53324",
"childrens":[]},
{
"label":"东太农场",
"value":"53325",
"childrens":[]},
{
"label":"东红农场",
"value":"53326",
"childrens":[]},
{
"label":"东升农场",
"value":"53327",
"childrens":[]},
{
"label":"南俸农场",
"value":"53328",
"childrens":[]}]},

{
"label":"万宁市",
"value":"3137",
"childrens":[{
"label":"万城镇",
"value":"3768",
"childrens":[]},
{
"label":"龙滚镇",
"value":"3769",
"childrens":[]},
{
"label":"和乐镇",
"value":"3770",
"childrens":[]},
{
"label":"后安镇",
"value":"3771",
"childrens":[]},
{
"label":"大茂镇",
"value":"3772",
"childrens":[]},
{
"label":"东澳镇",
"value":"3773",
"childrens":[]},
{
"label":"礼纪镇",
"value":"3774",
"childrens":[]},
{
"label":"长丰镇",
"value":"3775",
"childrens":[]},
{
"label":"山根镇",
"value":"3776",
"childrens":[]},
{
"label":"北大镇",
"value":"3777",
"childrens":[]},
{
"label":"南桥镇",
"value":"3778",
"childrens":[]},
{
"label":"三更罗镇",
"value":"3779",
"childrens":[]},
{
"label":"六连林场",
"value":"53329",
"childrens":[]},
{
"label":"东兴农场",
"value":"53330",
"childrens":[]},
{
"label":"东和农场",
"value":"53331",
"childrens":[]},
{
"label":"新中农场",
"value":"53332",
"childrens":[]},
{
"label":"兴隆华侨农场",
"value":"53333",
"childrens":[]},
{
"label":"兴隆镇",
"value":"53334",
"childrens":[]},
{
"label":"南林农场",
"value":"53335",
"childrens":[]}]},

{
"label":"东方市",
"value":"3173",
"childrens":[{
"label":"八所镇",
"value":"3780",
"childrens":[]},
{
"label":"东河镇",
"value":"3781",
"childrens":[]},
{
"label":"大田镇",
"value":"3782",
"childrens":[]},
{
"label":"感城镇",
"value":"3783",
"childrens":[]},
{
"label":"板桥镇",
"value":"3784",
"childrens":[]},
{
"label":"三家镇",
"value":"3785",
"childrens":[]},
{
"label":"四更镇",
"value":"3786",
"childrens":[]},
{
"label":"新龙镇",
"value":"3787",
"childrens":[]},
{
"label":"天安乡",
"value":"3788",
"childrens":[]},
{
"label":"江边乡",
"value":"3789",
"childrens":[]},
{
"label":"广坝农场",
"value":"53336",
"childrens":[]},
{
"label":"东方华侨农场",
"value":"53337",
"childrens":[]}]},

{
"label":"三亚市",
"value":"3690",
"childrens":[{
"label":"海棠区",
"value":"3693",
"childrens":[]},
{
"label":"吉阳区",
"value":"3694",
"childrens":[]},
{
"label":"天涯区",
"value":"3696",
"childrens":[]},
{
"label":"崖州区",
"value":"3697",
"childrens":[]}]},

{
"label":"文昌市",
"value":"3698",
"childrens":[{
"label":"文城镇",
"value":"3752",
"childrens":[]},
{
"label":"重兴镇",
"value":"3753",
"childrens":[]},
{
"label":"蓬莱镇",
"value":"3754",
"childrens":[]},
{
"label":"会文镇",
"value":"3755",
"childrens":[]},
{
"label":"东路镇",
"value":"3756",
"childrens":[]},
{
"label":"潭牛镇",
"value":"3757",
"childrens":[]},
{
"label":"东阁镇",
"value":"3758",
"childrens":[]},
{
"label":"文教镇",
"value":"3759",
"childrens":[]},
{
"label":"东郊镇",
"value":"3760",
"childrens":[]},
{
"label":"龙楼镇",
"value":"3761",
"childrens":[]},
{
"label":"昌洒镇",
"value":"3762",
"childrens":[]},
{
"label":"翁田镇",
"value":"3763",
"childrens":[]},
{
"label":"抱罗镇",
"value":"3764",
"childrens":[]},
{
"label":"冯坡镇",
"value":"3765",
"childrens":[]},
{
"label":"锦山镇",
"value":"3766",
"childrens":[]},
{
"label":"铺前镇",
"value":"3767",
"childrens":[]},
{
"label":"公坡镇",
"value":"53338",
"childrens":[]},
{
"label":"迈号镇",
"value":"53339",
"childrens":[]},
{
"label":"清谰镇",
"value":"53340",
"childrens":[]},
{
"label":"南阳镇",
"value":"53341",
"childrens":[]},
{
"label":"新桥镇",
"value":"53342",
"childrens":[]},
{
"label":"头苑镇",
"value":"53343",
"childrens":[]},
{
"label":"宝芳乡",
"value":"53344",
"childrens":[]},
{
"label":"龙马乡",
"value":"53345",
"childrens":[]},
{
"label":"湖山乡",
"value":"53346",
"childrens":[]},
{
"label":"东路农场",
"value":"53347",
"childrens":[]},
{
"label":"南阳农场",
"value":"53348",
"childrens":[]},
{
"label":"罗豆农场",
"value":"53349",
"childrens":[]},
{
"label":"橡胶研究所",
"value":"53350",
"childrens":[]}]},

{
"label":"五指山市",
"value":"3699",
"childrens":[{
"label":"通什镇",
"value":"3712",
"childrens":[]},
{
"label":"南圣镇",
"value":"3713",
"childrens":[]},
{
"label":"毛阳镇",
"value":"3714",
"childrens":[]},
{
"label":"番阳镇",
"value":"3715",
"childrens":[]},
{
"label":"畅好乡",
"value":"3716",
"childrens":[]},
{
"label":"毛道乡",
"value":"3717",
"childrens":[]},
{
"label":"水满乡",
"value":"3719",
"childrens":[]},
{
"label":"畅好农场",
"value":"53351",
"childrens":[]}]},

{
"label":"临高县",
"value":"3701",
"childrens":[{
"label":"临城镇",
"value":"3790",
"childrens":[]},
{
"label":"波莲镇",
"value":"3791",
"childrens":[]},
{
"label":"东英镇",
"value":"3792",
"childrens":[]},
{
"label":"博厚镇",
"value":"3793",
"childrens":[]},
{
"label":"皇桐镇",
"value":"3794",
"childrens":[]},
{
"label":"多文镇",
"value":"3795",
"childrens":[]},
{
"label":"和舍镇",
"value":"3796",
"childrens":[]},
{
"label":"南宝镇",
"value":"3797",
"childrens":[]},
{
"label":"新盈镇",
"value":"3798",
"childrens":[]},
{
"label":"调楼镇",
"value":"3799",
"childrens":[]},
{
"label":"加来镇",
"value":"3800",
"childrens":[]},
{
"label":"红华农场",
"value":"53352",
"childrens":[]},
{
"label":"加来农场",
"value":"53353",
"childrens":[]},
{
"label":"城区",
"value":"53354",
"childrens":[]}]},

{
"label":"澄迈县",
"value":"3702",
"childrens":[{
"label":"金江镇",
"value":"3801",
"childrens":[]},
{
"label":"老城镇",
"value":"3802",
"childrens":[]},
{
"label":"瑞溪镇",
"value":"3803",
"childrens":[]},
{
"label":"永发镇",
"value":"3804",
"childrens":[]},
{
"label":"加乐镇",
"value":"3805",
"childrens":[]},
{
"label":"文儒镇",
"value":"3806",
"childrens":[]},
{
"label":"中兴镇",
"value":"3807",
"childrens":[]},
{
"label":"仁兴镇",
"value":"3808",
"childrens":[]},
{
"label":"福山镇",
"value":"3809",
"childrens":[]},
{
"label":"桥头镇",
"value":"3810",
"childrens":[]},
{
"label":"大丰镇",
"value":"53355",
"childrens":[]},
{
"label":"红光农场",
"value":"53356",
"childrens":[]},
{
"label":"西达农场",
"value":"53357",
"childrens":[]},
{
"label":"金安农场",
"value":"53358",
"childrens":[]},
{
"label":"城区",
"value":"53359",
"childrens":[]}]},

{
"label":"定安县",
"value":"3703",
"childrens":[{
"label":"定城镇",
"value":"3811",
"childrens":[]},
{
"label":"新竹镇",
"value":"3812",
"childrens":[]},
{
"label":"龙湖镇",
"value":"3813",
"childrens":[]},
{
"label":"雷鸣镇",
"value":"3814",
"childrens":[]},
{
"label":"龙门镇",
"value":"3815",
"childrens":[]},
{
"label":"龙河镇",
"value":"3816",
"childrens":[]},
{
"label":"岭口镇",
"value":"3817",
"childrens":[]},
{
"label":"翰林镇",
"value":"3818",
"childrens":[]},
{
"label":"富文镇",
"value":"3819",
"childrens":[]},
{
"label":"黄竹镇",
"value":"4498",
"childrens":[]},
{
"label":"金鸡岭农场",
"value":"53361",
"childrens":[]},
{
"label":"中瑞农场",
"value":"53362",
"childrens":[]},
{
"label":"南海农场",
"value":"53363",
"childrens":[]},
{
"label":"城区",
"value":"53364",
"childrens":[]}]},

{
"label":"屯昌县",
"value":"3704",
"childrens":[{
"label":"屯城镇",
"value":"3820",
"childrens":[]},
{
"label":"新兴镇",
"value":"3821",
"childrens":[]},
{
"label":"枫木镇",
"value":"3822",
"childrens":[]},
{
"label":"乌坡镇",
"value":"3823",
"childrens":[]},
{
"label":"南吕镇",
"value":"3824",
"childrens":[]},
{
"label":"南坤镇",
"value":"3825",
"childrens":[]},
{
"label":"坡心镇",
"value":"3826",
"childrens":[]},
{
"label":"西昌镇",
"value":"3827",
"childrens":[]},
{
"label":"中建农场",
"value":"53365",
"childrens":[]},
{
"label":"中坤农场",
"value":"53366",
"childrens":[]},
{
"label":"县城内",
"value":"53367",
"childrens":[]}]},

{
"label":"昌江县",
"value":"3705",
"childrens":[{
"label":"石碌镇",
"value":"3828",
"childrens":[]},
{
"label":"叉河镇",
"value":"3829",
"childrens":[]},
{
"label":"十月田镇",
"value":"3830",
"childrens":[]},
{
"label":"乌烈镇",
"value":"3831",
"childrens":[]},
{
"label":"昌化镇",
"value":"3832",
"childrens":[]},
{
"label":"海尾镇",
"value":"3833",
"childrens":[]},
{
"label":"七叉镇",
"value":"53368",
"childrens":[]},
{
"label":"王下乡",
"value":"53369",
"childrens":[]},
{
"label":"海南矿业公司",
"value":"53370",
"childrens":[]},
{
"label":"霸王岭林场",
"value":"53371",
"childrens":[]},
{
"label":"红林农场",
"value":"53372",
"childrens":[]},
{
"label":"城区",
"value":"53373",
"childrens":[]}]},

{
"label":"白沙县",
"value":"3706",
"childrens":[{
"label":"牙叉镇",
"value":"3834",
"childrens":[]},
{
"label":"七坊镇",
"value":"3835",
"childrens":[]},
{
"label":"邦溪镇",
"value":"3836",
"childrens":[]},
{
"label":"打安镇",
"value":"3837",
"childrens":[]},
{
"label":"细水乡",
"value":"3838",
"childrens":[]},
{
"label":"元门乡",
"value":"3839",
"childrens":[]},
{
"label":"南开乡",
"value":"3840",
"childrens":[]},
{
"label":"阜龙乡",
"value":"3841",
"childrens":[]},
{
"label":"青松乡",
"value":"3842",
"childrens":[]},
{
"label":"金波乡",
"value":"3843",
"childrens":[]},
{
"label":"荣邦乡",
"value":"3844",
"childrens":[]},
{
"label":"白沙农场",
"value":"53374",
"childrens":[]},
{
"label":"龙江农场",
"value":"53375",
"childrens":[]},
{
"label":"邦溪农场",
"value":"53376",
"childrens":[]},
{
"label":"城区",
"value":"53377",
"childrens":[]}]},

{
"label":"琼中县",
"value":"3707",
"childrens":[{
"label":"营根镇",
"value":"3878",
"childrens":[]},
{
"label":"湾岭镇",
"value":"3879",
"childrens":[]},
{
"label":"黎母山镇",
"value":"3880",
"childrens":[]},
{
"label":"和平镇",
"value":"3881",
"childrens":[]},
{
"label":"长征镇",
"value":"3882",
"childrens":[]},
{
"label":"红毛镇",
"value":"3883",
"childrens":[]},
{
"label":"中平镇",
"value":"3884",
"childrens":[]},
{
"label":"上安乡",
"value":"3885",
"childrens":[]},
{
"label":"什运乡",
"value":"3886",
"childrens":[]},
{
"label":"吊罗山乡",
"value":"53378",
"childrens":[]},
{
"label":"黎母山林业公司",
"value":"53379",
"childrens":[]},
{
"label":"阳江农场",
"value":"53380",
"childrens":[]},
{
"label":"乌石农场",
"value":"53381",
"childrens":[]},
{
"label":"加钗农场",
"value":"53382",
"childrens":[]},
{
"label":"长征农场",
"value":"53383",
"childrens":[]},
{
"label":"城区",
"value":"53384",
"childrens":[]}]},

{
"label":"陵水县",
"value":"3708",
"childrens":[{
"label":"椰林镇",
"value":"3858",
"childrens":[]},
{
"label":"光坡镇",
"value":"3859",
"childrens":[]},
{
"label":"三才镇",
"value":"3860",
"childrens":[]},
{
"label":"英州镇",
"value":"3861",
"childrens":[]},
{
"label":"隆广镇",
"value":"3862",
"childrens":[]},
{
"label":"文罗镇",
"value":"3863",
"childrens":[]},
{
"label":"本号镇",
"value":"3864",
"childrens":[]},
{
"label":"新村镇",
"value":"3865",
"childrens":[]},
{
"label":"黎安镇",
"value":"3866",
"childrens":[]},
{
"label":"提蒙乡",
"value":"3867",
"childrens":[]},
{
"label":"群英乡",
"value":"3868",
"childrens":[]},
{
"label":"吊罗山林业公司",
"value":"53385",
"childrens":[]},
{
"label":"岭门农场",
"value":"53386",
"childrens":[]},
{
"label":"南平农场",
"value":"53387",
"childrens":[]},
{
"label":"城区",
"value":"53388",
"childrens":[]},
{
"label":"东华镇",
"value":"53389",
"childrens":[]},
{
"label":"南平镇",
"value":"53390",
"childrens":[]}]},

{
"label":"保亭县",
"value":"3709",
"childrens":[{
"label":"保城镇",
"value":"3869",
"childrens":[]},
{
"label":"什玲镇",
"value":"3870",
"childrens":[]},
{
"label":"加茂镇",
"value":"3871",
"childrens":[]},
{
"label":"响水镇",
"value":"3872",
"childrens":[]},
{
"label":"新政镇",
"value":"3873",
"childrens":[]},
{
"label":"三道镇",
"value":"3874",
"childrens":[]},
{
"label":"六弓乡",
"value":"3875",
"childrens":[]},
{
"label":"南林乡",
"value":"3876",
"childrens":[]},
{
"label":"毛感乡",
"value":"3877",
"childrens":[]},
{
"label":"保亭研究所",
"value":"53391",
"childrens":[]},
{
"label":"新星农场",
"value":"53392",
"childrens":[]},
{
"label":"金江农场",
"value":"53393",
"childrens":[]},
{
"label":"三道农场",
"value":"53394",
"childrens":[]}]},

{
"label":"乐东县",
"value":"3710",
"childrens":[{
"label":"抱由镇",
"value":"3845",
"childrens":[]},
{
"label":"万冲镇",
"value":"3846",
"childrens":[]},
{
"label":"大安镇",
"value":"3847",
"childrens":[]},
{
"label":"志仲镇",
"value":"3849",
"childrens":[]},
{
"label":"千家镇",
"value":"3851",
"childrens":[]},
{
"label":"九所镇",
"value":"3852",
"childrens":[]},
{
"label":"利国镇",
"value":"3853",
"childrens":[]},
{
"label":"黄流镇",
"value":"3854",
"childrens":[]},
{
"label":"佛罗镇",
"value":"3855",
"childrens":[]},
{
"label":"尖峰镇",
"value":"3856",
"childrens":[]},
{
"label":"莺歌海镇",
"value":"3857",
"childrens":[]},
{
"label":"尖峰岭林业公司",
"value":"53395",
"childrens":[]},
{
"label":"莺歌海盐场",
"value":"53396",
"childrens":[]},
{
"label":"山荣农场",
"value":"53397",
"childrens":[]},
{
"label":"乐光农场",
"value":"53398",
"childrens":[]},
{
"label":"保国农场",
"value":"53399",
"childrens":[]},
{
"label":"城区",
"value":"53400",
"childrens":[]}]},

{
"label":"三沙市",
"value":"3711",
"childrens":[{
"label":"西沙群岛",
"value":"3887",
"childrens":[]},
{
"label":"南沙群岛",
"value":"3888",
"childrens":[]},
{
"label":"中沙群岛",
"value":"53401",
"childrens":[]}]}]},


{
"label":"贵州",
"value":"24",
"childrens":[{
"label":"贵阳市",
"value":"2144",
"childrens":[{
"label":"清镇市",
"value":"2145",
"childrens":[]},
{
"label":"开阳县",
"value":"2146",
"childrens":[]},
{
"label":"修文县",
"value":"2147",
"childrens":[]},
{
"label":"息烽县",
"value":"2148",
"childrens":[]},
{
"label":"乌当区",
"value":"2149",
"childrens":[]},
{
"label":"南明区",
"value":"3906",
"childrens":[]},
{
"label":"白云区",
"value":"3909",
"childrens":[]},
{
"label":"云岩区",
"value":"53723",
"childrens":[]},
{
"label":"花溪区",
"value":"53724",
"childrens":[]},
{
"label":"小河区",
"value":"53725",
"childrens":[]},
{
"label":"观山湖区",
"value":"53726",
"childrens":[]}]},

{
"label":"六盘水市",
"value":"2150",
"childrens":[{
"label":"盘县",
"value":"2151",
"childrens":[{
"label":"红果镇",
"value":"8569",
"childrens":[]},
{
"label":"城关镇",
"value":"8570",
"childrens":[]},
{
"label":"板桥镇",
"value":"8571",
"childrens":[]},
{
"label":"水塘镇",
"value":"8572",
"childrens":[]},
{
"label":"民主镇",
"value":"8573",
"childrens":[]},
{
"label":"大山镇",
"value":"8574",
"childrens":[]},
{
"label":"保田镇",
"value":"8575",
"childrens":[]},
{
"label":"老厂镇",
"value":"8576",
"childrens":[]},
{
"label":"玛依镇",
"value":"8577",
"childrens":[]},
{
"label":"石桥镇",
"value":"8578",
"childrens":[]},
{
"label":"平关镇",
"value":"8579",
"childrens":[]},
{
"label":"响水镇",
"value":"8580",
"childrens":[]},
{
"label":"火铺镇",
"value":"8581",
"childrens":[]},
{
"label":"乐民镇",
"value":"8582",
"childrens":[]},
{
"label":"西冲镇",
"value":"8583",
"childrens":[]},
{
"label":"断江镇",
"value":"8584",
"childrens":[]},
{
"label":"盘江镇",
"value":"8585",
"childrens":[]},
{
"label":"柏果镇",
"value":"8586",
"childrens":[]},
{
"label":"洒基镇",
"value":"8587",
"childrens":[]},
{
"label":"刘官镇",
"value":"8588",
"childrens":[]},
{
"label":"忠义乡",
"value":"8589",
"childrens":[]},
{
"label":"新民乡",
"value":"8590",
"childrens":[]},
{
"label":"普田乡",
"value":"8591",
"childrens":[]},
{
"label":"珠东乡",
"value":"8592",
"childrens":[]},
{
"label":"两河乡",
"value":"8593",
"childrens":[]},
{
"label":"滑石乡",
"value":"8594",
"childrens":[]},
{
"label":"鸡场坪乡",
"value":"8595",
"childrens":[]},
{
"label":"松河乡",
"value":"8596",
"childrens":[]},
{
"label":"坪地乡",
"value":"8597",
"childrens":[]},
{
"label":"四格乡",
"value":"8598",
"childrens":[]},
{
"label":"淤泥乡",
"value":"8599",
"childrens":[]},
{
"label":"普古乡",
"value":"8600",
"childrens":[]},
{
"label":"旧营乡",
"value":"8601",
"childrens":[]},
{
"label":"羊场乡",
"value":"8602",
"childrens":[]},
{
"label":"保基乡",
"value":"8603",
"childrens":[]},
{
"label":"英武乡",
"value":"8604",
"childrens":[]},
{
"label":"马场乡",
"value":"8605",
"childrens":[]}]},

{
"label":"六枝特区",
"value":"2152",
"childrens":[{
"label":"平寨镇",
"value":"8639",
"childrens":[]},
{
"label":"郎岱镇",
"value":"8640",
"childrens":[]},
{
"label":"岩脚镇",
"value":"8641",
"childrens":[]},
{
"label":"木岗镇",
"value":"8642",
"childrens":[]},
{
"label":"大用镇",
"value":"8643",
"childrens":[]},
{
"label":"新窑乡",
"value":"8644",
"childrens":[]},
{
"label":"落别乡",
"value":"8645",
"childrens":[]},
{
"label":"折溪乡",
"value":"8646",
"childrens":[]},
{
"label":"牛场乡",
"value":"8647",
"childrens":[]},
{
"label":"新场乡",
"value":"8648",
"childrens":[]},
{
"label":"中寨乡",
"value":"8649",
"childrens":[]},
{
"label":"堕却乡",
"value":"8650",
"childrens":[]},
{
"label":"箐口乡",
"value":"8651",
"childrens":[]},
{
"label":"洒志乡",
"value":"8652",
"childrens":[]},
{
"label":"毛口乡",
"value":"8653",
"childrens":[]},
{
"label":"龙场乡",
"value":"8654",
"childrens":[]},
{
"label":"新华乡",
"value":"8655",
"childrens":[]},
{
"label":"梭戛乡",
"value":"8656",
"childrens":[]},
{
"label":"陇脚乡",
"value":"8657",
"childrens":[]}]},

{
"label":"水城县",
"value":"2153",
"childrens":[{
"label":"滥坝镇",
"value":"8606",
"childrens":[]},
{
"label":"董地乡",
"value":"8607",
"childrens":[]},
{
"label":"陡箐乡",
"value":"8608",
"childrens":[]},
{
"label":"比德乡",
"value":"8609",
"childrens":[]},
{
"label":"化乐乡",
"value":"8610",
"childrens":[]},
{
"label":"南开乡",
"value":"8611",
"childrens":[]},
{
"label":"青林乡",
"value":"8612",
"childrens":[]},
{
"label":"保华乡",
"value":"8613",
"childrens":[]},
{
"label":"金盆乡",
"value":"8614",
"childrens":[]},
{
"label":"木果乡",
"value":"8615",
"childrens":[]},
{
"label":"发箐乡",
"value":"8616",
"childrens":[]},
{
"label":"双戛乡",
"value":"8617",
"childrens":[]},
{
"label":"玉舍乡",
"value":"8618",
"childrens":[]},
{
"label":"勺米乡",
"value":"8619",
"childrens":[]},
{
"label":"纸厂乡",
"value":"8620",
"childrens":[]},
{
"label":"坪寨乡",
"value":"8621",
"childrens":[]},
{
"label":"发耳乡",
"value":"8622",
"childrens":[]},
{
"label":"都格乡",
"value":"8623",
"childrens":[]},
{
"label":"鸡场乡",
"value":"8624",
"childrens":[]},
{
"label":"龙场乡",
"value":"8625",
"childrens":[]},
{
"label":"营盘乡",
"value":"8626",
"childrens":[]},
{
"label":"顺场乡",
"value":"8627",
"childrens":[]},
{
"label":"花嘎乡",
"value":"8628",
"childrens":[]},
{
"label":"杨梅乡",
"value":"8629",
"childrens":[]},
{
"label":"新街乡",
"value":"8630",
"childrens":[]},
{
"label":"野钟乡",
"value":"8631",
"childrens":[]},
{
"label":"果布嘎乡",
"value":"8632",
"childrens":[]},
{
"label":"米箩乡",
"value":"8633",
"childrens":[]},
{
"label":"阿戛乡",
"value":"8634",
"childrens":[]},
{
"label":"盐井乡",
"value":"8635",
"childrens":[]},
{
"label":"蟠龙乡",
"value":"8636",
"childrens":[]},
{
"label":"猴场乡",
"value":"8637",
"childrens":[]},
{
"label":"红岩乡",
"value":"8638",
"childrens":[]}]},

{
"label":"钟山区",
"value":"2154",
"childrens":[{
"label":"黄土坡街道",
"value":"8560",
"childrens":[]},
{
"label":"荷城街道",
"value":"8561",
"childrens":[]},
{
"label":"凤凰街道",
"value":"8562",
"childrens":[]},
{
"label":"德坞街道",
"value":"8563",
"childrens":[]},
{
"label":"老鹰山镇",
"value":"8564",
"childrens":[]},
{
"label":"大河镇",
"value":"8565",
"childrens":[]},
{
"label":"汪家寨镇",
"value":"8566",
"childrens":[]},
{
"label":"大湾镇",
"value":"8567",
"childrens":[]},
{
"label":"月照乡",
"value":"8568",
"childrens":[]}]}]},


{
"label":"遵义市",
"value":"2155",
"childrens":[{
"label":"赤水市",
"value":"2156",
"childrens":[]},
{
"label":"仁怀市",
"value":"2157",
"childrens":[]},
{
"label":"遵义县",
"value":"2158",
"childrens":[]},
{
"label":"桐梓县",
"value":"2159",
"childrens":[]},
{
"label":"绥阳县",
"value":"2160",
"childrens":[]},
{
"label":"习水县",
"value":"2161",
"childrens":[]},
{
"label":"凤冈县",
"value":"2162",
"childrens":[]},
{
"label":"正安县",
"value":"2163",
"childrens":[]},
{
"label":"湄潭县",
"value":"2164",
"childrens":[]},
{
"label":"余庆县",
"value":"2165",
"childrens":[]},
{
"label":"道真县",
"value":"2166",
"childrens":[]},
{
"label":"务川县",
"value":"2167",
"childrens":[]},
{
"label":"红花岗区",
"value":"53727",
"childrens":[]},
{
"label":"汇川区",
"value":"53728",
"childrens":[]}]},

{
"label":"铜仁市",
"value":"2169",
"childrens":[{
"label":"碧江区",
"value":"2170",
"childrens":[{
"label":"市中街道",
"value":"9142",
"childrens":[]},
{
"label":"环北街道",
"value":"9143",
"childrens":[]},
{
"label":"河西街道",
"value":"9144",
"childrens":[]},
{
"label":"灯塔街道",
"value":"9145",
"childrens":[]},
{
"label":"云场坪镇",
"value":"9146",
"childrens":[]},
{
"label":"川硐镇",
"value":"9147",
"childrens":[]},
{
"label":"坝黄镇",
"value":"9148",
"childrens":[]},
{
"label":"漾头镇",
"value":"9149",
"childrens":[]},
{
"label":"桐木坪乡",
"value":"9150",
"childrens":[]},
{
"label":"六龙山乡",
"value":"9151",
"childrens":[]},
{
"label":"滑石乡",
"value":"9152",
"childrens":[]},
{
"label":"和平乡",
"value":"9153",
"childrens":[]},
{
"label":"瓦屋乡",
"value":"9154",
"childrens":[]}]},

{
"label":"德江县",
"value":"2171",
"childrens":[{
"label":"枫香溪镇",
"value":"8735",
"childrens":[]},
{
"label":"青龙镇",
"value":"8736",
"childrens":[]},
{
"label":"煎茶镇",
"value":"8737",
"childrens":[]},
{
"label":"潮砥镇",
"value":"8738",
"childrens":[]},
{
"label":"稳坪镇",
"value":"8739",
"childrens":[]},
{
"label":"共和乡",
"value":"8740",
"childrens":[]},
{
"label":"堰塘乡",
"value":"8741",
"childrens":[]},
{
"label":"龙泉乡",
"value":"8742",
"childrens":[]},
{
"label":"钱家乡",
"value":"8743",
"childrens":[]},
{
"label":"沙溪乡",
"value":"8744",
"childrens":[]},
{
"label":"楠杆乡",
"value":"8745",
"childrens":[]},
{
"label":"平原乡",
"value":"8746",
"childrens":[]},
{
"label":"复兴乡",
"value":"8747",
"childrens":[]},
{
"label":"合兴乡",
"value":"8748",
"childrens":[]},
{
"label":"长堡乡",
"value":"8749",
"childrens":[]},
{
"label":"桶井乡",
"value":"8750",
"childrens":[]},
{
"label":"荆角乡",
"value":"8751",
"childrens":[]},
{
"label":"长丰乡",
"value":"8752",
"childrens":[]},
{
"label":"高山乡",
"value":"8753",
"childrens":[]},
{
"label":"泉口乡",
"value":"8754",
"childrens":[]}]},

{
"label":"江口县",
"value":"2172",
"childrens":[{
"label":"双江镇",
"value":"8823",
"childrens":[]},
{
"label":"闵孝镇",
"value":"8824",
"childrens":[]},
{
"label":"太平乡",
"value":"8825",
"childrens":[]},
{
"label":"坝盘乡",
"value":"8826",
"childrens":[]},
{
"label":"德旺乡",
"value":"8827",
"childrens":[]},
{
"label":"民和乡",
"value":"8828",
"childrens":[]},
{
"label":"官和乡",
"value":"8829",
"childrens":[]},
{
"label":"桃映乡",
"value":"8830",
"childrens":[]},
{
"label":"怒溪乡",
"value":"8831",
"childrens":[]}]},

{
"label":"思南县",
"value":"2173",
"childrens":[{
"label":"许家坝镇",
"value":"8772",
"childrens":[]},
{
"label":"大坝场镇",
"value":"8773",
"childrens":[]},
{
"label":"文家店镇",
"value":"8774",
"childrens":[]},
{
"label":"鹦鹉溪镇",
"value":"8775",
"childrens":[]},
{
"label":"合朋溪镇",
"value":"8776",
"childrens":[]},
{
"label":"张家寨镇",
"value":"8777",
"childrens":[]},
{
"label":"孙家坝镇",
"value":"8778",
"childrens":[]},
{
"label":"青杠坡镇",
"value":"8779",
"childrens":[]},
{
"label":"凉水井镇",
"value":"8780",
"childrens":[]},
{
"label":"邵家桥镇",
"value":"8781",
"childrens":[]},
{
"label":"思唐镇",
"value":"8782",
"childrens":[]},
{
"label":"塘头镇",
"value":"8783",
"childrens":[]},
{
"label":"瓮溪镇",
"value":"8784",
"childrens":[]},
{
"label":"大河坝乡",
"value":"8785",
"childrens":[]},
{
"label":"胡家湾乡",
"value":"8786",
"childrens":[]},
{
"label":"亭子坝乡",
"value":"8787",
"childrens":[]},
{
"label":"三道水乡",
"value":"8788",
"childrens":[]},
{
"label":"杨家坳乡",
"value":"8789",
"childrens":[]},
{
"label":"思林乡",
"value":"8790",
"childrens":[]},
{
"label":"东华乡",
"value":"8791",
"childrens":[]},
{
"label":"宽坪乡",
"value":"8792",
"childrens":[]},
{
"label":"枫芸乡",
"value":"8793",
"childrens":[]},
{
"label":"香坝乡",
"value":"8794",
"childrens":[]},
{
"label":"长坝乡",
"value":"8795",
"childrens":[]},
{
"label":"板桥乡",
"value":"8796",
"childrens":[]},
{
"label":"天桥乡",
"value":"8797",
"childrens":[]},
{
"label":"兴隆乡",
"value":"8798",
"childrens":[]}]},

{
"label":"万山区",
"value":"2174",
"childrens":[{
"label":"谢桥街道",
"value":"8832",
"childrens":[]},
{
"label":"万山镇",
"value":"8833",
"childrens":[]},
{
"label":"茶店镇",
"value":"8834",
"childrens":[]},
{
"label":"高楼坪乡",
"value":"8835",
"childrens":[]},
{
"label":"黄道乡",
"value":"8836",
"childrens":[]},
{
"label":"敖寨乡",
"value":"8837",
"childrens":[]},
{
"label":"下溪乡",
"value":"8838",
"childrens":[]},
{
"label":"鱼塘乡",
"value":"8839",
"childrens":[]},
{
"label":"大坪乡",
"value":"8840",
"childrens":[]}]},

{
"label":"石阡县",
"value":"2175",
"childrens":[{
"label":"汤山镇",
"value":"8799",
"childrens":[]},
{
"label":"本庄镇",
"value":"8800",
"childrens":[]},
{
"label":"白沙镇",
"value":"8801",
"childrens":[]},
{
"label":"龙塘镇",
"value":"8802",
"childrens":[]},
{
"label":"花桥镇",
"value":"8803",
"childrens":[]},
{
"label":"五德镇",
"value":"8804",
"childrens":[]},
{
"label":"中坝镇",
"value":"8805",
"childrens":[]},
{
"label":"国荣乡",
"value":"8806",
"childrens":[]},
{
"label":"聚凤乡",
"value":"8807",
"childrens":[]},
{
"label":"龙井乡",
"value":"8808",
"childrens":[]},
{
"label":"枫香乡",
"value":"8809",
"childrens":[]},
{
"label":"青阳乡",
"value":"8810",
"childrens":[]},
{
"label":"石固乡",
"value":"8811",
"childrens":[]},
{
"label":"甘溪乡",
"value":"8812",
"childrens":[]},
{
"label":"坪山乡",
"value":"8813",
"childrens":[]},
{
"label":"河坝场乡",
"value":"8814",
"childrens":[]},
{
"label":"坪地场乡",
"value":"8815",
"childrens":[]},
{
"label":"大沙坝乡",
"value":"8816",
"childrens":[]}]},

{
"label":"玉屏侗族自治县",
"value":"2176",
"childrens":[{
"label":"平溪镇",
"value":"8817",
"childrens":[]},
{
"label":"大龙镇",
"value":"8818",
"childrens":[]},
{
"label":"朱家场镇",
"value":"8819",
"childrens":[]},
{
"label":"田坪镇",
"value":"8820",
"childrens":[]},
{
"label":"新店乡",
"value":"8821",
"childrens":[]},
{
"label":"亚鱼乡",
"value":"8822",
"childrens":[]}]},

{
"label":"松桃苗族自治县",
"value":"2177",
"childrens":[{
"label":"蓼皋镇",
"value":"8863",
"childrens":[]},
{
"label":"盘石镇",
"value":"8864",
"childrens":[]},
{
"label":"盘信镇",
"value":"8865",
"childrens":[]},
{
"label":"大坪场镇",
"value":"8866",
"childrens":[]},
{
"label":"普觉镇",
"value":"8867",
"childrens":[]},
{
"label":"寨英镇",
"value":"8868",
"childrens":[]},
{
"label":"孟溪镇",
"value":"8869",
"childrens":[]},
{
"label":"乌罗镇",
"value":"8870",
"childrens":[]},
{
"label":"甘龙镇",
"value":"8871",
"childrens":[]},
{
"label":"长兴堡镇",
"value":"8872",
"childrens":[]},
{
"label":"迓驾镇",
"value":"8873",
"childrens":[]},
{
"label":"大兴镇",
"value":"8874",
"childrens":[]},
{
"label":"牛郎镇",
"value":"8875",
"childrens":[]},
{
"label":"九江乡",
"value":"8876",
"childrens":[]},
{
"label":"世昌乡",
"value":"8877",
"childrens":[]},
{
"label":"正大乡",
"value":"8878",
"childrens":[]},
{
"label":"长坪乡",
"value":"8879",
"childrens":[]},
{
"label":"太平营乡",
"value":"8880",
"childrens":[]},
{
"label":"平头乡",
"value":"8881",
"childrens":[]},
{
"label":"大路乡",
"value":"8882",
"childrens":[]},
{
"label":"妙隘乡",
"value":"8883",
"childrens":[]},
{
"label":"冷水溪乡",
"value":"8884",
"childrens":[]},
{
"label":"石梁乡",
"value":"8885",
"childrens":[]},
{
"label":"瓦溪乡",
"value":"8886",
"childrens":[]},
{
"label":"永安乡",
"value":"8887",
"childrens":[]},
{
"label":"木树乡",
"value":"8888",
"childrens":[]},
{
"label":"黄板乡",
"value":"8889",
"childrens":[]},
{
"label":"沙坝河乡",
"value":"8890",
"childrens":[]}]},

{
"label":"印江土家族苗族自治县",
"value":"2178",
"childrens":[{
"label":"峨岭镇",
"value":"8755",
"childrens":[]},
{
"label":"板溪镇",
"value":"8756",
"childrens":[]},
{
"label":"沙子坡镇",
"value":"8757",
"childrens":[]},
{
"label":"天堂镇",
"value":"8758",
"childrens":[]},
{
"label":"木黄镇",
"value":"8759",
"childrens":[]},
{
"label":"合水镇",
"value":"8760",
"childrens":[]},
{
"label":"朗溪镇",
"value":"8761",
"childrens":[]},
{
"label":"缠溪镇",
"value":"8762",
"childrens":[]},
{
"label":"洋溪镇",
"value":"8763",
"childrens":[]},
{
"label":"新寨乡",
"value":"8764",
"childrens":[]},
{
"label":"中坝乡",
"value":"8765",
"childrens":[]},
{
"label":"杉树乡",
"value":"8766",
"childrens":[]},
{
"label":"刀坝乡",
"value":"8767",
"childrens":[]},
{
"label":"新业乡",
"value":"8768",
"childrens":[]},
{
"label":"永义乡",
"value":"8769",
"childrens":[]},
{
"label":"罗场乡",
"value":"8770",
"childrens":[]},
{
"label":"杨柳乡",
"value":"8771",
"childrens":[]}]},

{
"label":"沿河土家族自治县",
"value":"2179",
"childrens":[{
"label":"土地坳镇",
"value":"8841",
"childrens":[]},
{
"label":"和平镇",
"value":"8842",
"childrens":[]},
{
"label":"沙子镇",
"value":"8843",
"childrens":[]},
{
"label":"谯家镇",
"value":"8844",
"childrens":[]},
{
"label":"夹石镇",
"value":"8845",
"childrens":[]},
{
"label":"淇滩镇",
"value":"8846",
"childrens":[]},
{
"label":"官舟镇",
"value":"8847",
"childrens":[]},
{
"label":"思渠镇",
"value":"8848",
"childrens":[]},
{
"label":"客田镇",
"value":"8849",
"childrens":[]},
{
"label":"洪渡镇",
"value":"8850",
"childrens":[]},
{
"label":"黑獭乡",
"value":"8851",
"childrens":[]},
{
"label":"黑水乡",
"value":"8852",
"childrens":[]},
{
"label":"中界乡",
"value":"8853",
"childrens":[]},
{
"label":"晓景乡",
"value":"8854",
"childrens":[]},
{
"label":"甘溪乡",
"value":"8855",
"childrens":[]},
{
"label":"板场乡",
"value":"8856",
"childrens":[]},
{
"label":"泉坝乡",
"value":"8857",
"childrens":[]},
{
"label":"中寨乡",
"value":"8858",
"childrens":[]},
{
"label":"黄土乡",
"value":"8859",
"childrens":[]},
{
"label":"新景乡",
"value":"8860",
"childrens":[]},
{
"label":"塘坝乡",
"value":"8861",
"childrens":[]},
{
"label":"后坪乡",
"value":"8862",
"childrens":[]}]}]},


{
"label":"毕节市",
"value":"2180",
"childrens":[{
"label":"黔西县",
"value":"2182",
"childrens":[{
"label":"城关镇",
"value":"8969",
"childrens":[]},
{
"label":"金碧镇",
"value":"8970",
"childrens":[]},
{
"label":"雨朵镇",
"value":"8971",
"childrens":[]},
{
"label":"大关镇",
"value":"8972",
"childrens":[]},
{
"label":"谷里镇",
"value":"8973",
"childrens":[]},
{
"label":"素朴镇",
"value":"8974",
"childrens":[]},
{
"label":"中坪镇",
"value":"8975",
"childrens":[]},
{
"label":"重新镇",
"value":"8976",
"childrens":[]},
{
"label":"林泉镇",
"value":"8977",
"childrens":[]},
{
"label":"五里乡",
"value":"8978",
"childrens":[]},
{
"label":"沙井乡",
"value":"8979",
"childrens":[]},
{
"label":"羊场乡",
"value":"8980",
"childrens":[]},
{
"label":"绿化乡",
"value":"8981",
"childrens":[]},
{
"label":"新仁乡",
"value":"8982",
"childrens":[]},
{
"label":"钟山乡",
"value":"8983",
"childrens":[]},
{
"label":"铁石乡",
"value":"8984",
"childrens":[]},
{
"label":"协和乡",
"value":"8985",
"childrens":[]},
{
"label":"太来乡",
"value":"8986",
"childrens":[]},
{
"label":"甘棠乡",
"value":"8987",
"childrens":[]},
{
"label":"永燊乡",
"value":"8988",
"childrens":[]},
{
"label":"中建乡",
"value":"8989",
"childrens":[]},
{
"label":"花溪乡",
"value":"8990",
"childrens":[]},
{
"label":"定新乡",
"value":"8991",
"childrens":[]},
{
"label":"洪水乡",
"value":"8992",
"childrens":[]},
{
"label":"金坡乡",
"value":"8993",
"childrens":[]},
{
"label":"仁和乡",
"value":"8994",
"childrens":[]},
{
"label":"红林乡",
"value":"8995",
"childrens":[]},
{
"label":"锦星乡",
"value":"8996",
"childrens":[]}]},

{
"label":"大方县",
"value":"2183",
"childrens":[{
"label":"黄泥塘镇",
"value":"8933",
"childrens":[]},
{
"label":"大方镇",
"value":"8934",
"childrens":[]},
{
"label":"双山镇",
"value":"8935",
"childrens":[]},
{
"label":"猫场镇",
"value":"8936",
"childrens":[]},
{
"label":"马场镇",
"value":"8937",
"childrens":[]},
{
"label":"羊场镇",
"value":"8938",
"childrens":[]},
{
"label":"六龙镇",
"value":"8939",
"childrens":[]},
{
"label":"达溪镇",
"value":"8940",
"childrens":[]},
{
"label":"瓢井镇",
"value":"8941",
"childrens":[]},
{
"label":"长石镇",
"value":"8942",
"childrens":[]},
{
"label":"东关乡",
"value":"8943",
"childrens":[]},
{
"label":"竹园乡",
"value":"8944",
"childrens":[]},
{
"label":"响水乡",
"value":"8945",
"childrens":[]},
{
"label":"文阁乡",
"value":"8946",
"childrens":[]},
{
"label":"绿塘乡",
"value":"8947",
"childrens":[]},
{
"label":"鼎新乡",
"value":"8948",
"childrens":[]},
{
"label":"牛场乡",
"value":"8949",
"childrens":[]},
{
"label":"高店乡",
"value":"8950",
"childrens":[]},
{
"label":"小屯乡",
"value":"8951",
"childrens":[]},
{
"label":"理化乡",
"value":"8952",
"childrens":[]},
{
"label":"鸡场乡",
"value":"8953",
"childrens":[]},
{
"label":"凤山乡",
"value":"8954",
"childrens":[]},
{
"label":"安乐乡",
"value":"8955",
"childrens":[]},
{
"label":"核桃乡",
"value":"8956",
"childrens":[]},
{
"label":"八堡乡",
"value":"8957",
"childrens":[]},
{
"label":"兴隆乡",
"value":"8958",
"childrens":[]},
{
"label":"果瓦乡",
"value":"8959",
"childrens":[]},
{
"label":"大山乡",
"value":"8960",
"childrens":[]},
{
"label":"雨冲乡",
"value":"8961",
"childrens":[]},
{
"label":"黄泥乡",
"value":"8962",
"childrens":[]},
{
"label":"大水乡",
"value":"8963",
"childrens":[]},
{
"label":"沙厂乡",
"value":"8964",
"childrens":[]},
{
"label":"普底乡",
"value":"8965",
"childrens":[]},
{
"label":"百纳乡",
"value":"8966",
"childrens":[]},
{
"label":"三元乡",
"value":"8967",
"childrens":[]},
{
"label":"星宿乡",
"value":"8968",
"childrens":[]}]},

{
"label":"织金县",
"value":"2184",
"childrens":[{
"label":"城关镇",
"value":"9023",
"childrens":[]},
{
"label":"桂果镇",
"value":"9024",
"childrens":[]},
{
"label":"牛场镇",
"value":"9025",
"childrens":[]},
{
"label":"猫场镇",
"value":"9026",
"childrens":[]},
{
"label":"化起镇",
"value":"9027",
"childrens":[]},
{
"label":"龙场镇",
"value":"9028",
"childrens":[]},
{
"label":"八步镇",
"value":"9029",
"childrens":[]},
{
"label":"以那镇",
"value":"9030",
"childrens":[]},
{
"label":"三塘镇",
"value":"9031",
"childrens":[]},
{
"label":"阿弓镇",
"value":"9032",
"childrens":[]},
{
"label":"珠藏镇",
"value":"9033",
"childrens":[]},
{
"label":"三甲乡",
"value":"9034",
"childrens":[]},
{
"label":"自强乡",
"value":"9035",
"childrens":[]},
{
"label":"大平乡",
"value":"9036",
"childrens":[]},
{
"label":"官寨乡",
"value":"9037",
"childrens":[]},
{
"label":"茶店乡",
"value":"9038",
"childrens":[]},
{
"label":"金龙乡",
"value":"9039",
"childrens":[]},
{
"label":"后寨乡",
"value":"9040",
"childrens":[]},
{
"label":"鸡场乡",
"value":"9041",
"childrens":[]},
{
"label":"中寨乡",
"value":"9042",
"childrens":[]},
{
"label":"绮陌乡",
"value":"9043",
"childrens":[]},
{
"label":"普翁乡",
"value":"9044",
"childrens":[]},
{
"label":"实兴乡",
"value":"9045",
"childrens":[]},
{
"label":"马场乡",
"value":"9046",
"childrens":[]},
{
"label":"上坪寨乡",
"value":"9047",
"childrens":[]},
{
"label":"营合乡",
"value":"9048",
"childrens":[]},
{
"label":"纳雍乡",
"value":"9049",
"childrens":[]},
{
"label":"板桥乡",
"value":"9050",
"childrens":[]},
{
"label":"白泥乡",
"value":"9051",
"childrens":[]},
{
"label":"少普乡",
"value":"9052",
"childrens":[]},
{
"label":"熊家场乡",
"value":"9053",
"childrens":[]},
{
"label":"黑土乡",
"value":"9054",
"childrens":[]}]},

{
"label":"金沙县",
"value":"2185",
"childrens":[{
"label":"城关镇",
"value":"8997",
"childrens":[]},
{
"label":"安底镇",
"value":"8998",
"childrens":[]},
{
"label":"沙土镇",
"value":"8999",
"childrens":[]},
{
"label":"岩孔镇",
"value":"9000",
"childrens":[]},
{
"label":"禹谟镇",
"value":"9001",
"childrens":[]},
{
"label":"岚头镇",
"value":"9002",
"childrens":[]},
{
"label":"清池镇",
"value":"9003",
"childrens":[]},
{
"label":"平坝乡",
"value":"9004",
"childrens":[]},
{
"label":"西洛乡",
"value":"9005",
"childrens":[]},
{
"label":"石场乡",
"value":"9006",
"childrens":[]},
{
"label":"桂花乡",
"value":"9007",
"childrens":[]},
{
"label":"太平乡",
"value":"9008",
"childrens":[]},
{
"label":"箐门乡",
"value":"9009",
"childrens":[]},
{
"label":"龙坝乡",
"value":"9010",
"childrens":[]},
{
"label":"高坪乡",
"value":"9011",
"childrens":[]},
{
"label":"化觉乡",
"value":"9012",
"childrens":[]},
{
"label":"茶园乡",
"value":"9013",
"childrens":[]},
{
"label":"木孔乡",
"value":"9014",
"childrens":[]},
{
"label":"长坝乡",
"value":"9015",
"childrens":[]},
{
"label":"源村乡",
"value":"9016",
"childrens":[]},
{
"label":"官田乡",
"value":"9017",
"childrens":[]},
{
"label":"后山乡",
"value":"9018",
"childrens":[]},
{
"label":"安洛乡",
"value":"9019",
"childrens":[]},
{
"label":"新化乡",
"value":"9020",
"childrens":[]},
{
"label":"大田乡",
"value":"9021",
"childrens":[]},
{
"label":"马路乡",
"value":"9022",
"childrens":[]}]},

{
"label":"赫章县",
"value":"2186",
"childrens":[{
"label":"城关镇",
"value":"9115",
"childrens":[]},
{
"label":"六曲河镇",
"value":"9116",
"childrens":[]},
{
"label":"野马川镇",
"value":"9117",
"childrens":[]},
{
"label":"白果镇",
"value":"9118",
"childrens":[]},
{
"label":"妈姑镇",
"value":"9119",
"childrens":[]},
{
"label":"财神镇",
"value":"9120",
"childrens":[]},
{
"label":"松林坡乡",
"value":"9121",
"childrens":[]},
{
"label":"水塘堡乡",
"value":"9122",
"childrens":[]},
{
"label":"安乐溪乡",
"value":"9123",
"childrens":[]},
{
"label":"兴发乡",
"value":"9124",
"childrens":[]},
{
"label":"达依乡",
"value":"9125",
"childrens":[]},
{
"label":"雉街乡",
"value":"9126",
"childrens":[]},
{
"label":"珠市乡",
"value":"9127",
"childrens":[]},
{
"label":"罗州乡",
"value":"9128",
"childrens":[]},
{
"label":"双坪乡",
"value":"9129",
"childrens":[]},
{
"label":"铁匠乡",
"value":"9130",
"childrens":[]},
{
"label":"辅处乡",
"value":"9131",
"childrens":[]},
{
"label":"可乐乡",
"value":"9132",
"childrens":[]},
{
"label":"河镇乡",
"value":"9133",
"childrens":[]},
{
"label":"德卓乡",
"value":"9134",
"childrens":[]},
{
"label":"朱明乡",
"value":"9135",
"childrens":[]},
{
"label":"结构乡",
"value":"9136",
"childrens":[]},
{
"label":"古基乡",
"value":"9137",
"childrens":[]},
{
"label":"哲庄乡",
"value":"9138",
"childrens":[]},
{
"label":"平山乡",
"value":"9139",
"childrens":[]},
{
"label":"古达乡",
"value":"9140",
"childrens":[]},
{
"label":"威奢乡",
"value":"9141",
"childrens":[]}]},

{
"label":"纳雍县",
"value":"2187",
"childrens":[{
"label":"王家寨镇",
"value":"9055",
"childrens":[]},
{
"label":"张家湾镇",
"value":"9056",
"childrens":[]},
{
"label":"雍熙镇",
"value":"9057",
"childrens":[]},
{
"label":"中岭镇",
"value":"9058",
"childrens":[]},
{
"label":"阳长镇",
"value":"9059",
"childrens":[]},
{
"label":"维新镇",
"value":"9060",
"childrens":[]},
{
"label":"龙场镇",
"value":"9061",
"childrens":[]},
{
"label":"乐治镇",
"value":"9062",
"childrens":[]},
{
"label":"百兴镇",
"value":"9063",
"childrens":[]},
{
"label":"厍东关乡",
"value":"9064",
"childrens":[]},
{
"label":"老凹坝乡",
"value":"9065",
"childrens":[]},
{
"label":"锅圈岩乡",
"value":"9066",
"childrens":[]},
{
"label":"左鸠戛乡",
"value":"9067",
"childrens":[]},
{
"label":"勺窝乡",
"value":"9068",
"childrens":[]},
{
"label":"新房乡",
"value":"9069",
"childrens":[]},
{
"label":"董地乡",
"value":"9070",
"childrens":[]},
{
"label":"寨乐乡",
"value":"9071",
"childrens":[]},
{
"label":"化作乡",
"value":"9072",
"childrens":[]},
{
"label":"沙包乡",
"value":"9073",
"childrens":[]},
{
"label":"水东乡",
"value":"9074",
"childrens":[]},
{
"label":"曙光乡",
"value":"9075",
"childrens":[]},
{
"label":"姑开乡",
"value":"9076",
"childrens":[]},
{
"label":"羊场乡",
"value":"9077",
"childrens":[]},
{
"label":"昆寨乡",
"value":"9078",
"childrens":[]},
{
"label":"猪场乡",
"value":"9079",
"childrens":[]}]},

{
"label":"威宁彝族回族苗族自治县",
"value":"2188",
"childrens":[{
"label":"观风海镇",
"value":"9080",
"childrens":[]},
{
"label":"草海镇",
"value":"9081",
"childrens":[]},
{
"label":"么站镇",
"value":"9082",
"childrens":[]},
{
"label":"金钟镇",
"value":"9083",
"childrens":[]},
{
"label":"炉山镇",
"value":"9084",
"childrens":[]},
{
"label":"龙场镇",
"value":"9085",
"childrens":[]},
{
"label":"黑石镇",
"value":"9086",
"childrens":[]},
{
"label":"哲觉镇",
"value":"9087",
"childrens":[]},
{
"label":"牛棚镇",
"value":"9088",
"childrens":[]},
{
"label":"迤那镇",
"value":"9089",
"childrens":[]},
{
"label":"中水镇",
"value":"9090",
"childrens":[]},
{
"label":"龙街镇",
"value":"9091",
"childrens":[]},
{
"label":"雪山镇",
"value":"9092",
"childrens":[]},
{
"label":"羊街镇",
"value":"9093",
"childrens":[]},
{
"label":"小海镇",
"value":"9094",
"childrens":[]},
{
"label":"盐仓镇",
"value":"9095",
"childrens":[]},
{
"label":"东风镇",
"value":"9096",
"childrens":[]},
{
"label":"二塘镇",
"value":"9097",
"childrens":[]},
{
"label":"猴场镇",
"value":"9098",
"childrens":[]},
{
"label":"黑土河乡",
"value":"9099",
"childrens":[]},
{
"label":"哈喇河乡",
"value":"9100",
"childrens":[]},
{
"label":"金斗乡",
"value":"9101",
"childrens":[]},
{
"label":"新发乡",
"value":"9102",
"childrens":[]},
{
"label":"岔河乡",
"value":"9103",
"childrens":[]},
{
"label":"麻乍乡",
"value":"9104",
"childrens":[]},
{
"label":"海拉乡",
"value":"9105",
"childrens":[]},
{
"label":"秀水乡",
"value":"9106",
"childrens":[]},
{
"label":"斗古乡",
"value":"9107",
"childrens":[]},
{
"label":"玉龙乡",
"value":"9108",
"childrens":[]},
{
"label":"石门乡",
"value":"9109",
"childrens":[]},
{
"label":"云贵乡",
"value":"9110",
"childrens":[]},
{
"label":"兔街乡",
"value":"9111",
"childrens":[]},
{
"label":"双龙乡",
"value":"9112",
"childrens":[]},
{
"label":"板底乡",
"value":"9113",
"childrens":[]},
{
"label":"大街乡",
"value":"9374",
"childrens":[]}]},

{
"label":"七星关区",
"value":"8891",
"childrens":[{
"label":"市西街道",
"value":"8892",
"childrens":[]},
{
"label":"市东街道",
"value":"8893",
"childrens":[]},
{
"label":"三板桥街道",
"value":"8894",
"childrens":[]},
{
"label":"流沧桥街道",
"value":"8895",
"childrens":[]},
{
"label":"大新桥街道",
"value":"8896",
"childrens":[]},
{
"label":"观音桥街道",
"value":"8897",
"childrens":[]},
{
"label":"何官屯镇",
"value":"8898",
"childrens":[]},
{
"label":"长春堡镇",
"value":"8899",
"childrens":[]},
{
"label":"撒拉溪镇",
"value":"8900",
"childrens":[]},
{
"label":"杨家湾镇",
"value":"8901",
"childrens":[]},
{
"label":"清水铺镇",
"value":"8902",
"childrens":[]},
{
"label":"燕子口镇",
"value":"8903",
"childrens":[]},
{
"label":"田坝桥镇",
"value":"8904",
"childrens":[]},
{
"label":"海子街镇",
"value":"8905",
"childrens":[]},
{
"label":"小吉场镇",
"value":"8906",
"childrens":[]},
{
"label":"龙场营镇",
"value":"8907",
"childrens":[]},
{
"label":"鸭池镇",
"value":"8908",
"childrens":[]},
{
"label":"梨树镇",
"value":"8909",
"childrens":[]},
{
"label":"岔河镇",
"value":"8910",
"childrens":[]},
{
"label":"朱昌镇",
"value":"8911",
"childrens":[]},
{
"label":"田坝镇",
"value":"8912",
"childrens":[]},
{
"label":"放珠镇",
"value":"8913",
"childrens":[]},
{
"label":"青场镇",
"value":"8914",
"childrens":[]},
{
"label":"水箐镇",
"value":"8915",
"childrens":[]},
{
"label":"对坡镇",
"value":"8916",
"childrens":[]},
{
"label":"大银镇",
"value":"8917",
"childrens":[]},
{
"label":"林口镇",
"value":"8918",
"childrens":[]},
{
"label":"生机镇",
"value":"8919",
"childrens":[]},
{
"label":"亮岩镇",
"value":"8920",
"childrens":[]},
{
"label":"八寨镇",
"value":"8921",
"childrens":[]},
{
"label":"小坝镇",
"value":"8922",
"childrens":[]},
{
"label":"层台镇",
"value":"8923",
"childrens":[]},
{
"label":"普宜镇",
"value":"8924",
"childrens":[]},
{
"label":"千溪乡",
"value":"8925",
"childrens":[]},
{
"label":"阴底乡",
"value":"8926",
"childrens":[]},
{
"label":"野角乡",
"value":"8927",
"childrens":[]},
{
"label":"大河乡",
"value":"8928",
"childrens":[]},
{
"label":"团结乡",
"value":"8929",
"childrens":[]},
{
"label":"阿市乡",
"value":"8930",
"childrens":[]},
{
"label":"大屯乡",
"value":"8931",
"childrens":[]},
{
"label":"田坎乡",
"value":"8932",
"childrens":[]}]}]},


{
"label":"安顺市",
"value":"2189",
"childrens":[{
"label":"西秀区",
"value":"2190",
"childrens":[{
"label":"南街街道",
"value":"8711",
"childrens":[]},
{
"label":"东街街道",
"value":"8712",
"childrens":[]},
{
"label":"西街街道",
"value":"8713",
"childrens":[]},
{
"label":"北街街道",
"value":"8714",
"childrens":[]},
{
"label":"东关街道",
"value":"8715",
"childrens":[]},
{
"label":"华西街道",
"value":"8716",
"childrens":[]},
{
"label":"西航街道",
"value":"8717",
"childrens":[]},
{
"label":"大西桥镇",
"value":"8718",
"childrens":[]},
{
"label":"七眼桥镇",
"value":"8719",
"childrens":[]},
{
"label":"轿子山镇",
"value":"8720",
"childrens":[]},
{
"label":"宋旗镇",
"value":"8721",
"childrens":[]},
{
"label":"幺铺镇",
"value":"8722",
"childrens":[]},
{
"label":"宁谷镇",
"value":"8723",
"childrens":[]},
{
"label":"龙宫镇",
"value":"8724",
"childrens":[]},
{
"label":"双堡镇",
"value":"8725",
"childrens":[]},
{
"label":"蔡官镇",
"value":"8726",
"childrens":[]},
{
"label":"旧州镇",
"value":"8727",
"childrens":[]},
{
"label":"新场乡",
"value":"8728",
"childrens":[]},
{
"label":"岩腊乡",
"value":"8729",
"childrens":[]},
{
"label":"鸡场乡",
"value":"8730",
"childrens":[]},
{
"label":"杨武乡",
"value":"8731",
"childrens":[]},
{
"label":"东屯乡",
"value":"8732",
"childrens":[]},
{
"label":"黄腊乡",
"value":"8733",
"childrens":[]},
{
"label":"刘官乡",
"value":"8734",
"childrens":[]}]},

{
"label":"普定县",
"value":"2191",
"childrens":[{
"label":"城关镇",
"value":"8658",
"childrens":[]},
{
"label":"马官镇",
"value":"8659",
"childrens":[]},
{
"label":"化处镇",
"value":"8660",
"childrens":[]},
{
"label":"马场镇",
"value":"8661",
"childrens":[]},
{
"label":"白岩镇",
"value":"8662",
"childrens":[]},
{
"label":"龙场乡",
"value":"8663",
"childrens":[]},
{
"label":"鸡场坡乡",
"value":"8664",
"childrens":[]},
{
"label":"坪上乡",
"value":"8665",
"childrens":[]},
{
"label":"补郎乡",
"value":"8666",
"childrens":[]},
{
"label":"猴场乡",
"value":"8667",
"childrens":[]},
{
"label":"猫洞乡",
"value":"8668",
"childrens":[]}]},

{
"label":"平坝县",
"value":"2192",
"childrens":[{
"label":"城关镇",
"value":"8548",
"childrens":[]},
{
"label":"白云镇",
"value":"8549",
"childrens":[]},
{
"label":"高峰镇",
"value":"8550",
"childrens":[]},
{
"label":"天龙镇",
"value":"8551",
"childrens":[]},
{
"label":"夏云镇",
"value":"8552",
"childrens":[]},
{
"label":"马场镇",
"value":"8553",
"childrens":[]},
{
"label":"乐平乡",
"value":"8554",
"childrens":[]},
{
"label":"齐伯乡",
"value":"8555",
"childrens":[]},
{
"label":"十字乡",
"value":"8556",
"childrens":[]},
{
"label":"羊昌乡",
"value":"8557",
"childrens":[]}]},

{
"label":"镇宁布依族苗族自治县",
"value":"2193",
"childrens":[{
"label":"城关镇",
"value":"8669",
"childrens":[]},
{
"label":"丁旗镇",
"value":"8670",
"childrens":[]},
{
"label":"黄果树镇",
"value":"8671",
"childrens":[]},
{
"label":"江龙镇",
"value":"8672",
"childrens":[]},
{
"label":"大山乡",
"value":"8673",
"childrens":[]},
{
"label":"扁担山乡",
"value":"8674",
"childrens":[]},
{
"label":"募役乡",
"value":"8675",
"childrens":[]},
{
"label":"马厂乡",
"value":"8676",
"childrens":[]},
{
"label":"沙子乡",
"value":"8677",
"childrens":[]},
{
"label":"朵卜陇乡",
"value":"8678",
"childrens":[]},
{
"label":"革利乡",
"value":"8679",
"childrens":[]},
{
"label":"本寨乡",
"value":"8680",
"childrens":[]},
{
"label":"六马乡",
"value":"8681",
"childrens":[]},
{
"label":"良田乡",
"value":"8682",
"childrens":[]},
{
"label":"简嘎乡",
"value":"8683",
"childrens":[]},
{
"label":"打帮乡",
"value":"8684",
"childrens":[]}]},

{
"label":"关岭布依族苗族自治县",
"value":"2194",
"childrens":[{
"label":"关索镇",
"value":"8685",
"childrens":[]},
{
"label":"花江镇",
"value":"8686",
"childrens":[]},
{
"label":"永宁镇",
"value":"8687",
"childrens":[]},
{
"label":"岗乌镇",
"value":"8688",
"childrens":[]},
{
"label":"上关镇",
"value":"8689",
"childrens":[]},
{
"label":"坡贡镇",
"value":"8690",
"childrens":[]},
{
"label":"断桥镇",
"value":"8691",
"childrens":[]},
{
"label":"白水镇",
"value":"8692",
"childrens":[]},
{
"label":"八德乡",
"value":"8693",
"childrens":[]},
{
"label":"顶云乡",
"value":"8694",
"childrens":[]},
{
"label":"普利乡",
"value":"8695",
"childrens":[]},
{
"label":"板贵乡",
"value":"8696",
"childrens":[]},
{
"label":"新铺乡",
"value":"8697",
"childrens":[]},
{
"label":"沙营乡",
"value":"8698",
"childrens":[]}]},

{
"label":"紫云苗族布依族自治县",
"value":"2195",
"childrens":[{
"label":"松山镇",
"value":"8699",
"childrens":[]},
{
"label":"水塘镇",
"value":"8700",
"childrens":[]},
{
"label":"猴场镇",
"value":"8701",
"childrens":[]},
{
"label":"猫营镇",
"value":"8702",
"childrens":[]},
{
"label":"板当镇",
"value":"8703",
"childrens":[]},
{
"label":"白石岩乡",
"value":"8704",
"childrens":[]},
{
"label":"宗地乡",
"value":"8705",
"childrens":[]},
{
"label":"大营乡",
"value":"8706",
"childrens":[]},
{
"label":"四大寨乡",
"value":"8707",
"childrens":[]},
{
"label":"坝羊乡",
"value":"8708",
"childrens":[]},
{
"label":"火花乡",
"value":"8709",
"childrens":[]},
{
"label":"达帮乡",
"value":"8710",
"childrens":[]}]}]},


{
"label":"黔西南州",
"value":"2196",
"childrens":[{
"label":"兴义市",
"value":"2197",
"childrens":[{
"label":"黄草街道",
"value":"9722",
"childrens":[]},
{
"label":"兴泰街道",
"value":"9723",
"childrens":[]},
{
"label":"桔山街道",
"value":"9724",
"childrens":[]},
{
"label":"丰都街道",
"value":"9725",
"childrens":[]},
{
"label":"坪东街道",
"value":"9726",
"childrens":[]},
{
"label":"木贾街道",
"value":"9727",
"childrens":[]},
{
"label":"下五屯街道",
"value":"9728",
"childrens":[]},
{
"label":"万峰林街道",
"value":"9729",
"childrens":[]},
{
"label":"鲁布格镇",
"value":"9730",
"childrens":[]},
{
"label":"三江口镇",
"value":"9731",
"childrens":[]},
{
"label":"白碗窑镇",
"value":"9732",
"childrens":[]},
{
"label":"清水河镇",
"value":"9733",
"childrens":[]},
{
"label":"敬南镇",
"value":"9734",
"childrens":[]},
{
"label":"泥凼镇",
"value":"9735",
"childrens":[]},
{
"label":"巴结镇",
"value":"9736",
"childrens":[]},
{
"label":"捧鲊镇",
"value":"9737",
"childrens":[]},
{
"label":"乌沙镇",
"value":"9738",
"childrens":[]},
{
"label":"马岭镇",
"value":"9739",
"childrens":[]},
{
"label":"威舍镇",
"value":"9740",
"childrens":[]},
{
"label":"顶效镇",
"value":"9741",
"childrens":[]},
{
"label":"郑屯镇",
"value":"9742",
"childrens":[]},
{
"label":"万屯镇",
"value":"9743",
"childrens":[]},
{
"label":"鲁屯镇",
"value":"9744",
"childrens":[]},
{
"label":"仓更镇",
"value":"9745",
"childrens":[]},
{
"label":"七舍镇",
"value":"9746",
"childrens":[]},
{
"label":"则戎乡",
"value":"9747",
"childrens":[]},
{
"label":"沧江乡",
"value":"9748",
"childrens":[]},
{
"label":"洛万乡",
"value":"9749",
"childrens":[]},
{
"label":"雄武乡",
"value":"9750",
"childrens":[]},
{
"label":"猪场坪乡",
"value":"9751",
"childrens":[]}]},

{
"label":"望谟县",
"value":"2198",
"childrens":[{
"label":"复兴镇",
"value":"9646",
"childrens":[]},
{
"label":"乐元镇",
"value":"9647",
"childrens":[]},
{
"label":"打易镇",
"value":"9648",
"childrens":[]},
{
"label":"乐旺镇",
"value":"9649",
"childrens":[]},
{
"label":"桑郎镇",
"value":"9650",
"childrens":[]},
{
"label":"纳夜镇",
"value":"9651",
"childrens":[]},
{
"label":"新屯镇",
"value":"9652",
"childrens":[]},
{
"label":"石屯镇",
"value":"9653",
"childrens":[]},
{
"label":"坎边乡",
"value":"9654",
"childrens":[]},
{
"label":"岜饶乡",
"value":"9655",
"childrens":[]},
{
"label":"郊纳乡",
"value":"9656",
"childrens":[]},
{
"label":"大观乡",
"value":"9657",
"childrens":[]},
{
"label":"蔗香乡",
"value":"9658",
"childrens":[]},
{
"label":"昂武乡",
"value":"9659",
"childrens":[]},
{
"label":"油迈乡",
"value":"9660",
"childrens":[]},
{
"label":"麻山乡",
"value":"9661",
"childrens":[]},
{
"label":"打尖乡",
"value":"9662",
"childrens":[]}]},

{
"label":"兴仁县",
"value":"2199",
"childrens":[{
"label":"真武山街道",
"value":"9704",
"childrens":[]},
{
"label":"东湖街道",
"value":"9705",
"childrens":[]},
{
"label":"城南街道",
"value":"9706",
"childrens":[]},
{
"label":"城北街道",
"value":"9707",
"childrens":[]},
{
"label":"潘家庄镇",
"value":"9708",
"childrens":[]},
{
"label":"新龙场镇",
"value":"9709",
"childrens":[]},
{
"label":"屯脚镇",
"value":"9710",
"childrens":[]},
{
"label":"巴铃镇",
"value":"9711",
"childrens":[]},
{
"label":"百德镇",
"value":"9712",
"childrens":[]},
{
"label":"雨樟镇",
"value":"9713",
"childrens":[]},
{
"label":"回龙镇",
"value":"9714",
"childrens":[]},
{
"label":"下山镇",
"value":"9715",
"childrens":[]},
{
"label":"新马场乡",
"value":"9716",
"childrens":[]},
{
"label":"鲁础营乡",
"value":"9717",
"childrens":[]},
{
"label":"大山乡",
"value":"9718",
"childrens":[]},
{
"label":"李关乡",
"value":"9719",
"childrens":[]},
{
"label":"田湾乡",
"value":"9720",
"childrens":[]},
{
"label":"民建乡",
"value":"9721",
"childrens":[]}]},

{
"label":"普安县",
"value":"2200",
"childrens":[{
"label":"罐子窑镇",
"value":"9690",
"childrens":[]},
{
"label":"江西坡镇",
"value":"9691",
"childrens":[]},
{
"label":"三板桥镇",
"value":"9692",
"childrens":[]},
{
"label":"盘水镇",
"value":"9693",
"childrens":[]},
{
"label":"龙吟镇",
"value":"9694",
"childrens":[]},
{
"label":"地瓜镇",
"value":"9695",
"childrens":[]},
{
"label":"青山镇",
"value":"9696",
"childrens":[]},
{
"label":"楼下镇",
"value":"9697",
"childrens":[]},
{
"label":"白沙乡",
"value":"9698",
"childrens":[]},
{
"label":"高棉乡",
"value":"9699",
"childrens":[]},
{
"label":"窝沿乡",
"value":"9700",
"childrens":[]},
{
"label":"罗汉乡",
"value":"9701",
"childrens":[]},
{
"label":"新店乡",
"value":"9702",
"childrens":[]},
{
"label":"雪浦乡",
"value":"9703",
"childrens":[]}]},

{
"label":"册亨县",
"value":"2201",
"childrens":[{
"label":"者楼镇",
"value":"9632",
"childrens":[]},
{
"label":"坡妹镇",
"value":"9633",
"childrens":[]},
{
"label":"冗渡镇",
"value":"9634",
"childrens":[]},
{
"label":"丫他镇",
"value":"9635",
"childrens":[]},
{
"label":"巧马镇",
"value":"9636",
"childrens":[]},
{
"label":"秧坝镇",
"value":"9637",
"childrens":[]},
{
"label":"双江镇",
"value":"9638",
"childrens":[]},
{
"label":"岩架镇",
"value":"9639",
"childrens":[]},
{
"label":"八渡镇",
"value":"9640",
"childrens":[]},
{
"label":"庆坪乡",
"value":"9641",
"childrens":[]},
{
"label":"达央乡",
"value":"9642",
"childrens":[]},
{
"label":"威旁乡",
"value":"9643",
"childrens":[]},
{
"label":"弼佑乡",
"value":"9644",
"childrens":[]},
{
"label":"百口乡",
"value":"9645",
"childrens":[]}]},

{
"label":"晴隆县",
"value":"2202",
"childrens":[{
"label":"莲城镇",
"value":"9676",
"childrens":[]},
{
"label":"沙子镇",
"value":"9677",
"childrens":[]},
{
"label":"碧痕镇",
"value":"9678",
"childrens":[]},
{
"label":"大厂镇",
"value":"9679",
"childrens":[]},
{
"label":"鸡场镇",
"value":"9680",
"childrens":[]},
{
"label":"花贡镇",
"value":"9681",
"childrens":[]},
{
"label":"中营镇",
"value":"9682",
"childrens":[]},
{
"label":"光照镇",
"value":"9683",
"childrens":[]},
{
"label":"长流乡",
"value":"9684",
"childrens":[]},
{
"label":"大田乡",
"value":"9685",
"childrens":[]},
{
"label":"马场乡",
"value":"9686",
"childrens":[]},
{
"label":"紫马乡",
"value":"9687",
"childrens":[]},
{
"label":"安谷乡",
"value":"9688",
"childrens":[]},
{
"label":"三宝乡",
"value":"9689",
"childrens":[]}]},

{
"label":"贞丰县",
"value":"2203",
"childrens":[{
"label":"北盘江镇",
"value":"9663",
"childrens":[]},
{
"label":"珉谷镇",
"value":"9664",
"childrens":[]},
{
"label":"龙场镇",
"value":"9665",
"childrens":[]},
{
"label":"者相镇",
"value":"9666",
"childrens":[]},
{
"label":"白层镇",
"value":"9667",
"childrens":[]},
{
"label":"鲁贡镇",
"value":"9668",
"childrens":[]},
{
"label":"连环乡",
"value":"9669",
"childrens":[]},
{
"label":"挽澜乡",
"value":"9670",
"childrens":[]},
{
"label":"小屯乡",
"value":"9671",
"childrens":[]},
{
"label":"长田乡",
"value":"9672",
"childrens":[]},
{
"label":"平街乡",
"value":"9673",
"childrens":[]},
{
"label":"鲁容乡",
"value":"9674",
"childrens":[]},
{
"label":"沙坪乡",
"value":"9675",
"childrens":[]}]},

{
"label":"安龙县",
"value":"2204",
"childrens":[{
"label":"万峰湖镇",
"value":"9616",
"childrens":[]},
{
"label":"新安镇",
"value":"9617",
"childrens":[]},
{
"label":"龙广镇",
"value":"9618",
"childrens":[]},
{
"label":"德卧镇",
"value":"9619",
"childrens":[]},
{
"label":"木咱镇",
"value":"9620",
"childrens":[]},
{
"label":"洒雨镇",
"value":"9621",
"childrens":[]},
{
"label":"普坪镇",
"value":"9622",
"childrens":[]},
{
"label":"龙山镇",
"value":"9623",
"childrens":[]},
{
"label":"戈塘镇",
"value":"9624",
"childrens":[]},
{
"label":"兴隆镇",
"value":"9625",
"childrens":[]},
{
"label":"新桥镇",
"value":"9626",
"childrens":[]},
{
"label":"海子乡",
"value":"9627",
"childrens":[]},
{
"label":"笃山乡",
"value":"9628",
"childrens":[]},
{
"label":"平乐乡",
"value":"9629",
"childrens":[]},
{
"label":"钱相乡",
"value":"9630",
"childrens":[]},
{
"label":"坡脚乡",
"value":"9631",
"childrens":[]}]}]},


{
"label":"黔东南州",
"value":"2205",
"childrens":[{
"label":"凯里市",
"value":"2206",
"childrens":[{
"label":"洗马河街道",
"value":"9163",
"childrens":[]},
{
"label":"大十字街道",
"value":"9164",
"childrens":[]},
{
"label":"城西街道",
"value":"9165",
"childrens":[]},
{
"label":"西门街道",
"value":"9166",
"childrens":[]},
{
"label":"湾溪街道",
"value":"9167",
"childrens":[]},
{
"label":"鸭塘街道",
"value":"9168",
"childrens":[]},
{
"label":"开怀街道",
"value":"9169",
"childrens":[]},
{
"label":"三棵树镇",
"value":"9170",
"childrens":[]},
{
"label":"舟溪镇",
"value":"9171",
"childrens":[]},
{
"label":"旁海镇",
"value":"9172",
"childrens":[]},
{
"label":"湾水镇",
"value":"9173",
"childrens":[]},
{
"label":"炉山镇",
"value":"9174",
"childrens":[]},
{
"label":"万潮镇",
"value":"9175",
"childrens":[]},
{
"label":"龙场镇",
"value":"9176",
"childrens":[]},
{
"label":"凯棠乡",
"value":"9177",
"childrens":[]},
{
"label":"大风洞乡",
"value":"9178",
"childrens":[]}]},

{
"label":"施秉市",
"value":"2207",
"childrens":[{
"label":"城关镇",
"value":"9179",
"childrens":[]},
{
"label":"杨柳塘镇",
"value":"9180",
"childrens":[]},
{
"label":"牛大场镇",
"value":"9181",
"childrens":[]},
{
"label":"双井镇",
"value":"9182",
"childrens":[]},
{
"label":"白垛乡",
"value":"9183",
"childrens":[]},
{
"label":"甘溪乡",
"value":"9184",
"childrens":[]},
{
"label":"马号乡",
"value":"9185",
"childrens":[]},
{
"label":"马溪乡",
"value":"9186",
"childrens":[]}]},

{
"label":"从江县",
"value":"2208",
"childrens":[{
"label":"丙妹镇",
"value":"9328",
"childrens":[]},
{
"label":"贯洞镇",
"value":"9329",
"childrens":[]},
{
"label":"洛香镇",
"value":"9330",
"childrens":[]},
{
"label":"下江镇",
"value":"9331",
"childrens":[]},
{
"label":"宰便镇",
"value":"9332",
"childrens":[]},
{
"label":"西山镇",
"value":"9333",
"childrens":[]},
{
"label":"停洞镇",
"value":"9334",
"childrens":[]},
{
"label":"高增乡",
"value":"9335",
"childrens":[]},
{
"label":"谷坪乡",
"value":"9336",
"childrens":[]},
{
"label":"雍里乡",
"value":"9337",
"childrens":[]},
{
"label":"庆云乡",
"value":"9338",
"childrens":[]},
{
"label":"刚边乡",
"value":"9339",
"childrens":[]},
{
"label":"加榜乡",
"value":"9340",
"childrens":[]},
{
"label":"秀塘乡",
"value":"9341",
"childrens":[]},
{
"label":"斗里乡",
"value":"9342",
"childrens":[]},
{
"label":"翠里乡",
"value":"9343",
"childrens":[]},
{
"label":"往洞乡",
"value":"9344",
"childrens":[]},
{
"label":"东朗乡",
"value":"9345",
"childrens":[]},
{
"label":"加鸠乡",
"value":"9346",
"childrens":[]},
{
"label":"加勉乡",
"value":"9347",
"childrens":[]},
{
"label":"光辉乡",
"value":"9348",
"childrens":[]}]},

{
"label":"锦屏县",
"value":"2209",
"childrens":[{
"label":"三江镇",
"value":"9249",
"childrens":[]},
{
"label":"茅坪镇",
"value":"9250",
"childrens":[]},
{
"label":"敦寨镇",
"value":"9251",
"childrens":[]},
{
"label":"启蒙镇",
"value":"9252",
"childrens":[]},
{
"label":"平秋镇",
"value":"9253",
"childrens":[]},
{
"label":"铜鼓镇",
"value":"9254",
"childrens":[]},
{
"label":"平略镇",
"value":"9255",
"childrens":[]},
{
"label":"大同乡",
"value":"9256",
"childrens":[]},
{
"label":"新化乡",
"value":"9257",
"childrens":[]},
{
"label":"隆里乡",
"value":"9258",
"childrens":[]},
{
"label":"钟灵乡",
"value":"9259",
"childrens":[]},
{
"label":"偶里乡",
"value":"9260",
"childrens":[]},
{
"label":"固本乡",
"value":"9261",
"childrens":[]},
{
"label":"河口乡",
"value":"9262",
"childrens":[]},
{
"label":"彦洞乡",
"value":"9263",
"childrens":[]}]},

{
"label":"镇远县",
"value":"2210",
"childrens":[{
"label":"舞阳镇",
"value":"9210",
"childrens":[]},
{
"label":"蕉溪镇",
"value":"9211",
"childrens":[]},
{
"label":"青溪镇",
"value":"9212",
"childrens":[]},
{
"label":"羊坪镇",
"value":"9213",
"childrens":[]},
{
"label":"羊场镇",
"value":"9214",
"childrens":[]},
{
"label":"都坪镇",
"value":"9215",
"childrens":[]},
{
"label":"江古乡",
"value":"9216",
"childrens":[]},
{
"label":"涌溪乡",
"value":"9217",
"childrens":[]},
{
"label":"金堡乡",
"value":"9218",
"childrens":[]},
{
"label":"报京乡",
"value":"9219",
"childrens":[]},
{
"label":"大地乡",
"value":"9220",
"childrens":[]},
{
"label":"尚寨乡",
"value":"9221",
"childrens":[]}]},

{
"label":"麻江县",
"value":"2211",
"childrens":[{
"label":"杏山镇",
"value":"9358",
"childrens":[]},
{
"label":"谷硐镇",
"value":"9359",
"childrens":[]},
{
"label":"下司镇",
"value":"9360",
"childrens":[]},
{
"label":"宣威镇",
"value":"9361",
"childrens":[]},
{
"label":"碧波乡",
"value":"9362",
"childrens":[]},
{
"label":"龙山乡",
"value":"9363",
"childrens":[]},
{
"label":"贤昌乡",
"value":"9364",
"childrens":[]},
{
"label":"坝芒乡",
"value":"9365",
"childrens":[]},
{
"label":"景阳乡",
"value":"9366",
"childrens":[]}]},

{
"label":"台江县",
"value":"2212",
"childrens":[{
"label":"台拱镇",
"value":"9276",
"childrens":[]},
{
"label":"施洞镇",
"value":"9277",
"childrens":[]},
{
"label":"南宫乡",
"value":"9278",
"childrens":[]},
{
"label":"排羊乡",
"value":"9279",
"childrens":[]},
{
"label":"台盘乡",
"value":"9280",
"childrens":[]},
{
"label":"革一乡",
"value":"9281",
"childrens":[]},
{
"label":"老屯乡",
"value":"9282",
"childrens":[]},
{
"label":"方召乡",
"value":"9283",
"childrens":[]}]},

{
"label":"天柱县",
"value":"2213",
"childrens":[{
"label":"凤城镇",
"value":"9233",
"childrens":[]},
{
"label":"邦洞镇",
"value":"9234",
"childrens":[]},
{
"label":"坪地镇",
"value":"9235",
"childrens":[]},
{
"label":"兰田镇",
"value":"9236",
"childrens":[]},
{
"label":"瓮洞镇",
"value":"9237",
"childrens":[]},
{
"label":"高酿镇",
"value":"9238",
"childrens":[]},
{
"label":"石洞镇",
"value":"9239",
"childrens":[]},
{
"label":"远口镇",
"value":"9240",
"childrens":[]},
{
"label":"坌处镇",
"value":"9241",
"childrens":[]},
{
"label":"白市镇",
"value":"9242",
"childrens":[]},
{
"label":"社学乡",
"value":"9243",
"childrens":[]},
{
"label":"渡马乡",
"value":"9244",
"childrens":[]},
{
"label":"注溪乡",
"value":"9245",
"childrens":[]},
{
"label":"地湖乡",
"value":"9246",
"childrens":[]},
{
"label":"竹林乡",
"value":"9247",
"childrens":[]},
{
"label":"江东乡",
"value":"9248",
"childrens":[]}]},

{
"label":"黄平县",
"value":"2214",
"childrens":[{
"label":"新州镇",
"value":"9187",
"childrens":[]},
{
"label":"旧州镇",
"value":"9188",
"childrens":[]},
{
"label":"重安镇",
"value":"9189",
"childrens":[]},
{
"label":"谷陇镇",
"value":"9190",
"childrens":[]},
{
"label":"平溪镇",
"value":"9191",
"childrens":[]},
{
"label":"黄飘乡",
"value":"9192",
"childrens":[]},
{
"label":"上塘乡",
"value":"9193",
"childrens":[]},
{
"label":"纸房乡",
"value":"9194",
"childrens":[]},
{
"label":"浪洞乡",
"value":"9195",
"childrens":[]},
{
"label":"翁坪乡",
"value":"9196",
"childrens":[]},
{
"label":"重兴乡",
"value":"9197",
"childrens":[]},
{
"label":"苗陇乡",
"value":"9198",
"childrens":[]},
{
"label":"野洞河乡",
"value":"9199",
"childrens":[]},
{
"label":"一碗水乡",
"value":"9200",
"childrens":[]}]},

{
"label":"榕江县",
"value":"2215",
"childrens":[{
"label":"古州镇",
"value":"9309",
"childrens":[]},
{
"label":"忠诚镇",
"value":"9310",
"childrens":[]},
{
"label":"寨蒿镇",
"value":"9311",
"childrens":[]},
{
"label":"平永镇",
"value":"9312",
"childrens":[]},
{
"label":"乐里镇",
"value":"9313",
"childrens":[]},
{
"label":"朗洞镇",
"value":"9314",
"childrens":[]},
{
"label":"栽麻乡",
"value":"9315",
"childrens":[]},
{
"label":"崇义乡",
"value":"9316",
"childrens":[]},
{
"label":"平江乡",
"value":"9317",
"childrens":[]},
{
"label":"三江乡",
"value":"9318",
"childrens":[]},
{
"label":"仁里乡",
"value":"9319",
"childrens":[]},
{
"label":"塔石乡",
"value":"9320",
"childrens":[]},
{
"label":"八开乡",
"value":"9321",
"childrens":[]},
{
"label":"定威乡",
"value":"9322",
"childrens":[]},
{
"label":"兴华乡",
"value":"9323",
"childrens":[]},
{
"label":"计划乡",
"value":"9324",
"childrens":[]},
{
"label":"水尾乡",
"value":"9325",
"childrens":[]},
{
"label":"平阳乡",
"value":"9326",
"childrens":[]},
{
"label":"两汪乡",
"value":"9327",
"childrens":[]}]},

{
"label":"剑河县",
"value":"2216",
"childrens":[{
"label":"柳川镇",
"value":"9264",
"childrens":[]},
{
"label":"岑松镇",
"value":"9265",
"childrens":[]},
{
"label":"南加镇",
"value":"9266",
"childrens":[]},
{
"label":"南明镇",
"value":"9267",
"childrens":[]},
{
"label":"革东镇",
"value":"9268",
"childrens":[]},
{
"label":"久仰乡",
"value":"9269",
"childrens":[]},
{
"label":"太拥乡",
"value":"9270",
"childrens":[]},
{
"label":"南哨乡",
"value":"9271",
"childrens":[]},
{
"label":"南寨乡",
"value":"9272",
"childrens":[]},
{
"label":"盘溪乡",
"value":"9273",
"childrens":[]},
{
"label":"敏洞乡",
"value":"9274",
"childrens":[]},
{
"label":"观么乡",
"value":"9275",
"childrens":[]}]},

{
"label":"三穗县",
"value":"2217",
"childrens":[{
"label":"八弓镇",
"value":"9201",
"childrens":[]},
{
"label":"台烈镇",
"value":"9202",
"childrens":[]},
{
"label":"瓦寨镇",
"value":"9203",
"childrens":[]},
{
"label":"桐林镇",
"value":"9204",
"childrens":[]},
{
"label":"雪洞镇",
"value":"9205",
"childrens":[]},
{
"label":"滚马乡",
"value":"9206",
"childrens":[]},
{
"label":"长吉乡",
"value":"9207",
"childrens":[]},
{
"label":"款场乡",
"value":"9208",
"childrens":[]},
{
"label":"良上乡",
"value":"9209",
"childrens":[]}]},

{
"label":"雷山县",
"value":"2218",
"childrens":[{
"label":"丹江镇",
"value":"9349",
"childrens":[]},
{
"label":"西江镇",
"value":"9350",
"childrens":[]},
{
"label":"永乐镇",
"value":"9351",
"childrens":[]},
{
"label":"郎德镇",
"value":"9352",
"childrens":[]},
{
"label":"望丰乡",
"value":"9353",
"childrens":[]},
{
"label":"大塘乡",
"value":"9354",
"childrens":[]},
{
"label":"桃江乡",
"value":"9355",
"childrens":[]},
{
"label":"达地乡",
"value":"9356",
"childrens":[]},
{
"label":"方祥乡",
"value":"9357",
"childrens":[]}]},

{
"label":"黎平县",
"value":"2219",
"childrens":[{
"label":"德凤镇",
"value":"9284",
"childrens":[]},
{
"label":"高屯镇",
"value":"9285",
"childrens":[]},
{
"label":"中潮镇",
"value":"9286",
"childrens":[]},
{
"label":"孟彦镇",
"value":"9287",
"childrens":[]},
{
"label":"敖市镇",
"value":"9288",
"childrens":[]},
{
"label":"九潮镇",
"value":"9289",
"childrens":[]},
{
"label":"岩洞镇",
"value":"9290",
"childrens":[]},
{
"label":"水口镇",
"value":"9291",
"childrens":[]},
{
"label":"洪州镇",
"value":"9292",
"childrens":[]},
{
"label":"尚重镇",
"value":"9293",
"childrens":[]},
{
"label":"顺化乡",
"value":"9294",
"childrens":[]},
{
"label":"雷洞乡",
"value":"9295",
"childrens":[]},
{
"label":"永从乡",
"value":"9296",
"childrens":[]},
{
"label":"罗里乡",
"value":"9297",
"childrens":[]},
{
"label":"茅贡乡",
"value":"9298",
"childrens":[]},
{
"label":"坝寨乡",
"value":"9299",
"childrens":[]},
{
"label":"口江乡",
"value":"9300",
"childrens":[]},
{
"label":"双江乡",
"value":"9301",
"childrens":[]},
{
"label":"肇兴乡",
"value":"9302",
"childrens":[]},
{
"label":"龙额乡",
"value":"9303",
"childrens":[]},
{
"label":"地坪乡",
"value":"9304",
"childrens":[]},
{
"label":"德顺乡",
"value":"9305",
"childrens":[]},
{
"label":"大稼乡",
"value":"9306",
"childrens":[]},
{
"label":"平寨乡",
"value":"9307",
"childrens":[]},
{
"label":"德化乡",
"value":"9308",
"childrens":[]}]},

{
"label":"岑巩县",
"value":"2220",
"childrens":[{
"label":"思旸镇",
"value":"9222",
"childrens":[]},
{
"label":"水尾镇",
"value":"9223",
"childrens":[]},
{
"label":"天马镇",
"value":"9224",
"childrens":[]},
{
"label":"龙田镇",
"value":"9225",
"childrens":[]},
{
"label":"大有乡",
"value":"9226",
"childrens":[]},
{
"label":"注溪乡",
"value":"9227",
"childrens":[]},
{
"label":"天星乡",
"value":"9228",
"childrens":[]},
{
"label":"羊桥乡",
"value":"9229",
"childrens":[]},
{
"label":"凯本乡",
"value":"9230",
"childrens":[]},
{
"label":"平庄乡",
"value":"9231",
"childrens":[]},
{
"label":"客楼乡",
"value":"9232",
"childrens":[]}]},

{
"label":"丹寨县",
"value":"2221",
"childrens":[{
"label":"龙泉镇",
"value":"9367",
"childrens":[]},
{
"label":"兴仁镇",
"value":"9368",
"childrens":[]},
{
"label":"排调镇",
"value":"9369",
"childrens":[]},
{
"label":"长青乡",
"value":"9370",
"childrens":[]},
{
"label":"扬武乡",
"value":"9371",
"childrens":[]},
{
"label":"雅灰乡",
"value":"9372",
"childrens":[]},
{
"label":"南皋乡",
"value":"9373",
"childrens":[]}]}]},


{
"label":"黔南州",
"value":"2222",
"childrens":[{
"label":"都匀市",
"value":"2223",
"childrens":[{
"label":"广惠街道",
"value":"9375",
"childrens":[]},
{
"label":"文峰街道",
"value":"9376",
"childrens":[]},
{
"label":"新华街道",
"value":"9377",
"childrens":[]},
{
"label":"小围寨街道",
"value":"9378",
"childrens":[]},
{
"label":"沙包堡街道",
"value":"9379",
"childrens":[]},
{
"label":"杨柳街镇",
"value":"9380",
"childrens":[]},
{
"label":"甘塘镇",
"value":"9381",
"childrens":[]},
{
"label":"洛邦镇",
"value":"9382",
"childrens":[]},
{
"label":"坝固镇",
"value":"9383",
"childrens":[]},
{
"label":"大坪镇",
"value":"9384",
"childrens":[]},
{
"label":"王司镇",
"value":"9385",
"childrens":[]},
{
"label":"墨冲镇",
"value":"9386",
"childrens":[]},
{
"label":"平浪镇",
"value":"9387",
"childrens":[]},
{
"label":"凯口镇",
"value":"9388",
"childrens":[]},
{
"label":"江洲镇",
"value":"9389",
"childrens":[]},
{
"label":"奉合乡",
"value":"9390",
"childrens":[]},
{
"label":"阳和乡",
"value":"9391",
"childrens":[]},
{
"label":"基场乡",
"value":"9392",
"childrens":[]},
{
"label":"良亩乡",
"value":"9393",
"childrens":[]},
{
"label":"河阳乡",
"value":"9394",
"childrens":[]},
{
"label":"沙寨乡",
"value":"9395",
"childrens":[]},
{
"label":"石龙乡",
"value":"9396",
"childrens":[]},
{
"label":"摆忙乡",
"value":"9397",
"childrens":[]}]},

{
"label":"福泉市",
"value":"2224",
"childrens":[{
"label":"金山街道",
"value":"9398",
"childrens":[]},
{
"label":"马场坪街道",
"value":"9399",
"childrens":[]},
{
"label":"城厢镇",
"value":"9400",
"childrens":[]},
{
"label":"黄丝镇",
"value":"9401",
"childrens":[]},
{
"label":"凤山镇",
"value":"9402",
"childrens":[]},
{
"label":"陆坪镇",
"value":"9403",
"childrens":[]},
{
"label":"地松镇",
"value":"9404",
"childrens":[]},
{
"label":"龙昌镇",
"value":"9405",
"childrens":[]},
{
"label":"牛场镇",
"value":"9406",
"childrens":[]},
{
"label":"道坪镇",
"value":"9407",
"childrens":[]},
{
"label":"高坪镇",
"value":"9408",
"childrens":[]},
{
"label":"兴隆乡",
"value":"9409",
"childrens":[]},
{
"label":"藜山乡",
"value":"9410",
"childrens":[]},
{
"label":"岔河乡",
"value":"9411",
"childrens":[]},
{
"label":"仙桥乡",
"value":"9412",
"childrens":[]},
{
"label":"高石乡",
"value":"9413",
"childrens":[]},
{
"label":"谷汪乡",
"value":"9414",
"childrens":[]}]},

{
"label":"贵定市",
"value":"2225",
"childrens":[{
"label":"城关镇",
"value":"9432",
"childrens":[]},
{
"label":"德新镇",
"value":"9433",
"childrens":[]},
{
"label":"新巴镇",
"value":"9434",
"childrens":[]},
{
"label":"盘江镇",
"value":"9435",
"childrens":[]},
{
"label":"沿山镇",
"value":"9436",
"childrens":[]},
{
"label":"旧治镇",
"value":"9437",
"childrens":[]},
{
"label":"昌明镇",
"value":"9438",
"childrens":[]},
{
"label":"云雾镇",
"value":"9439",
"childrens":[]},
{
"label":"新铺乡",
"value":"9440",
"childrens":[]},
{
"label":"定东乡",
"value":"9441",
"childrens":[]},
{
"label":"定南乡",
"value":"9442",
"childrens":[]},
{
"label":"巩固乡",
"value":"9443",
"childrens":[]},
{
"label":"都六乡",
"value":"9444",
"childrens":[]},
{
"label":"岩下乡",
"value":"9445",
"childrens":[]},
{
"label":"抱管乡",
"value":"9446",
"childrens":[]},
{
"label":"铁厂乡",
"value":"9447",
"childrens":[]},
{
"label":"窑上乡",
"value":"9448",
"childrens":[]},
{
"label":"猴场堡乡",
"value":"9449",
"childrens":[]},
{
"label":"落北河乡",
"value":"9450",
"childrens":[]},
{
"label":"马场河乡",
"value":"9451",
"childrens":[]}]},

{
"label":"惠水县",
"value":"2226",
"childrens":[{
"label":"和平镇",
"value":"9570",
"childrens":[]},
{
"label":"高镇镇",
"value":"9571",
"childrens":[]},
{
"label":"三都镇",
"value":"9572",
"childrens":[]},
{
"label":"摆金镇",
"value":"9573",
"childrens":[]},
{
"label":"雅水镇",
"value":"9574",
"childrens":[]},
{
"label":"断杉镇",
"value":"9575",
"childrens":[]},
{
"label":"芦山镇",
"value":"9576",
"childrens":[]},
{
"label":"王佑镇",
"value":"9577",
"childrens":[]},
{
"label":"长田乡",
"value":"9578",
"childrens":[]},
{
"label":"摆榜乡",
"value":"9579",
"childrens":[]},
{
"label":"斗底乡",
"value":"9580",
"childrens":[]},
{
"label":"甲烈乡",
"value":"9581",
"childrens":[]},
{
"label":"岗度乡",
"value":"9582",
"childrens":[]},
{
"label":"宁旺乡",
"value":"9583",
"childrens":[]},
{
"label":"鸭绒乡",
"value":"9584",
"childrens":[]},
{
"label":"太阳乡",
"value":"9585",
"childrens":[]},
{
"label":"羡塘乡",
"value":"9586",
"childrens":[]},
{
"label":"甲戎乡",
"value":"9587",
"childrens":[]},
{
"label":"抵季乡",
"value":"9588",
"childrens":[]},
{
"label":"大龙乡",
"value":"9589",
"childrens":[]},
{
"label":"大坝乡",
"value":"9590",
"childrens":[]},
{
"label":"抵麻乡",
"value":"9591",
"childrens":[]},
{
"label":"长安乡",
"value":"9592",
"childrens":[]},
{
"label":"打引乡",
"value":"9593",
"childrens":[]},
{
"label":"好花红乡",
"value":"9594",
"childrens":[]}]},

{
"label":"罗甸县",
"value":"2227",
"childrens":[{
"label":"龙坪镇",
"value":"9512",
"childrens":[]},
{
"label":"边阳镇",
"value":"9513",
"childrens":[]},
{
"label":"逢亭镇",
"value":"9514",
"childrens":[]},
{
"label":"沫阳镇",
"value":"9515",
"childrens":[]},
{
"label":"茂井镇",
"value":"9516",
"childrens":[]},
{
"label":"罗悃镇",
"value":"9517",
"childrens":[]},
{
"label":"红水河镇",
"value":"9518",
"childrens":[]},
{
"label":"板庚乡",
"value":"9519",
"childrens":[]},
{
"label":"云干乡",
"value":"9520",
"childrens":[]},
{
"label":"八总乡",
"value":"9521",
"childrens":[]},
{
"label":"栗木乡",
"value":"9522",
"childrens":[]},
{
"label":"罗沙乡",
"value":"9523",
"childrens":[]},
{
"label":"交砚乡",
"value":"9524",
"childrens":[]},
{
"label":"董王乡",
"value":"9525",
"childrens":[]},
{
"label":"木引乡",
"value":"9526",
"childrens":[]},
{
"label":"纳坪乡",
"value":"9527",
"childrens":[]},
{
"label":"董当乡",
"value":"9528",
"childrens":[]},
{
"label":"董架乡",
"value":"9529",
"childrens":[]},
{
"label":"平岩乡",
"value":"9530",
"childrens":[]},
{
"label":"凤亭乡",
"value":"9531",
"childrens":[]},
{
"label":"大亭乡",
"value":"9532",
"childrens":[]},
{
"label":"班仁乡",
"value":"9533",
"childrens":[]},
{
"label":"罗苏乡",
"value":"9534",
"childrens":[]},
{
"label":"罗暮乡",
"value":"9535",
"childrens":[]},
{
"label":"沟亭乡",
"value":"9536",
"childrens":[]},
{
"label":"罗妥乡",
"value":"9537",
"childrens":[]}]},

{
"label":"瓮安县",
"value":"2228",
"childrens":[{
"label":"平定营镇",
"value":"9452",
"childrens":[]},
{
"label":"雍阳镇",
"value":"9453",
"childrens":[]},
{
"label":"草塘镇",
"value":"9454",
"childrens":[]},
{
"label":"中坪镇",
"value":"9455",
"childrens":[]},
{
"label":"建中镇",
"value":"9456",
"childrens":[]},
{
"label":"永和镇",
"value":"9457",
"childrens":[]},
{
"label":"珠藏镇",
"value":"9458",
"childrens":[]},
{
"label":"玉山镇",
"value":"9459",
"childrens":[]},
{
"label":"天文镇",
"value":"9460",
"childrens":[]},
{
"label":"玉华乡",
"value":"9461",
"childrens":[]},
{
"label":"银盏乡",
"value":"9462",
"childrens":[]},
{
"label":"松坪乡",
"value":"9463",
"childrens":[]},
{
"label":"白沙乡",
"value":"9464",
"childrens":[]},
{
"label":"岚关乡",
"value":"9465",
"childrens":[]},
{
"label":"高水乡",
"value":"9466",
"childrens":[]},
{
"label":"铜锣乡",
"value":"9467",
"childrens":[]},
{
"label":"鱼河乡",
"value":"9468",
"childrens":[]},
{
"label":"龙塘乡",
"value":"9469",
"childrens":[]},
{
"label":"老坟嘴乡",
"value":"9470",
"childrens":[]},
{
"label":"木引槽乡",
"value":"9471",
"childrens":[]},
{
"label":"牛场坝乡",
"value":"9472",
"childrens":[]},
{
"label":"小河山乡",
"value":"9473",
"childrens":[]},
{
"label":"木老坪乡",
"value":"9474",
"childrens":[]}]},

{
"label":"荔波县",
"value":"2229",
"childrens":[{
"label":"玉屏镇",
"value":"9415",
"childrens":[]},
{
"label":"朝阳镇",
"value":"9416",
"childrens":[]},
{
"label":"茂兰镇",
"value":"9417",
"childrens":[]},
{
"label":"立化镇",
"value":"9418",
"childrens":[]},
{
"label":"甲良镇",
"value":"9419",
"childrens":[]},
{
"label":"佳荣镇",
"value":"9420",
"childrens":[]},
{
"label":"永康乡",
"value":"9421",
"childrens":[]},
{
"label":"水尧乡",
"value":"9422",
"childrens":[]},
{
"label":"水利乡",
"value":"9423",
"childrens":[]},
{
"label":"瑶山乡",
"value":"9424",
"childrens":[]},
{
"label":"捞村乡",
"value":"9425",
"childrens":[]},
{
"label":"翁昂乡",
"value":"9426",
"childrens":[]},
{
"label":"驾欧乡",
"value":"9427",
"childrens":[]},
{
"label":"瑶麓乡",
"value":"9428",
"childrens":[]},
{
"label":"洞塘乡",
"value":"9429",
"childrens":[]},
{
"label":"方村乡",
"value":"9430",
"childrens":[]},
{
"label":"播尧乡",
"value":"9431",
"childrens":[]}]},

{
"label":"龙里县",
"value":"2230",
"childrens":[{
"label":"龙山镇",
"value":"9556",
"childrens":[]},
{
"label":"三元镇",
"value":"9557",
"childrens":[]},
{
"label":"醒狮镇",
"value":"9558",
"childrens":[]},
{
"label":"谷脚镇",
"value":"9559",
"childrens":[]},
{
"label":"羊场镇",
"value":"9560",
"childrens":[]},
{
"label":"洗马镇",
"value":"9561",
"childrens":[]},
{
"label":"草原乡",
"value":"9562",
"childrens":[]},
{
"label":"麻芝乡",
"value":"9563",
"childrens":[]},
{
"label":"水场乡",
"value":"9564",
"childrens":[]},
{
"label":"湾寨乡",
"value":"9565",
"childrens":[]},
{
"label":"摆省乡",
"value":"9566",
"childrens":[]},
{
"label":"巴江乡",
"value":"9567",
"childrens":[]},
{
"label":"谷龙乡",
"value":"9568",
"childrens":[]},
{
"label":"哪嗙乡",
"value":"9569",
"childrens":[]}]},

{
"label":"平塘县",
"value":"2231",
"childrens":[{
"label":"平湖镇",
"value":"9493",
"childrens":[]},
{
"label":"牙舟镇",
"value":"9494",
"childrens":[]},
{
"label":"通州镇",
"value":"9495",
"childrens":[]},
{
"label":"大塘镇",
"value":"9496",
"childrens":[]},
{
"label":"克度镇",
"value":"9497",
"childrens":[]},
{
"label":"塘边镇",
"value":"9498",
"childrens":[]},
{
"label":"摆茹镇",
"value":"9499",
"childrens":[]},
{
"label":"者密镇",
"value":"9500",
"childrens":[]},
{
"label":"四寨镇",
"value":"9501",
"childrens":[]},
{
"label":"苗二河乡",
"value":"9502",
"childrens":[]},
{
"label":"卡蒲乡",
"value":"9503",
"childrens":[]},
{
"label":"白龙乡",
"value":"9504",
"childrens":[]},
{
"label":"甘寨乡",
"value":"9505",
"childrens":[]},
{
"label":"卡罗乡",
"value":"9506",
"childrens":[]},
{
"label":"谷硐乡",
"value":"9507",
"childrens":[]},
{
"label":"鼠场乡",
"value":"9508",
"childrens":[]},
{
"label":"新塘乡",
"value":"9509",
"childrens":[]},
{
"label":"掌布乡",
"value":"9510",
"childrens":[]},
{
"label":"西凉乡",
"value":"9511",
"childrens":[]}]},

{
"label":"长顺县",
"value":"2232",
"childrens":[{
"label":"白云山镇",
"value":"9538",
"childrens":[]},
{
"label":"长寨镇",
"value":"9539",
"childrens":[]},
{
"label":"广顺镇",
"value":"9540",
"childrens":[]},
{
"label":"威远镇",
"value":"9541",
"childrens":[]},
{
"label":"摆所镇",
"value":"9542",
"childrens":[]},
{
"label":"代化镇",
"value":"9543",
"childrens":[]},
{
"label":"鼓扬镇",
"value":"9544",
"childrens":[]},
{
"label":"马路乡",
"value":"9545",
"childrens":[]},
{
"label":"凯佐乡",
"value":"9546",
"childrens":[]},
{
"label":"摆塘乡",
"value":"9547",
"childrens":[]},
{
"label":"种获乡",
"value":"9548",
"childrens":[]},
{
"label":"新寨乡",
"value":"9549",
"childrens":[]},
{
"label":"营盘乡",
"value":"9550",
"childrens":[]},
{
"label":"中坝乡",
"value":"9551",
"childrens":[]},
{
"label":"睦化乡",
"value":"9552",
"childrens":[]},
{
"label":"交麻乡",
"value":"9553",
"childrens":[]},
{
"label":"敦操乡",
"value":"9554",
"childrens":[]},
{
"label":"广顺茶叶果树场",
"value":"9555",
"childrens":[]}]},

{
"label":"独山县",
"value":"2233",
"childrens":[{
"label":"城关镇",
"value":"9475",
"childrens":[]},
{
"label":"兔场镇",
"value":"9476",
"childrens":[]},
{
"label":"麻万镇",
"value":"9477",
"childrens":[]},
{
"label":"基长镇",
"value":"9478",
"childrens":[]},
{
"label":"上司镇",
"value":"9479",
"childrens":[]},
{
"label":"下司镇",
"value":"9480",
"childrens":[]},
{
"label":"甲里镇",
"value":"9481",
"childrens":[]},
{
"label":"麻尾镇",
"value":"9482",
"childrens":[]},
{
"label":"尧梭乡",
"value":"9483",
"childrens":[]},
{
"label":"羊凤乡",
"value":"9484",
"childrens":[]},
{
"label":"甲定乡",
"value":"9485",
"childrens":[]},
{
"label":"翁台乡",
"value":"9486",
"childrens":[]},
{
"label":"本寨乡",
"value":"9487",
"childrens":[]},
{
"label":"水岩乡",
"value":"9488",
"childrens":[]},
{
"label":"打羊乡",
"value":"9489",
"childrens":[]},
{
"label":"尧棒乡",
"value":"9490",
"childrens":[]},
{
"label":"黄后乡",
"value":"9491",
"childrens":[]},
{
"label":"董岭乡",
"value":"9492",
"childrens":[]}]},

{
"label":"三都县",
"value":"2234",
"childrens":[{
"label":"三合镇",
"value":"9595",
"childrens":[]},
{
"label":"大河镇",
"value":"9596",
"childrens":[]},
{
"label":"合江镇",
"value":"9597",
"childrens":[]},
{
"label":"丰乐镇",
"value":"9598",
"childrens":[]},
{
"label":"普安镇",
"value":"9599",
"childrens":[]},
{
"label":"都江镇",
"value":"9600",
"childrens":[]},
{
"label":"中和镇",
"value":"9601",
"childrens":[]},
{
"label":"周覃镇",
"value":"9602",
"childrens":[]},
{
"label":"廷牌镇",
"value":"9603",
"childrens":[]},
{
"label":"九阡镇",
"value":"9604",
"childrens":[]},
{
"label":"交梨乡",
"value":"9605",
"childrens":[]},
{
"label":"拉揽乡",
"value":"9606",
"childrens":[]},
{
"label":"打鱼乡",
"value":"9607",
"childrens":[]},
{
"label":"坝街乡",
"value":"9608",
"childrens":[]},
{
"label":"羊福乡",
"value":"9609",
"childrens":[]},
{
"label":"巫不乡",
"value":"9610",
"childrens":[]},
{
"label":"水龙乡",
"value":"9611",
"childrens":[]},
{
"label":"塘州乡",
"value":"9612",
"childrens":[]},
{
"label":"三洞乡",
"value":"9613",
"childrens":[]},
{
"label":"恒丰乡",
"value":"9614",
"childrens":[]},
{
"label":"扬拱乡",
"value":"9615",
"childrens":[]}]}]}]},



{
"label":"云南",
"value":"25",
"childrens":[{
"label":"昆明市",
"value":"2235",
"childrens":[{
"label":"东川区",
"value":"2236",
"childrens":[{
"label":"铜都镇",
"value":"5515",
"childrens":[]},
{
"label":"汤丹镇",
"value":"5516",
"childrens":[]},
{
"label":"因民镇",
"value":"5517",
"childrens":[]},
{
"label":"拖布卡镇",
"value":"5518",
"childrens":[]},
{
"label":"红土地镇",
"value":"5519",
"childrens":[]},
{
"label":"乌龙镇",
"value":"5520",
"childrens":[]},
{
"label":"阿旺镇",
"value":"5521",
"childrens":[]},
{
"label":"舍块乡",
"value":"5522",
"childrens":[]}]},

{
"label":"安宁市",
"value":"2237",
"childrens":[{
"label":"连然街道",
"value":"5523",
"childrens":[]},
{
"label":"八街镇",
"value":"5524",
"childrens":[]},
{
"label":"禄脿镇",
"value":"5525",
"childrens":[]},
{
"label":"温泉镇",
"value":"5526",
"childrens":[]},
{
"label":"青龙镇",
"value":"5527",
"childrens":[]},
{
"label":"太平镇",
"value":"5528",
"childrens":[]},
{
"label":"草铺镇",
"value":"5529",
"childrens":[]},
{
"label":"县街镇",
"value":"5530",
"childrens":[]}]},

{
"label":"富民县",
"value":"2238",
"childrens":[{
"label":"永定街道",
"value":"5531",
"childrens":[]},
{
"label":"罗免镇",
"value":"5533",
"childrens":[]},
{
"label":"赤鹫镇",
"value":"5534",
"childrens":[]},
{
"label":"款庄镇",
"value":"5535",
"childrens":[]},
{
"label":"东村镇",
"value":"5536",
"childrens":[]},
{
"label":"散旦镇",
"value":"5537",
"childrens":[]}]},

{
"label":"嵩明县",
"value":"2239",
"childrens":[{
"label":"嵩阳镇",
"value":"5538",
"childrens":[]},
{
"label":"杨林镇",
"value":"5539",
"childrens":[]},
{
"label":"小街镇",
"value":"5540",
"childrens":[]},
{
"label":"牛栏江镇",
"value":"5541",
"childrens":[]},
{
"label":"滇源镇",
"value":"5542",
"childrens":[]},
{
"label":"阿子营乡",
"value":"5544",
"childrens":[]}]},

{
"label":"晋宁县",
"value":"2241",
"childrens":[{
"label":"昆阳镇",
"value":"5552",
"childrens":[]},
{
"label":"晋城镇",
"value":"5553",
"childrens":[]},
{
"label":"二街镇",
"value":"5555",
"childrens":[]},
{
"label":"新街乡",
"value":"5556",
"childrens":[]},
{
"label":"双河乡",
"value":"5557",
"childrens":[]},
{
"label":"夕阳乡",
"value":"5558",
"childrens":[]},
{
"label":"上蒜乡",
"value":"5559",
"childrens":[]},
{
"label":"六街乡",
"value":"5560",
"childrens":[]}]},

{
"label":"宜良县",
"value":"2242",
"childrens":[{
"label":"匡远镇",
"value":"5561",
"childrens":[]},
{
"label":"汤池镇",
"value":"5562",
"childrens":[]},
{
"label":"狗街镇",
"value":"5564",
"childrens":[]},
{
"label":"北古城镇",
"value":"5565",
"childrens":[]},
{
"label":"马街乡",
"value":"5566",
"childrens":[]},
{
"label":"竹山乡",
"value":"5567",
"childrens":[]},
{
"label":"耿家乡",
"value":"5568",
"childrens":[]},
{
"label":"九乡乡",
"value":"5569",
"childrens":[]}]},

{
"label":"禄劝县",
"value":"2243",
"childrens":[]},
{
"label":"石林县",
"value":"2244",
"childrens":[{
"label":"鹿阜镇",
"value":"5570",
"childrens":[]},
{
"label":"石林镇",
"value":"5571",
"childrens":[]},
{
"label":"板桥镇",
"value":"5572",
"childrens":[]},
{
"label":"圭山镇",
"value":"5573",
"childrens":[]},
{
"label":"长湖镇",
"value":"5574",
"childrens":[]},
{
"label":"西街口镇",
"value":"5576",
"childrens":[]},
{
"label":"大可乡",
"value":"5577",
"childrens":[]}]},

{
"label":"寻甸县",
"value":"2245",
"childrens":[{
"label":"仁德镇",
"value":"5578",
"childrens":[]},
{
"label":"羊街镇",
"value":"5580",
"childrens":[]},
{
"label":"柯渡镇",
"value":"5581",
"childrens":[]},
{
"label":"倘甸镇",
"value":"5582",
"childrens":[]},
{
"label":"功山镇",
"value":"5583",
"childrens":[]},
{
"label":"河口乡",
"value":"5584",
"childrens":[]},
{
"label":"七星乡",
"value":"5585",
"childrens":[]},
{
"label":"先锋乡",
"value":"5587",
"childrens":[]},
{
"label":"六哨乡",
"value":"5588",
"childrens":[]},
{
"label":"鸡街乡",
"value":"5589",
"childrens":[]},
{
"label":"风仪乡",
"value":"5590",
"childrens":[]},
{
"label":"联合乡",
"value":"5591",
"childrens":[]},
{
"label":"金源乡",
"value":"5592",
"childrens":[]},
{
"label":"甸沙乡",
"value":"5593",
"childrens":[]}]},

{
"label":"盘龙区",
"value":"2246",
"childrens":[]},
{
"label":"五华区",
"value":"3912",
"childrens":[]},
{
"label":"官渡区",
"value":"3913",
"childrens":[]},
{
"label":"西山区",
"value":"3914",
"childrens":[]},
{
"label":"呈贡区",
"value":"53729",
"childrens":[]}]},

{
"label":"曲靖市",
"value":"2247",
"childrens":[{
"label":"马龙县",
"value":"2249",
"childrens":[]},
{
"label":"宣威市",
"value":"2250",
"childrens":[]},
{
"label":"富源县",
"value":"2251",
"childrens":[]},
{
"label":"会泽县",
"value":"2252",
"childrens":[]},
{
"label":"陆良县",
"value":"2253",
"childrens":[{
"label":"马街镇",
"value":"5979",
"childrens":[]},
{
"label":"小百户镇",
"value":"5980",
"childrens":[]},
{
"label":"三岔河镇",
"value":"5981",
"childrens":[]},
{
"label":"芳华镇",
"value":"5982",
"childrens":[]},
{
"label":"中枢镇",
"value":"5983",
"childrens":[]},
{
"label":"大莫古镇",
"value":"5984",
"childrens":[]},
{
"label":"活水乡",
"value":"5985",
"childrens":[]},
{
"label":"召夸镇",
"value":"5986",
"childrens":[]},
{
"label":"板桥镇",
"value":"5987",
"childrens":[]},
{
"label":"龙海乡",
"value":"5988",
"childrens":[]}]},

{
"label":"师宗县",
"value":"2254",
"childrens":[]},
{
"label":"罗平县",
"value":"2255",
"childrens":[]},
{
"label":"沾益县",
"value":"2256",
"childrens":[]},
{
"label":"麒麟区",
"value":"53730",
"childrens":[]}]},

{
"label":"玉溪市",
"value":"2258",
"childrens":[{
"label":"红塔区",
"value":"2259",
"childrens":[{
"label":"玉兴路街道",
"value":"5989",
"childrens":[]},
{
"label":"凤凰路街道",
"value":"5990",
"childrens":[]},
{
"label":"玉带路街道",
"value":"5991",
"childrens":[]},
{
"label":"北城街道",
"value":"5992",
"childrens":[]},
{
"label":"春和街道",
"value":"5993",
"childrens":[]},
{
"label":"李棋街道",
"value":"5994",
"childrens":[]},
{
"label":"大营街街道",
"value":"5995",
"childrens":[]},
{
"label":"研和街道",
"value":"5996",
"childrens":[]},
{
"label":"高仓街道",
"value":"5997",
"childrens":[]},
{
"label":"小石桥乡",
"value":"5998",
"childrens":[]},
{
"label":"洛河乡",
"value":"5999",
"childrens":[]}]},

{
"label":"华宁县",
"value":"2260",
"childrens":[{
"label":"华溪镇",
"value":"6563",
"childrens":[]},
{
"label":"宁州街道",
"value":"6564",
"childrens":[]},
{
"label":"盘溪镇",
"value":"6565",
"childrens":[]},
{
"label":"青龙镇",
"value":"6566",
"childrens":[]},
{
"label":"通红甸乡",
"value":"6567",
"childrens":[]}]},

{
"label":"澄江县",
"value":"2261",
"childrens":[{
"label":"凤麓街道",
"value":"6568",
"childrens":[]},
{
"label":"海口镇",
"value":"6569",
"childrens":[]},
{
"label":"九村镇",
"value":"6570",
"childrens":[]},
{
"label":"龙街街道",
"value":"6571",
"childrens":[]},
{
"label":"阳宗镇",
"value":"6572",
"childrens":[]},
{
"label":"右所镇",
"value":"6573",
"childrens":[]}]},

{
"label":"易门县",
"value":"2262",
"childrens":[{
"label":"龙泉街道",
"value":"6574",
"childrens":[]},
{
"label":"六街街道",
"value":"6575",
"childrens":[]},
{
"label":"绿汁镇",
"value":"6576",
"childrens":[]},
{
"label":"浦贝乡",
"value":"6577",
"childrens":[]},
{
"label":"十街乡",
"value":"6578",
"childrens":[]},
{
"label":"铜厂乡",
"value":"6579",
"childrens":[]},
{
"label":"小街乡",
"value":"6580",
"childrens":[]}]},

{
"label":"通海县",
"value":"2263",
"childrens":[{
"label":"秀山街道",
"value":"6581",
"childrens":[]},
{
"label":"杨广镇",
"value":"6582",
"childrens":[]},
{
"label":"河西镇",
"value":"6583",
"childrens":[]},
{
"label":"九龙街道",
"value":"6584",
"childrens":[]},
{
"label":"纳古镇",
"value":"6585",
"childrens":[]},
{
"label":"四街镇",
"value":"6586",
"childrens":[]},
{
"label":"高大乡",
"value":"6587",
"childrens":[]},
{
"label":"里山乡",
"value":"6588",
"childrens":[]},
{
"label":"兴蒙乡",
"value":"6589",
"childrens":[]}]},

{
"label":"江川县",
"value":"2264",
"childrens":[{
"label":"大街街道",
"value":"6590",
"childrens":[]},
{
"label":"江城镇",
"value":"6591",
"childrens":[]},
{
"label":"九溪镇",
"value":"6592",
"childrens":[]},
{
"label":"路居镇",
"value":"6593",
"childrens":[]},
{
"label":"前卫镇",
"value":"6594",
"childrens":[]},
{
"label":"雄关乡",
"value":"6595",
"childrens":[]},
{
"label":"安化乡",
"value":"6596",
"childrens":[]}]},

{
"label":"元江县",
"value":"2265",
"childrens":[{
"label":"澧江街道",
"value":"6597",
"childrens":[]},
{
"label":"红河街道",
"value":"6598",
"childrens":[]},
{
"label":"龙潭乡",
"value":"6599",
"childrens":[]},
{
"label":"咪哩乡",
"value":"6600",
"childrens":[]},
{
"label":"那诺乡",
"value":"6601",
"childrens":[]},
{
"label":"甘庄街道",
"value":"6602",
"childrens":[]},
{
"label":"洼垤乡",
"value":"6603",
"childrens":[]},
{
"label":"曼来镇",
"value":"6604",
"childrens":[]},
{
"label":"羊街乡",
"value":"6605",
"childrens":[]},
{
"label":"因远镇",
"value":"6606",
"childrens":[]}]},

{
"label":"新平县",
"value":"2266",
"childrens":[{
"label":"桂山街道",
"value":"6607",
"childrens":[]},
{
"label":"戛洒镇",
"value":"6608",
"childrens":[]},
{
"label":"建兴乡",
"value":"6609",
"childrens":[]},
{
"label":"老厂乡",
"value":"6610",
"childrens":[]},
{
"label":"漠沙镇",
"value":"6611",
"childrens":[]},
{
"label":"平甸乡",
"value":"6612",
"childrens":[]},
{
"label":"平掌乡",
"value":"6613",
"childrens":[]},
{
"label":"水塘镇",
"value":"6614",
"childrens":[]},
{
"label":"新化乡",
"value":"6615",
"childrens":[]},
{
"label":"扬武镇",
"value":"6616",
"childrens":[]},
{
"label":"古城街道",
"value":"6617",
"childrens":[]},
{
"label":"者鼋乡",
"value":"6618",
"childrens":[]}]},

{
"label":"峨山县",
"value":"2267",
"childrens":[{
"label":"双江街道",
"value":"6619",
"childrens":[]},
{
"label":"塔甸镇",
"value":"6620",
"childrens":[]},
{
"label":"小街街道",
"value":"6621",
"childrens":[]},
{
"label":"甸中镇",
"value":"6622",
"childrens":[]},
{
"label":"化念镇",
"value":"6623",
"childrens":[]},
{
"label":"岔河乡",
"value":"6624",
"childrens":[]},
{
"label":"大龙潭乡",
"value":"6625",
"childrens":[]},
{
"label":"富良棚乡",
"value":"6626",
"childrens":[]}]}]},


{
"label":"昭通市",
"value":"2270",
"childrens":[{
"label":"昭阳区",
"value":"2271",
"childrens":[]},
{
"label":"镇雄县",
"value":"2272",
"childrens":[]},
{
"label":"永善县",
"value":"2273",
"childrens":[]},
{
"label":"大关县",
"value":"2274",
"childrens":[]},
{
"label":"盐津县",
"value":"2275",
"childrens":[]},
{
"label":"彝良县",
"value":"2276",
"childrens":[]},
{
"label":"水富县",
"value":"2277",
"childrens":[]},
{
"label":"巧家县",
"value":"2278",
"childrens":[]},
{
"label":"威信县",
"value":"2279",
"childrens":[]},
{
"label":"鲁甸县",
"value":"3002",
"childrens":[]},
{
"label":"绥江县",
"value":"3003",
"childrens":[]}]},

{
"label":"普洱市",
"value":"2281",
"childrens":[{
"label":"思茅区",
"value":"2282",
"childrens":[{
"label":"思茅镇",
"value":"5959",
"childrens":[]},
{
"label":"南屏镇",
"value":"5960",
"childrens":[]},
{
"label":"倚象镇",
"value":"5961",
"childrens":[]},
{
"label":"思茅港镇",
"value":"5962",
"childrens":[]},
{
"label":"云仙乡",
"value":"5963",
"childrens":[]},
{
"label":"六顺乡",
"value":"5964",
"childrens":[]},
{
"label":"龙潭乡",
"value":"5965",
"childrens":[]},
{
"label":"曼昔农场",
"value":"5966",
"childrens":[]},
{
"label":"思茅农场",
"value":"5967",
"childrens":[]}]},

{
"label":"宁洱县",
"value":"2283",
"childrens":[]},
{
"label":"景东县",
"value":"2284",
"childrens":[]},
{
"label":"镇沅县",
"value":"2285",
"childrens":[]},
{
"label":"景谷县",
"value":"2286",
"childrens":[]},
{
"label":"墨江县",
"value":"2287",
"childrens":[]},
{
"label":"澜沧县",
"value":"2288",
"childrens":[]},
{
"label":"西盟县",
"value":"2289",
"childrens":[]},
{
"label":"江城县",
"value":"2290",
"childrens":[]},
{
"label":"孟连县",
"value":"2958",
"childrens":[]}]},

{
"label":"临沧市",
"value":"2291",
"childrens":[{
"label":"临翔区",
"value":"2292",
"childrens":[]},
{
"label":"镇康县",
"value":"2293",
"childrens":[]},
{
"label":"凤庆县",
"value":"2294",
"childrens":[]},
{
"label":"云县",
"value":"2295",
"childrens":[]},
{
"label":"永德县",
"value":"2296",
"childrens":[]},
{
"label":"耿马县",
"value":"2297",
"childrens":[]},
{
"label":"双江县",
"value":"3915",
"childrens":[]},
{
"label":"沧源县",
"value":"3916",
"childrens":[]}]},

{
"label":"保山市",
"value":"2298",
"childrens":[{
"label":"隆阳区",
"value":"2299",
"childrens":[{
"label":"永昌街道",
"value":"5918",
"childrens":[]},
{
"label":"兰城街道",
"value":"5919",
"childrens":[]},
{
"label":"板桥镇",
"value":"5920",
"childrens":[]},
{
"label":"河图镇",
"value":"5921",
"childrens":[]},
{
"label":"汉庄镇",
"value":"5922",
"childrens":[]},
{
"label":"蒲缥镇",
"value":"5923",
"childrens":[]},
{
"label":"瓦窑镇",
"value":"5924",
"childrens":[]},
{
"label":"潞江镇",
"value":"5925",
"childrens":[]},
{
"label":"金鸡乡",
"value":"5926",
"childrens":[]},
{
"label":"辛街乡",
"value":"5927",
"childrens":[]},
{
"label":"西邑乡",
"value":"5928",
"childrens":[]},
{
"label":"丙麻乡",
"value":"5929",
"childrens":[]},
{
"label":"瓦渡乡",
"value":"5930",
"childrens":[]},
{
"label":"水寨乡",
"value":"5931",
"childrens":[]},
{
"label":"瓦马乡",
"value":"5932",
"childrens":[]},
{
"label":"瓦房乡",
"value":"5933",
"childrens":[]},
{
"label":"杨柳乡",
"value":"5934",
"childrens":[]},
{
"label":"芒宽乡",
"value":"5935",
"childrens":[]}]},

{
"label":"施甸县",
"value":"2300",
"childrens":[]},
{
"label":"昌宁县",
"value":"2301",
"childrens":[]},
{
"label":"龙陵县",
"value":"2302",
"childrens":[]},
{
"label":"腾冲市",
"value":"2303",
"childrens":[]}]},

{
"label":"丽江市",
"value":"2304",
"childrens":[{
"label":"玉龙县",
"value":"2305",
"childrens":[]},
{
"label":"华坪县",
"value":"2306",
"childrens":[]},
{
"label":"永胜县",
"value":"2307",
"childrens":[]},
{
"label":"宁蒗县",
"value":"2308",
"childrens":[]},
{
"label":"古城区",
"value":"53731",
"childrens":[]}]},

{
"label":"文山州",
"value":"2309",
"childrens":[{
"label":"文山市",
"value":"2310",
"childrens":[]},
{
"label":"麻栗坡县",
"value":"2311",
"childrens":[]},
{
"label":"砚山县",
"value":"2312",
"childrens":[]},
{
"label":"广南县",
"value":"2313",
"childrens":[]},
{
"label":"马关县",
"value":"2314",
"childrens":[]},
{
"label":"富宁县",
"value":"2315",
"childrens":[]},
{
"label":"西畴县",
"value":"2316",
"childrens":[]},
{
"label":"丘北县",
"value":"2317",
"childrens":[]}]},

{
"label":"红河州",
"value":"2318",
"childrens":[{
"label":"个旧市",
"value":"2319",
"childrens":[]},
{
"label":"开远市",
"value":"2320",
"childrens":[{
"label":"乐百道街道",
"value":"5911",
"childrens":[]},
{
"label":"灵泉街道",
"value":"5912",
"childrens":[]},
{
"label":"小龙潭镇",
"value":"5913",
"childrens":[]},
{
"label":"中和营镇",
"value":"5914",
"childrens":[]},
{
"label":"大庄乡",
"value":"5915",
"childrens":[]},
{
"label":"羊街乡",
"value":"5916",
"childrens":[]},
{
"label":"碑格乡",
"value":"5917",
"childrens":[]}]},

{
"label":"弥勒县",
"value":"2321",
"childrens":[]},
{
"label":"红河县",
"value":"2322",
"childrens":[]},
{
"label":"绿春县",
"value":"2323",
"childrens":[]},
{
"label":"蒙自市",
"value":"2324",
"childrens":[{
"label":"文澜镇",
"value":"5948",
"childrens":[]},
{
"label":"草坝镇",
"value":"5949",
"childrens":[]},
{
"label":"雨过铺镇",
"value":"5950",
"childrens":[]},
{
"label":"新安所镇",
"value":"5951",
"childrens":[]},
{
"label":"芷村镇",
"value":"5952",
"childrens":[]},
{
"label":"鸣鹫镇",
"value":"5953",
"childrens":[]},
{
"label":"冷泉镇",
"value":"5954",
"childrens":[]},
{
"label":"期路白乡",
"value":"5955",
"childrens":[]},
{
"label":"老寨乡",
"value":"5956",
"childrens":[]},
{
"label":"水田乡",
"value":"5957",
"childrens":[]},
{
"label":"西北勒乡",
"value":"5958",
"childrens":[]}]},

{
"label":"泸西县",
"value":"2325",
"childrens":[]},
{
"label":"建水县",
"value":"2326",
"childrens":[]},
{
"label":"元阳县",
"value":"2327",
"childrens":[]},
{
"label":"石屏县",
"value":"2328",
"childrens":[]},
{
"label":"金平县",
"value":"2329",
"childrens":[]},
{
"label":"屏边县",
"value":"2330",
"childrens":[]},
{
"label":"河口县",
"value":"2331",
"childrens":[]}]},

{
"label":"西双版纳州",
"value":"2332",
"childrens":[{
"label":"景洪市",
"value":"2333",
"childrens":[]},
{
"label":"勐海县",
"value":"2334",
"childrens":[]},
{
"label":"勐腊县",
"value":"2335",
"childrens":[]}]},

{
"label":"楚雄州",
"value":"2336",
"childrens":[{
"label":"元谋县",
"value":"2338",
"childrens":[]},
{
"label":"南华县",
"value":"2339",
"childrens":[]},
{
"label":"牟定县",
"value":"2340",
"childrens":[]},
{
"label":"武定县",
"value":"2341",
"childrens":[]},
{
"label":"大姚县",
"value":"2342",
"childrens":[]},
{
"label":"双柏县",
"value":"2343",
"childrens":[]},
{
"label":"禄丰县",
"value":"2344",
"childrens":[]},
{
"label":"永仁县",
"value":"2345",
"childrens":[]},
{
"label":"姚安县",
"value":"3917",
"childrens":[]},
{
"label":"楚雄市",
"value":"53732",
"childrens":[]}]},

{
"label":"大理州",
"value":"2347",
"childrens":[{
"label":"剑川县",
"value":"2349",
"childrens":[]},
{
"label":"弥渡县",
"value":"2350",
"childrens":[]},
{
"label":"云龙县",
"value":"2351",
"childrens":[]},
{
"label":"洱源县",
"value":"2352",
"childrens":[]},
{
"label":"鹤庆县",
"value":"2353",
"childrens":[]},
{
"label":"宾川县",
"value":"2354",
"childrens":[]},
{
"label":"祥云县",
"value":"2355",
"childrens":[]},
{
"label":"永平县",
"value":"2356",
"childrens":[]},
{
"label":"巍山县",
"value":"2357",
"childrens":[]},
{
"label":"漾濞县",
"value":"2358",
"childrens":[]},
{
"label":"南涧县",
"value":"2359",
"childrens":[]},
{
"label":"大理市",
"value":"53733",
"childrens":[]}]},

{
"label":"德宏州",
"value":"2360",
"childrens":[{
"label":"芒市",
"value":"2361",
"childrens":[{
"label":"遮放镇",
"value":"5937",
"childrens":[]},
{
"label":"芒市镇",
"value":"5938",
"childrens":[]},
{
"label":"风平镇",
"value":"5939",
"childrens":[]},
{
"label":"勐戛镇",
"value":"5940",
"childrens":[]},
{
"label":"西山乡",
"value":"5941",
"childrens":[]},
{
"label":"中山乡",
"value":"5942",
"childrens":[]},
{
"label":"芒海镇",
"value":"5943",
"childrens":[]},
{
"label":"江东乡",
"value":"5944",
"childrens":[]},
{
"label":"五岔路乡",
"value":"5945",
"childrens":[]},
{
"label":"三台山乡",
"value":"5946",
"childrens":[]},
{
"label":"轩岗乡",
"value":"5947",
"childrens":[]}]},

{
"label":"瑞丽市",
"value":"2362",
"childrens":[]},
{
"label":"盈江县",
"value":"2363",
"childrens":[]},
{
"label":"梁河县",
"value":"2364",
"childrens":[]},
{
"label":"陇川县",
"value":"2365",
"childrens":[]}]},

{
"label":"怒江州",
"value":"2366",
"childrens":[{
"label":"泸水县",
"value":"2367",
"childrens":[]},
{
"label":"福贡县",
"value":"2368",
"childrens":[]},
{
"label":"兰坪县",
"value":"2369",
"childrens":[]},
{
"label":"贡山县",
"value":"2370",
"childrens":[]}]},

{
"label":"迪庆州",
"value":"4108",
"childrens":[{
"label":"香格里拉县",
"value":"6823",
"childrens":[]},
{
"label":"德钦县",
"value":"6824",
"childrens":[]},
{
"label":"维西县",
"value":"6825",
"childrens":[]}]}]},


{
"label":"西藏",
"value":"26",
"childrens":[{
"label":"拉萨市",
"value":"2951",
"childrens":[{
"label":"城关区",
"value":"2952",
"childrens":[]},
{
"label":"林周县",
"value":"3123",
"childrens":[]},
{
"label":"当雄县",
"value":"3918",
"childrens":[]},
{
"label":"尼木县",
"value":"3919",
"childrens":[]},
{
"label":"曲水县",
"value":"3920",
"childrens":[]},
{
"label":"堆龙德庆县",
"value":"3921",
"childrens":[]},
{
"label":"达孜县",
"value":"3922",
"childrens":[]},
{
"label":"墨竹工卡县",
"value":"3923",
"childrens":[]}]},

{
"label":"那曲地区",
"value":"3107",
"childrens":[{
"label":"索县",
"value":"3108",
"childrens":[]},
{
"label":"那曲县",
"value":"3961",
"childrens":[]},
{
"label":"嘉黎县",
"value":"3962",
"childrens":[]},
{
"label":"比如县",
"value":"3963",
"childrens":[]},
{
"label":"聂荣县",
"value":"3964",
"childrens":[]},
{
"label":"安多县",
"value":"3965",
"childrens":[]},
{
"label":"申扎县",
"value":"3966",
"childrens":[]},
{
"label":"班戈县",
"value":"3967",
"childrens":[]},
{
"label":"巴青县",
"value":"3968",
"childrens":[]},
{
"label":"尼玛县",
"value":"3969",
"childrens":[]},
{
"label":"双湖县",
"value":"53734",
"childrens":[]}]},

{
"label":"山南地区",
"value":"3129",
"childrens":[{
"label":"贡嘎县",
"value":"3130",
"childrens":[]},
{
"label":"扎囊县",
"value":"3934",
"childrens":[]},
{
"label":"乃东县",
"value":"3935",
"childrens":[]},
{
"label":"桑日县",
"value":"3936",
"childrens":[]},
{
"label":"琼结县",
"value":"3937",
"childrens":[]},
{
"label":"曲松县",
"value":"3938",
"childrens":[]},
{
"label":"措美县",
"value":"3939",
"childrens":[]},
{
"label":"洛扎县",
"value":"3940",
"childrens":[]},
{
"label":"加查县",
"value":"3941",
"childrens":[]},
{
"label":"隆子县",
"value":"3942",
"childrens":[]},
{
"label":"错那县",
"value":"3943",
"childrens":[]},
{
"label":"浪卡子县",
"value":"3944",
"childrens":[]}]},

{
"label":"昌都地区",
"value":"3138",
"childrens":[{
"label":"昌都县",
"value":"3139",
"childrens":[]},
{
"label":"江达县",
"value":"3924",
"childrens":[]},
{
"label":"贡觉县",
"value":"3925",
"childrens":[]},
{
"label":"类乌齐县",
"value":"3926",
"childrens":[]},
{
"label":"丁青县",
"value":"3927",
"childrens":[]},
{
"label":"察雅县",
"value":"3928",
"childrens":[]},
{
"label":"八宿县",
"value":"3929",
"childrens":[]},
{
"label":"左贡县",
"value":"3930",
"childrens":[]},
{
"label":"芒康县",
"value":"3931",
"childrens":[]},
{
"label":"洛隆县",
"value":"3932",
"childrens":[]},
{
"label":"边坝县",
"value":"3933",
"childrens":[]}]},

{
"label":"日喀则地区",
"value":"3144",
"childrens":[{
"label":"聂拉木县",
"value":"3160",
"childrens":[]},
{
"label":"昂仁县",
"value":"3166",
"childrens":[]},
{
"label":"日喀则市",
"value":"3945",
"childrens":[]},
{
"label":"南木林县",
"value":"3946",
"childrens":[]},
{
"label":"江孜县",
"value":"3947",
"childrens":[]},
{
"label":"定日县",
"value":"3948",
"childrens":[]},
{
"label":"萨迦县",
"value":"3949",
"childrens":[]},
{
"label":"拉孜县",
"value":"3950",
"childrens":[]},
{
"label":"谢通门县",
"value":"3951",
"childrens":[]},
{
"label":"白朗县",
"value":"3952",
"childrens":[]},
{
"label":"仁布县",
"value":"3953",
"childrens":[]},
{
"label":"康马县",
"value":"3954",
"childrens":[]},
{
"label":"定结县",
"value":"3955",
"childrens":[]},
{
"label":"仲巴县",
"value":"3956",
"childrens":[]},
{
"label":"亚东县",
"value":"3957",
"childrens":[]},
{
"label":"吉隆县",
"value":"3958",
"childrens":[]},
{
"label":"萨嘎县",
"value":"3959",
"childrens":[]},
{
"label":"岗巴县",
"value":"3960",
"childrens":[]}]},

{
"label":"阿里地区",
"value":"3970",
"childrens":[{
"label":"噶尔县",
"value":"3972",
"childrens":[]},
{
"label":"普兰县",
"value":"3973",
"childrens":[]},
{
"label":"札达县",
"value":"3974",
"childrens":[]},
{
"label":"日土县",
"value":"3975",
"childrens":[]},
{
"label":"革吉县",
"value":"3976",
"childrens":[]},
{
"label":"改则县",
"value":"3977",
"childrens":[]},
{
"label":"措勤县",
"value":"3978",
"childrens":[]}]},

{
"label":"林芝市",
"value":"3971",
"childrens":[{
"label":"巴宜区",
"value":"3979",
"childrens":[]},
{
"label":"工布江达县",
"value":"3980",
"childrens":[]},
{
"label":"米林县",
"value":"3981",
"childrens":[]},
{
"label":"墨脱县",
"value":"3982",
"childrens":[]},
{
"label":"波密县",
"value":"3983",
"childrens":[]},
{
"label":"察隅县",
"value":"3984",
"childrens":[]},
{
"label":"朗县",
"value":"3985",
"childrens":[]}]}]},


{
"label":"陕西",
"value":"27",
"childrens":[{
"label":"西安市",
"value":"2376",
"childrens":[{
"label":"高陵县",
"value":"2380",
"childrens":[]},
{
"label":"蓝田县",
"value":"2381",
"childrens":[]},
{
"label":"户县",
"value":"2382",
"childrens":[]},
{
"label":"周至县",
"value":"2383",
"childrens":[]},
{
"label":"雁塔区",
"value":"4343",
"childrens":[]},
{
"label":"未央区",
"value":"53735",
"childrens":[]},
{
"label":"长安区",
"value":"53736",
"childrens":[]},
{
"label":"灞桥区",
"value":"53737",
"childrens":[]},
{
"label":"碑林区",
"value":"53738",
"childrens":[]},
{
"label":"莲湖区",
"value":"53739",
"childrens":[]},
{
"label":"临潼区",
"value":"53740",
"childrens":[]},
{
"label":"阎良区",
"value":"53741",
"childrens":[]},
{
"label":"新城区",
"value":"53742",
"childrens":[]},
{
"label":"西安武警工程学院",
"value":"53743",
"childrens":[]}]},

{
"label":"铜川市",
"value":"2386",
"childrens":[{
"label":"印台区",
"value":"2387",
"childrens":[]},
{
"label":"宜君县",
"value":"2388",
"childrens":[]},
{
"label":"王益区",
"value":"2389",
"childrens":[]},
{
"label":"耀州区",
"value":"3989",
"childrens":[]}]},

{
"label":"宝鸡市",
"value":"2390",
"childrens":[{
"label":"岐山县",
"value":"2392",
"childrens":[]},
{
"label":"太白县",
"value":"2393",
"childrens":[]},
{
"label":"凤翔县",
"value":"2394",
"childrens":[]},
{
"label":"陇县",
"value":"2395",
"childrens":[]},
{
"label":"麟游县",
"value":"2396",
"childrens":[]},
{
"label":"千阳县",
"value":"2397",
"childrens":[]},
{
"label":"扶风县",
"value":"2398",
"childrens":[]},
{
"label":"凤县",
"value":"2399",
"childrens":[]},
{
"label":"眉县",
"value":"2400",
"childrens":[]},
{
"label":"渭滨区",
"value":"2401",
"childrens":[]},
{
"label":"金台区",
"value":"3990",
"childrens":[]},
{
"label":"陈仓区",
"value":"53744",
"childrens":[]}]},

{
"label":"咸阳市",
"value":"2402",
"childrens":[{
"label":"兴平市",
"value":"2403",
"childrens":[]},
{
"label":"礼泉县",
"value":"2404",
"childrens":[]},
{
"label":"泾阳县",
"value":"2405",
"childrens":[]},
{
"label":"永寿县",
"value":"2406",
"childrens":[]},
{
"label":"三原县",
"value":"2407",
"childrens":[]},
{
"label":"彬县",
"value":"2408",
"childrens":[]},
{
"label":"旬邑县",
"value":"2409",
"childrens":[]},
{
"label":"长武县",
"value":"2411",
"childrens":[]},
{
"label":"乾县",
"value":"2412",
"childrens":[]},
{
"label":"武功县",
"value":"2413",
"childrens":[]},
{
"label":"淳化县",
"value":"2414",
"childrens":[]},
{
"label":"秦都区",
"value":"53745",
"childrens":[]},
{
"label":"渭城区",
"value":"53746",
"childrens":[]},
{
"label":"杨陵区",
"value":"53747",
"childrens":[]}]},

{
"label":"渭南市",
"value":"2416",
"childrens":[{
"label":"韩城市",
"value":"2417",
"childrens":[]},
{
"label":"华阴市",
"value":"2418",
"childrens":[]},
{
"label":"蒲城县",
"value":"2419",
"childrens":[]},
{
"label":"华县",
"value":"2420",
"childrens":[]},
{
"label":"潼关县",
"value":"2421",
"childrens":[]},
{
"label":"大荔县",
"value":"2422",
"childrens":[]},
{
"label":"澄城县",
"value":"2423",
"childrens":[]},
{
"label":"合阳县",
"value":"2424",
"childrens":[]},
{
"label":"白水县",
"value":"2425",
"childrens":[]},
{
"label":"富平县",
"value":"2426",
"childrens":[]},
{
"label":"临渭区",
"value":"53748",
"childrens":[]}]},

{
"label":"延安市",
"value":"2428",
"childrens":[{
"label":"安塞县",
"value":"2429",
"childrens":[]},
{
"label":"洛川县",
"value":"2430",
"childrens":[]},
{
"label":"子长县",
"value":"2431",
"childrens":[]},
{
"label":"黄陵县",
"value":"2432",
"childrens":[]},
{
"label":"延长县",
"value":"2433",
"childrens":[]},
{
"label":"宜川县",
"value":"2434",
"childrens":[]},
{
"label":"延川县",
"value":"2435",
"childrens":[]},
{
"label":"甘泉县",
"value":"2436",
"childrens":[]},
{
"label":"富县",
"value":"2437",
"childrens":[]},
{
"label":"志丹县",
"value":"2438",
"childrens":[]},
{
"label":"黄龙县",
"value":"2439",
"childrens":[]},
{
"label":"吴起县",
"value":"2440",
"childrens":[]},
{
"label":"宝塔区",
"value":"53749",
"childrens":[]}]},

{
"label":"汉中市",
"value":"2442",
"childrens":[{
"label":"南郑县",
"value":"2443",
"childrens":[]},
{
"label":"城固县",
"value":"2444",
"childrens":[]},
{
"label":"洋县",
"value":"2445",
"childrens":[]},
{
"label":"佛坪县",
"value":"2446",
"childrens":[]},
{
"label":"留坝县",
"value":"2447",
"childrens":[]},
{
"label":"镇巴县",
"value":"2448",
"childrens":[]},
{
"label":"西乡县",
"value":"2449",
"childrens":[]},
{
"label":"勉县",
"value":"2450",
"childrens":[]},
{
"label":"略阳县",
"value":"2451",
"childrens":[]},
{
"label":"宁强县",
"value":"2452",
"childrens":[]},
{
"label":"汉台区",
"value":"53750",
"childrens":[]},
{
"label":"经济开发区南区",
"value":"53751",
"childrens":[]}]},

{
"label":"榆林市",
"value":"2454",
"childrens":[{
"label":"清涧县",
"value":"2456",
"childrens":[]},
{
"label":"绥德县",
"value":"2457",
"childrens":[]},
{
"label":"佳县",
"value":"2459",
"childrens":[]},
{
"label":"神木县",
"value":"2460",
"childrens":[]},
{
"label":"府谷县",
"value":"2461",
"childrens":[]},
{
"label":"子洲县",
"value":"2462",
"childrens":[]},
{
"label":"横山县",
"value":"2464",
"childrens":[]},
{
"label":"米脂县",
"value":"2465",
"childrens":[]},
{
"label":"吴堡县",
"value":"2466",
"childrens":[]},
{
"label":"定边县",
"value":"2467",
"childrens":[]},
{
"label":"靖边县",
"value":"4081",
"childrens":[]},
{
"label":"榆阳区",
"value":"53752",
"childrens":[]}]},

{
"label":"商洛市",
"value":"2468",
"childrens":[{
"label":"商州区",
"value":"2469",
"childrens":[]},
{
"label":"镇安县",
"value":"2470",
"childrens":[]},
{
"label":"山阳县",
"value":"2471",
"childrens":[]},
{
"label":"洛南县",
"value":"2472",
"childrens":[]},
{
"label":"商南县",
"value":"2473",
"childrens":[]},
{
"label":"丹凤县",
"value":"2474",
"childrens":[]},
{
"label":"柞水县",
"value":"2475",
"childrens":[]}]},

{
"label":"安康市",
"value":"2476",
"childrens":[{
"label":"紫阳县",
"value":"2478",
"childrens":[]},
{
"label":"岚皋县",
"value":"2479",
"childrens":[]},
{
"label":"旬阳县",
"value":"2480",
"childrens":[]},
{
"label":"镇坪县",
"value":"2481",
"childrens":[]},
{
"label":"平利县",
"value":"2482",
"childrens":[]},
{
"label":"宁陕县",
"value":"2483",
"childrens":[]},
{
"label":"汉阴县",
"value":"2484",
"childrens":[]},
{
"label":"石泉县",
"value":"2485",
"childrens":[]},
{
"label":"白河县",
"value":"2486",
"childrens":[]},
{
"label":"汉滨区",
"value":"3993",
"childrens":[]}]}]},


{
"label":"甘肃",
"value":"28",
"childrens":[{
"label":"兰州市",
"value":"2487",
"childrens":[{
"label":"永登县",
"value":"2488",
"childrens":[]},
{
"label":"榆中县",
"value":"2489",
"childrens":[]},
{
"label":"皋兰县",
"value":"2490",
"childrens":[]},
{
"label":"西固区",
"value":"3995",
"childrens":[]},
{
"label":"红古区",
"value":"3997",
"childrens":[]},
{
"label":"七里河区",
"value":"53753",
"childrens":[]},
{
"label":"安宁区",
"value":"53754",
"childrens":[]},
{
"label":"城关区",
"value":"53755",
"childrens":[]}]},

{
"label":"金昌市",
"value":"2492",
"childrens":[{
"label":"永昌县",
"value":"2493",
"childrens":[]},
{
"label":"金川区",
"value":"2494",
"childrens":[]}]},

{
"label":"白银市",
"value":"2495",
"childrens":[{
"label":"白银区",
"value":"2496",
"childrens":[]},
{
"label":"平川区",
"value":"2497",
"childrens":[]},
{
"label":"靖远县",
"value":"2498",
"childrens":[]},
{
"label":"景泰县",
"value":"2499",
"childrens":[]},
{
"label":"会宁县",
"value":"2500",
"childrens":[]}]},

{
"label":"天水市",
"value":"2501",
"childrens":[{
"label":"甘谷县",
"value":"2504",
"childrens":[]},
{
"label":"武山县",
"value":"2505",
"childrens":[]},
{
"label":"清水县",
"value":"2506",
"childrens":[]},
{
"label":"秦安县",
"value":"2507",
"childrens":[]},
{
"label":"张家川县",
"value":"2508",
"childrens":[]},
{
"label":"麦积区",
"value":"53756",
"childrens":[]},
{
"label":"秦州区",
"value":"53757",
"childrens":[]}]},

{
"label":"嘉峪关市",
"value":"2509",
"childrens":[{
"label":"雄关区",
"value":"2970",
"childrens":[]},
{
"label":"长城区",
"value":"53758",
"childrens":[]},
{
"label":"镜铁区",
"value":"53759",
"childrens":[]}]},

{
"label":"平凉市",
"value":"2518",
"childrens":[{
"label":"华亭县",
"value":"2519",
"childrens":[]},
{
"label":"崇信县",
"value":"2520",
"childrens":[]},
{
"label":"泾川县",
"value":"2521",
"childrens":[]},
{
"label":"灵台县",
"value":"2522",
"childrens":[]},
{
"label":"镇原县",
"value":"2523",
"childrens":[]},
{
"label":"庄浪县",
"value":"2524",
"childrens":[]},
{
"label":"崆峒区",
"value":"3023",
"childrens":[]},
{
"label":"静宁县",
"value":"3998",
"childrens":[]}]},

{
"label":"庆阳市",
"value":"2525",
"childrens":[{
"label":"西峰区",
"value":"2526",
"childrens":[]},
{
"label":"镇原县",
"value":"2528",
"childrens":[]},
{
"label":"合水县",
"value":"2529",
"childrens":[]},
{
"label":"华池县",
"value":"2530",
"childrens":[]},
{
"label":"环县",
"value":"2531",
"childrens":[]},
{
"label":"宁县",
"value":"2532",
"childrens":[]},
{
"label":"正宁县",
"value":"2533",
"childrens":[]},
{
"label":"庆城县",
"value":"4001",
"childrens":[]}]},

{
"label":"陇南市",
"value":"2534",
"childrens":[{
"label":"成县",
"value":"2535",
"childrens":[]},
{
"label":"礼县",
"value":"2536",
"childrens":[]},
{
"label":"康县",
"value":"2537",
"childrens":[]},
{
"label":"武都区",
"value":"2538",
"childrens":[]},
{
"label":"文县",
"value":"2539",
"childrens":[]},
{
"label":"两当县",
"value":"2540",
"childrens":[]},
{
"label":"徽县",
"value":"2541",
"childrens":[]},
{
"label":"宕昌县",
"value":"2542",
"childrens":[]},
{
"label":"西和县",
"value":"2543",
"childrens":[]}]},

{
"label":"武威市",
"value":"2544",
"childrens":[{
"label":"凉州区",
"value":"2545",
"childrens":[]},
{
"label":"古浪县",
"value":"2546",
"childrens":[]},
{
"label":"天祝县",
"value":"2547",
"childrens":[]},
{
"label":"民勤县",
"value":"2548",
"childrens":[]}]},

{
"label":"张掖市",
"value":"2549",
"childrens":[{
"label":"甘州区",
"value":"2550",
"childrens":[]},
{
"label":"山丹县",
"value":"2551",
"childrens":[]},
{
"label":"临泽县",
"value":"2552",
"childrens":[]},
{
"label":"高台县",
"value":"2553",
"childrens":[]},
{
"label":"肃南县",
"value":"2554",
"childrens":[]},
{
"label":"民乐县",
"value":"2555",
"childrens":[]}]},

{
"label":"酒泉市",
"value":"2556",
"childrens":[{
"label":"玉门市",
"value":"2558",
"childrens":[]},
{
"label":"敦煌市",
"value":"2559",
"childrens":[]},
{
"label":"金塔县",
"value":"2560",
"childrens":[]},
{
"label":"阿克塞县",
"value":"2562",
"childrens":[]},
{
"label":"肃北县",
"value":"2563",
"childrens":[]},
{
"label":"瓜州县",
"value":"3999",
"childrens":[]},
{
"label":"肃州区",
"value":"4000",
"childrens":[]}]},

{
"label":"甘南州",
"value":"2564",
"childrens":[{
"label":"合作市",
"value":"2565",
"childrens":[]},
{
"label":"夏河县",
"value":"2566",
"childrens":[]},
{
"label":"碌曲县",
"value":"2567",
"childrens":[]},
{
"label":"舟曲县",
"value":"2568",
"childrens":[]},
{
"label":"玛曲县",
"value":"2569",
"childrens":[]},
{
"label":"迭部县",
"value":"2570",
"childrens":[]},
{
"label":"临潭县",
"value":"2571",
"childrens":[]},
{
"label":"卓尼县",
"value":"2572",
"childrens":[]}]},

{
"label":"临夏州",
"value":"2573",
"childrens":[{
"label":"临夏县",
"value":"2574",
"childrens":[]},
{
"label":"康乐县",
"value":"2575",
"childrens":[]},
{
"label":"永靖县",
"value":"2576",
"childrens":[]},
{
"label":"和政县",
"value":"2577",
"childrens":[]},
{
"label":"东乡族自治县",
"value":"2578",
"childrens":[]},
{
"label":"积石山县",
"value":"2579",
"childrens":[]},
{
"label":"临夏市",
"value":"3175",
"childrens":[]},
{
"label":"广河县",
"value":"4008",
"childrens":[]}]},

{
"label":"定西市",
"value":"3080",
"childrens":[{
"label":"岷县",
"value":"3081",
"childrens":[]},
{
"label":"安定区",
"value":"4002",
"childrens":[]},
{
"label":"通渭县",
"value":"4003",
"childrens":[]},
{
"label":"临洮县",
"value":"4004",
"childrens":[]},
{
"label":"漳县",
"value":"4005",
"childrens":[]},
{
"label":"渭源县",
"value":"4006",
"childrens":[]},
{
"label":"陇西县",
"value":"4007",
"childrens":[]}]}]},


{
"label":"青海",
"value":"29",
"childrens":[{
"label":"西宁市",
"value":"2580",
"childrens":[{
"label":"湟中县",
"value":"2581",
"childrens":[]},
{
"label":"湟源县",
"value":"2582",
"childrens":[]},
{
"label":"大通县",
"value":"2583",
"childrens":[]},
{
"label":"城中区",
"value":"53760",
"childrens":[]},
{
"label":"城东区",
"value":"53761",
"childrens":[]},
{
"label":"城西区",
"value":"53762",
"childrens":[]},
{
"label":"城北区",
"value":"53763",
"childrens":[]}]},

{
"label":"海东地区",
"value":"2585",
"childrens":[{
"label":"平安县",
"value":"2586",
"childrens":[]},
{
"label":"乐都县",
"value":"2587",
"childrens":[]},
{
"label":"民和县",
"value":"2588",
"childrens":[]},
{
"label":"互助县",
"value":"2589",
"childrens":[]},
{
"label":"化隆县",
"value":"2590",
"childrens":[]},
{
"label":"循化县",
"value":"2591",
"childrens":[]}]},

{
"label":"海北州",
"value":"2592",
"childrens":[{
"label":"海晏县",
"value":"2593",
"childrens":[]},
{
"label":"祁连县",
"value":"2594",
"childrens":[]},
{
"label":"刚察县",
"value":"2595",
"childrens":[]},
{
"label":"门源县",
"value":"2596",
"childrens":[]}]},

{
"label":"黄南州",
"value":"2597",
"childrens":[{
"label":"尖扎县",
"value":"2598",
"childrens":[]},
{
"label":"同仁县",
"value":"2599",
"childrens":[]},
{
"label":"泽库县",
"value":"2600",
"childrens":[]},
{
"label":"河南县",
"value":"2602",
"childrens":[]}]},

{
"label":"海南州",
"value":"2603",
"childrens":[{
"label":"共和县",
"value":"4012",
"childrens":[]},
{
"label":"同德县",
"value":"4013",
"childrens":[]},
{
"label":"贵德县",
"value":"4014",
"childrens":[]},
{
"label":"兴海县",
"value":"4015",
"childrens":[]},
{
"label":"贵南县",
"value":"4016",
"childrens":[]}]},

{
"label":"果洛州",
"value":"2605",
"childrens":[{
"label":"玛沁县",
"value":"2606",
"childrens":[]},
{
"label":"甘德县",
"value":"2607",
"childrens":[]},
{
"label":"达日县",
"value":"2608",
"childrens":[]},
{
"label":"班玛县",
"value":"2609",
"childrens":[]},
{
"label":"久治县",
"value":"2610",
"childrens":[]},
{
"label":"玛多县",
"value":"2611",
"childrens":[]}]},

{
"label":"玉树州",
"value":"2612",
"childrens":[{
"label":"玉树县",
"value":"2613",
"childrens":[]},
{
"label":"称多县",
"value":"2614",
"childrens":[]},
{
"label":"囊谦县",
"value":"2615",
"childrens":[]},
{
"label":"杂多县",
"value":"2616",
"childrens":[]},
{
"label":"治多县",
"value":"2617",
"childrens":[]},
{
"label":"曲麻莱县",
"value":"2618",
"childrens":[]}]},

{
"label":"海西州",
"value":"2620",
"childrens":[{
"label":"德令哈市",
"value":"2621",
"childrens":[]},
{
"label":"乌兰县",
"value":"2622",
"childrens":[]},
{
"label":"天峻县",
"value":"2623",
"childrens":[]},
{
"label":"都兰县",
"value":"2624",
"childrens":[]},
{
"label":"大柴旦行委",
"value":"2625",
"childrens":[]},
{
"label":"冷湖行委",
"value":"2626",
"childrens":[]},
{
"label":"茫崖行委",
"value":"2627",
"childrens":[]},
{
"label":"格尔木市",
"value":"3021",
"childrens":[]}]}]},


{
"label":"宁夏",
"value":"30",
"childrens":[{
"label":"银川市",
"value":"2628",
"childrens":[{
"label":"灵武市",
"value":"2629",
"childrens":[]},
{
"label":"永宁县",
"value":"2630",
"childrens":[]},
{
"label":"贺兰县",
"value":"2631",
"childrens":[]},
{
"label":"兴庆区",
"value":"53764",
"childrens":[]},
{
"label":"金凤区",
"value":"53765",
"childrens":[]},
{
"label":"西夏区",
"value":"53766",
"childrens":[]}]},

{
"label":"石嘴山市",
"value":"2632",
"childrens":[{
"label":"平罗县",
"value":"2633",
"childrens":[]},
{
"label":"惠农区",
"value":"2635",
"childrens":[]},
{
"label":"大武口区",
"value":"2636",
"childrens":[]}]},

{
"label":"吴忠市",
"value":"2637",
"childrens":[{
"label":"青铜峡市",
"value":"2638",
"childrens":[]},
{
"label":"同心县",
"value":"2641",
"childrens":[]},
{
"label":"盐池县",
"value":"2642",
"childrens":[]},
{
"label":"红寺堡开发区",
"value":"2643",
"childrens":[]},
{
"label":"利通区",
"value":"2966",
"childrens":[]}]},

{
"label":"固原市",
"value":"2644",
"childrens":[{
"label":"西吉县",
"value":"2647",
"childrens":[]},
{
"label":"隆德县",
"value":"2648",
"childrens":[]},
{
"label":"泾源县",
"value":"2649",
"childrens":[]},
{
"label":"彭阳县",
"value":"2650",
"childrens":[]},
{
"label":"原州区",
"value":"2651",
"childrens":[]}]},

{
"label":"中卫市",
"value":"3071",
"childrens":[{
"label":"中宁县",
"value":"3072",
"childrens":[]},
{
"label":"海原县",
"value":"3148",
"childrens":[]},
{
"label":"沙坡头区",
"value":"4020",
"childrens":[]}]}]},


{
"label":"新疆",
"value":"31",
"childrens":[{
"label":"乌鲁木齐市",
"value":"2652",
"childrens":[{
"label":"乌鲁木齐县",
"value":"2653",
"childrens":[]},
{
"label":"头屯河区",
"value":"4024",
"childrens":[]},
{
"label":"达坂城区",
"value":"4025",
"childrens":[]},
{
"label":"米东区",
"value":"4026",
"childrens":[]},
{
"label":"天山区",
"value":"53767",
"childrens":[]},
{
"label":"新市区",
"value":"53768",
"childrens":[]},
{
"label":"沙依巴克区",
"value":"53769",
"childrens":[]},
{
"label":"水磨沟区",
"value":"53770",
"childrens":[]}]},

{
"label":"克拉玛依市",
"value":"2654",
"childrens":[{
"label":"克拉玛依区",
"value":"2655",
"childrens":[{
"label":"克拉玛依区",
"value":"53771",
"childrens":[]},
{
"label":"独山子区",
"value":"53772",
"childrens":[]},
{
"label":"白碱滩区",
"value":"53773",
"childrens":[]},
{
"label":"乌尔禾区",
"value":"53774",
"childrens":[]}]},

{
"label":"独山子区",
"value":"2930",
"childrens":[]},
{
"label":"白碱滩区",
"value":"3006",
"childrens":[]},
{
"label":"乌尔禾区",
"value":"4027",
"childrens":[]}]},

{
"label":"石河子市",
"value":"2656",
"childrens":[{
"label":"石河子市",
"value":"2657",
"childrens":[]}]},

{
"label":"吐鲁番地区",
"value":"2658",
"childrens":[{
"label":"吐鲁番市",
"value":"2659",
"childrens":[]},
{
"label":"托克逊县",
"value":"2660",
"childrens":[]},
{
"label":"鄯善县",
"value":"2661",
"childrens":[]}]},

{
"label":"哈密地区",
"value":"2662",
"childrens":[{
"label":"哈密市",
"value":"2663",
"childrens":[]},
{
"label":"巴里坤县",
"value":"2664",
"childrens":[]},
{
"label":"伊吾县",
"value":"2665",
"childrens":[]}]},

{
"label":"和田地区",
"value":"2666",
"childrens":[{
"label":"和田市",
"value":"2667",
"childrens":[]},
{
"label":"墨玉县",
"value":"2669",
"childrens":[]},
{
"label":"洛浦县",
"value":"2670",
"childrens":[]},
{
"label":"策勒县",
"value":"2671",
"childrens":[]},
{
"label":"于田县",
"value":"2672",
"childrens":[]},
{
"label":"民丰县",
"value":"2673",
"childrens":[]},
{
"label":"皮山县",
"value":"2674",
"childrens":[]},
{
"label":"和田县",
"value":"53775",
"childrens":[]}]},

{
"label":"阿克苏地区",
"value":"2675",
"childrens":[{
"label":"阿克苏市",
"value":"2676",
"childrens":[]},
{
"label":"温宿县",
"value":"2678",
"childrens":[]},
{
"label":"沙雅县",
"value":"2679",
"childrens":[]},
{
"label":"拜城县",
"value":"2680",
"childrens":[]},
{
"label":"阿瓦提县",
"value":"2681",
"childrens":[]},
{
"label":"库车县",
"value":"2682",
"childrens":[]},
{
"label":"柯坪县",
"value":"2683",
"childrens":[]},
{
"label":"新和县",
"value":"2684",
"childrens":[]},
{
"label":"乌什县",
"value":"2685",
"childrens":[]}]},

{
"label":"喀什地区",
"value":"2686",
"childrens":[{
"label":"喀什市",
"value":"2687",
"childrens":[]},
{
"label":"巴楚县",
"value":"2688",
"childrens":[]},
{
"label":"泽普县",
"value":"2689",
"childrens":[]},
{
"label":"伽师县",
"value":"2690",
"childrens":[]},
{
"label":"叶城县",
"value":"2691",
"childrens":[]},
{
"label":"岳普湖县",
"value":"2692",
"childrens":[]},
{
"label":"疏附县",
"value":"2693",
"childrens":[]},
{
"label":"疏勒县",
"value":"2694",
"childrens":[]},
{
"label":"英吉沙县",
"value":"2695",
"childrens":[]},
{
"label":"麦盖提县",
"value":"2696",
"childrens":[]},
{
"label":"莎车县",
"value":"2697",
"childrens":[]},
{
"label":"塔什库尔干县",
"value":"2698",
"childrens":[]}]},

{
"label":"克孜勒苏州",
"value":"2699",
"childrens":[{
"label":"阿图什市",
"value":"2700",
"childrens":[]},
{
"label":"阿合奇县",
"value":"2701",
"childrens":[]},
{
"label":"乌恰县",
"value":"2702",
"childrens":[]},
{
"label":"阿克陶县",
"value":"2703",
"childrens":[]}]},

{
"label":"巴音郭楞州",
"value":"2704",
"childrens":[{
"label":"库尔勒市",
"value":"2705",
"childrens":[]},
{
"label":"尉犁县",
"value":"2706",
"childrens":[]},
{
"label":"和静县",
"value":"2707",
"childrens":[]},
{
"label":"博湖县",
"value":"2708",
"childrens":[]},
{
"label":"和硕县",
"value":"2709",
"childrens":[]},
{
"label":"轮台县",
"value":"2710",
"childrens":[]},
{
"label":"若羌县",
"value":"2711",
"childrens":[]},
{
"label":"且末县",
"value":"2712",
"childrens":[]},
{
"label":"焉耆县",
"value":"2713",
"childrens":[]}]},

{
"label":"昌吉州",
"value":"2714",
"childrens":[{
"label":"昌吉市",
"value":"2715",
"childrens":[]},
{
"label":"阜康市",
"value":"2716",
"childrens":[]},
{
"label":"奇台县",
"value":"2718",
"childrens":[]},
{
"label":"玛纳斯县",
"value":"2719",
"childrens":[]},
{
"label":"吉木萨尔县",
"value":"2720",
"childrens":[]},
{
"label":"呼图壁县",
"value":"2721",
"childrens":[]},
{
"label":"木垒县",
"value":"2722",
"childrens":[]}]},

{
"label":"博尔塔拉州",
"value":"2723",
"childrens":[{
"label":"博乐市",
"value":"2724",
"childrens":[]},
{
"label":"精河县",
"value":"2725",
"childrens":[]},
{
"label":"温泉县",
"value":"2726",
"childrens":[]},
{
"label":"阿拉山口市",
"value":"53776",
"childrens":[]}]},

{
"label":"伊犁州",
"value":"2727",
"childrens":[{
"label":"伊宁市",
"value":"2728",
"childrens":[]},
{
"label":"特克斯县",
"value":"2729",
"childrens":[]},
{
"label":"尼勒克县",
"value":"2730",
"childrens":[]},
{
"label":"昭苏县",
"value":"2731",
"childrens":[]},
{
"label":"新源县",
"value":"2732",
"childrens":[]},
{
"label":"霍城县",
"value":"2733",
"childrens":[]},
{
"label":"察布查尔县",
"value":"2734",
"childrens":[]},
{
"label":"巩留县",
"value":"2735",
"childrens":[]},
{
"label":"奎屯市",
"value":"4028",
"childrens":[]},
{
"label":"伊宁县",
"value":"4499",
"childrens":[]},
{
"label":"霍尔果斯市",
"value":"53777",
"childrens":[]}]},

{
"label":"塔城地区",
"value":"2736",
"childrens":[{
"label":"塔城市",
"value":"2737",
"childrens":[]},
{
"label":"乌苏市",
"value":"2738",
"childrens":[]},
{
"label":"额敏县",
"value":"2739",
"childrens":[]},
{
"label":"裕民县",
"value":"2740",
"childrens":[]},
{
"label":"沙湾县",
"value":"2741",
"childrens":[]},
{
"label":"托里县",
"value":"2742",
"childrens":[]},
{
"label":"和布克赛尔县",
"value":"2743",
"childrens":[]}]},

{
"label":"阿勒泰地区",
"value":"2744",
"childrens":[{
"label":"阿勒泰市",
"value":"2745",
"childrens":[]},
{
"label":"富蕴县",
"value":"2746",
"childrens":[]},
{
"label":"青河县",
"value":"2747",
"childrens":[]},
{
"label":"吉木乃县",
"value":"2748",
"childrens":[]},
{
"label":"布尔津县",
"value":"2749",
"childrens":[]},
{
"label":"福海县",
"value":"2750",
"childrens":[]},
{
"label":"哈巴河县",
"value":"2751",
"childrens":[]},
{
"label":"北屯市",
"value":"6822",
"childrens":[]}]},

{
"label":"五家渠市",
"value":"4110",
"childrens":[{
"label":"五家渠市",
"value":"4122",
"childrens":[]}]},

{
"label":"阿拉尔市",
"value":"53778",
"childrens":[{
"label":"阿拉尔市",
"value":"53782",
"childrens":[]}]},

{
"label":"铁门关市",
"value":"53779",
"childrens":[{
"label":"铁门关市",
"value":"53784",
"childrens":[]}]},

{
"label":"昆玉市",
"value":"53780",
"childrens":[{
"label":"昆玉市",
"value":"53785",
"childrens":[]}]},

{
"label":"图木舒克市",
"value":"53781",
"childrens":[{
"label":"图木舒克市",
"value":"53783",
"childrens":[]}]}]},


{
"label":"县城内",
"value":"51759",
"childrens":[]}];var _default=

{tb:tb,jd:jd};exports.default=_default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*******************************************************************!*\
  !*** C:/Users/PC/Documents/HBuilderProjects/0916-shop/pages.json ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    packName = uni.getAccountInfoSync().miniProgram.appId || '';
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request fail', e);
          // }
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5.request(data);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  },
  onShareAppMessage: function onShareAppMessage() {
    stat.interceptShare(false);
  } };


function main() {
  var Vue = __webpack_require__(/*! vue */ 2);
  if (true) {
    uni.report = function (type, options) {};
  } else {}
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-23020190918001","_inBundle":false,"_integrity":"sha512-AaOozCo3kxnm2idouHUR/lfYjZlRtD9Ve29fIrkZJUZh7R9CfJJFKZDWJUW3rRbyUq2OiPisz5KargPCsIqsAg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-23020190918001.tgz","_shasum":"4b2941c29eb674a60ea8eff04a9f13b2df28c0e1","_spec":"@dcloudio/uni-stat@next","_where":"/Users/fxy/Documents/DCloud/HbuilderX-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"0fac47b62d100213ce48c29dd9d0a335f8a00264","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-23020190918001"};

/***/ }),

/***/ 7:
/*!************************************************************************************!*\
  !*** C:/Users/PC/Documents/HBuilderProjects/0916-shop/pages.json?{"type":"style"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "master/myselfs/myselfs": { "navigationStyle": "custom" }, "master/ranking/ranking": { "navigationStyle": "custom" }, "master/orders/orders": { "navigationBarTitleText": "订单" }, "master/home/home": { "navigationStyle": "custom" }, "pages/myself/myself": { "navigationBarTitleText": "", "navigationStyle": "custom" }, "master/aptitude/aptitude": { "navigationBarTitleText": "资质验证" }, "components/about/about": { "navigationBarTitleText": "关于我们" }, "components/qidong/qidong": { "navigationStyle": "custom" }, "components/appraise/appraise": { "navigationBarTitleText": "评价" }, "pages/order/order": { "navigationBarTitleText": "我的订单" }, "components/cart/cart": { "navigationBarTitleText": "购物车" }, "components/detail/detail": { "navigationBarTitleText": "订单详情" }, "components/coupon/coupon": { "navigationBarTitleText": "我的优惠卷" }, "components/collection/collection": { "navigationBarTitleText": "我的收藏" }, "pages/index/index": { "navigationBarTitleText": "家电清洁" }, "pages/shop/shop": { "navigationBarTitleText": "商城" }, "components/change/change": { "navigationBarTitleText": "切换身份" }, "components/address/address": { "navigationBarTitleText": "收货地址" } }, "globalStyle": { "navigationBarTitleText": "Vant For Uni-app", "navigationBarBackgroundColor": "#f8f8f8", "navigationBarTextStyle": "black", "backgroundTextStyle": "dark", "backgroundColor": "#f8f8f8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!***********************************************************************************!*\
  !*** C:/Users/PC/Documents/HBuilderProjects/0916-shop/pages.json?{"type":"stat"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map