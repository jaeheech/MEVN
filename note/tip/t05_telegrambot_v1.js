require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const cheerio = require('cheerio')

const token = process.env.bottk
const bot = new TelegramBot(token, { polling: true })

const url = 'https://www.melon.com/chart/index.htm'

bot.onText(/^안녕/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = '안녕~'
  console.log(resp)
  bot.sendMessage(chatId, resp)
})

bot.onText(/^이름/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = '저는 heeee님의 봇이에요~'
  console.log(resp)
  bot.sendMessage(chatId, resp)
})

bot.onText(/^잘가/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = '잘가 안녕!~'
  console.log(resp)
  bot.sendMessage(chatId, resp)
})

bot.onText(/^음악$/, async (msg) => {
  const chatId = msg.chat.id

  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const chartItems = $('.service_list_song tbody tr')

    if (chartItems.length === 0) {
      throw new Error('음악 차트 정보를 찾을 수 없습니다.')
    }

    let chartMessage = '멜로 현재음악 차트 순위:\n'

    chartItems.each((index, element) => {
      if (index < 10) {
        const rank = index + 1
        const artist = $(element)
          .find('.ellipsis.rank01 a')
          .first()
          .text()
          .trim()
        const title = $(element)
          .find('.ellipsis.rank02 a')
          .first()
          .text()
          .trim()
        chartMessage += `${rank}. ${artist} - ${title}\n`
      }
    })

    bot.sendMessage(chatId, chartMessage)
  } catch (error) {
    console.error(error)
    bot.sendMessage(
      chatId,
      '음악 차트 정보를 가져오는 중에 오류가 발생했습니다.'
    )
  }
})

/*사진 추가 */
bot.onText(/^박지현/, (msg, match) => {
  const chatId = msg.chat.id
  const resp =
    'AgACAgUAAxkBAAIBt2SjwgyOAixpyhoQSNbae5AWsgyaAAJ-tDEb2zQYVdjtk1w5AgvvAQADAgADbQADLwQ'
  //   console.log(resp)
  bot.sendPhoto(chatId, resp)
})
/*사진 추가 */
bot.onText(/^이쁜이/, (msg, match) => {
  const chatId = msg.chat.id
  const resp =
    'AgACAgUAAxkBAAIBwWSjw68yqzG5zzu8sHaOz4bQZYkuAAK4tDEb5pIgVeCO4wgJGTirAQADAgADbQADLwQ'
  bot.sendPhoto(chatId, resp)
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  console.log(msg)
})
