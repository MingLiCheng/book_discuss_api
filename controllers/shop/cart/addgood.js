const { mysql } = require('../../../qcloud')

module.exports = async (ctx, next) => {
  const { open_id, good_id, goodnum, goodprice } = ctx.request.body
  // 进行物品合并
  // 查询是否有当前商品
  const x = await mysql('cart').select('cart.*').where('open_id', open_id).where('good_id', good_id)
  console.log('x', x.length)
  if(x.length == 0){
      await mysql('cart').insert({
        open_id,
        good_id,
        goodnum,
        goodprice,
        countprice: `${parseInt(goodnum) * parseFloat(goodprice) }`
      })
  }else{
    await mysql('cart').update({
      goodnum: parseInt(goodnum)  + parseInt(x[0].goodnum) ,
      countprice: (parseInt(goodnum) + parseInt(x[0].goodnum)) * parseFloat(goodprice)
    }).where('cart.cart_id', x[0].cart_id)
  }


  ctx.state.data = {
    message: 'SUCCESS'
  }
}