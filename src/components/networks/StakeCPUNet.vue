<template>
    <div class="col-12 text-center py-2">
        <div>
        <b-tabs
        class="box"
            active-nav-item-class="font-weight-bold text-uppercase text-primary"
            active-tab-class="font-weight-bold text-secondary"
            content-class="mt-3"
        >
            <b-tab title="STAKE" align="left"  active>
                <div class="col-12 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Reciver of Stake:</h5>
                    <b-form-input
                        id="input-2"
                        v-model="stakeCPUorNET.stakReciver"
                        type="text"
                    ></b-form-input>

                </div>
                <div class="col-12 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Amount of CPU to Stake (in TELOS)</h5>
                    <b-form-input
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
                <div class="col-12 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Amount of NET to Stake (in TELOS)</h5>
                    <b-form-input
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
                <div class="col-12 mt-3" align="center">
                    <b-button class="m-1"  variant="primary">
                    Stake {{stakeCPUorNET.CPUAmountToStake}} TELOS of CPU and {{stakeCPUorNET.NETAmountToStake}} TELOS of NET to {{stakeCPUorNET.stakReciver}}
                    </b-button>
                </div>
            </b-tab>
            <b-tab title="UNSTAKE" align="left">
                <div class="col-12 mt-3">
                    <h5 class="font-size-15 mb-4">Account name of who currently holds stake:</h5>
                    <div>
                        <b-form-select class="w-100 p-2"
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
            </b-tab>
            <b-tab title="REFOUND"><p>I'm a REFOUND tab!</p></b-tab>
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
    // @Prop({default:()=>{return []}}) stakeCPUorNET:any;
    // @Prop({default:()=>{return []}}) unStakeCPUorNET:any;
    // @Prop({default:()=>{return []}}) refound:any;
    stakeCPUorNET:any={
        stakReciver:'mohamamd',
        CPUAmountToStake:0,
        NETAmountToStake:0,
    };
    // Options as an array
// const options = ['A', 'B', 'C', { text: 'D', value: { d: 1 }, disabled: true }, 'E', 'F']
    unStakeCPUorNET:any={
        accountHoldStake:[  
            { value: 'mohammad', text: 'mohammad' },
            { value: 'vahid', text: 'vahid' },
            { value: 'reza', text: 'reza' },
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
      console.log('this is value ',this.value)
    }
   



}
</script>
<style lang="scss" scoped>
.box{
  margin:5px;
  margin-top:0px;

}
</style>