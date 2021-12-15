<template>
    <div>
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Revenue</h4>
            <div id="revenue-chart" class="apex-charts"></div>
           
          </div>
        </div>
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">My Projects</h4>
            <div class="table-responsive">
             
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component } from "vue-property-decorator"
@Component({components:{}})
export default class Content extends Vue{
  
 
};
</script>