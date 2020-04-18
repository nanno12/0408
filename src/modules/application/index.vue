<template>
  <div class=" pd_16">
    <w-row class="home-page-body">
      <w-col :span="7" >
        <title-style class=" mg-right_16 pd-y_22 po_re"><span slot="header">申请单列表</span>
          <w-button class="po_ab top_16 right_0" @click="handleAdd('left')"  type="primary" plain>新增</w-button>
        </title-style>
         <ul class="mg-right_16">
            <li class="application" v-for="(item, index) in 4" :key="index" >
              <h4>title</h4>
              <p class="mg-bottom_5">申请单号：12345678910</p>
              <p>元素：临床信息、标本信息、医嘱信息、既往病理检查结果
                手术信息、妇科信息、肿瘤信息、细胞学活HPV检查结果</p>
            </li>
          </ul>
      </w-col>
      <w-col :span="17">
        <title-style class="pd-y_22 po_re"><span slot="header">申请单项目列表</span>
          <w-button class="po_ab top_16 right_0" @click="handleAdd('rigth')"  type="primary" plain>新增</w-button>
        </title-style>
        <w-table
          :border="true"
          :data="tableData"
          class="mg-right_16"
          >
          <w-table-column
            label="序号"
            type="index"
            width="80" >
          </w-table-column>
          <w-table-column
            label="项目编码"
            width="150px"
            prop="TEMPLATE_NAME"
          ></w-table-column>
          <w-table-column
            label="项目名称"
            prop="name" >
            <template slot-scope="scope">
              <span v-for="(item,index) in scope.row.doctorAdvice" :key="index">
                {{index+1 + "、"}}{{item.ITEM_NAME}}
              </span>
            </template>
          </w-table-column>
          <w-table-column
            label="计价单位"
            width="120px"
            prop="TEMPLATE_NAME">
            <template slot-scope="scope">
              <span v-for="(item,index) in scope.row.doctorAdvice" :key="index">
                {{index+1 + "、"}}{{item.ITEM_NAME}}
              </span>
            </template>
          </w-table-column>
          <w-table-column
            label="项目价格(元)"
            width="150"
            prop="APPLY_DEPT_NAME"
          ></w-table-column>
          <w-table-column
            label="项目说明"
            prop="APPLY_DEPT_NAME"
          ></w-table-column>
          <w-table-column
            align="center"
            label="操作"
            width="120" >
            <template slot-scope="scope">
              <w-button type="text">修改</w-button>
              <w-button type="text">删除</w-button>
            </template>
          </w-table-column>
        </w-table>
      </w-col>
    </w-row>
    <w-modal
      :close-on-click-modal="false"
      :showClose="false"
      :title="title"
      :visible.sync="visible"
      width="60%"
    >
      <w-form
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="150px"
        ref="form">
        <w-row>
          <w-col :span="24">
            <w-form-item
              label="申请单名称"
              prop="region">
              <w-input
                :maxlength="20"
                placeholder="请输入申请单名称"
                showCounter
                v-model="form.name"
              ></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item label="包含元素" prop="name">
              <template slot-scope="scope">
                <w-checkbox-group v-model="value">
                  <w-checkbox :label="1" >手术信息</w-checkbox>
                  <w-checkbox :label="2">临床信息</w-checkbox>
                  <w-checkbox :label="1" disabled>标本信息</w-checkbox>
                  <w-checkbox :label="2" disabled>医嘱信息</w-checkbox>
                  <w-checkbox :label="1" disabled>妇科信息</w-checkbox>
                  <w-checkbox :label="2">肿瘤信息</w-checkbox>
                  <w-checkbox :label="1" >细胞学活HPV检查结果</w-checkbox>
                  <w-checkbox :label="2" disabled>既往病理检查结果</w-checkbox>
                </w-checkbox-group>
              </template>
            </w-form-item>
          </w-col>
        </w-row>
        <w-col :span="24">
          <w-form-item
            label="申请单模版"
            prop="region" >
            <w-input
              :maxlength="20"
              placeholder="点击浏览选择申请单模版"
              showCounter
              v-model="form.name"
            ></w-input>
            
          </w-form-item>
        </w-col>
        <w-row>
          <w-col :span="12">
            <w-form-item
              label="项目编码"
              prop="region">
              <w-input
                :maxlength="20"
                placeholder="请输入项目编码"
                showCounter
                v-model="form.name"
              ></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item
              label="项目名称"
              prop="region">
              <w-input
                :maxlength="20"
                placeholder="请输入项目名称"
                showCounter
                v-model="form.name"
              ></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="12">
            <w-form-item
              label="项目价格"
              prop="region">
              <w-input
                :maxlength="20"
                placeholder="请输入项目价格"
                showCounter
                v-model="form.name"
              ></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item
              label="计价单位"
              prop="region">
              <w-input
                :maxlength="20"
                placeholder="请选择计价单位"
                showCounter
                v-model="form.name"
              ></w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item
              label="收费项目"
              prop="region">
               <w-input
                sufAppendIsButton
                placeholder="请输入关键字搜索收费项目"
                v-model="value2">
                <template slot="suf-append">
                  <i class="w-icon-search"></i>
                </template>
              </w-input>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item
              label="描述"
              prop="region">
              <w-input
                :maxlength="20"
                type="textarea"
                placeholder="请输入描述内容"
                showCounter
                v-model="form.name"
              ></w-input>
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
import apiData from './api/api'
export default {
  data() {
    return {
      value2: "", // 搜索值
      value: [1],
      visible: false,
      title:'新增',
      options: [
        {
          time: "2019.05.12 11:02:33",
          status: "其他区签约",
          name: "赵宇翔",
          type: "其他"
        },
        {
          time: "2019.05.12 12:24:30",
          status: "未签约",
          name: "肖新宇",
          type: "本地医保"
        }
      ],
      form: {
        name: "",
        region: ""
      },
      rules: {
        // region: [
        //   {
        //     required: true,
        //     message: "请选择区域",
        //     trigger: "change"
        //   }
        // ],
        // name: [
        //   {
        //     required: true,
        //     message: "请选择区域",
        //     trigger: "change"
        //   }
        // ]
      },
      tableData: []
    };
  },
  created() {
    this.list()
  },
  methods: {
    async list () {
      const res = await apiData.getQuery()
      this.tableData = res.data
    },
    submit() {

    },
    reset() {},
    // 界面新增按钮
    handleAdd() {
      console.log("新增");
      this.visible = true
    }
  }
};
</script>
<style lang='stylus' scoped>
.addclass {
  color: red;
}

.home-page-body {
  background: rgba(255, 255, 255, 1);
  padding: 16px;
  .application {
    margin-bottom: 10px;
    padding: 15px 10px;
    background:rgba(243,245,249,1);
    // background:rgba(207,224,255,1);
    h4 {
      margin: 0;
      margin-bottom:10px;
    }
  }
}
.w-select {
  width: 100%;
}
</style>
<style lang='stylus'>

</style>
