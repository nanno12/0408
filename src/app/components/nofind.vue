<!--
* @author: chuyunshi
* @date: 2018/10/23
* @module: 个人信息组件
-->
<template>
  <div class="nofindBox">
    <img class="text404" src="static/image/404.png" alt="">
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    created() {
      let str = ['3','1','5','7']
      let str1 = Math.min(str)
    //  let array = ['name','age','red','name','pinck','green']
    //  let arr1 = array.indexOf("name",3)
    //  array.lastIndexOf("name")
    //  let arr1 = array.splice(2,1,"pinck1","green2")//'age',
     console.log('1aer',str1,Math.min(3,1,5,7),Math.min.apply(Math,str));
    },
  }
</script>
<style lang="stylus" scoped>
.nofindBox
  height 100%
  background rgb(255,255,255)
  border-radius 6px
  .text404
    font-size 100px
    font-weight bold
    position fixed
    left 50%
    top 36%
    transform translate(-50%, -50%)
    width 50%
    max-width 300px


</style>
<style lang="stylus">

</style>
