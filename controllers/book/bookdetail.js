const {mysql} = require('../../qcloud')

module.exports = async (ctx) => {
    const {id, openid} = ctx.request.query
    let detail
    let isCollect
    if (openid){
        detail = await mysql('books')
            .select('books.*')
            .where('id', id)
            .first()
        isCollect = await mysql('collects').where('collects.open_id', openid).where('collects.item_id',id).where('collects.type_id', 1).count('collects.collect_id as cout')
        ctx.state.data = Object.assign({}, detail, {
            tags: detail.tags.split(','),
            summary: detail.summary.split('\n'),
            catalog: detail.catalog.split('\n'),
            isCollect: isCollect[0].cout,
        })
    }else{
        detail = await mysql('books')
            .select('books.*')
            .where('id', id)
            .first()
        ctx.state.data = Object.assign({}, detail, {
            tags: detail.tags.split(','),
            summary: detail.summary.split('\n'),
            catalog: detail.catalog.split('\n'),
            isCollect: 0
        })
    }

    await mysql('books')
          .where('id', id)
          .increment('count', 1)
          if(openid) {
              // 首先判断 user_book是否有此信息
              const userBookId = await mysql('user_book').select('user_book.id').where('user_book.openid', openid).where('user_book.bookid', id).first()
              if (userBookId){// 存在
                  await mysql('user_book').where('user_book.id', userBookId.id).increment('visit_number', 1)
              }else{// 不存在 新建
                await mysql('user_book').insert({
                    openid,
                    bookid: id,
                    visit_number: 1
                })
              }
          }
}
