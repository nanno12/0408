<!--
* @author: chuyunshi
* @date: 2019/12/27
* @module: 查询方案列表
-->
<template>
  <div ref="queryList">
    <div class="queryList">
      <div class="listTitle re">
        <i title="常用方案" @click.stop="listShow = !listShow" class="iconfont icon-more1"></i>
        <i title="新增" @click.stop="clear" class="iconfont icon-addlist"></i>
        <i title="保存" @click.stop="save" class="iconfont icon-save"></i>
        <i title="另存为..." @click.stop="saveOther" class="iconfont icon-save_copy"></i>
      </div>
      <div class="listBox" v-if="listShow">
        <div class="listTitleBox bold">
          查询方案选择
          <i class="iconfont icon-close fr" @click.stop="listShow = false"></i>
        </div>
        <div class="pl-5 pr-5 pb-5 itemListBox">
          <div class="m-10 text-center" v-if="queryList.length == 0">暂无</div>
          <ul>
            <li class="listItem re" :class="{'active' : active == index}" v-for="(item, index) in queryList" :key="index" @click="selectItem(item, index)">
              <span class="inlB itemName">
                <ellipsis-lable>
                  {{item.CONDITIONNAME}}
                </ellipsis-lable>
              </span>
              <i @click.stop="deleteItem(item, index)" class="iconfont icon-shanchu"></i>
            </li>
          </ul>
        </div>  
      </div>
    </div>
    <el-dialog
      title="保存方案"
      size="tiny"
      :modal-append-to-body="false"
      :before-close="close"
      :width="380"
      :height="'70%'"
      :max-height="140"
      :top="'30%'"
      :modal="false"
      class="common-dialog"
      :visible.sync="show"
      >
      <div class="inforBox">
        <span class="lineTitle">方案名称：</span>
        <span class="lineInput">
          <el-input ref="CONDITIONNAME" @keyup.enter.native="confirm" v-model="CONDITIONNAME"></el-input>
        </span>
      </div>
      <div class="mt-20 dialogBottom">
        <el-button class="fr ml-10 mr-10" @click="close">取消</el-button>
        <el-button class="fr" type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as layerUtils from '@techCommon/utils/layerUtils'
  import commonApi from '@/app/api/common'

  export default {
    components: {
      
    },
    data() {
      return {
        queryList: [],
        active: -1, // 高亮选中行
        show: false, // 保存方案名称弹窗
        listShow: false, // 列表展示
        clearForm: {}, // 用于清空
        thisSelect: {}, // 当前选中对象
        SERIALNO: '', // 方案id
        CONDITIONNAME: '', // 方案名称
        confirmShow: false, // 删除确认弹窗显示状态，用于一个理想的交互
      }
    },
    props: {
      form: Object, // 默认条件
      module: String, // 模块名称
    },
    computed: {

    },
    watch: {
      
    },
    created(){
      document.addEventListener('click', e => {
        if (this.$refs.queryList) {
          let queryList = this.$refs.queryList;
          if (!queryList.contains(e.target)) {
            if(!this.confirmShow) {
              this.listShow = false;
            }
          }
        }
      });
    },
    mounted() {
      this.$nextTick(() => {
        this.clearForm = JSON.parse(JSON.stringify(this.form));
        this.getQueryCondition();
      })
    },
    methods: {
      /**获取获取条件列表 */
      getQueryCondition() {
        let params = {
          module: this.module
        };
        commonApi.getQueryCondition(params).then(data => {
          this.queryList = data.data || [];
        }).finally(() => {
          
        })
      },
      /**选中对象 */
      selectItem(item, index) {
        if(this.active == index) {
          return false
        }
        this.active = index
        this.thisSelect = item
        this.CONDITIONNAME = item.CONDITIONNAME
        this.SERIALNO = item.SERIALNO
        // this.listShow = false
        this.objectRecombination(item.CONDITION)
      },
      /**对象重组 */
      objectRecombination(conditions) {
        conditions.forEach(item => {
          this.form[item.KEY] = item.VALUE
        });
        this.$emit("change-condition", this.form)
      },
      /**删除对象 */
      deleteItem(item, index) {
        this.confirmShow = true
        layerUtils.confirmMessage(`是否确定删除[${item.CONDITIONNAME}]？`,'警告','warning').then(() => {
          this.toDelete(item, index)
          setTimeout(() => {
            this.confirmShow = false
          }, 0)
        }).catch(() => {
          setTimeout(() => {
            this.confirmShow = false
          }, 0)
        })
      },
      /**去删除 */
      toDelete(item, index) {
        let params = {
          serialno: item.SERIALNO
        }
        commonApi.delQueryCondition(params).then(data => {
          if(data.type == 'SUCCESS') {
            this.queryList.splice(index, 1)
            if(index == this.active) {
              this.active = -1
              this.SERIALNO = ''
            } else if(this.active > index) {
              this.active -= 1
            }
          }
        }).finally(() => {
          
        })
      },
      /**清空查询条件 */
      clear() {
        this.active = -1;
        this.CONDITIONNAME = '';
        this.SERIALNO = '';
        this.$emit("change-condition", this.clearForm)
      },
      /**保存方案 */
      save() {
        if(this.SERIALNO == '') {
          this.saveOther()
        } else {
          this.CONDITIONNAME = this.thisSelect.CONDITIONNAME
          this.toSave(false)
        }
        
      },
      /**另存方案 */
      saveOther() {
        this.CONDITIONNAME = '';
        this.show = true
        this.$nextTick(() => {
          this.$refs.CONDITIONNAME.$refs.input.select()
        })
      },
      /**确认保存 */
      confirm() {
        if(this.CONDITIONNAME == '') {
          layerUtils.showMessage('方案名称不能为空', layerUtils.messageType.WARNING);
          this.$refs.CONDITIONNAME.$refs.input.select()
          return false;
        }
        let flag = false
        this.queryList.forEach(item => {
          if(item.CONDITIONNAME == this.CONDITIONNAME) {
            flag = true
          }
        })
        if(flag) {
          layerUtils.showMessage('新增方案名重复，请重新输入', layerUtils.messageType.WARNING);
          this.$refs.CONDITIONNAME.$refs.input.select()
          return false;
        }
        this.toSave(true)
        this.show = false
      },
      /**去保存，调接口 */
      toSave(flag) {
        let params = this.form;
        params.serialno = flag ? '' : this.SERIALNO;
        params.conditionname = this.CONDITIONNAME;
        params.module = this.module;
        commonApi.saveQueryCondition(params).then(data => {
          if(data.type == 'SUCCESS') {
            let _item = data.data || []
            if(flag && _item.length > 0) {
              this.queryList.unshift(_item[0])
              this.active != -1 ? this.active += 1 : '';
            } else if(!flag && _item.length > 0) {
              this.queryList.splice(this.active, 1, _item[0])
            }
            layerUtils.showMessage("方案保存成功！", layerUtils.messageType.SUCCESS);
          } else {
            layerUtils.showMessage(data.message, layerUtils.messageType.WARNING);
          }
        }).finally(() => {
          
        })
      },
      /**关闭 */
      close() {
        this.show = false
      }
    }
  }
</script>
<style lang="stylus" scoped>
.queryList
  width 100%
  font-size 12px
  transform rotate(0)
  .listTitle
    height 26px
    line-height 24px
    padding-left 5px
    .titleText
      font-size 14px
      font-weight bold
      cursor pointer
      vertical-align top
      text-decoration underline
    .titleText:hover
      color #20a0ff
    .iconfont
      font-size 14px
      position absolute
      top 50%
      transform translateY(-50%)
    .icon-more1
      right 0
      top 6px

      line-height 14px
      transform rotate(90deg)
    .icon-save_copy
      right 14px
    .icon-save
      right 32px
    .icon-addlist
      right 49px
    .iconfont:hover
      color #20a0ff
  .listBox
    height calc(100% - 26px)
    border 1px solid #bbb
    box-shadow 2px 2px 2px #ccc
    background #fff
  .listTitleBox
    padding 5px
    border-bottom 1px dashed #ddd
    .icon-close:hover
      color #20a0ff
  .itemListBox
    max-height 215px
    overflow-y auto
  .listItem
    width 100%
    height 26px
    line-height 24px
    padding 0 8px
    cursor pointer
    overflow hidden
    margin-top 4px
    background #eee
    .itemName
      width calc(100% - 40px)
    .iconfont
      display none
      font-size 12px
      position absolute
      top 50%
      transform translateY(-50%)
    .icon-shanchu
      right 8px
    .iconfont:hover
      opacity 0.9
  .listItem:hover
    background #ddd
    .iconfont
      display block
  .active
    background rgb(46, 96, 232) !important
    color #fff
.inforBox
  font-size 0
  .lineTitle
    font-size 12px
    width 70px
    display inline-block
    font-weight bold
    height 26px
    line-height 24px
    text-align right
  .lineInput
    display inline-block
    width calc(100% - 80px)
</style>
<style lang="stylus">

</style>
