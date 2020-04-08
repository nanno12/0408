/* 文字过多的时候省略，超出时悬浮提醒
 * @Author: s_xd@winning.com.cn 
 * @Date: 2019-05-10 13:45:29 
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2019-09-25 09:51:41
 */

<template>
  <div class="ellipsis-lable" ref="ellipsis-lable" @mouseenter="handleCellMouseEnter" @mouseleave="handleCellMouseLeave">
    <el-tooltip placement="top" ref="tooltip" :enterable="true" :content="tooltipContent"></el-tooltip>
    <p class="el-tooltip">
      {{content}}
      <slot></slot>
    </p>
    
  </div>
</template>
<script>
import debounce from 'throttle-debounce/debounce';
export default {
  name: "EllipsisLable",
  data() {
    return {
      //悬浮提示内容
      tooltipContent: "",
      activateTooltip:null,
    };

  },
  watch:{
    content(newVal,oldVal){
      if(newVal==oldVal){
        return;
      }
      this.$nextTick(()=>{
        const tooltip = this.$refs.tooltip;
        console.log(tooltip.expectedState)
        if (tooltip&&tooltip.expectedState) {

          this.handleCellMouseEnter();
        }
      });
    }
  },
  props: {
    //内容
    content: {
      default: ""
    }
  },
  created(){
    this.activateTooltip = debounce(100, tooltip => tooltip.handleShowPopper());
  },
  methods: {
    /** 光标移动进去 */
    handleCellMouseEnter(event, row) {
      const table = this.table;
      const cell =this.$refs["ellipsis-lable"];
      // 判断是否text-overflow, 如果是就显示tooltip
      let cellChild = cell.querySelector(".el-tooltip");
      let cellInnerChild = cell.querySelector(".el-tooltip input");
      if(cellInnerChild){
        cellChild = cellInnerChild;
      }
      const tooltip = this.$refs.tooltip;
      if (cellChild.scrollWidth > cellChild.offsetWidth) {
        tooltip.referenceElm = cell;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
        this.tooltipContent = cellInnerChild ? cellChild.value : cellChild.innerText;
        tooltip.doDestroy();
        tooltip.setExpectedState(true);
        this.activateTooltip(tooltip);
      }else{
        if (tooltip) {
          tooltip.setExpectedState(false);
          tooltip.handleClosePopper();
        }
      }
    },
    /** 光标离开 */
    handleCellMouseLeave(event) {
      const tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.ellipsis-lable {
    overflow: hidden;
}

.el-tooltip{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
