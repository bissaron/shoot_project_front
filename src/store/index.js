// // store.js

// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   // state: {
//   //  isSnow : true
//   // },
//   // mutations: {
//   //   SET_IS_SNOW(state,value){
//   //   state.isSnow = value;
//   //   },
//   // },
 
// });

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isBig: false,
  },
  mutations: {
    toggleIsBig(state) {
      state.isBig = !state.isBig;
      localStorage.setItem('isBig', state.isBig.toString());
    },
  },
  actions: {},
  modules: {},
});