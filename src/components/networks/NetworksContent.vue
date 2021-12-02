<template>
    <div class="col-12  account-list-body" >
        <p style="display:none">{{counter}}</p>
        <div class="col-12">
            <div v-if="value == 'accountList'">
                <AccountList v-model="data.accountList" />
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
                <Tokens  />
            </div>
            <div v-if="value == 'transferToken'">
                <TransferToken v-model="data.transferToken"  />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component ,Prop,Watch} from 'vue-property-decorator';
import AccountService from '@/services/accountService';
import WalletService from '@/localService/walletService';
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
    selectedAccount:any={}
    stakeCPUorNET:any={
        stakReciver:'mohamamd',
        CPUAmountToStake:0,
        NETAmountToStake:0,
    };
    unStakeCPUorNET:any={
        accountHoldStake:[
            'mohammad','vahid','reza'
        ],
        selectedAccountForUnStake:'',
        amountCPUUnstake:0,
        amountNETUnstake:0,
    }
    buySellRAM:any={
        RAMBuyAmount:0,
        RAMConvertedToBytes:0,
        RAMSellAmount:0,
        TELOSCustAmount:0,
        showCustomToken:false,
    }
    tokenList:any=[]
    RAMRevicer:string=''
    nftList:any=[
        {title:'test1'},
        {title:'test2'},
    ]
    transferToken:any={
        customToken:'',
        amount:0,
        sendTo:'',
        memo:'',
        symbol:'',
        contract:'',
    }
    data:any={
        accountList:[],
        resources:[],
        tokens:[],
        transferToken:[],
    };
    resource:any={
        ram:{used:30.25,total:'24.92'},
        cpu:{used:55.50,total:' 5.07'},
        net:{used:20,total:'34.5'},
    }
    resourcesInfo:any={
        available:'2 TLOS',
        refunding:'0 TLOS',
        CPUStaked:'0.0000 TLOS',
        NetStaked:'0.0000 TLOS',
        totalREX:'0.002 TLOS',
        stakedbyOthers:'0.0000 TLOS',
    }
    mounted(){
        this.selectedNFTs = 'SelectNFT';
        this.getSelectedNetwork();
        this.getSelectedAccount();
    }
    async getSelectedNetwork(){
        this.currentNet = await StorageService.getSelectedChain();

        this.currentNet = this.currentNet.data;
    }
    async getSelectedAccount(){
        this.selectedAccount =  await StorageService.getSelectedAccount();
        this.selectedAccount = this.selectedAccount.message;
        this.selectedAccount.chainId = Object.entries(this.selectedAccount)[0][0];
        this.selectedAccount.name = Object.entries(this.selectedAccount)[0][1];
    }
    @Watch('value')
    valueChanged(newValue:any){
        console.log('new Value',newValue);
        
        if(newValue == 'accountList'){
        this.getAccounts();
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
    if(this.selectedAccount){
        if(this.currentNet){
            if(this.currentNet.chainId == this.selectedAccount.chainId){
                if(this.selectedAccount.name){
                    let acc = await AccountService.getAccount(this.selectedAccount.name);
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
                        text: this.selectedAccount
                    });
                }
            }
            else{
                this.$notify({
                    group: 'foo',
                    type: 'warn',
                    text: 'First Select your account!'
                });
                this.$emit('changeSelectedMenu','accountList')
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
        this.$emit('changeSelectedMenu','accountList')
    }
  }
  async getAccounts(){
    var thempAccountList = []
    let accountList = await WalletService.getAccounts();
    for(let acc of accountList){
        if(acc.chainId == this.currentNet.chainId)
        {
            thempAccountList.push(acc)
        }
    }
    this.data.accountList = thempAccountList;
    this.counter++;
  }
  sendEntireBalance(){}
  
  onItemClick(token:any){
    this.transferToken.customToken = token;
    console.log(this.transferToken.customToken);
    
  }
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