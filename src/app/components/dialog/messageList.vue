<!--
* @author: w_sh
* @date: 2018/09/12
* @module:
* @explain:多信息提示弹窗
-->

<template>
  <span class="thisMessageList">
    <el-dialog
    :title="listData.title"
    size="tiny"
    :modal-append-to-body="false"
    :before-close="close"
    :modal="true"
    class="common-dialog"
    :visible.sync="show"
    >
    <div class="tableBodyBox">
      <div class="messageMain">{{listData.subtitle}}</div>
      <el-table :data="listData.messagedate" :row-class-name="addClass">
        <el-table-column label="状态" align="center" width="65">
          <template slot-scope="scope">
            <i v-if="scope.row.type == 'pass'" class="iconfont icon-pass"></i>
            <i v-else-if="scope.row.type == 'error'" class="iconfont icon-error"></i>
            <i v-else-if="scope.row.type == 'confirm'" class="iconfont icon-confirm"></i>
            <i v-else-if="scope.row.type == 'validate'" class="iconfont icon-verification"></i>
          </template>
        </el-table-column>
        <el-table-column property="message" width="538" label="提示描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="scope.row.type == 'error' ? 'errorColor' : ''">{{scope.row.message}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <span class="determineBtn" @click="pass(scope.row,scope.$index)" v-if="scope.row.type == 'confirm'">确定</span>
            <span class="passColor" v-else-if="scope.row.type == 'pass'">已通过</span>
            <span class="errorColor" v-else-if="scope.row.type == 'error'">未通过</span>
            <span class="verificationBtn" @click="verification((scope.$index))" v-else-if="scope.row.type == 'validate'">验证</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button class="fr" @click="lookMore(listData.url)">查看详情</el-button> -->
      <el-button type="primary" @click="submit" :disabled='disabled'>继 续</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
  <user-verify
    :show.sync="open"
    :valid-for="validfor"
    @checkValid="checkValid"
    >
    </user-verify>
  </span>
</template>
<script>
  import UserVerify from './UserVerify'
  import commonDataApi from "@/app/api/common";

  export default {
    components: {
      UserVerify
    },
    data() {
      return {
        disabled: true, // 继续按钮，默认状态禁用
        listIndex: 0,
        open: false, // 验证弹窗开关
        conformList:[],//存放type=conform类型的提示信息
        validUser:null
      }
    },
    props: {
      show: {
        type: [Boolean, String],
        default: false
      }, // 控制弹窗是否显示
      defaultValidUser:{
        type: Object,
        default: function(){
          return null;
        }
      },
      //作用默认为用户确认，审核的时候为VERIFY
      validfor:{
        type: String,
        default: 'USER'
      },
      listData: { // list列表数据
        title: {
          type: String,
          default: ''
        },
        subtitle: {
          type: String,
          default: ''
        },
        url: {
          type: String,
          default: ''
        },
        messagedate: [{
          type: {
            type: String,
            default: ''
          },
          message: {
            type: String,
            default: ''
          },
          disabled: {
            type: Boolean,
            default: false
          },
        }]

      },
    },
    mounted() {

    },
    computed: {

    },
    watch: {
      show(val) {
        this.disabled = true;
        this.validUser = this.defaultValidUser;
        this.conformList=[];
      },
      listData(val){
        let exist=val.messagedate.some(item =>{
          return item.type==='error'
        });
        if(exist){
          val.messagedate.forEach(item1 =>{
           if(item1.type==='confirm'){
             this.$set(item1,'disabled',true);
           }
          })
        }
      }
    },
    methods: {
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
      /** 点击继续 */
      submit() {
        this.validUser=null;
        this.$emit('keepOn',this.conformList);
        this.$emit('update:show', false);
      },
       /*查看详情*/
      lookMore(url) {
        this.$emit('openMore', url);
      },
       /* 确定通过当前记录，高亮下一记录 */
      pass(row,index) {
          console.log(row)
        if(row.disabled){
          return;
        }
        this.conformList.push(row);
        this.listData.messagedate[index].type = 'pass';
        if (index < this.listData.messagedate.length - 1) {
          this.listData.messagedate[index+1].disabled = false;
        }
        if (this.listData.messagedate.length ==  index + 1) {
          this.disabled = false;
        }else{
          this.disabled = false;
          
        }
        this.disabled = false;
        this.listData.messagedate.forEach(item=>{
               if(item.type != 'pass'){
                this.disabled = true;
              }
          })
      },
      /** 验证用户框 */
      verification(index) {
        this.listIndex = index;
        if(!this.validUser){
          this.open = true;
          return;
        }
        this.pass(this.listData.messagedate[this.listIndex],this.listIndex);
      },
      /*验证返回信息*/
      checkValid(data) {
        if(data.type == "NOTVERIFY") {
          return;
        }
        this.validUser = data;
        this.pass(this.listData.messagedate[this.listIndex],this.listIndex);
      }
    }
  }
</script>

<style lang="stylus">
.thisMessageList
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
  .el-table__body-wrapper
    height calc(100% - 31px)
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
