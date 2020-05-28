<template>
  <div class="home-page-wrap-ba">
    <w-row  class="home-page-body">
      <w-col :span="8" >
        <title-style class=" po_re pd-bottom_22"><span slot="header">申请单列表</span>
          <w-button class="po_ab top_-5 right_0" @click="handleAdd('left')"  type="text" plain>+ 新增</w-button>
        </title-style>
        <div class="list-style">
          <w-table class="mt-15" @row-click="handleRow" 
            :highlight-current-row="true"
            :row-class-name="tableRowClassName"
            ref="interfaceTable"
            :data="listMoulds" :border="true" style="width: 100%">
            <w-table-column type="index" width="50" align="center" label="序号"></w-table-column>
            <w-table-column prop="MOULD_TYPE_STR" label="类型" width="80"></w-table-column>
            <w-table-column prop="MOULD_NAME" label="名称" ></w-table-column>
            <w-table-column fixed="right" label="操作" align="center" width="150" reference-cell>
              <template slot-scope="scope">
                  <w-button type="text" @click="onEditing(scope.row,'left')">修改</w-button>
                  <w-button type="text" @click="onEditing(scope.row, 'clone')">复制</w-button>
                  <w-button @click="handleConfirm(scope.row, 'left', scope.$index)" type="text">删除</w-button>
              </template>
            </w-table-column>
          </w-table>
        </div>
      </w-col> 
      <w-col :span="16">
        <div class="pd-left_15">
          <title-style class="pd-bottom_22  po_re"><span slot="header">项目列表</span>
            <w-button class="po_ab top_-5 right_0" @click="handleAdd('right')"  type="text" plain>+ 新增</w-button>
          </title-style>
          <div class="list-style">
          <w-table  :data="listMouldItems"  :border="true" style="width: 100%">
            <w-table-column type="index" width="50" align="center" label="序号">
            </w-table-column>
            <w-table-column prop="MOULD_ITEM_NAME" label="项目名称">
            </w-table-column>
            <w-table-column prop="ITEM_AMOUNT" label="默认数量" width="80">
            </w-table-column>
            <w-table-column prop="HIS_ITEMUNIT" label="单位" width="70">
            </w-table-column>
            <w-table-column prop="MAIN_NAME" label="成分大类">
            </w-table-column>
            <w-table-column prop="HIS_ITEMNAME" label="对应费用明细" width="120">
            </w-table-column>
            <w-table-column prop="HIS_ITEMPRICE" align="right" label="费用价格" width="80">
            </w-table-column>
            <w-table-column prop="ITEM_REMARK" label="备注"> </w-table-column>
            <w-table-column fixed="right" label="操作" reference-cell align="center" width="100">
              <template slot-scope="scope">
                <w-button type="text" @click="onEditing(scope.row,'right')">修改</w-button>
                <w-popconfirm class="mg-left_8" title="确认删除这条内容吗? "
                  @document-click="handleCancel(scope.$index)"
                   @confirm="handleConfirm(scope.row, 'right', scope.$index)" @cancel="handleCancel(scope.$index)" placement="bottom">
                  <span class="popconfirm-reference" slot="reference">
                    <w-button  type="text">删除</w-button>
                  </span>
                </w-popconfirm>
              </template>
            </w-table-column>
          </w-table>
          </div>
        </div>
      </w-col>
    </w-row>
    <w-modal  :visible.sync="visible"
      :title="modalType+modalTitle"
      :showClose="false"
      class="modal"
      :close-on-click-modal="false"
      width="60%">
      <w-form label-align="right" :model="form" ref="form" label-width="130px" :rules="rules">
        <!-- 新增申请单 -->
        <w-row v-if="modalShow === true">
          <w-row>
            <w-col :span="12">
              <w-form-item label="模版代码" prop="mouldcode">
                <w-input v-model="form.mouldcode" showCounter
                  placeholder="请输入代码"></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="模版名称" prop="mouldname">
                <w-input v-model="form.mouldname" showCounter
                  placeholder="请输入名称"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="模版类型" prop="mouldtype">
                <w-select v-model="form.mouldtype" @change="handleChange" placeholder="请选择模版类型">
                  <w-option
                    v-for="item in mtype"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="执行科室" prop="execdeptcode">
                <w-select v-model="form.execdeptcode" placeholder="请选择执行科室">
                  <w-option
                    v-for="item in implement"
                    :key="item.DEPTCODE"
                    :label="item.DEPTNAME"
                    :value="item.DEPTCODE">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="开单类别" prop="usearea">
                <w-select v-model="form.usearea" placeholder="请选择开单类别">
                  <w-option
                    v-for="item in category"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="开单科室" prop="applydepts" class="select-input">
                <w-select
                  style="width:100%"
                  v-model="form.applydepts"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  :collapse-tags=true
                  value-key="deptcode"
                  :loading="loading"
                  @focus="handleFocusInput"
                  placeholder="请输入编码/名称搜索"
                  :remote-method="remoteMethod">
                  <w-option
                    v-for="(item,index) in openings"
                    :key="index"
                    :label="item.DEPTNAME"
                    :value="{deptcode:item.DEPTCODE,value:item.DEPTCODE}"
                  >
                  <span class="flex justify">
                    <span>{{item.DEPTNAME}}</span>
                    <span>{{item.DEPTCODE}}</span>
                  </span>
                  </w-option>
                </w-select>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <!-- 新增项目 -->
        <w-row v-else>
          <w-row>
            <w-col :span="12" class="po_re">
              <w-form-item label="成分大类" required  prop="maincode">
                <w-select v-model="form.maincode" filterable value-key="MAIN_CODE" @change="handleSelChange" placeholder="请选择成分大类">
                  <w-option
                    v-for="item in mainTypesList"
                    :key="item.MAIN_CODE"
                    :label="item.MAIN_NAME"
                    :value="item">
                  </w-option>
                </w-select>
                <span class="inline-block po_ab top_0 right_-20 " style="z-index:999"><i class=" iconfont icondaoru" @click="handlePlus('big')"></i></span>
              </w-form-item>
            </w-col>
            <w-col :span="12" class="po_re">
              <w-form-item label="成分小类" prop="detailcode"
                :rules="[
                  { required: true, message: '请选择成分小类'},
                ]">
                <w-select @change="handleSelChange1" filterable value-key="DETAIL_CODE" v-model="form.detailcode" placeholder="请选择成分小类">
                  <w-option
                    v-for="item in detailTypesList"
                    :key="item.DETAIL_CODE"
                    :label="item.DETAIL_NAME"
                    :value="item">
                  </w-option>
                </w-select>
                <span v-if="form.maincode !==''" class="inline-block po_ab top_0 right_-35">
                  <i  @click="handlePlus('sma')" class="iconfont icondaoru"></i>
                </span>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="项目代码" prop="itemcode">
                <w-input v-model="form.itemcode"  showCounter
                  placeholder="请输入代码"></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="项目名称" prop="itemname">
                <w-input v-model="form.itemname" showCounter
                  placeholder="请输入名称"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col>
              <w-form-item
                label="费用对应"
                prop="value2"
               >
                <template>
                  <!-- 点击选择收费项目 -->
                  <w-tag size="mini" v-for="(item,index) in this.form.chargeitems"
                    :closable="true"
                    @close="handleTagClose(index)"
                    :key="index">
                    <w-radio-group v-if="item.chargeMtechFlag === 1"
                      v-model="radioValue" @change="handleTagChoose(item)">
                      <w-radio :label="item.chargeMainFlag"></w-radio>
                    </w-radio-group>
                    {{item.chargeItemName}}
                  </w-tag>
                  <div class="tab-style" @click="handleIputVal">
                    <i class="iconfont  iconweibiaoti--"></i>
                  </div>
                </template>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="默认数量" prop="amount">
                <w-input v-model.number="form.amount">
                  <template slot="suf-append"><span style="padding: 0 5px;">{{amount}}</span></template>
                </w-input>
                <!-- <w-input v-model.number="form.amount"></w-input> -->
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="加减量"  prop="addfactor">
                <w-input v-model.number="form.addfactor">
                  <template slot="suf-append"><span style="padding: 0 5px;">{{addfactor}}</span></template>
                </w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item label="备注" prop="remark">
                <w-input v-model="form.remark"  showCounter
                  placeholder="请填写备注"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <w-modal
          width="60%"
          class="modal-style"
          :close-on-click-modal="false"
          :title=" MODAL_TITLE.SELECT_ITEM"
          :visible.sync="innerVisible"
          append-to-body>
          <div class="search-style clearfix" v-if="modalTitle=== MODAL_TITLE.SELECT_ITEM">
            <w-input class="mg-bottom_16" v-model="search" placeholder="请输入关键字进行搜索" sufAppendIsButton
              @keyup.enter.native="handleSearch(search)">
              <template slot="suf-append">
                <i @click="handleSearch(search)" class="w-icon-search"></i>
              </template>
            </w-input>
            <!-- <w-table
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
              @select-all="handleSelectionChange"
              @select="handleSelectionChange">
              <w-table-column type="selection" :reserve-selection="true" width="55"></w-table-column>
              <w-table-column prop="CHARGE_CODE"  width= '120px' label="收费编码"></w-table-column>
              <w-table-column prop="CHARGE_NAME"  label="收费项目"></w-table-column>
              <w-table-column prop="CHARGE_PRICE"  width= '150px' align= 'right' label="项目价格（元）"></w-table-column>
            </w-table> -->
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
              :total="total"
              class="fr pd-top_16"
              :current-page="currentPage"
              :page-size="pagesize"
              @actived-change="currentChange1"
              :show="['prev', 'next', 'total']">
            </w-pagination>
          </div>
          <div v-else>
            <w-row>
              <w-col :span="11">
                <p class="mg-bottom_10">已选择大类列表</p>
                <win-table :listTable=tableTitle
                  :tableData=mainTypeData
                  @handleSelectionChange="checkAll"
                  :isShow=isShow>
                </win-table>
              </w-col>
              <w-col :span="2">
                <div class="opSetting">
                  <div @click="handelSelect">
                    <w-button :disabled="nowSelectData.length?false:true"
                      class="w-icon-arrow-left"> 
                    </w-button>
                  </div>
                  <div class="spacing" @click="handleRemoveSelect">
                    <w-button  :disabled="nowSelectRightData.length?false:true"
                      class="w-icon-arrow-right">
                    </w-button>
                  </div>
                </div>
              </w-col>
              <w-col :span="11">
                <p class="mg-bottom_10">未选择大类列表</p>
                <win-table :listTable=tableTitle
                  :tableData=selectArr
                  @handleSelectionChange="checkRightAll"
                  :isShow=isShow>
                </win-table>
              </w-col>
            </w-row>
          </div>
          <span slot="footer" class="dialog-footer ">
            <w-button @click="reset('inner')">取消</w-button>
            <w-button  @click="submit('inner')" type="primary" >确定</w-button>
          </span>
        </w-modal>
      </w-form>
      <span slot="footer" class="dialog-footer">
        <w-button @click="reset('out')">取 消</w-button>
        <w-button type="primary" @click="submit('out')">确 定</w-button>
      </span>
    </w-modal>
  </div>

</template>
<script src="./index.js">
</script>

<style lang="stylus" scoped>
.home-page-wrap-ba
  height 100%
  padding 12px 15px
  background rgba(234,237,244,1)
  overflow-x auto
  overflow-y hidden
  
  .title
    font-weight 500;
    font-size 14px;
    color #000622;
  .home-page-body
    padding 16px
    background rgba(255,255,255,1)
    border-radius 2px
    .left-body
      height 100%
      width calc(100% - 415px)
      float left
    .right-body
      width 400px
      margin-left 15px
      height 100%
      float right
      background #fff
</style>
<style lang="scss" scoped>
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
.iconfont {
  font-size: 16px;
}
.opSetting{
    text-align: center;
    margin-top:30px;
    span {
      display: inline-block;
      width:40px;
      height:32px;
      background:rgba(243,245,249,1);
      border-radius:2px;
      border:1px solid rgba(192,203,233,1);
      line-height: 32px;
    }
    // span:hover {
    //   border-color: #3f6df1;
    //   color: #fff;
    //   background: #3f6df1;
    // }
  }
  .spacing{
    margin-top:10px;
  }
.list-style {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
.select-input {
  .w-select__input {
    width: 50px!important;
    z-index: 999;
  }
}
.w-select {
  width:100%!important;
}

.w-row {
  padding-bottom: 16px;
}
  .unitDepartment-tag {
    width: 70%;
    min-height: 44px;
    background-color: #f3f6fe;
    border-radius: 4px;
    display:inline-block;
    span {
      display:inline-block;
      padding-left: 10px;
      color:#999;
    }
    .w-input,
    .w-select,
    .w-input__inner {
      width:100%!important;
      min-height: 44px!important;
    }
  }
  .unitDepartment-tag:hover {
    background-color: #e7edfd;
    // box-shadow: #2d5afa 0px 0px 3px;
  }
  // .unitDepartment-tag:focus {
  //   border-color: #5175f4;
  //   box-shadow: #2d5afa 0px 0px 0px;
  // }
  .allowed {
    cursor:not-allowed 
  }
</style>
<style lang="scss">
.opSetting {
 .w-button--primary, 
 .w-button--default {
    width: 44px !important;
  }
}

.modal {
  .iconfont {
    font-size: 16px!important;
    font-weight: 700;
    display: inline-block;
    padding-left: 10px;
  }
  .w-modal__footer,
  .w-modal__body {
    margin-right: 30px!important;
  }
  // .w-modal__body {
  //   padding: 20px 20px 0px 0px;
  // }
  .w-select__input {
    width: 100px!important;
  }
}
.flex.justify {
  justify-content: space-between;
  align-items: center;
}
</style>