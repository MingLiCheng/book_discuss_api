const {
  mysql
} = require('../../qcloud.js')

module.exports = async (ctx, next) => {
  const {
    openId,
    bookid,
    title,
    content
  } = ctx.request.body
  console.log('xx', ctx.request.body);

  try {
    const a = await mysql('comments').insert({
      openid: openId,
      bookid,
      content_id: '测试',
      title,
      summary: content.substring(0, 50),
    })
    const b = await mysql('commentitem').insert({
      comment_id: a,
      content,
      depth: '1',
      thread: '/1/'
    })
    ctx.state.data = {
      message: 'success',
      id: a + ',' + b
    }
  } catch (error) {
    console.log(error);

    ctx.state = {
      code: -1,
      data: {
        msg: '新增失败:' + error.sqlMessage
      }
    }
  }



}