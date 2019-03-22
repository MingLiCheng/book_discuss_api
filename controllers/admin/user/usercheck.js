const { mysql } = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const { username } = ctx.request.query
  console.log('username', username)

  const res = await mysql('adminusers').select('adminusers.user_id').where('email', username)

  if(res.length > 0){
    console.log('success')
        ctx.state = {
          code: 0,
          data: {
            msg: 'success'
          },
        }
  }else{
    console.log('filed')
    ctx.state = {
      code: -1,
      data: {
        msg: '失败，用户名不存在'
      },
    }
  }

}