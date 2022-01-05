<script lang="ts">
import {Vue , Component,Watch} from 'vue-property-decorator'
import NFTsServices from '@/services/NFTsServices'
import Spinner from "@/components/spinner/Spinner.vue"
@Component({components:{Spinner}})

/**
 * Products component
 */
export default class Products extends Vue{
  sliderPrice:number= 800;
  currentPage:number= 1;
  count:number=1;
  counter:number=1;
  discountRates:any =[];
  itemsList:any=[];
  showSpinner :boolean=true;
  ListIsEmpty :boolean=false;
  mounted() {
    this.getitems()
  }
  @Watch('currentPage')
    currentPageChanged(newVal:any){
        console.log('newVal',newVal)
        this.getitems((newVal-1)*6)
    }
  GoToItem(item:any){
    this.$emit('itemDetails',item)
  }
  async getitems(skip:any=0){
    this.showSpinner = true;
    this.itemsList = await NFTsServices.getItemByOwner(this.$store.state.currentAccount.name,skip)
    if(this.itemsList){
      this.count=this.itemsList.count
      this.showSpinner = false;
      this.ListIsEmpty = false;
      this.counter++
    }
    else{
      this.showSpinner = false;
      this.ListIsEmpty = true;
      this.counter++
    }
  }
};
</script>

<template>
    <div class="row" >
      <p class="d-flex">{{counter}}</p>
      <div class="mt-5" v-if="showSpinner">
        <Spinner v-model="showSpinner" />
      </div>
      <div v-if="ListIsEmpty" class="col-12 text-center"> 
        <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
          NFTs list is empty
        </h4>
      </div>
      <div  v-if="!showSpinner" class="col-lg-12">
        <div class="row mb-3">
          <div class="col-2 col-sm-6">
            <div class="mt-2">
              <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Items</h5>
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
            v-for="data in itemsList.items"
            :key="data.item.serial"
            class="col-xl-4 col-sm-6"
          >
            <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
              <div class="card-body" >
                <div class="product-img position-relative">
                  <div v-if="data" class="avatar-sm product-ribbon">
                    <span class="avatar-title rounded-circle bg-primary"
                      >{{ data.like }} <i class="bx bx-like"></i> </span>
                  </div>
                  <div class="">
                    <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="mb-3 text-truncate d-flex">
                      <img loading="lazy" class="avatar-sm" v-if="$store.state.avatar" :src="$store.state.avatar" style="border-radius:50%" alt=""> <span class="mt-2 pt-1 mx-1"> {{ data.item.owner }} </span> 
                    </h5>
                  </div>
                  <router-link
                    tag="a"
                    to="#"
                    @click.native="GoToItem(data)"
                  >
                  <div>
                    <img loading="lazy" v-if="data.url"
                      :src="data.url"
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
                      <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Serial Number : {{data.item.serial}}</span>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- end row -->

        <div class="row">
          <div class="col-lg-12">
            <b-pagination
              variant="dark"
              v-if="itemsList.items.length > 0"
              class="justify-content-center"
              pills
              v-model="currentPage"
              :total-rows="count"
              :per-page="6"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
</template>
