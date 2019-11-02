<template>
    <div>
        <v-card height="60px" flat tile color="gray-light-4">
            <v-toolbar dense>
                <v-toolbar-title>Forum Page</v-toolbar-title>

                <v-spacer></v-spacer>

                <div>
                    <router-link to="/forum">
                        <v-btn text>Forum</v-btn>
                    </router-link>
                    <v-btn text>Ask Question</v-btn>
                    <v-btn text>Category</v-btn>
                    <router-link to="/login">
                        <v-btn text>Login</v-btn>
                    </router-link>
                </div>

            </v-toolbar>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "AppHome"
    }
</script>

<style scoped>

</style>
