const { mysql } = require('../../../qcloud')
module.exports = async (ctx, next) => {

    const { goodnum, goodprice, cart_id } = ctx.request.body

    if(goodnum == 0) {
      // 删除
      await mysql('cart').where('cart_id', cart_id).del()
    }else{
        await mysql('cart').update({
        goodnum: parseInt(goodnum),
        goodprice,
        countprice: parseInt(goodnum) * parseFloat(goodprice)
      }).where('cart_id', cart_id)
    }




  ctx.state.data = {
    message: 'SUCCESS'
  }
}
