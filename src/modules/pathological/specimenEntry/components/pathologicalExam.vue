<template>
    <div id="pathologicalExam">
      <template v-for="(item, index) in pathList">
        <div :key="index">
          <div class="pathExamRecord">
            <p>病理号：{{ item.inspectNo }}</p>
            <p>{{ item.inspectAt }}&ensp;&ensp;{{ item.inspectOrgan }}</p>
            <p style="font-weight:600;margin-top:20px">病理诊断：</p>
            <p>{{ item.inspectDiag }}</p>
          </div>
          <hr/>
        </div>
      </template>
    </div>
</template>

<script>
export default {
  props: {
    pathList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
#pathologicalExam {
  font-size: 13px;
  .pathExamRecord {
    p {
      margin: 10px 0;
    }
  }
}
</style>
