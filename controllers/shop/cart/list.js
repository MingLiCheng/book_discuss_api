const { mysql } = require('../../../qcloud')

module.exports = async (ctx, next) => {
  // 获取购物车信息 需要 openid
  const { openId } = ctx.request.query

  const carts =
    await mysql('cart')
    .select('cart.*','goods.book_id','books.image','books.title', 'books.author')
      .join('goods','cart.good_id','goods.good_id')
      .join('books','goods.book_id','books.id')
      .where('cart.open_id', openId)
      .orderBy('cart.cart_id', 'desc')


  ctx.state.data = {
    message: 'SUCCESS',
    carts: carts
  }
}