<template>
    <div class="col-12 text-center ">
      <div v-if="showSpinner">
          <Spinner v-model="showSpinner" />
      </div>
      <div v-if="!showSpinner" class="col-12 d-flex">
        <div  class="col py-1 box"
        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
            <div class="text-center">
                <h5 class="font-size-15 mt-2 mb-4"
                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">RAM</h5>
                <apexchart 
                class="apex-charts"
                type="radialBar"
                height="150"
                dir="ltr"
                :series="RAMSeries"
                :options="RAMChartOptions"
                ></apexchart>
                <p class="text-muted p-1 "
                >RAM used : {{sizeConvertor(resources.ram_limit.used)}} / {{sizeConvertor(resources.ram_limit.available)}}</p>
            </div>
        </div>
        <div  class="col py-1 box mx-2"
        :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
            <div class="text-center">
                <h5 class="font-size-15 mt-2 mb-4"
                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">CPU</h5>
                <apexchart 
                class="apex-charts"
                type="radialBar"
                height="150"
                dir="ltr"
                :series="CPUSeries"
                :options="CPUChartOptions"
                ></apexchart>
                <p class="text-muted p-1 "
                >CPU used : {{(resources.cpu_limit.used/1000).toFixed(2)}} µs /  {{(resources.cpu_limit.max/1000).toFixed(2)}} ms</p>
            </div>
        </div>
        <div  class="col py-1 box"
          :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'" >
          
            <div class="text-center">
                <h5 class="font-size-15 mt-2 mb-4"
                :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">NET</h5>
                <apexchart 
                class="apex-charts"
                type="radialBar"
                height="150"
                dir="ltr"
                :series="NETSeries"
                :options="NETChartOptions"
                ></apexchart>
                <p class="text-muted p-1 "
                >NET used : {{sizeConvertor(resources.net_limit.used)}} / {{sizeConvertor(resources.net_limit.available)}}</p>
            </div>
      
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component , Prop , Watch} from 'vue-property-decorator'
import Spinner from '@/components/spinner/Spinner.vue'

@Component({
    components:{
      Spinner
    }
})
export default class AccountList extends Vue{
    @Prop({default:() =>{return []}}) value:any;
    showSpinner:boolean=true;

    resources:any=[];
    RAMSeries:any= [0];
    CPUSeries:any= [0];
    NETSeries:any= [0];
    mounted(){
      if(this.value == []){
        this.$router.push('/')
      }
      else{
        this.resources = this.value;
        this.calculate();
      }
    }
    @Watch('value')
    valChanged(newVal:any){
      this.resources = newVal;
      this.calculate();
    }
    calculate(){
      this.RAMSeries = []
      this.RAMSeries.push(Math.floor((this.resources.ram_limit.used * 100) / this.resources.ram_limit.available))
      this.CPUSeries = []
      this.CPUSeries.push(Math.floor((this.resources.cpu_limit.used) / (this.resources.cpu_limit.max)))
      this.NETSeries = []
      this.NETSeries.push(Math.floor((this.resources.net_limit.used * 100) / this.resources.net_limit.available))
      this.showSpinner = false;
    }
    RAMChartOptions:any= {
        chart: {
          height: 150,
          type: "radialBar",
          sparkline: {
            enabled: true,
          },
        },
        colors: ["#0a869f"],
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "80%",
              margin: 5, // margin is in pixels
            },
            hollow: {
              size: "60%",
            },

            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "16px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        stroke: {
          dashArray: 3,
        },
        labels: ["RAM"],
      }
    CPUChartOptions:any= {
        chart: {
          height: 150,
          type: "radialBar",
          sparkline: {
            enabled: true,
          },
        },
        colors: ["#001dc3"],
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "90%",
              margin: 5, // margin is in pixels
            },
            hollow: {
              size: "60%",
            },

            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "16px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        stroke: {
          dashArray: 3,
        },
        labels: ["CPU"],
      }
    NETChartOptions:any= {
        chart: {
          height: 150,
          type: "radialBar",
          sparkline: {
            enabled: true,
          },
        },
        colors: ["#046011"],
        plotOptions: {
          radialBar: {
            startAngle:-90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "90%",
              margin: 5, // margin is in pixels
            },
            hollow: {
              size: "60%",
            },

            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "16px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        stroke: {
          dashArray: 3,
        },
        labels: ["NET"],
      }



}
</script>
<style lang="scss" scoped>
.box{
  // background: #ffffff;
  // margin:5px;
  margin-top:0px;
  // box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 10%);

}
.text-muted{
  margin-top: 15px;
}

</style>