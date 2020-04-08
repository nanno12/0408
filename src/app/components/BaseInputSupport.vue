/*
 * 输入框支持对扫码特殊支持
 * @Author: s_xd 
 * @Date: 2019-06-20 10:55:00 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-29 09:46:17
 */

<template>
   <input type="text" ref="BaseInputSupport"
      v-bind:value="value"
      v-focus-input
      :disabled="disabled"
      :placeholder="placeholder"
      v-on:input="$emit('input', $event.target.value)"
      @compositionstart="handleCompositionstart($event)"
      @compositionend="handleCompositionend($event)"
      @keyup.enter="$emit('handleScanEnd', value)"
      @keyup="$listeners.keyup ? $listeners.keyup($event, value) : ''"
    />
</template>
<script>
import { PARAME_SCANNER_OPTIONS } from "@/app/settings/scannerOptions";
import KeyCode from "@/app/enums/KeyCode";
export default {
  name: "BaseInputSupport",
  data() {
    return {
      //输入框最大长度
      val:"",
      maxLength: 3,
      cpLock: false,
      startInputTime: new Date(),
      endInputTime: new Date(),
    };

  },
  props: {
    value: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
  },
  watch: {
    'value'(val, oldValue) {
      //this.$emit("input",val);
    }
  },
  computed: {
  },

  methods: {
    /** 处理光标定位时动作*/
    inputFocusHandle(item, index) {
      console.log("聚焦：");
      this.keydowHandleMemory = item.FIELDNAME;
    },
    /**一段文字的输入之前 */
    handleCompositionstart(event, item, index) {
      this.cpLock = true;
      this.startInputTime = new Date();
    },
    /** 当文本段落的组成完成或取消时 */
    handleCompositionend(event, item, index) {
      this.cpLock = false;
      this.endInputTime = new Date();
      let diff = this.endInputTime - this.startInputTime;
      let evtTarget = event.target || event.srcElement;
      let barCode = evtTarget.value;
      if (!this.cpLock) {
        let avgTime =diff/barCode.length;
        console.log("平均耗时"+avgTime);
        //认为150ms以内属于扫描，并且8位以上才是有效条码
        if (true||avgTime<=PARAME_SCANNER_OPTIONS.avtTime || diff <= PARAME_SCANNER_OPTIONS.timeInterval) {
          //evtTarget.select();
          if (false&&barCode.length <= PARAME_SCANNER_OPTIONS.validLength) {
            console.log("中文模式【非有效条码】：" + diff + "ms;>" + barCode);
            evtTarget.select();
          } else {
            //setResult("中文模式【扫码有效可以入库】："+diff+"ms;>"+str);
            console.log(
              "中文模式【扫码有效可以入库】：" + diff + "ms;>" + barCode
            );
            let scannerFlag = true;
            this.$nextTick(() => {
              //执行回车入库动作
              //this.insertSampleInfo(barCode);
              this.value = barCode;
              this.$emit("handleScanEnd",barCode);
            });
          }
          return;
        }
        //setResult("中文模式【手工】："+diff+"ms;>"+str);
        console.log("中文模式【手工】：" + diff + "ms;>" + barCode);
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
.base-age {
  margin: 0;
  padding: 0;
  .element-age,.element-ageUnit,.element-age2,.element-ageUnit2{
    float left
  }

  .el-select {
    width: 55px;
  }
  .el-input {
    width: calc((100% - 55*2px)/2);
    margin: 0;
    padding: 0;
    .el-input__inner{
      border-right :0 !important
    }
  }

  .el-input.is-disabled .el-input__inner {
    background: #fffef1;
    color: #444444;
  }
}
</style>


<style lang="stylus">
.base-age {
  .element-age{
    .el-input__inner{
      border-right :none !important;
      border-bottom-right-radius :0 !important
      border-top-right-radius :0 !important
    }
  }
  .element-age2 {
    .el-input__inner{
      border-right :none !important
      border-left  :none !important
      border-bottom-right-radius:0 !important
      border-top-right-radius :0 !important
    }
  }
  
  .element-ageUnit{
    .el-input__inner{
      border-radius :0px !important
    }
  }
  .element-ageUnit2 {
    .el-input__inner{
      border-bottom-left-radius :0px !important
      border-top-left-radius :0px !important
    }
  }

}
</style>