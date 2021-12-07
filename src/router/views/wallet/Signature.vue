
<template>
  <Layout>
    <!-- {{data}} -->
    <div v-if="spinner">
      <Spinner v-model="spinner" />
    </div>
    <div v-if="!spinner" class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Transaction Sign !</h5>
                  <p>By approving you will wign the following contract</p>
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
                  <span class="avatar-title rounded-circle bg-light">
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
                            <h3 v-if="transactions[0] == 'transfer'">
                                <span class="text-primary">Transfer</span>
                            </h3>
                            <h3 v-if="transactions[0] == 'buyram'">
                                <span class="text-primary">Buy RAM</span>
                            </h3>
                            
                            <h5 class="text-primary">via {{data.payloadOrigin}}</h5>
                        </div>
                        
                        
                    </b-tab>
                    <b-tab title="Details" align="left"  :active="whiteList">
                        <h5 class="text-mute font-size-14"> By approving you will wign the following contract</h5>
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
                                                <span class="text-body"> From : </span>
                                                {{transactions[0].data.from}} <br />
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
                                                <span class="text-body"> Quantity : </span>
                                                {{transactions[0].data.quantity}} <br />
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
                                                    <span class="text-body"> To : </span>
                                                    {{transactions[0].data.to}} <br />
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
                        <p v-show="!whiteList" class="text-body px-2 my-2 ">
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
                    <b-button @click="reject" variant="outline-secondary" class="btn-block my-2">Reject</b-button>
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
      console.log('--------------',data);
        this.data=data 
        this.transactions=data.payload.transactionData;
        console.log(this.transactions)
        this.spinner = false
        
    }
    mounted() {  
      console.log('Loaded');
      
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
</style>
