<script>
import appConfig from "@/app.config";
import { Vue ,Component } from 'vue-property-decorator';

import { notificationMethods } from "@/state/helpers";

import VModal from 'vue-js-modal';

import Dialog from "@/components/common/Dialog.vue";
import loader from '@/components/spinner/Spinner.vue'
Vue.use(VModal)
Vue.mixin({
      methods: {
        sizeConvertor(bytes){
          if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
          else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
          else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
          else if (bytes > 1)           { bytes = bytes + " bytes"; }
          else if (bytes == 1)          { bytes = bytes + " byte"; }
          else                          { bytes = "0 bytes"; }
          return bytes;
        }
      }
})

export default {
  name: "app",
  components:{loader},
  data:()=>{
    return{
      loading:false,
    }
  },
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
  mounted() {
    this.$store.state.layout.layoutType='vertical'
    this.$store.state.layout.leftSidebarType='dark';
    this.init();
    // document.querySelector("html").setAttribute('dir', 'rtl')
  },
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    },
  },
  methods: {
    clearNotification: notificationMethods.clear,
    init:async ()=>
    {
      this.showUpdate=!!(await CommonService.checkVersion());
      if(this.showUpdate)
      {
        window.location.reload(true);
      }
    } 
  },
};
</script>

<template>
  <div id="app">
    <notifications group="foo" />
    <div v-if="$store.state.loading == true">
      <loader  />
    </div>
    <div v-if="$store.state.loading == false">
    <RouterView />
    </div>
  </div>
</template>
