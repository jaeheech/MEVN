<template>
  <div>
    <h1>1. String 과 HTML</h1>
    <h3>String: {{ str }}</h3>
    <hr />
    <h3 v-html="str"></h3>
  </div>
</template>
<script>
export default {
  data() {
    return {
      str: '<span style="color:red";>안녕 난 String 형식이야.</span>'
    }
  }
}
</script>
<style></style>
