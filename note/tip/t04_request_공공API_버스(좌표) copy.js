// const de = require('dotenv')
// de.config()
require('dotenv').config()
// console.log(key)

const request = require('request')
// const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser')
const { XMLParser } = require('fast-xml-parser')

const url = 'http://apis.data.go.kr/6260000/BusanBIMS/busStopList?serviceKey='
const key = process.env.okey
const bstop = encodeURI('서면역') //  <->decodeURI()
const opt = '&pageNo=1&pageNo=100&bstopnm=' + bstop
const parser = new XMLParser()

const urlTotal = url + key + opt
// console.log('en:', bstop)
// console.log('de:', decodeURI(bstop))
console.log(urlTotal)

request(urlTotal, (e, res, body) => {
  const rst = parser.parse(body)
  const _ = rst.response.body.items
  console.log(_)
})
/* 중요
1.환경변수 
2.encodeURI <-> decodeURI
3.XML parser
*/
