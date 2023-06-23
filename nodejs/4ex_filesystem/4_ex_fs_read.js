const express = require('express')
const path = require('path')
const logger = require('morgan')
const fs = require('fs')
const { Script } = require('vm')
const app = express()
const PORT = 3000
const _path = path.join(__dirname, '/')

console.log(_path)
app.use('/', express.static(_path))
app.use(logger('tiny'))

app.get('/files', (req, res) => {
  fs.readdir(_path, 'utf-8', (err, data) => {
    // console.log(Array.isArray(data))
    let list = '<ul>'
    data.forEach((v) => {
      if (v.indexOf('.') === -1) {
        list += `<li><a href="/#">[${v}]</a></li>`
      } else {
        list += `<li><a href="/${v}" >${v}</a> <button onclick="location.href='del/${v}'">삭제</button> </li>`
      }
    })
    list += '</ul>'
    list += '<button><a href="http://localhost:3000/">작성</a></button>'
    res.send(list)
  })
})
app.get('/del/:fname', (req, res) => {
  const fname = req.params.fname
  fs.unlink(_path + '/' + fname, (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('삭제를 성공하였습니다.')
  })
  res.send(
    `<script>alert('${fname}파일을 삭제하였습니다.');location.href=document.referrer</script>`
  )
})
app.listen(PORT, () => {
  console.log('listening on port' + PORT)
})
