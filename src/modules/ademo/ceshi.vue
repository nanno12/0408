<template>
<div>
  <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
    border style="width: 100%"
    :row-key="getRowKeys"
    @selection-change="handleSelectionChange"
    height="324"
    ref="tableData"
   >
   <el-table-column :reserve-selection="true" type="selection">
    </el-table-column>
    <el-table-column
      prop="CHARGE_NAME"
      label="CHARGE_NAME">
    </el-table-column>
    <el-table-column
      prop="CHARGE_NAME"
      label="CHARGE_NAME">
    </el-table-column>
  </el-table>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="1"
    background
    layout="total, prev, pager, next"
    :total="total">
  </el-pagination>
  <!-- <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
    <template slot="suf-append">
      <i class="w-icon-search"></i>
    </template>
  </w-input> -->
</div>
 
</template>
<script>
  import apiData from '../application/api/api'
  import InfiniteLoading from 'vue-infinite-loading';


  export default {
    data () {
      return {
        value2: '1',
        pagesize:10,
        total:0,
        currentPage:1,
        multipleSelectionAll:[],//所有选中的数据包含跨页数据
        multipleSelection:[],// 当前页选中的数据
        tableData:[],
        costList:[],
        getRowKeys(row) {
          console.log('row');
        return row.CHARGE_CODE
      },
    
      }
    },
    async created () {
      const res = await apiData.getQuery({CHARGE_SEARCH:this.value2})
      console.log(res);
      this.tableData = res.data
      this.total = res.data.length
    },
    watch: {
    
    },
    mounted() {
    },
    methods: {
      handleSelectionChange(rows) {
         this.multipleSelection = val;//勾选放在multipleSelection数组中
      },
      // handleSizeChange(val) {
      //   this.pagesize =val;
      // },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
 
    }
  }
</script>
