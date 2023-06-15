const express =require("express")
const app =express()
const loogger=require("morgan")
const PORT= 3000
//--- 1번 로직
app.use(loogger("tiny"))
app.get('/',(req,res,next)=>{
    res.end("Hello World")
    next()
})

app.use((req,res,next)=>{
    console.log("1 Time:",Date.now())
    next()
})
app.use((req,res,next)=>{
    console.log("2 Time",Date.now())
    next()

})
//--- 2번 로직 

app.listen(PORT,()=>{
    console.log(`서버가 생성되었습니다.${PORT}`)
})
/* 
서버가 생성되었습니다.3000
1 Time: 1686796480236
2 Time 1686796480237    
GET / 404 139 - 3.928 ms
*/
