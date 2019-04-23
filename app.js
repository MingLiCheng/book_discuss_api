const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const koaJwt = require('koa-jwt')

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

app.use((ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg:'登陆过期'
      }
    }else{
      throw err
    }
  })
})
app.use(koaJwt({
  secret:'jwtSecret'
}).unless({
  path: [/^\/weapp\//, /^\/admin\/user\/login/, /^\/admin\/test/, /^\/admin\/usercheck/]
}))

// 引入路由分发
const router = require('./routes/weapp')
app.use(router.routes())

const adminRouter = require('./routes/admin')
app.use(adminRouter.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
