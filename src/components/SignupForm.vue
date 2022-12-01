<template>
  <div id="sign-up-form">
    <form class="card-body" @submit.prevent="register">
      <h2 class="custom-header">Sign Up</h2>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          aria-describedby="username"
          v-model.lazy="user.name"
          required
        />
        <div id="username" class="form-text">
          This name will be displayed on your profile
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model.lazy="user.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="pwd"
          v-model.lazy="user.password"
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
          autocomplete="on"
        />
        <div id="pwd-instruction" class="form-text">
          Password must contain at least 1 uppercase, lowercase, number and
          symbol. Minimum length allowed is 8.
        </div>
      </div>
      <center>
        <button type="submit" class="btn btn-primary custom-btn">Submit</button>
      </center>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async register() {
      const resp = await fetch(`${process.env.VUE_APP_API_URL}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(this.$store.state.user),
        credentials: 'include',
      });
      if (resp.status == 200) alert("User registered successfully!");
      else if (resp.status == 422)
        alert("User already registered! Please sign in");
      else {
        alert("Server error: " + resp.status);
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
