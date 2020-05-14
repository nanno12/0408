<template>
  <div class="home-page-wrap-ba">
    <w-row  class="home-page-body">
      <w-col :span="9" >
        <title-style class=" po_re pd-bottom_22"><span slot="header">申请单列表</span>
          <w-button class="po_ab top_-5 right_0" @click="handleAdd('left')"  type="text" plain>+ 新增</w-button>
        </title-style>
        <div class="list-style">
          <w-table class="mt-15" @row-click="handleRow" 
            :highlight-current-row="true"
            :row-class-name="tableRowClassName"
            ref="interfaceTable"
            :data="listMoulds" :border="true" style="width: 100%">
            <w-table-column type="index" width="70" align="center" label="序号"></w-table-column>
            <w-table-column prop="MOULD_TYPE_STR" label="类型" width="100"></w-table-column>
            <w-table-column prop="MOULD_NAME" label="名称" ></w-table-column>
            <w-table-column fixed="right" label="操作" align="center" width="170" reference-cell>
              <template slot-scope="scope">
                  <w-button type="text" @click="onEditing(scope.row,'left')">修改</w-button>
                  <w-button type="text" @click="handleClone(scope.row, 'left')">复制</w-button>
                  <w-button @click="handleConfirm(scope.row, 'left', scope.$index)" type="text">删除</w-button>
              </template>
            </w-table-column>
          </w-table>
        </div>
      </w-col> 
      <w-col :span="15">
        <div class="pd-left_15">
          <title-style class="pd-bottom_22  po_re"><span slot="header">项目列表</span>
            <w-button class="po_ab top_-5 right_0" @click="handleAdd('right')"  type="text" plain>+ 新增</w-button>
          </title-style>
          <div class="list-style">
          <w-table  :data="listMouldItems"  :border="true" style="width: 100%">
            <w-table-column type="index" width="70" align="center" label="序号">
            </w-table-column>
            <w-table-column prop="MOULD_ITEM_NAME" label="项目名称">
            </w-table-column>
            <w-table-column prop="ITEM_AMOUNT" label="默认数量" width="100">
            </w-table-column>
            <w-table-column prop="time" label="单位" width="70">
            </w-table-column>
            <w-table-column prop="MAIN_NAME" label="成分大类">
            </w-table-column>
            <w-table-column prop="ITEM_USEAREA" label="对应费用明细" width="130">
            </w-table-column>
            <w-table-column prop="ITEM_ADDFACTOR" label="费用价格" width="100">
            </w-table-column>
            <w-table-column prop="ITEM_REMARK" label="备注"> </w-table-column>
            <w-table-column fixed="right" label="操作" reference-cell align="center" width="120">
              <template slot-scope="scope">
                <w-button type="text" @click="onEditing(scope.row,'right')">修改</w-button>
                <w-popconfirm  title="确认删除这条内容吗? "
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
      <w-form label-align="right"  :model="form" ref="form" label-width="130px" :rules="rules">
        <!-- 新增申请单 -->
        <w-row v-if="modalTitle === MODAL_TITLE.FORM || modalTitle=== MODAL_TITLE.CLONE">
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
              <w-form-item label="开单科室">
                <!-- <w-select v-model="form.applydeptcode" placeholder="请选择开单科室">
                  <w-option
                    v-for="item in openings"
                    :key="item.DEPTCODE"
                    :label="item.DEPTNAME"
                    :value="item.DEPTCODE">
                  </w-option>
                </w-select> -->
              <w-select
                style="width:100%"
                v-model="form.applydepts"
                 multiple
                filterable
                remote
                reserve-keyword
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
        <w-row v-else-if="modalTitle===MODAL_TITLE.ITEM">
          <w-row>
            <w-col :span="12" class="po_re">
              <w-form-item label="成分大类" required >
                <w-select v-model="form.maincode" filterable value-key="MAIN_CODE" @change="handleSelChange" placeholder="请选择成分大类">
                  <w-option
                    v-for="item in mainTypesList"
                    :key="item.MAIN_CODE"
                    :label="item.MAIN_NAME"
                    :value="item">
                  </w-option>
                </w-select>
                <span class="inline-block po_ab top_0 right_-20 " style="z-index:999"><i class=" iconfont iconweibiaoti--" @click="handlePlus('big')"></i></span>
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
                  <i  @click="handlePlus('sma')" class="iconfont iconweibiaoti--"></i>
                </span>
              </w-form-item>
            </w-col>
            
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="项目代码" prop="itemcode">
                <w-input v-model="form.itemcode" :maxlength="20" showCounter
                  placeholder="请输入代码"></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="项目名称" prop="itemname">
                <w-input v-model="form.itemname" :maxlength="20" showCounter
                  placeholder="请输入名称"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col>
              <w-form-item class=" pd-right" label="费用对应" prop="">
                <w-select
                style="width:100%"
                v-model="form.applydeptcode"
                 multiple
                filterable
                remote
                reserve-keyword
                :loading="loading"
                @focus="handleFocusInput"
                placeholder="请输入关键字搜索收费项目"
                :remote-method="remoteMethod1"
              >
              <w-option
                v-for="(item,index) in tableData"
                :key="index"
                :label="item.name"
                :value="{
                  value: item.value,
                  DEPTNAME: item.name
                }"
              >
                <span class="flex justify">
                  <span>{{item.name}}</span>
                  <span>{{item.value}}</span>
                </span>
              </w-option>
            </w-select>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="默认数量">
                <w-input v-model.number="form.amount"></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="加减量"  prop="addfactor">
                <w-input v-model.number="form.addfactor"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item label="备注">
                <w-input v-model="form.remark"  showCounter
                  placeholder="请填写备注"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
        </w-row>
        <div v-else-if="modalTitle=== MODAL_TITLE.SELECT_ITEM">
          <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
            <template slot="suf-append">
              <i class="w-icon-search"></i>
            </template>
          </w-input>
          <w-table ref="multiTable" :data="tableData" :border="true" class="mt-15" style="width: 100%"
            @selection-change="handleSelectionChange">
            <w-table-column type="selection" width="50">
            </w-table-column>
            <w-table-column prop="value" label="代码" width="150">
            </w-table-column>
            <w-table-column prop="name" label="名称" >
            </w-table-column>
          </w-table>
          <w-pagination :total="10" :page-size="4"
            @page-size-change="handlePageSizeChange"
            :show="['prev', 'next', 'total']">
          </w-pagination>
        </div>
        <!-- 新增成分类 -->
        <w-row v-else>
          <!-- <w-col :span="11">
            <p>已选择大类列表</p>
            <win-table :listTable=tableTitle
              :tableData=tableData
              @handleSelectionChange="checkAll"
              
              :isShow=isShow>
            </win-table>
          </w-col>
          <w-col :span="2">
            <div class="opSetting">
              <div @click="handelSelect">
                <w-button :disabled="nowSelectData.length?false:true" :size="buttonSize" type="primary" > 
                  >
                </w-button>
              </div>
              <div class="spacing" @click="handleRemoveSelect">
                <w-button  :disabled="nowSelectRightData.length?false:true" :size="buttonSize" type="primary">
                  <
                </w-button>
              </div>
            </div>
          </w-col>
          <p>未选择大类列表</p>
          <w-col :span="11">
            <win-table :listTable=tableTitle
              :tableData=selectArr
              @handleSelectionChange="checkRightAll"
              :isShow=isShow>
            </win-table>
          </w-col> -->
          <!-- <w-row>
            <w-col :span="24">
              <w-form-item :label="modalTitle+'代码'" prop="code"
              :rules="[
                { required: true, message: '年龄不能为空'},
              ]">
                <w-input v-model="form.code"  showCounter
                  placeholder="请填写成分代码"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="24">
              <w-form-item :label="modalTitle+'名称'" prop="name">
                <w-input v-model="codeLIst.name"  showCounter
                  placeholder="请填写成分名称"></w-input>
              </w-form-item>
            </w-col>
          </w-row> -->
        </w-row>
      
      </w-form>

      <span slot="footer" class="dialog-footer">
        <w-button @click="reset">取 消</w-button>
        <w-button type="primary" @click="submit">确 定</w-button>
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
.iconfont {
  font-size: 16px;
}
.opSetting{
    text-align: center;
    margin-top:30px;
  }
  .spacing{
    margin-top:10px;
  }

.list-style {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
// .pd-right {
//   .w-input {
//     width:200px!important
//   }
// }
.w-select {
  width:100%!important;
}


.w-row {
  padding-bottom: 16px;
}
// .w-form
//   .w-form-item__label
//     margin-left 0px
//   .w-select
//     width 100%

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
</style>
<style lang="scss">

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
}
.flex.justify {
  justify-content: space-between;
  align-items: center;
}

</style>