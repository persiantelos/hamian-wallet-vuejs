<template>
    <div class="col-12 text-center"
    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
      </div>
        <div v-if="!showSpinner" align="left" class="p-3"
        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                <h3 class="text-primary font-size-15 mt-2">BUY RAM</h3>
                <div class="col-12 d-flex">
                    <div class="col-8 mt-3" dir="ltr">
                        <h5 class="font-size-15 mb-4"
                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">RAM Reciver :</h5>
                        <div class="btn-group col-12 me-1 mt-2">
                            <b-form-input
                                id="input-2"
                                v-model="buySellRAM.RAMReceiver"
                                type="text"
                                placeholder="RAM Reciver"
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
                    <div class="col-4 px-2 mt-3" dir="ltr">
                        <h5 class="font-size-15 mb-4"
                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Buy in TELOS or Bytes?</h5>
                        <div class="d-flex">
                            <b-form-radio-group
                                v-model="buySellRAM.buyWith"
                                :options="options"
                                class="mb-3 mt-2 d-flex px-2"
                                value-field="item"
                                text-field="chain"
                                disabled-field=""
                            ></b-form-radio-group>
                        </div>

                    </div>
                </div>
                <div class="col-12 d-flex">
                <div class="col-6 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4" 
                    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount of RAM to Buy in {{buySellRAM.buyWith}}</h5>
                    <b-form-input
                        id="input-2"
                        v-model="buySellRAM.RAMBuyAmount"
                        type="text"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"

                    ></b-form-input>
                    <h5 class="font-size-12 mt-3 mb-4">
                        <p :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker' :''"
                        class="m-1" v-if="buySellRAM.buyWith == 'TELOS'">
                            ≈ {{buySellRAM.RAMBuyAmount * telosBytesScale}} Bytes
                        </p>
                        <p :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker' :''"
                        class="m-1" v-if="buySellRAM.buyWith == 'Bytes'">
                            ≈ {{(buySellRAM.RAMBuyAmount/telosBytesScale).toFixed(4)}} TELOS
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
                        
                        <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                            <th class="col-6"  scope="row">Bought :</th>
                            <td class="col-6">{{resources.ram_limit.available}} Bytes ≈ {{(resources.ram_limit.available/telosBytesScale).toFixed(4)}} TLOS</td>
                        </tr>
                        <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                            <th class="col-6"  scope="row">In Use :</th>
                            <td class="col-6">{{resources.ram_limit.used}} Bytes ≈ {{(resources.ram_limit.used/telosBytesScale).toFixed(4)}} TLOS</td>
                        </tr>
                        <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                            <th class="col-6"  scope="row">Available :</th>
                            <td class="col-6">{{resources.ram_limit.available - resources.ram_limit.used}} Bytes ≈ {{((resources.ram_limit.available - resources.ram_limit.used)/telosBytesScale).toFixed(4)}}  TLOS</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h3 class="text-primary font-size-15 mt-4">SELL RAM</h3>
                <div class="col-12 d-flex">
                    <div class="col-6 mt-3">
                        <h5 class="font-size-15 mb-4"
                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Amount of RAM to Sell (Bytes)</h5>
                        <b-form-input
                            id="input-2"
                            v-model="buySellRAM.RAMSellAmount"
                            type="number"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"

                        ></b-form-input>
                        <div>
                            <b-button class="m-1 mt-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateSellRAMAmount(25)" variant="outline-secondary">25%</b-button>
                            <b-button class="m-1 mt-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateSellRAMAmount(50)" variant="outline-secondary">50%</b-button>
                            <b-button class="m-1 mt-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateSellRAMAmount(75)" variant="outline-secondary">75%</b-button>
                            <b-button class="m-1 mt-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" @click="calculateSellRAMAmount(100)" variant="outline-secondary">100%</b-button>
                        </div>
                        <p class="text-body " 
                        :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker' :''"
                        >Selling {{buySellRAM.RAMSellAmount}} Bytes for {{(buySellRAM.RAMSellAmount/telosBytesScale).toFixed(4)}} TLOS</p>
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
import AccountService from '@/services/accountService'

@Component({
    components:{Spinner}
})
export default class AccountList extends Vue{
    // showSpinner:boolean=true;
    @Prop({default:()=>{return []}}) value:any
    @Prop({default:()=>{return false}}) showSpinner:boolean;
    telosBytesScale:number=26294;
    connectorBalance:any=[]
    smartTokensOutstandingSupply:any=[]
    connectorWeight:any=[]
    quantity:any=[];
    accountList:any=[];
    selectedOwnAccount:'';
    resources:any=[];
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
    async getAccounts(){
        this.accountList = await WalletService.getAccounts();
        console.log('this.accountList',this.accountList)
    }
    onItemClick(data:any){
        this.selectedOwnAccount = data.name;
        this.buySellRAM.RAMReceiver = data.name
    }
    mounted(){
        // this.init()
        this.getAccounts()
        this.showSpinner = false;
        if(this.value == []){
            this.$router.push('/')
        }
        else{
            this.resources = this.value;
        }
    }
    async init(){
        let rows = await AccountService.getTableRows(this.$store.state.currentAccount.name);
        console.log('rows',rows)
        // this.connectorBalance = rows.quote.balance
        // this.smartTokensOutstandingSupply =  rows.base.balance
        // this.connectorWeight =  rows.quote.weight
        // this.calculate();

    }
    @Watch('value')
    valChanged(newVal:any){
        this.resources = newVal;
        console.log('resources',this.resources)
    }
    calculate(){
    //  Bancor Algorithm 
    // FIXME:Bancor Algorithm  is not work
    // this.telosBytesScale= this.connectorBalance/(this.smartTokensOutstandingSupply*this.connectorWeight)
    // console.log('this.telosBytesScale',this.telosBytesScale)
    this.telosBytesScale=26294;
    
    }

    

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
               // authorization:[ { actor: this.$store.state.currentAccount.name , permission: this.$store.state.currentAccount.authority }],
                data:{
                    payer: this.$store.state.currentAccount.name,
                    receiver:this.buySellRAM.RAMReceiver,
                    quant:this.quantity,
                }
            }
        ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id,
        this.$store.state.currentAccount)
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
                //authorization:[ { actor: this.$store.state.currentAccount.name , permission: this.$store.state.currentAccount.authority }],
                data:{
                    account: this.$store.state.currentAccount.name,
                    bytes:this.buySellRAM.RAMSellAmount,
                }
            }
        ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id,
        this.$store.state.currentAccount)
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
  calculateSellRAMAmount(data:number){
      this.buySellRAM.RAMSellAmount = (((this.resources.ram_limit.available - this.resources.ram_limit.used) / 100) * data).toFixed(0) ;
  }
    
}
</script>
<style lang="scss" scoped>
.box{
  margin:5px;
  margin-top:0px;

}
</style>