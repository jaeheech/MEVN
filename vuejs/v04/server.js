require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path')
const VSchema = require('./mdb.cjs')
const morgan = require('morgan')
const app = express()
const _path = path.join(__dirname, './dist') // 스태틱 폴더 지정

// POST를 위한 구문
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/*스태딕 경로*/
app.use('/', express.static(_path))
// 로그 INFO
app.use(logger('tiny'))

// MongoDB CRUD
//CRUD에서 Create
app.post('/dbc', (req, res) => {
  const title = req.body.title
  const content = req.body.content
  const date = req.body.date

  ;(() => {
    const _data = { title, content, date }
    new VSchema(_data).save()
    res.send('입력완료')
  })()
})

//CRUD에서 Read
app.get('/dbr/:date', (req, res) => {
  const date = req.params.date
  const read = () => {
    VSchema.findOne({ date }, { _id: 0, __v: 0 }) //
      .then((rst) => {
        res.send(rst)
        console.log(rst)
      })
      .catch((e) => console.error(e))
  }
  read()
})

//CRUD에서 Update

// CRUD에서 Delete

// 날짜 유효성 검사 함수
function isValidDate(date) {
  // 날짜 유효성 검사 로직 구현
  // 예: YYYY-MM-DD 형식인지 확인하는 로직
  return true
}
app.listen(3000, () => {
  console.log('3000포트에서 서버 동작중...')
})
