<template>
  <div>
    <w-pagination 
      :current-page="currentPage"
      :page-size="pageSize"
      @size-change='sizeChange'
      @current-change="currentChange"
      :show="['prev', 'next', 'total', 'jump']">
    </w-pagination>
  </div>
</template>
<script>
  export default {
    props: {
      currentPage:{
        type:Number,
        default:()=>{}
      },
      currentPage:{
        type:Array,
        default:()=>{}
      },
      pageSize:{
        type:Number,
        default:()=>{}
      }
    },
    methods: {
    sizeChange(val){
      console.log(`每页${val}条`)
      // 向父组件传递sizeChange事件，传入val值
      this.$emit('sizeChange',val)
    },
    currentChange(val){
      console.log(`当前页:${val}`)
      this.$emit('currentChange',val)
    }
    },
  }
</script>