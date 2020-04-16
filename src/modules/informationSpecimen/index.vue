<template>
  <div class='home-page-wrap-in'>
    <w-row style="background:rgba(255,255,255,1);">
      <w-col :span="8">
        <div class="title-style">
          <span>器官/系统</span>
          <w-button type="text" class="fr" @click="handleAdd('器官/系统')">+新增</w-button>
        </div>
        <div>
          <div v-for="(item,index) in organList" @click="handle(item,'器官/系统',index)" class="tab-style" :key="index">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr">
              <span type="text" @click.stop="handleEdit(item,'器官/系统')">修改</span>
              <span type="text" @click.stop="handleDelete(item,'器官/系统')">删除</span>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8"  class="center">
        <div class="title-style">
          <span>标本部位</span>
          <w-button type="text" class="fr" @click="handleAdd('标本部位')">+新增</w-button>
        </div>
        <div>
          <div v-for="(item,index) in positionList"  @click="handle(item,'标本部位')" class="tab-style" :key="index">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr">
              <span type="text" @click.stop="handleEdit(item,'标本部位')">修改</span>
              <span type="text" @click.stop="handleDelete(item,'标本部位')">删除</span>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8" >
        <div class="title-style">
          <span>标本名称</span>
          <w-button type="text" class="fr" @click="handleAdd('标本名称')">+新增</w-button>
        </div>
        <div v-show="show">
          <div v-for="(item,index) in nameList" @click="handle(item,'标本名称')" class="tab-style" :key="index">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr">
              <span type="text" @click.stop="handleEdit(item,'标本名称')">修改</span>
              <span type="text" @click.stop="handleDelete(item,'标本名称')">删除</span>
            </div>
          </div>
        </div>
      </w-col>
    </w-row>
    <w-modal  :visible.sync="visible"
      :title="h + title"
      :close-on-click-modal="false"
      class="home-page-body"
      width="50%">
      <w-form :model="form" ref="form">
        <w-form-item v-if="editVal">
          <w-input v-model="form.editVal"></w-input>
        </w-form-item>
        <template v-else v-for="(item, index) of form.dynamicArr">
          <w-form-item
            :key="index"
            :prop="`dynamicArr.${index}.specimenName`"
            label=""
            >
          <!-- :rules="[{
              required: true, message: '请至少输入一项', trigger: ['blur']
            }]" -->
            <w-input v-model="form.dynamicArr[index].specimenName" @input="handleChangeInput"></w-input>
          </w-form-item>
        </template>
        <w-form-item style="text-align: right;">
          <w-button @click="reset">重 置</w-button>
          <w-button type="primary" @click="submit(h)">发 送</w-button>
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
    return{
      visible: false,
      title: '',
      editVal: false,
      show: true,
      h: '',
      idVal: '',
      form: {
        editVal: '',
        dynamicArr: []
      },
      organList:[],
      positionList:[],
      nameList:[]    
    }
  },
  created(){
    this.getOrganList()
  },
  watch: {
    'title' (o, n) {
      console.log(o, n)
    },
  },
  methods:{
    async handle (item, title, index) {
      console.log(title, item);
      this.isTitle(title)
      if (title === "器官/系统") {
        const res = await apiData.getQuery({id:item.ID})
        this.positionList = res.data
      } else if (title === "标本部位") {
        console.log(item);
        const res = await apiData.getQuery({id:item.ID})
        this.nameList = res.data
      } else {}
    },
    // 获取首页list接口
    async getOrganList (id) {
      let positionList = []
      let nameList = []
      const res = await apiData.getQuery({id:id})
      this.organList = res.data
      res.data.map(item => {
        item.children.map(it => {
           positionList.push(it)
           it.children.map(ite => {
            nameList.push(ite)
           }) 
        })
      })
      
      this.positionList = positionList
      this.nameList = nameList
    },
    handleAdd (title) {
      this.visible = true
      let dynamicArr = []
      this.isTitle(title)
      this.h = '新增'
      this.form.dynamicArr.push({
          pafTemplateId:'',
          specimenName:'',
          pafSpecimenFid:title === '器官/系统'?
            this.organList[0].PAF_SPECIMEN_FID:(title === '标本部位'?this.positionList[0].PAF_SPECIMEN_FID:this.nameList[0].PAF_SPECIMEN_FID),
          seqNo:title === '器官/系统'?
            this.organList.length:(title === '标本部位'? this.positionList.length:this.nameList.length)+this.form.dynamicArr.length + 1,
          specimenType:title === '器官/系统'?
            this.organList[0].SPECIMEN_TYPE:(title === '标本部位'?this.positionList[0].SPECIMEN_TYPE:this.nameList[0].SPECIMEN_TYPE)
        })
        console.log(title);
    },
    async handleEdit (item) {
      console.log(item)
      this.h = '修改'
      this.form.editVal = item.SPECIMEN_NAME
      this.idVal = item.ID
      this.editVal = true
      this.visible = true

    },
    async handleDelete (item, title) {
      const res = await apiData.getDelete({id: item.ID})
      this.getOrganList()
    },
    handleChangeInput (val) {
      const dynamicArr = []
      console.log(this.title, val);
      const params = {
        type:'specimen',
        name:val
      }
      let res = apiData.isHaveReName(params)
      console.log(res);
      
      if (this.form.dynamicArr[this.form.dynamicArr.length - 1].specimenName !== '' ) {
        this.form.dynamicArr.push({
          pafTemplateId:'',
          specimenName:'',
          pafSpecimenFid:this.title === '器官/系统'?
            this.organList[0].PAF_SPECIMEN_FID:(this.title === '标本部位'?this.positionList[0].PAF_SPECIMEN_FID:this.nameList[0].PAF_SPECIMEN_FID),
          seqNo:this.title === '器官/系统'?
            this.organList.length:(this.title === '标本部位'? this.positionList.length:this.nameList.length) + this.form.dynamicArr.length + 1,
          specimenType:this.title === '器官/系统'?
            this.organList[0].SPECIMEN_TYPE:(this.title === '标本部位'?this.positionList[0].SPECIMEN_TYPE:this.nameList[0].SPECIMEN_TYPE)
        })
      }
      console.log(this.form.dynamicArr,this.form.dynamicArr.length);
    },
    int () {
      this.form.dynamicArr = []
    },
    submit (title) {
      this.$refs.form.validateForm(async (valid) => {
        console.log(valid,title)
        if (valid) {
          // 通过验证
          if (title ==='新增') {
              const dynamicArr = []
              console.log(this.form.dynamicArr);
              
              this.form.dynamicArr.find(item => {
              if (item.specimenName !== '') {
                console.log(item);
                dynamicArr.push(item)
              }
            })
            const res = await apiData.getAdd(dynamicArr)
          } else {
            let params = {
              id: this.idVal,
              specimenName: this.form.editVal
            }
            const res = await apiData.getUpdate(params)
            console.log(res)
          }

        //   const dynamicArr = []
        //   this.form.dynamicArr.find(item => {
        //   if (item.specimenName !== '') {
        //     console.log(item);
        //     dynamicArr.push(item)
        //   }
        // })
        // const res = await apiData.getAdd(dynamicArr)
          this.visible = false
          this.int()
          this.getOrganList()
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
        this.show = false
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

</script>
<style lang='stylus' scoped>
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
      // width:410px;
      height:40px
      line-height 40px
      padding 0 16px
      background:rgba(243,245,249,1)
      border-radius:2px
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