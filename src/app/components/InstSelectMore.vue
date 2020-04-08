/* 
 * 仪器选择组件-多选, 由InstSelect.vue改造得来
 * @Author: chuyunshi
 */
<template>
  <!--搜索框开始 暂时屏蔽-->
  <div class="inst-select-wrap">
    <div class="inst-input-item">
      <label class="inst-label" v-if="showLabel">{{label}}</label>
      <el-input
      select-when-unmatched
      class="formcontrol inline-input"
      :readonly="true"
      :title="currentInstName"
      v-model="currentInstName"
      @click.native="popoverShowClick"
      >
        <template slot="icon">
            <i ref="triggerEl" :class="{'opacity' : currentInstName}" class="el-input__icon is-clickable iconfont icon-close el-icon-circle-close is-clickable" @click.stop="clearInst">
            </i>
        </template>
      </el-input>
      <el-popover
        ref="popoverInfo"
        placement="top"
        @show="showInit"
        v-model="popoverFilterShow"
        popper-class="inst-select-more-poppver"
        class="group-item pop-filter" trigger="click">
        <div class="filter ">
          <div class="filter-header">
            <span class="title">选择仪器</span>
            <i v-if="true" class="iconfont icon-quxi btnclose" 
              @click="closePopover" >
            </i>
          </div>
          <div class="filter-content ">
            <div class="wrapper-content">
              <!--搜索框开始 暂时屏蔽-->
              <div class="wrapper">
                <el-input class="wrapper-search" 
                        placeholder="请输入关键词搜索" 
                        ref="orderSearchKey"
                        @change="handelSearchChange"
                        @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
                        @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
                        
                        icon="search" v-model="itemFilterKey">
                </el-input>
                <el-button class="fr"  @click.stop="closePopover">取消</el-button>
                <el-button type="primary fr mr-10" @click.stop="handleItemClick">确定</el-button>
                
                <!-- <span>双击选择仪器</span> -->
              </div>
                <div class="wrap-group-table">
                  <div class="inst-class">
                    <ul class="isnt-group">
                      <li  :class="{'active':groupTabSelect=='TB_EXAMCLASS'}" @click="handelTabClick('TB_EXAMCLASS')">
                        检验分类
                      </li>
                      <li :class="{'active':groupTabSelect=='TB_INSTGROUP'}" @click="handelTabClick('TB_INSTGROUP')">
                        工作组
                      </li>
                    </ul>
                    <ul v-if="groupTabSelect=='TB_EXAMCLASS'" class="class-wrap" v-scroll>
                      <li class="class-item" @click="handleClickClass(item,index)" 
                        v-for="(item, index) in examClassArr" :key="index" 
                        :class="[selectIndex==index ? 'active' : '', 'ellipsis']">
                        <!-- {{item.SLAVENAME}} -->
                        <ellipsis-lable >
                          <span style="margin-right: 5px;">{{item.name }}</span>
                        </ellipsis-lable>
                        <span class="count">{{ item.count }}</span>
                      </li>
                    </ul>
                    <ul v-if="groupTabSelect=='TB_INSTGROUP'" class="class-wrap" v-scroll>
                      <li class="class-item" @click="handleClickClass(item,index)" 
                        v-for="(item, index) in instGroupArr" :key="index" 
                        :class="[selectIndex==index ? 'active' : '', 'ellipsis']">
                        <!-- {{item.SLAVENAME}} -->
                        <ellipsis-lable >
                          <span style="margin-right: 5px;">{{item.name}}({{item.code}})</span>
                        </ellipsis-lable>
                        <span class="count">{{ item.count }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="wrap-table">
                    <el-table :data="filterItemList" 
                      ref="orderTable"
                      @current-change="currentChange"
                      class="short-table"
                      row-key="DICID"
                      @selection-change="selectItem"
                      :highlight-current-row="false"
                      stripe 
                      fit>
                        <el-table-column
                        reserve-selection
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column width="120" 
                            property="DICID" 
                            label="ID">
                        </el-table-column>
                        <el-table-column width="120" 
                            property="CODE" 
                            label="代码">
                        </el-table-column>
                        <el-table-column 
                            width="250" 
                            property="NAME" 
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            width="100" 
                            property="DICTYPE" 
                            label="检验分类">
                        </el-table-column>
                        <el-table-column 
                            width="100" 
                            property="INSTGROUPNAME" 
                            label="工作组">
                        </el-table-column>
                    </el-table>
                  </div>
                </div>
            </div>
          </div>
   
        </div>
      </el-popover>
    </div>
    <!--选择仪器-->
  </div>
</template>
<script>
  import debounce from 'throttle-debounce/debounce';
  import scrollIntoView from '../../app/utils/scroll-into-view';
  const TB_EXAMCLASS="TB_EXAMCLASS";
  const TB_INSTGROUP="TB_INSTGROUP";
  export default {
    name: "InstSelectMore",
    data() {
      return {
        //过滤关键字
        itemFilterKey: "",
        currentInstId:"",
        // 仪器名称，用于展示
        currentInstName: '',
        popoverFilterShow:false,
        selectIndex:0,
        selectKey:"",
        //分类tab选择
        groupTabSelect:"examClass",
        //数据，过滤后的数据
        filterItemList:[],
        //检验分类数据源
        examClassArr:[],
        //工作组数据源
        instGroupArr:[],
        //是否被初始化过
        hasInited:false,
        //处理检索的防抖
        handelSearchChange:null,
        // 选中的仪器
        selectItems: []
      };
    },
    //自定义model,用于父组件v-model
    model: {
      prop: "dataValue",//props中必须定义同名的props
      event: "change"  //通过触发change事件来触发双向驱动
    },
    props: {
      dataValue: {
        required: true
      },
      showLabel: {
        type:Boolean,
        default:true
      },
      defaultClick:{ //是否默认点击第一个仪器
          type:Boolean,
          default:false
      },
      disabled:{ //是否禁用
          type:Boolean,
          default:false
      },
      label:{
        type:String,
        default:"检测仪器"
      },
      //数据源
      itemListData: {
        type: [Array, String],
        default: function () {
          return [];
        }
      }
    },
    created() {
      //切换文字时，搜索要防抖
      this.handelSearchChange=debounce(100, () => {
        let filterKey = this.itemFilterKey && this.itemFilterKey.trim();
        this.dofilterItemList(filterKey);
      });
      this.$nextTick(()=>{
        //代码指定popover的触发点，为了让触发点和谈层的代码结构不是嵌套那么深。
        this.$refs.popoverInfo.referenceElm = this.$refs.triggerEl;
      });
    },
    watch: {
      //监听v-model的数据源，只要一变，就把值转换成id
      dataValue(newVal,oldVal){
        this.currentInstId = newVal;
        this.getInstName()
      },
      itemListData(newVal,oldVal){
        if(!newVal){
          return;
        }
        if(this.defaultClick){
          //默认点击未分类仪器第一个
          if(newVal.length < 1) {
            this.handleItemClick(null);
          }else{
            this.handleItemClick(newVal[0]);
          }
        }
      },
      /* 监听弹框显示 */
      popoverFilterShow(val) {
        if(val) {
          let instIdArr = this.currentInstId.split(',');
          let selectItem = [];
          this.itemListData.forEach(item => {
            instIdArr.forEach(id => {
              if(item.DICID == id) {
                selectItem.push(item);
              }
            })
          })
          selectItem.forEach(row => {
            this.$refs.orderTable.toggleRowSelection(row);
          });
        }
      }

    },
    computed: {
    },
    methods: {
      /**获取仪器名字 */
      getInstName() {
        let _instIdArr = this.currentInstId.split(',')
        let _instNameArr = []
        this.itemListData.forEach(item => {
          _instIdArr.forEach(id => {
            if(item.DICID == id) {
              _instNameArr.push(item.NAME)
            }
          })
        })
        this.currentInstName = _instNameArr.join(',')
      },
      /** 高亮数据 */
      highlight(index) {
        //this.$refs.orderTable.$el.focus();
        if(index > this.filterItemList.length-1 || index <0){
          return ;
        }
        this.highlightedIndex = index;
        if(this.$refs.orderTable){
          this.$refs.orderTable.setCurrentRow(this.filterItemList[this.highlightedIndex]);  
        }
        this.$nextTick(()=>{
          const target = this.$refs.orderTable.$el.querySelector('.current-row');
          if (target) {
            const menu = this.$refs.orderTable.$el.querySelector('.el-table__body-wrapper');
            scrollIntoView(menu, target);
          }
        });
      },
      /** 处理工作组和检验分类切换 */
      handelTabClick(tab){
        this.groupTabSelect = tab;
        if(tab==TB_EXAMCLASS){
          let index =0;
          let item = this.examClassArr[index];
          this.handleClickClass(item,index);
        }else if(TB_INSTGROUP){
          let index =0;
          let item = this.instGroupArr[index];
          this.handleClickClass(item,index);
        }
      },
      /** 分类点击的处理 */
      handleClickClass(item,index){
        this.selectIndex=index;
        this.selectKey = item.code;
        this.filterKey="";
        this.$nextTick(()=>{
          this.dofilterItemList();
        });
      },
      /** 执行列表的过滤 ，此方法用在检索、切换分类时调用
       * @param filterKey 过滤的关键字
      */
      dofilterItemList(filterKey){
        let newData = this.itemListData.slice();
        if(filterKey){
          newData = newData.filter((row)=> {

          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .trim()
                .toLowerCase()
                .indexOf(filterKey.toLowerCase()) > -1);
            });
          });
        }else{
          newData = newData.filter((row)=> {
            if(this.groupTabSelect==TB_EXAMCLASS){
              return ""+row.EXAMCODE== this.selectKey;
            }else if(this.groupTabSelect==TB_INSTGROUP){
              return ""+row.INSTGROUP == this.selectKey;
            }
          });
        }
        this.filterItemList =  newData;
        this.$nextTick(()=>{
          let findIndex = this.filterItemList.findIndex((item) =>{
            return item.INSTID == this.dataValue.INSTID;
          })
          this.highlight(findIndex);
        })
        
      },
      /** 显示的时候初始化，用于第一次显示的时候进行分组及计数 */
      showInit(){
        if(this.hasInited){
          return;
        }
        let examClassName,examClassCode,groupName,groupCode;
        let countExamClass=0;
        let countGroup=0;
        let examArr=[];
        let groupArr=[];
        let objTempClass={};
        let objTempGroup={};
        let instGroupArr=[],examClassArr=[];
        for(let i =0,len=this.itemListData.length;i<len;i++){
          const item = this.itemListData[i];
          //检验分类
          examClassName = item.DICTYPE||"未分组";
          examClassCode = ""+item.EXAMCODE;
          if(!examArr.includes(examClassCode)){
            objTempClass = {code:examClassCode,name:examClassName,count:0};
            examArr.push(examClassCode);
            examClassArr.push(objTempClass)
          }
          objTempClass = examClassArr.find(it=>{
            return it.code ==examClassCode;
          })
          objTempClass.count=objTempClass.count+1;
          //工作组
          groupCode = ""+item.INSTGROUP;
          groupName = item.INSTGROUPNAME||"未分组";
          if(!groupArr.includes(groupCode)){
            objTempGroup = {code:groupCode,name:groupName,count:0};
            groupArr.push(groupCode);
            instGroupArr.push(objTempGroup);
          }
          objTempGroup = instGroupArr.find(it=>{
            return it.code ==groupCode;
          })
          objTempGroup.count=objTempGroup.count+1;
        }
        this.examClassArr = examClassArr;
        this.instGroupArr = instGroupArr;
        this.handelTabClick(TB_EXAMCLASS);
        //释放
        examArr=null;
        groupArr=null;
        objTempClass=null;
        objTempGroup=null;
        this.hasInited = true;

      },

      /** 选择项目 */
      selectItem(item){
        this.selectItems = item;
      },
      /** 弹出选择仪器 */
      popoverShowClick(){
        if(!this.disabled){
          this.popoverFilterShow=!this.popoverFilterShow;
        }
      },
      /** 关闭 */
      closePopover() {
        this.popoverFilterShow = false;
        this.$nextTick(() => {
          this.$refs.orderTable.clearSelection();
        })
      },

      /** 处理确定选中记录的处理，触发双向绑定和抛出changeItem事件 */
      handleItemClick(){
        this.currentInstId = '';
        let instIds = [];
        let instNames = [];
        if(this.selectItems.length > 0){
          this.selectItems.forEach(item => {
            instNames.push(item.NAME)
            instIds.push(item.DICID)
          })
        }
        this.currentInstId = instIds.join(',');
        this.currentInstName = instNames.join(',');

        this.closePopover()
        this.$emit("change", this.currentInstId);
        this.$emit("changeItem",this.selectItems);
      },
      /* 清除仪器 */
      clearInst() {
        this.currentInstId = '';
        this.currentInstName = '';
        this.selectItems = [];
        this.$emit("change", this.currentInstId);
        this.$emit("changeItem",this.selectItems);
      },
      /***仪器项目列表选择更改事件***/
      currentChange(currentRow, oldCurrentRow) {
        this.currentRow = currentRow;
      },
    }
  };
</script>



<style lang="stylus" scoped>
  .inst-select-wrap {
    .inst-input-item{
      display:flex;
      .inst-label{
        margin:auto;
        margin-right:10px;
      }
      padding:0 0;
      
      width:100%;
      .formcontrol{
        margin:0;
        width:100%;
        flex:1;
        .el-input__inner{
          height:28px !important;
          font-size:14px;
        }
        .el-input__icon.iconfont{
          font-size 14px
          opacity 0
        }
        .el-input__icon.opacity {
          opacity 1
        }
      }
    }
  }

</style>
<style lang="stylus" >
.inst-select-more-poppver{
  margin-top:0px !important;
  padding 0
  .wrap-group-table{
    height: 360px;
    .el-table {
      flex:1
      height:100%;
      .el-table__body-wrapper {
        height:100%;
        height:calc(100% - 32px) !important;
      }
    }

    display:flex;
    margin:5px 0px;
    flex-direction:row;
    .wrap-table{
      padding:5px;
      width:400px;
      background:white;
    }
    .inst-class{
      display:flex;
      flex-direction:column;
      width:200px;
      margin-right:2px;
      .isnt-group{
        border-bottom:1px solid #ddd;
        overflow:hidden;
        padding:0 15px;
        li{
          cursor:pointer;
          float:left;
          margin:0px 0 5px 0;
          background :white;
          border:1px solid #ddd;
          height:26px;
          width:50%;
          text-align:center;
          line-height:26px;
          
        }
        li.active{
          background :#7976FE;
          border:1px solid blue;
          color:white;
        }
      }
      .class-wrap{
        height:95%;
        overflow:auto;
        background #F0F0F0
        width:100%;
        .class-item.active{
          background #fff
        }
        .class-item:hover:not(.active){
          background lightblue
        }
        .class-item:active{
          background #fff
        }
        .class-item{
          cursor:pointer;
          display flex
          flex-direction: row;
          justify-content: space-between;
          position relative
          height 32px
          line-height 32px
          padding-left 5px
          cursor pointer
          border-bottom:1px solid #ddd;
          &:last-child
          padding-right 2px
          .ellipsis-lable{
            flex:1
          }
          .count{
            margin-right:8px;
            color:red;
          }
        }
      }
    }
  }

  .filter {
    background:#F0F0F0 !important;
    width: auto;
    margin: 0px auto;
    padding: 2px 0;
    .wrapper-content {
      margin: 0px 0px;
      .wrapper {
        position:relative;
        margin:0 10px 0px 10px;
        .el-input {
          width: 50%
          
        }
        .el-input__inner{
            height:26px !important;
        }
        
      }
      .wrapper {
          padding: 5px 0 5px 5px;
      }
      .icon-add:hover {
          color: blue;
      }
    }
    .filter-header {
        padding: 0 15px;
        border-bottom: 1px dashed #dddddd;
        width: 100%;
        height: 28px;
        line-height: 28px;
        background:white;
        margin: 0 auto;
        font-size: 14px;
    }
    .filter-header .btnclose {
        float: right;
        color: dimgrey;
        cursor: pointer;
    }
    .filter-header .btnclose:hover {
        color: red;
    }
    .filter-content {
        height: 100%;
        padding: 0 2px;
    }

    .filter-header .title {
        font-weight: bold;
    }

    .el-input__inner {
      padding-left: 15px !important;
      border-radius: 0 !important;
      height: 30px;
    }
  }
}
</style>