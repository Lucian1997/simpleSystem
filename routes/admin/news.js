let express = require('express');
let router = express.Router();
let sqlQuery = require('../../public/js/lSql')


/**
 * @Description: 文章列表页
 * @date: 2021/4/28 9:11
*/
router.get('/articleList', (req, res, next) => {
  res.render('admin/news/articleList')
});

/**
 * @Description: 获取文章列表
 * @date: 2021/4/28 10:41
*/
router.get('/api/articleList', async (req, res, next) => {
  let page = parseInt(req.query.page)
  let limitNum = parseInt(req.query.limit)
  let sqlStr = "SELECT * FROM article LIMIT ?,?"
  let arr = [(page - 1) * limitNum, limitNum]
  let result = await sqlQuery(sqlStr, arr)
  sqlStr = 'SELECT count(id) as num FROM article'
  let total = await sqlQuery(sqlStr)
  res.json({
    code: 0,
    msg: '查询文章列表成功',
    count: total[0].num,
    data: result
  })
});

/**
 * @Description: 添加文章页
 * @date: 2021/4/28 9:16
*/
router.get('/increaseArticle',  (req, res) => {
  res.render('admin/news/increaseArticle')
})

/**
 * @Description: 添加文章
 * @date: 2021/4/28 10:34
*/
router.post('/increaseArticle', async (req, res) => {
  let sqlStr = "INSERT INTO article (title,author,pubtime,content) VALUES (?,?,?,?)"
  let arr = [req.body.title,req.body.author,new Date().getTime(),req.body.content]
  await sqlQuery(sqlStr, arr)
  res.json({
    code: 0,
    msg: '添加文章成功',
    data: null
  })
})

module.exports = router;
