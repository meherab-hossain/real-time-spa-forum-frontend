<template>
    <div class="mt-2">
        <v-flex class="mt-2">
            <v-card>
                <v-card-title>{{data.user_name}}</v-card-title>
                <v-card-subtitle>said {{data.created_at}}</v-card-subtitle>
                <v-card-text>{{data.reply}}</v-card-text>
            </v-card>
        </v-flex>

    </div>
</template>

<script>
    export default {
        name: "ShowReply",
        props:['data']
    }
</script>

<style scoped>

</style>
