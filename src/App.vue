<template>
  <div id="app">
    <NavComp/>
    <router-view></router-view>
    <FooterComponent id="footer"/>
  </div>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import NavComp from './components/NavComp.vue';


export default {
  name: 'App',
  components: {
    NavComp,
    FooterComponent
}
}
//Color Palette: https://colorhunt.co/palette/f1f6f914274e3948679ba4b4
</script>

<style>
</style>
