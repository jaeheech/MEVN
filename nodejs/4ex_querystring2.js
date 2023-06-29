const express = require('express')
const app = express()
const PORT = 3000
// localhost:port/user?name="이름"&나이&성별&주소
app.get('/user', (req, res) => {
  let url_name = req.query.name
  let url_age = +req.query.age

  res.send('username:' + url_name + 'age:' + url_age)
})
// app.get('/test',(req,res)=>{
//     let name =req.query.id
//     let url_age =+req.query.age

//     // res.send("username:"++"age:"+)
// })
app.listen(PORT, () => {
  console.log(`Example app listening on port${PORT}`)
})
