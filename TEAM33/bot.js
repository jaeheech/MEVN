require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const token = process.env.bottk3
const bot = new TelegramBot(token, { polling: true })

bot.onText(/^안녕/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = '안녕~'
  console.log(resp)
  bot.sendMessage(chatId, resp)
})

bot.onText(/^이름/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = '저는 김정우,최재희님의 봇이에요~'
  console.log(resp)
  bot.sendMessage(chatId, resp)
})
/*사진 추가 */
bot.onText(/^사진/, (msg, match) => {
  const chatId = msg.chat.id
  const resp =
    'AgACAgUAAxkBAAMLZKzF9f3_MuEToeKSybbotih3BKMAAh-3MRsidGlVgHcDClCE5rsBAAMCAAN5AAMvBA'
  bot.sendPhoto(chatId, resp)
})
// 스키마 정의
const chatSchema = new mongoose.Schema(
  {
    chatId: { type: Number, required: true },
    message: { type: String, required: true },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
      get: formatTimestamp
    }
  },
  {
    toJSON: { getters: true, virtuals: false },
    versionKey: false
  }
)
//날짜 시간 표시
function formatTimestamp(timestamp) {
  return timestamp.toLocaleTimeString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
//채팅 모델 생성
const Chat = mongoose.model('Chat', chatSchema)

//명령어 저장 방지 기능
const excludedCommandsRegex = /^(|안녕|이름|사진|대화 조회)$/
//대화 저장
bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const message = msg.text

  if (excludedCommandsRegex.test(message) || message.trim() === '') {
    return
  }

  const chatData = new Chat({
    chatId: chatId,
    message: message
  })

  chatData
    .save()
    .then(() => {
      console.log('대화 내역이 저장되었습니다.')
    })
    .catch((err) => {
      console.error(err)
    })
})
// 대화 데이터 조회 (모든 대화 내역)
bot.onText(/^대화 조회$/, async (msg) => {
  const chatId = msg.chat.id

  try {
    const chatHistory = await Chat.find({}).sort({ timestamp: 'asc' }).exec()

    if (chatHistory.length === 0) {
      bot.sendMessage(chatId, '저장된 대화 데이터가 없습니다.')
      return
    }

    let historyMessage = '대화 내역:\n\n'
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

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  console.log(msg)
})
