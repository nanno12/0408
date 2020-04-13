<template>
  <div class="home-page-wrap-test tabs-demo">
    <w-input v-model="search" sufAppendIsButton>
      <template slot="suf-append">
        <i class="w-icon-search"></i>
      </template>
    </w-input>
    <w-button @click="handleAdd"
      class="fr mb-15"
      plain
      type="primary"
    >新增</w-button>
    <w-tabs
      @tab-click="handleClick"
      type="dark"
      v-model="activeName1" >
      <w-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.value" >
        <w-table :data="tableData" :border="true" style="width: 100%">
          <w-table-column prop="time" label="项目名称">
          </w-table-column>
          <w-table-column prop="name" label="项目标识">
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
      </w-tab-pane>
    </w-tabs>

    <w-modal  :visible.sync="visible"
      title="新增"
      :close-on-click-modal="false"
      class="home-page-body"
      width="50%">
      <ul class="ul-style" style="display:inline-block;" >
        <li
          :class="active===index ? 'styleHover' : '' "
          :key="index"
          v-for="(item, index) in titleList" >
          <w-button
            @click="handleTab(item, index)"
            class="title"
            type="text"
          >{{item.name}}</w-button>
        </li>
      </ul>
      <w-table
        :border="true"
        ref="multiTable"
        :data="tableData"
        class="table"
        v-if="active === 0"
        @selection-change="handleSelectionChange"
      >
        <w-table-column
          type="selection"
          width="50"
        ></w-table-column>
        <w-table-column
          label="项目编码"
          prop="time"
        ></w-table-column>
        <w-table-column
          label="项目名称"
          prop="status"
        ></w-table-column>
        <w-table-column
          label="项目备注"
          prop="status"
        ></w-table-column>
      </w-table>
      <span slot="footer" class="dialog-footer">
        <w-button @click="reset">取 消</w-button>
        <w-button @click="handleAdd" type="primary">添加到必检项目</w-button>
        <w-button @click="handleAdd" type="primary">添加到关注项目</w-button>
      </span>
    </w-modal>
  </div>
</template>

<script>

import tab from '../ademo/ceshi'

export default {
  data() {
    return {
      activeName1: '1', // tab默认值
      search:'', // 搜索值
      visible: false,
      active: 0,
      selection: [],
      titleList: [
        {
          id: 1,
          name: "临床血液"
        },
        {
          id: "SX0002",
          name: "临床体液"
        },
        {
          id: 2,
          name: "临床免疫"
        },
        {
          id: 3,
          name: "临床生化"
        }
      ],
      tableData: [{
          time: '2019.:33',
          status: '其他区签约',
          name: '赵宇翔',
          type: '其他'
        }, {
          time: '22:24:30',
          status: '未签约',
          name: '肖新宇',
          type: '本地医保'
        }, {
          time: '3 08:15:10',
          status: '已签约',
          name: '陈慕杰',
          type: '本地医保'
        }, {
          time: '4 09:23:09',
          status: '未签约',
          name: '李自然',
          type: '本地医保'
        }, {
          time: '28:45:48',
          status: '未签约',
          name: '尤道礼',
          type: '本地医保'
        }],
      tabList: [
        {
          title: '全部',
          value: '1'
        },
        {
          title: '必检项目',
          value: '2'
        },
        {
          title: '关注项目',
          value: '3'
        }
      ]
    };
  },
  created() {},
  components: {
    tab,
  },
  methods: {
    // 模态框表格多选值
    handleSelectionChange (val) {
      console.log(val)
      this.selection = val
    },
    handleAdd() {
      console.log("add")
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 弹框tabs切换点击时间
    handleTab(item, index) {
      console.log(item, index);
      this.active = index;
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
    // 点击模态框取消按钮事件
     reset () {
      this.visible = false
    },
    // 列表删除
    handleDelete (row) {
     console.log(row)
    }
  }
}
</script>
<style lang="stylus" scoped>
.home-page-wrap-test {
  height: 100%;
  padding: 12px 15px;
  background: rgba(234, 237, 244, 1);
  overflow-x: auto;
  overflow-y: hidden;
  .home-page-body {
    // padding: 16px;
    // background: rgba(255, 255, 255, 1);
    // border-radius: 2px;
    // position: relative;

    .ul-style {
      position: absolute;
      top: 65px;
      left: 20px;
    }

    .table {
      width: calc(100% - 150px);
      margin-left: 150px;
    }

    .title {
      text-align: center;
      display: inline-block;
      margin: 10px 0px;
      width: 104px;
      height: 40px;
      background: rgba(243, 245, 249, 1);
      border-radius: 2px;
    }
  }
}
</style>

<style lang='scss'>
.home-page-wrap-test {
  .w-input {
    width: 200px !important;
  }

  .w-modal__body {
    margin-bottom: -30px!important;
  }

}
.ul-style {
  .w-button:hover, .w-button:focus {
    background: rgba(207, 224, 255, 1) !important;
  }

  .w-button--text:hover {
    color: #0F49ED;
  }

  .w-button--text {
    color: #000622;
  }
  .styleHover {
    .w-button {
      color: #0F49ED;
      background: rgba(207, 224, 255, 1) !important;
    }
  }
}
</style>
