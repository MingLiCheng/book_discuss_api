const {
  mysql
} = require('../../qcloud')
module.exports = async (ctx, next) => {

  const {
    page,
    openid,
    farther_id
  } = ctx.request.query

  console.log('page', page)
  const size = 2

  const selectRes = mysql('comments').select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    .orderBy('comments.id', 'desc')

  let comments
  if (openid) {
    // 根据opid过滤
    comments = await selectRes.where('books.openid', openid).limit(size).offset(Number(page) * size)
  } else {
    comments = await selectRes.where('comments.farther_id', farther_id).limit(size).offset(Number(page) * size)
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
    message: 'SUCCESS'
  }
}
