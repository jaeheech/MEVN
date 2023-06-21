// 1부터 20까지 의수를 차례로 배열에 담으세요.
// 담은 그 수를 모두 더하시오
// 결과 값을 출력하시오 . 
const arr =Array(20).fill(0).reduce((a,c,i,arr)=>{
    c=i+1
    console.log(`${c}+${a}=${a+c}`)
   return a+c
},0)
console.log(arr)