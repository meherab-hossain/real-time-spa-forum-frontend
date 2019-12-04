<template>
    <v-btn icon small @click="likeIt">
        <v-icon :color="color" class="material-icons">favorite</v-icon>
        {{count}}
    </v-btn>

</template>

<script>
    /* eslint-disable */

    import User from "../Mixins/User";

    export default {
        name: "Like",
        props: ['likeData'],
        data() {
            return {
                id: null,
                like: this.likeData.liked,
                count: this.likeData.like_count,
                check:0
            }
        },
        mixins: [User],
        computed: {
            color() {
                return this.like ? 'red' : 'red-lighten-4'
            }
        },
        created() {
            //this.getCount(),
            //console.log(this.getCount())
            Echo.channel('likeChannel')
                .listen('LikeEvent', (e) => {
                    if (this.id === e.id) {
                        e.type === 1 ? this.count++ : this.count--
                        console.log(e)
                       // console.log(e.type === 1 ? "check value:"+this.check++ : this.check--)
                    }

                });
        },
        methods: {
            getReplyId() {
                this.id = this.likeData.id
            },
            getCount(){
                 this.count.push(this.likeData.like_count)
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
                    .then((res) => {
                        console.log(this.count),
                        this.count++
            })


            },
            decre() {
                this.$axios.delete("http://127.0.0.1:8000/api/like/" +
                    this.id)
                    .then(() => {
                        console.log(this.count)
                        this.count--

                    })


            },
            getUniqueListBy(arr, key) {
                // https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
                return [...new Map(arr.map(item => [item[key], item])).values()]
            },
        },
        watch: {
            likeData: {
                handler() {
                    this.getReplyId()
                },
                deep: true,
                immediate: true
            },
            /*count: {
                handler() {
                    this.getCount()
                },
                deep: true,
                immediate: true
            }*/
        }
    }
</script>

<style scoped>

</style>
