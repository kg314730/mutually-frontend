<template>
  <div id="app">
    <NavComp />
    <router-view></router-view>
    <FooterComponent id="footer" />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import NavComp from "./components/NavComp.vue";

export default {
  name: "App",
  components: {
    NavComp,
    FooterComponent,
  },
};
</script>

<style>
body {
  background-color: #f1f6f9;
}
</style>
