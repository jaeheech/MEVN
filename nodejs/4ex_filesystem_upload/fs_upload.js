const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(port + '에서 서버 동작 중')
})
