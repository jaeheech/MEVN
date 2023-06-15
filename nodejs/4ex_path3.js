const express =require("express")
const app =express()
const PORT= 3000
//localhost:port/user/
app.get('/user',(req,res)=>{
    const id=req.query.id;
    // console.log(obj)
  
    const arr=["my life is egg","The Avengers arr Back","javascript is good enough","ahasdgnka","Asdfnjasdnjf"]
    const students=['강사','예찬','재희','성준','영완','정우','창준','민지','병오','재영']
  //   const str =` <body>
  //   <a href="/user?id=0">Life</a>
  //   <a href="/user?id=1">Hero</a>
  //   <a href="/user?id=2">Javascript</a>
  //   <h1>${arr[+id]??"버튼을 눌러주세요"}</h1>
  // </body>`
  let str =`<body><h1>최재희</h1><ul>`
 arr.forEach((v,i)=>{
   str+=`<li><a href="/user?id=${i}">${v}</a></li>`
})
     str+=`</ul><h1>${arr[+id]??"버튼을 눌러주세요"}</h1></body>`
students.forEach((v,i)=>{
  str+=`<a href="http://tfjs.site:790${i}/user">${v}의 790${i}포트 접속하기</a><br>`
})
    // res.send("<h1>글자가 커질까요?</h1>")
    res.send(str)
})

app.listen(PORT,()=>{
    console.log(`Example app listening on port${PORT}`)
})