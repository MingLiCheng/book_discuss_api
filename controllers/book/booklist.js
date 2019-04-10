
const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
    const {page, openid, size=5, type } = ctx.request.query
    console.log('xxx', ctx.request.query)
    // const size = 8
    const mysqlSelect = mysql('books')
                  .select('books.*', 'cSessionInfo.user_info')
                  .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                  .orderBy('books.id', 'desc')
    const total = await mysql('books').count('id as total')
    console.log('total', total)
    let books
    if(openid){
        // 根据opid过滤
        books = await mysqlSelect.where('books.openid', openid).limit(size).offset(Number(page) * Number(size))
    }else{
        if(type){
            books = await mysqlSelect.limit(size).offset(Number(page) * size).where('books.category',
                type)
        }else{
            // 全部图书 分页
            books = await mysqlSelect.limit(size).offset(Number(page) * size)
        }

    }
    // .orderBy('id','desc')
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        }),
        total: total[0].total
    }
}
