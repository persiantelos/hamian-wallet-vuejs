
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
        <ProfileContent @save="formChanged" :forms="forms" :price="price" />
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
import ProfileModel from "@/models/profile/profileModel"



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
      price:'',
      accInformation:{
        name:'',
        chain:'',
        items:0,
        sets:0,
      },
      informationCard:new ProfileModel(),
      forms:new ProfileModel(),
      counter:0,
      defaultContent:true,
      editProfileForm:false,
      defaultProfileInfomation:[]

    };
  },  
  mounted(){
    this.getSocialPrice()
    this.$store.state.currentPageTitle = 'Profile'
    this.$store.state.currentPageItems[0].text = 'Contacts';
    this.$store.state.currentPageItems[1].text = 'Profile';
    this.init();
    this.accInformation.name = this.$store.state.currentAccount.name;
    this.accInformation.chain = this.$store.state.currentNet.name;
    this.editProfileForm = false;
    
  },
  methods:{
    async profileInfo(){
        var profileInformation = await AccountService.getSocialProfile(this.$store.state.currentAccount.name);
        if(profileInformation){
          this.defaultContent = true;
            profileInformation.FirstName ? this.informationCard.FirstName = profileInformation.FirstName : this.informationCard.FirstName = '';
            profileInformation.LastName ? this.informationCard.LastName = profileInformation.LastName : this.informationCard.LastName =  '';
            profileInformation.Location ? this.informationCard.Location = profileInformation.Location : this.informationCard.Location =  '';
            profileInformation.Bio ? this.informationCard.Bio = profileInformation.Bio : this.informationCard.Bio = '';
            profileInformation.Avatar ? this.informationCard.Avatar = profileInformation.Avatar : this.informationCard.Avatar =  '';
            profileInformation.Cover ? this.informationCard.Cover = profileInformation.Cover : this.informationCard.Cover =  '';
            profileInformation.Contacts.email ? this.informationCard.Contacts.email = profileInformation.Contacts.email : this.informationCard.Contacts.email =  '';
            profileInformation.Contacts.Telegram ? this.informationCard.Contacts.Telegram = profileInformation.Contacts.Telegram : this.informationCard.Contacts.Telegram =  '';
            profileInformation.Contacts.Twitter ? this.informationCard.Contacts.Twitter = profileInformation.Contacts.Twitter : this.informationCard.Contacts.Twitter =  '';
            profileInformation.Contacts.Websit ? this.informationCard.Contacts.Websit = profileInformation.Contacts.Websit : this.informationCard.Contacts.Websit =  '';
          this.counter++
        }
    },
    async init(){
      let accInfo = await AccountService.getCollectors(this.$store.state.currentAccount.name);
      if(accInfo.value[0]){
        this.defaultProfileInfomation = accInfo.value[0];
        accInfo = accInfo.value[0];
        accInfo.items ? this.accInformation.items = accInfo.items : this.accInformation.items = 0;
        accInfo.sets ? this.accInformation.sets =  accInfo.sets : this.accInformation.sets =  0;
        this.profileInfo()
      }
    },
    async getSocialPrice(){
       this.price = await AccountService.getSocialPriceEdit()
       this.price = this.price.amount
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