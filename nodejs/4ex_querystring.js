const express =require("express")
const app =express()
const PORT= 3000
//localhost:port/user?name="이름"&나이&성별&주소 
app.get('/user',(req,res)=>{
    let url_name =req.param("name")
    let url_age =+req.param("age")+1
    let url_gender =req.param("gender")
    let url_address =req.param("address")
    res.send("username:"+url_name+"age:"+url_age+"gender:"+url_gender+"address:"+url_address)
})

app.listen(PORT,()=>{
    console.log(`Example app listening on port${PORT}`)
})