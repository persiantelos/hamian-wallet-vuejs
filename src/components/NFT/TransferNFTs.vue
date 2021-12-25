<template>
    <div class="dark-mode" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
        
        <notifications style="margin-top:20px" group="accountexist" />
        <b-modal class="dark-mode" title="Transfer NFT" style="background:red !important" centered v-model="value" >
            <div v-if="showSpinner">
                <Spinner v-model="showSpinner" />
            </div>
            <div  v-if="!showSpinner">
                <div class="col-12 px-1 mt-3" dir="ltr" >
                    <h5 class="font-size-15 mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Send To : <i class="mdi mdi-information text-primary"></i></h5>
                    <b-form-input
                        id="input-3"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        v-model="sendTo"
                        placeholder="Account Name"
                        type="text"
                    ></b-form-input>
                </div> 
                <div class="col-12 px-1 mt-3" dir="ltr">
                    <h5 class="font-size-15 mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Serial Number : </h5>
                    <b-form-input
                        id="input-3"
                        :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        v-model="itemSerial"
                        placeholder="Item serial number"
                        type="text"
                    ></b-form-input>
                </div>    
            </div>
        
            <template dir="rtl" #modal-footer>
                <div dir="rtl" class="w-100 float-right">
                    <!-- <b-button class="pr-3 m-1 pl-3" v-if="!findAccounts.length && !loading"
                        variant="primary"
                        size="sm"
                        >
                        Search
                    </b-button> -->
                    
                    <Spinner v-if="loading" />
                    
                    <b-button class="pr-3 m-1 pl-3"
                        variant="success"
                        size="sm"
                        @click="send()"
                        >
                        Send
                    </b-button>
                    <b-button
                        variant="outline-secondary"
                        size="sm"
                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"
                        @click="closeModal()">
                        Close
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import WalletService from '../../localService/walletService'

import Spinner from '@/components/spinner/Spinner.vue'

@Component({
    components:{
        Spinner,
        
    }
})
export default class TransferNFTs extends Vue{
    @Prop({default:()=>{false}}) value:boolean;
    showCustomToken:boolean=false;
    showSpinner:boolean=true;
    loading:boolean=false;
    sendTo:string='';
    itemSerial:string='';
    
   
    selectNft(data:any){
        }
    mounted(){
        setTimeout(() => {
            this.showSpinner = false;
        }, 1000);
    }
    async send(){
        if(!this.sendTo){
        this.$q.notify({
            type: "negative",
            message: 'Please enter receiver account'!
        });
        return;
        }
        else{
            var res= await WalletService.reunTransaction([
                {
                    account: 'nftmrkt.code',
                    name: "transferitm",
                    data: {
                        owner: this.$store.state.currentAccount.name,
                        to: this.sendTo,
                        id: this.itemSerial,
                        memo: 'transfer ' + this.itemSerial + ' item to ' + this.sendTo + ' by ' +this.$store.state.currentAccount.name,
                    }
                }
            ],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id,
            this.$store.state.currentAccount)
            if(res){
                if(res.transaction_id){
                    this.sendTo='';
                    this.itemSerial='';
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        speed:500,
                        text: 'The item was sent successfully'
                    });
                    this.closeModal();
                }
            }
        }
    }
    closeModal(){
        this.$emit('close')
    }
    @Watch('value')
    valueChanged(newVal:any){
        newVal == false?
        this.closeModal() : '';
    }
}
</script>
<style >
.modal-header {
    border-bottom: 1px solid #232837 !important;
}
.modal-footer {
    border-top: 1px solid #232837 !important;
}
.modal-title {
    color:#a6b0cf !important;
}
.modal-header .close, .alert .close {
    color:#a6b0cf !important;
}
.modal-content{
    color:#a6b0cf !important;
}

</style>