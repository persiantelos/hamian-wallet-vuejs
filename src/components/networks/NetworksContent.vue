<template>
    <div >
        <div class="col-12  account-list-body" :style="value == '' ? 'min-height:75vh' : 'min-height:75vh'" >
            <div></div>
            <p style="display:none">{{counter}}</p>
            <div class="col-12">
                <div v-if="value == 'accountList'" :style="$store.state.layout.themeDarkMode ? 'background:#2a3042 !important':'background:#ffffff !important'">
                    <AccountList  />
                </div>
                <div v-if="value == 'resources'">
                    <Resources v-model="data.resources" />
                    <ResourceInformation class="mt-3" v-model="data.resources" />
                </div>
                <div v-if="value == 'buySellRAM'  ">
                    <Resources v-model="data.resources" />
                    <BuySellRAM class="mt-3" v-model="data.resources" :showSpinner="showSpinner" />
                </div>
                <div v-if="value == 'stakeCpuNet'">
                    <Resources v-model="data.resources" />
                    <StakeCpuNet class="mt-3" v-model="data.resources" :showSpinner="showSpinner" />
                </div>
                <div v-if="value == 'tokens'">
                    <Tokens @changeSelectedMenu="changeSelectedMenu"   />
                </div>
                <div v-if="value == 'transferToken'">
                    <TransferToken @changeSelectedMenu="changeSelectedMenu"   v-model="data.transferToken"  />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component ,Prop,Watch} from 'vue-property-decorator';
import AccountService from '@/services/accountService';
import AccountList from '@/components/networks/AccountList.vue'
import Resources from '@/components/networks/Resources.vue'
import ResourceInformation from '@/components/networks/ResourceInformation.vue'
import Tokens from '@/components/networks/Tokens.vue'
import TransferToken from '@/components/networks/TransferToken.vue'
import StorageService from '@/localService/storageService'
import BuySellRAM from '@/components/networks/BuySellRAM.vue'
import StakeCpuNet from '@/components/networks/StakeCPUNet.vue'



@Component({
    components:{
        AccountList,
        Resources,
        ResourceInformation,
        Tokens,
        TransferToken,
        BuySellRAM,
        StakeCpuNet
    }
})
export default class NetworksContent extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    counter:number=0;
    showCustomToken:boolean=false;
    showSpinner:boolean=true;
    buyWith:string='TELOS'
    selectedNFTs:any=[];
    currentNet:any=[]
    data:any={
        resources:[],
        tokens:[],
        transferToken:[],
    };
    mounted(){
        this.selectedNFTs = 'SelectNFT';
    }
    @Watch('value')
    valueChanged(newValue:any){
        if(newValue == 'accountList'){
            this.$store.state.currentPageTitle = 'Account List'

            this.counter++
        }
        else if(newValue == 'resources'){
            this.$store.state.currentPageTitle = 'Resources'

            this.getResources();
            this.counter++
        }
        else if(newValue == 'buySellRAM'){
            this.$store.state.currentPageTitle = 'Buy/Sell RAM'

            this.getResources();
            this.counter++
        }
        else if(newValue == 'stakeCpuNet'){
            this.$store.state.currentPageTitle = 'Stake CPU/NET'

            this.getResources();
            this.counter++
        }
        else if(newValue == 'tokens'){
            this.$store.state.currentPageTitle = 'Tokens'

        // this.tokens =
        // this.getTokens();
        }
        else if(newValue == 'transferToken'){
            this.$store.state.currentPageTitle = 'Transfer Token'
        this.counter++
        // this.transferToken =
        // this.getTransferToken();
        }
    }
    selectNft(nft:any){
    this.selectedNFTs = nft.title;
  }
   async getResources(){
    this.showSpinner = true;
    if(this.$store.state.currentAccountChainName){
        if(this.$store.state.currentNet){
            if(this.$store.state.currentNet._id == this.$store.state.currentAccountChainName){
                if(this.$store.state.currentAccount){
                    let acc = await AccountService.getAccount(this.$store.state.currentAccount.name);
                    if(acc){
                        this.data.resources = acc;
                        this.showSpinner = false;
                        this.counter++;
                    }
                }
                else{
                    this.$notify({
                        group: 'foo',
                        type: 'warn',
                        text: 'First Select your account!'

                    });
                }
            }
            else{
                this.$notify({
                    group: 'foo',
                    type: 'warn',
                    text: 'First Select your account!'
                });
                this.changeSelectedMenu('accountList')
            }
        }
        else{
            this.$notify({
                group: 'login',
                type: 'warn',
                text: 'Blockchain is not selected!'
            });
            this.$router.push('/')
        }
    }
    else{
        this.$notify({
            group: 'foo',
            type: 'warn',
            text: 'First Select your account!'
        });
        this.changeSelectedMenu('accountList')
    }
  }
  changeSelectedMenu(data:any){
      console.log(data)
        this.$emit('changeSelectedMenu',data)
  }
  sendEntireBalance(){}
  
 
}
</script>
<style lang="scss" scoped>
.account-list-body{
    // background: #ffffff;
    // box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    // min-height: 75vh;
    min-height:100%;

    .account-list-boxs-parent{
    // min-height: 85vh;
    .account-list-internal-box{
        border-radius: 10px;
        .internal-titles{
        font-size: 22px;
        }
        .user-icon{
        width: 30px;
        }
    }
    }

}
.resource-box{
  width:150px;
  height:200px;
  border-radius:20px
}
</style>