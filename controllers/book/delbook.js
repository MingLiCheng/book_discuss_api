const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
    const { id } = ctx.request.body
    try {
    const res = await mysql('books').del().where('id', id)
    if (res) {
        ctx.state.data = {
            message: 'SUCCESS'
        }
    }else{
        ctx.state.data = {
            message: 'SUCCESS'
        }
    }
    } catch (error) {
        ctx.state.data = {
            message: 'FAIL'
        }
    }
}
