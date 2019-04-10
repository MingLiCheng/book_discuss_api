const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { comment_id } = ctx.request.query

  const res =await mysql('comments').del().where('comments.id', comment_id)

  ctx.state.data = {
    message: 'SUCCESS',
    data: res
  }
}