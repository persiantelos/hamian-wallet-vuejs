<template>
    <div class="col-12">
        <div v-if="showSpinner">
            <Spinner v-model="showSpinner" />
        </div>
        <div v-if="AddAccount">
            <p class="text-body p-3">
                Account list is empty.
            </p>
        </div>
        <div v-if="!showSpinner" class="d-flex">
            
            <div class="p-3" v-for="(account , index) in AccountList"  :key="index" >
                <div class="card m-2 shadow-none border">
                    <div class="card-body p-3">
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
                                <i class="mdi mdi-dots-horizontal"></i>
                            </template>
                            <b-dropdown-item @click="setSelectedacc(account)" href="#">select</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div class="avatar-xs me-3 mb-3">
                            <div class="avatar-title bg-transparent rounded">
                            <i class="bx bx-user font-size-24" :class="selected.name == account.name ? ' text-warning' : 'text-body'" ></i>
                            </div>
                        </div>
                        <div class="d-flex" >
                            <div class="overflow-hidden me-auto">
                            <h5 class="font-size-14 text-truncate mb-1">
                                <a
                                href="javascript: void(0);"
                                class="text-body"
                                >{{account.name}}</a
                                >
                            </h5>
                            <p v-if="account.val" class="text-muted text-truncate mb-0">
                               {{account.val.daric}}  DRIC
                            </p>
                            <p v-else class="text-muted text-truncate mb-0">
                               0  DRIC
                            </p>
                            </div>
                            <div class="align-self-end ms-2">
                            <p v-if="account.val" class="text-muted mb-0">
                               {{account.val.telos}}  TELOS
                            </p>
                            <p v-else class="text-muted mb-0">
                               0  TELOS
                            </p>
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

@Component({
    components:{
        Spinner
    }
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    selected:any=[]
    currentNet:any=[]
    tokensList:any=[]
    tokens:any=[]
    accInfo:any=[]
    AccountList:any=[]
    showSpinner:boolean=true;
    AddAccount:boolean=false;

   mounted(){
       this.getCurrentNet()
   }
    async getCurrentNet(){
        this.currentNet =   await StorageService.getSelectedChain()
        this.currentNet = this.currentNet.data;
    }
    async setSelectedacc(account:any){
        if(this.currentNet){
            account.chainId=this.currentNet.chainId;
            account.network = this.currentNet._id;
            var data =  await StorageService.saveSelectedAccount(account);
            console.log(data)
            if(data.message){
                this.$store.state.currentAccount = account.name;
                this.selected = account;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    // title: 'Important message',
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
   
    @Watch('value')
    checkValue(newVal:any){
        console.log('newVal',newVal)
        if(newVal.length<1){
            this.AddAccount = true;
            this.showSpinner = false;
        }
        else{
            this.showSpinner = true;
            this.init();
        }
    }
    async init(){
        
        this.tokensList =  await AccountService.getTokensList();
        this.tokensList = this.tokensList.value
        if(this.currentNet&&this.tokensList){
            this.getAccountsInfo();
        }
    }
    async getAccountsInfo(){
        let tempAccInformation =[]
        
        for(let account in this.value){
            this.accInfo = await AccountService.getAccountInfo(this.value[account].name);
            this.accInfo = this.accInfo.value
            tempAccInformation.push(this.accInfo)
        }
        this.accInfo = tempAccInformation;
        this.setTokens()
    }
    setTokens(){
        let newarr = []
        for(let token of this.tokensList){
            if(this.currentNet._id == token.chain)
            {
                for(let account of this.accInfo){
                    for(let item of account){
                        for(let i =0;i<Object.keys(item).length;i++){
                            if(Object.keys(item)[i] == token._id){
                                let objKey = Object.keys(item)[i]
                                let objValue = item[objKey]
                                item[objKey] = objValue.toFixed(parseInt(token.decimals))
                                token.val = item;
                                newarr.push(token)
                            }
                        }
                    }
                }
            }
        }
        this.tokens = newarr;
        this.setAccountToken()
    }
    setAccountToken(){
        for(let account of this.value){
            for(let token of this.tokens){
                if(account.name == token.val._id){
                    account.val = token.val
                }
            }
        }
        this.AccountList = this.value
        this.showSpinner = false;
    }
}
</script>
<style lang="scss" scoped>
.box{
    background: #f8f8fb;
    width: 100%;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    .acc-box{
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        background: #ffffff;
        padding: 10px ;
        margin: 15px;
    }
}
</style>