webpackJsonp(["informationSpecimen"],{"12qK":function(e,t,n){function a(e){n("wUb0")}var i=n("VU/8")(n("Z9jW"),n("tQWY"),a,"data-v-28737753",null);e.exports=i.exports},"Gm+R":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n("//Fk"),s=a(i),o=n("mvHQ"),r=a(o),l=n("g/04"),c=a(l),u=n("cCA+"),d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u),f=n("UeB+"),p=a(f),h=n("7+uW"),v=a(h),g=n("NYxO"),m=a(g),w=n("mtWM");v.default.use(m.default);var x=function(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.href)||[,""])[1].replace(/\+/g,"%20"))||null},y=void 0,L=!0;w.interceptors.request.use(function(e){if("options"==e.method)return e;if(e.useOptions&&1==e.useOptions.ForSmartClient)return e;e.headers.Authorization=authToken||jwt;var t=[],n=x("menuid");t.push(n);var a=window.rootVue.$route,i="";return a&&a.params&&a.params.menuid&&(i=a.params.menuid,t.push(i)),e.headers.menuid=t.join(","),y||(y=p.default.getClientInfo()),e.headers.ClientInfo=encodeURIComponent((0,r.default)(y)),e},function(e){return s.default.reject(e)}),w.interceptors.response.use(function(e){return e.status>=200&&e.status<=300?e:s.default.reject(e)},function(e){return s.default.reject(e)});var b=function(e,t){var n="";if(e&&e.response)switch(e.response.status){case 400:n="请求错误";break;case 401:n="未授权，请登录";break;case 403:n="拒绝访问";break;case 404:n="请求地址出错: "+e.response.config.url;break;case 408:n="请求超时";break;case 500:n="服务器内部错误";break;case 501:n="服务未实现";break;case 502:n="网关错误";break;case 503:n="服务不可用";break;case 504:e.message="网关超时";break;case 505:n="HTTP版本不受支持"}e.message.indexOf("timeout of")>=0?n="请求服务已超时":"Network Error"==e.message&&(n="网络服务异常，请检查网路服务是否正常。"),t.isOnline||d.showMessage("请求服务异常，"+e.message+"："+n,d.messageType.ERROR)},_=function(e,t){var n="";if(e&&e.response)switch(e.response.status){case 400:n="请求错误";break;case 401:n="未授权，请登录";break;case 403:n="拒绝访问";break;case 404:n="请求地址出错: "+e.response.config.url;break;case 408:n="请求超时";break;case 500:n="服务器内部错误";break;case 501:n="服务未实现";break;case 502:n="网关错误";break;case 503:n="服务不可用";break;case 504:e.message="网关超时";break;case 505:n="HTTP版本不受支持"}e.message.indexOf("timeout of")>=0?n="请求服务已超时":e.message,t=t||"",d.showMessage("请求"+t+"服务错误,请检查TechSvr是否启动："+e.message+">>"+n,d.messageType.ERROR)},k={post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];n&&d.loadMask("正在请求服务..."),"string"==typeof e&&(e={url:e});var a=e.url,i=(e.desc,e.responseType||"json");return new s.default(function(e,s){w({url:a,method:"post",data:t,responseType:i,transformRequest:[function(e){var t=new FormData;if(e.constructor==FormData)return e;for(var n in e)e[n]instanceof Object?e[n].constructor==File?t.append(n,e[n]):t.append(n,(0,r.default)(e[n])):t.append(n,e[n]);return t}]}).then(function(t){var n=t.data;if(n.type==c.default.SUCCESS)e(t.data);else if(n.type==c.default.ERROR&&"SYS_ERR"==n.failtCode)d.showMessage(n.message,d.messageType.ERROR,{detailOption:n}),s(t.data);else{if("blob"===i)return void e(t);e(t.data)}k.toLogin(n)}).catch(function(e){b(e,t),s(e)}).finally(function(){n&&d.closeLoadMask()})})},postJsonRequest:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];n&&d.loadMask("正在请求服务..."),"string"==typeof e&&(e={url:e});var a=e.url;e.desc;return new s.default(function(e,i){w({url:a,method:"post",headers:{"Content-Type":"application/json;charSet=UTF-8"},data:t}).then(function(t){var n=t.data;n.type==c.default.SUCCESS?e(t.data):n.type==c.default.ERROR&&"SYS_ERR"==n.failtCode?d.showMessage(n.message,d.messageType.ERROR,{detailOption:n}):e(t.data),k.toLogin(n)}).catch(function(e){b(e,t),i(e)}).finally(function(){n&&d.closeLoadMask()})})},postForSmartClient:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"string"==typeof e&&(e={url:e});var n=e.url,a=e.desc||"";return new s.default(function(e,i){w({url:n,method:"post",data:t,useOptions:{ForSmartClient:!0}}).then(function(t){var n=t.data;if(n.type==c.default.SUCCESS)e(t.data);else{if(n.type==c.default.ERROR)return d.showMessage("请求【"+a+"】错误："+n.message,d.messageType.ERROR),void i();e(t.data)}}).catch(function(e){_(e,"【智能客户端TechSvr】"),i(e)})})},get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"string"==typeof e&&(e={url:e});var n=e.url;e.desc;return new s.default(function(e,a){w({url:n,method:"get",params:t,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json;charset=UTF-8"}}).then(function(t){e(t.data),k.toLogin(t.data)}).catch(function(e){b(e,t),a(e)})})},put:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";"string"==typeof e&&(e={url:e});var a=e.url+n;e.desc;return new s.default(function(e,n){w({url:a,method:"put",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(t){e(t.data),k.toLogin(t.data)}).catch(function(e){b(e,t),n(e)})})},delete:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";"string"==typeof e&&(e={url:e});var n=e.url+t;e.desc;return new s.default(function(e,t){w({url:n,method:"delete",headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(t){e(t.data),k.toLogin(t.data)}).catch(function(e){b(e,params),t(e)})})},options:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];"string"==typeof e&&(e={url:e});var t=e.url;e.desc;return new s.default(function(e,n){w({url:t,method:"options"}).then(function(t){e(t)}).catch(function(e){n(e)})})},GetUrlQueryParam:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return n?unescape(n[2]):""},fileUtils:{uploadFile:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],a=arguments[3];a&&d.loadMask("正在请求服务..."),"string"==typeof e&&(e={url:e});var i=e.url;e.desc;return new s.default(function(e,s){w({url:i,method:"post",data:t,onUploadProgress:function(e){e.lengthComputable&&n(e)}}).then(function(t){var n=t.data;e(n.type==c.default.SUCCESS?t.data:n.type==c.default.ERROR?t.data:t.data),k.toLogin(n)}).catch(function(e){b(e,t),s(e)}).finally(function(){a&&d.closeLoadMask()})})}},toLogin:function(e){if("4040"==e.messageCode||"4041"==e.messageCode){if(!L)return!1;L=!1,d.alertMessage(e.message,"提示","warning",{showClose:!1}).then(function(){top.window.location.reload(),L=!0})}}};t.default=k},Z9jW:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n("Xxa5"),s=a(i),o=n("exGp"),r=a(o),l=n("cCA+"),c=(function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);t.default=e}(l),n("bqAC")),u=a(c);t.default={data:function(){var e=this;return{titlee:"123455",isShow:!0,modalData:{visible:!0,title:"test",width:"35%",height:"300px"},visible:!1,title:"",hoverIndex:0,clickIndex:0,hoverIndex1:0,clickIndex1:0,hoverIndex2:-1,clickIndex2:-1,editVal:!1,show:!0,h:"",idVal:{},row:!1,form:{editVal:"",dynamicArr:[]},rowList:{},rules:{test:[{validator:function(){var t=(0,r.default)(s.default.mark(function t(n,a,i){var o,r;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=10;break}return o={type:"specimen",name:a},e.next=4,u.default.isHaveReName(o);case 4:if(r=e.sent,"SUCCESS"===r.type){e.next=9;break}return e.abrupt("return",i(new Error("该名称已存在！")));case 9:i();case 10:case"end":return e.stop()}},t,e)}));return function(e,n,a){return t.apply(this,arguments)}}(),trigger:["blur","change"]}]},organList:[],positionList:[],nameList:[]}},created:function(){this.getOrganList()},watch:{rowList:function(e,t){console.log(e,t)}},methods:{handle:function(e,t,n){var a=this;return(0,r.default)(s.default.mark(function i(){var o,r,l;return s.default.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(console.log(t,e,n),a.row=!0,a.isTitle(t),"器官/系统"!==t){i.next=20;break}return a.rowList=e,a.show=!1,a.clickIndex=n,a.hoverIndex1=0,a.clickIndex1=0,i.next=11,u.default.getQuery({id:e.ID});case 11:if(o=i.sent,a.positionList=o.data,!(a.positionList.length>0)){i.next=18;break}return i.next=16,u.default.getQuery({id:a.positionList[0].ID});case 16:r=i.sent,a.nameList=r.data;case 18:i.next=31;break;case 20:if("标本部位"!==t){i.next=30;break}return a.rowList=e,a.show=!0,a.clickIndex1=n,i.next=26,u.default.getQuery({id:e.ID});case 26:l=i.sent,a.nameList=l.data,i.next=31;break;case 30:a.clickIndex2=n;case 31:case"end":return i.stop()}},i,a)}))()},getOrganList:function(e){var t=this;return(0,r.default)(s.default.mark(function n(){var a,i,o,r,l;return s.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=[],i=[],n.next=4,u.default.getQuery({id:e});case 4:return o=n.sent,t.organList=o.data,n.next=8,u.default.getQuery({id:t.organList[0].ID});case 8:return r=n.sent,t.positionList=r.data,n.next=12,u.default.getQuery({id:t.positionList[0].ID});case 12:l=n.sent,t.nameList=l.data,console.log("默认",t.organList[0],t.positionList[0]);case 15:case"end":return n.stop()}},n,t)}))()},handleAdd:function(e){this.visible=!0,this.editVal=!1;var t="";this.isTitle(e),this.h="新增",console.log(e,this.rowList),!1===this.row?"标本名称"===this.title?(t=this.positionList[0].ID,console.log(this.positionList[0].ID)):"标本部位"===this.title&&(t=this.organList[0].ID,console.log(this.organList[0].ID)):"标本名称"===this.title?(console.log("标本名称212"),t=this.rowList.ID,t=2!==this.rowList.SPECIMEN_TYPE?this.positionList[0].ID:this.rowList.ID):"标本部位"===this.title&&(console.log("标本部位219"),t=1!==this.rowList.SPECIMEN_TYPE?this.organList[0].ID:this.rowList.ID),this.form.dynamicArr.push({pafTemplateId:"",specimenName:"",pafSpecimenFid:t,seqNo:"器官/系统"===e?this.organList.length:("标本部位"===e?this.positionList.length:this.nameList.length)+this.form.dynamicArr.length+1,specimenType:"器官/系统"===e?1:"标本部位"===e?2:3})},handleEdit:function(e){var t=this;return(0,r.default)(s.default.mark(function n(){return s.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:console.log(e),t.h="修改",t.form.editVal=e.SPECIMEN_NAME,t.idVal=e,t.editVal=!0,t.visible=!0;case 6:case"end":return n.stop()}},n,t)}))()},handleDelete:function(e,t){var n=this;return(0,r.default)(s.default.mark(function t(){var a;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.default.getDelete({id:e.ID});case 2:a=t.sent,n.getOrganList();case 4:case"end":return t.stop()}},t,n)}))()},handleChangeInput:function(e){var t=this;return(0,r.default)(s.default.mark(function e(){var n,a;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=[],""!==t.form.dynamicArr[t.form.dynamicArr.length-1].specimenName&&(a="",!1===t.row?"标本名称"===t.title?(a=t.positionList[0].ID,console.log(t.positionList[0].ID)):"标本部位"===t.title&&(a=t.organList[0].ID,console.log(t.organList[0].ID)):"标本名称"===t.title?(a=t.rowList.ID,a=2!==t.rowList.SPECIMEN_TYPE?t.positionList[0].ID:t.rowList.ID):"标本部位"===t.title&&(a=1!==t.rowList.SPECIMEN_TYPE?t.organList[0].ID:t.rowList.ID),t.form.dynamicArr.push({pafTemplateId:"",specimenName:"",pafSpecimenFid:a,specimenType:"器官/系统"===t.title?1:"标本部位"===t.title?2:3,seqNo:"器官/系统"===t.title?t.organList.length:("标本部位"===t.title?t.positionList.length:t.nameList.length)+t.form.dynamicArr.length+1}));case 2:case"end":return e.stop()}},e,t)}))()},int:function(){this.form.dynamicArr=[],this.form.editVal=""},submit:function(e){var t=this;this.$refs.form.validateForm(function(){var n=(0,r.default)(s.default.mark(function n(a){var i,o,r,l,c,d,f,p,h,v,g;return s.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(!a){n.next=59;break}if("新增"!==e){n.next=28;break}return i=[],t.form.dynamicArr.find(function(e){""!==e.specimenName&&i.push(e)}),n.next=6,u.default.getAdd(i);case 6:if(o=n.sent,r="",!1===t.row?"标本名称"===t.title?(r=t.positionList[0].ID,console.log(t.positionList[0].ID)):"标本部位"===t.title&&(r=t.organList[0].ID,console.log(t.organList[0].ID)):"标本名称"===t.title?(r=t.rowList.ID,r=2!==t.rowList.SPECIMEN_TYPE?t.positionList[0].ID:t.rowList.ID):"标本部位"===t.title&&(r=1!==t.rowList.SPECIMEN_TYPE?t.organList[0].ID:t.rowList.ID),"标本部位"!==t.title){n.next=17;break}return console.log(t.rowList,"this.标本部位.rowList"),n.next=13,u.default.getQuery({id:r});case 13:l=n.sent,t.positionList=l.data,n.next=26;break;case 17:if("标本名称"!==t.title){n.next=25;break}return console.log(t.rowList,"this.标本名称.rowList"),n.next=21,u.default.getQuery({id:r});case 21:c=n.sent,t.nameList=c.data,n.next=26;break;case 25:t.getOrganList();case 26:n.next=55;break;case 28:return d="",!1===t.row?"标本名称"===t.title?(d=t.positionList[0].ID,console.log(t.positionList[0].ID)):"标本部位"===t.title&&(d=t.organList[0].ID,console.log(t.organList[0].ID)):"标本名称"===t.title?(d=t.rowList.ID,d=2!==t.rowList.SPECIMEN_TYPE?t.positionList[0].ID:t.rowList.ID):"标本部位"===t.title&&(d=1!==t.rowList.SPECIMEN_TYPE?t.organList[0].ID:t.rowList.ID),f={id:t.idVal.ID,specimenName:t.form.editVal},n.next=33,u.default.getUpdate(f);case 33:if(p=n.sent,"标本部位"!==t.title){n.next=43;break}return console.log(t.rowList,t.idVal,"this.标本部位.rowList"),n.next=38,u.default.getQuery({id:d});case 38:h=n.sent,console.log(h),t.positionList=h.data,n.next=55;break;case 43:if("标本名称"!==t.title){n.next=51;break}return console.log(t.rowList,"this.标本名称.rowList"),n.next=47,u.default.getQuery({id:d});case 47:v=n.sent,t.nameList=v.data,n.next=55;break;case 51:return n.next=53,u.default.getQuery({id:d});case 53:g=n.sent,t.organList=g.data;case 55:t.visible=!1,t.int(),n.next=60;break;case 59:console.log("invalid form !");case 60:case"end":return n.stop()}},n,t)}));return function(e){return n.apply(this,arguments)}}())},reset:function(){this.$refs.form.resetFields(),this.int(),this.visible=!1},isTitle:function(e){this.title="器官/系统"===e?"器官/系统":"标本部位"===e?"标本部位":"标本名称"}}}},bqAC:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Gm+R"),i=function(e){return e&&e.__esModule?e:{default:e}}(a),s=n("mYGX"),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(s),r=(o.SYS_BASE_API.APPLYFORM.url,"http://172.17.1.211:20032"),l={query:r+"/clf/pafbase/findSpecimenDic",add:r+"/clf/pafbase/addSpecimenDic",update:r+"/clf/pafbase/updateSpecimenDic",delete:r+"/clf/pafbase/deleteSpecimenDic",isHaveReName:r+"/clf/pafbase/isHaveReName"};t.default={getQuery:function(e){return i.default.postJsonRequest(l.query,e)},getAdd:function(e){return i.default.postJsonRequest(l.add,e)},getUpdate:function(e){return i.default.postJsonRequest(l.update,e)},getDelete:function(e){return i.default.postJsonRequest(l.delete,e)},isHaveReName:function(e){return i.default.postJsonRequest(l.isHaveReName,e)}}},"g/04":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={ERROR:"ERROR",FAILT:"FAILT",NORMAL:"NORMAL",SUCCESS:"SUCCESS"};t.default=a},tQWY:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-page-wrap-in"},[n("w-row",{staticStyle:{background:"rgba(255,255,255,1)"}},[n("w-col",{attrs:{span:8}},[n("title-style",{staticClass:"pd-x_16 pd-top_16 po_re"},[n("span",{attrs:{slot:"header"},slot:"header"},[e._v("器官/系统")]),e._v(" "),n("w-button",{staticClass:"po_ab top_16 right_8",attrs:{type:"text"},on:{click:function(t){e.handleAdd("器官/系统")}}},[e._v("+新增")])],1),e._v(" "),e._l(e.organList,function(t,a){return n("div",{key:a,staticClass:"tab-style",class:{clickBg:a==e.clickIndex,hoverBg:a==e.hoverIndex},on:{click:function(n){n.stopPropagation(),e.handle(t,"器官/系统",a)},mouseover:function(t){e.hoverIndex=a},mouseout:function(t){e.hoverIndex=-1}}},[n("span",[e._v(e._s(t.SPECIMEN_NAME))]),e._v(" "),e.hoverIndex===a||e.clickIndex===a?n("div",{staticClass:"button-style fr"},[n("span",{attrs:{type:"text"},on:{click:function(n){e.handleEdit(t,"器官/系统")}}},[e._v("修改")]),e._v(" "),n("span",{attrs:{type:"text"},on:{click:function(n){e.handleDelete(t,"器官/系统")}}},[e._v("删除")])]):e._e()])})],2),e._v(" "),n("w-col",{staticClass:"center",attrs:{span:8}},[n("title-style",{staticClass:"pd-x_16 pd-top_16 po_re"},[n("span",{attrs:{slot:"header"},slot:"header"},[e._v("标本部位")]),e._v(" "),0!==this.organList.length?n("w-button",{staticClass:"po_ab top_8 right_16",attrs:{type:"text"},on:{click:function(t){e.handleAdd("标本部位")}}},[e._v("+新增")]):e._e()],1),e._v(" "),e._l(e.positionList,function(t,a){return n("div",{key:a,staticClass:"tab-style",class:{clickBg:a==e.clickIndex1,hoverBg:a==e.hoverIndex1},on:{click:function(n){e.handle(t,"标本部位",a)},mouseover:function(t){e.hoverIndex1=a},mouseout:function(t){e.hoverIndex1=-1}}},[n("span",[e._v(e._s(t.SPECIMEN_NAME))]),e._v(" "),e.hoverIndex1===a||e.clickIndex1===a?n("div",{staticClass:"button-style fr"},[n("span",{attrs:{type:"text"},on:{click:function(n){e.handleEdit(t,"标本部位")}}},[e._v("修改")]),e._v(" "),n("span",{attrs:{type:"text"},on:{click:function(n){e.handleDelete(t,"标本部位")}}},[e._v("删除")])]):e._e()])})],2),e._v(" "),n("w-col",{attrs:{span:8}},[n("title-style",{staticClass:"pd-x_16 pd-top_16 po_re"},[n("span",{attrs:{slot:"header"},slot:"header"},[e._v("标本名称")]),e._v(" "),0!==this.positionList.length?n("w-button",{staticClass:"po_ab top_8 right_16",attrs:{type:"text"},on:{click:function(t){e.handleAdd("标本名称")}}},[e._v("+新增")]):e._e()],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}]},e._l(e.nameList,function(t,a){return n("div",{key:a,staticClass:"tab-style",class:{clickBg:a==e.clickIndex2,hoverBg:a==e.hoverIndex2},on:{click:function(n){e.handle(t,"标本名称",a)},mouseover:function(t){e.hoverIndex2=a},mouseout:function(t){e.hoverIndex2=-1}}},[n("span",[e._v(e._s(t.SPECIMEN_NAME))]),e._v(" "),e.hoverIndex2===a||e.clickIndex2===a?n("div",{staticClass:"button-style fr"},[n("span",{attrs:{type:"text"},on:{click:function(n){e.handleEdit(t,"标本名称")}}},[e._v("修改")]),e._v(" "),n("span",{attrs:{type:"text"},on:{click:function(n){e.handleDelete(t,"标本名称")}}},[e._v("删除")])]):e._e()])}))],1)],1),e._v(" "),n("w-modal",{staticClass:"home-page-body",attrs:{visible:e.visible,title:e.h+e.title,showClose:!1,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(t){e.visible=t}}},[n("w-form",{ref:"form",attrs:{model:e.form}},[e.editVal?n("w-form-item",{attrs:{prop:"editVal",rules:e.rules.test}},[n("w-input",{model:{value:e.form.editVal,callback:function(t){e.$set(e.form,"editVal",t)},expression:"form.editVal"}})],1):e._l(e.form.dynamicArr,function(t,a){return[n("w-form-item",{key:a,attrs:{prop:"dynamicArr."+a+".specimenName",rules:e.rules.test}},[n("w-input",{on:{input:e.handleChangeInput},model:{value:e.form.dynamicArr[a].specimenName,callback:function(t){e.$set(e.form.dynamicArr[a],"specimenName",t)},expression:"form.dynamicArr[index].specimenName"}})],1)]}),e._v(" "),n("w-form-item",{staticStyle:{"text-align":"right"}},[n("w-button",{on:{click:e.reset}},[e._v("取 消")]),e._v(" "),n("w-button",{attrs:{type:"primary"},on:{click:function(t){e.submit(e.h)}}},[e._v("保 存")])],1)],2)],1)],1)},staticRenderFns:[]}},uhsK:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,".clickBg[data-v-28737753],.hoverBg[data-v-28737753],.styleHover[data-v-28737753]{background:#cfe0ff!important;color:#0f49ed}.home-page-wrap-in[data-v-28737753]{height:100%;background:#eaedf4;overflow-x:auto;overflow-y:hidden}.home-page-wrap-in .w-row[data-v-28737753]{height:100%;overflow:auto}.home-page-wrap-in .tab-style[data-v-28737753]{height:40px;line-height:40px;padding:0 16px;background:#f3f5f9;border-radius:2px;cursor:pointer;margin:16px 10px}.home-page-wrap-in .center[data-v-28737753]{border:2px solid #dfe7f5;border-top:none;border-bottom:none}.home-page-wrap-in .button-style[data-v-28737753]{display:inline-block;color:#0f49ed;font-size:14px;cursor:pointer}.home-page-wrap-in .title-style[data-v-28737753]{padding:16px 16px 0}",""])},wUb0:function(e,t,n){var a=n("uhsK");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("2c85995c",a,!0)}});