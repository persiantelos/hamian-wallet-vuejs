<template>
    <div >
        <div class="col-12  account-list-body" :style="value == '' ? 'min-height:75vh' : 'min-height:75vh'" >
            <div></div>
            <p style="display:none">{{counter}}</p>
            <div class="col-12">
                <div v-if="value == 'NFTs' && !displayItemDetail" >
                    <NFTs v-model="itemsList" @itemDetails="itemDetails" /> 
                </div>
                <div v-if="displayItemDetail">
                    <ItemDetail v-model="itemDetailsId" />
                </div>
                <div v-if="value == 'Sets' && !displaySetDetail" >
                    <Sets  @SetDetails="setDetails"/> 
                </div>
                <div v-if="displaySetDetail">
                    <SetDetail v-model="setDetailsItem" />
                </div>
                <div v-if="value == 'Collections'">
                    <Collections />
                </div>
                <div v-if="value == 'Following'">
                    <Following />
                </div>
                <div v-if="value == 'Followers'">
                    <Followers />
                </div>
                <div v-if="value == 'Submitted_Offers' && !displaySubmitedOfferItemDetails">
                    <SubmitedOffers @submitedOfferItemDetails="submitedOfferItemDetails" />
                </div>
                <div v-if="displaySubmitedOfferItemDetails">
                    <IncommingOfferDetail v-model="submitedOfferItemDetail"  />
                </div>
                <div v-if="value == 'Incoming_Offers' && !displayIncommingOfferItemDetails">
                    <IncommingOffers @IncommingOfferItemDetails="IncommingOfferItemDetails" />
                </div>
                <div v-if="displayIncommingOfferItemDetails">
                    <IncommingOfferDetail v-model="incommingOfferItemDetail"  />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component ,Prop,Watch} from 'vue-property-decorator';
import AccountService from '@/services/accountService';
import NFTs from '@/components/NFT/products.vue'
import ItemDetail from '@/components/NFT/product-detail.vue'
import SetDetail from '@/components/NFT/SetDetail.vue'
import Sets from '@/components/NFT/Sets.vue'
import NFTsServices from '@/services/NFTsServices'
import Collections from '@/components/NFT/Collections.vue'
import Following from "@/components/NFT/Following.vue"
import Followers from "@/components/NFT/Followers.vue"
import SubmitedOffers from "@/components/NFT/SubmitedOffers.vue"
import IncommingOffers from "@/components/NFT/IncomingOffers.vue"
import IncommingOfferDetail from "@/components/NFT/IncommingOfferDetail.vue"



@Component({
    components:{
        NFTs,
        ItemDetail,
        Sets,
        SetDetail,
        Collections,
        Following,
        Followers,
        SubmitedOffers,
        IncommingOffers,
        IncommingOfferDetail,
    }
})
export default class NetworksContent extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    counter:number=0;
    itemDetailsId:any=[];
    setDetailsItem:any=[];
    incommingOfferItemDetail:any=[];
    submitedOfferItemDetail:any=[];
    showSpinner:boolean=true;
    displayItemDetail:boolean=false;
    displaySetDetail:boolean=false;
    displayIncommingOfferItemDetails:boolean=false;
    displaySubmitedOfferItemDetails:boolean=false;
    itemsList:any=[];
    mounted(){
    }
    @Watch('value')
    async valueChanged(newValue:any){
        this.displayItemDetail=false;
        this.displaySetDetail=false;
        this.displayIncommingOfferItemDetails=false;
        this.displaySubmitedOfferItemDetails=false;
        console.log('newValue',newValue)
        if(newValue == 'NFTs'){
            this.itemsList = await NFTsServices.getItemByOwner(this.$store.state.currentAccount.name)
            this.$store.state.currentPageTitle = 'NFTs'
            this.$store.state.currentPageItems[0].text = 'Market';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'Sets'){
            this.$store.state.currentPageTitle = 'Sets'
            this.$store.state.currentPageItems[0].text = 'Market';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'Collections'){
            this.$store.state.currentPageTitle = 'Collections'
            this.$store.state.currentPageItems[0].text = 'Collections';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'Following'){
            this.$store.state.currentPageTitle = 'Following'
            this.$store.state.currentPageItems[0].text = 'Following';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'Followers'){
            this.$store.state.currentPageTitle = 'Followers'
            this.$store.state.currentPageItems[0].text = 'Followers';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'Submitted_Offers'){
            this.$store.state.currentPageTitle = 'Submitted Offers'
            this.$store.state.currentPageItems[0].text = 'Submitted Offers';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
        if(newValue == 'Incoming_Offers'){
            this.$store.state.currentPageTitle = 'Incoming Offers'
            this.$store.state.currentPageItems[0].text = 'Incoming Offers';
            this.$store.state.currentPageItems[1].text = 'NFTs';
            this.counter++
        }
    }
    itemDetails(item:any){
        this.displayItemDetail=true;
        this.itemDetailsId = item
    }
    setDetails(set:any){
        console.log('sesDetails',set)
        this.displaySetDetail=true;
        this.setDetailsItem = set
    }
    IncommingOfferItemDetails(item:any){
        this.displayIncommingOfferItemDetails= true;
        this.incommingOfferItemDetail = item
    }
    submitedOfferItemDetails(item:any){
        this.displaySubmitedOfferItemDetails= true;
        this.submitedOfferItemDetail = item
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