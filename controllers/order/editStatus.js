const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { order_id, pay_status, trade_status } = ctx.request.body
  try {
    await mysql('orderinfo').update({
      pay_status,
      trade_status
    }).where('order_id', order_id)
    ctx.state.data = {
      message: 'SUCCESS'
    }
  } catch (error) {
    ctx.state.data = {
      message: 'fail'+ error
    }
  }

}