<template>
  <div class='home-page-wrap-in'>
    <w-row style="background:rgba(255,255,255,1);">
      <w-col :span="8">
        <title-style class="pd-x_16 pd-top_16 po_re"> <span slot="header">器官/系统</span>
          <w-button class="po_ab top_16 right_8" type="text" @click="handleAdd('器官/系统')">+新增</w-button>
        </title-style>
        <div class="list-style">
          <div v-for="(item,index) in organList" @click.stop="handle(item,'器官/系统',index)"  class="tab-style"
            :class="{'clickBg':index==clickIndex,'hoverBg':index==hoverIndex}"
            @mouseover="hoverIndex = index"
            @mouseout="hoverIndex = - 1" :key="index">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr" v-if="hoverIndex === index || clickIndex === index">
              <span type="text" @click="handleEdit(item,'器官/系统')">修改</span>
              <span type="text" @click="handleDelete(item,'器官/系统',index)">删除</span>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8"  class="center">
        <title-style class="pd-x_16 pd-top_16 po_re"> <span slot="header">标本部位</span>
          <w-button v-if="this.organList.length !== 0 " type="text" class="po_ab top_8 right_16" @click="handleAdd('标本部位')">+新增</w-button>
        </title-style>
        <div class="list-style">
          <div v-for="(item,index) in positionList" :class="{'clickBg':index==clickIndex1,'hoverBg':index==hoverIndex1}"
            @click="handle(item,'标本部位',index)" class="tab-style"
            @mouseover="hoverIndex1 = index"
            @mouseout="hoverIndex1 = - 1" :key="index">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr" v-if="hoverIndex1 === index || clickIndex1 === index">
              <span type="text" @click="handleEdit(item,'标本部位')">修改</span>
              <span type="text" @click="handleDelete(item,'标本部位',index)">删除</span>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8" >
        <title-style class="pd-x_16 pd-top_16 po_re"> <span slot="header">标本名称</span>
          <w-button v-if="this.positionList.length !== 0 " type="text" class="po_ab top_8 right_16" @click="handleAdd('标本名称')">+新增</w-button>
        </title-style>
        <div v-show="show">
          <div class="list-style">
            <div v-for="(item,index) in nameList" @click="handle(item,'标本名称',index)" class="tab-style" :key="index"
              :class="{'clickBg':index==clickIndex2,'hoverBg':index==hoverIndex2}"
              @mouseover="hoverIndex2 = index"
              @mouseout="hoverIndex2 = -1">
              <span>{{item.SPECIMEN_NAME}}</span>
              <div class="button-style fr" v-if="hoverIndex2 === index || clickIndex2 === index">
                <span type="text" @click="handleEdit(item,'标本名称')">修改</span>
                <span type="text" @click="handleDelete(item,'标本名称',index)">删除</span>
              </div>
            </div>
          </div>
        </div>
      </w-col>
    </w-row>
    <w-modal  :visible.sync="visible"
      :title="h + title"
      :showClose="false"
      :close-on-click-modal="false"
      class="home-page-body"
      width="50%">
      <w-form :model="form" ref="form">
        <w-form-item v-if="editVal" prop="editVal" :rules="rules.test">
          <w-input v-model="form.editVal"></w-input>
        </w-form-item>
        <template v-else v-for="(item, index) of form.dynamicArr">
          <w-form-item
            :key="index"
            :prop="`dynamicArr.${index}.specimenName`"
            :rules="rules.test"
            >
            <w-input v-model="form.dynamicArr[index].specimenName"
              @input="handleChangeInput"></w-input>
          </w-form-item>
        </template>
        <w-form-item style="text-align: right;">
          <w-button @click="reset">取 消</w-button>
          <w-button type="primary" @click="submit(h)">保 存</w-button>
        </w-form-item>
      </w-form>
    </w-modal>
  </div>
</template>

<script>
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
      show: true,
      findId: '',
      findtype:'',
      h: '',
      idVal: {},
      row: false,
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
      this.row = true
      let list = []
      this.isTitle(title)
      // debugger
      if (title === "器官/系统") {
        this.rowOrgList = item
        this.show = false
        this.clickIndex = index;
        this.hoverIndex1 = 0
        this.clickIndex1 = 0
        const res = await apiData.getQuery({id:item.ID})
        if (res.type === 'SUCCESS') {
          this.positionList = res.data
          if (this.positionList.length>0) {
            console.log(res.data[0],'12345');
            const res1 = await apiData.getQuery({id:item.children[0].ID})
            if (res1.type === 'SUCCESS') {
              console.log(res1);
              this.nameList = res1.data
            }
            
          //  this.handle(item, title, index)
          }
        }
      } else if (title === "标本部位") {
        this.rowPosList = item
        this.show = true
        this.clickIndex1 = index;
        const res = await apiData.getQuery({id:item.ID})
        this.nameList = res.data
      } else {
        this.rowNamList = item
        this.clickIndex2 = index;
      }
    },
    // 获取首页list接口
    async getOrganList (id) {
      let positionList = []
      let nameList = []
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
    idData(item) {
      // 如果点击单独某一条 false没有
      let id = ''
      if (this.row === false) {
        console.log(id,'falsefalsefalse');
        if (this.title ==='标本名称') {
          id = this.positionList[0].ID
        } else if (this.title ==='标本部位'){
          id = this.organList[0].ID
        }
      } else {
        if (this.title ==='标本名称') {
           if (this.findId) {
            if(this.findtype === 3) return
            id = this.findId
            console.log(this.findId,'truetruetrue');
          } else {
            id = this.rowPosList.ID || this.positionList[0].ID
          }
        } else if (this.title ==='标本部位'){
          if (this.findId) {
            console.log(this.findId,'truetruetrue');
            if(this.findtype === 2) return
            id = this.findId
          } else {
            id = this.rowOrgList.ID || this.organList[0].ID
            console.log('哈哈哈哈');
          }
        }
      }
      this.idValue = id
      console.log('this.idValue',this.idValue);
    },
    async succData(e,v){
      this.idData()
      if (this.title === '标本部位') {
        // if (e === 'nihao') {
        //   console.log(v, 'vvvvvv');
        //   const res = await apiData.getQuery({id:v})
        //   this.nameList = res.data
        // }

        console.log(this.idValue,'this.idValue',this.rowOrgList);
        const res = await apiData.getQuery({id:this.rowOrgList.ID || this.organList[0].ID})
        this.positionList = res.data
      } else if (this.title === '标本名称') {
        const res = await apiData.getQuery({id:this.idValue})
        this.nameList = res.data
      } else {
        if (e === 'nihao') {
          console.log(v,this.positionList);
            const res = await apiData.getQuery({id:v})
            this.positionList = res.data
        }
        this.getOrganList(v)
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
      console.log(item, title);
      const res = await apiData.getDelete({id: item.ID})
      this.showMsg1(res, '删除')
      let list = ''
        if (this.title === '标本部位') { 
        list = this.positionList
      } else if (this.title === '标本名称') { 
        list = this.nameList
      } else {
        list = this.organList
      }
      let find = ''
      if (list[list.length-1].ID === item.ID){
        if (this.title === '标本部位') {
          this.clickIndex1 = this.clickIndex1 -1
        } else if (this.title === '标本名称') {
          this.clickIndex2 = this.clickIndex2 -1
        } else {
          this.clickIndex = this.clickIndex -1
        }
        find = list.slice(0,-1)[list.slice(0,-1).length-1].ID
      } else {
        find = list.find((it,index1) => index1+1 === index)
         if (this.title === '标本部位') {
          this.clickIndex1 = this.clickIndex1 -1
        } else if (this.title === '标本名称') {
          this.clickIndex2 = this.clickIndex2 -1
        } else {
          // this.organList.splice(index, 1)
          this.clickIndex = this.clickIndex -1
        }
        find = find.ID
      }
        this.idData(item)
        console.log(item,find.ID,list[list.length-1]);
        this.succData('nihao',find)
        this.findId = find
        this.findtype = item.SPECIMEN_TYPE

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

</script>
<style lang="scss" scoped>
.list-style {
  height: calc(100vh - 70px);
  overflow-y: auto;
}
// .list-style:hover {
//     overflow-y: auto;
// }
// .tab-style{
//   overflow-y:auto;
//   height:calc(100vh - 70px);
// }
</style>
<style lang='stylus' scoped>
.styleHover 
  background rgba(207,224,255,1)!important;
  color #0F49ED;
.hoverBg
   background rgba(207,224,255,1)!important;
   color #0F49ED;
 
 .clickBg
   background rgba(207,224,255,1)!important;
   color #0F49ED;
 
.home-page-wrap-in
    height 100%
    // padding 12px 15px
    background rgba(234, 237, 244, 1)
    overflow-x auto
    overflow-y hidden
    
    .w-row 
      height: 100%;
      overflow: auto;
    .tab-style 
      //  height calc(100vh - 70px)
      // width 410px;
      height 40px
      line-height 40px
      padding 0 16px
      background rgba(243,245,249,1)
      border-radius 2px
      cursor pointer
      margin 16px 10px 16px
    .center 
      // height 100%
      // width 100%
      border 2px solid #DFE7F5
      border-top none
      border-bottom none
    .button-style
      display inline-block
      color #0F49ED
      font-size 14px
      cursor pointer

    .title-style
      padding 16px 16px 0

</style>