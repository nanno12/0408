/*
 * 表格信息
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-24 16:34:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-03 14:33:04
 */
<template>
  <div class="left-info-wrap">
    <!-- 用户验证信息 -->
    <div class="verify-box">
      <div class="user-info">
        <span class="unverify" v-if="!userInfo.logCode">未验证</span>
        <span v-else class="verifyed">{{userInfo.userName}} ({{userInfo.logCode}})</span>
      </div>
      <div class="avter" @click="userVerify('avter')"><i class="iconfont iconweibiaoti-_huaban"></i></div>
    </div>
    <!-- 表格区域 -->
    <main class="table-wrap">
      <w-table
        border
        ref="wtableRef"
        class="short-table"
        :data="tableData"
        highlight-current-row
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <template v-for="(item)  in tableTitle">
          <w-table-column v-if="item.type == 'selection'" type="selection" :width="item.width" :key="item.name"></w-table-column>
          <!-- 状态 -->
          <w-table-column
            v-else-if="item.name == 'APPROVAL_FLAG'"
            :sortable="item.sortable"
            :prop="item.name"
            :width="item.width"
            :show-overflow-tooltip="true"
            :label="item.label"
            :key="item.name">
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <span :class="[scope.row.APPROVAL_FLAG == '待审核' ? 'audit' : (scope.row.APPROVAL_FLAG == '已审核' || scope.row.APPROVAL_FLAG == '审核完成') ? 'audited' : scope.row.APPROVAL_FLAG == '待二审' ? 'second-instance' : 'three-instance']">
                {{scope.row.APPROVAL_FLAG}}
              </span>
            </template>
          </w-table-column>
          <!-- 输血指征 -->
          <w-table-column
            v-else-if="item.name == 'IFREASONABLE'"
            :sortable="item.sortable"
            :prop="item.name"
            :width="item.width"
            :show-overflow-tooltip="true"
            :label="item.label"
            :key="item.name"
            align="center">
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <el-tooltip :disabled="true" :content="scope.row.FAILTREASON" placement="top">
                <!-- 1：成功 -->
                <template v-if="scope.row.IFREASONABLE">
                  <i class="iconfont w-icon-success"></i>
                </template>
                <!-- 0：失败 -->
                <template v-else>
                  <w-popover
                    placement="right-start"
                    popper-class="popover-wrap"
                    trigger="click">
                    <div class="popover-body">
                      <w-table
                        border
                        :data="scope.row.TRIGGERLIST"
                        style="width:100%"
                        class="short-table">
                        <w-table-column
                          prop="ITEMNAME"
                          label="输血成分"
                          width="120"
                          show-overflow-tooltip>
                        </w-table-column>
                        <w-table-column
                          prop="CONDITION"
                          label="输血指征"
                          width="150"
                          show-overflow-tooltip>
                        </w-table-column>
                        <w-table-column
                          prop="ADVICE"
                          label="合理性"
                          width="80"
                          show-overflow-tooltip>
                          <template slot-scope="scope">
                            <span :class="[scope.row.ADVICE == '不合理' ? 'r-color' : 'g-color']">
                                {{scope.row.ADVICE}}
                            </span>
                          </template>
                        </w-table-column>
                      </w-table>
                    </div>
                    <i class="iconfont w-icon-warning" slot="reference"></i>
                  </w-popover>
                </template>
              </el-tooltip>
            </template>
          </w-table-column>
          <!-- 24h申请量 -->
          <w-table-column
            v-else-if="item.name == 'ONEDAYAPPBLOOD'"
            :sortable="item.sortable"
            :prop="item.name"
            :width="item.width"
            :show-overflow-tooltip="true"
            :label="item.label"
            :key="item.name">
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <w-popover
                placement="right-start"
                popper-class="popover-wrap"
                trigger="click">
                <div class="popover-body">
                  <w-table
                    border
                    :data="scope.row.REQUESTLIST"
                    style="width:100%"
                    class="short-table">
                    <w-table-column
                      prop="MOULD_ITEM_NAME"
                      label="申请项目"
                      width="100"
                      show-overflow-tooltip>
                    </w-table-column>
                    <w-table-column
                      prop="APPLY_AMOUNT"
                      label="申请量"
                      width="80"
                      show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span>{{scope.row.APPLY_AMOUNT}}{{scope.row.MOULD_ITEM_UNIT}}</span>
                      </template>
                    </w-table-column>
                    <w-table-column
                      prop="CREATE_TIME"
                      label="申请时间"
                      width="150"
                      show-overflow-tooltip>
                    </w-table-column>
                  </w-table>
                </div>
                <span :class="['application-volume',scope.row.APPROVAL_FLAG == '待审核' ? 'audit' : (scope.row.APPROVAL_FLAG == '已审核' || scope.row.APPROVAL_FLAG == '审核完成') ? 'audited' : scope.row.APPROVAL_FLAG == '待二审' ? 'second-instance' : 'three-instance']" slot="reference">{{scope.row.ONEDAYAPPBLOOD}}</span>
              </w-popover>
            </template>
          </w-table-column>
          <w-table-column
            v-else
            :sortable="item.sortable"
            :prop="item.name"
            :width="item.width"
            :show-overflow-tooltip="true"
            :label="item.label"
            :key="item.name">
          </w-table-column>
        </template>
      </w-table>
    </main>
    <footer class="bottom">
      <div class="bottom-paging">
        <span class="total">共<i>{{tableData.length}}</i>条</span>
        <w-pagination
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout="prev, pager, next"
          v-show='tableData.length > pageSize'
          :total="tableData.length"
          @actived-change="handleActivedChange">
        </w-pagination>
      </div>
       <div class="operate-button">
          <w-button>打印申请单</w-button>
          <w-button v-if="queryObj.examinstatus != 'unchecked'">打印审批单</w-button>
          <w-button type="warning" v-if="queryObj.examinstatus != 'unchecked'" @click="revokeClick">撤销审核</w-button>
          <w-button type="primary" v-if="queryObj.examinstatus != 'checked'" @click="approvalClick">审 核</w-button>
        </div>
    </footer>
    <!-- 用户验证 -->
    <user-verify :show.sync="showUserVerify"
                continueuse="true"
                :modalAppendToBody="false"
                @checkValid="checkUserValid">
    </user-verify>
  </div>
</template>
<script>
import * as layerUtils from 'app/utils/layerUtils'
import dataApi from '../api/api.js';
import { bloodaudit  } from '@/app/utils/tableName';
import UserVerify from "@/app/components/dialog/UserVerify.vue";
export default {
  components: {
    UserVerify
  },
  data() {
    return {
      // 分页每页显示数量
      pageSize: 300,
      // 当前页
      pageIndex: 1,
      // 表头
      tableTitle: [
        {name: 'selection', type: 'selection', label: 'selection', width: '40', checked: true, fixed: ''},
        {name: 'MOULD_NAME', label: '申请类型', width: '120', checked: true, fixed: '', sortable: false},
        {name: 'APPROVAL_FLAG', label: '状态', width: '80', checked: true, fixed: '', sortable: false},
        {name: 'PATIENT_NAME', label: '姓名', width: '80', checked: true, fixed: '', sortable: false},
        {name: 'BED_NO', label: '床位', width: '60', checked: true, fixed: '', sortable: false},
        {name: 'IFREASONABLE', label: '输血指征', width: '70', checked: true, fixed: '', sortable: false},
        {name: 'ONEDAYAPPBLOOD', label: '24H申请量', width: '90', checked: true, fixed: '', sortable: false},
        {name: 'TRANSFUSION_TIME', label: '用血时间', width: '150', checked: true, fixed: '', sortable: true},
        {name: 'OPERATOR_NAME', label: '申请医生', width: '80', checked: true, fixed: '', sortable: false},
        {name: 'CREATE_TIME', label: '申请时间', width: '150', checked: true, fixed: '', sortable: true},
        {name: 'APPLYDEPT_NAME', label: '申请科室', width: '100', checked: true, fixed: '', sortable: false},
        {name: 'WARD_NAME', label: '病区', width: '120', checked: true, fixed: '', sortable: false},
        {name: 'TRANSFUSION_PURPOSE', label: '输血目的', width: '120', checked: true, fixed: '', sortable: false},
        {name: 'ABO_GROUP', label: 'ABO', width: '60', checked: true, fixed: '', sortable: false},
        {name: 'RHD_GROUP', label: 'RHD', width: '80', checked: true, fixed: '', sortable: false},
        {name: 'ITEM_NAME2', label: '上级审批人', width: '100', checked: true, fixed: '', sortable: false},
        {name: 'TRANSBLOODIDICATIO4', label: '上级审批时间', width: '150',checked: true, fixed: '', sortable: true},
      ],
      // 勾选项
      multipleSelection: [],
      /** 显示用户验证窗体*/
      showUserVerify: false,
      validUser: null,
      verifyContinueUseModel: false, //是否延用用户验证
      // 用户信息
      userInfo: {
        logCode: '',
        userName: '',
        userId: ''
      },
      // 操作-验证类型
      verifyType: 'avter'
    };
  },
  props: {
    queryObj: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 表格数据
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
  },
  computed: {
  },
  watch: {
    // 监听表格数据
    tableData(val) {
      if(val.length > 0) {
        this.$refs.wtableRef.setCurrentRow(val[0]);
        this.rowClick(val[0]);
      }else {
        this.$emit('getLisItemList', {});
        this.$emit('getItemFlow', {});
      }
    }
  },
  created() {
   this.$nextTick(() => {
    //  针对审核
    document.addEventListener('mousemove',this.mouseMove)
    document.addEventListener('keydown',this.keyDown)
    setInterval(() => {
        let now = new Date().getTime();
        if( now -  this.mouseLastMove > 60000 ) {
          this.userInfo.logCode = '';
          this.userInfo.userName = '';
          this.userInfo.userId = '';
        }
      },1000)
   })
  },
  mounted() {
  },
  methods: {
    // 监听有无有无操作
    mouseMove() {
      this.mouseLastMove = new Date().getTime();
    },
    keyDown() {
      this.mouseLastMove = new Date().getTime();
    },
    /** 点击表格当前行 */
    rowClick(row) {
      console.log(row)
      this.$emit('getLisItemList', row);
      this.$emit('getItemFlow', row);
    },
    /** 改变页码 */
    handleActivedChange(val) {
      console.log(val)
      this.pageIndex = val;
    },
     /**选择项发生变化时事件 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /** 用户验证 */
    userVerify(type) {
      this.verifyType = type;
      this.showUserVerify = true;
    },
    /** 验证 */
    checkUserValid(payLoad) {
      if (payLoad.type == "VERIFY") {
        this.userInfo.logCode = payLoad.data.LOGCODE;
        this.userInfo.userName = payLoad.data.USERNAME;
        this.userInfo.userId = payLoad.data.USERID;
        // 审核操作
        if(this.verifyType == 'approvalClick') {
          this.requestApproval();
          // 撤销审核操作
        }else if(this.verifyType == 'revokeClick') {
          this.requestRevocationApproval();
        }
      }
    },
    /** 点击审核按钮 */
    approvalClick() {
      if (this.multipleSelection.length == 0) {
        layerUtils.showMessage("请选择需要审核的项目", layerUtils.messageType.WARNING);
        return;
      }
      if(this.userInfo.logCode =='' || this.userInfo.userName == '') {
        // 需要验证身份
        layerUtils.showMessage("请先验证用户信息",layerUtils.messageType.WARNING);
        this.userVerify('approvalClick');
      }else {
        // 审核
        this.requestApproval();
      }
    },
    /** 审核 */
    requestApproval() {
      let params = {
        //  申请列表
        requestlist: this.multipleSelection,
        // 审批医生工号
        doctorcode: this.userInfo.userId,
        // 审批医生姓名
        doctorname: this.userInfo.userName,
        // 打印状态 暂时传空
        printstatus: '',
        // 备注 暂时传空
        remark: ''
      }
      dataApi.requestApproval(params).then(data => {
        if(data.type == 'SUCCESS') {
          this.$refs.wtableRef.setCurrentRow();
          if(data.data && data.data.length > 0) {
            this.multipleSelection.map(item1 => {
              data.data.forEach(item2 => {
                if(item1.LIST_NO == item2.LIST_NO) {
                  this.$set(item1,'APPROVAL_FLAG',item2.APPROVAL_FLAG);
                  Object.assign({},item1,item2);
                }
              });
            });
            // 更新右侧提示信息
            this.$refs.wtableRef.setCurrentRow(this.multipleSelection[0]);
            this.rowClick(this.multipleSelection[0]);
          }
          this.$message({message: '审核成功',type: 'success'});
        }else {
          this.$message({message: '审核失败',type: 'error'});
        }
      }).finally(() => {
      })
    },
    /** 点击撤销审核按钮 */
    revokeClick() {
      if (this.multipleSelection.length == 0) {
        layerUtils.showMessage("请选择需要撤销审核的项目", layerUtils.messageType.WARNING);
        return;
      }
      layerUtils.showMessage("请先验证用户信息",layerUtils.messageType.WARNING);
      this.userVerify('revokeClick');
    },
    /** 撤销审核 */
    requestRevocationApproval() {
      let params = {
        //  申请列表
        requestlist: this.multipleSelection,
        // 审批医生工号
        doctorcode: this.userInfo.userId,
        // 审批医生姓名
        doctorname: this.userInfo.userName,
        // 打印状态 暂时传空
        printstatus: '',
        // 备注 暂时传空
        remark: ''
      }
      dataApi.requestRevocationApproval(params).then(data => {
        if(data.type == 'SUCCESS') {
          this.$refs.wtableRef.setCurrentRow();
          if(data.data && data.data.length > 0) {
            this.multipleSelection.map(item1 => {
              data.data.forEach(item2 => {
                if(item1.LIST_NO == item2.LIST_NO) {
                  this.$set(item1,'APPROVAL_FLAG',item2.APPROVAL_FLAG);
                  Object.assign({},item1,item2);
                }
              });
            });
            // 更新右侧提示信息
            this.$refs.wtableRef.setCurrentRow(this.multipleSelection[0]);
            this.rowClick(this.multipleSelection[0]);
          }
          this.$message({message: '撤销审核成功',type: 'success'});
        }else {
          this.$message({message: '撤销审核失败',type: 'error'});
        }
      }).finally(() => {
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.left-info-wrap
  width 100%
  height 100%
  padding 0 10px
  .verify-box
    width 150px
    height 45px
    position absolute
    top 0
    right 20px
    display flex
    justify-content space-between
    align-items center
    font-weight 600
    .user-info
      font-size 14px
      .unverify
        color #a9567f
      .verifyed
        color #0F49ED
    .avter
      color #0F49ED
      .iconfont
        font-size 20px
  .table-wrap
    height calc(100% - 95px)
    .application-volume
      text-decoration underline
      cursor pointer
  .bottom
    height 50px
    line-height 50px
    text-align center
    background #fff
    overflow hidden
    display flex
    justify-content space-between
    .bottom-paging
      display flex
      .w-pagination-wrapper
        margin-top 10px !important
        margin-left 8px
      .total
        i
          color #f00
          font-weight 700
          font-size 14px
          padding 0 3px
    .operate-button
      .w-button:last-child
        width 80px
  .w-icon-success
    color #5DB730 !important
  .w-icon-warning
    color #ff0015 !important
  // 待审核
  .audit
    color #FF9F00
  // 已审核
  .audited
    color #5DB730
  // 待二审
  .second-instance
    color #F52C2C
  // 待三审
  .three-instance
    color #9013FE
</style>

<style lang="stylus">
.popover-wrap
  .popover-body
    padding-top 10px
    .w-table
      font-size 12px
      th>.cell,td>div
        font-size 12px
        padding 0 8px
      th,td
        padding 0
</style>