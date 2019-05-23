const { mysql } = require('../../../qcloud')

// 获取所有用户信息
module.exports = async (ctx, next) => {
    const { username, email, password, tel, avatar, user_id } = ctx.request.body
  try {
    const res = await mysql('adminusers').update({
        username,
        email,
        password,
        tel,
        avatar
    }).where('user_id',user_id)
      ctx.state.data = {
          message: 'SUCCESS',
          userInfo:res
      }
  } catch (error) {
    ctx.state.data = {
      message: '失败，'+ error
    }
  }

}