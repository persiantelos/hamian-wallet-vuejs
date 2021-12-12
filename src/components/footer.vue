<template>
  <footer class="footer" :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">   version : {{version}} </div>
        <div class="col-sm-6" style="text-align: right;">{{ new Date().getFullYear() - 1 }} - {{ new Date().getFullYear() }} © Hamian.</div>
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
<style lang="scss" scoped>
.dark-mode{
    background: #262b3c !important;
}
.light-mode{
  background: #ffffff !important;
}
</style>