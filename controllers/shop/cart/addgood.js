const { mysql } = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const { open_id, good_id, goodnum, goodprice } = ctx.request.body
  // 进行物品合并
  // 查询是否有当前商品
  const x = await mysql('cart').select('cart.*').where('open_id', open_id).where('good_id', good_id)
  console.log('x', x.length)
  if (x.length == 0) {
    await mysql('cart').insert({
      open_id,
      good_id,
      goodnum,
      goodprice,
      countprice: `${parseInt(goodnum) * parseFloat(goodprice)}`
    })
    // 埋点
    // 首先判断 user_book是否有此信息
    const bookid = await mysql('goods').select('goods.book_id').where('goods.good_id', good_id).first()
    const userBookId = await mysql('user_book').select('user_book.id').where('user_book.openid', open_id).where('user_book.bookid', bookid.book_id).first()
    if (userBookId) {// 存在
      await mysql('user_book').where('user_book.id', userBookId.id).update({
        iscart: 1
      })
    } else {// 不存在 新建
      await mysql('user_book').insert({
        openid: open_id,
        bookid: bookid.book_id,
        iscart: 1,
        visit_number: 1,
      })
    }
  } else {
    await mysql('cart').update({
      goodnum: parseInt(goodnum) + parseInt(x[0].goodnum),
      countprice: (parseInt(goodnum) + parseInt(x[0].goodnum)) * parseFloat(goodprice)
    }).where('cart.cart_id', x[0].cart_id)
  }


  ctx.state.data = {
    message: 'SUCCESS'
  }
}