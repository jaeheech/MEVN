const 조건 = e=>e.height>=180
const 친구들 = [
    {"name" : "박종선","height" : 173},
    {"name" : "연제호","height" : 175},
    {"name" : "최주원","height" : 190},
    {"name" : "윤성용","height" : 180},

]
const 키큰친구 = 친구들.find(조건)
console.log(키큰친구)
const 키큰친구인덱스 =친구들.findIndex(조건) // 없으면 -1을 반환 undefined 
console.log(키큰친구인덱스)