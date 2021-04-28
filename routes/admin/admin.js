let express = require('express');
let router = express.Router();
let sqlQuery = require('../../public/js/lSql')

let userRouter = require('./user')
let roleRouter = require('./role')
let authRouter = require('./auth')
let newsRouter = require('./news')
let doctorRouter = require('./doctor')
let patientRouter = require('./patient')

//判断是否符合条件进入后台
function permisson (req, res, next) {
  if (req.session.username === undefined) {
    //尚未登录
    res.render('info/info', {
      title: '尚未登录',
      content: '请重新登陆,即将返回登录页',
      href: '/rl/login',
      hrefTxt: '登录页'
    })
  }else {
    //正常进入
    next()
  }
}


/* GET users listing. */
router.get('/', permisson, (req, res, next) => {
  res.render('admin/index', {
    username: req.session.username
  })
});


//设置后台权限的中间件
async function adminAuth(req, res, next) {
  //获取登录后的用户名
  let username = req.session.username
  //通过用户名查看可以访问的地址
  let sqlStr = `
    SELECT * FROM auth WHERE id in (
    SELECT auth_id FROM role_auth WHERE role_id = (
    SELECT role_id FROM user WHERE username = ?
    ))
  `
  let result = await sqlQuery(sqlStr, [username])
  let resultArr = Array.from(result)
  //判断当前请求的路径是否在允许的路径里
  let url = req.originalUrl
  let isAllow = resultArr.some((item, index) => {
    return new RegExp("^"+item.auth_url).test(url)
  })
  if (isAllow) {
    next()
  }else {
    res.render('info/info', {
      title: '禁止访问',
      content: '没有权限访问该页面,请联系管理员',
      href: '/',
      hrefTxt: '空白页'
    })
  }
}
router.use(adminAuth)
//后台用户管理
router.use('/user', userRouter)
//后台角色管理
router.use('/role', roleRouter)
//后台权限管理
router.use('/auth', authRouter)
//后台新闻管理
router.use('/news', newsRouter)
//后台医生管理
router.use('/doctor', doctorRouter)
//后台患者管理
router.use('/patient', patientRouter)

module.exports = router;
