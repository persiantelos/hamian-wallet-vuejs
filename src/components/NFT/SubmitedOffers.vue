<template>
    <div>
        <div v-if="spinner">
            <Spinner v-model="spinner" />
        </div>
        <div>
            <div v-if="emptyList">
                Submited offers list is empty
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
    submitedOffers:any=[];
    spinner:boolean=true;
    emptyList:boolean=false;
    mounted(){
        this.getSubmitedOffers()
    }
    async getSubmitedOffers(){
        let submitedOffers = await NFTsServices.getSubmitedOffers(this.$store.state.currentAccount.name)
        if(submitedOffers){
            console.log('submitedOffers',submitedOffers)
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