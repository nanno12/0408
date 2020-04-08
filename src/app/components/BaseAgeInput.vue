/*
 * 说明：
 *    1、v-model:对象必须包含AGE、AGEUNIT、AGE2、AGEUNIT2，如{AGE:2,AGEUNIT:'岁',AGE2:20,AGEUNIT2:'天'}
 *    2、age-unit-arr:单位下拉数据源，同“年龄单位”，要求，按照时间范围大小倒序
      3、示例：
 * <base-age-input class="formcontrol"
 *       :age-unit-arr="dataDiction['年龄单位']"
 *       v-model="patientModel">
 * </base-age-input>
 * @Author: s_xd@winning.com.cn 
 * @Date: 2018-07-02 14:30:52 
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2018-07-31 17:36:53
 */

<template>
  <div class="base-age">
    <!-- <base-select class="formcontrol element-ageUnit2"
                 :disabled="disabled" 
                 v-model="value.SEX" slot="append"  placeholder="">
    <base-option v-for='item in sexArr' :key="item.DICNAME" :label="item.NAME" :value="item.CODE"></base-option>
    / -->
    <!-- </base-select> -->
    <el-input placeholder="" v-only-number="{precision:0}"
              :maxlength="maxLength"
              :disabled="disabled" 
              v-model="value.AGE" 
              type="text" class="input-with-select formcontrol element-age">
    </el-input>
    <base-select class="formcontrol element-ageUnit"
              :disabled="disabled" 
              v-model="value.AGEUNIT" 
              slot="append" 
              placeholder="">
      <base-option v-for='item in ageUnitArr' :key="item.DICNAME" :label="item.NAME" :value="item.CODE"></base-option>
    </base-select>
    <el-input :disabled="disabled" v-only-number="{precision:0}"
              :maxlength="maxLength"
              placeholder="" 
              v-model="value.AGE2" 
              type="text" 
              class="input-with-select formcontrol element-age2">

    </el-input>
    <base-select class="formcontrol element-ageUnit2"
                 :disabled="disabled" 
                 v-model="value.AGEUNIT2" slot="append"  placeholder="">
      <base-option v-for='item in ageUnit2Arr' :key="item.DICNAME" :label="item.NAME" :value="item.CODE"></base-option>
    </base-select>
    

  </div>
</template>
<script>
export default {
  name: "BaseAgeInput",

  data() {
    return {
      //输入框最大长度
      maxLength: 3
    };

  },
  props: {
    value: {
      // 必须要使用value
      default: {

      }
    },
    
    ageUnitArr: {
      // 必须要使用value
      default: function(){
        return [];
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ageUnit2Arr(){
      let findIdx = this.ageUnitArr.findIndex((item) => {
        return item.CODE == this.value.AGEUNIT;
      });

      findIdx=findIdx||-1;
      let filterArr = this.ageUnitArr.filter((item,index) => {
        return index>findIdx &&item.CODE!="岁";
      });
      
      findIdx = filterArr.findIndex((item) => {
        return item.CODE == this.value.AGEUNIT2;
      });
      if(findIdx<0){
        this.value.AGEUNIT2="";
      }

      return filterArr;
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style lang="stylus" scoped>
.base-age {
  margin: 0;
  padding: 0;
  .element-age,.element-ageUnit,.element-age2,.element-ageUnit2{
    float left
  }

  .el-select {
    width: 55px;
  }
  .el-input {
    width: calc((100% - 55*2px)/2);
    margin: 0;
    padding: 0;
    .el-input__inner{
      border-right :0 !important
    }
  }

  .el-input.is-disabled .el-input__inner {
    background: #fffef1;
    color: #444444;
  }
}
</style>


<style lang="stylus">
.base-age {
  .element-age{
    .el-input__inner{
      border-right :none !important;
      border-bottom-right-radius :0 !important
      border-top-right-radius :0 !important
    }
  }
  .element-age2 {
    .el-input__inner{
      border-right :none !important
      border-left  :none !important
      border-bottom-right-radius:0 !important
      border-top-right-radius :0 !important
    }
  }
  
  .element-ageUnit{
    .el-input__inner{
      border-radius :0px !important
    }
  }
  .element-ageUnit2 {
    .el-input__inner{
      border-bottom-left-radius :0px !important
      border-top-left-radius :0px !important
    }
  }

}
</style>