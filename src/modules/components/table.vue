<template>
  <div>
    <w-table :data="tableData" border style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handleRow" >
      <w-table-column v-if="isShow.selection" type="selection" width="55"></w-table-column>
      <w-table-column v-if="isShow.index" type="index" label="序号"  width="80"></w-table-column>
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
          <w-button @click="handleCopy(scope.row)" v-if="isShow.copy" type="text" size="small">复制</w-button>
          <!-- <w-button @click="handleCopy(scope.row)" v-if="isShow.copy" type="text" size="small">复制</w-button> -->
          <w-button @click="handleEdit(scope.row)" v-if="!isShow.edit" type="text" size="small">修改</w-button>
          <w-button @click="handleDelete(scope.row,scope.$index)" type="text" size="small">删除</w-button>
        </template>
      </w-table-column>
      <slot name="handleColumn"></slot>
    </w-table>
  </div>
</template>
<script>
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
      }
    },
     data () {
      return {
        multipleSelection: [] // 多行选中
      }
    },
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
        this.$emit('handleEdit',{row, index})
      }
    }
  }
</script>
