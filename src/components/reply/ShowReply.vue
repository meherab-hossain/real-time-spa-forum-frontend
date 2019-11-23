<template>
    <div class="mt-3">
        <v-flex class="mt-2">
            <v-card>
                <v-card-title>{{data.user_name}}</v-card-title>
                <v-card-subtitle>said {{data.created_at}}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>{{data.reply}}</v-card-text>
                <v-divider></v-divider>
                <v-card-actions v-if="own">
                    <v-btn icon small >
                        <v-icon color="orange" class="material-icons">edit</v-icon>
                    </v-btn>
                    <v-btn icon small>
                        <v-icon color="red" class="material-icons" @click="destroy" >delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-flex>

    </div>
</template>

<script>
    import User from "../Mixins/User";
    import EventBus from "../Mixins/EventBus";

    export default {
        name: "ShowReply",
        props:['data','index'],
        mixins:[User],
        computed:{
            own(){
               return  this.userId() === this.data.user_id
            }
        },
        methods:{
            destroy(){
                EventBus.$emit('deleteReply',this.index)
            }
        }
    }
</script>

<style scoped>

</style>
