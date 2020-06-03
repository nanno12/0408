<template>
  <div class="illness-book">
    <w-row>
      <w-col :span="8" class="drgs">
        <title-style class="pd-bottom_22 po_re">
          <span slot="header">单病种列表</span>
          <!-- <w-input
            class="po_ab top_-5"
            style="left:120px"
            sufAppendIsButton
            v-model="value2" >
            <template slot="suf-append">
              <i class="w-icon-search"></i>
            </template>
          </w-input> -->
          <w-button class="po_ab top_-5 right_0" @click="handleAdd"  type="text" plain>+ 新增</w-button>
        </title-style>
        <win-table :listTable="drgsTableTitle"
          :tableData="drgsList"
          :isShow="drgsIsShow">
        </win-table>
      </w-col>
      <w-col :span="16" class="tabs-title">
        <w-tabs v-model="tabsName" @tab-click="handleTabsClick" type="dark">
          <w-tab-pane label="单病种" name="first">单病种</w-tab-pane>
          <w-tab-pane label="输血适应症判定规则" name="second"></w-tab-pane>
          <w-tab-pane label="输血量评估规则" name="third"></w-tab-pane>
          <w-tab-pane label="诊断对照" name="fourth"></w-tab-pane>
        </w-tabs>
        <title-style v-if="tabsName === 'second' || tabsName === 'third'" 
          class=" pd-bottom_20 mg-top_18 po_re">
          <span slot="header">
            <w-select placeholder="请选择成分大类" v-model="bigClassVal" >
              <w-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in options" >
              </w-option>
            </w-select>
          </span>
          <w-button class="po_ab top_0 right_0" @click="handleAdd"  type="text" plain>+ 新增</w-button>
        </title-style>
        <title-style v-if="tabsName === 'fourth'" class="pd-bottom_20 mg-top_18 po_re">
          <span slot="header">
            <w-input
              class="po_ab top_0"
              style="width:200px"
              sufAppendIsButton
              v-model="search" >
              <template slot="suf-append">
                <i class="w-icon-search"></i>
              </template>
            </w-input>
          </span>
          <w-button class="po_ab top_0 right_0" @click="handleAdd"  type="text" plain>+ 新增</w-button>
        </title-style>
        <win-table v-if="tabsName !== 'first'" 
          :listTable="tabsName === 'second'?applyTitle:(tabsName === 'third'?evaluationTitle:diagnosisTitle)"
          :tableData="rightList"
          :isShow="rightIsShow">
        </win-table>
      </w-col>
    </w-row>
    <w-modal
      :close-on-click-modal="false"
      title="新增规则明细"
      :showClose="false"
      :visible.sync="visible"
      width="70%" >
      <win-table v-if="tabsName !== 'first'" 
        :listTable="diagnosisTitle"
        :tableData="rightList"
        :isShow="diagnosisIsShow">
      </win-table>
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
      tabsName:'second',
      search: "", // 搜索值
      value:'',
      visible: false,
      bigClassVal:'',//成分大类下拉框
      rightTableTitle:[],
      applyTitle:[
        {
          label:'规则代码',
          prop:'name',
          width:'80px'
        },
        {
          label:'手术',
          prop:'name',
          width:'80px'
        },
        {
          label:'适用专业类别',
          prop:'name',
        },
        {
          label:'适用急诊标识',
          prop:'name',
        },
        {
          label:'适用年龄范围',
          prop:'name',
           width:'110px'
        },
        {
          label:'适用合理规则',
          prop:'name',
        },
        {
          label:'规则描述',
          prop:'name',
        }
      ], // 输血适应症判定规则
      evaluationTitle:[
        {
          label:'规则代码',
          prop:'name',
          width:'80px'
        },
        {
          label:'性别',
          prop:'name',
           width:'80px'
        },
        {
          label:'开始年龄',
          prop:'name',
          width:'80px'
        },
        {
          label:'结束年龄',
          prop:'name',
          width:'80px'
        },
        {
          label:'计算公式',
          prop:'name',
        }
      ], // 输血量评估规则
      diagnosisTitle:[
        {
          label:'诊断代码',
          prop:'name',
          width:'80px'
        },
        {
          label:'诊断名称',
          prop:'name',
        },
        {
          label:'拼音码',
          prop:'name',
          width:'80px'
        },
        {
          label:'五笔码',
          prop:'name',
          width:'80px'
        }
      ],  // 诊断对照
      rightList:[
        {
          time: "2019.05.12 11:02:33",
          status: "其他区签约",
          name: "赵宇翔",
          type: "其他"
        }
      ],
      drgsTableTitle:[
        {
          label:'单病种代码',
          prop:'name'
        },
        {
          label:'单病种名称',
          prop:'name'
        }
      ],
      rightIsShow:{
        index:true,
        width:'60px',
        edit:true
      },
      diagnosisIsShow: {
        selection:true,
        width:'60px',
        operation:true,
        // edit:true
      },
      drgsList:[
        {
          time: "2019.05.12 11:02:33",
          status: "其他区签约",
          name: "赵宇翔",
          type: "其他"
        }
      ],
      drgsIsShow:{
        index:true,
        width:'110px'
      },
      form: {
        name: "",
        region: ""
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
    handleTabsClick(row) {
      console.log('uioew',row);
    },
    submit() {
      if (this.tabsName==='fourth') {
        this.visible = false
      }
    },
    reset() {
      if (this.tabsName==='fourth') {
        this.visible = false
      }
    },
    handleRuleDele (item,index) {
      console.log('index',index,item);
    },
    // 界面新增按钮
    handleAdd() {
      if (this.tabsName==='fourth') {
        this.visible = true
      }
    },
  },
  
};
</script>
<style lang="scss" scoped>
.illness-book {
  .tabs-title {

  }
  .drgs {
    padding-right: 16px;
  }
}
</style>
<style lang='scss'>
.tabs-title {
  .card-icon{
    display: inline-block!important;
    margin-right: 0px!important;
    width: 0px!important;
    height: 0px!important;
    background: #5a7bef;
    padding-top: 20px!important;
  }
  .w-tabs--border-card>.w-tabs__content, .w-tabs--dark>.w-tabs__content {
    padding: 0!important;
  }
}

</style>

