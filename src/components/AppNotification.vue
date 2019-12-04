
<template>
    <div class="text-xs-center">
        <v-menu offset-y>
            <template  v-slot:activator="{ on }">
                <v-btn
                        transition="scale-transition"
                        icon
                       v-on="on">
                    <v-icon :color="color">notifications_active</v-icon>{{unreadCount}}
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="item in unread" :key="item.id">
                    <router-link :to="item.path">
                        <v-list-item-title @click="readIt(item)">{{item.question}}</v-list-item-title>
                    </router-link>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item v-for="item in read" :key="item.id">
                    <v-list-item-title>{{item.question}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    /* eslint-disable */

    import User from "./Mixins/User";
    import Exception from "./Mixins/Exception";

    export default {
        data() {
            return {
                read: {},
                unread: {},
                unreadCount: 0
            }
        },
        mixins: [User,Exception],
        created() {
            if (this.loggedIn()) {
                this.getNotifications()
            }
        },
        methods: {
            getNotifications() {
                this.$axios.post("http://127.0.0.1:8000/api/notifications")
                    .then(res => {
                        console.log(res)
                        this.read = res.data.read
                        this.unread = res.data.unread
                        this.unreadCount = res.data.unread.length
                    })
                    .catch(error => this.handles(error))
            },
            readIt(notification){
                this.$axios.post('http://127.0.0.1:8000/api/markAsRead',{id:notification.id})
                    .then(() => {
                        this.unread.splice(notification,1)
                        this.read.push(notification)
                        this.unreadCount--
                    })
            },
            width(){
              if(this.read.question.length<20 || this.unread.question.length<20){
                  return true
              }
            }
        },
        computed:{
            color(){
                return this.unreadCount > 0 ? 'red' : 'red lighten-4'
            }
        }
    }
</script>

<style>
    .wid{
        width: 150px;
    }
    #widen{
        width: auto;
    }
</style>
