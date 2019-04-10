const {
  mysql
} = require('../../qcloud')
module.exports = async (ctx, next) => {

  const {
    page,
    openid
  } = ctx.request.query

  console.log('page',page)
  const size = 10

  const selectRes = mysql('comments').select('comments.*', 'cSessionInfo.user_info', 'books.title as booktitle')
                                        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
                                          .join('books', 'comments.bookid', 'books.id')
                                            .orderBy('comments.id', 'desc')

  let comments
  if (openid) {
    // 根据opid过滤
    comments = await selectRes.where('books.openid', openid).limit(size).offset(Number(page) * size)
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
    message:'SUCCESS'
  }



}