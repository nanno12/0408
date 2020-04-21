// write your mixins here...
// eslint-disable-next-line import/prefer-default-export
export default {
    methods: {
      showMsg (message,type) {
        if (type === 'success') {
          this.$message({
            message,
            label: '成功',
            type: 'success'
          })
        } else if (type === 'warning') {
          this.$message({
            message,
            label: '警告',
            type: 'warning',
          })
        } else {
          this.$message({
            message,
            label: '错误',
            type: 'error',
          })
        }
      }
    }
  }