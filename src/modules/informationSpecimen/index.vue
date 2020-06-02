<template>
  <div class='information-specimen'>
    <w-row>
      <w-col :span="8">
        <title-style class=" po_re  pd-bottom_14" > <span slot="header">人体器官/系统</span>
          <w-button class="po_ab top_-5 right_18" type="text" @click="handleAdd('器官/系统')">+新增</w-button>
        </title-style>
        <div class="list-style mg-right_10" ref='box'>
          <div v-for="(item,index) in organList" @click.stop="handle(item,'器官/系统',index)"  class="tab-style"
            :class="{'clickBg':index==clickIndex,'hoverBg':index==hoverIndex}"
            @mouseover="hoverIndex = index"
            @mouseout="hoverIndex = - 1" :key="index">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr" v-if="hoverIndex === index || clickIndex === index">
              <w-button type="text" @click="handleEdit(item,'器官/系统')">修改</w-button>
              <w-button type="text" @click="handleDelete(item,'器官/系统',index)">删除</w-button>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8"  class="center">
        <title-style class="pd-x_16 po_re pd-bottom_14"> <span slot="header">标本部位</span>
          <w-button v-if="this.organList.length !== 0 " type="text" class="po_ab top_10 right_16" @click="handleAdd('标本部位')">+新增</w-button>
        </title-style>
        <div class="list-style mg-x_10" ref='boxs'>
          <div v-for="(item,index) in positionList" :class="{'clickBg':index==clickIndex1,'hoverBg':index==hoverIndex1}"
            @click="handle(item,'标本部位',index)" class="tab-style"
            @mouseover="hoverIndex1 = index"
            @mouseout="hoverIndex1 = - 1" :key="index">
            <span>{{item.SPECIMEN_NAME}}</span>
            <div class="button-style fr" v-if="hoverIndex1 === index || clickIndex1 === index">
              <w-button type="text" @click="handleEdit(item,'标本部位')">修改</w-button>
              <w-button type="text" @click="handleDelete(item,'标本部位',index)">删除</w-button>
            </div>
          </div>
        </div>
      </w-col>
      <w-col :span="8" >
        <title-style class="pd-x_16 po_re pd-bottom_14"> <span slot="header">标本名称</span>
          <w-button v-if="this.positionList.length !== 0 " type="text" class="po_ab top_-5 right_16" @click="handleAdd('标本名称')">+新增</w-button>
        </title-style>
        <!--   -->
        <div v-show="show">
          <div class="list-style mg-left_10" ref='box2'>
            <div v-for="(item,index) in nameList" @click="handle(item,'标本名称',index)" class="tab-style" :key="index"
              :class="{'clickBg':index==clickIndex2,'hoverBg':index==hoverIndex2}"
              @mouseover="hoverIndex2 = index"
              @mouseout="hoverIndex2 = -1">
              <span>{{item.SPECIMEN_NAME}}</span>
              <div class="button-style fr" v-if="hoverIndex2 === index || clickIndex2 === index">
                <w-button type="text" @click="handleEdit(item,'标本名称')">修改</w-button>
                <w-button type="text" @click="handleDelete(item,'标本名称',index)">删除</w-button>
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
      <w-form :model="form" ref="form" class="inputs-height">
        <w-form-item v-if="editVal" prop="editVal" :placeholder="'请输入'+title" :rules="rules.test">
          <w-input v-model="form.editVal"></w-input>
        </w-form-item>
        <template v-else v-for="(item, index) of form.dynamicArr">
          <w-form-item
            :key="index"
            :prop="`dynamicArr.${index}.specimenName`"
            :rules="rules.test"
            >
            <w-input :placeholder="'请输入'+title" v-model="form.dynamicArr[index].specimenName"
              @input="handleChangeInput" @keyup.enter.native="handleChangeInput"></w-input>
          </w-form-item>
        </template>
        <!-- <w-form-item style="text-align: right;">
          
        </w-form-item> -->
      </w-form>
      <span slot="footer" class="dialog-footer">
        <w-button @click="reset">取消</w-button>
        <w-button :disabled="isDisabled" type="primary" @click="submit(h)">保存</w-button>
      </span>
    </w-modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang='scss' scoped>
  .clickBg {
    font-weight: 600;
  }
.information-specimen {
  .list-style {
    height: calc(100vh - 100px);
    overflow-y: auto;
  }
  .inputs-height {
    height: 300px;
    overflow: auto;
  }
  .tab-style {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    background: rgba(243,245,249,1);
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
    margin: 10px 0;
  }
  .center {
    border: 2px solid #DFE7F5;
    border-top: none;
    border-bottom: none;
  }
  .button-style {
    display: inline-block;
    color: #0F49ED;
    font-size: 14px;
    cursor: pointer;
  }
}

</style>