let crypto = require('crypto');

function encrypt(str) {
  let salt = "asdjioqwbbcuioqf216qwe4"
  let obj = crypto.createHash('md5')
  str = salt + str;
  obj.update(str)
  return obj.digest('hex')
}

module.exports = {
  encrypt
}
