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
      statData: [
        {
          icon: "bx bx-check-circle",
          title: "Completed Projects",
          value: "125"
        },
        {
          icon: "bx bx-hourglass",
          title: "Pending Projects",
          value: "12"
        },
        {
          icon: "bx bx-package",
          title: "Total Revenue",
          value: "$36,524"
        }
      ]
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
        <Column />
      </div>

      <div class="col-xl-8">
        <ProfileContent />
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>