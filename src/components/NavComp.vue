<template>
  <div>
    <nav class="navbar navbar-expand-lg color-set">
      <div class="container-fluid">
        <router-link to="/feed"
          ><img src="./../assets/logo.gif" alt="logo" class="logo"
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                aria-current="page"
                href="#sign-up-form"
                v-if="!authenticated"
                >Sign Up</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#footer">Contact Us</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/myprofile" v-if="authenticated"
                >My Profile</router-link
              >
            </li>
            <li class="nav-item">
              <button
                class="nav-link custom"
                @click="getmessage"
                v-if="authenticated"
              >
                Messages
              </button>
              <div class="messages" id="message-box">
                <h5 class="cross">
                  <i
                    class="fa-solid fa-rectangle-xmark"
                    @click="close('message-box')"
                  ></i>
                </h5>
                <div v-if="messages.length == 0">No Messages Found</div>
                <div
                  class="message-card"
                  v-for="(item, i) in messages"
                  :key="i"
                >
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {{ item[0]["1"].name }}
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li class="bg-transparent">
                        <div class="chat">
                          <router-link :to="'/viewprofile/' + item[0]['1']._id"
                            ><center>
                              <h4>{{ item[0]["1"].name }}</h4>
                            </center></router-link
                          >
                          <div
                            class="chat"
                            v-for="(msg, idx) in item"
                            :key="idx"
                          >
                            <div v-if="msg['0']" class="chat-msg mine">
                              <h6>{{ msg["2"] }}</h6>
                            </div>
                            <div v-else class="chat-msg other">
                              <h6>{{ msg["2"] }}</h6>
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Message...."
                            v-model="message[i]"
                          />
                          <button
                            class="btn btn-outline-success custom-btn"
                            @click="sendMessage(i)"
                          >
                            Send
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <button
                class="nav-link custom"
                @click="signout"
                v-if="authenticated"
              >
                Sign Out
              </button>
            </li>
          </ul>
          <ul class="navbar-nav" v-if="authenticated">
            <div class="cust-form">
              <form class="d-flex" role="search" @submit.prevent="getList">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search People by Company...."
                  aria-label="Search"
                  v-model.trim="company"
                />
                <button
                  class="btn btn-outline-success cust-button"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <div class="results" id="result_list">
                <h5 class="cross">
                  <i
                    class="fa-solid fa-rectangle-xmark"
                    @click="close('result_list')"
                  ></i>
                </h5>
                <div class="profile" v-if="results.length == 0">
                  <h5>No results found for this company</h5>
                </div>
                <div class="profile" v-for="(item, i) in results" :key="i">
                  <div class="left">
                    <span></span>
                    <router-link :to="'/viewprofile/' + item._id"
                      ><h5 class="name">{{ results[i].name }}</h5></router-link
                    >
                    <p>
                      {{ results[i].current_position }},
                      {{ results[i].current_company }}<br />Experience:
                      {{ results[i].current_experience }} years
                    </p>
                  </div>
                  <div class="right">
                    <img
                      v-if="results[i].profile_picture != ''"
                      :src="results[i].profile_picture"
                      alt="Office Image"
                      class="img-fluid"
                    /><img
                      v-else
                      src="./../assets/profile-user.png"
                      alt="Profile Image"
                      class="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavComp",
  data() {
    return {
      results: [],
      company: "",
      messages: "",
      message: [],
    };
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async signout() {
      await fetch(`${process.env.VUE_APP_API_URL}logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      await this.$store.dispatch("setAuth", false);
      this.$store.commit("UPDATE_USER", {});
      await this.$router.push("/");
    },
    close(element_id) {
      document.getElementById(element_id).style.display = "none";
    },
    async getList() {
      try {
        this.results = [];
        let ans = await (
          await fetch(
            `${process.env.VUE_APP_API_URL}search?company=${this.company}`,
            {
              credentials: "include",
            }
          )
        ).json();
        this.results.push(...ans);
        document.getElementById("result_list").style.display = "block";
      } catch (e) {
        document.getElementById("result_list").style.display = "block";
      }
    },
    async getData(id) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}find?id=${id}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const content = await response.json();
        if (response.status != 401) {
          return { _id: content._id, name: content.name };
        }
      } catch (e) {
        return null;
      }
    },
    async getmessage() {
      let messagemap = new Map();
      document.getElementById("message-box").style.display = "block";
      let resp = await (
        await fetch(
          `${process.env.VUE_APP_API_URL}messages?id=${this.user._id}`,
          { credentials: "include" }
        )
      ).json();
      for (let element of resp) {
        let key;
        let other;
        let mine;
        if (element.to != element.from) {
          if (element.to == this.user._id) {
            key = element.from;
            other = await this.getData(element.from);
            mine = false;
          } else {
            key = element.to;
            other = await this.getData(element.to);
            mine = true;
          }
          let val = messagemap.get(key);
          if (typeof val == "undefined") {
            messagemap.set(key, [[mine, other, element.message]]);
          } else {
            val.push([mine, other, element.message]);
          }
        }
      }
      this.messages = Array.from(messagemap.values());
      this.message = Array.from({ length: this.messages.length }, () => "");
    },
    async sendMessage(i) {
      const resp = await fetch(`${process.env.VUE_APP_API_URL}message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: this.messages[i][0]["1"]._id,
          from: this.user._id,
          message: this.message[i],
        }),
        credentials: "include",
      });
      if (resp.status == 200) {
        alert("Message sent Successfully!");
        this.getmessage();
      } else {
        alert(resp.statusText);
      }
    },
  },
};
</script>

<style scoped>
.dropdown-toggle {
  width: 100%;
  background-color: #14274e;
}
.dropdown-menu {
  padding: 5px;
  position: static;
}

.messages {
  background-color: #f0ebe3;
  color: black;
  position: absolute;
  width: 30%;
  z-index: 10;
  padding: 10px;
  border-radius: 10px;
  display: none;
  max-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
.message-card {
  border: 2px solid #14274e;
  border-radius: 10px;
  padding: 5px;
  width: 90%;
  margin: 5px auto;
}
.dropdown > ul {
  background-color: #f1f6f9;
}
.chat {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.mine {
  align-self: flex-end;
  width: fit-content;
  border: 1px solid #14274e;
  background-color: #dcf8c6;
  padding: 5px 10px;
  border-radius: 10px;
}
.other {
  align-self: flex-start;
  width: fit-content;
  background-color: #f1f6f9;
  padding: 5px 10px;
  border: 1px solid #14274e;
  border-radius: 10px;
}
nav li:hover,
.custom:hover {
  background-color: #394867;
}
.color-set,
.custom {
  background-color: #14274e;
  color: #f1f6f9;
  border: none;
}
.color-set a {
  color: #f1f6f9;
}
.logo {
  height: 75px;
}
.navbar-toggler {
  background-color: #f1f6f9;
}
.cust-button {
  background-color: #f0ebe3;
  font-weight: 500;
  color: #14274e;
}
.cust-form {
  width: 400px;
}

.results {
  display: none;
  position: absolute;
  margin-top: 10px;
  background-color: #9ba4b4;
  color: #14274e;
  z-index: 10;
  padding: 5px;
  width: 33%;
  border-radius: 10px;
  max-height: 500px;
  width: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
@media only screen and (max-width: 990px) {
  .cust-form {
    width: 80vw;
  }
  .results {
    width: 80vw;
  }
  .messages {
    width: 80vw;
    max-width: 500px;
  }
}
.profile {
  display: flex;
  border-radius: 10px;
  padding: 5px;
  background-color: #f0ebe3;
  border: solid 2px #14274e;
}
.profile h5,
p {
  margin-bottom: 0px;
}
.profile p {
  font-weight: 500;
}
.left {
  width: 80%;
}
.right {
  margin: auto;
}
.right img {
  max-width: 72px;
}
.cross {
  text-align: right;
  color: rgb(175, 12, 12);
}

.left a,
.chat a {
  text-decoration: none;
  color: #14274e;
}

.custom {
  width: 100%;
  text-align: left;
}
.custom-btn {
  background-color: #394867;
  width: 150px;
  color: #f1f6f9;
  margin: auto;
  padding: 5px;
}
</style>
