const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { title, content, bookid, openid } = ctx.request.body

  const res = await mysql('issues').insert({
    title,
    content,
    bookid,
    openid,
    upnumber:0,
    downnumber:0
  })

  ctx.state.data = {
    data: res[0],
    message: 'SUCCESS'
  }
}
