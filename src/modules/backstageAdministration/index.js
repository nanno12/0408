import { debounce } from 'throttle-debounce'
import dataApi from './api/api.js';
import {MODAL_TITLE} from '../constant';
export default {
  data() {
    return {
      // 注意:key 的字符类型要一致!!!
      value: '', // 搜索框
      visible: false,
      modalShow:true,
      innerVisible:false,
      loading:false,
      MODAL_TITLE,
      amount:'',
      addfactor:'',
      search:'',
      e:40,
      s:20,
      radioValue:1,
      oldItemcode:'',
      operationVal: 1, // 加减量
      numVal: 1, // 默认数量
      pagesize:20,
      currentPage:1,
      total:0,
      modalTitle: '', // 模态框标题
      modalType: '', // 模态框类型
      showInput: false,
      mouldcode: '',
      maincode: '',
      value2: [], // 模态框表格搜索
      implement:[], // 行政科室数据下拉列表
      openings:[],// 开单科室下拉列表
      listData:[],
      mainTypesList:[], // 成分大类拉列表
      detailTypesList:[], // 成分小类拉列表
      tableconten:'请输入关键字查询数据',
      scrollToLower: () => {},
      costList: [],
      tableTitle:[
        {
          prop:'MAIN_CODE',
          label:'编码',
          width:'100px'
        },
        {
          prop:'MAIN_NAME',
          label:'名称',
        }
      ],
      mainTypeData:[],
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
          value:'3',
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
      getRowKeys(row) {
        return row.CHARGE_CODE
      },
      form: {
        mouldcode:'', // 模板代码
        mouldname: '', // 模板名称
        mouldtype: '', // 模板类型 1 常规备血，2 常规用血，3 紧急用血，4 自体输血，5 备血预约
        execdeptcode: '', // 执行科室代码
        applydepts: [], // 申请科室代码
        usearea: '', // 开单类别） 0 门诊，1 住院， 2 体检 ，9 全部
        itemcode: '', // 项目代码
        itemname:'', // 项目名称
        maincode: {
          MAIN_CODE: '',
          MAIN_NAME: ''
        }, // 成分大类代码
        mainname:'', // 成分大类名称
        detailcode:{
          DETAIL_CODE: '',
          DETAIL_NAME: '',
          MAIN_CODE: ''
        }, // 成分小类代码
        chargeItems:[],
        detailname:'', // 成分小类名称
        amount:"1", // 默认数量
        // hisitemcode:'', // 对应费用明细项编号
        addfactor: '', // 增减因子
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
        usearea: [{
          required: true, message: '请选择开单类别', trigger: 'change'
        }],
        addfactor: [
          { required: true, message: '加减量不能为空'}
        ],
      },
      selectionVal: [],
      listMouldItems: [],
      listMoulds: [],
      isShow: {
        operation:true,
        selection:true
      },
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      selectArr:[],  // 右边列表
      buttonSize: 'large',

    };
  },
  computed: {
  },
  watch: {
    'costList' (oldVal, newVal) {
      this.$nextTick(() => {
        this.form.chargeItems.map((v) => {
            this.costList.find(it =>{
              if (v.chargeItemCode === it.CHARGE_CODE) {
                this.$refs.costList.toggleRowSelection(it,true)
              }
            })
          })
        })
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
  mounted () {
    
    this.scrollToLower = debounce(200, this.fetchData)
  // this.clearValidate('form') // 清除整个表单的校验
  },
  methods: {
    checkAll(val) {
      this.nowSelectData = val;
      console.log('row',val);
    },
    checkRightAll(val) {
      this.nowSelectRightData = val;
    },
    handelSelect(){   
      this.selectArr = this.handleConcatArr(this.selectArr, this.nowSelectData) 
      this.handleRemoveTabList(this.nowSelectData,  this.mainTypeData);
      this.nowSelectData = [];
   },
    // 取消
    handleRemoveSelect() {
      this.mainTypeData = this.handleConcatArr(this.mainTypeData, this.nowSelectRightData) 
      this.handleRemoveTabList(this.nowSelectRightData,  this.selectArr);
      this.nowSelectRightData = [];
    },
    handleConcatArr(selectArr, nowSelectData) {
      let arr = [];
      arr = arr.concat(selectArr, nowSelectData);   
      console.log(arr,'selectArr, nowSelectData',selectArr, nowSelectData);
      return arr;
    },
    handleRemoveTabList(isNeedArr,  originalArr) {
      console.log('isNeedArr',isNeedArr);
      if(isNeedArr.length && originalArr.length) {
         for(let i=0; i<isNeedArr.length; i++) {
            for(let k=0; k<originalArr.length; k++) {
              if(isNeedArr[i]["name"] === originalArr[k]["name"]) {
                originalArr.splice(k, 1);   
              }
            }
         }
      }
    },
    async handleChange (e) {
      if (e === '1' || e ==='2') {
        let id = ''
        if (this.mouldItemsRow.ID === undefined) {
          id = this.listMoulds[0].ID
        } else {
          id = this.mouldItemsRow.ID
        }
        console.log('12412',id);
        const res = await dataApi.getFindMould({mouldtype:e,mouldcode:id})
        console.log('resres',res);
        if (res.type === 'SUCCESS') {
          if (e === '1')  {
            if (res.data[0] === null) {
              this.form.mouldtype = '1'
            } else {
              this.showMsg('您选择的模板类型【常规备血】已存在不能重复新增，请重新选择','warning')
              this.form.mouldtype = ''
            }
            console.log('okffffok');
          } else {
            if (res.data[1] === null) {
              this.form.mouldtype = '2'
            }  else {
              this.showMsg('您选择的模板类型【常规用血】已存在，不能重复新增，请重新选择','warning')
              this.form.mouldtype = ''
            }
          }
        } else {
           this.showMsg('失败','error')
        }
      }
      console.log('e',e);
    },
    async remoteMethod(query) {
      console.log('eee',query);
      this.loading = true;
      const openings = await dataApi.getDeptInfos({
        depttype:'1',
        search:query
      })
      this.loading = false;
      this.openings = openings.data
    },
    async remoteMethod1(query) {
      console.log('eee',query,t);
    },
    async handleFocusInput() {
   
    },
    async MouldItems (row) { 
      const res = await dataApi.getMouldItems({
        mouldcode: row.MOULD_CODE
      })
      this.listMouldItems = res.data
    },
    // async Moulds () {
    async Moulds () {
      // 查询申请单列表
      const res = await dataApi.getMoulds()
      this.listMoulds = res.data
      this.loading = true;
      // 获取科室列表
      const openings = await dataApi.getDeptInfos({depttype:'1',pagesize:100,pageno:1})
      this.loading = false;
      this.openings = openings.data.DEPTS
    },
    // 模态框表格多选值
    handleSelectionChange (rows,row) {
      console.log('rows',rows);
      this.selectionVal = rows
    },
    hadleInputFocus () {
      this.visible = true
      this.modalType = ''
      this.modalTitle = this.MODAL_TITLE.SELECT_ITEM
    },
    // 模态框➕按钮事件
    async handlePlus (title) {
      console.log('title',title);
      this.innerVisible = true
      const res = await dataApi.getListMainTypes()
      this.mainTypeData = res.data
      console.log('模态框➕按钮事件')
    },
    tableRowClassName({row,rowIndex}) {
       row.index = rowIndex;
     },
    // 点击申请单列表某一行触发
    handleRow (row) {
      this.mouldItemsRow = row
      this.MouldItems(row)
    },
    handleSelChange(row) {
      console.log(row);
      this.getListDetailTypes(row.MAIN_CODE)
      this.maincode = row.DETAIL_CODE
      this.form.detailname = ''
      this.form.detailcode = ''
      this.form.itemcode = ''
      this.form.itemname = ''
    },
    // copiedmouldcode
    async handleSelChange1(row) {
      console.log('row',row,this.form.maincode);
      if (row) {
        this.form.itemcode = row.DETAIL_CODE
        this.form.itemname = row.DETAIL_NAME
        this.amount = row.DETAIL_UNIT
        this.addfactor = row.DETAIL_UNIT
        this.form = {...this.form}
      }
      console.log('this.form.maincode',this.form.maincode);
      if (this.form.maincode.MAIN_CODE === '' ) {
        const res = await dataApi.getByDetailType({detailcode: row.DETAIL_CODE})
        const find =  this.mainTypesList.find(it => it.MAIN_CODE === res.data.MAIN_CODE)
        console.log(find,'res',res.data.MAIN_CODE,res,this.form);
        this.form.maincode.MAIN_CODE= find.MAIN_CODE
        this.form.maincode.MAIN_NAME = find.MAIN_NAME
        this.form.maincode = {...this.form.maincode}
        this.getListMainTypes()
        this.getListDetailTypes(res.data.MAIN_CODE)
      }
    },
    // 点击模态框新增按钮事件
    async submit (t) {
      console.log('subtt',t,this.modalTitle);
      if (t === 'out') {
        this.$refs.form.validateForm(async (valid) => {
          if (valid) {
            if (this.modalTitle === MODAL_TITLE.FORM) {
              console.log(this.modalTitle);
              this.submitFormData()
            } else {
              this.submitItemDate()
              console.log(this.modalTitle);
            }
            // this.$refs.form.clearValidate();
            // this.$refs.form.resetFields();
          }else {
            console.log('invalid form !',this.form)
          }
        })
      } else {
        this.innerVisible = false
        this.visible = true
        this.modalTitle = MODAL_TITLE.ITEM
        // let arr = []
        this.costList = []
        this.form.value2 = []
        this.form.chargeItems = []
        // this.form.item.itemPrice = ''
        var obj = {};
        this.selectionVal = this.selectionVal.reduce((item, next) => {
            obj[next.CHARGE_CODE] ? '' : obj[next.CHARGE_CODE] = true && item.push(next);
            return item;
        }, []);
        this.selectionVal.map(item => {
          if (item) {
            this.form.chargeItems.push({
              chargeItemCode:item.CHARGE_CODE,	// --收费编码
              chargeItemName:item.CHARGE_NAME,	// --收费项目名称
              chargeItemPrice:item.CHARGE_PRICE,	// --收费项目价格
              chargeItemType:item.CHARGE_TYPE, //  --收费项目类型
              chargeMtechFlag:Number(item.CHARGE_MTECH_FLAG), // --收费项目医技确认标志  0不需确认 1确认
              chargeMainFlag:0     // --主项目标志  0非主项目 1主项目
            })
            // this.form.value2.push(item.CHARGE_NAME)
            // arr.push(item.CHARGE_PRICE)
          }
        })
        console.log(this.form.chargeItems,'this.selectionVal',this.selectionVal);

        // let sumArr = arr.map(Number)
        // // for方法
        // let sum = 0;
        // for (let i = 0, len = sumArr.length; i < len; i++) {
        //     sum += sumArr[i]
        // }
        // this.form.item.itemPrice = sum
        this.search = ''
        this.$refs.costList.clearSelection()
        console.log('inner');
      }
    },
    handleTagChoose (item) {
      this.form.chargeItems.find(it => {
        it.chargeMainFlag = 0
        if(it.chargeItemCode === item.chargeItemCode) {
          it.chargeMainFlag = 1
          this.radioValue = 1
          console.log(this.radioValue,'chargeItemCode',it.chargeItemCode, item.chargeItemCode);
        } else {
          it.chargeMainFlag = 0
        }
      })
      console.log('item',item,this.form.chargeItems,this.radioValue);
    },
    // 点击收费项目
    async handleIputVal () {
      this.innerVisible  = true
      this.modalTitle = MODAL_TITLE.SELECT_ITEM
      this.tableconten='请输入关键字查询数据'
      this.total = 0
      let list = []
      if (this.form.chargeItems.length ===undefined)return
      this.loading = true
      const res = await dataApi.getQuery({CHARGE_SEARCH:''})
      this.form.chargeItems.map(it => {
        res.data.find(id => {
          if (it.chargeItemCode === id.CHARGE_CODE) {
            setTimeout(() => {
              list.push(id)
              this.$refs.costList.toggleRowSelection(id,true)
              this.loading = false
            }, 600)
          }
        })
        this.costList = list
        this.total = list.length
      })
    },
    async submitFormData() {
      if(this.modalType === MODAL_TITLE.ADD ||  this.modalType === MODAL_TITLE.CLONE) {
         // 新增申请单
        const applydepts = []
        this.form.applydepts.map(item => {
          applydepts.push({deptcode:item.deptcode})
        })
        const list = {
          mouldcode:this.form.mouldcode, // 模板代码
          mouldname: this.form.mouldname, // 模板名称
          mouldtype: this.form.mouldtype, 
          execdeptcode: this.form.execdeptcode, // 执行科室代码
          applydepts, // 申请科室代码
          usearea: this.form.usearea, // 开单类别） 0 门诊，1 住院， 2 体检 ，9 全部
          copiedmouldcode: this.mouldItemsRow.MOULD_CODE
        }
        const res = await dataApi.getAddMould({...list})
        if (res.type === 'SUCCESS') {
          this.showMsg(res.message,'success')
          // 更新列表
          const res1 = await dataApi.getMoulds()
          this.listMoulds = res1.data
          this.visible = false
        } else {
          this.showMsg(res.message,'error')
        }
      } else {
        // 修改申请单
        const res = await dataApi.getModifyMould({...this.form})
        console.log(res.type);
        if (res.type === 'SUCCESS') {
          this.showMsg(res.message,'success')
          // 更新列表
          const res1 = await dataApi.getMoulds()
          this.listMoulds = res1.data
          this.visible = false
        } else {
          this.showMsg(res.message,'error')
        }
      }
    },
    async submitItemDate() {
      let olditemcode =''
      if(this.modalType !== MODAL_TITLE.ADD) {
        olditemcode=this.oldItemcode// 原来的项目代码
      }
      console.log('this.oldItemcode',this.oldItemcode);
      let list = {
        mouldcode:this.mouldItemsRow.MOULD_CODE || this.mouldcode, // 模板代码
        itemcode: this.form.itemcode, // 项目代码
        olditemcode,
        itemname: this.form.itemname, // 项目名称
        chargeItems: this.form.chargeItems,
        maincode: this.form.maincode.MAIN_CODE, // 成分大类代码
        mainname: this.form.maincode.MAIN_NAME, // 成分大类名称
        detailcode: this.form.detailcode.DETAIL_CODE, // 成分小类代码
        detailname: this.form.detailcode.DETAIL_NAME, // 成分小类名称
        amount: this.form.amount, // 默认数量
        hisitemcode: this.form.hisitemcode, // 对应费用明细项编号
        addfactor: this.form.addfactor, // 增减因子
        remark: this.form.remark // 备注
      }
      console.log('this.form.chargeItems',this.form,list);
        const res = await dataApi.getAddMouldItem({...list})
        if (res.type === 'SUCCESS') {
          this.showMsg(res.message,'success')
          console.log('this.mouldItemsRow',this.mouldItemsRow.ID,this.listMoulds);
          if (this.mouldItemsRow.ID === undefined) {
            this.MouldItems(this.listMoulds[0])
          } else {
            this.MouldItems(this.mouldItemsRow)
          }
          this.visible = false
        } else {
          this.showMsg(res.message,'error')
        }
      
    },
    //  if {
      // this.$refs.form.validateForm(async (valid) => {
      //   if (valid) {
      //     } else if (this.modalTitle === '项目') {
      //       const list = {
      //         mouldcode:this.mouldItemsRow.MOULD_CODE || this.mouldcode, // 模板代码
      //         olditemcode:this.oldItemcode,// 原来的项目代码
      //         itemcode: this.form.itemcode, // 项目代码
      //         itemname: this.form.itemname, // 项目名称
      //         maincode: this.form.maincode.MAIN_CODE, // 成分大类代码
      //         mainname: this.form.maincode.MAIN_NAME, // 成分大类名称
      //         detailcode: this.form.detailcode.DETAIL_CODE, // 成分小类代码
      //         detailname: this.form.detailcode.DETAIL_NAME, // 成分小类名称
      //         amount: this.form.amount, // 默认数量
      //         // hisitemcode: this.form.hisitemcode, // 对应费用明细项编号
      //         addfactor:this.form.addfactor, // 增减因子
      //         remark: this.form.remark // 备注
      //       }
      //       console.log('list',list,this.form.addfactor);
      //       const res = await dataApi.getModifyMouldItem({...list})
      //       if (res.type === 'SUCCESS') {
      //         this.showMsg(res.message,'success')
      //         if (this.mouldItemsRow.ID === undefined) {
      //           this.MouldItems(this.listMoulds[0])
      //         } else {
      //           this.MouldItems(this.mouldItemsRow)
      //         }
      //         this.$refs.form.clearValidate();
      //         this.$refs.form.resetFields();
      //         this.visible = false
      //       } else {
      //         this.showMsg(res.message,'error')
      //       }
      //       const list = {
      //         mouldcode:this.mouldItemsRow.MOULD_CODE || this.mouldcode, // 模板代码
      //         itemcode: this.form.itemcode, // 项目代码
      //         itemname: this.form.itemname, // 项目名称
      //         maincode: this.form.maincode.MAIN_CODE, // 成分大类代码
      //         mainname: this.form.maincode.MAIN_NAME, // 成分大类名称
      //         detailcode: this.form.detailcode.DETAIL_CODE, // 成分小类代码
      //         detailname: this.form.detailcode.DETAIL_NAME, // 成分小类名称
      //         amount: this.form.amount, // 默认数量
      //         hisitemcode: this.form.hisitemcode, // 对应费用明细项编号
      //         addfactor:this.form.addfactor, // 增减因子
      //         remark: this.form.remark // 备注
      //       }
      //       console.log(list, this.form.maincode);
      //       const res = await dataApi.getAddMouldItem({...list})
      //       if (res.type === 'SUCCESS') {
      //         this.showMsg(res.message,'success')
      //         console.log('this.mouldItemsRow',this.mouldItemsRow.ID,this.listMoulds);
      //         if (this.mouldItemsRow.ID === undefined) {
      //           this.MouldItems(this.listMoulds[0])
      //         } else {
      //           this.MouldItems(this.mouldItemsRow)
      //         }
      //         this.visible = false
      //       } else {
      //         this.showMsg(res.message,'error')
      //       }
      //     } else if (this.modalTitle === '成分大类'){
      //       const res = await dataApi.gitAddMainComponentType({
      //         maincode:this.form.code,
      //         mainname:this.form.name,
      //       })
      //       console.log(res,'成分大类');

      //       if (res.type === 'SUCCESS') {
      //         this.showMsg(res.message,'success')
      //         this.getListMainTypes()
      //         this.modalTitle = '项目'
      //       } else {
      //         this.showMsg(res.message,'error')
      //       }
      //     } else if (this.modalTitle === '成分小类') {
      //       const res = await dataApi.getAddDetailComponentType({
      //         detailcode:this.form.code,
      //         detailname:this.form.name,
      //         maincode:this.maincode
      //       })
      //       console.log(res);
      //       if (res.type === 'SUCCESS') {
      //         this.showMsg(res.message,'success')
      //         this.modalTitle = '项目'
      //         this.getListMainTypes()
      //       } else {
      //         this.showMsg(res.success,'error')
      //       }
      //     } 
      //   } else {
      //     console.log('invalid form !')
      //   }
      // })
    // },
    // 点击模态框取消按钮事件
    reset (formName) {
      console.log('tt',formName);
      if (formName === 'inner') {
        this.innerVisible = false
        this.visible = true
      } else {
        
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
        // this.$refs[formName].resetFields();
        // this.$refs.form.clearValidate();
        // this.$refs.form.resetFields();
        this.visible = false
      }
      // this.$refs.form.resetFields();
      console.log(this.form);
    },
    // 列表删除提示框确定按钮
    handleConfirm (row,t,index) {
      this.isShowRow(t,'delete',row,index)
      // this.tableData.splice(index, 1)
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
    async handleAdd (t) {
      this.visible=true
      this.modalType = this.MODAL_TITLE.ADD
      if (t === 'left') {
        this.modalShow = true
        this.modalTitle = MODAL_TITLE.FORM
        // 执行科室接口
        const res = await dataApi.getDeptInfos({depttype:'3'})
        this.implement = res.data
      } else {
        this.modalTitle = MODAL_TITLE.ITEM
        this.modalShow = false
         // 成分大类接口
        this.getListMainTypes () 
        this.getListDetailTypes()
      }
      console.log('ttt', t,this.modalTitle);
      // this.isShowRow(t)
    },
    // 修改按钮
    async onEditing (row,t) {
      if (t === 'left' || t === 'clone') {
        this.modalShow = true
        this.modalTitle = MODAL_TITLE.FORM
        const res = await dataApi.getFindMould({mouldcode:row.MOULD_CODE})
        if (t === 'clone') {
          this.form = res.data
          this.form.mouldcode = ''
          this.form.mouldname = ''
          this.modalType = this.MODAL_TITLE.CLONE
        } else {
          this.form = res.data
          this.modalType = this.MODAL_TITLE.EADIT
        }
        // 执行科室接口
        const res1 = await dataApi.getDeptInfos({depttype:'3'})
        this.implement = res1.data
      } else {
        const res = await dataApi.getFindMouldItem({
          mouldcode:row.MOULD_CODE,
          itemcode:row.MOULD_ITEM_CODE})
          console.log('res',res.data);
        this.form.maincode.MAIN_CODE =  res.data.maincode || ''
        this.form.maincode.MAIN_NAME =  res.data.mainname || ''
        this.form.detailcode.DETAIL_CODE =  res.data.detailcode || ''
        this.form.detailcode.DETAIL_NAME =  res.data.detailname || ''
        this.form.detailcode.chargeitems= res.data.chargeItems,
        this.form.detailname = res.data.detailname
        this.form.mainname = res.data.mainname
        this.form.itemcode = res.data.itemcode
        this.form.itemname = res.data.itemname
        this.form.addfactor = res.data.addfactor
        this.form.amount = res.data.amount
        this.form.mouldcode = res.data.mouldcode
        this.form.remark = res.data.remark
        this.form.chargeItems = res.data.chargeitems
        // this.form.detailcode =  res.data.detailname
        this.form.maincode = {...this.form.maincode}
        this.form.detailcode = {...this.form.detailcode}
        this.oldItemcode = res.data.itemcode
        console.log('hfkjdsk',this.form);
        this.modalTitle = MODAL_TITLE.ITEM
        this.modalType = this.MODAL_TITLE.EADIT
        this.modalShow = false
         // 成分大类接口
         this.getListMainTypes () 
         // 成分小类接口
         this.getListDetailTypes()
      }
      this.visible=true
      console.log(row);
    },
    handleTagClose (index) {
      this.form.chargeItems.splice(index, 1)
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
          console.log('res',res.applydepts);
          if (isHandle === 'clone') {
            this.form = res.data
            this.$set(this.form, this.form.execdeptcode, 12345)
            this.form.mouldcode = ''
            this.form.mouldname = ''
          } else {
            this.form = res.data
          }
          console.log('this.form.applydepts',this.form.applydepts);
        } else {
          this.modalTitle = this.MODAL_TITLE.FORM
        }
        // const res = await dataApi.getDeptInfos({depttype:'3'})
        // this.implement = res.data
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
          const res = await dataApi.getFindMouldItem({
            mouldcode:row.MOULD_CODE,
            itemcode:row.MOULD_ITEM_CODE})
          // this.form = res.data
          console.log('res',res.data,this.form);
          this.form.maincode.MAIN_CODE =  res.data.maincode || ''
          this.form.maincode.MAIN_NAME =  res.data.mainname || ''
          this.form.detailcode.DETAIL_CODE =  res.data.detailcode || ''
          this.form.detailcode.DETAIL_NAME =  res.data.detailname || ''
          this.form.detailname = res.data.detailname
          this.form.mainname = res.data.mainname
          this.form.itemcode = res.data.itemcode
          this.form.itemname = res.data.itemname
          this.form.addfactor = res.data.addfactor
          this.form.amount = res.data.amount
          this.form.mouldcode = res.data.mouldcode
          this.form.remark = res.data.remark
          // this.form.detailcode =  res.data.detailname
          // this.getListMainTypes()
          this.form.maincode = {...this.form.maincode}
          this.form.detailcode = {...this.form.detailcode}
          // this.form = {...this.form}
          this.oldItemcode = res.data.itemcode
          console.log('this.form',this.form);
        }
      }
      console.log(t)
    },
    async handleSearch(search) {
      console.log('search',search);
      await this.getCostList(search)
    },
    async getCostList (search) {
      const res = await dataApi.getQuery({CHARGE_SEARCH:search})
      console.log('res.data',res.data);
      if (res.data === null) return
      this.loading = true
      setTimeout(() => {
        this.costList = res.data
        this.total = res.data.length
        this.loading = false
      }, 600)
      this.tableconten = '暂无数据'
    },
     // 成分小类接口
     async getListDetailTypes (n) {
      const listDetailTypes = await dataApi.getListDetailTypes({maincode:n})
      this.detailTypesList = listDetailTypes.data 
    },
    // 成分大类接口
    async getListMainTypes () {
      const listMainTypes = await dataApi.getListMainTypes()
      this.mainTypesList = listMainTypes.data
    },
    fetchData () {
      console.log(this.$refs.costList.scrollTop , this.$refs.costList.scrollHeight);
      this.loading = true
      const list = this.listData.slice(this.s,this.e)
      // const temp = []
      // for (let i = list; i <= list.length + 20; i++) {
      //   console.log('iiii',i);
      //   temp.push(i);
      // }
      // console.log('temp',temp);
      list.map((item,index)=>{
        console.log('index',index);
        setTimeout(() => {
        this.costList.push(item)
        this.loading = false
      }, 600)
      })
      this.s= this.s+20
      this.e= this.e+20
      console.log('this.s,this.e',this.s,this.e);
    },
    // 当前页
    currentChange1(val) {
      this.currentPage = val; // 当前页
      // this.getPafTemplateitems(this.rowLi.ID)  // 刷新
    }
  },
};