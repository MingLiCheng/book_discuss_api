const { mysql } = require('../../../qcloud')

// 获取所有用户信息
module.exports = async (ctx, next) => {
  const { username, email, password, tel } = ctx.request.body
  try {
    // 首先查询 是否存在
    const res = await mysql('adminusers').select().where('email', email)
    if (res.length > 0) {
      // 存在
      ctx.state.data = {
        message: '失败，用户已经存在'
      }
    } else {
      await mysql('adminusers').insert({
        username, email, password, tel
      })
      ctx.state.data = {
        message: 'SUCCESS'
      }
    }
  } catch (error) {
    ctx.state.data = {
      message: '失败，'+ error
    }
  }

}