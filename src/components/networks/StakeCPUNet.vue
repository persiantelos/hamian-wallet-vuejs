<template>
    <div class="col-12 text-center bg-white  py-2" 
    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <div class="p-3" >
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
        </div>
            <div class="col-12" align="left" >
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
                                {{account.name}}
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
                <div class="col-12 mt-5 d-flex">
                        <div class="col-12 mt-3">
                        <h5 class="font-size-15 mb-3"
                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Account name of who currently holds stake:</h5>
                        <multiselect class="" :class="$store.state.layout.themeDarkMode ? 'input-forms':''" v-model="unStakeCPUorNET.selectedAccountForUnStake" :options="unStakeCPUorNET.accountHoldStake" ></multiselect>
                    </div>
                    <!-- <div class="col-6 px-2 mt-3">
                        <h5 class="font-size-15 mb-1"
                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount of CPU to Unstake (in TLOS)</h5>
                        <b-form-input class="" 
                            id="input-2"
                            v-model="unStakeCPUorNET.amountCPUUnstake"
                            type="text"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>

                    </div> -->
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
            <!-- <b-tab title="REFOUND"><p>I'm a REFOUND tab!</p></b-tab> -->
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import WalletService from '@/localService/walletService';
import Multiselect from "vue-multiselect";

@Component({
    components:{
    Multiselect,
    }
})
export default class StakeCPUNet extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    @Prop({default:()=>{return false}}) showSpinner:boolean;
    resources:any=[];
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
        // TODO:needs service
    }
    calculateAmountNettoStakeTelos(data:any){
        // TODO:needs service
    }  
    mounted(){
      this.init();
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
        this.accountList = await WalletService.getAccounts();
        console.log('this.accountList',this.accountList)

    }
    onItemClick(data:any){
        this.selectedOwnAccount = data.name;
        this.stakeCPUorNET.stakReciver  = data.name;
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
                    authorization:[ { actor: this.$store.state.currentAccount.name, permission: this.$store.state.currentAccount.authority }],
                    data:{
                        from:this.$store.state.currentAccount.name,
                        receiver:this.stakeCPUorNET.stakReciver,
                        stake_net_quantity: this.tempCPUAmountStake,
                        stake_cpu_quantity: this.tempNETAmountStake,
                        transfer:false
                    }
                }
            ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id)
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
    }
   



}
</script>
<style lang="scss" scoped>
.box{
  margin:5px;
  margin-top:0px;

}

</style>