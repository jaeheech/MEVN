const express =require("express")
const app =express()
const PORT= 3000
//localhost:port/user/
app.get('/user/:name/:age/:gender/:address',(req,res)=>{

    const params =req.params;
    console.log(params)
    res.send("username:"+params.name+"age:"+params.age+"gender:"+params.gender+"address:"+params.address)
})

app.listen(PORT,()=>{
    console.log(`Example app listening on port${PORT}`)
})