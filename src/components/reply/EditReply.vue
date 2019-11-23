<template>
    <div class="pl-4 ma-3 mt-3">
        <vue-simplemde v-model="data.reply" ref="markdownEditor"/>
        <v-btn icon small>
            <v-icon color="green" @click="update">update</v-icon>
        </v-btn>
        <v-btn class="pl-5" icon small @click="cancel">
            <v-icon color="black">cancel</v-icon>
        </v-btn>
    </div>
</template>

<script>
    /* eslint-disable */

    import EventBus from "../Mixins/EventBus";

    export default {
        name: "EditReply",
        props: ['data'],
        methods: {
            update() {
                console.log(this.data.slug)
                this.$axios.patch("http://127.0.0.1:8000/api/question/" +
                    this.data.question_slug + '/reply/' +
                    this.data.id,{body:this.data.reply})
                    .then((res) => {
                        console.log(res);
                        this.cancel()
                    })


            },
            cancel() {
                console.log('emit')
                EventBus.$emit('cancel')
            }
        }
    }
</script>

<style scoped>

</style>
