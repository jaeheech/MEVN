require('dotenv').config()
const request = require('request')

const url =
  'https://apis.data.go.kr/6260000/BusanPopulationStaticService/getPopulationInfo?serviceKey=7leeEiS8vLB4idh4hI7U%2FEssVXUc%2F6Faj2AeA%2BHX9P1WrPmglFxUu531Gt8hcv%2F%2BYAn%2F5im3Lnm5Rssf1zAGMw%3D%3D&numOfRows=10&pageNo=1&resultType=json'
request(url, (e, res, body) => {
  const ret = JSON.parse(body)
  const ingu = ret.getPopulationInfo.body.items.item
  console.log(ingu)
  ingu.forEach((v, i) => {
    console.log(`구군:${v.gugun},남자인구: ${v.mPopCnt}, 여자인구:${v.fPopCnt}`)
  })
})
const key = process.env.okey
