const { mysql } = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const { open_id, addressId } = ctx.request.body

  try {
    await mysql('address').del()
    .where('open_id', open_id)
    .where('addressId', addressId)
    
    ctx.state.data = {
      message: 'SUCCESS'
    }
  } catch (error) {
    ctx.state.data = {
      message: 'filed',
      info: 'updateads',
      error
    }
  }





}