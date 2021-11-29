<template>
    <div class="col-12">
         <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">
                 <i class="far fa-id-card"></i>
                Resources</h4>

            <p
              class="text-muted mb-4"
            >Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.</p>
            <div class="table-responsive ">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Available :</th>
                    <td>{{resourcesInfo.available}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Refunding :</th>
                    <td>{{resourcesInfo.refunding}}</td>
                  </tr>
                  <tr>
                    <th scope="row">CPU Staked :</th>
                    <td>{{resourcesInfo.CPUStaked}}</td>
                  </tr>
                  <tr>
                    <th scope="row">NET Staked :</th>
                    <td>{{resourcesInfo.NetStaked}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Staked by Others :</th>
                    <td>{{resourcesInfo.stakedbyOthers}}</td>
                  </tr>
                  <tr>
                    <th scope="row">TotalREX :</th>
                    <td>{{resourcesInfo.totalREX}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
@Component({
    components:{}
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    resource:any=[]
    counter:number=0
    resourcesInfo:any={
        available:'',
        refunding:'',
        CPUStaked:'',
        NetStaked:'',
        totalREX:'',
        stakedbyOthers:'',
    }
    @Watch('value')
    valChanged(newVal:any){
      console.log('newVal',newVal);
      this.resource = newVal;
      this.init();
    }
    init(){
        if(this.resource.core_liquid_balance)
        {
        this.resourcesInfo.available = this.resource.core_liquid_balance;
        }
        else{
            this.resourcesInfo.available = 0;
        }
        if(this.resource.refund_request)
        {
            this.resourcesInfo.refunding = this.resource.refund_request;
        }
        else
        {
            this.resourcesInfo.refunding ='0 TELOS';
        }
        if(this.resource.total_resources){
            this.resourcesInfo.CPUStaked = this.resource.total_resources.cpu_weight;
            }
            else{
                this.resourcesInfo.CPUStaked = '0.0000 TELOS';
            }
        if(this.resource.total_resources){
            this.resourcesInfo.NetStaked = this.resource.total_resources.net_weight;
            }
            else{
                this.resourcesInfo.NetStaked = '0.0000 TELOS';
            }
        if(this.resource.rex_info){
            this.resourcesInfo.totalREX = this.resource.rex_info;
            }
            else{
                this.resourcesInfo.totalREX = '0.0000 TELOS';
            }
        if(this.resource.core_liquid_balance){
            this.resourcesInfo.stakedbyOthers = '0.0000 TELOS';
            }
            else{
                this.resourcesInfo.stakedbyOthers = '0.0000 TELOS';
            }
        this.counter++
    }
    

}
</script>
<style lang="scss" scoped>
.box{
  background: #ffffff;
  width: 98%;
  box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 10%);

}
</style>
