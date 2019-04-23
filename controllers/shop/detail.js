const {
  mysql
} = require('../../qcloud')

module.exports = async (ctx, next) => {
  const {
    good_id
  } = ctx.request.query
  // 获取商品信息 根据商品 id
  const size = 10
  const goodInfo = await mysql('goods')
    .select('goods.*', 'goods.price as goodprice','books.title', 'books.image', 'books.price', 'books.author')
    .join('books', 'goods.book_id', 'books.id')
    .where('goods.good_id', good_id)

  ctx.state.data = {
    message: 'SUCCESS',
    goodInfo: goodInfo
  }
}