let mysql = require('mysql')

let options = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "ccxx545400",
  database: "system"
}

//创建与数据库的连接
let con = mysql.createConnection(options)

//建立连接
con.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('数据库连接成功');
  }
})

function sqlQuery(strSql, arr) {
  return new Promise((resolve, reject) => {
    con.query(strSql, arr, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = sqlQuery