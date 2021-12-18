<template>
    <div >
        <div class="col-12  account-list-body" :style="value == '' ? 'min-height:75vh' : 'min-height:75vh'" >
            <div></div>
            <p style="display:none">{{counter}}</p>
            <div class="col-12">
                <!-- <div v-if="value == 'NFTs' && itemDetailsId == 0" > -->
                    <!-- <NFTs @itemDetails="itemDetails" />  -->
                <!-- </div> -->
                <!-- <div v-if="itemDetailsId != 0"> -->
                    <ItemDetail v-model="itemDetailsId" />
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component ,Prop,Watch} from 'vue-property-decorator';
import AccountService from '@/services/accountService';
import NFTs from '@/components/NFT/products.vue'
import ItemDetail from '@/components/NFT/product-detail.vue'



@Component({
    components:{
        NFTs,
        ItemDetail
    }
})
export default class NetworksContent extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    counter:number=0;
    itemDetailsId:number=0;
    showSpinner:boolean=true;
    mounted(){
    }
    @Watch('value')
    valueChanged(newValue:any){
        if(newValue == 'NFTs'){
            this.$store.state.currentPageTitle = 'NFTs'
            this.counter++
        }
    }
    itemDetails(id:any){
        console.log('itemDetails',id)
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