<template>
    <div>
        <toolbars></toolbars>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Toolbars from './Toolbar.vue';
    import AppFooter from './AppFooter.vue';
    import testToken from "./Mixins/testToken";

    export default {
        name: 'AppHome',
        mixins:[testToken],
        components: {
            Toolbars,
            AppFooter,
        },

    };
</script>

<style scoped>

</style>
