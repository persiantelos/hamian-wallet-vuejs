<template>
    <div>
        <div class="row d-flex p-0 m-0">
            <div v-if="loader" class="col-12">
                <Spinner v-model="loader" />
            </div>
            <div v-if="!loader" class="col-12">
                <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
                    <div class="card-body">
                        <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Purchased Items</h4>
                        <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                        Top {{ items.length}} purchased items
                        </p>
                        
                        <div  class="table-responsive">
                            <table class="table mb-0">
                                <thead>
                                    <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                                        <th>#</th>
                                        <th>Serial</th>
                                        <th>Seller</th>
                                        <th>Buyer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-center" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" 
                                    v-for="(item , index) in items" :key="index">
                                        <th scope="row">{{index+1}}</th>
                                        <td>{{item.serial}}</td>
                                        <td>{{item.owner}}</td>
                                        <td>{{item.buyer}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import Spinner from "@/components/spinner/Spinner.vue";
import ReportServices from "@/services/reportServices"


@Component({components:{Spinner}})
export default class Purchaseditems extends Vue{
    loader:boolean=true;
    items:any=[];
    mounted(){
        this.getItems()
    }
    async getItems(top:number=10,skip:number=0){
        let items = await ReportServices.getPurchasedItems('vahidhosaini',top,skip)
        // let items = await NFTsServices.getItemByOwner(this.$store.state.currentAccount.name,top,skip)
            console.log('this.items',items)
        if(items.value){
            this.items=items.value
            this.loader = false;
        }
    }
}
</script>