require('dotenv').config()
const request = require('request')

const url =
  'http://apis.data.go.kr/1360000/BeachInfoservice/getWhBuoyBeach?serviceKey=7leeEiS8vLB4idh4hI7U%2FEssVXUc%2F6Faj2AeA%2BHX9P1WrPmglFxUu531Gt8hcv%2F%2BYAn%2F5im3Lnm5Rssf1zAGMw%3D%3D&beach_num=306&searchTime=202306301700&dataType=JSON'
request(url, (e, res, body) => {
  const ret = JSON.parse(body)
  const gan = ret.response.body.items.item
  console.log(gan)
})
const key = process.env.okey
