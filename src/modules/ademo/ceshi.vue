<!--
* @author: w_sh
* @date: 2018/09/25
* @module: 高级搜索组件
-->
<template>
  <div class="groupContent fade-scroll">
    <div class="titleText hide">顶级工作项的筛选器</div>
    <div class="listBox" style="height:20px;">
      <div class="listLeft">
        <i title="对所选子句进行分组" @click="mergeBtn()" class="iconfont icon-hb"></i>
      </div>
      <span class="iconSpan" v-for="(items,thisindex) in manyArr"
          :key="thisindex"
          >
      </span>
      <div class="listRight">
        <div class="selectInput1">与/或</div>
        <div class="autocompleteInput1">字段</div>
        <div class="selectInput2">运算符</div>
        <div class="inputType">值</div>
      </div>
    </div>
    <div class="groupBox fade-scroll" >
      <div class="listBox" v-for="(item, index) in listData" :key = 'index'>
        <div class="listLeft">
          <span class="btnClick" @click="addList(index)">
            <i title="插入新的筛选器行" class="iconfont icon-addlist"></i>
          </span>
          <span class="btnClick removeBtn" @click="removeList(index)">
            <i title="删除此筛选器行" class="iconfont icon-removelist"></i>
          </span>
          <el-checkbox @change="checkBoxClick(index,item.CHECKED)" v-model="item.CHECKED">
          </el-checkbox>
        </div>
        <span class="iconSpan" v-for="(items,thisindex) in manyArr"
          :key="thisindex"
          :class="addClass(items,index,thisindex)"
          >
          <span class="delete" @click="removeItem(items,index)">
            <i title="取消子句分组" class="iconfont icon-close"></i>
          </span>
          <div class="leftLine"></div>
        </span>
        <div class="listRight">
          <el-select :class="[index == 0 ? 'vhide' : '']"
          v-model="item.LOGIC" @change="logicSelectChange(index,item.LOGIC)" class="selectInput1" placeholder="选择">
            <el-option
              v-for="items in options"
              :key="items.value"
              :label="items.label"
              :value="items.value">
            </el-option>
          </el-select>
          <el-autocomplete
            class="autocompleteInput1"
            v-model="item.FIELDEN"
            :item-list="restaurants"
            placeholder="请选择内容"
            @select="((item)=>{handleSelect(item, index)})"
          ></el-autocomplete>
          <el-select @visible-change='((flag)=>{changeOperator(flag, index,item.RELATION)})' v-model="item.RELATION"  class="selectInput2" placeholder="选择">
            <el-option
              v-for="items in item.OPERATORLIST"
              :key="items.operator"
              :label="items.operatordesc"
              :value="items.operator">
            </el-option>
          </el-select>

          <!-- 直接输入 -->
          <el-input class="inputType"
          v-if="item.VALUETYPE == 0"
          v-model="item.VALUE"
          @change="((item)=>{changeList(item, index)})"
          placeholder="请输入内容"></el-input>

          <!-- 多选 -->
          <!-- <div class="inputType"  v-else-if="item.VALUETYPE == 2 && (item.RELATION == 'in' || item.RELATION == 'not in')">
            <el-input
            v-model="item.VALUEDESC"
            placeholder="请选择内容"></el-input>
            <el-select
            class="multipleSelect"
            v-model="item.FLAG"
            multiple
            @change="((item)=>{multipleSelectChange(item, index)})"
            placeholder="请选择">
              <el-option
                v-for="thisItem in item.VALUELIST"
                :key="thisItem.CODE"
                :label="thisItem.NAME"
                :value="thisItem.NAME">
              </el-option>
            </el-select>
          </div> -->
          <div class="inputType" v-else-if="item.VALUETYPE == 2 && (item.RELATION == 'in' || item.RELATION == 'not in')">

            <select-search
              class="multipleSelect"
              v-model="item.FLAG"
              :code="'NAME'"
              :itemList="item.VALUELIST"
              @change="((item)=>{multipleSelectChange(item, index)})"
            >
            </select-search>
          </div>
          <!-- 下拉 -->
          <el-autocomplete
            v-else-if="item.VALUETYPE == 1 || item.VALUETYPE == 2 && (item.RELATION != 'in' && item.RELATION != 'not in')"
            class="inputType"
            v-model="item.VALUE"
            :item-list="item.VALUELIST"
            placeholder="请输入/选择内容"
            @select="((item)=>{selectList(item, index)})"
          ></el-autocomplete>

          <!-- 时间选择器 -->

          <el-date-picker
            v-else-if ="item.VALUETYPE == 3"
            v-model="item.VALUE"
            type="date"
            placeholder="选择日期"
            @change='((item)=>{timeChange(item, index)})'>
          </el-date-picker>

        </div>
      </div>
      <span class="btnClick" @click="addList(-1)">
        <i title="添加新子句" class="iconfont icon-addlist"></i> <span class="addNewList">添加新句子</span>
      </span>
      <!-- <span class="btnClick" @click="hh()">数组赋值</span> -->
    </div>
  </div>
</template>
<script>
  import * as layerUtils from 'app/utils/layerUtils'
  // import Common from '@/app/api/common.js'
  // import selectSearch from '@/app/components/selectSearch.vue'

  export default {
    // components: {
    //   selectSearch
    // },
    data() {
      return {
        inputValueName: '', // 新建，存储方案名
        restaurants: [], // 字段列表
        options: [
          {
            value: 'and',
            label: '与'
          },
          {
            value: 'or',
            label: '或'
          }
        ],

        value:'and',
        newList:  {
          CHECKED: false, // checkbox状态
          FIELDTYPE: '', //数据类型
          TABLEALIASNAME: '', // 表名简称
          ORDERNO: 0, // 序号
          LOGIC: 'and', // and/or
          LOGICDESC: '与', // 与/或
          FIELDDEFINEID: 0, // 字段定义id
          RELATION: '', // 关系运算符
          RELATIONDESC: '', // 关系运算符描述
          OPERATORLIST:'', // 运算符下拉存储
          VALUE: '', // 3 code
          VALUEDESC: '', // 3 展示信息
          FLAG:[], // 多选信息处理
          VALUELIST: [], // 3 下拉存储
          CONFIELDLIST: '', // 1-2,3-4
          FIELDEN: '', // en 1
          FIELDCN: '', // zh 1
          ISVARIABLE: '', // none
          VARIABLEVALUE: '', // none
          VALUETYPE: '' // 3展示的类型
        },
        arr: [], // 存储的分组列表，源
        arrCopy: [], // 矩阵变换过度
        newArr: [], // 选中的列表
        verificationFlag: 0, // 验证标识
        manyArr:[], // 数组矩阵
      }
    },
    props: {
      listData: Array,  // 列表展示 父传
      subSysCode: String, // 子系统代码
      rptType: String, // 报表类型
      themeName: String, // 搜索方案名称
      nameList:Array, // 已有方案名列表,去重
      type: String, // 常规条件类型
      thisStyle: Number, // 0:搜索方案；1:常规
      effconid: [String, Number], // 常规ID
    },
    created() {
      // this.listData && this.listData.length == 0 ? '' : this.changeValueList();
    },
    computed: {
     
    },
    
    mounted() {
      // this.getMInLengthArray();
      // this.arrCopy = this.arr
      // this.getPushArr()
      this.showGroup();
      this.lastOne();

      this.getFieldList();

    },
    watch:{
      rptType() {
        this.getFieldList();
      },
      listData() {
        // console.log(this.listData,888)
        if(this.listData == undefined){
          return false;
        }
        // this.listData == undefined || this.listData.length == 0 ? '' : this.changeValueList();
        // console.log(123)
        this.lastOne();
        setTimeout(() => {
          this.showGroup();
        },0)
        
      }
    },
    methods: {
      changeValueList() {
        // console.log(this.listData,999)
        for(let i = 0;i<this.listData.length;i++){
          if((this.listData[i].VALUETYPE == 1 || this.listData[i].VALUETYPE == 2) && this.listData[i].VALUELIST.constructor != Array) {
            this.listData[i].VALUELIST = this.listData[i].VALUELIST[this.listData[i].FIELDCN]
          }
          this.listData[i].FLAG = this.listData[i].VALUEDESC.split(',')
        }
      },
      /* 与/或,change*/
      logicSelectChange(index,item) {
        if(item == 'and') {
          this.listData[index].LOGICDESC = '与'
        } else if(item == 'or') {
          this.listData[index].LOGICDESC = '或'
        }
      },
      /* 多选，change*/
      multipleSelectChange(item,index) {
        // console.log(item);
        let codeArr = [];
        this.listData[index].VALUEDESC = this.listData[index].FLAG.join(',')
        for(let i=0;i<item.length;i++){
          codeArr.push(item[i].CODE)
        }
        this.listData[index].VALUE = codeArr.join(",");
        // console.log(this.listData[index].VALUE)
      },

      multipleSelectChange1(item,index) {
        // console.log(item);
        let codeArr = [];
        this.listData[index].VALUEDESC = item.join(',')
        for(let i=0;i<item.length;i++){
          for(let j=0;j<this.listData[index].VALUELIST.length;j++){
            if(this.listData[index].VALUELIST[j].NAME == item[i]){
              codeArr.push(this.listData[index].VALUELIST[j].CODE)
            }
          }
        }
        this.listData[index].VALUE = codeArr.join(",");
        // console.log(this.listData[index].VALUE)
      },
      // 下拉，单选
      selectList(item,index) {
        // console.log(item,index);
        this.listData[index].VALUEDESC = item.NAME;
      },
      /**输入框，绑定VALUEDESC */
      changeList(item, index) {
        console.log(item,index);
        this.listData[index].VALUEDESC = item;
      },
      /* 运算符，change*/
      // @change='changeOperator(index,item.RELATION)'
 
      changeOperator(flag,index,item){
        // console.log(flag,index,item )
        if(flag){
          return false
        }
        let operatorCode = '';
        // console.log(this.listData[index].OPERATORLIST)
        for(let i=0;i<this.listData[index].OPERATORLIST.length;i++){
          if(this.listData[index].OPERATORLIST[i].operator == item) {
            this.listData[index].RELATIONDESC = this.listData[index].OPERATORLIST[i].operatordesc
          }
        }
        if(this.listData[index].VALUETYPE == 2) {
          this.listData[index].VALUE = ''
          this.listData[index].VALUEDESC = ''
          this.listData[index].FLAG = []

        }
      },
      /*时间变化 */
      timeChange(item,index) {
        this.listData[index].VALUE = item;
        
      },
      /*获取字段列表 */
      getFieldList() {
        let parameter = {
          subsyscode: this.subSysCode,
          rpttype: this.rptType
        }
        // console.log(parameter)
        // Common.searchCondition(parameter).then(data => {
        //   if (data.type === 'SUCCESS') {
        //     // console.log(data);
        //     this.restaurants = data.data;
        //   } else {
        //     layerUtils.showMessage(data.message,layerUtils.messageType.WARNING);
        //   }
        // });
      },
      /*存一 */
      lastOne() {
        if(this.listData && this.listData.length == 0 || this.listData &&  this.listData.length == 1 && this.listData[0].FIELDCN == ''){
          this.listData[0] = this.newList;
          this.newList = {
            CHECKED: false,
            FIELDTYPE: '', //数据类型
            TABLEALIASNAME: '', // 表名简称
            ORDERNO: 0, // 序号
            LOGIC: 'and', // and/or
            LOGICDESC: '与', // 与/或
            FIELDDEFINEID: 0, // 字段定义id
            RELATION: '', // 关系运算符
            RELATIONDESC: '', // 关系运算符描述
            OPERATORLIST:'', // 运算符下拉存储
            VALUE: '', // 3 code
            VALUEDESC: '', // 3 展示信息
            FLAG:[],
            VALUELIST: [], // 3 下拉存储
            CONFIELDLIST: '', // 1-2,3-4
            FIELDEN: '', // en 1
            FIELDCN: '', // zh 1
            ISVARIABLE: '', // none
            VARIABLEVALUE: '', // none
            VALUETYPE: '' // 3展示的类型
          }
        }
      },
      /*数据处理，测试阶段*/
      showGroup() {
        this.arr = [];
        for(let j=0;j<this.listData.length;j++){
          let thisString = this.listData[j].CONFIELDLIST;
          // console.log(thisString);
          if(thisString != '') {
            let thisArr = thisString.split(",")
            for(let i=0;i<thisArr.length;i++){
              let minArr = thisArr[i].split("-");
              // console.log(minArr);
              let lastArr = []
              for(let k=parseInt(minArr[0]);k<=minArr[1];k++){
                lastArr.push(k);
              }
              this.arr.push(lastArr);
              // console.log(lastArr);
            }
          }
          this.listData[j].CONFIELDLIST = '';
        }
        this.changeGroup();
      },
      /*新建的时候，输入方案名称*/
      AddName() {
        // console.log(this.listData)
        
        // 验证是否填写完整
        for(let j=0;j<this.listData.length;j++){
          this.listData[j].CONFIELDLIST = ''
          if(this.listData && this.listData[0].FIELDCN == '' && this.listData.length == 1){
            // console.log("第一条句子为空")
            // return false
          } else if(this.listData[j].LOGICDESC == ''&& j != 0 
          || this.listData[j].FIELDCN == '' 
          || this.listData[j].RELATION == '' 
          || this.listData[j].VALUE == ''
          || (this.listData[j].VALUETYPE == 1 || this.listData[j].VALUETYPE == 2) 
          && this.listData[j].VALUEDESC == '') {
            layerUtils.showMessage(`第${j+1}条句子不完整`,layerUtils.messageType.WARNING);
            return false;
          }
        }
        if(this.themeName == '' && this.thisStyle == 0) {
          this.$prompt('请输入方案名称', '保存方案名称', {
          inputValue: this.inputValueName,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\-]{1,20}$/,
          inputErrorMessage: '长度1-20个字符，由中文，数字，字母, "-" 组成'
          }).then(({ value }) => {
            for(let i = 0; i < this.nameList.length; i++){
              if(this.nameList[i].THEMENAME == value){
                layerUtils.showMessage('已有该方案名',layerUtils.messageType.WARNING);
                return false;
              }
            }
            this.inputValueName = value;
            this.combinedAssignment();
            setTimeout(() => {
              this.save(value);
            }, 30)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消保存'
            });
            // this.inputValueName = '';  
          });
        } else {
          this.combinedAssignment();
          setTimeout(() => {
            this.save(this.themeName);
          }, 30)
        }
        
      },
      /**合并赋值 */
      combinedAssignment() {
        for(let i=0;i<this.arr.length;i++){
          let _length = this.arr[i].length
          let CONFIELDLIST = this.arr[i][0] + '-' + this.arr[i][_length-1];
          if(this.listData[this.arr[i][0]-1].CONFIELDLIST == ''){
            this.listData[this.arr[i][0]-1].CONFIELDLIST = CONFIELDLIST;
          } else {
            this.listData[this.arr[i][0]-1].CONFIELDLIST = this.listData[this.arr[i][0]-1].CONFIELDLIST + "," + CONFIELDLIST;
          }
        }
      },
      /*保存*/
      save(themeName) {
        this.listData[0].LOGIC = '';
        this.listData[0].LOGICDESC = '';
        let parameter = {
          subsyscode: this.subSysCode,
          rpttype: this.rptType,
          themename: themeName,
          nameflag : this.themeName == ''? '':1,
          type: this.type,
          effconid: this.effconid,
          condtionlist: this.listData,
        }
        this.$emit("saveWay", parameter);
      },
      /*移除分组*/
      removeItem(item,index) {
        // console.log(item)
        // console.log(index+1)
        for(let i = 0;i<item.length;i++){
          if(index+1 == item[i][0]){
            let removeArrIndex = this.arr.indexOf(item[i]);
            // console.log(removeArrIndex);
            this.arr.splice(removeArrIndex,1);
          }
        }
        this.changeGroup();
      },
      /*分组样式连线*/
      addClass(items,index,thisindex) {
        let className = '';
        // console.log(items);
        let classNameWidth = 'thisWidth'+(this.manyArr.length - thisindex);
        for(let i=0;i<items.length;i++){
          for(let j=0;j<items[i].length;j++){
            // console.log(index+ '---' + items[i][0])
            if(index+1 == items[i][0]){
              className = "startLine " + classNameWidth
              // return false
            }
            if(index+1 == items[i][j]) {
              className = "lineShow " + classNameWidth
            }
            if(index+1 == items[i][items[i].length-1]){
               className = "bottomLine " + classNameWidth
            }
          }
        }
        return className;

      },
      /*改变分组,重新渲染*/
      changeGroup() {
        this.manyArr = [];
        this.arrCopy = this.arr;
        this.getPushArr();
      },
      /*数组矩阵*/
      getPushArr() {
        const thisArrCopy = this.arrCopy;
        // console.log(thisArrCopy)
        // console.log(this.arrCopy)
        let thisArr = [];
        for(let i = 0;i< thisArrCopy.length;i++){
          let flag = false;
          let num = 0
          for(let j = 0;j<thisArrCopy.length;j++){
            if(i != j) {
              num = 0;
              for(let k = 0;k<thisArrCopy[j].length;k++){
                let _index = thisArrCopy[i].indexOf(thisArrCopy[j][k]);
                
                if(_index != -1){
                 num ++ 
                 if(num == thisArrCopy[j].length) {
                   flag = true;
                 }
                }
              }
            }
          }
          if(!flag){
            thisArr.push(thisArrCopy[i]);
            // let Index = this.arrCopy.indexOf(thisArrCopy[i]);
            // this.Index.push(Index);
            this.arrCopy = this.removeArr(this.arrCopy,thisArrCopy[i])
          }
        }
        this.manyArr.unshift(thisArr);
        if(this.arrCopy.length>0){
          this.getPushArr()
        }
        if(thisArrCopy.length == 0) {
          this.manyArr = []
        }
        // console.log(this.arr)
        // console.log(this.manyArr)
      },
      /*移除数组中的元素，区别于splice方法*/
      removeArr(arr, item){
        let result = [];
        for(let i=0;i<arr.length;i++){
          if(arr[i] != item){
            result.push(arr[i]);
          }
        }
        return result;
      },
      // 当前选择字段
      handleSelect(item,index) {
        // console.log(item, index);
        if(item.CONVALUEPROVIDER == undefined) {
          return false;
        }
        let parameter = {
          subsyscode: this.subSysCode,
          rpttype: this.rptType,
          fielden: item.CODE
        }
        let dicData = {
          dictype: item.CONVALUEPROVIDER,
          // modulecode: this.subSysCode,
        }
        // 
        this.listData[index].FIELDCN = item.NAME;
        this.listData[index].FIELDTYPE = item.FIELDTYPE;
        this.listData[index].TABLEALIASNAME = item.TABLEALIASNAME;
        this.listData[index].RELATION = '';
        this.listData[index].RELATIONDESC = '';
        this.listData[index].VALUE = '';
        this.listData[index].VALUEDESC = '';
        this.listData[index].FLAG = [];
        this.listData[index].VALUETYPE = item.VALUETYPE
        // Common.searchOperator(parameter).then(data => {
        //   if (data.type === 'SUCCESS') {
        //     // console.log(data);
        //     this.listData[index].OPERATORLIST=data.data;
        //     this.listData[index].RELATION = data.data[0].operator;
        //     this.listData[index].RELATIONDESC = data.data[0].operatordesc;
        //   } else {
        //     layerUtils.showMessage(data.message,layerUtils.messageType.WARNING);
        //   }
        // });
        if(item.VALUETYPE == 0 || item.VALUETYPE == 3){
          return false;
        }
        // Common.getDicData(dicData).then(data => {
        //   if (data.type === 'SUCCESS') {
        //     // console.log(data.data[item.NAME]);
        //     this.listData[index].VALUELIST = data.data[item.CONVALUEPROVIDER]
        //   } else {
        //     layerUtils.showMessage(data.message,layerUtils.messageType.WARNING);
        //   }
        // });
      },
      /*选中列表，生成一维数组，并按照从小到大排序 */
      checkBoxClick(index,checked) {
        if(checked) {
          this.newArr.push(index+1);
          this.newArr.sort(this.compare);         
        } else {
          let _index = this.newArr.indexOf(index+1);
          _index > -1 ? this.newArr.splice(_index, 1) : '';
        }
        // console.log(this.newArr);
  
      },
      compare(val1,val2) {
        return val1-val2;
      },
      /*新增列表*/
      addList(index) {
        // console.log(index)
        if(index != -1){
          this.listData.splice(index,0,this.newList);
          this.changeArrAdd(index+1);
        } else {
          this.listData.push(this.newList);
          this.combinedAssignment();
        }
        this.newList = {
          CHECKED: false,
          FIELDTYPE: '', //数据类型
          TABLEALIASNAME: '', // 表名简称
          ORDERNO: 0, // 序号
          LOGIC: 'and', // and/or
          LOGICDESC: '与', // 与/或
          FIELDDEFINEID: 0, // 字段定义id
          RELATION: '', // 关系运算符
          RELATIONDESC: '', // 关系运算符描述
          OPERATORLIST:'', // 运算符下拉存储
          VALUE: '', // 3 code
          VALUEDESC: '', // 3 展示信息
          FLAG:[],
          VALUELIST: [], // 3 下拉存储
          CONFIELDLIST: '', // 1-2,3-4
          FIELDEN: '', // en 1
          FIELDCN: '', // zh 1
          ISVARIABLE: '', // none
          VARIABLEVALUE: '', // none
          VALUETYPE: '' // 3展示的类型
        }
        this.clearChecked();
      },
      /*修改原始数组队列,增加*/
      changeArrAdd(index){
        // console.log(index)
        for(let i=0;i<this.arr.length;i++){
          let _index = 0;
          for(let j=0;j<this.arr[i].length;j++){
            if(index == this.arr[i][j]){
              this.arr[i][j] += 1;
              _index = j;
            } else if(index < this.arr[i][j]) {
              this.arr[i][j] += 1;
            }
          }
          // console.log(_index)
          _index != 0 ? this.arr[i].splice(_index,0,index) : '';
        }
        // console.log(this.arr)
        // this.changeGroup();
        this.combinedAssignment();
      },
      /*移除列表*/
      removeList(index) {
         this.listData.splice(index,1);
         this.changeArrRemove(index+1);
         this.clearChecked();
      },
      /*修改原始数组队列,移除*/
      changeArrRemove(index){
        for(let i=0;i<this.arr.length;i++){
          let _index = -1;
          for(let j=0;j<this.arr[i].length;j++){
            if(index == this.arr[i][j]){
              this.arr[i][j] -= 1;
              _index = j;
            } else if(index < this.arr[i][j]) {
              this.arr[i][j] -= 1;
            }
          }
          // console.log(_index)
          _index != -1 ? this.arr[i].splice(_index,1) : '';
        }
        
        for(let i=0;i<this.arr.length;i++){
          if(this.arr[i].length == 1) {
            this.arr.splice(i,1);
          }
        }
        /*去重*/
        let _length = this.arr.length;
        for(let i=0;i<_length;i++){
          for(let j=i+1;j<_length;j++){
            if(JSON.stringify(this.arr[i]) == JSON.stringify(this.arr[j])){
              this.arr.splice(j,1);
              j--;
              _length--;
            }
          }
        }
        // console.log(this.arr)
        // this.changeGroup();
        this.combinedAssignment();
      },
      /*合并*/
      mergeBtn() {
        this.verificationFlag = 0;
        let _length = this.newArr.length;
        let _firstNum = this.newArr[0];
        let _endNum = this.newArr[_length-1];
        let _string = _firstNum + '-' + _endNum;
        this.verification(this.newArr)
        if(_length == 0 || _length == 1) {
          layerUtils.showMessage("请选择多个连续的列表，进行分组",layerUtils.messageType.WARNING);
        } else if(_length != _endNum-_firstNum+1) {
          layerUtils.showMessage("所选列表要连续",layerUtils.messageType.WARNING);
          return false;
        } else if(this.verificationFlag == 1){
          layerUtils.showMessage("所选列表已属于其他组，不可交叉",layerUtils.messageType.WARNING);
          return false;
        } else if(this.verificationFlag == 2) {
          layerUtils.showMessage("已有该分组",layerUtils.messageType.WARNING);
          return false;
        } else {
          // this.arr.push(_string);
          this.arr.push(this.newArr);
          this.clearChecked();
          this.changeGroup();
        }
        // console.log(this.arr);
      },
      /*清空选中 */
      clearChecked() {
        for(let i = 0; i<this.listData.length; i++) {
          this.listData[i].CHECKED = false;
        }
        this.newArr = [];
      },
      /*合并规则校验*/
      verification(newArr) {
        // console.log(newArr)
        let _length = this.arr.length;
         let thisArr = 0
         for(let j=0;j<_length;j++){
           let over = false;
           let flag = 0;
           let same = false;
           let cross = false;
           for (let i =newArr[0];i<newArr.length+newArr[0];i++) {
             let _index = this.arr[j].indexOf(i);
              if(_index != -1) {
                // console.log(_index)
                flag += 1;
                thisArr = this.arr[j].length
                // console.log(flag + "----" + thisArr);
                if(flag != thisArr) {
                  cross = true;
                } else {
                  cross = false;
                }
              } else {
                over = true;
              }
              if(JSON.stringify(newArr) == JSON.stringify(this.arr[j])){
                same = true;
              }
              // console.log(flag + "----" + thisArr)
            }
            if(same) {
              this.verificationFlag = 2;
              return false;
            }
            if(cross && over) {
              this.verificationFlag = 1;
              return false;
            } else {
              this.verificationFlag = 0;
            }
          }
      }
    },
  }
</script>
<style lang="stylus" scoped>
.groupContent
  height 100%
  overflow hidden
  .titleText
    padding 10px 0
.groupBox
  padding-bottom 15px
  min-width 580px
  height calc(100% - 20px)
  overflow-y auto
.listBox
  height 30px
  display flex
  flex-direction row
  flex 1
  flex-basis auto
  align-items center
  min-width 580px
  .listLeft
      width 72px
  .listRight
    display flex
    flex-direction row
    flex 1
.btnClick
  cursor pointer
.iconSpan
  display inline-block;
  position relative
  width 10px
.selectInput1
  width 12%
  margin-right 15px
.selectInput2
  width 12%
  margin-right 15px
.autocompleteInput1
  width 20%
  margin-right 15px
.inputType
  width 56%
.vhide
  visibility hidden
.addNewList
  color rgb(16,142,233)
.addNewList:hover
  text-decoration underline
.removeBtn
  margin-right 10px
.icon-addlist
  color rgb(16,142,233)
.icon-removelist
  color rgb(216,30,6)
.icon-hb
  float right
  margin-right 6px
  opacity 0.8
.icon-hb:hover
  opacity 1
</style>



<style lang="stylus">
.inputType
  position relative
  .multipleSelect
    width 100%
    position absolute
    top 0
    .el-input__inner
      opacity 0
    .el-input
      height 26px
  .el-select__tags
    display none
.leftLine
  height 30px
  position absolute
  top -15px
  left 0
.startLine .leftLine
  border-left 1px solid #ccc
  border-top 1px solid #ccc
  height 30px
  top -10px
.lineShow .leftLine
  border-left 1px solid #ccc
.bottomLine .leftLine
  border-left 1px solid #ccc
  border-bottom 1px solid #ccc
  height 26px
  top -17px
.delete
  display none
.startLine .delete
  display block
  position absolute
  width 8px
  height 8px
  left -1px
  top -12px
  transform scale(0.7)
  cursor pointer
  z-index 100
  i
    font-size 12px
.thisWidth1 .leftLine
  width 10px
  background rgb(255,225,255)
.thisWidth2 .leftLine
  width 20px
  background rgb(255,250,205)
.thisWidth3 .leftLine
  width 30px
  background rgb(245,255,255)
.thisWidth4 .leftLine
  width 40px
  background rgb(255,239,213)
.thisWidth5 .leftLine
  width 50px
  background rgb(240,255,240)
.thisWidth6 .leftLine
  width 60px
  background rgb(255,225,255)
.thisWidth7 .leftLine
  width 70px
  background rgb(255,250,205)
.thisWidth8 .leftLine
  width 80px
  background rgb(245,255,255)
.thisWidth9 .leftLine
  width 90px
  background rgb(255,239,213)
.thisWidth10 .leftLine
  width 100px
  background rgb(240,255,240)
.thisWidth11 .leftLine
  width 110px
  background rgb(255,225,255)
.thisWidth12 .leftLine
  width 120px
  background rgb(255,250,205)
.thisWidth13 .leftLine
  width 130px
  background rgb(245,255,255)
.thisWidth14 .leftLine
  width 140px
  background rgb(255,239,213)
.thisWidth15 .leftLine
  width 150px
  background rgb(240,255,240)
</style>
