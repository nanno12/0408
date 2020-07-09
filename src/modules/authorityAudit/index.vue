<template>
  <div class="home-page-wrap-us">
    <w-row  class="home-page-body ">
      <w-col :span="12" >
        <div class="pd-bottom_18" style="height: 31px; line-height: 31px;">
          <title-style class=" po_re"><span slot="header">审核流程列表</span>
            <!-- <w-button class="po_ab top_0 right_0" @click="handleAdd('left')" type="text"
            :disabled="tableLeftList.length>= '3'?true:false">+ 新增</w-button> -->
          </title-style>
        </div>
        <w-table :data="tableLeftList" :border="true"
          :highlight-current-row="true"
          ref="multipleTable"
          @row-click="handleRowR">
            <w-table-column prop="FLOW_NAME" label="审核名称" width="100">
            </w-table-column>
            <w-table-column prop="FLOW_LEVEL" label="审核等级" width="100">
            </w-table-column>
            <w-table-column  label="审核范围" >
              <template slot-scope="scope">
                {{scope.row.FLOW_MIN}} ~ {{scope.row.FLOW_MAX}}
              </template>
            </w-table-column>
            <w-table-column prop="FLOW_DESC" label="描述" >
            </w-table-column>
            <w-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <w-button type="text" @click="handleEdit(scope.row)">修改</w-button>
                <!-- <w-button type="text" @click="handleDelete(scope.row,'left')">删除</w-button> -->
              </template>
            </w-table-column>
          </w-table>
      </w-col>
      <w-col :span="12">
        <div class="mg-left_16">
          <div class="po_re pd-bottom_18">
            <w-tabs v-model="activeName2" @tab-click="handleClick" type="dark">
              <w-tab-pane label="对应职称" name="first"></w-tab-pane>
              <w-tab-pane label="非对应职称医生" name="second"></w-tab-pane>
            </w-tabs>
            <w-button class="po_ab top_-5 right_0" @click="handleAdd('right')"  type="text" plain>+ 新增</w-button>
          </div>
          <w-table :data="tableDataRight"
            class="mt-15 " :border="true">
            <w-table-column type="index" width="50" align="center" label="序号">
            </w-table-column>
            <w-table-column v-for="(item,index) in list"
              :prop="item.prop" :label="item.label" :key="index" >
            </w-table-column>
            <w-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <!-- <w-popconfirm  title="确认删除这条内容吗? "
                  @document-click="handleCancel(scope.$index)"
                  @confirm="handleConfirm(scope.$index)" @cancel="handleCancel(scope.$index)" placement="bottom">
                  <span class="popconfirm-reference" slot="reference">
                  </span>
                </w-popconfirm> -->
                <w-button type="text" @click="handleDelete(scope.row,'title')">删除</w-button>
              </template>
            </w-table-column>
          </w-table>
        </div>
      </w-col>
    </w-row>
    <w-modal
      :close-on-click-modal="false"
      :showClose="false"
      top="10vh"
      :title="title"
      :visible.sync="visible"
      width="60%" >
      <w-form
        @submit.native.prevent
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="100px"
        ref="form" >
        <w-row v-if="title === '新增审核流程' || title === '修改审核流程' " class="left-model">
          <w-row>
            <w-col :span="12">
              <w-form-item
                label="审核名称"
                prop="FLOW_NAME"
              >
                <w-input
                  placeholder="请输入审核名称"
                  showCounter
                  v-model="form.FLOW_NAME"
                ></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item
                label="审核等级"
                required
              >
              <w-input v-model="flowLevel" :readonly="true" ></w-input>
              <!-- <w-select v-model="form.FLOW_LEVEL"
                @focus="handleFocusLevel"
                @change="handleChangeLevel"
                placeholder="请选择审核等级">
                <w-option
                  v-for="item in flowLevelList"
                  :disabled="item.disabled"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select> -->
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col :span="12">
              <w-form-item label="最小量" required>
                <w-input v-model.number="form.FLOW_MIN" :readonly="true" ></w-input>
              </w-form-item>
            </w-col>
            <w-col :span="12">
              <w-form-item label="最大量" prop="FLOW_MAX" required>
                <w-input v-model.number="form.FLOW_MAX"></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          <w-row>
            <w-col>
              <w-form-item
                label="描述"
              >
                <w-input v-model="form.FLOW_DESC" placeholder="请输入描述" type="textarea" showCounter></w-input>
              </w-form-item>
            </w-col>
          </w-row>
          </w-row>
        <div v-else class=" pd-right" >
          <div v-if="title !== '新增职称'">
            <span>科室</span>
            <w-select
              style="width:100%"
              v-model="applydepts"
              filterable
              remote
              clearable 
              :loading="loading"
              @focus="handleFocusInput"
              :remote-method="remoteMethod"
              @change="handleChangeSelectVa"
              placeholder="请输入编码/名称搜索">
              <w-option
                v-for="(item,index) in openings"
                :key="index"
                :label="item.DEPTNAME"
                :value="{deptcode:item.DEPTCODE,value:item.DEPTCODE}"
              >
              </w-option>
            </w-select>
            <w-input v-model="value2" 
              @keyup.enter.native="handleChangeSearchInputVa(value2)"
              placeholder="医生姓名/工号" sufAppendIsButton>
              <template slot="suf-append">
                <i class="w-icon-search"></i>
              </template>
            </w-input>
          </div>
          <w-table ref="multiTable" :data="tableDataModal"
            height="500px"
            :row-key="getKey"
            v-loading="loading"
            :border="true" class="mg-y_16" style="width: 100%"
            @selection-change="handleSelectionChange">
            <w-table-column type="selection" width="50" 
              :reserve-selection="true">
            </w-table-column>
            <w-table-column v-for="(item,index) in listModal" :prop="item.prop" :label="item.label" :key="index" >
            </w-table-column>
            <w-table-column v-if="title === '新增医生'" prop="type" label="科室">
            </w-table-column>
          </w-table>
          <div class="mg-bottom_20 pd-bottom_5">
            <w-pagination
              v-if="title !== '新增职称'"
              :total="total"
              class="fr "
              :current-page="QUERY_PAGE.pageIndex"
              @actived-change="currentChange"
              :show="['prev', 'next', 'total']">
            </w-pagination>
          </div>
        </div>
      </w-form>
      <span
        class="dialog-footer"
        slot="footer"
      >
        <w-button @click="reset('form')">取 消</w-button>
        <w-button
          @click="submit"
          type="primary"
        >确 定</w-button>
      </span>
    </w-modal>
  </div>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped>
.home-page-wrap-us {
  .home-page-body {
    /* padding: 16px; */
    background: rgba(255,255,255,1);
    border-radius: 2px;
  }

}

</style>
<style lang="scss">
.home-page-wrap-us {
   .w-tabs--border-card>.w-tabs__content, .w-tabs--dark>.w-tabs__content {
    padding: 0!important;
  }
}
.left-model {
  .w-select,
  .w-input {
    width: 100% !important;
  }
}
.pd-right {
  .w-select {
    .w-input {
      width: 160px!important;
    }
    width: 160px!important;
  }
  // .w-input.is-expansion,
  // .w-input--medium {
  //   width: 260px!important;
  // }
  .w-input{
    width: 260px!important;
  }
}


.w-row {
  padding-bottom: 16px;

}
</style>
