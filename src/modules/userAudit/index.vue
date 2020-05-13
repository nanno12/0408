<template>
  <div class="home-page-wrap-ba">
    <w-row  class="home-page-body">
      <w-col :span="12" class="pd-right_16">
        <title-style class=" po_re pd-bottom_24 pd-top_5"><span slot="header">角色列表</span>
          <w-button class="po_ab top_0 right_0" @click="handleAdd('left')"  type="text" plain>+ 新增</w-button>
        </title-style>
        <w-table class="mg-right_16" :data="tableData" :border="true" style="width: 100%">
          <w-table-column type="index" width="70" align="center" label="序号">
          </w-table-column>
          <w-table-column prop="time" label="角色代码">
          </w-table-column>
          <w-table-column prop="name" label="角色名称" width="100">
          </w-table-column>
          <w-table-column fixed="right" label="操作" align="center" width="120" reference-cell>
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
      </w-col>
      <w-col :span="12">
        <div class="pl-15 pd-right">
          <!-- <div class="mb-15 title">医生列表（13）</div> -->
           <!-- <w-input v-model="value2" sufAppendIsButton>
            <template slot="suf-append">
              <i class="w-icon-search"></i>
            </template>
          </w-input> -->
          <title-style class=" po_re pd-bottom_18"><span slot="header">
            <w-tabs v-model="activeName2" @tab-click="handleClick" type="dark">
            <w-tab-pane label="对应职称" name="first"></w-tab-pane>
            <w-tab-pane label="非对应职称医生" name="second"></w-tab-pane>
          </w-tabs>
          </span>
            <w-button class="po_ab top_-5 right_0" @click="handleAdd('left')"  type="text" plain>+ 新增</w-button>
          </title-style>
          <w-table :data="tableData" class="mt-15 " :border="true" style="width: 100%">
            <w-table-column type="index" width="70" align="center" label="序号">
            </w-table-column>
            <w-table-column prop="time" label="医生姓名" width="100">
            </w-table-column>
            <w-table-column prop="name" label="医生工号">
            </w-table-column>
            <w-table-column prop="status" label="职称">
            </w-table-column>
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
    <w-modal  :visible.sync="visible"
      :title="title"
      :showClose="false"
      :close-on-click-modal="false"
      width="40%">
      <div v-if="title !=='新增角色'" class="pd-right">
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
        <w-table ref="multiTable" :data="tableData"
          :border="true" class="mt-15" style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          @selection-change="handleSelectionChange">
          <w-table-column type="selection" width="50">
          </w-table-column>
          <w-table-column prop="time" label="姓名" width="100">
          </w-table-column>
          <w-table-column  prop="name" label="职称" >
          </w-table-column>
          <w-table-column  prop="status" label="工号" width="100">
          </w-table-column>
          <w-table-column prop="type" label="科室">
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
      visible: false,
      title: '', // 模态框标题
      value2: '', // 模态框表格搜索
      region: '', // 请选择科室值
      activeName2: 'first',
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
    handleClick(tab) {
      if (tab.name === 'first') {
        console.log(tab.name)
      } else {
        console.log(tab.name)
      }
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
        this.title = '新增角色'
        this.visible = true
      } else {
        this.title = '新增医生'
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
.home-page-wrap-ba {
  .home-page-body {
    padding: 16px;
    background: rgba(255,255,255,1);
    border-radius: 2px;
  }
}

    
</style>
<style lang="scss">
 .pd-right {
  .card-icon{
    display: inline-block!important;
    margin-right: 0px!important;
    width: 0px!important;
    height: 0px!important;
    background: #5a7bef;
  }
  .w-tabs--border-card>.w-tabs__content, .w-tabs--dark>.w-tabs__content {
    padding: 0!important;
  }
}

// .pd-right
//   .w-input
//     width 200px!important
// .w-row
//   padding-bottom 16px
</style>
