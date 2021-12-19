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




@Component({
    components:{
        NFTs,
        ItemDetail,
        Sets,
        SetDetail,
    }
})
export default class NetworksContent extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    counter:number=0;
    itemDetailsId:any=[];
    setDetailsItem:any=[];
    showSpinner:boolean=true;
    displayItemDetail:boolean=false;
    displaySetDetail:boolean=false;
    itemsList:any=[];
    mounted(){
    }
    @Watch('value')
    async valueChanged(newValue:any){
        this.displayItemDetail=false;
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
        else{
            this.$store.state.currentPageTitle = newValue
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