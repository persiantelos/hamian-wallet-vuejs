
<template>
  <Layout>
    <div class="row">
      <div class="col-xl-4">
        <Column 
        :counter='counter' 
        :informationCard="informationCard" 
        :accInformation="accInformation"
        @editProfile="editProfile" 
        />
      </div>

      <div class="col-xl-8" v-if="!spinner && editProfileForm">
        <ProfileContent @save="formChanged" :forms="forms" />
      </div>
      <div class="col-xl-8" v-if="!spinner && defaultContent">
        <DefaultPage />
      </div>
      <div class="col-xl-8" v-if="spinner">
        <Spinner v-model="spinner" />
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import Spinner from "@/components/spinner/Spinner.vue"


import Column from '@/components/profile/Column.vue'
import ProfileContent from '@/components/profile/Content.vue'
import DefaultPage from '@/components/profile/DefaultPage.vue'

/**
 * Contacts-Profile component
 */
export default {
  page: {
    title: "Profile",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, Column , ProfileContent, DefaultPage,Spinner },
  data() {
    return {
      accInformation:{
        name:'',
        chain:'',
        items:0,
        sets:0,
      },
      informationCard:{
        firstName:'Mohammad',
        lastName:'Goudarzi',
        location:'Iran , Tehran',
        bio:'(Xtorage , Mega App) Front-end Developer',
        avatar:'https://api.dstor.cloud/ipfs/QmagVWUrmMWWZkwx1DAyaxL47aS3cNsPjA3ETTKRwPR83g',
        cover:'https://api.dstor.cloud/ipfs/QmYZx446Kuccu5hpXPABcNAeEJmDiBazjZhtgw9WyQ6siZ',
        email:'mrg2195@gmail.com',
        telegram:'https://t.me/MrCeh',
        twitter:'https://twitter.com/mr_ceh',
        website:'-----',
      },
      forms:{
        firstName:'',
        lastName:'',
        email:'',
        bio:'',
        avatar:'',
        cover:'',
        telegram:'',
        twitter:'',
        website:'',
      },
      counter:0,
      spinner:true,
      defaultContent:true,
      editProfileForm:false,

    };
  },
  mounted(){
    this.$store.state.currentPageTitle = 'Profile'
    this.$store.state.currentPageItems[0].text = 'Contacts';
    this.$store.state.currentPageItems[1].text = 'Profile';
    this.accInformation.name = this.$store.state.currentAccount.name;
    this.accInformation.chain = this.$store.state.currentNet.name;
    this.accInformation.items = 60 ;
    this.accInformation.sets =  5 ;
    this.defaultContent = true;
    this.editProfileForm = false;
    setTimeout(() => {
      this.spinner = false;
    }, 500);
  },
  methods:{
    formChanged(data){
      this.informationCard = data;
      this.counter++
    },
    editProfile(){
      this.spinner = true;
      this.editProfileForm = true;
      setTimeout(() => {
        this.spinner = false;
      }, 300);
    }
  }

};
</script>