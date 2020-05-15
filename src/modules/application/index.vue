<template>
  <div class=" pd_16">
    <w-row class="home-page-body">
      <w-col :span="7" >
        <title-style class=" mg-right_16 pd-bottom_22 po_re"><span slot="header">申请单列表</span>
        <!-- <i class="icon iconfont iconweibiaoti--"> -->
          <w-button class="po_ab top_-4 right_0" @click="handleAdd('left')"  type="text"><span class="fnot">+</span> </i> 新增</w-button>
        </title-style>
        <ul   v-loading="loading1" ref='box' class="mg-right_16 list-style">
          <li  class="application" v-for="(item, index) in leftData"
            :class="{'clickBg':index==clickIndex,'hoverBg':index==hoverIndex}"
            @mouseover="hoverIndex = index"
            @mouseout="hoverIndex = - 1"
            @click="handleLeftRow(item, index)" :key="index" > 
            <div class="po_re">
              <div class="inline-block mg-bottom_8" style="font-size: 14px; font-weight: 600;">{{item.TEMPLATE_NAME}}</div>
              <div class="inline-block po_ab top_-8 right_0" v-if="hoverIndex === index || clickIndex === index">
                <w-button type="text" @click="handleRowL(item,index,'copy')">复制</w-button>
                <w-button type="text" @click="handleRowL(item,index,'edit')">修改</w-button>
                <w-button type="text" @click="handleRowL(item,index,'delete')">删除</w-button>
              </div>
            </div>
            <!-- <p class="mg-bottom_5">申请单号：12345678910</p> -->
            <p class="po_re" style="font-size: 12px">
              <span class="inline-block po_ab top_0">元素：</span>
              <span class=" inline-block mg-left_40 mg-bottom_5">
                  <span>临床信息、</span>
                  <span>标本信息、</span>
                  <span>医嘱信息、</span>
                  <span>既往病理检查结果</span>
              </span>
                <span class=" inline-block mg-left_40">
                <span>{{item.IS_SHOW_GYNECOLOGICAL===1 ?'妇科信息、':''}}</span>
                <span>{{item.IS_SHOW_OPERATION===1 ?'手术信息、':''}}</span>
                <span>{{item.IS_SHOW_TUMOUR ===1 ?'肿瘤信息、':''}}</span>
                <span>{{item.IS_SHOW_HPV=== 1 ?'细胞学活HPV检查结果、': ''}}</span>
                <!-- {{item.IS_SHOW_SPECIMEN!==0?'标本信息、':''}} -->
              </span>
            </p>
          </li>
        </ul>
      </w-col>
      <w-col :span="17">
        <title-style class="pd-bottom_22 po_re"><span slot="header">申请单项目列表</span>
          <w-button class="po_ab top_-4 right_0" @click="handleAdd('rigth')"  type="text" plain> <span>+</span> 新增</w-button>
        </title-style>
        <win-table :listTable=tableTitle
          @handleEdit="handleEdit"
          :tableData=rigthData
          @handleRow="handleRowR"
          @handleDelete="handleDelete"
          style="height: calc(100vh - 150px); overflow-y: auto;"
          :isShow=isShow></win-table>
        <!-- <win-page
          :total="100"
          :current-page="currentPage"
          :page-size="pageSize"
          @sizeChange="sizeChange"
          @currentChange="currentChange"></win-page> -->
          <div
             v-if="paginationBoxReflow">
          <w-pagination
            :total="total"
            class="fr pd-top_16"
             @current-change="handleCurrentChange"
            :current-page="QUERY_PAGE.pageIndex"
            :page-size="QUERY_PAGE.pageSize"
            @actived-change="currentChange"
            :show="['prev', 'next', 'total']">
          </w-pagination>
          </div>
      </w-col>
    </w-row>
    <w-modal
      :close-on-click-modal="false"
      :showClose="false"
      :title="h + modalTitle"
      :visible.sync="visible"
      @submit.native.prevent
      width="50%">
      <w-form
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="100px"
        ref="form">
        <w-row  v-if=" modalTitle === MODAL_TITLE.FORM">
          <w-row >
            <w-col :span="24">
              <w-form-item
                label="申请单名称"
                prop="templateName">
                <w-input
                   
                  placeholder="请输入申请单名称"
                  showCounter
                  v-model="form.templateName"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item label="包含元素" prop="name">
                <template>
                  <w-checkbox-group v-model="value" >
                    <w-checkbox v-for="(item,index) in checkboxList" :key="index"
                    @change="handleChangeCheckbox(item,index)"
                    :label="item.label" :disabled="item.disabled">{{item.name}}</w-checkbox>
                  </w-checkbox-group>
                </template>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col>
              <w-form-item
                label="申请单模版"
                prop="printTemplate" >
                <template>

                <!-- <w-input
                   
                  placeholder="点击浏览选择申请单模版"
                  showCounter
                  v-model="form.printTemplate"
                ></w-input> -->
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :limit=1
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :file-list="fileList"
                  :auto-upload="false">
                  <w-button slot="trigger" size="small" type="primary">选取文件</w-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
                </template>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <w-row v-else-if=" modalTitle === MODAL_TITLE.ITEM">
          <w-row>
            <w-col :span="12">
              <w-form-item
                label="项目编码"
                prop="item.itemCode">
                <w-input
                   
                  placeholder="请输入项目编码"
                  showCounter
                  v-model="form.item.itemCode"
                ></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item
                label="项目名称"
                prop="item.itemName">
                <w-input
                  placeholder="请输入项目名称"
                  v-model="form.item.itemName"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item
                label="项目价格"
                prop="item.itemPrice">
                <w-input
                  placeholder="请输入项目价格"
                  showCounter
                  :readonly=true
                  v-model.number="form.item.itemPrice"
                ></w-input>
              </w-form-item>
            </w-col>
            
          </w-row>
          <w-row>
            <w-col>
              <w-form-item
                label="收费项目"
                prop="value2"
                :rules="[{
                  required: true,type: 'array', message: '请选择收费项目', trigger: 'change'
                }]"
               >
                <w-input
                  @focus="handleIputVal"
                  readonly
                  sufAppendIsButton
                  placeholder="请输入关键字搜索收费项目"
                  v-model="form.value2">
                  <template slot="suf-append">
                    <i class="w-icon-search"></i>
                  </template>
                </w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item
                label="描述"
                prop="itemExplain">
                <w-input
                   
                  type="textarea"
                  placeholder="请输入描述内容"
                  showCounter
                  v-model="form.item.itemExplain"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <w-modal
          width="50%"
          :close-on-click-modal="false"
          :title=" MODAL_TITLE.SELECT_ITEM"
          :visible.sync="innerVisible"
          append-to-body>
          <div class="search-style clearfix">
          <w-input class="mg-bottom_16" v-model="search" placeholder="请输入关键字进行搜索" sufAppendIsButton
            @keyup.enter.native="handleSearch(search)">
            <template slot="suf-append">
              <i @click="handleSearch(search)" class="w-icon-search"></i>
            </template>
          </w-input>
           <!-- <div
            class="fr" >
            <w-button @click="reset">取 消</w-button>
            <w-button
              @click="submit"
              type="primary"
            >确 定</w-button>
          </div> -->
          <w-table
            v-loading="loading"
            :data="costList"
            :lower-threshold="10"
            @scrollToLower="scrollToLower"
            win-loading-text="正在获取数据..."
            height="300"
            style="width: 100%"
            ref="costList"
            stripe
            :empty-text="tableconten"
            @selection-change="handleSelectionChange">
            <w-table-column type="selection" :reserve-selection="true" width="55"></w-table-column>
            <w-table-column prop="CHARGE_CODE"  width= '120px' label="收费编码"></w-table-column>
            <w-table-column prop="CHARGE_NAME"  label="收费项目"></w-table-column>
            <w-table-column prop="CHARGE_PRICE"  width= '150px' align= 'right' label="项目价格（元）"></w-table-column>
          </w-table>
        </div>
        <span slot="footer" class="dialog-footer ">
         <w-button @click="reset('inner')">取消</w-button>
          <w-button
            :disabled="isDisabled"
            @click="submit('inner')"
            type="primary"
          >确定</w-button>
      </span>
        </w-modal>
        
      </w-form>
      <span slot="footer" class="dialog-footer ">
        
         <w-button @click="reset('out')">取消</w-button>
          <w-button
            @click="submit('out')"
            type="primary"
          >保存</w-button>
      </span>
    </w-modal>
  </div>
</template>

<script src="./index.js"></script>
<style lang='scss' scoped>
.list-style {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
.w-row {
  margin-bottom: 15px;
}

.search-style {
  .w-input,
  .w-input.is-expansion {
    width: 260px!important;
  }
}
</style>

<style lang ='scss'>
  /* .w-modal__body {
    padding: 16px 20px!important;
  } */
</style>
<style lang='stylus' scoped>

.addclass {
  color: red;
}
.w-checkbox+.w-checkbox {
  margin-left: 0px!important;
}
.w-checkbox {
  margin-right: 24px!important;
  margin-bottom:8px!important;
}
.home-page-body {
  background: rgba(255, 255, 255, 1);
  padding: 16px;
  .application {
    margin-bottom: 8px;
    padding: 16px;
    background:rgba(243,245,249,1);
    // background:rgba(207,224,255,1);
    h4 {
      margin: 0;
      margin-bottom:10px;
    }
  }
  .clickBg,
  .hoverBg {
    background rgba(207,224,255,1)!important;
    // color #0F49ED;
  }
   
}
.w-select {
  width: 100%;
}
</style>
<style lang='stylus'>

</style>
