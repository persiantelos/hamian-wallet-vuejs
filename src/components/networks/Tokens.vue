<template>
    <div class="col-12 bg-white" style="min-height:75vh " :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
      </div>
      
        <div v-if="!showSpinner" class="d-flex row">
            
            <div class="p-3" style="min-width:250px;width:auto" v-for="(token ,index) in tokens" :key="index" >
                <div class="card m-2 shadow-none " :class="$store.state.layout.themeDarkMode ? 'border-gray':'border'">
                    <div class="card-body p-3">
                        <div class="">
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

                            <b-dropdown-item href="#" @click="goToTransferToken()">
                               <span :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                                    <i class="mdi mdi-swap-horizontal "  ></i> Transfer
                                </span>
                            </b-dropdown-item>
                            <b-dropdown-item href="#" @click="reload()">
                                <span :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                                   <i class="bx bx-sync "  ></i> Refresh
                                </span>
                            </b-dropdown-item>
                            <b-dropdown-divider v-if="token.local"></b-dropdown-divider>
                            <b-dropdown-item v-if="token.local" href="#" @click="remove(token)">
                                <span :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                                   <i class="bx bx-trash-alt text-danger"  ></i> Remove
                                </span>
                            </b-dropdown-item>
                            </b-dropdown>
                        </div>
                        
                        <div class="avatar-xs me-3 mb-3">
                            <div class="avatar-title bg-transparent rounded">
                            <!-- <i
                                class="bx bxs-folder font-size-24 text-warning"
                            ></i> -->
                            <img v-if="!token.local" :src="token.icon" style="width:24px;background:none;border-radius:50%;border:1px solid lightgray" alt="">
                            <i v-if="token.local"
                                class="bx bx-buoy font-size-24 "
                            ></i>
                            </div>
                        </div>
                        <!-- <span class="my-2" :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                            {{token._id}}
                        </span> -->
                        <div class="d-flex">
                            <div class="overflow-hidden me-auto">
                            <h5 class="font-size-14 text-truncate mb-1">
                                <a
                                href="javascript: void(0);"
                                class="text-body" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf !important' :''"
                                >{{token.contract}}</a
                                >
                            </h5>
                            <p v-if="token.balance" class="text-muted text-truncate mb-0">
                                {{token.balance}}&#160;&#160;&#160;≈ $&#160;
                            </p>
                            <p v-if="!token.balance" class="text-muted text-truncate mb-0">
                                {{(0).toFixed(token.decimals)}} {{token._id}}&#160;&#160;&#160;≈ $0
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div v-if="showRemovePopUp">
                        <b-modal :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" :title="'Remove ' + selectedToRemove.contract +' permanently!'" centered v-model="showRemovePopUp" >
                            <div class="col-12 d-flex"  :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
                                <p class="col-6">
                                Name : 
                                </p>
                                <p class="col-6">
                                {{selectedToRemove._id}}
                                </p>
                            </div>
                            <div class="col-12 d-flex"  :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
                                <p class="col-6">
                                Contract : 
                                </p>
                                <p class="col-6">
                                {{selectedToRemove.contract}}
                                </p>
                            </div>
                            <div class="col-12 d-flex"  :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
                                <p class="col-6">
                                Decimals : 
                                </p>
                                <p class="col-6">
                                {{selectedToRemove.decimals}}
                                </p>
                            </div>
                            <div class="col-12 d-flex"  :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
                                <p class="col-6">
                                Currancy : 
                                </p>
                                <p class="col-6">
                                {{selectedToRemove.currancy}}
                                </p>
                            </div>
                            <div class="col-12 d-flex"  :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
                                <p class="col-6">
                                Chain : 
                                </p>
                                <p class="col-6">
                                {{selectedToRemove.chain}}
                                </p>
                            </div>
                            <template dir="rtl" #modal-footer>
                                <div dir="rtl" class="w-100 float-right">
                                    <div v-if="showSpinner">
                                        <Spinner v-if="showSpinner" />
                                    </div>
                                    <b-button class="pr-3 m-1 pl-3" 
                                        variant="danger"
                                        size="sm"
                                        @click="deleteToken()">
                                        Delete Token
                                    </b-button>
                                    <b-button
                                        variant="outline-secondary"
                                        size="sm"
                                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"
                                        @click="showRemovePopUp = false">
                                        Close
                                    </b-button>
                                </div>
                            </template>
                        </b-modal>
                    </div>
                    
                </div>
            </div>
        </div>
        <b-button size="lg" pill  style="position: absolute;bottom: 5%;right: 5%;width:40px;" variant="primary" class="btn-block">+</b-button>
    </div>
</template>
<script lang="ts">
import {Vue, Component ,Watch } from 'vue-property-decorator'
import AccountService from '@/services/accountService'
import StorageService from '@/localService/storageService'
import Spinner from '@/components/spinner/Spinner.vue'
import Confirm from "@/components/common/Confirm.vue"

@Component({
    components:{
        Spinner,
        Confirm
    }
})
export default class AccountList extends Vue{
    tokens:any=[];
    tokensList:any=[];
    accInfo:any=[];
    showSpinner:boolean=true;
    showRemovePopUp:boolean=false;
    selectedToRemove:any=[];
    @Watch('$store.state.globalReload')
    refresh(){
        this.showSpinner=true;
        this.init();
    }
    mounted(){
        this.init();
    }
    async init(){
        this.showSpinner=true;
        if(this.$store.state.currentNet._id == this.$store.state.currentAccountChainName){
            this.tokensList =  await AccountService.getTokensList();
            this.tokensList = this.tokensList.value
            this.filterByCurrentNetName()
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
        let account = this.$store.state.currentAccount
        let currentNet = this.$store.state.currentNet
        for(let token of this.tokensList){
            let balance = await AccountService.getDynamicTokenBalance(token,account.name,currentNet)
            token.balance = balance
        }
        this.tokens = this.tokensList;
        this.getLocalTokens()
    }
    async getLocalTokens(){
        let allLocalTokens = await StorageService.getLocalTolens();
        if(allLocalTokens.message == 'success' || allLocalTokens != undefined){
            if(allLocalTokens.data){
                for(let localTokens of Object.entries(allLocalTokens.data[0])){
                    this.tokens.push(localTokens[1])
                }
                this.showSpinner = false;
            }else{
                this.showSpinner = false;
            }
        }
        else{
            this.tokens = this.tokensList;
            this.showSpinner = false;
        }
    }
    goToTransferToken(){
        this.$emit('changeSelectedMenu','transferToken')
    }
    reload(){
        this.init()
    }
    remove(data:any){
        this.showRemovePopUp = true;
        this.selectedToRemove = data;
    }
    acceptAddToBlackList(){
        console.log('acceptAddToBlackList')
    }
    rejectAddToBlackList(){
        console.log('rejectAddToBlackList')
    }
}
</script>
<style lang="scss" scoped>

</style>