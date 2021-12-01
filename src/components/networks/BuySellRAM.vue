<template>
    <div class="col-12 text-center py-2">
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
      </div>
        <div v-if="!showSpinner" align="left" class="p-3">
        <!-- <b-tabs
        class="box"
            active-nav-item-class="font-weight-bold text-uppercase text-primary"
            active-tab-class="font-weight-bold text-secondary"
            content-class="mt-3"
        > -->
            <!-- <b-tab title="BUY RAM" align="left"  active> -->
                <h3 class="text-primary font-size-15 mt-4">BUY RAM</h3>

                <div class="col-12 d-flex">
                    <div class="col-6 mt-3" dir="ltr">
                        <h5 class="font-size-15 mb-4">RAM Reciver :</h5>
                        <b-form-input
                            id="input-2"
                            v-model="buySellRAM.RAMRevicer"
                            type="text"
                        ></b-form-input>

                    </div>
                    <div class="col-6 px-2 mt-3" dir="ltr">
                        <h5 class="font-size-15 mb-4">Buy in TELOS or Bytes?</h5>
                        <div class="d-flex">
                            <b-form-group class="d-flex" >
                                <div class="d-flex">
                                    <b-form-radio  v-model="buySellRAM.buyWith" val="TELOS"   name="some-radios" >
                                    <p class="m-1">
                                        TELOS
                                    </p>
                                    </b-form-radio>
                                    <b-form-radio  class="mx-2" v-model="buySellRAM.buyWith" val="Bytes"   name="some-radios" >
                                        <p class="m-1">
                                            Bytes
                                        </p>
                                    </b-form-radio>
                                </div>
                            </b-form-group>
                        </div>

                    </div>
                </div>
                <div class="col-12 d-flex">
                <div class="col-6 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">Amount of RAM to Buy in TELOS</h5>
                    <b-form-input
                        id="input-2"
                        v-model="buySellRAM.RAMBuyAmount"
                        type="text"
                    ></b-form-input>
                    <h5 class="font-size-12 mb-4">
                        <p class="m-1">
                            ≈ {{buySellRAM.RAMBuyAmount}} Bytes
                        </p>
                    </h5>

                </div>
                <div class="col-6 px-2 mt-5" align="center">
                    <b-button class="mt-2 w-100"  variant="primary" v-show="!buySellRAM.RAMBuyAmount">
                    Buy RAM
                    </b-button>
                    <b-button class="mt-2 w-100"  variant="primary" v-show="buySellRAM.RAMBuyAmount">
                    Buy {{buySellRAM.RAMBuyAmount}} {{buySellRAM.buyWith}} of RAM for {{buySellRAM.RAMRevicer}}
                    </b-button>
                </div>
                </div>

                <div class="col-12 mt-3">
                    <table class="table table-nowrap mb-0">
                        <tbody class="col-12">
                        <tr>
                            <th class="col-6"  scope="row">Bought :</th>
                            <td class="col-6">25521 Bytes ≈ 0.9764 TLOS</td>
                        </tr>
                        <tr>
                            <th class="col-6"  scope="row">In Use :</th>
                            <td class="col-6">3124 Bytes ≈ 0.1195 TLOS</td>
                        </tr>
                        <tr>
                            <th class="col-6"  scope="row">Available :</th>
                            <td class="col-6">22397 Bytes ≈ 0.8569 TLOS</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h3 class="text-primary font-size-15 mt-4">SELL RAM</h3>
                <div class="col-12 d-flex">
                    <div class="col-6 mt-3">
                        <h5 class="font-size-15 mb-4">Amount of RAM to Sell (Bytes)</h5>
                        <b-form-input
                            id="input-2"
                            v-model="buySellRAM.RAMSellAmount"
                            type="text"
                        ></b-form-input>
                        <div>
                            <b-button class="m-1" @click="calculateSellRAMAmount(25)" variant="outline-secondary">25%</b-button>
                            <b-button class="m-1" @click="calculateSellRAMAmount(50)" variant="outline-secondary">50%</b-button>
                            <b-button class="m-1" @click="calculateSellRAMAmount(75)" variant="outline-secondary">75%</b-button>
                            <b-button class="m-1" @click="calculateSellRAMAmount(100)" variant="outline-secondary">100%</b-button>
                        </div>
                        <p class="text-white">Selling {{buySellRAM.RAMSellAmount}} Bytes for {{buySellRAM.TELOSCustAmount}} TLOS</p>
                    </div>
                    <div class="col-6 mt-5" align="center">
                        <b-button class="m-2 w-100"  variant="primary">
                        Sell RAM
                        </b-button>
                    </div>
                </div>

               
            <!-- </b-tab> -->
            <!-- <b-tab title="SELL RAM" align="left">
                <div class="col-12 mt-3">
                    <table class="table table-nowrap mb-0">
                        <tbody>
                        <tr>
                            <th scope="row">Bought :</th>
                            <td>25521 Bytes ≈ 0.9764 TLOS</td>
                        </tr>
                        <tr>
                            <th scope="row">In Use :</th>
                            <td>3124 Bytes ≈ 0.1195 TLOS</td>
                        </tr>
                        <tr>
                            <th scope="row">Available :</th>
                            <td>22397 Bytes ≈ 0.8569 TLOS</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 mt-3">
                    <h5 class="font-size-15 mb-4">Amount of RAM to Sell (Bytes)</h5>
                    <b-form-input
                        id="input-2"
                        v-model="buySellRAM.RAMSellAmount"
                        type="text"
                    ></b-form-input>
                    <div>
                        <b-button class="m-1" @click="calculateSellRAMAmount(25)" variant="outline-secondary">25%</b-button>
                        <b-button class="m-1" @click="calculateSellRAMAmount(50)" variant="outline-secondary">50%</b-button>
                        <b-button class="m-1" @click="calculateSellRAMAmount(75)" variant="outline-secondary">75%</b-button>
                        <b-button class="m-1" @click="calculateSellRAMAmount(100)" variant="outline-secondary">100%</b-button>
                    </div>
                    <p class="text-white">Selling {{buySellRAM.RAMSellAmount}} Bytes for {{buySellRAM.TELOSCustAmount}} TLOS</p>
                </div>
                <div class="col-12 mt-3" align="center">
                    <b-button class="m-1"  variant="primary">
                    Sell RAM
                    </b-button>
                </div>
                
            </b-tab> -->
        <!-- </b-tabs> -->
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import Spinner from '@/components/spinner/Spinner.vue'

@Component({
    components:{Spinner}
})
export default class AccountList extends Vue{
    // showSpinner:boolean=true;

    // @Prop({default:()=>{return []}}) buySellRAM:any
    @Prop({default:()=>{return false}}) showSpinner:boolean
    buySellRAM:any={
    RAMBuyAmount:0,
    RAMConvertedToBytes:0,
    RAMSellAmount:0,
    TELOSCustAmount:0,
    showCustomToken:false,
    // mounted(){
    //     this.showSpinner = false;
    // }
  }
 
}
</script>
<style lang="scss" scoped>
.box{
  margin:5px;
  margin-top:0px;

}
</style>