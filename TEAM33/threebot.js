const axios = require('axios')
const { Telegraf } = require('telegraf')
const cheerio = require('cheerio')
const schedule = require('node-schedule')

const TELEGRAM_BOT_TOKEN = '6371208473:AAHDdDGjH-io8F_srsLN88Qxst56BX_85aE'
const REST_API_KEY = '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'

async function gptApi(prompt, max_tokens = 32, temperature, topP, n) {
  let rst = '생각중...'
  const url = 'https://api.openai.com/v1/chat/completions'
  const headers = {
    Authorization: 'Bearer ' + REST_API_KEY,
    'Content-Type': 'application/json'
  }
  const options = {
    url,
    method: 'POST',
    data: {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    },
    headers,
    responseType: 'json'
  }
  try {
    const response = await axios(options)
    rst = response.data.choices[0].message.content
    console.log(rst)
  } catch (error) {
    console.error(error)
  }
  return rst
}

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

// /start 명령어
bot.start((ctx) => {
  ctx.reply(
    '안녕하세요! GPT-3.5 Turbo를 사용한 텔레그램 봇입니다. /start를 통해 대화를 시작할 수 있습니다.'
  )
})
// /stop 명령어
bot.command('stop', (ctx) => {
  gptEnabled = false // GPT-3.5 Turbo 기능 비활성화
  ctx.reply('GPT-3.5 Turbo 기능이 비활성화되었습니다.')
})
// GPT-3.5 Turbo를 사용하여 응답 생성하는 함수
bot.on('text', async (ctx) => {
  if (gptEnabled) {
    const userMessage = ctx.message.text

    // GPT-3.5 Turbo를 사용하여 응답 생성
    const gptResponse = await gptApi(userMessage)
    ctx.reply(gptResponse)
  } else {
    ctx.reply(
      'GPT-3.5 Turbo 기능이 현재 비활성화되어 있습니다. /start 명령어로 다시 활성화할 수 있습니다.'
    )
  }
})

// 음악 차트 보기 명령어
bot.hears(/^(음악)?차트( 알려줘)?$/, async (ctx) => {
  const userMessage = ctx.message.text
  const chatId = ctx.message.chat.id

  try {
    const response = await axios.get('https://www.melon.com/chart/index.htm')
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

    ctx.reply(chartMessage)
  } catch (error) {
    console.error(error)
    ctx.reply('음악 차트 정보를 가져오는 중에 오류가 발생했습니다.')
  }
})

// 연예인 사진 보기 명령어
bot.hears(/^연예인( 사진)?$/, (ctx) => {
  const chatId = ctx.message.chat.id
  const photoUrl =
    'AgACAgUAAxkBAAMXZKZ4VtSVUpNLUIlLx21-y_rCslwAAgG3MRuZRjhVWXoupjl4oqkBAAMCAANtAAMvBA'
  ctx.replyWithPhoto({
    url: `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${photoUrl}`
  })
})

// 알람 설정 명령어
bot.hears(/^알람 설정 (.+)/, (ctx, match) => {
  const chatId = ctx.message.chat.id
  const time = match[1] // 사용자가 입력한 알람 시간

  // 시간 파싱 및 알람 예약
  const timeParts = time.split(':')
  const hours = parseInt(timeParts[0])
  const minutes = parseInt(timeParts[1])
  const job = schedule.scheduleJob({ hour: hours, minute: minutes }, () => {
    ctx.reply('알람이 울렸어요!')
  })

  ctx.reply(`알람이 ${hours}시 ${minutes}분에 설정되었습니다.`)
})

// 로또 번호 추천 명령어
bot.hears(/^로또$/, async (ctx) => {
  const chatId = ctx.message.chat.id

  try {
    const response = await axios.get(
      'https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=%EB%A1%9C%EB%98%90'
    )
    const $ = cheerio.load(response.data)
    const date = $('.date').text()
    const num = $('.lottonum').text().replace('추첨', '')

    const generateLottoNumbers = () => {
      // 이전과 동일한 함수 내용
    }

    const recommendedNumbers1 = generateLottoNumbers()
    const recommendedNumbers2 = generateLottoNumbers()

    const lottoMessage = `로또번호(${date})\n\n당첨 번호: ${num}\n추천 번호 1: ${recommendedNumbers1.join(
      ' '
    )}\n추천 번호 2: ${recommendedNumbers2.join(' ')}`
    ctx.reply(lottoMessage)
  } catch (error) {
    console.error(error)
    ctx.reply('로또 정보를 가져오는 중에 오류가 발생했습니다.')
  }
})

// 명령어 사용법
bot.hears(/^(도움말|명령어)$/, (ctx) => {
  const commandUsage = `
    사용 가능한 명령어:
    1.  음악차트 알려줘: 멜론 음악 차트 순위를 보여줍니다.
    2.  연예인: 연예인 사진을 보여줍니다.
    3.  알람 설정 [시간]: 지정한 시간에 알람을 설정합니다. 예시: "알람 설정 08:00"
    4.  로또: 로또 당첨 번호와 추천 번호를 보여줍니다.
    `

  ctx.reply(commandUsage, { disable_notification: true })
})

bot.launch()
