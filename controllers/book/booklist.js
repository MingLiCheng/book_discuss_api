
const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
    let { page, openid, size = 5, type } = ctx.request.query
    if (type == 'undefined' || type == 'tab1') {
        type = false
    }
    const mysqlSelect = mysql('books')
        .select('books.*')
        .orderBy('books.id', 'desc')
    const total = await mysql('books').count('id as total')
    console.log('total', total, 'openid', openid)
    let books

    if (type) {
        books = await mysqlSelect.limit(size).offset(Number(page) * size).where('books.category',
            type)
    } else {
        // 全部图书 分页
        books = await mysqlSelect.limit(size).offset(Number(page) * Number(size))
    }

    // 查询是否有推荐信息
    let recommends = []
    if (openid) {
        recommends = await mysql('recommend')
            .select('recommend.bookid', 'recommend.id as recommendId', 'recommend.rec_rate', 'books.*')
            .join('books', 'recommend.bookid', 'books.id')
            .where('recommend.openid', openid).orderBy('recommend.rec_rate', 'desc')
            .limit(1).offset(Number(page) * 1)
    }

    // 查询广告
    let advs = []
    if (type) {
        advs = await mysql('adv')
            .select('adv.*', 'books.*')
            .join('books', 'adv.item_id', 'books.id')
            .where('books.category', type)
            .limit(1).offset(Number(page) * 1)
    } else {
        advs = await mysql('adv')
            .select('adv.*', 'books.*')
            .join('books', 'adv.item_id', 'books.id')
            .limit(1).offset(Number(page) * 1)
    }



    ctx.state.data = {
        list: books,
        recommends,
        advs,
        total: total[0].total
    }
}
