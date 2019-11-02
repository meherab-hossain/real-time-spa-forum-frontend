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

    export default {
        name: 'AppHome',
        components: {
            Toolbars,
            AppFooter
        },
    };
</script>

<style scoped>

</style>
