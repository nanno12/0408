export default {
  components: {},
  data() {
    return {
      // 左侧div宽
      leftWidth: 0,
      leftWidthCopy: 0,
      // 右侧div宽
      rightWidth: 0,
      rightWidthCopy: 0,
      // 外层div宽
      maxBlockWidth: 0,
      // 移动的slider
      sliderIndex: 0,
      // 移动标识
      moveFlag: false,
      // x坐标开始位置
      xStart: 0,
      // x坐标移动距离
      xLength: 0,
      // localStorage数据存储
      widthData: {
        leftWidth: 0,
        rightWidth: 0
      }
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
    this.initSize();
  },
  methods: {
    /* initSize */
    initSize() {
      this.widthData = JSON.parse(localStorage.getItem(this.moduleCode) || '{}');
      if(JSON.stringify(this.widthData) == '{}') {
        this.leftWidth = this.$refs.block1 ? this.$refs.block1.clientWidth : 0;
        this.rightWidth = this.$refs.block3 ? this.$refs.block3.clientWidth : 0;
      } else {
        this.leftWidth = this.widthData.leftWidth || 0;
        this.rightWidth = this.widthData.rightWidth || 0;
      }
      this.resizePage();
    },
    /* 移动开始 */
    sliderMoveStart(e, index) {
      this.maxBlockWidth = this.$refs.maxBlock.clientWidth
      this.xStart = e.x;
      this.sliderIndex = index;
      this.moveFlag = true;
      this.leftWidthCopy = JSON.parse(JSON.stringify(this.leftWidth));
      this.rightWidthCopy = JSON.parse(JSON.stringify(this.rightWidth));
      return false;
    },
    /* 移动进行中。。。 */
    sliderMove(e) {
      if(!this.moveFlag) {
        return false;
      }
      let lastLength = this.xLength;
      if(this.sliderIndex == 1 ) {
        this.xLength = e.x - this.xStart;
        this.leftWidthCopy = this.leftWidthCopy + this.xLength - lastLength;
        if(this.leftWidthCopy > this.maxBlockWidth - this.rightWidth - 30) {
          this.leftWidth = this.maxBlockWidth - this.rightWidth - 30
        } else {
          this.leftWidth = JSON.parse(JSON.stringify(this.leftWidthCopy));
        }
      } else {
        this.xLength = e.x - this.xStart;
        this.rightWidthCopy = this.rightWidthCopy - this.xLength + lastLength;
        if(this.rightWidthCopy > this.maxBlockWidth - this.leftWidth - 30) {
          this.rightWidth = this.maxBlockWidth - this.leftWidth - 30
        } else {
          this.rightWidth = JSON.parse(JSON.stringify(this.rightWidthCopy));
        }
      }
      this.resizePage();
      return false;
    },
    /* 移动结束 */
    sliderMoveEnd() {
      if(!this.moveFlag) {
        return false;
      }
      this.$store.dispatch('globle/getTabChange', this.leftWidth + this.rightWidth)
      this.moveFlag = false;
      this.xLength = 0;
      this.widthData = {
        leftWidth: this.leftWidth,
        rightWidth: this.rightWidth
      };
      localStorage.setItem(this.moduleCode, JSON.stringify(this.widthData));
    },
    /* resizePage */
    resizePage() {
      if(this.$refs.block1) {
        this.$refs.block1.style.width = this.leftWidth + 'px';
      }
      if(this.$refs.block2) {
        this.$refs.block2.style.width = `calc(100% - ${this.leftWidth + this.rightWidth}px)`;
      }
      if(this.$refs.block3) {
        this.$refs.block3.style.width = this.rightWidth + 'px';
      }
      if(this.$refs.slider1) {
        this.$refs.slider1.style.left = this.leftWidth + 'px';
      }
      if(this.$refs.slider2) {
        this.$refs.slider2.style.right = this.rightWidth + 'px';
      }
      if(this.$refs.maxBlock) {
        this.$refs.maxBlock.style.minWidth = this.leftWidth + this.rightWidth + 30 + 'px';
      }
    }
  }
};