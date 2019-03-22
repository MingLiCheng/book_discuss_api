const { mysql } = require('../../qcloud')

async function getBooklistByKeyword(ctx, next) {
    const { keyword } = ctx.request.query
    const res = await mysql('books').select().where('title', 'like', `%${ keyword }%`).orWhere('isbn', 'like', `%${ keyword }%`).limit(10)
    ctx.state.data = {
        list:res,
        message:true
    }
}
async function def(params) {

}

module.exports = {
    getBooklistByKeyword,
    def: def
}