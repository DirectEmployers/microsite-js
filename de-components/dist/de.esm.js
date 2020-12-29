import { debounce, kebabCase, truncate, trim, trimEnd, words, toString, upperFirst, get, clone, startCase, uniqBy, omitBy, endsWith, isArray } from 'lodash';
import html2json$1 from 'html2json';
import linkify from 'linkifyjs/html';
import buildUrl from 'axios/lib/helpers/buildURL';
import axios from 'axios';

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

const __vue_scope_id__ = undefined;
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
var script$1 = {
  props: {
    title: {
      default: "Menu",
      required: false,
      type: String
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

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 20 20"
    }
  }, [_c('title', [_vm._v(_vm._s(_vm.title) + " ")]), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
    }
  })]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
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
const json2html = html2json$1.json2html;

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
    convert2html(json) {
      return json2html(json);
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$4 = function () {
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

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$2, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

const html2json = html2json$1.html2json;
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

  data() {
    return {
      json: null
    };
  },

  mounted() {
    this.parseHtmlDescription();
  },

  methods: {
    parseHtmlDescription() {
      const json = html2json(this.linkifyHtml());

      for (var i = 0, len = json.child.length; i < len; i++) {
        let className = null;

        if (json.child[i].child !== undefined) {
          if (json.child[i].child[0].child !== undefined) {
            if (json.child[i].child[0].child[0].node == "text") {
              className = kebabCase(truncate(json.child[i].child[0].child[0].text, {
                length: 64
              }));
            }
          }
        }

        json.child[i]["attr"] = {
          class: className ? className : `node-${i}`
        };
      }

      this.json = json;
    },

    cleanHtml() {
      return this.html.replace(/(\r\n|\n|\r)/gm, "");
    },

    linkifyHtml() {
      return linkify(this.cleanHtml(), {
        className: "job-detail-link",
        attributes: {
          rel: "noreferrer"
        }
      });
    }

  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.json ? _c('div', [_vm._l(_vm.json.child, function (json, index) {
    return [json.attr.class == _vm.lookupClass ? [_vm._t("default"), _vm._v(" "), _c('AppJsonToHtml', _vm._b({
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

const __vue_inject_styles__$5 = undefined;
/* scoped */

const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$3, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

//
var script$4 = {
  computed: {
    isSupported() {
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
    getGeoLocation() {
      if (process.isClient && this.isSupported) {
        navigator.geolocation.getCurrentPosition(position => {
          let lat = position.coords.latitude.toFixed(6);
          let lon = position.coords.longitude.toFixed(6);
          let coords = lat + "," + lon;
          this.$emit("getCoords", coords);
        }, error => {
          if (error.code == 1) {
            this.$emit("permissionDenied");
          }
        });
      }
    }

  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$6 = function () {
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

const __vue_inject_styles__$6 = undefined;
/* scoped */

const __vue_scope_id__$6 = undefined;
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$4, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

let states = {
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
let provinces = {
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
let countries = {
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

  let i;
  let keys = Object.keys(countries);
  let total = keys.length;
  let result = trim(value.toString());

  for (i = 0; i < total; i++) {
    if (result.endsWith(keys[i])) {
      result = trimEnd(result, keys[i]);
      break;
    }
  }

  return trimEnd(trim(result), ",");
}
/**
 * Expand a code value to full state name.
 */

function fullState(code) {
  if (blank(code)) {
    return code;
  }

  let result = trim(code.toString());

  if (Object.prototype.hasOwnProperty.call(states, result.toUpperCase())) {
    return states[result.toUpperCase()];
  }

  if (Object.prototype.hasOwnProperty.call(provinces, result.toUpperCase())) {
    return provinces[result.toUpperCase()];
  }

  return result;
}

/**
 * Check if the given value is "blank".
 */

function blank(value) {
  let isBlank = false;

  if ([undefined, null, NaN, ""].includes(value)) {
    isBlank = true;
  } else if (typeof value === "string" && value.trim().length === 0) {
    isBlank = true;
  } else if (Array.isArray(value) && value.length == 0) {
    isBlank = true;
  } else if (typeof value === "object" && Object.keys(value).length === 0) {
    isBlank = true;
  }

  return isBlank;
}
/**
 * Run the given function and keep trying if it fails
 * until the max retries are exceeded and return a promise.
 */

function retry(callback, args = [], max = 5, delay = 100) {
  return new Promise((resolve, reject) => {
    try {
      let result = callback(...args);
      return resolve(result);
    } catch (e) {
      if (max > 0) {
        setTimeout(function () {
          return retry(callback, args, --max, delay * 2).then(resolve).catch(err => {
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
  let locationSlug = slugify(removeCountry(location));
  let titleSlug = slugify(title);

  if (blank(locationSlug)) {
    locationSlug = "none";
  }

  return `/${locationSlug}/${titleSlug}/${guid}/job/`;
}

const slugify = string => words(toString(string).replace(/["\u2019+:+/]/g, ""), /[\w]+/g).reduce((result, word, index) => result + (index ? "-" : "") + word.toLowerCase(), "");

function displayLocationFromSlug(string) {
  if (string.indexOf("-") > -1) {
    return words(toString(string)).reduce((result, word, index, original) => upperFirst(result + (index !== original.length - 1 ? " " + upperFirst(word) : ", " + word.toUpperCase())));
  }

  return upperFirst(string);
}

//
var script$5 = {
  props: {
    apiKey: {
      type: String,
      required: true
    },
    value: String
  },

  created() {
    if (!this.placesApiLoaded) {
      this.appendPlacesScript();
    }
  },

  mounted() {
    retry(this.initAutocomplete);
  },

  computed: {
    apiScriptUrl() {
      let key = this.apiKey;
      return `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    },

    placesApiLoaded() {
      return typeof get(window, "google.maps.places") == "object";
    }

  },
  methods: {
    appendPlacesScript() {
      if (process.isClient) {
        let script = document.createElement("script");
        script.setAttribute("src", this.apiScriptUrl);
        document.head.appendChild(script);
      }
    },

    initAutocomplete() {
      const placeAutoComplete = new google.maps.places.Autocomplete(this.$refs.autocompleteInput);
      placeAutoComplete.addListener("place_changed", () => {
        const place = placeAutoComplete.getPlace();
        const geo = place.geometry;

        if (geo) {
          const lat = geo.location.lat();
          const lon = geo.location.lng();
          this.$emit("locationSelected", place.formatted_address, lat + "," + lon);
        }
      });
    }

  }
};

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$7 = function () {
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
      "input": function ($event) {
        return _vm.$emit('input', $event.target.value);
      }
    }
  }, 'input', _vm.$attrs, false));
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = undefined;
/* scoped */

const __vue_scope_id__$7 = undefined;
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$5, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

//
var script$6 = {
  props: {
    keyName: {
      required: false,

      default() {
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
      default: () => []
    },
    input: {
      required: false,
      type: Object,
      default: () => {
        return {};
      }
    },
    limit: {
      required: false,
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      givenOptions: clone(this.options || []),
      displayedFilters: {}
    };
  },

  created() {
    let value = null;
    let filteredOptions = [];
    this.givenOptions.forEach(option => {
      value = this.optionHasSubmitValue(option) ? option.submit : option.display;

      if (this.input[this.name] != value) {
        filteredOptions.push(this.buildFilterHref(option));
      }
    });
    this.displayedFilters = filteredOptions.slice(0, this.limit);
  },

  computed: {
    hasOptions() {
      return this.displayedFilters.length > 0;
    },

    isVisible() {
      return this.visible !== false;
    },

    shouldShowLess() {
      return this.displayedFilters.length > this.limit;
    },

    shouldShowMore() {
      return this.displayedFilters.length < this.givenOptions.length;
    }

  },
  methods: {
    optionHasSubmitValue(option) {
      return Object.prototype.hasOwnProperty.call(option, 'submit');
    },

    buildFilterHref(option) {
      let value = this.optionHasSubmitValue(option) ? option.submit : option.display;
      let params = {
        page: 1,
        [this.name]: value
      };
      option.href = buildUrl("jobs", { ...this.input,
        ...params
      });
      return option;
    },

    showMore() {
      const numberOfItemsToAdd = this.limit;
      const currentTotalShown = this.displayedFilters.length;
      this.displayedFilters = this.givenOptions.slice(0, currentTotalShown + numberOfItemsToAdd);
    },

    showLess() {
      const limit = this.limit;
      const currentTotalShown = this.displayedFilters.length;
      let less = currentTotalShown - limit;

      if (less < limit) {
        less = currentTotalShown - less;
      }

      this.displayedFilters = this.givenOptions.slice(0, less);
    }

  }
};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$8 = function () {
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
      "click": function ($event) {
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
      "click": function ($event) {
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

const __vue_inject_styles__$8 = undefined;
/* scoped */

const __vue_scope_id__$8 = undefined;
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$6, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

const SOLR = "solr";
const GOOGLE_TALENT = "google_talent";
const TIMEOUT_THRESHOLD = 5000;
let API_URL = "https://qc-search-api.jobsyn.org/api/v1/";

if (process.env.GRIDSOME_USE_MINIKUBE === "true") {
  API_URL = "http://minikube:35000/api/v1";
} else if (!isDevelopment()) {
  //update whenever we have a prod version.
  API_URL = "https://qc-search-api.jobsyn.org/api/v1/";
}

function api() {
  return axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
}
function searchService(input, siteConfig) {
  const source = kebabCase(siteConfig.source);
  return api().post(`${source}/search`, {
    data: input,
    config: siteConfig
  }, {
    timeout: TIMEOUT_THRESHOLD
  });
}
function commuteSearchService(input, siteConfig) {
  return api().post(`google-talent/commute`, {
    data: input,
    config: siteConfig
  }, {
    timeout: TIMEOUT_THRESHOLD
  });
}

var base = {
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

  data() {
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
    inputDefinition() {
      return { ...this.sharedInputDefinition(),
        ...this.providerInputDefinition()
      };
    },

    defaultInput() {
      let defaults = {};
      Object.entries(this.inputDefinition).forEach(([name, definition]) => {
        defaults[name] = definition.default;
      });
      return defaults;
    },

    service() {
      return searchService;
    },

    isGoogleTalent() {
      return this.meta.source == GOOGLE_TALENT;
    },

    //unused
    isSolr() {
      return this.meta.source == SOLR;
    },

    hasJobs() {
      return this.jobs.length > 0 || this.featuredJobs.length > 0;
    },

    configFilters() {
      return this.siteConfig.filters || [];
    },

    sort() {
      let sort = {
        options: [],
        sortField: () => {},
        by: null
      };
      let sortMeta = clone(this.meta.sort || {});

      if (blank(sortMeta)) {
        return sort;
      }

      sort.sortField = field => {
        this.input.sort = field.toLowerCase();
        this.newSearch();
      };

      sort.by = blank(sortMeta) ? "" : startCase(sortMeta.active);
      sort.options = sortMeta.options.map(o => startCase(o));
      return sort;
    },

    slotData() {
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
    "$route.query"() {
      this.input = this.mergeWithDefaultInput(this.$route.query);
      this.queryChanged();
      this.search();
    }

  },

  created() {
    this.input = this.mergeWithDefaultInput({ ...this.$route.query,
      ...this.$route.params
    });

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
    queryChanged() {},

    beforeSearch() {},

    excludePayload() {
      return [];
    },

    providerInputDefinition() {
      return {};
    },

    applyFilters() {
      return [];
    },

    sharedInputDefinition() {
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

    mergeWithDefaultInput(object = {}) {
      return { ...this.defaultInput,
        ...object
      };
    },

    removeFilter(params) {
      if (params == "*") {
        return this.newSearch(this.defaultInput);
      }

      if (!Array.isArray(params)) {
        params = [params];
      }

      let otherParams = null;
      let definition = null;

      let getDefinition = name => this.inputDefinition[name] || {};

      params.forEach(key => {
        // default this input filter
        definition = getDefinition(key);
        this.input[key] = definition.default || ""; //then default dependent params as defined in definition for this input.

        otherParams = definition.clears || [];
        otherParams.forEach(name => {
          definition = getDefinition(name);
          this.input[name] = definition.default || "";
        });
      });
      this.newSearch();
    },

    getAppliedFilters() {
      return uniqBy(this.configFilters, "name").filter(filter => {
        return !blank(this.input[filter.name]);
      }).map(filter => {
        return {
          display: this.input[filter.name],
          parameter: filter.name
        };
      }).concat(this.applyFilters());
    },

    search() {
      this.beforeSearch();
      this.status.loading = true;
      this.service(this.filterInput(this.input), this.siteConfig).then(resp => {
        const data = resp.data || {};
        this.featuredJobs = data.featured_jobs || [];
        this.pagination = data.pagination || {};
        this.filters = data.filters || {};
        this.jobs = data.jobs || [];
        this.meta = data.meta || {
          source: SOLR
        }; //prevents sites from erroring when unable to connect to api

        this.appliedFilters = this.getAppliedFilters();
      }).catch(err => {
        this.status.error = err;
      }).finally(() => {
        this.status.loading = false;
      });
    },

    getFilterOptions(filter) {
      let key = blank(filter.key) ? filter.name : filter.key;
      let options = this.filters[key];
      return blank(options) || !Array.isArray(options) ? [] : options;
    },

    setInput(filter) {
      this.newSearch(this.mergeWithDefaultInput({ ...this.input,
        ...filter
      }));
    },

    filterInput(input) {
      let excluded = this.excludePayload();
      return omitBy(input, (v, k) => {
        return blank(v) || excluded.includes(k);
      });
    },

    newSearch(payload = null) {
      payload = payload === null ? this.input : payload;
      this.$router.push({
        path: "/jobs",
        query: this.filterInput(payload)
      }).catch(err => {});
    }

  }
};

//
var script$7 = {
  mixins: [base],

  data() {
    return {
      isCommuteSearch: false
    };
  },

  computed: {
    service() {
      return this.isCommuteSearch ? commuteSearchService : searchService;
    }

  },
  methods: {
    queryChanged() {
      this.isCommuteSearch = this.shouldDoCommuteSearch();
    },

    providerInputDefinition() {
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

    applyFilters() {
      if (!this.isSolr && this.isCommuteSearch) {
        return [{
          display: `Commute:${this.input.commuteLocation}`,
          parameter: "commuteLocation"
        }];
      }

      return [];
    },

    excludePayload() {
      let exclude = [];

      if (!this.shouldDoCommuteSearch()) {
        exclude = Object.keys(this.providerInputDefinition());
      }

      return exclude;
    },

    shouldDoCommuteSearch() {
      return !blank(this.input.coords) && !blank(this.input.commuteLocation);
    },

    beforeSearch() {
      if (this.isCommuteSearch = this.shouldDoCommuteSearch()) {
        this.input.location = "";
      }
    }

  }
};

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component"
  }, [_vm._t("default", null, null, _vm.slotData)], 2);
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = undefined;
/* scoped */

const __vue_scope_id__$9 = undefined;
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$7, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

//
var script$8 = {
  mixins: [base],
  methods: {
    providerInputDefinition() {
      return {
        moc: {
          default: ""
        }
      };
    }

  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component"
  }, [_vm._t("default", null, null, _vm.slotData)], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = undefined;
/* scoped */

const __vue_scope_id__$a = undefined;
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$8, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

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
var script$9 = {
  data() {
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

      default() {
        return `${this._uid}`;
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
};

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$b = function () {
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
      "click": function ($event) {
        _vm.active = !_vm.active;
      },
      "keyup": function ($event) {
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

const __vue_inject_styles__$b = undefined;
/* scoped */

const __vue_scope_id__$b = undefined;
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$9, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
const ENTER_KEY = 13;
var script$a = {
  props: {
    name: {
      type: [String, Array],
      required: false,

      default() {
        return `${this._uid}`;
      }

    },
    text: {
      type: String,
      required: false,
      default: ''
    }
  },

  created() {
    if (process.isClient) {
      document.addEventListener('keyup', this.hitEnter);
    }
  },

  destroyed() {
    if (process.isClient) {
      document.removeEventListener('keyup', this.hitEnter);
    }
  },

  methods: {
    hitEnter(e) {
      if (e.keyCode == ENTER_KEY && document.activeElement == this.$el) {
        this.clickedChip();
      }
    },

    clickedChip() {
      this.$emit('chipClicked', this.name);
    }

  }
};

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$c = function () {
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

const __vue_inject_styles__$c = undefined;
/* scoped */

const __vue_scope_id__$c = undefined;
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$a, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

/**Helpers for working with local/session storage */
const ACCEPTED_COOKIES_KEY = "accepted_cookie_use";
const DECLINED_COOKIES_KEY = "declined_cookie_use";
/**
 * Cookie Consent
*/

/**
 * Check if a key is stored as a string value.
 */

function isStoredAs(key, stored_as, storageType = 'localStorage') {
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

const VS_KEY = 'vs';
const UTM_KEY = 'external_utm';

//
var script$b = {
  data() {
    return {
      declined: declinedCookieUse(),
      accepted: acceptedCookieUse()
    };
  },

  computed: {
    hasAcknowleged() {
      return this.declined || this.accepted;
    }

  },
  methods: {
    acceptCookieUse() {
      if (process.isClient) {
        this.accepted = true;
        this.declined = false;
        localStorage.removeItem(DECLINED_COOKIES_KEY);
        localStorage.setItem(ACCEPTED_COOKIES_KEY, "true");
      }
    },

    declineCookieUse() {
      if (process.isClient) {
        this.accepted = false;
        this.declined = true;
        localStorage.removeItem(ACCEPTED_COOKIES_KEY);
        localStorage.setItem(DECLINED_COOKIES_KEY, "true");
        window.location.reload();
      }
    }

  }
};

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$d = function () {
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

const __vue_inject_styles__$d = undefined;
/* scoped */

const __vue_scope_id__$d = undefined;
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$b, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);

var script$c = {
  props: {
    canEngageWithJobs: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  created() {
    if (process.isClient && !declinedCookieUse() && !isDevelopment()) {
      this.appendTracker();
    }
  },

  methods: {
    appendTracker() {
      // everytime vue rerenders the script,
      // make sure we are always using a single instance
      // of the tracker. In 1.0 we do a fresh page load
      // on every page so we never had to worry about
      // having more than one instance,
      // but since this is SPA, we are ending up with several
      // instances of the tracker on every SPA update, so clear out
      // the instances so we can "simulate" a page change.
      if (typeof de_track == "object") {
        de_track.instances = [];
      }

      document.querySelectorAll("[id*='detrack']").forEach(el => el.remove());
      const script = document.createElement('script');
      script.setAttribute('src', this.scriptSrc);
      script.setAttribute('id', 'detrack');
      script.setAttribute('defer', true);
      document.body.appendChild(script);
    }

  },
  computed: {
    cleanPathName() {
      return trim(location.pathname, "/");
    },

    isJobDetail() {
      return endsWith(this.cleanPathName, "job");
    },

    isJobListing() {
      return endsWith(this.cleanPathName, "jobs");
    },

    scriptSrc() {
      const url = "https://d2e48ltfsb5exy.cloudfront.net/p/t.js?i=";
      return url + this.scriptParams;
    },

    scriptParams() {
      // default params is to assume we are on a page with no jobs/maps
      let params = "0,6";

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

  render() {
    return this.$slots.default;
  }

};

/* script */
const __vue_script__$c = script$c;
/* template */

/* style */

const __vue_inject_styles__$e = undefined;
/* scoped */

const __vue_scope_id__$e = undefined;
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$e = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$e, __vue_script__$c, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);

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
const TAB_KEY = 9;
const UP_KEY = 38;
const DOWN_KEY = 40;
const ESC_KEY = 27;
const ENTER_KEY$1 = 13;
var script$d = {
  props: {
    id: {
      type: String,
      required: false,

      default() {
        return `${this._uid}`;
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
      default: () => []
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

  data() {
    return {
      toggled: false,
      selectedIndex: -1
    };
  },

  methods: {
    toggle() {
      this.toggled = !this.toggled;
    },

    open() {
      this.toggled = true;
      this.selectedIndex = 0;
    },

    close() {
      this.toggled = false;
      this.selectedIndex = -1;
    },

    keyUp(e) {
      const code = e.keyCode; //if enter is pressed on the display button make sure dropdown is open.

      if (!this.toggled && code == ENTER_KEY$1 && document.activeElement == this.$refs['display']) {
        this.open();
        this.$nextTick(() => {
          this.$refs['link-0'][0].focus();
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

    keyDown(e) {
      const code = e.keyCode;

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

    setLinkFocus(index) {
      this.$nextTick(() => {
        this.$refs[`link-${index}`][0].focus();
      });
    },

    exitDropdown(e) {
      if (this.$el !== e.target && !this.$el.contains(e.target)) {
        this.close();
      }
    }

  },

  created() {
    if (process.isClient && this.isClick) {
      document.addEventListener('click', this.exitDropdown);

      if (this.links.length) {
        document.addEventListener('keyup', this.keyUp);
        document.addEventListener('keydown', this.keyDown);
      }
    }
  },

  destroyed() {
    if (process.isClient && this.isClick) {
      document.removeEventListener('click', this.exitDropdown);

      if (this.links.length) {
        document.removeEventListener('keyup', this.keyUp);
        document.removeEventListener('keydown', this.keyDown);
      }
    }
  },

  computed: {
    isClick() {
      return this.interactionType == 'click';
    },

    eventHandlers() {
      const type = this.interactionType;

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
          throw new Error(`Unsupported interaction type '${type}'`);
      }
    }

  }
};

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$e = function () {
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
        "mouseover": function ($event) {
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

const __vue_inject_styles__$f = undefined;
/* scoped */

const __vue_scope_id__$f = undefined;
/* module identifier */

const __vue_module_identifier__$f = undefined;
/* functional template */

const __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$f, __vue_script__$d, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);

class GoogleTalentClientEvent {
  static getSavedTalentData() {
    try {
      return JSON.parse(sessionStorage.getItem("talent")) || {};
    } catch (e) {
      return {};
    }
  }

  static saveTalentEventData(data) {
    if (process.isClient) {
      sessionStorage.setItem("talent", JSON.stringify(data));
    }
  }

  static async post(input, siteConfig) {
    //if no request id is available or client events is disabled, do nothing.
    if (blank(input.requestId) || siteConfig.client_events === false) {
      return;
    }

    try {
      let response = await api().post("google-talent/event", {
        data: input,
        config: {
          project_id: siteConfig.project_id,
          tenant_uuid: siteConfig.tenant_uuid,
          company_uuids: siteConfig.company_uuids
        }
      }, {
        timeout: TIMEOUT_THRESHOLD
      }); //save the new request id in local storage.

      if (response.data) {
        input["requestId"] = response.data.request_id;
        GoogleTalentClientEvent.saveTalentEventData(input);
      }

      return response;
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, "response")) {
        return error;
      }

      throw new Error(error);
    }
  }

}

//
var script$e = {
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
      default: () => {}
    },
    source: {
      type: String,
      required: true,
      validator: value => {
        return [GOOGLE_TALENT, SOLR].includes(value);
      }
    }
  },
  methods: {
    getAttribute(attribute, defaultValue = null) {
      if (this.isSolr) {
        return get(this.job, attribute, defaultValue);
      }

      const customAttr = `customAttributes.${attribute}.stringValues`;
      const value = get(this.job.job, customAttr, defaultValue);
      return isArray(value) ? value.join(" ") : value;
    },

    clickedApplyJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      let talentData = GoogleTalentClientEvent.getSavedTalentData(); // only if the stored event type is view do we post
      // this means they are viewing this job directly from site instead
      // of navigating directly to job detail.

      if (talentData.eventType === "view") {
        GoogleTalentClientEvent.post({
          eventType: "redirect",
          jobs: talentData.jobs,
          requestId: talentData.requestId
        }, this.siteConfig).catch(e => {
          console.error(e); //fail silently from google talent errors.
        });
      }
    },

    clickedViewJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      if (this.isGoogleTalent) {
        let requestId = GoogleTalentClientEvent.getSavedTalentData().requestId;
        GoogleTalentClientEvent.post({
          eventType: "view",
          jobs: [this.jobData.name],
          requestId: requestId
        }, this.siteConfig).catch(e => {
          console.error(e); //fail silently from google talent errors.
        });
      }
    }

  },
  computed: {
    jobData() {
      if (this.isSolr) {
        return this.job;
      }

      return this.job.job;
    },

    commuteData() {
      if (this.isSolr) {
        return {};
      }

      return this.job.commuteInfo;
    },

    isSolr() {
      return this.source == SOLR;
    },

    isGoogleTalent() {
      return this.source == GOOGLE_TALENT;
    },

    reqId() {
      if (this.isGoogleTalent) {
        return this.getAttribute("reqid");
      }

      return this.jobData.reqid;
    },

    title() {
      if (this.isGoogleTalent) {
        return this.jobData.title;
      }

      return this.jobData.title_exact;
    },

    location() {
      if (this.isGoogleTalent) {
        return removeCountry(this.getAttribute("city_admin1_country"));
      }

      return this.jobData.location_exact;
    },

    applyLink() {
      let url = "https://rr.jobsyn.org/" + this.guid;

      if (!process.isClient) {
        return url;
      } // add vs & utm parameters


      const vs = sessionStorage.getItem(VS_KEY);
      const utm = sessionStorage.getItem(UTM_KEY);
      let utm_params = {};

      if (!blank(utm)) {
        try {
          utm_params = JSON.parse(utm);
        } catch {
          utm_params = {};
        }
      }

      let params = {};
      params = { ...this.$route.query,
        ...params,
        ...utm_params
      };

      if (!blank(vs)) {
        params[VS_KEY] = vs;
      }

      return buildUrl(url, params);
    },

    detailUrl() {
      let loc = this.location; //fall back to state if location is blank

      if (blank(loc)) {
        loc = this.state;
      }

      let url = buildJobDetailUrl(this.title, loc, this.guid);

      if (!blank(this.input)) {
        return buildUrl(url, this.input);
      }

      return url;
    },

    guid() {
      if (this.isGoogleTalent) {
        return this.jobData.requisitionId;
      }

      return this.jobData.guid;
    },

    city() {
      if (this.isGoogleTalent) {
        return get(this.jobData, "derivedInfo.locations[0].postalAddress.locality", "");
      }

      return this.jobData.city_exact;
    },

    state() {
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

    country() {
      if (this.isGoogleTalent) {
        return this.getAttribute("country");
      }

      return this.jobData.country_short_exact;
    },

    company() {
      if (this.isGoogleTalent) {
        return this.jobData.companyDisplayName;
      }

      return this.jobData.company_exact;
    },

    hasCommuteInfo() {
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

    commuteTime() {
      if (blank(this.commuteData)) {
        return null;
      }

      const seconds = parseInt(this.commuteData.travelDuration.replace("s", ""));
      const hours = Math.floor(seconds / 60 / 60);
      const minutes = Math.floor(seconds / 60) - hours * 60;
      return minutes == 0 ? "< 1 minute" : minutes + " minutes";
    },

    htmlDescription() {
      if (this.isGoogleTalent) {
        return this.jobData.description;
      }

      return this.jobData.html_description;
    },

    cleanHtmlDescription() {
      // html description is not available on job detail pages?
      if (!this.htmlDescription) {
        return "";
      }

      return this.htmlDescription.replace(/(\r\n|\n|\r)/gm, "");
    },

    description() {
      return this.jobData.description;
    },

    dateAdded() {
      if (this.isGoogleTalent) {
        return this.jobData.postingCreateTime;
      }

      return this.jobData.date_added;
    },

    deletedAt() {
      if (this.isGoogleTalent) {
        return null;
      }

      return this.jobData.deleted_at;
    }

  }
};

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$f = function () {
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

const __vue_inject_styles__$g = undefined;
/* scoped */

const __vue_scope_id__$g = undefined;
/* module identifier */

const __vue_module_identifier__$g = undefined;
/* functional template */

const __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$g = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$g, __vue_script__$e, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);

//
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
    cleanHtml() {
      return this.html.replace(/(\r\n|\n|\r)/gm, "");
    }

  }
};

/* script */
const __vue_script__$f = script$f;
/* template */

var __vue_render__$g = function () {
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

const __vue_inject_styles__$h = undefined;
/* scoped */

const __vue_scope_id__$h = undefined;
/* module identifier */

const __vue_module_identifier__$h = undefined;
/* functional template */

const __vue_is_functional_template__$h = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$h = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$h, __vue_script__$f, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, undefined, undefined);

var cdn = (() => {
  return axios.create({
    baseURL: "https://microsites.dejobs.org/",
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
});

function getJob(guid, s3Folder) {
  return cdn().get(`${s3Folder}/data/${guid.toUpperCase()}.json`);
}

//
var script$g = {
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

  data() {
    return {
      job: null,
      error: null,
      pending: true,
      resolved: null
    };
  },

  watch: {
    "$route.params.guid"() {
      this.fetchJob(this.$route.params.guid, this.correctJobRouteUrl);
    }

  },

  created() {
    if (this.guid !== null) {
      this.fetchJob(this.guid);
    } else {
      this.fetchJob(this.$route.params.guid, this.correctJobRouteUrl);
    }
  },

  methods: {
    async fetchJob(guid, onResolve = null) {
      this.status({
        error: false,
        pending: true
      });

      try {
        let {
          data
        } = await getJob(guid, this.s3Folder);

        if (typeof onResolve == 'function') {
          onResolve(data);
        } else {
          this.setJob(data);
        }
      } catch (error) {
        this.status({
          error,
          resolved: false
        });
      }
    },

    setJob(job) {
      this.job = job;
      this.status({
        resolved: true
      });
    },

    correctJobRouteUrl(job) {
      let routePath = this.$route.path.endsWith("/") ? this.$route.path : `${this.$route.path}/`;
      let url = buildJobDetailUrl(job.title_slug, job.location_exact, job.guid); // check if this is the proper url for the job

      if (url !== routePath) {
        window.location.replace(buildUrl(url, this.$route.query));
      } else {
        this.setJob(job);
      }
    },

    status({
      error = null,
      pending = false,
      resolved = null
    }) {
      this.error = error;
      this.pending = pending;
      this.resolved = resolved;
    }

  }
};

/* script */
const __vue_script__$g = script$g;
/* template */

var __vue_render__$h = function () {
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

const __vue_inject_styles__$i = undefined;
/* scoped */

const __vue_scope_id__$i = undefined;
/* module identifier */

const __vue_module_identifier__$i = undefined;
/* functional template */

const __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$i = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$i, __vue_script__$g, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, undefined, undefined);

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
var script$h = {
  props: {
    title: {
      required: false,
      default: "",
      type: String
    }
  },

  created() {
    if (process.isClient) {
      document.addEventListener("click", this.nonModalClick);
      document.addEventListener("keyup", this.exitModal);
    }
  },

  destroyed() {
    if (process.isClient) {
      document.removeEventListener("click", this.nonModalClick);
      document.removeEventListener("keyup", this.exitModal);
    }
  },

  data() {
    return {
      toggled: false
    };
  },

  methods: {
    close() {
      this.toggled = false;
      this.$emit('modalClosed');
    },

    open() {
      this.toggled = true;
      this.$emit('modalOpened');
    },

    toggle() {
      if (this.toggled) {
        this.close();
      } else {
        this.open();
      }
    },

    nonModalClick(e) {
      const modalWrapper = this.$el.firstChild;
      const containsTarget = this.$el.contains(e.target);
      const wrapperContainsTarget = modalWrapper && modalWrapper.contains(e.target);

      if (this.toggled && containsTarget && !wrapperContainsTarget) {
        this.close();
      }
    },

    exitModal(e) {
      // escape
      if (this.toggled && e.keyCode === 27) {
        this.close();
      }
    },

    focusTrap(e) {
      const focusable = this.$refs.modal.querySelectorAll("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

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
};

/* script */
const __vue_script__$h = script$h;
/* template */

var __vue_render__$i = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.toggled ? _c('div', {
    staticClass: "page--overlay",
    on: {
      "keydown": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) {
          return null;
        }

        return _vm.focusTrap($event);
      }
    }
  }, [_c('div', {
    ref: "modal",
    staticClass: "modal",
    attrs: {
      "tabindex": "0"
    }
  }, [_c('div', {
    staticClass: "modal__header"
  }, [_vm.title ? _c('h3', {
    staticClass: "modal__header-title"
  }, [_vm._v("\n                " + _vm._s(_vm.title) + "\n            ")]) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "modal__header-close",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.toggle
    }
  }, [_vm._v("\n                ×\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "modal__body"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "modal__footer"
  }, [_vm._t("footer")], 2)])]) : _vm._e();
};

var __vue_staticRenderFns__$i = [];
/* style */

const __vue_inject_styles__$j = undefined;
/* scoped */

const __vue_scope_id__$j = undefined;
/* module identifier */

const __vue_module_identifier__$j = undefined;
/* functional template */

const __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$j = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$j, __vue_script__$h, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);

//
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

  created() {
    if (process.isClient) {
      document.addEventListener("click", this.nonMenuClick);
      window.addEventListener("resize", this.close);
    }
  },

  destroyed() {
    if (process.isClient) {
      document.removeEventListener("click", this.nonMenuClick);
      window.removeEventListener("resize", this.close);
    }
  },

  data() {
    return {
      toggled: false
    };
  },

  methods: {
    close() {
      if (this.toggled) {
        this.$emit("navbarClosed");
      }

      this.toggled = false;
    },

    open() {
      if (!this.toggled) {
        this.$emit("navbarOpened");
      }

      this.toggled = true;
    },

    toggle() {
      if (this.toggled) {
        this.close();
      } else {
        this.open();
      }
    },

    linkIsActive(href) {
      if (process.isClient) {
        return href == window.location.pathname;
      }

      return false;
    },

    nonMenuClick(e) {
      const menuWrapper = this.$refs["navBarItems"];
      const containsTarget = this.$el.contains(e.target);
      const wrapperContainsTarget = menuWrapper.contains(e.target);

      if (!containsTarget && !wrapperContainsTarget) {
        this.close();
      }
    },

    getLinkType(item) {
      if (Object.prototype.hasOwnProperty.call(item, 'tag')) {
        return item.tag;
      }

      return "g-link";
    }

  }
};

/* script */
const __vue_script__$i = script$i;
/* template */

var __vue_render__$j = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', {
    staticClass: "navbar"
  }, [_c('section', {
    staticClass: "navbar__brand"
  }, [_vm._t("logo"), _vm._v(" "), _c('span', {
    staticClass: "navbar__brand-text"
  }, [_vm._t("brand-text")], 2)], 2), _vm._v(" "), _vm._t("toggler", [_c('button', {
    staticClass: "navbar__toggler",
    attrs: {
      "type": "button",
      "aria-label": "navbar Toggle"
    },
    on: {
      "click": function ($event) {
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
  }), _vm._v(" "), _c('ul', {
    ref: "navBarItems",
    staticClass: "navbar__items",
    class: {
      'navbar__items--toggled': _vm.toggled
    }
  }, _vm._l(_vm.links, function (item, index) {
    return _c('li', {
      key: index,
      staticClass: "navbar__item"
    }, [_vm._t(item.key, [_c(_vm.getLinkType(item), _vm._b({
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

const __vue_inject_styles__$k = undefined;
/* scoped */

const __vue_scope_id__$k = undefined;
/* module identifier */

const __vue_module_identifier__$k = undefined;
/* functional template */

const __vue_is_functional_template__$k = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$k = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$k, __vue_script__$i, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, undefined, undefined);

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

  data() {
    return {
      current: this.currentPage
    };
  },

  computed: {
    nextPage() {
      const next = this.current + 1;
      return next <= this.totalPages ? next : false;
    },

    previousPage() {
      const previous = this.current - 1;
      return previous >= 1 ? previous : false;
    },

    pages: function () {
      let pages = this.getPageRange();

      if (pages.length < this.pageLimit) {
        let start = Math.max(1, this.current - Math.abs(this.pageLimit - pages.length));
        pages = this.range(start, this.totalPages);
      }

      pages = this.prefixPages(pages);
      return this.suffixPages(pages);
    },
    pageIsInRange: function () {
      const page = this.current;
      return page >= 1 && page <= this.totalPages;
    }
  },
  methods: {
    getPageRange() {
      const pageLimit = this.pageLimit - 1;
      const isLimitTotal = this.totalPages == pageLimit;

      if (isLimitTotal || !this.pageIsInRange) {
        return this.range(1, pageLimit);
      }

      return this.range(this.current, Math.min(this.current + pageLimit, this.totalPages));
    },

    prefixPages(pages) {
      if (!pages.includes(1)) {
        const fromOne = Math.abs(pages[0] - 1);
        pages = (fromOne >= 2 ? [1, "..."] : [1]).concat(pages);
      }

      return pages;
    },

    suffixPages(pages) {
      if (!pages.includes(this.totalPages)) {
        const fromLast = Math.abs(this.totalPages - pages[pages.length - 1]);
        pages = pages.concat(fromLast >= 2 ? ["...", this.totalPages] : [this.totalPages]);
      }

      return pages;
    },

    selectPage(page) {
      if (!page || isNaN(page)) {
        return;
      }

      this.current = page;
      this.$emit("pageSelected", {
        page: page
      });
    },

    range(start, end) {
      let i;
      let range = [];

      for (i = start; i <= end; i++) {
        range.push(i);
      }

      return range;
    },

    disablePage(page) {
      if (page === this.current) {
        return true;
      }

      if (page === "...") {
        return true;
      }

      return false;
    },

    ariaPageTitle(page) {
      if (page === this.current) {
        return "Current Page";
      }

      if (page === "...") {
        return "Page Number Break";
      }

      return `Page ${page}`;
    }

  }
};

/* script */
const __vue_script__$j = script$j;
/* template */

var __vue_render__$k = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', {
    attrs: {
      "aria-label": "pagination"
    }
  }, [_vm.totalPages > 1 ? _c('ul', {
    staticClass: "pagination"
  }, [_c('li', {
    staticClass: "pagination__item"
  }, [_c('button', {
    staticClass: "pagination__link",
    class: {
      'pagination__link--hidden': !_vm.previousPage
    },
    attrs: {
      "type": "button",
      "aria-label": "Previous Page"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.selectPage(_vm.previousPage);
      }
    }
  }, [_vm._t("previous-text", [_vm._v("\n                    «\n                ")])], 2)]), _vm._v(" "), _vm._l(_vm.pages, function (page, key) {
    return _c('li', {
      key: key,
      staticClass: "pagination__item"
    }, [_c('button', {
      staticClass: "pagination__link",
      class: {
        'pagination__link--active': page == _vm.current,
        'pagination__link--disabled': _vm.disablePage(page),
        'cursor-not-allowed': _vm.disablePage(page)
      },
      attrs: {
        "type": "button",
        "aria-label": _vm.ariaPageTitle(page),
        "aria-current": page == _vm.current,
        "aria-disabled": _vm.disablePage(page),
        "disabled": _vm.disablePage(page)
      },
      on: {
        "click": function ($event) {
          $event.preventDefault();
          return _vm.selectPage(page);
        }
      }
    }, [_vm._v("\n                " + _vm._s(page) + "\n            ")])]);
  }), _vm._v(" "), _c('li'), _vm._v(" "), _c('li', {
    staticClass: "pagination__item"
  }, [_c('button', {
    staticClass: "pagination__link",
    class: {
      'pagination__link--hidden': !_vm.nextPage
    },
    attrs: {
      "type": "button",
      "aria-label": "Next Page"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.selectPage(_vm.nextPage);
      }
    }
  }, [_vm._t("next-text", [_vm._v("\n                    »\n                ")])], 2)])], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$k = [];
/* style */

const __vue_inject_styles__$l = undefined;
/* scoped */

const __vue_scope_id__$l = undefined;
/* module identifier */

const __vue_module_identifier__$l = undefined;
/* functional template */

const __vue_is_functional_template__$l = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$l = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$l, __vue_script__$j, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, false, undefined, undefined, undefined);

//
var script$k = {
  data() {
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

  created() {
    this.getJobs();
  },

  computed: {
    hasSimilarJobs() {
      return this.similarJobs.length > 0;
    }

  },
  methods: {
    getJobs() {
      searchService({
        num_items: 10,
        q: this.title,
        location: this.location
      }, this.siteConfig).then(response => {
        const data = response.data;
        const {
          jobs,
          meta
        } = data;
        this.meta = meta;
        this.similarJobs = jobs;

        if (this.guid) {
          this.similarJobs = this.similarJobs.filter(job => {
            return job.guid != this.guid;
          });
        }
      });
    }

  }
};

/* script */
const __vue_script__$k = script$k;
/* template */

var __vue_render__$l = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.hasSimilarJobs ? _c('section', {
    staticClass: "similar-jobs"
  }, [_c('h2', {
    staticClass: "similar-jobs__title"
  }, [_vm._v(_vm._s(_vm.header))]), _vm._v(" "), _c('div', {
    staticClass: "similar-jobs__grid"
  }, _vm._l(_vm.similarJobs, function (similarJob, index) {
    return _c('AppJob', {
      key: index,
      attrs: {
        "site-config": _vm.siteConfig,
        "source": _vm.meta.source,
        "job": similarJob
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function (jobData) {
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
  }), 1)]) : _vm._e();
};

var __vue_staticRenderFns__$l = [];
/* style */

const __vue_inject_styles__$m = undefined;
/* scoped */

const __vue_scope_id__$m = undefined;
/* module identifier */

const __vue_module_identifier__$m = undefined;
/* functional template */

const __vue_is_functional_template__$m = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$m = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$m, __vue_script__$k, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, false, undefined, undefined, undefined);

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
var script$l = {
  props: {
    src: {
      type: String,
      required: true
    }
  },

  metaInfo() {
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
    youtubeUrl: function () {
      return `https://www.youtube.com/embed/${this.src}?rel=0`;
    }
  }
};

/* script */
const __vue_script__$l = script$l;
/* template */

var __vue_render__$m = function () {
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

var __vue_staticRenderFns__$m = [];
/* style */

const __vue_inject_styles__$n = undefined;
/* scoped */

const __vue_scope_id__$n = undefined;
/* module identifier */

const __vue_module_identifier__$n = undefined;
/* functional template */

const __vue_is_functional_template__$n = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$n = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$n, __vue_script__$l, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, false, undefined, undefined, undefined);

//
var script$m = {
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
      default: () => {}
    },
    source: {
      type: String,
      required: true,
      validator: value => {
        return [GOOGLE_TALENT, SOLR].includes(value);
      }
    }
  },
  methods: {
    getAttribute(attribute, defaultValue = null) {
      if (this.isSolr) {
        return get(this.job, attribute, defaultValue);
      }

      const customAttr = `customAttributes.${attribute}.stringValues`;
      const value = get(this.job.job, customAttr, defaultValue);
      return isArray(value) ? value.join(" ") : value;
    },

    clickedApplyJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      let talentData = GoogleTalentClientEvent.getSavedTalentData(); // only if the stored event type is view do we post
      // this means they are viewing this job directly from site instead
      // of navigating directly to job detail.

      if (talentData.eventType === "view") {
        GoogleTalentClientEvent.post({
          eventType: "redirect",
          jobs: talentData.jobs,
          requestId: talentData.requestId
        }, this.siteConfig).catch(e => {
          console.error(e); //fail silently from google talent errors.
        });
      }
    },

    clickedViewJob() {
      if (this.siteConfig.source == SOLR) {
        return;
      }

      if (this.isGoogleTalent) {
        let requestId = GoogleTalentClientEvent.getSavedTalentData().requestId;
        GoogleTalentClientEvent.post({
          eventType: "view",
          jobs: [this.jobData.name],
          requestId: requestId
        }, this.siteConfig).catch(e => {
          console.error(e); //fail silently from google talent errors.
        });
      }
    }

  },
  computed: {
    jobData() {
      if (this.isSolr) {
        return this.job;
      }

      return this.job.job;
    },

    commuteData() {
      if (this.isSolr) {
        return {};
      }

      return this.job.commuteInfo;
    },

    isSolr() {
      return this.source == SOLR;
    },

    isGoogleTalent() {
      return this.source == GOOGLE_TALENT;
    },

    reqId() {
      if (this.isGoogleTalent) {
        return this.getAttribute("reqid");
      }

      return this.jobData.reqid;
    },

    title() {
      if (this.isGoogleTalent) {
        return this.jobData.title;
      }

      return this.jobData.title_exact;
    },

    location() {
      if (this.isGoogleTalent) {
        return removeCountry(this.getAttribute("city_admin1_country"));
      }

      return this.jobData.location_exact;
    },

    applyLink() {
      let url = "https://rr.jobsyn.org/" + this.guid;

      if (!process.isClient) {
        return url;
      } // add vs & utm parameters


      const vs = sessionStorage.getItem(VS_KEY);
      const utm = sessionStorage.getItem(UTM_KEY);
      let utm_params = {};

      if (!blank(utm)) {
        try {
          utm_params = JSON.parse(utm);
        } catch {
          utm_params = {};
        }
      }

      let params = {};
      params = { ...this.$route.query,
        ...params,
        ...utm_params
      };

      if (!blank(vs)) {
        params[VS_KEY] = vs;
      }

      return buildUrl(url, params);
    },

    detailUrl() {
      let loc = this.location; //fall back to state if location is blank

      if (blank(loc)) {
        loc = this.state;
      }

      let url = buildJobDetailUrl(this.title, loc, this.guid);

      if (!blank(this.input)) {
        return buildUrl(url, this.input);
      }

      return url;
    },

    guid() {
      if (this.isGoogleTalent) {
        return this.jobData.requisitionId;
      }

      return this.jobData.guid;
    },

    city() {
      if (this.isGoogleTalent) {
        return get(this.jobData, "derivedInfo.locations[0].postalAddress.locality", "");
      }

      return this.jobData.city_exact;
    },

    state() {
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

    country() {
      if (this.isGoogleTalent) {
        return this.getAttribute("country");
      }

      return this.jobData.country_short_exact;
    },

    company() {
      if (this.isGoogleTalent) {
        return this.jobData.companyDisplayName;
      }

      return this.jobData.company_exact;
    },

    hasCommuteInfo() {
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

    commuteTime() {
      if (blank(this.commuteData)) {
        return null;
      }

      const seconds = parseInt(this.commuteData.travelDuration.replace("s", ""));
      const hours = Math.floor(seconds / 60 / 60);
      const minutes = Math.floor(seconds / 60) - hours * 60;
      return minutes == 0 ? "< 1 minute" : minutes + " minutes";
    },

    htmlDescription() {
      if (this.isGoogleTalent) {
        return this.jobData.description;
      }

      return this.jobData.html_description;
    },

    cleanHtmlDescription() {
      // html description is not available on job detail pages?
      if (!this.htmlDescription) {
        return "";
      }

      return this.htmlDescription.replace(/(\r\n|\n|\r)/gm, "");
    },

    description() {
      return this.jobData.description;
    },

    dateAdded() {
      if (this.isGoogleTalent) {
        return this.jobData.postingCreateTime;
      }

      return this.jobData.date_added;
    },

    deletedAt() {
      if (this.isGoogleTalent) {
        return null;
      }

      return this.jobData.deleted_at;
    }

  }
};

/* script */
const __vue_script__$m = script$m;
/* template */

var __vue_render__$n = function () {
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

const __vue_inject_styles__$o = undefined;
/* scoped */

const __vue_scope_id__$o = undefined;
/* module identifier */

const __vue_module_identifier__$o = undefined;
/* functional template */

const __vue_is_functional_template__$o = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$o = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$o, __vue_script__$m, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AppAutocomplete: __vue_component__,
    AppHamburgerMenuIcon: __vue_component__$1,
    AppRadiusIcon: __vue_component__$2,
    AppXIcon: __vue_component__$3,
    AppHtmlToJson: __vue_component__$5,
    AppJsonToHtml: __vue_component__$4,
    AppGeoLocation: __vue_component__$6,
    AppGoogleLocationAutocomplete: __vue_component__$7,
    AppSearchFilter: __vue_component__$8,
    AppGoogleTalentSearchProvider: __vue_component__$9,
    AppSolrSearchProvider: __vue_component__$a,
    AppAccordion: __vue_component__$b,
    AppChip: __vue_component__$c,
    AppCookieConsent: __vue_component__$d,
    AppDETracker: __vue_component__$e,
    AppDropdown: __vue_component__$f,
    AppJob: __vue_component__$g,
    AppJobDescription: __vue_component__$h,
    AppJobFetch: __vue_component__$i,
    AppModal: __vue_component__$j,
    AppNavbar: __vue_component__$k,
    AppPagination: __vue_component__$l,
    AppSimilarJobs: __vue_component__$m,
    AppYoutube: __vue_component__$n,
    DeJobWrapper: __vue_component__$o
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
export { __vue_component__$b as AppAccordion, __vue_component__ as AppAutocomplete, __vue_component__$c as AppChip, __vue_component__$d as AppCookieConsent, __vue_component__$e as AppDETracker, __vue_component__$f as AppDropdown, __vue_component__$6 as AppGeoLocation, __vue_component__$7 as AppGoogleLocationAutocomplete, __vue_component__$9 as AppGoogleTalentSearchProvider, __vue_component__$1 as AppHamburgerMenuIcon, __vue_component__$5 as AppHtmlToJson, __vue_component__$g as AppJob, __vue_component__$h as AppJobDescription, __vue_component__$i as AppJobFetch, __vue_component__$4 as AppJsonToHtml, __vue_component__$j as AppModal, __vue_component__$k as AppNavbar, __vue_component__$l as AppPagination, __vue_component__$2 as AppRadiusIcon, __vue_component__$8 as AppSearchFilter, __vue_component__$m as AppSimilarJobs, __vue_component__$a as AppSolrSearchProvider, __vue_component__$3 as AppXIcon, __vue_component__$n as AppYoutube, __vue_component__$o as DeJobWrapper };
