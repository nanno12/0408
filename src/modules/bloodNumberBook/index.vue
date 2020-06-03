<template>
  <div class="blood-number-book">
    <w-row >
      <w-col :span="4" class="blood">
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
      </w-col>
      <w-col :span="20" class="details">
        <title-style class=" mg-right_16 pd-bottom_22 po_re">
          <span slot="header">规则明细列表</span>
          <w-input
            class="po_ab top_-5"
            style="left:120px; width:200px"
            sufAppendIsButton
            v-model="search" >
            <template slot="suf-append">
              <i class="w-icon-search"></i>
            </template>
          </w-input>
          <w-button class="po_ab top_-5 right_0" @click="handleAdd"  type="text" plain>+ 新增</w-button>
        </title-style>
        <win-table :listTable=detailsTableTitle
          v-if="detailsShow === 0"
          @handleEdit="handleEdit"
          @handleStop="handleStop"
          :tableData=detailsList
          :isShow=detailsIsShow>
        </win-table>
      </w-col>
    </w-row>
    <w-modal
      :close-on-click-modal="false"
      :title="modalTitle === '计算项'?'新增'+modalTitle:AED+modalTitle"
      :showClose="false"
      :top="modalTitle === '计算项'?'20vh':'10vh'"
      :visible.sync="visible"
      :width="modalTitle === '计算项'?'30%':'60%'" >
      <w-form
        :model="form"
        :rules="rules"
        v-if="modalTitle === '计算项'"
        label-align="right"
        label-width="100px"
        ref="form" >
        <w-form-item label="计算项代码" prop="region" >
          <w-input v-model="form.region" showCounter placeholder="请输入计算项代码"></w-input>
        </w-form-item>
        <w-form-item label="计算项名称" prop="region" >
          <w-input v-model="form.region" showCounter placeholder="请输入计算项名称"></w-input>
        </w-form-item>
      </w-form>
      <w-row class="add-rule" v-else>
        <w-col :span="7" class="add-rule_left">
          <title-style class=" mg-right_16 pd-bottom_22 po_re">
            <span slot="header">计算项：</span>
            <w-button class="po_ab top_-5 right_0" @click="handleAddRule"  type="text" plain>+ 新增</w-button>
          </title-style>
        </w-col>
        <w-col :span="10" class="pd-x_20">
          <title-style class=" mg-bottom_10">
            <span slot="header">计算公式</span>
          </title-style>
          <w-input class="mg-bottom_18" v-model="formula" type="textarea" showCounter></w-input>
          <title-style class=" mg-bottom_10">
            <span slot="header">项目生成条件</span>
          </title-style>
          <w-input v-model="condition" type="textarea" showCounter></w-input>
        </w-col>
        <w-col :span="7" class="add-rule_right">
          <title-style>
            <span slot="header">运算符</span>
          </title-style>
        </w-col>
      </w-row>
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
      search: "", // 搜索值
      formula:'', // 计算公式
      condition:'', // 生成条件
      modalTitle:'',
      AED:'',
      detailsShow: 0,
      visible: false,
      ruleConditionsList:[ 
        {

        }
      ],
      ruleCheckboxData:[],
      detailsTableTitle:[
        {
          label:'性别',
          prop:'name',
          width:'80px',
        },
        {
          label:'开始年龄',
          prop:'name',
          width:'120px'
        },
        {
          label:'结束年龄',
          prop:'name',
          width:'120px'
        },
        {
          label:'计算公式',
          prop:'name'
        }
      ],
      detailsList:[
        {
          time: "2019.05.12 11:02:33",
          status: "其他区签约",
          name: "赵宇翔",
          type: "其他",
          stopValue:true
        },
        {
          time: "2019.05.12 11:02:33",
          status: "其他区签约",
          name: "赵宇翔",
          type: "其他",
          stopValue:false
        }
      ],
      detailsIsShow:{
        index:true,
        stop:true,
        width:'180px'
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

  },
  watch:{
   
  },
  created() {},
  methods: {
    submit() {},
    reset() {
      if (this.modalTitle === '计算项') {
        this.modalTitle = '规则'
      } else {
        this.visible = false
      }
      console.log('this.modalTitle',this.modalTitle);
    },
    handleEdit(row) {
      this.visible = true
      this.AED = '修改'
      
      this.modalTitle = '规则'
      console.log('handleEdit',row);
    },
    handleStop (row) {
      // console.log('handleStop',row);
    },
    // 界面新增按钮
    handleAdd() {
      this.AED = '新增'
      this.visible = true
      this.modalTitle = '规则'
    },
    handleAddRule() {
      this.modalTitle = '计算项'
      
    },
    //
    handleBloodTab(item, index) {
      console.log(item, index);
      this.detailsShow = index;
    },
  },
  
};
</script>
<style lang="scss" scoped>

.blood-number-book {
  background: rgba(255, 255, 255, 1);
  padding: 16px;
  .blood {
    .tag-title {
      text-align: center;
      display: inline-block;
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
  .add-rule {
    height: 380px;
    .add-rule_left {
      border-right:1px solid rgba(223,231,245,1);
      height: 100%;
      padding-top: 5px;
    }
    .add-rule_right {
      border:1px solid rgba(223,231,245,1);
      height: 100%;
      padding: 5px;
      border-radius:2px;
    }
    .w-textarea__inner {
      height: 100px;
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
.styleHover {
  color: #666;
}
.add-rule {
  .w-textarea__inner {
    height: 100px;
  }
}
.blood-number-book {
  .w-modal__body {
    padding: 10px 20px!important;
  }
  .w-form .w-form-item+.w-form-item {
    margin-top: 16px;
  }
}

</style>

