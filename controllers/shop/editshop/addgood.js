const {
  mysql
} = require('../../../qcloud')
module.exports = async (ctx, next) => {

  const {
    price,
    book_id
  } = ctx.request.body
    try {
      const goodId = await mysql('goods').insert({
        book_id,
        price
      })
      console.log(goodId);

        ctx.state.data = {
          message: 'SUCCESS'
        }
    } catch (error) {
        ctx.state.data = {
          message: 'fild'
        }
    }




}
