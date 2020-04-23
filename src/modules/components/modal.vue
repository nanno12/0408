<template>
  <div>
    <w-modal
      :visible.sync="isShow"
      :title="title"
      :showClose="false"
      :close-on-click-modal="false">
      <span>this is a dialog</span>
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <w-button @click="handleModalClose">取 消</w-button>
        <w-button type="primary" @click="handleque">确 定</w-button>
      </span>
    </w-modal>
  </div>
</template>
 
<script>
export default {
  data () {
      return {
        isShow: true
      };
  },
  props: {
    isShow: {
        type: Boolean,
        default: true
      },
     title: {
        type: String,
        default: '标题'
     }
  },
  methods:{
    handleModalClose(){
      this.isShow = false
    },
    handleque () {
      
    }
  }
};
</script>