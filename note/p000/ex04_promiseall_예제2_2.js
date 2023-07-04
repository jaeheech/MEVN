// 에러발생 처리일떄
function test(text, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      typeof text === 'string'
        ? resolve('스트링입니다.')
        : reject('파악이 안됩니다.')
    }, time)
    console.log(text)
  })
}

/*Promiseall 에러 처리*/
const testGo = async () => {
  console.time('일반비동기처리')
  try {
    // await test('시작', 1000)
    await Promise.all([
      test('코딩', 3000),
      test('Cording', 2000),
      test('자바스크립트', 1000),
      test(123123, 1700)
    ])
    // await test('난별종', 500)
  } catch (e) {
    console.log(e)
  }
  console.timeEnd('일반비동기처리')
}
testGo()
