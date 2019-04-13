const { mysql } = require('../../../qcloud')

module.exports = async (ctx,next) => {
  const { openid , addressId } = ctx.request.query
  console.log('/address/get', addressId);
  
  let address
  if (addressId) {
    address = await mysql('address').select('*').where('addressId', addressId)
  }else{
   address = await mysql('address').select('*').where('open_id', openid)
  }
  
  ctx.state.data = {
    info: address[0],
    message: 'SUCCESS'
  }
}