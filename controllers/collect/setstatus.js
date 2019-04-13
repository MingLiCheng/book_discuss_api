const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { isCollect, openid, goodsid, bookid, issueid } = ctx.request.body

  let res
  if (isCollect == 1) { // 添加
    if (bookid) {// 书本
      res = await mysql('collects').insert({
        open_id: openid,
        item_id: bookid,
        type_id: 1
      })
    } else if (goodsid) {// 商品
      res = await mysql('collects').insert({
        open_id: openid,
        item_id: goodsid,
        type_id: 2
      })
    } else {// 评论
      res = await mysql('collects').insert({
        open_id: openid,
        item_id: issueid,
        type_id: 3
      })
    }
  } else { // 删除
    if (bookid) {// 书本
      res = await mysql('collects').where('open_id', openid).del().where('type_id', 1).where('item_id', bookid)
    } else if (goodsid) {//商品 
      res = await mysql('collects').where('open_id', openid).del().where('type_id', 2).where('item_id', goodsid)
    } else {// 评论
      res = await mysql('collects').where('open_id', openid).del().where('type_id', 3).where('item_id', issueid)
    }
  }

  ctx.state.data = {
    res,
    message: 'SUCCESS'
  }
}