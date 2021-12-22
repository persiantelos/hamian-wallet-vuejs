<template>
    <Layout>
        <div class="col-12 background-network row" :class="$store.state.layout.themeDarkMode ? 'bg-dark-mode':'light-mode'">
            <div class="col-3 py-3" style="padding:0px 5px 0px 5px">
                <NetworksMenu v-if="$route.params.chainId"
                @selectedItem="selectedItemChanged" :changeSelectedMenu="selectedItem" />
            </div>   
            <div class="col-9 py-3">
                <NetworksContent @changeSelectedMenu="selectedItemChanged" v-model="selectedItem" />
            </div>   
        </div>
    </Layout>
</template>
<script lang="ts">
import {Vue , Component,Watch} from 'vue-property-decorator';
import NetworksMenu from '@/components/networks/NetworksMenu.vue'
import NetworksContent from '@/components/networks/NetworksContent.vue'
import Layout from "../../layouts/main";
@Component({
    components:{
        NetworksMenu,
        NetworksContent,
        Layout,
    }

})
export default class Networks extends Vue{
   selectedItem:any=[];
  selectedItemChanged(data:any){
    this.selectedItem = data;
  }
 
  @Watch('$route.params.chainId')
  chainIdchanged(newVal:any){
      this.selectedItem=[];
      setTimeout(() => {
          this.selectedItem='accountList';
      }, 10);

  }
}
</script>
<style scoped>
.background-network{
    background:#f8f8fb;
}
/* #2a3042 */
.bg-dark-mode{
    background: #232837 !important;
}
.light-mode{
  background: #ffffff !important;
}
</style>