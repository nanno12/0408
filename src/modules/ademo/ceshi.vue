<template>
<div>
  <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
    <template slot="suf-append">
      <i class="w-icon-search"></i>
    </template>
  </w-input>
  <w-table
    v-loading="loading" :data="tableData"
    win-loading-text="正在获取数据..."
    height="200"  style="width: 100%"
    :lower-threshold="10"
    @scrollToLower="scrollToLower">
    <w-table-column  prop="name" label="药品" width="180">
    </w-table-column>
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
        scrollToLower: () => {},
        tableData: []
      }
    },
    async created () {
      const search = '12'
      const res = await apiData.getQuery()
        console.log(res);
      
    },
    methods: {
      ceshi () {
        console.log('123');
      },
      async fetchData () {
        this.loading = true
        
        setTimeout(() => {
          this.tableData.push({
            name:this.tableData.length,
          })
          this.loading = false
        }, 600)
      }
    },
    mounted () {
      this.scrollToLower = debounce(200, this.fetchData)
    }
  }
</script>
