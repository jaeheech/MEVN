<template>
  <div>
    <h1>5.속성 예제</h1>
    읽기전용: <input type="text" :value="item" readonly /><br />
    사용가능:
    <input type="text" v-model="item" />
    <div>{{ item }}</div>
    <hr />
    <input type="text" placeholder="입력하세요." v-model="data" />
    <button :disabled="data === ''" @click="fn">전송버튼</button>
    {{ vs }}
  </div>
</template>
<script setup>
const vs = '최신문법이래요.'
const fn = function () {
  alert('최신문법도 되네?')
}
</script>
<script>
export default {
  data() {
    return {
      item: '안녕',
      data: ''
    }
  }
}
</script>
<style scoped>
input {
  color: blue;
  font-size: 1.2em;
  border: none;
  border-bottom: 2px solid #000;
}
</style>
