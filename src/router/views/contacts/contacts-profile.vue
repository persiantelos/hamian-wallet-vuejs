<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";

import { revenueChart } from "./data-profile";
import Stat from "@/components/widgets/stat";
import Column from '@/components/profile/Column.vue'

/**
 * Contacts-Profile component
 */
export default {
  page: {
    title: "Profile",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, Column,Stat },
  data() {
    return {
      revenueChart: revenueChart,
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
        <div class="row">
          <div v-for="stat of statData" :key="stat.icon" class="col-md-4">
            <Stat :icon="stat.icon" :title="stat.title" :value="stat.value" />
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Revenue</h4>
            <div id="revenue-chart" class="apex-charts"></div>
            <apexchart
              class="apex-charts"
              type="bar"
              height="320"
              :series="revenueChart.series"
              :options="revenueChart.chartOptions"
            ></apexchart>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">My Projects</h4>
            <div class="table-responsive">
              <table class="table table-nowrap table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Projects</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Budget</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Skote admin UI</td>
                    <td>2 Sep, 2019</td>
                    <td>20 Oct, 2019</td>
                    <td>$506</td>
                  </tr>

                  <tr>
                    <th scope="row">2</th>
                    <td>Skote admin Logo</td>
                    <td>1 Sep, 2019</td>
                    <td>2 Sep, 2019</td>
                    <td>$94</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Redesign - Landing page</td>
                    <td>21 Sep, 2019</td>
                    <td>29 Sep, 2019</td>
                    <td>$156</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>App Landing UI</td>
                    <td>29 Sep, 2019</td>
                    <td>04 Oct, 2019</td>
                    <td>$122</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Blog Template</td>
                    <td>05 Oct, 2019</td>
                    <td>16 Oct, 2019</td>
                    <td>$164</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>Redesign - Multipurpose Landing</td>
                    <td>17 Oct, 2019</td>
                    <td>05 Nov, 2019</td>
                    <td>$192</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>Logo Branding</td>
                    <td>04 Nov, 2019</td>
                    <td>05 Nov, 2019</td>
                    <td>$94</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>