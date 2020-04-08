export default {
  computed: {
    
  },
  methods: {
    /**菜单权限控制 */
    checkMenuPower:function(powerItem, menuPowerList){
      console.log('sxd',powerItem)
      if(!powerItem){
        return true;
      }
      let powerCode = powerItem.POWERCODE;
      if(!powerCode||powerCode==""){
        return true;
      }
      if(menuPowerList && menuPowerList[powerCode] && menuPowerList[powerCode]["VALUE"]=="1")
      {
        return true;
      }
      return false;
    }
  }
};
