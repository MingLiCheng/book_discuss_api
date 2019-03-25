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
router.get('/bookdetail', controllers.book.bookdetail)
router.get('/top', controllers.book.top)
router.get('/getBooklistByKeyword', controllers.book.search.getBooklistByKeyword)


// 评论信息模块
router.post('/addcomment', controllers.comment.addcomment)
router.get('/commentlist', controllers.comment.commentlist)
router.get('/commentdetail', controllers.comment.detail)
router.post('/addchildcomment', controllers.comment.addchildcomment)

// 用户信息
router.get('/user/userlist', controllers.admin.user.userlist)
router.post('/user/userinfo', controllers.users.userinfo)

module.exports = router