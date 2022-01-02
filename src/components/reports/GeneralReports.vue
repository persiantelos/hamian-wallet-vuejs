<template>
<div>
    <div class="row d-flex">
        <div v-if="BuyChartLoader" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
            <div style="width:100%;height:300px;padding:5px"  >
                <Spinner v-model="BuyChartLoader" />
            </div>
        </div>
        <div v-if="!BuyChartLoader" align="center" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
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
            <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                <div class="card-body">
                    <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Best Buy Chart</h4>
                    <v-chart class="w-100" :options="mixedBarChart" autoresize />
                </div>
            </div>
        </div>

        <div v-if="bestBuyerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
            <div style="width:100%;height:300px;padding:5px"  >
                <Spinner v-model="bestBuyerLoader" />
            </div>
        </div>
        <div v-if="!bestBuyerLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
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
        <div  v-if="bestBuyerBaseOnTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
            <div style="width:100%;height:300px;padding:5px" >
                <Spinner v-model="bestBuyerBaseOnTokenLoader" />
            </div>
        </div>
        <div v-if="!bestBuyerBaseOnTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
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
            <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
          <div class="card-body">
            
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Seller</h4>
            <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
              Top {{ bestSeller.value.length}} Best Seller NFTs Base on Item
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
                  v-for="(seller , index) in bestSeller.value" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{seller.owner}}</td>
                    <td>{{seller.total}}</td>
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
            <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
          <div class="card-body">
              
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Seller Base on Token</h4>
            <div class="d-flex col-12">
            <div class="col" style="position:relative">
                <p class="card-title-desc" style="margin-top: 9px;position: absolute;" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                Top {{ bestSellerBaseOnToken.value.length}} Best Seller NFTs Base on Token
                </p>
            </div>
            <b-dropdown class="col" variant="#2a3042"   style="min-width:120px;border:1px solid #eff2f7;border-radius:2px">
                    <template v-slot:button-content >
                        <span :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                            {{sectoken}}
                        </span>
                        <i class="mdi mdi-chevron-down" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''"></i>
                    </template>
                    <div align="left"  v-for="(token , i) in tokenList" :key="i">
                        <b-dropdown-item :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" 
                        align="left" @click="onItemClickSec(token)" href="javascript: void(0);">
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
                  v-for="(seller , index) in bestSellerBaseOnToken.value" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{seller.owner}}</td>
                    <td>{{seller.total}} {{sectoken}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/candlestick";
import "echarts/lib/chart/gauge";

import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/grid";
import "echarts/lib/component/axis";


@Component({components:{Spinner 
, "v-chart": ECharts
}})
export default class ParticularReports extends Vue{
    mixedBarChart:any= {
    // Setup grid
    grid: {
        zlevel: 0,
        x: 80,
        x2: 50,
        y: 30,
        y2: 30,
        borderWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        orient: 'center',
        left: 0,
        top: 20,
        feature: {
            dataView: { readOnly: false, title: "Data View" },
            magicType: { type: ['line', 'bar'], title: { line: "For line chart", bar: "For bar chart" } },
            restore: { title: "restore" },
            saveAsImage: { title: "Download Image" }
        }
    },
    color: ['#34c38f', '#556ee6', '#f46a6a'],
    legend: {
        data: ['Evaporation', 'Precipitation', 'Average temperature'],
        textStyle: { color: '#8791af' }
    },
    xAxis: [
        {
            type: 'category',
            // data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [],
            axisPointer: {
                type: 'shadow'
            },
            axisLine: {
                lineStyle: {
                    color: '#8791af'
                },
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Item',
            min: 0,
            max: 250,
            interval: 50,
            axisLine: {
                lineStyle: {
                    color: '#8791af'
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(166, 176, 207, 0.1)"
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: 'Price',
            min: 0,
            max: 100,
            interval: 1100,
            axisLine: {
                lineStyle: {
                    color: '#8791af'
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(166, 176, 207, 0.1)"
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        
    ]
};;
    bestSellerBaseOnTokenLoader:boolean=true
    bestSellerBaseOnToken:any=[]

    bestBuyer:any=[]
    bestSeller:any=[]
    itemOffer:any=[]
    bestBuyerBaseOnToken:any=[]
    tokenList:any=[]
    bestBuyerLoader:boolean=true;
    bestBuyerBaseOnTokenLoader:boolean=true;
    bestSellerLoader:boolean=true;
    itemOfferLoader:boolean=true;
    BuyChart:any=[]
    BuyChartLoader:boolean=true;
    price:boolean=true;
    token:string='TLOS';
    sectoken:string='TLOS';
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
        this.getBestSellerBaseOnToken();
        // this.getActiveaccountsday();
    }    
    async getTokenList(){
        this.bestBuyerBaseOnTokenLoader = true
        this.tokenList = await AccountService.getTokensList();
        this.tokenList = this.tokenList.value
        this.filterByCurrentNetName();
    }
    async getBestSellerBaseOnToken(){
        this.bestSellerBaseOnTokenLoader = true
        this.bestSellerBaseOnToken = await ReportServices.bestSellerBaseOnToken(this.sectoken,'true')
        if(this.bestSellerBaseOnToken){
        this.bestSellerBaseOnTokenLoader = false
        }
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
    onItemClickSec(token:any){
        this.sectoken =token['currency']
        this.getBestSellerBaseOnToken()
    }
    async getBuyChart(){
        this.BuyChart = await ReportServices.buyChart()
        if(this.BuyChart){
           
            for(let objct of Object.entries(this.BuyChart)){
                let item={
                    name: 'Item',
                    type: 'bar',
                    data: []
                }
                let price={
                    name: 'Amount',
                    type: 'line',
                    yAxisIndex: 1,
                    data: []
                }
                price.name=objct[0]
                for(let dt of Object.entries(objct[1])){
                    if(dt[1].count > this.mixedBarChart.yAxis[0].max){
                        this.mixedBarChart.yAxis[0].max = dt[1].count+100
                    }
                    if(dt[1].price > this.mixedBarChart.yAxis[1].max){
                        this.mixedBarChart.yAxis[1].max = (dt[1].price).toFixed(2)
                    }
                    this.mixedBarChart.xAxis[0].data.push(dt[0])
                    item.data.push(dt[1]['count'])
                    price.data.push(dt[1]['price'].toFixed(4))
                }
                    this.mixedBarChart.series.push(item)
                    this.mixedBarChart.series.push(price)
                this.BuyChartLoader = false
            }
        }
    }

    // async getActiveaccountsday(){
    //     this.activeaccountsday = await ReportServices.activeaccountsday()
    // }
}
</script>