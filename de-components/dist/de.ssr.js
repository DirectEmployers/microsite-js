'use strict';Object.defineProperty(exports,'__esModule',{value:true});var lodash=require('lodash');function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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
  }, [_vm._ssrNode((_vm.label ? "<label" + _vm._ssrAttr("id", "form__label-" + _vm.id) + _vm._ssrAttr("for", "form__autocomplete-" + _vm.id) + " class=\"form__label\" data-v-a81cf35a>" + _vm._ssrEscape("\n        " + _vm._s(_vm.label) + "\n    ") + "</label>" : "<!---->") + " <input" + _vm._ssrAttr("id", "form__autocomplete-" + _vm.id) + " type=\"text\" aria-autocomplete=\"list\" aria-haspopup=\"listbox\"" + _vm._ssrAttr("aria-labelledby", "form__label-" + _vm.id) + _vm._ssrAttr("aria-activedescendant", _vm.activeDescendant) + _vm._ssrAttr("value", _vm.value) + _vm._ssrAttrs(_vm.$attrs) + " class=\"form__input\" data-v-a81cf35a> " + (_vm.loading ? "<div class=\"form__autocomplete--loading spinner spinner--gray\" data-v-a81cf35a></div>" : "<!---->") + " "), _vm._ssrNode("<div class=\"form__autocomplete-results\"" + _vm._ssrStyle(null, null, {
    display: _vm.results.length ? '' : 'none'
  }) + " data-v-a81cf35a>", "</div>", [_vm._ssrNode("<ul" + _vm._ssrAttr("id", "form__autocomplete-items-" + _vm.id) + " role=\"listbox\" class=\"form__autocomplete-items\" data-v-a81cf35a>", "</ul>", [_vm._l(_vm.results, function (result, index) {
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

var __vue_scope_id__ = "data-v-a81cf35a";
/* module identifier */

var __vue_module_identifier__ = "data-v-a81cf35a";
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
//
//
//
//
//
//
//
var script$1 = {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  metaInfo: function metaInfo() {
    return {
      meta: [{
        rel: "preconnect",
        href: "https://www.youtube.com/"
      }, {
        rel: "preconnect",
        href: "https://googleads.g.doubleclick.net/"
      }, {
        rel: "preconnect",
        href: "https://static.doubleclick.net/"
      }]
    };
  },
  computed: {
    youtubeUrl: function youtubeUrl() {
      return "https://www.youtube.com/embed/".concat(this.src, "?rel=0");
    }
  }
};function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "video"
  }, [_vm._ssrNode("<iframe" + _vm._ssrAttr("src", _vm.youtubeUrl) + " title=\"Youtube Video\" frameborder=\"0\" loading=\"lazy\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen=\"allowfullscreen\" data-v-68f31aef></iframe>")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-68f31aef_0", {
    source: ".video[data-v-68f31aef]{position:relative;display:block;width:100%;padding:0;overflow:hidden;padding-bottom:100%}.video iframe[data-v-68f31aef]{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-68f31aef";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-68f31aef";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);/* script */

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

var __vue_module_identifier__$2 = "data-v-6b406a06";
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

var __vue_module_identifier__$3 = "data-v-18024635";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, {}, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,DeAutocomplete: __vue_component__,DeYoutube: __vue_component__$1,DeRadiusIcon: __vue_component__$2,DeXIcon: __vue_component__$3});var install = function installDe(Vue) {
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
exports.DeAutocomplete=__vue_component__;exports.DeRadiusIcon=__vue_component__$2;exports.DeXIcon=__vue_component__$3;exports.DeYoutube=__vue_component__$1;exports.default=plugin;