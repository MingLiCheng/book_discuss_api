const  { mysql } =  require('../../../qcloud')
module.exports = async (ctx, next) => {
  const { openId, xx } = ctx.request.query
  console.log('openId', openId,'xx', xx)

  const results = await mysql('address').select('address.*').where('open_id', openId)
  ctx.state.data = {
    message:'success',
    list: results
  }
}