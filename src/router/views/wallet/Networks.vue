<template>
    <Layout>
        <div class="col-12 background-network row" >
            <div class="col-3 py-3" style="padding:0px 5px 0px 5px">
                <NetworksMenu v-if="$route.params.chainId"
                :chainId="$route.params.chainId" 
                @selectedItem="selectedItemChanged" />
            </div>   
            <div class="col-9 py-3">
                <NetworksContent v-model="accuntList" />
            </div>   
        </div>
    </Layout>
</template>
<script lang="ts">
import {Vue , Component} from 'vue-property-decorator';
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
   accuntList:any=[];
  selectedItemChanged(data:any){
    this.accuntList = data;
  }
  mounted(){
      if(!this.$store.state.currentNet.name){
          this.$router.push('/')
      }
  }
}
</script>
<style scoped>
.background-network{
    background:#f8f8fb;
}
</style>