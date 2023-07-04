// 정상적인 처리일떄
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

/*일반비동기*/
const testGo = async () => {
  console.time('일반비동기처리')
  await test('코딩', 3000)
  await test('Cording', 2000)
  await test('자바스크립트', 1000)
  await test('Javascript', 1700)
  console.timeEnd('일반비동기처리')
}
testGo()
