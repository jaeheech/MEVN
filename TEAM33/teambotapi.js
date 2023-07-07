require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.bottk2
const bot = new TelegramBot(token, { polling: true })
const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const Schema = mongoose.Schema

const conversationSchema = new Schema({
  chatId: Number,
  message: String,
  date: { type: Date, default: Date.now }
})

const Conversation = mongoose.model('Conversation', conversationSchema)

// 대화 데이터 mongodb로 crud
function getRecentConversations(limit) {
  return Conversation.find().sort({ date: -1 }).limit(limit).exec()
}
bot.on('message', async (msg) => {
  try {
    const chatId = msg.chat.id
    const message = msg.text

    const conversation = new Conversation({
      chatId: chatId,
      message: message
    })

    await conversation.save()
    console.log('대화 저장 성공')
  } catch (error) {
    console.log('대화 저장 실패:', error)
  }
})

bot.onText(/^최근대화 (.+)$/, (msg, match) => {
  const chatId = msg.chat.id
  const limit = parseInt(match[1]) // 가져올 대화 내역의 개수

  getRecentConversations(limit)
    .then((conversations) => {
      const messages = conversations.map((conversation) => conversation.message)
      const response = messages.join('\n')
      bot.sendMessage(chatId, response)
    })
    .catch((error) => {
      console.error('대화 내역 가져오기 오류:', error)
      bot.sendMessage(chatId, '대화 내역을 가져오지 못했습니다.')
    })
})

function updateConversationById(id, newMessage) {
  return Conversation.findByIdAndUpdate(
    id,
    { message: newMessage },
    { new: true }
  ).exec()
}

bot.onText(/^수정 (.+) (.+)$/, (msg, match) => {
  const chatId = msg.chat.id
  const id = match[1] // 수정할 대화 데이터의 _id
  const newMessage = match[2] // 새로운 메시지

  updateConversationById(id, newMessage)
    .then((updatedConversation) => {
      const response = `대화 데이터가 수정되었습니다. 새로운 메시지: ${updatedConversation.message}`
      bot.sendMessage(chatId, response)
    })
    .catch((error) => {
      console.error('대화 데이터 수정 오류:', error)
      bot.sendMessage(chatId, '대화 데이터를 수정하지 못했습니다.')
    })
})

// 대화 데이터 삭제
function deleteConversationById(id) {
  return Conversation.findByIdAndDelete(id).exec()
}

// 대화 데이터 삭제 명령어
bot.onText(/^삭제 (.+)$/, (msg, match) => {
  const chatId = msg.chat.id
  const id = match[1] // 삭제할 대화 데이터의 ID

  deleteConversationById(id)
    .then(() => {
      bot.sendMessage(chatId, '대화 데이터가 삭제되었습니다.')
    })
    .catch((error) => {
      console.error('대화 데이터 삭제 오류:', error)
      bot.sendMessage(chatId, '대화 데이터를 삭제하지 못했습니다.')
    })
})

// 모든 대화 데이터 삭제
function deleteAllConversations() {
  return Conversation.deleteMany({}).exec()
}

// 모든 대화 데이터 삭제 명령어
bot.onText(/^모두삭제$/, (msg) => {
  const chatId = msg.chat.id

  deleteAllConversations()
    .then(() => {
      bot.sendMessage(chatId, '모든 대화 데이터가 삭제되었습니다.')
    })
    .catch((error) => {
      console.error('대화 데이터 삭제 오류:', error)
      bot.sendMessage(chatId, '대화 데이터를 삭제하지 못했습니다.')
    })
})

// 로또 당첨 번호 가져오기
function getLottoWinningNumbers() {
  const url =
    'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EB%A1%9C%EB%98%90+%EB%8B%B9%EC%B2%A8+%EB%B2%88%ED%98%B8'

  return axios
    .get(url)
    .then((res) => {
      const $ = cheerio.load(res.data)
      const winningNumbers = []

      $('.winning_number').each(function () {
        const number = $(this).text()
        console.log(number)
        winningNumbers.push(number)
      })
      return winningNumbers
    })
    .catch((error) => {
      console.log('로또 당첨번호 가져오기 오류:', error)
      return []
    })
}

// Function to generate random lottery numbers
function generateRandomNumbers(count, maxNumber) {
  const numbers = []
  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber)
    }
  }
  return numbers
}

// Function to recommend lottery numbers
function recommendLotteryNumbers() {
  const maxNumberCount = 6 // The count of numbers to be recommended
  const maxNumberValue = 45 // The maximum value for the lottery numbers

  return generateRandomNumbers(maxNumberCount, maxNumberValue)
}

// Lotto command to get winning numbers or recommended numbers
bot.onText(/^로또$/, (msg) => {
  const chatId = msg.chat.id

  const options = {
    reply_markup: {
      keyboard: [['당첨 번호 가져오기'], ['추천 번호 추천하기']],
      one_time_keyboard: true
    }
  }

  bot.sendMessage(
    chatId,
    '로또 당첨 번호를 가져올까요, 추천 번호를 알려드릴까요?',
    options
  )
})

// Command to get winning numbers
bot.onText(/^당첨 번호 가져오기$/, (msg) => {
  const chatId = msg.chat.id

  getLottoWinningNumbers().then((winningNumbers) => {
    if (winningNumbers.length > 0) {
      const resp = '로또 당첨 번호: ' + winningNumbers.join(', ')
      bot.sendMessage(chatId, resp)
    } else {
      const resp = '로또 당첨 번호를 가져오지 못했습니다.'
      bot.sendMessage(chatId, resp)
    }
  })
})

// Command to recommend lottery numbers
bot.onText(/^추천 번호 추천하기$/, (msg) => {
  const chatId = msg.chat.id

  const recommendedNumbers = recommendLotteryNumbers()
  const resp = '추천 로또 번호: ' + recommendedNumbers.join(', ')
  bot.sendMessage(chatId, resp)
})

// 인사
bot.onText(/^안녕/, (msg, match) => {
  const chatId = msg.chat.id
  //   const resp = match.input //메아리
  const resp = '반가워요~'
  console.log(resp)
  bot.sendMessage(chatId, resp)
})

// 영화 실시간 순위 네이버 크로울링
bot.onText(/^영화/, (msg, match) => {
  const chatId = msg.chat.id
  const url =
    'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%98%81%ED%99%94%EC%88%9C%EC%9C%84'
  axios.get(url).then((res) => {
    const $ = cheerio.load(res.data)
    const movie = []
    $('.title_box').each(function () {
      movie.push($(this).text())
    })
    const resp = []
    movie.forEach((v, i) => {
      resp.push(`${i + 1}위 : ${v}`)
    })
    bot.sendMessage(chatId, JSON.stringify(resp))
  })
})
bot.onText(/^사진/, (msg, match) => {
  const chatId = msg.chat.id
  const resp =
    'AgACAgUAAxkBAANDZKZ6uojppozoU-8_u6IlfEgjHzcAAgS3MRuZRjhV8kuflVZsEgQBAAMCAAN5AAMvBA'
  bot.sendPhoto(chatId, resp)
})

const fs = require('fs')
const path = require('path')
// const XLSX = require('xlsx')

// 엑셀 파일을 읽어 MongoDB에 저장
function saveDataToMongoDB(data) {
  const conversations = data.map((item) => {
    return {
      username: item.username, // 사용자 이름
      message: item.message, // 대화 내용
      timestamp: new Date(item.timestamp) // 대화 시간
    }
  })
  return Conversation.create(conversations)
}

// 엑셀 파일 다운로드 및 데이터 처리
bot.on('document', (msg) => {
  const chatId = msg.chat.id
  const fileId = msg.document.file_id
  const filePath = bot.downloadFile(fileId, 'downloads')

  filePath
    .then((filePath) => {
      const workbook = XLSX.readFile(filePath)
      const sheetName = workbook.SheetNames[0]
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

      saveDataToMongoDB(sheetData)
      fs.unlinkSync(filePath) // 다운로드한 파일 삭제

      bot.sendMessage(chatId, '엑셀 파일을 성공적으로 처리하였습니다.')
    })
    .catch((error) => {
      console.error('엑셀 파일 처리 오류:', error)
      bot.sendMessage(chatId, '엑셀 파일 처리 중 오류가 발생하였습니다.')
    })
})

const schedule = require('node-schedule')

// 알림 시간에 실행되는 함수
function sendReminder(chatId, message) {
  bot.sendMessage(chatId, message)
}

// 알림 예약 명령어
bot.onText(/^알림 (\d{2}):(\d{2}) (.+)$/, (msg, match) => {
  const chatId = msg.chat.id
  const hour = parseInt(match[1], 10)
  const minute = parseInt(match[2], 10)
  const message = match[3]

  // 현재 날짜와 시간을 기준으로 알림 시간을 설정
  const date = new Date()
  date.setHours(hour)
  date.setMinutes(minute)
  date.setSeconds(0)

  // 알림 예약
  const job = schedule.scheduleJob(date, function () {
    sendReminder(chatId, message)
  })

  bot.sendMessage(chatId, `알림이 예약되었습니다. (${hour}:${minute})`)
})

// 위치 정보를 받아와 지도에 표시
bot.onText(/^위치$/, (msg) => {
  const chatId = msg.chat.id
  const options = {
    reply_markup: {
      keyboard: [
        [
          {
            text: '공유 위치 보내기',
            request_location: true // 위치 정보 요청
          }
        ]
      ],
      one_time_keyboard: true
    }
  }

  bot.sendMessage(chatId, '위치 정보를 공유해주세요.', options)
})

// 위치 정보를 받았을 때 동작할 함수
bot.on('location', (msg) => {
  const chatId = msg.chat.id
  const latitude = msg.location.latitude
  const longitude = msg.location.longitude

  // 위치 정보를 이용하여 지도 URL 생성
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`

  // 지도 URL을 전송
  bot.sendMessage(chatId, mapUrl)
})

/*
텔레그램에서 위치 정보를 공유할 때, 일부 기능은 모바일 앱에서만 작동하는 경우가 있습니다. 위치 정보 공유 기능도 그 중 하나입니다.
모바일 앱에서는 GPS 기능을 활용하여 위치 정보를 정확하게 가져올 수 있기 때문에 가능한 기능입니다.
그룹 채팅에서는 위치 정보 공유 기능이 지원되지 않는 것이 기본 동작입니다. 그룹 채팅에서는 위치 정보를 요청할 수 없습니다.
따라서 개인 채팅에서 테스트해보시기 바랍니다. 모바일 앱에서 개인 채팅을 통해 위치 정보를 공유하면 기능이 작동할 것입니다.
*/

// 대화 내역 콘솔
bot.on('message', (msg) => {
  const chatId = msg.chat.id
  console.log(msg)
})
