<template>
    <div class="col-12 text-center py-2">
        <div class="p-3">
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
        </div>
        <b-tabs v-if="!showSpinner"
        class="box"
            active-nav-item-class="font-weight-bold text-uppercase text-primary"
            active-tab-class="font-weight-bold text-secondary"
            content-class="mt-3"
        >
            <b-tab title="STAKE" align="left"  active>
                <div class="col-12 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Reciver of Stake:</h5>
                    <div class="btn-group col-12 me-1 mt-2">
                    <b-form-input
                        id="input-2"
                        v-model="stakeCPUorNET.stakReciver"
                        type="text"
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
                        <h5 class="font-size-15 mb-4">Amount of CPU to Stake (in TELOS)</h5>
                        <b-form-input class="my-3"
                            id="input-2"
                            v-model="stakeCPUorNET.CPUAmountToStake"
                            type="text"
                        ></b-form-input>
                        <div>
                            <b-button class="m-1" @click="calculateAmountCPUtoStakeTelos(25)" variant="outline-secondary">25%</b-button>
                            <b-button class="m-1" @click="calculateAmountCPUtoStakeTelos(50)" variant="outline-secondary">50%</b-button>
                            <b-button class="m-1" @click="calculateAmountCPUtoStakeTelos(75)" variant="outline-secondary">75%</b-button>
                            <b-button class="m-1" @click="calculateAmountCPUtoStakeTelos(100)" variant="outline-secondary">100%</b-button>
                        </div>
                    </div>
                    <div class="col-6 mt-3 mx-1" dir="ltr">
                        <h5 class="font-size-15 mb-4">Amount of NET to Stake (in TELOS)</h5>
                        <b-form-input class="my-3"
                            id="input-2"
                            v-model="stakeCPUorNET.NETAmountToStake"
                            type="text"
                        ></b-form-input>
                        <div>
                            <b-button class="m-1" @click="calculateAmountNettoStakeTelos(25)" variant="outline-secondary">25%</b-button>
                            <b-button class="m-1" @click="calculateAmountNettoStakeTelos(50)" variant="outline-secondary">50%</b-button>
                            <b-button class="m-1" @click="calculateAmountNettoStakeTelos(75)" variant="outline-secondary">75%</b-button>
                            <b-button class="m-1" @click="calculateAmountNettoStakeTelos(100)" variant="outline-secondary">100%</b-button>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3" align="center">
                    <b-button class="m-1"  variant="primary">
                    Stake {{stakeCPUorNET.CPUAmountToStake}} TELOS of CPU and {{stakeCPUorNET.NETAmountToStake}} TELOS of NET to {{stakeCPUorNET.stakReciver}}
                    </b-button>
                </div>
                <div class="col-12 mt-5 d-flex">
                     <div class="col-6 mt-3">
                        <h5 class="font-size-15 mb-4">Account name of who currently holds stake:</h5>
                        <multiselect class="my-3" v-model="unStakeCPUorNET.selectedAccountForUnStake" :options="unStakeCPUorNET.accountHoldStake" ></multiselect>
                    </div>
                    <div class="col-6 px-2 mt-3">
                        <h5 class="font-size-15 mb-4">Amount of CPU to Unstake (in TLOS)</h5>
                        <b-form-input class="my-3"
                            id="input-2"
                            v-model="unStakeCPUorNET.amountCPUUnstake"
                            type="text"
                        ></b-form-input>

                    </div>
                </div>
                <div class="col-12 mt-3">
                    <h5 class="font-size-15 mb-4">Amount of NET to Unstake (in TLOS)</h5>
                    <b-form-input
                        id="input-2"
                        v-model="unStakeCPUorNET.amountNETUnstake"
                        type="text"
                    ></b-form-input>
                </div>
                <div class="col-12 mt-3" align="center">
                    <b-button class="m-1"  variant="primary">
                    UNSTAKE
                    </b-button>
                </div>
            </b-tab>
            <!-- <b-tab title="UNSTAKE" align="left">
                <div class="col-12 mt-3">
                    <h5 class="font-size-15 mb-4">Account name of who currently holds stake:</h5>
                    <div>
                        <b-form-select class="p-2"
                         v-model="unStakeCPUorNET.selectedAccountForUnStake"
                         :options="unStakeCPUorNET.accountHoldStake"
                         ></b-form-select>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <h5 class="font-size-15 mb-4">Amount of CPU to Unstake (in TLOS)</h5>
                    <b-form-input
                        id="input-2"
                        v-model="unStakeCPUorNET.amountCPUUnstake"
                        type="text"
                    ></b-form-input>

                </div>
                <div class="col-12 mt-3">
                    <h5 class="font-size-15 mb-4">Amount of NET to Unstake (in TLOS)</h5>
                    <b-form-input
                        id="input-2"
                        v-model="unStakeCPUorNET.amountNETUnstake"
                        type="text"
                    ></b-form-input>

                </div>
                <div class="col-12 mt-3" align="center">
                    <b-button class="m-1"  variant="primary">
                    UNSTAKE
                    </b-button>
                </div>
            </b-tab> -->
            <b-tab title="REFOUND"><p>I'm a REFOUND tab!</p></b-tab>
        </b-tabs>
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
    @Prop({default:()=>{return false}}) showSpinner:boolean
    selectedOwnAccount:any='';
    stakeCPUorNET:any={
        stakReciver:'',
        CPUAmountToStake:0,
        NETAmountToStake:0,
    };
    accountList:any=[];
    unStakeCPUorNET:any={
        accountHoldStake:[  
            'mohammad',
            'vahid',
            'reza',
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
      this.init()
      
    }
    async init(){
        this.accountList = await WalletService.getAccounts();
        console.log('this.accountList',this.accountList)

    }
    onItemClick(data:any){
        this.selectedOwnAccount = data.name;
        this.stakeCPUorNET.stakReciver  = data.name;
    }
   



}
</script>
<style lang="scss" scoped>
.box{
  margin:5px;
  margin-top:0px;

}
</style>