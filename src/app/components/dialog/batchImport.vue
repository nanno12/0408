<!--
* @author: GUO
* @date: 2018/09/19
* @module: 批量导入
* @explain:根据数据表Lis_Item_ 导入已存在字典
-->

<template>
  <el-dialog title="批量导入"
             class="common-dialog batch-import"
             :before-close="close"
             :close-on-click-modal="false"
             @open="openInit"
             :visible.sync="show">
    <header class="top">
      <div class="input-search">
        <el-input placeholder="请输入内容"
                  ref="addInput"
                  @keyup.enter.native="filterData"
                  v-model="searchInput">
          <el-button slot="append" icon="search" @click="filterData"></el-button>
        </el-input>
      </div>
    </header>
    <el-table :data="currentPageItemData"
              ref="addTable"
              v-loading="loadObj.loadState" :element-loading-text="loadObj.loadingMsg"
              @selection-change="isChecked"
              fit
              row-key="CODE"
              height="380">
      <!--多选-->
      <el-table-column type="selection"
                       :reserve-selection="true"
                       width="65">
      </el-table-column>
      <template v-for="(item,index) in tableTitle">
        <!--标准表格-->
        <el-table-column
          :prop="item.prop"
          :width="item.width"
          :min-width="item.minWidth"
          :show-overflow-tooltip="item.showOverFlowToolTip"
          :label="item.label">

        </el-table-column>
      </template>
    </el-table>

    <div class="footer">
      <div class="footer-page">
        <span class="total" v-if="multipleSelection.length===0">共<i>
                {{tableRealData.length}}
              </i>条</span>
        <span class="total" v-else>已选<i>{{multipleSelection.length}}/
                {{tableRealData.length}}</i>条</span>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          v-show="tableRealData.length>150"
          layout=" prev, pager, next"
          :total="tableRealData.length">
        </el-pagination>
      </div>
      <div class="button-group">
        <el-button type="primary" class="certain-btn" @click="submit(tableRealData,'all')">全部导入</el-button>
        <el-button type="primary" class="certain-btn"
                   :disabled="multipleSelection.length===0"
                   @click="submit(multipleSelection,'')">导入</el-button>
        <el-button class="cancel-btn" @click="close">取消</el-button>
      </div>
    </div>

  </el-dialog>
</template>

<script>
  import DataHandle from '@/app/utils/dataHandle'
  import * as layerUtils from 'app/utils/layerUtils'

  export default {
    data() {
      return {
        loadObj: {loadState: false, loadingMsg: "正在加载中"},
        searchInput: '',//搜索关键词
        currentPage: 1,//当前页
        pageSize: 150,//每页大小
        multipleSelection: [],//多选情况下选中的数据
        selectedVal: '',//selected下拉选中的value
        tableRealData:[],//表格真实数据
        searchData:[],//用于表格真实数据
      }
    },
    props: {
      show: Boolean, //控制弹窗是否显示
      tableTitle: Array,//表格数据
      tableData:Array,//表格列表数据
    },
    created() {
    },
    watch:{
      tableData(val){
        this.tableRealData=JSON.parse(JSON.stringify(val))
        this.searchData=JSON.parse(JSON.stringify(val))
        this.loadObj.loadState = false;
      }
    },
    computed: {
      //当前页显示的相关项目数据
      currentPageItemData() {
        return this.tableRealData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
      }
    },
    methods: {
      filterData() {
        const str=this.searchInput.toUpperCase();
        if(str==''){
          this.tableRealData=this.searchData
        }else{
          this.tableRealData=this.searchData.filter(item => {
            return item.CODE.indexOf(str) >-1 || item.MEMCODE1.toUpperCase().indexOf(str) >-1||
              item.MEMCODE2.toUpperCase().indexOf(str) >-1|| item.NAME.toUpperCase().indexOf(str) >-1;
          });
        }

      },
     //打开弹框初始化数据
      openInit() {
       this.searchInput === ''
        this.$nextTick(_=>{
          this.$refs.addTable.clearSelection();
        })
        this.loadObj.loadState = true;
      },
      close() {
        this.$emit('update:show', false);
        this.searchInput = '';
      },
      isChecked(val) {
        this.multipleSelection = val;
      },
      submit(data,type) {
        if(this.tableData.length===0){
          layerUtils.showMessage('没有需要导入的数据，请关闭弹框', layerUtils.messageType.WARNING);
          return;
        }
        if(this.multipleSelection.length===0&&type===''){
          layerUtils.showMessage('请选需要导入的数据', layerUtils.messageType.WARNING);
          return;
        }
        this.$emit('change', data);
        this.$emit('update:show', false);
      },

    }
  }
</script>
<style lang="stylus" scoped>
  .batch-import {
    .footer {
      display flex
      justify-content space-between
      height: 54px;
      line-height: 54px;
      i{
        color:red;
        font-weight 700
      }
    }
  }

</style>
<style lang="stylus">
  .batch-import {
    .el-dialog__body {
      height: calc(100% - 36px)
      overflow hidden
      .el-table {
        height: calc(100% - 100px) !important
        .el-table__body-wrapper {
          height: calc(100% - 41px)

        }
      }
    }
    .top {
      padding: 10px 3px !important;
      .el-button {
        padding: 6px 12px !important
        border-radius 0 4px 4px 0
      }
      .el-input-group__append {
        border: none;
        background:#4e97ff;
        color:#fff;
      }
      .el-input-group {
        width: 30% !important;
        min-width: 240px;
        .el-input__inner {
          border-radius: 2px 0 0 2px !important;
        }
      }

    }
    .footer {
      .el-pagination {
        display inline-block
        height: 28px;
        line-height: 28px;
      }
    }
  }
</style>
