<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/mise">미세먼지 정보페이지 |</router-link>
    <router-link to="/papago">번역기 페이지 |</router-link>
    <router-link to="/music">실시간 음원정보 페이지</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
