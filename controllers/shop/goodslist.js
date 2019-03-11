const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { page } = ctx.request.query
  // 获取所有商品的列表
  const size = 10
  const goods = await mysql('goods').select('goods.*', 'books.title', 'books.image', 'books.author','books.price').join('books', 'goods.book_id', 'books.id').limit(size).offset(Number(page) * size)

  ctx.state.data = {
    message:'SUCCESS',
    list:goods
  }
}