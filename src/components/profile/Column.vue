<template>
    <div>
        <div class="card overflow-hidden" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div v-if="informationCard.cover == ''" :class="informationCard.cover != '' ? '' :'col-7'">
                <div class="text-primary p-3">
                  <!-- <h5 class="text-primary" >Welcome Back !</h5> -->
                  <!-- <p>{{informationCard.bio}}</p> -->
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img v-if="informationCard.cover == ''" src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
              <div class="col-12">
                <img v-if="informationCard.cover != ''" :src="informationCard.cover" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-4">
                <div class="avatar-md profile-user-wid mb-4">
                  <img v-if="informationCard.avatar == ''"
                    src="@/assets/images/users/avatar-1.jpg"
                    alt
                    class="img-thumbnail rounded-circle"
                  />
                  <img v-if="informationCard.avatar != ''" :src="informationCard.avatar" class="img-thumbnail rounded-circle">
                </div>
                <h5 class="font-size-15 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{informationCard.name}}</h5>
                <p class="text-muted mb-0 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">UI/UX Designer</p>
              </div>

              <div class="col-sm-8">
                <div class="pt-4">
                  <div class="row">
                    <div class="col-6">
                      <h5 class="font-size-15" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{informationCard.items}}</h5>
                      <p class="text-muted mb-0" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Items</p>
                    </div>
                    <div class="col-6">
                      <h5 class="font-size-15" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{informationCard.sets}}</h5>
                      <p class="text-muted mb-0" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Sets</p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <a href class="btn btn-primary btn-sm">
                      Edit Profile for (5.0000 DRIC)
                      <i class="mdi mdi-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->

        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Personal Information</h4>

            <p
              class="text-muted mb-4"
              :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''"
            >{{informationCard.bio}}</p>
            <div class="table-responsive ">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="bx bx-user"></i> Full Name :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{informationCard.firstName + ' ' + informationCard.lastName}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="mdi mdi-email-outline"></i> E-mail :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{informationCard.email}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="mdi mdi-telegram"></i> Telegram :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{informationCard.telegram}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="mdi mdi-twitter"></i> Twitter :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{informationCard.twitter}}</td>
                  </tr>
                  <tr>
                    <th scope="row d-flex" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                        <i class="dripicons-location"></i> Location :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">{{informationCard.location}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component , Prop} from "vue-property-decorator"
@Component({components:{}})
export default class Content extends Vue{
  @Prop({default:()=>{return []}}) informationCard:any;
 
};
</script>