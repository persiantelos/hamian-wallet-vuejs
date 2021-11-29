<template>
    <div class="col-12  menue-body" >
        <div class="card-body">
              <div class="d-flex flex-column h-100">
                <div class="mb-4">
                  <div class="mb-3 d-grid">
                    <b-dropdown
                      toggle-class="btn-block w-100"
                      variant="light"
                    >
                      <template #button-content>
                        <i class="mdi mdi-plus me-1"></i> Account
                      </template>

                      <b-dropdown-item href="#" @click="addNewAccount()">
                        <i class="mdi mdi-account-plus me-1"></i>
                        Add Account
                    </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <ul class="list-unstyled categories-list">
                    <li :class="selected == 'accountList' ? 'menu-selected':''" @click="selectedItem('accountList')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-view-list-outline f"
                            :class="selected != 'accountList' ? 'text-body ont-size-16  me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto">Account List</span>
                      </a>
                    </li>
                    <li :class="selected == 'resources' ? 'menu-selected':''" @click="selectedItem('resources')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i
                          class="mdi mdi-source-merge "
                            :class="selected != 'resources' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto">Resources</span>
                      </a>
                    </li>
                    <li :class="selected == 'buySellRAM' ? 'menu-selected':''" @click="selectedItem('buySellRAM')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i class="mdi mdi-chip "
                            :class="selected != 'buySellRAM' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto">Buy/Sell RAM</span>
                      </a>
                    </li>
                    <li :class="selected == 'stakeCpuNet' ? 'menu-selected':''" @click="selectedItem('stakeCpuNet')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >

                        <i 
                            class="mdi mdi-cpu-64-bit  "
                            :class="selected != 'stakeCpuNet' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto">Stake CPU/NET</span>
                      </a>
                    </li>
                    <li :class="selected == 'tokens' ? 'menu-selected':''" @click="selectedItem('tokens')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i
                          class="mdi mdi-trash-can  "
                          :class="selected != 'tokens' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto">Tokens</span>
                      </a>
                    </li>
                    <li :class="selected == 'transferToken' ? 'menu-selected':''" @click="selectedItem('transferToken')"  >
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-swap-horizontal "
                            :class="selected != 'transferToken' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto">Transfer Token</span
                        ><span class="badge badge-success badge-pill ms-2"
                          >01</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
        <div>
            <AddNewAccount @close="showAddNewAccountPopUp = false" v-model="showAddNewAccountPopUp" />
        </div>
    </div>
</template>

<script lang="ts">
import {Vue , Component , Prop} from 'vue-property-decorator'
import CommonService from '@/services/commonService'

import AddNewAccount from '@/components/networks/AddNewAccount.vue'

@Component({
    components:{
        AddNewAccount,
    }
})
export default class NetworkMenu extends Vue{
    @Prop({default:() =>{return []}}) chainId:any;

    resources:any=[];
    tokenList:any=[];
    nets:any=[];
    accountInformation:any=[];
    showAddNewAccountPopUp:boolean=false;
    selected:string='';
    mounted(){
    this.getNets();
    }
    async getNets(){
    this.nets = await CommonService.getNetworks();
    }
    selectedItem(data:string){
        this.selected = data;
        this.$emit('selectedItem',data)
    }
    addNewAccount(){
    this.showAddNewAccountPopUp = true;
    }
}
</script>

<style lang="scss" scoped>
.menue-body{
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    min-height:100vh;
    background: #ffffff;
  .menue-boxs-parent{
    min-height:100vh;
  }
  .menue-internal-box{
    border-radius: 10px;
    .internal-titles{
      font-size: 16px;
    }
  }
  .menu-selected{
    // border: 1px solid gray;
    background: #f5f3f3;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  }
}
</style>