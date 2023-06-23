<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/strhtml">1.Strhtml</router-link> |
    <router-link to="/input">2.Input</router-link> |
    <router-link to="/select">3.Select</router-link> |
    <router-link to="/checkbox">4.Checkbox</router-link> |
    <router-link to="/attribute">5.Attribute</router-link> |
    <router-link to="/bindlist">6.Bindlist</router-link> |
    <router-link to="/about">About</router-link>
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
