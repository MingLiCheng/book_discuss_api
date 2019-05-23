const jwt = require('jsonwebtoken')
const { mysql } = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const {
    email,
    password
  } = ctx.request.body

  console.log('email', email, 'password', password)
  const userInfo = await mysql('adminusers').select('*').where('email', email).first()
  console.log('userInfo', userInfo)
  if (userInfo && userInfo.password == password && userInfo.authority == 1) {
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
        userInfo: userInfo
      },
    }
  } else if (userInfo && !userInfo.authority) {
    ctx.state = {
      code: -1,
      data: {
        msg: '权限不足，请联系超管'
      },
    }
  } else {
    ctx.state = {
      code: -1,
      data: {
        msg: '用户名或密码错误'
      },
    }
  }
}