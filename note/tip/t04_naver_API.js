require('dotenv').config()
const express = require('express')
const request = require('request')
const app = express()
const client_id = process.env.nid
const client_secret = process.env.npw
// console.log(client_id, client_secret)

let sou = 'ko'
let tar = 'en'
let query = '밥을 먹어도 배가 고프다.'

app.get('/trans', function (req, res) {
  const api_url = 'https://openapi.naver.com/v1/papago/n2mt'
  const options = {
    url: api_url,
    form: { source: sou, target: tar, text: query },
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    }
  }

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' })
      res.end(body)
    } else {
      res.status(response.statusCode).end()
      console.log('error = ' + response.statusCode)
    }
  })
})
app.listen(3000, function () {
  console.log('http://127.0.0.1:3000/trans app listening on port 3000!')
})
