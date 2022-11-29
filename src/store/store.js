import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: {
      name: "",
      email: "",
      password: "",
      career_details: [],
      total_experience: 0,
      educational_details: [],
      skills: [],
      projects: [],
      profile_picture: "",
      resume: "",
      profile_set: "",
      current_company: "",
      current_exp: "",
      current_position: "",
      messages: [],
    },
  },
  getters: {},
  mutations: {
    SET_AUTH: (state, auth) => (state.authenticated = auth),
    UPDATE_USER: (state, other) => {
      state.user = other;
    },
  },
  actions: {
    setAuth: (context, auth) => {
      context.commit("SET_AUTH", auth);
    },
  },
  plugins: [createPersistedState()],
});
