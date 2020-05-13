<template>
    <div>
        <div slot="header" class="win-card-header_wrapper">
      <span class="card-icon"></span>
      <template v-if="title">{{title}}</template>
      <template v-else>
        <div class="card-header">
          <h2>
            <slot name="header"></slot>
          </h2>
        </div>
      </template>
    </div>
    <slot></slot>
    </div>    
</template>
<script>
export default {
   props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.win-card-header_wrapper {
  display: flex;
  align-items: center;
  // line-height:20px;
}
.card-icon {
  display: inline-block;
  margin-right: 5px;
  width: 3px;

  height: 14px;
  line-height:20px;
  background: #0F49ED;// border-radius: 3px;
}
.card-header {
  // flex: 1;
  width: 100%;
  > h2 {
    margin: 0;
    padding-top: 2px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,6,34,1);
    line-height:20px;
  }
}
</style>