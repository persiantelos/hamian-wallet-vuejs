<template>
    <Layout>
        <div class="col-12 background-network row" :class="$store.state.layout.themeDarkMode ? 'bg-dark-mode':'light-mode'">
            <div class="col-3 py-3">
                <NFTMenu @selectedItem="selectedItemChanged" />
            </div>
            <div class="col-9 py-3">
                <NFTContent @changeSelectedMenu="selectedItemChanged" v-model="selectedItem" />
            </div>
        </div>
    </Layout>
</template>
<script lang="ts">
import Layout from "../../layouts/main";
import {Vue , Component , Watch } from 'vue-property-decorator'
import NFTMenu from "@/components/NFT/NFTMenu.vue"
import NFTContent from "@/components/NFT/NFTContent.vue"
@Component({components:{Layout,NFTMenu,NFTContent}})
export default class NFT extends Vue{
    selectedItem:any=[];
    mounted(){
        this.$store.state.currentPageTitle = 'NFTs'
        this.$store.state.currentPageItems[0].text = 'Market';
        this.$store.state.currentPageItems[1].text = 'NFTs';
    }
  selectedItemChanged(data:any){
    this.selectedItem = data;
  }
  
}
</script>
<style lang="scss">
.background-network{
    background:#f8f8fb;
}
</style>