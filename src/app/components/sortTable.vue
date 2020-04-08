
<template>
  <div class="tableBg sortTable re">
    <span class="menu-btn" v-if="setShow">
      <i class="iconfont icon-shezhi" @click.stop="setBoxShow"></i>
      <el-dialog
        title="表格设置"
        size="tiny"
        :modal-append-to-body="false"
        :before-close="setClose"
        :modal="false"
        :width="370"
        :height="dialogHeight"
        :top="dialogTop"
        class="publicDialog sortTableDialog"
        :visible.sync="menuShow"
        >
        <div class="moveBox" v-show="menuShow" ref="moveBox">
          <draggable
            element="ul"
            class="dragBox"
            :options="{animation:100, handle:'.move'}"
            @end="moveChange"
            v-model="tableSetTitle"
            >
              <li class="dragItem re"
              :class="[item.fixed == '' ? 'move' : 'noMove']"
              v-for="(item, index) in tableSetTitle"
              :key="index"
              v-show="item.type != 'selection'"
              >
                <span class="mr-20 ml-5">
                  <span>名称：</span>
                  <span class="bold inlB ellipsis titleName">
                    <ellipsis-lable>
                      {{item.title}}
                    </ellipsis-lable>
                  </span>
                </span>
                <span class="mr-20"><span>列宽：</span> <el-input v-model="item.renderWidth" type="number" @blur="blurChange(item, index)" min="0" style="width: 60px"></el-input></span>
                <span class="mr-20"><el-checkbox v-model="item.visible" class="bold" @change="checkedChange(item.visible, index)">展示</el-checkbox></span>
                <i class="iconfont icon-move-updown vm mr-5 ab" :class="[item.fixed == '' ? 'move' : 'noMove']"></i>
              </li>
            </draggable>
            <div class="dialogBottom">
              <el-button @click="setDefault(true)">恢复默认设置</el-button>
              
              <el-button @click="setClose" type="primary">关 闭</el-button>
            </div>
        </div>
      </el-dialog>
    </span>
    <vxe-table
      ref="xTable"
      column-key
      @resizable-change="resizableChange"
      @current-change="currentChange"
      @select-change="selectChange"
      @select-all="selectAll"
      @cell-dblclick="rowdblclick"
      @header-cell-click="handleheaderCellClickEvent"
      highlight-hover-row
      :highlight-current-row="highlight"
      size="mini"
      :resizable="true"
      :border="border"
      height="100%"
      style="height: 100%"
      header-cell-class-name="headerCellClassName"
      class="vxe-table-element1 sortable-column-demo"
      :data="tableData"
      :customs.sync="customColumns"
      >
      <slot></slot>
    </vxe-table>
  </div>
</template>
<script>
  import * as layerUtils from 'app/utils/layerUtils'
  import Sortable from 'sortablejs'
  import Common from '@/app/api/common.js';
  import draggable from 'vuedraggable'

  export default {
    name: "sortTable",
    components: {
      draggable
    },
    data() {
      return {
        customColumns: [
        ],
        tableSetTitle: [], // 弹框表格头部设置
        menuShow: false, // 列显示隐藏
        lastTableTitle: [], // 默认排序与返回数据组合
        dialogTop: '20%', // 位置，顶部距离
        tableTitleCopy: [], // 用于恢复默认排序
        dialogHeight: '50%',
      }
    },
    props: {
      setShow: {
        type: Boolean,
        default: true,
      }, // 设置按钮展示
      tableData: Array, // 表格展示数据
      tableTitle: Array, // 表格头部排序
      moduleCode: String, // 表格Code
      moduleName: String, // 表格Name
      highlight: Boolean, // 行高亮
      border: Boolean, // 边框
      isheightrow: [Object,String], // 指定高亮行
      getServerSort: Boolean, // 是否调用接口排序
    },
    computed: {

    },
    watch: {
      /** */
      tableTitle() {
        this.setCustomColumns()
      },
      /**高亮行 */
      isheightrow(val){
        if(val && JSON.stringify(val) !='{}'){
          this.setCurrent(val)
        }
      },
      menuShow(val) {
        if(val) {
          this.setDialogSize()
        }
      },
    },
    created(){

    },
    mounted() {
      this.$nextTick(() => {
        this.sortTable()
        this.setCustomColumns()
        this.getTableTitle()
        this.tableTitleCopy = JSON.parse(JSON.stringify(this.tableTitle))


      })
      
    },
    methods: {
      /**获取表格头部顺序 */
      getTableTitle() {
        if(!this.setShow) {
          return false
        }
        let params={
          moduleCode: this.moduleCode,
          moduleName: this.moduleName,
        }
        Common.getgirdconfig(params).then(data =>{
          if(data.type =='SUCCESS') {
            if(data.data.data && data.data.data.length > 0){
              let _newTableTitle = JSON.parse(JSON.stringify(data.data.data));
              this.lastTableTitle = [] // 默认排序与返回数据组合
              let _newTableTitleLength = _newTableTitle.length
              let _tableTitleLength = this.tableTitle.length
              for(let i = 0; i < _newTableTitleLength; i++) {
                for(let j = 0; j < _tableTitleLength; j++) {
                  if(_newTableTitle[i].label == this.tableTitle[j].label) {
                    // 使用默认fixed
                    _newTableTitle[i].fixed = this.tableTitle[j].fixed
                    _newTableTitle[i].sortable = this.tableTitle[j].sortable
                    _newTableTitle[i].name = this.tableTitle[j].name
                  }
                  if(_newTableTitle[i].label == this.tableTitle[j].label) {
                    // 默认排序项与返回数据项相同插入，删除默认没有的
                    this.lastTableTitle.push(_newTableTitle[i])
                  }
                }
              }
              for(let j = 0; j < _tableTitleLength; j++) {
                let flag = false
                for(let i = 0; i < _newTableTitleLength; i++) {
                  if(_newTableTitle[i].label == this.tableTitle[j].label) {
                    flag = true
                  }
                }
                if(!flag) {
                  // 默认添加的项插入指定位置
                  this.lastTableTitle.splice(j, 0, this.tableTitle[j])
                }
              }
              this.$emit('getNewTableTitle', this.lastTableTitle)
            }
          }
        })
      },
      /**设置表格隐藏列 */
      setCustomColumns() {
        setTimeout(() => {
          this.tableSetTitle = []
          this.customColumns.forEach(item => {
            for(let i = 0; i < this.tableTitle.length; i++) {
              if(item.title == this.tableTitle[i].label && item.property == this.tableTitle[i].name) {
                item.visible = this.tableTitle[i].checked
              }
            }
            let _item = {
              type: item.type,
              title: item.title,
              renderWidth: item.renderWidth,
              visible: item.visible,
              fixed: item.fixed,
            }
            this.tableSetTitle.push(_item);
          })
          this.$refs.xTable.refreshColumn()
        },0)
      },
      /**表格拖动排序排序 */
      sortTable() {
        let xTable = this.$refs.xTable
        this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          animation: 100,
          dropBubble:true, // 发生 drop事件 拖拽的时候是否阻止事件冒泡 
          dragoverBubble: true, //发生 dragover 事件 拖拽的时候是否阻止事件冒泡
          ghostClass: "sortable-ghost",  // Class name for the drop placeholder
          chosenClass: "sortable-chosen",  // Class name for the chosen item
          onEnd: ({ item, newIndex, oldIndex }) => {
            let { fullColumn, tableColumn } = xTable.getTableColumn()
            let targetThElem = item
            let wrapperElem = targetThElem.parentNode
            let newColumn = tableColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
                
              } else {
                wrapperElem.insertBefore(targetThElem,wrapperElem.children[oldIndex + 1])
                
              }
              return this.$XModal.message({ message: '不允许拖动到固定列！', status: 'error' })
            }
            // 转换真实索引
            let oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
            let newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
            this.tableTitleMoveSetSort(oldColumnIndex,newColumnIndex)
            // 移动到目标列
            let currRow = fullColumn.splice(oldColumnIndex, 1)[0]
            fullColumn.splice(newColumnIndex, 0, currRow)
            xTable.loadColumn(fullColumn)
            this.changeData(fullColumn)
          }
        })
      },
      /**数据转换成已有的保存格式 */
      changeData(customColumns, flag) {
        let newTableTitle = [];
        let tableTitleItem = {}
        customColumns.forEach(item => {
          tableTitleItem = {
            name: item.property,
            label: item.title,
            width: item.renderWidth,
            checked: item.visible,
            fixed: item.fixed,
          }
          newTableTitle.push(tableTitleItem)
        })
        if(flag) {
          this.$emit('getNewTableTitle', newTableTitle)
        }
        
        this.saveTableSet(newTableTitle)
      },
      /**保存表格设置 */
      saveTableSet(newTableTitle) {
        if(!this.setShow) {
          return false
        }
        let params={
          moduleCode: this.moduleCode,
          moduleName: this.moduleName,
          jsonStr: newTableTitle,
          // jsonStr: [],
        }
        // console.log(params)
        // return false;
        Common.addgirdconfig(params).then(data =>{
           if(data.type =='SUCCESS') {

           }
        })
      },
      /** 表头点击 */
      handleheaderCellClickEvent({ column, triggerResizable, triggerSort, triggerFilter }) {
        // console.log({ column, triggerResizable, triggerSort, triggerFilter }, 1000)
        if(column.sortable && !(triggerResizable || triggerSort || triggerFilter)) {
          const item = this.$refs.xTable.getCurrentRow();
          if(column.order == "desc") {
            if(this.getServerSort) {
              column.order = ''
              this.$emit('getNewSortData', '',column.property)
            } else {
              this.$refs.xTable.clearSort();
            }
          } else if(!column.order) {
            if(this.getServerSort) {
              this.$refs.xTable.clearSort();
              column.order = 'asc'
              this.$emit('getNewSortData', 'asc',column.property)
            } else {
              this.$refs.xTable.sort(column.property,"asc")
            } 
            
          } else {
            if(this.getServerSort) {
              column.order = 'desc'
              this.$emit('getNewSortData', 'desc',column.property)
            } else {
              this.$refs.xTable.sort(column.property,"desc")
            }
          }
          this.$nextTick(()=>{
            this.setCurrent(item);
          })
        }
      },
      /**显示 */
      setBoxShow() {
        this.menuShow = true
      },
      /**隐藏 */
      setClose() {
        this.menuShow = false
      },
      /**显示/隐藏列 */
      linechange() {
        this.customColumns[3].visible = false
        this.$refs.xTable.refreshColumn()
        this.changeData(this.customColumns)
      },
      /**改变列宽 */
      resizableChange(item){
        this.tableSetTitle[item.columnIndex].renderWidth = item.column.resizeWidth
        this.changeData(this.customColumns)
      },
      /**拖拽位置改变 */
      moveChange(e) {
        if(e.oldIndex > e.newIndex && this.tableSetTitle[e.newIndex + 1].fixed != '' || e.oldIndex < e.newIndex && this.tableSetTitle[e.newIndex - 1].fixed != '') {
          this.tableTitleMoveSetSort(e.newIndex,e.oldIndex)
          layerUtils.showMessage('不允许拖动到固定列！',layerUtils.messageType.WARNING);
          return false;
        }
        this.dialogMoveSetSort(e.oldIndex,e.newIndex)
      },

      /**光标离开 */
      blurChange(item, index) {
        if(item.renderWidth == '') {
          item.renderWidth = ''
        } else if(item.renderWidth < 40) {
          item.renderWidth = 40;
          layerUtils.showMessage('列宽不可小于40',layerUtils.messageType.WARNING);
        }
        this.customColumns[index].resizeWidth = item.renderWidth
        this.customColumns[index].renderWidth = item.renderWidth
        this.$refs.xTable.refreshColumn()
        this.changeData(this.customColumns)
      },
      /**多选框改变 */
      checkedChange(show, index) {
        this.customColumns[index].visible = show
        this.$refs.xTable.refreshColumn()
        this.changeData(this.customColumns)
      },
      /**表格头部拖拽排序 */
      tableTitleMoveSetSort(oldIndex, newIndex) {
        let oldColumn = this.tableSetTitle[oldIndex]
        this.tableSetTitle.splice(oldIndex, 1)
        this.tableSetTitle.splice(newIndex, 0, oldColumn)
      },
      /**弹框拖拽设置排序 */
      dialogMoveSetSort(oldIndex, newIndex) {
        let oldColumn = this.customColumns[oldIndex]
        this.customColumns.splice(oldIndex, 1)
        this.customColumns.splice(newIndex, 0, oldColumn)
        this.$refs.xTable.refreshColumn()
        this.changeData(this.customColumns)
      },

      /**恢复默认设置 */
      setDefault() {
        this.saveTableSet([]);
        this.$emit('getNewTableTitle', this.tableTitleCopy)
        this.setClose()
      },
      /**设置弹框大小设置 */
      setDialogSize() {
        let _height = document.body.clientHeight;
        let _length = this.tableSetTitle.length
        let _dialogHeight = ((this.tableSetTitle.length * 32 + 116) / _height) * 100 
        this.dialogHeight = _dialogHeight + '%'
        this.dialogTop = (100 - _dialogHeight) / 2.5 + '%'
        if(_dialogHeight > 90) {
          this.dialogHeight = '90%',
          this.dialogTop = '4%'
        }
        $(".sortTableDialog .el-dialog").css({
          top: this.dialogTop
        })
      },
      /**设置当前行高亮 */
      setCurrent(row) {
        this.$refs.xTable.setCurrentRow(row);
        this.$refs.xTable.scrollToRow(row);
      },
      /**表格单选 */
      currentChange(val) {
        this.$emit("current-change", val.row)
      },
      /**表格多选 */
      selectChange(val) {
        this.$emit("select-change", val.selection)
      },
      /**表格全选 */
      selectAll(val) {
        this.$emit("select-all", val.selection)
      },
      /**设置表格选中 */
      toggleRowSelection(rows) {
        this.$refs.xTable.setSelection(rows, true)
        this.getSelectEvent()
      },
      /**获取选中 */
      getSelectEvent() {
        let selectRecords = this.$refs.xTable.getSelectRecords()
        this.$emit("select-change", selectRecords)
      },
      /**清除选中 */
      clearSelection() {
        this.$refs.xTable.clearSelection()
        this.$emit("select-change", [])
      },
      /**双击行数据 */
      rowdblclick(row){
        this.$emit("row-dblclick", row.row)
      }
    }
  }
</script>
<style lang="stylus" scoped>
.tableBg
  width 100%
  height 100%
  .menu-btn
    z-index 100
    right 2px
    top 0
    display inline-block
    position absolute
    .iconfont
      font-size 12px
    .menu-wrapper
      position absolute
      background-color #fff
      font-size 12px
      user-select none
      border 1px solid #e8eaec
      right 0
      top 14px
      overflow-y auto
      max-height 200px
      .checkbox-item
        display block
        white-space nowrap
        margin-left 0
        padding 4px 10px
    .moveBox
      background #fff
      font-size 12px
      .dragBox
        .dragItem
          height 32px
          line-height 26px
          span
            display inline-block
            vertical-align middle
          .titleName
            width 60px
          .move
            cursor n-resize
          .noMove
            cursor no-drop
            color #bcbcbc
          .iconfont
            font-size 16px
            right 0
            top 3px
        .noMove
          cursor no-drop
</style>
<style lang="stylus">
.sortTable
  .el-input__inner
    padding 3px 0 3px 10px!important
  .el-dialog__body
    padding 10px
  .vxe-table
    font-size 12px !important
    .fixed-left--wrapper
      .vxe-cell
        height 23px
    .fixed-right--wrapper
      .vxe-cell
        height 23px
    .vxe-table--body
      .vxe-cell
        height 23px
  .row--current
    color #fff
    .iconfont 
      color #fff
  .vxe-table.vxe-editable.size--mini .vxe-body--column, .vxe-table.size--mini .vxe-header--column.col--ellipsis, .vxe-table.size--mini .vxe-body--column.col--ellipsis, .vxe-table.size--mini .vxe-footer--column.col--ellipsis
    vertical-align top
  .vxe-table .vxe-table--body-wrapper.fixed-right--wrapper
    top 24px !important
  .vxe-table .vxe-table--body-wrapper.fixed-left--wrapper
    top 24px !important
  [class*="vxe-header--"]
    overflow hidden
  .vxe-header--column .vxe-resizable
    right -6px
  .vxe-table .vxe-table--body-wrapper
    height calc(100% - 24px) !important

.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen
  background-color: #dfecfb;

.sortable-ghost,
.sortable-chosen
  background-color lightblue
.headerCellClassName .vxe-sort-wrapper
  display none
.headerCellClassName
  background rgb(238,241,246)
  cursor pointer
  user-select none
.headerCellClassName .custom-sort 
  padding 0 2px
  margin-left -2px
  position: absolute
  right 5px
.headerCellClassName .custom-sort.is-order 
  color #409eff
  opacity 1
.headerCellClassName .custom-sort
  opacity 0.3
.headerCellClassName .custom-sort:hover
  opacity: 1
  

</style>

