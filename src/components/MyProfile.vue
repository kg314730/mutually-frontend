<template>
  <div>
    <center>
      <h1>{{ user.name }}</h1>
      <img
        v-if="user.profile_picture != ''"
        :src="user.profile_picture"
        alt="profile picture"
        width="220px"
      />
      <img
        v-else
        src="../assets/profile-user.png"
        alt="profile picture"
        width="220px"
      />
      <br />
      <a
        :href="user.resume"
        :download="(user.name + ' Resume').replaceAll(' ', '_')"
        :title="user.name + ' Resume'"
      >
        <button class="btn btn-primary custom-btn btn-resume">
          Download Resume
        </button>
      </a>
      <br />
      <router-link to="/profile">
        <button class="btn btn-primary custom-btn btn-resume">
          Edit Profile
        </button>
      </router-link>
      <div class="card card-width">
        <div class="card-header">
          <h3>Experience</h3>
        </div>
        <div
          class="card-body"
          v-for="(item, i) in user.career_details"
          :key="i"
        >
          <h4 class="card-title">
            <i>{{ item.designation }}</i
            >, {{ item.company }}
          </h4>
          <h6 class="card-title">
            {{ item.start_date }} -
            <span v-if="item.present">Present</span>
            <span v-else>{{ item.end_date }}</span>
          </h6>
          <p class="card-text">{{ item.description }}</p>
          <hr />
        </div>
        <div class="card-footer text-muted"></div>
      </div>
      <br />
      <div class="card card-width" v-if="user.referral_history.length > 0">
        <div class="card-header">
          <h3>Referral History</h3>
        </div>
        <div
          class="card-body referral-card"
          v-for="(item, i) in user.referral_history"
          :key="i"
        >
          <h6 class="card-title">{{ item.company }}</h6>
          <h6 class="card-title">{{ item.position }}</h6>
          <h6 class="card-title">{{ item.date }}</h6>
          <router-link :to="'/viewprofile/' + item.from">
            <button class="btn btn-primary custom-btn">Referrer</button>
          </router-link>
        </div>
        <div class="card-footer text-muted"></div>
      </div>
      <br />
      <div class="card card-width">
        <div class="card-header">
          <h3>Education</h3>
        </div>
        <div
          class="card-body"
          v-for="(item, i) in user.educational_details"
          :key="i"
        >
          <h4 class="card-title">
            <i>{{ item.degree }}</i
            >, {{ item.institute }}
          </h4>
          <h5 class="card-title">{{ item.specialization }}</h5>
          <h6 class="card-title">
            {{ item.start_date }} -
            <span v-if="item.present">Present</span>
            <span v-else>{{ item.end_date }}</span>
          </h6>
          <p class="card-text">{{ item.description }}</p>
          <hr />
        </div>
        <div class="card-footer text-muted"></div>
      </div>
      <br />
      <div class="card card-width">
        <div class="card-header">
          <h3>Skills</h3>
        </div>
        <div class="card-body" v-for="(item, i) in user.skills" :key="i">
          <h5 class="card-title">{{ item.skill }}</h5>
          <div
            class="form-control"
            placeholder="Proficiency"
            id="floatingInput"
          >
            <label for="floatingInput">Proficiency</label>
            <span class="stars">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </span>
          </div>
          <p class="card-text">{{ item.description }}</p>
          <hr />
        </div>
        <div class="card-footer text-muted"></div>
      </div>
      <br />
      <div class="card card-width">
        <div class="card-header">
          <h3>Projects</h3>
        </div>
        <div class="card-body" v-for="(item, i) in user.projects" :key="i">
          <h4 class="card-title">{{ item.name }}</h4>
          <p class="card-text">{{ item.description }}</p>
          <a v-if="item.link" :href="item.link">
            <button class="btn btn-primary custom-btn">Project Link</button>
          </a>
          <button v-else class="btn btn-primary custom-btn" disabled>
            Project Link
          </button>
          <hr />
        </div>
        <div class="card-footer text-muted"></div>
      </div>
      <br />
    </center>
  </div>
</template>
<script>
export default {
  name: "MyProfile",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    color: function (i, idx) {
      let elements = Array.from(
        document.getElementsByClassName("fa-star")
      ).slice(5 * idx, 5 * (idx + 1));
      elements.map((item, index) => {
        if (index <= i) {
          item.classList.remove("fa-regular");
          item.classList.add("fa-solid");
        } else {
          item.classList.add("fa-regular");
          item.classList.remove("fa-solid");
        }
      });
    },
    setAuthentication: function (auth) {
      this.$store.dispatch("setAuth", auth);
    },
  },
  mounted() {
    if (this.user.skills) {
      this.user.skills.map((item, index) => {
        this.color(Math.floor(item.proficiency / 20) - 1, index);
      });
    }
  },
};
</script>

<style scoped>
.card-width {
  max-width: 600px;
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
  padding-bottom: 0;
}
.form-control {
  background-color: #f0ebe3;
  font-size: unset;
  text-align: left;
  border: none;
}
.stars {
  float: right;
  font-size: 1.5em;
  vertical-align: middle;
  margin-top: -8px;
}
.custom-btn {
  background-color: #394867;
  width: 150px;
}
.btn-resume {
  width: 200px;
  margin: 10px auto;
}
.card-text {
  margin: 0;
}
hr {
  margin: 5px 0 0 0;
}
</style>
