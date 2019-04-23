// 协同过滤
const Recommender = require('likely');
const { mysql } = require('../../qcloud')
var _ = require('lodash');
// 查询所有图书的信息
async function getBooksId () {
  const books = await mysql('books').select('books.id')
  console.log('books', books.map(v => {
    return v.id
  }))
}
// 查询所有用户
async function getUserInfo () {
  const users = await mysql('csessioninfo').select('open_id')
  console.log('users', users.map(v => {
    return v.open_id
  }));
}

// 查询用户书本关系
async function userBook (params) {
  const user_books = await mysql('user_book').select('*')

  const res = user_books.map(v => {
    let rate = 0
    if (v.visit_number >= 6) {
      rate = 3
    } else {
      rate = v.visit_number * 0.5
    }
    return {
      openid: v.openid,
      bookid: v.bookid,
      rate: rate + v.iscollect * 2 + v.iscomment * 2 + v.iscart * 3,
    }
  })
  console.log('res', res)
}
// 生成输入矩阵 第一版  狗屎版本
async function createMatrix (params) {
  const startTime = Date.now()
  // 查询所有书本
  const books = (await mysql('books').select('books.id')).map(v => {
    return v.id
  })
  console.log('books', books);

  // 查询所有用户
  const users = (await mysql('csessioninfo').select('open_id')).map(v => {
    return v.open_id
  })
  console.log('users', users);

  // 查询已经存在的 用户书本 评分
  const user_books = (await mysql('user_book').select('*')).map(v => {
    let rate = 0
    if (v.visit_number >= 6) {
      rate = 3
    } else {
      rate = v.visit_number * 0.5
    }
    return {
      openid: v.openid,
      bookid: v.bookid,
      rate: rate + v.iscollect * 2 + v.iscomment * 2 + v.iscart * 3,
    }
  })

  let matrix = new Array()
  for (let i = 0; i < users.length; i++) {
    matrix[i] = new Array()
    for (let j = 0; j < books.length; j++) {
      let temp = {
        openid: users[i],
        bookid: books[j]
      }
      const resIndex = _.findIndex(user_books, temp);
      if (resIndex >= 0) {
        matrix[i][j] = user_books[resIndex].rate
      } else {
        matrix[i][j] = 0
      }
    }
  }
  console.log('matrix', matrix)
  console.log('时间', Date.now() - startTime);
}

// 第二版本 改进
async function createMatrix2 (params) {
  const startTime = Date.now()
  // 查询所有书本
  const books = (await mysql('books').select('books.id')).map(v => {
    return v.id
  })
  console.log('books', books);

  // 查询所有用户
  const users = (await mysql('csessioninfo').select('open_id')).map(v => {
    return v.open_id
  })
  console.log('users', users);

  // 查询已经存在的 用户书本 评分
  const user_books = (await mysql('user_book').select('*')).map(v => {
    let rate = 0
    if (v.visit_number >= 6) {
      rate = 3
    } else {
      rate = v.visit_number * 0.5
    }
    return {
      openid: v.openid,
      bookid: v.bookid,
      rate: rate + v.iscollect * 2 + v.iscomment * 2 + v.iscart * 3,
    }
  })
  // 初始化二维数组 
  let matrix = new Array()
  for (let i = 0; i < users.length; i++) {
    matrix[i] = new Array()
    for (let j = 0; j < books.length; j++) {
      matrix[i][j] = 0
    }
  }

  // 搜索
  user_books.map(v => {
    // 寻找 用户再 users中的位置
    const usersIndex = _.findIndex(users, (item) => {
      return item == v.openid
    })
    // 寻找 书本再 books 中的位置 
    const booksIndex = _.findIndex(books, (item) => {
      return item == v.bookid
    })
    // console.log('v', v, 'usersIndex', usersIndex, 'booksIndex', booksIndex);

    // 重写矩阵对应的位置
    matrix[usersIndex][booksIndex] = v.rate
  })

  // console.log('max', matrix);
  console.log('时间', Date.now() - startTime);

  var Model = Recommender.buildModel(matrix, users, books);
  console.log('users', users, 'books', books);
  await mysql('recommend').del()
  users.map(userItem => {
    var recommendations = Model.recommendations(userItem);
    recommendations.map(async recommendItem => {
      await mysql('recommend').insert({
        openid: userItem,
        bookid: recommendItem[0],
        rec_rate: recommendItem[1]
      })
    })
  })
}

// createMatrix2()
// // 第三版 算法实现

// createMatrix()

// 获取用户评分数据
// var inputMatrix =
//   [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [3.5, 3.5, 0, 3.5, 0, 0, 0, 0, 0, 0, 1.5, 8],
//     [0, 3.5, 2, 0.5, 0, 3.5, 0, 0, 0, 0.5, 0, 6.5]
//   ]

// var rowLabels = ['okzye4hpGfczbtZYfSrtj1wB3vds',
//   'okzye4qU_TEfD_vZI4JYLUzGpiXk',
//   'okzye4sMbSkKkhywloxNTJ1I8QPw'];
// var colLabels = [98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109];

// var Model = Recommender.buildModel(inputMatrix, rowLabels, colLabels);

// var recommendations = Model.recommendations('okzye4qU_TEfD_vZI4JYLUzGpiXk');
// console.log('recommendations', recommendations);
// // var allItems = Model.rankAllItems(0);
// var allItems = Model.rankAllItems('okzye4qU_TEfD_vZI4JYLUzGpiXk');
// console.log('allItems', allItems);
