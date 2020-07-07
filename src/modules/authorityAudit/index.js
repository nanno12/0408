// import { debounce } from 'throttle-debounce'
import apiData from './api/api'

// import { MODAL_TITLE, QUERY_PAGE} from '../constant'
export default {
  data() {
    let checkMax = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('最大量不能为空'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        console.log('this.form.FLOW_MAX', this.flowMaxOrMin);
        if (value > this.flowMaxOrMin){
          callback(new Error('最大量数值需比下一级最小数值(' + this.flowMaxOrMin + ')小'));
        }
        if (value < this.form.FLOW_MIN) {
          callback(new Error('最大量数值需比最小数值大'));
        } else {
          callback();
        }
      }
    };
    return {
      visible: false,
      loading:true,
      modalTitle:'123',
      activeName2: 'first',
      operationVal: 1, // 加减量
      numVal: 1, // 默认数量
      title: ' ', // 模态框标题
      value: '', // 描述值
      value2: '', // 模态框表格搜索
      region: '', // 请选择科室值
      rowLeftVal:'', // 审核流程列表行数据
      tagVal:'title', // tag字段值 title/doctor
      applydepts:'',
      flowLevel:'',
      flowLevelName:'',
      changSelectVa:'',
      addEaditVale:'',
      flowMaxOrMin:'',
      flowNameUpdate:'',
      flowMin:'',
      selection: [],
      tableLeftList:[],
      tableDataRight:[],
      tableDataModal:[],
      listModal:[],
      openings:[],
      getKey(row) {
        return row.code
      },
      // 审核等级列表
      flowLevelList:[
        {
          value: '1',
          label: '一级审核'
        },
        {
          value: '2',
          label: '二级审核'
        },
        {
          value: '3',
          label: '三级审核'
        },
      ], 
      list:[
        {
          prop:'PROFESSIONAL_CODE',
          label:'职称代码'
        },
        {
          prop:'PROFESSIONAL_NAME',
          label:'职称名称'
        }
      ],
      corresponding:[
        {
          prop:'PROFESSIONAL_CODE',
          label:'职称代码'
        },
        {
          prop:'PROFESSIONAL_NAME',
          label:'职称名称'
        }
      ],
      noCorresponding:[
        {
          prop:'name',
          label:'医生姓名'
        },
        {
          prop:'code',
          label:'医生工号'
        }
      ],
      addCorresponding:[
        {
          prop:'code',
          label:'职称代码'
        },
        {
          prop:'name',
          label:'职称名称'
        }
      ],
      form: {
        FLOW_NAME:'',
        FLOW_LEVEL: '',
        FLOW_MIN:'0',
        FLOW_MAX:'',
        FLOW_DESC:'',
        FLOW_NAME_UPDATE:''
      },
      rules: {
        FLOW_NAME: [{
          required: true, message: '请输入审核名称', trigger: 'change'
        }],
        FLOW_LEVEL: [{
          required: true, message: '请选择审核等级', trigger: 'change'
        }],
        FLOW_MIN: [{
          // validator: checkMin, trigger: 'blur'
        }],
        FLOW_MAX: [{
          validator: checkMax, trigger: 'blur'
        }]
      },
      options: [
        {
          value: '选项1',
          label: '安徽'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '北京'
        }, {
          value: '选项4',
          label: '南京'
        }, {
          value: '选项5',
          label: '深圳'
        }
      ]
    };
  },
  computed: {
  },
  watch: {
    tableLeftList() {
      this.$nextTick(() => {
        this.$refs.multipleTable.setCurrentRow(this.tableLeftList[0])
      })
    },
  },
  created() {
    this.getListApprovalFlows()
  },
  mounted() {
  },
  methods: {
    // 获取审核流程列表
    async getListApprovalFlows () {
      const res = await apiData.queryListApprovalFlows()
      this.tableLeftList = res.data
      if (res.type === 'SUCCESS') {
        this.getListApprovalFlowsDetails()
      }
    },
     // 获取对应职称列表
    async getListApprovalFlowsDetails(t) {
      console.log('ttttt',t,this.tagVal);
      this.isName()
      const res = await apiData.queryListApprovalFlowsDetails({
        tag:this.tagVal,
        FLOW_NAME:this.flowLevelName
      })
      this.tableDataRight = res.data
    },
    // 获取新增对应职称列表
    async getAddListTitle() {
      this.isName()
      const res = await apiData.queryListTitle({ FLOW_NAME:this.flowLevelName })
      this.loading=false
      this.tableDataModal = res.data
    },
    // 新增职称或医生
    async getAddTitleOrDoctor() {
      this.isName()
      const res = await apiData.addTitleOrDoctor({
        tag:this.tagVal,
        FLOW_NAME:this.flowLevelName,
        content:this.selection
      })
      if (res.type === 'SUCCESS') {
        this.showMsg('新增职称成功','success')
        this.$refs.multiTable.clearSelection()
        this.getListApprovalFlows()
        this.visible = false
      } else {
        this.showMsg(res.message,'error')
      }
    },
    // 新增审核流程
    // async getAddapprovalFlows() {
    //   const res = await apiData.addapprovalFlows({
    //     ...this.form
    //   })
    //   if (res.type === 'SUCCESS') {
    //     this.showMsg('新增成功','success')
    //     this.getListApprovalFlows()
    //     this.$refs.form.resetFields()
    //     this.visible = false
    //   } else {
    //     this.showMsg(res.message,'error')
    //   }
    // },
    // 获取医生列表—用来添加的
    async getQuerySelectDoctor(input) {
      console.log(input);
      this.loading = true;
      this.isName()
      const res = await apiData.querySelectDoctor({
        FLOW_NAME:this.flowLevelName,
        department:this.changSelectVa || '',
        input
      })
      this.loading = false;
      this.tableDataModal=res.data
      console.log(this.listModal,'this.tableDataModal',this.tableDataModal);

    },
    async getQueryDeptInfos(query) {
      this.loading = true;
      const res = await apiData.queryListDeptInfos({
        depttype:'',
        search:query
      })
      this.loading = false;
      this.openings = res.data
    },
    // // 获取审核等级接口
    async getLevel(row) {
      console.log('title',row);
      const res = await apiData.level({
        FLOW_LEVEL:row.FLOW_LEVEL
      })
      this.flowMaxOrMin = res.data[1].FLOW_MAX
    },
    // 删除接口
    async getDeleteApprovalFlow(row,t) {
      console.log(row,t);
      let tag = ''
      let code = ''
      let name = ''
      let FLOW_NAME =''
      console.log('this.addEaditVale',this.addEaditVale);
        this.isName()
        FLOW_NAME = this.flowLevelName
        switch (this.activeName2) {
          case 'second':
            tag = 'doctor'
            code = row.code,
            name = row.name
            break;
          default:
            tag = 'title',
            code = row.PROFESSIONAL_CODE,
            name = row.PROFESSIONAL_NAME
            break;
        }
      const res = await apiData.deleteApprovalFlow({
        FLOW_NAME,
        tag,   //删除标志，flow删除流程，title删除职称，doctor删除医生
        code,	 //要删除的职称或医生代码，删除流程时为空
        name,	 //要删除的职称或医生名字，删除流程时为空
      })
      if (res.type === 'SUCCESS') {
        this.showMsg('删除成功','success')
        this.getListApprovalFlowsDetails()
      } else {
         this.showMsg(res.message,'error')
      }
      console.log('rea',res);
    },
    // 修改流程信息
    async getUpdateApprovalFlows() {
      const res = await apiData.updateApprovalFlows({
       ...this.form,
       FLOW_NAME:this.flowNameUpdate,
       FLOW_NAME_UPDATE:this.form.FLOW_NAME,
       FLOW_MAX:this.form.FLOW_MAX.toString()
      })
      if (res.type === 'SUCCESS') {
        this.showMsg('修改成功','success')
        this.getListApprovalFlows()
        this.visible = false
      } else {
         this.showMsg(res.message,'error')
      }
      console.log('rea',res);
    },
    isName(tag) {
      if (this.rowLeftVal.FLOW_NAME === undefined) {
        this.flowLevelName = this.tableLeftList[0].FLOW_NAME || ''
      } else {
        this.flowLevelName = this.rowLeftVal.FLOW_NAME 
        if (tag === 'tag') {
          console.log('78965');
          this.tagVal = ''
        }
      }
    },
    remoteMethod(query) {
      this.getQueryDeptInfos(query)
    },
    handleChangeSearchInputVa(input) {
      this.getQuerySelectDoctor(input)
    },
    handleFocusInput() {
      this.remoteMethod()
    },
    handleChangeSelectVa(val) {
      this.changSelectVa = val.deptcode
      this.getQuerySelectDoctor('')
      console.log('val',val);
    },
    // 点击模态框新增按钮事件
    submit () {
      console.log('this.activeName2',this.activeName2);
      this.$refs.form.validateForm(async (valid) => {
        if (valid) {
          switch (this.addEaditVale) {
            case 'first':
              this.getAddTitleOrDoctor()
              break;
            case 'second':
              this.getAddTitleOrDoctor()
              break;
            case 'edit':
              this.getUpdateApprovalFlows()
              break;
            default:
              // this.getAddapprovalFlows()
              break;
          }
        }
      })
    },
    // 新增按钮
    handleAdd (title) {
      this.visible = true
        if (this.activeName2 === 'first') {
          this.title = '新增职称'
          this.listModal = this.addCorresponding
          this.addEaditVale = 'first'
          console.log('tableDataModal',this.tableDataRight);
          this.getAddListTitle()
        } else {
          this.addEaditVale = 'second'
          this.listModal = this.noCorresponding
          this.title = '新增医生'
          this.getQuerySelectDoctor('')
        }
    },
    // 编辑按钮
    handleEdit (row) {
      switch (row.FLOW_LEVEL) {
        case '1':
          this.flowLevel = '一级审核'
          this.form.FLOW_LEVEL = '1'
          break;
        case '2':
          this.flowLevel = '二级审核'
          this.form.FLOW_LEVEL = '2'
          break;
        case '3':
          this.flowLevel = '三级审核'
          this.form.FLOW_LEVEL = '3'
          break;
        default:
          break;
      }
      this.form = {...row}
      this.form.FLOW_MAX =  Number(row.FLOW_MAX)
      // this.form.FLOW_MAX =  Number(row.FLOW_MAX)
      this.flowNameUpdate = row.FLOW_NAME
      this.getLevel(row)
      console.log(this.form,'edit',row);
      this.title = '修改审核流程'
      this.visible = true
      this.addEaditVale = 'edit'
    },
    // 点击tab切换
    handleClick(tab) {
      this.activeName2 = tab.name
      console.log(tab.name,'this.tagVal',this.tagVal);
      if (tab.name === 'first') {
        this.list = this.corresponding
        this.tagVal = 'title'
        this.getListApprovalFlowsDetails('title')
        this.title = '新增职称'
      } else {
        this.tagVal = 'doctor'
        this.list = this.noCorresponding
        this.getListApprovalFlowsDetails('doctor')
        this.title = '新增医生'
      }
      console.log('this.list',this.list);

    },
    // 点击审核流程列表某一行数据
    handleRowR (row) {
      this.rowLeftVal = row
      if (this.activeName2 === 'first') {
        this.tagVal = 'title'
      } else {
        this.tagVal = 'doctor'
      }
      this.getListApprovalFlowsDetails('title')
    },
    handleDelete (row,t) {
      console.log('row,t',row,t);
      this.getDeleteApprovalFlow(row,t)
    },
    // 模态框表格多选值
    handleSelectionChange (val) {
      console.log('this.selection = val',this.selection,val);
      this.selection = val
    },
    // 点击模态框取消按钮事件
     reset (form) {
      this.$refs[form].resetFields();
      this.visible = false
      
    },
    // // 列表提示框确定按钮
    // handleConfirm (index) {
    //   console.log(12)
    //   this.tableData.splice(index, 1)
    // },
    // // 列表提示框取消按钮
    //  handleCancel (index) {
    //   // 手动取消
    //   this.cancelManually = true
    //   setTimeout(() => {
    //     this.tableData[index].switch = !this.tableData[index].switch // 恢复状态
    //   }, 200) // 等关闭气泡后修改状态， 避免出现数据状态过度，影响体验
    // }
  }
};