<template>
    <div class="col-12 text-center py-2">
        <div>
        <b-tabs
        class="box"
            active-nav-item-class="font-weight-bold text-uppercase text-primary"
            active-tab-class="font-weight-bold text-secondary"
            content-class="mt-3"
        >
            <b-tab title="BUY RAM" align="left"  active>
                <div class="col-12 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4">RAM Reciver :</h5>
                    <b-form-input
                        id="input-2"
                        v-model="buySellRAM.RAMRevicer"
                        type="text"
                    ></b-form-input>

                </div>
                <div class="col-12 mt-3" dir="ltr">
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
                <div class="col-12 mt-3" dir="ltr">
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
                <div class="col-12 mt-3" align="center">
                    <b-button class="m-1"  variant="primary" v-show="!buySellRAM.RAMBuyAmount">
                    Buy RAM
                    </b-button>
                    <b-button class="m-1"  variant="primary" v-show="buySellRAM.RAMBuyAmount">
                    Buy {{buySellRAM.RAMBuyAmount}} {{buySellRAM.buyWith}} of RAM for {{buySellRAM.RAMRevicer}}
                    </b-button>
                </div>
               
            </b-tab>
            <b-tab title="SELL RAM" align="left">
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
    // @Prop({default:()=>{return []}}) buySellRAM:any
    buySellRAM:any={
    RAMBuyAmount:0,
    RAMConvertedToBytes:0,
    RAMSellAmount:0,
    TELOSCustAmount:0,
    showCustomToken:false,
  }
 
}
</script>
<style lang="scss" scoped>
.box{
  margin:5px;
  margin-top:0px;

}
</style>