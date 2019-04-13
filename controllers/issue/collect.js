const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { page = 0, size = 5, openid } = ctx.request.query

  const issues = await mysql('issues').select('issues.*', 'cSessionInfo.user_info', 'collects.collect_id')
    .join('cSessionInfo', 'issues.openid', 'cSessionInfo.open_id')
    .join('collects', 'issues.id', 'collects.item_id')
    .where('collects.open_id', openid)
    .where('collects.type_id', 3)
    .orderBy('issues.id', 'desc')

  ctx.state.data = {
    list: issues.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName,
          avatarUrl: info.avatarUrl
        }
      })
    }),
    message: 'SUCCESS'
  }
}
