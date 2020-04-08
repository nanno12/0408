<!--
* @author: w_sh
* @date: 2018/12/28
* @module: 选择原因
-->
<template>
  <div class="multi-select-dialog">
    <el-dialog :visible.sync="show"
               :before-close="cancle"
               :append-to-body="true"
               :modal="modal"
               @open="open"
               :modal-append-to-body="modalAppendToBody"
               class="multi-select common-dialog"
               :title="title">
      <div class="cancelBox">
        <div class="reason-wrapper" v-show="reasonTypeShow" v-scroll>
          <p class="title">原因分类</p>
          <ul class="list-wrapper">
            <li v-for="(item, index) in reasonTypeList" :key="index"
              class="ellipsis" :title="item.NAME"
              :class="{'active': item.CODE === currentReasonType.CODE}"
              @click="reasonChange(item)">{{item.NAME}}</li>
          </ul>
        </div>
        <div class="main-wrapper">
          <div ref="mainWrapper">
            <p class="itemTitle" @click="ceshi">{{title}}</p>
            <!-- @click="$refs.newReasonText.$refs.input.focus()" -->
            <div class="tagList fade-scroll" @click="$refs.newReasonText.$refs.input.focus()">
              <draggable
              element="span" 
              class="dragBox"
              :options="{animation:100,handle:'.mr-5',disabled: !move}"
              v-model="dynamicTags"
              >
                <el-tag
                  :key="tag"
                  :class="[move ? 'tagItem' : '','mr-5 mb-5']"
                  type="primary"
                  v-for="tag in dynamicTags"
                  :closable="true"
                  :close-transition="false"
                  @close.stop="handleClose(tag)"
                >
                {{tag}}
                </el-tag>
              </draggable>
              <!-- @blur="addReasonText" -->
              <el-input
              @keydown.enter.native="addReasonText"
              ref="newReasonText"
              v-model="newReasonText" class="addNewReasonTags"></el-input>
            </div>
            <p class="itemTitle">{{listTitle}}</p>
            <div class="searchReasonBox re">
              <i class="iconfont icon-chxu ab"></i>
              <el-input class="searchInput"
              ref="searchInput"
              v-model="filterValue"
              @focus="$refs.searchInput.$refs.input.select()"
              @keydown.enter.native="filterLastOneAdd"
              placeholder="请输入关键词"
              ></el-input>
                <el-popover
                  v-model="popoverShow"
                  placement="left"
                  width="330"
                  trigger="click">
                    <div class="popoverBox" v-focusNextOnEnter>
                      <p class="title">新增列表</p>
                      <el-form class="formBox" ref="form" :model="form" label-width="70px">
                        <el-form-item class="formItem" label="内容">
                          <el-input ref="formName" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item class="formItem" label="输入码一">
                          <el-input v-model="form.memcode1"></el-input>
                        </el-form-item>
                        <el-form-item class="formItem" label="输入码二">
                          <el-input v-model="form.memcode2"></el-input>
                        </el-form-item>

                        <el-form-item class="formItem fr">
                          <el-button type="primary" @click="addSubmit">新增</el-button>
                          <el-button @click="cancleForm">取消</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  <!-- <el-tooltip class="item" effect="dark" slot = "reference" content="新增常用原因" placement="top"> -->
                    <div @click="popoverShow = !popoverShow" slot = "reference" class="ab addNewReason">
                      <i class="iconfont icon-addlist"></i>
                    </div>
                  <!-- </el-tooltip> -->
                </el-popover>
            </div>
            <div class="reasonList">
              <el-checkbox class="checkedBox"
              v-model = 'item.checked'
              @change="addNewReason(item)"
              v-for="(item, index) in filterList" :key="index"
              ><ellipsis-lable>{{item.NAME}}</ellipsis-lable></el-checkbox>
            </div>
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
  import draggable from 'vuedraggable'

  export default {
    components: {
     draggable
    },
    data() {
      return {
        reasonList: [], // 原因列表
        filterValue: '', // 筛选输入框
        dynamicTags: [], // 已选原因
        newReasonText: '', // 输入原因
        selectReasonList: [], // 已选原因数组对象
        popoverShow: false, // popover展示
        form: {
          name: '',
          memcode1: '',
          memcode2: '',
        },
        reasonTypeList: [], // 原因分类列表
        currentReasonType: {}, // 选中的原因分类
      }
    },
    props: {
      show: Boolean, //控制弹窗是否显示
      title: String,//Dialog标题名称
      value: [String, Number], //
      dicType: String,//api 参数
      modal: Boolean,//是否需要遮罩层
      listTitle: String, // 列表选项标题
      reasonTextStr:String, // 打开弹框输入框默认值
      modalAppendToBody: { //遮罩层是否插入至 body 元素上
        type: Boolean,
        default: true
      },
      move: { // 拖拽排序 默认不可以
        type: Boolean,
        default: false
      },
      isEmpty: { // 原因能否为空，默认可为空
        type: Boolean,
        default: true
      },
      reasonTypeShow: { // 左侧是否展示原因分类 默认false
        type: Boolean,
        default: false
      },
      groupCode: { // 添加子原因分类的分组
        type: String,
        default: ''
      }
    },
    created() {
      this.$nextTick(_ => {
        this.$root.eventHub.$on('Instrument/emptyClose', () => {
          this.cancle()
        });
      })
    },
    computed: {
      filterList() {
        let str = this.filterValue.toLowerCase();
        return str === '' ? this.reasonList : this.reasonList.filter(item => {
          return (item.NAME + '').toLowerCase().indexOf(this.filterValue) > -1
               || (item.MEMCODE1 + '').toLowerCase().indexOf(this.filterValue) > -1
               || (item.CODE + '').toLowerCase().indexOf(this.filterValue) > -1
               || (item.MEMCODE2 + '').toLowerCase().indexOf(this.filterValue) > -1;
        })
      },
    },
    watch: {
      popoverShow() {
        if(this.popoverShow) {
          this.$nextTick(_ => {
            this.$refs.formName.$refs.input.focus()
          })
        } else {
           this.form = {
            name: '',
            memcode1: '',
            memcode2: '',
          }
        }
      },
    },
    methods: {
      ceshi() {
        console.log(this.value);
        console.log(this.ReasonList);
      },
      //打开弹框检索框自动获取焦点
      open() {
        this.$nextTick(() => {
          // this.reasonList = [];
          // this.dynamicTags = [];
          // this.selectReasonList = [];
          this.filterValue = ''
          this.newReasonText = ''
          this.$emit('input','');
          this.$refs.newReasonText.$refs.input.focus()
          /**
           * reasonTypeShow为true，获取原因分类接口 =》 具体原因接口
           * false getReasonList()
           */ 
          if(this.reasonTypeShow) {
            this.getSlavebyClassCode('失控处理分类')
          } else {
            this.getReasonList();
          }
          //让tag标签的数组默认为当前所点击的字符串
          this.dynamicTags=!this.reasonTextStr ?[]: this.reasonTextStr.split(',');
        })

      },

      //取消弹框
      cancle() {
        this.$emit('update:show', false);
        this.reasonList = [];
        this.dynamicTags = [];
        this.selectReasonList = [];
        this.popoverShow=false
        this.reasonTypeList = [];
        this.currentReasonType = {};
      },
      /**获取原因分类 */
      getSlavebyClassCode() {
        Common.getSlavebyClassCode({classcode: '失控处理分类'}, data => {
          DataHandle(data).then(data => {
            this.reasonTypeList = data.data;
            if(data.data.length > 0) {
              this.reasonChange(data.data[0])
            }
          });
        });
      },
      //原因分类 点击
      reasonChange(val){
        console.log(val)
        this.currentReasonType = val || {}
        this.reasonList = [];
        if(val.CODE){
          Common.getSlaveListByParentName({classcode: this.dicType,parentcode: val.CODE},data =>{
            DataHandle(data).then(data=>{
              // 选择原因list
              this.reasonList = data.data || [];
            });
        });
        }
      },
      //点击确定按钮
      submit() {
        if(this.newReasonText != ''){
          this.addReasonText();
        }
        if(!this.isEmpty && this.dynamicTags.length == 0) {
          layerUtils.showMessage(`${this.title}不能为空`,layerUtils.messageType.WARNING);
          return false;
        }
        let reasonText = this.dynamicTags.join(',')
        this.$emit('input', reasonText);
        this.$emit('confirm', this.selectReasonList);
        this.cancle();
      },
      /**获取常用原因列表 */
      getReasonList() {
        let params = {
          dictype: this.dicType,
        };
        Common.getDicData(params).then(data => {
          DataHandle(data).then(data => {
            this.reasonList = data.data[this.dicType] || [];
             this.reasonList.forEach((item) => {
               let exist=this.dynamicTags.findIndex(item1 =>{
                 return item.NAME == item1
                })
                if(exist>-1){
                 this.$set(item, 'checked', true)
                }else{
                 this.$set(item, 'checked', false)
                }
             })
          
          }).catch(_ => {
            this.reasonList = []
          })
        });
      },
      /**当搜索仅剩最后一项的时候，enter键入最后选项 */
      filterLastOneAdd() {
        if(this.filterList.length == 1 && !this.filterList[0].checked){
          this.filterList[0].checked = true;
          this.addNewReason(this.filterList[0])
        }
      },
      /**标签删除 */
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        // this.selectReasonList.splice(this.selectReasonList.indexOf(tag), 1);
        this.reasonList.forEach((item) => {
          if(tag == item.NAME) {
            item.checked = false;
          }
        });
        this.selectReasonList.forEach((item, index) => {
          if(item.NAME == tag) {
            this.selectReasonList.splice(index, 1);
          }
        })
      },
      /**点击选项新增 */
      addNewReason(items) {
        let flag = false;
        this.dynamicTags.forEach((item) => {
          // console.log(item, items.NAME)
          if(item == items.NAME) {
            flag = true
            this.handleClose(item)
            return false;
          }
        })
        if(!flag && items.checked) {
          this.dynamicTags.push(items.NAME);
          this.selectReasonList.push(items)
        }
      },
      /**手动输入新增 */
      addReasonText() {
        this.newReasonText = this.newReasonText.replace(/^\s+|\s+$/g,"");
        if(this.newReasonText == '') {
          layerUtils.showMessage('新添句子不能为空',layerUtils.messageType.WARNING);
          return false;
        }
        let flag = false;
        this.dynamicTags.forEach((item) => {
          if(item == this.newReasonText) {
            flag = true;
          }
        })
        if(flag) {
          layerUtils.showMessage('新添句子重复',layerUtils.messageType.WARNING);
          this.$refs.newReasonText.$refs.input.select()
          return false;
        }
        this.reasonList.forEach((item) => {
          if(item.NAME == this.newReasonText) {
            item.checked = true;
          }
        })
        let newTag = {
          CODE: '',
          NAME: this.newReasonText
        }
        this.selectReasonList.push(newTag)
        this.dynamicTags.push(this.newReasonText);
        this.newReasonText = '';
        this.$refs.newReasonText.$refs.input.focus();
      },
      /**新增 常用原因列表 */
      addSubmit() {
        let params = {
          dictype: this.dicType,
          dictname: this.form.name,
          memcode1: this.form.memcode1,
          memcode2: this.form.memcode2,
          groupcode: this.groupCode,
          parentclasscode: this.currentReasonType.DICTYPE || '',
          parentcode: this.currentReasonType.DICID || '',
          parentname: this.currentReasonType.NAME || ''
        };
        Common.addDictData(params).then(data => {
          DataHandle(data).then(data => {
            let newCheckList = {
              NAME: this.form.name,
              CODE: ''
            }
            this.reasonList.push(newCheckList)
            this.cancleForm()
            // this.getReasonList();
          }).catch(_ => {

          })
        });
      },
      /**取消 */
      cancleForm() {
        this.popoverShow = false;
        this.form = {
          name: '',
          memcode1: '',
          memcode2: '',
        }
      }
    }
  }

</script>

<style lang="stylus" scoped>
.cancelBox
  display flex
  .reason-wrapper 
    width 160px
    margin-right 6px
    padding 8px 8px
    background rgba(204, 204, 204, 0.18)
    .title 
      margin-bottom 8px
      font-weight 700
      font-size 12px
      color #000
    .list-wrapper 
      overflow auto
      max-height 240px
      height calc(100% - 20px)
      background #fff
      li 
        padding 0 10px
        height 22px
        line-height 22px
        cursor pointer
        color #333
        font-size 12px
        &:hover 
          background-color #caddf6
        &.active 
          background-color #4e97ff
          color #fff
  .main-wrapper
    flex 1
    .itemTitle
      color #000
      font-size 12px
      font-weight bold
      margin-bottom 8px
    .tagList
      width calc(100% - 10px)
      min-height 70px
      max-height 120px
      border 1px solid #e8e8e8
      margin-left 10px
      margin-bottom 15px
      overflow-y auto
      padding 5px
      font-size 12px
      .tagItem
        cursor move
    .searchReasonBox
      width calc(100% - 40px)
      margin-left 10px
      border-bottom 1px solid #e8e8e8
      padding 0 10px
      .icon-chxu
        font-size 14px
        top 7px
        left 7px
        z-index 2
        color #999
      .searchInput
        width calc(100% - 80px)
        margin-left 7px
      .addNewReason
        right -29px
        bottom 3px
        width 20px
        height 20px
        background #20a0ff
        border 1px solid rgb(1, 144, 254)
        border-radius 4px
        text-align center
        line-height 18px
        cursor pointer
        .icon-addlist
          color #fff
          font-size 14px
      .addNewReason:hover
        opacity 0.9
    .reasonList
      width calc(100% - 10px)
      margin-left 10px
      margin-top 15px
      height 110px
      overflow-y auto
      font-size 0
      .checkedBox
        margin-left 0
        margin-bottom 7px
        width 33%
        font-size 12px
.popoverBox
  .title
    font-size 12px
    font-weight bold
    padding 0 10px 8px 10px
    border-bottom 1px solid #e8e8e8
  .formBox
    padding-right 10px
    .formItem
      margin-top 10px




</style>
<style lang="stylus">
.cancelBox
  .searchReasonBox
    .searchInput
      input
        border none
      input:focus
        box-shadow: none
.addNewReasonTags
  input
    border none!important
  input:focus
    box-shadow: none
.multi-select-dialog
  .el-dialog
    width 680px!important
    height auto!important
.reasonList
  .checkedBox
    .el-checkbox__label
      vertical-align middle
      display inline-block
      height 20px
      line-height 18px
      width calc(100% - 30px)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
