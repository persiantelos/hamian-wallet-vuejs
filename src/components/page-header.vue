
<script lang="ts">
import {Vue , Component ,Prop,Watch} from 'vue-property-decorator';


@Component({
    components:{
    }
})
export default class PageHeader extends Vue{
  @Prop({default:() =>{return ''}}) title:string;
  @Prop({default:() =>{return []}}) items:any;
  @Watch('title')
  titleChanged(newVal:any){
    console.log('page header new val',newVal)
  }
  @Watch('items')
  itemsChanged(newVal:any){
    console.log('page header new val',newVal)
  }
}
</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':'light-mode'">{{ title }}</h4>

        <div class="page-title-right">
          <b-breadcrumb :items="items" class="m-0"></b-breadcrumb>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>
