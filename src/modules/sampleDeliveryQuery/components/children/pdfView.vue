<!--
* @author w_sh
* @date 2020-03-10
* @module 标本流转查询-右侧原始报告pdf展示
-->
<template>
  <div class="pdfView" v-scroll>
    <div id="thisCanvas"></div>
    <div v-if="this.pdfPath == ''" class="undefinedReport">暂无报告</div>
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist';

export default {
  components: {

  },
  data() {
    return {
      // pdf文件对象
      pdfDoc: null,
      // 缩放比例
      scale: 1,
      // pdf页数
      pagesNum: 0
    };
  },
  props: {
    // pdf文件路径
    pdfPath: String,
    // pdf展示切换
    labelType: [Number, String]
  },
  computed: {
    pageChange() {
      return this.$store.state.globle.tabChange;
    }
  },
  watch: {
    pageChange() {
      if(this.labelType == 1) {
        this.scaleChange();
      }
    },
    pdfPath() {
      this.showPDF(this.converData(this.pdfPath));
    },
    labelType(val) {
      if(val == 1) {
        this.scaleChange();
      }
    }
  },
  created() {
    window.onresize = () => {
      return (() => {
        this.$nextTick(()  => {
          if(this.labelType == 1) {
            this.scaleChange();
          }
        });
      })();
    };
  },
  mounted() {
    // this.showPDF(this.converData(this.pdfPath));
  },
  methods: {
    converData(data) {
      let newData = data.replace(/[\n\r]/g, '');
      let raw = window.atob(newData);
      let rawLength = raw.length;
      console.log(rawLength);
      let array = new Uint8Array(new ArrayBuffer(rawLength));
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    },
    /* 获取pdf用于展示 */
    showPDF(url) {
      const content = document.getElementById('thisCanvas');
      content.innerHTML = '';
      if(this.pdfPath == '') {
        return false;
      }
      PDFJS.getDocument(url).then((pdf) => {
        this.pdfDoc = pdf;
        this.pagesNum = this.pdfDoc.numPages;
        for (let i = 1; i <= this.pagesNum; i += 1) {
          this.createPage(i);
        }
        this.scaleChange();
      });
    },
    /* 创建新页 */
    createPage(num) {
      const div = document.createElement('canvas');
      div.setAttribute('style', 'margin: 10px 10px 0 10px;');
      div.setAttribute('id', `pdf-cavans${num}`);
      const content = document.getElementById('thisCanvas');
      content.appendChild(div);
      // return div;
    },
    /* pdf缩放 */
    scaleChange() {
      if(this.pagesNum < 1) {
        return false;
      }
      this.pdfDoc.getPage(1).then((page) => {
        const viewPort = page.getViewport(1);
        const viewBoxWidth = document.getElementById('thisCanvas').offsetWidth;
        this.scale = (viewBoxWidth - 20) / viewPort.width * 0.9;
        if(this.scale > 2) {
          this.scale = 2;
        } else if(this.scale < 0.8) {
          this.scale = 0.8;
        }
      });
      for (let i = 1; i <= this.pagesNum; i += 1) {
        this.renderPage(i);
      }
    },
    /* 渲染pdf */
    renderPage(num) {
      this.pdfDoc.getPage(num).then((page) => {
        // const canvas = this.createPage(num);
        const canvas = document.getElementById(`pdf-cavans${num}`);
        const viewPort = page.getViewport(this.scale);
        canvas.height = viewPort.height;
        canvas.width = viewPort.width;
        const renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewPort
        };
        page.render(renderContext);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.undefinedReport
  text-align center
  margin-top 30px
  color #fff
.pdfView
  height 100%
  overflow-y auto
  background rgb(215, 215, 215)
  padding-bottom 10px
  #thisCanvas
    text-align center
    canvas
      width 100%
</style>
<style lang="stylus">

</style>