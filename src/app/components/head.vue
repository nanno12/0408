<template>
  <div class="header clearfix">
    <img  alt="logo"
          title="logo"
          src=""/>
    <ul class="nav-l">
      <li v-for="item in routerLink" :class="item.active ? 'active':''">
        <router-link :to="item.link">{{ item.text }}</router-link>
      </li>
    </ul>
    <ul class="nav-r">
      <li>
        <input type="text" placeholder="请输入关键字..."/>
        <i class="iconfont icon-yuyi yuyi"></i>
      </li>
      <li><span class="toxi">您好，管理员[Admin]</span></li>
      <li><i class="iconfont icon-tixi"></i></li>
      <li><i class="iconfont icon-cada" @click="showMenu"></i></li>
    </ul>
  </div>
</template>
<script>
    export default {
        data(){
            return {
                routerLink:[
                  {
                      text:'查询统计',
                      link:'/querystatistics',
                      active:true
                  }, 
                  {
                      text:'接口管理',
                      link:'/apiManage',
                      active:false
                  },
                ]
            }
        },
      methods:{
            //显示菜单
            showMenu:function () {
              this.$root.$emit('Show_Menu');
            }
      }
    }
</script>
