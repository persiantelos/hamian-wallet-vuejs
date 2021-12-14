<template>
    <div class="col-12  menue-body" :style="$store.state.layout.themeDarkMode ? 'background:#2a3042 !important':'background:#ffffff !important'">
        <div class="card-body" > 
              <div class="d-flex flex-column h-100">
                <div class="mb-4">
                  <div class="mb-3 d-grid"
                      :class="$store.state.layout.themeDarkMode ? 'border-gray':''"
                  >
                      <!-- :style="$store.state.layout.themeDarkMode ? 'background:#32394e !important':''" -->
                    <b-dropdown 
                      :variant="$store.state.layout.themeDarkMode ? '#32394e':'light'"
                      toggle-class="btn-block w-100"
                    >
                      <template #button-content>
                        <i class="mdi mdi-plus me-1" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''"></i> 
                        <span :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">
                        Account
                        </span>
                      </template>

                      <b-dropdown-item  href="#" @click="addNewAccount()">
                        <i class="mdi mdi-account-plus me-1"
                        :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"
                        ></i>
                        <span
                        :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"
                        >
                        Add Account
                        </span>
                      </b-dropdown-item>
                      <b-dropdown-item @click="addTokenManually()"  href="#" >
                        <i class="bx bx-buoy me-1"
                        :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"
                        ></i>
                        <span
                        :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"
                        >
                        <!-- Add token manually -->
                        Add token 
                        </span>
                    </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <ul class="list-unstyled categories-list">
                    <li :class="selected == 'accountList' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('accountList')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-view-list-outline f"
                            :class="selected != 'accountList' ? 'text-body ont-size-16  me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Account List</span>
                      </a>
                    </li>
                    <li :class="selected == 'resources' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('resources')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i
                          class="mdi mdi-source-merge "
                            :class="selected != 'resources' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Resources</span>
                      </a>
                    </li>
                    <li :class="selected == 'buySellRAM' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('buySellRAM')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i class="mdi mdi-chip "
                            :class="selected != 'buySellRAM' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Buy/Sell RAM</span>
                      </a>
                    </li>
                    <li :class="selected == 'stakeCpuNet' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('stakeCpuNet')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >

                        <i 
                            class="mdi mdi-cpu-64-bit  "
                            :class="selected != 'stakeCpuNet' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Stake CPU/NET</span>
                      </a>
                    </li>
                    <li :class="selected == 'tokens' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('tokens')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i
                          class="bx bx-buoy  "
                          :class="selected != 'tokens' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Tokens</span>
                      </a>
                    </li>
                    <li :class="selected == 'transferToken' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('transferToken')"  >
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-swap-horizontal "
                            :class="selected != 'transferToken' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Transfer Token</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
        <div v-if="showAddNewAccountPopUp">
            <AddNewAccount @close="showAddNewAccountPopUp = false" v-model="showAddNewAccountPopUp" />
        </div>
        <div v-if="addNewToken">
          <AddTokenManually @close="addNewToken = false" v-model="addNewToken" />
        </div>
    </div>
</template>

<script lang="ts">
import {Vue , Component , Prop ,Watch} from 'vue-property-decorator'
import CommonService from '@/services/commonService'

import AddNewAccount from '@/components/networks/AddNewAccount.vue'
import AddTokenManually from '@/components/networks/AddTokenManually.vue'

@Component({
    components:{
        AddNewAccount,
        AddTokenManually,
    }
})
export default class NetworkMenu extends Vue{
  @Prop({default:()=>{return ''}}) changeSelectedMenu:any;
    resources:any=[];
    tokenList:any=[];
    nets:any=[];
    accountInformation:any=[];
    showAddNewAccountPopUp:boolean=false;
    addNewToken:boolean=false;
    selected:string='';
    @Watch('changeSelectedMenu')
    selectedMenuChanged(newVal:any){
      this.selectedItem(newVal)
    }
    mounted(){
    this.getNets();
    }
    async getNets(){
    this.nets = await CommonService.getNetworks();
    this.selectedItem('accountList')
    }
    selectedItem(data:string){
        this.selected = data;
        this.$emit('selectedItem',data)
    }
    addNewAccount(){
    this.showAddNewAccountPopUp = true;
    }
    addTokenManually(){
      this.addNewToken = true;
    }
}
</script>

<style lang="scss" scoped>
.menue-body{
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    // min-height:75vh;
    min-height:100%;
    background: #ffffff;
  .menue-boxs-parent{
    // min-height:100vh;
  }
  .menue-internal-box{
    border-radius: 10px;
    .internal-titles{
      font-size: 16px;
    }
  }
  .menu-selected-dark{
    background:#32394e;
  }
  .menu-selected-light{
    // border: 1px solid gray;
    background: #f5f3f3;
    // box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  }
  .dark-mode{
    background: #262b3c !important;
  }
  .light-mode{
      background: #ffffff !important;
  }
  .border-gray{
    border: 1px solid #32394e;
    border-radius: 5px;
    background:#2a3042 !important 
  }
}
</style>