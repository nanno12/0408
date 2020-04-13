<template>
  <div class="home-page-wrap-us">
    <w-row  class="home-page-body">
      <w-col :span="12" >
        <div class="mb-15 title">审核流程列表</div>
        <w-button @click="handleAdd('left')" class="fr mb-15" type="primary" plain>新增</w-button>
        <w-table class="mt-15" :data="tableData" :border="true" style="width: 100%">
          <w-table-column prop="time" label="审核名称">
          </w-table-column>
          <w-table-column prop="name" label="审核范围" width="100">
          </w-table-column>
          <w-table-column prop="name" label="描述" width="100">
          </w-table-column>
          <w-table-column fixed="right" label="操作" align="center" width="120" reference-cell>
            <template slot-scope="scope">
                <w-button type="text" @click="handleModify(scope.row)">修改</w-button>
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
      <w-col :span="12">
        <div class="pl-15 pd-right">
          <div class="mb-15 title">流程明细列表</div>
          <w-button class="fr mb-15" type="primary" @click="handleAdd('right')" plain>新增</w-button>
          <w-table :data="tableData" class="mt-15 " :border="true" style="width: 100%">
            <w-table-column type="index" label="步骤" width="80">
            </w-table-column>
            <w-table-column prop="name" label="步骤名称">
            </w-table-column>
            <w-table-column prop="status" label="操作角色">
            </w-table-column>
            <w-table-column prop="status" label="描述">
            </w-table-column>
            <w-table-column label="操作"  align="center" width="120">
              <template slot-scope="scope">
                <w-button type="text" @click="handleModify(scope.row)">修改</w-button>
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
      <w-modal
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="60%" >
      <w-form
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="100px"
        ref="form" >
        <w-row>
          <w-col :span="12">
            <w-form-item
              label="审核名称"
              prop="region"
            >
              <w-input
                v-if="title !=='新增明细流程'"
                placeholder="请输入审核名称"
                showCounter
                v-model="form.name"
              ></w-input>
              <w-select v-else v-model="form.region" placeholder="请选择操作角色">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
            </w-form-item>
          </w-col>
          <w-col :span="12" v-if="title ==='新增明细流程'">
            <w-form-item label="步骤序号" align="center" width="120px" prop="name" required>
              <w-input-number v-model="numVal"></w-input-number>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row v-if="title ==='新增明细流程'">
          <w-col :span="12">
            <w-form-item label="步骤名称" prop="name" required>
              <w-input
                placeholder="请输入步骤名称"
                v-model="form.name"
              ></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="操作角色" prop="name" required>
              <w-select v-model="form.region" placeholder="请选择操作角色">
                <w-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </w-option>
              </w-select>
              <i @click="handlePlus('big')" class="w-icon-plus" style="font-size: 33px;"></i>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row v-else>
          <w-col :span="12">
            <w-form-item label="最小量" prop="name" required>
              <w-input-number v-model="numVal"></w-input-number>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="最大量" prop="name" required>
              <w-input-number v-model="operationVal"></w-input-number>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col>
             <w-form-item
              label="描述"
              prop="region"
            >
              <w-input v-model="value" placeholder="请输入描述" type="textarea" showCounter></w-input>
             </w-form-item>
          </w-col>
        </w-row>
      </w-form>
      <span
        class="dialog-footer"
        slot="footer"
      >
        <w-button @click="reset">取 消</w-button>
        <w-button
          @click="submit"
          type="primary"
        >确 定</w-button>
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
      visible: false,
      operationVal: 1, // 加减量
      numVal: 1, // 默认数量
      title: '', // 模态框标题
      value: '', // 描述值
      value2: '', // 模态框表格搜索
      region: '', // 请选择科室值
      selection: [],
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
      }]
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
    handlePlus () {

    },
    // 模态框表格多选值
    handleSelectionChange (val) {
      this.selection = val
    },
    // 点击模态框新增按钮事件
    submit () {
      this.visible = false
    },
    // 点击模态框取消按钮事件
     reset () {
      this.visible = false
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
        this.title = '新增审核'
        this.visible = true
      } else {
        this.title = '新增明细流程'
        this.visible = true
      }
      console.log(title)
    },
    // 列表删除
    handleDelete (row) {
     console.log(row)
    }
  }
};
</script>

<style lang="stylus" scoped>
.home-page-wrap-us
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
</style>
