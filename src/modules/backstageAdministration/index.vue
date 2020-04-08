<template>
  <div class="home-page-wrap-ba">
    <w-row  class="home-page-body">
      <w-col :span="15" >
        <div class="pd-right">
          <div class="mb-15">项目列表</div>
          <w-input v-model="value" placeholder="请输入内容"></w-input>
          <span>成分大类</span>
          <w-select  v-model="optionsValue" placeholder="请选择成分大类">
            <w-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </w-option>
          </w-select>
          <w-button @click="handleAdd('left')" class="fr" type="primary" plain>新增</w-button>
        </div>
        <w-table class="mt-15" :data="tableData" :border="true" style="width: 100%">
          <w-table-column type="index" width="70" label="序号">
          </w-table-column>
          <w-table-column prop="time" label="项目名称">
          </w-table-column>
          <w-table-column prop="name" label="默认数量" width="100">
          </w-table-column>
          <w-table-column prop="status" label="单位" width="100">
          </w-table-column>
          <w-table-column prop="type" label="使用范围" width="100">
          </w-table-column>
          <w-table-column prop="type" label="成份大类">
          </w-table-column>
          <w-table-column prop="type" label="成份小类">
          </w-table-column>
          <w-table-column fixed="right" label="操作" width="120" reference-cell>
            <template slot-scope="scope">
                <w-button type="text"
                  @click="onEditing(scope)">修改</w-button>
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
      <w-col :span="9">
        <div class="pl-15">
          <div class="mb-15">费用明细列表</div>
          <w-button class="fr mb-15" type="primary" @click="handleAdd('right')" plain>新增</w-button>
          <w-table :data="tableData" class="mt-15 " :border="true" style="width: 100%">
            <w-table-column prop="time" label="项目代码" width="100">
            </w-table-column>
            <w-table-column prop="name" label="项目名称">
            </w-table-column>
            <w-table-column prop="status" label="价格" width="80">
            </w-table-column>
            <w-table-column prop="type" label="使用范围">
            </w-table-column>
            <w-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
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
      :title="title"
      :close-on-click-modal="false"
      width="50%">
      <div v-if="title ==='明细新增'">
        <w-input v-model="value2" placeholder="请输入项目代码/名称搜索" sufAppendIsButton>
          <template slot="suf-append">
            <i class="w-icon-search"></i>
          </template>
        </w-input>
        <w-table ref="multiTable" :data="tableData" class="mt-15" style="width: 100%"
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
      <w-form  v-else-if="showInput" label-align="right" :model="form" ref="form" label-width="90px" :rules="rules">
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
          <w-col :span="24">
            <w-form-item label="使用范围" prop="region">
              <w-select v-model="form.region" placeholder="请选择使用范围">
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
      </w-form>
      <w-input v-else></w-input>
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
// import dataApi from './api/api.js';
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
      title: '', // 模态框标题
      showInput: true,
      value2: '', // 模态框表格搜索
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
      tableData: [{
        time: '2019.05.12 11:02:33',
        status: '其他区签约',
        name: '赵宇翔',
        type: '其他'
      }, {
        time: '2019.05.12 12:24:30',
        status: '未签约',
        name: '肖新宇',
        type: '本地医保'
      }, {
        time: '2019.05.13 08:15:10',
        status: '已签约',
        name: '陈慕杰',
        type: '本地医保'
      }, {
        time: '2019.05.14 09:23:09',
        status: '未签约',
        name: '李自然',
        type: '本地医保'
      }, {
        time: '2019.05.15 08:45:48',
        status: '未签约',
        name: '尤道礼',
        type: '本地医保'
      }],
      options: [
        {
          value: '选项1',
          label: 'Atezolizumab注射液'
        }, {
          value: '选项2',
          label: '马来酸阿法替尼片'
        }, {
          value: '选项3',
          label: '依折麦布阿托伐他汀片'
        }, {
          value: '选项4',
          label: '阿替利珠单抗注射液'
        }, {
          value: '选项5',
          label: '依折麦布阿托伐他汀片'
        }
      ],
      optionsValue: '选项1'
    };
  },
  computed: {
  },
  watch: {

  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 模态框表格多选值
    handleSelectionChange (val) {
      this.selection = val
    },
    // 模态框➕按钮事件
    handlePlus (title) {
      if (title === 'big') {
        this.showInput = false
        this.title = '新增成分大类'
      } else {
        this.showInput = false
        this.title = '新增成分小类'
      }
      console.log('模态框➕按钮事件')
    },
    // 点击模态框新增按钮事件
    submit () {
      if (this.title === '明细新增') {
        this.visible = false
      } else if (this.showInput === false) {
        this.showInput = true
        this.title = '项目新增'
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
       if (this.title === '明细新增') {
        this.visible = false
      } else if (this.showInput === false) {
        this.showInput = true
        this.title = '项目新增'
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
        this.tableData[index].switch = !this.tableData[index].switch // 恢复状态
      }, 200) // 等关闭气泡后修改状态， 避免出现数据状态过度，影响体验
    },
    // 新增按钮
    handleAdd (title) {
      if (title === 'left') {
        this.title = '项目新增'
        console.log('项目')
        this.visible = true
      } else {
        console.log('明细')
        this.title = '明细新增'
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
