const mongoose = require('mongoose')
const Photos = require('./photo.js')
const fs = require('fs')
const path = require('path')
const mongoDB = 'mongodb://127.0.0.1/my_database1' // 동작안됨

//   .connect(mongoDB, { useNewUrlParser: true }) //6.0 이후 부터는 자동관리
mongoose.set('strictQuery', false)
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log('connection sucessfull !!!'))
  .catch((err) => {
    console.error(err)
  })
const _path = path.join(__dirname, './photos.json')
const main = async () => {
  const t = JSON.parse(fs.readFileSync(_path).toString())
  console.time('5000건의 데이터 입력')
  Photos.insertMany(t).then(() => {
    console.timeEnd('5000건의 데이터 입력')
  })
}
main()
