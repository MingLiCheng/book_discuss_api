const jwt = require('jsonwebtoken')
const { mysql } = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const {
    email,
    password
  } = ctx.request.body

  console.log('email', email, 'password',password)
  const userInfo = await mysql('adminusers').select('*').where('email', email).limit(1)
  console.log('userInfo', userInfo)
  if(userInfo.length > 0 && userInfo[0].password == password){
        const token = jwt.sign({
          email: email
        }, 'jwtSecret', {
          expiresIn: '2h'
        })
        ctx.state = {
          code: 0,
          data: {
            token: `Bearer ${token}`,
            message: 'SUCCESS',
          },

        }
  }else {
    ctx.state = {
      code: -1,
      data: {
        msg: '用户名或密码错误'
      },
    }
  }
}