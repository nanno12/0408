<template>
  <ul :class="[!isHover? 'out':'','menu']"
      @mousemove="moveIn"
      @mouseout="moveOut">
    <li v-for="(item,index) in routerLink" :class="[item.isOpen && current == index ? 'open':'']" :key="index">
      <div class="link" @click="item.isOpen = !item.isOpen;current = index;">{{ item.text }}
        <i :class="[ isHover ? 'active':'','iconfont icon-xxjt']"></i>
      </div>
      <ul class="submenu" :class="[item.isOpen  && current == index  ? 'open':'close']">
        <li v-for="(subItem,subIndex) in item.subMenu" :key="subIndex">
          <router-link :to="subItem.link">{{ subItem.text }}</router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
  export default {
    data(){
      return {
        routerLink:[
          {
            text:'字典配置',
            subMenu:[
              {
                text:'查询统计',
                link:'/querystatistics',
              },
            ],
            isOpen:false
          }
        ],
        isHover:true,
        current:-1,
        timeOutId:0
      }
    },
    created() {
      this.$nextTick(function () {
        this.$root.$on('Show_Menu',_ =>{
          this.isHover = !this.isHover;
          this.moveOut();
        });
      })
    },
    methods:{
      moveOut:function () {
        this.timeOutId = setTimeout(_=>{
          this.isHover = true;
        this.current = -1;
        },2000);
      },
      moveIn:function () {
        clearTimeout(this.timeOutId);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .submenu{
    transition: all .5s ease;
  }
  .submenu.open{
    display block
  }
  .submenu.close{
    display: none;
    height: 195px;
    padding-top: 0px;
    margin-top: 0px;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
</style>
