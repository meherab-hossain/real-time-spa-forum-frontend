<template>
    <!--v-if="question.replies"-->
    <div class="pl-4 ma-3" >
        <ShowReply
                v-for="(reply,index) in content"
                :index="index"
                :key="reply.id"
                :data="reply">

        </ShowReply>

    </div>

</template>

<script>
    /* eslint-disable */

    import ShowReply from "./ShowReply";
    import EventBus from "../Mixins/EventBus";
    import User from "../Mixins/User";

    export default {
        name: "FetchReplies",
        props: ['question'],
        data(){
          return{

              content:null
          }
        },
        mixins:[User],
        components: {ShowReply},
        created() {
            this.newReplyListener()
            this.deleteReplyListener()
            /*Echo.private('App.User.' + this.userId())
                .notification((notification) => {
                    console.log(notification.type);
                });*/
        },
        methods:{
            getReplies(){
              this.content= this.question.replies
            },
            newReplyListener(){
                EventBus.$on('newReply',(data)=>{
                    //console.log(data)
                    //this.question.replies.push(data)
                    this.content.unshift(data)

                })

                },
            deleteReplyListener(){
                EventBus.$on('deleteReply',(index)=>{
                   // console.log(index,this.question.slug,this.content[index].id)
                    this.$axios.delete("http://127.0.0.1:8000/api/question/"+
                    this.question.slug+'/reply/'+
                    this.content[index].id)
                        .then((res)=>{
                            //console.log(res);
                            this.content.splice(index,1)
                        })

                })
            },



            },
        watch:{
            question:{
                handler(){
                    this.getReplies()
                },
                deep:true,
                immediate:true
            }
        }

        }
</script>

<style scoped>

</style>
