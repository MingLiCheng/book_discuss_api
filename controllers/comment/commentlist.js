const {
  mysql
} = require('../../qcloud')
module.exports = async (ctx, next) => {

  const {
    page,
    openid,
    issue_id
  } = ctx.request.query

  console.log('page', page)
  const size = 10

  const selectRes = mysql('comments').select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    .orderBy('comments.id', 'desc')

  let comments
  let res = []
  if (openid) {
    // 根据opid过滤
    comments = await selectRes.select('issues.title')
      .join('issues', 'issues.id', 'comments.issue_id')
      .where('comments.openid', openid)
      .limit(size).offset(Number(page) * size)
    res = await mysql('comments').select('comments.*', 'cSessionInfo.user_info')
      .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
      .where('comments.openid', openid).whereNull('comments.issue_id')
      .orderBy('comments.id', 'desc')
      .limit(size).offset(Number(page) * size)

  } else if (issue_id) {
    comments = await selectRes.where('comments.issue_id', issue_id).limit(size).offset(Number(page) * size)
    // childComments = await selectRes.where('comments.farther_id', issue_id).limit(2).offset(Number(page) * 2)
  } else {
    // 全部
    comments = await selectRes.limit(size).offset(Number(page) * size)
  }

  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName,
          avatarUrl: info.avatarUrl
        }
      })
    }),
    res: res.map(v => {
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