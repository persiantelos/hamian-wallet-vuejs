<template>
    <div>
        <div class="col-xl-6">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
          <div class="card-body">
            <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Best Buyer</h4>
            <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
              Top 5 Best Buyer NFTs Base on Number
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
                  <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" v-for="(buyer , index) in bestBuyer.value" :key="index">
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
        bestBuyer {{bestBuyer}}
        bestSeller {{bestSeller}}
        itemOffer {{itemOffer}}
    </div>
</template>
<script lang="ts">
import {Vue , Component} from 'vue-property-decorator'
import ReportServices from "@/services/reportServices"
import Spinner from "@/components/spinner/Spinner.vue"
@Component({components:{Spinner}})
export default class ParticularReports extends Vue{
    bestBuyer:any=[]
    bestBuyerLoader:boolean=true;
    bestSeller:any=[]
    itemOffer:any=[]
    mounted(){
        this.getBestBuyer();
        this.getBestSeller();
        this.getItemOffer();
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
}
</script>