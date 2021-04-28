let express = require('express');
let router = express.Router();
let multer = require('multer')
let upload = multer({dest: "./public/upload/userIcon"})
let fs = require('fs')
let sqlQuery = require('../../public/js/lSql')
let {encrypt} = require('../../public/js/utils')

async function getRoles() {
  let sqlStr = "SELECT * FROM role"
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}

function rename(username, req) {
  let oldPath = `${req.file.destination}/${req.file.filename}`
  let newPath = `${req.file.destination}/${username}_icon_${req.file.filename}_${req.file.originalname}`
  fs.rename(oldPath, newPath, () => {
    console.log(`${username}上传头像成功`);
  })
  return {
    code: 0,
    data: {
      imgUrl: `/upload/userIcon/${username}_icon_${req.file.filename}_${req.file.originalname}`
    },
    msg: '上传头像成功'
  }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('用户管理');
});

/**
 * @Description: 个人信息页
 * @date: 2021/4/21 15:16
*/
router.get('/personalInfo', async (req, res) => {
  let username = req.session.username
  //获取用户名后查找该用户所有信息
  let sqlStr = "SELECT * FROM user WHERE username = ?"
  let result = await sqlQuery(sqlStr, [username])
  let user = result[0]
  let roles = await getRoles()
  let options = {
    user,
    roles
  }
  res.render('admin/user/personalInfo', options)
})

/**
 * @Description: 上传个人头像
 * @date: 2021/4/21 17:03
*/
router.post('/iconUpload', upload.single('icon'), async (req, res) => {
  let username = req.session.username
  let iconResult = rename(username, req)
  //上传图片路径到数据库
  let sqlStr = 'UPDATE user SET icon = ? WHERE username = ?'
  await sqlQuery(sqlStr, [iconResult.data.imgUrl, username])
  res.json(iconResult)
})

/**
 * @Description: 修改个人信息
 * @date: 2021/4/22 9:00
*/
router.post('/updatePersonalInfo',async (req, res) => {
  //更新数据
  let sqlStr = "UPDATE user SET mobile = ?,email = ? WHERE username = ?"
  let arr = [req.body.mobile, req.body.email, req.body.username]
  await sqlQuery(sqlStr, arr)
  res.json({
    code: 0,
    data: null,
    msg: '个人信息更新成功'
  })
})

/**
 * @Description: 后端渲染用户列表
 * @date: 2021/4/22 15:11
*/
router.get('/userList', async (req, res) => {
  //查找数据库的用户表
  let currentPage = req.query.currentPage ? req.query.currentPage : 1
  //查找语句
  let sqlStr = "SELECT * FROM user LIMIT ?,8"
  let result = await sqlQuery(sqlStr, [(parseInt(currentPage) - 1) * 8])
  let options = {
    userList: Array.from(result)
  }
  res.render('admin/user/userList', options)
})

/**
 * @Description: 获取用户列表数据
 * @date: 2021/4/23 14:02
*/
router.get('/api/userList', async (req, res) => {
  let page = parseInt(req.query.page)
  let limitNum = parseInt(req.query.limit)
  let sqlStr =
    `
    SELECT a.id,a.username,a.email,a.mobile,a.icon,a.role_id,b.role_name 
    FROM user as a 
    LEFT JOIN role as b 
    ON a.role_id = b.id 
    LIMIT ?,?
    `
  let arr = [(page - 1) * limitNum, limitNum]
  let result = await sqlQuery(sqlStr, arr)
  // 获取用户总数
  sqlStr = 'SELECT count(id) as num FROM user'
  let total = await sqlQuery(sqlStr)
  res.json({
    code: 0,
    msg: '查询用户列表成功',
    count: total[0].num,
    data: result
  })
})

/**
 * @Description: 删除用户
 * @date: 2021/4/22 17:47
*/
router.post('/deleteUser', async (req, res) => {
  let delList =  req.body['delList[]']
  let sqlStr = `DELETE FROM user WHERE id in (${delList.toString()})`
  await sqlQuery(sqlStr)
  res.json({
    code: 0,
    data: null,
    msg: '删除用户成功'
  })
})

/**
 * @Description: 修改用户信息页
 * @date: 2021/4/26 9:33
*/
router.get('/editUser', async (req, res) => {
  let id = req.query.id
  let sqlStr = "SELECT * FROM user WHERE id = ?"
  let result = await sqlQuery(sqlStr, [id])
  let user = result[0]
  let roles = await getRoles()
  let options = {
    user,
    roles
  }
  res.render('admin/user/userInfo', options)
})

/**
 * @Description: 上传用户头像
 * @date: 2021/4/26 10:48
*/
router.post('/uploadUserIcon', upload.single('icon'), async (req, res) => {
  let id = parseInt(req.query.id)
  let username = req.query.username
  let iconResult = rename(username, req)
  //上传图片路径到数据库
  let sqlStr = 'UPDATE user SET icon = ? WHERE id = ?'
  await sqlQuery(sqlStr, [iconResult.data.imgUrl, id])
  res.json(iconResult)
})

/**
 * @Description: 修改用户信息
 * @date: 2021/4/26 11:27
*/
router.post('/updateUserInfo',async (req, res) => {
  let id = parseInt(req.query.id)
  //更新数据
  let sqlStr = "UPDATE user SET username = ?,mobile = ?,email = ?,password = ?,role_id = ? WHERE id = ?"
  let arr = [req.body.username, req.body.mobile, req.body.email, encrypt(req.body.pass), req.body.role_id, id]
  await sqlQuery(sqlStr, arr)
  res.json({
    code: 0,
    data: null,
    msg: '用户信息更新成功'
  })
})

/**
 * @Description:  新增用户页
 * @date: 2021/4/26 11:56
*/
router.get('/increaseUser', async (req, res) => {
  let roles = await getRoles()
  res.render('admin/user/increaseUser', {roles})
})

/**
 * @Description: 新增用户的上传
 * @date: 2021/4/26 14:08
*/
router.post('/increaseUserIcon', upload.single('icon'), async (req, res) => {
  let iconResult = rename('default', req)
  res.json(iconResult)
})


/**
 * @Description: 新增用户
 * @date: 2021/4/26 14:27
*/
router.post('/increaseUser',async (req, res) => {
  //判断用户名是否存在
  let sqlStr = "SELECT * FROM user WHERE username = ?"
  let result = await sqlQuery(sqlStr, [req.body.username])
  if (result.length === 0) {
    sqlStr = "INSERT INTO user (username, mobile, email, password, role_id, icon) VALUES (?,?,?,?,?,?)"
    let arr = [
      req.body.username,
      req.body.mobile,
      req.body.email,
      encrypt(req.body.password),
      req.body.role_id,
      req.body.iconText
    ]
    await sqlQuery(sqlStr, arr)
    res.json({
      code: 0,
      data: null,
      msg: '新增用户成功'
    })
  }else {
    res.json({
      code: 1,
      data: null,
      msg: '用户名存在'
    })
  }
})

module.exports = router;
