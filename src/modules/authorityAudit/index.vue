<template>
  <div class="home-page-wrap-us">
    <w-row  class="home-page-body ">
      <w-col :span="12" >
        <div class="mg-right_16">
          <title-style class=" po_re pd-bottom_22"><span slot="header">审核流程列表</span>
            <w-button class="po_ab top_-5 right_0" @click="handleAdd('left')"  type="text" plain>+ 新增</w-button>
          </title-style>
          <win-table :listTable=tableLeftTitle
            @handleEdit="handleEdit"
            :tableData=tableData
            @handleRow="handleRowR"
            :isShow=isShowTableLeft
            @handleDelete="handleDelete('left')"
            style="height: calc(100vh - 150px); overflow-y: auto;"
            >
          </win-table>
        </div>
      </w-col>
      <w-col :span="12">
        <div class="pl-15 pd-right">
          <title-style class=" po_re pd-bottom_22"><span slot="header">审核流程列表</span>
          <w-button class="po_ab top_-5 right_0" @click="handleAdd('right')"  type="text" plain>+ 新增</w-button>
        </title-style>
          <win-table :listTable=tableRightTitle
            @handleEdit="handleEdit"
            :tableData=tableData
            @handleDelete="handleDelete"
            style="height: calc(100vh - 150px); overflow-y: auto;"
            :isShow=isShow>
          </win-table>
        </div>
      </w-col>
    </w-row>
    <w-modal
      :close-on-click-modal="false"
      :showClose="false"
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
                placeholder="请输入审核名称"
                showCounter
                v-model="form.name"
              ></w-input>
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
            </w-form-item>
          </w-col>
        </w-row>
        <w-row v-else>
          <w-col :span="12">
            <w-form-item label="最小量" prop="name" required>
              <w-input v-model="numVal"></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item label="最大量" prop="name" required>
              <w-input v-model="operationVal"></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col>
             <w-form-item
              label="描述"
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
import apiData from '../api/authorityAudit.js';
export default {
  data() {
    return {
      visible: false,
      modalTitle:'123',
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
      tableLeftTitle:[
        {
          prop:'time',
          label:'审核名称'
        },
        {
          prop:'name',
          label:'审核范围',
          width:'100px'
        },
        {
          prop:'name',
          label:'描述'
        }
      ],
      tableRightTitle:[
        {
          prop:'name',
          label:'步骤名称'
        },
        {
          prop:'status',
          label:'操作角色',
          width:'100px'
        },
        {
          prop:'status',
          label:'描述'
        }
      ],
      tableData: [
        {
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
        }
      ],
      isShow: {
        width:'120px',
        index:true,
        indexTitle:'步骤'
      },
      isShowTableLeft: {
        width:'120px',
      }
    };
  },
  computed: {
  },
  watch: {

  },
  created() {
    // this.getPafTemplate()
  },
  mounted() {
  },
  methods: {
    // 新增按钮
    handleAdd (title) {
      this.visible = true
      if (title === 'left') {
        this.title = '新增审核流程'
      } else {
        this.title = '新增流程明细'
      }
      console.log(title)
    },
    handleEdit (row,t) {
      console.log('edit',row,t);
    },
    // 点击流程列表某一行数据
    handleRowR (row) {
      console.log('row',row);
    },
    handleDelete (row,t) {
      console.log('Delete',row,t);
    },
    // 模态框表格多选值
    handleSelectionChange (val) {
      this.selection = val
    },
    // 点击模态框新增按钮事件
    submit () {
      this.$refs.form.validateForm(async (valid) => {
        if (valid) {
          this.visible = false

        }
      })
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
    // // 列表删除
    // handleDelete (row) {
    //  console.log(row)
    // }
  }
};
</script>

<style lang="scss" scoped>
.home-page-wrap-us {
  .home-page-body {
    padding: 16px;
    background: rgba(255,255,255,1);
    border-radius: 2px;
  }
}

</style>
<style lang="scss">
.w-select,
.w-input {
  width: 100% !important;
}

.w-row {
  padding-bottom: 16px;

}
</style>
