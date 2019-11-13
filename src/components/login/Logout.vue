<template>
    <h2></h2>
</template>


<script>
    import EventBus from "../Mixins/EventBus";
    export default {
        name: "Logout",
        created() {
            EventBus.$emit('logout')
        }
    }
</script>

<style scoped>

</style>
