const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { issueId } = ctx.request.query

  const issueDetail = await mysql('issues')
              .select('issues.*', 'books.image', 'books.title as bookName', 'books.author')
                .join('books','books.id','issues.bookid').where('issues.id', issueId)

  ctx.state.data = {
    detail: issueDetail[0],
    message: 'SUCCESS'
  }
}
