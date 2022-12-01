<template>
  <div>
    <center>
      <h1>{{ other_user.name }}</h1>
      <img
        v-if="other_user.profile_picture != ''"
        :src="other_user.profile_picture"
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
        :href="other_user.resume"
        :download="(other_user.name + ' Resume').replaceAll(' ', '_')"
        :title="other_user.name + ' Resume'"
      >
        <button class="btn btn-primary custom-btn btn-resume">
          Download Resume
        </button>
      </a>
      <div class="send-message">
        <button
          class="btn btn-primary custom-btn btn-chat"
          @click="show('chat-btn')"
          v-if="user._id != other_user._id"
        >
          Send a Message <i class="fa-brands fa-rocketchat"></i>
        </button>
        <div class="chat-btn">
          <textarea
            type="text"
            v-model="message"
            placeholder="Type your message here..."
            required
            cols="30"
            rows="7"
          ></textarea
          ><br />
          <button class="btn btn-primary custom-btn" @click="sendMessage()">
            Send
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-primary custom-btn" @click="hide('chat-btn')">
            Close
          </button>
        </div>
      </div>
      <button
        class="btn btn-primary custom-btn btn-resume"
        @click="show('ref')"
        v-if="user._id != other_user._id"
      >
        Give a Referral
      </button>
      <div class="ref">
        <label for="company"> Company Name: </label> &nbsp;&nbsp;
        <input
          type="text"
          v-model="referral.company"
          placeholder="Company"
          id="company"
          required
        /><br /><br />
        <label for="position"> Position: </label> &nbsp;&nbsp;
        <input
          type="text"
          v-model="referral.position"
          placeholder="Position"
          id="position"
          required
        /><br />
        <button
          class="btn btn-primary custom-btn btn-resume"
          @click="send_referral"
        >
          Give a Referral
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-primary custom-btn" @click="hide('ref')">
          Close
        </button>
      </div>
      <div class="card card-width">
        <div class="card-header">
          <h3>Experience</h3>
        </div>
        <div
          class="card-body"
          v-for="(item, i) in other_user.career_details"
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
      <div class="card card-width" v-if="other_user.referral_history">
        <div class="card-header">
          <h3>Referral History</h3>
        </div>

        <div
          class="card-body referral-card"
          v-for="(item, i) in other_user.referral_history"
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
          v-for="(item, i) in other_user.educational_details"
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
        <div class="card-body" v-for="(item, i) in other_user.skills" :key="i">
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
        <div
          class="card-body"
          v-for="(item, i) in other_user.projects"
          :key="i"
        >
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
  name: "OthersProfile",
  data() {
    return {
      other_user: {},
      message: "",
      referral: {
        company: "",
        position: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    color(i, idx) {
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
    async getData(id) {
      try {
        this.other_user = {};
        this.id = this.$route.params.id;
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}find?id=${id}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const content = await response.json();
        // this.user = content;
        if (response.status != 401) {
          this.other_user = content;
        }
      } catch (e) {
        alert(e.message);
      }
    },
    async send_referral() {
      const resp = await fetch(`${process.env.VUE_APP_API_URL}referral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: this.other_user._id,
          from: this.user._id,
          date: new Date().toJSON().slice(0, 10),
          company: this.referral.company,
          position: this.referral.position,
        }),
        credentials: "include",
      });
      if (resp.status == 200) {
        alert("Referral sent Successfully!");
        this.hide("ref");
      } else {
        alert(resp.statusText);
        this.hide("ref");
      }
    },
    show(class_name) {
      let element = Array.from(document.getElementsByClassName(class_name))[0];
      element.style.display = "block";
    },
    hide(class_name) {
      let element = Array.from(document.getElementsByClassName(class_name))[0];
      element.style.display = "none";
    },
    async sendMessage() {
      const resp = await fetch(`${process.env.VUE_APP_API_URL}message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: this.other_user._id,
          from: this.user._id,
          message: this.message,
        }),
        credentials: 'include',
      });
      if (resp.status == 200) {
        alert("Message sent Successfully!");
        this.message = "";
        this.hide("chat-btn");
      } else {
        alert(resp.statusText);
        this.hide("chat-btn");
      }
    },
  },
  async created() {
    await this.getData(this.$route.params.id);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.getData(to.params.id);
    next();
  },
  updated() {
    if (this.other_user.skills) {
      this.other_user.skills.map((item, index) => {
        this.color(Math.floor(item.proficiency / 20) - 1, index);
      });
    }
  },
};
</script>

<style scoped>
div {
  background-color: #f1f6f9;
}
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
.chat-btn,
.ref {
  margin: 10px auto;
  display: none;
  background-color: #f0ebe3;
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  color: #14274e;
}
.btn-chat {
  width: unset;
}

.referral-card {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.referral-card > * {
  padding: 5px;
  border: 2px solid #14274e;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
