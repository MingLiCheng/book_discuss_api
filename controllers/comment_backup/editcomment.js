const {
    mysql
} = require('../../qcloud')

// 根据id修改主题问题
module.exports = async (ctx, next) => {
    const {
        commentid,  title, summary, upnumber, downnumber
    } = ctx.request.body
    console.log('xx',
        commentid, title, summary, upnumber, downnumber)
    try {
        const res = await mysql('comments').update({
             title, summary, upnumber, downnumber
        }).where('comments.id', commentid)
        console.log('res', res)
           ctx.state.data = {
               message: 'success',
               data:true
           }
    } catch (error) {
        ctx.state.data = {
            code: -1,
            message: 'fild',
            data: false
        }
    }

}