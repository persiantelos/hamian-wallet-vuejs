<template>
    <div class="col-12 bg-white" style="min-height:75vh " :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        <div v-if="showSpinner">
          <Spinner  v-model="showSpinner" />
      </div>
        <div v-if="!showSpinner" class="d-flex">
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

                            <b-dropdown-item href="#" @click="goToTransferToken()">Transfer</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item href="#" @click="reload()">Refresh</b-dropdown-item>
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
                             {{token.val[token._id]}} {{token.currency}}
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
            this.accInfo =  await AccountService.getAccountInfo(this.$store.state.currentAccount.name);
            this.accInfo = this.accInfo.value
            this.setTokens()
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
    setTokens(){
        let newarr = []
        for(let token of this.tokensList){
            if(this.$store.state.currentNet._id == token.chain)
            {
                for(let item of this.accInfo){
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
        this.tokens = newarr;
        this.showSpinner = false;
    }
    goToTransferToken(){
        this.$emit('changeSelectedMenu','transferToken')
    }
    reload(){
        this.init()
    }
}
</script>