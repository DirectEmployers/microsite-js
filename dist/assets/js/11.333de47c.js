(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{p1Yb:function(e,t,a){"use strict";a.r(t);a("qePV");var n={props:{totalPages:{required:!0,type:Number},pageLimit:{required:!1,type:Number,default:5},currentPage:{required:!1,type:Number,default:1}},data:function(){return{current:this.currentPage}},computed:{nextPage:function(){var e=this.current+1;return e<=this.totalPages&&e},previousPage:function(){var e=this.current-1;return e>=1&&e}},methods:{selectPage:function(e){e&&!isNaN(e)&&(this.current=e,this.$emit("pageSelected",{page:e}))}}},r=a("KHd+"),u=Object(r.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"simple-pagination",attrs:{"aria-label":"pagination"}},[e.currentPage>1?a("button",{staticClass:"simple-pagination-button",on:{click:function(t){return t.preventDefault(),e.selectPage(e.previousPage)}}},[e._t("back",[e._v("Back")])],2):e._e(),e._t("default"),e.currentPage<e.totalPages?a("button",{staticClass:"simple-pagination-button",on:{click:function(t){return t.preventDefault(),e.selectPage(e.nextPage)}}},[e._t("next",[e._v("Next")])],2):e._e()],2)}),[],!1,null,null,null);t.default=u.exports}}]);