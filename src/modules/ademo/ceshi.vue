<template>
<div>
  <el-table
    :data="list"
    height="324"
    ref="table"
    border>
    <el-table-column
      prop="CHARGE_NAME"
      label="CHARGE_NAME">
    </el-table-column>
    <el-table-column
      prop="CHARGE_NAME"
      label="CHARGE_NAME">
    </el-table-column>
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
    // directives: {
    //   'fontSize': {
    //     bind(el, binding) {
    //       console.log('el, binding',el, binding);
    //         // 获取element-ui定义好的scroll盒子
    //       const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');
    //       SELECTWRAP_DOM.addEventListener('scroll', () => {
    //         /*
    //         * scrollHeight 获取元素内容高度(只读)
    //         * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
    //         * clientHeight 读取元素的可见高度(只读)
    //         * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
    //         * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
    //         */
    //         let sign = 20; // 定义默认的向上滚于乡下滚的边界
    //         const CONDITION = ((this.scrollHeight - this.scrollTop === this.clientHeight) &&  this.scrollTop > sign)// 注意: && this.scrollTop
    //         // console.log('CONDITION',CONDITION,this.scrollTop,this.currentPage);
    //         if(this.scrollTop > sign) {
    //             sign = this.scrollTop;
    //             // console.log('listData',this.listData);

    //             // const list = this.listData.slice(this.s,this.e)
    //             // list.map((item,index)=>{
    //             //   console.log('index',index);
    //             //   setTimeout(() => {
    //             //     this.list.push(item)
    //             //     this.loading = false
    //             //   }, 600)
    //             // })
    //             console.log('向下')
    //         }
    //         if(this.scrollTop < sign) {
    //           sign = this.scrollTop;
    //           console.log('向上')
    //           // const list = this.listData.slice(this.s,this.e)
    //           // this.s= this.s+20
    //           // this.e= this.e+20
    //           // console.log('this.s,this.e',this.s,this.e);
    //           }
    //         if(CONDITION) {
    //             binding.value();
    //         }
    //       })
    //     }
    //   }
    // },
    data () {
      return {
        // loading: false,
        value2: '',
        page: 0,
        page1:20,
        list: [],
        listData:[],
        costList:[],
        s:0,
        e:20,
        // tableData: []
      }
    },
    async created () {
      // this.currentPage = 1
      const res = await apiData.getQuery({CHARGE_SEARCH:this.value2})
      console.log(res);
      this.listData = res.data
      this.list = res.data.slice(this.s,this.e)
      // this.totalPage = res.data.length
      // this.tableData = res.data
    },
    watch: {
    
    },
    mounted() {
      const SELECTWRAP_DOM = this.$refs.table.bodyWrapper
      console.log('this.$refs.table.bodyWrapper',this.$refs.table.bodyWrapper);
      SELECTWRAP_DOM.addEventListener('scroll', () => {
        let scrollTop = SELECTWRAP_DOM.scrollTop
        // 变量windowHeight是可视区的高度
        let windowHeight = SELECTWRAP_DOM.clientHeight || SELECTWRAP_DOM.clientHeight
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = SELECTWRAP_DOM.scrollHeight || SELECTWRAP_DOM.scrollHeight
        let add = Math.ceil(scrollTop+windowHeight)
        if (add === scrollHeight) {
           const list = this.listData.slice(this.s,this.e)
            list.map((item,index)=>{
              console.log('index',index);
              setTimeout(() => {
                this.list.push(item)
                this.loading = false
              }, 600)
            })
            this.s= this.s+20
            this.e= this.e+20
            console.log('list',list);
          // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
          // if (!this.allData) this.getMoreLog()
          console.log(Math.ceil(scrollTop+windowHeight),'',scrollTop+windowHeight,scrollHeight);
        }
      })
      console.log('dom',SELECTWRAP_DOM,this.$refs.table);
    },
    methods: {
       tableLoadMore() {
         console.log('7598');
         console.log('listData',this.listData);
            // 表格到底后执行  这里写你要做的事
        },
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
