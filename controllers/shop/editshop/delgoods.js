const {
  mysql
} = require('../../../qcloud')
module.exports = async (ctx, next) => {

  const {
    goodsId
  } = ctx.request.body
  try {
    const goodId = await mysql('goods').del().where('goods.good_id', goodsId)
    ctx.state.data = {
      message: 'SUCCESS'
    }
  } catch (error) {
    ctx.state.data = {
      message: 'fild'
    }
  }

}
