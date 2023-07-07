const mycol = require('./CRUD_ori.js')

const main = async () => {
  const t = await mycol
    .find(
      {
        title: /맨$/
      },
      { _id: 0 }
    )
    .lean() // 효율적 메소드
  console.log(t)
}
main()
