<template>
    <div>
        <div class="row">
            <div v-if="!spinner" class="col-md-4">
                <Stat :icon="statData.royalty.icon" :title="statData.royalty.title" :value="statData.royalty.value" />
            </div>
            <div v-if="spinner" class="col-md-4">
                <Spinner  v-model="spinner" />
            </div>
            <div v-if="!spinner" class="col-md-4">
                <Stat :icon="statData.SellByTelos.icon" :title="statData.SellByTelos.title" :value="statData.SellByTelos.value" />
            </div>
            <div v-if="spinner" class="col-md-4">
                <Spinner  v-model="spinner" />
            </div>
            <div v-if="!spinner" class="col-md-4">
                <Stat :icon="statData.SellByDaric.icon" :title="statData.SellByDaric.title" :value="statData.SellByDaric.value" />
            </div>
            <div v-if="spinner" class="col-md-4">
                <Spinner  v-model="spinner" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue , Component , Prop , Watch} from 'vue-property-decorator'
import Stat from "@/components/profile/stat.vue";
// import AccountService from '@/services/accountService';
import Spinner from '../spinner/Spinner.vue';

@Component({components:{Stat,Spinner}})
export default class DefaultPage extends Vue{
    @Prop({default:()=>{return []}}) defaultProfileInfomation:any;
    statData:any= {
        royalty:{
            icon: "mdi mdi-star-four-points-outline",
            title: "Royalty",
            value: ""
        },
        SellByTelos:{
            icon: "fas fa-coins",
            title: "Sell By TELOS",
            value: ""
        },
        SellByDaric:{
            icon: "fas fa-coins",
            title: "Sell By DARIC",
            value: ""
        },
    }
    // defaultProfileInfomation:any=[]
    spinner:boolean=true;
    mounted(){
        if(this.defaultProfileInfomation){
            this.init();
        }
    }
    @Watch('defaultProfileInfomation')
    defaultProfileInfomationChanged(newVal:any){
        if(newVal){
            this.init();
        }
    }
    async init(){
            this.statData.royalty.value = this.defaultProfileInfomation.royalty;
            this.statData.SellByTelos.value = this.defaultProfileInfomation.sellTLOS;
            this.statData.SellByDaric.value = this.defaultProfileInfomation.sellDRIC;
            this.spinner = false;
    }
};
</script>