<template>
    <div>
        <div slot="header" class="win-card-header_wrapper">
      <span class="card-icon"></span>
      <template v-if="title">{{title}}</template>
      <template v-else>
        <div class="card-header">
          <div class="title">
            <slot name="header"></slot>
          </div>
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
  .title {
    > span {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      font-size:14px;
      font-weight:400;
      color:rgba(0,6,34,1);
    }
    // padding-top: 2px;
    // margin: 0;
    // font-size:14px;
    // font-weight:400;
    // color:rgba(0,6,34,1);
    // line-height:20px;
  }
}
</style>