//async(Promise객체)에서 방생한 throw를 catch가 놓친상황
async function testError() {
  console.log('에러 던지기를 시작합니다')
  throw new Error('testError에서 에러를 고의 발생 시켰습니다.')
}

function main() {
  try {
    console.log('======try의 시작=====')
    testError()
    console.log('======try의 끝=====')
  } catch (e) {
    console.log('======catch의 시작=====')
    console.log('======catch의 끝=====')
  } finally {
    console.log('======finally의 시작=====')
    console.log('에러 테스트를 종료합니다.')
    console.log('======finally의 끝=====')
  }
}
main()
