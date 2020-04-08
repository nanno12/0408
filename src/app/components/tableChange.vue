<template>
    <div class="re tableChange">
      <el-table
        :data="tableData"
        :highlight-current-row = "highLight"
        @row-dblclick = "rowdblclick"
        @current-change="currentChange"
        @row-click="rowClick"
        @selection-change = "selectionChange"
        @select="currentSelect"
        :row-class-name="rowClassName"
        height="100%"
        :newSort= 'newSort'
        :row-key="rowKey"
        ref="testReportTable"
        style="width:100%">
        <slot name="left"></slot>
        <el-table-column
          v-for = "item in showTableTitle" :key = "item.name"
          show-overflow-tooltip
          v-if = "item.checked && !item.custom"
          :prop = "item.name"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed">
        </el-table-column>
        <slot name="right"></slot>
      </el-table>
      <i class="ab iconfont icon-shezhi" @click="setShow"></i>
      <el-dialog
        title="表格设置"
        size="tiny"
        :modal-append-to-body="false"
        :before-close="setClose"
        :modal="modal"
        :width="395"
        :height="'50%'"
        class="publicDialog"
        :visible.sync="setBoxShow"
        >
        <div class="moveBox" v-show="setBoxShow" ref="moveBox">
          <draggable
            element="ul"
            class="dragBox"
            :options="{animation:100, handle:'.move'}"
            @end="moveChange"
            v-model="newTableTitle"
            >
              <li class="dragItem"
              v-for="item in newTableTitle"
              :key="item.name"
              >
                <span class="mr-20"><span>名称：</span>
                <span class="bold inlB ellipsis titleName" :title="item.label">{{item.label}}</span></span>
                <span class="mr-20"><span>列宽：</span> <el-input v-model="item.width" type="number" @blur="blurChange(item)" min="0" style="width: 60px" @change="inputChange"></el-input></span>
                <span class="mr-20"><el-checkbox v-model="item.checked" class="bold" @change="checkedChange" :disabled="item.custom">展示</el-checkbox></span>
                <i class="iconfont icon-move-updown vm" :class="[item.checked ? 'move' : 'noMove']"></i>
              </li>
            </draggable>
            <div class="dialogBottom">
              <el-button v-if="tableArray" @click="setDefault(true)">恢复默认设置</el-button>
              <el-button :disabled="!setSave" type="primary" @click="submit(newTableTitle)">保 存</el-button>
              <el-button @click="setClose">取 消</el-button>
            </div>
        </div>
        </el-dialog>
    </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import * as layerUtils from 'app/utils/layerUtils'
  import Common from '@/app/api/common.js';

  export default {
    components: {
      draggable
    },
    data() {
      return {
        newTableTitle: [], // 拖拽列表数据
        showTableTitle: [], // 列表头部数据
        tableTitleCopy: [], // 用于取消恢复数据
        tableTitleLast: [], // 上一次操作后的数据
        setBoxShow: false, // 表格设置框
        setSave: false, // 保存设置
        valueChange: false, // 输入框值是否发生改变
        newSort: [],
      }
    },
    props: {
      tableTitle: Array,
      tableData: Array,
      highLight: Boolean,
      selection: Boolean,
      moduleCode: String, // 模块code
      moduleName: String, // 模块name
      isheightrow:[Object,String],
      tableArray: Array, // 默认排序数组
      modal: [Boolean, String],
      rowKey: { // 行数据的 Key
        type: String,
        default: ''
      },
      isShow: Boolean
    },
      
    watch: {
      // 高亮行
      isheightrow(val){
        if(val && JSON.stringify(val) !='{}'){
          this.setCurrent(val)
        }
      },
      // 重新初始化
      isShow(val){
        setTimeout(_=>{
          this.newTableTitle = JSON.parse(JSON.stringify(this.tableTitle));
          this.showTableTitle = JSON.parse(JSON.stringify(this.tableTitle));
          this.tableTitleLast = JSON.parse(JSON.stringify(this.tableTitle));
          this.getTableTitle();
        },100)
      }
    },
    created() {
    },
    computed: {
    },
    
    mounted() {
      this.newTableTitle = JSON.parse(JSON.stringify(this.tableTitle));
      this.showTableTitle = JSON.parse(JSON.stringify(this.tableTitle));
      this.tableTitleLast = JSON.parse(JSON.stringify(this.tableTitle));
      this.getTableTitle();
    },
  
    methods: {
      /**获取表格头部顺序 */
      getTableTitle() {
        let params={
          moduleCode: this.moduleCode,
          moduleName: this.moduleName,
        }
        Common.getgirdconfig(params).then(data =>{
           if(data.type =='SUCCESS') {
             if(data.data.data && data.data.data.length > 0){
              this.newTableTitle = JSON.parse(JSON.stringify(data.data.data));
              this.showTableTitle = JSON.parse(JSON.stringify(data.data.data));
              this.setTableStyle();
             } else {
               this.setDefault(false);
             }
              
           }
        })
      },
      /**设置默认排序 */
      setNewSort() {
        if(this.selection) {
          this.newSort = [
            {
              label: '',
              sort: 0,
              width: '55',
            }
          ];
        } else {
          this.newSort = []
        }
        this.tableArray.forEach((item) => {
          let setNewSort = {
              label: this.tableTitle[item].label,
              sort: item,
              width: this.tableTitle[item].width == '' ? '' : this.tableTitle[item].width - 0,
            };
          if(this.selection) {
            setNewSort.sort += 1
          }
          this.newSort.push(setNewSort);
        })
      },
      /**表格设置框展示 */
      setShow() {
        this.setBoxShow = true;
        this.tableTitleCopy = JSON.parse(JSON.stringify(this.newTableTitle));
        
      },
      /**输入框改变 */
      inputChange() {
        this.setSave = true;
        this.valueChange = true;
      },
      /**多选框改变 */
      checkedChange() {
        this.setSave = true;
        this.setTableStyle();
      },
      /**拖拽位置改变 */
      moveChange() {
        this.setSave = true;
        this.tableChange();
      },
      /**光标离开 */
      blurChange(item) {
        if(item.width == '') {
          item.width = ''
        } else if(item.width < 0) {
          item.width = 0;
          layerUtils.showMessage('列宽不可小于0',layerUtils.messageType.WARNING);
        }
        
        if(this.valueChange) {
          this.setTableStyle();
        }
        this.valueChange = false;
      },
      /**重新渲染表格数据 */
      tableChange() {
        if(this.selection) {
          this.newSort = [
            {
              label: '',
              sort: 0,
              width: '55',
            }
          ];
        } else {
          this.newSort = []
        }
        let newShowColumn = [];
        let newLastColumn = [];
        this.tableTitleLast.forEach((items) => {
          this.newTableTitle.forEach((item) =>{
            if(item.checked && items.label == item.label) {
              newLastColumn.push(items);
            }
          })
        })
        this.newTableTitle.forEach((item) =>{
          if(item.checked) {
            newShowColumn.push(item);
          }
        })
        newShowColumn.forEach((items, newIndex) => {
          let sortItem = {
            label: '',
            sort: '',
            width: '',
          };
          newLastColumn.forEach((item, lastIndex) => {
            if(items.label == item.label) {
              sortItem.label = items.label
              if(this.selection) {
                sortItem.sort = lastIndex + 1;
              } else {
                sortItem.sort = lastIndex;
              }
              
              sortItem.width = items.width == '' ? '' : items.width - 0 ;
              return false
            }
          });
          this.newSort.push(sortItem);
        });
        // console.log(this.newSort);
        // let a = []
        // this.newSort.forEach(item => {
        //   a.push(item.sort)
        // })
        // console.log(a)
        setTimeout(() => {
          this.setHeaderTitle();
        },0)
      },
      /**表头title */
      setHeaderTitle() {
        $(".el-table__header .cell").each((i) => {
          $(".el-table__header .cell").eq(i).attr('title', $(".el-table__header .cell").eq(i).text())
        })
      },
      /**改变样式*/
      setTableStyle() {
        this.showTableTitle = [];
        this.$nextTick(() => {
          this.showTableTitle = JSON.parse(JSON.stringify(this.newTableTitle));
          this.tableTitleLast = [];
          this.tableTitle.forEach(item => {
            if(item.custom) {
              this.tableTitleLast.push(item)
            }
          })
          this.newTableTitle.forEach(item => {
            if(item.checked && !item.custom) {
              this.tableTitleLast.push(item)
            }
          })
          this.tableChange();
        }, 1000)
      },
      /**恢复默认设置 */
      setDefault(flag) {
        if(!this.tableArray) {
          return false;
        }
        if(flag) {
          this.submit([]);
        }
        this.newTableTitle = [];
        let newTitle = [];
        this.tableArray.forEach(item => {
          newTitle.push(this.tableTitle[item])
        })
        this.showTableTitle = [];
        this.$nextTick(() => {
          this.showTableTitle = JSON.parse(JSON.stringify(this.tableTitle));
          this.tableTitleLast = JSON.parse(JSON.stringify(this.tableTitle));
          this.newTableTitle = JSON.parse(JSON.stringify(newTitle));
          this.setNewSort();
        })
      },
      /**关闭设置框 */
      setClose() {
        if(!this.setSave) {
          this.setBoxShow = false;
        } else {
          layerUtils.confirmMessage('表格设置已被修改，是否保存？','提示','warning',{showClose: false}).then(() =>{
            this.submit(this.newTableTitle);
          }).catch(() => {
            this.showTableTitle = JSON.parse(JSON.stringify(this.tableTitleCopy));
            this.newTableTitle = JSON.parse(JSON.stringify(this.tableTitleCopy));
            this.setTableStyle();
            this.setSave = false;
            this.setBoxShow = false;
          });
        }
      },
      /**提交保存 */
      submit(newTableTitle) {
        let params={
          moduleCode: this.moduleCode,
          moduleName: this.moduleName,
          jsonStr: newTableTitle,
          // jsonStr: [],
        }
        Common.addgirdconfig(params).then(data =>{
           if(data.type =='SUCCESS') {
              this.setSave = false;
              this.setBoxShow = false;
           }
        })
      },
      /**表格单选 */
      currentChange(val) {
        this.$emit("current-change", val)
      },
      /**表格单选 */
      rowClick(val) {
        this.$emit("row-click", val)
      },
      /**表格多选 */
      selectionChange(val) {
        this.$emit("selection-change", val)
      },
      //手动勾选
      currentSelect(val, row){
         this.$emit("select", val,row)
      },
      //双击行数据
      rowdblclick(row){
         this.$emit("rowdblclick", row)
      },
      /**行的className回调方法 */
      rowClassName(row,rowIndex){
        this.$emit("row-class-name", row,rowIndex)
      },
      //设置当前行高亮
      setCurrent(row) {
        this.$refs.testReportTable.setCurrentRow(row);
      },
      //勾选表格
      toggleRowSelect(row){
        this.$refs.testReportTable.toggleRowSelection(row,row.OP_CHECK);
      },
     
    },
  }
</script>
<style lang="stylus" scoped>
.moveBox
  background #fff
  font-size 12px
  .dragBox
    .dragItem
      height 32px
      .titleName
        width 60px
      .move
        cursor n-resize
      .noMove
        cursor no-drop
        color #bcbcbc
  .icon-close
    top 2px
    right 2px
.icon-shezhi
  top 2px
  right 2px
  font-size 12px
  z-index 3;

</style>
<style lang="stylus">
.tableChange
  height 100%
  .el-table
    height 100%!important
  .el-input__inner
    padding 3px 0 3px 10px!important
  .el-dialog
    transform none
    margin-left -198px
    .el-dialog__body
      padding 15px
  
</style>
