<template>
    <div>
        <div class="table-responsive">
              <table class="table table-nowrap table-centered table-hover mb-0 align-middle">
                <tbody>
                  <tr  v-for="(wallet, idx) in authenticators" :key="idx">
                    <td style="width: 45px;">
                      <div class="avatar-sm" >
                        <span
                        
                          class="avatar-title rounded-circle bg-soft bg-primary text-primary font-size-24"
                          :style="{'background-color': wallet.getStyle().background+'!important',color: wallet.getStyle().textColor}"
                        >
                          <i class="bx ">
                               <img  width="30px" :src="wallet.getStyle().icon"  />
                          </i>
                        </span>
                      </div>
                    </td>
                    <td>
                      <h5 class="font-size-14 mb-1">
                        <a href="javascript: void(0);" class="text-dark">{{wallet.getStyle().text }}</a>
                      </h5>
                      <small> <a href="javascript: void(0);" @click="login(idx)" class="btn btn-primary btn-sm">Login</a></small>
                    </td>
                    <td>
                      <div class="text-center">
                        <a href="javascript: void(0);" @click="openUrl(wallet.getOnboardingLink())" class="text-dark">
                          <i class="bx bx-download h3 m-0"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>



        <q-item v-if="false" class="row col-12 cursor-pointer" v-for="(wallet, idx) in authenticators" :key="idx" v-ripple 
            :style="{background: wallet.getStyle().background,color: wallet.getStyle().textColor}">
            <q-item-section  class="cursor-pointer col" avatar @click="onLogin(idx)">
                <q-img  width="30px" :src="wallet.getStyle().icon"  />
            </q-item-section>
            <q-item-section class="col" @click="onLogin(idx)">
                <span>
                    {{ wallet.getStyle().text }}
                </span>
            </q-item-section>
            <q-item-section class="col" avatar>
                <q-spinner v-if="loading === wallet.getStyle().text" :color="wallet.getStyle().textColor"  size="2em"/>
                <q-icon v-else :color="wallet.getStyle().textColor" 
                 name="get_app" @click="openUrl(wallet.getOnboardingLink())" target="_blank"   size="22px">
                    <q-tooltip>
                        Get app
                    </q-tooltip>
                </q-icon>    
            </q-item-section>
        </q-item>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'; 
import ual  from '@/localService/ual'
import { Authenticator } from 'universal-authenticator-library';
@Component({ 
  components:{
  }
})
export default class UALComponent extends Vue{
    showLogin:boolean= false;
    loading:string= '';
    error:boolean= false;
    authenticators:Authenticator[]=[];
    selecteIndex:number=-1;
    accountName:string='';
    mounted() {
        this.authenticators = ual.authenticators;
    }
    openUrl(url) {
      window.open(url);
    }
    async login(index):Promise<boolean>
    { 
        this.loading= this.authenticators[index].getStyle().textColor;
        try{
            const authenticator = this.authenticators[index];
            await authenticator.init();   
            const users = await authenticator.login('');
            const account = users[0];
            const accountName = await account.getAccountName();
            console.log('--->',accountName)
            
            this.$emit('onLogin', {accountName,index,account});
        }catch(exp){}
        this.loading='';
        return false
    }
    async onLogin(idx) {
      this.error = false;
      const error = await this.login(idx);
      if (!error) {
        this.showLogin = false;
      } else {
        this.error = error;
      }
    }
}
</script>
