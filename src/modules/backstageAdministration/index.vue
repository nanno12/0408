<template>
  <div class="home-page-wrap-ba">
    <w-row  class="home-page-body">
      <w-col :span="7" >
        <title-style class=" po_re pd-bottom_22"><span slot="header">申请单列表</span>
          <w-button class="po_ab top_-5 right_0" @click="handleAdd('left')"  type="primary" plain>新增</w-button>
        </title-style>
        <div class="list-style">
          <w-table class="mt-15" @row-click="handleRow" 
            :highlight-current-row="true"
            :row-class-name="tableRowClassName"
            ref="interfaceTable"
            :data="listMoulds" :border="true" style="width: 100%">
            <w-table-column type="index" width="70" align="center" label="序号"></w-table-column>
            <w-table-column prop="MOULD_LEVEL" label="类型" width="70"></w-table-column>
            <w-table-column prop="MOULD_NAME" label="名称" ></w-table-column>
            <w-table-column fixed="right" label="操作" align="center" width="170" reference-cell>
              <template slot-scope="scope">
                  <w-button type="text" @click="onEditing(scope.row,'left')">修改</w-button>
                  <w-button type="text" @click="handleClone(scope.row, 'left')">复制</w-button>
                  <w-button @click="handleConfirm(scope.row, 'left', scope.$index)" type="text">删除</w-button>
              </template>
            </w-table-column>
          </w-table>
        </div>
      </w-col>
      <w-col :span="17">
        <div class="pd-left_15">
          <title-style class="pd-bottom_22  po_re"><span slot="header">项目列表</span>
            <w-button class="po_ab top_-5 right_0" @click="handleAdd('right')"  type="primary" plain>新增</w-button>
          </title-style>
          <div class="list-style">
          <w-table  :data="listMouldItems"  :border="true" style="width: 100%">
            <w-table-column type="index" width="70" align="center" label="序号">
            </w-table-column>
            <w-table-column prop="MOULD_ITEM_NAME" label="项目名称">
            </w-table-column>
            <w-table-column prop="ITEM_AMOUNT" label="默认数量">
            </w-table-column>
            <w-table-column prop="time" label="单位">
            </w-table-column>
            <w-table-column prop="MAIN_NAME" label="成分大类">
            </w-table-column>
            <w-table-column prop="ITEM_USEAREA" label="对应费用明细" width="150">
            </w-table-column>
            <w-table-column prop="ITEM_ADDFACTOR" label="费用价格" width="150">
            </w-table-column>
            <w-table-column prop="ITEM_REMARK" label="备注"> </w-table-column>
            <w-table-column fixed="right" label="操作" reference-cell align="center" width="120">
              <template slot-scope="scope">
                <w-button type="text" @click="onEditing(scope.row,'right')">修改</w-button>
                <w-popconfirm  title="确认删除这条内容吗? "
                  @document-click="handleCancel(scope.$index)"
                   @confirm="handleConfirm(scope.row, 'right', scope.$index)" @cancel="handleCancel(scope.$index)" placement="bottom">
                  <span class="popconfirm-reference" slot="reference">
                    <w-button  type="text">删除</w-button>
                  </span>
                </w-popconfirm>
              </template>
            </w-table-column>
          </w-table>
          </div>
        </div>
      </w-col>
    </w-row>
    <w-modal  :visible.sync="visible"
      :title="modalType+modalTitle"
      :showClose="false"
      class="modal"
      :close-on-click-modal="false"
      width="60%">
      <w-form label-align="right"  :model="form" ref="form" label-width="130px" :rules="rules">
        <!-- 新增申请单 -->
        <w-row v-if="modalTitle === MODAL_TITLE.FORM || modalTitle=== MODAL_TITLE.CLONE">
          <w-row>
            <w-col :span="12">
              <w-form-item label="模版代码" prop="mouldcode">
                <w-input v-model="form.mouldcode" :maxlength="20" showCounter
                  placeholder="请输入代码"></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="模版名称" prop="mouldname">
                <w-input v-model="form.mouldname" :maxlength="20" showCounter
                  placeholder="请输入名称"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="模版类型" prop="mouldtype">
                <w-select v-model="form.mouldtype" placeholder="请选择模版类型">
                  <w-option
                    v-for="item in mtype"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="执行科室" prop="execdeptcode">
                <w-select v-model="form.execdeptcode" placeholder="请选择执行科室">
                  <w-option
                    v-for="item in implement"
                    :key="item.DEPTCODE"
                    :label="item.DEPTNAME"
                    :value="item.DEPTCODE">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="开单类别" prop="usearea">
                <w-select v-model="form.usearea" placeholder="请选择开单类别">
                  <w-option
                    v-for="item in category"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="开单科室">
                <w-select v-model="form.applydeptcode" placeholder="请选择开单科室">
                  <w-option
                    v-for="item in openings"
                    :key="item.DEPTCODE"
                    :label="item.DEPTNAME"
                    :value="item.DEPTCODE">
                  </w-option>
                </w-select>

              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <!-- 新增项目 -->
        <w-row v-else-if="modalTitle===MODAL_TITLE.ITEM">
          <w-row>
            <w-col :span="12" class="po_re">
              <w-form-item label="成分大类" required >
                <w-select v-model="form.maincode" @change="handleSelChange" placeholder="请选择成分大类">
                  <w-option
                    v-for="item in mainTypesList"
                    :key="item.MAIN_CODE"
                    :label="item.MAIN_NAME"
                    :value="{
                      value:item.MAIN_CODE,
                      DETAIL_CODE:item.MAIN_CODE,
                      DETAIL_NAME:item.MAIN_NAME,
                    }">
                  </w-option>
                </w-select>
                <span class="inline-block po_ab top_0 right_-35"><i @click="handlePlus('big')" class="w-icon-plus" style="font-size: 33px;"></i></span>
              </w-form-item>
            </w-col>
            <w-col :span="12" class="po_re">
              <w-form-item label="成分小类" prop="detailcode"
              :rules="[
                { required: true, message: '请选择成分小类'},
              ]">
                <w-select @change="handleSelChange1" v-model="form.detailcode" placeholder="请选择成分小类">
                  <w-option
                    v-for="item in detailTypesList"
                    :key="item.DETAIL_CODE"
                    :label="item.DETAIL_NAME"
                    :value="{
                      value:item.DETAIL_CODE,
                      DETAIL_CODE:item.DETAIL_CODE,
                      DETAIL_NAME:item.DETAIL_NAME,
                    }">
                  </w-option>
                </w-select>
                <span v-if="form.maincode !==''" class="inline-block po_ab top_0 right_-35">
                  <i  @click="handlePlus('sma')" class="w-icon-plus" style="font-size: 33px;"></i>
                </span>
              </w-form-item>
            </w-col>
            
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="项目代码" prop="itemcode">
                <w-input v-model="form.itemcode" :maxlength="20" showCounter
                  placeholder="请输入代码"></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="项目名称" prop="itemname">
                <w-input v-model="form.itemname" :maxlength="20" showCounter
                  placeholder="请输入名称"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col>
              <w-form-item class=" pd-right" label="费用对应" prop="">
                <w-input
                  @focus="hadleInputFocus"
                  readonly
                  placeholder="请输入关键字搜索收费项目"
                  v-model="form.value2">
                  <template slot="suf-append">
                    <i class="w-icon-search"></i>
                  </template>
                </w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="默认数量"  prop="amount">
                <w-input-number :min=0 v-model.number="form.amount"></w-input-number>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="加减量"  prop="name">
                <w-input-number :min=0 v-model.number="form.addfactor"></w-input-number>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item label="备注">
                <w-input v-model="form.remark"  showCounter
                  placeholder="请填写备注"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <div v-else-if="modalTitle=== MODAL_TITLE.SELECT_ITEM">
          <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
            <template slot="suf-append">
              <i class="w-icon-search"></i>
            </template>
          </w-input>
          <w-table ref="multiTable" :data="tableData" :border="true" class="mt-15" style="width: 100%"
            @selection-change="handleSelectionChange">
            <w-table-column type="selection" width="50">
            </w-table-column>
            <w-table-column prop="value" label="代码" width="150">
            </w-table-column>
            <w-table-column prop="name" label="名称" >
            </w-table-column>
          </w-table>
          <w-pagination :total="10" :page-size="4"
            @page-size-change="handlePageSizeChange"
            :page-sizes="[4, 8, 12, 16]" :show="['prev', 'next', 'total', 'jump']">
          </w-pagination>
        </div>
        <!-- 新增成分类 -->
        <w-row v-else>
          <w-row>
            <w-col :span="24">
              <w-form-item :label="modalTitle+'代码'" prop="code"
              :rules="[
                { required: true, message: '年龄不能为空'},
              ]">
                <w-input v-model="form.code"  showCounter
                  placeholder="请填写成分代码"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item :label="modalTitle+'名称'" prop="name">
                <w-input v-model="codeLIst.name"  showCounter
                  placeholder="请填写成分名称"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
      
      </w-form>

      <span slot="footer" class="dialog-footer">
        <w-button @click="reset">取 消</w-button>
        <w-button type="primary" @click="submit">确 定</w-button>
      </span>
    </w-modal>
  </div>

</template>
<script>
import dataApi from './api/api.js';
import {MODAL_TITLE} from '../constant';

export default {
   
  // mixins: [autoResize],
  components: {
    // LeftInfoBody,
  },
  data() {
    return {
      value: '', // 搜索框
      visible: false,
      MODAL_TITLE,
      operationVal: 1, // 加减量
      numVal: 1, // 默认数量
      modalTitle: '', // 模态框标题
      modalType: '', // 模态框类型
      showInput: false,
      mouldcode: '',
      maincode: '',
      value2: '', // 模态框表格搜索
      implement:[], // 行政科室数据下拉列表
      openings:[],// 开单科室下拉列表
      mainTypesList:[], // 成分大类拉列表
      detailTypesList:[], // 成分小类拉列表
      tableData:[
        {
          value:'1',
          name:'悄悄告诉'
        },
        {
          value:'2',
          name:'一个秘密'
        },
        {
          value:'3',
          name:'往下看'
        },
        {
          value:'4',
          name:'哎呀，没了'
        },
        {
          value:'5',
          name:'我出来喽'
        },
        {
          value:'6',
          name:'好吧告诉你'
        },
        {
          value:'7',
          name:'这个秘密啊'
        },
        {
          value:'8',
          name:'这个秘密就是'
        },
        {
          value:'9',
          name:'就是'
        },
        {
          value:'10',
          name:'下班喽'
        }
      ],// 对应项目列表
      mtype:[
        {
          value:'1',
          name:'常规备血'
        },
        {
          value:'2',
          name:'常规用血'
        },
        {
          value:3,
          name:'紧急用血'
        },
        {
          value:'4',
          name:'自体输血'
        },
        {
          value:'5',
          name:'备血预约'
        }
      ], // 模板类型数据下拉列表
      category: [
        {
          value:'0',
          name:'门诊'
        },
        {
          value:'1',
          name:'住院'
        },
        {
          value:'2',
          name:'体检'
        },
        {
          value:'9',
          name:'全部'
        }
      ], // 开单类别下拉列表
      codeLIst: {
        code:'',
        name:''
      },
      form: {
        mouldcode:'', // 模板代码
        mouldname: '', // 模板名称
        mouldtype: '', // 模板类型 1 常规备血，2 常规用血，3 紧急用血，4 自体输血，5 备血预约
        execdeptcode: '', // 执行科室代码
        applydeptcode: '', // 申请科室代码
        usearea: '', // 开单类别） 0 门诊，1 住院， 2 体检 ，9 全部

        itemcode: '', // 项目代码
        itemname:'', // 项目名称
        maincode: '', // 成分大类代码
        mainname:'', // 成分大类名称
        detailcode:'', // 成分小类代码
        detailname:'', // 成分小类名称
        amount:0, // 默认数量
        hisitemcode:'', // 对应费用明细项编号
        addfactor: 0, // 增减因子
        remark: '', // 备注

        code:'',
        name:''
      },
      mouldItemsRow: {},
      rules: {
        mouldcode: [{
          required: true, message: '请输入模板代码', trigger: 'blur'
        }],
        mouldname: [{
          required: true, message: '请输入模板名称', trigger: 'blur'
        }],
        itemcode: [{
          required: true, message: '请输入项目代码', trigger: 'blur'
        }],
        itemname: [{
          required: true, message: '请输入项目名称', trigger: 'blur'
        }],
        mouldtype: [{
          required: true, message: '请选择模板类型', trigger: 'change'
        }],
        "execdeptcode": [{
          required: true, message: '请选择执行科室', trigger: 'change'
        }],
        applydeptcode: [{
          required: true, message: '请选择开单科室', trigger: 'change'
        }],
        usearea: [{
          required: true, message: '请选择开单类别', trigger: 'change'
        }],
        // amount: [{
        //  required: true, validator: validateAmount, trigger: 'blur' 
        // }],
        // detailname: [{
        //   required: true, message: '请选择成分小类', trigger: 'change'
        // }],
        hisitemcode: [{
          required: true, message: '请选择费用对应', trigger: 'change'
        }]
      },
      selection: [],
      listMouldItems: [],
      listMoulds: []
    };
  },
  computed: {
  },
  watch: {
    "form.maincode"(o , n) {
      console.log(o , n);
    },
    'form.detailcode'(o, n) {
      console.log(o, n);
    },
    listMoulds (o, n) {
      if(this.mouldItemsRow.MOULD_CODE ) {
        this.$nextTick(function() {
          this.$refs.interfaceTable.setCurrentRow(this.listMoulds[this.mouldItemsRow.index])
        })
        this.MouldItems(o[this.mouldItemsRow.index])
        this.mouldcode = o[this.mouldItemsRow.index].MOULD_CODE
      } else {
        this.$nextTick(function() {
          this.$refs.interfaceTable.setCurrentRow(this.listMoulds[0])
        })
        this.MouldItems(o[0])
        this.mouldcode = o[0].MOULD_CODE
      }

    }
  },
  created() {
    this.Moulds()
  },
  mounted() {
  },
  methods: {
    async MouldItems (row) { 
      const res = await dataApi.getMouldItems({
        mouldcode: row.MOULD_CODE
      })
      this.listMouldItems = res.data
    },
    async Moulds () {
      const res = await dataApi.getMoulds()
      this.listMoulds = res.data
    },
    handleClone(row) {
      this.visible = true
    },
    // 模态框表格多选值
    handleSelectionChange (val) {
      this.selection = val
      console.log(this.selection)
    },
    hadleInputFocus () {
      this.visible = true
      this.modalType = ''
      this.modalTitle = this.MODAL_TITLE.SELECT_ITEM
    },
    // 模态框➕按钮事件
    handlePlus (title) {
      if (title === 'big') {
        this.modalTitle = this.MODAL_TITLE.LARGE_CLASS
      } else {
        this.modalTitle = this.MODAL_TITLE.SUB_CLASS
      }
      console.log('模态框➕按钮事件')
    },
    tableRowClassName({row,rowIndex}) {
       row.index = rowIndex;
     },
    // 点击申请单列表某一行触发
    handleRow (row) {
      console.log(row)
      this.mouldItemsRow = row
      this.MouldItems(row)
    },
    handleSelChange(row) {
      console.log(row);
      this.getListDetailTypes(row.DETAIL_CODE)
      this.maincode = row.DETAIL_CODE
      this.form.detailname = ''
      this.form.detailcode = ''
      this.form.itemcode = ''
      this.form.itemname = ''
    },
    // copiedmouldcode
    async handleSelChange1(row) {
      if (row) {
        this.form.itemcode = row.DETAIL_CODE
        this.form.itemname = row.DETAIL_NAME
        this.form = {...this.form}
      }
      if (this.form.maincode === '') {
        const res = await dataApi.getByDetailType({detailcode: row.DETAIL_CODE})
        // this.mainTypesList = res.data
        const list = []
        list.push(res.data)
        this.mainTypesList = list
        this.form.maincode = res.data.MAIN_NAME
        this.getListDetailTypes(res.data.MAIN_CODE)
        this.getListMainTypes()
      }
      
    },
    // 点击模态框新增按钮事件
    async submit () {
    //  if {
      if (this.modalTitle === this.MODAL_TITLE.SELECT_ITEM) {
        console.log(this.selection);
        this.modalTitle = '项目'
      } else {
        this.$refs.form.validateForm(async (valid) => {
          if (valid) {
            if (this.modalType === this.MODAL_TITLE.EADIT) {
              if (this.modalTitle === '申请单'){
                const res = await dataApi.getModifyMould({...this.form})
                console.log(res.type);
                if (res.type === 'SUCCESS') {
                  this.showMsg(res.message,'success')
                  this.Moulds()
                  this.visible = false
                } else {
                  this.showMsg(res.message,'error')
                }
              } else {
                const list = {
                  mouldcode:this.mouldItemsRow.MOULD_CODE || this.mouldcode, // 模板代码
                  itemcode: this.form.itemcode, // 项目代码
                  itemname: this.form.itemname, // 项目名称
                  maincode: this.form.maincode.value, // 成分大类代码
                  mainname: this.form.maincode.DETAIL_NAME, // 成分大类名称
                  detailcode: this.form.detailcode.value, // 成分小类代码
                  detailname: this.form.detailcode.DETAIL_NAME, // 成分小类名称
                  amount: this.form.amount, // 默认数量
                  hisitemcode: this.form.hisitemcode, // 对应费用明细项编号
                  addfactor:  this.form.addfactor, // 增减因子
                  remark: this.form.remark // 备注
                }
                const res = await dataApi.getModifyMouldItem({...list})
                	if (res.type === 'SUCCESS') {
                    this.showMsg(res.message,'success')
                    this.MouldItems()
                    this.visible = false
                  } else {
                    this.showMsg(res.message,'error')
                  }
              }
            } else {
              // const res = await dataApi.getModifyMouldItem({})
              if (this.modalTitle === '项目') {
                console.log(this.form);
                const list = {
                  mouldcode:this.mouldItemsRow.MOULD_CODE || this.mouldcode, // 模板代码
                  itemcode: this.form.itemcode, // 项目代码
                  itemname: this.form.itemname, // 项目名称
                  maincode: this.form.maincode.value, // 成分大类代码
                  mainname: this.form.maincode.DETAIL_NAME, // 成分大类名称
                  detailcode: this.form.detailcode.value, // 成分小类代码
                  detailname: this.form.detailcode.DETAIL_NAME, // 成分小类名称
                  amount: this.form.amount, // 默认数量
                  hisitemcode: this.form.hisitemcode, // 对应费用明细项编号
                  addfactor:  this.form.addfactor, // 增减因子
                  remark: this.form.remark // 备注
                }
                const res = await dataApi.getAddMouldItem({...list})
                	if (res.type === 'SUCCESS') {
                    this.showMsg(res.message,'success')
                    this.visible = false
                    this.MouldItems(this.mouldItemsRow)
                  } else {
                    this.showMsg(res.message,'error')
                  }
              } else if (this.modalTitle === '成分大类'){
                const res = await dataApi.gitAddMainComponentType({
                  maincode:this.form.code,
                  mainname:this.form.name,
                })
                console.log(res,'成分大类');

                if (res.type === 'SUCCESS') {
                  this.showMsg(res.message,'success')
                  this.getListMainTypes()
                  this.modalTitle = '项目'
                } else {
                  this.showMsg(res.message,'error')
                }
              } else if (this.modalTitle === '成分小类') {
                const res = await dataApi.getAddDetailComponentType({
                  detailcode:this.form.code,
                  detailname:this.form.name,
                  maincode:this.maincode
                })
                console.log(res);
                if (res.type === 'SUCCESS') {
                  this.showMsg(res.message,'success')
                  this.modalTitle = '项目'
                  this.getListMainTypes()
                } else {
                  this.showMsg(res.success,'error')
                }
              } else {
                const list = {
                  mouldcode:this.form.mouldcode, // 模板代码
                  mouldname: this.form.mouldname, // 模板名称
                  mouldtype: this.form.mouldtype, 
                  execdeptcode: this.form.execdeptcode, // 执行科室代码
                  applydeptcode: this.form.applydeptcode, // 申请科室代码
                  usearea: this.form.usearea, // 开单类别） 0 门诊，1 住院， 2 体检 ，9 全部
                  copiedmouldcode: this.mouldItemsRow.MOULD_CODE
                }
                const res = await dataApi.getAddMould({...list})
                	if (res.type === 'SUCCESS') {
                    this.showMsg(res.message,'success')
                    this.Moulds()
                    this.visible = false
                  } else {
                    this.showMsg(res.message,'error')
                  }
              }
            }
          } else {
            // 未通过
            console.log('invalid form !')
          }
        })
      }
    },
    // 点击模态框取消按钮事件
    reset () {
      this.$refs.form.resetFields()
      if (this.modalTitle === '成分大类' || this.modalTitle === '成分小类') {
        this.modalTitle = '项目'
      } else if (this.modalTitle===this.MODAL_TITLE.SELECT_ITEM) {
        this.modalTitle = '项目'
      } else {
        this.form.maincode = ''
        this.form.mainname = ''
        this.form.remark = ''
        this.form.amount = 0
        this.form.addfactor = 0
        this.$refs.form.resetFields()
        this.visible = false
      }
      this.visible = false
    },
    // 列表删除提示框确定按钮
    handleConfirm (row,t,index) {
      this.isShowRow(t,'delete',row,index)
      this.tableData.splice(index, 1)
    },
    // 列表提示框取消按钮
     handleCancel (index) {
      // 手动取消
      this.cancelManually = true
      setTimeout(() => {
        this.listMouldItems[index].switch = !this.listMouldItems[index].switch // 恢复状态
      }, 200) // 等关闭气泡后修改状态， 避免出现数据状态过度，影响体验
    },
    // 新增按钮
    handleAdd (t) {
      this.visible=true
      this.modalType = this.MODAL_TITLE.ADD
      this.isShowRow(t)
    },
    // 项目列表修改按钮
    onEditing (row,t) {
      this.visible=true
      this.modalType = this.MODAL_TITLE.EADIT
      this.isShowRow(t,'edit',row)
      console.log(row);
    },
    handleClone (row, t) {
      this.visible=true
      this.modalType = ''
      this.isShowRow(t,'clone',row)
    },
    handleClose (tag) {
      this.selection.splice(this.selection.indexOf(tag), 1)
    },
    add (showInput) {
      if (showInput === true ) {
        this.showInput = false
      } else {
        this.showInput = true
      }
    },
    // 判断显示modal内容
    async isShowRow (t,isHandle,row,index) {
      if (t === 'left') {
        if (isHandle === 'delete') {
          this.$confirm('删除此模版将同步删除申请单下的所有项目， 是否确认删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const res = await dataApi.getRemoveMould({
              mouldcode:row.MOULD_CODE
            })
            if (res.type === 'SUCCESS') {
              this.showMsg(res.message,'success')
              this.listMoulds.splice(index, 1)
              this.Moulds()
            } else {
              this.showMsg(res.message,'error')
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else if (isHandle === 'edit' || isHandle === 'clone') {
          this.modalTitle = this.MODAL_TITLE.FORM
          const res = await dataApi.getFindMould({mouldcode:row.MOULD_CODE})
          if (isHandle === 'clone') {
            this.form = res.data
            this.$set(this.form, this.form.execdeptcode, 12345)
            this.form.mouldcode = ''
            this.form.mouldname = ''
          } else {
            this.form = res.data
          }

        } else {
          this.modalTitle = this.MODAL_TITLE.FORM
          
        }
        const res = await dataApi.getDeptInfos({depttype:'3'})
        this.implement = res.data
        const openings = await dataApi.getDeptInfos({depttype:'1'})
        this.openings = openings.data
      } else if (t === 'right') {
        if (isHandle === 'delete') {
          const res = await dataApi.getRemoveMouldItem({
            itemcode:row.MOULD_ITEM_CODE,
            mouldcode:this.mouldItemsRow.MOULD_CODE
          })
          if (res.type === 'SUCCESS') {
            this.showMsg(res.message,'success')
            this.listMouldItems.splice(index, 1)
            this.MouldItems(this.mouldItemsRow)
          } else {
            this.showMsg(res.message,'error')
          }
        } else if (isHandle === 'edit') {
          this.modalTitle = this.MODAL_TITLE.ITEM
          console.log(this.mouldcode);
          
          const res = await dataApi.getFindMouldItem({
            mouldcode:this.mouldcode,
            itemcode:row.MOULD_ITEM_CODE})
          this.form = res.data
          console.log(res, row.MOULD_ITEM_CODE);
        } else {
          this.modalTitle = this.MODAL_TITLE.ITEM
        
        }
          // 成分小类接口
          this.getListDetailTypes()
          // 成分大类接口
          this.getListMainTypes()
      } else {
        this.modalTitle = this.MODAL_TITLE.CLONE
      }
      console.log(t)
    },
    handlePageSizeChange(val) {
      console.log(val, '条/页');
    },
    // 成分大类接口
    async getListMainTypes () {
      const listMainTypes = await dataApi.getListMainTypes()
      this.mainTypesList = listMainTypes.data
      console.log(listMainTypes);
    },
    // 成分小类接口
    async getListDetailTypes (n) {
      // if (this.form.maincode) {
      //    n = this.form.maincode
      // }
      console.log(n,this.form.maincode);

      const listDetailTypes = await dataApi.getListDetailTypes({maincode:n})
      this.detailTypesList = listDetailTypes.data 
    }
  }
};
</script>

<style lang="stylus" scoped>
.home-page-wrap-ba
  height 100%
  padding 12px 15px
  background rgba(234,237,244,1)
  overflow-x auto
  overflow-y hidden
  
  .title
    font-weight 500;
    font-size 14px;
    color #000622;
  .home-page-body
    padding 16px
    background rgba(255,255,255,1)
    border-radius 2px
    .left-body
      height 100%
      width calc(100% - 415px)
      float left
    .right-body
      width 400px
      margin-left 15px
      height 100%
      float right
      background #fff
</style>
<style lang="scss" scoped>
.list-style {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
// .pd-right {
//   .w-input {
//     width:200px!important
//   }
// }
.w-select {
  width:100%!important;
}


.w-row {
  padding-bottom: 16px;
}
// .w-form
//   .w-form-item__label
//     margin-left 0px
//   .w-select
//     width 100%

  .unitDepartment-tag {
    width: 70%;
    min-height: 44px;
    background-color: #f3f6fe;
    border-radius: 4px;
    display:inline-block;
    span {
      display:inline-block;
      padding-left: 10px;
      color:#999;
    }
    .w-input,
    .w-select,
    .w-input__inner {
      width:100%!important;
      min-height: 44px!important;
    }
  }
  .unitDepartment-tag:hover {
    background-color: #e7edfd;
    // box-shadow: #2d5afa 0px 0px 3px;
  }
  // .unitDepartment-tag:focus {
  //   border-color: #5175f4;
  //   box-shadow: #2d5afa 0px 0px 0px;
  // }
</style>
<style lang="scss">
.modal {
  .w-modal__footer,
  .w-modal__body {
    margin-right: 30px!important;
  }
  .w-modal__body {
    padding: 20px 20px 0px 0px;
  }
}

</style>