const {
  mysql
} = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const { open_id, province, city, area, street, tel_num, name, addressId } = ctx.request.body
  let res
  try {
    if (addressId) {
      res = await mysql('address')
        .update({ province, city, area, street, tel_num, name })
        .where('open_id', open_id)
        .where('addressId', addressId)
    } else {
      res = await mysql('address').insert({ open_id, province, city, area, street, tel_num, name })
    }

    ctx.state.data = {
      message: 'SUCCESS',
      info: res,
    }
  } catch (error) {
    ctx.state.data = {
      message: 'filed',
      error
    }
  }





}