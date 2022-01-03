<template>
    <div>
        <div class="row d-flex p-0 m-0">
            <div v-if="loader" class="col-12">
                <Spinner v-model="loader" />
            </div>
            <div v-if="items.length == 0" class="col-12 text-center">
                <h4 class="card-title" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" >List is empty</h4>
            </div> 
            <div v-if="!loader && items.length!=0" class="col-12">
                <div  class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                    <div class="card-body">
                        <div class="row">
                            <div class=" me-2">
                            <h5 class="card-title mb-1" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Purchased Items</h5>
                            </div>
                            <p class="card-title-desc" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" >
                            Top {{ items.length}} purchased items
                            </p>
                        </div>
                        <div class="table-responsive ">
                            <table class="table align-middle table-nowrap mb-0">
                            <tbody :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                                <tr>
                                <th scope="col" colspan="2">Seller</th>
                                <th scope="col">Serial</th>
                                <th scope="col">Buyer</th>
                                </tr>

                                <tr v-for="(item , index) in items" :key="index">
                                    <td style="width: 100px">
                                        <img v-if="!item.userInformation.Avatar"
                                        src="@/assets/images/users/1.jpg"
                                        alt=""
                                        class="avatar-md h-auto d-block rounded"
                                        />
                                        
                                        <img v-if="item.userInformation.Avatar"
                                        :src="item.userInformation.Avatar"
                                        alt=""
                                        class="avatar-sm h-auto d-block rounded"
                                        />
                                        
                                    </td>
                                    <td>
                                        <h5 class="font-size-13 text-truncate mb-1">
                                        <a href="#" class="text-dark" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                                            {{item.owner}}
                                        </a>
                                        </h5>
                                        <p class="text-muted mb-0">{{new Date(item.created).toString().split('G')[0]}}</p>
                                    </td>
                                <td><i class="mdi mdi-barcode align-middle font-size-18 me-1"></i><span class="mt-1"> {{item.serial}}</span></td>
                                <td><i class="bx bx-user align-middle font-size-15 me-1"></i> <span class="mt-1">{{item.buyer}}</span></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <hr class="mt-4" >
                    <b-pagination
                        variant="dark"
                        v-if="items.length > 0"
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
</template>
<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator';
import Spinner from "@/components/spinner/Spinner.vue";
import ReportServices from "@/services/reportServices"
import AccountService from '@/services/accountService';



@Component({components:{Spinner}})
export default class Purchaseditems extends Vue{
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
        let items = await ReportServices.getPurchasedItems(this.$store.state.currentAccount.name,this.top,skip)
        if(items.value){
            this.count = items.count;
            this.getDetails(items.value)
        }
    }
    async getDetails(items:any){
        for(let item of items)
        {
            let userInfo = await AccountService.getCollectors(item.owner);
            if(userInfo.value){
                item.userInformation ={}
                let userInformation = userInfo.value[0]
                item.userInformation=userInformation
                this.items.push(item)
            }
        }
        console.log('this is items',this.items)
        this.loader = false;
    }
    @Watch('skip')
    skiped(newVal:any){
        this.getItems(newVal-1)
    }
}
</script>