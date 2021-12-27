<template>
    <div>
        <div class="col-xl-6">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
          <div class="card-body">
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Buyer</h4>
            <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
              Top {{ bestBuyer.value.length}} Best Buyer NFTs Base on Number
            </p>
            <div v-if="bestBuyerLoader" class="">
                <Spinner v-model="bestBuyerLoader" />
            </div>
            <div v-if="!bestBuyerLoader" class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                    <th>#</th>
                    <th>Buyer</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" 
                  v-for="(buyer , index) in bestBuyer.value" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{buyer.buyer}}</td>
                    <td>{{buyer.total}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        <div class="col-xl-6">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
          <div class="card-body">
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Buyer Base on Token</h4>
            <div class="d-flex col-12">
            <div class="col">
                <p class="card-title-desc" style="margin-top: 9px;position: absolute;" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                Top {{ bestBuyerBaseOnToken.value.length}} Best Buyer NFTs Base on Number
                </p>
            </div>
            <b-dropdown class="col" variant="#2a3042"   style="min-width:120px;border:1px solid #eff2f7;border-radius:2px">
                    <template v-slot:button-content >
                        <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                            {{token}}
                        </span>
                        <i class="mdi mdi-chevron-down" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''"></i>
                    </template>
                    <div align="left"  v-for="(token , i) in tokenList" :key="i">
                        <b-dropdown-item :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" 
                        align="left" @click="onItemClick(token)" href="javascript: void(0);">
                            <span
                            :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                            {{token._id.toUpperCase()}}
                            <!-- {{token.currency}} ({{token._id.toUpperCase()}}) -->
                            </span>
                        </b-dropdown-item>
                    </div>
                </b-dropdown>
            </div>

            <div v-if="bestBuyerBaseOnTokenLoader" class="">
                <Spinner v-model="bestBuyerBaseOnTokenLoader" />
            </div>
            <div v-if="!bestBuyerBaseOnTokenLoader" class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                    <th>#</th>
                    <th>Buyer</th>
                    <th>Total({{token}})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" 
                  v-for="(buyer , index) in bestBuyerBaseOnToken.value" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{buyer.buyer}}</td>
                    <td>{{buyer.total}} {{token}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        bestSeller {{bestSeller}}
        itemOffer {{itemOffer}}
        <!-- activeaccountsday {{activeaccountsday}} -->
    </div>
</template>
<script lang="ts">
import {Vue , Component} from 'vue-property-decorator'
import ReportServices from "@/services/reportServices"
import Spinner from "@/components/spinner/Spinner.vue"
import AccountService from '@/services/accountService'

@Component({components:{Spinner}})
export default class ParticularReports extends Vue{
    bestBuyer:any=[]
    bestSeller:any=[]
    itemOffer:any=[]
    bestBuyerBaseOnToken:any=[]
    tokenList:any=[]
    bestBuyerLoader:boolean=true;
    bestBuyerBaseOnTokenLoader:boolean=true;
    price:boolean=true;
    token:string='TLOS';
    // activeaccountsday:any=[]
    mounted(){
        this.getTokenList()
        this.getBestBuyer();
        this.getBestSeller();
        this.getItemOffer();
        // this.getActiveaccountsday();
    }    
    async getTokenList(){
        this.bestBuyerBaseOnTokenLoader = true
        this.tokenList = await AccountService.getTokensList();
        this.tokenList = this.tokenList.value
        this.filterByCurrentNetName();
    }
    filterByCurrentNetName(){
        let temoTokenList = []
        for(let token of this.tokenList){
            if(token.chain == this.$store.state.currentNet._id){
                temoTokenList.push(token)
            }
        }
        this.tokenList = temoTokenList;
        this.getBestBuyerBaseOnToken();
    }
    async getBestBuyer(){
        this.bestBuyer = await ReportServices.bestBuyer();
        if(this.bestBuyer){
            this.bestBuyerLoader=false
        }
    }
    async getBestSeller(){
        this.bestSeller = await ReportServices.bestSeller()
    }
    async getItemOffer(){
        this.itemOffer = await ReportServices.itemOffer()
    }
    async getBestBuyerBaseOnToken(){
        this.bestBuyerBaseOnTokenLoader = true
        this.bestBuyerBaseOnToken = await ReportServices.bestBuyerBaseOnToken(this.token,this.price)
        if(this.bestBuyerBaseOnToken){
            this.bestBuyerBaseOnTokenLoader = false;
        }
    }
    onItemClick(token:any){
        this.token =token['currency']
        this.getBestBuyerBaseOnToken()
    }
    // async getActiveaccountsday(){
    //     this.activeaccountsday = await ReportServices.activeaccountsday()
    // }
}
</script>