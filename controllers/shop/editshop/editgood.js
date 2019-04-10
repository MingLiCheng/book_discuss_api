const {
  mysql
} = require('../../../qcloud')
module.exports = async (ctx, next) => {

  const {
    price,
    good_id,
    number
  } = ctx.request.body
  console.log('x', price, 'xxx', good_id);

  try {
    const res = await mysql('goods').update({
      price,
      number
    }).where('good_id', good_id)
    ctx.state.data = {
      message: 'SUCCESS'
    }
  } catch (error) {
    ctx.state.data = {
      message: 'fild'
    }
  }

}
