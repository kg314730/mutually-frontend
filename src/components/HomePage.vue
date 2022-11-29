<template>
  <div>
    <div class="parent">
      <div class="flex1">
        <img
          src="./../assets/landing_page.png"
          alt="Office Image"
          class="img-fluid"
        />
      </div>
      <div class="flex2">
        <center>
          <div class="card card-width">
            <div class="card-header">Welcome to mutuALLY!</div>
            <div class="card-body">
              <h5 class="card-title">Referral Portal</h5>
              <p class="card-text">
                mutuALLY provides a platform where users can seek, provide and
                manage referrals. Start your journey here and find a potential
                match...
              </p>
              <component :is="view"></component>
              <center>
                <button
                  @click="changeView"
                  class="custom-btn"
                  v-if="view.name == 'SignupForm'"
                >
                  Already a user? Sign In here...
                </button>
                <button @click="changeView" class="custom-btn" v-else>
                  Registering for the first time? Sign Up here...
                </button>
              </center>
            </div>
            <div class="card-footer text-muted"></div>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>
<script>
import SignupForm from "./SignupForm.vue";
import SigninForm from "./SigninForm.vue";
export default {
  name: "HomePage",
  data() {
    return {
      view: SignupForm,
    };
  },
  methods: {
    changeView() {
      if (this.view == SignupForm) this.view = SigninForm;
      else this.view = SignupForm;
    },
  },
  created() {
    if (this.$store.state.authenticated) {
      if (this.$store.state.user.profile_set) {
        this.$router.push("/feed");
      } else {
        this.$router.push("/profile");
      }
    }
  },
};
</script>
<style scoped>
.parent {
  display: flex;
  flex-direction: row;
  background-color: #f1f6f9;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 35px 0;
  gap: 30px;
}
.flex1 {
  width: 900px;
}
.flex2 {
  width: 500px;
}
.card-width {
  width: 400px;
}
.card-header,
.card-footer {
  background-color: #394867;
  color: white;
  font-weight: 500;
  font-size: 1.1em;
}
.card-body {
  background-color: #f0ebe3;
  color: #14274e;
  font-size: 1.1em;
}
.custom-btn {
  background-color: #394867;
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: none;
}
</style>
