<template>
    <v-row dense>
    <v-col>
        <v-card class="mx-auto">
            <v-card-title class="headline mb-0">
                {{data.title}}
                <v-spacer></v-spacer>
                <v-btn class="teal"> 5 Replies</v-btn>
            </v-card-title>

            <v-card-subtitle>
                {{data.user}} said {{data.created_at}}
            </v-card-subtitle>
            <v-card-text v-html="data.body">
            </v-card-text>
            <v-card-actions v-if="isUserQuestion">
                <v-btn icon small  @click="edit" >
                    <v-icon color="orange" class="material-icons">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red" class="material-icons" >delete</v-icon>
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
        props:['data'],
        computed:{
           /*body(){
               return md.parse(this.data.body)
           }*/
            isUserQuestion(){
                if(this.userId()===this.data.user_id){
                    return true
                }else{
                    return false
                }
            }
        },
        mixins:[User],
        methods:{
            destroy(){
                this.$axios.delete(`http://127.0.0.1:8000/api/question/${this.$route.params.slug}`)
                // eslint-disable-next-line no-unused-vars
                    .then(res=>
                        this.$router.push('/forum')
                        // eslint-disable-next-line no-console
                    ).catch(error=>console.log(error.response.data))
            },
            edit(){
                EventBus.$emit('startEditing')
            }

        }
    }
</script>

<style scoped>

</style>
