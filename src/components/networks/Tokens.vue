<template>
    <div class="col-12">
        <div class="d-flex">
            <div v-for="(token ,index) in tokens" :key="index" >
                <div class="card m-2 shadow-none border">
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

                            <b-dropdown-item href="#">Open</b-dropdown-item>
                            <b-dropdown-item href="#">Edit</b-dropdown-item>
                            <b-dropdown-item href="#"
                                >Rename</b-dropdown-item
                            >
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item href="#"
                                >Remove</b-dropdown-item
                            >
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
                                class="text-body"
                                >{{token.contract}}</a
                                >
                            </h5>
                            <p class="text-muted text-truncate mb-0">
                             {{token.val[token._id]}} {{token.currency}}
                            </p>
                            </div>
                            <!-- <div class="align-self-end ms-2">
                            <p class="text-muted mb-0">Chain : {{token.chain}}</p>
                            </div> -->
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
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import AccountService from '@/services/accountService'
import StorageService from '@/localService/storageService'
@Component({
    components:{}
})
export default class AccountList extends Vue{
    // @Prop({default:() =>{return []}}) value:any;
    tokens:any=[];
    currentNet:any=[];
    tokensList:any=[];
    accountName:any=[];
    accInfo:any=[];
    mounted(){
        this.init();
        this.currentNet = this.$store.state.currentNet;
    }
    async init(){
        this.tokensList =  await AccountService.getTokensList();
        this.tokensList = this.tokensList.value
        this.currentNet = this.$store.state.currentNet;
        this.accountName = await StorageService.getSelectedAccount(this.currentNet.chainId)
        this.accountName = this.accountName.message
        this.accInfo =  await AccountService.getAccountInfo(this.accountName);
        this.accInfo = this.accInfo.value
        this.setTokens()
    }
    setTokens(){
        let newarr = []
        for(let token of this.tokensList){
            if(this.currentNet._id == token.chain)
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
        this.tokens = newarr
    }
}
</script>