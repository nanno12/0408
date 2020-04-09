<template>
  <div class="home-page-wrap-ba">
    <div class="home-page-body">
      <ul class="ul" style="display:inline-block;" >
        <li
          :class="active===index ? 'styleHover' : '' "
          :key="index"
          v-for="(item, index) in titleList" >
          <w-button
            @click="handleTab(item, index)"
            class="title"
            type="text"
          >{{item.name}}</w-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      titleList: [
        {
          id: "SX0001",
          name: "红细胞类"
        },
        {
          id: "SX0002",
          name: "冷沉淀"
        },
        {
          id: "SX0003",
          name: "血小板"
        },
        {
          id: "SX0004",
          name: "血浆类"
        },
        {
          id: "SX0005",
          name: "白细胞类"
        }
      ]
    };
  },
  created() {},
  methods: {
    handleTab(item, index) {
      console.log(item, index);
      this.active = index;
    }
  }
};
</script>
<style lang='stylus' scoped>
.home-page-wrap-ba {
  // height: 100%;
  // padding: 12px 15px;
  // background: rgba(234, 237, 244, 1);
  // overflow-x: auto;
  // overflow-y: hidden;

  .home-page-body {
    padding: 16px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    position: relative;

    .ul {
      position: absolute;
      top: 0;
      left: 20px;
    }

    .table {
      width: calc(100% - 200px);
      margin-left: 200px;
    }

    .title {
      text-align: center;
      display: inline-block;
      margin: 16px 0px;
      width: 180px;
      height: 52px;
      background: rgba(243, 245, 249, 1);
      border-radius: 2px;
    }
  }
}

.styleHover {
  color: #666;
}
</style>
<style lang='stylus'>
.w-input {
  width: 200px !important;
}

.ul {
  .w-button:hover, .w-button:focus {
    background: rgba(207, 224, 255, 1) !important;
  }

  .w-button--text:hover {
    color: #0F49ED;
  }

  .w-button--text {
    color: #000622;
  }

  .styleHover {
    .w-button {
      color: #0F49ED;
      background: rgba(207, 224, 255, 1) !important;
    }
  }
}
</style>
