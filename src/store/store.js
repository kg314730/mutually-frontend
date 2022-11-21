import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    User:{
        name:'',
        email:'',
        password:'',
        career_details:[],
        total_experience:0,
        educational_details:[],
        skills:[],
        projects:[],
    }
  },
  getters: {
  },
  mutations: {
    SET_AUTH:(state,auth)=>state.authenticated = auth
  },
  actions: {
    setAuth:(context,auth)=>{
      context.commit('SET_AUTH',auth);
    }
  },
  modules: {
  }
})
