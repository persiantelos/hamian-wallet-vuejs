<script>
// import axios from "axios";

import Layout from "../../layouts/auth";
import {
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";
import { mapState } from "vuex";

import appConfig from "@/app.config";
import { required } from "vuelidate/lib/validators";
import StorageService from "@/localService/storageService";



/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      file:[],
      uploadFile:[],
    };
  },
  validations: {
    password: {
      required,
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    async tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        console.log('this is invalid')
        return;
      } else {
        if(this.password.length > 5){
            this.uploadFile;
            console.log('password',this.password)
            console.log('file',this.uploadFile)
            console.log('upload method is not writed yet')
        }
      }
    },
    upload()
    {
        var el =document.getElementById("image-file");
        if(el)
        {
            el.click()
        }
    },
    preventDefault($event){
        $event.preventDefault()
    },
    fileChanged(){
        var el=document.getElementById("image-file");
        if(el){
          let photo = el.files[0]
          if(photo){
              this.file = photo;
                this.getJSON(this.file.path);

          }
        }
    },
    getJSON(path) {
        return new Promise((resolve, reject) => {
        // if (Platform.is.electron) {
            // let fs = require('fs')
            const fs = window.require('fs');
            fs.readFile(path, (error, data) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log(data)
                resolve(data)
            }
            })
        // } 
        // else {
        //     console.log('test')
        //     let request = new XMLHttpRequest()

        //     request.addEventListener('load', () => {
        //     if (request.status >= 200 && request.status < 400) {
        //         resolve(request.response)
        //     } else {
        //         reject(Error(request.statusText))
        //     }
        //     })

        //     request.addEventListener('error', () => {
        //     reject(Error("Network Error"))
        //     })

        //     request.open('GET', path, true)
        //     request.send()
        // }
        }).then((res)=>{
        console.log(res.toString('utf8'))
        this.uploadFile = res;
        }).catch(error => {
        console.log('Failed to load JSON file', path, error)
        throw error
        })
    },
  },
    mounted() {},
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p>Sign in to continue to Hamian.</p>
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
            <b-alert
              v-model="isAuthError"
              variant="danger"
              class="mt-3"
              dismissible
              >{{ authError }}</b-alert
            >
            <div
              v-if="notification.message"
              :class="'alert ' + notification.type"
            >
              {{ notification.message }}
            </div>
            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group
                class="mb-3"
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="password"
                  type="password"
                  placeholder="Enter password"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                ></b-form-input>
                <div style="display:none">
                    <input id="image-file" 
                    type="file" 
                    class="form-control text-left input-border"
                    @change="fileChanged" />
                  </div>
                <div>
                    <input type="text" 
                    readonly 
                  class="form-control mt-2 my-2 input-border" 
                  placeholder="Upload File"
                  aria-label="Uplaod File"
                  aria-describedby="default"
                  v-model="file.name"
                  @click="upload()"
                  @keydown="preventDefault($event)"
                >
                </div>
                <div
                  v-if="submitted && !$v.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </b-form-group>
              <div class="mt-5 d-grid">
                <b-button type="submit" variant="primary" class="btn-block"
                  >Log In</b-button
                >
              </div>
              <div class="mt-5 text-center">
                <p>
                  Don't have an account ?
                  <router-link
                    tag="a"
                    to="/CreateAccount"
                    class="fw-medium text-primary"
                    >Signup now</router-link>
                </p>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module>
.custom-file{
    text-align: left;
    direction: rtl;
}
</style>
