'use strict';Object.defineProperty(exports,'__esModule',{value:true});var lodash=require('lodash'),html2json$1=require('html2json'),linkify=require('linkifyjs/html'),buildUrl=require('axios/lib/helpers/buildURL'),axios=require('axios');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var html2json__default=/*#__PURE__*/_interopDefaultLegacy(html2json$1);var linkify__default=/*#__PURE__*/_interopDefaultLegacy(linkify);var buildUrl__default=/*#__PURE__*/_interopDefaultLegacy(buildUrl);var axios__default=/*#__PURE__*/_interopDefaultLegacy(axios);function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
}var script = {
  name: "AppAutocompleteInput",
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: function _default() {
        return "".concat(this._uid);
      }
    },
    value: String,
    label: String,
    query: Function,
    display: {
      type: String,
      required: false,
      default: "display"
    },
    queryConfig: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      selectedIndex: -1,
      results: [],
      result: null,
      loading: false,
      error: null
    };
  },
  methods: {
    doSearch: lodash.debounce( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        var _yield$this$query$get, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(value.length < 2)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.prev = 2;
                this.loading = true;
                _context.next = 6;
                return this.query.get(value, this.queryConfig);

              case 6:
                _yield$this$query$get = _context.sent;
                data = _yield$this$query$get.data;
                this.results = data || [];
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](2);
                this.error = _context.t0;

              case 14:
                _context.prev = 14;
                this.loading = false;
                return _context.finish(14);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 11, 14, 17]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), 200),
    changeValue: function changeValue(value) {
      this.$emit("input", value);
      this.selectedIndex = -1;
      this.doSearch(value);
    },
    blur: function blur(event) {
      var _this = this;

      this.$emit("input", event.target.value);
      setTimeout(function () {
        return _this.results = [];
      }, 200);
    },
    setValue: function setValue(result) {
      var value = result[this.display];

      if (Object.prototype.hasOwnProperty.call(result, "value")) {
        value = result.value;
      }

      this.$emit("input", value);
      this.result = result;
      this.$emit("setResult", result);
    },
    keyEnter: function keyEnter() {
      if (this.selectedIndex !== -1) {
        this.setValue(this.results[this.selectedIndex]);
        this.results = [];
        this.selectedIndex = -1;
      } else {
        this.$emit("input", event.target.value);
        this.results = [];
        this.$emit("setResult", null);
      }
    },
    keyUp: function keyUp() {
      if (this.selectedIndex > -1) {
        this.selectedIndex--;
      }

      if (this.selectedIndex == -1) {
        this.selectedIndex = this.results.length;
      }

      this.scroll();
    },
    keyDown: function keyDown() {
      if (this.selectedIndex <= this.results.length) {
        this.selectedIndex++;
      }

      if (this.selectedIndex >= this.results.length) {
        this.selectedIndex = 0;
      }

      this.scroll();
    },
    scroll: function scroll() {
      var option = this.$refs["option-".concat(this.selectedIndex)];

      if (option) {
        option[0].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start"
        });
      }
    }
  },
  computed: {
    isExpanded: function isExpanded() {
      return this.results.length ? "true" : "false";
    },
    activeDescendant: function activeDescendant() {
      return this.selectedIndex > -1 ? "form__autocomplete--".concat(this.id, "-").concat(this.selectedIndex) : "";
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "form__autocomplete",
    attrs: {
      "role": "combobox",
      "aria-haspopup": "listbox",
      "aria-owns": "form__autocomplete-items-" + _vm.id,
      "aria-expanded": _vm.isExpanded
    }
  }, [_vm._ssrNode((_vm.label ? "<label" + _vm._ssrAttr("id", "form__label-" + _vm.id) + _vm._ssrAttr("for", "form__autocomplete-" + _vm.id) + " class=\"form__label\">" + _vm._ssrEscape("\n        " + _vm._s(_vm.label) + "\n    ") + "</label>" : "<!---->") + " <input" + _vm._ssrAttr("id", "form__autocomplete-" + _vm.id) + " type=\"text\" aria-autocomplete=\"list\" aria-haspopup=\"listbox\"" + _vm._ssrAttr("aria-labelledby", "form__label-" + _vm.id) + _vm._ssrAttr("aria-activedescendant", _vm.activeDescendant) + _vm._ssrAttr("value", _vm.value) + _vm._ssrAttrs(_vm.$attrs) + " class=\"form__input\"> " + (_vm.loading ? "<div class=\"form__autocomplete--loading spinner spinner--gray\"></div>" : "<!---->") + " "), _vm._ssrNode("<div class=\"form__autocomplete-results\"" + _vm._ssrStyle(null, null, {
    display: _vm.results.length ? '' : 'none'
  }) + ">", "</div>", [_vm._ssrNode("<ul" + _vm._ssrAttr("id", "form__autocomplete-items-" + _vm.id) + " role=\"listbox\" class=\"form__autocomplete-items\">", "</ul>", [_vm._l(_vm.results, function (result, index) {
    return [_vm._t("result", [_c('li', {
      key: index,
      ref: "option-" + index,
      refInFor: true,
      staticClass: "form__autocomplete-item",
      class: {
        'form__autocomplete-item--active': index === _vm.selectedIndex
      },
      attrs: {
        "id": "form__autocomplete--" + _vm.id + "-" + index,
        "role": "option",
        "aria-selected": _vm.activeDescendant
      },
      on: {
        "mouseover": function mouseover($event) {
          _vm.selectedIndex = index;
        },
        "click": function click($event) {
          return _vm.setValue(result);
        }
      }
    }, [_vm._v("\n                        " + _vm._s(result[_vm.display]) + "\n                    ")])], {
      "result": result
    })];
  })], 2)])], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-5b8873c3";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);//
//
//
//
//
//
var script$1 = {
  props: {
    title: {
      default: "Menu",
      required: false,
      type: String
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 20 20"
    }
  }, [_vm._ssrNode("<title>" + _vm._ssrEscape(_vm._s(_vm.title) + " ") + "</title> <path d=\"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\"></path>")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-12107969";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);/* script */

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 397.23 485.8"
    }
  }, [_vm._ssrNode("<title>Radius Icon</title> <g><g><path d=\"M306.79,167.5c34,30.5,52.44,76.78,52.44,119.69A160.62,160.62,0,0,1,85,400.76,159.59,159.59,0,0,1,38,287.19c0-42.91,18.29-89.69,54.29-119.69l-20-32.93C28.14,171,0,225.48,0,287.19,0,396.88,88.92,485.8,198.62,485.8s198.61-88.92,198.61-198.61a198.18,198.18,0,0,0-71.5-152.62Z\"></path> <path d=\"M247.83,237.48c15.47,13.88,23.86,34.94,23.86,54.46a73.08,73.08,0,1,1-146.15,0c0-19.52,8.32-40.81,24.7-54.46l-9.1-15a90.19,90.19,0,1,0,115.31,0Z\"></path> <path d=\"M200,0V0h-1.36V0a90.36,90.36,0,0,0-89,90.35c2.18,44,88.74,194.78,89.67,196.39v0c.93-1.61,87.49-152.43,89.67-196.39A90.36,90.36,0,0,0,200,0Z\"></path></g></g>")]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-30539e30";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, {}, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);/* script */

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 96 96",
      "enable-background": "new 0 0 96 96"
    }
  }, [_vm._ssrNode("<polygon points=\"96,14 82,0 48,34 14,0 0,14 34,48 0,82 14,96 48,62 82,96 96,82 62,48 \"></polygon>")]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-f8c1b2fe";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, {}, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
var json2html = html2json__default['default'].json2html;

var script$2 = {
  name: 'AppJsonToHtml',
  props: {
    json: {
      type: Array,
      required: true
    },
    tag: {
      type: String,
      required: true
    }
  },
  methods: {
    convert2html: function convert2html(json) {
      return json2html(json);
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component"
  }, [_vm._l(_vm.json, function (child, index) {
    return [child.node === 'text' ? _c('span', {
      key: index,
      domProps: {
        "innerHTML": _vm._s(child.text)
      }
    }) : _c('AppJsonToHtml', _vm._b({
      key: index,
      attrs: {
        "tag": child.tag,
        "json": child.child
      }
    }, 'AppJsonToHtml', child.attr, false))];
  })], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-e59767c2";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$2, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);var html2json = html2json__default['default'].html2json;
var script$3 = {
  name: "AppHtmlToJson",
  props: {
    html: {
      type: String,
      required: true
    },
    lookupClass: {
      type: String,
      required: false
    }
  },
  components: {
    AppJsonToHtml: __vue_component__$4
  },
  data: function data() {
    return {
      json: null
    };
  },
  mounted: function mounted() {
    this.parseHtmlDescription();
  },
  methods: {
    parseHtmlDescription: function parseHtmlDescription() {
      var json = html2json(this.linkifyHtml());

      for (var i = 0, len = json.child.length; i < len; i++) {
        var className = null;

        if (json.child[i].child !== undefined) {
          if (json.child[i].child[0].child !== undefined) {
            if (json.child[i].child[0].child[0].node == "text") {
              className = lodash.kebabCase(lodash.truncate(json.child[i].child[0].child[0].text, {
                length: 64
              }));
            }
          }
        }

        json.child[i]["attr"] = {
          class: className ? className : "node-".concat(i)
        };
      }

      this.json = json;
    },
    cleanHtml: function cleanHtml() {
      return this.html.replace(/(\r\n|\n|\r)/gm, "");
    },
    linkifyHtml: function linkifyHtml() {
      return linkify__default['default'](this.cleanHtml(), {
        className: "job-detail-link",
        attributes: {
          rel: "noreferrer"
        }
      });
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.json ? _c('div', [_vm._l(_vm.json.child, function (json, index) {
    return [json.attr.class == _vm.lookupClass ? [_vm._t("default"), _vm._ssrNode(" "), _c('AppJsonToHtml', _vm._b({
      key: index,
      attrs: {
        "tag": json.tag,
        "json": json.child
      }
    }, 'AppJsonToHtml', json.attr, false))] : [_c('AppJsonToHtml', _vm._b({
      key: index,
      attrs: {
        "tag": json.tag,
        "json": json.child
      }
    }, 'AppJsonToHtml', json.attr, false))]];
  })], 2) : _vm._e();
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = "data-v-285a1e4a";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$3, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);//
var script$4 = {
  computed: {
    isSupported: function isSupported() {
      if (process.isClient) {
        return "geolocation" in window.navigator;
      }

      return false;
    }
  },
  components: {
    AppRadiusIcon: __vue_component__$2
  },
  methods: {
    getGeoLocation: function getGeoLocation() {
      var _this = this;

      if (process.isClient && this.isSupported) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude.toFixed(6);
          var lon = position.coords.longitude.toFixed(6);
          var coords = lat + "," + lon;

          _this.$emit("getCoords", coords);
        }, function (error) {
          if (error.code == 1) {
            _this.$emit("permissionDenied");
          }
        });
      }
    }
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ClientOnly', [_vm.isSupported ? _c('button', {
    staticClass: "geolocation__button",
    class: {
      hidden: !_vm.isSupported
    },
    attrs: {
      "type": "button",
      "aria-label": "Your location"
    },
    on: {
      "click": _vm.getGeoLocation
    }
  }, [_vm._t("default", [_c('AppRadiusIcon', {
    attrs: {
      "width": "18px"
    }
  })])], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = "data-v-28f3dc6b";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$4, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);var states = {
  AK: "Alaska",
  AL: "Alabama",
  AZ: "Arizona",
  AR: "Arkansas",
  AA: "Armed Forces Americas",
  AE: "Armed Forces Others",
  AP: "Armed Forces Pacific",
  AS: "American Samoa",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District Of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UM: "United States Minor Outlying Islands",
  UT: "Utah",
  VA: "Virginia",
  VI: "Virgin Islands",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming"
};
var provinces = {
  AB: "Alberta",
  BC: "British Columbia",
  MB: "Manitoba",
  NB: "New Brunswick",
  NL: "Newfoundland",
  NW: "Northwest Territories",
  NS: "Nova Scotia",
  NU: "Territory of Nunavut",
  ON: "Ontario",
  PE: "Prince Edward Island",
  QC: "Quebec",
  SK: "Saskatchewan",
  YT: "Yukon Territory"
};
var countries = {
  USA: "United States",
  CAN: "Canada"
};
/**
 * Remove country abbreviation from end of given value.
 */

function removeCountry(value) {
  if (blank(value)) {
    return value;
  }

  var i;
  var keys = Object.keys(countries);
  var total = keys.length;
  var result = lodash.trim(value.toString());

  for (i = 0; i < total; i++) {
    if (result.endsWith(keys[i])) {
      result = lodash.trimEnd(result, keys[i]);
      break;
    }
  }

  return lodash.trimEnd(lodash.trim(result), ",");
}
/**
 * Expand a code value to full state name.
 */

function fullState(code) {
  if (blank(code)) {
    return code;
  }

  var result = lodash.trim(code.toString());

  if (Object.prototype.hasOwnProperty.call(states, result.toUpperCase())) {
    return states[result.toUpperCase()];
  }

  if (Object.prototype.hasOwnProperty.call(provinces, result.toUpperCase())) {
    return provinces[result.toUpperCase()];
  }

  return result;
}/**
 * Check if the given value is "blank".
 */

function blank(value) {
  var isBlank = false;

  if ([undefined, null, NaN, ""].includes(value)) {
    isBlank = true;
  } else if (typeof value === "string" && value.trim().length === 0) {
    isBlank = true;
  } else if (Array.isArray(value) && value.length == 0) {
    isBlank = true;
  } else if (_typeof(value) === "object" && Object.keys(value).length === 0) {
    isBlank = true;
  }

  return isBlank;
}
/**
 * Run the given function and keep trying if it fails
 * until the max retries are exceeded and return a promise.
 */

function retry(callback) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
  return new Promise(function (resolve, reject) {
    try {
      var result = callback.apply(void 0, _toConsumableArray(args));
      return resolve(result);
    } catch (e) {
      if (max > 0) {
        setTimeout(function () {
          return retry(callback, args, --max, delay * 2).then(resolve).catch(function (err) {
            return reject(err);
          });
        }, delay);
      } else {
        return reject(e);
      }
    }
  });
}
/** Return true if the env is dev. */

function isDevelopment() {

  return false;
}
/**
 * Build a job detail url.
 */

function buildJobDetailUrl(title, location, guid) {
  var locationSlug = slugify(removeCountry(location));
  var titleSlug = slugify(title);

  if (blank(locationSlug)) {
    locationSlug = "none";
  }

  return "/".concat(locationSlug, "/").concat(titleSlug, "/").concat(guid, "/job/");
}

var slugify = function slugify(string) {
  return lodash.words(lodash.toString(string).replace(/["\u2019+:+/]/g, ""), /[\w]+/g).reduce(function (result, word, index) {
    return result + (index ? "-" : "") + word.toLowerCase();
  }, "");
};

function displayLocationFromSlug(string) {
  if (string.indexOf("-") > -1) {
    return lodash.words(lodash.toString(string)).reduce(function (result, word, index, original) {
      return lodash.upperFirst(result + (index !== original.length - 1 ? " " + lodash.upperFirst(word) : ", " + word.toUpperCase()));
    });
  }

  return lodash.upperFirst(string);
}var script$5 = {
  props: {
    apiKey: {
      type: String,
      required: true
    },
    value: String
  },
  created: function created() {
    if (!this.placesApiLoaded) {
      this.appendPlacesScript();
    }
  },
  mounted: function mounted() {
    retry(this.initAutocomplete);
  },
  computed: {
    apiScriptUrl: function apiScriptUrl() {
      var key = this.apiKey;
      return "https://maps.googleapis.com/maps/api/js?key=".concat(key, "&libraries=places");
    },
    placesApiLoaded: function placesApiLoaded() {
      return _typeof(lodash.get(window, "google.maps.places")) == "object";
    }
  },
  methods: {
    appendPlacesScript: function appendPlacesScript() {
      if (process.isClient) {
        var script = document.createElement("script");
        script.setAttribute("src", this.apiScriptUrl);
        document.head.appendChild(script);
      }
    },
    initAutocomplete: function initAutocomplete() {
      var _this = this;

      var placeAutoComplete = new google.maps.places.Autocomplete(this.$refs.autocompleteInput);
      placeAutoComplete.addListener("place_changed", function () {
        var place = placeAutoComplete.getPlace();
        var geo = place.geometry;

        if (geo) {
          var lat = geo.location.lat();
          var lon = geo.location.lng();

          _this.$emit("locationSelected", place.formatted_address, lat + "," + lon);
        }
      });
    }
  }
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('input', _vm._b({
    ref: "autocompleteInput",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function input($event) {
        return _vm.$emit('input', $event.target.value);
      }
    }
  }, 'input', _vm.$attrs, false), []);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = "data-v-4796376c";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$5, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);var script$6 = {
  props: {
    keyName: {
      required: false,
      default: function _default() {
        return this._uid;
      }
    },
    tag: {
      type: [String, Object],
      required: false,
      default: "section"
    },
    name: {
      required: true,
      type: String
    },
    display: {
      required: false,
      default: "",
      type: String
    },
    visibile: {
      type: Boolean,
      default: true
    },
    options: {
      required: false,
      type: Array,
      default: function _default() {
        return [];
      }
    },
    input: {
      required: false,
      type: Object,
      default: function _default() {
        return {};
      }
    },
    limit: {
      required: false,
      type: Number,
      default: 10
    }
  },
  data: function data() {
    return {
      givenOptions: lodash.clone(this.options || []),
      displayedFilters: {}
    };
  },
  created: function created() {
    var _this = this;

    var value = null;
    var filteredOptions = [];
    this.givenOptions.forEach(function (option) {
      value = _this.optionHasSubmitValue(option) ? option.submit : option.display;

      if (_this.input[_this.name] != value) {
        filteredOptions.push(_this.buildFilterHref(option));
      }
    });
    this.displayedFilters = filteredOptions.slice(0, this.limit);
  },
  computed: {
    hasOptions: function hasOptions() {
      return this.displayedFilters.length > 0;
    },
    isVisible: function isVisible() {
      return this.visible !== false;
    },
    shouldShowLess: function shouldShowLess() {
      return this.displayedFilters.length > this.limit;
    },
    shouldShowMore: function shouldShowMore() {
      return this.displayedFilters.length < this.givenOptions.length;
    }
  },
  methods: {
    optionHasSubmitValue: function optionHasSubmitValue(option) {
      return Object.prototype.hasOwnProperty.call(option, 'submit');
    },
    buildFilterHref: function buildFilterHref(option) {
      var value = this.optionHasSubmitValue(option) ? option.submit : option.display;

      var params = _defineProperty({
        page: 1
      }, this.name, value);

      option.href = buildUrl__default['default']("jobs", _objectSpread2(_objectSpread2({}, this.input), params));
      return option;
    },
    showMore: function showMore() {
      var numberOfItemsToAdd = this.limit;
      var currentTotalShown = this.displayedFilters.length;
      this.displayedFilters = this.givenOptions.slice(0, currentTotalShown + numberOfItemsToAdd);
    },
    showLess: function showLess() {
      var limit = this.limit;
      var currentTotalShown = this.displayedFilters.length;
      var less = currentTotalShown - limit;

      if (less < limit) {
        less = currentTotalShown - less;
      }

      this.displayedFilters = this.givenOptions.slice(0, less);
    }
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isVisible && _vm.hasOptions ? _c(_vm.tag, _vm._b({
    tag: "component",
    staticClass: "search-filter"
  }, 'component', _vm.$attrs, false), [_vm.display ? _c('h3', {
    staticClass: "search-filter-display"
  }, [_vm._v("\n        Filter By " + _vm._s(_vm.display) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm._t("default", [_c('ul', {
    staticClass: "search-filter-options"
  }, _vm._l(_vm.displayedFilters, function (option, index) {
    return _c('li', {
      key: index,
      staticClass: "search-filter-options-item"
    }, [_c('g-link', {
      attrs: {
        "to": option.href
      }
    }, [_vm._v("\n                    " + _vm._s(option.display) + "\n                    "), option.value ? _c('span', [_vm._v("(" + _vm._s(option.value) + ")")]) : _vm._e()])], 1);
  }), 0), _vm._v(" "), _vm.shouldShowLess || _vm.shouldShowMore ? _c('section', {
    staticClass: "search-filter-limiter"
  }, [_vm.shouldShowMore ? _c('button', {
    staticClass: "search-filter-limiter-more",
    attrs: {
      "aria-label": "Show more filters",
      "rel": "nofollow"
    },
    on: {
      "click": function click($event) {
        return _vm.showMore();
      }
    }
  }, [_vm._v("\n                More\n            ")]) : _vm._e(), _vm._v(" "), _vm.shouldShowLess ? _c('button', {
    staticClass: "search-filter-limiter-less",
    attrs: {
      "aria-label": "Show less filters",
      "rel": "nofollow"
    },
    on: {
      "click": function click($event) {
        return _vm.showLess();
      }
    }
  }, [_vm._v("\n                Less\n            ")]) : _vm._e()]) : _vm._e()], {
    "showLess": _vm.showLess,
    "showMore": _vm.showMore,
    "shouldShowLess": _vm.shouldShowLess,
    "shouldShowMore": _vm.shouldShowMore,
    "displayedFilters": _vm.displayedFilters
  })], 2) : _vm._e();
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = "data-v-7cc233f2";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$6, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);var SOLR = "solr";
var GOOGLE_TALENT = "google_talent";
var TIMEOUT_THRESHOLD = 5000;
var API_URL = "https://qc-search-api.jobsyn.org/api/v1/";

if (process.env.GRIDSOME_USE_MINIKUBE === "true") {
  API_URL = "http://minikube:35000/api/v1";
} else if (!isDevelopment()) {
  //update whenever we have a prod version.
  API_URL = "https://qc-search-api.jobsyn.org/api/v1/";
}

function api() {
  return axios__default['default'].create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
}
function searchService(input, siteConfig) {
  var source = lodash.kebabCase(siteConfig.source);
  return api().post("".concat(source, "/search"), {
    data: input,
    config: siteConfig
  }, {
    timeout: TIMEOUT_THRESHOLD
  });
}
function commuteSearchService(input, siteConfig) {
  return api().post("google-talent/commute", {
    data: input,
    config: siteConfig
  }, {
    timeout: TIMEOUT_THRESHOLD
  });
}var base = {
  props: {
    siteConfig: {
      required: true,
      type: Object
    },
    tag: {
      required: false,
      type: String,
      default: "div"
    },
    searchOnLoad: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data: function data() {
    return {
      jobs: [],
      meta: {
        source: this.siteConfig.source
      },
      status: {
        loading: false,
        error: false
      },
      filters: [],
      pagination: {},
      featuredJobs: [],
      appliedFilters: [],
      isCommuteSearch: false,
      input: this.defaultInput
    };
  },
  computed: {
    inputDefinition: function inputDefinition() {
      return _objectSpread2(_objectSpread2({}, this.sharedInputDefinition()), this.providerInputDefinition());
    },
    defaultInput: function defaultInput() {
      var defaults = {};
      Object.entries(this.inputDefinition).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            definition = _ref2[1];

        defaults[name] = definition.default;
      });
      return defaults;
    },
    service: function service() {
      return searchService;
    },
    isGoogleTalent: function isGoogleTalent() {
      return this.meta.source == GOOGLE_TALENT;
    },
    //unused
    isSolr: function isSolr() {
      return this.meta.source == SOLR;
    },
    hasJobs: function hasJobs() {
      return this.jobs.length > 0 || this.featuredJobs.length > 0;
    },
    configFilters: function configFilters() {
      return this.siteConfig.filters || [];
    },
    sort: function sort() {
      var _this = this;

      var sort = {
        options: [],
        sortField: function sortField() {},
        by: null
      };
      var sortMeta = lodash.clone(this.meta.sort || {});

      if (blank(sortMeta)) {
        return sort;
      }

      sort.sortField = function (field) {
        _this.input.sort = field.toLowerCase();

        _this.newSearch();
      };

      sort.by = blank(sortMeta) ? "" : lodash.startCase(sortMeta.active);
      sort.options = sortMeta.options.map(function (o) {
        return lodash.startCase(o);
      });
      return sort;
    },
    slotData: function slotData() {
      return {
        jobs: this.jobs,
        sort: this.sort,
        input: this.input,
        status: this.status,
        hasJobs: this.hasJobs,
        source: this.meta.source,
        setInput: this.setInput,
        newSearch: this.newSearch,
        pagination: this.pagination,
        featuredJobs: this.featuredJobs,
        removeFilter: this.removeFilter,
        isGoogleTalent: this.isGoogleTalent,
        appliedFilters: this.appliedFilters,
        isCommuteSearch: this.isCommuteSearch,
        getFilterOptions: this.getFilterOptions,
        filteredInput: this.filterInput(this.input)
      };
    }
  },
  watch: {
    //any time query string changes, update component input and search.
    "$route.query": function $routeQuery() {
      this.input = this.mergeWithDefaultInput(this.$route.query);
      this.queryChanged();
      this.search();
    }
  },
  created: function created() {
    this.input = this.mergeWithDefaultInput(_objectSpread2(_objectSpread2({}, this.$route.query), this.$route.params));

    if (!blank(this.$route.params.location)) {
      this.input.location = displayLocationFromSlug(this.input.location);
    }

    if (this.searchOnLoad) {
      this.search();
    } else {
      this.appliedFilters = this.getAppliedFilters();
    }
  },
  methods: {
    queryChanged: function queryChanged() {},
    beforeSearch: function beforeSearch() {},
    excludePayload: function excludePayload() {
      return [];
    },
    providerInputDefinition: function providerInputDefinition() {
      return {};
    },
    applyFilters: function applyFilters() {
      return [];
    },
    sharedInputDefinition: function sharedInputDefinition() {
      return {
        q: {
          default: ""
        },
        r: {
          default: ""
        },
        location: {
          default: "",
          clears: ["coords", "r"]
        },
        coords: {
          default: "",
          clears: ["location", "r"]
        },
        page: {
          default: 1
        },
        sort: {
          default: "relevance"
        }
      };
    },
    mergeWithDefaultInput: function mergeWithDefaultInput() {
      var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread2(_objectSpread2({}, this.defaultInput), object);
    },
    removeFilter: function removeFilter(params) {
      var _this2 = this;

      if (params == "*") {
        return this.newSearch(this.defaultInput);
      }

      if (!Array.isArray(params)) {
        params = [params];
      }

      var otherParams = null;
      var definition = null;

      var getDefinition = function getDefinition(name) {
        return _this2.inputDefinition[name] || {};
      };

      params.forEach(function (key) {
        // default this input filter
        definition = getDefinition(key);
        _this2.input[key] = definition.default || ""; //then default dependent params as defined in definition for this input.

        otherParams = definition.clears || [];
        otherParams.forEach(function (name) {
          definition = getDefinition(name);
          _this2.input[name] = definition.default || "";
        });
      });
      this.newSearch();
    },
    getAppliedFilters: function getAppliedFilters() {
      var _this3 = this;

      return lodash.uniqBy(this.configFilters, "name").filter(function (filter) {
        return !blank(_this3.input[filter.name]);
      }).map(function (filter) {
        return {
          display: _this3.input[filter.name],
          parameter: filter.name
        };
      }).concat(this.applyFilters());
    },
    search: function search() {
      var _this4 = this;

      this.beforeSearch();
      this.status.loading = true;
      this.service(this.filterInput(this.input), this.siteConfig).then(function (resp) {
        var data = resp.data || {};
        _this4.featuredJobs = data.featured_jobs || [];
        _this4.pagination = data.pagination || {};
        _this4.filters = data.filters || {};
        _this4.jobs = data.jobs || [];
        _this4.meta = data.meta || {
          source: SOLR
        }; //prevents sites from erroring when unable to connect to api

        _this4.appliedFilters = _this4.getAppliedFilters();
      }).catch(function (err) {
        _this4.status.error = err;
      }).finally(function () {
        _this4.status.loading = false;
      });
    },
    getFilterOptions: function getFilterOptions(filter) {
      var key = blank(filter.key) ? filter.name : filter.key;
      var options = this.filters[key];
      return blank(options) || !Array.isArray(options) ? [] : options;
    },
    setInput: function setInput(filter) {
      this.newSearch(this.mergeWithDefaultInput(_objectSpread2(_objectSpread2({}, this.input), filter)));
    },
    filterInput: function filterInput(input) {
      var excluded = this.excludePayload();
      return lodash.omitBy(input, function (v, k) {
        return blank(v) || excluded.includes(k);
      });
    },
    newSearch: function newSearch() {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      payload = payload === null ? this.input : payload;
      this.$router.push({
        path: "/jobs",
        query: this.filterInput(payload)
      }).catch(function (err) {});
    }
  }
};//
var script$7 = {
  mixins: [base],
  data: function data() {
    return {
      isCommuteSearch: false
    };
  },
  computed: {
    service: function service() {
      return this.isCommuteSearch ? commuteSearchService : searchService;
    }
  },
  methods: {
    queryChanged: function queryChanged() {
      this.isCommuteSearch = this.shouldDoCommuteSearch();
    },
    providerInputDefinition: function providerInputDefinition() {
      return {
        commuteMethod: {
          default: "DRIVING"
        },
        travelDuration: {
          default: "3600"
        },
        roadTraffic: {
          default: "TRAFFIC_FREE"
        },
        commuteLocation: {
          default: "",
          clears: ["travelDuration", "roadTraffic", "commuteMethod", "coords"]
        }
      };
    },
    applyFilters: function applyFilters() {
      if (!this.isSolr && this.isCommuteSearch) {
        return [{
          display: "Commute:".concat(this.input.commuteLocation),
          parameter: "commuteLocation"
        }];
      }

      return [];
    },
    excludePayload: function excludePayload() {
      var exclude = [];

      if (!this.shouldDoCommuteSearch()) {
        exclude = Object.keys(this.providerInputDefinition());
      }

      return exclude;
    },
    shouldDoCommuteSearch: function shouldDoCommuteSearch() {
      return !blank(this.input.coords) && !blank(this.input.commuteLocation);
    },
    beforeSearch: function beforeSearch() {
      if (this.isCommuteSearch = this.shouldDoCommuteSearch()) {
        this.input.location = "";
      }
    }
  }
};/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component"
  }, [_vm._t("default", null, null, _vm.slotData)], 2);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = "data-v-3e3e9c3e";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$7, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);//
var script$8 = {
  mixins: [base],
  methods: {
    providerInputDefinition: function providerInputDefinition() {
      return {
        moc: {
          default: ""
        }
      };
    }
  }
};/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component"
  }, [_vm._t("default", null, null, _vm.slotData)], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = "data-v-2f551812";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$8, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$9 = {
  data: function data() {
    return {
      active: this.open
    };
  },
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: String,
      required: false,
      default: function _default() {
        return "".concat(this._uid);
      }
    },
    display: {
      type: String,
      required: false,
      default: ''
    },
    tag: {
      type: String,
      required: false,
      default: "div"
    }
  }
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component",
    staticClass: "accordion"
  }, [_c('div', {
    staticClass: "accordion__header",
    class: {
      'accordion__header--active': _vm.active
    },
    attrs: {
      "role": "button",
      "tabindex": "0",
      "id": "accordion-header-" + _vm.id,
      "aria-expanded": _vm.active
    },
    on: {
      "click": function click($event) {
        _vm.active = !_vm.active;
      },
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        _vm.active = !_vm.active;
      }
    }
  }, [_vm._t("display", [_vm.display ? _c('h3', {
    staticClass: "accordion__header-text"
  }, [_vm._v("\n                " + _vm._s(_vm.display) + "\n            ")]) : _vm._e()], {
    "active": _vm.active
  })], 2), _vm._v(" "), _vm.active ? _c('div', {
    staticClass: "accordion__content",
    attrs: {
      "id": "accordion-content-" + _vm.id,
      "aria-labelledby": "accordion-header-" + _vm.id
    }
  }, [_vm._t("default")], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = "data-v-8205fa60";
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$9, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
var ENTER_KEY = 13;
var script$a = {
  props: {
    name: {
      type: [String, Array],
      required: false,
      default: function _default() {
        return "".concat(this._uid);
      }
    },
    text: {
      type: String,
      required: false,
      default: ''
    }
  },
  created: function created() {
    if (process.isClient) {
      document.addEventListener('keyup', this.hitEnter);
    }
  },
  destroyed: function destroyed() {
    if (process.isClient) {
      document.removeEventListener('keyup', this.hitEnter);
    }
  },
  methods: {
    hitEnter: function hitEnter(e) {
      if (e.keyCode == ENTER_KEY && document.activeElement == this.$el) {
        this.clickedChip();
      }
    },
    clickedChip: function clickedChip() {
      this.$emit('chipClicked', this.name);
    }
  }
};/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "chip",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": _vm.clickedChip
    }
  }, [_vm._t("default", [_vm._v("\n        " + _vm._s(_vm.text) + "\n    ")])], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = "data-v-1d66f1be";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$a, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);/**Helpers for working with local/session storage */
var ACCEPTED_COOKIES_KEY = "accepted_cookie_use";
var DECLINED_COOKIES_KEY = "declined_cookie_use";
/**
 * Cookie Consent
*/

/**
 * Check if a key is stored as a string value.
 */

function isStoredAs(key, stored_as) {
  var storageType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'localStorage';

  if (!process.isClient) {
    return false;
  }

  return window[storageType].getItem(key) === JSON.stringify(stored_as);
}
/**
 * Check if storage contains has declined cookie use.
 */

function declinedCookieUse() {
  return isStoredAs(DECLINED_COOKIES_KEY, true);
}
/**
 * Check if storage contains has accepted cookie use.
 */

function acceptedCookieUse() {
  return isStoredAs(ACCEPTED_COOKIES_KEY, true);
}
/**
 * View Source Handling
**/

var VS_KEY = 'vs';
var UTM_KEY = 'external_utm';//
var script$b = {
  data: function data() {
    return {
      declined: declinedCookieUse(),
      accepted: acceptedCookieUse()
    };
  },
  computed: {
    hasAcknowleged: function hasAcknowleged() {
      return this.declined || this.accepted;
    }
  },
  methods: {
    acceptCookieUse: function acceptCookieUse() {
      if (process.isClient) {
        this.accepted = true;
        this.declined = false;
        localStorage.removeItem(DECLINED_COOKIES_KEY);
        localStorage.setItem(ACCEPTED_COOKIES_KEY, "true");
      }
    },
    declineCookieUse: function declineCookieUse() {
      if (process.isClient) {
        this.accepted = false;
        this.declined = true;
        localStorage.removeItem(ACCEPTED_COOKIES_KEY);
        localStorage.setItem(DECLINED_COOKIES_KEY, "true");
        window.location.reload();
      }
    }
  }
};/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ClientOnly', [!_vm.hasAcknowleged ? _c('section', [_vm._t("default", null, {
    "acceptCookieUse": _vm.acceptCookieUse,
    "declineCookieUse": _vm.declineCookieUse,
    "declined": _vm.declined,
    "acknowledged": _vm.hasAcknowleged,
    "accepted": _vm.accepted
  })], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = undefined;
/* module identifier */

var __vue_module_identifier__$d = "data-v-1b511e85";
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$b, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);var script$c = {
  props: {
    canEngageWithJobs: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  created: function created() {
    if (process.isClient && !declinedCookieUse() && !isDevelopment()) {
      this.appendTracker();
    }
  },
  methods: {
    appendTracker: function appendTracker() {
      // everytime vue rerenders the script,
      // make sure we are always using a single instance
      // of the tracker. In 1.0 we do a fresh page load
      // on every page so we never had to worry about
      // having more than one instance,
      // but since this is SPA, we are ending up with several
      // instances of the tracker on every SPA update, so clear out
      // the instances so we can "simulate" a page change.
      if ((typeof de_track === "undefined" ? "undefined" : _typeof(de_track)) == "object") {
        de_track.instances = [];
      }

      document.querySelectorAll("[id*='detrack']").forEach(function (el) {
        return el.remove();
      });
      var script = document.createElement('script');
      script.setAttribute('src', this.scriptSrc);
      script.setAttribute('id', 'detrack');
      script.setAttribute('defer', true);
      document.body.appendChild(script);
    }
  },
  computed: {
    cleanPathName: function cleanPathName() {
      return lodash.trim(location.pathname, "/");
    },
    isJobDetail: function isJobDetail() {
      return lodash.endsWith(this.cleanPathName, "job");
    },
    isJobListing: function isJobListing() {
      return lodash.endsWith(this.cleanPathName, "jobs");
    },
    scriptSrc: function scriptSrc() {
      var url = "https://d2e48ltfsb5exy.cloudfront.net/p/t.js?i=";
      return url + this.scriptParams;
    },
    scriptParams: function scriptParams() {
      // default params is to assume we are on a page with no jobs/maps
      var params = "0,6";

      if (this.canEngageWithJobs) {
        // static or pages with job data/maps: 0,2,6
        params = "0,2,6";
      }

      if (this.isJobDetail) {
        params = "0,1,6";
      }

      if (this.isJobListing) {
        params = "0,3,6";
      }

      return params;
    }
  },
  render: function render() {
    return this.$slots.default;
  }
};/* script */
var __vue_script__$c = script$c;
/* template */

/* style */

var __vue_inject_styles__$e = undefined;
/* scoped */

var __vue_scope_id__$e = undefined;
/* module identifier */

var __vue_module_identifier__$e = "data-v-15174d12";
/* functional template */

var __vue_is_functional_template__$e = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$e = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$e, __vue_script__$c, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var TAB_KEY = 9;
var UP_KEY = 38;
var DOWN_KEY = 40;
var ESC_KEY = 27;
var ENTER_KEY$1 = 13;
var script$d = {
  props: {
    id: {
      type: String,
      required: false,
      default: function _default() {
        return "".concat(this._uid);
      }
    },
    interactionType: {
      type: String,
      required: false,
      default: 'click'
    },
    links: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      }
    },
    tag: {
      type: String,
      required: false,
      default: 'div'
    },
    display: {
      type: String,
      required: false,
      default: 'Dropdown'
    }
  },
  data: function data() {
    return {
      toggled: false,
      selectedIndex: -1
    };
  },
  methods: {
    toggle: function toggle() {
      this.toggled = !this.toggled;
    },
    open: function open() {
      this.toggled = true;
      this.selectedIndex = 0;
    },
    close: function close() {
      this.toggled = false;
      this.selectedIndex = -1;
    },
    keyUp: function keyUp(e) {
      var _this = this;

      var code = e.keyCode; //if enter is pressed on the display button make sure dropdown is open.

      if (!this.toggled && code == ENTER_KEY$1 && document.activeElement == this.$refs['display']) {
        this.open();
        this.$nextTick(function () {
          _this.$refs['link-0'][0].focus();
        });
      } //escape


      if (code == ESC_KEY) {
        return this.close();
      } //tab or up arrrow


      if (this.toggled && [UP_KEY].includes(code)) {
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.links.length - 1;
        } else {
          this.selectedIndex--;
        }

        this.setLinkFocus(this.selectedIndex);
      }
    },
    keyDown: function keyDown(e) {
      var code = e.keyCode;

      if (this.toggled && [DOWN_KEY, TAB_KEY].includes(code)) {
        if (this.selectedIndex <= this.links.length) {
          this.selectedIndex++;
        }

        if (this.selectedIndex >= this.links.length) {
          this.selectedIndex = 0;
        }

        this.setLinkFocus(this.selectedIndex);
      }

      if (this.toggled && code == TAB_KEY) {
        if (this.selectedIndex == 0) {
          return this.close();
        } //odd bug where tab doesnt focus the right index :/


        this.setLinkFocus(this.selectedIndex - 1);
      }
    },
    setLinkFocus: function setLinkFocus(index) {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs["link-".concat(index)][0].focus();
      });
    },
    exitDropdown: function exitDropdown(e) {
      if (this.$el !== e.target && !this.$el.contains(e.target)) {
        this.close();
      }
    }
  },
  created: function created() {
    if (process.isClient && this.isClick) {
      document.addEventListener('click', this.exitDropdown);

      if (this.links.length) {
        document.addEventListener('keyup', this.keyUp);
        document.addEventListener('keydown', this.keyDown);
      }
    }
  },
  destroyed: function destroyed() {
    if (process.isClient && this.isClick) {
      document.removeEventListener('click', this.exitDropdown);

      if (this.links.length) {
        document.removeEventListener('keyup', this.keyUp);
        document.removeEventListener('keydown', this.keyDown);
      }
    }
  },
  computed: {
    isClick: function isClick() {
      return this.interactionType == 'click';
    },
    eventHandlers: function eventHandlers() {
      var type = this.interactionType;

      switch (type) {
        case 'click':
          return {
            click: this.toggle,
            mouseleave: this.close
          };

        case 'hover':
          return {
            mouseover: this.open,
            mouseleave: this.close
          };

        default:
          throw new Error("Unsupported interaction type '".concat(type, "'"));
      }
    }
  }
};/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g({
    tag: "component",
    staticClass: "dropdown"
  }, _vm.eventHandlers), [_c('div', {
    ref: "display",
    staticClass: "dropdown__display",
    attrs: {
      "role": "button",
      "tabindex": "0",
      "aria-expanded": _vm.toggled,
      "id": "dropdown-display-" + _vm.id
    }
  }, [_vm._v("\n        " + _vm._s(_vm.display) + "\n    ")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.toggled,
      expression: "toggled"
    }],
    staticClass: "dropdown__content",
    class: {
      'dropdown__content--active': _vm.toggled
    },
    attrs: {
      "id": "dropdown-content-" + _vm.id,
      "aria-labelledby": "dropdown-display-" + _vm.id
    }
  }, [_vm._t("default", _vm._l(_vm.links, function (link, index) {
    return _c('div', {
      key: index,
      on: {
        "mouseover": function mouseover($event) {
          _vm.selectedIndex = index;
        }
      }
    }, [_vm._t(link.key, [_c('a', {
      ref: "link-" + index,
      refInFor: true,
      staticClass: "dropdown__content-item",
      class: {
        'dropdown__content-item--active': index === _vm.selectedIndex
      },
      attrs: {
        "tabindex": "0",
        "href": link.href
      }
    }, [_vm._v("\n                        " + _vm._s(link.display) + "\n                    ")])], {
      "link": link,
      "isSelected": index == _vm.selectedIndex
    })], 2);
  }))], 2)]);
};

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$f = undefined;
/* scoped */

var __vue_scope_id__$f = undefined;
/* module identifier */

var __vue_module_identifier__$f = "data-v-66f7101c";
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$f, __vue_script__$d, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);var GoogleTalentClientEvent = /*#__PURE__*/function () {
  function GoogleTalentClientEvent() {
    _classCallCheck(this, GoogleTalentClientEvent);
  }

  _createClass(GoogleTalentClientEvent, null, [{
    key: "getSavedTalentData",
    value: function getSavedTalentData() {
      try {
        return JSON.parse(sessionStorage.getItem("talent")) || {};
      } catch (e) {
        return {};
      }
    }
  }, {
    key: "saveTalentEventData",
    value: function saveTalentEventData(data) {
      if (process.isClient) {
        sessionStorage.setItem("talent", JSON.stringify(data));
      }
    }
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input, siteConfig) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(blank(input.requestId) || siteConfig.client_events === false)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return api().post("google-talent/event", {
                  data: input,
                  config: {
                    project_id: siteConfig.project_id,
                    tenant_uuid: siteConfig.tenant_uuid,
                    company_uuids: siteConfig.company_uuids
                  }
                }, {
                  timeout: TIMEOUT_THRESHOLD
                });

              case 5:
                response = _context.sent;

                //save the new request id in local storage.
                if (response.data) {
                  input["requestId"] = response.data.request_id;
                  GoogleTalentClientEvent.saveTalentEventData(input);
                }

                return _context.abrupt("return", response);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);

                if (!Object.prototype.hasOwnProperty.call(_context.t0, "response")) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", _context.t0);

              case 14:
                throw new Error(_context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      function post(_x, _x2) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }]);

  return GoogleTalentClientEvent;
}();var script$e = {
  props: {
    job: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      required: false,
      default: "section"
    },
    siteConfig: {
      type: Object,
      required: true
    },
    input: {
      type: Object,
      required: false,
      default: function _default() {}
    },
    source: {
      type: String,
      required: true,
      validator: function validator(value) {
        return [GOOGLE_TALENT, SOLR].includes(value);
      }
    }
  },
  methods: {
    getAttribute: function getAttribute(attribute) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.isSolr) {
        return lodash.get(this.job, attribute, defaultValue);
      }

      var customAttr = "customAttributes.".concat(attribute, ".stringValues");
      var value = lodash.get(this.job.job, customAttr, defaultValue);
      return lodash.isArray(value) ? value.join(" ") : value;
    },
    clickedApplyJob: function clickedApplyJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      var talentData = GoogleTalentClientEvent.getSavedTalentData(); // only if the stored event type is view do we post
      // this means they are viewing this job directly from site instead
      // of navigating directly to job detail.

      if (talentData.eventType === "view") {
        GoogleTalentClientEvent.post({
          eventType: "redirect",
          jobs: talentData.jobs,
          requestId: talentData.requestId
        }, this.siteConfig).catch(function (e) {
          console.error(e); //fail silently from google talent errors.
        });
      }
    },
    clickedViewJob: function clickedViewJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      if (this.isGoogleTalent) {
        var requestId = GoogleTalentClientEvent.getSavedTalentData().requestId;
        GoogleTalentClientEvent.post({
          eventType: "view",
          jobs: [this.jobData.name],
          requestId: requestId
        }, this.siteConfig).catch(function (e) {
          console.error(e); //fail silently from google talent errors.
        });
      }
    }
  },
  computed: {
    jobData: function jobData() {
      if (this.isSolr) {
        return this.job;
      }

      return this.job.job;
    },
    commuteData: function commuteData() {
      if (this.isSolr) {
        return {};
      }

      return this.job.commuteInfo;
    },
    isSolr: function isSolr() {
      return this.source == SOLR;
    },
    isGoogleTalent: function isGoogleTalent() {
      return this.source == GOOGLE_TALENT;
    },
    reqId: function reqId() {
      if (this.isGoogleTalent) {
        return this.getAttribute("reqid");
      }

      return this.jobData.reqid;
    },
    title: function title() {
      if (this.isGoogleTalent) {
        return this.jobData.title;
      }

      return this.jobData.title_exact;
    },
    location: function location() {
      if (this.isGoogleTalent) {
        return removeCountry(this.getAttribute("city_admin1_country"));
      }

      return this.jobData.location_exact;
    },
    applyLink: function applyLink() {
      var url = "https://rr.jobsyn.org/" + this.guid;

      if (!process.isClient) {
        return url;
      } // add vs & utm parameters


      var vs = sessionStorage.getItem(VS_KEY);
      var utm = sessionStorage.getItem(UTM_KEY);
      var utm_params = {};

      if (!blank(utm)) {
        try {
          utm_params = JSON.parse(utm);
        } catch (_unused) {
          utm_params = {};
        }
      }

      var params = {};
      params = _objectSpread2(_objectSpread2(_objectSpread2({}, this.$route.query), params), utm_params);

      if (!blank(vs)) {
        params[VS_KEY] = vs;
      }

      return buildUrl__default['default'](url, params);
    },
    detailUrl: function detailUrl() {
      var loc = this.location; //fall back to state if location is blank

      if (blank(loc)) {
        loc = this.state;
      }

      var url = buildJobDetailUrl(this.title, loc, this.guid);

      if (!blank(this.input)) {
        return buildUrl__default['default'](url, this.input);
      }

      return url;
    },
    guid: function guid() {
      if (this.isGoogleTalent) {
        return this.jobData.requisitionId;
      }

      return this.jobData.guid;
    },
    city: function city() {
      if (this.isGoogleTalent) {
        return lodash.get(this.jobData, "derivedInfo.locations[0].postalAddress.locality", "");
      }

      return this.jobData.city_exact;
    },
    state: function state() {
      // if (this.isGoogleTalent) {
      //     let loc = get(
      //         this.jobData,
      //         "derivedInfo.locations[0].postalAddress.administrativeArea",
      //         ""
      //     )
      //     return fullState(loc)
      // }
      // let state = this.jobData.state_short_exact
      // //handle missing state data
      // if (blank(state)) {
      //     state = this.location.split(",")[1]
      // }
      return fullState("IN");
    },
    country: function country() {
      if (this.isGoogleTalent) {
        return this.getAttribute("country");
      }

      return this.jobData.country_short_exact;
    },
    company: function company() {
      if (this.isGoogleTalent) {
        return this.jobData.companyDisplayName;
      }

      return this.jobData.company_exact;
    },
    hasCommuteInfo: function hasCommuteInfo() {
      if (this.isSolr) {
        return false;
      }

      if (blank(this.commuteData)) {
        return false;
      }

      if (!Object.prototype.hasOwnProperty.call(this.commuteData, "travelDuration")) {
        return false;
      }

      return true;
    },
    commuteTime: function commuteTime() {
      if (blank(this.commuteData)) {
        return null;
      }

      var seconds = parseInt(this.commuteData.travelDuration.replace("s", ""));
      var hours = Math.floor(seconds / 60 / 60);
      var minutes = Math.floor(seconds / 60) - hours * 60;
      return minutes == 0 ? "< 1 minute" : minutes + " minutes";
    },
    htmlDescription: function htmlDescription() {
      if (this.isGoogleTalent) {
        return this.jobData.description;
      }

      return this.jobData.html_description;
    },
    cleanHtmlDescription: function cleanHtmlDescription() {
      // html description is not available on job detail pages?
      if (!this.htmlDescription) {
        return "";
      }

      return this.htmlDescription.replace(/(\r\n|\n|\r)/gm, "");
    },
    description: function description() {
      return this.jobData.description;
    },
    dateAdded: function dateAdded() {
      if (this.isGoogleTalent) {
        return this.jobData.postingCreateTime;
      }

      return this.jobData.date_added;
    },
    deletedAt: function deletedAt() {
      if (this.isGoogleTalent) {
        return null;
      }

      return this.jobData.deleted_at;
    }
  }
};/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component"
  }, [_vm._t("default", null, {
    "reqId": _vm.reqId,
    "title": _vm.title,
    "location": _vm.location,
    "detailUrl": _vm.detailUrl,
    "guid": _vm.guid,
    "city": _vm.city,
    "state": _vm.state,
    "country": _vm.country,
    "company": _vm.company,
    "hasCommuteInfo": _vm.hasCommuteInfo,
    "commuteTime": _vm.commuteTime,
    "htmlDescription": _vm.htmlDescription,
    "cleanHtmlDescription": _vm.cleanHtmlDescription,
    "description": _vm.description,
    "dateAdded": _vm.dateAdded,
    "deletedAt": _vm.deletedAt,
    "applyLink": _vm.applyLink,
    "clickedViewJob": _vm.clickedViewJob,
    "clickedApplyJob": _vm.clickedApplyJob
  })], 2);
};

var __vue_staticRenderFns__$f = [];
/* style */

var __vue_inject_styles__$g = undefined;
/* scoped */

var __vue_scope_id__$g = undefined;
/* module identifier */

var __vue_module_identifier__$g = "data-v-24dca3d2";
/* functional template */

var __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$g = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$g, __vue_script__$e, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);//
var script$f = {
  name: "AppJobDescription",
  props: {
    html: {
      type: String,
      required: true
    },
    lookupClass: {
      type: String,
      required: false
    }
  },
  components: {
    AppHtmlToJson: __vue_component__$5
  },
  computed: {
    cleanHtml: function cleanHtml() {
      return this.html.replace(/(\r\n|\n|\r)/gm, "");
    }
  }
};/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('AppHtmlToJson', {
    attrs: {
      "html": _vm.cleanHtml,
      "lookupClass": _vm.lookupClass
    }
  }, [_vm._t("default")], 2)], 1);
};

var __vue_staticRenderFns__$g = [];
/* style */

var __vue_inject_styles__$h = undefined;
/* scoped */

var __vue_scope_id__$h = undefined;
/* module identifier */

var __vue_module_identifier__$h = "data-v-91e1c75c";
/* functional template */

var __vue_is_functional_template__$h = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$h = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$h, __vue_script__$f, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, undefined, undefined);var cdn = (function () {
  return axios__default['default'].create({
    baseURL: "https://microsites.dejobs.org/",
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
});function getJob(guid, s3Folder) {
  return cdn().get("".concat(s3Folder, "/data/").concat(guid.toUpperCase(), ".json"));
}var script$g = {
  props: {
    guid: {
      type: String,
      required: false,
      default: null
    },
    s3Folder: {
      required: true,
      type: String
    }
  },
  data: function data() {
    return {
      job: null,
      error: null,
      pending: true,
      resolved: null
    };
  },
  watch: {
    "$route.params.guid": function $routeParamsGuid() {
      this.fetchJob(this.$route.params.guid, this.correctJobRouteUrl);
    }
  },
  created: function created() {
    if (this.guid !== null) {
      this.fetchJob(this.guid);
    } else {
      this.fetchJob(this.$route.params.guid, this.correctJobRouteUrl);
    }
  },
  methods: {
    fetchJob: function fetchJob(guid) {
      var _arguments = arguments,
          _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var onResolve, _yield$getJob, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onResolve = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;

                _this.status({
                  error: false,
                  pending: true
                });

                _context.prev = 2;
                _context.next = 5;
                return getJob(guid, _this.s3Folder);

              case 5:
                _yield$getJob = _context.sent;
                data = _yield$getJob.data;

                if (typeof onResolve == 'function') {
                  onResolve(data);
                } else {
                  _this.setJob(data);
                }

                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);

                _this.status({
                  error: _context.t0,
                  resolved: false
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }))();
    },
    setJob: function setJob(job) {
      this.job = job;
      this.status({
        resolved: true
      });
    },
    correctJobRouteUrl: function correctJobRouteUrl(job) {
      var routePath = this.$route.path.endsWith("/") ? this.$route.path : "".concat(this.$route.path, "/");
      var url = buildJobDetailUrl(job.title_slug, job.location_exact, job.guid); // check if this is the proper url for the job

      if (url !== routePath) {
        window.location.replace(buildUrl__default['default'](url, this.$route.query));
      } else {
        this.setJob(job);
      }
    },
    status: function status(_ref) {
      var _ref$error = _ref.error,
          error = _ref$error === void 0 ? null : _ref$error,
          _ref$pending = _ref.pending,
          pending = _ref$pending === void 0 ? false : _ref$pending,
          _ref$resolved = _ref.resolved,
          resolved = _ref$resolved === void 0 ? null : _ref$resolved;
      this.error = error;
      this.pending = pending;
      this.resolved = resolved;
    }
  }
};/* script */
var __vue_script__$g = script$g;
/* template */

var __vue_render__$h = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ClientOnly', [_c('section', [_vm._t("default", null, {
    "status": {
      error: _vm.error,
      pending: _vm.pending,
      resolved: _vm.resolved
    },
    "job": _vm.job
  })], 2)]);
};

var __vue_staticRenderFns__$h = [];
/* style */

var __vue_inject_styles__$i = undefined;
/* scoped */

var __vue_scope_id__$i = undefined;
/* module identifier */

var __vue_module_identifier__$i = "data-v-52e22908";
/* functional template */

var __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$i = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$i, __vue_script__$g, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$h = {
  props: {
    title: {
      required: false,
      default: "",
      type: String
    }
  },
  created: function created() {
    if (process.isClient) {
      document.addEventListener("click", this.nonModalClick);
      document.addEventListener("keyup", this.exitModal);
    }
  },
  destroyed: function destroyed() {
    if (process.isClient) {
      document.removeEventListener("click", this.nonModalClick);
      document.removeEventListener("keyup", this.exitModal);
    }
  },
  data: function data() {
    return {
      toggled: false
    };
  },
  methods: {
    close: function close() {
      this.toggled = false;
      this.$emit('modalClosed');
    },
    open: function open() {
      this.toggled = true;
      this.$emit('modalOpened');
    },
    toggle: function toggle() {
      if (this.toggled) {
        this.close();
      } else {
        this.open();
      }
    },
    nonModalClick: function nonModalClick(e) {
      var modalWrapper = this.$el.firstChild;
      var containsTarget = this.$el.contains(e.target);
      var wrapperContainsTarget = modalWrapper && modalWrapper.contains(e.target);

      if (this.toggled && containsTarget && !wrapperContainsTarget) {
        this.close();
      }
    },
    exitModal: function exitModal(e) {
      // escape
      if (this.toggled && e.keyCode === 27) {
        this.close();
      }
    },
    focusTrap: function focusTrap(e) {
      var focusable = this.$refs.modal.querySelectorAll("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      var firstFocusable = focusable[0];
      var lastFocusable = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }

      if (!e.shiftKey && document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
};/* script */
var __vue_script__$h = script$h;
/* template */

var __vue_render__$i = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.toggled ? _c('div', {
    staticClass: "page--overlay",
    on: {
      "keydown": function keydown($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) {
          return null;
        }

        return _vm.focusTrap($event);
      }
    }
  }, [_vm._ssrNode("<div tabindex=\"0\" class=\"modal\">", "</div>", [_vm._ssrNode("<div class=\"modal__header\">" + (_vm.title ? "<h3 class=\"modal__header-title\">" + _vm._ssrEscape("\n                " + _vm._s(_vm.title) + "\n            ") + "</h3>" : "<!---->") + " <button type=\"button\" class=\"modal__header-close\">\n                ×\n            </button></div> "), _vm._ssrNode("<div class=\"modal__body\">", "</div>", [_vm._t("default")], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"modal__footer\">", "</div>", [_vm._t("footer")], 2)], 2)]) : _vm._e();
};

var __vue_staticRenderFns__$i = [];
/* style */

var __vue_inject_styles__$j = undefined;
/* scoped */

var __vue_scope_id__$j = undefined;
/* module identifier */

var __vue_module_identifier__$j = "data-v-7bc41da2";
/* functional template */

var __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$j = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$j, __vue_script__$h, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);//
var script$i = {
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  components: {
    AppXIcon: __vue_component__$3,
    AppHamburgerMenuIcon: __vue_component__$1
  },
  created: function created() {
    if (process.isClient) {
      document.addEventListener("click", this.nonMenuClick);
      window.addEventListener("resize", this.close);
    }
  },
  destroyed: function destroyed() {
    if (process.isClient) {
      document.removeEventListener("click", this.nonMenuClick);
      window.removeEventListener("resize", this.close);
    }
  },
  data: function data() {
    return {
      toggled: false
    };
  },
  methods: {
    close: function close() {
      if (this.toggled) {
        this.$emit("navbarClosed");
      }

      this.toggled = false;
    },
    open: function open() {
      if (!this.toggled) {
        this.$emit("navbarOpened");
      }

      this.toggled = true;
    },
    toggle: function toggle() {
      if (this.toggled) {
        this.close();
      } else {
        this.open();
      }
    },
    linkIsActive: function linkIsActive(href) {
      if (process.isClient) {
        return href == window.location.pathname;
      }

      return false;
    },
    nonMenuClick: function nonMenuClick(e) {
      var menuWrapper = this.$refs["navBarItems"];
      var containsTarget = this.$el.contains(e.target);
      var wrapperContainsTarget = menuWrapper.contains(e.target);

      if (!containsTarget && !wrapperContainsTarget) {
        this.close();
      }
    },
    getLinkType: function getLinkType(item) {
      if (Object.prototype.hasOwnProperty.call(item, 'tag')) {
        return item.tag;
      }

      return "g-link";
    }
  }
};/* script */
var __vue_script__$i = script$i;
/* template */

var __vue_render__$j = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', {
    staticClass: "navbar"
  }, [_vm._ssrNode("<section class=\"navbar__brand\">", "</section>", [_vm._t("logo"), _vm._ssrNode(" "), _vm._ssrNode("<span class=\"navbar__brand-text\">", "</span>", [_vm._t("brand-text")], 2)], 2), _vm._ssrNode(" "), _vm._t("toggler", [_c('button', {
    staticClass: "navbar__toggler",
    attrs: {
      "type": "button",
      "aria-label": "navbar Toggle"
    },
    on: {
      "click": function click($event) {
        return _vm.toggle();
      }
    }
  }, [!_vm.toggled ? _c('AppHamburgerMenuIcon', {
    staticClass: "pointer-events-none"
  }) : _c('AppXIcon', {
    staticClass: "pointer-events-none"
  })], 1)], {
    "toggled": _vm.toggled,
    "toggleNav": _vm.toggle
  }), _vm._ssrNode(" "), _vm._ssrNode("<ul" + _vm._ssrClass("navbar__items", {
    'navbar__items--toggled': _vm.toggled
  }) + ">", "</ul>", _vm._l(_vm.links, function (item, index) {
    return _vm._ssrNode("<li class=\"navbar__item\">", "</li>", [_vm._t(item.key, [_c(_vm.getLinkType(item), _vm._b({
      tag: "component",
      staticClass: "navbar__item-link",
      class: {
        'navbar__item-link--active': _vm.linkIsActive(item.href)
      },
      attrs: {
        "href": item.href,
        "to": item.href
      }
    }, 'component', item.attributes, false), [_vm._v("\n                    " + _vm._s(item.display) + "\n                ")])], {
      "link": item
    })], 2);
  }), 0)], 2);
};

var __vue_staticRenderFns__$j = [];
/* style */

var __vue_inject_styles__$k = undefined;
/* scoped */

var __vue_scope_id__$k = undefined;
/* module identifier */

var __vue_module_identifier__$k = "data-v-9959676c";
/* functional template */

var __vue_is_functional_template__$k = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$k = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$k, __vue_script__$i, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$j = {
  props: {
    totalRecords: {
      required: true,
      type: Number
    },
    totalPages: {
      required: true,
      type: Number
    },
    pageLimit: {
      required: false,
      type: Number,
      default: 5
    },
    currentPage: {
      required: false,
      type: Number,
      default: 1
    }
  },
  data: function data() {
    return {
      current: this.currentPage
    };
  },
  computed: {
    nextPage: function nextPage() {
      var next = this.current + 1;
      return next <= this.totalPages ? next : false;
    },
    previousPage: function previousPage() {
      var previous = this.current - 1;
      return previous >= 1 ? previous : false;
    },
    pages: function pages() {
      var pages = this.getPageRange();

      if (pages.length < this.pageLimit) {
        var start = Math.max(1, this.current - Math.abs(this.pageLimit - pages.length));
        pages = this.range(start, this.totalPages);
      }

      pages = this.prefixPages(pages);
      return this.suffixPages(pages);
    },
    pageIsInRange: function pageIsInRange() {
      var page = this.current;
      return page >= 1 && page <= this.totalPages;
    }
  },
  methods: {
    getPageRange: function getPageRange() {
      var pageLimit = this.pageLimit - 1;
      var isLimitTotal = this.totalPages == pageLimit;

      if (isLimitTotal || !this.pageIsInRange) {
        return this.range(1, pageLimit);
      }

      return this.range(this.current, Math.min(this.current + pageLimit, this.totalPages));
    },
    prefixPages: function prefixPages(pages) {
      if (!pages.includes(1)) {
        var fromOne = Math.abs(pages[0] - 1);
        pages = (fromOne >= 2 ? [1, "..."] : [1]).concat(pages);
      }

      return pages;
    },
    suffixPages: function suffixPages(pages) {
      if (!pages.includes(this.totalPages)) {
        var fromLast = Math.abs(this.totalPages - pages[pages.length - 1]);
        pages = pages.concat(fromLast >= 2 ? ["...", this.totalPages] : [this.totalPages]);
      }

      return pages;
    },
    selectPage: function selectPage(page) {
      if (!page || isNaN(page)) {
        return;
      }

      this.current = page;
      this.$emit("pageSelected", {
        page: page
      });
    },
    range: function range(start, end) {
      var i;
      var range = [];

      for (i = start; i <= end; i++) {
        range.push(i);
      }

      return range;
    },
    disablePage: function disablePage(page) {
      if (page === this.current) {
        return true;
      }

      if (page === "...") {
        return true;
      }

      return false;
    },
    ariaPageTitle: function ariaPageTitle(page) {
      if (page === this.current) {
        return "Current Page";
      }

      if (page === "...") {
        return "Page Number Break";
      }

      return "Page ".concat(page);
    }
  }
};/* script */
var __vue_script__$j = script$j;
/* template */

var __vue_render__$k = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', {
    attrs: {
      "aria-label": "pagination"
    }
  }, [_vm.totalPages > 1 ? _vm._ssrNode("<ul class=\"pagination\">", "</ul>", [_vm._ssrNode("<li class=\"pagination__item\">", "</li>", [_vm._ssrNode("<button type=\"button\" aria-label=\"Previous Page\"" + _vm._ssrClass("pagination__link", {
    'pagination__link--hidden': !_vm.previousPage
  }) + ">", "</button>", [_vm._t("previous-text", [_vm._v("\n                    «\n                ")])], 2)]), _vm._ssrNode(" " + _vm._ssrList(_vm.pages, function (page, key) {
    return "<li class=\"pagination__item\"><button type=\"button\"" + _vm._ssrAttr("aria-label", _vm.ariaPageTitle(page)) + _vm._ssrAttr("aria-current", page == _vm.current) + _vm._ssrAttr("aria-disabled", _vm.disablePage(page)) + _vm._ssrAttr("disabled", _vm.disablePage(page)) + _vm._ssrClass("pagination__link", {
      'pagination__link--active': page == _vm.current,
      'pagination__link--disabled': _vm.disablePage(page),
      'cursor-not-allowed': _vm.disablePage(page)
    }) + ">" + _vm._ssrEscape("\n                " + _vm._s(page) + "\n            ") + "</button></li>";
  }) + " <li></li> "), _vm._ssrNode("<li class=\"pagination__item\">", "</li>", [_vm._ssrNode("<button type=\"button\" aria-label=\"Next Page\"" + _vm._ssrClass("pagination__link", {
    'pagination__link--hidden': !_vm.nextPage
  }) + ">", "</button>", [_vm._t("next-text", [_vm._v("\n                    »\n                ")])], 2)])], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$k = [];
/* style */

var __vue_inject_styles__$l = undefined;
/* scoped */

var __vue_scope_id__$l = undefined;
/* module identifier */

var __vue_module_identifier__$l = "data-v-29fb9439";
/* functional template */

var __vue_is_functional_template__$l = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$l = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$l, __vue_script__$j, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, undefined, undefined, undefined);//
var script$k = {
  data: function data() {
    return {
      meta: {},
      similarJobs: []
    };
  },
  components: {
    AppJob: __vue_component__$g
  },
  props: {
    title: {
      type: String,
      required: true
    },
    guid: {
      type: String,
      required: false,
      default: ""
    },
    location: {
      type: String,
      required: false,
      default: ""
    },
    siteConfig: {
      type: Object,
      required: true
    },
    header: {
      type: String,
      required: false,
      default: "Other Jobs You Might Like"
    }
  },
  created: function created() {
    this.getJobs();
  },
  computed: {
    hasSimilarJobs: function hasSimilarJobs() {
      return this.similarJobs.length > 0;
    }
  },
  methods: {
    getJobs: function getJobs() {
      var _this = this;

      searchService({
        num_items: 10,
        q: this.title,
        location: this.location
      }, this.siteConfig).then(function (response) {
        var data = response.data;
        var jobs = data.jobs,
            meta = data.meta;
        _this.meta = meta;
        _this.similarJobs = jobs;

        if (_this.guid) {
          _this.similarJobs = _this.similarJobs.filter(function (job) {
            return job.guid != _this.guid;
          });
        }
      });
    }
  }
};/* script */
var __vue_script__$k = script$k;
/* template */

var __vue_render__$l = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.hasSimilarJobs ? _c('section', {
    staticClass: "similar-jobs"
  }, [_vm._ssrNode("<h2 class=\"similar-jobs__title\">" + _vm._ssrEscape(_vm._s(_vm.header)) + "</h2> "), _vm._ssrNode("<div class=\"similar-jobs__grid\">", "</div>", _vm._l(_vm.similarJobs, function (similarJob, index) {
    return _c('AppJob', {
      key: index,
      attrs: {
        "site-config": _vm.siteConfig,
        "source": _vm.meta.source,
        "job": similarJob
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(jobData) {
          return [_c('section', {
            staticClass: "similar-jobs__grid-item"
          }, [_c('g-link', {
            attrs: {
              "to": jobData.detailUrl
            }
          }, [_vm._t("default", [_c('h3', {
            staticClass: "similar-jobs__grid-item-title"
          }, [_vm._v("\n                                " + _vm._s(jobData.title) + "\n                            ")]), _vm._v(" "), _c('p', {
            staticClass: "similar-jobs__grid-item-location"
          }, [_vm._v("\n                                " + _vm._s(jobData.location) + "\n                            ")])], {
            "jobData": jobData
          })], 2)], 1)];
        }
      }], null, true)
    });
  }), 1)], 2) : _vm._e();
};

var __vue_staticRenderFns__$l = [];
/* style */

var __vue_inject_styles__$m = undefined;
/* scoped */

var __vue_scope_id__$m = undefined;
/* module identifier */

var __vue_module_identifier__$m = "data-v-8a72bdac";
/* functional template */

var __vue_is_functional_template__$m = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$m = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$m, __vue_script__$k, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$l = {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  metaInfo: function metaInfo() {
    return {
      meta: [{
        rel: 'preconnect',
        href: 'https://www.youtube.com/'
      }, {
        rel: 'preconnect',
        href: 'https://googleads.g.doubleclick.net/'
      }, {
        rel: 'preconnect',
        href: 'https://static.doubleclick.net/'
      }]
    };
  },
  computed: {
    youtubeUrl: function youtubeUrl() {
      return "https://www.youtube.com/embed/".concat(this.src, "?rel=0");
    }
  }
};/* script */
var __vue_script__$l = script$l;
/* template */

var __vue_render__$m = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "video"
  }, [_vm._ssrNode("<iframe" + _vm._ssrAttr("src", _vm.youtubeUrl) + " title=\"Youtube Video\" frameborder=\"0\" loading=\"lazy\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen=\"allowfullscreen\"></iframe>")]);
};

var __vue_staticRenderFns__$m = [];
/* style */

var __vue_inject_styles__$n = undefined;
/* scoped */

var __vue_scope_id__$n = undefined;
/* module identifier */

var __vue_module_identifier__$n = "data-v-ce58715c";
/* functional template */

var __vue_is_functional_template__$n = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$n = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$n, __vue_script__$l, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, undefined, undefined, undefined);var script$m = {
  props: {
    job: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      required: false,
      default: "section"
    },
    siteConfig: {
      type: Object,
      required: true
    },
    input: {
      type: Object,
      required: false,
      default: function _default() {}
    },
    source: {
      type: String,
      required: true,
      validator: function validator(value) {
        return [GOOGLE_TALENT, SOLR].includes(value);
      }
    }
  },
  methods: {
    getAttribute: function getAttribute(attribute) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.isSolr) {
        return lodash.get(this.job, attribute, defaultValue);
      }

      var customAttr = "customAttributes.".concat(attribute, ".stringValues");
      var value = lodash.get(this.job.job, customAttr, defaultValue);
      return lodash.isArray(value) ? value.join(" ") : value;
    },
    clickedApplyJob: function clickedApplyJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      var talentData = GoogleTalentClientEvent.getSavedTalentData(); // only if the stored event type is view do we post
      // this means they are viewing this job directly from site instead
      // of navigating directly to job detail.

      if (talentData.eventType === "view") {
        GoogleTalentClientEvent.post({
          eventType: "redirect",
          jobs: talentData.jobs,
          requestId: talentData.requestId
        }, this.siteConfig).catch(function (e) {
          console.error(e); //fail silently from google talent errors.
        });
      }
    },
    clickedViewJob: function clickedViewJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      if (this.isGoogleTalent) {
        var requestId = GoogleTalentClientEvent.getSavedTalentData().requestId;
        GoogleTalentClientEvent.post({
          eventType: "view",
          jobs: [this.jobData.name],
          requestId: requestId
        }, this.siteConfig).catch(function (e) {
          console.error(e); //fail silently from google talent errors.
        });
      }
    }
  },
  computed: {
    jobData: function jobData() {
      if (this.isSolr) {
        return this.job;
      }

      return this.job.job;
    },
    commuteData: function commuteData() {
      if (this.isSolr) {
        return {};
      }

      return this.job.commuteInfo;
    },
    isSolr: function isSolr() {
      return this.source == SOLR;
    },
    isGoogleTalent: function isGoogleTalent() {
      return this.source == GOOGLE_TALENT;
    },
    reqId: function reqId() {
      if (this.isGoogleTalent) {
        return this.getAttribute("reqid");
      }

      return this.jobData.reqid;
    },
    title: function title() {
      if (this.isGoogleTalent) {
        return this.jobData.title;
      }

      return this.jobData.title_exact;
    },
    location: function location() {
      if (this.isGoogleTalent) {
        return removeCountry(this.getAttribute("city_admin1_country"));
      }

      return this.jobData.location_exact;
    },
    applyLink: function applyLink() {
      var url = "https://rr.jobsyn.org/" + this.guid;

      if (!process.isClient) {
        return url;
      } // add vs & utm parameters


      var vs = sessionStorage.getItem(VS_KEY);
      var utm = sessionStorage.getItem(UTM_KEY);
      var utm_params = {};

      if (!blank(utm)) {
        try {
          utm_params = JSON.parse(utm);
        } catch (_unused) {
          utm_params = {};
        }
      }

      var params = {};
      params = _objectSpread2(_objectSpread2(_objectSpread2({}, this.$route.query), params), utm_params);

      if (!blank(vs)) {
        params[VS_KEY] = vs;
      }

      return buildUrl__default['default'](url, params);
    },
    detailUrl: function detailUrl() {
      var loc = this.location; //fall back to state if location is blank

      if (blank(loc)) {
        loc = this.state;
      }

      var url = buildJobDetailUrl(this.title, loc, this.guid);

      if (!blank(this.input)) {
        return buildUrl__default['default'](url, this.input);
      }

      return url;
    },
    guid: function guid() {
      if (this.isGoogleTalent) {
        return this.jobData.requisitionId;
      }

      return this.jobData.guid;
    },
    city: function city() {
      if (this.isGoogleTalent) {
        return lodash.get(this.jobData, "derivedInfo.locations[0].postalAddress.locality", "");
      }

      return this.jobData.city_exact;
    },
    state: function state() {
      // if (this.isGoogleTalent) {
      //     let loc = get(
      //         this.jobData,
      //         "derivedInfo.locations[0].postalAddress.administrativeArea",
      //         ""
      //     )
      //     return fullState(loc)
      // }
      // let state = this.jobData.state_short_exact
      // //handle missing state data
      // if (blank(state)) {
      //     state = this.location.split(",")[1]
      // }
      return fullState("IN");
    },
    country: function country() {
      if (this.isGoogleTalent) {
        return this.getAttribute("country");
      }

      return this.jobData.country_short_exact;
    },
    company: function company() {
      if (this.isGoogleTalent) {
        return this.jobData.companyDisplayName;
      }

      return this.jobData.company_exact;
    },
    hasCommuteInfo: function hasCommuteInfo() {
      if (this.isSolr) {
        return false;
      }

      if (blank(this.commuteData)) {
        return false;
      }

      if (!Object.prototype.hasOwnProperty.call(this.commuteData, "travelDuration")) {
        return false;
      }

      return true;
    },
    commuteTime: function commuteTime() {
      if (blank(this.commuteData)) {
        return null;
      }

      var seconds = parseInt(this.commuteData.travelDuration.replace("s", ""));
      var hours = Math.floor(seconds / 60 / 60);
      var minutes = Math.floor(seconds / 60) - hours * 60;
      return minutes == 0 ? "< 1 minute" : minutes + " minutes";
    },
    htmlDescription: function htmlDescription() {
      if (this.isGoogleTalent) {
        return this.jobData.description;
      }

      return this.jobData.html_description;
    },
    cleanHtmlDescription: function cleanHtmlDescription() {
      // html description is not available on job detail pages?
      if (!this.htmlDescription) {
        return "";
      }

      return this.htmlDescription.replace(/(\r\n|\n|\r)/gm, "");
    },
    description: function description() {
      return this.jobData.description;
    },
    dateAdded: function dateAdded() {
      if (this.isGoogleTalent) {
        return this.jobData.postingCreateTime;
      }

      return this.jobData.date_added;
    },
    deletedAt: function deletedAt() {
      if (this.isGoogleTalent) {
        return null;
      }

      return this.jobData.deleted_at;
    }
  }
};/* script */
var __vue_script__$m = script$m;
/* template */

var __vue_render__$n = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component"
  }, [_vm._t("default", null, {
    "reqId": _vm.reqId,
    "title": _vm.title,
    "location": _vm.location,
    "detailUrl": _vm.detailUrl,
    "guid": _vm.guid,
    "city": _vm.city,
    "state": _vm.state,
    "country": _vm.country,
    "company": _vm.company,
    "hasCommuteInfo": _vm.hasCommuteInfo,
    "commuteTime": _vm.commuteTime,
    "htmlDescription": _vm.htmlDescription,
    "cleanHtmlDescription": _vm.cleanHtmlDescription,
    "description": _vm.description,
    "dateAdded": _vm.dateAdded,
    "deletedAt": _vm.deletedAt,
    "applyLink": _vm.applyLink,
    "clickedViewJob": _vm.clickedViewJob,
    "clickedApplyJob": _vm.clickedApplyJob
  })], 2);
};

var __vue_staticRenderFns__$n = [];
/* style */

var __vue_inject_styles__$o = undefined;
/* scoped */

var __vue_scope_id__$o = undefined;
/* module identifier */

var __vue_module_identifier__$o = "data-v-23d31bc8";
/* functional template */

var __vue_is_functional_template__$o = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$o = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$o, __vue_script__$m, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,AppAutocomplete: __vue_component__,AppHamburgerMenuIcon: __vue_component__$1,AppRadiusIcon: __vue_component__$2,AppXIcon: __vue_component__$3,AppHtmlToJson: __vue_component__$5,AppJsonToHtml: __vue_component__$4,AppGeoLocation: __vue_component__$6,AppGoogleLocationAutocomplete: __vue_component__$7,AppSearchFilter: __vue_component__$8,AppGoogleTalentSearchProvider: __vue_component__$9,AppSolrSearchProvider: __vue_component__$a,AppAccordion: __vue_component__$b,AppChip: __vue_component__$c,AppCookieConsent: __vue_component__$d,AppDETracker: __vue_component__$e,AppDropdown: __vue_component__$f,AppJob: __vue_component__$g,AppJobDescription: __vue_component__$h,AppJobFetch: __vue_component__$i,AppModal: __vue_component__$j,AppNavbar: __vue_component__$k,AppPagination: __vue_component__$l,AppSimilarJobs: __vue_component__$m,AppYoutube: __vue_component__$n,DeJobWrapper: __vue_component__$o});var install = function installDe(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.AppAccordion=__vue_component__$b;exports.AppAutocomplete=__vue_component__;exports.AppChip=__vue_component__$c;exports.AppCookieConsent=__vue_component__$d;exports.AppDETracker=__vue_component__$e;exports.AppDropdown=__vue_component__$f;exports.AppGeoLocation=__vue_component__$6;exports.AppGoogleLocationAutocomplete=__vue_component__$7;exports.AppGoogleTalentSearchProvider=__vue_component__$9;exports.AppHamburgerMenuIcon=__vue_component__$1;exports.AppHtmlToJson=__vue_component__$5;exports.AppJob=__vue_component__$g;exports.AppJobDescription=__vue_component__$h;exports.AppJobFetch=__vue_component__$i;exports.AppJsonToHtml=__vue_component__$4;exports.AppModal=__vue_component__$j;exports.AppNavbar=__vue_component__$k;exports.AppPagination=__vue_component__$l;exports.AppRadiusIcon=__vue_component__$2;exports.AppSearchFilter=__vue_component__$8;exports.AppSimilarJobs=__vue_component__$m;exports.AppSolrSearchProvider=__vue_component__$a;exports.AppXIcon=__vue_component__$3;exports.AppYoutube=__vue_component__$n;exports.DeJobWrapper=__vue_component__$o;exports.default=plugin;