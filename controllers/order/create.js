const { mysql } = require('../../qcloud')
const UUID = require('node-uuid')
const moment = require('moment')
module.exports = async (ctx, next) => {
  const { openid } = ctx.request.body
  try {
    const goods = await mysql('cart').select('good_id', 'goodnum', 'goodprice').where('cart.open_id', openid)
    // 首先创建一个订单
    const order_number = UUID.v1()
    const order = await mysql('orderinfo').insert({
      order_number,
      open_id: openid,
      trade_status: 0,
      pay_status: 0,
      create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    })

    let count = 0
    await goods.map(async v => {
      count = count + v.goodnum * v.goodprice
      await mysql('orderitem').insert({
        order_id: order,
        order_number,
        goods_id: v.good_id,
        goods_number: v.goodnum,
        goods_price: v.goodprice,
        create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      })
    })
    await mysql('orderinfo').update({
      order_amount: count
    }).where('order_id', order)
    // 删除购物车中的内容
    // await mysql('cart').del().where('open_id', openid)
    ctx.state.data = {
      message:'SUCCESS',
      count,
    }
  } catch (error) {
    ctx.state.data = {
      error,
      message: 'filed'
    }
  }
}