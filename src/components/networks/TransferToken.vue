<template>
    <div class="col-12">
<div>
        <b-tabs
        class="box"
            active-nav-item-class="font-weight-bold text-uppercase text-primary"
            active-tab-class="font-weight-bold text-secondary"
            content-class="mt-3"
        >
            <b-tab title="TRANSFER TOKEN" align="left"  active>
                <div class="col-12 px-1 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Send To : <i class="mdi mdi-information text-primary"></i></h5>
                    <b-form-input
                        id="input-2"
                        v-model="transferToken.sendTo"
                        type="text"
                    ></b-form-input>

                </div>
                <div class="col-12 px-1 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Amount:</h5>
                    <div class="btn-group col-12 me-1 mt-2">
                        <b-form-input
                            id="input-2"
                            v-model="transferToken.amount"
                            type="text"
                        ></b-form-input>
                        <b-dropdown dropleft variant="primary" >
                            <template v-slot:button-content>
                                {{transferToken.customToken.title}}
                                <i class="mdi mdi-chevron-down"></i>
                            </template>
                            <div align="left" v-for="(token , index) in option" :key="index">
                                <b-dropdown-item @click="onItemClick(token)" href="javascript: void(0);">{{token.title}}</b-dropdown-item>
                            </div>
                        </b-dropdown>
                    </div>
                    <div class="col-12 px-1 d-flex mt-3" dir="ltr">
                        <div class="col-6">
                            <h5 @click="sendEntireBalance()" class="font-size-15 text-primary ponter mb-4">Send entire balance</h5>
                        </div>
                        <div align="right" class="col-6">
                            <h5 @click="showCustomToken = true" class="font-size-15 text-primary pointer mb-4">Use custom token</h5>
                        </div>
                    </div>
                    <div v-if="showCustomToken == true" class="col-12 d-flex mt-3" dir="ltr">
                        <div class="col-12 d-flex">
                            <div class="col-6 px-1">
                                <h5 class="font-size-15 mb-4">Symbol:</h5>
                                <b-form-input
                                    id="input-2"
                                    v-model="transferToken.symbol"
                                    type="text"
                                ></b-form-input>
                            </div>
                            <div class="col-6 px-1">
                                <h5 class="font-size-15 mb-4">Contract:</h5>
                                <b-form-input
                                    id="input-2"
                                    v-model="transferToken.contract"
                                    type="text"
                                ></b-form-input>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-12 px-1 my-1" v-if="showCustomToken == true">
                        <h5 @click="showCustomToken = false"  class="font-size-15 pointer text-primary mb-4">Don't use custom token / contract</h5>
                    </div>
                </div>
                <div class="col-12 px-2 mt-3" dir="ltr">
                    <h5 class="font-size-15  mb-4">Memo (optional) :</h5>
                    <b-form-input
                        id="input-2"
                        v-model="transferToken.memo"
                        type="text"
                    ></b-form-input>
                </div>
                <div class="col-12 mt-3" align="center">
                    <b-button class="m-1"  variant="primary">
                    Teransfer  {{transferToken.amount}}  Telos
                    </b-button>
                </div>
            </b-tab>
            <b-tab title="TERANSFER NFTs" align="left">
               <div class="col-12 px-1 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Send To : <i class="mdi mdi-information text-primary"></i></h5>
                    <b-form-input
                        id="input-2"
                        v-model="transferToken.sendTo"
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
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
@Component({
    components:{}
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    buySellRAM:any=[];
    showCustomToken:boolean=false;
 transferToken:any={
    customToken:{
        title:''
    },
    amount:0,
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
    sendEntireBalance(){}

    onItemClick(token:any){
        this.transferToken.customToken = token;
    }
  
//  transferToken:any=[];
    mounted(){
        this.buySellRAM = this.value;
        // this.transferToken = this.value;
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