require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const cheerio = require('cheerio')
const schedule = require('node-schedule') // 라이브 알람 설정
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const token = process.env.bottk2
const bot = new TelegramBot(token, { polling: true })

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

const url = 'https://www.melon.com/chart/index.htm'
bot.onText(/^음악차트 알려줘$/, async (msg) => {
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
bot.onText(/^연예인/, (msg, match) => {
  const chatId = msg.chat.id
  const resp =
    'AgACAgUAAxkBAAMXZKZ4VtSVUpNLUIlLx21-y_rCslwAAgG3MRuZRjhVWXoupjl4oqkBAAMCAANtAAMvBA'
  //   console.log(resp)
  bot.sendPhoto(chatId, resp)
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  console.log(msg)
})

bot.onText(/^알람 설정 (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const time = match[1] // 사용자가 입력한 알람 시간

  // 시간 파싱 및 알람 예약
  const timeParts = time.split(':')
  const hours = parseInt(timeParts[0])
  const minutes = parseInt(timeParts[1])
  const job = schedule.scheduleJob({ hour: hours, minute: minutes }, () => {
    bot.sendMessage(chatId, '알람이 울렸어요!')
  })

  bot.sendMessage(chatId, `알람이 ${hours}시 ${minutes}분에 설정되었습니다.`)
})

/*로또 당첨 번호와 추천번호 받기 */
bot.onText(/^로또$/, async (msg) => {
  const chatId = msg.chat.id

  try {
    const response = await axios.get(
      'https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=%EB%A1%9C%EB%98%90'
    )
    const $ = cheerio.load(response.data)
    const date = $('.date').text()
    const num = $('.lottonum').text().replace('추첨', '')

    const generateLottoNumbers = () => {
      const numbers = new Set()

      while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1
        numbers.add(randomNumber)
      }

      return Array.from(numbers)
    }

    const recommendedNumbers1 = generateLottoNumbers()
    const recommendedNumbers2 = generateLottoNumbers()

    const lottoMessage = `로또번호(${date})\n\n당첨 번호: ${num}\n추천 번호 1: ${recommendedNumbers1.join(
      ' '
    )}\n추천 번호 2: ${recommendedNumbers2.join(' ')}`
    bot.sendMessage(chatId, lottoMessage)
  } catch (error) {
    console.error(error)
    bot.sendMessage(chatId, '로또 정보를 가져오는 중에 오류가 발생했습니다.')
  }
})

/* 영화순위 보여주기 */
const movieURL =
  'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%98%81%ED%99%94%EC%88%9C%EC%9C%84'

bot.onText(/^영화$/, async (msg) => {
  const chatId = msg.chat.id

  try {
    const response = await axios.get(movieURL)
    const $ = cheerio.load(response.data)

    const movieList = $('.title_box')
      .slice(0, 10)
      .map((index, element) => {
        return `${index + 1}위: ${$(element).text().trim()}`
      })
      .get()

    const movieMessage = `영화 순위:\n\n${movieList.join('\n')}`
    bot.sendMessage(chatId, movieMessage)
  } catch (error) {
    console.error(error)
    bot.sendMessage(chatId, '영화 순위를 가져오는 중에 오류가 발생했습니다.')
  }
})

// 채팅 데이터 스키마 정의
const chatSchema = new mongoose.Schema({
  chatId: { type: Number, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true }
})

//채팅 모델 생성
const Chat = mongoose.model('Chat', chatSchema)
bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const message = msg.text

  if (!message.startsWith('/')) {
    const chatData = new Chat({
      chatId: chatId,
      message: message
    })

    // 대화 데이터 저장
    chatData
      .save()
      .then(() => {
        console.log('대화 데이터가 저장되었습니다.')
      })
      .catch((err) => {
        console.error(err)
      })
  }
})

// 대화 데이터 조회 (시간순, 최근 10개)
bot.onText(/^대화 조회$/, async (msg) => {
  const chatId = msg.chat.id

  try {
    const chatHistory = await Chat.find({})
      .sort({ timestamp: 'asc' })
      .limit(10)
      .exec()

    let historyMessage = '최근 대화 내역:\n\n'
    chatHistory.forEach((chat, index) => {
      const chatIndex = index + 1
      historyMessage += `${chatIndex}. ${chat.timestamp.toLocaleString()}: ${
        chat.message
      }\n`
    })

    bot.sendMessage(chatId, historyMessage)
  } catch (error) {
    console.error(error)
    bot.sendMessage(chatId, '대화 내역을 조회하는 중에 오류가 발생했습니다.')
  }
})

//수정
bot.onText(/^대화 수정 (\d+) (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const index = parseInt(match[1]) - 1 // Adjust index to match the displayed chat list
  const updatedMessage = match[2]

  try {
    const chatHistory = await Chat.find({})
      .sort({ timestamp: 'asc' })
      .limit(10)
      .exec()

    if (index >= 0 && index < chatHistory.length) {
      const chat = chatHistory[index]
      chat.message = updatedMessage
      await chat.save()

      bot.sendMessage(chatId, '대화 내용이 수정되었습니다.')
    } else {
      bot.sendMessage(chatId, '해당 번호의 대화를 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error(error)
    bot.sendMessage(chatId, '대화 내용을 수정하는 중에 오류가 발생했습니다.')
  }
})

let isDeletingConversation = false // 대화 삭제 중인지 여부를 나타내는 변수

bot.onText(/^대화 삭제$/, async (msg) => {
  const chatId = msg.chat.id

  if (isDeletingConversation) {
    bot.sendMessage(chatId, '이미 대화 삭제 작업이 진행 중입니다.')
    return
  }

  isDeletingConversation = true

  bot.sendMessage(chatId, '정말로 대화 데이터를 삭제하시겠습니까? (예/아니오)')
})

bot.onText(/^(예|아니오)$/, async (msg, match) => {
  const chatId = msg.chat.id
  const answer = match[1].toLowerCase()

  if (!isDeletingConversation) {
    return
  }

  if (answer === '예') {
    try {
      await Chat.deleteMany({}).exec()
      bot.sendMessage(chatId, '대화 데이터가 삭제되었습니다.')
    } catch (error) {
      console.error(error)
      bot.sendMessage(
        chatId,
        '대화 데이터를 삭제하는 중에 오류가 발생했습니다.'
      )
    }
  } else if (answer === '아니오') {
    bot.sendMessage(chatId, '대화 데이터 삭제를 취소했습니다.')
  }

  isDeletingConversation = false
})

// 명령어 사용법
bot.onText(/^명령어$/, (msg) => {
  const chatId = msg.chat.id

  const commandUsage = `
  사용 가능한 명령어:
  1. 안녕: 인사를 합니다.
  2. 이름: 봇의 이름을 알려줍니다.
  3. 잘가: 작별 인사를 합니다.
  4. 음악차트 알려줘: 멜론 음악 차트 순위를 보여줍니다.
  5. 연예인: 연예인 사진을 보여줍니다.
  6. 알람 설정 [시간]: 지정한 시간에 알람을 설정합니다. 예시: "알람 설정 08:00"
  7. 로또: 로또 당첨 번호와 추천 번호를 보여줍니다.
  8. 영화: 네이버 영화 순위를 보여줍니다.
  9. 대화 조회: 저장된 대화 데이터를 조회합니다.
  10. 대화 수정:'대화 수정 '수정할번호 입력' 수정할 메세지 ' 이런식으로 숫자를 부여하고 수정
  `

  bot.sendMessage(chatId, commandUsage)
})
