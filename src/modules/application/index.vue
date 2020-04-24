<template>
  <div class=" pd_16">
    <w-row class="home-page-body">
      <w-col :span="7" >
        <title-style class=" mg-right_16 pd-bottom_22 po_re"><span slot="header">申请单列表</span>
          <w-button class="po_ab top_16 right_0" @click="handleAdd('left')"  type="primary" plain>新增</w-button>
        </title-style>
         <ul class="mg-right_16">
            <li class="application" v-for="(item, index) in leftData" @click="handleLeftRow(item, index)" :key="index" >
              <h4>{{item.TEMPLATE_NAME}}</h4>
              <!-- <p class="mg-bottom_5">申请单号：12345678910</p> -->
              <p class="po_re"><span class="inline-block po_ab top_0">元素：</span>
                <span class=" inline-block mg-left_40">
                  临床信息、标本信息、医嘱信息、既往病理检查结果
                  手术信息、妇科信息、肿瘤信息、细胞学活HPV检查结果
                </span></p>
<!-- {{item.IS_SHOW_GYNECOLOGICAL}}{{item.IS_SHOW_OTHERFINDINGS}}{{item.IS_SHOW_SPECIMEN}}{{item.IS_SHOW_TUMOUR}}</span> -->
            </li>
          </ul>
      </w-col>
      <w-col :span="17">
        <title-style class="pd-bottom_22 po_re"><span slot="header">申请单项目列表</span>
          <w-button class="po_ab top_16 right_0" @click="handleAdd('rigth')"  type="primary" plain>新增</w-button>
        </title-style>
        <win-table :listTable=tableTitle
        :tableData=rigthData
        :handleRow="handleRow"
        :isShow=isShow></win-table>
      </w-col>
    </w-row>
    <w-modal
      :close-on-click-modal="false"
      :showClose="false"
      :title="h + modalTitle"
      :visible.sync="visible"
      width="50%">
      <w-form
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="100px"
        ref="form">
        <w-row  v-if=" modalTitle === MODAL_TITLE.FORM">
          <w-row >
            <w-col :span="24">
              <w-form-item
                label="申请单名称"
                prop="templateName">
                <w-input
                  :maxlength="20"
                  placeholder="请输入申请单名称"
                  showCounter
                  v-model="form.templateName"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item label="包含元素" prop="name">
                <template>
                  <w-checkbox-group v-model="value" >
                    <w-checkbox v-for="(item,index) in checkboxList" :key="index"
                    @change="handleChangeCheckbox(item,index)"
                    :label="item.label" :disabled="item.disabled">{{item.name}}</w-checkbox>
                  </w-checkbox-group>
                </template>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col>
              <w-form-item
                label="申请单模版"
                prop="printTemplate" >
                <w-input
                  :maxlength="20"
                  placeholder="点击浏览选择申请单模版"
                  showCounter
                  v-model="form.printTemplate"
                ></w-input>
                
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <w-row v-else-if=" modalTitle === MODAL_TITLE.ITEM">
          <w-row>
            <w-col :span="12">
              <w-form-item
                label="项目编码"
                prop="itemCode">
                <w-input
                  :maxlength="20"
                  placeholder="请输入项目编码"
                  showCounter
                  v-model="form.itemCode"
                ></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item
                label="项目名称"
                prop="itemName">
                <w-input
                  :maxlength="20"
                  placeholder="请输入项目名称"
                  showCounter
                  v-model="form.itemName"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item
                label="项目价格"
                prop="itemPrice">
                <w-input
                  :maxlength="20"
                  placeholder="请输入项目价格"
                  showCounter
                  v-model="form.itemPrice"
                ></w-input>
              </w-form-item>
            </w-col>
            
          </w-row>
          <w-row>
            <w-col>
              <w-form-item
                label="收费项目"
                prop="region">
                <w-input
                  sufAppendIsButton
                  @click="handleIputVal"
                  placeholder="请输入关键字搜索收费项目"
                  v-model="value2">
                  <template slot="suf-append">
                    <i class="w-icon-search"></i>
                  </template>
                </w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item
                label="描述"
                prop="itemExplain">
                <w-input
                  :maxlength="20"
                  type="textarea"
                  placeholder="请输入描述内容"
                  showCounter
                  v-model="form.itemExplain"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <win-table :listTable=costTitle
          :tableData=costList
          @handleSelectionChange="handleSelectionChange"
          :isShow=isShowCost></win-table>
      </w-form>
      <span
        class="dialog-footer"
        slot="footer" >
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
import apiData from './api/api'

// import { MODAL_TITLE } from '@/constant'
import { MODAL_TITLE } from '../constant'
export default {
  data() {
    return {
      modalTitle:'',
      MODAL_TITLE,
      h : '',
      value2: "", // 搜索值
      value: [2,3,4,8],
      visible: false,
      isShow:{
        index:true,
        width:'110px'
      },
      isShowCost:{
        selection:true,
        operation:true
      },
      options: [
        {
          time: "2019.05.12 11:02:33",
          status: "其他区签约",
          name: "赵宇翔",
          type: "其他"
        },
        {
          time: "2019.05.12 12:24:30",
          status: "未签约",
          name: "肖新宇",
          type: "本地医保"
        }
      ],
      tableTitle:[
        {
          label:'项目编码',
          prop:'itemCode',
          width: '110px'
        },
        {
          label:'项目名称',
          prop:'itemName'
        },
        {
          label:'项目价格(元)',
          prop:'itemPrice',
          width: '130px',
          align: 'right'
        },
        {
          label:'项目说明',
          prop:'itemExplain'
        }
      ],
      form: {
        templateName: "", // 申请单名称
        printTemplate: '' , // 打印模板
        isShowOtherfindings:"0",	//--是否显示手术/内窥镜
        // isShowSpecimen:"0",		//--是否显示标本
        isShowGynecological:"0",//	--是否显示妇科
        isShowTumour:"0",	//	--是否显示肿瘤

        pafTemplateId:"",		// --申请单id
        itemCode:"",			// --项目编码
        itemName:"",			// --项目名称
        itemPrice:"",			// --项目价格
        chargeItems:[{              // --勾选弹框的数据集合
          chargeItemCode:"",	// --收费编码
          chargeItemName:"",	// --收费项目名称
          chargeItemPrice:""	// --收费项目价格
        }],
        itemExplain:"",		// --描述
        seqNo:"",			// 	--序号
        defaultCheck:"",		// --默认为空
      },
      checkboxList: [
        {
          label:1,
          name: '手术信息',
          disabled: false
        },
        {
          label:2,
          name: '临床信息',
          disabled: true

        },
        {
          label:3,
          name: '标本信息',
          disabled: true
        },
        {
          label:4,
          name: '医嘱信息',
          disabled: true
        },
        {
          label:5,
          name: '妇科信息',
          disabled: false
        },
        {
          label:6,
          name: '肿瘤信息',
          disabled: false
        },
        {
          label:8,
          name: '既往病理检查结果',
          disabled: true
        }
      ],
      costTitle:[
        {
          label:'收费编码',
          prop: 'chargeItemCode',
          width: '120px'
        },
        {
          label:'收费项目',
          prop: 'chargeItemName',
        },
        {
          label:'项目价格（元）',
          prop: 'chargeItemPrice',
          width: '150px',
          align: 'right'
        }
      ],
      costList: [],
      rules: {
        // region: [
        //   {
        //     required: true,
        //     message: "请选择区域",
        //     trigger: "change"
        //   }
        // ],
        // name: [
        //   {
        //     required: true,
        //     message: "请选择区域",
        //     trigger: "change"
        //   }
        // ]
      },
      rigthData: [],
      leftData: []
    };
  },
  created() {
    this.list()
  },
  methods: {
    async list () {
      const res = await apiData.getFindPafTemplate({})
      this.leftData = res.data
    },
    // 点击申请单列表单行获取到当前数据
    async handleLeftRow (row,index) {
      const res = await apiData.getPafTemplateitems({pafTemplateId:row.ID})
      this.rigthData = res.data
    },
    // 点击收费项目收费项目
    handleIputVal () {
      console.log('收费项目');
    },
    // 点击申请单项目列表的莫一行
    handleRow(row) {
      console.log(row,'单项目列表的莫一行');
    },
    // 点击收费项目列表多选
    handleSelectionChange (val) {
      console.log(val,'点击收费项目列表多选');
      let www = []
      let ci =[]
      val.map(item => {
        www.push(item)
        ci.push(item.chargeItemName)
      })
      console.log(ci);
      this.value2 = ci
      this.form.chargeItems = www
    },

    async submit(e) {
      console.log(this.form);
    
      if (this.modalTitle === MODAL_TITLE.FORM) {
          const res = await apiData.getAddUpdateTemplate({...this.form})
        this.showMsg1(res,'新增申请单')
      } else {
        delete this.form.templateName
        delete this.form.printTemplate
        delete this.form.isShowOtherfindings
        delete this.form.isShowGynecological
        delete this.form.isShowTumour
        const res = await apiData.getAddUpdateItem({...this.form})
        this.showMsg1(res,'新增项目')
      }
 
      
      console.log(res);
    },
    reset() {
      this.visible = false
    },
    // 界面新增按钮
    async handleAdd(w) {
      this.h = MODAL_TITLE.ADD
      const res = await apiData.getQuery()
      this.costList = res.data
      console.log(res,'getQuerygetQuery');
      switch(w) {
        case 'left':
          this.modalTitle = MODAL_TITLE.FORM
          break;
        case 'rigth':
          this.modalTitle = MODAL_TITLE.ITEM
          break;
        default:
          this.modalTitle = MODAL_TITLE.SELECT_ITEM
      } 
      // if (w === 'left') {
      //   this.modalTitle = MODAL_TITLE.FORM
      //   console.log({...MODAL_TITLE});
      // } else if (w === 'left') {
      //   this.modalTitle = MODAL_TITLE.ITEM
      // }

      console.log("新增");
      this.visible = true
    },
    // 包含元素多选框
    handleChangeCheckbox (row,index) {
      console.log(row.label,index, this.value,'handleChangeCheckbox');
      const val = this.value.includes(row.label)
      console.log(val);
      if (val === true) {
        switch(row.label) {
          case 1:
              this.form.isShowOtherfindings = '1'
              break;
          case 5:
              this.form.isShowGynecological = '1'
              break;
          case 6:
              this.form.isShowTumour = '1'
              break;;
          default:
            // console.log(9999);
        } 
      } else {
         switch(row.label) {
           case 1:
              this.form.isShowOtherfindings = '0'
              break;
          case 5:
              this.form.isShowGynecological = '0'
              break;
          case 6:
              this.form.isShowTumour = '0'
              break;;
          default:
            // console.log(9999);
        } 
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
.addclass {
  color: red;
}

.home-page-body {
  background: rgba(255, 255, 255, 1);
  padding: 16px;
  .application {
    margin-bottom: 10px;
    padding: 15px 10px;
    background:rgba(243,245,249,1);
    // background:rgba(207,224,255,1);
    h4 {
      margin: 0;
      margin-bottom:10px;
    }
  }
}
.w-select {
  width: 100%;
}
</style>
<style lang='stylus'>

</style>
