<template>
  <div class="parent">
    <h1 class="h4 mb-3 fw-normal">Skills Details</h1>
    <!-- {{user}} -->
    <div v-for="(item, i) in user.skills" :key="i">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          placeholder="Skill"
          id="floatingInput"
          v-model="user.skills[i].skill"
          required
        />
        <label for="floatingInput">Skill</label>
      </div>
      <div class="form-floating">
        <!-- <textarea class="form-control" placeholder="Proficiency" id="floatingInput" v-model="user.skills[i].proficiency" ></textarea>
                <label for="floatingInput">Proficiency</label> -->
        <div class="form-control" placeholder="Proficiency" id="floatingInput">
          <label for="floatingInput">Proficiency</label>
          <span class="stars">
            <i
              class="fa-regular fa-star"
              @click="color(0, i)"
              @mouseover="color(0, i)"
            ></i>
            <i
              class="fa-regular fa-star"
              @click="color(1, i)"
              @mouseover="color(1, i)"
            ></i>
            <i
              class="fa-regular fa-star"
              @click="color(2, i)"
              @mouseover="color(2, i)"
            ></i>
            <i
              class="fa-regular fa-star"
              @click="color(3, i)"
              @mouseover="color(3, i)"
            ></i>
            <i
              class="fa-regular fa-star"
              @click="color(4, i)"
              @mouseover="color(4, i)"
            ></i>
          </span>
        </div>
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
  name: "SkillsDetails",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    if (this.user.skills) {
      this.user.skills.map((item, index) => {
        this.color(Math.floor(item.proficiency / 20) - 1, index);
      });
    }
  },
  methods: {
    add: function (i) {
      if (i > 8) {
        return;
      }
      this.user.skills.splice(i + 1, 0, {
        skill: "",
        proficiency: "",
      });
    },
    remove: function (i) {
      if (this.user.skills.length == 1) return;
      this.user.skills.splice(i, 1);
    },
    color: function (i, idx) {
      this.user.skills[idx].proficiency = ((i + 1) * 100) / 5;
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
.form-control {
  font-size: unset;
  background-color: #ffffff;
  text-align: left;
}

.stars {
  float: right;
  font-size: 1.5em;
  vertical-align: middle;
  margin-top: -15px;
}
</style>
