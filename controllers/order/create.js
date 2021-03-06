const { mysql } = require('../../qcloud')
const UUID = require('node-uuid')
const moment = require('moment')
module.exports = async (ctx, next) => {
  const { openid } = ctx.request.body
  try {
    const goods = await mysql('cart')
      .select('cart.good_id', 'cart.goodnum', 'cart.goodprice', 'goods.book_id', 'books.title')
      .join('goods', 'cart.good_id', 'goods.good_id')
      .join('books', 'books.id', 'goods.book_id')
      .where('cart.open_id', openid)
    // 首先创建一个订单
    const order_number = UUID.v1()
    const order = await mysql('orderinfo').insert({
      order_number,
      open_id: openid,
      trade_status: 0,
      pay_status: 0,
      create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    })
    console.log('goods', goods);
    
    let count = 0
    let goods_count = 0
    await goods.map(async v => {
      count = count + v.goodnum * v.goodprice
      goods_count = goods_count + v.goodnum
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
      order_amount: count,
      goods_count,
    }).where('order_id', order)
    // 删除购物车中的内容
    await mysql('cart').del().where('open_id', openid)
    ctx.state.data = {
      message: 'SUCCESS',
      count,
      order
    }
  } catch (error) {
    ctx.state.data = {
      error,
      message: 'filed'
    }
  }
}