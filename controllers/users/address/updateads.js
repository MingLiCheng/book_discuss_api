const {
  mysql
} = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const {
    open_id,
    addressId,
    province,
    city,
    area,
    street,
    tel_num,
    name
  } = ctx.request.body

  try {
    await mysql('address').update({
      province,
      city,
      area,
      street,
      tel_num,
      name
    }).where('open_id', open_id)
    .where('addressId', addressId)

    ctx.state.data = {
      message: 'SUCCESS',
      info: 'updateads',
    }
  } catch (error) {
    ctx.state.data = {
      message: 'filed',
      info: 'updateads',
      error
    }
  }





}