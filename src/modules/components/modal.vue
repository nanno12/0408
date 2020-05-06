<template>
  <div>
    <w-modal
      :visible.sync="isShowVisible"
      :title="title"
      :showClose="false"
      :close-on-click-modal="false">
      <w-form :model="form" ref="form" label-width="85px" :rules="rules">
      </w-form>
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
        // isShowVisible: true
      };
  },
  props: {
    isShowVisible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    },
    rules: {
      type: Object,
      default: function () {
        return {}
      }
    },
    form: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods:{
    handleModalClose(){
      this.isShowVisible = false
    },
    handleque () {
      
    }
  }
};
</script>