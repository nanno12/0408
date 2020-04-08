/*
 * 用户验证
 * @Author: s_xd@winning.com.cn
 * @Date: 2018-07-18 13:09:44
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-02 16:39:29
 */

<template >
<el-dialog :title="titleInfo"
          top="30%"
          height="300"
          :modal="true"
          size="tiny"
          v-model="show"
          :before-close="beforeClose"
          :close-on-click-modal="false"
          :modal-append-to-body="modalAppendToBody"
          class="common-dialog  short-table wrapper-valid-user">
    <div  >

          <el-form :model="form"  ref="ruleForm"
                   label-width="80px"
                   show-message
                   auto-complete="off"
                   class="demo-ruleForm"
                   v-focusNextOnEnter
                   >
          <el-form-item label="用户名" prop="loginno"
            :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
            <w-input
              v-model="form.loginno"
              size="small"
              ref="logInNo"
              v-focus="autoFocusAccount"
              @keydown.enter.native="handleKeyDownAccount"
              auto-complete="off"></w-input>
          </el-form-item>
          <el-form-item label="密码"
                        class="item">
            <w-input type="password" v-model="form.password"
              size="small"
              ref="pwd"
              @keydown.enter.native="handleKeyDown"
              auto-complete="off"></w-input>
          </el-form-item>

          <el-form-item class="button" v-if="showContinueuse" >
            <w-radio v-model="prolong" label="1">仅验证本报告</w-radio>
            <w-radio v-model="prolong" label="2">延用验证报告</w-radio>
          </el-form-item>

          <el-form-item class="button" v-if="false">
            <el-button :type="status.type"
                       :icon="status.statuIcon"
                       @click="submitForm('ruleForm')">{{status.confirmMessage}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
           <w-button @click="beforeClose">取 消</w-button>
           <w-button :type="status.type" @click="submitForm('ruleForm')">确 定</w-button>
        </span>
    </div>
  </el-dialog>
</template>
<script>
import commonDataApi from "@/app/api/common";
import DataHandle from "@/app/utils/dataHandle";
import * as layerUtils from "@/app/utils/layerUtils";
import * as dateUtils from "@/app/utils/dateUtils";
import resultType from "@/app/enums/resultType.js";
import * as Md5Utils from "@techCommon/utils/Md5Utils";
import {setEelementSelect} from "@/app/utils/vdom"
import dataApi from "@/modules/bloodaudit/api/api";
const STATUS ={
  RESET:"RESET",
  ERROR:"ERROR",
  SUCCESS:"SUCCESS",
  CHECKING:"CHECKING"
};
export default {
  props: {
      account:String,
      show: {
        type: Boolean,
        default: false
      },
      continueuse: {
        type: [Boolean,String],
        default: true
      },
      showContinueuse: {
        type: [Boolean,String],
        default: false
      },
      validFor: {
        type: String,
        required: false,
        default:"user",
        validator: function (value) {
            return [
                'verify',
                'user',
                'recycle'
            ].indexOf(String(value).toLowerCase()) !== -1
        }
      },
      modalAppendToBody: { //遮罩层是否插入至 body 元素上
        type: Boolean,
        default: true
      },
    },
  data() {
    return {
      form: {
        loginno: this.account ? this.account : "",
        password: ""
      },
      titleInfo: "用户确认",
      prolong: this.continueuse ? "2" : "1", //是否延用
      //自动聚焦到账号
      autoFocusAccount:true,
      status:{
        //状态类型
        type:"primary",
        //状态描述
        confirmMessage:"确定",
        //状态图标
        statuIcon:"",

      },
      //是否正在校验
      isChecking:false
    };
  },
  watch: {
    show(newVal,oldVal){
      if(newVal&&newVal!=oldVal){
        if(this.form.loginno.trim()==""){

        }
        this.setStatus(STATUS.RESET);
        if(this.form.loginno) {
          this.autoFocusAccount = false
          this.$nextTick(_ => {
            setEelementSelect(this.$refs.pwd.$el.querySelector('.el-input__inner'));
          }) 
        }else {
          this.autoFocusAccount=true;
          this.$nextTick(()=>{
            setEelementSelect(this.$refs.logInNo.$el.querySelector('.el-input__inner'));
            this.autoFocusAccount=false;
          });
          }
      }else{
        this.autoFocusAccount=true;
      }
    },
    autoFocusAccount(newVal,oldVal){
      if(newVal&&newVal!=oldVal){
         this.$nextTick(()=>{
          this.autoFocusAccount=false;
        });
      }
    }
  },
  directives: {
    focus: {
      componentUpdated: function (el, binding) {
        if (binding.value) {
          el.querySelector("input").focus();
        }
      }
    }
  },
  methods: {
    /** 账号回车 */
    handleKeyDownAccount(){
      if(this.form.loginno.trim()==""){
        return;
      }
      setEelementSelect(this.$refs.pwd.$el.querySelector('.el-input__inner'));
    },
    /** 密码回车 */
    handleKeyDown() {
      this.submitForm("ruleForm");
    },
    /** 提交表单 */
    submitForm(formName) {
      if(this.isChecking){
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = Object.assign({},this.form);
          param.password = Md5Utils.hex_md5(this.form.password);
          param.validfor=this.validFor.toUpperCase();
          this.setStatus(STATUS.CHECKING);
          dataApi.checkUserVerify(param).then(responseMessage => {
            this.isChecking=false;
            if (responseMessage.type == resultType.SUCCESS) {
              this.setStatus(STATUS.SUCCESS);
              //此处的VERIFY表示验证通过
              const payLoad = {
                data: responseMessage.data,
                type: "VERIFY",
                validFor:this.validFor,
                continueUse: this.prolong === "2"
              };
              this.$emit("checkValid", payLoad);
              this.$emit("update:show", false);
              this.form.password = "";
            } else {
              
              this.setStatus(STATUS.ERROR,responseMessage.message);
              layerUtils.showMessage(responseMessage.message, layerUtils.messageType.WARNING);
              this.$nextTick(()=>{
                // setEelementSelect(this.$refs.pwd.$el.querySelector('.el-input__inner'));
              });
              
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 状态设置
     * @param type RESET\SUCCESS\ERROR\CHECKING
     * @param msg 文字描述
     */
    setStatus(type,msg){
      switch (type) {
        case STATUS.RESET:
          this.status.type="primary";
          this.status.statuIcon="";
          this.isChecking=false;
          this.status.confirmMessage=msg||"确定";
          break;
        case STATUS.SUCCESS:
          this.status.statuIcon="check";
          this.status.type="success";
          this.status.confirmMessage=msg||"校验成功";

          break;
        case STATUS.ERROR:
          this.status.statuIcon="circle-cross";
          // this.status.type="danger";
          this.status.type = 'error';
          this.status.confirmMessage=msg+"点击重试";
          break;
        case STATUS.CHECKING:
          this.status.statuIcon="loading";
          this.status.type="primary";
          this.status.confirmMessage=msg||"正在验证中，请稍后...";
          this.isChecking=true;
          break;
        default:
          this.status.statuIcon="";
          this.status.type="primary";
          this.status.confirmMessage=msg||"确定";
          break;
      }

    },
    /** 重置 */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.password = "";
      this.setStatus(STATUS.RESET);
      this.autoFocusAccount=true;
    },
    //关闭之前
    beforeClose(done) {
      this.$emit("update:show", false);
      const payLoad = {
        type: "NOTVERIFY"
      };
      this.$emit("checkValid", payLoad);
      this.form.password = "";
    }
  }
};
</script>
<style lang="stylus" >
  .wrapper-valid-user{
    &.common-dialog{
      .el-dialog {
        border-radius 2px
      }
      .el-dialog__header {
        background #fff
        border-bottom 1px solid #dfe7f5
        font-size 16px
        padding 16px !important
        .el-icon-close {
          font-size 12px
          color #8599c0
          display inline-block
        }
      }
      .el-dialog__title {
        color #000622 !important
      }
    }
    .el-dialog--tiny {
      width 545px
      height 226px
    }
    .el-dialog__body {
      padding 0px !important;
    }

    margin:0px;
    .el-form-item{
      margin-right :20px;
      margin-top :15px !important;
      margin-bottom :25px !important;
    }

    .el-form-item.button{
      margin-right :0px  !important;
      margin-top :5px !important;
      margin-bottom :15px !important;
      .el-form-item__content{
        text-align center
        margin-left:0px  !important;
        .w-button {
          width 90px
        }
      }
    }
    .dialog-footer{
      float right
      margin-right 20px
      .w-button {
        width 90px
      }
    }
  }
</style>

