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
    <div>
        <v-toolbar color="cyan" dense dark class="mt-1">
            <v-toolbar-title>Question by Category</v-toolbar-title>
        </v-toolbar>
        <v-expansion-panels>
            <v-expansion-panel
                    v-for="(category,i) in categories"
                    :key="i"
            >
                <v-expansion-panel-header>{{category.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list two-line>
                        <v-list-item-group active-class="pink--text">
                            <template v-for="(question,index) in category.category_question">
                                <v-list-item :key="index">
                                    <v-list-item-action>
                                        <template v-if="question">
                                            <v-list-item-action-text>

                                                <router-link :to="question.path">{{question.title}}</router-link>

                                                <v-list-item-content>{{question.body}}</v-list-item-content>
                                            </v-list-item-action-text>
                                        </template>
                                        <v-list-item-action-text v-else>No question</v-list-item-action-text>
                                    </v-list-item-action>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-expansion-panel-content>

            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>


<script>
    /* eslint-disable */

    export default {
        name: "AppSidebar",
        data() {
            return {
                categories: {},
            }
        },
        created() {
            this.$axios.get('http://127.0.0.1:8000/api/category')
                .then(res => {
                    this.categories = res.data.data
                    //console.log(this.categories)
                })
        },
        methods: {
            /*categoryQuestion(category){
                if (category.category_question.length!==undefined && category.category_question.length>0){
                    category.category_question.map(item=>{
                       console.log(item.body)
                        return item.body

                    })

                }else{
                    return 'no title'
                }
            }*/
        }
    }
</script>

<style scoped>

</style>
