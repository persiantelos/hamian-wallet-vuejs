<template>
    <div>
        <div v-if="spinner">
            <Spinner v-model="spinner" />
        </div>
        <div>
            <div v-if="emptyList">
                Incoming offers list is empty
            </div>
            <div v-if="!spinner">
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import {Vue , Component} from "vue-property-decorator"
import NFTsServices from '@/services/NFTsServices'
import Spinner from '@/components/spinner/Spinner.vue';

@Component({components:{Spinner}})
export default class IncommingOffers extends Vue{
    incommingOffers:any=[];
    spinner:boolean=true;
    emptyList:boolean=false;
    mounted(){
        this.getIncommingOffers()
    }
    async getIncommingOffers(){
        let incommingOffers = await NFTsServices.getIncomingOffers(this.$store.state.currentAccount.name)
        if(incommingOffers){
            console.log('incommingOffers',incommingOffers)
            this.spinner = false
            this.emptyList = false
        }
        else{
            this.spinner = false
            this.emptyList = true
        }
    }
}
</script>