<!--
* @author: guo
* @date: 2018/11/05
* @module: 多选弹框
* @explain: 多选弹框
-->

<template>
  <div>
    <el-dialog :title="title"
             :before-close="close"
             @open="open"
             :modal-append-to-body="false"
             class="multi-daialog common-dialog"
             :visible.sync="show">
      <div class="multi-top">
        <el-input v-model.trim.trim="searchInput" placeholder="输入关键词搜索" class="multi-search" ref="multiSearch" @focus="$refs.multiSearch.$refs.input.select()"></el-input>
        <div class="plan-wrapper" v-show="section!==''">
          <el-button @click="showSavePlanDialog">保存方案</el-button>
          <el-button @click="planImportDialogShow=true">导入方案</el-button>
        </div>
      </div>
      <el-table
        :data="isPaging ? currentPageItemData : filterData"
        height="100%"
        width="100%"
        :fit="true"
        ref="itemTable"
        row-key="CODE"
        :class="{'short-table':isShortTable}"
        @selection-change="selectionChange"
        style="width: 100%">
        <el-table-column
          :reserve-selection="true"
          width="60"
          type="selection">
        </el-table-column>
        <el-table-column
          width="100"
          show-overflow-tooltip
          label="仪器ID"
          prop="INSTID"
          v-if="title=='选择仪器' || title=='仪器'">
        </el-table-column>
        <el-table-column
          prop="CODE"
          width="100"
          show-overflow-tooltip
          label="代码">
        </el-table-column>
        <el-table-column
          prop="NAME"
          width=""
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="MEMCODE1"
          width="100"
          show-overflow-tooltip
          label="输入码一">
        </el-table-column>
        <el-table-column
          prop="MEMCODE2"
          width="100"
          show-overflow-tooltip
          label="输入码二">
        </el-table-column>
      </el-table>
      <div slot="footer" class="bottom">
        <div class="bottom-page">
          <span v-if="multipleSelection.length !==0">
            已选择<span class="summary-item"> {{multipleSelection.length}} </span>个项目
          </span>
          <span  v-else>共 <i class="summary-item">{{filterData.length}}</i> 个项目</span>
          <el-pagination
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            v-show="filterData.length > 150 && isPaging"
            layout="prev, pager, next"
            :total="filterData.length">
          </el-pagination>
        </div>
        <div>
          <el-button type="primary" @click="certain">确定</el-button>
          <el-button type="" @click="close">取消</el-button>
        </div>

      </div>
    </el-dialog>
    <!-- 方案命名弹框 -->
    <plan-named-dialog 
      ref="planNamedDialog"
      :planSaveDialogShow.sync="planSaveDialogShow"
      @savePlan="savePlan"
      ></plan-named-dialog>
    <!-- 方案导入弹框 -->
    <plan-import-dialog 
      ref="planImportdDialog"
      :planImportDialogShow.sync="planImportDialogShow"
      :section="section"
      @importPlan="importPlan"
      ></plan-import-dialog>
  </div>
</template>
<script>
  import * as layerUtils from 'app/utils/layerUtils'
  import DataHandle from 'app/utils/dataHandle'
  import Common from '../../api/common.js'
  import planNamedDialog from './planNamedDialog'
  import planImportDialog from './planImportDialog'
  export default {
    data(){
      return {
        multiDialogShow:false,
        searchInput:'',
        dataReal:[],
        multipleSelection: [],
        pageIndex: 1,//当前页
        pageSize: 150,//每页大小
        planSaveDialogShow: false, // 保存方案输入方案名弹框
        planImportDialogShow: false, // 导入方案弹框弹框
      }
    },
    props:{
      show: {
        type: [Boolean, String],
        default: false
      },
      tableData:Array,//表格数据
      title:String,//标题
      isShortTable:Boolean,//是否是小表格
      isPaging: { //是否分页
        type: Boolean,
        default: false
      },
      section: { // 方案模块名
        type: String,
        default: ''
      }
    },
    created(){
      this.$nextTick(_=>{
        //  alert(11)
      })
    },
    watch:{
    },
    computed: {
      //当前页显示的相关项目数据
      currentPageItemData() {
        return this.filterData.slice(
          this.pageSize * (this.pageIndex - 1),
          this.pageSize * this.pageIndex
        );
      },
      filterData() {
        let str = this.searchInput.toLowerCase();
        return str === '' ? this.sortTableData : this.sortTableData.filter(item => {
          return (""+item.CODE).includes(this.searchInput) || 
                (""+item.NAME).toLowerCase().includes(str) ||
                (""+item.MEMCODE1).toLowerCase().includes(str) ||
                (""+item.MEMCODE2).toLowerCase().includes(str) ||
                (""+item.INSTID).toLowerCase().includes(str);
        });
      },

      sortTableData() { // 将项目列表重新排序，check的为true的置于最前，并打钩
        let list = JSON.parse(JSON.stringify(this.dataReal));
        // 用来存放所有需要打钩行的下标
        let indexs = [];
        let checkedList = []; //用来存放所有需要打钩的项
        this.dataReal.forEach((item, index) => {
          if (item.checked) {
            indexs.push(index);
            checkedList.push(...list.splice(index - checkedList.length, 1));
          }
        });
        this.$nextTick(_ => {
          checkedList.forEach(item => {
            this.$refs.itemTable.toggleRowSelection(item, true);
          });
        });
        return checkedList.concat(list);
      },
    },
    methods:{

      selectionChange(val){
        this.multipleSelection=val;
      },

      //打开弹框
      open(){
        this.$nextTick(_=>{
          this.pageIndex = 1
          this.searchInput="";
          this.$refs.multiSearch.$refs.input.select()
          this.$refs.itemTable.clearSelection();
          this.dataReal=JSON.parse(JSON.stringify(this.tableData));
          // console.log(this.dataReal)
        
        });
      },
      //关闭弹框
      close(){
        this.$emit('update:show', false);
      },
      certain(){
        this.$emit('certain',this.multipleSelection);
        this.$emit('update:show', false);
      },
      /********保存方案 *********/
      /**保存方案弹框关闭 */
      closePlanSave() {
        this.planSaveDialogShow = false
      },
      /**保存方案弹框显示 */
      showSavePlanDialog() {
        if(!this.multipleSelection.length) {
          layerUtils.showMessage('请选择需保存的项目', layerUtils.messageType.WARNING)
          return
        }
        this.planSaveDialogShow = true
      },
      /**保存方案 */
      savePlan(name) {
        let _value = this.multipleSelection.map(item => item.CODE).join(',')
        let _comment = this.multipleSelection.map(item => item.CODE + ':' +item.NAME).join(',')
        let params = {
          section: this.section,
          entryCode: name,
          value: _value,
          comment: _comment
        }
        Common.savePlan(params).then(data => {
          DataHandle(data).then(data => {
            layerUtils.showMessage(data.message, layerUtils.messageType.SUCCESS)
            this.closePlanSave()
          }).catch(() => {
            this.$refs.planNamedDialog.openPlanSave()
          })
        })
      },
      /*******导入方案 ********/
      importPlan(item) {
        this.planImportDialogShow = false
        this.$refs.itemTable.clearSelection()
     
        let planCodeArr = item.VALUE.split(',')
        this.dataReal.forEach(item => {
          item.checked = false
        })
        let dataReal = JSON.parse(JSON.stringify(this.dataReal))
        planCodeArr.forEach(item => {
          let exist = dataReal.find(item2 => {
            return item == item2.CODE
          })
          if(exist) {
            this.$set(exist, 'checked', true)
          }
        })
        this.dataReal = JSON.parse(JSON.stringify(dataReal))
      }
    },
    components: {
      planNamedDialog,
      planImportDialog
    }
  }
</script>

<style lang="stylus">
  .multi-daialog {
    .el-dialog{
      height 500px !important
      width 600px !important
    }
    .multi-top {
      padding: 10px 0;
      .multi-search {
        width 200px
      }
      .plan-wrapper {
        float right
      }
    }
    .el-dialog__body {
      padding: 0 15px 0 !important;
      height:calc(100% - 97px)
    }
    .el-table {
      height calc(100% - 46px) !important
      border: 1px solid #e3e3e3;
    }
    .bottom {
      display flex
      justify-content space-between
      height 50px
      line-height 50px
      overflow hidden
      // .summary {
      //   margin-top: 6px;
        .summary-item {
          color: red;
          font-weight 700
          font-size: 14px;
        // }
      }
      .el-pagination {
        display inline-block
        height: 28px;
        line-height: 28px;
      }
    }
  }
  .named-plan-dialog
    .el-dialog
      width 340px
      height 180px
      .content-wrapper
        padding 20px 10px
        .btn-wrapper
          margin-top 30px
          text-align right
</style>
