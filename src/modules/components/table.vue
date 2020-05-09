<template>
  <div>
    <w-table :data="tableData" border style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handleRow" >
      <w-table-column v-if="isShow.selection" type="selection" width="55"></w-table-column>
      <w-table-column v-if="isShow.index" type="index" :label="isShow.indexTitle" align="center"  width="80"></w-table-column>
      <w-table-column v-for="(item,index) in listTable" :key="index" 
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width">
      </w-table-column>
      <w-table-column
        v-if="!isShow.operation"
        :width="isShow.width"
        :fixed="isShow.fixed"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <w-button @click="handleCopy(scope.row)" v-if="isShow.copy" type="text">复制</w-button>
          <!-- <w-button @click="handleCopy(scope.row)" v-if="isShow.copy" type="text" size="small">复制</w-button> -->
          <w-button @click="handleEdit(scope.row)" v-if="!isShow.edit" type="text">修改</w-button>
          <w-button @click="handleDelete(scope.row,scope.$index,t)" type="text" >删除</w-button>
        </template>
      </w-table-column>
      <slot name="handleColumn"></slot>
    </w-table>
    <w-pagination 
      :total="QUERY_PAGE.total" :page-size="4"
      v-if="isShow.pagination"
      @size-change='sizeChange'
      @current-change="currentChange"
      :show="['prev', 'next', 'total', 'jump']">
    </w-pagination>
  </div>
</template>
<script>
  import {QUERY_PAGE} from '../constant.js'
  export default {
    props :{
      // 这是相应的字段展示
        listTable: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 这是数据源
      tableData: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 是否显示功能
      isShow: {
        type: Object,
        default: function () {
          return {}
        }
      },
      
    },
     data () {
      return {
        height:'calc(100vh - 150px)',
        multipleSelection: [] // 多行选中
      }
    },
    
    // watch:{
    // tableData (oldVal, newVal) {
    //   this.$nextTick(() => {
    //     this.tableData.map(item => {
    //       let arr = [...this.multipleSelection]
    //       if (arr) {
    //         const find = arr.find(it => it.chargeItemCode === item.chargeItemCode)
    //         if (find) {
    //           this.$refs.tableData.toggleRowSelection(item, true)
    //         }
    //       }
    //     })
    //   })
    // }
    // },
    methods:{
      //将选中的行发送到父组件
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.$emit('handleSelectionChange', val)
      },
      handleRow(row) {
        this.$emit('handleRow', row)
      },
      handleEdit (row) {
        this.$emit('handleEdit', row)
      },
      handleCopy (row) {
        this.$emit('handleCopy', row)
      },
      handleDelete (row, index) {
        this.$emit('handleDelete',row, index)
      },
      sizeChange(val){
      console.log(`每页${val}条`)
      // 向父组件传递sizeChange事件，传入val值
      this.$emit('sizeChange',val)
      },
      currentChange(val){
        console.log(`当前页:${val}`)
        this.$emit('currentChange',val)
      }
    }
  }
</script>
