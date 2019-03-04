module.exports = async (ctx, next) => {

  const { username } = ctx.request.query
  console.log('username', username)
  if(username == 'murray@qq.com'){
    ctx.state = {
      code: 0,
      data: {
        msg: 'success'
      },
    }
  }else{
    ctx.state = {
      code: -1,
      data: {
        msg: '失败，用户名不存在'
      },
    }
  }

}