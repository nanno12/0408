<template>
  <div class="home-page-wrap-us">
    <w-row  class="home-page-body ">
      <w-col :span="12" >
        <div class="mg-right_16" style="height: 31px; line-height: 31px;">
          <title-style class=" po_re pd-bottom_18"><span slot="header">审核流程列表</span>
            <w-button class="po_ab top_0 right_0" @click="handleAdd('left')"  type="text" plain>+ 新增</w-button>
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
        <div class="pl-15">
          <div class=" po_re pd-bottom_18">
            <w-tabs v-model="activeName2" @tab-click="handleClick" type="dark">
              <w-tab-pane label="对应职称" name="first"></w-tab-pane>
              <w-tab-pane label="非对应职称医生" name="second"></w-tab-pane>
            </w-tabs>
            <w-button class="po_ab top_-5 right_0" @click="handleAdd('right')"  type="text" plain>+ 新增</w-button>
          </div>
          <w-table :data="tableData" class="mt-15 " :border="true" style="width: 100%">
            <w-table-column type="index" width="70" align="center" label="序号">
            </w-table-column>
            <w-table-column v-for="(item,index) in list" :prop="item.prop" :label="item.label" :key="index" >
            </w-table-column>
            <!-- <w-table-column prop="name" label="医生工号">
            </w-table-column>
            <w-table-column prop="status" label="职称">
            </w-table-column> -->
            <w-table-column label="操作" align="center" width="80">
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
        <w-row v-if="title === '新增审核流程'" class="left-model">
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
          </w-row>
          <w-row>
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
          </w-row>
        <div v-else class=" pd-right mg-buttom_16" >
          <div v-if="title !== '新增职称'">
            <span>科室</span>
            <w-select v-model="region" placeholder="请选择科室">
              <w-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </w-option>
            </w-select>
            <w-input v-model="value2" placeholder="医生姓名/工号" sufAppendIsButton>
              <template slot="suf-append">
                <i class="w-icon-search"></i>
              </template>
            </w-input>
          </div>
          <w-table ref="multiTable" :data="tableData"
            :border="true" class="mg-top_16" style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            @selection-change="handleSelectionChange">
            <w-table-column type="selection" width="50">
            </w-table-column>
            <w-table-column v-for="(item,index) in list" :prop="item.prop" :label="item.label" :key="index" >
            </w-table-column>
            <w-table-column v-if="title === '新增医生'" prop="type" label="科室">
            </w-table-column>
            <w-table-column  label="操作" align="center" width="80">
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
      activeName2: 'first',
      operationVal: 1, // 加减量
      numVal: 1, // 默认数量
      title: ' ', // 模态框标题
      value: '', // 描述值
      value2: '', // 模态框表格搜索
      region: '', // 请选择科室值
      selection: [],
      list:[
        {
          prop:'time',
          label:'职称代码'
        },
        {
          prop:'name',
          label:'职称名称'
        }
      ],
      corresponding:[
        {
          prop:'time',
          label:'职称代码'
        },
        {
          prop:'name',
          label:'职称名称'
        }
      ],
      noCorresponding:[
        {
          prop:'name',
          label:'医生姓名'
        },
        {
          prop:'time',
          label:'医生工号'
        },
        {
          prop:'type',
          label:'职称'
        }
      ],
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
      // tableRightTitle:[
      //   {
      //     prop:'name',
      //     label:'步骤名称'
      //   },
      //   {
      //     prop:'status',
      //     label:'操作角色',
      //     width:'100px'
      //   },
      //   {
      //     prop:'status',
      //     label:'描述'
      //   }
      // ],
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
    handleClick(tab) {
      this.activeName2 = tab.name
      if (tab.name === 'first') {
        console.log(tab.name)
        this.list = this.corresponding
        this.title = '新增职称'
      } else {
        console.log(tab.name)
        this.list = this.noCorresponding
        this.title = '新增医生'
      }
    },
    // 新增按钮
    handleAdd (title) {
      this.visible = true
      if (title === 'left') {
        this.title = '新增审核流程'
      } else {
        console.log('this.activeName2',this.activeName2);
        if (this.activeName2 === 'first') {
          this.title = '新增职称'
        } else {
          this.title = '新增医生'
        }
        // this.title = '新增职称'
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
