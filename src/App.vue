<script>
import appConfig from "@/app.config";
import { Vue ,Component } from 'vue-property-decorator';
import { notificationMethods } from "@/state/helpers";
import VModal from 'vue-js-modal';
import loader from '@/components/spinner/Spinner.vue'
import StorageService from '@/localService/storageService';

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
        },
        numberSeperator(value)
        {
            if(!value && value!==0)
              return "0";
            value=Math.floor(value).toString()
            var data=value;
            var sep=""
            if(data.length>1 && data[0]=="0")
              data=data.substr(1)
            for(var x=0;x<data.length;x++)
            {
              if(data[x]>='0' && data[x]<='9')
                sep+=data[x]
            }
            return sep.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
    // document.getElementById('appMode').click()
    this.themeDarkMode();

    // this.init();
    this.getCurrentNet();
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
    themeDarkMode(){
        document.body.setAttribute("data-topbar", 'dark');
        this.$store.state.layout.themeDarkMode=true;
    },
    clearNotification: notificationMethods.clear,
    // init:async ()=>
    // {
    //   this.showUpdate=!!(await CommonService.checkVersion());
    //   if(this.showUpdate)
    //   {
    //     window.location.reload(true);
    //   }
    // },
    async getAccounts(){
      let allSelectedAccount = await  StorageService.getSelectedAccount();
      console.log('allSelectedAccount',allSelectedAccount)
      console.log('allSelectedAccount',this.$store.state.currentNet)
      if(allSelectedAccount.message.length != 0){
        allSelectedAccount = allSelectedAccount.message
        this.$store.state.allSelectedAccount = allSelectedAccount;
        this.$store.state.currentAccountChainName = [];
        this.$store.state.currentAccount = [];
        for(let account of Object.entries(allSelectedAccount)){
          if(account[0]==this.$store.state.currentNet._id){
            this.$store.state.currentAccountChainName = account[0];
            this.$store.state.currentAccount = account[1];
          }
        }
      }
    },
    async getCurrentNet(){
      var currentNet = this.$store.state.currentNet;
      if(currentNet.length < 1){
        currentNet = await StorageService.getSelectedChain()
        console.log('currentNet app vue ',currentNet)
        if(currentNet.message == 'success'){
          currentNet = currentNet.data
          this.$store.state.currentNet = currentNet
          this.getAccounts();
        }
      }else{
        this.getAccounts();
      }
    }, 
  },
};
</script>

<template >
  <div id="app" >
    <notifications style="margin-top:20px" group="foo" />
    <div v-if="$store.state.loading == true">
      <loader  />
    </div>
    <div  v-if="$store.state.loading == false">
    <RouterView />
    </div>
  </div>
</template>
<style lang="scss">
.custom-radio{
  margin: 5px;
}
.custom-control-input{
  margin-right: 2px;
  margin-top: -2px;
}
body{
  background:#222736 !important;
}
.dark-mode{
background:#2a3042 !important;
color:#a6b0cf !important;


}
.light-mode{
background:#ffffff !important
}
.input-forms{
    background:#2e3446 !important;
    border: 1px solid #32394e !important;
    color: #7984a5 !important;
}
.multiselect__tags{
    border: 1px solid #32394e !important;
    padding: 0px;
    margin: 0px;
    background:#2e3446 !important;
    background-color:#2e3446 !important;
}
.multiselect--above.multiselect--active {
    background: #32394e !important;
    background-color: #32394e !important;
    color: #a6b0cf !important;
}
.border-gray{
    border: 1px solid #32394e;
    border-radius: 5px;
    background:#2a3042 !important 
}
.bg-dark-mode{
    background: #232837 !important;
    // border: 1px solid #32394e !important;

}
.background-dark-mode-melo{
  // background:#232837;
  background:#32394e !important;
}
body[data-sidebar=dark].vertical-collpsed {
    min-height: 100%;
}
.modal-header {
    border-bottom: 1px solid #232837;
}
.modal-footer {
    border-top: 1px solid #232837;
}
.modal-title {
    color:#a6b0cf;
}
.modal-header .close, .alert .close {
    color:#a6b0cf;
}
.modal-content{
    color:#a6b0cf;
}
.dropdown-menu.show {
    background: #232837;
}
.dropdown-item:hover, .dropdown-item:focus {
    color: #1e2125;
    text-decoration: none;
    background-color: #2e3446 !important;
}
.text-dark-mode{
color:#a6b0cf !important;
}
.text-dark-mode-darker{
color:#626981 !important;

}
.text-dark-mode-lighter{
color:#9096ad !important;

}

.page-item.disabled .page-link {
    color: #c3cbe4;
    pointer-events: none;
    background-color: #32394e;
    border-color: #32394e;
}

</style>
