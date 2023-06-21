// //key 값에 바로 접근해 이름을 뽑기
// const d = ()=>{return {"name":"최주원","job":"마케터"}}
// const { name } = d()
// console.log(name)

// // 배열을 분해해서 담기 
// const a2 = [1,2,]
// const [b,c]= a2
// console.log(b,c)

//배열의 경우 분해해서 각각의 요소를 담고 객체의 경우 키의 값을 분해해서 담음
const a3 ={"name":"큰돌", "노래" : "자취방좋아" }
const {name,노래}= a3
console.log(name,노래)