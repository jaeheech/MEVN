require('dotenv').config()
const { parse } = require('path')
const request = require('request')
const url =
  'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey='
// &sidoName=%EB%B6%80%EC%82%B0&returnType=json
const key = process.env.okey
const opt = '&sidoName=%EB%B6%80%EC%82%B0&returnType=json'

const urlTotal = url + key + opt
console.log(urlTotal)

request(urlTotal, (e, res, body) => {
  const rst = JSON.parse(body)
  const junpo = rst.response.body.items
  junpo.forEach((v, i) => {
    console.log(
      `지역:${v.stationName},오존: ${v.o3Value}, 일산화탄소:${v.coValue},미세먼지: ${v.pm10Value}`
    )
  })
})
