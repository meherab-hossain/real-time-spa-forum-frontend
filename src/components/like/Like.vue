<template>
    <v-btn icon small @click="likeIt">
        <v-icon :color="color" class="material-icons">favorite</v-icon>
        {{count}}
    </v-btn>

</template>

<script>
    import User from "../Mixins/User";

    export default {
        name: "Like",
        props: ['likeData'],
        data() {
            return {
                id: null,
                like: this.likeData.liked,
                count: this.likeData.like_count
            }
        },
        mixins: [User],
        computed: {
            color() {
                return this.like ? 'red' : 'red-lighten-4'
            }
        },
        methods: {
            getReplyId() {
                this.id = this.likeData.id
            },
            likeIt() {
                if (this.loggedIn()) {

                    this.like ? this.decre() : this.incre()
                    this.like = !this.like
                }
            },
            incre() {
                this.$axios.post("http://127.0.0.1:8000/api/like/" +
                    this.id)
                    .then(() => this.count++)


            },
            decre() {
                this.$axios.delete("http://127.0.0.1:8000/api/like/" +
                    this.id)
                    .then(() => this.count--)

            }
        },
        watch: {
            likedData: {
                handler() {
                    this.getReplyId()
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>
