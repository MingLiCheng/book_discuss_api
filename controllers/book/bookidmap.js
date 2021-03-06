const {
  mysql
} = require('../../qcloud')

module.exports = async (ctx, next) => {
  const {
    bookname
  } = ctx.request.query
  console.log('bookname', bookname)
  if (bookname) {
    const maplist = await mysql('books').select('books.id', 'books.title', 'books.price').where('books.title', 'like', `%${bookname}%`)
    ctx.state.data = {
      list: maplist.map(v => {
        return {
          value: v.id,
          title: v.title,
          price: v.price
        }
      })
    }
  } else {
    const maplist = await mysql('books').select('books.id', 'books.title')
    ctx.state.data = {
      list: maplist.map(v => {
        return {
          value: v.id,
          title: v.title,
        }
      })
    }
  }
}