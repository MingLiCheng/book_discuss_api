const { mysql } = require('../../qcloud')
const UUID = require('node-uuid')
const moment = require('moment')
module.exports = async (ctx, next) => {
  const { openId, goodsNum, goodsId, goodsPrice } = ctx.request.body
  try {
    // 首先创建一个订单
    const order_number = UUID.v1()
    const order = await mysql('orderinfo').insert({
      order_number,
      open_id: openId,
      trade_status: 0,
      pay_status: 0,
      order_amount: goodsNum * goodsPrice,
      goods_count: goodsNum,
      create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    })

    await mysql('orderitem').insert({
      order_id: order,
      order_number,
      goods_id: goodsId,
      goods_number: goodsNum,
      goods_price: goodsPrice,
      create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    })

    ctx.state.data = {
      message: 'SUCCESS',
      count: goodsNum * goodsPrice,
      order,
    }
  } catch (error) {
    ctx.state.data = {
      error,
      message: 'filed'
    }
  }
}