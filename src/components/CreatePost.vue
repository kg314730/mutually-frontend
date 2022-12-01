<template>
  <div>
    <div class="outer">
      <div class="card card-width">
        <div class="card-header">Create a new referral post</div>
        <form class="card-body" @submit.prevent.once="sendPost" method="post">
          <div class="mb-3">
            <div class="radio-btn">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="seekReferral"
                  v-model="referral"
                  value="looking"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Seeking Referral
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="provideReferral"
                  value="providing"
                  v-model="referral"
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Providing Referral
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="company" class="form-label">Company for Referral</label>
            <input
              type="text"
              class="form-control"
              id="company"
              v-model.lazy.trim="company"
              required
            />
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="text"
              v-model.lazy="text"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="link" class="form-label">Job Description Link</label>
            <input
              type="text"
              class="form-control"
              id="link"
              v-model.lazy.trim="link"
            />
          </div>
          <center>
            <button type="submit" class="btn btn-primary custom-btn">
              Submit
            </button>
          </center>
        </form>
        <div class="card-footer text-muted"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {
      referral: "",
      company: "",
      link: "",
      text: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async sendPost() {
      await fetch(`${process.env.VUE_APP_API_URL}feed/addpost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creator: this.user._id,
          referral_type: this.referral,
          company: this.company.toUpperCase(),
          text: this.text,
          link: this.link,
          picture: this.user.profile_picture,
          name: this.user.name,
        }),
        credentials:'include',
      });
      alert("Post Created Successfully!");
      this.$router.push("/feed");
      // await this.$router.push('/#sign-in-form');
    },
  },
};
</script>

<style scoped>
.radio-btn {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.card-body {
  background-color: #f0ebe3;
  color: #14274e;
  font-size: 1.1em;
  max-width: 400px;
  margin: auto;
  padding: 10px 30px;
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
.card-header,
.card-footer {
  background-color: #394867;
  color: white;
  font-weight: 500;
  font-size: 1.1em;
  text-align: center;
  width: 100%;
}
.outer {
  max-width: 400px;
  margin: 10px auto;
}
</style>
