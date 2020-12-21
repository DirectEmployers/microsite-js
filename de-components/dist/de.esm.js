import { debounce } from 'lodash';

//
var script = {
  name: "AppAutocompleteInput",
  inheritAttrs: false,
  props: {
    id: {
      type: String,

      default() {
        return `${this._uid}`;
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
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      selectedIndex: -1,
      results: [],
      result: null,
      loading: false,
      error: null
    };
  },

  methods: {
    doSearch: debounce(async function (value) {
      if (value.length < 2) return;

      try {
        this.loading = true;
        const {
          data
        } = await this.query.get(value, this.queryConfig);
        this.results = data || [];
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }, 200),

    changeValue(value) {
      this.$emit("input", value);
      this.selectedIndex = -1;
      this.doSearch(value);
    },

    blur(event) {
      this.$emit("input", event.target.value);
      setTimeout(() => this.results = [], 200);
    },

    setValue(result) {
      let value = result[this.display];

      if (Object.prototype.hasOwnProperty.call(result, "value")) {
        value = result.value;
      }

      this.$emit("input", value);
      this.result = result;
      this.$emit("setResult", result);
    },

    keyEnter() {
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

    keyUp() {
      if (this.selectedIndex > -1) {
        this.selectedIndex--;
      }

      if (this.selectedIndex == -1) {
        this.selectedIndex = this.results.length;
      }

      this.scroll();
    },

    keyDown() {
      if (this.selectedIndex <= this.results.length) {
        this.selectedIndex++;
      }

      if (this.selectedIndex >= this.results.length) {
        this.selectedIndex = 0;
      }

      this.scroll();
    },

    scroll() {
      const option = this.$refs[`option-${this.selectedIndex}`];

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
    isExpanded() {
      return this.results.length ? "true" : "false";
    },

    activeDescendant() {
      return this.selectedIndex > -1 ? `form__autocomplete--${this.id}-${this.selectedIndex}` : "";
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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
  }, [_vm.label ? _c('label', {
    staticClass: "form__label",
    attrs: {
      "id": "form__label-" + _vm.id,
      "for": "form__autocomplete-" + _vm.id
    }
  }, [_vm._v("\n        " + _vm._s(_vm.label) + "\n    ")]) : _vm._e(), _vm._v(" "), _c('input', _vm._b({
    ref: "input",
    staticClass: "form__input",
    attrs: {
      "id": "form__autocomplete-" + _vm.id,
      "type": "text",
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-labelledby": "form__label-" + _vm.id,
      "aria-activedescendant": _vm.activeDescendant
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function ($event) {
        return _vm.changeValue($event.target.value);
      },
      "blur": _vm.blur,
      "keydown": [function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        $event.preventDefault();
        return _vm.keyEnter($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }

        return _vm.blur($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
          return null;
        }

        return _vm.keyUp($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
          return null;
        }

        return _vm.keyDown($event);
      }]
    }
  }, 'input', _vm.$attrs, false)), _vm._v(" "), _vm.loading ? _c('div', {
    staticClass: "form__autocomplete--loading spinner spinner--gray"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.results.length,
      expression: "results.length"
    }],
    staticClass: "form__autocomplete-results"
  }, [_c('ul', {
    staticClass: "form__autocomplete-items",
    attrs: {
      "id": "form__autocomplete-items-" + _vm.id,
      "role": "listbox"
    }
  }, [_vm._l(_vm.results, function (result, index) {
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
        "mouseover": function ($event) {
          _vm.selectedIndex = index;
        },
        "click": function ($event) {
          return _vm.setValue(result);
        }
      }
    }, [_vm._v("\n                        " + _vm._s(result[_vm.display]) + "\n                    ")])], {
      "result": result
    })];
  })], 2)])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = "data-v-a81cf35a";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

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
var script$1 = {
  props: {
    src: {
      type: String,
      required: true
    }
  },

  metaInfo() {
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
    youtubeUrl: function () {
      return `https://www.youtube.com/embed/${this.src}?rel=0`;
    }
  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "video"
  }, [_c('iframe', {
    attrs: {
      "src": _vm.youtubeUrl,
      "title": "Youtube Video",
      "frameborder": "0",
      "loading": "lazy",
      "allow": "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      "allowfullscreen": ""
    }
  })]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = "data-v-68f31aef";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

/* script */

/* template */
var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 397.23 485.8"
    }
  }, [_c('title', [_vm._v("Radius Icon")]), _vm._v(" "), _c('g', [_c('g', [_c('path', {
    attrs: {
      "d": "M306.79,167.5c34,30.5,52.44,76.78,52.44,119.69A160.62,160.62,0,0,1,85,400.76,159.59,159.59,0,0,1,38,287.19c0-42.91,18.29-89.69,54.29-119.69l-20-32.93C28.14,171,0,225.48,0,287.19,0,396.88,88.92,485.8,198.62,485.8s198.61-88.92,198.61-198.61a198.18,198.18,0,0,0-71.5-152.62Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M247.83,237.48c15.47,13.88,23.86,34.94,23.86,54.46a73.08,73.08,0,1,1-146.15,0c0-19.52,8.32-40.81,24.7-54.46l-9.1-15a90.19,90.19,0,1,0,115.31,0Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M200,0V0h-1.36V0a90.36,90.36,0,0,0-89,90.35c2.18,44,88.74,194.78,89.67,196.39v0c.93-1.61,87.49-152.43,89.67-196.39A90.36,90.36,0,0,0,200,0Z"
    }
  })])])]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, {}, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

/* script */

/* template */
var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 96 96",
      "enable-background": "new 0 0 96 96"
    }
  }, [_c('polygon', {
    attrs: {
      "points": "96,14 82,0 48,34 14,0 0,14 34,48 0,82 14,96 48,62 82,96 96,82 62,48 "
    }
  })]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, {}, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DeAutocomplete: __vue_component__,
    DeYoutube: __vue_component__$1,
    DeRadiusIcon: __vue_component__$2,
    DeXIcon: __vue_component__$3
});

// Import vue components

const install = function installDe(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as DeAutocomplete, __vue_component__$2 as DeRadiusIcon, __vue_component__$3 as DeXIcon, __vue_component__$1 as DeYoutube };
