<template>
    <div>
        <div v-if="!showCompeleteTheProfile" class="row">
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
        <div v-if="showCompeleteTheProfile" class="card p-3" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
            <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">First you have to complete your profile information, To do that click the Edit profile button</h5>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue , Component , Prop , Watch} from 'vue-property-decorator'
import Stat from "@/components/profile/stat.vue";
import Spinner from '../spinner/Spinner.vue';

@Component({components:{Stat,Spinner}})
export default class DefaultPage extends Vue{
    @Prop({default:()=>{return []}}) defaultProfileInfomation:any;
    @Prop({default:()=>{return false}}) showCompeleteTheProfileInformation:boolean;
    showCompeleteTheProfile:boolean=false
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
    spinner:boolean=true;
    mounted(){
        if(this.defaultProfileInfomation){
            console.log(this.defaultProfileInfomation)
            this.init();
        }
    }
    @Watch('defaultProfileInfomation')
    defaultProfileInfomationChanged(newVal:any){
        if(newVal){
            this.init();
        }
    }
    @Watch('showCompeleteTheProfileInformation')
    CompeleteTheProfileInformation(newVal:any){
      this.showCompeleteTheProfile = newVal;
        setTimeout(() => {
            this.spinner=false
        }, 400);
    }
    async init(){
        this.statData.royalty.value = this.defaultProfileInfomation.royalty;
        this.statData.SellByTelos.value = this.defaultProfileInfomation.sellTLOS;
        this.statData.SellByDaric.value = this.defaultProfileInfomation.sellDRIC;
        setTimeout(() => {
            this.spinner = false;
        }, 300);
    }
};
</script>