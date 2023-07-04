const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.melon.com/chart/index.htm'
axios.get(url).then((response) => {
  const $ = cheerio.load(response.data)
  const songRankings = []

  $('.lst50, .lst100').each(function () {
    const songTitle = $(this).find('.ellipsis.rank01 span a').text().trim()
    const artist = $(this).find('.ellipsis.rank02 span a').text().trim()
    const songInfo = `${artist} - ${songTitle}`
    songRankings.push(songInfo)
  })

  songRankings.slice(0, 20).forEach((song, index) => {
    console.log(`${index + 1}위 : ${song}`)
  })
})
