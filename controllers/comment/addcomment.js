const {
  mysql
} = require('../../qcloud.js')

module.exports = async (ctx, next) => {
  const {
    openid,
    bookid,
    title,
    summary,
    content,
    location,
    phoneversion
  } = ctx.request.body
  console.log(openid,
    bookid,
    title,
    summary,
    location,
    phoneversion)
  try {
    const a = await mysql('comments').insert({
      openid,
      bookid,
      content_id: '测试',
      title,
      summary,
      phoneversion,
      location
    })
    const b = await mysql('commentitem').insert({
      comment_id: a,
      content,
      depth: '1',
      thread: '/1/'
    })

    console.log('a', a)
    ctx.state.data = {
      message: 'success',
      id: a + ',' + b
    }
  } catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '新增失败:' + error.sqlMessage
      }
    }
  }



}