<template>
    <div>
        <div class="row d-flex p-0 m-0">
            <div v-if="loader" class="col-12">
                <Spinner v-model="loader" />
            </div>
            <div v-if="items.value.length == 0">
                <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >List is empty</h4>
            </div> 
            <div v-if="!loader && items.value.length!=0" class="col-12">
                <div v-if="items" class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" >
                    <div class="card-body">
                        <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >Sold Items</h4>
                        <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                        Top {{ items.value.length}} Sold items
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
                                    v-for="(item , index) in items.value" :key="index">
                                        <th scope="row">{{index+1}}</th>
                                        <td>{{item.serial}}</td>
                                        <td>{{item.owner}}</td>
                                        <td>{{item.buyer}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr class="mt-4" >
                        <b-pagination
                            variant="dark"
                            v-if="items.value.length > 0"
                            class="justify-content-center"
                            pills
                            v-model="skip"
                            :total-rows="count"
                            :per-page="top"
                            aria-controls="my-table"
                        ></b-pagination>
                    </div>

                </div>
                
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator';
import Spinner from "@/components/spinner/Spinner.vue";
import ReportServices from "@/services/reportServices"


@Component({components:{Spinner}})
export default class Solditem extends Vue{
    loader:boolean=true;
    skip:number=1;
    count:number=1;
    top:number=10;
    items:any=[];
    mounted(){
        this.getItems()
    }
    async getItems(skip:number=0){
        this.loader = true;
        let items = await ReportServices.getSoldItems(this.$store.state.currentAccount.name,this.top,skip)
        if(items.value){
            this.items=items;
            this.count = items.count
            this.loader = false;
        }
    }
    @Watch('skip')
    skiped(newVal:any){
        this.getItems(newVal-1)
    }
}
</script>