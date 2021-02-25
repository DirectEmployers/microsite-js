(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{mnsa:function(t,e,s){"use strict";s.r(e);var i=s("p0pV"),n=s("1S0n"),o=(s("rB9j"),s("inlA"),s("UxlC"),s("EnZy"),s("VTBJ")),r=(s("07d7"),s("ls82"),s("HaE+")),a=s("vDqi"),l=s.n(a),u={props:{endpoint:{type:[String,Function,Promise],required:!0},requestOnCreated:{type:Boolean,required:!1,default:!0},parameters:{required:!1,type:Object,default:function(){return{}}},options:{required:!1,type:Object,default:function(){return{}}},tag:{default:"div",required:!1},onResolve:{type:Function,required:!1,default:null},onFailure:{type:Function,required:!1,default:null}},data:function(){return{response:null,error:null,pending:!0,resolved:null}},created:function(){this.requestOnCreated&&this.request()},computed:{responseData:function(){var t;return(null===(t=this.response)||void 0===t?void 0:t.data)||{}},requestPayload:function(){return Object(i.a)(this.parameters)?this.options:Object(o.a)({params:this.parameters},this.options)},requestHandler:function(){return"function"==typeof this.endpoint?this.endpoint(this.requestPayload):this.endpoint instanceof Promise?this.endpoint:l.a.get(this.endpoint,this.requestPayload)}},methods:{request:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.response=null,t.status({error:!1,pending:!0}),e.prev=2,e.next=5,t.requestHandler;case 5:t.response=e.sent,"function"==typeof t.onResolve?t.onResolve(t.responseData,t.response,t.status):t.status({resolved:!0}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),"function"==typeof t.onFailure?t.onFailure(e.t0,t.status):t.status({error:e.t0,resolved:!1});case 12:case"end":return e.stop()}}),e,null,[[2,9]])})))()},status:function(t){var e=t.error,s=void 0===e?null:e,i=t.pending,n=void 0!==i&&i,o=t.resolved,r=void 0===o?null:o;this.error=s,this.pending=n,this.resolved=r}}},c=s("KHd+"),d=Object(c.a)(u,(function(){var t=this.$createElement,e=this._self._c||t;return e("ClientOnly",[e(this.tag,{tag:"component"},[this._t("default",null,{data:this.responseData,request:this.request,status:{resolved:this.resolved,error:this.error,pending:this.pending}})],2)],1)}),[],!1,null,null,null).exports;s("ma9I");function p(t,e){return l.a.create({baseURL:"https://microsites.dejobs.org/",withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}}).get("".concat(e,"/data/").concat(t.toUpperCase(),".json"))}var b=s("MLWZ"),h=s.n(b),m={props:{guid:{type:String,required:!1,default:null},s3Folder:{required:!0,type:String},tag:{required:!1,default:"div"}},components:{AppFetch:d},data:function(){return{job:null,fromRouteParam:!1}},watch:{"$route.params.guid":function(){this.$refs.fetch.request()}},created:function(){null==this.guid&&(this.fromRouteParam=!0)},methods:{fetchJob:function(){var t=this.guid;return this.fromRouteParam&&(t=this.$route.params.guid,this.redirectGuidWithViewSources(t)),p(t,this.s3Folder)},redirectGuidWithViewSources:function(t){if(t.length>32){var e=t.substring(0,32),s=t.split(e)[1];window.location.replace(h()("/t/l/".concat(e,"/job"),Object(o.a)(Object(o.a)({},this.$route.query),{vs:s})))}},setJob:function(t,e){this.job=t,e({resolved:!0})},resolveJob:function(t,e,s){if(!this.fromRouteParam)return this.setJob(t,s);var n=this.$route.path.endsWith("/")?this.$route.path:"".concat(this.$route.path,"/"),o=Object(i.b)(t.title_slug,t.location_exact,t.guid);if(o===n)return this.setJob(t,s);window.location.replace(h()(o,this.$route.query))}}},f=Object(c.a)(m,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("AppFetch",{ref:"fetch",attrs:{endpoint:t.fetchJob,tag:t.tag,"on-resolve":t.resolveJob},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.status;return[t._t("default",null,{status:s,job:t.job})]}}],null,!0)})}),[],!1,null,null,null).exports,g=s("MnQ9"),j=(s("TeQF"),s("5zvA")),v={data:function(){return{meta:{},similarJobs:[]}},components:{AppJobProvider:s("Gs8H").a},props:{title:{type:String,required:!0},guid:{type:String,required:!1,default:""},location:{type:String,required:!1,default:""},siteConfig:{type:Object,required:!0},header:{type:String,required:!1,default:"Other Jobs You Might Like"}},created:function(){this.getJobs()},computed:{hasSimilarJobs:function(){return this.similarJobs.length>0}},methods:{getJobs:function(){var t=this;Object(j.h)({num_items:10,q:this.title,location:this.location},this.siteConfig).then((function(e){var s=e.data,i=s.jobs,n=s.meta;t.meta=n,t.similarJobs=i,t.guid&&(t.similarJobs=t.similarJobs.filter((function(e){return e.guid!=t.guid})))}))}}},y=Object(c.a)(v,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.hasSimilarJobs?s("section",{staticClass:"similar-jobs"},[s("h2",{staticClass:"similar-jobs__title"},[t._v(t._s(t.header))]),s("div",{staticClass:"similar-jobs__grid"},t._l(t.similarJobs,(function(e,i){return s("AppJobProvider",{key:i,attrs:{"site-config":t.siteConfig,source:t.meta.source,job:e},scopedSlots:t._u([{key:"default",fn:function(e){return[s("section",{staticClass:"similar-jobs__grid-item"},[s("g-link",{attrs:{to:e.detailUrl}},[t._t("default",[s("h3",{staticClass:"similar-jobs__grid-item-title"},[t._v("\n                                "+t._s(e.title)+"\n                            ")]),s("p",{staticClass:"similar-jobs__grid-item-location"},[t._v("\n                                "+t._s(e.city)+", "+t._s(e.state)+"\n                            ")])],{jobData:e})],2)],1)]}}],null,!0)})})),1)]):t._e()}),[],!1,null,null,null).exports,_=s("GmBy"),x={name:"AppJobDetail",metaInfo:function(){return{title:this.job?this.job.title:null,meta:[{name:"description",content:"only the best jobs"},{rel:"preconnect",href:"https://microsites.dejobs.org/"}]}},props:{job:{type:Object,required:!0}},components:{AppSolrJob:_.a,AppSimilarJobs:y},computed:{searchResultsUrl:function(){return Object(i.a)(this.$route.query)?"/jobs":h()("jobs",this.$route.query)},jsonLd:function(){return JSON.stringify({"@context":"http://schema.org","@type":"JobPosting",employmentType:"Paid Work",title:this.job.title,datePosted:this.job.date_added,description:this.job.company_exact,identifier:{"@type":"PropertyValue",name:this.job.company_exact,value:this.job.reqId},hiringOrganization:{"@type":"Organization",name:this.job.company_exact},jobLocation:{"@type":"Place",address:{"@type":"PostalAddress",addressLocality:this.job.city,addressRegion:this.job.state,addressCountry:{"@type":"Country",name:this.job.country_short_exact}}}})}}},C=Object(c.a)(x,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("AppSolrJob",{attrs:{"site-config":t.$siteConfig,job:t.job},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.title,n=e.guid,o=e.location,r=e.applyUrl,a=e.clickedApplyJob,l=e.description;return[s("div",{staticClass:"max-w-screen-xl mx-auto w-full pt-4 lg:px-6"},[s("g-link",{staticClass:"pb-2",attrs:{to:t.searchResultsUrl}},[s("svg",{staticClass:"inline",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",width:"36"}},[s("path",{attrs:{d:"M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"}})]),s("span",{staticClass:"uppercase text-m font-bold align-middle"},[t._v("\n                    Back to Job Search\n                ")])]),s("div",{staticClass:"bg-gray-300 mt-6 mb-8 mx-2 p-12"},[s("div",{staticClass:"mx-w-sm mx-auto text-center"},[s("h1",{staticClass:"text-4xl text-black font-bold"},[t._v("\n                        "+t._s(i)+"\n                    ")]),s("div",{staticClass:"text-black text-base font-bold mb-2"},[t._v("\n                        "+t._s(o)+"\n                    ")]),s("a",{staticClass:"w-32 button p-2 bg-black text-white rounded text-center mx-auto",attrs:{href:r},on:{click:function(t){return t.preventDefault(),a(t)}}},[t._v("\n                        Apply\n                    ")])])]),s("div",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"min-h-screen max-w-screen-md mb-8 mx-4 md:mx-auto job-details-content",domProps:{innerHTML:t._s(l)}}),s("AppSimilarJobs",{attrs:{siteConfig:t.$siteConfig,guid:n,title:i,location:o}}),s("script",{attrs:{type:"application/ld+json"}},[t._v("\n                "+t._s(t.jsonLd)+"\n            ")])],1)]}}])})}),[],!1,null,null,null).exports,J={name:"AppJobExpired",components:{AppSimilarJobs:y},metaInfo:function(){return{title:this.job?this.job.title:null,meta:[{name:"description",content:"only the best jobs"},{rel:"preconnect",href:"https://microsites.dejobs.org/"}]}},props:{job:{type:Object,required:!0}},computed:{jsonLd:function(){return JSON.stringify({"@context":"http://schema.org","@type":"JobPosting",employmentType:"Paid Work",title:this.job.title,datePosted:this.job.date_added,description:this.job.company_exact,identifier:{"@type":"PropertyValue",name:this.job.company_exact,value:this.job.reqId},hiringOrganization:{"@type":"Organization",name:this.job.company_exact},jobLocation:{"@type":"Place",address:{"@type":"PostalAddress",addressLocality:this.job.city,addressRegion:this.job.state,addressCountry:{"@type":"Country",name:this.job.country_short_exact}}},validThrough:this.job.deleted_at})}}},w=Object(c.a)(J,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"max-w-screen-xl mx-auto w-full pt-4 lg:px-6"},[s("g-link",{staticClass:"pb-2",attrs:{to:"/jobs"}},[s("svg",{staticClass:"inline",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",width:"36"}},[s("path",{attrs:{d:"M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"}})]),s("span",{staticClass:"uppercase text-m font-bold align-middle"},[t._v("\n            Back to Job Listings\n        ")])]),s("div",{staticClass:"bg-gray-300 mt-6 mb-8 mx-2 p-12"},[s("div",{staticClass:"mx-w-sm mx-auto text-center"},[s("h1",{staticClass:"font-bold text-4xl text-black"},[t._v("\n                "+t._s(t.job.title)+" has expired.\n            ")]),s("div",{staticClass:"text-black text-base font-bold mb-2"},[t._v("\n                "+t._s(t.job.location_exact)+"\n            ")])])]),s("div",{staticClass:"min-h-screen text-center max-w-screen-md mb-8 mx-4 md:mx-auto job-details-content"},[s("AppSimilarJobs",{attrs:{siteConfig:t.$siteConfig,guid:t.job.guid,title:t.job.title,location:t.job.location_exact}})],1),s("script",{attrs:{type:"application/ld+json"}},[t._v("\n        "+t._s(t.jsonLd)+"\n    ")])],1)}),[],!1,null,null,null).exports,q={components:{App404:n.a,AppLoader:g.a,AppJobDetail:C,AppJobExpired:w,AppJobFetch:f},methods:{isExpired:function(t){return t&&!Object(i.a)(t.deleted_at)}}},O=Object(c.a)(q,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Layout",[s("AppJobFetch",{attrs:{"s3-folder":t.$siteConfig.s3Folder},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.job,n=e.status,o=n.error,r=n.pending,a=n.resolved;return[r?s("AppLoader"):o&&!a?s("App404"):t.isExpired(i)?s("AppJobExpired",{attrs:{job:i}}):i?s("AppJobDetail",{attrs:{job:i}}):t._e()]}}])})],1)}),[],!1,null,null,null);e.default=O.exports}}]);