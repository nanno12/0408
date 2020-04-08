<template>
    <transition name="el-message-fade">
        <div class="div-noti" :class="[
        'el-message',
        type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        customClass]" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer" role="alert">
            <div :apiFlag ="false" class="item title">
                <div v-if="iconClass">
                    <i :class="iconClass" ></i>
                </div>
                <i :class="typeClass" v-else></i>
                <p>{{title}}</p><i v-if="showClose" class="el-message__closeBtn el-icon-close close-btn" @click="close"></i>
            </div>
            <div class="item content" v-if="checkShowDetail">

                <slot>
                <p class="el-message__content">{{ message }}</p> 
                <!-- <div class="operate" v-if="checkShowDetail">
                   
                </div> -->
                 <el-tooltip :hide-after="1000" :content="shwDetailFlag?'隐藏详细信息':'显示详细信息'" placement="bottom" effect="dark">
                        <a v-if="checkShowDetail" class="detailTrigger  iconfont" :class="[shwDetailFlag ? 'icon-xsjt' : 'icon-xxjt']" @click="shwDetail"></a>
                </el-tooltip>
                </slot>
            </div>

            <transition name="transition-box">
                <div class="item detail" v-show="shwDetailFlag">
                    <el-tooltip :manual="false" v-model="copyFlag" :hide-after="3" class="copy-btn" content="已复制到剪切板" placement="left" effect="dark">
                        <a type="button" class="iconfont  icon-report-clone" @click="doCopy">复制信息</a>
                    </el-tooltip>
                    <pre class="detail-info" ref="detailinfo" style="white-space: pre" @focus="selectText($event)" tabindex="0">{{detailMsg}}</pre>
                </div>
            </transition>
           
        </div>

    </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: "circle-check",
  info: "information",
  warning: "warning",
  error: "circle-cross"
};

export default {
  data() {
    return {
      shwDetailFlag: false,
      visible: false,
      message: "",
      duration: 3000,
      detailOption: {},
      type: "info",
      iconClass: undefined,
      customClass: "",
      onClose: null,
      showClose: false,
      closed: false,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false,
      detailTriggerEdsc: "显示详细错误",
      copyFlag: false
    };
  },

  computed: {
    iconWrapClass() {
      const classes = ["el-message__icon"];
      if (this.type && !this.iconClass) {
        classes.push(`el-message__icon--${this.type}`);
      }
      return classes;
    },

    typeClass() {
      return this.type && !this.iconClass
        ? `icon el-message__icon el-icon-${typeMap[this.type]}`
        : "";
    },
    checkShowDetail() {
      return this.type == "error";
    },
    detailMsg() {
      let msg;
      let opt = this.detailOption;
      if (opt) {
        if (opt.requstUrl) {
          msg = `【服务地址】${opt.requstUrl}`;
        }
        if (opt.funName) {
          msg = `${msg}\n【异常方法】${opt.funName}`;
        }
        if (opt.data) {
          msg = `${msg}\n【异常明细】${opt.data}`;
        }
      }
      return msg || this.message;
    },
    title() {
      if (!this.checkShowDetail) {
        return this.message;
      }
      switch (this.type) {
        case "success":
        case "info":
          return "消息";
          break;
        case "error":
          return "错误";
          break;
        case "warning":
          return "警告";
          break;
        default:
          return "消息";
          break;
      }
    }
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener("transitionend", this.destroyElement);
      }
    }
  },

  methods: {
    /** 选中文字 */
    selectText(element) {
      var text = this.$refs.detailinfo;
      if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
      } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        /*if(selection.setBaseAndExtent){
                selection.setBaseAndExtent(text, 0, text, 1);
            }*/
      } else {
        console.log("无法选中");
      }
    },
    /** 复制到剪切板 */
    doCopy: function(val) {
      this.$copyText(this.detailMsg).then(
        () => {
          this.copyFlag = true;
          this.selectText();
        },
        function(e) {
          this.copyFlag = false;
        }
      );
    },
    /** 显示详细信息 */
    shwDetail() {
      this.shwDetailFlag = !this.shwDetailFlag;
    },
    destroyElement() {
      this.$el.removeEventListener("transitionend", this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },
    /** 延迟关闭 */
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    }
  },
  mounted() {
    this.startTimer();
    document.addEventListener("keydown", this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown);
  }
};
</script>
<style lang="stylus" scoped>
.div-noti {
    max-width: 800px;
    color: #8391a5;
    padding: 5px 5px 2px 5px;

    .title {
        width: 100%;
        max-height: 36px;
        font-size: 400pix;
        text-align: justify;
        font-size: 14px;
        color: #8391a5;
        margin: 4px 4px;
        .el-message__icon{
            font-size:20px;
        }
        p{
           padding: 0 20px
        }
        .close-btn {
            right: 8px;
            top: 9px;
        }
    }

    .icon {
        float: left;
    }

    display: flex;
    flex-direction: column;

    .detail {
        border: 1px solid #eee;
        width: 100%;

        .copy-btn {
            position: absolute;
            font-size:14px;
            background: lightblue;
            padding: 2px;
            border-radius: 5px;
            right: 15px;
            margin-top: 5px;
            font-weight: bold;
            cursor: pointer;
        }

        .detail-info {
            overflow: auto;
            max-height: 160px;
            min-height: 50px;
            padding: 5px;
            line-height: 1.5em;
        }
    }

    .content {
        position:relative;
        p {
            max-height: 40px;
            font-size: 13px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-indent: 1em;
            line-height: 1.5em;
            overflow:hidden; 
            text-overflow:ellipsis;
            display:-webkit-box; 
            margin: 0px 25px 5px 5px;
        }
        .detailTrigger {
            position:absolute;
            right:1px;
            bottom:2px;
            color: rgb(191, 203, 217);
            font-weight:bold;
            display:inline-block;
        }
        .detailTrigger:hover {
            color: rgb(151, 168, 190);
        }
    }

    .item {
        margin-top: 2px;
    }
}
</style>
