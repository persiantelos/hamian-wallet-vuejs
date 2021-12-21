<template>
    <div class="col-12  menue-body" :style="$store.state.layout.themeDarkMode ? 'background:#2a3042 !important':'background:#ffffff !important'">
        <div class="card-body" > 
            <div class="d-flex flex-column h-100">
            <div class="mb-4">
                <div class="mb-3 d-grid"
                    :class="$store.state.layout.themeDarkMode ? 'border-gray':''">
                    <b-dropdown 
                      :variant="$store.state.layout.themeDarkMode ? '#32394e':'light'"
                      toggle-class="btn-block w-100"
                    >
                      <template #button-content>
                        <i class="mdi mdi-plus me-1" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''"></i> 
                        <span :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">
                        Actions
                        </span>
                      </template>

                      <b-dropdown-item  href="#" @click="TransferNFT()">
                        <i class="mdi mdi-swap-horizontal me-1"
                        :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"
                        ></i>
                        <span
                        :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"
                        >
                        Transfer NFT
                        </span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <ul class="list-unstyled categories-list">
                    <li :class="selected == 'NFTs' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('NFTs')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-view-list-outline f"
                            :class="selected != 'NFTs' ? 'text-body ont-size-16  me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">NFTs</span>
                      </a>
                    </li>
                    <li :class="selected == 'Sets' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Sets')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i
                          class="mdi mdi-set-merge "
                            :class="selected != 'Sets' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Sets</span>
                      </a>
                    </li>
                    <li :class="selected == 'Collections' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Collections')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i class="mdi mdi-receipt "
                            :class="selected != 'Collections' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Collections</span>
                      </a>
                    </li>
                    <li :class="selected == 'Bookmarks' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Bookmarks')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i class="mdi mdi-bookmark-multiple-outline "
                            :class="selected != 'Bookmarks' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Bookmarks</span>
                      </a>
                    </li>
                    <li :class="selected == 'Following' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Following')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >

                        <i 
                            class="bx bx-user-check   "
                            :class="selected != 'Following' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Following</span>
                      </a>
                    </li>
                    <li :class="selected == 'Followers' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Followers')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i
                          class="bx bx-user-plus  "
                          :class="selected != 'Followers' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Followers</span>
                      </a>
                    </li>
                    <li :class="selected == 'Submitted_Offers' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Submitted_Offers')"  >
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-call-made "
                            :class="selected != 'Submitted_Offers' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Submitted Offers</span
                        >
                      </a>
                    </li>
                    <li :class="selected == 'Incoming_Offers' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Incoming_Offers')"  >
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-call-received "
                            :class="selected != 'Incoming_Offers' ? 'text-body font-size-16 me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Incoming Offers</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
    </div>
</template>

<script lang="ts">
import {Vue , Component , Prop ,Watch} from 'vue-property-decorator'

@Component({
    components:{
    }
})
export default class NetworkMenu extends Vue{
    selected:string='';
    mounted(){
        this.selectedItem('NFTs')
    }
    selectedItem(data:string){
        this.selected = data;
        this.$emit('selectedItem',data)
    }
}
</script>

<style lang="scss" scoped>
.menue-body{
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    // min-height:75vh;
    min-height:100% !important;
    background: #ffffff;
  // .menue-boxs-parent{
    // min-height:100vh;
  // }
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