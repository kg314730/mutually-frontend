<template>
  <div class="post">
    <div class="feed-header">
      <router-link to="/post"
        ><button class="btn btn-primary custom-btn">
          Create New Post
        </button></router-link
      >
      &nbsp;&nbsp;
      <button
        class="btn btn-primary custom-btn"
        @click="customResult"
        style="float: right"
      >
        Filter
      </button>
      <input
        type="text"
        v-model="company"
        placeholder="Search by Company...."
        style="float: right; height: 37px; margin-right: 8px"
      />
      &nbsp;&nbsp;
    </div>
    <div class="feed" v-for="(item, i) in feed" :key="i">
      <div class="header">
        <img
          v-if="item.picture != ''"
          :src="item.picture"
          alt="profile picture"
        />
        <img
          v-else
          src="../assets/profile-user.png"
          alt="profile picture"
          width="220px"
        />
        <div class="title">
          <router-link :to="'/viewprofile/' + item.creator"
            ><h5 style="margin-bottom: 0">{{ item.name }}</h5></router-link
          >
          <h6 style="margin: 0">{{ item.company }}</h6>
        </div>
        <h6 v-if="item.referral_type == 'looking'" style="margin-left: auto">
          #Seeking Referral
        </h6>
        <h6 v-else style="margin-left: auto">#Providing Referral</h6>
      </div>
      <div class="text">
        <p>{{ item.text }}</p>
      </div>
      <center>
        <a v-if="item.link != ''" :href="item.link" target="_blank"
          ><button class="btn btn-primary custom-btn">
            Job Description
          </button></a
        >
        <button v-else class="btn btn-primary custom-btn" disabled>
          Description Not Provided
        </button>
        &nbsp;&nbsp;<button
          class="btn btn-primary custom-btn"
          @click="showChat(i)"
          v-if="user._id != item.creator"
        >
          Send a Message <i class="fa-brands fa-rocketchat"></i>
        </button>
        <div class="chat">
          <textarea
            type="text"
            v-model="message"
            placeholder="Type your message here..."
            required
            cols="30"
          ></textarea
          ><br />
          <button class="btn btn-primary custom-btn" @click="sendMessage(i)">
            Send
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-primary custom-btn" @click="hideChat(i)">
            Close
          </button>
        </div>
      </center>
    </div>
    <div class="feed" v-if="this.feed.length == 0">
      <center><h4>No results found!</h4></center>
    </div>
  </div>
</template>
<script>
export default {
  name: "FeedComp",
  data() {
    return {
      feed: [],
      company: "",
      message: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    try {
      const resp = await fetch(`${process.env.VUE_APP_API_URL}user`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const ct = await resp.json();
      // this.user = content;
      if (resp.status != 401) {
        this.$store.commit("UPDATE_USER", ct);
      }
      const response = await fetch(`${process.env.VUE_APP_API_URL}feed/posts`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      if (response.status != 401) {
        this.feed.push(...content);
      }
    } catch (e) {
      this.feed = [];
    }
  },
  methods: {
    async customResult() {
      try {
        if (this.company == "") {
          location.reload();
        } else {
          const response = await fetch(
            `${
              process.env.VUE_APP_API_URL
            }feed/posts?company=${this.company.toUpperCase()}`,
            {
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          this.feed = [];
          const content = await response.json();
          if (response.status != 401) {
            this.feed.push(...content);
          }
        }
      } catch (e) {
        this.feed = [];
      }
    },
    showChat(i) {
      let element = Array.from(document.getElementsByClassName("chat"))[i];
      element.style.display = "block";
    },
    hideChat(i) {
      let element = Array.from(document.getElementsByClassName("chat"))[i];
      element.style.display = "none";
    },
    async sendMessage(i) {
      const resp = await fetch(`${process.env.VUE_APP_API_URL}message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: this.feed[i].creator,
          from: this.user._id,
          message: this.message,
        }),
      });
      if (resp.status == 200) {
        alert("Message sent Successfully!");
        this.hideChat(i);
      } else {
        alert(resp.statusText);
        this.hideChat(i);
      }
    },
  },
};
</script>

<style scoped>
div {
  background-color: #f1f6f9;
  color: #14274e;
}
.feed-header {
  background-color: #f0ebe3;
}
.post,
.feed {
  border: 3px solid #14274e;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 5px auto;
  background-color: #f0ebe3;
}
.feed > * {
  background-color: #f0ebe3;
}
.header {
  display: flex;
  align-items: center;
}
.header img {
  width: 60px;
  padding: 5px;
  border-radius: 50%;
}
.custom-btn {
  background-color: #394867;
  color: white;
  border: none;
}
.title,
.chat {
  background-color: #f0ebe3;
}
.chat {
  margin: 5px;
  width: fit-content;
  display: none;
}
.title a {
  text-decoration: none;
  color: #14274e;
}
</style>
