const { mysql } = require('../../qcloud')

// 查询订单的数量信息
async function orderTotal (ctx, next) {
  // 全部的
  const all = await mysql('orderinfo').select('order_id')
  // 未支付的
  const noPay = await mysql('orderinfo').select('order_id').where('trade_status', '0').where('pay_status', '0')
  // 未发货的
  const noFahuo = await mysql('orderinfo').select('order_id').where('trade_status', '1')
  // 未收货的
  const noShouhuo = await mysql('orderinfo').select('order_id').where('trade_status', '2')
  // 已支付的所有金额
  const payPrice = await mysql('orderinfo').sum('order_amount as a').where('pay_status', '1').first()

  ctx.state.data = {
    code: 0,
    all: all.length,
    noPay: noPay.length,
    noFahuo: noFahuo.length,
    noShouhuo: noShouhuo.length,
    payPrice: payPrice.a,
    msg: '所有类型订单数量信息'
  }
}
// 查询未发货订单的数量
async function noFahuoTotal (ctx, next) {
  const res = await mysql('orderinfo').select('order_id').where('trade_status', '1')
  ctx.state.data = {
    code: 0,
    total: res.length,
    msg: '未发货的订单数量'
  }
}
// 查询未支付的订单的数量
async function noPayTotal (ctx, next) {
  const res = await mysql('orderinfo').select('order_id').where('trade_status', '0').where('pay_status', '0')
  ctx.state.data = {
    code: 0,
    total: res.length,
    msg: '未支付的订单数量'
  }
}

module.exports = {
  noFahuoTotal,
  noPayTotal,
  orderTotal
}