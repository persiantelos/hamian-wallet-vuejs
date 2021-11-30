<template>
    <div>
            <b-tabs
            class="box"
                active-nav-item-class="font-weight-bold text-uppercase text-primary"
                active-tab-class="font-weight-bold text-secondary"
                content-class="mt-3"
            >
                <b-tab title="NFTs" align="left">
                <div class="col-12 px-1 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Send To : <i class="mdi mdi-information text-primary"></i></h5>
                    <b-form-input
                        id="input-2"
                        v-model="transferNFTs.sendTo"
                        type="text"
                    ></b-form-input>
                </div> 
                <div class="col-12 px-1 mt-3" dir="ltr">
                    <b-dropdown variant="primary" class="col-12">
                        <template v-slot:button-content>
                            Select NFT
                            <i class="mdi mdi-chevron-down"></i>
                        </template>
                        <div  v-for="(nft,index) in nftList" :key="index">
                            <b-dropdown-item @click="selectNft(nft)" href="javascript: void(0);">{{nft.title}}</b-dropdown-item>
                        </div>
                    </b-dropdown>
                </div>  
                </b-tab>
            </b-tabs>
        </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
@Component({
    components:{}
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    showCustomToken:boolean=false;
    transferNFTs:any={
        sendTo:'',
        memo:'',
        symbol:'',
        contract:'',
    }
    option:any=[    
        
    ]
    nftList:any=[
        {title:'test1'},
        {title:'test2'},
    ]
    selectNft(data:any){

    }


}
</script>
<style lang="scss">
.pointer{
    cursor: pointer;
}
.dropdown-menu {
    text-align: center;
    width: 100% !important;
}
</style>