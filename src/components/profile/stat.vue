<script>
/**
 * Stat component -- specify the widget icon, title and value.
 */
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  }
};
</script>

<template>
  <div class="card mini-stats-wid" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
    <div class="card-body">
      <div class="media">
        <div class="media-body">
          <p class="text-muted fw-medium mb-2" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">{{title}}</p>
          <h4 class="mb-0" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''"><span v-if="value">{{value}}</span><span v-else>0</span></h4>
        </div>

        <div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
          <span class="avatar-title">
            <i :class="`${icon} font-size-24`"></i>
          </span>
        </div>
      </div>
    </div>
    <!-- end card-body -->
  </div>
  <!-- end card -->
</template>