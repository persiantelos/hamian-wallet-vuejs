<template>
    <div>
        <div v-if="spinner" class="card spinner" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
            <Spinner v-model="spinner" />
        </div> 
        <div v-if="spinner" class="card spinner" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
            <Spinner  v-model="spinner"/>
        </div>

        <div v-if="!spinner" class="card overflow-hidden" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div v-if="formInformation.cover == ''" :class="formInformation.cover != '' ? '' :'col-7'">
                <div class="text-primary p-3">
                  <!-- <h5 class="text-primary" >Welcome Back !</h5> -->
                  <!-- <p>{{formInformation.bio}}</p> -->
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img v-if="formInformation.cover == ''" src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
              <div class="col-12 cover">
                <img v-if="formInformation.cover != ''" :src="formInformation.cover" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-4">
                <div class="avatar-md profile-user-wid mb-4">
                  <img v-if="formInformation.avatar == ''"
                    src="@/assets/images/users/avatar-1.jpg"
                    alt
                    class="img-thumbnail rounded-circle"
                  />
                  <img v-if="formInformation.avatar != ''" :src="formInformation.avatar" class="img-thumbnail rounded-circle">
                </div>
                <h5 class="font-size-15 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{accountInformation.name}}</h5>
                <p class="text-muted mb-0 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">{{accountInformation.chain}}</p>
              </div>

              <div class="col-sm-8">
                <div class="pt-4">
                  <div class="row">
                    <div class="col-6 text-center">
                      <h5 class="font-size-15" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{accountInformation.items}}</h5>
                      <p class="text-muted mb-0" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Items</p>
                    </div>
                    <div class="col-6 text-center">
                      <h5 class="font-size-15" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{accountInformation.sets}}</h5>
                      <p class="text-muted mb-0" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Sets</p>
                    </div>
                  </div>
                  <div class="mt-4" align="right">
                    <a href class="btn btn-primary btn-sm" @click="edditProfile()">
                      Edit Profile
                      <i class="mdi mdi-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="!spinner" class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Personal Information</h4>

            <p
              class="text-muted mb-4"
              :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''"
            >{{formInformation.bio}}</p>
            <div class="table-responsive ">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="bx bx-user"></i> Full Name :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{formInformation.firstName + ' ' + formInformation.lastName}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="mdi mdi-email-outline"></i> E-mail :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{formInformation.email}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="mdi mdi-telegram"></i> Telegram :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{formInformation.telegram}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="mdi mdi-twitter"></i> Twitter :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{formInformation.twitter}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="dripicons-location"></i> Location :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{formInformation.location}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component , Prop , Watch} from "vue-property-decorator"
import Spinner from "@/components/spinner/Spinner.vue"
@Component({components:{Spinner}})
export default class Content extends Vue{
    @Prop({default:()=>{return []}}) informationCard:any;
    @Prop({default:()=>{return []}}) accInformation:any;
    @Prop({default:()=>{return 0}}) counter:any;
    accountInformation:any=[];
    formInformation:any=[];
    spinner:boolean=true;
    mounted(){
        this.formInformation = this.informationCard;
        this.accountInformation = this.accInformation;
        setTimeout(() => {
            this.spinner=false
        }, 400);
    }
    @Watch('counter')
    reload(){
        this.spinner=true
        this.formInformation = this.informationCard;
        this.accountInformation = this.accInformation;
        setTimeout(() => {
            this.spinner=false
        }, 10000);
    }
    edditProfile(){
        this.$emit('editProfile')
    }
};
</script>
<style lang="scss" scoped>
.cover{
    max-height: 250px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.spinner{
    min-height: 300px;
}
</style>