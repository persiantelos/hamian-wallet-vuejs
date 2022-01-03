<template>
    <div>
        <div v-if="spinner">
            <Spinner v-model="spinner" />
        </div>
        <div>
            <div v-if="emptyList" class="col-12 text-center">
                <h4  class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                Bookmarks list is empty
                </h4>
            </div>
            <div  v-if="!spinner && !emptyList" class="col-lg-12">
                 <div class="row mb-3">
                    <div class="col-2 col-sm-6">
                        <div class=" mt-2">
                            <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Bookmarks</h5>
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
                    <div v-for="data in bookmarks"
                        :key="data.serial"
                        class="col-xl-4 col-sm-6">
                        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                        <div class="card-body" >
                            <div class="product-img position-relative">
                            <div class="">
                                
                                <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="mb-3 text-truncate d-flex">
                                    <img v-if="!data.ownerAvatar"
                                    class="rounded-circle header-profile-user"
                                    src="@/assets/images/users/1.jpg"
                                    alt="A"
                                />
                                <span class="mt-2 pt-0 mx-1" v-if="!data.ownerAvatar">{{ data.owner }}</span> 
                                <img loading="lazy" class="avatar-sm" v-if="data.ownerAvatar" :src="data.ownerAvatar" style="border-radius:50%" alt=""> <span class="mt-2 pt-1 mx-1" v-if="data.ownerAvatar"> {{ data.owner }}</span> 
                                
                                </h5>
                            </div>
                            <router-link
                                tag="a"
                                to="#"
                                @click.native="GoToItem(data)"
                            >
                            <div >
                                
                                <img loading="lazy" v-if="data.url"
                                :src="'https://api.areaxnft.com/'+data.url"
                                alt
                                class="img-fluid mx-auto d-block"
                                />
                            </div>
                            </router-link>
                            </div>
                            <div class="mt-4 text-center" v-for="(tags , indexJ) in data.tags" :key="indexJ">
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
                     <div class="col-lg-12">
                        <b-pagination
                        variant="dark"
                        v-if="bookmarks.length > 0"
                        class="justify-content-center"
                        pills
                        v-model="currentPage"
                        :total-rows="bookmarks.length"
                        :per-page="6"
                        aria-controls="my-table"
                        ></b-pagination> 
                    </div>
                </div> 
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
export default class Bookmarks extends Vue{
    bookmarks:any=[];
    spinner:boolean=true;
    currentPage:number=1;
    count:number=1;
    emptyList:boolean=false;
    mounted(){
        this.getBookmarks()
    }
    async getBookmarks(){
        let bookmarks = await NFTsServices.getBookmarks(this.$store.state.currentNet.host,this.$store.state.currentAccount.name)
        console.log('bookmarks',bookmarks)
        if(bookmarks.value){
            this.bookmarks = bookmarks.value
            this.getOwnerAvatar();
        }
        else{
            this.spinner = false
            this.emptyList = true
        }
    }
    async getOwnerAvatar(){
        for(let item of this.bookmarks){
            let owner = await AccountService.getSocialProfile(item.owner)
            if(owner != 'account not found'){
                item.ownerAvatar = owner.Avatar
            }
        }
        this.emptyList = false
        this.spinner = false
    }
    GoToItem(item:any){
      console.log(item);
      this.$emit('bookmarksItemDetails',item)
    }
}
</script>