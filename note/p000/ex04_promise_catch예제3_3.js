//Promise에서 방생한 reject를 catch하기
function testError() {
  console.log('에러 던지기를 시작합니다')
  return new Promise((resolve, reject) =>
    reject(new Error('제가 표시한 에러입니다.'))
  )
}

function main() {
  console.log('======main의 시작=====')
  testError()
    .catch((e) => {
      console.log('======catch의 시작=====')
      console.log(e)
      console.log('======catch의 끝=====')
    })

    .then(() => {
      console.log('======finally의 시작=====')
      console.log('에러 테스트를 종료합니다.')
      console.log('======finally의 끝=====')
    })
  console.log('======main의 끝=====')
}
main()
