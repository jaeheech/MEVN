const axios = require('axios')
const cheerio = require('cheerio')

axios
  .get(
    'https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=%EB%A1%9C%EB%98%90'
  )
  .then((response) => {
    const $ = cheerio.load(response.data)
    const date = $('.date').text()
    const num = $('.lottonum').text()
    console.log(date + '\n' + num)
  })
