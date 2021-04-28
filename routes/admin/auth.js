let express = require('express');
let router = express.Router();
let sqlQuery = require('../../public/js/lSql')

router.get('/', (req, res, next) => {
  res.send('权限管理')
});

/**
 * @Description: 权限管理页
 * @date: 2021/4/26 16:16
*/
router.get('/authList', (req, res, next) => {
  res.render('admin/auth/authList')
});

/**
 * @Description: 获取权限列表（分页）
 * @date: 2021/4/26 16:18
*/
router.get('/api/authList', async (req, res, next) => {
  let page = parseInt(req.query.page)
  let limitNum = parseInt(req.query.limit)
  let sqlStr = "SELECT * FROM auth LIMIT ?,?"
  let arr = [(page - 1) * limitNum, limitNum]
  let result = await sqlQuery(sqlStr, arr)
  sqlStr = 'SELECT count(id) as num FROM auth'
  let total = await sqlQuery(sqlStr)
  res.json({
    code: 0,
    msg: '查询用户列表成功',
    count: total[0].num,
    data: result
  })
});

/**
 * @Description: 获取所有权限数据
 * @date: 2021/4/27 10:47
*/
router.get('/api/allAuthList', async (req, res, next) => {
  let sqlStr = "SELECT * FROM auth"
  let result = await sqlQuery(sqlStr)
  res.json({
    code: 0,
    msg: '获取所有权限成功',
    data: Array.from(result)
  })
});

module.exports = router;
