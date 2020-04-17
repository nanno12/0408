<template>
  <div class="home-page-wrap-ba">
    <div class="home-page-body">
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
    <div class="home-page-body">
      <ul
        class="ul"
        style="display:inline-block;"
      >
        <li
          :class="active===index ? 'styleHover' : '' "
          :key="index"
          v-for="(item, index) in titleList"
        >
          <w-button
            @click="handleTab(item, index)"
            class="title"
            type="text"
          >{{item.name}}</w-button>
        </li>
      </ul>
      <w-table
        :border="true"
        :data="tableData"
        class="table"
        v-if="active === 0"
      >
        <w-table-column
          label="序号"
          type="index"
          width="80"
        ></w-table-column>
        <w-table-column
          label="规则描述"
          prop="time"
        ></w-table-column>
        <w-table-column
          label="合理性条件判断"
          prop="name"
          width="180"
        ></w-table-column>
        <w-table-column
          label="无检验…"
          prop="status"
          width="180"
        ></w-table-column>
        <w-table-column
          label="不合理对应操作"
          prop="type"
        ></w-table-column>
        <w-table-column
          label="科室"
          prop="type"
        ></w-table-column>
        <w-table-column
          label="病种"
          prop="type"
        ></w-table-column>
        <w-table-column
          label="是否手术"
          prop="type"
        ></w-table-column>
        <w-table-column
          align="center"
          label="操作"
          width="230"
        >
          <template slot-scope="scope">
            <w-button type="text">复制</w-button>
            <w-button type="text">修改</w-button>
            <w-button type="text">停用</w-button>
            <w-button type="text">删除</w-button>
          </template>
        </w-table-column>
      </w-table>
    </div>

    <w-modal
      :close-on-click-modal="false"
      :title="title"
      :showClose="false"
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
          <w-col :span="12">
            <w-form-item
              label="规则描述"
              prop="region"
            >
              <w-input
                :maxlength="20"
                placeholder="请输入规则描述"
                showCounter
                v-model="form.name"
              ></w-input>
            </w-form-item>
          </w-col>
          <w-col :span="12">
            <w-form-item
              label="科室"
              prop="region"
            >
              <w-select
                placeholder="请选择科室"
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
        <w-row>
          <w-col :span="12">
            <w-form-item
              label="病种"
              prop="name"
              required
            >
              <w-select
                placeholder="请选择病种"
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
          <w-col :span="12">
            <w-form-item
              label="不合理对应操作"
              prop="name"
              required
            >
              <w-select
                placeholder="请选择"
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
        <w-row>
          <w-col :span="24">
            <w-form-item prop="name">
              <template slot-scope="scope">
                <w-checkbox-group v-model="value">
                  <w-checkbox :label="1">无检验结果判定成立</w-checkbox>
                  <w-checkbox :label="2">需要手术</w-checkbox>
                </w-checkbox-group>
              </template>
            </w-form-item>
          </w-col>
        </w-row>
        <w-row>
          <w-col :span="24">
            <w-form-item label="规则生效条件"></w-form-item>
            <div>
              <w-checkbox-group v-model="value">
                <w-checkbox :label="1">
                  <div>我的患者</div>
                  <w-select v-model="value" placeholder="请选择">
                    <w-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </w-option>
                  </w-select>
                </w-checkbox>
                <w-checkbox :label="2">本科室</w-checkbox>
                <w-checkbox :label="3">本地区</w-checkbox>
              </w-checkbox-group>
            </div>
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
export default {
  data() {
    return {
      value2: "", // 搜索值
      active: 0,
      value: [1],
      visible: true,
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
      form: {
        name: "",
        region: ""
      },
      rules: {
        region: [
          {
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ]
      },
      tableData: [
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
        },
        {
          time: "2019.05.13 08:15:10",
          status: "已签约",
          name: "陈慕杰",
          type: "本地医保"
        },
        {
          time: "2019.05.14 09:23:09",
          status: "未签约",
          name: "李自然",
          type: "本地医保"
        },
        {
          time: "2019.05.15 08:45:48",
          status: "未签约",
          name: "尤道礼",
          type: "本地医保"
        }
      ]
    };
  },
  created() {},
  methods: {
    submit() {},
    reset() {},
    //
    handleTab(item, index) {
      console.log(item, index);
      this.active = index;
      // this.titleVal = index
    },
    // 界面新增按钮
    handleAdd() {
      console.log("新增");
    }
  }
};
</script>
<style lang='stylus' scoped>
.addclass {
  color: red;
}

.home-page-wrap-ba {
  height: 100%;
  padding: 12px 15px;
  background: rgba(234, 237, 244, 1);
  overflow-x: auto;
  overflow-y: hidden;

  .home-page-body {
    padding: 16px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    position: relative;

    .ul {
      position: absolute;
      top: 0;
      left: 20px;
    }

    .table {
      width: calc(100% - 200px);
      margin-left: 200px;
    }

    .title {
      text-align: center;
      display: inline-block;
      margin: 16px 0px;
      width: 180px;
      height: 52px;
      background: rgba(243, 245, 249, 1);
      border-radius: 2px;
    }
  }
}

.styleHover {
  color: #666;
}
</style>
<style lang='stylus'>
.w-input {
  width: 200px !important;
}

.ul {
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
