<template>
  <div>
    <w-form
      :size="size"
      label-align="right"
      :model="searchData"
      :rules="rules"
      label-width="90px"
      ref="searchForm"
      >
        <w-row :gutter="20">
          <div  v-for="(item,index) in searchForm" :key="index">
            <w-col :span="item.col">

          <w-form-item
            :label="item.label"
            :prop="item.prop">
            <!-- 输入框 -->
                <w-input
                  v-if="item.type === 'Input'"
                  v-model="searchData[item.prop]"
                  :placeholder="item.placeholder"
                ></w-input>
          </w-form-item>
            </w-col>

          
            <!-- 数字输入框 -->
            <w-col :span="item.col">
              <w-input-number
                v-if="item.type === 'number'"
                :placeholder="item.placeholder"
                v-model.number="searchData[item.prop]">
              </w-input-number>
            </w-col>
            <w-col :span="item.col">
            <w-input
              type="textarea"
              v-if="item.type === 'textarea'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
            ></w-input>
            </w-col>
            <!-- 密码框 -->
            <w-input
              v-if="item.type === 'password'"
              disabled
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              auto-complete="off">
              <template slot="append">
                <span @click="item.onClick">{{ item.name }}</span>
              </template>
            </w-input>

            <!-- 下拉框 -->
            <!-- $forceUpdate() 下拉刷新,修复数据改变下拉框不变的bug -->

            <w-col :span="item.col">
            <w-select
              v-if="item.type === 'Select'"
              v-model="searchData[item.prop]"
              @change="item.change(searchData[item.prop])"
              @visible-change="$forceUpdate()">
              <w-option
                v-for="op in item.options"
                :label="op.label"
                :value="op.value"
                :key="op.value">{{ op.label }}</w-option>
            </w-select>
            </w-col>
            <!-- 单选 -->
            <w-radio-group
              v-if="item.type === 'Radio'"
              v-model="searchData[item.prop]">
              <w-radio
                v-for="ra in item.radios"
                :label="ra.value"
                :key="ra.value">{{ ra.label }}</w-radio>
            </w-radio-group>

            <!-- 组合单选按钮 -->
            <w-radio-group
              v-if="item.type === 'RadioButton'"
              v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])">
              <w-radio-button
                v-for="ra in item.radios"
                :label="ra.value"
                :key="ra.value">{{ ra.label }}</w-radio-button>
            </w-radio-group>

            <!-- 复选框 -->
            <w-checkbox-group
              v-if="item.type === 'Checkbox'"
              v-model="searchData[item.prop]">
              <w-checkbox
                v-for="ch in item.checkboxs"
                :label="ch.value"
                :key="ch.value"
                >{{ ch.label }}</w-checkbox>
            </w-checkbox-group>

            <!-- 日期 -->
            <w-date-picker
              v-if="item.type === 'Date'"
              v-model="searchData[item.prop]"
              value-format="yyyy-MM-dd"
              @change="item.change(searchData[item.prop])"
              :placeholder="item.placeholder">
            </w-date-picker>

            <!-- 时间 -->
            <w-time-select
              v-if="item.type === 'Time'"
              v-model="searchData[item.prop]" >
            </w-time-select>

            <!-- 日期时间 -->
            <w-date-picker
              v-if="item.type === 'DateTime'"
              type="datetime"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              value-format="yyyy-MM-dd hh:mm:ss"
              :disabled="item.disable && item.disable(searchData[item.prop])"
              @change="item.change(searchData[item.prop])" >
            </w-date-picker>

            <!-- 起止时间 -->
            <w-date-picker
              v-if="item.type === 'Daterange'"
              v-model="searchData[item.prop]"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="item.change(searchData[item.prop])">
            </w-date-picker>

            <!-- 滑块 -->
            <w-slider
              v-if="item.type === 'Slider'"
              v-model="searchData[item.prop]">
            </w-slider>

            <!-- 开关 -->
            <w-switch
              v-if="item.type === 'Switch'"
              v-model="searchData[item.prop]">
            </w-switch>

            <!-- 三级联动 cascader -->
            <w-cascader
              v-if="item.type === 'cascader'"
              :options="item.props.options"
              v-model="searchData[item.prop]"
              :placeholder="item.props.placeholder || '请选择'"
              :disabled="item.props.disabled || false"
              style="width: 100%;"
              :props="item.props.defaultParams"
              @change="item.change(searchData[item.prop], item)">
            </w-cascader>

          </div>

        </w-row>
      <!-- button 操作按钮 -->
      <w-form-item class="search_input_button" v-if="isHandle">
        <w-button
          v-for="item in searchHandle"
          :key="item.label"
          :type="item.type"
          @click="item.handle()"
          >
          <span>{{ item.label }}</span>
        </w-button>
      </w-form-item>
      <w-form-item style="text-align: right;">
        <w-button @click="reset">重 置</w-button>
        <w-button type="primary" @click="submit">发 送</w-button>
      </w-form-item>
    </w-form>
  </div>
</template>

<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: "120px"
    },
    size: {
      type: String,
      default: "medium"
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    searchHandle: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    /**解析表单的正则验证***/
    rules() {
      let rules = this.searchForm.reduce((map, i) => {
        if (i.rules) {
          map[i.prop] = i.rules;
        }
        return map;
      }, {});
      return rules;
    }
  },
  mounted() {
  },
  methods: {
    submit () {
      this.$refs.searchForm.validateForm((valid) => {
        if (valid) {
          // 通过验证
          console.log('submit !')
        } else {
          // 未通过
          console.log('invalid form !')
        }
      })
    },
    reset () {
      this.$refs.searchForm.resetFields()
    }
  }
};
</script>