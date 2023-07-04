require('dotenv').config()
const request = require('request')
const { XMLParser } = require('fast-xml-parser')
const parser = new XMLParser()

const url = 'http://apis.data.go.kr/6260000/BusanBIMS/bitArrByArsno?serviceKey='
const key = process.env.okey
// const bstop = encodeURI('서면한전') //  <->decodeURI()
const opt = '&arsno=05712' //서면한전
// const jpt = '&arsno=13005' //교대역
// const apt = '&arsno=06235' //사직역

const urlTotal = url + key + opt

console.log(urlTotal)

request(urlTotal, (e, res, body) => {
  const rst = parser.parse(body)
  const _a = rst.response.body.items.item
  // console.log(_a)
  _a.forEach((v, i) => {
    console.log(
      `버스 번호:${v.lineno}.버스 타입:${v.bustype}.남은 도착 시간:${v.min2}분`
    )
  })
})

/* 중요
1.환경변수 
2.encodeURI <-> decodeURI
3.XML parser
*/
