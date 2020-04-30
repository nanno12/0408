import * as layerUtils from 'app/utils/layerUtils';
import apiData from './api/api.js';
import _ from 'lodash'
export default {
  data(){
    let checkOrgTypeCode = async (rule, value, callback) => {
      if (value) {
         const params = {
          type:'specimen',
          name:value
        }
        const res = await apiData.isHaveReName(params)
        if (res.type !== 'SUCCESS') {
          return callback(new Error('该名称已存在！'))
        } else {
          callback()
        }
      }
    }
    return{
      titlee:'123455',
      isShow:true,
      modalData:{
        visible:true,
        title:'test',
        width:'35%',
        height:'300px'
      },
      visible: false,
      title: '',
      hoverIndex: 0,
      clickIndex: 0,
      hoverIndex1: 0,
      clickIndex1: 0,
      hoverIndex2: -1,
      clickIndex2: -1, 
      editVal: false,
      // show: true,
      findId: '',
      findtype:'',
      h: '',
      idVal: {},
      // isHandleRow: false,
      isHandleOrgRow:false,
      isHandlePosRow:false,
      form: {
        editVal: '',
        dynamicArr: []
      },
     rules: {
      'test': [
        // { required: true, message: '所选项不能为空'},
        { validator: checkOrgTypeCode,  trigger: ['blur', 'change'] }
      ]
      },
      idValue:'',
      organList:[],
      rowOrgList: {},
      positionList:[],
      rowPosList:{},
      nameList:[],
      rowNamList:{}
    }
  },
  created(){
    this.getOrganList()
  },
  watch: {
  },
  methods:{
    async handle (item, title, index) {
      console.log(title, item, index);
      
      let list = []
      this.isTitle(title)
      // debugger
      if (title === "器官/系统") {
        this.rowOrgList = item
        // this.show = false
        this.clickIndex = index;
        this.isHandleOrgRow = true
        this.clickIndex2 = -1
        this.clickIndex1 = 0
        const res = await apiData.getQuery({id:item.ID})
        if (res.type === 'SUCCESS') {
          this.positionList = res.data
          if (this.positionList.length>0) {
            const res1 = await apiData.getQuery({id:item.children[0].ID})
            if (res1.type === 'SUCCESS') {
              this.nameList = res1.data
            }
          //  this.handle(item, title, index)
          }
        }
      } else if (title === "标本部位") {
        this.isHandlePosRow = true
        this.rowPosList = item
        // this.show = true
        this.clickIndex1 = index;
        this.clickIndex2 = -1;
        const res = await apiData.getQuery({id:item.ID})
        this.nameList = res.data
      } else {
        this.rowNamList = item
        this.clickIndex2 = index;
      }
    },
    // 初始化获取首页list接口
    async getOrganList (id) {
      const res = await apiData.getQuery()
      this.organList = res.data
      if (!id) {
        if (this.organList.length!==0){
          const res = await apiData.getQuery({id:this.organList[0].ID})
          this.positionList = res.data
          console.log(res, this.positionList[0]);
        } 
         if (this.positionList.length!==0) {
          const res = await apiData.getQuery({id:this.positionList[0].ID})
          this.nameList = res.data
        }
      }
    },
    async getQueryList (id) {
      const res = await apiData.getQuery({id})
      switch (this.title) {
          case '标本部位':
            this.nameList = res.data
            console.log(res);
            break;
          case '器官/系统':
            console.log(res);
            this.positionList = res.data
            break;
          default: 
            break;
        }
    },
    //获取id
    idData() {
      // 如果点击单独某一条 false没有
      let ids = ''
      console.log('this.title',this.title);
      if (this.title === '标本部位' ) {
      if (this.isHandleOrgRow === false) {
        ids = this.organList[0].ID
        // switch (this.title) {
        //   case '标本部位':
        //     ids = this.organList[0].ID
        //     break;
        //   case '标本名称':
        //     ids = this.positionList[0].ID
        //     break;
        //   default:
        //     break;
        // }
      } else {
        ids = this.rowOrgList.ID 
        console.log('this.rowOrgList.ID',this.rowOrgList.ID);
        // switch (this.title) {
        //   case '标本部位':
        //     ids = this.rowOrgList.ID 
        //     break;
        //   case '标本名称':
        //     ids = this.rowPosList.ID
        //     break;
        //   default:
        //     break;
      }
    } else if (this.title === '标本名称' ) {
      if (this.isHandlePosRow === false) {
        ids = this.positionList[0].ID
      } else {
        ids = this.rowPosList.ID 
      }
    }
        // if (this.title ==='标本名称') {
        //    if (this.findId) {
        //     if(this.findtype === 3) return
        //     id = this.findId
        //     console.log(this.findId,'truetruetrue');
        //   } else {
        //     id = this.rowPosList.ID || this.positionList[0].ID
        //   }
        // } else if (this.title ==='标本部位'){
        //   if (this.findId) {
        //     console.log(this.findId,'truetruetrue');
        //     if(this.findtype === 2) return
        //     id = this.findId
        //   } else {
        //     id = this.rowOrgList.ID || this.organList[0].ID
        //     console.log('哈哈哈哈');
        //   }
        // }
      // }
      this.idValue = ids
    },
    async succData(item,v){
      this.idData()
      if (this.title === '标本部位') {
        // if (e === 'nihao') {
        //   console.log(v, 'vvvvvv');
        //   const res = await apiData.getQuery({id:v})
        //   this.nameList = res.data
        // }
        const res = await apiData.getQuery({id:this.idValue})
        this.positionList = res.data
        // this.isHandlePosRow = false
      } else if (this.title === '标本名称' ) {
        const res = await apiData.getQuery({id:this.idValue})
        this.nameList = res.data
      } else {
        this.isHandleOrgRow = false
        const res = await apiData.getQuery()
        this.organList = res.data
        // if (e === 'nihao') {
        //   console.log(v,this.positionList);
        //     const res = await apiData.getQuery({id:v})
        //     this.positionList = res.data
        // }
        // this.getOrganList()
      }
    },
    handleAdd (title) {
      this.visible = true
      this.editVal = false
      let dynamicArr = []
      this.isTitle(title)
      this.h = '新增'
      this.idData()
      this.form.dynamicArr.push({
        pafTemplateId:'',
        specimenName:'',
        pafSpecimenFid:this.idValue,
        seqNo:title === '器官/系统'?
          this.organList.length:(title === '标本部位'? this.positionList.length:this.nameList.length)+this.form.dynamicArr.length + 1,
        specimenType:title === '器官/系统'?1:(title === '标本部位'?2:3)
      })
    },
    async handleEdit (item) {
      console.log(item)
      this.h = '修改'
      this.form.editVal = item.SPECIMEN_NAME
      this.idVal = item
      this.editVal = true
      this.visible = true


    },
    handleDelete: _.debounce(async function (item, title,index) {
      console.log(item, title,item.SPECIMEN_TYPE);
      const res = await apiData.getDelete({id: item.ID})
      this.showMsg1(res, '删除')
      // this.idData()
      
      let list = ''
      let ids = ''
      if (this.title === '标本部位') { 
        list = this.positionList
      } else {
        list = this.organList
      }
      list.map((item,index) => {
        item['index']=index
      })
      if (item.SPECIMEN_TYPE === 3) {
        console.log('this.idValue',this.idValue,this.title);
        const res = await apiData.getQuery({id:this.idValue})
        this.nameList = res.data
      } else if (item.SPECIMEN_TYPE === 2) {
        if (list[list.length-1].ID === item.ID){
          ids = list[list.length-2].ID
          this.clickIndex1 = index-1
        } else {
          const find = list.find(item => item.index === index+1) 
          if (find) {
            ids = find.ID
          }
          this.clickIndex1 = index
        }
      } else {
        console.log('this.rowOrgList',this.rowOrgList);
        if (list[list.length-1].ID === item.ID){
          ids = list[list.length-2].ID
          console.log('1122ids',ids);
          this.clickIndex = index-1
        } else {
          const find = list.find(item => item.index === index+1) 
          if (find) {
            ids = find.ID
          }
          this.clickIndex = index
        }
      }
      this.getQueryList(ids)
     console.log('idsidsids',ids);
     this.succData()
      // let find = ''

      // if (list[list.length-1].ID === item.ID){
      //   if (this.title === '标本部位') {
      //     this.clickIndex1 = this.clickIndex1 -1
      //   } else if (this.title === '标本名称') {
      //     this.clickIndex2 = this.clickIndex2 -1
      //   } else {
      //     this.clickIndex = this.clickIndex -1
      //   }
      //   find = list.slice(0,-1)[list.slice(0,-1).length-1].ID || ''
      // } else {
      //   find = list.find((it,index1) => index1+1 === index)
      //    if (this.title === '标本部位') {
      //     this.clickIndex1 = this.clickIndex1 -1
      //   } else if (this.title === '标本名称') {
      //     this.clickIndex2 = this.clickIndex2 -1
      //   } else {
      //     // this.organList.splice(index, 1)
      //     this.clickIndex = this.clickIndex -1
      //   }
      //   find = find.ID
      // }
      // this.idData(item)
      // console.log(item,find.ID,list[list.length-1]);
      // this.findId = find
      // this.findtype = item.SPECIMEN_TYPE

    },300),
    async handleChangeInput (val) {
      const dynamicArr = []
      if (this.form.dynamicArr[this.form.dynamicArr.length - 1].specimenName !== '' ) {
        this.idData()
        this.form.dynamicArr.push({
          pafTemplateId:'',
          specimenName:'',
          pafSpecimenFid:this.idValue,
          specimenType:this.title === '器官/系统'?1:(this.title === '标本部位'?2:3),
          seqNo:this.title === '器官/系统'?
            this.organList.length:(this.title === '标本部位'? this.positionList.length:this.nameList.length) + this.form.dynamicArr.length + 1,
          })
      }
    },
    int () {
      this.form.dynamicArr = []
      this.form.editVal = ''
      
    },
    submit:_.debounce(async function (title) {
      this.$refs.form.validateForm(async (valid) => {
        if (valid) {
          // 通过验证
          this.idData()
          if (title ==='新增') {
            const dynamicArr = []
            // 判断去重空值
            this.form.dynamicArr.find(item => {
              if (item.specimenName !== '') {
                dynamicArr.push(item)
              }
            })
            const res = await apiData.getAdd(dynamicArr)
            console.log('res',res);
             this.showMsg1(res, '新增')
            this.succData()
          } else {
            const res = await apiData.getUpdate({
              id: this.idVal.ID,
              specimenName: this.form.editVal
            })
            this.showMsg1(res, '修改')
            this.succData()
          }
          this.visible = false
          this.int()
        } else {
          // 未通过
          console.log('invalid form !')
        }
      })
    },300),
    reset () {
      this.$refs.form.resetFields()
      this.int()
      this.visible = false
    },
    isTitle (title) {
      if (title ==='器官/系统') {
        this.title = '器官/系统'
      } else if (title ==='标本部位') {
        // this.show = true
        this.title = '标本部位'
      }  else {
        this.title = '标本名称'
      }
    }
  }
}