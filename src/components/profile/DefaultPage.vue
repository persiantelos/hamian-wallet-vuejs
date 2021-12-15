<template>
    <div>
        <div class="row">
          <div v-for="stat of statData" :key="stat.icon" class="col-md-4">
            <Stat :icon="stat.icon" :title="stat.title" :value="stat.value" />
          </div>
        </div>
    </div>
</template>

<script>


import Stat from "@/components/profile/stat.vue";

/**
 * Contacts-Profile component
 */
export default {
  components: {  Stat },
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
  }
};
</script>