const {
  mysql
} = require('../../qcloud')
// post
module.exports = async (ctx, next) => {
  const {
    openId,
    fatherId,
    content
  } = ctx.request.body
  const itemId = await mysql('commentitem').insert({
    content,
    openid: openId
  })
  const fatherThread = await mysql('commentitem').select('commentitem.thread').where('itemid', fatherId)
  if (fatherThread[0].thread == null ){
    fatherThread[0].thread == ''
  }
  await mysql('commentitem').where('itemid', fatherId).update({
    thread: `${fatherThread[0].thread == null ? '' : fatherThread[0].thread}${itemId[0]},`
  })
  ctx.state.data = {
    message: 'SUCCESS'
  }
}