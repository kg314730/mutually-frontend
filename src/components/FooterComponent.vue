<template>
  <div class="outer">
    <div class="parent-footer">
      <div class="logo">
        <img src="./../assets/logo.gif" alt="logo" class="img-fluid" />
        <br />
        <h2>
          A platform for professionals where they can seek and provide
          referrals.
        </h2>
      </div>
      <div class="contact">
        <!-- <span class="line"></span> -->
        <h2>
          Reach out to as at: <i class="fa-solid fa-envelopes-bulk"></i>
          <a href="mailto:someone@example.com">customer_care@mutually.com</a>
        </h2>
      </div>
    </div>
    <div class="hr"></div>
    <p>Designed and Developed by Kuldeep Gupta</p>
  </div>
</template>
<script>
export default {
  name: "FooterComponent",
};
</script>
<style scoped>
.outer {
  background-color: #14274e;
  color: white;
}
.parent-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
.logo {
  padding: 30px 20px;
  margin: auto;
}
.logo img {
  max-width: 40%;
  margin: auto;
  display: block;
}
.line {
  background-color: #f1f6f9;
  width: 10px;
  height: 130px;
  display: inline-block;
}
.contact {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: auto;
}
h2 {
  font-size: 1.3em;
}
.contact h2 {
  padding: 30px 20px;
  background-color: #394867;
}
.contact a {
  text-decoration: none;
  color: white;
}
.hr {
  background-color: white;
  height: 2px;
}
p {
  margin-bottom: 0;
  font-size: 1.3em;
  padding: 10px;
  text-align: center;
}
</style>
