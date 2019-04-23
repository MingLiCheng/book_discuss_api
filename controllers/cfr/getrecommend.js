const { mysql } = require('../../qcloud')
module.exports = async (ctx, next) => {
  const { openid } = ctx.request.body
  // 根据id 查询
  const list = await mysql('recommend')
    .select('recommend.bookid', 'recommend.rec_rate', 'books.*')
    .join('books', 'recommend.bookid', 'books.id')
    .where('recommend.openid', openid).orderBy('recommend.rec_rate', 'desc').limit(6)

    ctx.state.data = {
      rec_list: list
    }
}