const a = ()=>{
    return new Promise((resolve,reject)=>{
        const delay = Math.random() * 100
        setTimeout(() => {
            console.log(1) 
            resolve(1)
        }, delay);
    })
}
const b = ()=>{
    return new Promise((resolve,reject)=>{
        const delay = Math.random() * 100
        setTimeout(() => {
            console.log(2) 
            resolve(2)
        }, delay);
    })
}
const c = ()=>{
    return new Promise((resolve,reject)=>{
        const delay = Math.random() * 100
        setTimeout(() => {
            console.log(3) 
            resolve(3)
        }, delay);
    })
}
a().then(ret=>b()).then(ret=>c())
//ret 을 받지 않고 이렇게도 작성 가능 
//a().then(b).then(c)