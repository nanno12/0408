<!--
* @author: zhouhuan 
* @date: 2019/11/06
* @explain: 方案命名弹框
-->

<template>
  <div>
    <el-dialog
      title="保存方案名称"
      top="25%"
      :before-close="closePlanSave" 
      @open="openPlanSave"
      :modal-append-to-body="true"
      class="common-dialog named-plan-dialog"
      :visible.sync="planSaveDialogShow">
      <div class="content-wrapper">
        <div class="input-wrapper">
          <el-input ref="namedPlan" v-model="namedPlan" placeholder="请输入要保存的统计方案的名称"></el-input>
        </div>
        <div class="btn-wrapper">
          <el-button type="primary" @click="savePlan">确定</el-button>
          <el-button @click="closePlanSave">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as layerUtils from 'app/utils/layerUtils'
  export default {
    data(){
      return {
        namedPlan: '' // 保存方案弹框输入方案名
      }
    },
    props:{
      planSaveDialogShow: {  // 保存方案输入方案名弹框
        type: [Boolean, String],
        default: false
      }
    },
    watch: {
      planSaveDialogShow(val) {
        if(!val) {
          this.namedPlan = ''
        }
      }
    },
    methods:{
      /**保存方案弹框打开 */
      openPlanSave() {
        this.$nextTick(_ => {
          this.$refs.namedPlan.$refs.input.select()
        })
      },
      /**保存方案弹框关闭 */
      closePlanSave() {
        this.namedPlan = ''
        this.$emit('update:planSaveDialogShow', false)
      },
      /**保存方案 */
      savePlan() {
        if(this.namedPlan == '') {
          layerUtils.showMessage('请输入方案名称', layerUtils.messageType.WARNING)
          this.openPlanSave()
          return
        }
        this.$emit('savePlan', this.namedPlan)
      }
    }
  }
</script>

<style lang="stylus" scoped>
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
