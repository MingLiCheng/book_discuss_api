const { mysql } = require('../../../qcloud')

// 获取所有用户信息
module.exports = async (ctx, next) => {
    try {
        const admins = await mysql('adminusers').select()
        ctx.state.data = {
            admins,
            message: 'SUCCESS'
        }
    } catch (error) {
        ctx.state.data = {
            message: 'fail'
        }
    }

}