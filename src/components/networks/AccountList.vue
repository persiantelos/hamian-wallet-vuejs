<template>
    <div class="col-12 bg-white " style="min-height:75vh" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <p class="d-none">{{counter}}</p>
        <div v-if="showSpinner">
            <Spinner v-model="showSpinner" />
        </div>
        <div v-if="AddAccount">
            <p class="text-body p-3">
                Account list is empty.
            </p>
        </div>
        <div v-if="!showSpinner" class="d-flex row">
            <div class="p-3" style="min-width:250px;width:auto" v-for="(account , index) in AccountList"  :key="index" >
                <div class="card m-2 shadow-none"  :class="$store.state.layout.themeDarkMode ? 'border-gray':'border'">
                    <div class="card-body p-3" >
                        <div class="" @dblclick="setSelectedacc(account)">
                        <div class="float-end ms-2">
                            <b-dropdown
                            toggle-class="font-size-16 text-muted p-0"
                            menu-class="dropdown-menu-end"
                            class="mb-2"
                            variant="white"
                            right
                            >
                            <template #button-content>
                                <i class="mdi mdi-dots-horizontal"
                                :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"></i>
                            </template>
                            <b-dropdown-item @click="setSelectedacc(account)" href="#">
                            <span
                            :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">

                                select
                            </span>
                            </b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div class="avatar-xs me-3 mb-3">
                            <div class="avatar-title bg-transparent rounded">
                            <i class="bx bx-user font-size-24" :class="selected == account.name ? ' text-warning' : 'text-body'" ></i>
                            </div>

                        </div>
                        <h5 class="my-2" :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                            {{account.name}}
                        </h5>
                        <div class="" >
                            <div class="overflow-hidden me-auto" v-for="(token , id) in account.val" :key="id">
                                <h5 class="font-size-14 text-truncate mb-1">
                                    <a
                                    href="javascript: void(0);"
                                    class="text-body" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker' :''"
                                    >{{token.balance}}&#160;&#160;&#160;≈ $&#160;</a>
                                </h5>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop ,Watch} from 'vue-property-decorator';
import StorageService from '@/localService/storageService'
import AccountService from '@/services/accountService'
import Spinner from '@/components/spinner/Spinner.vue'
import WalletService from '@/localService/walletService';


@Component({
    components:{
        Spinner
    }
})
export default class AccountList extends Vue{
    accountList:any=[];
    counter:number=0;
    selected:any=[]
    currentNet:any=[]
    currentAccount:any=[]
    tokensList:any=[]
    AccountList:any=[]
    showSpinner:boolean=true;
    AddAccount:boolean=false;
    @Watch('$store.state.globalReload')
    reload(){
        this.showSpinner=true;
        this.getCurrentNet();
    }
    mounted(){
        this.getCurrentNet();
    }
    async getCurrentNet(){
        this.currentNet =   this.$store.state.currentNet
        this.getAccounts();
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
        this.accountList = thempAccountList;
        this.checkValue(this.accountList);
        this.getCurrentAccount();
    }
    getCurrentAccount(){
        this.currentAccount = this.$store.state.currentAccount
        this.selected = this.$store.state.currentAccount
    }
    checkValue(newVal:any){
        if(newVal.length<1){
            this.AddAccount = true;
            this.showSpinner = false;
        }
        else{
            this.AddAccount = false;
            this.showSpinner = true;
            this.init();
        }
    }
    async setSelectedacc(account:any){
        if(this.currentNet){
            account.chainId=this.currentNet.chainId;
            account.network = this.currentNet._id;
            var data =  await StorageService.saveSelectedAccount(account);
            if(data.message){
                this.$store.state.currentAccount = account
                this.$store.state.currentAccountChainName = this.currentNet._id;
                this.selected = account.name;
                this.counter++
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    text: 'Account Selected'
                });
            }
            else{
                this.$notify({
                    group: 'foo',
                    type: 'warn',
                    title: 'Oops!!!',
                    text: 'Something whent wrong!'
                });
            }
        }
    }
   
    
    async init(){
        this.tokensList = await AccountService.getTokensList();
        this.tokensList = this.tokensList.value
        if(this.currentNet&&this.tokensList){
            this.filterByCurrentNetName();
        }
    }
    filterByCurrentNetName(){
        let temoTokenList = []
        for(let token of this.tokensList){
            if(token.chain == this.$store.state.currentNet._id){
                temoTokenList.push(token)
            }
        }
        this.tokensList = temoTokenList;
        this.getTokenBalanceByContractName();
    }

    async getTokenBalanceByContractName(){
        let balances = []
        let currentNet = this.$store.state.currentNet;
        for(let account of this.accountList){
            for(let token of this.tokensList){
                let balance = await AccountService.getDynamicTokenBalance(token,account.name,currentNet)
                token.balance = balance
                balances.push(token)
            }
            account.val = balances
        }
        this.AccountList = this.accountList
        this.showSpinner = false;
    }
}
</script>
<style lang="scss" scoped>
.box{
    // background: #f8f8fb;
    width: 100%;
    // box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    .acc-box{
        // box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        // background: #ffffff;
        padding: 10px ;
        margin: 15px;
    }
}

</style>