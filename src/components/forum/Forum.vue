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
               </v-flex>
                   Sidebar
           </v-layout>
        </v-container>
</template>

<script>
    /* eslint-disable */

    import Question from "./Question";
    export default {
        name: "Forum",
        components: {Question},
        data(){
            return{
                questions:{}
            }
        },
        created() {
            this.$axios.get('http://127.0.0.1:8000/api/question')
                .then(res=>{
                    this.questions=res.data.data
                })
                .catch(error => console.log(error.response.data))
        }
    }
</script>

<style scoped>

</style>
