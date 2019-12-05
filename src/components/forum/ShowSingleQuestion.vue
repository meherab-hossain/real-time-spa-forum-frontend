<template>
    <v-row dense>
        <v-col>
            <v-card class="mx-auto">
                <v-card-title class="headline mb-0">
                    {{content.title}}
                    <v-spacer></v-spacer>
                    <v-btn class="teal">{{content.reply_count}}</v-btn>
                </v-card-title>

                <v-card-subtitle>
                    {{content.user}} said {{content.created_at}}
                </v-card-subtitle>
                <v-card-text v-html="content.body">
                </v-card-text>
                <v-card-actions v-if="isUserQuestion">
                    <v-btn icon small @click="edit">
                        <v-icon color="orange" class="material-icons">edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click="destroy">
                        <v-icon color="red" class="material-icons">delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    // import md from 'marked'
    import User from "../Mixins/User";
    import EventBus from "../Mixins/EventBus";

    export default {
        name: "ShowSingleQuestion",
        props:{
            singleQuestion:{
                type:Object
            }
        },
        data() {
            return {
                content:null
            }
        },
        computed: {
            /*body(){
                return md.parse(this.singleQuestion.body)
            }*/
            isUserQuestion() {
                if (this.userId() === this.singleQuestion.user_id) {
                    return true
                } else {
                    return false
                }
            }
        },
        mixins: [User],
        created(){
            EventBus.$on('newReply',()=>{
                this.content.reply_count++
            })
            EventBus.$on('deleteReply',()=>{
                this.content.reply_count--
            })
        },
        methods: {
            destroy() {
                this.$axios.delete(`http://127.0.0.1:8000/api/question/${this.$route.params.slug}`)
                // eslint-disable-next-line no-unused-vars
                    .then(res =>
                            this.$router.push('/forum')
                        // eslint-disable-next-line no-console
                    ).catch(error => console.log(error.response.singleQuestion))
            },
            edit() {
                EventBus.$emit('startEditing')
            },
            getQuestion(){
                this.content=this.singleQuestion
            },
        },
        watch:{
            singleQuestion:{
                handler(){
                    this.getQuestion()
                },
                deep:true,
                immediate:true
            }
        }
    }
</script>

<style scoped>

</style>
