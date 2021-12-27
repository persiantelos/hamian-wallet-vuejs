<template>
    <div>
        <div class="row d-flex">
            <div v-if="bestBuyerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
                <div style="width:100%;height:300px;padding:5px">
                    <Spinner v-model="bestBuyerLoader" />
                </div>
            </div>
            <div v-if="!bestBuyerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
                <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
                <div class="card-body">
                    <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Buyer</h4>
                    <div class="col-12 d-flex">
                        <div class="col-6" style="position:relative">
                            <p class="card-title-desc" style="margin-top: 9px;position: absolute;" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                            Top {{ bestBuyerBaseOnAccountName.value.length}} Best Buyer NFTs Base on AccountName
                            </p>
                        </div>
                        <div class="col-6" style="min-width:120px;border:1px solid #eff2f7;border-radius:3px">
                            <b-form-input 
                            id="input-2"
                            v-model="accountName"
                            type="text"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                            ></b-form-input>
                        </div>
                    </div>
                    
                    <div  class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                        <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                            <th>#</th>
                            <th>Account Name</th>
                            <th>Item</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" 
                        v-for="(buyer , index) in bestBuyerBaseOnAccountName.value" :key="index">
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
            <div v-if="buySellInfoLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
                <div  style="width:100%;height:300px;padding:5px">
                    <Spinner v-model="buySellInfoLoader" />
                </div>
            </div>
            <div v-if="!buySellInfoLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
                <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
                <div class="card-body">
                    <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >
                    Buy / Sell Information    
                    </h4>
                    <div class="col-12 d-flex">
                        <div class="col-6" style="position:relative">
                            <p class="card-title-desc" style="margin-top: 9px;position: absolute;" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                            Buy / Sell Base On Account Name
                            </p>
                        </div>
                        <div class="col-6" style="min-width:120px;border:1px solid #eff2f7;border-radius:3px">
                            <b-form-input 
                            id="input-2"
                            v-model="buySellAccountName"
                            type="text"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                            ></b-form-input>
                        </div>
                    </div>
                    
                    <div  class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                        <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                            <th>Account Name</th>
                            <th>Buy</th>
                            <th>Amount</th>
                            <th>Sell</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                            <td>{{accountName}}</td>
                            <td>
                                {{buySellInfo.buy.count}}
                            </td>
                            <td>
                                <span v-if="buySellInfo.buy['TLOS']">
                                    {{buySellInfo.buy['TLOS']}} TLOS
                                </span>
                                <span v-else>
                                    0
                                </span>
                            </td>
                            <td>
                                {{buySellInfo.sell.count}}
                            </td>
                            <td>
                                <span v-if="buySellInfo.sell['TLOS']">
                                    {{buySellInfo.sell['TLOS']}} TLOS
                                </span>
                                <span v-else>
                                    0
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
            <div v-if="bestSellerBaseOnTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
                <div style="width:100%;height:300px;padding:5px">
                        <Spinner v-model="bestSellerBaseOnTokenLoader" />
                </div>
            </div>
            <div v-if="!bestSellerBaseOnTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            bestSellerBaseOnToken {{bestSellerBaseOnToken}}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component} from 'vue-property-decorator'
import ReportServices from "@/services/reportServices"
import Spinner from "@/components/spinner/Spinner.vue"

@Component({components:{Spinner}})
export default class ParticularReports extends Vue{
    bestSellerBaseOnToken:any=[]
    bestSellerBaseOnTokenLoader:boolean=true
    bestBuyerBaseOnAccountName:any=[]
    bestBuyerLoader:boolean=true
    buySellInfoLoader:boolean=true
    buySellInfo:any=[]
    itemOfferBaseOnAccountName:any=[]
    itemOfferBaseOnAccountNameLoader:boolean=true
    token:string='TLOS'
    accountName:string='babyevils.gm'
    buySellAccountName:string='babyevils.gm'
    itemOfferAccountNameLoader:string='babyevils.gm'
    
    mounted(){
        this.getBestSellerBaseOnToken();
        this.getBuySellInfo();
        this.getBestBuyerBaseOnAccountName();
        this.getItemOfferBaseOnAccountName();
    }    
    async getBestSellerBaseOnToken(){
        this.bestSellerBaseOnTokenLoader = false
        this.bestSellerBaseOnToken = await ReportServices.bestSellerBaseOnToken(this.token,'true')
    }
    async getBuySellInfo(){
        this.buySellInfo = await ReportServices.buySellInfo(this.buySellAccountName)
        if(this.buySellInfo){
            this.buySellInfoLoader=false
        }
    }
    async getBestBuyerBaseOnAccountName(){
        this.bestBuyerBaseOnAccountName = await ReportServices.bestBuyerBaseOnAccountName(this.accountName)
        if(this.bestBuyerBaseOnAccountName){
            this.bestBuyerLoader=false
        }
    }
    async getItemOfferBaseOnAccountName(){
        this.itemOfferBaseOnAccountName = await ReportServices.itemOfferBaseOnAccountName(this.itemOfferAccountNameLoader)
    }
}
</script>