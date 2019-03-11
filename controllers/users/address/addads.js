const {
  mysql
} = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const {
    open_id,
    province,
    city,
    area,
    street,
    tel_num,
    name
  } = ctx.request.body

  try {
      await mysql('address').insert({
        open_id,
        province,
        city,
        area,
        street,
        tel_num,
        name
      })
        ctx.state.data = {
          message: 'SUCCESS',
          info: 'addads',
        }
  } catch (error) {
      ctx.state.data = {
        message: 'filed',
        info: 'addads',
        error
      }
  }





}