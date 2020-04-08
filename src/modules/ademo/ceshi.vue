<template>
  <div ref="maxBlock" class="ceshi re minBlock" @mousemove="sliderMove" @mouseup="sliderMoveEnd">
    <div ref="block1" class="box1 inlB"></div>
    <div ref="block2" class="box2 inlB">
    </div>
    <div ref="block3" class="box3 inlB"></div>
    <div ref="slider1" @mousedown="(e) => {sliderMoveStart(e, 1)}" class="slider slider1 ab"></div>
    <div ref="slider2" @mousedown="(e) => {sliderMoveStart(e, 2)}" class="slider slider2 ab"></div>
  </div>
</template>
<script>
import autoResize from '@/app/components/autoResize';

export default {
  mixins: [autoResize],
  data() {
    return {
      // 模块Code
      moduleCode: 'ceshi10086'
    };
  },
  props: {

  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style lang="stylus" scoped>
.ceshi
  height 100%
  background #fff
  font-size 0
  .inlB
    height 100%
  .box1
    width 100px
    background #999
  .box2
    width calc(100% - 200px)
  .box3
    width 100px
    background #ddd
  .slider:hover
    background red
</style>
<style lang="stylus">
</style>
