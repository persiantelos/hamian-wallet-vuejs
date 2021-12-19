import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
  state:{
    loading:false,
    blockchain:[],
    currentNet:[],
    currentAccount:[],
    currentAccountChainName:[],
    allSelectedAccount:[],
    globalReload:0,
    themeDarkMode :true,
    currentPageTitle :'',
    currentPageItems :[
      {
        text:'',
        active:true,
      },
      {
        text:'',
        active:true,
      },
    ],
    avatar:''
  },
  // actions:{
  //   showLoading({commit}){
  //     commit('setLoading',true)
  //   },
  //   hideLoading({commit}){
  //     commit('setLoading',false)
  //     }
  //   },
  // mutations:{
  //   setLoading(state,data){
  //       state.loading = data;
  //   }
  // },
})

export default store

