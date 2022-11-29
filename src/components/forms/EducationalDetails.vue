<template>
  <div class="parent">
    <h1 class="h4 mb-3 fw-normal">Educational Details</h1>
    <!-- {{user}} -->
    <div v-for="(item, i) in user.educational_details" :key="i">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          placeholder="Degree"
          id="floatingInput"
          v-model="user.educational_details[i].degree"
          required
        />
        <label for="floatingInput">Degree</label>
      </div>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Specialization"
          id="floatingInput"
          v-model="user.educational_details[i].specialization"
        ></textarea>
        <label for="floatingInput">Specialization</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          placeholder="Institute"
          id="floatingInput"
          v-model="user.educational_details[i].institute"
        />
        <label for="floatingInput">Institute</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          placeholder="Start Date"
          id="floatingInput"
          v-model="user.educational_details[i].start_date"
        />
        <label for="floatingInput">Start Date</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          placeholder="End Date"
          id="floatingInput"
          v-model="user.educational_details[i].end_date"
        />
        <label for="floatingInput">End Date</label>
      </div>
      <div class="checkbox mb-3"></div>
      <div class="options">
        <i class="fa-solid fa-circle-minus left" v-on:click="remove(i)"></i>
        <i class="fa-solid fa-circle-plus right" v-on:click="add(i)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EducationalDetails",
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
      this.user.educational_details.splice(i + 1, 0, {
        degree: "",
        specialization: "",
        institute: "",
        start_date: "",
        end_date: "",
      });
    },
    remove: function (i) {
      if (this.user.educational_details.length == 1) return;
      this.user.educational_details.splice(i, 1);
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
