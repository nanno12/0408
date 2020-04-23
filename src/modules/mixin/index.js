// write your mixins here...
// eslint-disable-next-line import/prefer-default-export
export default {
  methods: {
    showMsg1 (res,message){
      if (res.type === 'SUCCESS') {
        this.$message({
          message: message + '成功',
          label: '成功',
          type: 'success'
          })
      } else {
        this.$message({
          message: message + '失败',
          label: '错误',
          type: 'error',
        })
      return
      }
    },
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