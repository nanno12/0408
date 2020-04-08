<!--
* @author: zhouhuan 
* @date: 2019/11/06
* @explain: 方案导入弹框
-->

<template>
  <div>
    <el-dialog
      title="选择方案"
      top="20%"
      :before-close="closePlanImport" 
      @open="openPlanImport"
      :modal-append-to-body="true"
      class="common-dialog named-plan-dialog"
      :visible.sync="planImportDialogShow">
      <el-table
        ref="elTable"
        :data="tableData"
        highlight-current-row
        class="short-table"
        @row-dblclick="dbClickRow"
        @current-change="handleCurrentChange"
        height="auto">
        <el-table-column show-overflow-tooltip prop="PARAMCODE" label="方案名称" align="left">
        </el-table-column>
        <el-table-column align="center" width="60">
          <template slot-scope="scope">
            <i class="iconfont icon-shch" title="删除" @click.stop="deleteRow(scope.row, scope.$index)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-wrapper">
        <el-button type="primary" @click="importPlan">确定</el-button>
        <el-button @click="closePlanImport">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as layerUtils from 'app/utils/layerUtils'
  import DataHandle from 'app/utils/dataHandle'
  import Common from '../../api/common.js'
  export default {
    data(){
      return {
        tableData: [], // 方案list
        selected: '', // 当前选择的方案
        currentRow: {}
      }
    },
    props:{
      planImportDialogShow: {  // 导入方案弹框
        type: [Boolean, String],
        default: false
      },
      section: {  // 方案模块名称
        type: String,
        default: ''
      },
    },
    methods:{
      /**导入方案弹框打开 */
      openPlanImport() {
        this.getPlanList()
      },
      /**获取方案列表 */
      getPlanList() {
        if(this.section == '') return 
        let params = {
          section: this.section
        }
        Common.getPlan(params).then(data => {
          DataHandle(data).then(data => {
            this.tableData = data.data || []
          }).catch(() => {
            this.tableData = []
          })
        })
      },
      /**弹框关闭 */
      closePlanImport() {
        this.$emit('update:planImportDialogShow', false)
      },
      /**点击表格当前行 */
      handleCurrentChange(row) {
        this.currentRow = row
      },
      /**删除方案 */
      deleteRow(row, index) {  
        this.$confirm(`是否确定删除方案【${row.PARAMCODE}】？`, '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.section == '') return 
          let params = {
            section: this.section,
            entryCode: row.PARAMCODE
          }
          Common.deletePlan(params).then((data) => {
            DataHandle(data).then(data => {
              this.tableData.splice(index, 1)
              layerUtils.showMessage("删除成功", layerUtils.messageType.SUCCESS)
            })
          })
        })
      },
      /**导入方案 */
      importPlan() {
        if(!this.currentRow || !this.currentRow.PARAMCODE) {
          layerUtils.showMessage("请选择需导入的方案", layerUtils.messageType.WARNING)
          return
        }
        this.$emit('importPlan', this.currentRow)
      },
      dbClickRow(row) {
        this.$emit('importPlan', row) 
      }
    }
  }
</script>

<style lang="stylus" scoped>
.named-plan-dialog
  >>>.el-dialog
    width 450px
    height 300px
    .el-dialog__body
      height calc(100% - 36px)
      .el-table
        height calc(100% - 40px)
        .el-table__body-wrapper
          overflow-x hidden
        .icon-shch
          display none 
        .el-table__row:hover
          .icon-shch
            display inline-block  
      .btn-wrapper
        margin-top 10px
        text-align right       
</style>
