const {mysql} = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { openId }  = ctx.request.body

  const userinfos = await mysql('users').select('users.*').where('open_id',openId).limit(1)
  const address = await mysql('address').select('address.*').where('open_id', openId)
  console.log('openId', openId, 'res', userinfos)

    ctx.state.data = {
      message:'success',
      data: {
        userinfo:{
          username: userinfos[0].username,
          user_id: userinfos[0].user_id,
          openId: userinfos[0].open_id,
          tel_num: userinfos[0].tel_num,
          email: userinfos[0].email,
          address: address
        }
      },
    }

}