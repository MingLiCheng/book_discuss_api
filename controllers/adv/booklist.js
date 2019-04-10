const {
  mysql
} = require('../../qcloud')

module.exports = async (ctx) => {
  const {
    page,
    openid,
    size = 1,
    typeId
  } = ctx.request.query
  const bookslist = mysql('adv').select('adv.*', 'books.*').join('books', 'adv.item_id', 'books.id')
  const goodslist = mysql('adv').select('adv.*', 'goods.*', 'books.*')
    .join('goods', 'adv.item_id', 'goods.good_id')
    .join('books', 'goods.book_id', 'books.id')

  if (typeId == 1) {
    res = await goodslist.limit(size).offset(Number(page) * Number(size))
    ctx.state.data = {
      list: res,
      message: 'SUCCESS'
    }
  }else if(typeId == 0) {
    res = await bookslist.limit(size).offset(Number(page) * Number(size))
    ctx.state.data = {
      list: res,
      message: 'SUCCESS'
    }
  } else {
    ctx.state.data = {
      message: 'typeId 无效'
    }
  }
}
