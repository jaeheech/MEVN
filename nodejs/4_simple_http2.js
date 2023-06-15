const http = require('http')
const PORT = 3000
const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','application/json;charset=utf-8')
    const obj = {
        "이름":"큰돌"
    }
    res.end(JSON.stringify(obj))
})
server.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
})
