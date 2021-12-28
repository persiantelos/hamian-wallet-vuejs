<template>
    <div>
        <div class="row d-flex">
            <div v-if="buyChartBaseOnAccountNameLoader" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                <div style="width:100%;height:300px;padding:5px"  >
                    <Spinner v-model="buyChartBaseOnAccountNameLoader" />
                </div>
            </div>
            <div v-if="!buyChartBaseOnAccountNameLoader" align="center" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                    <div class="card-body">
                        <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Mix Line-Bar</h4>
                        <v-chart class="w-100" :options="mixedBarChart" autoresize />
                    </div>
                </div>
            </div>

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
                            Top {{ bestBuyerBaseOnAccountName.value.length}} Best Buyer NFTs Base on Account name
                            </p>
                        </div>
                        <div class="col-4" style="border:1px solid #eff2f7;border-radius:3px">
                            <b-form-input 
                            id="input-2"
                            v-model="accountName"
                            type="text"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                            ></b-form-input>
                        </div>
                        <div class="col-2 text-center" >
                            <b-button  @click="BestBuyerAccountNameSearch()"  variant="outline-light" style="border:0px solid #eff2f7;border-radius:3px"><i :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="bx bx-search-alt font-size-15"></i></b-button>
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

            <div v-if="bestBuyerBaseOnAccountNameAndTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
                <div style="width:100%;height:300px;padding:5px">
                        <Spinner v-model="bestBuyerBaseOnAccountNameAndTokenLoader" />
                </div>
            </div>
            <div v-if="!bestBuyerBaseOnAccountNameAndTokenLoader" class="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-1">
            <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
                <div class="card-body">
                    <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Buyer</h4>
                    <div class="col-12 d-flex">
                        <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                        Top {{ bestBuyerBaseOnAccountNameAndToken.value.length}} Best Buyer NFTs Base on Account name and Token
                        </p>
                    </div>
                    <div class="col-12 d-flex">
                        <div class="col-5" style="border:1px solid #eff2f7;border-radius:3px">
                            <b-form-input 
                            id="input-2"
                            v-model="accountName"
                            type="text"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                            ></b-form-input>
                        </div>
                        <div class="col-5 text-center" >
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
                        <div class="col-2 text-center" >
                            <b-button  @click="getBestBuyerBaseOnAccountNameAndToken()"  variant="outline-light" style="border:0px solid #eff2f7;border-radius:3px"><i :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="bx bx-search-alt font-size-15"></i></b-button>
                        </div>
                    </div>
                    
                    <div  class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                        <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                            <th>#</th>
                            <th>Account Name</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" 
                        v-for="(buyer , index) in bestBuyerBaseOnAccountNameAndToken.value" :key="index">
                            <th scope="row">{{index+1}}</th>
                            <td>{{buyer.buyer}}</td>
                            <td>{{(buyer.total).toFixed(4)}} {{token}} </td>
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
                        <div class="col-4" style="min-width:120px;border:1px solid #eff2f7;border-radius:3px">
                            <b-form-input 
                            id="input-2"
                            v-model="buySellAccountName"
                            type="text"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                            ></b-form-input>
                        </div>
                        <div class="col-2 text-center">
                            <b-button @click="BuySellAccountNameSearch()"  variant="outline-light" style="border:0px solid #eff2f7;border-radius:3px"><i :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" class="bx bx-search-alt font-size-15"></i></b-button>
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

@Component({components:{Spinner,"v-chart": ECharts}})
export default class ParticularReports extends Vue{
     mixedBarChart:any= {
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
    tokenList:any=[]

    bestSellerBaseOnToken:any=[]
    bestSellerBaseOnTokenLoader:boolean=true
    bestBuyerBaseOnAccountName:any=[]
    bestBuyerLoader:boolean=true
    buySellInfoLoader:boolean=true
    buySellInfo:any=[]
    itemOfferBaseOnAccountName:any=[]
    itemOfferBaseOnAccountNameLoader:boolean=true
    bestBuyerBaseOnAccountNameAndToken:any=[]
    bestBuyerBaseOnAccountNameAndTokenLoader:boolean=true
    buyChartBaseOnAccountName:any=[]
    buyChartBaseOnAccountNameLoader:boolean=true
    token:string='TLOS'
    tokens:any=['TLOS','DRIC']
    price:boolean=true
    accountName:string='babyevils.gm'
    buySellAccountName:string='babyevils.gm'
    itemOfferAccountNameLoader:string='babyevils.gm'
    bestBuyerBaseOnAccountNameAndTokenAccountName:string='babyevils.gm'
    buyChartBaseOnAccountNameAccountName:string=''
    
    mounted(){
        this.getTokenList()
        this.getBestSellerBaseOnToken();
        this.getBuySellInfo();
        this.getBestBuyerBaseOnAccountName();
        this.getItemOfferBaseOnAccountName();
        this.getBuyChart();
        
    } 
    async getBuyChart(){
        let data={token:[]}
        data.token = this.tokens
        this.buyChartBaseOnAccountNameLoader = false
        // this.buyChartBaseOnAccountName = await ReportServices.buyChartBaseOnAccountName(this.buyChartBaseOnAccountNameAccountName,data)
        this.buyChartBaseOnAccountName = {
            "data": {
            "TLOS": {
                "2021-10": {
                    "count": 165,
                    "price": 11716.654399999996
                },
                "2021-11": {
                    "count": 384,
                    "price": 8646.6566
                },
                "2021-12": {
                    "count": 119,
                    "price": 3902.9
                }
            },
            "DRIC": {
                "2021-11": {
                    "count": 4,
                    "price": 900
                },
                 "2021-12": {
                    "count": 119,
                    "price": 3902.9
                }
                }
            }
        }

        if(this.buyChartBaseOnAccountName){
            console.log(this.buyChartBaseOnAccountName.data)
            
            for(let objct of Object.entries(this.buyChartBaseOnAccountName.data)){
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
                item.name=objct[0]
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
                this.buyChartBaseOnAccountNameLoader = false
            }
        }
    }
 
    onItemClick(token:any){
        this.token =token['currency']
        // this.getBestBuyerBaseOnToken()
    }  
    async getTokenList(){
        this.bestBuyerBaseOnAccountNameAndTokenLoader = true
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
        this.getBestBuyerBaseOnAccountNameAndToken();
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
    async getBestBuyerBaseOnAccountNameAndToken(){
        this.bestBuyerBaseOnAccountNameAndToken = await ReportServices.bestBuyerBaseOnAccountNameAndToken(this.bestBuyerBaseOnAccountNameAndTokenAccountName,this.token,this.price)
        if(this.bestBuyerBaseOnAccountNameAndToken){
            this.bestBuyerBaseOnAccountNameAndTokenLoader=false
        }
    }
    async getItemOfferBaseOnAccountName(){
        this.itemOfferBaseOnAccountName = await ReportServices.itemOfferBaseOnAccountName(this.itemOfferAccountNameLoader)
    }
    BestBuyerAccountNameSearch(){
        if(this.accountName.length == 12){
            this.getBestBuyerBaseOnAccountName()
        }else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                text: 'Account name must be 12 characters long'
            });
        }
    }
    BuySellAccountNameSearch(){
        if(this.buySellAccountName.length == 12){
            this.getBuySellInfo()
        }
        else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                text: 'Account name must be 12 characters long'
            });
        }
    }
}
</script>