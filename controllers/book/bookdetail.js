const {mysql} = require('../../qcloud')

module.exports = async (ctx) => {
    const {id, openid} = ctx.request.query
    let detail
    let isCollect
    if (openid){
        detail = await mysql('books')
            .select('books.*', 'cSessionInfo.user_info')
            .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
            .where('id', id)
            .first()
        isCollect = await mysql('collects').where('collects.item_id',id).where('collects.type_id', 1).count('collects.collect_id as cout')
        const info = JSON.parse(detail.user_info)
        ctx.state.data = Object.assign({}, detail, {
            tags: detail.tags.split(','),
            summary: detail.summary.split('\n'),
            catalog: detail.catalog.split('\n'),
            user_info: {
                name: info.nickName,
                image: info.avatarUrl
            },
            isCollect: isCollect[0].cout,
        })
    }else{
        detail = await mysql('books')
            .select('books.*', 'cSessionInfo.user_info')
            .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
            .where('id', id)
            .first()
        const info = JSON.parse(detail.user_info)
        ctx.state.data = Object.assign({}, detail, {
            tags: detail.tags.split(','),
            summary: detail.summary.split('\n'),
            catalog: detail.catalog.split('\n'),
            user_info: {
                name: info.nickName,
                image: info.avatarUrl
            },
            isCollect: 0
        })
    }




    await mysql('books')
          .where('id', id)
          .increment('count', 1)
}
