<template>
    <div id="pathologicalExam">
      <template v-for="(item, index) in pathList">
        <div :key="index">
          <div class="pathExamRecord">
            <div class="content">
              <i v-if="isChecked(item)" class="w-icon-success" @click="check(item)" style="color:#0F49ED"></i>
              <i v-else class="w-icon-unselected" @click="check(item)" style="color:#C0CBE9"></i>
              <div class="record-info">  
                <p>
                  <span>病理号：{{ item.inspectNo }}</span>
                  <span class="delete-link" @click="removeExam(index)">删除</span>
                </p>
                <p>{{ item.CHECK_DATE }}&ensp;&ensp;{{ item.HOSPITAL_CODE }}</p>
                <p style="font-weight:600">病理诊断：</p>
                <p>{{ item.PATHOLOGIC_DIAGNOSIS }}</p>
              </div>
            </div>
          </div>
          <hr/>
        </div>
      </template>
      <div style="width:100%;height:40px;position:relative;">
        <div class="bottom">
          <w-button type="primary" plain @click="addExam">添加</w-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    pathList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      checkedItems: []
    }
  },
  watch: {
    'pathList.length' (nv, ov) {
      // 新增
      if (nv > ov) {
        // if (!this.checkedItem) {
        //   this.checkedItem = this.pathList[nv - 1]
        // }
        this.checkedItems.push(this.pathList[nv - 1])
      }

      // 删除
      else {
        let index = this.pathList.indexOf(this.checkedItem)
        // if (index === -1) {
        //   this.checkedItem = null
        // }

        if (index !== -1) {
          this.checkedItems.splice(index, 1)
        }
      }
    }
  },
  methods: {
    addExam () {
      this.$emit('addExam')
    },
    removeExam (index) {
      this.$emit('removeExam', index)
    },
    check (item) {
      // this.checkedItem = this.checkedItem === item ? null : item
      let index = this.checkedItems.indexOf(item)
      if (index === -1) {
        this.checkedItems.push(item)
      } else {
        this.checkedItems.splice(index, 1)
      }
    },
    isChecked (item) {
      return this.checkedItems.indexOf(item) !== -1
    }
  }
}
</script>

<style lang="scss">
#pathologicalExam {
  font-size: 13px;
  padding-top: 9px;
  hr {
    margin: 24px 0
  }
  .pathExamRecord {
    p {
      margin: 8px 0;
    }
    .delete-link {
      font-size:13px;
      font-weight:400;
      color:rgba(15,73,237,1);
      float: right;
      cursor: pointer;
      user-select: none;
    }

    .content {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        margin-right: 8px;
        // margin-top: 65px;
      }
      .record-info {
        width: calc(100% - 28px);
      }
    }
  }
}
</style>
