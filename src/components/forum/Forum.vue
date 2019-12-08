<template>
        <v-container fluid grid-list-md class="grey lighten-5">
           <v-layout row wrap>
               <v-flex xs8>
                   <Question
                        v-for="(question,index) in questions"
                        :key="index"
                        :data="question"
                   >

                   </Question>
                   <div class="text-xs-center mt-2">
                       <v-pagination
                               v-model="meta.current_page"
                               :length="meta.last_page"
                               @input="changePage"
                               circle
                       ></v-pagination>
                   </div>
               </v-flex>
               <v-flex xs4>
                   <AppSidebar></AppSidebar>
               </v-flex>

           </v-layout>
        </v-container>
</template>

<script>
    /* eslint-disable */

    import Question from "./Question";
    import AppSidebar from "./AppSidebar";
    export default {
        name: "Forum",
        components: {Question, AppSidebar},
        data(){
            return{
                questions:{},
                meta:{}
            }
        },
        created() {
            this.fetchQuestions()
        },
        methods:{
            fetchQuestions(page){
                let url = page ? `http://127.0.0.1:8000/api/question?page=${page}`: 'http://127.0.0.1:8000/api/question'
                this.$axios.get(url)
                    .then(res=>{
                        this.questions=res.data.data
                        this.meta=res.data.meta
                    })
                    .catch(error => console.log(error.response.data))
            },
            changePage(page){
                this.fetchQuestions(page)
            }
        }
    }
</script>

<style scoped>

</style>
