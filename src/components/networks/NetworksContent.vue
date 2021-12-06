<template>
    <div class="col-12  account-list-body" >
        <p style="display:none">{{counter}}</p>
        <div class="col-12">
            <div v-if="value == 'accountList'">
                <AccountList  />
            </div>
            <div v-if="value == 'resources'">
                <Resources v-model="data.resources" />
                <ResourceInformation v-model="data.resources" />
            </div>
            <div v-if="value == 'buySellRAM'  ">
                <Resources v-model="data.resources" />
                <BuySellRAM v-model="data.resources" :showSpinner="showSpinner" />
            </div>
            <div v-if="value == 'stakeCpuNet'">
                <Resources v-model="data.resources" />
                <StakeCpuNet v-model="data.resources" :showSpinner="showSpinner" />
            </div>
            <div v-if="value == 'tokens'">
                <Tokens @changeSelectedMenu="changeSelectedMenu"   />
            </div>
            <div v-if="value == 'transferToken'">
                <TransferToken @changeSelectedMenu="changeSelectedMenu"   v-model="data.transferToken"  />
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
            this.counter++
        }
        else if(newValue == 'resources'){
            this.getResources();
            this.counter++
        }
        else if(newValue == 'buySellRAM'){
            this.getResources();
            this.counter++
        }
        else if(newValue == 'stakeCpuNet'){
            this.getResources();
            this.counter++
        }
        else if(newValue == 'tokens'){
        // this.tokens =
        // this.getTokens();
        }
        else if(newValue == 'transferToken'){
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
    background: #ffffff;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    min-height: 100vh;
    .account-list-boxs-parent{
    min-height: 85vh;
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