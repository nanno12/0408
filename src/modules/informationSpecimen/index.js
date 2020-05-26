import * as layerUtils from 'app/utils/layerUtils';
import apiData from './api/api.js';
import _ from 'lodash'
export default {
  data(){
    let checkOrgTypeCode = async (rule, value, callback) => {
      if (value) {
        // if ()
        if (this.form.dynamicArr.length>2) {
        const list = this.form.dynamicArr.slice(0,this.form.dynamicArr.length-1)
        let nary = [];
        list.map(it=> {
          if (it.specimenName === value) {
            nary.push(it)
            if (nary.length>1) {
              this.isDisabled = true
              return callback(new Error('该名称已存在当前新增数据中！'))
            } else{
              this.isDisabled = false
            }
          }
        })
        }
         const params = {
          type:this.idVal.SPECIMEN_TYPE || this.type,
          name:value
        }
        const res = await apiData.isHaveReName2(params)

        if (res.type !== 'SUCCESS') {
          return callback(new Error('该名称或编码已存在！'))
        } else {
          callback()
        }
      }
    }
    return{
      titlee:'123455',
      hah:'',
      isShow:true,
      inputValue:'',
      modalData:{
        visible:true,
        title:'test',
        width:'35%',
        height:'300px'
      },
      visible: false,
      title: '',
      type:'',
      hoverIndex: 0,
      clickIndex: 0,
      hoverIndex1: 0,
      clickIndex1: 0,
      hoverIndex2: -1,
      clickIndex2: -1, 
      editVal: false,
      isDisabled:true,
      show: true,
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
        { validator: checkOrgTypeCode,  trigger: 'blur' }
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
    'form.editVal'(o,n) {
      console.log('o,n',o,n);
      if ( o === this.idVal.SPECIMEN_NAME)  {
        this.isDisabled = true
      }else {
        this.isDisabled = false
      }
    },
    'handleChangeInput' (o,n) {
      const find = o.find(it => it.specimenName !=='')
      console.log('find',find);
      // if ()
      console.log('o,n',o,n);
    }
  },
  methods:{
    async handle (item, title, index) {
      this.isTitle(title)
      console.log('点击row的数据',item, title);
      // debugger
      if (title === "器官/系统") {
        this.isHandlePosRow = false
        this.rowOrgList = item
        this.clickIndex = index;
        this.isHandleOrgRow = true
        this.clickIndex2 = -1
        this.clickIndex1 = 0
        const res = await apiData.getQuery({id:item.ID})
        this.positionList = res.data
        if (this.positionList.length>0 ) {
            const res1 = await apiData.getQuery({id:this.positionList[0].ID})
            this.nameList = []
            if(res1.data===null) return
            if (res1.type === 'SUCCESS') {
              this.nameList = res1.data
            }
            this.show = true
        } else {
          this.show = false
        }
      } else if (title === "标本部位") {
        this.isHandlePosRow = true
        this.rowPosList = item
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
        } 
         if (this.positionList.length!==0) {
          const res = await apiData.getQuery({id:this.positionList[0].ID})
          this.nameList = res.data
        }
      }
    },
    async getQueryList (id) {
      if (id) {
      const res = await apiData.getQuery({id})
        switch (this.title) {
          case '标本部位':
            this.nameList = res.data
            break;
          case '器官/系统':
            this.positionList = res.data
            const res1 = await apiData.getQuery({id:this.positionList[0].ID})
            this.nameList = res1.data
            break;
          default: 
            break;
        }
      }
    },
    //获取id
    idData() {
      // 如果点击单独某一条 false没有
      let ids = ''
      if (this.title === '标本部位' ) {
        this.type = '2'
        if (this.isHandleOrgRow === false) {
          if (this.hah !== '') {
            ids = this.hah
          } else {
            ids = this.organList[0].ID
            if (this.clickIndex === this.organList.length -1 ) {
              ids = this.organList[this.organList.length-1].ID
            } else {
              ids = this.organList[0].ID
            }
          }
        } else {
          ids = this.rowOrgList.ID 
        }
      } else if (this.title === '标本名称' ) {
        this.type = '3'
        if (this.isHandlePosRow === false) {
          console.log(this.clickIndex1, this.positionList.length -1);
          if (this.clickIndex1 === this.positionList.length -1 ) {
            ids = this.positionList[this.positionList.length-1].ID
          } else {
            ids = this.positionList[0].ID
          }
        } else {
          console.log(this.clickIndex1, this.positionList.length -1);
          if (this.clickIndex1 === this.positionList.length -1 ) {
            ids = this.positionList[this.positionList.length-1].ID
          } else {
            ids = this.rowPosList.ID 
          }
          
        }
      } else {
        this.type = '1'
        ids = ''
      }
      this.idValue = ids
      // this.hah = ''
    },
    async succData(item,v){
      this.idData()
      if (this.title === '标本部位') {
        // if (this.hah !== '') {
        //   this.idValue = this.hah
        // }
        const res = await apiData.getQuery({id:this.idValue})
        this.positionList = res.data
        
        if (this.h ==='新增') {
          this.clickIndex1 = this.positionList.length -1
          setTimeout(() => {
            this.$refs.boxs.scrollTop = this.$refs.boxs.scrollHeight;
            this.hoverIndex1 = -1
          }, 200)
        }
        this.nameList = []
      } else if (this.title === '标本名称' ) {

        const res = await apiData.getQuery({id:this.idValue})
        this.nameList = res.data
      } else {
        this.isHandleOrgRow = false
        const res = await apiData.getQuery()
        this.organList = res.data
        if ( this.h === '新增') {
          this.clickIndex = this.organList.length - 1
          setTimeout(() => {
            this.$refs.box.scrollTop = this.$refs.box.scrollHeight;
            this.hoverIndex = -1
          }, 200)
          this.positionList = []
          this.nameList = []
          this.hah = this.organList[this.organList.length -1].ID
        } else {
          if (this.positionList.length>0 ) {
            const res1 = await apiData.getQuery({id:this.positionList[0].ID})
            this.nameList = []
            if(res1.data===null) return
            if (res1.type === 'SUCCESS') {
              this.nameList = res1.data
            }
            this.show = true
          } else {
            this.show = false
          }
        }
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
      this.h = '修改'
      this.form.editVal = item.SPECIMEN_NAME
      this.idVal = item
      this.editVal = true
      this.visible = true
    },
    handleDelete: _.debounce(async function (item, title,index) {
      let t = ''
      if (item.SPECIMEN_TYPE === 3) {
        t=","
      } else {
        t="以及子级数据,"
      }
      this.$confirm('此操作将永久删除该数据'+ t + '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
      const res = await apiData.getDelete({id: item.ID})
      this.showMsg1(res, '删除')
      let list = ''
      let ids = ''
      if (this.title === '标本部位') { 
        list = this.positionList
      } else {
        list = this.organList
        this.hah = ''
      }
      list.map((item,index) => {
        item['index']=index
      })
      console.log('item.SPECIMEN_TYPE',item.SPECIMEN_TYPE);
      if (item.SPECIMEN_TYPE === 3) {
      } else if (item.SPECIMEN_TYPE === 2) {
        if(list.length !==1) {
          if (list[list.length-1].ID === item.ID){
            ids = list[list.length-2].ID
            this.clickIndex1 = index-1
            console.log('ods',ids);
          } else {
            const find = list.find(item => item.index === index+1) 
            if (find) {
              ids = find.ID
            }
            this.clickIndex1 = index
            console.log('ods',ids);
          }
        }else {
          ids = ''
        }
      } else {
        if(list.length !==1) {
        if (list[list.length-1].ID === item.ID){
          ids = list[list.length-2].ID
          this.clickIndex = index-1
        } else {
          const find = list.find(item => item.index === index+1) 
          if (find) {
            ids = find.ID
          }
          this.clickIndex = index
        }}else {
          ids = ''
        }
      }
      this.h = ''
     this.getQueryList(ids)
     this.succData()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
    },300),
    async handleChangeInput (val) {
      console.log(this.form.dynamicArr,'789');
      const find = this.form.dynamicArr.find(it => it.specimenName !=='')
      console.log('find',find);
      if (find === undefined) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
      // console.log('o,n',o,n);
      this.inputValue = val
        // if (this.form.dynamicArr.length>1) {
        // const list = this.form.dynamicArr.slice(0,this.form.dynamicArr.length-2)
        // // this.form.dynamicArr.map(it=> {
        // //   if (it.specimenName === val) {
        // //     this.showMsg('该名称已存在当前新增数据中！','error')
        // //     // return callback(new Error('该名称已存在当前新增数据中！'))
        // //   }
        // // })
        // }
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
            if (res.type === 'SUCCESS') {
              this.showMsg('新增成功','success')
              this.succData()
            } else {
              this.showMsg(res.message,'error')
            }
          } else {
            const res = await apiData.getUpdate({
              id: this.idVal.ID,
              specimenType:this.type,
              specimenName: this.form.editVal
            })
            if (res.type === 'SUCCESS') {
              this.showMsg('修改成功','success')
              this.succData()
            } else {
               this.showMsg('修改失败','error')
            }
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
      this.visible = false
      this.int()
    },
    isTitle (title) {
      if (title ==='器官/系统') {
        this.title = '器官/系统'
      } else if (title ==='标本部位') {
        this.show = true
        this.title = '标本部位'
      }  else {
        this.title = '标本名称'
      }
    }
  }
}