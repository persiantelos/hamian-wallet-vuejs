<template>
    <div class="col-12"
          :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
    
         <div class="card p-2" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
          <div class="card-body">
            <h4 class="card-title text-primary mb-4" >
                 <i class="far fa-id-card"></i>
                Resources</h4>

            <p
              class="text-muted mb-4"
              :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'"
            >Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.</p>
            <div class="table-responsive ">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                    <th scope="row">Available :</th>
                    <td>{{resourcesInfo.available}}</td>
                  </tr>
                  <tr 
                  v-if="resourcesInfo.refunding" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                    <th  scope="row">Refunding :</th>
                    <td ><div v-b-tooltip.hover :title="resourcesInfo.refunding.cpu_amount + resourcesInfo.refunding.net_amount">
                      <span v-if="typeof refoundSum != 'object'">
                        {{refoundSum}}
                      </span>
                      <span>
                        0.0000 TLOS
                      </span>
                    </div></td>
                  </tr>
                  <tr  v-if="!resourcesInfo.refunding" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                    <th  scope="row">Refunding :</th>
                    <td >0.0000 TLOS</td>
                  </tr>
                  <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                    <th scope="row">CPU Staked :</th>
                    <td>{{resourcesInfo.CPUStaked}}</td>
                  </tr>
                  <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                    <th scope="row">NET Staked :</th>
                    <td>{{resourcesInfo.NetStaked}}</td>
                  </tr>
                  <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                    <th scope="row">Staked by Others :</th>
                    <td v-if="resourcesInfo.stakedbyOthers">{{resourcesInfo.stakedbyOthers}}</td>
                    <td v-else>0 TLOS</td>
                  </tr>
                  <tr :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
                    <th scope="row">Total REX :</th>
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
import AccountService from '@/services/accountService'
@Component({
    components:{}
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    resource:any=[]
    counter:number=0
    refoundSum:any=[]
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
      console.log('this.resource',this.resource)
      this.init();
      this.getCPUNETStake()
    }
    async getCPUNETStake(){
      let data= await AccountService.getCPUNetStaked(this.$store.state.currentNet.host,this.$store.state.currentAccount.name)
      if(data.rows[0]){
        this.resourcesInfo.CPUStaked = data.rows[0].cpu_weight
        this.resourcesInfo.NetStaked = data.rows[0].net_weight
      }
      else{
        this.resourcesInfo.CPUStaked = '0.0000 TLOS'
        this.resourcesInfo.NetStaked = '0.0000 TLOS'
      }
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
            this.refoundSum = parseFloat(this.resourcesInfo.refunding.cpu_amount.split(' ')[0]) +  parseFloat(this.resourcesInfo.refunding.net_amount.split(' ')[0])
            this.refoundSum = this.refoundSum.toFixed(4) + ' TLOS'

        }
        else
        {
            this.resourcesInfo.refunding ='0 TELOS';
        }
        if(this.resource.rex_info){
          var allToken:any =[] 
          for(let token of this.$store.state.currentAccount.val){
            if(token.split(' ')[1] == "TLOS"){
              allToken = token.split(' ')[0]
            }
          }
            this.resourcesInfo.totalREX = parseFloat(allToken) - parseFloat(this.resource.core_liquid_balance.split(' ')[0]);
        }
        else{
            this.resourcesInfo.totalREX = '0.0000 TELOS';
        }
        if(this.resource.total_resources){
            let temp = parseFloat(this.resource.total_resources.cpu_weight.split(' ')[0]) + parseFloat(this.resource.total_resources.net_weight.split(' ')[0])
            console.log('temp',temp)
            this.resourcesInfo.stakedbyOthers = temp.toFixed(4) + ' TLOS';
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
  // box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 10%);

}

</style>
