const http = require("http")
const PORT = 3000
const server =http.createServer((req,res)=>{
    res.setHeader("Content-Type","text/plain; charset=utf-8")
    res.write("첫번째 write<br>") //write 여러번 가능
    res.write("두번째 write")
   res.end("전송끝") //end 는 1번만 가능
//    res.send("send 전송 끝1") //write와 end를 합친 것 
})
server.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
}) 