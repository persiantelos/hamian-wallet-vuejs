<template>
    <div>
        <div v-if="spinner">
            <Spinner v-model="spinner" />
        </div>
        <div v-if="!spinner" class="row d-flex">
            <div v-if="emptyList" class="col-12 text-center">
                <h4  class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                Following List is Empty
                </h4>
            </div>
            <div v-if="!emptyList" class="row d-flex">
                <div v-for="(user , index) in getFolloingDetails" :key="index" class="col m-1" style="min-width:250px;max-width:250px">
                    <div  class="card overflow-hidden" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                        <div class="bg-soft bg-primary">
                            <div class="row">
                            <div v-if="user[0].Cover == ''" :class="user.Cover != '' ? '' :'col-7'">
                                <div class="text-primary p-3">
                                    <p>{{user[0].bio}}</p> 
                                </div>
                            </div>
                            <div class="col-5 align-self-end">
                                <img v-if="user[0].Cover == ''" src="@/assets/images/profile-img.png" alt class="img-fluid" />
                            </div>
                            <div class="col-12 cover" >
                                <img v-if="user[0].Cover != ''" loading="lazy"  :src="user[0].Cover" alt class="img-fluid" />
                            </div>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <div class="row">
                            <div class="col-12">
                                <div class="avatar-md profile-user-wid mb-4">
                                <img v-if="user[0].Avatar == ''"
                                    src="@/assets/images/users/1.jpg"
                                    alt
                                    class="img-thumbnail rounded-circle"
                                />
                                <img v-if="user[0].Avatar != ''" loading="lazy" :src="user[0].Avatar" class="img-thumbnail rounded-circle">
                                </div>
                                <h5 class="font-size-15 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{user[0].FirstName + ' ' + user[0].LastName}}</h5>
                                <p class="text-muted mb-0 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">{{user[0].Location}}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <b-pagination
                variant="dark"
                v-if="getFolloingDetails.length > 0"
                class="justify-content-center"
                pills
                v-model="currentPage"
                :total-rows="getFolloingDetails.length"
                :per-page="6"
                aria-controls="my-table"
                ></b-pagination> 
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component} from 'vue-property-decorator'
import Spinner from "@/components/spinner/Spinner.vue"
import NFTsServices from "@/services/NFTsServices"
import AccountService from '@/services/accountService';
import ProfileModel from "@/models/profile/profileModel"


@Component({components:{Spinner}})
export default class Following extends Vue{
    spinner:boolean=true;
    emptyList:boolean=false;
    currentPage:number=1;
    getFolloingDetails:any=[];
    userInformation:ProfileModel = new ProfileModel();
    Following:any=[];
    mounted(){
        this.getFollowing()
    }
    async getFollowing(){
        this.Following = await NFTsServices.getFollowing(this.$store.state.currentAccount.name)
        if(this.Following.items.length > 0){
            this.getDetails();
        }
        else{
            this.emptyList = true;
            this.spinner = false;
        }
    }
    async getDetails(){
        for(let item of this.Following.items)
        {
            let userInfo = await AccountService.getCollectors(item.username);
            if(userInfo.value){
                this.userInformation = userInfo.value
                this.getFolloingDetails.push(this.userInformation)
            }
        }
        console.log('this.getFolloingDetails',this.getFolloingDetails)
        this.spinner=false;
    }
}
</script>
<style lang="scss">
.cover{
    width: 100%;
    height: 200px;
    img{
        width: 100%;
        object-fit: cover;
        height: 100% !important;
    }
}
</style>