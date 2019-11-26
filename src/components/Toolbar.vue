<template>
    <div>
        <v-card height="60px" flat tile color="gray-light-4">
            <v-toolbar dense>
                <v-toolbar-title>Forum Page</v-toolbar-title>

                <v-spacer></v-spacer>
                <AppNotification v-if="isLogged"></AppNotification>
                <div>
                    <template v-if="isLogged">
                        <template v-for="item in authMenu">
                            <v-btn text :key="item.title" :to="item.to">
                                {{item.title}}

                            </v-btn>
                        </template>
                    </template>
                    <template v-if="!isLogged">
                        <template v-for="item in unAuthMenu">
                            <v-btn text :key="item.title" :to="item.to">
                                {{item.title}}
                            </v-btn>
                        </template>
                    </template>
                </div>
            </v-toolbar>
        </v-card>
    </div>
</template>

<script>
    import User from "./Mixins/User";
    import EventBus from "./Mixins/EventBus";
    import AppStorage from "./Mixins/AppStorage";
    import AppNotification from "./AppNotification";

    export default {
        name: "AppHome",
        components: {AppNotification},
        mixins: [User,AppStorage],
        data() {
            return {
                menus: [],
                authMenu: [
                    {title: 'forum', to: '/forum'},
                    {title: 'Ask Question', to: '/ask'},
                    {title: 'category', to: '/category'},
                    {title: 'logout', to: '/logout'}
                ],
                unAuthMenu: [
                    {title: 'forum', to: '/forum'},
                    {title: 'login', to: '/login'}
                ],
                isLogged: this.checkIfIsLogged()
            }
        },
        created() {
            EventBus.$on('logout', () => {
                this.loggedOut()
                this.isLogged=this.checkIfIsLogged()
                this.$router.push('/forum')
            }),
                EventBus.$on('login', () => {
                    this.isLogged = this.checkIfIsLogged()
                    this.$router.push('/forum')
                })
        },
        methods: {
            checkIfIsLogged() {
                if (this.getToken()) {
                    return true
                } else {
                    return  false
                }
            }
        }

    }
</script>

<style scoped>

</style>
