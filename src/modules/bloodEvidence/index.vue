<template>
  <div class="home-page-wrap-ba home-page-body">
    <div class="blood">
      <title-style class=" mg-right_16 pd-bottom_22 po_re">
        <span slot="header">血液成分列表</span>
      </title-style>
      <ul class="tag-list">
        <li :class="detailsShow===index ? 'styleHover' : '' "
          class="tag-title"
          :key="index"
          v-for="(item, index) in bloodTagList"
          @click="handleBloodTab(item, index)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="details">
      <title-style class=" mg-right_16 pd-bottom_22 po_re">
        <span slot="header">规则明细列表</span>
        <w-input
          class="po_ab top_-5"
          style="left:120px"
          sufAppendIsButton
          v-model="value2" >
          <template slot="suf-append">
            <i class="w-icon-search"></i>
          </template>
        </w-input>
        <w-button class="po_ab top_-5 right_0" @click="handleAdd"  type="text" plain>+ 新增</w-button>
      </title-style>
      <win-table :listTable=detailsTableTitle
        v-if="detailsShow === 0"
        :tableData=detailsList
        :isShow=detailsIsShow>
      </win-table>
      <!-- <ul ref="element" class="rule_conditions">
        <li  v-for="(item,index) in ruleConditionsList" :key="index" class="rule_conditions_list">
          <w-checkbox-group v-model="ruleCheckboxData" @change="handleRuleCheckbox">
            <w-checkbox :label="index"> 
              <w-select placeholder="请选择科室类型" v-model="form.region" >
                <w-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options" >
                </w-option>
              </w-select>
              <w-select placeholder="请选择科室类型" v-model="form.region" >
                <w-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options" >
                </w-option>
              </w-select>
              <w-select placeholder="请选择科室类型" v-model="form.region" >
                <w-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options" >
                </w-option>
              </w-select>
              <w-input v-model="form.region" showCounter placeholder="请输入规则代码"></w-input>
              <w-button type="text" @click="handleRuleDele(item,index)" class="w-icon-delete"></w-button>
            </w-checkbox>
          </w-checkbox-group>
        </li>
        <li>
          <w-button type="text" @click="handleRuleButton('add')" class="iconfont iconweibiaoti--">新增</w-button>
          <w-button type="text" @click="handleRuleButton('item')" class="iconfont iconfenzu">分组</w-button>
          <w-button type="text" @click="handleRuleButton('noItem')" class="iconfont iconquxiaofenzu">取消分组</w-button>
        </li>
      <canvas id="mycanvas" width="20" height="700"></canvas>
      </ul> -->
    </div>
    <w-modal
      :close-on-click-modal="false"
      title="新增规则明细"
      :showClose="false"
      :visible.sync="visible"
      width="70%" >
      <w-form
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="120px"
        ref="form" >
        <w-row >
          <w-col :span="8">
            <w-form-item label="规则代码" prop="region" >
              <w-input v-model="form.region" showCounter placeholder="请输入规则代码"></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="8">
            <w-form-item label="规则名称" prop="region" >
              <w-input v-model="form.region" showCounter placeholder="请输入规则名称"></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="8">
            <w-form-item label="是否合理" prop="region" >
              <w-select placeholder="请选择是否合理" v-model="form.region" >
                <w-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options" >
                </w-option>
              </w-select>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="8">
            <w-form-item label="科室类型" prop="region" >
              <w-select placeholder="请选择科室类型" v-model="form.region" >
                <w-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options" >
                </w-option>
              </w-select>
            </w-form-item>
          </w-col>
          <w-col :span="8">
            <w-form-item label="判断顺序" prop="region" >
              <w-select placeholder="请选择判断顺序" v-model="form.region" >
                <w-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options" >
                </w-option>
              </w-select>
            </w-form-item>
            
          </w-col>
          <w-col :span="8">
            
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="12">
            <w-form-item >
              <w-radio v-model="value" label="1">手术</w-radio>
              <w-radio v-model="value" label="2">急诊</w-radio>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="12">
            <w-form-item label=" 规则生效条件"  prop="region">
              <template>规则生效条件</template>
            </w-form-item>
          </w-col>
        </w-row>
      </w-form>
      <span
        class="dialog-footer"
        slot="footer"
      >
        <w-button @click="reset">取 消</w-button>
        <w-button
          @click="submit"
          type="primary"
        >确 定</w-button>
      </span>
    </w-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: "", // 搜索值
      value:'',
      detailsShow: 0,
      visible: false,
      ruleConditionsList:[ 
        {

        }
      ],
      ruleCheckboxData:[],
      detailsTableTitle:[
        {
          label:'规则代码',
          prop:'name',
          width:'100px'
        },
        {
          label:'规则名称',
          prop:'name'
        },
        {
          label:'合理性条件判断',
          prop:'name'
        },
        {
          label:'是否合理',
          prop:'name',
          width:'80px'
        },
        {
          label:'使用年龄范围',
          prop:'name',
          width:'110px'
        },
        {
          label:'判断顺序',
          prop:'name',
          width:'80px'
        },
        {
          label:'是否手术',
          prop:'name',
          width:'80px'
        },
        {
          label:'是否急诊',
          prop:'name',
          
          width:'80px'
        }
      ],
      detailsList:[
        {
          time: "2019.05.12 11:02:33",
          status: "其他区签约",
          name: "赵宇翔",
          type: "其他"
        }
      ],
      detailsIsShow:{
        copy:true,
        stop:true,
        width:'200px'
        // operation:true
      },
      bloodTagList: [
        {
          id: "SX0001",
          name: "红细胞类"
        },
        {
          id: "SX0002",
          name: "冷沉淀"
        },
        {
          id: "SX0003",
          name: "血小板"
        },
        {
          id: "SX0004",
          name: "血浆类"
        },
        {
          id: "SX0005",
          name: "白细胞类"
        }
      ],
      form: {
        name: "",
        region: ""
      },
      rules: {
        region: [
          {
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ]
      },
      options:[]
    };
  },
  mounted(){
    this.$nextTick(()=> {
        let height = this.$refs.element.offsetHeight-32
        console.log('li',height);
      });
    
    // let canvas = document.getElementById("mycanvas")
    // if (canvas.getContext) {
    //   let context = canvas.getContext('2d');
    //   console.log('context',context);
    //   context.strokeStyle='#0F49ED'
    //   context.fillStyle='#0F49ED'
    //   context.lineWidth='2'
    //   context.font='5px sans-serif'
    //   // context.fillStyle='#0F49ED'
    //   context.moveTo(25, 15);
    //   context.lineTo(10, 15);
    //   context.lineTo(10, 60);
    //   context.lineTo(15, 60);
    //   context.stroke();
    // }
  },
  watch:{
    // 'ruleConditionsList' () {
    //   this.$nextTick(()=> {
    //     let height = this.$refs.element.offsetHeight-32
    //     console.log('li',height);
    //     let canvas = document.getElementById("mycanvas")
    //     if (canvas.getContext) {
    //       let context = canvas.getContext('2d');
    //       console.log('context',context);
    //       context.strokeStyle='#0F49ED'
    //       context.fillStyle='#0F49ED'
    //       context.lineWidth='2'
    //       context.font='5px sans-serif'
    //       // context.fillStyle='#0F49ED'
    //       context.moveTo(25, 15);
    //       context.lineTo(10, 15);
    //       context.lineTo(10, height);
    //       context.lineTo(10, height);
    //       context.stroke();
    //     }
    //   });
    // }
  },
  created() {},
  methods: {
    submit() {},
    reset() {},
    handleRuleCheckbox (eve) {
      console.log('eve',eve);
    },
    handleRuleButton (name) {
      console.log('name',name);
      if(name === 'add') {
        this.ruleConditionsList.push({})
      } else if (name === 'item') {
        this.$nextTick(()=> {
        let height = this.$refs.element.offsetHeight-32
        console.log('height',height,this.$refs.element.offsetHeight);
        console.log('li',height);
        let canvas = document.getElementById("mycanvas")
        if (canvas.getContext) {
          let context = canvas.getContext('2d');
          console.log('context',context);
          context.strokeStyle='#0F49ED'
          context.lineWidth='2'
          context.moveTo(15, 15);
          context.lineTo(10, 15);
          context.lineTo(10, height);
          context.lineTo(15, height);
          context.stroke();
          console.log((this.ruleCheckboxData.length - 1) * 40,this.ruleCheckboxData.length);
        }
      });
      }
    },
    handleRuleDele (item,index) {
      console.log('index',index,item);
      this.ruleConditionsList.splice(index)
    },
    // 界面新增按钮
    handleAdd() {
      this.visible = true
    },
    //
    handleBloodTab(item, index) {
      console.log(item, index);
      this.detailsShow = index;
      // this.titleVal = index
    },
  },
  
};
</script>
<style lang="scss" scoped>

.home-page-wrap-ba {
  position: relative;
  // height: 100%;
  background: rgba(255, 255, 255, 1);
  .blood {
    display: inline-block;
    /* display: block; */
    .tag-title {
      text-align: center;
      
      margin-bottom: 16px;
      width: 180px;
      height: 52px;
      background: rgba(243, 245, 249, 1);
      border-radius: 2px;
      line-height:52px;
      font-size: 14px;
    }
    .styleHover,
    .styleHover:hover {
        color: #0F49ED;
        background: rgba(207, 224, 255, 1) !important;
      }
  }
  .details {
    width:calc(100% - 226px);
    position: absolute;
    top: 16px;
    left: 0;
    margin-left: 210px;
    display: inline-block;
    .rule_conditions {
      position: relative;
      #mycanvas {
        // border: 1px solid #0F49ED;
        display: inline-block;
        position: absolute;
        top: 0;
        left: -25px;
      }
      .w-input,
      .w-select{
        width: 200px;
      }
      .w-checkbox {
        height: 32px;
        margin: 5px 0;
      }
    }
  }
}
</style>
<style lang='scss'>
.rule_conditions {
  .w-checkbox__input {
    padding: 6px 0;
  }
}

// .home-page-wrap-ba {
//   // height: 100%;
//   // background: rgba(234, 237, 244, 1);
//    .home-page-body{
//     // padding: 16px;
//     background: rgba(255, 255, 255, 1);
//     // border-radius: 2px;
//     position: relative;

//     .ul {
//       position: absolute;
//       top: 0;
//       left: 20px;
//     }

//     .table {
//       width: calc(100% - 200px);
//       margin-left: 200px;
//     }

//     .tag-title {
//       text-align: center;
//       display: inline-block;
//       margin: 16px 0px;
//       width: 180px;
//       height: 52px;
      
//       background: rgba(243, 245, 249, 1);
//       border-radius: 2px;
//     }
//   }
// }

.styleHover {
  color: #666;
}
</style>

