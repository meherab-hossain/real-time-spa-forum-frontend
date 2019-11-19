<template>
    <v-row dense>
        <v-col>
            <v-card class="mx-auto">
                <v-card-title class="headline mb-0">
                    <router-link tag="span" :data="data" :to="data.path">
                        {{data.title}}
                    </router-link>
                </v-card-title>

                <v-card-subtitle>
                    {{data.user}} said {{data.created_at}}
                </v-card-subtitle>
                <v-card-text>
                    {{data.body}}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Question",
        props:['data']
    }
</script>

<style scoped>

</style>
