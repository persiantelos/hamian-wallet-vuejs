<template>
    <div>
        <div v-if="spinner">
            <Spinner v-model="spinner" />
        </div>
        <div v-if="emptyList" class="col-12 text-center">
            <h4  class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
            Submited offers list is empty
            </h4>
        </div>
        <div  v-if="!spinner && !emptyList" class="col-lg-12">
                <div class="row mb-3">
                <div class="col-2 col-sm-6">
                    <div class="mt-2">
                        <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Submitted Offers</h5>
                    </div>
                </div>
                <div class="col-10 col-sm-6">
                    <form class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                    <div class="search-box me-2">
                        <div class="position-relative">
                        <input :class="$store.state.layout.themeDarkMode ? 'input-forms ':''"
                            type="text"
                            class="form-control border-0"
                            placeholder="Search..."
                            @input="searchFilter($event)"
                        />
                        <i class="bx bx-search-alt search-icon"></i>
                        </div>
                    </div>
                    <ul class="nav nav-pills product-view-nav">
                        <li class="nav-item">
                        <a class="nav-link active" href="javascript: void(0);">
                            <i class="bx bx-grid-alt"></i>
                        </a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="javascript: void(0);">
                            <i class="bx bx-list-ul"></i>
                        </a>
                        </li>
                    </ul>
                    </form>
                </div>
            </div>
            <div  class="row" >
                <div 
                    v-for="data in submitedOffers.items"
                    :key="data.serial"
                    class="col-xl-4 col-sm-6">
                    <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                    <div class="card-body" >
                        <div class="product-img position-relative">
                        <!-- <div v-if="data" class="avatar-sm product-ribbon">
                            <span class="avatar-title rounded-circle bg-primary"
                            >{{ data.like }} <i class="bx bx-like"></i> </span>
                        </div> -->
                        <div class="">
                            <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="mb-3 text-truncate d-flex">
                            <img loading="lazy" class="avatar-sm" v-if="data.owner[0].Avatar" :src="data.owner[0].Avatar" style="border-radius:50%" alt=""> <span class="mt-2 pt-1 mx-1"> {{ data.owner[0]._id }} </span> 
                            </h5>
                        </div>
                        <router-link
                            tag="a"
                            to="#"
                            @click.native="GoToItem(data)"
                        >
                        <div>
                            
                            <img loading="lazy" 
                            :src="'https://api.areaxnft.com/'+data.item.url"
                            alt
                            class="img-fluid mx-auto d-block"
                            />
                        </div>
                        </router-link>
                        </div>
                        <div class="mt-4 text-center" v-for="(tags , indexJ) in data.item.tags" :key="indexJ">
                        <h5 class="mb-3 text-truncate" v-if="tags.tag_name == 'title'">
                            <router-link
                            tag="a"
                            class="text-dark"
                            to="#"
                            @click.native="GoToItem(data)"
                            :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''"
                            >Title : {{ tags.content }}</router-link
                            >
                        </h5>
                        
                        <h5 class="my-0">
                        </h5>
                        </div>
                        <div class="text-center">
                        <h5 class="mb-3 text-truncate" >
                            <router-link
                                tag="a"
                                class="text-dark"
                                to="#"
                                @click.native="GoToItem(data)"
                            :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                            Offer : {{ data.offer }}
                            </router-link>
                        </h5>
                        <h5>
                            <span class="text-muted me-2" >
                            <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Serial Number : {{data.serial}}</span>
                            </span>
                        </h5>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- <div class="col-lg-12">
                    <b-pagination
                    variant="dark"
                    v-if="clothsData.length > 0"
                    class="justify-content-center"
                    pills
                    v-model="currentPage"
                    :total-rows="clothsData.length"
                    :per-page="6"
                    aria-controls="my-table"
                    ></b-pagination> -->
                <!-- </div> -->
            </div> 
        </div>

    </div>
</template>
<script lang="ts">
import {Vue , Component} from "vue-property-decorator"
import NFTsServices from '@/services/NFTsServices'
import Spinner from '@/components/spinner/Spinner.vue';
import AccountService from '@/services/accountService';


@Component({components:{Spinner}})
export default class SubmitedOffers extends Vue{
    submitedOffers:any=[];
    spinner:boolean=true;
    emptyList:boolean=false;
    mounted(){
        this.getSubmitedOffers()
    }
    async getSubmitedOffers(){
        let submitedOffers = await NFTsServices.getSubmitedOffers(this.$store.state.currentAccount.name)
        console.log('submitedOffers',submitedOffers)
        if(submitedOffers.items.length>0){
            this.submitedOffers = submitedOffers
            // this.spinner = false
            // this.emptyList = false
            this.getDetails()
        }
        else{
            this.spinner = false
            this.emptyList = true
        }
    }
    async getDetails(){
        for(let item of this.submitedOffers.items)
        {
            let userInfo = await AccountService.getCollectors(item.owner);
            if(userInfo.value){
                let userInformation = userInfo.value
                item.owner = userInformation
            }
        }
        console.log('this.submitedOffers',this.submitedOffers)
        this.spinner = false
        this.emptyList = false

    }
    GoToItem(item:any){
      console.log(item);
      this.$emit('submitedOfferItemDetails',item)
    }

}
</script>