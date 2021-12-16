
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

      <div class="col-xl-8" v-if="editProfileForm">
        <ProfileContent @save="formChanged" :forms="forms" />
      </div>
      <div class="col-xl-8" v-if="defaultContent">
        <DefaultPage :defaultProfileInfomation="defaultProfileInfomation"/>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import Column from '@/components/profile/Column.vue';
import ProfileContent from '@/components/profile/Content.vue';
import DefaultPage from '@/components/profile/DefaultPage.vue';
import AccountService from '@/services/accountService';


/**
 * Contacts-Profile component
 */
export default {
  page: {
    title: "Profile",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, Column , ProfileContent, DefaultPage },
  data() {
    return {
      accInformation:{
        name:'',
        chain:'',
        items:0,
        sets:0,
      },
      informationCard:{
        firstName:'',
        lastName:'',
        location:'',
        bio:'',
        avatar:'',
        cover:'',
        email:'',
        telegram:'',
        twitter:'',
        website:'',
      },
      forms:{
        firstName:'',
        lastName:'',
        location:'',
        email:'',
        bio:'',
        avatar:'',
        cover:'',
        telegram:'',
        twitter:'',
        website:'',
      },
      counter:0,
      defaultContent:true,
      editProfileForm:false,
      defaultProfileInfomation:[]

    };
  },  
  mounted(){
    this.$store.state.currentPageTitle = 'Profile'
    this.$store.state.currentPageItems[0].text = 'Contacts';
    this.$store.state.currentPageItems[1].text = 'Profile';
        this.init();

    this.accInformation.name = this.$store.state.currentAccount.name;
    this.accInformation.chain = this.$store.state.currentNet.name;
    this.defaultContent = true;
    this.editProfileForm = false;
    
  },
  methods:{
    async init(){
      let accInfo = await AccountService.getCollectors();
      if(accInfo.value[0]){
        this.defaultProfileInfomation = accInfo.value[0];
        accInfo = accInfo.value[0];
        accInfo.items ? this.accInformation.items = accInfo.items : this.accInformation.items = 0;
        accInfo.sets ? this.accInformation.sets =  accInfo.sets : this.accInformation.sets =  0;
        accInfo.Avatar ? this.informationCard.avatar = accInfo.Avatar : this.informationCard.avatar = '';
        accInfo.Cover ? this.informationCard.cover = accInfo.Cover : this.informationCard.cover = '';
        accInfo.FirstName ? this.informationCard.firstName = accInfo.FirstName : this.informationCard.firstName = '';
        accInfo.LastName ? this.informationCard.lastName = accInfo.LastName : this.informationCard.lastName = '';
        accInfo.Bio ? this.informationCard.bio = accInfo.Bio : this.informationCard.bio = '';
        accInfo.Location ? this.informationCard.location = accInfo.Location : this.informationCard.location = '';
        accInfo.Contacts.email ? this.informationCard.email = accInfo.Contacts.email : this.informationCard.email = '';
        accInfo.Contacts.Telegram ? this.informationCard.telegram = accInfo.Contacts.Telegram : this.informationCard.telegram = '';
        accInfo.Contacts.Twitter ? this.informationCard.twitter = accInfo.Contacts.Twitter : this.informationCard.twitter = '';
        accInfo.website ? this.informationCard.website = accInfo.website : this.informationCard.website = '';
      }

    },

    formChanged(data){
      this.informationCard = data;
      this.counter++
    },
    editProfile(){
      if(this.informationCard){
        this.forms = this.informationCard
        this.editProfileForm = true;
        this.defaultContent = false;
      }else{
        this.editProfileForm = true;
        this.defaultContent = false;
      }
    }
  }

};
</script>