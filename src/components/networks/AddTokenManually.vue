<template>
    <div :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
    <notifications style="margin-top:20px" group="accountexist" />
        
        <b-modal :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" title="Add Token Manually" centered v-model="value" >
            
            <div class="col-12">
                <div class="col-12 d-flex">
                    <div class="col-6 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Name <span v-if="validate" class="text-danger">*</span></p>
                        <b-form-input
                            id="input-2"
                            v-model="addToken._id"
                            type="text"
                            placeholder="Token Name"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                    </div>
                    <div class="col-6 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Contract <span v-if="contractValidate" class="text-danger">*</span></p>
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
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Currancy <span v-if="validate" class="text-danger">*</span></p>
                        <b-form-input
                            id="input-2"
                            v-model="addToken.currancy"
                            type="text"
                            placeholder="Currancy"
                            :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                        ></b-form-input>
                    </div>
                    <div class="col-4 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Decimals <span v-if="validate" class="text-danger">*</span></p>
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
                        <b-dropdown variant="outline-secondary "   style="min-width:100%">
                            <template v-slot:button-content>
                                {{addToken.chain}}
                                <i class="mdi mdi-chevron-down"></i>
                            </template>
                            <div align="left"  v-for="(blockchain , index) in $store.state.blockchain" :key="index">
                                <b-dropdown-item align="left" @click="onItemClick(blockchain)" href="javascript: void(0);">
                                    <span
                                    :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                                    {{blockchain.name}}
                                    </span>
                                </b-dropdown-item>
                            </div>
                        </b-dropdown>
                    </div>
                </div>
                <!-- TODO:icons is not displaing on tokens page -->
                <!-- <div class="col-12">
                    <div v-if="addToken.icon == ''" class="col-12 p-1">
                        <p class="font-size-15 mb-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">Icon </p>
                        <div class="col-12 " @click="upload" style="cursor:pointer" align="center" >
                            <div style="border:1px dashed #626981;border-radius:5px" class="p-3"
                                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"
                                id="dropzone"
                                ref="myVueDropzone"
                                >
                            <div class="dropzone-custom-content">
                                <i :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" class="display-4 text-muted bx bxs-cloud-upload"></i>
                                <h4 :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                                    Click to upload</h4>
                            </div>
                            </div>
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
                </div> -->
            </div>
            <template dir="rtl" #modal-footer>
                <div dir="rtl" class="w-100 float-right">
                    <div v-if="showSpinner">
                        <Spinner v-if="showSpinner" />
                    </div>
                    <b-button class="pr-3 m-1 pl-3" 
                        variant="success"
                        size="sm"
                        @click="getTokenBalanceByContractName()">
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
            </div>
        </b-modal>
    </div>
</template>
<script lang="ts">
import {Vue , Component , Prop , Watch} from "vue-property-decorator";
import Spinner from "@/components/spinner/Spinner.vue"
import StorageService from '@/localService/storageService'
import AddToken from '@/models/token/addTokenModel';
import AccountService from '@/services/accountService'

// import vue2Dropzone from "vue2-dropzone";


@Component({components:{
    // vueDropzone: vue2Dropzone,
    Spinner
    }})

export default class AddNewAccount extends Vue{
    @Prop({default:()=>{false}}) value:boolean;
    addToken:AddToken=new AddToken();
    iconName:string=''
    showSpinner:boolean=false;
    contractValidate:boolean=false;
    validate:boolean=false;
    dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
    }
    @Watch('value')
    valueChanged(newVal:any){
        if(newVal == false){
            this.closeModal()
        }
    }
    @Watch('addToken.decimals')
    decimalsChanged(newVal:any){
        console.log(this.addToken.decimals)
        if(typeof newVal == 'number'){
            this.addToken.decimals=0
        }
    }
    mounted(){
        this.addToken.chain = this.$store.state.currentNet._id;
    }
    onItemClick(data:any){
        this.addToken.chain = data.name
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
        this.iconName = el.files[0].name
        this.addToken.icon = el.files[0].path;
    }
    async getTokenBalanceByContractName(){
        if(this.addToken.contract != ''){
            var chain = []
            for(let net of this.$store.state.blockchain){
                if(net._id == this.addToken.chain){
                    chain = net;
                }
            }
            let balance = await AccountService.getDynamicTokenBalance(this.addToken,this.addToken._id,chain)
            if(balance){
                this.save()
                this.decimalsChanged('a')
                this.contractValidate = false;
            }
            else{
                this.$notify({
                    group: 'foo',
                    type: 'warn',
                    text: 'Contract is not valid'
                });
                this.contractValidate = true;
            }
        }
        else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                text: 'Contract is not valid'
            });
            this.contractValidate = true;
        }
    }
    async save(){
        if(this.addToken._id != '' && this.addToken.currancy != '' && this.addToken.decimals != '' && this.addToken.chain != ''){
            this.showSpinner = true
            let data = await StorageService.addTokenManually(this.addToken)
            if(data){
                this.$store.state.globalReload +=1;
                this.$notify({
                    group: 'foo',
                    type: 'info',
                    title: 'Token saved',
                    text: data.data
                });
                setTimeout(() => {
                    this.showSpinner = false
                    this.closeModal()
                }, 500);
            }
        }
        else{
            this.$notify({
                group: 'foo',
                type: 'warn',
                // title: 'Some fields are empty!',
                text: 'Please fill in all the required fields'
            });
            this.validate = true;
        }
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