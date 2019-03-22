const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
    const { isbn,  title, publisher, price, author, pages, id } = ctx.request.body
    try {
    const res = await mysql('books').update({
        isbn, title, publisher, price, author, pages
    }).where('id', id)

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
