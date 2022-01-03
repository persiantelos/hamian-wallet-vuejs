<template>
    <div >
        <div class="col-12  account-list-body" :style="value == '' ? 'min-height:75vh' : 'min-height:75vh'" >
            <div></div>
            <p style="display:none">{{counter}}</p>
            <div class="col-12">
                <div v-if="value == 'general'" >
                    <GeneralReports /> 
                </div>
                <div v-if="value == 'particular'">
                    <ParticularReports /> 
                </div>
                <div v-if="value == 'Purchased_items'">
                    <PurchasedItems /> 
                </div>
                <div v-if="value == 'Item_sold'">
                    <ItemSold /> 
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component ,Prop,Watch} from 'vue-property-decorator';
import GeneralReports from "@/components/reports/GeneralReports.vue"
import ParticularReports from "@/components/reports/ParticularReports.vue"
import PurchasedItems from "@/components/reports/PurchasedItems.vue"
import ItemSold from "@/components/reports/ItemSold.vue"




@Component({
    components:{
        GeneralReports,
        ParticularReports,
        PurchasedItems,
        ItemSold,
    }
})
export default class ReportsContent extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    counter:number=0;
   
    mounted(){
    }
    @Watch('value')
    async valueChanged(newValue:any){
        console.log('newValue',newValue)
        if(newValue == 'general'){
            this.$store.state.currentPageTitle = 'General Report'
            this.$store.state.currentPageItems[0].text = 'Reports';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'particular'){
            this.$store.state.currentPageTitle = 'Particular Report'
            this.$store.state.currentPageItems[0].text = 'Reports';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'Purchased_items'){
            this.$store.state.currentPageTitle = 'Purchased items'
            this.$store.state.currentPageItems[0].text = 'Reports';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'sold_item'){
            this.$store.state.currentPageTitle = 'sold items'
            this.$store.state.currentPageItems[0].text = 'Reports';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        
    }
    
 
}
</script>
<style lang="scss" scoped>
.account-list-body{
    // background: #ffffff;
    // box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    // min-height: 75vh;
    min-height:100%;

    .account-list-boxs-parent{
    // min-height: 85vh;
    .account-list-internal-box{
        border-radius: 10px;
        .internal-titles{
        font-size: 22px;
        }
        .user-icon{
        width: 30px;
        }
    }
    }

}
.resource-box{
  width:150px;
  height:200px;
  border-radius:20px
}
</style>