<template>
  <div>
    <h1>6.리스트화 예제</h1>
    <select name="" id="" v-model="selData">
      <option v-for="city in arr" :key="city" :value="city.name">
        {{ city.name }}
      </option>
    </select>
    <br />
    <span>선택하신 배송지역은 :{{ selData }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selData: '',
      arr: [
        { name: '부산', code: '051' },
        { name: '서울', code: '02' },
        { name: '제주', code: '064' },
        { name: '창원', code: '055' },
        { name: '대구', code: '053' }
      ]
    }
  }
}
</script>
<style></style>
