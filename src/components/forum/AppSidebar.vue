<template>
    <v-card >
        <v-toolbar color="cyan" dense dark class="mt-1">
            <v-toolbar-title>Category</v-toolbar-title>
        </v-toolbar>
        <v-list class="pa-3" tile>
            <v-list-item-content v-for="category in categories" :key="category.id">
                <v-list-item-title>{{category.name}}}</v-list-item-title>
            </v-list-item-content>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "AppSidebar",
        data(){
            return{
                categories:{}
            }
        },
        created(){
            this.$axios.get('http://127.0.0.1:8000/api/category')
                .then(res => this.categories = res.data.data)
        },
    }
</script>

<style scoped>

</style>
