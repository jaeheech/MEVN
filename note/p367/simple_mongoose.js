const fs = require('fs')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const mongoDB = 'mongodb://127.0.0.1'
const DBname = 'my_database3'

const main = async () => {
  const client = await MongoClient.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).catch((e) => console.error(e))

  const _path = path.join(__dirname, './photos.json')
  const t = JSON.parse(fs.readFileSync(_path).toString())
  const col = client.db(DBname).collection('photo3')
  console.time('5000건의 데이터 삽입')
  col.insertMany(t).then(() => {
    console.timeEnd('5000건의 데이터 삽입')
  })
}
main()
