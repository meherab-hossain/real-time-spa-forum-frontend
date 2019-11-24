<template>
    <div class="mt-3">
        <v-flex class="mt-2">
            <v-card>
                <v-card-title>
                    <div>
                        <v-card-title>{{data.user_name}}</v-card-title>
                        <v-card-subtitle>said {{data.created_at}}</v-card-subtitle>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                        <Like :likeData="data"></Like>
                    </div>
                </v-card-title>
                <v-divider></v-divider>
                <div v-if="editing">
                    <EditReply :data="data"></EditReply>
                </div>
                <v-card-text v-else>{{data.reply}}</v-card-text>

                <v-divider></v-divider>
                <div v-if="!editing">
                    <v-card-actions v-if="own">
                        <v-btn icon small>
                            <v-icon color="orange" class="material-icons" @click="edit">edit</v-icon>
                        </v-btn>
                        <v-btn icon small>
                            <v-icon color="red" class="material-icons" @click="destroy">delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>

        </v-flex>

    </div>
</template>

<script>
    /* eslint-disable */

    import User from "../Mixins/User";
    import EventBus from "../Mixins/EventBus";
    import EditReply from "./EditReply";
    import Like from "../like/Like";

    export default {
        name: "ShowReply",
        components: {Like, EditReply},
        props: ['data', 'index'],
        mixins: [User],
        data() {
            return {
                editing: false
            }
        },
        computed: {
            own() {
                return this.userId() === this.data.user_id
            }
        },
        created() {
            this.cancel()
        },
        methods: {
            destroy() {
                EventBus.$emit('deleteReply', this.index)
            },
            edit() {
                this.editing = true
            },
            cancel() {
                EventBus.$on('cancel', () => {
                    console.log('on')
                    this.editing = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
