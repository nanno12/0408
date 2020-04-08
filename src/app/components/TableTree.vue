<template>
  <div class="menu-table-wrapper">
    <el-table
      :data="tableData"
      ref="parentId"
      class="menu-table short-table"
      :highlight-current-row='false'
      row-key="TIMERANGECODE"
      @header-click="headerClick"
      @row-click="rowClick"
      @select-all="selectAll"
      @select="select"
      default-expand-all
      :expand-row-keys='expands'
      :row-class-name="setCurrentDisabled"
      :class="{'expandThead':!labelClass}"
      style="width: 100%">
      <!-- 主菜单 -->
      <el-table-column type="expand"
                      :label-class-name="labelClass ? 'expand' : ''">
        <template slot-scope="scope">
          <el-table
            ref="personListTable"
            class="inner-table short-table"
            :highlight-current-row='false'
            :row-class-name="setCurrentDisabled"
            @row-click="sonMenuChange"
            row-key="RULENO"
            :data="scope.row.tatitemlist">
            <!-- 勾选 -->
            <el-table-column
              :width="checkedAll ? '44.5':'48'"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              width="50"
              v-if="checkedAll"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.AUTHORIZEDSTATUS" @change.native="change(scope.row)"></el-checkbox>
              </template>
            </el-table-column>
            <template v-for="(item,index) in innerTitle">
              <!--标准表格-->
              <el-table-column
                :prop="item.prop"
                :width="item.width"
                :class-name="item.type==='name' ? 'inner-menu-name':''"
                :show-overflow-tooltip="item.showOverFlowToolTip"
                :key='index'>
              </el-table-column>
            </template>
          </el-table>
        </template>
      </el-table-column>
      <!-- 全选 -->
      <el-table-column
        type="selection"
        v-if="checkedAll"
        width="50">
      </el-table-column>
      <template v-for="(item,index) in tableTitle">
        <el-table-column
          :prop="item.prop"
          :width="item.width"
          :class-name="item.type==='name' ? 'menu-name':''"
          :show-overflow-tooltip="item.showOverFlowToolTip"
          :label="item.label"
          :key='index'>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
  import DataHandle from '@/app/utils/dataHandle'
  import * as layerUtils from 'app/utils/layerUtils'
  export default {
    data() {
      return {
        expands: [],//存放展开行
        currentRow: {},//表格当前行
        sonCurrentRow:{},//表格当前行--子菜单
        sonMenuCurrent:{},//子菜单的当前行
        sonMenuCueerentList:[],//点击子菜单时的子菜单列表
        sonMenuList:[],//点击每个主菜单对应的子菜单列表
        labelClass: Boolean,//控制展开列的标题样式
        checkResourceList:[],
        headerInfo:{
          type:'expand'
        },//头列信息
      }
    },
    props: {
      tableTitle: Array,//表格列表名称
      innerTitle: Array,//展开表格列表名称
      checkedAll: Boolean,//控制是否多选
      tableData: Array,//表格数据
      type: String,
      initData:Object,//弹框初始化数据
      powers:String,
      menuImportType:String,
      powersList:Array
    },
    computed: {

    },
    created() {
      this.$nextTick(_ => {
      })
        
    },
    watch: {
      tableData(val) {
        // 默认点第一个
        if(val.length>0 && val[0].tatitemlist.length>0){
          this.sonMenuChange(this.tableData[0].tatitemlist[0])
        }
      }
    },
    methods: {
      /**当表头被点击 某一列的信息 */
      headerClick(col) {
        this.$set(this.headerInfo,'type',col.type)
        if (col.type === "expand") {
          this.labelClass = !this.labelClass;
          if(this.labelClass){
            this.tableData.forEach(item => {
              if (item.tatitemlist.length !== 0) {
                this.expands.push(item.TIMERANGECODE);
              }
            })
          }else{
            this.expands=[]
          }
        }
      },
      /**父节点-点某一行 */
      rowClick(row){
        console.log(this.headerInfo)
      },
      /**点击某一行 */
      sonMenuChange(row){
        this.sonCurrentRow=row
        this.$emit('getSonMuenuRow',row)
      },
      /**设置某一行为状态 */
      setCurrentDisabled(row, index) {
        if(row.RULENO==this.sonCurrentRow.RULENO){
          return "son-current-row"
        }
      },
      /**主菜单全选 */
      selectAll(val){
        let resourceList=[]
        if(val.length>0){
          val.filter(item => {
            return item.resourcelist.length>0
          }).map(item1 => {
            item1.AUTHORIZEDSTATUS=true
            return item1.resourcelist.forEach(item2 =>{
             item2.AUTHORIZEDSTATUS=true
            })
          })
          val.forEach(item => {
            return item.resourcelist.forEach(item1 => {
              return resourceList.push(item1)
            })
          })
        }else{
           this.tableData.filter(item => {
            return item.resourcelist.length>0
          }).map(item1 => {
            item1.AUTHORIZEDSTATUS=false
            return item1.resourcelist.forEach(item2 =>{
             item2.AUTHORIZEDSTATUS=false
            })
          })
          resourceList=[]
        }
        this.checkResourceList=resourceList
        this.$emit('checkResourceChange',this.checkResourceList,'0')
      },
      /**点击每个主菜单 */
      select(val,row){
        this.sonMenuList=row.resourcelist
        row.AUTHORIZEDSTATUS=!row.AUTHORIZEDSTATUS
         if(row.AUTHORIZEDSTATUS){
          row.resourcelist.map(item => {
            item.AUTHORIZEDSTATUS=true
          })
        }else{
          row.resourcelist.map(item => {
            item.AUTHORIZEDSTATUS=false
          })
        }
        let resourceList=[]
        if(val.length>0){
          val.forEach(item => {
              return item.resourcelist.forEach(item1 => {
                return resourceList.push(item1)
              })
          })
        }else{
          resourceList=[]
        }
        resourceList=resourceList.filter(item =>{
          return item.AUTHORIZEDSTATUS===true
        })
        this.checkResourceList=resourceList
        this.$emit('checkResourceChange',this.checkResourceList,'1')
      },
       //找到父级节点这个对象
      foundParent(list, row) {
        for (let i = 0, len = list.length; i < len; i++) {
            if (list[i].MAINMENUCODE === row.MAINMENUCODE) {
              return list[i];
            }
        }
      },
      /**点击每个子菜单 */
      change(row){
        this.sonMenuCurrent=row
        let currentParent = this.foundParent(this.tableData, row);
        // 子菜单有一个勾选->主菜单勾选
        let exist = currentParent.resourcelist.findIndex(item => {
          return item.AUTHORIZEDSTATUS
        });
        if (exist > -1) {
          this.$refs.parentId.toggleRowSelection(currentParent, true);
           currentParent.AUTHORIZEDSTATUS=true;
        } else {
          if (row.AUTHORIZEDSTATUS) {
            return;
          }
          currentParent.AUTHORIZEDSTATUS=false;
          this.$refs.parentId.toggleRowSelection(currentParent, false);
        }
        if(row.AUTHORIZEDSTATUS){
           this.checkResourceList.push(row)
        }else{
          let existt=this.checkResourceList.findIndex(item =>{
            return row.MENUCODE==item.MENUCODE
          })
          if(existt>-1){
            this.checkResourceList.splice(existt,1)
          }
        }
        this.$emit('checkResourceChange',this.checkResourceList,'1')
      },
    },
    components:{
    }
  }
</script>

<style lang="stylus" scoped>
    .menu-table-wrapper{

    }
</style>
<style lang="stylus">
  .menu-table-wrapper{
    .menu-table {
      height: 100%;
      .current-disabled {
          color: #999;
      }
      .current-disabled .icon-start-using {
          color: #000;
      }
      > .el-table__body-wrapper {
        height: calc(100% - 31px)
      }
    }
    thead {
      .el-table__expand-column {
        transition: transform 0.2s ease-in-out;
        .cell:before {
          content: "\E606"
          font-family: 'element-icons' !important;
          color: #8492a6
          cursor pointer
        }
      }
      & th:first-child .cell{
        transform: rotate(90deg)
      }
      .expand {
        .cell {
          transform: rotate(90deg)
        }
      }
    }
    .expandThead thead th:first-child .cell{
      transform: rotate(0deg)
    }
    .el-table__expand-icon:before {
      content: "\E606"
      font-family: 'element-icons' !important;
      color: #8492a6
    }

    .el-table__expand-icon > i {
      display none
    }
    .el-table tr{
      border-bottom 1px solid #eee !important
    }
    .el-table__expanded-cell {
      height 100% !important
      padding: 0 !important;
      background-color: transparent !important;
      box-shadow none !important
      .el-table{
        border none !important
      }
      tr{
        border-bottom 1px solid #eee !important
      }
      & tr:last-child{
        border-bottom none !important
      }
    }

    .el-table__expand-icon {
      height: 31.2px;
    }

    .el-tabs__item {
      font-size: 12px;
    }
    .menu-name .cell{
      padding-right 0 !important
      padding-left 0 !important
    }
    .el-table td {
      border-bottom none !important
      &.menu-name {
        .cell {
          font-weight 700;
        }
      }
    }

    .inner-table {
      .el-table__header-wrapper {
        thead {
          display none
        }
      }
      .el-table__empty-block{
          min-height: 30px;
          .el-table__empty-text{
              display none
          }
      }
      .el-table__body-wrapper{
        tr.son-current-row{
              background: #4e97ff;
              color: #FFFFFF;
          }
        tr.add-son-current-row{
          background: #4e97ff;
          color: #FFFFFF;
        }
          
      }
      .inner-menu-name {
        .cell {
          padding-left: 20px !important;
        }
      }
    }
    .el-table--enable-row-hover .el-table__body tr:not(.current-row):hover > td {
      background-color: transparent !important;
      background-clip: padding-box;
    }
  }
</style>
