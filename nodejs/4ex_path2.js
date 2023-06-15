const express =require("express")
const app =express()
const PORT= 3000
//localhost:port/user/
app.get('/user/:id',(req,res)=>{
    const obj =req.params;
    console.log(obj)
  
    const arr=["my life is egg","The Avengers arr Back","javascript is good enough"]
    const str =` <body>
    <a href="/user/0">Life</a>
    <a href="/user/1">Hero</a>
    <a href="/user/2">Javascript</a>
    <h1>${arr[obj.id]}</h1>
  </body>`
    // res.send("<h1>글자가 커질까요?</h1>")
    res.send(str)
})

app.listen(PORT,()=>{
    console.log(`Example app listening on port${PORT}`)
})