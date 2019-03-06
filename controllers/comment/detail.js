const {
  mysql
} = require('../../qcloud')

module.exports = async (ctx, next) => {

  const {
    commentId
  } = ctx.request.query

  //查询当前评论的主要内容
  const selectSql1 = await mysql('commentitem').select('commentitem.*', 'comments.bookid', 'cSessionInfo.user_info')
  .join('comments', 'commentitem.comment_id', 'comments.id')
    .join('cSessionInfo', 'commentitem.openid', 'cSessionInfo.open_id')
      .where('commentitem.comment_id', commentId).limit(1)


  // 查询当前评论的所有子评论 将其 挂在 结果上
  var b = await tickMenuIdFilter.filter(selectSql1);
  // console.log('b',b)
  // b 和 selectSql1的值一样

  ctx.state.data = {
    msg: 'SUCCESS',
    info: selectSql1,
  }
}

var tickMenuIdFilter = (function () {
  var resultArr = new Object();

  var getTickMenuId = async function (obj) {

    if (obj.thread) {
      obj.list = []
      let lists = await mysql('commentitem').select('commentitem.*', 'cSessionInfo.user_info').join('cSessionInfo', 'commentitem.openid', 'cSessionInfo.open_id').whereIn('commentitem.itemid', obj.thread.split(','))

      for (let child of lists) {
        let { nickName, avatarUrl } = JSON.parse(child.user_info)
        child.user_info = { nickName, avatarUrl }
        await getTickMenuId(child);
      }
      obj.list = lists
    }
    resultArr.list = obj
  }

  return {
    filter: async function (arr) {
      if (!arr instanceof Array) {
        return false;
      }
      resultArr = new Object();
      resultArr.list = []
      for (let rootMenu of arr) {
                let {
                  nickName,
                  avatarUrl
                } = JSON.parse(rootMenu.user_info)
                rootMenu.user_info = {
                  nickName,
                  avatarUrl
                }
        await getTickMenuId(rootMenu);
      }
      return resultArr;
    }
  }
})();























// var tickMenuIdFilter = ( function () {
//   var resultArr = new Array();

//   var getTickMenuId = async function (obj) {
//     console.log('resultArr', resultArr)
//     resultArr.push(obj);

//     if(obj.thread){
//       let lists = await mysql('commentitem').select('commentitem.*').whereIn('commentitem.itemid', obj.thread.split(','))
//       for (let child of lists) {
//         await getTickMenuId(child);
//       }
//     }
//   }

//   return {
//     filter: async function (arr) {
//       if (!arr instanceof Array) {
//         return false;
//       }
//       resultArr = new Array();
//       for (let rootMenu of arr) {
//         await getTickMenuId(rootMenu);
//       }
//       return resultArr;
//     }
//   }
// })();