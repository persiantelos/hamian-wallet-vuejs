<template>
    <div class="col-12 bg-white" style="min-height:75vh " :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
      </div>
        <div v-if="!showSpinner" class="d-flex row">
            <div class="p-3" style="width:220px" v-for="(token ,index) in tokens" :key="index" >
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
                                    Transfer
                                </span>
                            </b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item href="#" @click="reload()">
                               <span :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                                    Refresh
                                </span>
                            </b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div class="avatar-xs me-3 mb-3">
                            <div class="avatar-title bg-transparent rounded">
                            <!-- <i
                                class="bx bxs-folder font-size-24 text-warning"
                            ></i> -->
                            <img :src="token.icon" style="width:24px;background:none;border-radius:50%;border:1px solid lightgray" alt="">
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="overflow-hidden me-auto">
                            <h5 class="font-size-14 text-truncate mb-1">
                                <a
                                href="javascript: void(0);"
                                class="text-body" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf !important' :''"
                                >{{token.contract}}</a
                                >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                                {{token.balance}}&#160;&#160;&#160;≈ $&#160;
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
import {Vue, Component , } from 'vue-property-decorator'
import AccountService from '@/services/accountService'
import StorageService from '@/localService/storageService'
import Spinner from '@/components/spinner/Spinner.vue'

@Component({
    components:{
        Spinner
    }
})
export default class AccountList extends Vue{
    tokens:any=[];
    tokensList:any=[];
    accInfo:any=[];
    showSpinner:boolean=true;
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
                console.log('allLocalTokens.data',allLocalTokens.data[0])
                for(let localTokens of Object.entries(allLocalTokens.data[0])){
                    this.tokens.push(localTokens[1])
                }
            }
        }
        else{
            this.showSpinner = false;
        }
    }
    goToTransferToken(){
        this.$emit('changeSelectedMenu','transferToken')
    }
    reload(){
        this.init()
    }
}
</script>
<style lang="scss" scoped>

</style>