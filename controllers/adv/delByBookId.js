const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
    const { bookid } = ctx.request.body
    // 查询是否存在
    if (bookid) {
        const isExist = await mysql('adv').select('adv_id').where('item_id', bookid).where('type_id', 0).first()
        if (!isExist) {
            ctx.state.data = {
                code: -1,
                msg: '该书本不存在',
            }
        } else {
            const res = await mysql('adv').where('item_id', bookid).del()
            if (res) {
                ctx.state.data = {
                    code: 0,
                    msg: 'SUCCESS'
                }
            }
        }
    } else {
        ctx.state.data = {
            code: -1,
            msg: '暂时不支持'
        }
    }
}