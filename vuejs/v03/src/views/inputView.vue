<template>
  <div>
    <h1>2. 양방향데이터 예제</h1>
    <p>1) 입출력 예제</p>
    <input v-model="data" type="text" />
    <button @click="print()">console 전송</button>
    <button @click="setData">변수 입력</button>
    <hr />
    <p>2) 계산하기 예제</p>
    방식1:
    <input type="text" v-model="num1" /> +
    <input type="text" v-model="num2" /> =
    <span>{{ num1 + num2 }}</span>
    <br />
    방식2:
    <input type="text" v-model.number="num3" /> +
    <input type="text" v-model.number="num4" /> =
    <span>{{ num3 + num4 }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '기본데이터',
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0
    }
  },
  methods: {
    print() {
      console.log(this.data)
    },
    setData() {
      this.data = '초기화함~'
    }
  }
}
</script>
<style>
input {
  width: 100px;
  text-align: right;
  margin: 0 10px;
}
</style>
