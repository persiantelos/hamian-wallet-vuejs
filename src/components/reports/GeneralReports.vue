<template>
<div>
    <div class="row d-flex">
        <div v-if="BuyChartLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            <div style="width:100%;height:300px;padding:5px"  >
                <Spinner v-model="BuyChartLoader" />
            </div>
        </div>
        <div v-if="!bestBuyerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            BuyChart {{BuyChart}}
            <!-- <div class="col-lg-6">
                <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                    <div class="card-body">
                        <h4 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="card-title mb-4">Best buy with TLOS</h4>
                        <apexchart
                        type="line"
                        class="apex-charts"
                        height="380"
                        dir="ltr"
                        :series="linewithDataChart.series"
                        :options="linewithDataChart.chartOptions"
                        ></apexchart>
                    </div>
                </div>
            </div> -->
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Mix Line-Bar</h4>
                        <!-- <ECharts /> -->
                        <!-- <v-chart :options="mixedBarChart" autoresize /> -->
                    </div>
                </div>
            </div>
        </div>

        <div v-if="bestBuyerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            <div style="width:100%;height:300px;padding:5px"  >
                <Spinner v-model="bestBuyerLoader" />
            </div>
        </div>
        <div v-if="!bestBuyerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
          <div class="card-body">
            
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Buyer</h4>
            <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
              Top {{ bestBuyer.value.length}} Best Buyer NFTs Base on Item
            </p>
            
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
        <div  v-if="bestBuyerBaseOnTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            <div style="width:100%;height:300px;padding:5px" >
                <Spinner v-model="bestBuyerBaseOnTokenLoader" />
            </div>
        </div>
        <div v-if="!bestBuyerBaseOnTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
          <div class="card-body">
              
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Buyer Base on Token</h4>
            <div class="d-flex col-12">
            <div class="col" style="position:relative">
                <p class="card-title-desc" style="margin-top: 9px;position: absolute;" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                Top {{ bestBuyerBaseOnToken.value.length}} Best Buyer NFTs Base on Token
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

            
            <div  class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                    <th>#</th>
                    <th>Account Name</th>
                    <th>{{token}}</th>
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
    </div>
    <div class="row d-flex">
        <div v-if="bestSellerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            <div style="width:100%;height:300px;padding:5px"  >
                <Spinner v-model="bestSellerLoader" />
            </div>
        </div>
        <div v-if="!bestSellerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            bestSeller {{bestSeller}}
        </div>
        <div v-if="itemOfferLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            <div style="width:100%;height:300px;padding:5px"  >
                <Spinner v-model="itemOfferLoader" />
            </div>
        </div>
        <div v-if="!itemOfferLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            itemOffer {{itemOffer}}
        </div>
    </div>
</div>

</template>
<script lang="ts">
import {Vue , Component} from 'vue-property-decorator'
import ReportServices from "@/services/reportServices"
import Spinner from "@/components/spinner/Spinner.vue"
import AccountService from '@/services/accountService'
// import ECharts from '@/components/reports/echart/index.vue'

@Component({components:{Spinner 
// ,ECharts
}})
export default class ParticularReports extends Vue{
    bestBuyer:any=[]
    bestSeller:any=[]
    itemOffer:any=[]
    bestBuyerBaseOnToken:any=[]
    tokenList:any=[]
    BuyChart:any=[]
    bestBuyerLoader:boolean=true;
    bestBuyerBaseOnTokenLoader:boolean=true;
    bestSellerLoader:boolean=true;
    itemOfferLoader:boolean=true;
    BuyChartLoader:boolean=true;
    price:boolean=true;
    token:string='TLOS';
    linewithDataChart:any = {
        chartOptions: {
            chart: {
                height: 380,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#556ee6', '#34c38f'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [3, 3],
                curve: 'straight'
            },
            title: {
                text: 'Item purchase charts by number ',
                align: 'left',
                style: {
                    fontWeight: '500',
                },
            },
            grid: {
                row: {
                    colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.2
                },
                borderColor: '#f1f1f1'
            },
            markers: {
                style: 'inverted',
                size: 6
            },
            xaxis: {
                // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                categories: [],
                title: {
                    text: 'Month'
                }
            },
            yaxis: {
                title: {
                    text: 'Item'
                },
                min: 1,
                max: 40
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false
                        }
                    },
                    legend: {
                        show: false
                    },
                }
            }],
        },
        series: [
            {
                name: "Number of items",
                // data: [26, 24, 32, 36, 33, 31, 33]
                data: []
            },
            // {
            //     name: "Low - 2018",
            //     data: [194, 151, 106, ]
            // }
        ],
    };
    // activeaccountsday:any=[]
    mounted(){
        this.getTokenList()
        this.getBestBuyer();
        this.getBestSeller();
        this.getItemOffer();
        this.getBuyChart();
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
            setTimeout(() => {
                this.bestBuyerLoader=false
            }, 100);
        }
    }
    async getBestSeller(){
        this.bestSellerLoader=false
        this.bestSeller = await ReportServices.bestSeller()
        // if(this.bestSeller){   
            // this.bestSellerLoader=false
        // }

    }
    async getItemOffer(){
        this.itemOfferLoader = false
        this.itemOffer = await ReportServices.itemOffer()
        // if(this.itemOffer){
            // this.itemOfferLoader = false
        // }
    }
    async getBestBuyerBaseOnToken(){
        this.bestBuyerBaseOnTokenLoader = true
        this.bestBuyerBaseOnToken = await ReportServices.bestBuyerBaseOnToken(this.token,this.price)
        if(this.bestBuyerBaseOnToken){
            setTimeout(() => {
                this.bestBuyerBaseOnTokenLoader = false;
            }, 100);
        }
    }
    onItemClick(token:any){
        this.token =token['currency']
        this.getBestBuyerBaseOnToken()
    }
    async getBuyChart(){
        this.BuyChart = await ReportServices.buyChart()
        if(this.BuyChart){
            // Base on item

            for(let objct of Object.entries(this.BuyChart)){
                for(let dt of Object.entries(objct[1])){
                    if(dt[1].count > this.linewithDataChart.chartOptions.yaxis.max){
                        this.linewithDataChart.chartOptions.yaxis.max = dt[1].count
                    }
                    this.linewithDataChart.chartOptions.xaxis.categories.push(dt[0])
                    this.linewithDataChart.series[0].data.push(dt[1]['count'])
                }
                // this.linewithDataChart.series[0].name = objct[0] 
                this.BuyChartLoader = false
            }
            // Base on price
            // for(let objct of Object.entries(this.BuyChart)){
            //     for(let dt of Object.entries(objct[1])){
            //         if(dt[1].price > this.linewithDataChart.chartOptions.yaxis.max){
            //             this.linewithDataChart.chartOptions.yaxis.max = dt[1].price
            //         }
            //         this.linewithDataChart.chartOptions.xaxis.categories.push(dt[0])
            //         this.linewithDataChart.series[0].data.push(dt[1]['price'].toFixed(4))
            //     }
            //     // this.linewithDataChart.series[0].name = objct[0] 
            //     this.BuyChartLoader = false
            // }
        }
    }

    // async getActiveaccountsday(){
    //     this.activeaccountsday = await ReportServices.activeaccountsday()
    // }
}
</script>