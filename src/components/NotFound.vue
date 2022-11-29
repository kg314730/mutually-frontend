<template>
  <div class="error">
    <div>
      <center>
        <h1>Error 404</h1>
        <img src="../assets/error.png" alt="error" class="img-fluid" />
      </center>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
<style scoped>
.error {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f6f9;
  color: #d00b12;
}
h1 {
  font-size: 5em;
  font-weight: bold;
  text-shadow: 4px 4px black;
}
img {
  max-width: 256px;
}
</style>
