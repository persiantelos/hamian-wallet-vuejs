<template>
    <div :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
    <notifications style="margin-top:20px" group="accountexist" />

        <b-modal :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" title="Add Token Manually" centered v-model="value" >
            
            <div class="col-12">
                <div class="col-12 d-flex">
                    <div class="col-6 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Name</p>
                        <b-form-input
                            id="input-2"
                            v-model="addToken._id"
                            type="text"
                            placeholder="Token Name"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                    </div>
                    <div class="col-6 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Contract</p>
                        <b-form-input
                            id="input-2"
                            v-model="addToken.contract"
                            type="text"
                            placeholder="Contract"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                    </div>
                </div>
                <div class="col-12 d-flex">
                    <div class="col-4 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Currancy</p>
                        <b-form-input
                            id="input-2"
                            v-model="addToken.currancy"
                            type="text"
                            placeholder="Currancy"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                    </div>
                    <div class="col-4 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Decimals</p>
                        <b-form-input
                            id="input-2"
                            v-model="addToken.decimals"
                            type="number"
                            placeholder="Decimals"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                    </div>
                    <div class="col-4 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Chain</p>
                        <b-form-input
                            id="input-2"
                            v-model="addToken.chain"
                            type="text"
                            disabled
                            style="cursor: no-drop"
                            placeholder="Chain"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                    </div>
                </div>
                <div class="col-12">
                    <div v-if="addToken.icon == ''" class="col-12 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Icon </p>
                        <div class="col-12 " @click="upload" style="cursor:pointer" align="center" >
                            <vue-dropzone 
                                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"
                                id="dropzone"
                                ref="myVueDropzone"
                                :use-custom-slot="true"
                                >
                            <div class="dropzone-custom-content">
                                <i :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" class="display-4 text-muted bx bxs-cloud-upload"></i>
                                <h4 :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                                    Drop files here or click to upload.</h4>
                            </div>
                            </vue-dropzone>
                        </div>
                    </div>
                    <div class="col-12 p-1" v-if="addToken.icon != ''">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Icon </p>
                        <div class="d-flex">
                            <b-form-input
                                id="input-2"
                                v-model="iconName"
                                type="text"
                                @click="upload"
                                placeholder="Chain"
                                :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                            >
                            </b-form-input>
                        </div>
                    </div>
                </div>
            </div>
            <template dir="rtl" #modal-footer>
                <div dir="rtl" class="w-100 float-right">
                    <!-- <Spinner v-if="!findAccounts.length && loading" /> -->
                    <b-button class="pr-3 m-1 pl-3" 
                        variant="success"
                        size="sm"
                        @click="save()">
                        Add Token
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
            <div style="display:none">
                <input id="image-file" type="file" @change="fileSelected" />
                {{counter}}
            </div>
        </b-modal>
    </div>
</template>
<script lang="ts">
import {Vue , Component , Prop , Watch} from "vue-property-decorator";
import StorageAccountModel from '@/models/storage/accountModel';
import NetworkModel from '@/models/networkModel';
import WalletService from '@/localService/walletService'
import AccountService from '@/services/accountService';
// import Spinner from "@/components/spinner/Spinner.vue"
import StorageService from '@/localService/storageService'
import AddToken from '@/models/token/addTokenModel';
import vue2Dropzone from "vue2-dropzone";


@Component({components:{
    vueDropzone: vue2Dropzone
    // Spinner
    }})

export default class AddNewAccount extends Vue{
    @Prop({default:()=>{false}}) value:boolean;
    addToken:AddToken=new AddToken();
    iconName:string=''
    dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
    }
    @Watch('value')
    valueChanged(newVal:any){
        console.log('newVal',newVal)
        if(newVal == false){
            this.closeModal()
        }
    }
    mounted(){
        this.addToken.chain = this.$store.state.currentNet._id;
    }
    upload()
    {
        this.addToken.icon = '';
        var el =document.getElementById("image-file");
        if(el)
        {
            el.click()
        }
    } 
    async fileSelected()
    {
        var el:any =document.getElementById("image-file");
        this.addToken.icon = el.files[0];
        this.iconName = this.addToken.icon.name
    }

    save(){
        console.log('save')
    }
    closeModal(){
        this.$emit('close')
    }
    
}
</script>
<style lang="scss">
.modal-content {
    background-color: #2a3042;
    border: 1px solid #32394e;
}
</style>