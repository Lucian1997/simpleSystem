let express = require('express');
let router = express.Router();
let sqlQuery = require('../../public/js/lSql')

router.get('/', (req, res, next) => {
  res.render('角色管理')
});

/**
 * @Description: 角色管理页
 * @date: 2021/4/26 16:40
*/
router.get('/roleList', (req, res, next) => {
  res.render('admin/role/roleList')
});

/**
 * @Description: 获取角色列表
 * @date: 2021/4/26 16:40
*/
router.get('/api/roleList', async (req, res, next) => {
  let page = parseInt(req.query.page)
  let limitNum = parseInt(req.query.limit)
  let sqlStr = "SELECT * FROM role LIMIT ?,?"
  let arr = [(page - 1) * limitNum, limitNum]
  let result = await sqlQuery(sqlStr, arr)
  sqlStr = 'SELECT count(id) as num FROM role'
  let total = await sqlQuery(sqlStr)
  res.json({
    code: 0,
    msg: '查询用户列表成功',
    count: total[0].num,
    data: result
  })
});

/**
 * @Description: 添加角色页
 * @date: 2021/4/27 9:42
*/
router.get('/increaseRole', async (req, res) => {
  res.render('admin/role/increaseRole')
})

/**
 * @Description: 添加角色
 * @date: 2021/4/27 11:42
*/
router.post('/increaseRole', async (req, res) => {
  let role_name = req.body.role_name
  let desc = req.body.desc
  //修改角色表
  let sqlStr = "INSERT INTO role (role_name, `desc`) VALUES (?,?)"
  await sqlQuery(sqlStr, [role_name, desc])
  //修改角色与权限关系表
  let auth = req.body.auth
  auth.forEach(item => {
    let sql = "INSERT INTO role_auth (role_id, auth_id) VALUES ((SELECT id FROM role WHERE role_name = ?), ?)"
    let arr = [role_name, item.value]
    sqlQuery(sql, arr)
  })
  res.json({
    code: 0,
    msg: '添加角色成功',
    data: null
  })
})

module.exports = router;
