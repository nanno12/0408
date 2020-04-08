<template>
<li @click="select(item)" >
    <span v-if="props.showId" class="id" style="margin-right: 5px;">{{ item.DICID }}</span>
    <div class="auto-item">
      <span style="margin-right: 5px;">{{ item[props.displayCode] }}</span>
      <span>{{ item[props.label] }}</span>
    </div>
</li>
</template>

<script type="text/babel">
  import Emitter from 'wn-tech-ui/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'BaseAutoItem',

    componentName: 'BaseOption',

    props: {
      index: {
        type: Number
      }, 
      props: {
        type: Object,
        default() {
          return {
            label: 'NAME',
            value: 'CODE',
            displayCode: 'DISPLAYCODE'
          };
        }
      },
      item:{
        type:Object,
        default(){
          return {};
        }
      }
    },
    data() {
      return {
        groupDisabled: false,
        visible: true,
        hitState: false
      };
    },
    methods: {
      select(item) {
        this.dispatch('ElAutocomplete', 'item-click', item);
      }
    },
  };
</script>
<style lang="stylus" scoped>
  .auto-item {
    font-size: 12px;
    display: flex;

    justify-content:space-between;
    >span{
      display:inline-block;
    }
  }
  .id{
    float left
    left 0
    width 60px
  }
 
</style>
 