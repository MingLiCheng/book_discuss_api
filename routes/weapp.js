/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

router.get('/test', (ctx, next)=> {
    console.log('/test')
    ctx.body = {
        code:0,
        msg: 'The api of weapp is running'
    }
})


// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

//book
router.post('/addbook', controllers.book.addbook)
router.get('/booklist', controllers.book.booklist)
router.get('/bookdetail', controllers.book.bookdetail)
router.get('/top', controllers.book.top)
router.get('/bookmap', controllers.book.bookidmap)
router.get('/getBooklistByKeyword', controllers.book.search.getBooklistByKeyword)
router.get('/book/getBooklistByType', controllers.book.booklistbytype)


router.post('/userinfo', controllers.users.userinfo)
router.post('/user/edituserinfo', controllers.users.editinfo)

router.get('/user/userlist', controllers.admin.user.userlist)


// 地址管理
router.get('/addresslist', controllers.users.address.addresslist)
router.get('/address/get', controllers.users.address.getAddress)
router.post('/addads', controllers.users.address.addads)
router.post('/address/del', controllers.users.address.delAddress)

// issue模块
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

// 商城
router.get('/shop/goodslist', controllers.shop.goodslist)
router.get('/shop/gooddetail', controllers.shop.detail)
// 购物车
router.get('/cart/list', controllers.shop.cart.list)
// 添加商品
router.post('/cart/addgood', controllers.shop.cart.addgood)
// 修改购物车
router.post('/cart/update', controllers.shop.cart.updategood)

// order
router.post('/order/create', controllers.order.create)
router.post('/order/list', controllers.order.list)
// collect
router.post('/collect/set', controllers.collect.setstatus)
router.get('/collect/list', controllers.collect.list)
// 用户信息

// 广告信息
router.get('/adv/listByTypeId', controllers.adv.booklist)



console.log('contor', controllers)

module.exports = router
