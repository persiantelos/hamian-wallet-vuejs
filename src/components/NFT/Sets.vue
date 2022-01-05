<script lang="ts">
import {Vue , Component,Watch} from 'vue-property-decorator'
import NFTsServices from '@/services/NFTsServices'
import Spinner from "@/components/spinner/Spinner.vue"
@Component({components:{Spinner}})

export default class Sets extends Vue{
  currentPage:number= 1;
  count:number=1;
  counter:number=1;
  discountRates:any= [];
  itemsList:any=[];
  showSpinner :boolean=true;
  setsIsEmpty :boolean=false;
  sets:any=[]
  mounted() {
    this.getSets()
  }
    @Watch('currentPage')
      currentPageChanged(newVal:any){
          console.log('newVal',newVal)
          this.getSets((newVal-1)*6)
    }
    GoToItem(set:any){
      this.$emit('SetDetails',set)
    }
    async getSets(skip:any=0){
      this.showSpinner = true;
        this.sets  = await NFTsServices.getSetsByCreator(this.$store.state.currentAccount.name,skip)
        if(this.sets.message != false){   
            this.count=this.sets.count
            this.showSpinner = false;
            this.setsIsEmpty = false;
            this.counter++
        }
        else{
            this.showSpinner = false;
            this.setsIsEmpty = true;
            this.counter++
        }
    }
};
</script>

<template>
    <div class="row" >
      <p class="d-none">{{counter}}</p>
        <div class="mt-5" v-if="showSpinner">
            <Spinner v-model="showSpinner" />
        </div>
        <div v-if="setsIsEmpty" class="col-12 text-center">
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">You have no set to display!</h4>
        </div>
      <div  v-if="!showSpinner && !setsIsEmpty" class="col-lg-12">
        <div class="row mb-3">
          <div class="col-2 col-sm-6">
            <div class="mt-2">
              <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Sets</h5>
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
            </form>
          </div>
        </div>
        <div  class="row" >
          <div 
            v-for="data in sets.result"
            :key="data.item.serial"
            class="col-xl-4 col-sm-6"
          >
            <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
              <div class="card-body" >
                <div class="product-img position-relative">
                
                  <div class="">
                    <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="mb-3 text-truncate d-flex">
                      <img loading="lazy" class="avatar-sm" v-if="$store.state.avatar" :src="$store.state.avatar" style="border-radius:50%" alt=""> <span class="mt-2 pt-1 mx-1"> {{ data.item.creator }} </span> 
                    </h5>
                  </div>
                  <router-link
                    tag="a"
                    to="#"
                    @click.native="GoToItem(data.item)"
                  >
                    <img
                      loading="lazy" 
                      :src="'https://api.areaxnft.com/'+data.item.url"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                   
                  </router-link>
                </div>
                <div class="mt-4 text-center">
                  <h5 class="mb-3 text-truncate">
                    <router-link
                      tag="a"
                      class="text-dark"
                      to="#"
                      @click.native="GoToItem(data.item)"
                      :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''"
                      >Title : {{ JSON.parse(data.item.data).ti }}</router-link
                    >
                  </h5>
                 
                  <h5 class="my-0">
                   
                  </h5>
                </div>
                <div class="text-center mt-3">
                  <h5>
                    <span class="text-muted" >
                      <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Id Number : {{data.item.id}}</span>
                    </span>
                  </h5>
                </div>
                <div class="text-center mt-3">
                  <h5>
                    <span class="text-muted" >
                      <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Remains : {{data.item.remains +'/'+ data.item.max}} </span>
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
              v-if="sets.result.length > 0"
              class="justify-content-center"
              pills
              v-model="currentPage"
              :total-rows="sets.result.length"
              :per-page="6"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
</template>
