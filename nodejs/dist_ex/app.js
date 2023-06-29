const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const PORT = 3000
const fs = require('fs')
const _path = path.join(__dirname, './dist')

/*POST 해석*/
app.use(express.json()) //post 방식으로 할때 필수
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(_path))
app.use(logger('tiny'))

app.get('/test', (req, res) => {
  let id2 = req.query.id
  let url_name = req.query.name

  res.send('아이디:' + id2 + '이름:' + url_name)
})

/*파일 작성 */
app.post('/info', (req, res) => {
  const obj = req.body
  console.log(obj.name)
  console.log(obj.content)
  console.log(obj.age)
  fs.writeFile(_path + '/' + obj.name + '.txt', obj.content + obj.age, (e) => {
    if (e) console.log(e)
    console.log('파일 작성이 완료 되었습니다.')
    res.send(
      `<script>alert('${obj.name}파일로 저장합니다.');history.go(-1)</script>`
    )
  })
})

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 동작중!`)
})
console.log('현재경로:', __dirname)
