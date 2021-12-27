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
    token:string='TELOS'
    accountName:string='babyevils.gm'
    mounted(){
        this.getBestSellerBaseOnToken();
        this.getBuySellInfo();
    }    
    async getBestSellerBaseOnToken(){
        this.bestSellerBaseOnToken = await ReportServices.bestSellerBaseOnToken(this.token,'true')
    }
    async getBuySellInfo(){
        this.buySellInfo = await ReportServices.buySellInfo(this.accountName)
    }
}
</script>