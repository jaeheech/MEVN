/* 주문 받은대로 처리하기  */
// 주문1)ex 1.7초만에 아메리카노가 나왔습니다.!  [1초~2초]
// 주문2)ex 3.5초만에 라떼 나왔습니다!!         [2초~3.5초]
// 주문3)ex 4.1초만에 카푸치노 나왔습니다.       [3초~5초]
// 주문4)ex 2.2 초만에  에스프레소 나왔습니다.   [2~3초]

const a = ()=>{
    const ac = Math.random()*(2-1)+1
    setTimeout(() => {
        console.log(`${ac.toFixed(1)}초만에 아메리카노가 나왔습니다.`)
        b()
    },a);
}
const b = ()=>{
    const ac = Math.random()*(3.5-2)+2
    setTimeout(() => {
        console.log(`${ac.toFixed(1)}초만에 라떼가 나왔습니다.`)
        c()
    },b);
}
const c= ()=>{
    const ac = Math.random()*(5-3)+3
    setTimeout(() => {
        console.log(`${ac.toFixed(1)}초만에 카푸치노가 나왔습니다.`)
        d()
    },c);
}
const d = ()=>{
    const ac =Math.random()*(3-2)+2
    setTimeout(() => {
        console.log(`${ac.toFixed(1)}초만에 에스프레소가 나왔습니다.`)
    },d);
}
a()

