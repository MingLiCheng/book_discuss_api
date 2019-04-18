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

  // 首先判断 user_book是否有此信息
  const userBookId = await mysql('user_book').select('user_book.id').where('user_book.openid', openid).where('user_book.bookid', bookid).first()
  if (userBookId) {// 存在
    await mysql('user_book').where('user_book.id', userBookId.id).update({
      iscomment: 1
    })
  } else {// 不存在 新建
    await mysql('user_book').insert({
      openid,
      bookid,
      iscomment: 1
    })
  }

  ctx.state.data = {
    data: res[0],
    message: 'SUCCESS'
  }
}
