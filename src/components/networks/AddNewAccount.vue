<template>
    <div :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
    <notifications style="margin-top:20px" group="accountexist" />

        <b-modal :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" title="Add Account" centered v-model="value" >
            <p v-if="!findAccounts.length" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >Enter your private key to add your account!</p>
            <b-form class="p-2" @submit.prevent="checkNetwork">
              <b-form-group v-if="!findAccounts.length"
                class="mb-3"
                id="input-group-2"
                label="Private key"
                label-for="input-2"
                
              >
                <b-form-input
                  id="input-2"
                  v-model="privateKey"
                  type="text"
                  class="input-forms"
                  placeholder="Enter your private key"
                  :class="{ 'is-invalid': submitted && !account.privateKey }"
                ></b-form-input>
                <div
                  v-if="submitted && !account.privateKey"
                  class="invalid-feedback"
                >
                  Private Key is required.
                </div>
              </b-form-group>
              <div class="row left" v-if="findAccounts.length" align="left">
                <p class="card-sub-title">Select wich account you whant to add!</p>

                <div class="col-12" v-for="(acc,nameIndex) in findAccounts" align="center" :key="'name'+nameIndex">
                    <b-form-radio @click.native="setSelectedacc(acc)"  name="some-radios" > {{acc.name}}({{acc.authority}}) </b-form-radio>
                </div> 
            </div>
              
            </b-form>


            <template dir="rtl" #modal-footer>
                <div dir="rtl" class="w-100 float-right">
                    <b-button class="pr-3 m-1 pl-3" v-if="!findAccounts.length && !loading"
                        variant="primary"
                        size="sm"
                        @click="checkNetwork">
                        Search
                    </b-button>
                    
                    <Spinner v-if="!findAccounts.length && loading" />
                    
                    <b-button class="pr-3 m-1 pl-3" v-if="findAccounts.length"
                        variant="success"
                        size="sm"
                        @click="save()">
                        Add Account
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
import {Vue , Component , Prop , Watch} from "vue-property-decorator";
import StorageAccountModel from '@/models/storage/accountModel';
import NetworkModel from '@/models/networkModel';
import WalletService from '@/localService/walletService'
import AccountService from '@/services/accountService';
import Spinner from "@/components/spinner/Spinner.vue"
import StorageService from '@/localService/storageService'


@Component({components:{Spinner}})

export default class AddNewAccount extends Vue{
    @Prop({default:()=>{false}}) value:boolean;
    submitted:boolean=false;
    loading:boolean=false;
    privateKey:string='';
    selectedNet:NetworkModel;
    account:StorageAccountModel=new StorageAccountModel();
    findAccounts:StorageAccountModel[]=[];
    selectName:StorageAccountModel=new StorageAccountModel();
    setSelectedacc(acc:any){
        this.selectName = acc;
    }
    @Watch('value')
    valueChanged(newVal:any){
        newVal == false?
        this.closeModal() : '';
    }
    closeModal(){
        this.account.privateKey = '';
        this.findAccounts = [];
        this.$emit('close')
    }
  
    mounted(){
    }
    
    addNetwork(model:NetworkModel)
    {
        this.account=new StorageAccountModel();
        this.account.chainId=model.chainId;
        this.account.blockchain=model.type;  
    }
    async checkNetwork()
    {
        this.submitted = true;
        this.loading = true;
        this.selectedNet = this.$store.state.currentNet;
        this.addNetwork(this.selectedNet)
        this.account.privateKey = this.privateKey;
        this.privateKey = ''
        if(this.account.privateKey){
            try{
                var newAccount =await WalletService.existData(this.selectedNet.type,this.account.privateKey,this.selectedNet.history)
                console.log('newAccount',newAccount)
                if(newAccount.account_names)
                {
                    for(var a of newAccount.account_names)
                    {
                        var acc=await AccountService.getAccount(a,this.selectedNet.history);
                        var x=new StorageAccountModel();
                        x.name=a;
                        x.authority=acc.permissions.filter(p=>p.key==newAccount.publicKey)[0].authority
                        this.findAccounts.push(x)// =;
                    }
                    this.loading = false;
                }
            }catch{
                this.loading = false;
            }
            console.log(newAccount)
            this.loading = false;
        }
    }
    async save()
    {
        this.account.name=this.selectName.name;
        this.account.authority=this.selectName.authority; 
        var data =await WalletService.addAccount(this.account);
        if(data.message == 'Account exist'){
            this.$notify({
                group: 'accountexist',
                type: 'warn',
                // title: 'Important message',
                text: data.message
            });
        }
        else{
            this.$store.state.globalReload +=1;
            this.closeModal()
        }
    }
}
</script>
<style lang="scss">
.modal-content {
    background-color: #2a3042;
    border: 1px solid #32394e;
}
</style>