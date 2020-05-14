<template>
<div>
  <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
    <template slot="suf-append">
      <i class="w-icon-search"></i>
    </template>
  </w-input>
  <!-- <w-table
        :data="costList"
        v-loading="loading"
        win-loading-text="正在获取数据..."
        stripe
        ref="costList"
        :lower-threshold="10"
        @scrollToLower="scrollToLower"
        :empty-text="tableconten"
        border
        style="height: calc(100vh - 500px); overflow-y: auto;"
        @selection-change="handleSelectionChange">
        <w-table-column type="selection" :reserve-selection="true" width="55"></w-table-column>
        <w-table-column prop="CHARGE_CODE"  width= '120px' label="收费编码"></w-table-column>
        <w-table-column prop="CHARGE_NAME"  label="收费项目"></w-table-column>
        <w-table-column prop="CHARGE_PRICE"  width= '150px' align= 'right' label="项目价格（元）"></w-table-column>
      </w-table> -->
  <w-table
    v-loading="loading"
    :data="tableData"
    win-loading-text="正在获取数据..."
    height="200"
    ref="tableData"
    :lower-threshold="10"
    @scrollToLower="scrollToLower">
    <w-table-column type="selection" :reserve-selection="true" width="55"></w-table-column>
    <w-table-column prop="CHARGE_CODE"  width= '120px' label="收费编码"></w-table-column>
    <w-table-column prop="CHARGE_NAME"  label="收费项目"></w-table-column>
    <w-table-column prop="CHARGE_PRICE"  width= '150px' align= 'right' label="项目价格（元）"></w-table-column>
  </w-table>
</div>
 
</template>
<script>
  import { debounce } from 'throttle-debounce'
  import apiData from '../application/api/api'

  export default {
    data () {
      return {
        loading: false,
        value2: '',
        list:[],
        s:0,
        e:20,
        scrollToLower: () => {},
        tableData: []
      }
    },
    async created () {
      const res = await apiData.getQuery({CHARGE_SEARCH:'药'})
      console.log(res);
      this.tableData = res.data.slice(0,20)
      this.list = res.data
    },
    methods: {
      ceshi () {
        console.log('123');
      },
      async fetchData () {
        this.loading = true
        const list = this.list.slice(this.s,this.e)
        //删除起始下标为1，长度为2的一个值(len设置2) 
        list.map(item=>{
          setTimeout(() => {
          this.tableData.push(item)
          this.loading = false
        }, 600)
        })
        this.s= this.s+20
        this.e= this.e+20
        console.log(this.s,this.e);
      }
    },
    mounted () {
      this.scrollToLower = debounce(200, this.fetchData)
    }
  }
</script>
