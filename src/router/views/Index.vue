
<template>
  <Layout>
    
  </Layout>
</template>

<script lang="ts">
import Layout from "../layouts/main";
import { Component, Prop, Vue ,Watch} from 'vue-property-decorator'; 
import CommonService from '@/services/commonService'
import WalletService from '@/localService/walletService'
import NetworkModel from '@/models/networkModel';
import StorageAccountModel from '@/models/storage/accountModel'; 
import AccountService from '@/services/accountService';

@Component({ 
  components:{
    Layout,

  }
})
export default class Home extends Vue{
  myAccounts:StorageAccountModel[]=[];
  nets:NetworkModel[]=[]; 
  selectedNet:NetworkModel;
  showNewAccount:boolean=false;
  account:StorageAccountModel=new StorageAccountModel();
  findAccounts:StorageAccountModel[]=[];
  selectName:StorageAccountModel=new StorageAccountModel();
  mounted() {
    this.init()
  }
  async init()
  {
    this.nets = await CommonService.getNetworks();
    this.$store.state.blockchain = this.nets;;
    this.reload()
  }
  async reload()
  {
      this.myAccounts=await WalletService.getAccounts();
  }
  addNetwork(model:NetworkModel)
  {
    this.showNewAccount=true; 
    this.selectedNet=model;
    this.account=new StorageAccountModel();
    this.account.chainId=model.chainId;
    this.account.blockchain=model.type;  
  }
  async checkNetwork()
  {
    var dt =await WalletService.existData(this.selectedNet.type,this.account.privateKey,this.selectedNet.history)
    console.log('>>>>>>>>>>>>>>>',dt)
    if(dt.account_names)
    {
        for(var a of dt.account_names)
        {
            var acc=await AccountService.getAccount(a,this.selectedNet.history);
            var x=new StorageAccountModel();
            x.name=a;
            x.authority=acc.permissions.filter(p=>p.key==dt.publicKey)[0].authority
            this.findAccounts.push(x)// =;
        }
    }
    console.log(dt)
  }
  async save()
  {
      this.account.name=this.selectName.name;
      this.account.authority=this.selectName.authority; 
      console.log('dddddddd',this.account)
      var dt =await WalletService.addAccount(this.account);
      console.log('dddddddd',dt)
      this.reload()
  }
}

</script>
