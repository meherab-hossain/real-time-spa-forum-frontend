<template>
    <div class="pl-4 ma-3 mt-3">
        <vue-simplemde  v-model="body" ref="markdownEditor" />
        <v-btn icon small @click="submit">
            <v-icon color="green">reply</v-icon>
        </v-btn>
    </div>
</template>

<script>
    /* eslint-disable */

    import EventBus from "../Mixins/EventBus";

    export default {
        name: "NewReply",
        data(){
            return{
                body:null
            }
        },
        props:{
            questionSlug:{
                type:String,
                default:null
            }
        },
        methods:{
            submit(){
                 this.$axios.post(`http://127.0.0.1:8000/api/question/${this.questionSlug}/reply`,{body:this.body})
                    .then((res)=>{
                       // console.log(res.data.reply)
                        this.body=''
                        EventBus.$emit('newReply',res.data.reply)
                        window.scroll(0,0)


                    })
            }
        }
    }
</script>

<style scoped>

</style>
