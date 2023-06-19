const log =console.log



log(false&&false) // ====> 
log(true&&false&&console.log("아암"))
log(true&&console.log("아아암")&&true) // undefined // console.log()
log(false&&123)
log(true&&123)