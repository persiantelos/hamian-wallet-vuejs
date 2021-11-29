<template>
    <div class="col-12">
        <div class="col-12 box" v-for="(account , index) in value"  :key="index">
            <div class="acc-box" v-if="account.name">
                <b-form-group label="Account List" v-for="(account , index) in value"  :key="index">
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios"
                     :value="account">
                        <i class="bx bx-user font-size-16 align-middle me-1"></i>  {{account.name}}({{account.authority}})
                     </b-form-radio>
                </b-form-group>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator';
import StorageService from '@/localService/storageService'
@Component({
    components:{}
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    selected:any=[]
    @Watch('selected')
    selectedChanged(newVal:any){
        this.setSelectedacc(newVal)
    }
    async setSelectedacc(account:any){
        this.selected = account;
        account.chainId=this.$store.state.currentNet.chainId;
        let chain = StorageService.getSelectedNode(account.chainId)
        if(chain){
            console.log(account)
            var data =  await StorageService.saveSelectedAccount(account);
            if(data.message == true){
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    // title: 'Important message',
                    text: 'Account Selected'
                });
            }
        }
    }

}
</script>
<style lang="scss" scoped>
.box{
    background: #f8f8fb;
    width: 100%;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    .acc-box{
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        background: #ffffff;
        padding: 10px ;
        margin: 15px;
    }
}
</style>