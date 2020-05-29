// import { debounce } from 'throttle-debounce'
import apiData from './api/api'

import { MODAL_TITLE, QUERY_PAGE} from '../constant'
export default {
  data() {
    let checkOrgTypeCode = async (rule, value, callback) => {
      console.log('value',value,this.rowLeftList.TEMPLATE_NAME);
      if (this.h !==  MODAL_TITLE.CLONE) return
      // if (value === this.rowLeftList.TEMPLATE_NAME || 
      //     value === this.rowRightList.itemCode || 
      //     value === this.rowRightList.itemName) return
      if (this.h ===  MODAL_TITLE.CLONE){
        this.type = 'pafTemplate'
      }

      if (value) {
         const params = {
          type:this.type,
          name:value
        }
        const res = await apiData.getIsHaveReName(params)
        if (res.type !== 'SUCCESS') {
        console.log('value',value,res);

          let title =''
          if (this.type === 'pafTemplate' ||this.type === 'itemName' ) {
            title = '该名称已存在！'
          } else {
            title = '该编码已存在！'
          }
          return callback(new Error(title))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      modalTitle:'',
      radioValue:1,
      type:'',
      height:'200px',
      isDisabled: true,
      MODAL_TITLE,
      QUERY_PAGE,
      clickIndex:0,
      search:'',
      loading:false,
      loading1:false,
      innerVisible:false,
      paginationBoxReflow:true,
      SELECTWRAP_DOM:'',
      tagChooseVal:'',
      s:0,
      e:20,
      // scrollToLower: () => {},
      listData:[],
      hoverIndex: -1,
      h : '',
      formTitle:'',
      pagesize:20,
      currentPage:1,
      total:0,
      total1:0,
      value: [1,3,4],
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
        templateName: "", // 申请单名称
        printTemplate: '' , // 打印模板
        isShowOperation:"0",	//--是否显示手术
        isShowSpecimen:"0",		//--是否显示标本
        isShowEndpscopic:"0", //是否显示内镜信息
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
          createdName:"",		//--操作人名称
          id:""
        },
        chargeItems:[
        //   {              // --勾选弹框的数据集合
        //   chargeItemCode:"",	// --收费编码
        //   chargeItemName:"",	// --收费项目名称
        //   chargeItemPrice:"",	// --收费项目价格
        //   chargeItemType:""  // --收费项目类型
        // }
      ],
      },
      getRowKeys(row) {
        return row.CHARGE_CODE
      },
      checkboxList: [
        {
          label:1, // 2
          name: '临床信息',
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
          label:2, // 3
          name: '标本信息',
          disabled: false
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
          label:9, //1
          name: '内镜信息',
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
      rules: {
        'item.itemCode': [
          { required: true, message: '请输入项目代码',trigger: 'blur'},
          {validator: checkOrgTypeCode,  trigger: 'blur' }
        ],
        'item.itemName': [
          { required: true, message: '请输入项目名称',trigger: 'blur'},
          { validator: checkOrgTypeCode,  trigger: 'blur' }

        ],
        'item.itemPrice': [
          { required: true, message: '项目价格不能为空'},
        ],
        
        'templateName': [
          { required: true,message: '请输入申请单名称',trigger: 'blur'},
          { validator: checkOrgTypeCode,  trigger: 'blur' }
        ]
      },
      rigthData: [],
      printTemplateList:[],
      rowLi:{},
      leftData: {
        IS_SHOW_GYNECOLOGICAL:'1234'
      },
      a:[]
    };
  },
  watch: {
    // 'costList' (oldVal, newVal) {
    //   this.$nextTick(() => {
    //     // this.form.chargeItems.map((v) => {
    //       // this.loading = true
    //         this.costList.find((it,index) =>{
    //           // if (v.chargeItemCode === it.CHARGE_CODE) {
    //           //   setTimeout(() => {
    //           //     // this.$refs.costList.toggleRowSelection(it,true)
    //           //     this.loading = false
    //           //   }, 600)
    //           // }
    //         })
    //     })
    //   // })
    // },
    'value' (oldVal, newVal) {
      let find = oldVal.find(it => it === 9)
      let find1 = oldVal.find(it => it === 6)
      if (find) {
        this.checkboxList.map(it => {
          if (it.label === 6) {
            it.disabled = true
          }
        })
      } else {
        this.checkboxList.map(it => {
          if (it.label === 6) {
            it.disabled = false
          }
        })
      }
      if (find1) {
        this.checkboxList.map(it => {
          if (it.label === 9) {
            it.disabled = true
          }
        })
      } else {
        this.checkboxList.map(it => {
          if (it.label === 9) {
            it.disabled = false
          }
        })
      }
    }
  },
  created() {
    this.list()
    this.getPrintTemplate()
    
  },
  
  methods: {
    handleTagChoose (item) {
      this.tagChooseVal = item
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
    async getPrintTemplate () {
      const res = await apiData.getPrintTemplate({typeTemplate: '病理申请单'})
      this.printTemplateList= res.data
      console.log(res);
    },
    handleTagClose (index) {
      this.form.chargeItems.splice(index, 1)
      let arr = []
      this.form.chargeItems.map(item => {
        if (item) {
          arr.push(item.chargeItemPrice)
        }
      })
      console.log('arr',arr,this.form.chargeItems);
      let sumArr = arr.map(Number)
      // for方法
      let sum = 0;
      for (let i = 0, len = sumArr.length; i < len; i++) {
          sum += sumArr[i]
      }
      console.log('sum',sum);
      this.form.item.itemPrice = sum
    },
    async list (id) {
      const res = await apiData.getFindPafTemplate({...QUERY_PAGE})
      this.loading1 = true
      this.leftData = res.data
      this.loading1 = false
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
        if (item.isShowEndpscopic === '1') {
          this.value.push(9)
        }
        if (item.isShowSpecimen === '1') {
          this.value.push(2)
        }
      })
      if ( res.data !== null) {
        if (id === undefined) {
          id = this.rowLi.ID
        }

      this.getPafTemplateitems(id)
    }
    },
    handleFocus (t) {
      this.type = t
      console.log('tttt',t);
    },
    // 点击申请单列表单行
    async handleLeftRow (row,index) {
      console.log('row',row);
      this.QUERY_PAGE.pageIndex = 1
      this.QUERY_PAGE.currentPager = 1 
      this.rowLeftList = row
      this.clickIndex = index;
      this.getPafTemplateitems(row.ID)
    },
    // 获取申请单项目列表接口
    async getPafTemplateitems (id) {
      console.log('ididiid',id);
      const res = await apiData.getPafTemplateitems({
        pafTemplateId:id,
        pageIndex:1,
        pageSize:20,
        // currentPager:1
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
          //在vue中操作dom尽量用ref, 但它不是响应式的
          this.clickIndex = this.leftData.length 
          setTimeout(() => {
            this.$refs.box.scrollTop = this.$refs.box.scrollHeight;
            this.hoverIndex = -1
          }, 200)
      } else {
         this.showMsg('复制申请单失败','error')
      }
    },
    // 点击申请单某一行
    async handleRowL (item,index,t) {
      console.log('tttttt',t);
      this.modalTitle = MODAL_TITLE.FORM
      this.h =  MODAL_TITLE.EADIT
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
          this.getPafTemplate(item.ID)
          this.visible = true
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
      console.log(res, this.form,'项目修改');
      let list = []
      res.data.chargeItems.map(item=>{
        list.push(item)
        console.log('item',item.chargeMainFlag);
        if (item.chargeMainFlag === 1) {
          this.radioValue = 1
        }

      })
    },
    // 项目删除
    async handleDelete (row) {
      const res = await apiData.getDeleteTempItem({
        id:row.pafTemplateitemId
      })
      if (res.type === 'SUCCESS') {
        this.showMsg('删除申请单项目成功','success')
      } else {
         this.showMsg(res.message,'error')
      }
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
      if (res.data.isShowEndpscopic === '1') {
        this.value.push(9)
      }
      if (res.data.isShowSpecimen === '1') {
        this.value.push(2)
      }
      this.form.templateName = res.data.templateName
      this.form.printTemplate = res.data.printTemplate
      this.form.isShowGynecological=res.data.isShowGynecological//	--是否显示妇科
      this.form.isShowOperation=res.data.isShowOperation	//--是否显示手术
      this.form.isShowTumour=res.data.isShowTumour//	--是否显示肿瘤
      this.form.isShowHpv=res.data.isShowHpv // --是否显示HPV信息
      this.form.isShowSpecimen=res.data.isShowSpecimen		//--是否显示标本
      this.form.isShowEndpscopic=res.data.isShowEndpscopic //是否显示内镜信息      
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
      this.isDisabled = true
      this.total1 = 0
      this.getCostList()
    },
    async handleSearch(search) {
      await this.getCostList(search)
    },
    
    //  获取收费项目列表
    async getCostList (search) {
      this.loading = true
      const res = await apiData.getQuery({CHARGE_SEARCH:search})
      if (res.data === null) return
      // setTimeout(() => {
        this.costList = res.data
        this.total1 = res.data.length
        this.currentPage = 1
        console.log('res.data',res.data.length,this.costList.length);
        this.loading = false
      // }, 600)
      let checkedList = [];
      if(this.form.chargeItems.length ===undefined) return
      this.form.chargeItems.map((v) => {
          this.costList.find((it,index) =>{
            if (v.chargeItemCode === it.CHARGE_CODE) {
              checkedList.push(it);
              console.log('it',index,it,this.costList);
              // this.$set(it,'checked',true)
              // this.$set(v,'checked',true)
            }
          })
      })
      console.log(this.selectionVal,this.selectionVal);
      this.$nextTick(_ => {
        checkedList.forEach(item => {
          this.$refs.costList.toggleRowSelection(item, true);
        });
      });
      var obj = {};
      this.costList = checkedList.concat(this.costList)
      this.costList = this.costList.reduce((item, next) => {
        obj[next.CHARGE_CODE] ? '' : obj[next.CHARGE_CODE] = true && item.push(next);
        return item;
    }, []);
      console.log('this.costList',this.costList);
    },
    // 界面新增按钮
    async handleAdd(w) {
      console.log(this.costList,this.form.chargeItems,this.selectionVal);
      this.h = MODAL_TITLE.ADD
      this.form.chargeItems = {...this.form.chargeItems}
      switch(w) {
        case 'left':
          this.modalTitle = MODAL_TITLE.FORM
          break;
        case 'rigth':
          this.modalTitle = MODAL_TITLE.ITEM
          break;
        default:
      } 
      this.visible = true
      this.$nextTick(()=>{
        this.$refs.form.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.staffForm.resetFields()，去除验证
      });
    },
     // 当选择项发生变化时会触发该事件
     handleSelectionChange (rows) {
       console.log('row',rows);
       this.isDisabled= false
      this.selectionVal = rows
    },
    async submit(t) {
      if (t !== 'out') {
        console.log('this.selectionVal',this.selectionVal);
        this.innerVisible = false
        this.loading = false
        this.visible = true
        this.modalTitle = MODAL_TITLE.ITEM
        let arr = []
        this.costList = []
        this.form.chargeItems = []
        this.form.item.itemPrice = ''
        this.currentPage = 1
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
            arr.push(item.CHARGE_PRICE)
          }
        })
        let sumArr = arr.map(Number)
        // for方法
        let sum = 0;
        for (let i = 0, len = sumArr.length; i < len; i++) {
            sum += sumArr[i]
        }
        this.form.item.itemPrice = sum
        this.search = ''
        this.listData = []
        this.costList = []
        this.selectionVal =[]
        this.$refs.costList.clearSelection()
      }else {
        this.$refs.form.validateForm(async (valid) => {
          console.log('valid',valid); 
          if (valid) {
            if (this.modalTitle === MODAL_TITLE.FORM) {
              this.form = {... this.form}
              const list = {
                templateName: this.form.templateName,
                printTemplate: this.form.printTemplate,
                isShowOperation: this.form.isShowOperation,
                isShowGynecological: this.form.isShowGynecological,
                isShowTumour: this.form.isShowTumour,
                isShowSpecimen:this.form.isShowSpecimen,		//--是否显示标本
                isShowEndpscopic:this.form.isShowEndpscopic, //是否显示内镜信息
                isShowHpv: this.form.isShowHpv
              }
              let res = ''
              if (this.h ===  MODAL_TITLE.CLONE) {
                res = await apiData.getcopy({
                  ...list,
                  id:this.rowLeftList.ID,
                  isDel:'0'
                })
              } else {
                res = await apiData.getAddUpdateTemplate({
                  ...list, 
                  id:this.h ==='修改'?this.rowLeftList.ID:''})
              }
              console.log('res',res);
              if (res.type === 'SUCCESS') {
                this.showMsg(this.h ==='修改'?'修改申请单成功':(this.h ==='新增'?'新增申请单成功':'复制申请单成功'),'success')
                if (this.h ==='修改') {
                  this.list(this.rowLeftList.ID)
                  this.h= ''
                } else {
                  if(this.h !==  MODAL_TITLE.CLONE) {
                    this.rigthData = []
                  }
                  const res = await apiData.getFindPafTemplate({...QUERY_PAGE})
                  this.leftData = res.data
                  this.clickIndex = this.leftData.length -1
                  setTimeout(() => {
                    this.$refs.box.scrollTop = this.$refs.box.scrollHeight;
                    this.hoverIndex = -1
                  }, 200)
                }
                this.visible = false
                this.init()
              } else {
                this.showMsg(res.message,'error')
              }
              // this.showMsg1(res,'新增申请单')
            } else if (this.modalTitle === MODAL_TITLE.ITEM) {
              let pafTemplateId = ''  
              let seqNo =''
              if(this.h !=='修改') {
                if (this.clickIndex === 0) {
                  pafTemplateId = this.leftData[0].ID
                } else if (this.clickIndex === this.leftData.length - 1) {
                  pafTemplateId = this.leftData[this.leftData.length-1].ID
                } else {
                  pafTemplateId = this.rowLeftList.ID
                }
                seqNo = this.rigthData.length+1
                delete this.form.item.id
              } else {
                if (this.clickIndex === 0) {
                  pafTemplateId = this.leftData[0].ID
                } else if (this.clickIndex === this.leftData.length - 1) {
                  pafTemplateId = this.leftData[this.leftData.length-1].ID
                } else {
                  pafTemplateId = this.rowLeftList.ID
                }
              }
              console.log('pafTemplateId',pafTemplateId);
              delete this.form.templateName
              delete this.form.printTemplate
              delete this.form.isShowOperation
              delete this.form.isShowGynecological
              delete this.form.isShowTumour
              delete this.form.isShowHpv
              delete this.form.isShowSpecimen,		//--是否显示标本
              delete this.form.isShowEndpscopic, //是否显示内镜信息
              this.form.item['pafTemplateId'] = pafTemplateId
              this.form.item['seqNo'] = seqNo
              console.log('this.form.chargeItemName',this.form.chargeItems);
              let find = this.form.chargeItems.find(it => it.chargeMtechFlag === 1)
              let find1 = {}
              if (find) {
                find1 = this.form.chargeItems.find(it => it.chargeMainFlag === 1)
              }
              console.log('findfind',find1,find,'9823');
              if (find1===undefined ) return this.showMsg('请选择一个收费项目为主项目','error')
              
              // this.form.chargeItems['chargeMainFlag']=   //  --主项目标志	0非主项目 1主项目
              const res = await apiData.getAddUpdateItem({
                ...this.form
              })

              if (res.type === 'SUCCESS') {
                this.showMsg(this.h ==='修改'?'修改申请单项目成功':'新增申请单项目成功','success')
                let id = ''
                if (this.rowLeftList.ID !== undefined) {
                  if (this.clickIndex === this.leftData.length - 1) {
                    id = this.leftData[this.leftData.length-1].ID
                  } else {
                    id = this.rowLeftList.ID
                  }
                } else { 
                  if (this.clickIndex === this.leftData.length - 1) {
                    id = this.leftData[this.leftData.length-1].ID
                  } else {
                    id = this.leftData[0].ID
                  }
                }
                console.log(this.leftData[this.leftData.length-1],id);
                this.getPafTemplateitems(id)
                this.visible = false
                 this.$refs.form.resetFields()
                this.init()
              } else {
                this.showMsg(this.h ==='修改'?'修改申请单项目失败':'新增申请单项目失败','error')
              }
            } else {
              console.log('7698');
              this.modalTitle = MODAL_TITLE.ITEM
            }
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
        this.form.isShowGynecological='0'//	--是否显示妇科
        this.form.isShowOperation='0'	//--是否显示手术
        this.form.isShowTumour='0'//	--是否显示肿瘤
        this.form.isShowHpv='0' // --是否显示HPV信息
        this.form.isShowSpecimen='0',		//--是否显示标本
        this.form.isShowEndpscopic='0', //是否显示内镜信息
        this.value = [1,3,4]
      } else {
        this.form.item.itemExplain  = ''
        this.$refs.form.resetFields()
        this.form.item.itemName = ''
        this.form.item.itemPrice = ''
        this.form.chargeItems=[]
      }
    },
    reset(t) {
      if (t !== 'out') {
        this.search = ''
        this.costList = []
        this.innerVisible = false
        this.visible = true
        this.loading = false
        this.currentPage = 1
        this.$refs.costList.clearSelection();
      } else {
        this.form.chargeItems=[]
        this.visible = false
        this.$refs.form.resetFields()
        this.init()
        this.$refs.costList.clearSelection();
      }
    },
    // 包含元素多选框
    handleChangeCheckbox (row,index) {
      console.log('row',row,this.value);
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
          case 2:
              this.form.isShowSpecimen = '1'
              break;
          case 9:
            this.form.isShowEndpscopic = '1'
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
          case 2:
              this.form.isShowSpecimen = '0'
              break;
          case 9:
            this.form.isShowEndpscopic = '0'
            break;
          default:
        } 
      }
    },
    // 当前页
    currentChange(val) {
      this.QUERY_PAGE.pageIndex = val // 当前页
      this.getPafTemplateitems(this.rowLi.ID)  // 刷新
    },
    handleCurrentChange () {
      this.paginationBoxReflow = false;
      this.$nextTick(() => {
        this.paginationBoxReflow = true;
      });
    },
    handleCurrentChange1(val) {
      console.log('val',val);
      
    },
    // 当前页
    currentChange1(val) {
      this.currentPage = val; // 当前页
    }
  },
  mounted() {
  },
};