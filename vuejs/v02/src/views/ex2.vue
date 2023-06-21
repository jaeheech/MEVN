<template>
  <div>
    <h1>EX2. 데이터 양방향 바인딩</h1>
    <h2>1. v-model을 사용하여 양방향을 구현</h2>
    <span>v-model:</span> <input type="text" v-model="inData" />
    <h3>{{ inData }}</h3>
    <button @click="inData = outData">꺼내오기:{{ inData }}</button>
    <hr />
    <h2>2. v-bind와 v-on을 사용하여 단방향(2가지로 양방향)을 구현</h2>
    <span>v-bind / v-on:</span
    ><input type="text" v-bind:value="inValue" placeholder="입력을 대기중" />
    <h3>{{ inValue }}</h3>
    <br />
    <h3>{{ localData }}</h3>
    <button @click="setData">데이터 저장</button>
    <button @click="getData">데이터 저장값출력</button>
  </div>
</template>
<script>
export default {
  name: 'ex2',
  data() {
    return {
      inData: undefined,
      inValue: '입력을 대기중...',
      outData: '꺼내온 값이에요.',
      temp: null
    }
  },
  methods: {
    // upValue: function (e) {
    //   this.inValue = e.target.value
    // }
    setData: function () {
      localStorage.setItem('savetext', this.inValue)
      alert('v-bind 된 값:' + this.inValue + '를 저장함')
      this.temp = this.inValue
      this.inValue = ''
    },
    getData: function () {
      localStorage.getItem('savetext')
      alert('v-on으로 저장된 값 불러오기:' + this.inValue)
      this.inValue = this.temp
    }
  }
}
</script>
<style></style>
