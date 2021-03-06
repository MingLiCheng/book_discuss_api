const {
  mysql
} = require('../../qcloud.js')

module.exports = async (ctx, next) => {
  const {
    issueId,
    openId,
    content,
    farther_id
  } = ctx.request.body
  console.log('xx', ctx.request.body);
  try {
    const a = await mysql('comments').insert({
      openid: openId,
      issue_id: issueId,
      content,
      farther_id
    })
    ctx.state.data = {
        data: a[0],
        message: 'SUCCESS'
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