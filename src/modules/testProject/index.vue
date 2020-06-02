<template>
  <div class="home-page-wrap-test tabs-demo">
    <w-row>
      <w-col :span="14"  class="pd-right_16">
        <title-style class=" po_re pd-bottom_18">
          <span slot="header">
            <w-tabs v-model="activeName2" @tab-click="handleTabsClick('left')" type="dark">
              <w-tab-pane label="必检项目" name="first"></w-tab-pane>
              <w-tab-pane label="关注项目" name="second"></w-tab-pane>
            </w-tabs>
          </span>
          <w-button class="po_ab top_0 right_0" @click="handleModelAdd('left')"  type="text" plain>+ 新增</w-button>
        </title-style>
        <win-table
          :listTable=leftTableTitle
          :tableData=leftList
          :isShow=isShow>
        </win-table>
      </w-col>
      <w-col :span="10">
        <title-style class=" po_re pd-bottom_18">
          <span slot="header">
            <w-tabs v-model="activeName1" @tab-click="handleTabsClick('right')" type="dark">
              <w-tab-pane label="检验项目匹配" name="first"></w-tab-pane>
              <w-tab-pane label="收费项目匹配" name="second"></w-tab-pane>
            </w-tabs>
          </span>
          <w-button class="po_ab top_0 right_0" @click="handleModelAdd('right')"  type="text" plain>+ 新增</w-button>
        </title-style>
        <win-table
          :listTable=rightTableTitle
          :tableData=rightList
          :isShow=isShow>
        </win-table>
      </w-col>
    </w-row>
    <!-- <w-input v-model="search" sufAppendIsButton>
      <template slot="suf-append">
        <i class="w-icon-search"></i>
      </template>
    </w-input> -->
    <w-modal  :visible.sync="visible"
      :title="modalTitle"
      :showClose="false"
      :close-on-click-modal="false"
      class="home-page-body"
      :width="modalTitle==='新增必检项目'?'25%':'50%'">
      <w-form
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="100px"
        v-if="this.modalTitle === '新增必检项目'"
        ref="form">
        <w-form-item label="项目名称" prop="region" >
          <w-input v-model="form.region" showCounter placeholder="请输入项目名称"></w-input>
        </w-form-item>
        <w-form-item label="项目代码" prop="region" >
          <w-input v-model="form.region" showCounter placeholder="请输入项目代码"></w-input>
        </w-form-item>
      </w-form>
      <div v-else style="height:300px">
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
          @selection-change="handleSelectionChange">
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
      </div>
      <span slot="footer" class="dialog-footer">
        <w-button @click="reset">取 消</w-button>
        <w-button @click="handleMainAdd" v-if="this.modalTitle === '新增必检项目'" type="primary">确定</w-button>
        <div v-else class="inline-block">
          <w-button @click="handleMainAdd('check')" type="primary">添加到必检项目</w-button>
          <w-button @click="handleMainAdd('follow')" type="primary">添加到关注项目</w-button>
        </div>
      </span>
    </w-modal>
  </div>
</template>

<script>

import tab from '../ademo/ceshi'

export default {
  data() {
    return {
      activeName2:'first',
      activeName1: 'first', // tab默认值
      modalTitle:'新增必检项目',
      form: {
        region: ""
      },
      rules: {
        region: [
          {
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ]
      },
      leftTableTitle:[
        {
          label:'项目名称',
          prop:'status'
        },
        {
          label:'项目编码',
          prop:'time'
        }
      ],
      leftList:[
        {
          time: '2019',
          status: '其他区签约',
        }
      ],
      isShow:{
        index:true,
        width:'80px',
        edit:true
      },
      rightTableTitle:[
         {
          label:'项目名称',
          prop:'time'
        },
        {
          label:'项目代码',
          prop:'status'
        }
      ],
      rightList:[
        {
          time: '2019',
          status: '其他区签约',
        }
      ],
      search:'', // 搜索值
      visible: true,
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
     // 模态框功能型按钮
    handleMainAdd(title) {
      this.visible = true
      console.log("add")
    },
    // 点击主界面新增弹出模态框
    handleModelAdd (title) {
      this.visible = true
      if(title === 'left') {
        this.modalTitle = '新增必检项目'
      } else {
        this.modalTitle = '新增检验项目'
        
      }
      console.log("add")
    },
    // 点击主界面tabs切换表格
    handleTabsClick(tab, event) {
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
<style lang="scss">
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
</style>
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

  // .w-modal__body {
  //   margin-bottom: -30px!important;
  // }

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
