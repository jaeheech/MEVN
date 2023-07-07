const mongoose = require('mongoose')
const Photo = require('./photo.js')
const mongoDB = 'mongodbL://127.0.0.1/my_database'

const main = async () => {
  await mongoose
    .connect(mongoDB, {
      useUndifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => console.log('connection sucessful!'))
    .catch((err) => console.error(err))
  console.time('id 오름차순으로 찾기')
  const ret = await Photo.find().sort({ id: 1 }).limit(100)
  console.timeEnd('id를 오름차순으로 찾기')
}
main()
