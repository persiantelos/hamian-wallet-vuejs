<script>
import {
    layoutComputed
} from "@/state/helpers";
import Vertical from "./vertical";
import Horizontal from "./horizontal";
import PageHeader from '@/components/page-header.vue';

export default {
    components: {
        Vertical,
        Horizontal,
        PageHeader
    },
    data() {
        return {
        };
    },
    computed: {
        ...layoutComputed,
    },
    methods: {},
    mounted() {
        // document.querySelector("html").setAttribute('dir', 'rtl');
    },
};
</script>

<template>
<div>  
    <Vertical :class="$store.state.layout.themeDarkMode ? 'dark-mode':''" v-if="layoutType === 'vertical'" :layout="layoutType">
        <PageHeader  :title="$store.state.currentPageTitle" :items="$store.state.currentPageItems" />
        <slot />
    </Vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
        <slot />
    </Horizontal>
</div>
</template>
<style lang="scss" scoped>
.dark-mode{
    background: #232837 !important;
}
</style>
