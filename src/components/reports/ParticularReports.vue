<template>
    <div>
       bestSellerBaseOnToken {{bestSellerBaseOnToken}}
       buySellInfo {{buySellInfo}}
    </div>
</template>
<script lang="ts">
import {Vue , Component} from 'vue-property-decorator'
import ReportServices from "@/services/reportServices"
@Component({components:{}})
export default class ParticularReports extends Vue{
    bestSellerBaseOnToken:any=[]
    buySellInfo:any=[]
    accountName:string=''
    mounted(){
        this.getBestSellerBaseOnToken();
        this.buySellInfo();
    }    
    async getBestSellerBaseOnToken(){
        this.bestSellerBaseOnToken = await ReportServices.bestSellerBaseOnToken(this.accountName)
    }
    async getBuySellInfo(){
        this.buySellInfo = await ReportServices.buySellInfo()
    }
}
</script>