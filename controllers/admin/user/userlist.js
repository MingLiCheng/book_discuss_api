const { mysql } = require('../../../qcloud')

// 获取所有用户信息
module.exports = async (ctx, next) => {
    const { page = 0, size = 5 } = ctx.request.query

    const res = await mysql('csessioninfo').select('uuid', 'open_id', 'create_time', 'last_visit_time', 'user_info').limit(size).offset(Number(page) * Number(size))
    const total = await mysql('csessioninfo').count('uuid as total')
    ctx.state.data = {
        list: res.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: true,
                nickName: info.nickName,
                gender: info.gender,
                country: info.country,
                avatarUrl: info.avatarUrl,
            })
        }),
        total
    }
}