<template>
  <div class='home-page-wrap-in'>
    <!-- <win-modal :title="titlee" :isShow="isShow">
        <span>this is a dialog</span>
    </win-modal> -->
    <w-row style="background:rgba(255,255,255,1);">
      <w-col :span="8">
        <title-style class="pd-x_16 pd-top_16 po_re"> <span slot="header">器官/系统</span>
          <w-button class="po_ab top_16 right_8" type="text" @click="handleAdd('器官/系统')">+新增</w-button>
        </title-style>
        <div v-for="(item,index) in organList" @click.stop="handle(item,'器官/系统',index)"  class="tab-style"
          :class="{'clickBg':index==clickIndex,'hoverBg':index==hoverIndex}"
          @mouseover="hoverIndex = index"
          @mouseout="hoverIndex = -1" :key="index">
          <span>{{item.SPECIMEN_NAME}}</span>
          <div class="button-style fr" v-if="hoverIndex === index || clickIndex === index">
            <span type="text" @click="handleEdit(item,'器官/系统')">修改</span>
            <span type="text" @click="handleDelete(item,'器官/系统')">删除</span>
          </div>
        </div>
      </w-col>
      <w-col :span="8"  class="center">
        <title-style class="pd-x_16 pd-top_16 po_re"> <span slot="header">标本部位</span>
          <w-button v-if="this.organList.length !== 0 " type="text" class="po_ab top_8 right_16" @click="handleAdd('标本部位')">+新增</w-button>
        </title-style>
        <div v-for="(item,index) in positionList" :class="{'clickBg':index==clickIndex1,'hoverBg':index==hoverIndex1}"
          @click="handle(item,'标本部位',index)" class="tab-style"
          @mouseover="hoverIndex1 = index"
          @mouseout="hoverIndex1 = -1" :key="index">
          <span>{{item.SPECIMEN_NAME}}</span>
          <div class="button-style fr" v-if="hoverIndex1 === index || clickIndex1 === index">
            <span type="text" @click="handleEdit(item,'标本部位')">修改</span>
            <span type="text" @click="handleDelete(item,'标本部位')">删除</span>
          </div>
        </div>
      </w-col>
      <w-col :span="8" >
        <title-style class="pd-x_16 pd-top_16 po_re"> <span slot="header">标本名称</span>
          <w-button v-if="this.positionList.length !== 0 " type="text" class="po_ab top_8 right_16" @click="handleAdd('标本名称')">+新增</w-button>
        </title-style>
        <div v-show="show">
          <div v-for="(item,index) in nameList" @click="handle(item,'标本名称',index)" class="tab-style" :key="index"
            :class="{'clickBg':index==clickIndex2,'hoverBg':index==hoverIndex2}"
            @mouseover="hoverIndex2 = index"
            @mouseout="hoverIndex2 = -1">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr" v-if="hoverIndex2 === index || clickIndex2 === index">
              <span type="text" @click="handleEdit(item,'标本名称')">修改</span>
              <span type="text" @click="handleDelete(item,'标本名称')">删除</span>
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
      // tittle:"Test",
    //   isShow:false,
    //   width:"60%",
    // height:"1000px",
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
      h: '',
      idVal: {},
      row: false,
      form: {
        editVal: '',
        dynamicArr: []
      },
      rowList:{},
     rules: {
      'test': [
        // { required: true, message: '所选项不能为空'},
        { validator: checkOrgTypeCode,  trigger: ['blur', 'change'] }
      ]
      },
      organList:[],
      positionList:[],
      nameList:[],
    }
  },
  created(){
    this.getOrganList()
  },
  watch: {
    'rowList' (o, n) {
      console.log(o, n)
    }
  },
  methods:{
    async handle (item, title, index) {
      console.log(title, item, index);
      this.row = true
      this.isTitle(title)
      if (title === "器官/系统") {
        this.rowList = item
        this.show = false
        this.clickIndex = index;
        this.hoverIndex1 = 0
        this.clickIndex1 = 0
        const res = await apiData.getQuery({id:item.ID})
        this.positionList = res.data
        if (this.positionList.length>0) {
          const res2 = await apiData.getQuery({id:this.positionList[0].ID})
          this.nameList = res2.data
        }
      } else if (title === "标本部位") {
        this.rowList = item
        this.show = true
        this.clickIndex1 = index;
        const res = await apiData.getQuery({id:item.ID})
        this.nameList = res.data
      } else {
        this.clickIndex2 = index;
      }
    },
    // 获取首页list接口
    async getOrganList (id) {
      let positionList = []
      let nameList = []
      const res = await apiData.getQuery({id:id})
      this.organList = res.data
      const res1 = await apiData.getQuery({id:this.organList[0].ID})
      this.positionList = res1.data
      const res2 = await apiData.getQuery({id:this.positionList[0].ID})
      this.nameList = res2.data
      console.log('默认',this.organList[0],this.positionList[0]);
      
    },
    handleAdd (title) {
      this.visible = true
      this.editVal = false
      let dynamicArr = []
      let id = ''
      this.isTitle(title)
      this.h = '新增'
      console.log(title,this.rowList);
      if (this.row === false) {
        if (this.title ==='标本名称') {
          id = this.positionList[0].ID
          console.log(this.positionList[0].ID);
          
        } else if (this.title ==='标本部位'){
          id = this.organList[0].ID
          console.log(this.organList[0].ID);
        }
      } else {
        if (this.title ==='标本名称') {
          console.log('标本名称212');
          id = this.rowList.ID
          if(this.rowList.SPECIMEN_TYPE !== 2) {
            id =  this.positionList[0].ID
          } else {
            id = this.rowList.ID
          }
        } else if (this.title ==='标本部位'){
          console.log('标本部位219');
          if(this.rowList.SPECIMEN_TYPE !== 1) {
            id =  this.organList[0].ID
          } else {
            id = this.rowList.ID
          }
          // id = this.rowList.ID
        }
      }
      // if (this.rowList) {
        this.form.dynamicArr.push({
          pafTemplateId:'',
          specimenName:'',
          pafSpecimenFid:id,
          seqNo:title === '器官/系统'?
            this.organList.length:(title === '标本部位'? this.positionList.length:this.nameList.length)+this.form.dynamicArr.length + 1,
          specimenType:title === '器官/系统'?1:(title === '标本部位'?2:3)
        })
      // }
    },
    async handleEdit (item) {
      console.log(item)
      this.h = '修改'
      this.form.editVal = item.SPECIMEN_NAME
      this.idVal = item
      this.editVal = true
      this.visible = true


    },
    async handleDelete (item, title) {
      const res = await apiData.getDelete({id: item.ID})
      this.getOrganList()
    },
    async handleChangeInput (val) {
      const dynamicArr = []
      if (this.form.dynamicArr[this.form.dynamicArr.length - 1].specimenName !== '' ) {
        let id = ''
        if (this.row === false) {
          if (this.title ==='标本名称') {
            id = this.positionList[0].ID
            console.log(this.positionList[0].ID);
            
          } else if (this.title ==='标本部位'){
            id = this.organList[0].ID
            console.log(this.organList[0].ID);
          }
        } else {
          if (this.title ==='标本名称') {
            id = this.rowList.ID
            if(this.rowList.SPECIMEN_TYPE !== 2) {
              id =  this.positionList[0].ID
            } else {
              id = this.rowList.ID
            }
          } else if (this.title ==='标本部位'){
           if(this.rowList.SPECIMEN_TYPE !== 1) {
              id =  this.organList[0].ID
            } else {
              id = this.rowList.ID
            }
          }
        }
        this.form.dynamicArr.push({
          pafTemplateId:'',
          specimenName:'',
          pafSpecimenFid:id,
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
    submit (title) {
      this.$refs.form.validateForm(async (valid) => {
        if (valid) {
          // 通过验证
          if (title ==='新增') {
              const dynamicArr = []
              this.form.dynamicArr.find(item => {
              if (item.specimenName !== '') {
                dynamicArr.push(item)
              }
            })
            const res = await apiData.getAdd(dynamicArr)
            let id = ''
            if (this.row === false) {
              if (this.title ==='标本名称') {
                id = this.positionList[0].ID
                console.log(this.positionList[0].ID);
              } else if (this.title ==='标本部位'){
                id = this.organList[0].ID
                console.log(this.organList[0].ID);
              }
            } else {
              if (this.title ==='标本名称') {
                id = this.rowList.ID
                if(this.rowList.SPECIMEN_TYPE !== 2) {
                  id =  this.positionList[0].ID
                } else {
                  id = this.rowList.ID
                }
              } else if (this.title ==='标本部位'){
              if(this.rowList.SPECIMEN_TYPE !== 1) {
                  id =  this.organList[0].ID
                } else {
                  id = this.rowList.ID
                }
              }
            }
            if (this.title === '标本部位') {
              console.log(this.rowList,'this.标本部位.rowList');
              const res1 = await apiData.getQuery({id:id})
              this.positionList = res1.data
            } else if (this.title === '标本名称') {
              console.log(this.rowList,'this.标本名称.rowList');
              const res = await apiData.getQuery({id:id})
              this.nameList = res.data
            } else {
              this.getOrganList()
            }
          } else {
            let id = ''
            if (this.row === false) {
              if (this.title ==='标本名称') {
                id = this.positionList[0].ID
                console.log(this.positionList[0].ID);
              } else if (this.title ==='标本部位'){
                id = this.organList[0].ID
                console.log(this.organList[0].ID);
              }
            } else {
              if (this.title ==='标本名称') {
                id = this.rowList.ID
                if(this.rowList.SPECIMEN_TYPE !== 2) {
                  id =  this.positionList[0].ID
                } else {
                  id = this.rowList.ID
                }
              } else if (this.title ==='标本部位'){
              if(this.rowList.SPECIMEN_TYPE !== 1) {
                  id =  this.organList[0].ID
                } else {
                  id = this.rowList.ID
                }
              }
            }
            let params = {
              id: this.idVal.ID,
              specimenName: this.form.editVal
            }
            const res = await apiData.getUpdate(params)
            if (this.title === '标本部位') {
              console.log(this.rowList,this.idVal,'this.标本部位.rowList');
              const res1 = await apiData.getQuery({id:id})
              console.log(res1);
              
              this.positionList = res1.data
            } else if (this.title === '标本名称') {
              console.log(this.rowList,'this.标本名称.rowList');
              const res = await apiData.getQuery({id:id})
              this.nameList = res.data
            } else {
              const res = await apiData.getQuery({id:id})
              this.organList = res.data
            }
          }
          this.visible = false
          this.int()
        } else {
          // 未通过
          console.log('invalid form !')
        }
      })
    },
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