const { mysql }  = require('../../qcloud')

//1.关键词和搜索历史接口
async function indexAction(ctx) {
  const openId = ctx.query.openId;
  // 默认关键词
  const defaultKeyword = await mysql('search_keywords').where({
    is_default: 1
  }).limit(1).select();
  // 取出热闹关键词
  const hotKeywordList = 
  await mysql('search_keywords').distinct('keyword').column('keyword', 'is_hot').limit(10).select();

  const historyData 
  = await mysql('search_history').where({
    "openid": openId
  }).limit(10).select();
  ctx.state.data = {
    "defaultKeyword": defaultKeyword[0],
    "hotKeywordList": hotKeywordList,
    "historyData": historyData
  }
}

//搜索的时候匹配搜索相关的
async function helperAction(ctx) {
  const keyword = ctx.query.keyword;
  const keywords = await mysql('books')
    .select('books.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
    .where('title', 'like', `%${keyword}%`).orWhere('isbn', 'like', `%${keyword}%`)
    .orderBy('books.id', 'desc')
  if (keyword) {
    ctx.state.data = {
      keywords: keywords.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          user_info: {
            nickName: info.nickName
          }
        })
      })
    }
  } else {
    ctx.state.data = {
      keywords: []
    }
  }

}

//添加搜索历史,add
async function addHistoryAction(ctx) {

  const {
    openId,
    keyword
  } = ctx.request.body

  const oldData = await mysql('search_history').where({
    "openid": openId,
    "keyword": keyword
  })
  if (oldData.length == 0) {
    const data = await mysql('search_history').insert({
      "openid": openId,
      "keyword": keyword,
      "add_time": parseInt(new Date().getTime() / 1000)
    })
    if (data) {
      ctx.state.data = {
        data: "success"
      }
    } else {
      ctx.state.data = {
        data: "fail"
      }
    }
  } else {
    ctx.state.data = {
      data: "已经有记录了"
    }
  }

}

//清除历史记录
async function clearhistoryAction(ctx) {

  const openId = ctx.request.body.openId;
  console.log(openId);

  const data = await mysql('search_history').where({
    "openid": openId
  }).del();
  if (data) {
    ctx.state.data = {
      "data": "清除成功"
    }
  } else {
    ctx.state.data = {
      "data": null
    }
  }

}

module.exports = {
  indexAction,
  helperAction,
  addHistoryAction,
  clearhistoryAction
}

// async function () {
// }
// await this.model('search_history').add({
//   keyword: keyword,
//   openid: think.userId,
//   add_time: parseInt(new Date().getTime() / 1000)
// });
