<!-- <v-card >
     <v-toolbar color="cyan" dense dark class="mt-1">
         <v-toolbar-title>Category</v-toolbar-title>
     </v-toolbar>
     <v-list class="pa-3" tile>
         <v-list-item-content v-for="category in categories" :key="category.id">
             <v-list-item-title>{{category.name}}</v-list-item-title>
         </v-list-item-content>
     </v-list>
 </v-card>-->
<template>
    <v-expansion-panels>
        <v-expansion-panel
                v-for="(category,i) in categories"
                :key="i"
        >
            <v-expansion-panel-header>{{category.name}}</v-expansion-panel-header>
            <v-expansion-panel-content> <!--v-for="(question in category.category_question)"-->
                {{}}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>


<script>
    /* eslint-disable */

    export default {
        name: "AppSidebar",
        data() {
            return {
                categories: {
                    category_question:[

                    ]
                }
            }
        },
        created() {
            this.$axios.get('http://127.0.0.1:8000/api/category')
                .then(res => {
                    this.categories = res.data.data
                    console.log(this.categories)
                })
        },
    }
</script>

<style scoped>

</style>
