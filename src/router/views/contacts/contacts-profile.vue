<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";

import Column from '@/components/profile/Column.vue'
import ProfileContent from '@/components/profile/Content.vue'

/**
 * Contacts-Profile component
 */
export default {
  page: {
    title: "Profile",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, Column , ProfileContent  },
  data() {
    return {
      informationCard:{
        name:'mrgoudarzi25',
        items:10,
        sets:5,
        firstName:'Mohammad',
        lastName:'goudarzi',
        location:'Iran , Tehran',
        bio:'(Xtorage , Mega App) Front-end Developer',
        avatar:'https://api.dstor.cloud/ipfs/QmagVWUrmMWWZkwx1DAyaxL47aS3cNsPjA3ETTKRwPR83g',
        cover:'https://api.dstor.cloud/ipfs/QmXZHv2ctTRLSKXv3PygFzm3sR4VkPX3UBswGha9iVfwGs',
        email:'',
        telegram:'',
        twitter:'',
        website:'',
      }
    };
  },
  mounted(){
      this.$store.state.currentPageTitle = 'Profile'
      this.$store.state.currentPageItems[0].text = 'Contacts';
      this.$store.state.currentPageItems[1].text = 'Profile';
    }
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-xl-4">
        <Column :informationCard="informationCard"/>
      </div>

      <div class="col-xl-8">
        <ProfileContent />
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>