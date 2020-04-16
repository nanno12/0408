<template>
  <div class="home-page-wrap-pl  pd_16">
    <div class="home-page-body pd_16">
      <w-input
        sufAppendIsButton
        v-model="value2"
      >
        <template slot="suf-append">
          <i class="w-icon-search"></i>
        </template>
      </w-input>
      <w-button
        @click="handleAdd"
        class="fr mb-15"
        plain
        type="primary"
      >新增</w-button>
    </div>
    <w-table
      :border="true"
      :data="tableData"
      class="table">
      <w-table-column
        label="序号"
        type="index"
        width="80"
      ></w-table-column>
      <w-table-column
        label="申请单名称"
        width="150px"
        prop="TEMPLATE_NAME"
      ></w-table-column>
      <w-table-column
        label="包含元素"
        prop="name" >
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.doctorAdvice" :key="index">
            {{index+1 + "、"}}{{item.ITEM_NAME}}
          </span>
        </template>
      </w-table-column>
      <w-table-column
        label="适用检查"
        prop="TEMPLATE_NAME">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.doctorAdvice" :key="index">
            {{index+1 + "、"}}{{item.ITEM_NAME}}
          </span>
        </template>
      </w-table-column>
      <w-table-column
        label="申请单模版"
        width="120"
        prop="APPLY_DEPT_NAME"
      ></w-table-column>
      <w-table-column
        align="center"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <w-button type="text">修改</w-button>
          <w-button type="text">删除</w-button>
        </template>
      </w-table-column>
    </w-table>
    <w-modal
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="60%"
    >
      <w-form
        :model="form"
        :rules="rules"
        label-align="right"
        label-width="150px"
        ref="form"
      >
        <w-row>
          <w-col :span="24">
            <w-form-item
              label="申请单名称"
              prop="region"
            >
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
        <w-row>
          <w-col :span="24">
            <w-form-item
              label="适用项目"
              prop="region"
            >
              <w-select
                placeholder="请选择适用项目"
                v-model="form.region"
              >
                <w-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options"
                ></w-option>
              </w-select>
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
      titleList: [
        {
          id: "SX0001",
          name: "红细胞类"
        },
        {
          id: "SX0002",
          name: "冷沉淀"
        },
        {
          id: "SX0003",
          name: "血小板"
        },
        {
          id: "SX0004",
          name: "血浆类"
        },
        {
          id: "SX0005",
          name: "白细胞类"
        }
      ],
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

.home-page-wrap-pl {
  height: 100%;
  padding: 12px 15px;
  background: rgba(234, 237, 244, 1);
  overflow-x: auto;
  overflow-y: hidden;

  .home-page-body {
    padding: 16px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    .w-input {
        width: 200px !important;
      }
  }
  .w-select {
    width: 100%;
  }
}
</style>
<style lang='stylus'>

</style>
