<template>
    <div class="col-12 text-center bg-white  py-2" 
    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <div class="p-3" >
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
        </div>
        <div  class="col-12" align="left" >
            <div class="col-12">
                <h1 class="font-size-16 text-primary p-3 px-0">
                    STAKE
                </h1>
            </div>
            <div class="col-12 mt-3" dir="ltr">
                <h5 class="font-size-15 mb-4"
                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Reciver of Stake:</h5>
                <div class="btn-group col-12 me-1 mt-2">
                <b-form-input
                    id="input-2"
                    v-model="stakeCPUorNET.stakReciver"
                    type="text"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                ></b-form-input>
                <b-dropdown variant="primary"   style="min-width:120px">
                    <template v-slot:button-content>
                        {{selectedOwnAccount}}
                        <i class="mdi mdi-chevron-down"></i>
                    </template>
                    <div align="left"  v-for="(account , index) in accountList" :key="index">
                        <b-dropdown-item align="left" @click="onItemClick(account)" href="javascript: void(0);">
                            <span
                            :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                            {{account.name}}
                            </span>
                        </b-dropdown-item>
                    </div>
                </b-dropdown>
            </div>
            </div>
            <div class="col-12 d-flex">
                <div class="col-6 mt-3 mx-1" dir="ltr">
                    <h5 class="font-size-15 mb-4"
                    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount of CPU to Stake (in TELOS)</h5>
                    <b-form-input class="my-3"
                        id="input-2"
                        v-model="stakeCPUorNET.CPUAmountToStake"
                        type="number"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                    <div>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountCPUtoStakeTelos(25)" variant="outline-secondary">25%</b-button>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountCPUtoStakeTelos(50)" variant="outline-secondary">50%</b-button>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountCPUtoStakeTelos(75)" variant="outline-secondary">75%</b-button>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountCPUtoStakeTelos(100)" variant="outline-secondary">100%</b-button>
                    </div>
                </div>
                <div class="col-6 mt-3 mx-1" dir="ltr">
                    <h5 class="font-size-15 mb-4"
                    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount of NET to Stake (in TELOS)</h5>
                    <b-form-input class="my-3"
                        id="input-2"
                        v-model="stakeCPUorNET.NETAmountToStake"
                        type="number"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                    <div>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountNettoStakeTelos(25)" variant="outline-secondary">25%</b-button>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountNettoStakeTelos(50)" variant="outline-secondary">50%</b-button>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountNettoStakeTelos(75)" variant="outline-secondary">75%</b-button>
                        <b-button class="m-1" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateAmountNettoStakeTelos(100)" variant="outline-secondary">100%</b-button>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-3" align="center">
                <b-button @click="stakeClick()" class="m-1"  variant="primary">
                Stake {{stakeCPUorNET.CPUAmountToStake}} TELOS of CPU and {{stakeCPUorNET.NETAmountToStake}} TELOS of NET to {{stakeCPUorNET.stakReciver}}
                </b-button>
            </div>
            <div class="col-12 pt-3">
                <h1 class="font-size-16 text-primary">
                    UNSTAKE
                </h1>
            </div>
            <div class="col-12 mt-3 d-flex">
                    <div class="col-12 mt-3">
                    <h5 class="font-size-15 mb-3"
                    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Account name of who currently holds stake:</h5>
                    <div class="col-12 d-flex">
                        <b-form-input
                        id="input-2"
                        v-model="unStakeCPUorNET.selectedAccountForUnStake"
                        type="text"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                        <b-dropdown variant="primary"   style="min-width:120px">
                            <template v-slot:button-content>
                                {{unStakeCPUorNET.selectedAccountForUnStake}}
                                <i class="mdi mdi-chevron-down"></i>
                            </template>
                            <div align="left"  v-for="(account , index) in accountList" :key="index">
                                <b-dropdown-item align="left" @click="selectHoldesAccount(account)" href="javascript: void(0);">
                                    <span
                                    :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                                    {{account.name}}
                                    </span>
                                </b-dropdown-item>
                            </div>
                        </b-dropdown>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex mt-3">
                <div class="col-6 mt-3 mx-1" dir="ltr">
                    <h5 class="font-size-15 mb-3"
                    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount of CPU to Unstake (in TLOS)</h5>
                    <b-form-input class="" 
                        id="input-2"
                        v-model="unStakeCPUorNET.amountCPUUnstake"
                        type="text"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                </div>
                <div class="col-6 mt-3 mx-1" dir="ltr">
                    <h5 class="font-size-15 mb-3"
                    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount of NET to Unstake (in TLOS)</h5>
                    <b-form-input
                        id="input-2"
                        v-model="unStakeCPUorNET.amountNETUnstake"
                        type="text"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                </div>
            </div>
            <div class="col-12 mt-3" align="center">
                <b-button @click="unStakeClick()" class="m-1"  variant="primary">
                UNSTAKE
                </b-button>
            </div>
        </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import WalletService from '@/localService/walletService';
import AccountService from '@/services/accountService'
import Multiselect from "vue-multiselect";

@Component({
    components:{
    Multiselect,
    }
})
export default class StakeCPUNet extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    @Prop({default:()=>{return false}}) showSpinner:boolean;
    // showSpinner:boolean=true
    resources:any=[];
    tokensList:any=[];
    tokens:any=[];
    tempCPUAmountStake:any=[];
    tempNETAmountStake:any=[];
    selectedOwnAccount:any='';
    stakeCPUorNET:any={
        stakReciver:'',
        CPUAmountToStake:0,
        NETAmountToStake:0,
    };
    accountList:any=[];
    unStakeCPUorNET:any={
        accountHoldStake:[  
        ],
        selectedAccountForUnStake:'',
        amountCPUUnstake:0,
        amountNETUnstake:0,
    }
    
    calculateAmountCPUtoStakeTelos(data:any){
        let tempBalance = this.tokens.balance
        tempBalance = tempBalance[0]
        console.log('tempBalance',tempBalance)
        tempBalance = parseFloat(tempBalance)
        if(data == 25){
            tempBalance = (tempBalance/100)*25
            this.stakeCPUorNET.CPUAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
        }
        if(data == 50){
            tempBalance = (tempBalance/100)*50
            this.stakeCPUorNET.CPUAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
        }
        if(data == 75){
            tempBalance = (tempBalance/100)*75
            this.stakeCPUorNET.CPUAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
        }
        if(data == 100){
            tempBalance = (tempBalance/100)*100
            this.stakeCPUorNET.CPUAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
            this.calculateAmountNettoStakeTelos(0);
        }
        else if(data == 0){
            this.stakeCPUorNET.CPUAmountToStake = data.toFixed(parseInt(this.tokens.decimals))
        }
    }
    calculateAmountNettoStakeTelos(data:any){
        let tempBalance = this.tokens
        tempBalance = tempBalance[0]
        tempBalance = parseFloat(tempBalance)
        if(data == 25){
            tempBalance = (tempBalance/100)*25
            this.stakeCPUorNET.NETAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
            
        }
        if(data == 50){
            tempBalance = (tempBalance/100)*50
            this.stakeCPUorNET.NETAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
        }
        if(data == 75){
            tempBalance = (tempBalance/100)*75
            this.stakeCPUorNET.NETAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
            
        }
        if(data == 100){
            tempBalance = (tempBalance/100)*100
            this.stakeCPUorNET.NETAmountToStake = tempBalance.toFixed(parseInt(this.tokens.decimals))
            this.calculateAmountCPUtoStakeTelos(0);
        }
        else if(data == 0){
            this.stakeCPUorNET.NETAmountToStake = data.toFixed(parseInt(this.tokens.decimals))
        }
    }  
    mounted(){
        this.init();
    this.getTolenList()
        if(this.value == []){
            this.$router.push('/')
        }
        else{
            this.resources = this.value;
            console.log('resources',this.resources)
        }
    }
    @Watch('value')
    valChanged(newVal:any){
        this.resources = newVal;
    }
    async init(){
        this.accountList =  await WalletService.getAccounts();
    }
    async getTolenList(){
        this.tokensList  =  await AccountService.getTokensList();
        this.tokensList  =  this.tokensList.value
        this.filterByCurrentNetName()
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
        for(let token of this.tokens){
            if(token._id == 'telos'){
                this.tokens = token
                this.tokens.balance = this.tokens.balance.split(' ')
                break
            }
        }
        // this.showSpinner = false;
    }
    onItemClick(data:any){
        this.selectedOwnAccount = data.name;
        this.stakeCPUorNET.stakReciver  = data.name;
    }
    selectHoldesAccount(data:any){
        this.unStakeCPUorNET.selectedAccountForUnStake = data.name
    }
    async stakeClick()
    { 
        if(this.stakeCPUorNET.stakReciver){
            this.tempCPUAmountStake = parseInt(this.stakeCPUorNET.CPUAmountToStake)
            this.tempCPUAmountStake = this.tempCPUAmountStake.toFixed(4)
            this.tempCPUAmountStake += ' TLOS'
            console.log(this.tempCPUAmountStake)

            this.tempNETAmountStake = parseInt(this.stakeCPUorNET.NETAmountToStake)
            this.tempNETAmountStake = this.tempNETAmountStake.toFixed(4)
            this.tempNETAmountStake += ' TLOS'
            console.log(this.tempNETAmountStake)

            var res=await WalletService.reunTransaction([
                {
                    account:"eosio",
                    name:"delegatebw",
                    //authorization:[ { actor: this.$store.state.currentAccount.name, permission: this.$store.state.currentAccount.authority }],
                    data:{
                        from:this.$store.state.currentAccount.name,
                        receiver:this.stakeCPUorNET.stakReciver,
                        stake_cpu_quantity: this.tempCPUAmountStake,
                        stake_net_quantity: this.tempNETAmountStake,
                        transfer:false
                    }
                }
            ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id,
            this.$store.state.currentAccount)
            if(res){
                if(res.transaction_id){
                    this.tempCPUAmountStake = [],
                    this.tempNETAmountStake = [],
                    this.stakeCPUorNET={
                        stakReciver:'',
                        CPUAmountToStake:0,
                        NETAmountToStake:0,
                    };
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        speed:500,
                        text: 'Stake CPU/NET successfully'
                    });
                }
            }
        }
        else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                speed:500,
                text: 'Stake receiver is necessary'
            });
        }
    }
    async unStakeClick(){
        // TODO:unstake method 
        if(this.unStakeCPUorNET.selectedAccountForUnStake){
            this.unStakeCPUorNET.amountCPUUnstake = parseInt(this.unStakeCPUorNET.amountCPUUnstake)
            this.unStakeCPUorNET.amountCPUUnstake = this.unStakeCPUorNET.amountCPUUnstake.toFixed(4)
            this.unStakeCPUorNET.amountCPUUnstake += ' TLOS'
            console.log(this.unStakeCPUorNET.amountCPUUnstake)

            this.unStakeCPUorNET.amountNETUnstake = parseInt(this.unStakeCPUorNET.amountNETUnstake)
            this.unStakeCPUorNET.amountNETUnstake = this.unStakeCPUorNET.amountNETUnstake.toFixed(4)
            this.unStakeCPUorNET.amountNETUnstake += ' TLOS'
            console.log(this.unStakeCPUorNET.amountNETUnstake)

            var res=await WalletService.reunTransaction([
                {
                    account:"eosio",
                    name:"undelegatebw",
                    authorization:[ { actor: this.$store.state.currentAccount.name, permission: this.$store.state.currentAccount.authority }],
                    data:{
                        from:this.$store.state.currentAccount.name,
                        receiver:this.unStakeCPUorNET.selectedAccountForUnStake,
                        unstake_net_quantity: this.unStakeCPUorNET.amountNETUnstake,
                        unstake_cpu_quantity: this.unStakeCPUorNET.amountCPUUnstake,
                        transfer:false
                    }
                }
            ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id,
            this.$store.state.currentAccount)
        }
        else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                speed:500,
                text: 'Account name of who currently holds stake is necessary'
            });
        }
    }
   



}
</script>
<style lang="scss" scoped>
.box{
  margin:5px;
  margin-top:0px;

}

</style>