const { mysql } = require('../../../qcloud')

// 获取所有用户信息
module.exports = async (ctx, next) => {
  const { user_id } = ctx.request.body
  try {
    // 首先查询 是否存在
    const res = await mysql('adminusers').del().where('user_id', user_id)
    console.log('res', res);
    
    if (res) {
      // 存在
      ctx.state.data = {
        message: 'SUCCESS'
      }
    } else {
      ctx.state.data = {
        message: 'fail'
      }
    }
  } catch (error) {
    ctx.state.data = {
      message: '失败，' + error
    }
  }

}