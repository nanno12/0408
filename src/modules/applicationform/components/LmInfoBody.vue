/*
 * 左侧+中间信息
 * @Author: mikey.zhaopeng 
 * @Date: 2020-03-19 09:18:38 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-07 11:39:22
 */
<template>
  <div class="left-mid-wrap">
    <div class="left-mid-body">
       <!-- 左侧条件区域 -->
      <div class="left-info-wrap">
        <el-form :model="form" label-width="85px" v-focusNextOnEnter>
          <div class="item-info">
            <div class="title">基本信息</div>
            <el-form-item label="ABO血型" :required="isRequired">
              <w-select v-model="form.ABO_GROUP" placeholder="请选择" ref="ABORef">
                <w-option
                  v-for="item in listData.ABOLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="RH(D)血型" :required="isRequired">
              <w-select v-model="form.RHD_GROUP" placeholder="请选择" ref="RHDRef" :class="[form.RHD_GROUP == '阴性' ? 'mark-color':'']">
                <w-option
                  v-for="item in listData.RHDLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="抗体筛查">
              <w-select v-model="form.SERUM_ANTIBODY" placeholder="请选择" :class="[form.SERUM_ANTIBODY == '阳性' ? 'mark-color':'']">
                <w-option
                  v-for="item in listData.ANTIBODYLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="临床诊断">
              <w-input
                v-model="form.CLINIC_DESC"
                placeholder="请输入内容"
                @focus="focus($event)"
              ></w-input>
            </el-form-item>
            <el-form-item label="受血者属地">
              <w-select v-model="form.RECIPIENT_AREA" placeholder="请选择">
                <w-option
                  v-for="item in listData.RECEPTORPLACELIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="医生备注">
              <w-input
                v-model="form.DOCTOR_MEMO"
                placeholder="请输入内容"
                @focus="focus($event)"
              ></w-input>
            </el-form-item>
          </div>
          <div class="item-info">
            <div class="title">既往史</div>
            <el-form-item label="输血史" required>
              <w-select v-model="form.HISTORY_TRANSFUSION" placeholder="请选择" ref="transfusionRef">
                <w-option
                  v-for="item in listData.TRANSFSIONLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="输血反应史" required>
              <w-select v-model="form.HISTORY_REACTION" placeholder="请选择" ref="reactTransfusionRef">
                <w-option
                  v-for="item in listData.TRANSFSIONRECTIONLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-row>
              <el-col :span="form.HISTORY_PREGNANCY == '有' ? 12 : 24" >
                <el-form-item label="妊娠史" required>
                  <w-select v-model="form.HISTORY_PREGNANCY" placeholder="请选择" ref="pregnancyRef">
                    <w-option
                      v-for="item in listData.GESTATIONLIST || []"
                      :key="item.CODE"
                      :label="item.NAME"
                      :value="item.NAME">
                    </w-option>
                  </w-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="form.HISTORY_PREGNANCY == '有'">
                <el-row>
                  <el-col :span="6">
                    <!-- G代表怀孕次数 -->
                    <el-form-item label="" label-width="5px" title="怀孕次数">
                      <w-input
                        v-model="form.GESTATION_NUMBER"
                        placeholder="G"
                        @focus="focus($event)"
                      ></w-input>
                    </el-form-item>
                  </el-col>
                  <!-- P代表生产次数 -->
                  <el-col :span="6">
                    <el-form-item label="" label-width="2px" title="生产次数">
                      <w-input
                        v-model="form.PRODUCTION_NUMBER"
                        placeholder="P"
                        @focus="focus($event)"
                      ></w-input>
                    </el-form-item>
                  </el-col>
                  <!-- A代表流产次数-->
                  <el-col :span="6">
                    <el-form-item label="" label-width="2px" title="流产次数">
                      <w-input
                        v-model="form.ABORTION_NUMBER"
                        placeholder="A"
                        @focus="focus($event)"
                      ></w-input>
                    </el-form-item>
                  </el-col>
                  <!-- L代表存活数-->
                  <el-col :span="6">
                    <el-form-item label="" label-width="2px" title="存活数">
                      <w-input
                        v-model="form.LIVE_NUMBER"
                        placeholder="L"
                        @focus="focus($event)"
                      ></w-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="form.HISTORY_DRUG_ALLERGY == '有' ? 12 : 24" >
                <el-form-item label="过敏史" required>
                  <w-select v-model="form.HISTORY_DRUG_ALLERGY" placeholder="请选择" ref="allergicRef">
                    <w-option
                      v-for="item in listData.ALLERGYLIST || []"
                      :key="item.CODE"
                      :label="item.NAME"
                      :value="item.NAME">
                    </w-option>
                  </w-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="form.HISTORY_DRUG_ALLERGY == '有'">
                <el-form-item label="" label-width="5px" class="penicillin-span">
                  <w-input
                    v-model="form.DRUGALLERGY_NAME"
                    placeholder="请输入过敏药物名称"
                    @focus="focus($event)"
                  ></w-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="form.HISTORY_TRANSPLANTATION  == '有' ? 12 : 24" >
                <el-form-item label="骨髓移植史" required>
                  <w-select v-model="form.HISTORY_TRANSPLANTATION" placeholder="请选择" ref="gsyzRef">
                    <w-option
                      v-for="item in listData.MARROWLIST || []"
                      :key="item.CODE"
                      :label="item.NAME"
                      :value="item.NAME">
                    </w-option>
                  </w-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="form.HISTORY_TRANSPLANTATION == '有'">
                <el-form-item label="" label-width="5px">
                  <w-select v-model="form.DONOR_BLOOD_GROUP" placeholder="请选择供体者血型">
                    <w-option
                      v-for="item in listData.DONORLIST || []"
                      :key="item.CODE"
                      :label="item.NAME"
                      :value="item.NAME">
                    </w-option>
                  </w-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="item-info">
            <div class="title">用血信息</div>
            <el-form-item label="用血时间" :required="isRequired">
              <w-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="form.TRANSFUSION_TIME"
                :clearable="false"
                :editable='false'
              ></w-date-picker>
            </el-form-item>
            <el-form-item label="输血目的" :required="isRequired">
              <w-select v-model="form.TRANSFUSION_PURPOSE" placeholder="请选择" ref="transfsionGoallRef">
                <w-option
                  v-for="item in listData.TRANSFSIONGOALLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="输血性质" :required="isRequired">
              <w-select v-model="form.TRANSFUSION_NATURE" placeholder="请选择" ref="transfsionNatrueRef">
                <w-option
                  v-for="item in listData.TRANSFSIONNATURELIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="手术名称">
              <w-input
                v-model="form.OPERATION_NAME"
                placeholder="请输入内容"
                @focus="focus($event)"
              ></w-input>
            </el-form-item>
            <el-form-item label="手术等级" :required="isRequired">
              <w-select v-model="form.OPERATION_LEVEL" placeholder="请选择" ref="operativeGradeRef">
                <w-option
                  v-for="item in listData.OPERATIONLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item label="用血地点">
              <w-select v-model="form.TRANSFUSION_PLACE" placeholder="请选择">
                <w-option
                  v-for="item in listData.USEBLOODLIST || []"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.NAME">
                </w-option>
              </w-select>
            </el-form-item>
            <el-form-item>
              <a class="under-line" slot="label">知情同意书</a>
              <w-radio-group  v-model="form.INFORMED_CONSENT_ASSIGN">
                <w-radio label="已签订">已签署</w-radio>
                <w-radio label="未签订">未签署</w-radio>
              </w-radio-group>
            </el-form-item>
            <el-form-item label="未签署原因" :required="isUnassignReason" v-if="patMessage.MOULD_CODE != '1'">
              <w-input
                v-model="form.UNASSIGN_REASON"
                placeholder="请输入内容"
                ref="nosignReasonRef"
                @focus="focus($event)"
              ></w-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 中间导航-内容 -->
      <div class="mid-info-wrap">
        <div class="top">
          <!-- 导航 -->
          <w-tabs type="dark" v-model="active" @tab-click="tabClick">
            <w-tab-pane
              v-for="item in comonentClassList"
              :key="item.MAINCODE"
              :label="item.MAINNAME" 
              :name="item.MAINCODE">
              <!-- 内容 -->
              <ul class="contain" v-focusNextOnEnter>
                <li class="contain-item" 
                    v-for="itemchild in item.DETAILTYPELIST"
                    :key="itemchild.ITEM_CODE">
                  <div class="operate">
                    <w-checkbox v-model="itemchild.ITEM_ISCHECKED" 
                                true-value="1" false-value="0" 
                                @change="checkChange(item,itemchild)" 
                                :title="itemchild.MOULD_ITEM_NAME"
                                :disabled="isDisabled">{{itemchild.MOULD_ITEM_NAME}}</w-checkbox>
                    <div class='el-input-number is-controls-right'>
                      <span :class="['el-input-number__decrease',Number(itemchild.MOULD_ITEM_AMOUNT) <= 0 ? 'is-disabled' : '']"                         @click="handleSubAdd('decrease',itemchild,itemchild.ITEM_ADDFACTOR)">
                            <i class="el-icon-arrow-up w-icon-triangle-bottom"></i></span>
                      <span :class="['el-input-number__increase',Number(itemchild.MOULD_ITEM_AMOUNT) >= parseInt(itemchild.ITEM_INVENTORY) ? 'is-disabled' : '']" 
                            @click="handleSubAdd('increase',itemchild,itemchild.ITEM_ADDFACTOR)">
                            <i class="el-icon-arrow-down w-icon-triangle-top"></i></span>
                      <w-input
                        size="small"
                        type="number"
                        :min='itemchild.ITEM_ADDFACTOR'
                        :max="parseInt(itemchild.ITEM_INVENTORY)"
                        v-model="itemchild.MOULD_ITEM_AMOUNT"
                        @focus="focus($event)"
                        @blur="(val)=>{blur(val,itemchild,itemchild.ITEM_ADDFACTOR)}"></w-input>
                    </div>
                    <span v-if="itemchild.MOULD_ITEM_UNIT">{{itemchild.MOULD_ITEM_UNIT}}</span>
                  </div>
                  <div class="desc">
                    <ellipsis-lable>
                      <span title="库存：6000ml">库存：{{itemchild.ITEM_INVENTORY}}</span>
                      <span title="备注：1u=200ml">备注：{{itemchild.ITEM_REMARK}}</span>
                    </ellipsis-lable>
                  </div>
                </li>
              </ul>
            </w-tab-pane>
          </w-tabs>
        </div>
        <div class="bottom">
          <!-- tag区域 -->
          <div class="tag-wrap">
            <div class="tag-box">
            <template v-for="item in comonentClassList">
              <w-tag
                v-for="(itemtag,index) in item.DETAILTYPELIST" :key="index"
                type="primary"
                v-if="itemtag.ITEM_ISCHECKED == '1'"
                :closable="!isDisabled"
                @close="handleClose(itemtag)">
                {{itemtag.MOULD_ITEM_NAME}}  {{itemtag.MOULD_ITEM_AMOUNT}}{{itemtag.MOULD_ITEM_UNIT}}
              </w-tag>
            </template>
            </div>
          </div>
          <!-- 24小时申请量 -->
          <div class="desc">
            24小时申请量：{{twentFourApplyBlood}}ml 。<span class="b-color">本次申请量：{{allapplyBlood}}ml 。</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部操作 -->
    <footer class="left-mid-bottom">
      <w-button @click="printForm" :disabled="isDisabled">打印申请单</w-button>
      <w-button type="primary" @click="save" :disabled="isDisabled">保 存</w-button>
    </footer>
    <!-- 保存提示 Save prompt-->
    <save-prompt  
      :show.sync="savePromptShow"
      :unreasonableList="unreasonableList"
      @confirmSave="confirmSave"></save-prompt>
      <!-- 信息提示 -->
    <info-prompt  
      :show.sync="infoPromptShow"></info-prompt>
  </div>
</template>
<script>
import * as layerUtils from 'app/utils/layerUtils';
import {isDateObject} from "@/app/utils/dateUtils";
import {dateTimeFormat, timeFormat} from '@/app/utils/index'
import dataApi from '../api/api.js';
import SavePrompt from './SavePrompt.vue';
import InfoPrompt from './infoPrompt.vue';
export default {
  components: {
    SavePrompt,
    InfoPrompt
  },
  data() {
    return {
      // 表单信息
      form: {
        /** 基本信息 */
        ABO_GROUP: '',
        RHD_GROUP: '',
        SERUM_ANTIBODY: '',
        CLINIC_DESC: '',
        RECIPIENT_AREA: '',
        DOCTOR_MEMO: '',
        /** 既往史 */
        HISTORY_TRANSFUSION: '',
        HISTORY_REACTION: '',
        HISTORY_PREGNANCY: '',
        GESTATION_NUMBER: '',
        PRODUCTION_NUMBER: '',
        ABORTION_NUMBER: '',
        LIVE_NUMBER: '',
        HISTORY_DRUG_ALLERGY: '',
        DRUGALLERGY_NAME: '',
        HISTORY_TRANSPLANTATION: '',
        DONOR_BLOOD_GROUP: '',
        /** 用血信息 */
        TRANSFUSION_TIME: new Date(),
        TRANSFUSION_PURPOSE: '',
        TRANSFUSION_NATURE: '',
        OPERATION_NAME: '',
        OPERATION_LEVEL: '',
        TRANSFUSION_PLACE: '',
        INFORMED_CONSENT_ASSIGN: '0',
        UNASSIGN_REASON: ''
      },
      // 血型下拉
      bloodList: [
        {CODE: '0', DISPLAYCODE: '0', NAME: 'A型'},
        {CODE: '1', DISPLAYCODE: '1', NAME: 'B型'},
        {CODE: '2', DISPLAYCODE: '2', NAME: 'O型'}
      ],
      // 妊娠史/过敏史/骨髓移植史
      comList: [
        {CODE: '有', NAME: '有'},
        {CODE: '无', NAME: '无'},
        {CODE: '不详', NAME: '不详'}
      ],
      // 输血目的
      TRANSFSIONGOALLIST: [],
      // 输血性质
      TRANSFSIONNATURELIST: [],
      // 手术等级
      OPERATIONLIST: [],
      // 用血地点
      USEBLOODLIST: [],
      // ABO血型
      ABOLIST: [],
      // RHD血型
      RHDLIST: [],
      // 抗体筛查
      ANTIBODYLIST: [],
      // 受血者属地
      RECEPTORPLACELIST: [],
      // 输血史
      TRANSFSIONLIST: [],
      // 妊娠史
      GESTATIONLIST: [],
      // 过敏史
      ALLERGYLIST: [],
      // 骨髓移植
      MARROWLIST: [],
      // 供体者血型
      DONORLIST: [],
      // 激活项
      active: '02',
      tags: [
        { name: '新鲜血浆', amount: 200, unit: 'ml', type: '' },
        { name: '悬浮红细胞', amount: 200, unit: 'ml', type: 'gray' },
        { name: '除白红细胞', amount: 200, unit: 'ml', type: 'primary' },
        { name: '标签四', type: 'success' },
        { name: '标签五', type: 'warning' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' },
        { name: '标签六', type: 'danger' }
      ],
      // 中间区域---内容
      comonentClassList: [],
      // 24h 申请量
      applyBlood: 0,
      twentFourApplyBlood: 0,
      // 本次申请量
      allapplyBlood: 0,
      // 勾选项
      filterComonentClassList: [],
      // 右侧输血指证-不合理
      unreasonableList: [],
      // 保存提示显示/隐藏
      savePromptShow: false,
      // 信息提示
      infoPromptShow: false,
    };
  },
  props: {
    // 下拉数据源
    listData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 病人信息
    patMessage: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 输血前项目
    transfusionItemList: {
      type: Array,
      default: function() {
        return [];
      }
    },
  },
  computed: {
    // 判断是否为必填项目(常规备血申请)
    isRequired() {
      return this.patMessage.MOULD_CODE == '1';
    },
    // 是否可操作
    isDisabled() {
      return this.patMessage.MOULD_CODE && this.form.INFORMED_CONSENT_ASSIGN == '未签订';
    },
    // 未签署原因(紧急-his未提供状态)
    isUnassignReason() {
      return this.patMessage.MOULD_CODE != '1' && this.patMessage.INFORMED_CONSENT_ASSIGN != '未签订' && this.patMessage.INFORMED_CONSENT_ASSIGN != '已签订';
    }
  },
  watch: {
    'comonentClassList': {
      handler: function (newValue, oldValue) {
        // 初始化
        this.filterComonentClassList = [];
        this.allapplyBlood = 0;
        // 24h申请量
        this.twentFourApplyBlood = this.applyBlood;
        this.unreasonableList = [];
        if(newValue.length > 0) {
            newValue.map(item => {
            item.DETAILTYPELIST.filter(item1 => {
              return item1.ITEM_ISCHECKED == '1'
            }).forEach(item2 => {
              // 24h申请量
              this.twentFourApplyBlood += Number(item2.MOULD_ITEM_AMOUNT) * Number(item2.UNIT_CONVERT);
              // 本次申请量
              this.allapplyBlood += Number(item2.MOULD_ITEM_AMOUNT) * Number(item2.UNIT_CONVERT);
              // 所有勾选项
              this.filterComonentClassList.push(item2);
              // 合理/不合理----过滤出不合理的
              item.MAINTRIGGE.filter(item3 => {
                return !item3.TRANSFUSIONADVICE
              }).forEach(item4 => {
                this.unreasonableList.push(Object.assign({},item2,item4));
              })
            })
          })
          // console.log(this.unreasonableList);
          this.$emit('getTransfoList',this.unreasonableList);
        }
      },
      deep: true,
    },
    // 监听病人信息
    patMessage(val) {
      this.form = Object.assign({},this.form,val);
      // 紧急备血申请（既往史有默认值，默认为不详。）
      if(this.patMessage.MOULD_CODE != '1') {
        this.form.HISTORY_TRANSFUSION = '不详';
        this.form.HISTORY_REACTION = '不详';
        this.form.HISTORY_PREGNANCY = '不详';
        this.form.HISTORY_DRUG_ALLERGY = '不详';
        this.form.HISTORY_TRANSPLANTATION = '不详';
      }
      // 常规-未签订
      // if(this.patMessage.MOULD_CODE == '1' && this.patMessage.INFORMED_CONSENT_ASSIGN == '未签订') {
      //   this.infoPromptShow = true;
      // }
      // 获取tab区内容
      this.getmodelitem();
    },
    'form.INFORMED_CONSENT_ASSIGN'(val) {
      if(val == '未签订' && this.patMessage.MOULD_CODE == '1') {
        this.infoPromptShow = true;
      }
    }
  },
  created() {
    this.$nextTick(() => {
    })
  },
  mounted() {
  },
  methods: {
    /* 获取tab区内容 */
    getmodelitem() {
      let params = {
        listno: this.patMessage.LIST_NO,
        createtime: this.patMessage.CREATE_TIME || '',
        mouldcode: this.patMessage.MOULD_CODE || ''
      }
      dataApi.getmodelitem(params).then(data => {
        if(data.type == 'SUCCESS') {
          let APPLYBLOOD = data.data.APPLYBLOOD || 0;
          this.applyBlood = parseInt(APPLYBLOOD);
          this.comonentClassList = data.data.COMONENTCLASSLIST || [];
          // 默认激活第一个
          this.active = this.comonentClassList[0].MAINCODE;
          // console.log(this.comonentClassList)
        }else {
          this.applyBlood = 0;
          this.comonentClassList = [];
        }
      });
    },
    /** 导航条-tab点击事件 */
    tabClick() {
      
    },
    /** 勾选项改变 */
    checkChange(parent,child) {
    },
    /** 计算24h申请量 */
    getApply(child) {
      if(child.ITEM_ISCHECKED == '1') {
        this.applyBlood += Number(child.MOULD_ITEM_AMOUNT) * Number(child.UNIT_CONVERT);
      }else {
        if(this.applyBlood > 0) {
          this.applyBlood -= Number(child.MOULD_ITEM_AMOUNT) * Number(child.UNIT_CONVERT);
        }else {
          this.applyBlood = 0;
        }
      }
    },
    /** 计算合理不合理 */
    sxzzhlx(up,upSign,result,dowmSign,down) {
      // 有上限
      if(up && down) {
        if(upSign == '<=') {// 小于等于最大值
          if(dowmSign == '>=') {// 大于等于最小值
            if(down <= result &&  result<= up) {
              return true;
            }else {
              return false;
            }
          }else if(dowmSign == '>') {
            if(down < result && result <= up) {
              return true;
            }else {
              return false;
            }
          }else if(dowmSign == '=') {
            if(down = result &&  result<= up) {
              return true;
            }else {
              return false;
            }
          }
        }else if(upSign == '<') {
          if(dowmSign == '>=') {
            if(down <= result && result < up) {
              return true;
            }else {
              return false;
            }
          }else if(dowmSign == '>') {
            if(down < result &&  result< up) {
              return true;
            }else {
              return false;
            }
          }else if(dowmSign == '=') {
            if(down = result &&  result< up) {
              return true;
            }else {
              return false;
            }
          }
        }else if(upSign == '=') {
          if(result == upSign) {
            return true
          }else {
            return false;
          }
        }
      }else if(up && !down) { // 有上限无下限
        if(upSign == '<=') {
          if(result <= up) {
            return true
          }else {
            return false;
          }
        }else if(upSign == '<') {
          if(result < up) {
            return true
          }else {
            return false;
          }
        }else if(upSign == '=') {
          if(result = up) {
            return true
          }else {
            return false;
          }
        }
      }else if(!up && down) { // 无上限有下限
        if(dowmSign == '>=') {
          if(down <= result) {
            return true;
          }else {
            return false;
          }
        }else if(dowmSign == '>') {
          if(down < result) {
            return true;
          }else {
            return false;
          }
        }else if(dowmSign == '=') {
          if(down = result) {
            return true;
          }else {
            return false;
          }
        }

      }else { // 无上下限
        
      }
    },
    /** tag标签关闭 */
    handleClose(tag) {
      this.$set(tag, 'ITEM_ISCHECKED', '0');
    },
    /** 获取焦点全选 */
    focus(e) {
      this.$nextTick(() => {
        e.target.select();
      });
    },
    /** 控制上下箭头 */
    handleSubAdd(type,item,stepc) {
      // console.log(item)
      let amount = Number(item.MOULD_ITEM_AMOUNT);
      let step = Number(stepc);
      if(type == 'decrease') {
        if(amount <= step) {return false;}
        item.MOULD_ITEM_AMOUNT= (Number(amount) - step) > 0 ? Number(amount - step) : step;
      }else {
        // 不能大于库存
        if(amount >= parseInt(item.ITEM_INVENTORY)) {return false};
        item.MOULD_ITEM_AMOUNT = Number(amount) + step;
      }
      // 操作按钮-未勾选-自动勾选
      if(item.ITEM_ISCHECKED == '0') {
        this.$set(item, 'ITEM_ISCHECKED', '1')
      }
    },
    /** 控制input框的输入 */
    blur(val,item,stepc) {
      let amount = Number(item.MOULD_ITEM_AMOUNT.replace(/[^\d.]/g,""));
      let step = Number(stepc);
      item.MOULD_ITEM_AMOUNT = Math.ceil(amount / step) * step;
      // 最大为库存量
      if(amount >= parseInt(item.ITEM_INVENTORY)) {
        item.MOULD_ITEM_AMOUNT = parseInt(item.ITEM_INVENTORY);
      }
      // 操作按钮-未勾选-自动勾选
      if(item.ITEM_ISCHECKED == '0') {
        this.$set(item, 'ITEM_ISCHECKED', '1')
      }
    },
    /** 打印申请单 */
    printForm() {
    },
    /** 点保存按钮 */
    save() {
      if(this.isRequired && !this.form.ABO_GROUP) {
        layerUtils.showMessage("请选择ABO血型",layerUtils.messageType.WARNING);
        // this.$message({message: '请选择ABO血型',type: 'warning'})
        this.$refs.ABORef.$children[0].$refs.input.focus();
        return;
      }else if(this.isRequired && !this.form.RHD_GROUP) {
        layerUtils.showMessage("请选择RH(D)血型",layerUtils.messageType.WARNING);
        this.$refs.RHDRef.$children[0].$refs.input.focus();
        return;
      }else if(!this.form.HISTORY_TRANSFUSION) {
        layerUtils.showMessage("请选择输血史",layerUtils.messageType.WARNING);
        this.$refs.transfusionRef.$children[0].$refs.input.focus();
        return;
      }else if(!this.form.HISTORY_REACTION) {
        layerUtils.showMessage("请选择输血反应史",layerUtils.messageType.WARNING);
        this.$refs.reactTransfusionRef.$children[0].$refs.input.focus();
        return;
      }else if(!this.form.HISTORY_PREGNANCY) {
        layerUtils.showMessage("请选择妊娠史",layerUtils.messageType.WARNING);
        this.$refs.pregnancyRef.$children[0].$refs.input.focus();
        return;
      }else if(!this.form.HISTORY_DRUG_ALLERGY) {
        layerUtils.showMessage("请选择过敏史",layerUtils.messageType.WARNING);
        this.$refs.allergicRef.$children[0].$refs.input.focus();
        return;
      }else if(!this.form.HISTORY_TRANSPLANTATION) {
        layerUtils.showMessage("请选择骨髓移植史",layerUtils.messageType.WARNING);
        this.$refs.gsyzRef.$children[0].$refs.input.focus();
        return;
      }else if(this.isRequired && !this.form.TRANSFUSION_PURPOSE) {
        layerUtils.showMessage("请选择输血目的",layerUtils.messageType.WARNING);
        this.$refs.transfsionGoallRef.$children[0].$refs.input.focus();
        return;
      }else if(this.isRequired && !this.form.TRANSFUSION_NATURE) {
        layerUtils.showMessage("请选择输血性质",layerUtils.messageType.WARNING);
        this.$refs.transfsionNatrueRef.$children[0].$refs.input.focus();
        return;
      }else if(this.isRequired && !this.form.OPERATION_LEVEL) {
        layerUtils.showMessage("请选择手术等级",layerUtils.messageType.WARNING);
        this.$refs.operativeGradeRef.$children[0].$refs.input.focus();
        return;
      }else if(this.isUnassignReason && !this.form.UNASSIGN_REASON) {
        layerUtils.showMessage("请输入未签署原因",layerUtils.messageType.WARNING);
        this.$refs.nosignReasonRef.$refs.input.focus();
        return;
      }else if(this.filterComonentClassList.length == 0) {
        layerUtils.showMessage("请勾选申请项目",layerUtils.messageType.WARNING);
        return;
      }
      // 有不合理的提示
      if(this.unreasonableList.length > 0) {
        setTimeout(() => {
          this.savePromptShow = true;
        },0)
      }else {
        // 直接调取保存接口
        this.saveRequestList('');
      }
    },
    /** 保存提示-点确定 */
    confirmSave(reason) {
      this.saveRequestList(reason);
    },
    /** 确认保存 */
    saveRequestList(reason) {
      let obj = {};
      for (let key in this.form) {
        // 去除_并转小写
        obj[key.split('_').join("").toLowerCase()] =  this.form[key]
      }
      let paramsc = {
        requestitemlist: this.filterComonentClassList,
        triggerlist: this.unreasonableList,
        unreasonablereason: reason,
        // 总申请量
        applymount: this.allapplyBlood,
        // 24小时申请量
        onedaymount: this.twentFourApplyBlood,
      }
      let params = Object.assign({}, obj, {transfusiontime: isDateObject(this.form.TRANSFUSION_TIME) ? dateTimeFormat(this.form.TRANSFUSION_TIME) : this.form.TRANSFUSION_TIME ? this.form.TRANSFUSION_TIME : ''}, paramsc);
      dataApi.saveRequestList(params).then(data => {
        if(data.type == 'SUCCESS') {
          this.savePromptShow = false;
          this.$message({message: '保存成功',type: 'success'});
        }else {
          this.$message({message: '保存失败',type: 'error'});
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.left-mid-wrap
  width 100%
  height 100%
  .left-mid-body
    height calc(100% - 50px)
    border 1px solid #eee
    overflow hidden
    .left-info-wrap
      width 300px
      background #fff
      height 100%
      float left
      overflow auto
      padding 0 16px 0 5px
      .item-info
        .title
          height 20px
          line-height 20px
          font-weight 700
          margin 16px 0 16px 16px
          &:before
            display inline-block
            content ""
            width 3px
            height 14px
            vertical-align middle
            margin-right 5px
            margin-bottom 2px
            background rgba(15,73,237,1)
        >>>.el-autocomplete, >>>.el-input, >>>.w-select ,>>>.w-input
          width 100%
        >>>.w-input
          height 24px
          .w-input__inner
            height 24px
          .w-input__border-bottom
            bottom 0px
        .allergy-span span
          display inline-block
          width 20px
          height 20px
          line-height 20px
          text-align center
          background #eee
          border-radius 2px
          &:hover
            background #00f
            color #fff
        .penicillin-span span
          // display inline-block
          // width 100%
          // height 20px
          // line-height 20px
          // background #eee
          // border-radius 2px
          // padding-left 5px
        .under-line
          text-decoration underline
          cursor pointer
          color #0F49ED
        >>>.el-form-item
          margin-bottom 8px !important
          .el-form-item__label
            padding 7px 8px 7px 0
        >>>.mark-color .w-input .w-input__inner
          color #f00 !important
    .mid-info-wrap
      width calc(100% - 300px)
      height 100%
      background #fff
      float left
      border-left 1px solid #eee
      padding 10px 10px 0 10px
      .top
        height calc(100% - 160px)
        >>>.w-tabs
          height 100%
          >.w-tabs__header
            .w-tabs__nav-wrap::after
              background-color transparent !important
          .w-tabs__content
            padding 6px
            height calc(100% - 32px)
            font-size 12px
            overflow auto
            .w-tab-pane
              height 100%
      .contain
        height calc(100% - 80px)
        .contain-item
          height 46px
          line-height 46px
          border-bottom 1px solid #DFE7F5
          display flex
          justify-content space-between
          .operate
            width 290px
            display flex
            align-items center
            > span
              display inline-block
              width 28px
              height 28px
              line-height 28px
              text-align center
              background #F3F6FE
              border-radius 2px
            >>>.w-checkbox
              width 110px
              .w-checkbox__label
                display inline-block
                width calc(100% - 18px)
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
          .desc
            width calc(100% - 290px)
            text-align right
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            span:first-child
              padding-right 10px
              display inline-block
              width 100px
              text-align left
          .el-input-number
            position relative
            display inline-block
            width 100px
            line-height 22px
            margin 0 4px 0 20px
            >>>.w-input
              // display block
              .w-input__inner
                // height 26px
            .el-icon-arrow-down:before
              // content "\25B2"
            .el-icon-arrow-up:before
              // content "\25BC"
            .el-icon-arrow-down,.el-icon-arrow-up
              transform scale(.8)
              color rgba(15,73,237,.25)
              &:hover
               color rgba(15,73,237,.55)
            .el-input-number__increase , .el-input-number__decrease
              height auto
              width 40px
              position absolute
              z-index 1
              right 1px
              text-align center
              background #F3F6FE
              cursor pointer
              border-left 1px solid #cfdbfb
            .el-input-number__increase
              border-radius 0 4px 0 0
              // border-bottom 1px solid #dcdfe6
              line-height 14px
              top 1px
            .el-input-number__decrease
              bottom 1px
              top auto
              left auto
              border-right none
              line-height 14px
              border-radius 0 0 4px 0
            .el-input-number__decrease.is-disabled, .el-input-number__increase.is-disabled
              color #c0c4cc
              cursor not-allowed
      .bottom
        height 160px
        .desc
          height 40px
          line-height 40px
          color #f00
          font-size 13px
        .tag-wrap
          height 120px
          overflow auto
          padding-top 8px
          display flex
          align-items flex-end
          .tag-box
            max-height 120px
          .w-tag
            font-size 12px
            margin-right 8px
            margin-bottom 10px
  .left-mid-bottom
    height 50px
    line-height 50px
    text-align center
    background #fff
    >>>.w-button
      margin-right 27px
      width 98px
@media screen and (min-width: 1366px)
  .left-mid-body
    .left-info-wrap
      width 360px !important
    .mid-info-wrap
      width calc(100% - 360px) !important
</style>

<style lang="stylus">
</style>