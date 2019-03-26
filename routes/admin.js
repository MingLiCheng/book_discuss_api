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
// 管理员登陆接口
// Token: No
router.post('/user/login', controllers.admin.user.login)
router.get('/user/checkusername', controllers.admin.user.usercheck)

// Token: Yes
// 书本模块
router.post('/addbook', controllers.book.addbook)
router.get('/booklist', controllers.book.booklist)
router.get('/book/detail', controllers.book.bookdetail)
router.get('/top', controllers.book.top)
router.get('/getBooklistByKeyword', controllers.book.search.getBooklistByKeyword)
router.get('/book/bookmap', controllers.book.bookidmap)

// 评论信息模块
router.post('/addcomment', controllers.comment.addcomment)
router.get('/comment/list', controllers.comment.commentlist)
router.get('/comment/detail', controllers.comment.detail)
router.post('/addchildcomment', controllers.comment.addchildcomment)
router.post('/comment/edit', controllers.comment.editcomment)

// 用户信息
router.get('/user/userlist', controllers.admin.user.userlist)
router.post('/user/userinfo', controllers.users.userinfo)

// 商城
router.get('/shop/goodslist', controllers.shop.goodslist)
router.get('/shop/gooddetail', controllers.shop.detail)
// 购物车
router.get('/cart/list', controllers.shop.cart.list)
// 添加商品
router.post('/cart/addgood', controllers.shop.cart.addgood)
// 修改购物车
router.post('/cart/update', controllers.shop.cart.updategood)
module.exports = router