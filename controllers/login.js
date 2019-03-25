const jwt = require('jsonwebtoken')
const { mysql } = require('../qcloud')

// 登录授权接口
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    if (ctx.state.$wxInfo.loginState) {
        console.log('1', ctx.state.$wxInfo)
        // 先查询是否存在
        const isExist = await mysql('users').select().where('open_id', ctx.state.$wxInfo.userinfo.userinfo.openId)
        if(isExist.length < 1){
        const res =  await mysql('users').insert({
                open_id: ctx.state.$wxInfo.userinfo.userinfo.openId,
                isusable: 0
            })
        }
        ctx.state.data = ctx.state.$wxInfo.userinfo
        // ctx.state.data['token'] = token
        ctx.state.data['time'] = Math.floor(Date.now() / 1000)
    }
}
