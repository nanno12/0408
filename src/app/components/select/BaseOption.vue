<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
    class="el-select-dropdown__item"
    v-show="visible"
    :class="{
      'selected': itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': parent.hoverIndex === index
    }">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script type="text/babel">
  import Emitter from 'wn-tech-ui/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'BaseOption',

    componentName: 'BaseOption',

    props: {
      value: {
        required: true
      },
      label: [String, Number],
      filterList:{  //自定义的过滤字段--雷健雄添加（2018/06/21）
        type:Array,
        default(){
          return ['NAME','CODE','MEMCODE1','MEMCODE2'];
        }
      },
      item:{
        type:Object,
        default(){
          return {};
        }
      },
      created: Boolean,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        index: -1,
        groupDisabled: false,
        visible: true,
        hitState: false
      };
    },

    computed: {
      currentLabel() {
        return this.label || ((typeof this.value === 'string' || typeof this.value === 'number') ? this.value : '');
      },

      currentValue() {
        return this.value || this.label || '';
      },

      parent() {
        let result = this.$parent;
        while (!result.isSelect) {
          result = result.$parent;
        }
        return result;
      },

      itemSelected() {
        if (!this.parent.multiple) {
          return this.value === this.parent.value;
        } else {
          return this.parent.value.indexOf(this.value) > -1;
        }
      },

      limitReached() {
        if (this.parent.multiple) {
          return !this.itemSelected &&
            this.parent.value.length >= this.parent.multipleLimit &&
            this.parent.multipleLimit > 0;
        } else {
          return false;
        }
      }
    },

    watch: {
      currentLabel() {
        if (!this.created && !this.parent.remote) this.dispatch('BaseSelect', 'setSelected');
      },
      value() {
        if (!this.created && !this.parent.remote) this.dispatch('BaseSelect', 'setSelected');
      }
    },

    methods: {
      handleGroupDisabled(val) {
        this.groupDisabled = val;
      },

      hoverItem() {
        if (!this.disabled && !this.groupDisabled) {
          this.parent.hoverIndex = this.parent.options.indexOf(this);
        }
      },

      selectOptionClick() {
        if (this.disabled !== true && this.groupDisabled !== true) {
          this.dispatch('BaseSelect', 'handleOptionClick', this);
        }
      },

      queryChange(query) {
        query = query.toLowerCase();
        // query 里如果有正则中的特殊字符，需要先将这些字符转义
        let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
        // 去过滤列表中进行筛选过滤
        let meetd = this.filterList.some(key=>{
          if(this.item[key]){
           return String(this.item[key]).toLowerCase().indexOf(parsedQuery) > -1;
          }else{
            return false;
          }

        });
        this.visible = meetd || this.created;
        // this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
        if (!this.visible) {
          this.parent.filteredOptionsCount--;
        }
      },

      resetIndex() {
        this.$nextTick(() => {
          this.index = this.parent.options.indexOf(this);
        });
      }
    },

    created() {
      this.parent.options.push(this);
      this.parent.cachedOptions.push(this);
      this.parent.optionsCount++;
      this.parent.filteredOptionsCount++;
      this.index = this.parent.options.indexOf(this);

      this.$on('queryChange', this.queryChange);
      this.$on('handleGroupDisabled', this.handleGroupDisabled);
      this.$on('resetIndex', this.resetIndex);
      this.$on('selected'+this.index, _=>{
        this.$emit('selected');
      });
    },

    beforeDestroy() {
      this.dispatch('BaseSelect', 'onOptionDestroy', this);
    }
  };
</script>
