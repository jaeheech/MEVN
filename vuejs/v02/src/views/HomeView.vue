<template>
  <div class="ex1">
    <h1>디렉티브 사용하기</h1>
    <h2>1. 변수 머스타치 사용하기</h2>
    <h3>안녕하세요. {{ name }}입니다. {{ age }}살 입니다.</h3>
    <h3>안녕하세요. {{ name2 }}입니다. {{ age2 }}살 입니다.</h3>
    <hr />
    <h2>2. v-on 기능 사용하기</h2>
    <button v-on:click="func1('안녕 v-on을 위한 팝업이야')">클릭버튼</button>
    <button @dblclick="func1('안녕 v-on약자로 팝업 띄웠어')">
      더블클릭버튼
    </button>
    <hr />
    <h2>3. v-if 조건문 사용하기</h2>
    <h3 v-if="status">제가 보이나요?</h3>
    <button v-on:click="status = true">보이게 할게요.</button>
    <button @click="status = false">숨길게요.</button>
    <button @click="status = !status">토글버튼</button>
    <br />
    <button @click="name2 == '슈퍼맨' ? (name2 = hero) : (name2 = '슈퍼맨')">
      {{ name2 === '슈퍼맨' ? '아이언맨' : '슈퍼맨' }} 부를께요.
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      name: '홍길동',
      name2: '슈퍼맨',
      hero: '아이언맨',
      age: 27,
      age2: 77,
      status: false
    }
  },
  methods: {
    func1: function (text) {
      alert(text)
    }
  }
}
</script>
