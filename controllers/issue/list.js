const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { page = 0, size = 5, openid } = ctx.request.query

  const listSql = mysql('issues').select('issues.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'issues.openid', 'cSessionInfo.open_id')
    .orderBy('issues.id', 'desc')
  let issues
  if (openid) {
    issues = await listSql.where('openid', openid).limit(size).offset(Number(page) * Number(size))
  } else {
    issues = await listSql.limit(size).offset(Number(page) * Number(size))
  }
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
