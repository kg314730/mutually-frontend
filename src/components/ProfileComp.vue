<template>
  <div>
    <div class="header">
      <div class="left-arrow" v-on:click="left">
        <img src="./../assets/left.png" alt="left arrow" class="img-fluid" />
      </div>
      <div>
        <main class="form-signin w-100 m-auto">
          <center>
            <div class="card card-width">
              <div class="card-header">
                <h3>Welcome to mutually, {{ user.name }}!</h3>
                <h5>You can create and edit your profile here...</h5>
              </div>
              <div class="card-body">
                <!-- {{user}} -->
                <form @submit.prevent="sendDetails()">
                  <keep-alive>
                    <component :is="comp" :valid="valid"></component>
                  </keep-alive>
                  <span
                    class="custom-btn"
                    @click="left"
                    v-if="!(comp.name == 'ProfessionalDetails')"
                    >Prev</span
                  >&nbsp;&nbsp;
                  <span
                    class="custom-btn"
                    @click="right"
                    v-if="!(comp.name == 'OtherDetails')"
                    >Next</span
                  >
                  <button
                    class="w-100 btn btn-lg btn-primary custom-btn"
                    type="submit"
                    v-if="comp.name == 'OtherDetails'"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div class="card-footer text-muted"></div>
            </div>
          </center>
        </main>
      </div>
      <div class="right-arrow" v-on:click="right">
        <div class="right-arrow">
          <img
            src="./../assets/right.png"
            alt="right arrow"
            class="img-fluid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EducationalDetails from "./forms/EducationalDetails.vue";
import OtherDetails from "./forms/OtherDetails.vue";
import ProfessionalDetails from "./forms/ProfessionalDetails.vue";
import ProjectDetails from "./forms/ProjectDetails.vue";
import SkillsDetails from "./forms/SkillsDetails.vue";
export default {
  name: "ProfileComp",
  data() {
    return {
      component_names: [
        ProfessionalDetails,
        EducationalDetails,
        SkillsDetails,
        ProjectDetails,
        OtherDetails,
      ],
      comp: ProfessionalDetails,
      valid: [true, true, true, true, true],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    try {
      const response = await fetch(`${process.env.VUE_APP_API_URL}user`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      if (response.status != 401) {
        this.setAuthentication(true);
        this.$store.commit("UPDATE_USER", content);

        if (this.$store.state.user.career_details.length == 0) {
          this.$store.state.user.career_details.push({
            designation: "",
            description: "",
            company: "",
            start_date: "",
            end_date: "",
            present: false,
          });
        }
        if (this.$store.state.user.educational_details.length == 0) {
          this.$store.state.user.educational_details.push({
            degree: "",
            specialization: "",
            institute: "",
            start_date: "",
            end_date: "",
          });
        }
        if (this.$store.state.user.skills.length == 0) {
          this.$store.state.user.skills.push({
            skill: "",
            proficiency: "",
          });
        }

        if (this.$store.state.user.projects.length == 0) {
          this.$store.state.user.projects.push({
            name: "",
            description: "",
            link: "",
          });
        }
      } else {
        this.setAuthentication(false);
        this.$router.push("/");
      }
    } catch (e) {
      this.setAuthentication(false);
    }
  },
  methods: {
    //here we will retrieve the user using cookie
    setAuthentication: function (auth) {
      this.$store.dispatch("setAuth", auth);
    },
    left() {
      let i = this.component_names.indexOf(this.comp);
      if (i == 0) return;
      this.comp = this.component_names[i - 1];
    },
    right() {
      let i = this.component_names.indexOf(this.comp);
      if (i == this.component_names.length - 1) return;
      this.comp = this.component_names[i + 1];
    },
    sendDetails: async function () {
      this.user.profile_set = true;
      await fetch(`${process.env.VUE_APP_API_URL}set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.$store.state.user),
        credentials: "include",
      });
      alert("Data Updated Successfully");
      this.$router.push("/feed");
    },
  },
};
</script>

<style scoped>
div {
  background-color: #f1f6f9;
  color: #14274e;
}
.header {
  text-align: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-fluid {
  max-block-size: 150px;
  padding: 10px;
}
.options {
  font-size: 2em;
  display: block;
  margin-top: 5px;
  margin-bottom: 45px;
}

form {
  padding: auto 20px;
}

.left {
  float: left;
}
.right {
  float: right;
}
.form-signin {
  max-width: 700px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.card-width {
  width: fit-content;
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
  padding: 10px 40px;
  border-radius: 10px;
  border: none;
  margin: 20px auto;
}
</style>
