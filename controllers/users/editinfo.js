const {
  mysql
} = require('../../qcloud')

module.exports = async (ctx, next) => {

  const {
    open_id,
    username,
    tel_num,
    email
  } = ctx.request.body
  console.log('xxxxxxxxxxxxopen_id', open_id, 'username', username, 'tel_num', tel_num, 'email', email)

  // 首先查询是否由此用户
  try {
 const a = await mysql('users').select('users.*').where('users.open_id', open_id)
  if(a.length < 1){
     await mysql('users').insert({
       username,
       tel_num,
       email,
      open_id
     })

  }else{
        const a = await mysql('users').update({
          username,
          tel_num,
          email
        }).where('users.open_id', open_id)

        ctx.state.data = {
          message: 'SUCCESS',
          info: 'editinfo'
        }
  }


  } catch (error) {
    ctx.state.data = {
      message: 'filed',
      info: 'editinfo'
    }
  }

}