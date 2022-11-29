<template>
  <div class="parent">
    <h1 class="h4 mb-3 fw-normal">Professional Details</h1>
    <div v-for="(item, i) in user.career_details" :key="i">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          placeholder="Designation"
          id="designation"
          v-model="user.career_details[i].designation"
          required
        />
        <label for="designation">Designation</label>
      </div>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Work Details"
          id="work"
          v-model="user.career_details[i].description"
        ></textarea>
        <label for="work">Work Details</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          placeholder="Company"
          id="company"
          v-model="user.career_details[i].company"
        />
        <label for="company">Company</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          placeholder="Start Date"
          id="start"
          v-model="user.career_details[i].start_date"
        />
        <label for="start">Start Date</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          placeholder="End Date"
          id="end"
          v-model="user.career_details[i].end_date"
        />
        <label for="end">End Date</label>
        <div class="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              value="remember-me"
              v-model="user.career_details[i].present"
              v-on:change="setEndDate(i)"
            />
            I currently work here
          </label>
        </div>
      </div>
      <div class="options">
        <i class="fa-solid fa-circle-minus left" v-on:click="remove(i)"></i>
        <i class="fa-solid fa-circle-plus right" v-on:click="add(i)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfessionalDetails",
  props: ["valid"],
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    add: function (i) {
      if (i > 8) {
        return;
      }
      this.user.career_details.splice(i + 1, 0, {
        designation: "",
        description: "",
        company: "",
        start_date: "",
        end_date: "",
        present: false,
      });
    },
    remove: function (i) {
      if (this.user.career_details.length == 1) return;
      this.user.career_details.splice(i, 1);
    },
    setEndDate: function (i) {
      if (this.user.career_details[i].present) {
        this.user.current_company =
          this.user.career_details[i].company.toUpperCase();
        this.user.career_details[i].end_date = new Date().toJSON().slice(0, 10);
        var a = this.user.career_details[i].end_date;
        var b = this.user.career_details[i].start_date;
        var days = (new Date(a) - new Date(b)) / (1000 * 60 * 60 * 24);
        this.user.current_experience = (days / 365.25).toFixed(2);
        this.user.current_position = this.user.career_details[i].designation;
      } else {
        this.user.career_details[i].end_date = "";
      }
    },
  },
};
</script>

<style scoped>
div,
.parent {
  background-color: #f0ebe3;
  color: #14274e;
}
.img-fluid {
  max-block-size: 150px;
  padding: 10px;
}
.options {
  font-size: 2em;
  display: block;
  margin-top: -10px;
  margin-bottom: 65px;
  background-color: #f0ebe3;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
