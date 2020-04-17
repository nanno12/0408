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
}
.card-icon {
  display: inline-block;
  margin-right: 8px;
  width: 3px;
  height: 16px;
  background: #5a7bef;
  // border-radius: 3px;
}
.card-header {
  flex: 1;
  width: 100%;
  > h2 {
    margin: 0;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
  }
}
</style>