
<template>
  <Layout>
    <!-- {{data}} -->
    <div v-if="spinner">
      <Spinner v-model="spinner" />
    </div>
    <div v-if="!spinner" class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden"
        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Transaction Sign !</h5>
                  <p>By approving you will allowing the following contract</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                  src="@/assets/images/profile-img.png"
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="#" >
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle "
                  :class="$store.state.layout.themeDarkMode ? 'background-dark-mode-melo':'bg-light'">
                    <img src="@/assets/picture/hamian.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>
            
            <b-form  @submit.prevent="accept">
              <div>
                <b-tabs 
                    class="box"
                    active-nav-item-class="font-weight-bold text-uppercase text-primary"
                    active-tab-class="font-weight-bold text-secondary"
                    content-class="mt-3" >
                    <b-tab title="Overview" align="left"  active>
                        <div  class="col-12 row" align="center">
                            <h3 v-if="transactions[0].name == 'transfer'">
                                <span class="text-primary">Transfer</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'buyram'">
                                <span class="text-primary">Buy RAM</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'sellram'">
                                <span class="text-primary">Sell RAM</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'delegatebw'">
                                <span class="text-primary">Stake CPU/NET</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'undelegatebw'">
                                <span class="text-primary">UNStake CPU/NET</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'transferitm'">
                                <span class="text-primary">Transfer Item</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'likeitem'">
                                <span class="text-primary">Like Item</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'likecollc'">
                                <span class="text-primary">Like Collection</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'likeset'">
                                <span class="text-primary">Like Set</span>
                            </h3>
                            <h3 v-if="transactions[0].name == 'follow'">
                                <span class="text-primary">Follow</span>
                            </h3>
                            
                            <h5 class="text-primary">via {{data.payloadOrigin}}</h5>
                        </div>
                        
                        
                    </b-tab>
                    <b-tab title="Details" align="left"  :active="whiteList">
                        <h5 class="text-mute font-size-14" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"> By approving you will wign the following contract</h5>
                        <div class="col-12">
                            <h3 v-if="data.type == 'requestSignature'">
                                <span class="text-danger font-size-14">{{transactions[0].account}}</span><br />
                                <span class="text-danger">{{transactions[0].name}}</span>
                            </h3>
                        </div>
                        <div class="row my-4">
                            <div v-if="transactions[0].data" class="col-12" align="left">
                                <address align="left" >
                                    <div class="col-12 row d-flex">
                                        <div class="col-1" v-show="whiteList">
                                            <b-form-checkbox
                                                id="checkbox-1"
                                                v-model="whiteList"
                                                name="checkbox-1"
                                                :value="true"
                                                :unchecked-value="false"
                                                >
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-11">
                                            <strong style="position:relative" class=" col-11">
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'transfer'"> From : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'buyram'"> Payer : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'sellram'"> Account : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'delegatebw'"> From : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'undelegatebw'"> From : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'transferitm'"> owner : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'likeitem'"> Account : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'likecollc'"> Account : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'likeset'"> Account : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'follow'"> Follower : </span>
                                                <p v-if="transactions[0].name == 'transfer'">{{transactions[0].data.from}} <br /></p>
                                                <p v-if="transactions[0].name == 'buyram'">{{transactions[0].data.payer}} <br /></p>
                                                <p v-if="transactions[0].name == 'sellram'">{{transactions[0].data.account}} <br /></p>
                                                <p v-if="transactions[0].name == 'delegatebw'">{{transactions[0].data.from}} <br /></p>
                                                <p v-if="transactions[0].name == 'undelegatebw'">{{transactions[0].data.from}} <br /></p>
                                                <p v-if="transactions[0].name == 'transferitm'">{{transactions[0].data.account}} <br /></p>
                                                <p v-if="transactions[0].name == 'likeitem'">{{transactions[0].data.account}} <br /></p>
                                                <p v-if="transactions[0].name == 'likecollc'">{{transactions[0].data.account}} <br /></p>
                                                <p v-if="transactions[0].name == 'likeset'">{{transactions[0].data.account}} <br /></p>
                                                <p v-if="transactions[0].name == 'follow'">{{transactions[0].data.follower}} <br /></p>
                                            </strong>
                                        </div>
                                    </div>
                                    <div class="col-12 row d-flex">
                                        <div class="col-1" v-show="whiteList">
                                            <b-form-checkbox
                                                id="checkbox-1"
                                                v-model="whiteList"
                                                name="checkbox-1"
                                                :value="true"
                                                :unchecked-value="false"
                                                >
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-11">
                                            <strong style="position:relative" class="col-11">
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'transfer'"> Quantity : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'buyram'"> Quant : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'sellram'"> Bytes : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'transferitm'"> Serial Number : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'likeitem'"> Serial Number : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'likecollc'"> Collection Id : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'likeset'"> Set Id : </span>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'follow'"> Following : </span>
                                                <p v-if="transactions[0].name == 'transfer'" >{{transactions[0].data.quantity}} <br /></p>
                                                <p v-if="transactions[0].name == 'buyram'" >{{transactions[0].data.quant}} <br /></p>
                                                <p v-if="transactions[0].name == 'sellram'" >{{transactions[0].data.bytes}} <br /></p>
                                                <p v-if="transactions[0].name == 'transferitm'" >{{transactions[0].data.id}} <br /></p>
                                                <p v-if="transactions[0].name == 'likeitem'" >{{transactions[0].data.item_serial}} <br /></p>
                                                <p v-if="transactions[0].name == 'likecollc'" >{{transactions[0].data.collection_id}} <br /></p>
                                                <p v-if="transactions[0].name == 'likeset'" >{{transactions[0].data.set_id}} <br /></p>
                                                <p v-if="transactions[0].name == 'follow'" >{{transactions[0].data.following}} <br /></p>
                                            </strong> 
                                            <strong v-if="transactions[0].name == 'delegatebw'" style="position:relative" class="col-11">
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" > Stake CPU Quantity : </span>
                                                <p >{{transactions[0].data.stake_cpu_quantity}} <br /></p>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"> Stake NET Quantity : </span>
                                                <p >{{transactions[0].data.stake_net_quantity}} <br /></p>
                                            </strong> 
                                            <strong v-if="transactions[0].name == 'undelegatebw'" style="position:relative" class="col-11">
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" > UNStake CPU Quantity : </span>
                                                <p >{{transactions[0].data.unstake_cpu_quantity}} <br /></p>
                                                <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"> UNStake NET Quantity : </span>
                                                <p >{{transactions[0].data.unstake_net_quantity}} <br /></p>
                                            </strong> 

                                        </div>
                                    </div>
                                    <div class="col-12 row d-flex">
                                        <div class="col-1" v-show="whiteList">
                                            <b-form-checkbox
                                                id="checkbox-1"
                                                v-model="whiteList"
                                                name="checkbox-1"
                                                :value="true"
                                                :unchecked-value="false"
                                                >
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-11">
                                            <strong style="position:relative" class="col-11">
                                                    <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'transfer'"> To : </span>
                                                    <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'buyram'"> Receiver : </span>
                                                    <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'delegatebw'"> Receiver : </span>
                                                    <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'undelegatebw'"> Receiver : </span>
                                                    <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'transferitm'"> To : </span>
                                                    <span class="text-body" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" v-if="transactions[0].name == 'transferitm'"> To : </span>
                                                    <p v-if="transactions[0].name == 'transfer'" >{{transactions[0].data.to}} <br /></p>
                                                    <p v-if="transactions[0].name == 'buyram'" >{{transactions[0].data.receiver}} <br /></p>
                                                    <p v-if="transactions[0].name == 'delegatebw'" >{{transactions[0].data.receiver}} <br /></p>
                                                    <p v-if="transactions[0].name == 'undelegatebw'" >{{transactions[0].data.receiver}} <br /></p>
                                                    <p v-if="transactions[0].name == 'transferitm'" >{{transactions[0].data.to}} <br /></p>
                                            </strong>
                                        </div>
                                        <div class="col-11" v-if="transactions[0].name == 'delegatebw'">
                                            <strong  style="position:relative" class="col-11">
                                                    <span class="text-body" > Transfer : </span>
                                                    <p v-if="transactions[0].data.transfer">{{transactions[0].data.transfer}} <br /></p>
                                                    <p v-if="!transactions[0].data.transfer"> No Data <br /></p>
                                            </strong>
                                        </div>
                                    </div>
                                </address>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
                <div class="col-12 row" align="left">
                    <div class="row col-12">
                    <b-form-checkbox
                            id="checkbox-1"
                            v-model="whiteList"
                            name="checkbox-1"
                            :value="true"
                            :unchecked-value="false"
                        >
                        <p v-show="!whiteList" class="text-body px-2 my-2 "
                        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                            Do you want to <b class="text-mute">whitelist</b> this?
                        </p>
                        <p v-show="whiteList" class="text-body px-2 my-2 ">
                            You have <b class="text-mute">enabled</b> whitelisting
                        </p>
                        </b-form-checkbox>
                        <p v-show="!whiteList" class="text-grey">
                            Whitelisting auto-signs identical contracts without having to re-approve.
                        </p>
                        <p v-show="whiteList" class="text-grey">
                            Any checked field can change, unchecked field changes will require reapproval.
                        </p>
                    </div>
                </div>
                <div class="mt-5 d-grid">
                    <b-button v-if="!btnSpinner" @click="accept" variant="primary" class="btn-block">Accept</b-button>
                     <div v-if="btnSpinner" class="p-1 my-1 w-100" style="border:1px solid #556ee6;border-radius:5px" align="center"  >
                      <b-spinner   class="m-0" variant="primary" role="status" ></b-spinner>
                    </div>
                    <b-button @click="reject" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"  variant="outline-secondary" class="btn-block my-2">Reject</b-button>
                </div>
              </div>
            </b-form>
          </div>
          
          <!-- end card-body -->
        </div>
        <!-- end card -->

        
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<script lang="ts">
import Layout from "../../layouts/auth";
import Spinner from "@/components/spinner/Spinner.vue";
import {Vue , Component} from "vue-property-decorator"

import SocketService from "@/localService/socketService";
import RequestTypes from '@/models/local/RequestTypes'
import StorageAccountModel from "@/models/storage/accountModel";
import WalletService from "@/localService/walletService";
import TransactionRequest from '@/models/local/transactionRequest'; 
import StorageService from "../../../localService/storageService";

@Component({
    components:{
    Layout,
    Spinner
    }
})
export default class LocalLogin extends Vue{
    data:any={};
    selectedAccount:StorageAccountModel=new StorageAccountModel();
    counter:number=0;
    transactions:TransactionRequest[]=[];
    whiteList:boolean=false;
    spinner:boolean=true;
    btnSpinner:boolean=false;

    requestSignature(data:any)
    {
        this.data=data 
        console.log('this.data',this.data)
        this.transactions=data.payload.transactionData;
        this.spinner = false
        
    }
    mounted() {  
      StorageService.getPayload()
      
        SocketService.addEvent(RequestTypes.requestSignature,this.requestSignature); 
    }

    async accept()
    { 
      this.btnSpinner = true;
      await WalletService.acceptTransaction(this.data.id);
      this.btnSpinner = false;
      this.$notify({
          group: 'foo',
          type: 'success',
          title: this.data.payloadOrigin,
          text: 'Transaction completed successfully'
      });
      setTimeout(() => {
        window.close();
      }, 1400);
    }
    async reject()
    {
      await WalletService.rejectTransaction(this.data.id);
      this.$notify({
          group: 'foo',
          type: 'warn',
          title: this.data.payloadOrigin,
          text: 'The transaction failed'
      });
      setTimeout(() => {
        window.close();
      }, 1400); 
    }
}
</script>

<style>
.dropdown-menu{
 width: 100%;   
 text-align: center;
}    
.pointer{
  cursor: pointer;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #495057;
    background-color: #2a3042;
    border-color: #495057 #495057 #495057;
}
.nav-tabs {
    border-bottom: 1px solid #495057 !important;
}

</style>
