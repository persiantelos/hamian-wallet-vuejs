
<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Re-link</h5>
                  <p>via <a v-if="data"  href="">{{data.origin}}</a></p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                  src="@/assets/images/profile-img.png"
                  alt
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/picture/hamian.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>
            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <div>
                    <p class="py-3 h5">It looks like the linking with <span class="text-body1 text-grey-4">{{data.origin}}</span> was somehow broken. <span class="text-body-1 text-grey-4">Make sure you are actually using this application before re-linking!</span> </p>
              </div>
              <div class="mt-5 d-grid">
                <b-button @click="Allow()" variant="primary" class="btn-block"
                  >SIGN</b-button
                >
                <b-button @click="Deny()" variant="secondary" class=" mt-2 btn-block"
                  >DENY</b-button
                >
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
// import axios from "axios";

import Layout from "../../layouts/auth";
import {Vue , Component} from 'vue-property-decorator'
@Component({
    components:{
        Layout,
    }
})
export default class ReLink extends Vue{
    data:any={
        origin:'telos.bloks.io',
    }
    Allow(){
        // TODO:add some method here
        this.$router.push("/")
    }
    Deny(){
        // TODO:add some method here
        this.$router.push("/")
    }
  
}
</script>


<style lang="scss" module></style>
