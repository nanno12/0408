<template>
  <div class=" pd_16">
    <w-row class="home-page-body">
      <w-col :span="7" >
        <title-style class=" mg-right_16 pd-bottom_22 po_re"><span slot="header">申请单列表</span>
        <!-- <i class="icon iconfont iconweibiaoti--"> -->
          <w-button class="po_ab top_-4 right_0" @click="handleAdd('left')"  type="text"><span class="fnot">+ 新增</span></w-button>
        </title-style>
        <ul   v-loading="loading1" ref='box' class="mg-right_16 list-style">
          <li  class="application" v-for="(item, index) in leftData"
            :class="{'clickBg':index==clickIndex,'hoverBg':index==hoverIndex}"
            @mouseover="hoverIndex = index"
            @mouseout="hoverIndex = - 1"
            @click="handleLeftRow(item, index)" :key="index" > 
            <div class="po_re">
              <div class="inline-block mg-bottom_8" style="font-size: 14px; font-weight: 600;">{{item.TEMPLATE_NAME}}</div>
              <div class="inline-block po_ab top_-5 right_0" v-if="hoverIndex === index || clickIndex === index">
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
                  <span>医嘱信息、</span>
                  <span>既往病理检查结果</span>
              </span>
                <span class=" inline-block mg-left_40">
                  <span>{{item.IS_SHOW_SPECIMEN===1?'标本信息、':''}}</span>
                <span>{{item.IS_SHOW_GYNECOLOGICAL===1 ?'妇科信息、':''}}</span>
                <span>{{item.IS_SHOW_OPERATION===1 ?'手术信息、':''}}</span>
                <span>{{item.IS_SHOW_ENDPSCOPIC=== 1 ?'内镜信息、': ''}}</span>
                <span>{{item.IS_SHOW_TUMOUR ===1 ?'肿瘤信息、':''}}</span>
                <span>{{item.IS_SHOW_HPV=== 1 ?'细胞学活HPV检查结果、': ''}}</span>
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
          style="height: calc(100vh - 160px); overflow-y: auto;"
          :isShow=isShow></win-table>
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
        <w-row v-if=" modalTitle === MODAL_TITLE.FORM">
          <w-row class="mg-bottom_18">
            <w-col :span="24">
              <w-form-item
                label="申请单名称"
                prop="templateName">
                <w-input
                  placeholder="请输入申请单名称"
                  showCounter
                  @focus="handleFocus('pafTemplate')"
                  v-model="form.templateName"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row class="mg-bottom_5">
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
                  <w-select v-model="form.printTemplate" placeholder="请选择申请单模版">
                    <w-option
                      v-for="(item,index) in printTemplateList"
                      :key="index"
                      :label="item.FILENAME"
                      :value="item.FILENAME">
                    </w-option>
                  </w-select>
                </template>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <w-row class="row-style" v-else-if=" modalTitle === MODAL_TITLE.ITEM">
          <w-row>
            <w-col :span="12">
              <w-form-item
                label="项目编码"
                prop="item.itemCode">
                <w-input
                  @focus="handleFocus('itemCode')"
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
                  @focus="handleFocus('itemName')"
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
                  placeholder="请先添加收费项目"
                  showCounter
                  :readonly=true
                  v-model.number="form.item.itemPrice"
                ></w-input>
              </w-form-item>
            </w-col>
            
          </w-row>
          <w-row>
            <w-col class="fonst_style">
              <div class="overh">
                <div class="fonst_style_title">选择的收费项目中如果有“医技确认“项目，则必须选择一个标记为“主项目”。</div>
              </div>
              <w-form-item
                label="收费项目"
                label-width="0px"
                prop="chargeItems"
                :rules="[{
                  required: true,type: 'array', message: '请选择收费项目', trigger: 'change'
                }]"
               >
                <template>
                  <!-- 点击选择收费项目 -->
                  <w-tag size="mini" v-for="(item,index) in this.form.chargeItems"
                    :closable="true"
                    @close="handleTagClose(index)"
                    :key="item.chargeItemCode">
                    <w-radio-group v-if="item.chargeMtechFlag === 1"
                      v-model="radioValue" @change="handleTagChoose(item)">
                      <w-radio :label="item.chargeMainFlag">{{item.chargeItemName}}</w-radio>
                    </w-radio-group>
                    <span v-else>{{item.chargeItemName}}</span>
                  </w-tag>
                  <div class="tab-style" @click="handleIputVal">
                    <i class="iconfont  iconweibiaoti--"></i>
                  </div>
                </template>
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
                  v-model="form.item.itemExplain"
                ></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <w-modal
          width="50%"
          class="modal-style"
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
            <w-table
              v-loading="loading"
              :data="costList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              :border="true"
              :row-key="getRowKeys"
              win-loading-text="正在获取数据..."
              height="300"
              style="width: 100%"
              ref="costList"
              stripe
              @selection-change="handleSelectionChange"
              :empty-text="tableconten">
              <w-table-column type="selection" :reserve-selection="true" width="55"></w-table-column>
              <w-table-column prop="CHARGE_CODE"  width= '120px' label="收费编码"></w-table-column>
              <w-table-column prop="CHARGE_NAME"  label="收费项目"></w-table-column>
              <w-table-column prop="CHARGE_PRICE"  width= '150px' align= 'right' label="项目价格（元）"></w-table-column>
              <w-table-column width= '100px'  align='center' label="医技确认">
                <template slot-scope="scope">
                  {{scope.row.CHARGE_MTECH_FLAG === '0'?'否':'是'}}
                </template>
              </w-table-column>
            </w-table>
            <w-pagination
              :total="total1"
              class="fr pd-top_16"
              @current-change="handleCurrentChange1"
              :current-page="currentPage"
              :page-size="pagesize"
              @actived-change="currentChange1"
              :show="['prev', 'next', 'total']">
            </w-pagination>
          </div>
          <!-- :disabled="isDisabled" -->
          <span slot="footer" class="dialog-footer ">
            <w-button @click="reset('inner')">取消</w-button>
            <w-button :disabled="isDisabled"  @click="submit('inner')" type="primary" >确定</w-button>
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
<style lang ='scss'>
  .w-radio,
  .w-radio__label  {
    color: #0F49ED!important;
  }
.fonst_style {
  display:inline-block;
  .w-form-item__label {
    color: #0F49ED;
    text-decoration: underline;
  }
  .fonst_style_title {
    position:absolute;
    display:none;
  }
  .overh {
    position: absolute;
    width: 100px;
    height: 39px;
    top: 0;
    left: 0;
    z-index: 1000;
  }
}
 .overh:hover .fonst_style_title{
    display:block;
    position: absolute;
    top: 35px;
    left: 30px;
    width:264px;
    font-size:13px;
    padding: 16px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 7px 2px rgba(0,0,0,0.14);
    border-radius:2px;
    z-index: 1;
    border: 1px solid #dedede;
  }
</style>
<style lang='scss' scoped>
.no-more {
  text-align: center;
    color: #666;
}
.list-style {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
.w-modal__body {
  .w-tag {
   background: rgba(194,210,255,1);
    border-radius: 2px;
    color: #0F49ED;
    height: 32px;
    line-height: 29px;
    margin-right: 5px;
  }
  
  .row-style {
    .w-row {
      margin-bottom: 16px;
    }
  }
}

.search-style {
  .w-input,
  .w-input.is-expansion {
    width: 260px!important;
  }
}
.tab-style {
  display: inline-block;
  border-radius: 2px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  opacity:0.5;
  font-weight: 700;
  border: 1px solid #999;
}

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
    background:rgba(207,224,255,1)!important;
  }
}
.w-select {
  width: 100%;
}
</style>
