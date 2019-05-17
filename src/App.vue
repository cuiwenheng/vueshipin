<template >
  <div id="app">
<!--     <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;
  margin-top: 60px;#F4F5F6*/
  margin-top: 0.5rem;
  background-color: #FFF;
  width:100%;
  height: 100%;
  /*font-size: 14px;*/
  font-size: 0.75rem;
  /*line-height: 1.8;*/
  line-height: 1.8;
}
</style>
