<template>
    <div class="col-12 bg-white" style="min-height:75vh !important" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <div v-if="showSpinner">
            <Spinner v-model="showSpinner" />
        </div>
        <div v-if="!showSpinner" class="p-3">
            <div class="col-12">
                <h1 class="font-size-16 text-primary p-3 px-0">
                    TRANSFER TOKEN
                </h1>
            </div>
            <div class="col-12 px-1 mt-3" dir="ltr">
                <h5 class="font-size-15 mb-4"
                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Send To : <i class="mdi mdi-information text-primary"></i></h5>
                <b-form-input
                    id="input-2"
                    v-model="transferToken.to"
                    type="text"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                ></b-form-input>

            </div>
            <div class="col-12 px-1 mt-3" dir="ltr">
                <h5 class="font-size-15 mb-4"
                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount:</h5>
                <div class="btn-group col-12 me-1 mt-2">
                    <b-form-input
                        id="input-2"
                        v-model="transferToken.quantity"
                        type="text"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                    <b-dropdown dropleft variant="primary" >
                        <template v-slot:button-content>
                            <span v-show="transferToken.customToken">
                            {{transferToken.customToken.balance}}
                            </span>
                            <i class="mdi mdi-chevron-down"></i>
                        </template>
                        <div align="left" v-for="(token , index) in tokens" :key="index">
                            <b-dropdown-item @click="onItemClick(token)" href="javascript: void(0);">
                                <span
                                :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                                {{token.balance}}
                                </span>
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
                <h5 class="font-size-15  mb-4" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Memo (optional) :</h5>
                <b-form-input
                    id="input-2"
                    v-model="transferToken.memo"
                    type="text"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                ></b-form-input>
            </div>
            <div class="col-12 mt-3" align="center">
                <b-button class="m-1" @click="transferClick"  variant="primary">
                Teransfer  {{transferToken.quantity}}  {{transferToken.customToken._id}}
                </b-button>
            </div>
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

    showCustomToken:boolean=false;
    tokens:any=[];
    tokensList:any=[];
    accountName:any=[];
    accInfo:any=[];
    selectedAccount:any=[];
    showSpinner:boolean=true;
    quantity:any= []
    transferToken:any={
        customToken:{
            chain:'',
            _id:'',
            currency:'',
            contract:'',
        },
        from:'',
        to:'',
        quantity:0,
        memo:'',
        permission:'',
        // symbol:'',
        // contract:'',
    }
    
    sendEntireBalance(){
        let tempAmount = this.transferToken.customToken
        tempAmount = tempAmount.balance.split(' ')
        tempAmount = parseFloat(tempAmount[0])
        this.transferToken.quantity= tempAmount.toFixed(parseInt(this.transferToken.customToken.decimals))
    }

    onItemClick(token:any){
        this.transferToken.customToken = token;
    }
    mounted(){
        this.init();
    }
  
    async init(){
        if(this.$store.state.currentNet._id == this.$store.state.currentAccountChainName){

            this.tokensList =  await AccountService.getTokensList();
            this.tokensList = this.tokensList.value
            this.filterByCurrentNetName()
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
    filterByCurrentNetName(){
        let temoTokenList = []
        for(let token of this.tokensList){
            if(token.chain == this.$store.state.currentNet._id){
                temoTokenList.push(token)
            }
        }
        this.tokensList = temoTokenList;

        this.getTokenBalanceByContractName();
    }
    async getTokenBalanceByContractName(){
        let account = this.$store.state.currentAccount
        let currentNet = this.$store.state.currentNet
        for(let token of this.tokensList){
            let balance = await AccountService.getDynamicTokenBalance(token,account.name,currentNet)
            token.balance = balance
        }
        this.tokens = this.tokensList;
        this.setCustomToken()
    }
    setCustomToken(){
        for(let token of this.tokens){
            if(token._id == 'telos'){
                this.transferToken.customToken = token
            }
        }
        console.log(this.tokens)
        console.log(this.transferToken)

        this.showSpinner = false;
    }
    setTokens(){
        let newarr = []
        for(let token of this.tokensList){
            if(this.$store.state.currentNet._id == token.chain)
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

    async transferClick()
    { 
        if(this.transferToken.to){
            this.quantity = this.transferToken.quantity
            this.quantity = parseInt(this.quantity)
            this.quantity = this.quantity.toFixed(parseInt(this.transferToken.customToken.decimals)) 
            this.quantity +=  ' ' + this.transferToken.customToken.currency
            this.transferToken.quantity  = this.quantity
            var res=await WalletService.reunTransaction([
                {
                    account:this.transferToken.customToken.contract,
                    name:'transfer',
                    authorization:[ { actor: this.transferToken.from, permission: this.transferToken.permission }],
                    data:{
                        from:this.transferToken.from,
                        to:this.transferToken.to,
                        quantity:this.transferToken.quantity,
                        memo:this.transferToken.memo
                    }
                }
            ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id)
            if(res){
                if(res.transaction_id){
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        speed:500,
                        text: 'The transfer of ' + this.transferToken.quantity + ' to ' + this.transferToken.to + ' was successful'
                    });
                }
            }
        }
        else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                speed:500,
                text: 'Token receiver is necessary'
            });
        }
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