const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { issueId, openid } = ctx.request.query

  const issueDetail = await mysql('issues')
    .select('issues.*', 'books.image', 'books.title as bookName', 'books.author')
    .join('books', 'books.id', 'issues.bookid').where('issues.id', issueId)

  if (openid) {
    const isCollect = await mysql('collects')
      .where('collects.item_id', issueId)
      .where('collects.type_id', 3)
      .where('collects.open_id', openid)
      .count('collects.collect_id as cout')
    issueDetail[0].isCollect = isCollect[0].cout
    ctx.state.data = {
      detail: issueDetail[0],
      message: 'SUCCESS'
    }
  } else {
    issueDetail[0].isCollect = 0
    ctx.state.data = {
      detail: issueDetail[0],
      message: 'SUCCESS'
    }
  }

}
