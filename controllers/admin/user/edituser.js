const { mysql } = require('../../../qcloud')

// 获取所有用户信息
module.exports = async (ctx, next) => {
  const { username, email, password, tel, user_id, authority } = ctx.request.body
  try {
    await mysql('adminusers').update({
      username, email, password, tel, authority
    }).where('user_id', user_id)
    
    ctx.state.data = {
      message: 'SUCCESS'
    }
  } catch (error) {
    ctx.state.data = {
      message: '失败，' + error
    }
  }

}