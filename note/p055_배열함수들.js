const func1 = (e,index)=>{
    console.log*`${index}번째 요소는 ${e}입니다.`
}
const func2 = (e,i)=>e*2
const func3 = (prev,curr,index)=>prev+curr //(a,c,i)=>a+c
const func4 =e=>e%2
// const arr =[1,2,3,4,5]
// const a= arr.forEach(func1)
// const b=arr.map(func2)
// const c=arr.reduce(func3)
// const d=arr.filter(func4)





const a = [1,2,3,4,5].forEach(func1)
console.log('foreach',a)
const b = [1,2,3,4,5].map(func2)
console.log('map',b)
const c = [1,2,3,4,5].reduce(func3)
console.log('reduce',c)
const d =[1,2,3,4,5].filter(e=>e%2)
console.log('filter',d)

/*
foreach undefined     
map [ 2, 4, 6, 8, 10 ]
reduce 15
filter [ 1, 3, 5 ]    
 */