<template>
    <div class="col-12  menue-body" :style="$store.state.layout.themeDarkMode ? 'background:#2a3042 !important':'background:#ffffff !important'">
        <div class="card-body" > 
            <div class="d-flex flex-column h-100">
              <div class="mb-4">
                    <!--
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

                      <b-dropdown-item  href="#" >
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
                    -->
                  <ul class="list-unstyled categories-list">
                    <li :class="selected == 'general' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('general')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="fas fa-globe"
                            :class="selected != 'general' ? 'text-body ont-size-16  me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">General Report</span>
                      </a>
                    </li>
                    <li :class="selected == 'particular' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('particular')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-account-box-multiple"
                            :class="selected != 'particular' ? 'text-body ont-size-16  me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Particular Report</span>
                      </a>
                    </li>
                    <li :class="selected == 'Purchased_items' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('Purchased_items')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="mdi mdi-tag-text-outline"
                            :class="selected != 'Purchased_items' ? 'text-body ont-size-16  me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Purchased items</span>
                      </a>
                    </li>
                    <li :class="selected == 'sold_item' ? $store.state.layout.themeDarkMode?'menu-selected-dark':'menu-selected-light':''" @click="selectedItem('sold_item')">
                      <a
                        href="javascript: void(0);"
                        class="text-body d-flex align-items-center"
                      >
                        <i 
                            class="fas fa-coins"
                            :class="selected != 'sold_item' ? 'text-body ont-size-16  me-2':'text-primary font-size-16 me-3'"
                        ></i>
                        <span class="me-auto" :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">Sold Item</span>
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue , Component , Prop ,Watch} from 'vue-property-decorator';

@Component({
    components:{
    }
})
export default class ReportsMenu extends Vue{
    selected:string='';
    mounted(){
        this.selectedItem('general')
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