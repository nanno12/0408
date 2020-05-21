<template>
<div>
  <el-table
    :data="list"
    height="324"
    border>
    <el-table-column
      prop="title"
      label="Hacker News Title">
    </el-table-column>
    <el-table-column
      prop="author"
      label="Author"
      width="125">
    </el-table-column>

    <infinite-loading
      slot="append"
      @infinite="infiniteHandler"
      force-use-infinite-wrapper=".el-table__body-wrapper">
    </infinite-loading>
  </el-table>
  <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
    <template slot="suf-append">
      <i class="w-icon-search"></i>
    </template>
  </w-input>
</div>
 
</template>
<script>
  import { debounce } from 'throttle-debounce'
  import apiData from '../application/api/api'
  import InfiniteLoading from 'vue-infinite-loading';

  import axios from 'axios';
  // const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';

  export default {
    components: {
      InfiniteLoading
    },
    data () {
      return {
        // loading: false,
        value2: '',
        page: 0,
        page1:20,
        list: [],
        // s:0,
        // e:20,
        // tableData: []
      }
    },
    async created () {
      // this.currentPage = 1
      // const res = await apiData.getQuery({CHARGE_SEARCH:''})
      // console.log(res);
      // // this.list = res.data
      // this.list = res.data.slice(0,20)
      // this.totalPage = res.data.length
      // this.tableData = res.data
    },
    watch: {
    
    },
    methods: {
      	async infiniteHandler($state) {
          console.log('$state',$state);
           const res = await apiData.getQuery({CHARGE_SEARCH:''})
            console.log(res);
            
            this.list = res.data.slice(this.page,this.page1)
            // this.list = this.list.concat(res.data);
            console.log('list',this.list);
            this.page += 20
            this.page1 += 20
      // this.list = res.data.slice(0,20)
      // this.totalPage = res.data.length
      // this.tableData = res.data
        // const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';
        // axios.get(api, {
        //   // params: {
        //   //   page: this.page,
        //   // },
        // }).then(({ data }) => {
        //   if (data.hits.length) {
        //     this.page += 1;
        //     this.list = this.list.concat(data.hits);
        //     $state.loaded();
        //   } else {
        //     $state.complete();
        //   }
        //   });
      },
      onInfinite() {
          setTimeout(() => {
            console.log('8098590');
            const temp = [];
            for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
              console.log('iiii',i);
              temp.push(i);
            }
            console.log(temp,'8098590');
            this.list = this.list.concat(temp);
            console.log('temp','8098590',this.list);
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          }, 100);
        }
      },
    }
  // }
</script>
