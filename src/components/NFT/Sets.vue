<script>
import appConfig from "@/app.config";
import { clothsData } from "./data-products";
import NFTsServices from '@/services/NFTsServices'
import Spinner from "@/components/spinner/Spinner.vue"
/**
 * Products component
 */
export default {
  page: {
    title: "Product",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {Spinner},
  data() {
    return {
      clothsData: clothsData,
      sliderPrice: 800,
      currentPage: 1,
      discountRates: [],
      itemsList:[],
      showSpinner :true,
      setsIsEmpty :false,
      sets:[]
      
    };
  },
  mounted() {
    this.getSets()
  },
  methods: {
    // valuechange(value) {
    //   this.clothsData = clothsData.filter(function (product) {
    //     return product.newprice <= value.currentValue;
    //   });
    // },

    // searchFilter(e) {
    //   const searchStr = e.target.value;
    //   this.clothsData = clothsData.filter((product) => {
    //     return (
    //       product.name.toLowerCase().search(searchStr.toLowerCase()) !== -1
    //     );
    //   });
    // },

    // discountLessFilter(e, percentage) {
    //   if (e === "accepted" && this.discountRates.length === 0) {
    //     this.clothsData = clothsData.filter((product) => {
    //       return product.discount < percentage;
    //     });
    //   } else {
    //     this.clothsData = clothsData.filter((product) => {
    //       return product.discount >= Math.max.apply(null, this);
    //     }, this.discountRates);
    //   }
    // },

    // discountMoreFilter(e, percentage) {
    //   if (e === "accepted") {
    //     this.discountRates.push(percentage);
    //   } else {
    //     this.discountRates.splice(this.discountRates.indexOf(percentage), 1);
    //   }
    //   this.clothsData = clothsData.filter((product) => {
    //     return product.discount >= Math.max.apply(null, this);
    //   }, this.discountRates);
    // },
    GoToItem(set){
      this.$emit('SetDetails',set)
    },
    async getSets(){
        this.sets  = await NFTsServices.getSetsByCreator(this.$store.state.currentAccount.name)
        if(this.sets.message != false){   
            console.log('sets',this.sets)
            this.showSpinner = false;
            this.setsIsEmpty = false;
        }
        else{
            this.showSpinner = false;
            this.setsIsEmpty = true;
        }
    }
  },
};
</script>

<template>
    <div class="row" >
      <!-- <div class="col-lg-3">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
          <div class="card-body">
            <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Filter</h4>

            <div>
              <h5 class="font-size-14 mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Clothes</h5>
              <ul class="list-unstyled product-list">
                <li>
                  <a href="javascript: void(0);">
                    <i class="mdi mdi-chevron-right me-1"></i> 
                    <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">
                       T-shirts
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript: void(0);">
                    <i class="mdi mdi-chevron-right me-1"></i> 
                    <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">
                       Shirts
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript: void(0);">
                    <i class="mdi mdi-chevron-right me-1"></i> 
                    <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">
                       Jeans
                    </span>
                  </a>
                </li>
                <li>
                  <a href="javascript: void(0);">
                    <i class="mdi mdi-chevron-right me-1"></i> 
                    <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">
                       Jackets
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-4 pt-3">
              <h5 class="font-size-14 mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Price</h5>
              <vue-slide-bar
                v-model="sliderPrice"
                :min="0"
                :max="1000"
                @dragEnd="valuechange"
              />
            </div>

            <div class="mt-4 pt-3">
              <h5 class="font-size-14 mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Discount</h5>

              <b-form-checkbox
                id="productdiscountCheck1"
                class="mt-2 form-check"
                value="accepted"
                unchecked-value="not_accepted"
                @change="discountLessFilter($event, 10)"
                >Less than 10%</b-form-checkbox
              >

              <b-form-checkbox
                id="productdiscountCheck2"
                class="mt-2 form-check"
                value="accepted"
                unchecked-value="not_accepted"
                @change="discountMoreFilter($event, 10)"
                >10% or more</b-form-checkbox
              >

              <b-form-checkbox
                id="productdiscountCheck3"
                class="mt-2 form-check"
                value="accepted"
                unchecked-value="not_accepted"
                @change="discountMoreFilter($event, 20)"
                >20% or more</b-form-checkbox
              >

              <b-form-checkbox
                id="productdiscountCheck4"
                class="mt-2 form-check"
                value="accepted"
                unchecked-value="not_accepted"
                @change="discountMoreFilter($event, 30)"
                >30% or more</b-form-checkbox
              >

              <b-form-checkbox
                id="productdiscountCheck5"
                class="mt-2 form-check"
                value="accepted"
                unchecked-value="not_accepted"
                @change="discountMoreFilter($event, 40)"
                >40% or more</b-form-checkbox
              >

              <b-form-checkbox
                id="productdiscountCheck6"
                class="mt-2 form-check"
                value="accepted"
                unchecked-value="not_accepted"
                @change="discountMoreFilter($event, 50)"
                >50% or more</b-form-checkbox
              >
            </div>

            <div class="mt-4 pt-3">
              <h5 class="font-size-14 mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Customer Rating</h5>
              <div>
                <b-form-checkbox
                  class="form-check"
                  id="checkbox-1"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  4
                  <i class="bx bx-star text-warning"></i> & Above
                </b-form-checkbox>

                <b-form-checkbox
                  id="checkbox-2"
                  class="mt-2 form-check"
                  name="checkbox-2"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  3
                  <i class="bx bx-star text-warning"></i> & Above
                </b-form-checkbox>

                <b-form-checkbox
                  id="checkbox-3"
                  class="mt-2 form-check"
                  name="checkbox-3"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  2
                  <i class="bx bx-star text-warning"></i> & Above
                </b-form-checkbox>
                <b-form-checkbox
                  id="checkbox-4"
                  class="mt-2 form-check"
                  name="checkbox-4"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  1
                  <i class="bx bx-star text-warning"></i>
                </b-form-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div> -->

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
              <!-- <ul class="nav nav-pills product-view-nav">
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
              </ul> -->
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
                  <!-- <div v-if="data" class="avatar-sm product-ribbon">
                    <span class="avatar-title rounded-circle bg-primary"
                      >{{ data.like }} <i class="bx bx-like"></i> </span>
                  </div> -->
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
                      :src="JSON.parse(data.item.data).dt"
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
        
        <!-- end row -->

        <div class="row">
          <div class="col-lg-12">
            <b-pagination
              variant="dark"
              v-if="clothsData.length > 0"
              class="justify-content-center"
              pills
              v-model="currentPage"
              :total-rows="clothsData.length"
              :per-page="6"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
</template>
