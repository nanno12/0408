webpackJsonp(["testProject","ceshi"],{"3Bpd":function(t,e,n){var a=n("W36vj");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("1fa19cf9",a,!0)},"68W9":function(t,e,n){function a(t){n("3Bpd"),n("Y4NH")}var i=n("VU/8")(n("BjZP"),n("ELZb"),a,"data-v-93751534",null);t.exports=i.exports},"9Koq":function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,".home-page-wrap-test .w-input{width:200px!important}.ul-style .w-button:focus,.ul-style .w-button:hover{background:#cfe0ff!important}.ul-style .w-button--text:hover{color:#0f49ed}.ul-style .w-button--text{color:#000622}.ul-style .styleHover .w-button{color:#0f49ed;background:#cfe0ff!important}",""])},BjZP:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("dgP8"),i=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default={data:function(){return{activeName1:"1",search:"",visible:!1,active:0,selection:[],titleList:[{id:1,name:"临床血液"},{id:"SX0002",name:"临床体液"},{id:2,name:"临床免疫"},{id:3,name:"临床生化"}],tableData:[{time:"2019.:33",status:"其他区签约",name:"赵宇翔",type:"其他"},{time:"22:24:30",status:"未签约",name:"肖新宇",type:"本地医保"},{time:"3 08:15:10",status:"已签约",name:"陈慕杰",type:"本地医保"},{time:"4 09:23:09",status:"未签约",name:"李自然",type:"本地医保"},{time:"28:45:48",status:"未签约",name:"尤道礼",type:"本地医保"}],tabList:[{title:"全部",value:"1"},{title:"必检项目",value:"2"},{title:"关注项目",value:"3"}]}},created:function(){},components:{tab:i.default},methods:{handleSelectionChange:function(t){console.log(t),this.selection=t},handleAdd:function(){console.log("add")},handleClick:function(t,e){console.log(t,e)},handleTab:function(t,e){console.log(t,e),this.active=e},handleConfirm:function(t){console.log(12),this.tableData.splice(t,1)},handleCancel:function(t){var e=this;this.cancelManually=!0,setTimeout(function(){e.tableData[t].switch=!e.tableData[t].switch},200)},reset:function(){this.visible=!1},handleDelete:function(t){console.log(t)}}}},ELZb:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home-page-wrap-test tabs-demo"},[n("w-input",{attrs:{sufAppendIsButton:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}},[n("template",{slot:"suf-append"},[n("i",{staticClass:"w-icon-search"})])],2),t._v(" "),n("w-button",{staticClass:"fr mb-15",attrs:{plain:"",type:"primary"},on:{click:t.handleAdd}},[t._v("新增")]),t._v(" "),n("w-tabs",{attrs:{type:"dark"},on:{"tab-click":t.handleClick},model:{value:t.activeName1,callback:function(e){t.activeName1=e},expression:"activeName1"}},t._l(t.tabList,function(e,a){return n("w-tab-pane",{key:a,attrs:{label:e.title,name:e.value}},[n("w-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:!0}},[n("w-table-column",{attrs:{prop:"time",label:"项目名称"}}),t._v(" "),n("w-table-column",{attrs:{prop:"name",label:"项目标识"}}),t._v(" "),n("w-table-column",{attrs:{label:"操作",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("w-popconfirm",{attrs:{title:"确认删除这条内容吗? ",placement:"bottom"},on:{"document-click":function(n){t.handleCancel(e.$index)},confirm:function(n){t.handleConfirm(e.$index)},cancel:function(n){t.handleCancel(e.$index)}}},[n("span",{staticClass:"popconfirm-reference",attrs:{slot:"reference"},slot:"reference"},[n("w-button",{attrs:{type:"text"},on:{click:function(n){t.handleDelete(e.row)}}},[t._v("删除")])],1)])]}}])})],1)],1)})),t._v(" "),n("w-modal",{staticClass:"home-page-body",attrs:{visible:t.visible,title:"新增",showClose:!1,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.visible=e}}},[n("ul",{staticClass:"ul-style",staticStyle:{display:"inline-block"}},t._l(t.titleList,function(e,a){return n("li",{key:a,class:t.active===a?"styleHover":""},[n("w-button",{staticClass:"title",attrs:{type:"text"},on:{click:function(n){t.handleTab(e,a)}}},[t._v(t._s(e.name))])],1)})),t._v(" "),0===t.active?n("w-table",{ref:"multiTable",staticClass:"table",attrs:{border:!0,data:t.tableData},on:{"selection-change":t.handleSelectionChange}},[n("w-table-column",{attrs:{type:"selection",width:"50"}}),t._v(" "),n("w-table-column",{attrs:{label:"项目编码",prop:"time"}}),t._v(" "),n("w-table-column",{attrs:{label:"项目名称",prop:"status"}}),t._v(" "),n("w-table-column",{attrs:{label:"项目备注",prop:"status"}})],1):t._e(),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("w-button",{on:{click:t.reset}},[t._v("取 消")]),t._v(" "),n("w-button",{attrs:{type:"primary"},on:{click:t.handleAdd}},[t._v("添加到必检项目")]),t._v(" "),n("w-button",{attrs:{type:"primary"},on:{click:t.handleAdd}},[t._v("添加到关注项目")])],1)],1)],1)},staticRenderFns:[]}},"Gm+R":function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n("//Fk"),o=a(i),r=n("mvHQ"),s=a(r),l=n("g/04"),d=a(l),c=n("cCA+"),u=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(c),f=n("UeB+"),p=a(f),m=n("7+uW"),h=a(m),b=n("NYxO"),g=a(b),v=n("mtWM");h.default.use(g.default);var w=function(t){return decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||[,""])[1].replace(/\+/g,"%20"))||null},y=void 0,x=!0;v.interceptors.request.use(function(t){if("options"==t.method)return t;if(t.useOptions&&1==t.useOptions.ForSmartClient)return t;t.headers.Authorization=authToken||jwt;var e=[],n=w("menuid");e.push(n);var a=window.rootVue.$route,i="";return a&&a.params&&a.params.menuid&&(i=a.params.menuid,e.push(i)),t.headers.menuid=e.join(","),y||(y=p.default.getClientInfo()),t.headers.ClientInfo=encodeURIComponent((0,s.default)(y)),t},function(t){return o.default.reject(t)}),v.interceptors.response.use(function(t){return t.status>=200&&t.status<=300?t:o.default.reject(t)},function(t){return o.default.reject(t)});var k=function(t,e){var n="";if(t&&t.response)switch(t.response.status){case 400:n="请求错误";break;case 401:n="未授权，请登录";break;case 403:n="拒绝访问";break;case 404:n="请求地址出错: "+t.response.config.url;break;case 408:n="请求超时";break;case 500:n="服务器内部错误";break;case 501:n="服务未实现";break;case 502:n="网关错误";break;case 503:n="服务不可用";break;case 504:t.message="网关超时";break;case 505:n="HTTP版本不受支持"}t.message.indexOf("timeout of")>=0?n="请求服务已超时":"Network Error"==t.message&&(n="网络服务异常，请检查网路服务是否正常。"),e.isOnline||u.showMessage("请求服务异常，"+t.message+"："+n,u.messageType.ERROR)},_=function(t,e){var n="";if(t&&t.response)switch(t.response.status){case 400:n="请求错误";break;case 401:n="未授权，请登录";break;case 403:n="拒绝访问";break;case 404:n="请求地址出错: "+t.response.config.url;break;case 408:n="请求超时";break;case 500:n="服务器内部错误";break;case 501:n="服务未实现";break;case 502:n="网关错误";break;case 503:n="服务不可用";break;case 504:t.message="网关超时";break;case 505:n="HTTP版本不受支持"}t.message.indexOf("timeout of")>=0?n="请求服务已超时":t.message,e=e||"",u.showMessage("请求"+e+"服务错误,请检查TechSvr是否启动："+t.message+">>"+n,u.messageType.ERROR)},C={post:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];n&&u.loadMask("正在请求服务..."),"string"==typeof t&&(t={url:t});var a=t.url,i=(t.desc,t.responseType||"json");return new o.default(function(t,o){v({url:a,method:"post",data:e,responseType:i,transformRequest:[function(t){var e=new FormData;if(t.constructor==FormData)return t;for(var n in t)t[n]instanceof Object?t[n].constructor==File?e.append(n,t[n]):e.append(n,(0,s.default)(t[n])):e.append(n,t[n]);return e}]}).then(function(e){var n=e.data;if(n.type==d.default.SUCCESS)t(e.data);else if(n.type==d.default.ERROR&&"SYS_ERR"==n.failtCode)u.showMessage(n.message,u.messageType.ERROR,{detailOption:n}),o(e.data);else{if("blob"===i)return void t(e);t(e.data)}C.toLogin(n)}).catch(function(t){k(t,e),o(t)}).finally(function(){n&&u.closeLoadMask()})})},postJsonRequest:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];n&&u.loadMask("正在请求服务..."),"string"==typeof t&&(t={url:t});var a=t.url;t.desc;return new o.default(function(t,i){v({url:a,method:"post",headers:{"Content-Type":"application/json;charSet=UTF-8"},data:e}).then(function(e){var n=e.data;n.type==d.default.SUCCESS?t(e.data):n.type==d.default.ERROR&&"SYS_ERR"==n.failtCode?u.showMessage(n.message,u.messageType.ERROR,{detailOption:n}):t(e.data),C.toLogin(n)}).catch(function(t){k(t,e),i(t)}).finally(function(){n&&u.closeLoadMask()})})},postForSmartClient:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"string"==typeof t&&(t={url:t});var n=t.url,a=t.desc||"";return new o.default(function(t,i){v({url:n,method:"post",data:e,useOptions:{ForSmartClient:!0}}).then(function(e){var n=e.data;if(n.type==d.default.SUCCESS)t(e.data);else{if(n.type==d.default.ERROR)return u.showMessage("请求【"+a+"】错误："+n.message,u.messageType.ERROR),void i();t(e.data)}}).catch(function(t){_(t,"【智能客户端TechSvr】"),i(t)})})},get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"string"==typeof t&&(t={url:t});var n=t.url;t.desc;return new o.default(function(t,a){v({url:n,method:"get",params:e,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json;charset=UTF-8"}}).then(function(e){t(e.data),C.toLogin(e.data)}).catch(function(t){k(t,e),a(t)})})},put:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";"string"==typeof t&&(t={url:t});var a=t.url+n;t.desc;return new o.default(function(t,n){v({url:a,method:"put",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){t(e.data),C.toLogin(e.data)}).catch(function(t){k(t,e),n(t)})})},delete:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";"string"==typeof t&&(t={url:t});var n=t.url+e;t.desc;return new o.default(function(t,e){v({url:n,method:"delete",headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){t(e.data),C.toLogin(e.data)}).catch(function(t){k(t,params),e(t)})})},options:function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];"string"==typeof t&&(t={url:t});var e=t.url;t.desc;return new o.default(function(t,n){v({url:e,method:"options"}).then(function(e){t(e)}).catch(function(t){n(t)})})},GetUrlQueryParam:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return n?unescape(n[2]):""},fileUtils:{uploadFile:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],a=arguments[3];a&&u.loadMask("正在请求服务..."),"string"==typeof t&&(t={url:t});var i=t.url;t.desc;return new o.default(function(t,o){v({url:i,method:"post",data:e,onUploadProgress:function(t){t.lengthComputable&&n(t)}}).then(function(e){var n=e.data;t(n.type==d.default.SUCCESS?e.data:n.type==d.default.ERROR?e.data:e.data),C.toLogin(n)}).catch(function(t){k(t,e),o(t)}).finally(function(){a&&u.closeLoadMask()})})}},toLogin:function(t){if("4040"==t.messageCode||"4041"==t.messageCode){if(!x)return!1;x=!1,u.alertMessage(t.message,"提示","warning",{showClose:!1}).then(function(){top.window.location.reload(),x=!0})}}};e.default=C},W36vj:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,".home-page-wrap-test[data-v-93751534]{height:100%;padding:12px 15px;background:#eaedf4;overflow-x:auto;overflow-y:hidden}.home-page-wrap-test .home-page-body .ul-style[data-v-93751534]{position:absolute;top:65px;left:20px}.home-page-wrap-test .home-page-body .table[data-v-93751534]{width:calc(100% - 150px);margin-left:150px}.home-page-wrap-test .home-page-body .title[data-v-93751534]{text-align:center;display:inline-block;margin:10px 0;width:104px;height:40px;background:#f3f5f9;border-radius:2px}",""])},WVT1:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-table",{attrs:{data:t.list,height:"324",border:""}},[n("el-table-column",{attrs:{prop:"title",label:"Hacker News Title"}}),t._v(" "),n("el-table-column",{attrs:{prop:"author",label:"Author",width:"125"}}),t._v(" "),n("infinite-loading",{attrs:{slot:"append","force-use-infinite-wrapper":".el-table__body-wrapper"},on:{infinite:t.infiniteHandler},slot:"append"})],1),t._v(" "),n("w-input",{attrs:{placeholder:"请输入项目代码/名称搜索",sufAppendIsButton:""},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}},[n("template",{slot:"suf-append"},[n("i",{staticClass:"w-icon-search"})])],2)],1)},staticRenderFns:[]}},Y4NH:function(t,e,n){var a=n("9Koq");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("76089286",a,!0)},dgP8:function(t,e,n){var a=n("VU/8")(n("gwdr"),n("WVT1"),null,null,null);t.exports=a.exports},"g/04":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={ERROR:"ERROR",FAILT:"FAILT",NORMAL:"NORMAL",SUCCESS:"SUCCESS"};e.default=a},gwdr:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n("Xxa5"),o=a(i),r=n("exGp"),s=a(r),l=(n("HzcN"),n("qIkY")),d=a(l),c=n("qK+J"),u=a(c),f=n("mtWM");a(f);e.default={components:{InfiniteLoading:u.default},data:function(){return{value2:"",page:0,page1:20,list:[]}},created:function(){var t=this;return(0,s.default)(o.default.mark(function e(){return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},watch:{},methods:{infiniteHandler:function(t){var e=this;return(0,s.default)(o.default.mark(function n(){var a;return o.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("$state",t),n.next=3,d.default.getQuery({CHARGE_SEARCH:""});case 3:a=n.sent,console.log(a),e.list=a.data.slice(e.page,e.page1),console.log("list",e.list),e.page+=20,e.page1+=20;case 9:case"end":return n.stop()}},n,e)}))()},onInfinite:function(){var t=this;setTimeout(function(){console.log("8098590");for(var e=[],n=t.list.length+1;n<=t.list.length+20;n++)console.log("iiii",n),e.push(n);console.log(e,"8098590"),t.list=t.list.concat(e),console.log("temp","8098590",t.list),t.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded")},100)}}}},qIkY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Gm+R"),i=function(t){return t&&t.__esModule?t:{default:t}}(a),o=n("mYGX"),r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(o),s=(r.SYS_BASE_API.APPLYFORM.url,"http://172.17.1.211:20034"),l={query:s+"/clf/pafbase/findChargeItems",addUpdateItem:s+"/clf/pafbase/addOrUpdateItem",findItemInfo:s+"/clf/pafbase/findItemInfo",deleteTempItem:s+"/clf/pafbase/deleteTempItem",findPafTemplate:s+"/clf/pafbase/findPafTemplate",pafTemplate:s+"/clf/pafbase/getPafTemplateDetails",pafTemplateitems:s+"/clf/pafbase/getPafTemplateitems",copy:s+"/clf/pafbase/copyTemplate",deletePafTemplate:s+"/clf/pafbase/deletePafTemplate",addUpdateTemplate:s+"/clf/pafbase/addOrUpdatePafTemplate"};e.default={getFindPafTemplate:function(t){return i.default.postJsonRequest(l.findPafTemplate,t)},getPafTemplate:function(t){return i.default.postJsonRequest(l.pafTemplate,t)},getQuery:function(t){return i.default.postJsonRequest(l.query,t)},getAddUpdateItem:function(t){return i.default.postJsonRequest(l.addUpdateItem,t)},getAddUpdateTemplate:function(t){return i.default.postJsonRequest(l.addUpdateTemplate,t)},getFindItemInfo:function(t){return i.default.postJsonRequest(l.findItemInfo,t)},getDeleteTempItem:function(t){return i.default.postJsonRequest(l.deleteTempItem,t)},getDeletePafTemplate:function(t){return i.default.postJsonRequest(l.deletePafTemplate,t)},getPafTemplateitems:function(t){return i.default.postJsonRequest(l.pafTemplateitems,t)},getcopy:function(t){return i.default.postJsonRequest(l.copy,t)}}},"qK+J":function(t,e,n){/*!
 * vue-infinite-loading v2.4.5
 * (c) 2016-2020 PeachScript
 * MIT License
 */
!function(e,n){t.exports=n()}(0,function(){return function(t){function e(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(a,i,function(e){return t[e]}.bind(null,i));return a},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=9)}([function(t,e,n){var a=n(6);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals),(0,n(3).default)("6223ff68",a,!0,{})},function(t,e,n){var a=n(8);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals),(0,n(3).default)("27f0e51f",a,!0,{})},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",a=t[3];if(!a)return n;if(e&&"function"==typeof btoa){var i=(o=a,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");return[n].concat(a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"})).concat([i]).join("\n")}var o;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(a[o]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&a[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(t,e,n){"use strict";function a(t,e){for(var n=[],a={},i=0;i<e.length;i++){var o=e[i],r=o[0],s={id:t+":"+i,css:o[1],media:o[2],sourceMap:o[3]};a[r]?a[r].parts.push(s):n.push(a[r]={id:r,parts:[s]})}return n}function i(t,e,n,i){b=n,v=i||{};var r=a(t,e);return o(r),function(e){for(var n=[],i=0;i<r.length;i++){var s=r[i];(l=f[s.id]).refs--,n.push(l)}for(e?o(r=a(t,e)):r=[],i=0;i<n.length;i++){var l;if(0===(l=n[i]).refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete f[l.id]}}}}function o(t){for(var e=0;e<t.length;e++){var n=t[e],a=f[n.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](n.parts[i]);for(;i<n.parts.length;i++)a.parts.push(s(n.parts[i]));a.parts.length>n.parts.length&&(a.parts.length=n.parts.length)}else{var o=[];for(i=0;i<n.parts.length;i++)o.push(s(n.parts[i]));f[n.id]={id:n.id,refs:1,parts:o}}}}function r(){var t=document.createElement("style");return t.type="text/css",p.appendChild(t),t}function s(t){var e,n,a=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(a){if(b)return g;a.parentNode.removeChild(a)}if(w){var i=h++;a=m||(m=r()),e=l.bind(null,a,i,!1),n=l.bind(null,a,i,!0)}else a=r(),e=d.bind(null,a),n=function(){a.parentNode.removeChild(a)};return e(t),function(a){if(a){if(a.css===t.css&&a.media===t.media&&a.sourceMap===t.sourceMap)return;e(t=a)}else n()}}function l(t,e,n,a){var i=n?"":a.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var o=document.createTextNode(i),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}function d(t,e){var n=e.css,a=e.media,i=e.sourceMap;if(a&&t.setAttribute("media",a),v.ssrId&&t.setAttribute("data-vue-ssr-id",e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}n.r(e),n.d(e,"default",function(){return i});var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u,f={},p=c&&(document.head||document.getElementsByTagName("head")[0]),m=null,h=0,b=!1,g=function(){},v=null,w="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase()),y=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")})},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e.default=i.a},function(t,e,n){(t.exports=n(2)(!1)).push([t.i,'.loading-wave-dots[data-v-46b20d22]{position:relative}.loading-wave-dots[data-v-46b20d22] .wave-item{position:absolute;top:50%;left:50%;display:inline-block;margin-top:-4px;width:8px;height:8px;border-radius:50%;-webkit-animation:loading-wave-dots-data-v-46b20d22 linear 2.8s infinite;animation:loading-wave-dots-data-v-46b20d22 linear 2.8s infinite}.loading-wave-dots[data-v-46b20d22] .wave-item:first-child{margin-left:-36px}.loading-wave-dots[data-v-46b20d22] .wave-item:nth-child(2){margin-left:-20px;-webkit-animation-delay:.14s;animation-delay:.14s}.loading-wave-dots[data-v-46b20d22] .wave-item:nth-child(3){margin-left:-4px;-webkit-animation-delay:.28s;animation-delay:.28s}.loading-wave-dots[data-v-46b20d22] .wave-item:nth-child(4){margin-left:12px;-webkit-animation-delay:.42s;animation-delay:.42s}.loading-wave-dots[data-v-46b20d22] .wave-item:last-child{margin-left:28px;-webkit-animation-delay:.56s;animation-delay:.56s}@-webkit-keyframes loading-wave-dots-data-v-46b20d22{0%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}10%{-webkit-transform:translateY(-6px);transform:translateY(-6px);background:#999}20%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}to{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}}@keyframes loading-wave-dots-data-v-46b20d22{0%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}10%{-webkit-transform:translateY(-6px);transform:translateY(-6px);background:#999}20%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}to{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}}.loading-circles[data-v-46b20d22] .circle-item{width:5px;height:5px;-webkit-animation:loading-circles-data-v-46b20d22 linear .75s infinite;animation:loading-circles-data-v-46b20d22 linear .75s infinite}.loading-circles[data-v-46b20d22] .circle-item:first-child{margin-top:-14.5px;margin-left:-2.5px}.loading-circles[data-v-46b20d22] .circle-item:nth-child(2){margin-top:-11.26px;margin-left:6.26px}.loading-circles[data-v-46b20d22] .circle-item:nth-child(3){margin-top:-2.5px;margin-left:9.5px}.loading-circles[data-v-46b20d22] .circle-item:nth-child(4){margin-top:6.26px;margin-left:6.26px}.loading-circles[data-v-46b20d22] .circle-item:nth-child(5){margin-top:9.5px;margin-left:-2.5px}.loading-circles[data-v-46b20d22] .circle-item:nth-child(6){margin-top:6.26px;margin-left:-11.26px}.loading-circles[data-v-46b20d22] .circle-item:nth-child(7){margin-top:-2.5px;margin-left:-14.5px}.loading-circles[data-v-46b20d22] .circle-item:last-child{margin-top:-11.26px;margin-left:-11.26px}@-webkit-keyframes loading-circles-data-v-46b20d22{0%{background:#dfdfdf}90%{background:#505050}to{background:#dfdfdf}}@keyframes loading-circles-data-v-46b20d22{0%{background:#dfdfdf}90%{background:#505050}to{background:#dfdfdf}}.loading-bubbles[data-v-46b20d22] .bubble-item{background:#666;-webkit-animation:loading-bubbles-data-v-46b20d22 linear .75s infinite;animation:loading-bubbles-data-v-46b20d22 linear .75s infinite}.loading-bubbles[data-v-46b20d22] .bubble-item:first-child{margin-top:-12.5px;margin-left:-.5px}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(2){margin-top:-9.26px;margin-left:8.26px}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(3){margin-top:-.5px;margin-left:11.5px}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(4){margin-top:8.26px;margin-left:8.26px}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(5){margin-top:11.5px;margin-left:-.5px}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(6){margin-top:8.26px;margin-left:-9.26px}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(7){margin-top:-.5px;margin-left:-12.5px}.loading-bubbles[data-v-46b20d22] .bubble-item:last-child{margin-top:-9.26px;margin-left:-9.26px}@-webkit-keyframes loading-bubbles-data-v-46b20d22{0%{width:1px;height:1px;box-shadow:0 0 0 3px #666}90%{width:1px;height:1px;box-shadow:0 0 0 0 #666}to{width:1px;height:1px;box-shadow:0 0 0 3px #666}}@keyframes loading-bubbles-data-v-46b20d22{0%{width:1px;height:1px;box-shadow:0 0 0 3px #666}90%{width:1px;height:1px;box-shadow:0 0 0 0 #666}to{width:1px;height:1px;box-shadow:0 0 0 3px #666}}.loading-default[data-v-46b20d22]{position:relative;border:1px solid #999;-webkit-animation:loading-rotating-data-v-46b20d22 ease 1.5s infinite;animation:loading-rotating-data-v-46b20d22 ease 1.5s infinite}.loading-default[data-v-46b20d22]:before{content:"";position:absolute;display:block;top:0;left:50%;margin-top:-3px;margin-left:-3px;width:6px;height:6px;background-color:#999;border-radius:50%}.loading-spiral[data-v-46b20d22]{border:2px solid #777;border-right-color:transparent;-webkit-animation:loading-rotating-data-v-46b20d22 linear .85s infinite;animation:loading-rotating-data-v-46b20d22 linear .85s infinite}@-webkit-keyframes loading-rotating-data-v-46b20d22{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading-rotating-data-v-46b20d22{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.loading-bubbles[data-v-46b20d22],.loading-circles[data-v-46b20d22]{position:relative}.loading-bubbles[data-v-46b20d22] .bubble-item,.loading-circles[data-v-46b20d22] .circle-item{position:absolute;top:50%;left:50%;display:inline-block;border-radius:50%}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(2),.loading-circles[data-v-46b20d22] .circle-item:nth-child(2){-webkit-animation-delay:93ms;animation-delay:93ms}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(3),.loading-circles[data-v-46b20d22] .circle-item:nth-child(3){-webkit-animation-delay:.186s;animation-delay:.186s}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(4),.loading-circles[data-v-46b20d22] .circle-item:nth-child(4){-webkit-animation-delay:.279s;animation-delay:.279s}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(5),.loading-circles[data-v-46b20d22] .circle-item:nth-child(5){-webkit-animation-delay:.372s;animation-delay:.372s}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(6),.loading-circles[data-v-46b20d22] .circle-item:nth-child(6){-webkit-animation-delay:.465s;animation-delay:.465s}.loading-bubbles[data-v-46b20d22] .bubble-item:nth-child(7),.loading-circles[data-v-46b20d22] .circle-item:nth-child(7){-webkit-animation-delay:.558s;animation-delay:.558s}.loading-bubbles[data-v-46b20d22] .bubble-item:last-child,.loading-circles[data-v-46b20d22] .circle-item:last-child{-webkit-animation-delay:.651s;animation-delay:.651s}',""])},function(t,e,n){"use strict";n.r(e);var a=n(1),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e.default=i.a},function(t,e,n){(t.exports=n(2)(!1)).push([t.i,".infinite-loading-container[data-v-644ea9c9]{clear:both;text-align:center}.infinite-loading-container[data-v-644ea9c9] [class^=loading-]{display:inline-block;margin:5px 0;width:28px;height:28px;font-size:28px;line-height:28px;border-radius:50%}.btn-try-infinite[data-v-644ea9c9]{margin-top:5px;padding:5px 10px;color:#999;font-size:14px;line-height:1;background:transparent;border:1px solid #ccc;border-radius:3px;outline:none;cursor:pointer}.btn-try-infinite[data-v-644ea9c9]:not(:active):hover{opacity:.8}",""])},function(t,e,n){"use strict";function a(t,e,n,a,i,o,r,s){var l,d="function"==typeof t?t.options:t;if(e&&(d.render=e,d.staticRenderFns=n,d._compiled=!0),a&&(d.functional=!0),o&&(d._scopeId="data-v-"+o),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},d._ssrRegister=l):i&&(l=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),l)if(d.functional){d._injectStyles=l;var c=d.render;d.render=function(t,e){return l.call(e),c(t,e)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,l):[l]}return{exports:t,options:d}}function i(t){"production"!==h.mode&&console.warn("[Vue-infinite-loading warn]: ".concat(t))}function o(t){console.error("[Vue-infinite-loading error]: ".concat(t))}function r(t){return t.replace(/[A-Z]/g,function(t){return"-".concat(t.toLowerCase())})}function s(t){return t.offsetWidth+t.offsetHeight>0}function l(t){h.mode=t.config.productionTip?"development":"production"}n.r(e);var d={throttleLimit:50,loopCheckTimeout:1e3,loopCheckMaxCalls:10},c=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){return t={passive:!0},!0}});window.addEventListener("testpassive",e,e),window.remove("testpassive",e,e)}catch(t){}return t}(),u={STATE_CHANGER:["emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):","\ntemplate:",'<infinite-loading @infinite="infiniteHandler"></infinite-loading>',"\nscript:\n...\ninfiniteHandler($state) {\n  ajax('https://www.example.com/api/news')\n    .then((res) => {\n      if (res.data.length) {\n        $state.loaded();\n      } else {\n        $state.complete();\n      }\n    });\n}\n...","","more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549"].join("\n"),INFINITE_EVENT:"`:on-infinite` property will be deprecated soon, please use `@infinite` event instead.",IDENTIFIER:"the `reset` event will be deprecated soon, please reset this component by change the `identifier` property."},f={INFINITE_LOOP:["executed the callback function more than ".concat(d.loopCheckMaxCalls," times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:"),'\n\x3c!-- add a special attribute for the real scroll wrapper --\x3e\n<div infinite-wrapper>\n  ...\n  \x3c!-- set force-use-infinite-wrapper --\x3e\n  <infinite-loading force-use-infinite-wrapper></infinite-loading>\n</div>\nor\n<div class="infinite-wrapper">\n  ...\n  \x3c!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper --\x3e\n  <infinite-loading force-use-infinite-wrapper=".infinite-wrapper"></infinite-loading>\n</div>\n    ',"more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169"].join("\n")},p={READY:0,LOADING:1,COMPLETE:2,ERROR:3},m={color:"#666",fontSize:"14px",padding:"10px 0"},h={mode:"development",props:{spinner:"default",distance:100,forceUseInfiniteWrapper:!1},system:d,slots:{noResults:"No results :(",noMore:"No more data :)",error:"Opps, something went wrong :(",errorBtnText:"Retry",spinner:""},WARNINGS:u,ERRORS:f,STATUS:p},b=n(4),g=n.n(b),v={BUBBLES:{render:function(t){return t("span",{attrs:{class:"loading-bubbles"}},Array.apply(Array,Array(8)).map(function(){return t("span",{attrs:{class:"bubble-item"}})}))}},CIRCLES:{render:function(t){return t("span",{attrs:{class:"loading-circles"}},Array.apply(Array,Array(8)).map(function(){return t("span",{attrs:{class:"circle-item"}})}))}},DEFAULT:{render:function(t){return t("i",{attrs:{class:"loading-default"}})}},SPIRAL:{render:function(t){return t("i",{attrs:{class:"loading-spiral"}})}},WAVEDOTS:{render:function(t){return t("span",{attrs:{class:"loading-wave-dots"}},Array.apply(Array,Array(5)).map(function(){return t("span",{attrs:{class:"wave-item"}})}))}}},w=a({name:"Spinner",computed:{spinnerView:function(){return v[(this.$attrs.spinner||"").toUpperCase()]||this.spinnerInConfig},spinnerInConfig:function(){return h.slots.spinner&&"string"==typeof h.slots.spinner?{render:function(){return this._v(h.slots.spinner)}}:"object"===g()(h.slots.spinner)?h.slots.spinner:v[h.props.spinner.toUpperCase()]||v.DEFAULT}}},function(){var t=this.$createElement;return(this._self._c||t)(this.spinnerView,{tag:"component"})},[],!1,function(t){var e=n(5);e.__inject__&&e.__inject__(t)},"46b20d22",null).exports,y={timers:[],caches:[],throttle:function(t){var e=this;-1===this.caches.indexOf(t)&&(this.caches.push(t),this.timers.push(setTimeout(function(){t(),e.caches.splice(e.caches.indexOf(t),1),e.timers.shift()},h.system.throttleLimit)))},reset:function(){this.timers.forEach(function(t){clearTimeout(t)}),this.timers.length=0,this.caches=[]}},x={isChecked:!1,timer:null,times:0,track:function(){var t=this;this.times+=1,clearTimeout(this.timer),this.timer=setTimeout(function(){t.isChecked=!0},h.system.loopCheckTimeout),this.times>h.system.loopCheckMaxCalls&&(o(f.INFINITE_LOOP),this.isChecked=!0)}},k={key:"_infiniteScrollHeight",getScrollElm:function(t){return t===window?document.documentElement:t},save:function(t){var e=this.getScrollElm(t);e[this.key]=e.scrollHeight},restore:function(t){var e=this.getScrollElm(t);"number"==typeof e[this.key]&&(e.scrollTop=e.scrollHeight-e[this.key]+e.scrollTop),this.remove(e)},remove:function(t){void 0!==t[this.key]&&delete t[this.key]}},_=a({name:"InfiniteLoading",data:function(){return{scrollParent:null,scrollHandler:null,isFirstLoad:!0,status:p.READY,slots:h.slots}},components:{Spinner:w},computed:{isShowSpinner:function(){return this.status===p.LOADING},isShowError:function(){return this.status===p.ERROR},isShowNoResults:function(){return this.status===p.COMPLETE&&this.isFirstLoad},isShowNoMore:function(){return this.status===p.COMPLETE&&!this.isFirstLoad},slotStyles:function(){var t=this,e={};return Object.keys(h.slots).forEach(function(n){var a=r(n);(!t.$slots[a]&&!h.slots[n].render||t.$slots[a]&&!t.$slots[a][0].tag)&&(e[n]=m)}),e}},props:{distance:{type:Number,default:h.props.distance},spinner:String,direction:{type:String,default:"bottom"},forceUseInfiniteWrapper:{type:[Boolean,String],default:h.props.forceUseInfiniteWrapper},identifier:{default:+new Date},onInfinite:Function},watch:{identifier:function(){this.stateChanger.reset()}},mounted:function(){var t=this;this.$watch("forceUseInfiniteWrapper",function(){t.scrollParent=t.getScrollParent()},{immediate:!0}),this.scrollHandler=function(e){t.status===p.READY&&(e&&e.constructor===Event&&s(t.$el)?y.throttle(t.attemptLoad):t.attemptLoad())},setTimeout(function(){t.scrollHandler(),t.scrollParent.addEventListener("scroll",t.scrollHandler,c)},1),this.$on("$InfiniteLoading:loaded",function(e){t.isFirstLoad=!1,"top"===t.direction&&t.$nextTick(function(){k.restore(t.scrollParent)}),t.status===p.LOADING&&t.$nextTick(t.attemptLoad.bind(null,!0)),e&&e.target===t||i(u.STATE_CHANGER)}),this.$on("$InfiniteLoading:complete",function(e){t.status=p.COMPLETE,t.$nextTick(function(){t.$forceUpdate()}),t.scrollParent.removeEventListener("scroll",t.scrollHandler,c),e&&e.target===t||i(u.STATE_CHANGER)}),this.$on("$InfiniteLoading:reset",function(e){t.status=p.READY,t.isFirstLoad=!0,k.remove(t.scrollParent),t.scrollParent.addEventListener("scroll",t.scrollHandler,c),setTimeout(function(){y.reset(),t.scrollHandler()},1),e&&e.target===t||i(u.IDENTIFIER)}),this.stateChanger={loaded:function(){t.$emit("$InfiniteLoading:loaded",{target:t})},complete:function(){t.$emit("$InfiniteLoading:complete",{target:t})},reset:function(){t.$emit("$InfiniteLoading:reset",{target:t})},error:function(){t.status=p.ERROR,y.reset()}},this.onInfinite&&i(u.INFINITE_EVENT)},deactivated:function(){this.status===p.LOADING&&(this.status=p.READY),this.scrollParent.removeEventListener("scroll",this.scrollHandler,c)},activated:function(){this.scrollParent.addEventListener("scroll",this.scrollHandler,c)},methods:{attemptLoad:function(t){var e=this;this.status!==p.COMPLETE&&s(this.$el)&&this.getCurrentDistance()<=this.distance?(this.status=p.LOADING,"top"===this.direction&&this.$nextTick(function(){k.save(e.scrollParent)}),"function"==typeof this.onInfinite?this.onInfinite.call(null,this.stateChanger):this.$emit("infinite",this.stateChanger),!t||this.forceUseInfiniteWrapper||x.isChecked||x.track()):this.status===p.LOADING&&(this.status=p.READY)},getCurrentDistance:function(){return"top"===this.direction?"number"==typeof this.scrollParent.scrollTop?this.scrollParent.scrollTop:this.scrollParent.pageYOffset:this.$el.getBoundingClientRect().top-(this.scrollParent===window?window.innerHeight:this.scrollParent.getBoundingClientRect().bottom)},getScrollParent:function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.$el;return"string"==typeof this.forceUseInfiniteWrapper&&(t=document.querySelector(this.forceUseInfiniteWrapper)),t||("BODY"===e.tagName?t=window:!this.forceUseInfiniteWrapper&&["scroll","auto"].indexOf(getComputedStyle(e).overflowY)>-1?t=e:(e.hasAttribute("infinite-wrapper")||e.hasAttribute("data-infinite-wrapper"))&&(t=e)),t||this.getScrollParent(e.parentNode)}},destroyed:function(){!this.status!==p.COMPLETE&&(y.reset(),k.remove(this.scrollParent),this.scrollParent.removeEventListener("scroll",this.scrollHandler,c))}},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"infinite-loading-container"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSpinner,expression:"isShowSpinner"}],staticClass:"infinite-status-prompt",style:t.slotStyles.spinner},[t._t("spinner",[n("spinner",{attrs:{spinner:t.spinner}})])],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowNoResults,expression:"isShowNoResults"}],staticClass:"infinite-status-prompt",style:t.slotStyles.noResults},[t._t("no-results",[t.slots.noResults.render?n(t.slots.noResults,{tag:"component"}):[t._v(t._s(t.slots.noResults))]])],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowNoMore,expression:"isShowNoMore"}],staticClass:"infinite-status-prompt",style:t.slotStyles.noMore},[t._t("no-more",[t.slots.noMore.render?n(t.slots.noMore,{tag:"component"}):[t._v(t._s(t.slots.noMore))]])],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowError,expression:"isShowError"}],staticClass:"infinite-status-prompt",style:t.slotStyles.error},[t._t("error",[t.slots.error.render?n(t.slots.error,{tag:"component",attrs:{trigger:t.attemptLoad}}):[t._v("\n        "+t._s(t.slots.error)+"\n        "),n("br"),t._v(" "),n("button",{staticClass:"btn-try-infinite",domProps:{textContent:t._s(t.slots.errorBtnText)},on:{click:t.attemptLoad}})]],{trigger:t.attemptLoad})],2)])},[],!1,function(t){var e=n(7);e.__inject__&&e.__inject__(t)},"644ea9c9",null).exports;Object.defineProperty(_,"install",{configurable:!1,enumerable:!1,value:function(t,e){Object.assign(h.props,e&&e.props),Object.assign(h.slots,e&&e.slots),Object.assign(h.system,e&&e.system),t.component("infinite-loading",_),l(t)}}),"undefined"!=typeof window&&window.Vue&&(window.Vue.component("infinite-loading",_),l(window.Vue)),e.default=_}])})}});