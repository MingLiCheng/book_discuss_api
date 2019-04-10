const { mysql } = require('../../qcloud')
module.exports = async (ctx, next) => {
  const { type } = ctx.request.query
  console.log('ctx', ctx.request.query)
  const booklist = await mysql('books').select('*').where('category', type)
  ctx.state.data = {
    message: 'SUCCESS',
    list: booklist
  }
}