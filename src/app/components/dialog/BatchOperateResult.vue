<!--
* @author: zhouhuan
* @date: 2018/05/20
* @module: 选择报告备注
-->
<template>
<div>
  <el-dialog
    :title="title"
    :close-on-click-modal='false'
    :visible.sync="show"
    :before-close="close"
    :modal-append-to-body="false"
    class="batchOperateMessageList common-dialog">
    <div class="remark-result">
      <div class="messageMain">共选择{{listData.TOTAL}}份报告,<span class="successType">{{listData.SUCCESSNUM}}</span>份成功，<span class="failtType">{{listData.FAILTNUM}}</span>份失败，失败内容如下：</div>
    </div>
    <div class="details-wrapper">
      <div class="parent-class-wrapper">
        <ul v-scroll>
          <li v-for="(item, index) in showData" :key="index" 
            @click="toggleClass(item, index)"
            :class="[parentClass===index ? 'active' : '', 'ellipsis']">
            <!-- {{item.SLAVENAME}} -->
            <ellipsis-lable >
              <i v-if="item.CANVERIFY" class="iconfont icon-pass" title="校验通过"></i>
              <i v-else-if="checkHasError(item)" class="iconfont icon-error" title="校验不通过"></i>
              {{item.TITLE}}
            </ellipsis-lable>

          </li>
        </ul>
      </div>
      <div class="child-class-wrapper">
        <el-table :data="currentData"
          fit 
          :row-class-name="addClass">
          <el-table-column label="状态" align="center" width="65">
            <template slot-scope="scope">
              <i v-if="scope.row.type == 'pass'" class="iconfont icon-pass"></i>
              <i v-else-if="scope.row.type == 'error'" class="iconfont icon-error"></i>
              <i v-else-if="scope.row.type == 'confirm'" class="iconfont icon-confirm"></i>
              <i v-else-if="scope.row.type == 'validate'" class="iconfont icon-verification"></i>
            </template>
          </el-table-column>
          <el-table-column property="message"  label="提示描述" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="scope.row.type == 'error' ? 'errorColor' : ''">{{scope.row.message}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <span class="determineBtn" :class="{'hasError':hasError}" :title="hasError?'有未通过的校验':''" @click="!hasError && pass(scope.row,scope.$index)" v-if="scope.row.type == 'confirm'">{{hasError?"":"确定"}}</span>
              <span class="passColor" :class="{'hasError':hasError}" :title="hasError?'有未通过的校验':''" v-else-if="scope.row.type == 'pass'">已通过</span>
              <span class="errorColor" :title="hasError?'有未通过的校验':''" v-else-if="scope.row.type == 'error'">未通过</span>
              <span class="verificationBtn" :class="{'hasError':hasError}" :title="hasError?'有未通过的校验':''" @click="!hasError && verification((scope.$index))" v-else-if="scope.row.type == 'validate'">{{hasError?"":"验证"}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button class="fr" @click="lookMore(listData.url)">查看详情</el-button> -->
      <el-button type="primary" @click="submit" :disabled='!canContinueVerify'>继 续</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
    
  </el-dialog>
  <user-verify
    :show.sync="open"
    valid-for="verify"
    @checkValid="checkValid"
  >
  </user-verify>
</div>
</template>
<script>

  import DataHandle from '@/app/utils/dataHandle'
  import UserVerify from './UserVerify'
  import selectReason from '@/app/components/dialog/selectReason.vue'
  export default {
    data() {
      return {
        filterValue: '', // 搜索输入
        remarkPopoverShow: false, // 选择报告备注显示隐藏
        remarkText: '', // 手输备注
        reasonForm: { // 报告备注明细弹框form
          classcode: '报告备注',
          slavename: '',
          memcode1: '',
          memcode2: ''
        },
        parentClass: 0, // 当前备注大类index
        dynamicTagsAdvice: [], // 已选备注明细
        showInput: false, // 是否显示输入框
        input: '',
        parentList: [], // 左侧报告备注大类
        reasonList: [] ,// 右侧备注明细
        reportRemarkList: [],//已收藏的列表
        marking: true, // 控制收藏
        currentData:[],
        validUser:null,
        open: false, // 验证弹窗开关
        conformList:[],//存放type=conform类型的提示信息
      }
    },
    props: {
      show: {
        type: [Boolean, String],
        default: false
      }, // 控制弹窗是否显示

      title: {
        type: String,
        default: ''
      },
      listData: {
        type: Object,
        default: function(){
          return {};
        }
      },
      //作用默认为用户确认，审核的时候为VERIFY
      validfor:{
        type: String,
        default: 'USER'
      },
    },
    components: {
      UserVerify
    },
    mounted() {

    },
    computed: {
      
      showData(){
        let arr = this.listData.FAILTDETAILLIST || [];
        let compare = function (x, y) {//比较函数
          let xVal = parseInt(x.TECHNO),yVal = parseInt(y.TECHNO);
            if (xVal < yVal) {
                return -1;
            } else if (xVal > yVal) {
                return 1;
            } else {
                return 0;
            }
        }
        return arr.sort(compare)
      },
      canContinueVerify(){
        if(!this.listData){
          return false;
        }

        if(!this.listData.FAILTDETAILLIST){
          return false;
        }
        let confirmData = this.listData.FAILTDETAILLIST.filter((it,idx)=>{
          return it.CANVERIFY == true;
        })

        if(confirmData && confirmData.length>0){
          return true;
        }
        return false;
      },
      hasError(){
        let findNoPass = this.currentData.some((it)=>{
          return it.type == 'error';
        })
        return findNoPass;
      }
    },
    watch: {
      show(val) {
        if(val){
          if(this.listData.FAILTDETAILLIST.length>0){
            this.toggleClass(this.listData.FAILTDETAILLIST[0],0);
          }
        }
      },
    },
    methods: {
      checkHasError(item){
        let arr = item.FAILTDETAILLIST;
        let findError = arr.some((it)=>{
          return it.type == 'error';
        })
        return findError;
      },
      addClass(row, rowIndex){
        if (row.disabled) {
          return 'topBox';
        }
      },
      /*弹窗关闭事件*/
      close() {
        this.$emit('update:show', false);
        this.$emit('close');
      },
       /**大类切换*/
      toggleClass(item, index) {
        this.parentClass = index
        let type= index == 0 ? 1:0
        this.currentData = this.listData.FAILTDETAILLIST[index].FAILTDETAILLIST;
      },
      /* 确定通过当前记录，高亮下一记录 */
      pass(row,index) {
          console.log(row)
        if(row.disabled){
          return;
        }
        this.conformList.push(row);
        this.currentData[index].type = 'pass';
        if (index < this.currentData.length - 1) {
          this.currentData[index+1].disabled = false;
        }

        let findNoPass = this.currentData.some((it)=>{
          return it.type != 'pass';
        })

        if(findNoPass){
          this.$set(this.listData.FAILTDETAILLIST[this.parentClass],"CANVERIFY",false)
        }else{
          this.$set(this.listData.FAILTDETAILLIST[this.parentClass],"CANVERIFY",true)
          this.parentClass++;
          if(this.parentClass<=this.listData.FAILTDETAILLIST.length-1){
            this.toggleClass(this.listData.FAILTDETAILLIST[this.parentClass],this.parentClass);
          }
        }
      },
      /** 验证用户框 */
      verification(index) {
        this.listIndex = index;
        if(!this.validUser){
          this.open = true;
          return;
        }
        this.pass(this.currentData[this.listIndex],this.listIndex);
      },
      /*验证返回信息*/
      checkValid(data) {
        if(data.type == "NOTVERIFY") {
          return;
        }
        
        this.validUser = data;
        this.pass(this.currentData[this.listIndex],this.listIndex);
      },
      /** 点击继续 */
      submit() {
        this.validUser=null;
        this.$emit('keepOn',this.listData.FAILTDETAILLIST);
        this.$emit('update:show', false);
      },
    }
  }
</script>
<style lang="stylus" scoped>
.hasError
  cursor not-allowed !important
  color #ddd !important
.batchOperateMessageList
  .remark-result
    display flex
    width 100%
    margin-bottom 8px
  .details-wrapper
    height calc(100% - 38px)    
    display flex
    .parent-class-wrapper
      width 200px
      height 100%
      margin-right 10px
      border-radius 4px
      background #F0F0F0
      font-size 12px
      ul
        overflow auto
        height calc(100% - 15px)
        li
          position relative
          height 32px
          line-height 32px
          padding-left 10px
          cursor pointer
          &.active
            background #fff
          &:last-child
            padding-right 2px  
    .child-class-wrapper
      flex 1  
      padding 5px
      background #ffffff
      border 1px solid #ddd
      border-radius 4px
      height 100%
</style>
<style lang="stylus">
.batchOperateMessageList
  .el-dialog__body
    height calc(100% - 86px)
    .remark-input 
      .el-input__inner
        border none 
        outline none 
        box-shadow none
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
.batchOperateMessageList
  .fr
    float left
    margin-left 10px
  
  .tableBodyBox
    height 300px
    border 1px solid #eee
    background #fff
    overflow-y hidden
  .messageMain
    padding 10px
    font-weight bold
    .successType
      color blue
      font-size 16px
      padding 0 2px
    .failtType
      color red
      font-size 16px
      padding 0 2px
.batchOperateMessageList
  .fr
    float left
    margin-left 10px
  .el-dialog--tiny
      width: 700px
  .tableBodyBox
    border 1px solid #eee
    background #fff
    overflow-y hidden
  .el-table
    border-left none
    border-top 1px solid #eee
    border-right none
  .el-dialog__body,.el-dialog__footer
    background rgb(243,243,243)!important
  .icon-pass
    color rgb(42,165,21)
    
  .icon-error
    color rgb(216,30,6)
  .icon-confirm
    color rgb(239,179,54)
  .icon-verification
    color rgb(18,150,219)
  .el-table th, .el-table td
    height 30px
  .el-table th > .cell
    background #f9f9f9
  .messageMain
    padding 10px
    font-weight bold
  .determineBtn
    color rgb(41,174,61)
    cursor pointer
  .errorColor
    color #ff0000
    font-weight bold
  .passColor
    color #bcbcbc
  .verificationBtn
    color rgb(8,103,231)
    cursor pointer
  .determineBtn:hover,.verificationBtn:hover
    text-decoration underline
  .el-table 
    height 100% !important
    .el-table__body-wrapper
      height calc(100% - 30px) !important
      overflow auto 
  .el-table__header-wrapper>table
    width 100% !important
  .el-table__body-wrapper:after,.el-table__header-wrapper:after
    content ''
    height 100%
    width 1px
    position absolute
    right 0
    background #fff
    top 0
    z-index 1000
  .topBox td:after
    content ''
    width 100%
    height 100%
    position absolute
    left 0
    top 0
    z-index 1000
    background rgba(255,255,255,0.6)
</style>

