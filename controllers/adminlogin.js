const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  const { email, password } = ctx.request.body
  console.log('email',email,'password',password)
  if(email === 'murray@qq.com' && password === '123'){
      const token = jwt.sign({
        email:email
      }, 'jwtSecret', {
        expiresIn: '2h'
      })
        ctx.state = {
          code: 0,
          data: {
            token: `Bearer ${token}`,
          }
        }
  }else{
    ctx.state = {
      code: -1,
      data: {
        msg:'用户名或密码错误'
      },
    }
  }


}