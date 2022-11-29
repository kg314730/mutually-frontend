<template>
  <div>
    <form class="card-body" @submit.prevent="login">
      <h2 class="custom-header">Sign In</h2>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email_sign_in"
          v-model.lazy="user.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="pwd_sign_in"
          v-model.lazy="user.password"
          required
          autocomplete="on"
        />
      </div>
      <center>
        <button type="submit" class="btn btn-primary custom-btn">Submit</button>
      </center>
    </form>
  </div>
</template>
<script>
export default {
  name: "HomePage",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async login() {
      const resp = await fetch(`${process.env.VUE_APP_API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", //to get the cookie
        body: JSON.stringify(this.$store.state.user),
      });
      if (resp.status == 200) {
        this.$store.state.user.profile_set = true;
        await this.$router.push("/profile");
      } else {
        alert("Invalid Credentials");
      }
    },
  },
};
</script>
<style scoped>
.card-body {
  background-color: #f0ebe3;
  color: #14274e;
  font-size: 1.1em;
}
.custom-btn {
  background-color: #394867;
  width: 150px;
}
form a {
  color: #14274e;
  text-decoration: none;
}
form {
  text-align: left;
}
.custom-header {
  background-color: #394867;
  color: white;
  text-align: center;
  width: 50%;
  margin: 0 auto 10px auto;
  border-radius: 10px;
  padding: 7px;
  font-size: 1.2em;
}
</style>
