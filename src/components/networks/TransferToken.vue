<template>
    <div class="col-12">
        <div v-if="showSpinner">
            <Spinner v-model="showSpinner" />
        </div>
        <div v-if="!showSpinner" class="p-3">
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
                                    <span v-show="transferToken.customToken">
                                    {{transferToken.customToken.val[transferToken.customToken._id]}} {{transferToken.customToken.currency}}
                                    </span>
                                    <i class="mdi mdi-chevron-down"></i>
                                </template>
                                <div align="left" v-for="(token , index) in tokens" :key="index">
                                    <b-dropdown-item @click="onItemClick(token)" href="javascript: void(0);">
                                        {{token.val[token._id]}} {{token.currency}}
                                    </b-dropdown-item>
                                </div>
                            </b-dropdown>
                        </div>
                        <div class="col-12 px-1 d-flex mt-3" dir="ltr">
                            <div class="col-6">
                                <h5 @click="sendEntireBalance()" class="font-size-15 text-primary ponter mb-4">Send entire balance</h5>
                            </div>
                            <!-- <div align="right" class="col-6">
                                <h5 @click="showCustomToken = true" class="font-size-15 text-primary pointer mb-4">Use custom token</h5>
                            </div> -->
                        </div>
                        <!-- <div v-if="showCustomToken == true" class="col-12 d-flex mt-3" dir="ltr">
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
                            
                        </div> -->
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
                        <b-button class="m-1" @click="transerClick"  variant="primary">
                        Teransfer  {{transferToken.amount}}  Telos
                        </b-button>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import Spinner from '@/components/spinner/Spinner.vue'
import WalletService from '../../localService/walletService';
import AccountService from '@/services/accountService'
import StorageService from '@/localService/storageService'



@Component({
    components:{
        Spinner
    }
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    @Prop({default:() =>{return []}}) currentNet:any;
    @Prop({default:() =>{return []}}) selectedAccount:any;

    showCustomToken:boolean=false;
    tokens:any=[];
    tokensList:any=[];
    accountName:any=[];
    accInfo:any=[];
    showSpinner:boolean=true;
    transferToken:any={
        customToken:{
            chain:'',
            _id:'',
            currency:'',
        },
        amount:0,
        sendTo:'',
        memo:'',
        symbol:'',
        contract:'',
    }
    
    sendEntireBalance(){}

    onItemClick(token:any){
        this.transferToken.customToken = token;
    }
    mounted(){
        this.init();
    }
    async init(){
        if(this.currentNet.chainId == this.selectedAccount.chainId){
            this.tokensList =  await AccountService.getTokensList();
            this.tokensList = this.tokensList.value
            this.accInfo =  await AccountService.getAccountInfo(this.$store.state.currentAccount);
            this.accInfo = this.accInfo.value
            this.setTokens()
        }
        else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                text: 'First Select your account!'
            });
            this.$emit('changeSelectedMenu','accountList')
        }
    }
    setTokens(){
        let newarr = []
        for(let token of this.tokensList){
            if(this.currentNet._id == token.chain)
            {
                for(let item of this.accInfo){
                    for(let i =0;i<Object.keys(item).length;i++){
                        if(Object.keys(item)[i] == token._id){
                            let objKey = Object.keys(item)[i]
                            let objValue = item[objKey]
                            item[objKey] = objValue.toFixed(parseInt(token.decimals))
                            token.val = item;
                            newarr.push(token)
                            
                            if(token._id == 'tlos' || token._id == "TLOS"){
                                
                                this.transferToken.customToken = token;
                            }
                            else{
                                this.transferToken.customToken = token;
                            }
                        }
                    }
                }
            }
            
        }
        this.tokens = newarr;
        console.log(this.transferToken)
        this.showSpinner = false;
    }

    transerClick()
    {
        console.log('-----------')
        WalletService.reunTransaction([
            {
                contarct:'persiandaric',
                name:'transfer',
                data:{
                    from:'vahidhosaini',
                    to:'asalbanoo123',
                    quantity:'1.0000 DRIC',
                    memo:'test'
                }
            }
        ])
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