// '6371208473:AAHDdDGjH-io8F_srsLN88Qxst56BX_85aE'
// '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'
const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')

// Telegram Bot API 토큰을 설정합니다.
const telegramToken = '6371208473:AAHDdDGjH-io8F_srsLN88Qxst56BX_85aE'
const bot = new TelegramBot(telegramToken, { polling: true })

// OpenAI GPT-3.5 터보 API 키를 설정합니다.
const openaiApiKey = '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'

// 이전 요청 이후 최소 대기 시간 (밀리초)
const minWaitTime = 1000

// 마지막 요청 시간을 저장하기 위한 변수
let lastRequestTime = Date.now() - minWaitTime

// 텔레그램 메시지를 수신할 때 동작하는 이벤트 핸들러를 등록합니다.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const message = msg.text

  try {
    // OpenAI API를 사용하여 GPT-3.5 터보 모델로 대답을 생성합니다.
    const response = await generateGPT3Response(message)

    // 일정 시간 이후에 텔레그램 봇으로 응답을 전송합니다.
    const currentTime = Date.now()
    const timeElapsed = currentTime - lastRequestTime
    const waitTime = Math.max(minWaitTime - timeElapsed, 0)

    setTimeout(() => {
      bot.sendMessage(chatId, response)
      lastRequestTime = Date.now()
    }, waitTime)
  } catch (err) {
    console.error('Error processing message:', err)
    bot.sendMessage(chatId, '오류가 발생했습니다.')
  }
})

// OpenAI API를 사용하여 GPT-3.5 터보 모델로 대답을 생성하는 함수를 작성합니다.
async function generateGPT3Response(message) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  // OpenAI API 호출에 필요한 요청 데이터를 설정합니다.
  const requestData = JSON.stringify({
    prompt: message,
    max_tokens: 150,
    n: 1,
    stop: '\n'
  })

  // OpenAI API로 요청을 보냅니다.
  const response = await axios.post(apiUrl, requestData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openaiApiKey}`
    }
  })

  // OpenAI API 응답에서 생성된 대답을 반환합니다.
  return response.data.choices[0].text.trim()
}
