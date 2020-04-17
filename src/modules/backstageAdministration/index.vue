<template>
  <div class="home-page-wrap-ba">
    <w-row  class="home-page-body">
      <w-col :span="6" >
        <title-style class="pd_22 po_re"><span slot="header">申请单列表</span>
          <w-button class="po_ab top_16 right_0" @click="handleAdd('left')"  type="primary" plain>新增</w-button>
        </title-style>
          <!-- <w-input v-model="value2" sufAppendIsButton>
            <template slot="suf-append">
              <i class="w-icon-search"></i>
            </template>
          </w-input> -->
          <!-- <span>成分大类</span>
          <w-select  v-model="optionsValue" placeholder="请选择成分大类">
            <w-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </w-option>
          </w-select> -->
        <w-table class="mt-15" :data="listMoulds" :border="true" style="width: 100%">
          <w-table-column type="index" width="70" align="center" label="序号"></w-table-column>
          <w-table-column prop="MOULD_TYPE" label="类型"></w-table-column>
          <w-table-column prop="MOULD_NAME" label="名称" width="100"></w-table-column>
          <w-table-column fixed="right" label="操作" align="center" width="150" reference-cell>
            <template slot-scope="scope">
                <w-button type="text" @click="onEditing(scope.row)">修改</w-button>
                <w-button type="text" @click="handleClone(scope.row)">复制</w-button>
                <w-popconfirm  title="确认删除这条内容吗? "
                  @document-click="handleCancel(scope.$index)"
                  @confirm="handleConfirm(scope.$index)" @cancel="handleCancel(scope.$index)" placement="bottom">
                  <span class="popconfirm-reference" slot="reference">
                    <w-button type="text" @click="handleDelete(scope.row)">删除</w-button>
                  </span>
                </w-popconfirm>
            </template>
          </w-table-column>
        </w-table>
      </w-col>
      <w-col :span="18">
        <div class="pd-left_15">
          <title-style class="pd_22  po_re"><span slot="header">项目列表</span>
            <w-button class="po_ab top_16 right_0" @click="handleAdd('right')"  type="primary" plain>新增</w-button>
          </title-style>
          <w-table :data="listMouldItems"  :border="true" style="width: 100%">
            <w-table-column type="index" width="70" align="center" label="序号">
            </w-table-column>
            <w-table-column prop="MOULD_ITEM_NAME" label="项目名称">
            </w-table-column>
            <w-table-column prop="ITEM_AMOUNT" label="默认数量">
            </w-table-column>
            <w-table-column prop="time" label="单位">
            </w-table-column>
            <w-table-column prop="MAIN_NAME" label="成分大类">
            </w-table-column>
            <w-table-column prop="ITEM_USEAREA" label="对应费用明细" width="150">
            </w-table-column>
            <w-table-column prop="ITEM_ADDFACTOR" label="费用价格" width="150">
            </w-table-column>
            <w-table-column prop="ITEM_REMARK" label="备注"> </w-table-column>
            <w-table-column fixed="right" label="操作" reference-cell align="center" width="120">
              <template slot-scope="scope">
                <w-button type="text" @click="onEditing(scope.row)">修改</w-button>
                <w-popconfirm  title="确认删除这条内容吗? "
                  @document-click="handleCancel(scope.$index)"
                  @confirm="handleConfirm(scope.$index)" @cancel="handleCancel(scope.$index)" placement="bottom">
                  <span class="popconfirm-reference" slot="reference">
                    <w-button type="text" @click="handleDelete(scope.row)">删除</w-button>
                  </span>
                </w-popconfirm>
              </template>
            </w-table-column>
          </w-table>
        </div>
      </w-col>
    </w-row>
    <w-modal  :visible.sync="visible"
      :title="modalTitle"
      :showClose="false"
      :close-on-click-modal="false"
      width="60%">
      <w-form label-align="right" :model="form" ref="form" label-width="90px" :rules="rules">
        <w-row>
          <w-col :span="12">
            <w-form-item label="模版代码" prop="name" required>
              <w-input v-model="form.name" :maxlength="20" showCounter
                placeholder="请输入模版代码"></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="模版名称" prop="name" required>
              <w-input v-model="form.name" :maxlength="20" showCounter
                placeholder="请输入模版名称"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="12">
            <w-form-item label="模版类型" prop="region">
              <w-select v-model="form.region" placeholder="请选择模版类型">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="执行科室" prop="region">
              <w-select v-model="form.region" placeholder="请选择执行科室">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>

            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="12">
            <w-form-item label="开单类别" prop="region">
              <w-select v-model="form.region" placeholder="请选择开单类别">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="开单科室" prop="region">
              <w-select v-model="form.region" placeholder="请选择开单科室">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>

            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="11">
            <w-form-item label="成分大类" prop="region">
              <w-select v-model="form.region" placeholder="请选择成分大类">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
            </w-form-item>
          </w-col>
          <w-col :span="1"><i @click="handlePlus('big')" class="w-icon-plus" style="font-size: 33px;"></i></w-col>
          <w-col :span="11">
            <w-form-item label="成分小类" prop="region">
              <w-select v-model="form.region" placeholder="请选择成分小类">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>

            </w-form-item>
          </w-col>
          <w-col :span="1"><i  @click="handlePlus('sma')" class="w-icon-plus" style="font-size: 33px;"></i></w-col>
        </w-row>
        <w-row>
          <w-col :span="12">
            <w-form-item label="项目代码" prop="name" required>
              <w-input v-model="form.name" :maxlength="20" showCounter
                placeholder="请输入项目代码"></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="项目名称" prop="name" required>
              <w-input v-model="form.name" :maxlength="20" showCounter
                placeholder="请输入项目名称"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="12">
            <w-form-item label="默认数量" prop="name" required>
              <w-input-number v-model="numVal"></w-input-number>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="加减量" prop="name" required>
              <w-input-number v-model="operationVal"></w-input-number>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item label="备注" prop="region">
              <w-input v-model="form.name"  showCounter
                placeholder="请填写备注"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item label="成分大类代码" prop="region">
              <w-input v-model="form.name"  showCounter
                placeholder="请填写成分大类代码"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item label="成分大类名称" prop="region">
              <w-input v-model="form.name"  showCounter
                placeholder="请填写成分大类名称"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item label="成分小类代码" prop="region">
              <w-input v-model="form.name"  showCounter
                placeholder="请填写成分小类代码"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item label="成分小类名称" prop="region">
              <w-input v-model="form.name"  showCounter
                placeholder="请填写成分小类名称"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
      </w-form>
      <div>
        <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
          <template slot="suf-append">
            <i class="w-icon-search"></i>
          </template>
        </w-input>
        <w-table ref="multiTable" :data="tableData" :border="true" class="mt-15" style="width: 100%"
          @selection-change="handleSelectionChange">
          <w-table-column type="selection" width="50">
          </w-table-column>
          <w-table-column prop="time" label="代码">
          </w-table-column>
          <w-table-column prop="name" label="名称" width="150">
          </w-table-column>
          <w-table-column prop="status" label="价格" width="150">
          </w-table-column>
          <w-table-column prop="type" label="单位">
          </w-table-column>
          <w-table-column prop="type" label="使用范围">
          </w-table-column>
        </w-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <w-button @click="reset">取 消</w-button>
        <w-button type="primary" @click="submit">确 定</w-button>
      </span>
    </w-modal>
  </div>
</template>
<script>
// import Common from '@/app/api/common.js';
// import autoResize from '@/app/components/autoResize';
import dataApi from './api/api.js';
export default {
   
  // mixins: [autoResize],
  components: {
    // LeftInfoBody,
  },
  data() {
    return {
      value: '', // 搜索框
      visible: false,
      operationVal: 1, // 加减量
      numVal: 1, // 默认数量
      modalTitle: '', // 模态框标题
      showInput: true,
      value2: '', // 模态框表格搜索
      MODAL_TITLE : {
        ADD:'新增',
        EADIT:'修改',
        FORM:'申请单',
        ITEM:'项目',
        LARGE_CLASS:'成分大类',
        SUB_CLASS:'成分小类',
        SELECT_ITEM:'选择对应项目',
        TIPS:'提示',
      },
      form: {
        name:'',
        region: ''
      },
      rules: {
        region: [{
          required: true, message: '请选择区域', trigger: 'change'
        }],
        name: [{
          required: true, message: '请选择区域', trigger: 'change'
        }]
      },
      selection: [],
      options: [
        {
          value: '选项1',
          label: '安徽'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '北京'
        }, {
          value: '选项4',
          label: '南京'
        }, {
          value: '选项5',
          label: '深圳'
        }
      ],
      listMouldItems: [],
      listMoulds: [],
      optionsValue: '选项1'
    };
  },
  computed: {
  },
  watch: {

  },
  created() {
    this.MouldItems()
    this.Moulds()
  },
  mounted() {
  },
  methods: {
    async MouldItems () {
      const res = await dataApi.getMouldItems()
      this.listMouldItems = res.data
      console.log(res);
    },
    async Moulds () {
      const res = await dataApi.getMoulds()
      this.listMoulds = res.data
      console.log(res);
    },
    handleClone() {},
    // 模态框表格多选值
    handleSelectionChange (val) {
      this.selection = val
    },
    // 模态框➕按钮事件
    handlePlus (title) {
      if (title === 'big') {
        this.showInput = false
        this.modalTitle = '新增成分大类'
      } else {
        this.showInput = false
        this.modalTitle = '新增成分小类'
      }
      console.log('模态框➕按钮事件')
    },
    // 点击模态框新增按钮事件
    submit () {
      if (this.modalTitle === '新增项目') {
        this.visible = false
      } else if (this.showInput === false) {
        this.showInput = true
        this.modalTitle = '新增申请单'
      } else {
        this.$refs.form.validateForm((valid) => {
          if (valid) {
            // 通过验证
            console.log('submit !')
            this.visible = false
          } else {
            // 未通过
            console.log('invalid form !')
          }
        })
      }
    },
    // 点击模态框取消按钮事件
    reset () {
       if (this.modalTitle === '新增项目') {
        this.visible = false
      } else if (this.showInput === false) {
        this.showInput = true
        this.modalTitle = '新增申请单'
      } else {
        this.$refs.form.resetFields()
        this.visible = false
      }
    },
    // 点击新增按钮出现弹框事件

    // 点击模态框以外的显示÷
    handleCloseModal (done) {
      this.$confirm('确认关闭Modal？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 列表提示框确定按钮
    handleConfirm (index) {
      console.log(12)
      this.tableData.splice(index, 1)
    },
    // 列表提示框取消按钮
     handleCancel (index) {
      // 手动取消
      this.cancelManually = true
      setTimeout(() => {
        this.listMouldItems[index].switch = !this.listMouldItems[index].switch // 恢复状态
      }, 200) // 等关闭气泡后修改状态， 避免出现数据状态过度，影响体验
    },
    // 新增按钮
    handleAdd (title) {
      if (title === 'left') {
        this.modalTitle = this.MODAL_TITLE.ADD + this.MODAL_TITLE.FORM
        this.visible = true
      } else {
        this.modalTitle = this.MODAL_TITLE.ADD + this.MODAL_TITLE.ITEM
        this.visible = true
      }
      console.log(title)
    },
    // 项目列表修改按钮
    onEditing (scope) {
      this.isEditing = true
      this.currentIndex = scope.$index
      this.currentRow = {
        ...scope.row
      }
    },
    // 列表删除
    handleDelete (row) {
     console.log(row)
    }
  }
};
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
<style lang="stylus">
.pd-right
  .w-input
    width 200px!important
.w-row
  padding-bottom 16px
.w-form
  .w-form-item__label
    margin-left 0px
  .w-select
    width 100%
</style>
