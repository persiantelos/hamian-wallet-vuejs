<script>
import axios from "axios";

/**
 * Preloader component
 */
export default {
  props: {
    loading: Boolean,
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    axios.get(process.env.VUE_APP_URL).then((res) => {
      setTimeout(() => {
        // you can remove this settimeout method for production or integrating live API.
        document
          .getElementsByClassName("preloader-component")
          .forEach((elem) => {
            elem.style.display = "none";
          });
        document.getElementsByClassName("status").forEach((elem) => {
          elem.style.display = "none";
        });
      }, 1000);
    });
  },
};
</script>

<template>
  <div :class="{ 'is-loading': loading }">
    <div class="preloader-component"
    :class="$store.state.layout.themeDarkMode ? 'dark-mode':'light-mode'">
      <div class="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.is-loading {
  position: relative;
}
.preloader-component {
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  max-height: 75vh;
  /* min-height: 75vh; */
}
.dark-mode{
  background-color: #232837;
}
.light-mode{
  background-color: #fff;
}
.status {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
}
</style>