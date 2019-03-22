const { mysql } = require('../../../qcloud')

// 获取所有用户信息
module.exports = async (ctx, next) => {
    const { page = 0, size = 5 } = ctx.request.query
    const res = await mysql('csessioninfo').select('uuid', 'open_id', 'create_time', 'last_visit_time', 'user_info').limit(size).offset(Number(page) * Number(size))
    // {
    //     "openId": "okzye4sMbSkKkhywloxNTJ1I8QPw",
    //     "nickName": "XYZ?",
    //     "gender": 2,
    //     "language": "zh_CN",
    //     "city": "",
    //     "province": "",
    //     "country": "Estonia",
    //     "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLZPPRnJERibvJtpK4TC8Vs631zXoOQlpI8iatrSWvP7qg8LAtWUHq037SDou8YrHjT1SgkEpcKZ9cg/132",
    //     "watermark": {
    //         "timestamp": 1550202720,
    //         "appid": "wx39e0a63b277cce56"
    //     }
    // }
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
        })
    }
}