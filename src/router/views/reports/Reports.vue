<template>
    <Layout>
        <div class="col-12 background-network row" :class="$store.state.layout.themeDarkMode ? 'bg-dark-mode':'light-mode'">
            <div class="col-3 py-3">
                <ReportsMenu @selectedItem="selectedItemChanged" />
            </div>
            <div class="col-9 py-3">
                <ReportsContent @changeSelectedMenu="selectedItemChanged" v-model="selectedItem" />
            </div>
        </div>
    </Layout>
</template>
<script lang="ts">
import Layout from "../../layouts/main";
import {Vue , Component , Watch } from 'vue-property-decorator'
import ReportsMenu from "@/components/reports/ReportsMenu.vue"
import ReportsContent from "@/components/reports/ReportsContent.vue"
@Component({components:{Layout,ReportsMenu,ReportsContent}})
export default class Reports extends Vue{
    selectedItem:any=[];
    mounted(){
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