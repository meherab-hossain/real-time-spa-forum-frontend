<template>
    <div class="ma-2" v-if="singleQuestion">
        <EditQuestion
                :data="singleQuestion"
                v-if="editing">

        </EditQuestion>

        <ShowSingleQuestion
                v-else
                :data="singleQuestion"
        />

        <div v-if="!editing">
            <FetchReplies :question="singleQuestion"></FetchReplies>
            <NewReply :questionSlug="singleQuestion.slug"></NewReply>
        </div>

    </div>
</template>

<script>
    import EditQuestion from "./EditQuestion";
    import ShowSingleQuestion from "./ShowSingleQuestion";
    import FetchReplies from "../reply/FetchReplies";
    import NewReply from "../reply/NewReply";
    import EventBus from "../Mixins/EventBus";
    export default {
        name: "FetchSingleQuestion",
        components: {EditQuestion, ShowSingleQuestion,FetchReplies,NewReply},
        data(){
            return{
                singleQuestion:{},
                editing:false
            }
        },
        created() {
            this.editlistener()
            this.$axios.get(`http://127.0.0.1:8000/api/question/${this.$route.params.slug}`)
                .then(res=>{
                    this.singleQuestion=res.data.data
                })
        },
        methods:{
             editlistener(){
                 EventBus.$on('startEditing',()=>{
                     this.editing=true
                 }),
                 EventBus.$on('cancelEditing',()=>{
                     this.editing=false
                 })
             }
        }
    }
</script>

<style scoped>

</style>
