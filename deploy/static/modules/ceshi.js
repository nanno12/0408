webpackJsonp(["ceshi"],{"F+g3":function(t,i,e){var s=e("TG+J");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("5c10b12c",s,!0)},"TG+J":function(t,i,e){i=t.exports=e("FZ+f")(!1),i.push([t.i,".inputType{position:relative}.inputType .multipleSelect{width:100%;position:absolute;top:0}.inputType .multipleSelect .el-input__inner{opacity:0}.inputType .multipleSelect .el-input{height:26px}.inputType .el-select__tags{display:none}.leftLine{height:30px;position:absolute;top:-15px;left:0}.startLine .leftLine{border-top:1px solid #ccc;height:30px;top:-10px}.bottomLine .leftLine,.lineShow .leftLine,.startLine .leftLine{border-left:1px solid #ccc}.bottomLine .leftLine{border-bottom:1px solid #ccc;height:26px;top:-17px}.delete{display:none}.startLine .delete{display:block;position:absolute;width:8px;height:8px;left:-1px;top:-12px;-webkit-transform:scale(.7);transform:scale(.7);cursor:pointer;z-index:100}.startLine .delete i{font-size:12px}.thisWidth1 .leftLine{width:10px;background:#ffe1ff}.thisWidth2 .leftLine{width:20px;background:#fffacd}.thisWidth3 .leftLine{width:30px;background:#f5ffff}.thisWidth4 .leftLine{width:40px;background:#ffefd5}.thisWidth5 .leftLine{width:50px;background:#f0fff0}.thisWidth6 .leftLine{width:60px;background:#ffe1ff}.thisWidth7 .leftLine{width:70px;background:#fffacd}.thisWidth8 .leftLine{width:80px;background:#f5ffff}.thisWidth9 .leftLine{width:90px;background:#ffefd5}.thisWidth10 .leftLine{width:100px;background:#f0fff0}.thisWidth11 .leftLine{width:110px;background:#ffe1ff}.thisWidth12 .leftLine{width:120px;background:#fffacd}.thisWidth13 .leftLine{width:130px;background:#f5ffff}.thisWidth14 .leftLine{width:140px;background:#ffefd5}.thisWidth15 .leftLine{width:150px;background:#f0fff0}",""])},VJnT:function(t,i,e){i=t.exports=e("FZ+f")(!1),i.push([t.i,".groupContent[data-v-2c387403]{height:100%;overflow:hidden}.groupContent .titleText[data-v-2c387403]{padding:10px 0}.groupBox[data-v-2c387403]{padding-bottom:15px;min-width:580px;height:calc(100% - 20px);overflow-y:auto}.listBox[data-v-2c387403]{height:30px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-preferred-size:auto;flex-basis:auto;-webkit-box-align:center;-ms-flex-align:center;align-items:center;min-width:580px}.listBox .listLeft[data-v-2c387403]{width:72px}.listBox .listRight[data-v-2c387403]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-flex:1;-ms-flex:1;flex:1}.btnClick[data-v-2c387403]{cursor:pointer}.iconSpan[data-v-2c387403]{display:inline-block;position:relative;width:10px}.selectInput1[data-v-2c387403],.selectInput2[data-v-2c387403]{width:12%;margin-right:15px}.autocompleteInput1[data-v-2c387403]{width:20%;margin-right:15px}.inputType[data-v-2c387403]{width:56%}.vhide[data-v-2c387403]{visibility:hidden}.addNewList[data-v-2c387403]{color:#108ee9}.addNewList[data-v-2c387403]:hover{text-decoration:underline}.removeBtn[data-v-2c387403]{margin-right:10px}.icon-addlist[data-v-2c387403]{color:#108ee9}.icon-removelist[data-v-2c387403]{color:#d81e06}.icon-hb[data-v-2c387403]{float:right;margin-right:6px;opacity:.8}.icon-hb[data-v-2c387403]:hover{opacity:1}",""])},"d+W/":function(t,i,e){var s=e("VJnT");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("5b53aa9c",s,!0)},dgP8:function(t,i,e){function s(t){e("d+W/"),e("F+g3")}var a=e("VU/8")(e("gwdr"),e("sCqe"),s,"data-v-2c387403",null);t.exports=a.exports},gwdr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("mvHQ"),a=function(t){return t&&t.__esModule?t:{default:t}}(s),n=e("cCA+"),r=function(t){if(t&&t.__esModule)return t;var i={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(i[e]=t[e]);return i.default=t,i}(n);i.default={data:function(){return{inputValueName:"",restaurants:[],options:[{value:"and",label:"与"},{value:"or",label:"或"}],value:"and",newList:{CHECKED:!1,FIELDTYPE:"",TABLEALIASNAME:"",ORDERNO:0,LOGIC:"and",LOGICDESC:"与",FIELDDEFINEID:0,RELATION:"",RELATIONDESC:"",OPERATORLIST:"",VALUE:"",VALUEDESC:"",FLAG:[],VALUELIST:[],CONFIELDLIST:"",FIELDEN:"",FIELDCN:"",ISVARIABLE:"",VARIABLEVALUE:"",VALUETYPE:""},arr:[],arrCopy:[],newArr:[],verificationFlag:0,manyArr:[]}},props:{listData:Array,subSysCode:String,rptType:String,themeName:String,nameList:Array,type:String,thisStyle:Number,effconid:[String,Number]},created:function(){},computed:{},mounted:function(){this.showGroup(),this.lastOne(),this.getFieldList()},watch:{rptType:function(){this.getFieldList()},listData:function(){var t=this;if(void 0==this.listData)return!1;this.lastOne(),setTimeout(function(){t.showGroup()},0)}},methods:{changeValueList:function(){for(var t=0;t<this.listData.length;t++)1!=this.listData[t].VALUETYPE&&2!=this.listData[t].VALUETYPE||this.listData[t].VALUELIST.constructor==Array||(this.listData[t].VALUELIST=this.listData[t].VALUELIST[this.listData[t].FIELDCN]),this.listData[t].FLAG=this.listData[t].VALUEDESC.split(",")},logicSelectChange:function(t,i){"and"==i?this.listData[t].LOGICDESC="与":"or"==i&&(this.listData[t].LOGICDESC="或")},multipleSelectChange:function(t,i){var e=[];this.listData[i].VALUEDESC=this.listData[i].FLAG.join(",");for(var s=0;s<t.length;s++)e.push(t[s].CODE);this.listData[i].VALUE=e.join(",")},multipleSelectChange1:function(t,i){var e=[];this.listData[i].VALUEDESC=t.join(",");for(var s=0;s<t.length;s++)for(var a=0;a<this.listData[i].VALUELIST.length;a++)this.listData[i].VALUELIST[a].NAME==t[s]&&e.push(this.listData[i].VALUELIST[a].CODE);this.listData[i].VALUE=e.join(",")},selectList:function(t,i){this.listData[i].VALUEDESC=t.NAME},changeList:function(t,i){console.log(t,i),this.listData[i].VALUEDESC=t},changeOperator:function(t,i,e){if(t)return!1;for(var s=0;s<this.listData[i].OPERATORLIST.length;s++)this.listData[i].OPERATORLIST[s].operator==e&&(this.listData[i].RELATIONDESC=this.listData[i].OPERATORLIST[s].operatordesc);2==this.listData[i].VALUETYPE&&(this.listData[i].VALUE="",this.listData[i].VALUEDESC="",this.listData[i].FLAG=[])},timeChange:function(t,i){this.listData[i].VALUE=t},getFieldList:function(){this.subSysCode,this.rptType},lastOne:function(){(this.listData&&0==this.listData.length||this.listData&&1==this.listData.length&&""==this.listData[0].FIELDCN)&&(this.listData[0]=this.newList,this.newList={CHECKED:!1,FIELDTYPE:"",TABLEALIASNAME:"",ORDERNO:0,LOGIC:"and",LOGICDESC:"与",FIELDDEFINEID:0,RELATION:"",RELATIONDESC:"",OPERATORLIST:"",VALUE:"",VALUEDESC:"",FLAG:[],VALUELIST:[],CONFIELDLIST:"",FIELDEN:"",FIELDCN:"",ISVARIABLE:"",VARIABLEVALUE:"",VALUETYPE:""})},showGroup:function(){this.arr=[];for(var t=0;t<this.listData.length;t++){var i=this.listData[t].CONFIELDLIST;if(""!=i)for(var e=i.split(","),s=0;s<e.length;s++){for(var a=e[s].split("-"),n=[],r=parseInt(a[0]);r<=a[1];r++)n.push(r);this.arr.push(n)}this.listData[t].CONFIELDLIST=""}this.changeGroup()},AddName:function(){for(var t=this,i=0;i<this.listData.length;i++)if(this.listData[i].CONFIELDLIST="",this.listData&&""==this.listData[0].FIELDCN&&1==this.listData.length);else if(""==this.listData[i].LOGICDESC&&0!=i||""==this.listData[i].FIELDCN||""==this.listData[i].RELATION||""==this.listData[i].VALUE||(1==this.listData[i].VALUETYPE||2==this.listData[i].VALUETYPE)&&""==this.listData[i].VALUEDESC)return r.showMessage("第"+(i+1)+"条句子不完整",r.messageType.WARNING),!1;""==this.themeName&&0==this.thisStyle?this.$prompt("请输入方案名称","保存方案名称",{inputValue:this.inputValueName,confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[a-zA-Z0-9\u4e00-\u9fa5\-]{1,20}$/,inputErrorMessage:'长度1-20个字符，由中文，数字，字母, "-" 组成'}).then(function(i){for(var e=i.value,s=0;s<t.nameList.length;s++)if(t.nameList[s].THEMENAME==e)return r.showMessage("已有该方案名",r.messageType.WARNING),!1;t.inputValueName=e,t.combinedAssignment(),setTimeout(function(){t.save(e)},30)}).catch(function(){t.$message({type:"info",message:"取消保存"})}):(this.combinedAssignment(),setTimeout(function(){t.save(t.themeName)},30))},combinedAssignment:function(){for(var t=0;t<this.arr.length;t++){var i=this.arr[t].length,e=this.arr[t][0]+"-"+this.arr[t][i-1];""==this.listData[this.arr[t][0]-1].CONFIELDLIST?this.listData[this.arr[t][0]-1].CONFIELDLIST=e:this.listData[this.arr[t][0]-1].CONFIELDLIST=this.listData[this.arr[t][0]-1].CONFIELDLIST+","+e}},save:function(t){this.listData[0].LOGIC="",this.listData[0].LOGICDESC="";var i={subsyscode:this.subSysCode,rpttype:this.rptType,themename:t,nameflag:""==this.themeName?"":1,type:this.type,effconid:this.effconid,condtionlist:this.listData};this.$emit("saveWay",i)},removeItem:function(t,i){for(var e=0;e<t.length;e++)if(i+1==t[e][0]){var s=this.arr.indexOf(t[e]);this.arr.splice(s,1)}this.changeGroup()},addClass:function(t,i,e){for(var s="",a="thisWidth"+(this.manyArr.length-e),n=0;n<t.length;n++)for(var r=0;r<t[n].length;r++)i+1==t[n][0]&&(s="startLine "+a),i+1==t[n][r]&&(s="lineShow "+a),i+1==t[n][t[n].length-1]&&(s="bottomLine "+a);return s},changeGroup:function(){this.manyArr=[],this.arrCopy=this.arr,this.getPushArr()},getPushArr:function(){for(var t=this.arrCopy,i=[],e=0;e<t.length;e++){for(var s=!1,a=0,n=0;n<t.length;n++)if(e!=n){a=0;for(var r=0;r<t[n].length;r++){var l=t[e].indexOf(t[n][r]);-1!=l&&++a==t[n].length&&(s=!0)}}s||(i.push(t[e]),this.arrCopy=this.removeArr(this.arrCopy,t[e]))}this.manyArr.unshift(i),this.arrCopy.length>0&&this.getPushArr(),0==t.length&&(this.manyArr=[])},removeArr:function(t,i){for(var e=[],s=0;s<t.length;s++)t[s]!=i&&e.push(t[s]);return e},handleSelect:function(t,i){if(void 0==t.CONVALUEPROVIDER)return!1;this.subSysCode,this.rptType,t.CODE,t.CONVALUEPROVIDER;return this.listData[i].FIELDCN=t.NAME,this.listData[i].FIELDTYPE=t.FIELDTYPE,this.listData[i].TABLEALIASNAME=t.TABLEALIASNAME,this.listData[i].RELATION="",this.listData[i].RELATIONDESC="",this.listData[i].VALUE="",this.listData[i].VALUEDESC="",this.listData[i].FLAG=[],this.listData[i].VALUETYPE=t.VALUETYPE,0!=t.VALUETYPE&&3!=t.VALUETYPE&&void 0},checkBoxClick:function(t,i){if(i)this.newArr.push(t+1),this.newArr.sort(this.compare);else{var e=this.newArr.indexOf(t+1);e>-1&&this.newArr.splice(e,1)}},compare:function(t,i){return t-i},addList:function(t){-1!=t?(this.listData.splice(t,0,this.newList),this.changeArrAdd(t+1)):(this.listData.push(this.newList),this.combinedAssignment()),this.newList={CHECKED:!1,FIELDTYPE:"",TABLEALIASNAME:"",ORDERNO:0,LOGIC:"and",LOGICDESC:"与",FIELDDEFINEID:0,RELATION:"",RELATIONDESC:"",OPERATORLIST:"",VALUE:"",VALUEDESC:"",FLAG:[],VALUELIST:[],CONFIELDLIST:"",FIELDEN:"",FIELDCN:"",ISVARIABLE:"",VARIABLEVALUE:"",VALUETYPE:""},this.clearChecked()},changeArrAdd:function(t){for(var i=0;i<this.arr.length;i++){for(var e=0,s=0;s<this.arr[i].length;s++)t==this.arr[i][s]?(this.arr[i][s]+=1,e=s):t<this.arr[i][s]&&(this.arr[i][s]+=1);0!=e&&this.arr[i].splice(e,0,t)}this.combinedAssignment()},removeList:function(t){this.listData.splice(t,1),this.changeArrRemove(t+1),this.clearChecked()},changeArrRemove:function(t){for(var i=0;i<this.arr.length;i++){for(var e=-1,s=0;s<this.arr[i].length;s++)t==this.arr[i][s]?(this.arr[i][s]-=1,e=s):t<this.arr[i][s]&&(this.arr[i][s]-=1);-1!=e&&this.arr[i].splice(e,1)}for(var n=0;n<this.arr.length;n++)1==this.arr[n].length&&this.arr.splice(n,1);for(var r=this.arr.length,l=0;l<r;l++)for(var o=l+1;o<r;o++)(0,a.default)(this.arr[l])==(0,a.default)(this.arr[o])&&(this.arr.splice(o,1),o--,r--);this.combinedAssignment()},mergeBtn:function(){this.verificationFlag=0;var t=this.newArr.length,i=this.newArr[0],e=this.newArr[t-1];if(this.verification(this.newArr),0==t||1==t)r.showMessage("请选择多个连续的列表，进行分组",r.messageType.WARNING);else{if(t!=e-i+1)return r.showMessage("所选列表要连续",r.messageType.WARNING),!1;if(1==this.verificationFlag)return r.showMessage("所选列表已属于其他组，不可交叉",r.messageType.WARNING),!1;if(2==this.verificationFlag)return r.showMessage("已有该分组",r.messageType.WARNING),!1;this.arr.push(this.newArr),this.clearChecked(),this.changeGroup()}},clearChecked:function(){for(var t=0;t<this.listData.length;t++)this.listData[t].CHECKED=!1;this.newArr=[]},verification:function(t){for(var i=this.arr.length,e=0,s=0;s<i;s++){for(var n=!1,r=0,l=!1,o=!1,h=t[0];h<t.length+t[0];h++){-1!=this.arr[s].indexOf(h)?(r+=1,e=this.arr[s].length,o=r!=e):n=!0,(0,a.default)(t)==(0,a.default)(this.arr[s])&&(l=!0)}if(l)return this.verificationFlag=2,!1;if(o&&n)return this.verificationFlag=1,!1;this.verificationFlag=0}}}}},sCqe:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"groupContent fade-scroll"},[e("div",{staticClass:"titleText hide"},[t._v("顶级工作项的筛选器")]),t._v(" "),e("div",{staticClass:"listBox",staticStyle:{height:"20px"}},[e("div",{staticClass:"listLeft"},[e("i",{staticClass:"iconfont icon-hb",attrs:{title:"对所选子句进行分组"},on:{click:function(i){t.mergeBtn()}}})]),t._v(" "),t._l(t.manyArr,function(t,i){return e("span",{key:i,staticClass:"iconSpan"})}),t._v(" "),t._m(0,!1,!1)],2),t._v(" "),e("div",{staticClass:"groupBox fade-scroll"},[t._l(t.listData,function(i,s){return e("div",{key:s,staticClass:"listBox"},[e("div",{staticClass:"listLeft"},[e("span",{staticClass:"btnClick",on:{click:function(i){t.addList(s)}}},[e("i",{staticClass:"iconfont icon-addlist",attrs:{title:"插入新的筛选器行"}})]),t._v(" "),e("span",{staticClass:"btnClick removeBtn",on:{click:function(i){t.removeList(s)}}},[e("i",{staticClass:"iconfont icon-removelist",attrs:{title:"删除此筛选器行"}})]),t._v(" "),e("el-checkbox",{on:{change:function(e){t.checkBoxClick(s,i.CHECKED)}},model:{value:i.CHECKED,callback:function(e){t.$set(i,"CHECKED",e)},expression:"item.CHECKED"}})],1),t._v(" "),t._l(t.manyArr,function(i,a){return e("span",{key:a,staticClass:"iconSpan",class:t.addClass(i,s,a)},[e("span",{staticClass:"delete",on:{click:function(e){t.removeItem(i,s)}}},[e("i",{staticClass:"iconfont icon-close",attrs:{title:"取消子句分组"}})]),t._v(" "),e("div",{staticClass:"leftLine"})])}),t._v(" "),e("div",{staticClass:"listRight"},[e("el-select",{staticClass:"selectInput1",class:[0==s?"vhide":""],attrs:{placeholder:"选择"},on:{change:function(e){t.logicSelectChange(s,i.LOGIC)}},model:{value:i.LOGIC,callback:function(e){t.$set(i,"LOGIC",e)},expression:"item.LOGIC"}},t._l(t.options,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),e("el-autocomplete",{staticClass:"autocompleteInput1",attrs:{"item-list":t.restaurants,placeholder:"请选择内容"},on:{select:function(i){t.handleSelect(i,s)}},model:{value:i.FIELDEN,callback:function(e){t.$set(i,"FIELDEN",e)},expression:"item.FIELDEN"}}),t._v(" "),e("el-select",{staticClass:"selectInput2",attrs:{placeholder:"选择"},on:{"visible-change":function(e){t.changeOperator(e,s,i.RELATION)}},model:{value:i.RELATION,callback:function(e){t.$set(i,"RELATION",e)},expression:"item.RELATION"}},t._l(i.OPERATORLIST,function(t){return e("el-option",{key:t.operator,attrs:{label:t.operatordesc,value:t.operator}})})),t._v(" "),0==i.VALUETYPE?e("el-input",{staticClass:"inputType",attrs:{placeholder:"请输入内容"},on:{change:function(i){t.changeList(i,s)}},model:{value:i.VALUE,callback:function(e){t.$set(i,"VALUE",e)},expression:"item.VALUE"}}):2!=i.VALUETYPE||"in"!=i.RELATION&&"not in"!=i.RELATION?1==i.VALUETYPE||2==i.VALUETYPE&&"in"!=i.RELATION&&"not in"!=i.RELATION?e("el-autocomplete",{staticClass:"inputType",attrs:{"item-list":i.VALUELIST,placeholder:"请输入/选择内容"},on:{select:function(i){t.selectList(i,s)}},model:{value:i.VALUE,callback:function(e){t.$set(i,"VALUE",e)},expression:"item.VALUE"}}):3==i.VALUETYPE?e("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},on:{change:function(i){t.timeChange(i,s)}},model:{value:i.VALUE,callback:function(e){t.$set(i,"VALUE",e)},expression:"item.VALUE"}}):t._e():e("div",{staticClass:"inputType"},[e("select-search",{staticClass:"multipleSelect",attrs:{code:"NAME",itemList:i.VALUELIST},on:{change:function(i){t.multipleSelectChange(i,s)}},model:{value:i.FLAG,callback:function(e){t.$set(i,"FLAG",e)},expression:"item.FLAG"}})],1)],1)],2)}),t._v(" "),e("span",{staticClass:"btnClick",on:{click:function(i){t.addList(-1)}}},[e("i",{staticClass:"iconfont icon-addlist",attrs:{title:"添加新子句"}}),t._v(" "),e("span",{staticClass:"addNewList"},[t._v("添加新句子")])])],2)])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"listRight"},[e("div",{staticClass:"selectInput1"},[t._v("与/或")]),t._v(" "),e("div",{staticClass:"autocompleteInput1"},[t._v("字段")]),t._v(" "),e("div",{staticClass:"selectInput2"},[t._v("运算符")]),t._v(" "),e("div",{staticClass:"inputType"},[t._v("值")])])}]}}});