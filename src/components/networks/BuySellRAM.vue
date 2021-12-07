<template>
    <div class="col-12 text-center py-2">
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
      </div>
        <div v-if="!showSpinner" align="left" class="p-3">
                <h3 class="text-primary font-size-15 mt-4">BUY RAM</h3>
                <div class="col-12 d-flex">
                    <div class="col-6 mt-3" dir="ltr">
                        <h5 class="font-size-15 mb-4">RAM Reciver :</h5>
                        <b-form-input
                            id="input-2"
                            v-model="buySellRAM.RAMReceiver"
                            type="text"
                        ></b-form-input>

                    </div>
                    <div class="col-6 px-2 mt-3" dir="ltr">
                        <h5 class="font-size-15 mb-4">Buy in TELOS or Bytes?</h5>
                        <div class="d-flex">
                            <b-form-radio-group
                                v-model="buySellRAM.buyWith"
                                :options="options"
                                class="mb-3 d-flex px-2"
                                value-field="item"
                                text-field="chain"
                                disabled-field=""
                            ></b-form-radio-group>
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
                    <b-button class="mt-2 w-100"  variant="primary" v-show="!buySellRAM.RAMBuyAmount" 
                    @click="BuyRAMCLick">
                    Buy RAM
                    </b-button>
                    <b-button class="mt-2 w-100" @click="BuyRAMCLick" variant="primary" v-show="buySellRAM.RAMBuyAmount">
                    Buy {{buySellRAM.RAMBuyAmount}} {{buySellRAM.buyWith}} of RAM for {{buySellRAM.RAMReceiver}}
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
                            type="number"
                        ></b-form-input>
                        <div>
                            <b-button class="m-1" @click="calculateSellRAMAmount(25)" variant="outline-secondary">25%</b-button>
                            <b-button class="m-1" @click="calculateSellRAMAmount(50)" variant="outline-secondary">50%</b-button>
                            <b-button class="m-1" @click="calculateSellRAMAmount(75)" variant="outline-secondary">75%</b-button>
                            <b-button class="m-1" @click="calculateSellRAMAmount(100)" variant="outline-secondary">100%</b-button>
                        </div>
                        <p class="text-body">Selling {{buySellRAM.RAMSellAmount}} Bytes for {{buySellRAM.TELOSCustAmount}} TLOS</p>
                    </div>
                    <div class="col-6 mt-5" align="center">
                        <b-button @click="SellRAMClick" class="m-2 w-100"  variant="primary">
                        Sell RAM
                        </b-button>
                    </div>
                </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import Spinner from '@/components/spinner/Spinner.vue'
import WalletService from '../../localService/walletService'

@Component({
    components:{Spinner}
})
export default class AccountList extends Vue{
    // showSpinner:boolean=true;

    @Prop({default:()=>{return false}}) showSpinner:boolean
    quantity:any=[];
    options:any= [
        { item: 'TELOS', chain: 'TELOS' },
        { item: 'Bytes', chain: 'Bytes' },
    ]
    buySellRAM:any={
        RAMReceiver:'',
        buyWith:'TELOS',
        RAMBuyAmount:0,
        RAMConvertedToBytes:0,
        RAMSellAmount:0,
        TELOSCustAmount:0,
        showCustomToken:false,
  }
// mounted(){
    // this.showSpinner = false;
// }

async BuyRAMCLick(){
    if(this.buySellRAM.RAMReceiver){
        this.quantity = this.buySellRAM.RAMBuyAmount
        this.quantity = parseInt(this.quantity)
        console.log(this.buySellRAM.buyWith)
        if(this.buySellRAM.buyWith == 'TELOS'){
            this.quantity = this.quantity.toFixed(4) 
            this.quantity +=  ' TLOS'
        }
        else{
            this.quantity = this.quantity.toFixed(0) 
        }
        var res= await WalletService.reunTransaction([
            {
                account:'eosio',
                name:'buyram',
                authorization:[ { actor: this.$store.state.currentAccount.name , permission: this.$store.state.currentAccount.authority }],
                data:{
                    payer: this.$store.state.currentAccount.name,
                    receiver:this.buySellRAM.RAMReceiver,
                    quant:this.quantity,
                }
            }
        ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id)
        if(res){
            if(res.transaction_id){
                this.buySellRAM.RAMReceiver='';
                this.buySellRAM.RAMBuyAmount=0;
                this.quantity=[];
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    speed:500,
                    text: 'RAM purchase completed successfully.'
                });
            }
        }
    }
    else{
        this.$notify({
            group: 'foo',
            type: 'warn',
            speed:500,
            text: 'RAM receiver is necessary'
        });
    }
  }
  async SellRAMClick(){
    if(this.buySellRAM.RAMSellAmount >= 1){
        var res= await WalletService.reunTransaction([
            {
                account:'eosio',
                name:'sellram',
                authorization:[ { actor: this.$store.state.currentAccount.name , permission: this.$store.state.currentAccount.authority }],
                data:{
                    account: this.$store.state.currentAccount.name,
                    bytes:this.buySellRAM.RAMSellAmount,
                }
            }
        ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id)
        if(res){
            if(res.transaction_id){
                this.buySellRAM.RAMSellAmount=0;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    speed:500,
                    text: 'RAM sold successfully.'
                });
            }
        }
    }
    else{
        this.$notify({
            group: 'foo',
            type: 'warn',
            speed:500,
            text: 'Amount of RAM to sell is necessary!'
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