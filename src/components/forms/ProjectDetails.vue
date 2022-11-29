<template>
  <div class="parent">
    <h1 class="h4 mb-3 fw-normal">Project Details</h1>
    <!-- {{user}} -->
    <div v-for="(item, i) in user.projects" :key="i">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          placeholder="Degree"
          id="project_name"
          v-model="user.projects[i].name"
          required
        />
        <label for="project_name">Project Name</label>
      </div>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Specialization"
          id="description"
          v-model="user.projects[i].description"
        ></textarea>
        <label for="description">Description</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          placeholder="Institute"
          id="project_link"
          v-model="user.projects[i].link"
        />
        <label for="project_link">Project Link</label>
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
  name: "ProjectDetails",
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
      this.user.projects.splice(i + 1, 0, {
        name: "",
        description: "",
        link: "",
      });
    },
    remove: function (i) {
      if (this.user.projects.length == 1) return;
      this.user.projects.splice(i, 1);
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
