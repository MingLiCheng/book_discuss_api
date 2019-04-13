const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { openid } = ctx.request.query
  const books = await mysql('collects') 
                        .select('collects.*','books.title')
                         .join('books', 'collects.item_id', 'books.id')
                          .where('open_id', openid).where('collects.type_id', 1)
  const issues = await mysql('collects')
                          .select('collects.*', 'issues.title')
                            .join('issues', 'collects.item_id', 'issues.id')
                              .where('collects.open_id', openid).where('collects.type_id', 3)
  ctx.state.data = {
    books,
    goods:[],
    issues,
    message: 'SUCCESS'
  }
}