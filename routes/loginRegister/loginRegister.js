let express = require('express');
let router = express.Router();
let {encrypt} = require('../../public/js/utils')
let sqlQuery = require('../../public/js/lSql')

/* GET users listing. */
/**
 * @Description: 登录页
 * @date: 2021/4/21 10:49
*/
router.get('/login', (req, res, next) => {
  res.render('loginRegister/login')
});

/**
 * @Description: 账号登录
 * @date: 2021/4/21 11:49
*/
router.post('/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  //判断用户是否存在
  let sqlStr = "SELECT * FROM user WHERE username = ? and password = ?"
  let result = await sqlQuery(sqlStr, [username, encrypt(password)])
  if (result.length === 0) {
    res.render('info/info', {
      title: '登录失败',
      content: '用户名或密码错误',
      href: '/rl/login',
      hrefTxt: '登录页'
    })
  }else {
    req.session.username = username
    res.render('info/info', {
      title: '登录成功',
      content: '立即跳转至后台页面',
      href: '/admin',
      hrefTxt: '后台'
    })
  }
})

/**
 * @Description: 注册页
 * @date: 2021/4/21 10:49
*/
router.get('/register', (req, res, next) => {
  res.render('loginRegister/register')
});

/**
 * @Description: 账号注册
 * @date: 2021/4/21 10:58
*/
router.post('/register', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  let mobile = req.body.mobile
  //判断用户是否存在，如果不存在才进行插入操作
  let sqlStr = "SELECT * FROM user WHERE username = ?"
  let result = await sqlQuery(sqlStr, [username])
  if (result.length != 0) {
    //告知此用户已存在，请直接登录或者找寻密码
    res.render('info/info', {
      title: '注册失败',
      content: '用户已存在',
      href: '/rl/register',
      hrefTxt: '注册页'
    })
  }else {
    //告知注册成功
    sqlStr = "INSERT INTO user (username,password,email,mobile,role_id) VALUES (?,?,?,?,1)"
    await sqlQuery(sqlStr, [username, encrypt(password), email, mobile])
    res.render('info/info', {
      title: '注册成功',
      content: '即将进入登录页',
      href: '/rl/login',
      hrefTxt: '登录页'
    })
  }
})

/**
 * @Description: 退出登录
 * @date: 2021/4/21 14:22
*/
router.get('/loginOut', (req, res) => {
  req.session.destroy()
  res.render('info/info', {
    title: '退出登录成功',
    content: '即将跳转登录页',
    href: '/rl/login',
    hrefTxt: '登录页'
  })
})

/**
 * @Description: 查找用户是否已存在
 * @date: 2021/4/26 8:49
*/
router.post('/exists/checkUsername', async (req, res) => {
  res.append('Access-Control-Allow-Origin', '*')
  res.append('Access-Control-Allow-Content-Type', '*')
  let username = req.body.username
  let sqlStr = "SELECT * FROM user WHERE username = ?"
  let result = sqlQuery(sqlStr, [username])
  if (result.length === 0) {
    res.json({
      code: 0,
      data: null,
      msg: '没有此用户名，可以使用注册'
    })
  }else {
    res.json({
      code: 1,
      data: null,
      msg: '用户名已存在'
    })
  }
})


module.exports = router;
