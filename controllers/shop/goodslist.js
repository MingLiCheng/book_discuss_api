const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { page } = ctx.request.query
  // 获取所有商品的列表
  const size = 10
  const goods = await mysql('goods').select('goods.*', 'books.title', 'books.image', 'books.author','books.price as book_price').join('books', 'goods.book_id', 'books.id').limit(size).offset(Number(page) * size)
  const total = await mysql('goods').count('good_id as total')
  ctx.state.data = {
    message:'SUCCESS',
    list:goods.map(v => {
      v.price = v.price.toFixed(2)
      return v
    }),
    total: total[0].total
  }
}