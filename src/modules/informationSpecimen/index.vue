<template>
  <div class='home-page-wrap-in'>
    <w-row style="background:rgba(255,255,255,1);">
      <w-col :span="8">
        <div class="title-style">
          <span>器官/系统</span>
          <w-button type="text" class="fr" @click="handleAdd('器官/系统')">+新增</w-button>
        </div>
        <div>
          <div v-for="(item,index) in organList" @click="handle(item,'器官/系统')" class="tab-style" :key="index">
            <span>{{item.name}}</span>
            <div class="button-style fr">
              <w-button type="text" @click="handleEdit(item,'器官/系统')">修改</w-button>
              <w-button type="text" @click="handleDelete(item,'器官/系统')">删除</w-button>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8"  class="center">
        <div class="title-style">
          <span>标本部位</span>
          <w-button type="text" class="fr" @click="handleAdd('标本部位')">+新增</w-button>
        </div>
        <div v-if="title ==='器官/系统' || title ==='标本部位'">
          <div v-for="(item,index) in positionList"  @click="handle(item,'标本部位')" class="tab-style" :key="index">
            <span>{{item.name}}</span>
            <div class="button-style fr">
              <w-button type="text" @click="handleEdit(item,'标本部位')">修改</w-button>
              <w-button type="text" @click="handleDelete(item,'标本部位')">删除</w-button>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8" >
        <div class="title-style">
          <span>标本名称</span>
          <w-button type="text" class="fr" @click="handleAdd('标本名称')">+新增</w-button>
        </div>
        <div v-if="title ==='标本部位' || title ==='标本名称' ">
          <div v-for="(item,index) in nameList" @click="handle(item,'标本名称')" class="tab-style" :key="index">
            <span>{{item.name}}</span>
            <div class="button-style fr">
              <w-button type="text" @click="handleEdit(item,'标本名称')">修改</w-button>
              <w-button type="text" @click="handleDelete(item,'标本名称')">删除</w-button>
            </div>
          </div>
        </div>
      </w-col>
    </w-row>
    <w-modal  :visible.sync="visible"
      :title="'新增'+ title"
      :close-on-click-modal="false"
      class="home-page-body"
      width="50%">
      <w-form :model="form" ref="form">
        <w-form-item v-if="editVal">
            <w-input v-model="form.editVal" @input="handleChangeInput"></w-input>
          </w-form-item>
        <template v-else v-for="(item, index) of form.dynamicArr">
          <w-form-item
            :key="index"
            :prop="`dynamicArr.${index}.value`"
            :label="item.label"
            >
          <!-- :rules="[{
              required: true, message: '请至少输入一项', trigger: ['blur']
            }]" -->
            <w-input v-model="form.dynamicArr[index].value" @input="handleChangeInput"></w-input>
          </w-form-item>
        </template>
        <w-form-item style="text-align: right;">
          <w-button @click="reset">重 置</w-button>
          <w-button type="primary" @click="submit">发 送</w-button>
        </w-form-item>
      </w-form>
    </w-modal>
  </div>
</template>

<script>
export default {
  data(){
    return{
      visible: false,
      title: '器官/系统' && '标本部位',
      editVal: false,
      form: {
        editVal: '',
        dynamicArr: [{
          label: ' ',
          value: ''
        },{
          label: ' ',
          value: ''
        }]
      },
      organList:[{name:'泌尿系统'},{name:'内分泌系统'}],
      positionList:[{name:'全肺'},{name:'左肺'}],
      nameList:[{name:'左肺'},{name:'右肺'}]    
    }
  },
  created(){
        
  },
  watch: {
    // handleChangeInput (o, n) {
    //     console.log(o, n)
    //   },
    'title' (o, n) {
      console.log(o, n)
    },
    // 'form.dynamicArr[index].value' (o, n) {
    //   console.log(o, n)
    // }
  },
  methods:{
    handle (item, title) {
      console.log(item)
      this.isTitle(title)
    },
    handleAdd (title) {
      this.isTitle(title)
      if (title === '器官/系统') {
        this.title = '器官/系统' && '标本部位'
      }
      this.visible = true
    },
    handleEdit (item) {
      console.log(item)
      this.form.editVal = item.name
      this.editVal = true
      this.visible = true

    },
    handleDelete () {

    },
    handleChangeInput (e) {
      console.log(this.form.dynamicArr[this.form.dynamicArr.length - 1].value, e)
      if (this.form.dynamicArr[this.form.dynamicArr.length - 1].value !== '' ) {
        this.form.dynamicArr.push({
          label: ' ',
          value: ''
        })
      }
    },
    submit () {
      this.$refs.form.validateForm((valid) => {
        console.log(valid)
        if (valid) {
          // 通过验证
          console.log('submit !')
        } else {
          // 未通过
          console.log('invalid form !')
        }
      })
    },
    reset () {
      this.$refs.form.resetFields()
      this.visible = false
    },
    isTitle (title) {
      if (title ==='器官/系统') {
        this.title = '器官/系统'
      } else if (title ==='标本部位') {
        this.title = '标本部位'
      }  else {
        // this.title = '标本名称' || ''
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
    .title-style
      padding 16px 16px 0

</style>