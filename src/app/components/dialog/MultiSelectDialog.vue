<!--
* @author: lei
* @date: 2017/11/27
* @module: 批量操作
* @explain:报告回收
-->

<template>

  <div class="multi-select-dialog">
    <el-dialog size="tiny"
               :visible.sync="show"
               :before-close="cancle"
               :append-to-body="true"
               :modal="modal"
               :top="top"
               @open="open"
               :modal-append-to-body="modalAppendToBody"
               class="multi-select common-dialog"
               :title="title">
      <div class="cancel-bingding">
        <div class="left">
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="常用" name="first">
              <div class="item common" v-if="checkReason.commonreasonlist.length>0" v-scroll>
                <ul>
                  <li v-for="(item,index) in checkReason.commonreasonlist"
                      @click="handleReasonList(item)"
                      :key="index">
                    <span>{{item.NAME}}</span>
                    <i class="el-icon-arrow-right"></i>
                  </li>
                </ul>
              </div>
              <p style="margin-top:90px;text-align: center" v-else>暂无常用原因，手动添加吧！</p>
            </el-tab-pane>
            <el-tab-pane :label="toggleTitle" name="second">
              <el-input size="small"
                        placeholder="请输入内容"
                        v-model="filterValue"
                        ref="filterInput"
                        class="margin-bottom-10">
              </el-input>
              <div class="item" v-scroll>
                <ul v-if="filterList&&filterList.length>0">
                  <li v-for="(item,index) in filterList"
                      @click="handleReasonList(item)"
                      :key="index">
                    <span>{{item.NAME}}</span>
                    <i class="el-icon-arrow-right"></i>
                  </li>
                </ul>
                <p style="margin-top:60px;text-align: center" v-else>暂无{{toggleTitle}}，手动添加吧！</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="right">
          <div class="top">{{ title }}</div>
          <div class="main-cnt">
            <div class="input-tag">
              <el-tag
                v-for="(tag,index) in dynamicTags"
                :key="index"
                :closable="true"
                :close-transition="false"
                @close="handleClose(tag)">
                {{tag.name}}
              </el-tag>
            </div>
            <el-input
              type="textarea"
              autosize
              ref="textareaInput"
              size="large"
              resize="none"
              @keyup.enter.native="save"
              @blur="save"
              v-model.trim="reasonResult">
            </el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import DataHandle from '@/app/utils/dataHandle'
  import * as layerUtils from 'app/utils/layerUtils'
  import Common from '../../api/common.js'

  export default {
    data() {
      return {
        activeName: 'first',
        dynamicTags: [],//tag标签
        reasonResult: '',
        filterValue: '',
        checkReason: {
          reasonlist: [],
          commonreasonlist: []
        },//选择原因列表
        realReasonList:[]
      }
    },
    props: {
      show: Boolean, //控制弹窗是否显示
      title: String,//Dialog标题名称
      toggleTitle: String,//tab切换标题名称
      modal: Boolean,//是否需要遮罩层
      allowedEmpty: Boolean,//点击确定按钮，控制取消/补打原因是否为空
      top: {
        type: String,
        default: '18%'
      },//top值
      isEmpty:Boolean,//显示原因的tags数组
      modalAppendToBody: { //遮罩层是否插入至 body 元素上
        type: Boolean,
        default: true
      },
      dataName:Array,
      reasonText:String,//打开原因弹框的输入值
    },
    created() {
      this.$nextTick(_ => {
        this.$root.eventHub.$on('Instrument/emptyClose', () => {
          this.cancle()
        });
      //初始化原因列表
        this.$root.eventHub.$on('reasonOperation/openReasonDialog', classcode => {
//          let params = {
//            dictype: classcode,
//          };
//          Common.getDicData(params).then(data => {
//            DataHandle(data).then(data => {
//              this.checkReason.reasonlist= data.data[classcode]||[];
//            }).catch(_ => {
//              this.checkReason = {
//                reasonlist: [],
//                commonreasonlist: []
//              }
//            })
//          });
        });
      })
    },
    computed: {
      filterList() {
        let str = this.filterValue.toLowerCase();
        return str === '' ? this.checkReason.reasonlist : this.checkReason.reasonlist.filter(item => {
          return item.NAME.toLowerCase().indexOf(this.filterValue) > -1 || item.MEMCODE1.toLowerCase().indexOf(this.filterValue) > -1
               || item.CODE.toLowerCase().indexOf(this.filterValue) > -1 || item.MEMCODE2.toLowerCase().indexOf(this.filterValue) > -1;
        })
      }
    },
    methods: {
      //打开弹框检索框自动获取焦点
      open() {
        this.dynamicTags = [];//打开弹框首先清空tag标签
        let arr=!this.reasonText ?[]: this.reasonText.split(',');
        if(arr.length!=0){
          arr.map((item,index )=>{//让tag标签的数组默认为当前所点击的字符串
               this.dynamicTags.push({
                 name:item,
                 code:index
               })
          })
        }
        if (this.isEmpty) {//是否允许清空tag标签
          this.dynamicTags = [];
          this.reasonResult='';
        }
        this.$nextTick(_=>{
          let params = {
            dictype: this.toggleTitle,
          };
          Common.getDicData(params).then(data => {
            DataHandle(data).then(data => {
              this.checkReason.reasonlist= data.data[this.toggleTitle]||[];
            }).catch(_ => {
              this.checkReason = {
                reasonlist: [],
                commonreasonlist: []
              }
            })
          });
        })
        this.tabClick({name: this.activeName})
      },
      tabClick(tab) {
        this.$nextTick(_ => {
          this.$refs.textareaInput.$refs.textarea.focus();
        });
      },
      //取消弹框
      cancle() {
        this.$emit('update:show', false);
      },
      //点击确定按钮
      submit() {
        if (!this.allowedEmpty && this.dynamicTags.length===0) {
          layerUtils.showMessage(`${this.title}不能为空`, layerUtils.messageType.WARNING);
          return;
        }
        this.$emit('change', this.dynamicTags);
        this.$emit('update:show', false);
      },
      //点击tag标签删除按钮
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      //点击原因列表的每一项
      handleReasonList(item) {
        let exist = this.dynamicTags.some(item1 => {
          return item1.name === item.NAME;
        });
        if (exist) {
          return;
        }
        this.dynamicTags.push(
          {
            name: item.NAME,
            code: item.CODE,
          }
        );
      },
      save() {
        // console.log(typeof (this.reasonResult));
        if (this.reasonResult !== '') {
          this.dynamicTags.push(
            {
              name: this.reasonResult,
              code: this.dynamicTags.length,
            }
          );
          this.reasonResult = "";
        }

      }
    }
  }

</script>

<style lang="stylus" scoped>
  .multi-select {
    .cancel-bingding {
      height: 100%;
      > div {
        height: 100%;
        float: left;
      }
      .left {
        width: 200px;
        .item {
          height: calc(100% - 42px);
          overflow auto
          ul {
            height: 100%;
            width: 188px;
          }
          li {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            padding-left: 10px;
            cursor pointer;
            border-bottom: 1px dashed #f0f0f0;
            border-radius 4px;
            display flex
            flex-direction row
            align-items center
            justify-content space-between !important;
            i {
              cursor pointer;
              color: #d2d2d2;
            }
          }
        }
        .common {
          height: 100% !important;
        }
      }
      .right {
        width: calc(100% - 200px);
        padding-left: 10px;
        .top {
          height: 30px;
          line-height: 30px
          font-size: 12px;
        }
        .main-cnt {
          height: calc(100% - 30px);
          border: 1px solid #eee;
          padding: 10px;
          border-radius 4px
        }
      }
    }
  }

</style>
<style lang="stylus">
  .multi-select {
    .el-dialog--tiny {
      width: 580px !important;
      height: 380px !important;
      margin-left: -290px;
      transform: none;
    }
    .el-dialog__body {
      height: calc(100% - 98px) !important;
      padding: 12px 15px 0 !important;
    }
    .dialog-footer{
      padding: 0 !important;
    }
    .left {
      .el-tabs {
        height: 100%
        .el-tabs__header {
          border-bottom: none
          margin: 0 !important
        }
        .el-tabs__content {
          height: calc(100% - 30px)
          border: 1px solid #eee
          border-radius 4px
          .el-tab-pane {
            height: 100%;
            .margin-bottom-10 {
              padding: 10px 5px 5px 5px;
              .el-input__inner {
                height: 26px !important;
              }
            }
          }
        }
      }
      .el-tabs__item {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .right {
      position relative;
      .el-textarea {
        .el-textarea__inner {
          height: 100% !important;
          border: none;
        }
      }
      .input-tag {
      // max-width: 100px;
        .el-tag {
          background-color: rgba(64, 158, 255, 0.1);
          padding: 0 10px;
          font-size: 12px;
          color: #409eff;
          border-radius: 4px;
          border: 1px solid rgba(64, 158, 255, 0.2);
          white-space: nowrap;
          margin: 0 5px 5px 0;
        }
      }
    }
  }
</style>
