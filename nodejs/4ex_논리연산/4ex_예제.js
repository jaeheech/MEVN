const log = console.log

//1.
log(null||13||undefined) //13??????
//2.
log(log(7)||13||log(0)) //7????
//3.
log(-1&&null&&true) //null???
//4.
log(null||13&&6||2) //6
//5.
log(null||13&&log(false)||2)//2