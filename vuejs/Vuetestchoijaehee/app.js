// Start the server
require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const request = require('request')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')
const app = express()
const client_id = process.env.nid
const client_secret = process.env.npw
const _path = path.join(__dirname, './dist')

app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(_path))

// API endpoint
app.get('/api/air-pollution', async (req, res) => {
  try {
    const response = await axios.get(
      'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
      {
        params: {
          serviceKey: process.env.VUE_APP_okey,
          sidoName: '부산',
          returnType: 'json'
        }
      }
    )
    const data = response.data.response.body.items
    console.log(data)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch air pollution data' })
  }
})

app.listen(3000, () => {
  console.log('3000서버에서 서버 동작중')
})
