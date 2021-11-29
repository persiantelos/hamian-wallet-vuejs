<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">   version : {{version}} </div>
        <div class="col-sm-6" style="text-align: right;">{{ new Date().getFullYear() - 1 }} - {{ new Date().getFullYear() }} © Xtorage.</div>
      </div>
    </div>
  </footer>
  <!-- end footer -->
</template>
<script lang="ts">
import { Component, Prop, Vue ,Watch} from 'vue-property-decorator';  
import Config from '@/common/config'
@Component({
  components:{ }
})
export default class footer extends Vue{ 
  version:string='';
  mounted() {
    console.log('---------------------------------------------')
     this.version=Config.version;
  } 
} 
</script>