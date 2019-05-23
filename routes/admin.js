const router = require('koa-router')({
  prefix: '/admin'
})
const controllers = require('../controllers')

// 测试接口
router.get('/test', (ctx, next) => {
  console.log('/test')
  ctx.body = {
    code: 0,
    msg: 'The api of admin is running'
  }
})
/*
  管理员管理
 */
// Token: No
router.post('/user/login', controllers.admin.user.login)
router.get('/user/checkusername', controllers.admin.user.usercheck)

router.post('/user/edit', controllers.admin.user.edit)

// Token: yes
// 获取管理员列表
router.get('/admin/list', controllers.admin.user.userlist)
router.post('/admin/adduser', controllers.admin.user.adduser)
router.post('/admin/delById', controllers.admin.user.deluser)
router.post('/admin/editById', controllers.admin.user.edituser)



// Token: Yes
// 书本模块
router.post('/addbook', controllers.book.addbook)
router.get('/booklist', controllers.book.booklist)
router.get('/book/detail', controllers.book.bookdetail)
router.get('/top', controllers.book.top)
router.get('/getBooklistByKeyword', controllers.book.search.getBooklistByKeyword)
router.get('/book/bookmap', controllers.book.bookidmap)

// issue 模块
router.post('/issue/add', controllers.issue.add)
router.get('/issue/list', controllers.issue.list)
router.get('/issue/detail', controllers.issue.detail)
router.get('/issue/collect', controllers.issue.collect)

// 评论信息模块
router.post('/comment/add', controllers.comment.addcomment)
router.get('/comment/list', controllers.comment.commentlist)
router.get('/comment/childlist', controllers.comment.childcommentlist)
router.get('/comment/delById', controllers.comment.delcomment)
router.get('/comment/commentdetail', controllers.comment.detail)
router.post('/comment/addchildcomment', controllers.comment.addchildcomment)

// 用户信息
router.get('/user/userlist', controllers.admin.userlist)
router.post('/user/userinfo', controllers.users.userinfo)

/*
 商城模块
 */
router.get('/shop/goodslist', controllers.shop.goodslist)
router.get('/shop/gooddetail', controllers.shop.detail)
// 添加商品
router.post('/shop/addgood', controllers.shop.editshop.addgood)
router.post('/shop/editgood', controllers.shop.editshop.editgood)
router.post('/shop/delgood', controllers.shop.editshop.delgoods)
// 购物车
router.get('/cart/list', controllers.shop.cart.list)
// 添加商品
router.post('/cart/addgood', controllers.shop.cart.addgood)
// 修改购物车
router.post('/cart/update', controllers.shop.cart.updategood)

// 订单信息
// 订单的数量信息
router.get('/order/info/orderTotal', controllers.order.info.orderTotal)

/*
  order订单接口
 */
// 订单列表
router.post('/order/list', controllers.order.list)
// 修改订单状态
router.post('/order/editStatus', controllers.order.editStatus)

// 广告信息
router.get('/adv/listByTypeId', controllers.adv.booklist)
router.post('/adv/addByBookId', controllers.adv.addByBookId)
router.post('/adv/delByBookId', controllers.adv.delByBookId)

/*
  智能推荐算法的推荐结果
 */
// 根据openid获取该用户的推荐结果
router.post('/rec/listByOpenid', controllers.cfr.getrecommend)


module.exports = router