<template>
  <div class="home-page-wrap-ba">
            <div>
              <w-checkbox-group v-model="valueList" @change="handleChange">

                <w-checkbox :label="item.id" v-for="(item, index) in checkboxList" :key="index">
                        <canvas id="canvas"></canvas>

                    <ul>
                      <li>
                        <w-select v-model="value" placeholder="请选择">
                          <w-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </w-option>
                        </w-select>
                        <w-select v-model="value" placeholder="请选择">
                          <w-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </w-option>
                        </w-select>
                        <w-select v-model="value" placeholder="请选择">
                          <w-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </w-option>
                        </w-select>
                        <w-input></w-input>
                        <w-button @click="handleIcon(item,index)">shanchu</w-button>
                      </li>
                    </ul>
                </w-checkbox>
              </w-checkbox-group>
              <w-button @click="handleAdd">add</w-button>
              <w-button @click="handleItem">item</w-button>
            </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      valueList: [1, 2],
      value: '选项1',
      checkboxList: [
        {id:1},
        {id:2},
        {id:3},
        {id:4},
      ],
      eLIst:[],
      options: [
          {
            value: '选项1',
            label: '射液'
          }, {
            value: '选项2',
            label: '片'
          }, {
            value: '选项3',
            label: '片'
          }, {
            value: '选项4',
            label: '射液'
          }, {
            value: '选项5',
            label: '他'
          }
        ],
      tableData: [{
          time: '2019.:33',
          status: '其他区签约',
          name: '赵宇翔',
          type: '其他'
        }, {
          time: '22:24:30',
          status: '未签约',
          name: '肖新宇',
          type: '本地医保'
        }, {
          time: '3 08:15:10',
          status: '已签约',
          name: '陈慕杰',
          type: '本地医保'
        }, {
          time: '4 09:23:09',
          status: '未签约',
          name: '李自然',
          type: '本地医保'
        }, {
          time: '28:45:48',
          status: '未签约',
          name: '尤道礼',
          type: '本地医保'
        }]
    };
  },
  created() {},
  methods: {
    handleItem () {
      console.log('item', this.eLIst)
    },
    handleIcon (row,index) {
      console.log(row,index)
      this.checkboxList.splice(index, 1)
    },
    handleAdd () {
      console.log(this.checkboxList)
      this.checkboxList.push({id:this.checkboxList.length+1})
      console.log(this.checkboxList)
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      cxt.moveTo(5, 10); 
      // cxt.lineTo(5, 100); 
      cxt.stroke();
    },
    handleChange (e) {
      this.eLIst = e
      console.log(e)
    }
  }
};
</script>
<style lang='stylus' scoped>
#canvas {
  width: 100px;
  height: 100px;
  border: 1px solid #333;
}
.home-page-wrap-ba {
  height: 100%;
  padding: 12px 15px;
  background: rgba(234, 237, 244, 1);
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
<style lang='stylus'>
.w-input, .w-textarea {
  width: 200px
}
.w-checkbox__label {
  height: 37px;
}
.w-checkbox+.w-checkbox {
  margin: 0;
}
</style>
