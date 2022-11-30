import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/HomePage.vue";
import ProfileComp from "../components/ProfileComp.vue";
import MyProfile from "../components/MyProfile.vue";
import OthersProfile from "../components/OthersProfile.vue";
import CreatePost from "../components/CreatePost.vue";
import FeedComp from "../components/FeedComp.vue";
import NotFound from "../components/NotFound.vue";
import store from "../store/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/profile",
    component: ProfileComp,
  },
  {
    path: "/myprofile",
    component: MyProfile,
  },
  {
    path: "/post",
    component: CreatePost,
  },
  {
    path: "/feed",
    component: FeedComp,
  },
  {
    path: "/viewprofile/:id",
    component: OthersProfile,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (from.path != to.path && !store.state.authenticated) {
    next("/");
  } 
  // else if (to.path == "/profile" && from.path != "/myprofile") {
  //   if (store.state.user.profile_set == "true") next("/feed");
  // }
  next();
});
export default router;
