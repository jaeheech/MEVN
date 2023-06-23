<template>
  <div>
    <button v-for="p in pages" :key="p" :class="p" @click="page = p">
      {{ p }}
    </button>
    <div v-for="(g, i) in pages" :key="i">
      <div>
        <img
          v-if="g === page"
          :src="'./sample' + (i + 1) + '.jpg'"
          alt="여름사진1"
        />
        <!-- img를 퍼블릭 폴더에 넣어야 경로가 바뀌지 않음 -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 'page1',
      pages: ['page1', 'page2', 'page3', 'page4']
    }
  }
}
</script>
<style>
button {
  scale: 200%;
  margin: 30px;
  background: #fff;
  border: 1px solid gray;
  cursor: pointer;
}
button:hover {
  background: #dff444;
}
button:active {
  color: #fff;
  background: #380d68;
}
img {
  width: 50%;
  height: 50%;
}
</style>
