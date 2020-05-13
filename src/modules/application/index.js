import apiData from './api/api'

import { MODAL_TITLE, QUERY_PAGE} from '../constant'
export default {
  data() {
    return {
      modalTitle:'',
      fileList: [],
      height:'200px',
      isDisabled: false,
      MODAL_TITLE,
      QUERY_PAGE,
      clickIndex:0,
      search:'',
      loading:true,
      innerVisible:false,
      paginationBoxReflow:true,
      hoverIndex: -1,
      h : '',
      formTitle:'',
      value2: [], // 搜索值
      // pageSize:10,
      // currentPage:20,
      total:100,
      value: [1,2,3,4],
      rowRightList: {},
      rowLeftList: {},
      visible: false,
      isShow:{
        index:true,
        indexTitle:'序号',
        width:'120px'
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
        value2:[],
        templateName: "", // 申请单名称
        printTemplate: '' , // 打印模板
        isShowOperation:"0",	//--是否显示手术
        isShowSpecimen:"1",		//--是否显示标本
        isShowEndpscopic:"1", //是否显示内镜信息
        isShowGynecological:"0",//	--是否显示妇科
        isShowTumour:"0",	//	--是否显示肿瘤
        isShowHpv:"0", // --是否显示HPV信息
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
          chargeItemPrice:"",	// --收费项目价格
          chargeItemType:""  // --收费项目类型
        }],
      },
      checkboxList: [
        {
          label:1, // 2
          name: '临床信息',
          disabled: true
        },
        {
          label:2, // 3
          name: '标本信息',
          disabled: true
        },
        {
          label:3, // 4
          name: '医嘱信息',
          disabled: true
        },
        {
          label:4, // 8
          name: '既往病理检查结果',
          disabled: true
        },
        {
          label:5, // 5
          name: '妇科信息',
          disabled: false
        },
        {
          label:6, //1
          name: '手术信息',
          disabled: false
        },
        {
          label:7,//6
          name: '肿瘤信息',
          disabled: false
        },
        {
          label:8,//6
          name: '细胞学活HPV检查结果',
          disabled: false
        },
        
      ],
      costList: [],
      selectionVal: [],
      getRowKeys(row) {
        return row.CHARGE_CODE;
      },
      rules: {
        'item.itemCode': [
          {
            required: true,
            message: "请输入项目编码",
            trigger: "change"
          }
        ],
        'item.itemName': [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "change"
          }
        ],
        'item.itemPrice': [
          { required: true, message: '项目价格不能为空'},
        ],
        
        templateName: [{
          required: true, message: '请输入申请单名称', trigger: 'blur'
        }],
        'item.chargeItems': [
          {
            required: true,
            type: 'array',
            message: "请选择区域",
            trigger: "change"
          }
        ]
      },
      rigthData: [],
      rowLi:{},
      leftData: {
        IS_SHOW_GYNECOLOGICAL:'1234'
      },
      a:[]
    };
  },
  watch: {
    'costList' (oldVal, newVal) {
      let list = []
      this.form.chargeItems.forEach((vv,ii) => {
        list.push({
          CHARGE_CODE:vv.chargeItemCode,
          CHARGE_NAME:vv.chargeItemName,
          CHARGE_PRICE:vv.chargeItemPrice
        })
      })
      this.$nextTick(() => {
          list.map((v,i) => {
            this.costList.find(it =>{
              if (v.CHARGE_CODE === it.CHARGE_CODE) {
                  this.$refs.costList.toggleRowSelection(it,true)
              }
            })
          })
        })
      
    },
    // selectionVal (oldVal, newVal) {
    //   console.log('oldVal',oldVal,newVal);
    //   if (oldVal) {
    //     this.isDisabled = false
    //     console.log('this.isDisabled',this.isDisabled);
    //   }
    // },
    'form.chargeItems' (oldVal, newVal) {
      console.log('oldVal',oldVal,newVal);
    }
  },
  created() {
    this.list()
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    async list (id) {
      const res = await apiData.getFindPafTemplate({...QUERY_PAGE})
      this.leftData = res.data
      if (res.data === null)return
      this.rowLi = res.data[0]
      res.data.map(item=>{
        if (item.isShowGynecological === '1') {
          this.value.push(5)
        } 
        if (item.isShowOperation === '1') {
          this.value.push(6)
        } 
        if (item.isShowTumour === '1') {
          this.value.push(7)
        }
        if (item.isShowHpv === '1') {
          this.value.push(8)
        }

      })
      if ( res.data !== null) {
        if (id === undefined) {
          id = this.rowLi.ID
        }

      this.getPafTemplateitems(id)
    }
    },
    // 点击申请单列表单行
    async handleLeftRow (row,index) {
      this.QUERY_PAGE.pageIndex = 1
      this.QUERY_PAGE.currentPager = 1 
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
      this.rigthData = res.data.itemList
      this.total = res.data.itemSum
    },
    
    async getcopy (id) {
      const res = await apiData.getcopy({id})
      // this.list()
      if (res.type === 'SUCCESS') {
        this.showMsg('复制申请单成功','success')
        this.list(id)
      } else {
         this.showMsg('复制申请单失败','error')
      }
    },
    // 点击申请单某一行
    async handleRowL (item,index,t) {
      this.modalTitle = MODAL_TITLE.FORM
      this.h =  MODAL_TITLE.EADIT
      this.formTitle = t
       switch(t) {
        case 'edit':
          this.visible = true
          this.h =  MODAL_TITLE.EADIT
          this.getPafTemplate(item.ID)
          break;
        case 'delete':
          this.getDeletePafTemplate(item.ID,index)
          break;
        default:
          this.h =  MODAL_TITLE.CLONE
          this.getcopy(item.ID)
      } 
    },
    
    // 点击申请单项目列表的莫一行
    handleRowR(row) {
      this.rowRightList = row
      console.log(row,'单项目列表的莫一行');
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
      console.log(row,'项目修改');
      let list = []
      res.data.chargeItems.map(item=>{
        list.push(item.chargeItemName)
      })
      this.form.value2 = list
    },
    // 项目删除
    async handleDelete (row) {
      const res = await apiData.getDeleteTempItem({
        id:row.pafTemplateitemId
      })
      this.showMsg1(res,'删除申请单项目')
      let id = ''
      if (this.rowLeftList.ID) {
        id = this.rowLeftList.ID
      } else {
        id = this.leftData[0].ID
      }
      this.getPafTemplateitems(id)
    },
    // 获取申请单查看接口
    async getPafTemplate (id) {
      const res = await apiData.getPafTemplate({id})
      console.log(res.data,'获取当前申请单数据');
      if (res.data === null)return
      if (res.data.isShowOperation === '1') {
        this.value.push(6)
      } 
      if (res.data.isShowGynecological === '1') {
        this.value.push(5)
      } 
      if (res.data.isShowTumour === '1') {
        this.value.push(7)
      }
      if (res.data.isShowHpv === '1') {
        this.value.push(8)
      }
      this.form = res.data
    },
    // 删除申请列表数据
    async getDeletePafTemplate (id,index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(async() => {
      this.leftData.map( (item,index) => {
        item['index']=index
      })
      const res = await apiData.getDeletePafTemplate({id})
      this.showMsg1(res,'删除申请单')
      let ids = ''
      if (this.leftData[this.leftData.length-1].ID === id) {
        this.clickIndex = index-1
        ids = this.leftData[this.leftData.length-2].ID
      } else {
        const find = this.leftData.find(item => item.index === index+1) 
        if (find) {
          ids = find.ID
        }
        this.clickIndex = index
      }
      // this.list()
      this.leftData.splice(index,1)
      this.getPafTemplateitems(ids)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
    },
    // 点击收费项目
    async handleIputVal () {
      this.innerVisible  = true
      // this.isDisabled = true
      // this.costList = []
      // this.form.chargeItems = []
      // this.form.value2 = []
      // this.costList = JSON.parse(JSON.stringify(this.costList))
      await this.getCostList()
    },
    async handleSearch(search) {
      await this.getCostList(search)
    },
    loadMore () {
      if (this.loadSign) {
       this.loadSign = false
       this.page++
       if (this.page > 10) {
       return
       }
       setTimeout(() => {
       this.loadSign = true
       }, 1000)
       console.log('到底了', this.page)
      }
      },
    //  获取收费项目列表
    async getCostList (search) {
      this.selectionVal = []
      const res = await apiData.getQuery({CHARGE_NAME:search})
      console.log(res);
      
      if (res.data === null) return
      this.loading = true
      this.costList = res.data
      this.loading = false
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
      } 
      console.log("新增");
      this.visible = true
    },
     // 当选择项发生变化时会触发该事件
     handleSelectionChange (rows) {
      this.selectionVal = []
      // this.form.chargeItems = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.selectionVal.push(row);
          }
        });
        
      }
    },
    async submit(t) {
      if (t !== 'out') {
        let sum = ''
        this.innerVisible = false
        this.visible = true
        this.h = MODAL_TITLE.ADD
        this.modalTitle = MODAL_TITLE.ITEM
        this.form.value2 = []
        this.form.chargeItems = []
        this.form.item.itemPrice = ''
        this.selectionVal.map(item => {
          if (item) {
            this.form.chargeItems.push({
              chargeItemCode:item.CHARGE_CODE,	// --收费编码
              chargeItemName:item.CHARGE_NAME,	// --收费项目名称
              chargeItemPrice:item.CHARGE_PRICE,	// --收费项目价格
              chargeItemType:item.CHARGE_TYPE //  --收费项目类型
            })
            this.form.value2.push(item.CHARGE_NAME)
            sum += parseInt(item.CHARGE_PRICE)
          }
        })
        this.form.item.itemPrice = sum
        
      }else {
        this.$refs.form.validateForm(async (valid) => {
          if (valid) {
            if (this.modalTitle === MODAL_TITLE.FORM) {
              const list = {
                templateName: this.form.templateName,
                printTemplate: this.form.printTemplate,
                isShowOperation: this.form.isShowOperation,
                isShowGynecological: this.form.isShowGynecological,
                isShowTumour: this.form.isShowTumour,
                isShowSpecimen:"1",		//--是否显示标本
                isShowEndpscopic:"1", //是否显示内镜信息
                isShowHpv: this.form.isShowHpv
                
              }
              const res = await apiData.getAddUpdateTemplate({
                ...list, 
                id:this.formTitle ==='edit'?this.rowLeftList.ID:''})

              if (res.type === 'SUCCESS') {
                this.showMsg(this.formTitle ==='edit'?'修改申请单成功':'新增申请单成功','success')
                if (this.formTitle ==='edit') {
                  this.list(this.rowLeftList.ID)
                  this.formTitle= ''
                } else {
                  const res = await apiData.getFindPafTemplate({...QUERY_PAGE})
                  this.leftData = res.data
                }
                this.visible = false

                // this.form.templateName = ''
                // this.form.value = []
                this.init()
              } else {
                this.showMsg(this.formTitle ==='edit'?'修改申请单失败':'新增申请单失败','error')
              }
              // this.showMsg1(res,'新增申请单')
            } else if (this.modalTitle === MODAL_TITLE.ITEM) {
              delete this.form.templateName
              delete this.form.printTemplate
              delete this.form.isShowOperation
              delete this.form.isShowGynecological
              delete this.form.isShowTumour
              delete this.form.isShowHpv
              delete this.form.value2
              this.form.item['pafTemplateId'] = this.rowLeftList.ID || this.leftData[0].ID
              this.form.item['seqNo'] = this.rigthData.length+1
              const res = await apiData.getAddUpdateItem({
                ...this.form
              })
              if (res.type === 'SUCCESS') {
                this.showMsg(this.formTitle ==='edit'?'修改申请单项目成功':'新增申请单项目成功','success')
                let id = ''
                if (this.rowLeftList.ID !== undefined) {
                  id = this.rowLeftList.ID
                } else {
                  id = this.leftData[0].ID
                }
                this.init()
                // this.form.chargeItems = []
                // this.$refs.form.resetFields()
                // this.form.item.itemExplain  = ''
                this.getPafTemplateitems(id)
                this.visible = false
              } else {
                this.showMsg(this.formTitle ==='edit'?'修改申请单项目失败':'新增申请单项目失败','error')
              }
            } else {
              this.modalTitle = MODAL_TITLE.ITEM
            }
            this.$refs.costList.clearSelection()
        } else {
            // 未通过
            console.log('invalid form !')
          }
        })
      }
    },
    init () {
      if (this.modalTitle === MODAL_TITLE.FORM) {
        this.form.templateName = ''
        this.value = [1,2,3,4]
      } else {
        this.form.item.itemExplain  = ''
        this.$refs.form.resetFields()
        this.form.item.itemName = ''
        this.form.item.itemPrice = ''
        this.form.item.itemCode = ''
        // this.form.value2 = []
      }
    },
    reset(t) {
      if (t !== 'out') {
        this.innerVisible = false
        this.visible = true
        console.log('this.form.chargeItems',this.form.chargeItems);
        this.$refs.costList.clearSelection()
        // this.h = MODAL_TITLE.ADD
        // this.modalTitle = MODAL_TITLE.ITEM
        //  = []
        // this.selectionVal = []
        // this.$nextTick(() => {
        //   this.$refs.costList.clearSelection(); 
        // });
      } else {
        this.visible = false
        this.init()
        this.$refs.costList.clearSelection()
      }
    },
    // 包含元素多选框
    handleChangeCheckbox (row,index) {
      const val = this.value.includes(row.label)
      if (val === true) {
        switch(row.label) {
          case 5:
              this.form.isShowGynecological = '1'
              break;
          case 6:
              this.form.isShowOperation = '1'
              break;
          case 7:
              this.form.isShowTumour = '1'
              break;
          case 8:
            this.form.isShowHpv = '1'
            break;
          default:
        } 
      } else {
         switch(row.label) {
           case 5:
              this.form.isShowGynecological = '0'
              break;
          case 6:
              this.form.isShowOperation = '0'
              break;
          case 7:
              this.form.isShowTumour = '0'
              break;
          case 8:
            this.form.isShowHpv = '0'
          default:
        } 
      }
    },
    // 当前页
    currentChange(val) {
      console.log(val,this.rowLi, '当前页',QUERY_PAGE.currentPager+1);
      this.QUERY_PAGE.pageIndex = val // 当前页
      
      this.getPafTemplateitems(this.rowLi.ID)  // 刷新
    },
    handleCurrentChange () {
      this.paginationBoxReflow = false;
      this.$nextTick(() => {
        this.paginationBoxReflow = true;
      });
    },
    // 当前页
    currentChange1(val) {
      console.log(val,this.rowLi, '当前页');
      this.QUERY_PAGE.pageIndex = val // 当前页
      // this.getPafTemplateitems(this.rowLi.ID)  // 刷新
    }
  }
};