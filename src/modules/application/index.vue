<template>
  <div class=" pd_16">
    <w-row class="home-page-body">
      <w-col :span="7" >
        <title-style class=" mg-right_16 pd-bottom_22 po_re"><span slot="header">申请单列表</span>
          <w-button class="po_ab top_-4 right_0" @click="handleAdd('left')"  type="primary" plain>新增</w-button>
        </title-style>
        <ul class="mg-right_16 list-style">
          <li class="application" v-for="(item, index) in leftData"
            :class="{'clickBg':index==clickIndex,'hoverBg':index==hoverIndex}"
            @mouseover="hoverIndex = index"
            @mouseout="hoverIndex = - 1"
            @click="handleLeftRow(item, index)" :key="index" > 
            <div class="po_re">
              <h4 class="inline-block ">{{item.TEMPLATE_NAME}}</h4>
              <div class="inline-block po_ab top_-9 right_0">
                <w-button type="text" @click="handleRowL(item,index,'copy')">复制</w-button>
                <w-button type="text" @click="handleRowL(item,index,'edit')">修改</w-button>
                <w-button type="text" @click="handleRowL(item,index,'delete')">删除</w-button>
              </div>
            </div>
            <!-- <p class="mg-bottom_5">申请单号：12345678910</p> -->
            <p class="po_re"><span class="inline-block po_ab top_0">元素：</span>
              <span class=" inline-block mg-left_40">
                  <span>临床信息、</span>
                  <span>标本信息、</span>
                  <span>遗嘱信息、</span>
                  <span>既往病理检查结果、</span>
                {{item.IS_SHOW_GYNECOLOGICAL!==0?'妇科信息、':''}}
                {{item.IS_SHOW_OTHERFINDINGS!==0?'手术信息、':''}}
                <!-- {{item.IS_SHOW_SPECIMEN!==0?'标本信息、':''}} -->
                {{item.IS_SHOW_TUMOUR!==0?'肿瘤信息、':''}}
              </span></p>
          </li>
        </ul>
      </w-col>
      <w-col :span="17">
        <title-style class="pd-bottom_22 po_re"><span slot="header">申请单项目列表</span>
          <w-button class="po_ab top_-4 right_0" @click="handleAdd('rigth')"  type="primary" plain>新增</w-button>
        </title-style>
        <win-table :listTable=tableTitle
          @handleEdit="handleEdit"
          :tableData=rigthData
          @handleRow="handleRowR"
          @handleDelete="handleDelete"
          :isShow=isShow></win-table>
        <!-- <win-page
          :total="100"
          :current-page="currentPage"
          :page-size="pageSize"
          @sizeChange="sizeChange"
          @currentChange="currentChange"></win-page> -->
          <w-pagination
            :total="total"
            class="fr pd-top_16"
            :current-page="QUERY_PAGE.pageIndex"
            :page-size="QUERY_PAGE.pageSize"
            @actived-change="currentChange"
            @page-size-change="sizeChange"
            :page-sizes="[4, 8, 12, 16]"
            :show="['prev', 'next', 'total', 'jump']">
          </w-pagination>
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
                  v-model="form.item.itemCode"
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
                  v-model="form.item.itemName"
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
                  v-model="form.item.itemPrice"
                ></w-input>
              </w-form-item>
            </w-col>
            
          </w-row>
          <w-row>
            <w-col>
              <w-form-item
                label="收费项目"
                prop="chargeItems">
                <w-input
                  @focus="handleIputVal"
                  readonly
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
                  v-model="form.item.itemExplain"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <w-table v-else :data=costList  ref="costList" border
          @selection-change="handleSelectionChange">
          <w-table-column type="selection"  key="1" width="55"></w-table-column>
          <w-table-column prop="chargeItemCode"  key="2" width= '120px' label="收费编码"></w-table-column>
          <w-table-column prop="chargeItemName"  key="3" label="收费项目"></w-table-column>
          <w-table-column prop="chargeItemPrice"  key="4" width= '150px' align= 'right' label="项目价格（元）"></w-table-column>
        </w-table>
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

import { MODAL_TITLE, QUERY_PAGE} from '../constant'
export default {
  data() {
    return {
      modalTitle:'',
      MODAL_TITLE,
      QUERY_PAGE,
      clickIndex:0,
      hoverIndex: 0,
      h : '',
      value2: "", // 搜索值
      pageSize:10,
      currentPage:20,
      total:100,
      value: [2,3,4,8],
      rowRightList: {},
      rowLeftList: {},
      visible: false,
      isShow:{
        index:true,
        width:'110px'
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
        item: {
          pafTemplateId:"",		// --申请单id
          itemCode:"",			// --项目编码
          itemName:"",			// --项目名称
          itemPrice:"",			// --项目价格
          itemExplain:"",		// --描述
          seqNo:"",			// 	--序号
          defaultCheck:"",		// --默认为空
          createdBy:"",			//--操作人编号
          createdName:""		//--操作人名称
        },
        chargeItems:[{              // --勾选弹框的数据集合
          chargeItemCode:"",	// --收费编码
          chargeItemName:"",	// --收费项目名称
          chargeItemPrice:""	// --收费项目价格
        }],
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
      costList: [],
      selectionVal: [],
      rules: {
        itemCode: [
          {
            required: true,
            message: "请输入项目编码",
            trigger: "change"
          }
        ],
        itemName: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "change"
          }
        ],
        itemPrice: [
          { required: true, message: '项目价格不能为空'},
          { type: 'number', message: '项目价格必须为数字值'}
        ],
        chargeItems: [
          {
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ]
      },
      rigthData: [],
      rowLi:{},
      leftData: {
        IS_SHOW_GYNECOLOGICAL:'1234'
      }
    };
  },
  watch: {
    clickIndex (oldVal, newVal) {
      this.rowLi = this.rowLeftList
      if (newVal) {
        console.log('123');
      } else {
        console.log('456');
      }
      console.log('oldVal, newVal',oldVal, newVal);
    },
    costList (oldVal, newVal) {
      this.$nextTick(() => {
        // this.costList.map(item => {
        //   let arr = [...this.selectionVal]
        //   if (arr) {
        //     const find = arr.find(it => it.chargeItemCode === item.chargeItemCode)
        //     if (find) {
        //       this.$refs.costList.toggleRowSelection(item, true)
        //     }
        //   }
        // })
      })
    }
  },
  created() {
    this.list()
  },
  methods: {
    async list () {
      const res = await apiData.getFindPafTemplate({...QUERY_PAGE})
      this.leftData = res.data
      if (res.data === null)return
      this.rowLi = res.data[0]
      console.log('res.data',res.data[3]);
      // this.value2=['临床信息','标本信息', '遗嘱信息', '既往病理检查结果']
      console.log(this.value2,'this.value2');
      res.data.map(item=>{
        console.log('item',item);
        if (item.isShowOtherfindings === '1') {
          this.value.push(1)
        } 
        if (item.isShowGynecological === '1') {
          this.value.push(5)
        } 
        if (item.isShowTumour === '1') {
          this.value.push(6)
        }

      })
      if ( res.data !== null) {
      this.getPafTemplateitems(this.rowLi.ID)
    }
    },
    // 点击申请单列表单行
    async handleLeftRow (row,index) {
      this.rowLeftList = row
      this.clickIndex = index;
      this.getPafTemplateitems(row.ID)
    },
    // 获取申请单项目列表接口
    async getPafTemplateitems (id) {
      const res = await apiData.getPafTemplateitems({
        pafTemplateId:id,
        ...QUERY_PAGE
      })
      console.log(res.data.itemList,'res.data.itemList');
      this.rigthData = res.data.itemList
      this.total = res.data.itemSum
    },
    // 点击申请单某一行
    handleRowL (item,index,t) {
      console.log('item',item);
      this.modalTitle = MODAL_TITLE.FORM
      this.h =  MODAL_TITLE.EADIT
      console.log(item,index,t, 'item,index,t');
       switch(t) {
        case 'edit':
          console.log(t);
          this.visible = true
          this.h =  MODAL_TITLE.EADIT
          this.getPafTemplate(item.ID)
          break;
        case 'delete':
          console.log(t);
          this.getDeletePafTemplate(item.ID,index)
          break;
        default:
          this.h =  MODAL_TITLE.CLONE
          this.getcopy(item.ID)
          console.log(t);
      } 
    },
    async getcopy (id) {
      const res = await apiData.getcopy({id:id})
      this.showMsg1(res, '复制申请单')
      console.log(res,'getcopygetcopy');
    },
    
    // 点击申请单项目列表的莫一行
    handleRowR(row) {
      this.rowRightList = row
      console.log(row,'单项目列表的莫一行');
      // if ()
    },
    // 项目修改查询
    async handleEdit (row) {
      this.h =  MODAL_TITLE.EADIT
      this.modalTitle = MODAL_TITLE.ITEM
      this.visible = true
      const res = await apiData.getFindItemInfo({
        id:row.pafTemplateitemId
      })
      this.form = res.data
      console.log(res,'getFindItemInfo');
      console.log(row,'项目修改');
      let list = []
      res.data.chargeItems.map(item=>{
        list.push(item.chargeItemName)
        console.log(item,'item');
      })
      console.log(list,'list');
      this.value2 = list
    },
    // 项目删除
    async handleDelete (row) {
      console.log('row,index',row);
      const res = await apiData.getDeleteTempItem({
        id:row.pafTemplateitemId
      })
      this.showMsg1(res,'删除申请单项目')
      this.getPafTemplateitems(this.rowLi.ID)
    },
    // 获取申请单查看接口
    async getPafTemplate (id) {
      const res = await apiData.getPafTemplate({id:id})
      console.log(res,'获取当前申请单数据');
      this.showMsg1(res, '获取当前申请单数据')
      if (res.data === null)return
      if (res.data.isShowOtherfindings === '1') {
        this.value.push(1)
      } 
      if (res.data.isShowGynecological === '1') {
        this.value.push(5)
      } 
      if (res.data.isShowTumour === '1') {
        this.value.push(6)
      }
      this.form = res.data
    },
    // 删除申请列表数据
    async getDeletePafTemplate (id,index) {
      const res = await apiData.getDeletePafTemplate({id})
      this.showMsg1(res,'删除申请单')
      this.leftData.slice(index,1)
      console.log('id,index',id,index,this.leftData.length);
      // if (this.leftData.length === index) {
        this.clickIndex = index-1
      // } else {
      //   this.clickIndex = index+1
      // }
      this.list()
    },
    // 删除申请单项目列表数据
    async getDeleteTempItem (id) {
      const res = await apiData.getDeleteTempItem(id)
      this.handleLeftRow()
      console.log(res);
    },
    // 点击收费项目收费项目
    async handleIputVal () {
      console.log('收费项目');
      this.visible = true
      this.h = ''
      this.modalTitle = MODAL_TITLE.CHARGE_ITEM
      const res = await apiData.getQuery()
      console.log(res,'res');
      console.log(this.form.chargeItems,'value1');
      this.costList.map(item => {
        this.form.chargeItems.map(ite => {
          if (item === ite) {
            console.log('itemite',item);
          }
        })
        // let arr = [...this.form.chargeItems]
        // if (arr) {
          // const find = arr.
          this.form.chargeItems.find(it => it.chargeItemCode === item.chargeItemCode)
          if (find) {
            this.$refs.costList.toggleRowSelection(item, true)
          }
        // }
      })
      this.costList = res.data
      console.log(this.costList,'472890');
    },
    // 点击收费项目列表多选
    handleSelectionChange (val) {
      this.selectionVal = val
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
      this.$refs.form.validateForm(async (valid) => {
        if (valid) {
          console.log(this.form.item,'list');
          if (this.modalTitle === MODAL_TITLE.FORM) {
            const list = {
              templateName: this.form.templateName,
              printTemplate: this.form.printTemplate,
              isShowOtherfindings: this.form.isShowOtherfindings,
              isShowGynecological: this.form.isShowGynecological,
              isShowTumour: this.form.isShowTumour
            }
            const res = await apiData.getAddUpdateTemplate({...list, id:this.rowLeftList.ID})
            this.showMsg1(res,'新增申请单')
            this.visible = false
            this.list()
          } else if (this.modalTitle === MODAL_TITLE.ITEM) {
            console.log('this.rowLeftList',this.rowLeftList);
            delete this.form.templateName
            delete this.form.printTemplate
            delete this.form.isShowOtherfindings
            delete this.form.isShowGynecological
            delete this.form.isShowTumour
            this.form.item['pafTemplateId'] = this.rowLeftList.ID || this.leftData[0].ID
            this.form.item['seqNo'] = this.rigthData.length+1
            const res = await apiData.getAddUpdateItem({
              ...this.form
            })
            this.showMsg1(res,'新增项目')
            this.value = false
          } else {
            console.log(this.h,'this.h');
            // this.h = MODAL_TITLE.ADD
            this.modalTitle = MODAL_TITLE.ITEM
          }
       } else {
          // 未通过
          console.log('invalid form !')
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
      if (this.modalTitle === MODAL_TITLE.CHARGE_ITEM) {
        //  this.h = MODAL_TITLE.ADD
         this.modalTitle = MODAL_TITLE.ITEM
      } else {
        this.visible = false
      }
    },
    // 界面新增按钮
    async handleAdd(w) {
      this.h = MODAL_TITLE.ADD
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
      console.log("新增");
      this.visible = true
    },
    // 包含元素多选框
    handleChangeCheckbox (row,index) {
      console.log(row.label,index, this.value,'handleChangeCheckbox');
      const val = this.value.includes(row.label)
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
    },
    sizeChange(val){
      console.log(val, '每页多少条');
      QUERY_PAGE.pageSize = val // 每页多少条
      this.getPafTemplateitems(this.rowLi.ID)  // 刷新
    },
    // 当前页
    currentChange(val) {
      console.log(val,this.rowLi, '当前页');
      this.QUERY_PAGE.pageIndex = val // 当前页
      console.log(this.leftData[0].ID,'this.leftData');
      this.getPafTemplateitems(this.rowLi.ID)  // 刷新
    }
  }
};
</script>
<style lang='scss' scoped>
.list-style {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
.w-row {
  margin-bottom: 15px;
}
</style>
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
  .clickBg,
  .hoverBg {
    background rgba(207,224,255,1)!important;
    // color #0F49ED;
  }
   
}
.w-select {
  width: 100%;
}
</style>
<style lang='stylus'>

</style>
