
<script lang="ts">
import {Vue , Component} from "vue-property-decorator"
import NFTsServices from '@/services/NFTsServices'
import Spinner from '@/components/spinner/Spinner.vue';
@Component({
    components:{
        Spinner
    }
})
export default class Collections extends Vue{
        spinner:boolean= true;
        ListIsEmpty:boolean= false;
        collections:any=[];
    mounted(){
      this.getCollettions()
    }
    async getCollettions(){
        let collections = await NFTsServices.getCollectionsByOwner(this.$store.state.currentAccount.name)
        if(collections.length != 0) {
            for(let collect of collections){
                this.collections.push(collect);
            }
            this.spinner = false;
            this.ListIsEmpty = false;
        } 
        else{
            this.spinner = false;
            this.ListIsEmpty = true;
        }
    }
}
</script>

<template>
  <div>
    <div v-if="spinner">
        <Spinner v-model="spinner" />
    </div>
    <div v-if="!spinner" class="row">
    <h4 v-if="ListIsEmpty" class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Collections is empty</h4>
      <div class="col-lg-6" v-for="(collectionsItem , index) in collections" :key="index">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
        <div  class="product-img position-relative">
            <div  class="avatar-sm product-ribbon">
                <span class="avatar-title rounded-circle bg-primary mt-3"
                    >{{ collectionsItem.like }} <i class="bx bx-like"></i> 
                </span>
            </div> 
        </div> 
          <div class="card-body">
            <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="mb-3 text-truncate d-flex">
                <img loading="lazy" class="avatar-sm" v-if="$store.state.avatar" :src="$store.state.avatar" style="border-radius:50%" alt=""> <span class="mt-2 pt-1 mx-1"> {{ collectionsItem.owner }} </span> 
            </h5>
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{collectionsItem.title}}</h4>
            <p
              class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''"
            >{{JSON.parse(collectionsItem.data).des}}</p>
            <div class="popup-gallery d-flex flex-wrap">
                <img loading="lazy" @click="showImg(0)" :src='JSON.parse(collectionsItem.data).cover' style="width:100%" />
                <img loading="lazy" @click="showImg(1)" :src="JSON.parse(collectionsItem.data).img1" width="132" class="p-1" />
                <img loading="lazy" @click="showImg(2)" :src="JSON.parse(collectionsItem.data).img2" width="132" class="p-1" />
                <img loading="lazy" @click="showImg(3)" :src="JSON.parse(collectionsItem.data).img3" width="132" class="p-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>