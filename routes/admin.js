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
router.post('/user/login', controllers.admin.login)
router.get('/user/checkusername', controllers.admin.usercheck)
// Token: Yes

router.post('/addbook', controllers.addbook)
router.get('/booklist', controllers.booklist)
router.get('/bookdetail', controllers.bookdetail)
router.get('/top', controllers.top)
router.post('/addcomment', controllers.addcomment)
router.get('/commentlist', controllers.commentlist)

module.exports = router