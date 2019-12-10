<template>
    <div>
        <v-card height="60px" flat tile color="gray-light-4">
            <v-toolbar dark color="indigo darken-1">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>
                    <router-link to="/">Forum Page</router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>
                <AppNotification v-if="isLogged"></AppNotification>
                <v-app-bar-nav-icon class="hidden-md-and-up" @click="rightDrawer = !rightDrawer"></v-app-bar-nav-icon>
                <div class="hidden-sm-and-down">
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
            <v-sheet
                    height="465"
                    class="overflow-hidden"
                    style="position: relative"
            >
                <v-navigation-drawer
                        v-model="drawer"
                        absolute
                        temporary
                >
                    <v-list dense>
                        <div>
                            <template v-if="isLogged">
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{this.userName()}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-item v-for="item in authMenu" :key="item.title" :to="item.to">
                                        <v-list-item-icon class="darken-1">
                                            <v-icon>{{ item.icon }}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>

                            </template>
                            <template v-if="!isLogged">
                                <v-list-item v-for="item in unAuthMenu" :key="item.title" :to="item.to">
                                    <v-list-item-icon>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </div>
                    </v-list>
                </v-navigation-drawer>
            </v-sheet>
        </v-card>
        <v-navigation-drawer
                v-model="rightDrawer"
                absolute
                temporary
                right
        >
            <v-list dense>
                <div>
                    <template v-if="isLogged">
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{this.userName()}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-item v-for="item in authMenu" :key="item.title" :to="item.to">
                                <v-list-item-icon class="darken-1">
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                    </template>
                    <template v-if="!isLogged">
                        <v-list-item v-for="item in unAuthMenu" :key="item.title" :to="item.to">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </div>
            </v-list>
        </v-navigation-drawer>
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
        mixins: [User, AppStorage],
        data() {
            return {
                rightDrawer: false,
                drawer: null,
                authMenu: [
                    {title: 'forum', to: '/forum', icon: 'dashboard'},
                    {title: 'Ask Question', to: '/ask', icon: 'question_answer'},
                    {title: 'category', to: '/category', icon: 'list'},
                    {title: 'logout', to: '/logout', icon: 'logout'}
                ],
                unAuthMenu: [
                    {title: 'forum', to: '/forum', icon: 'dashboard'},
                    {title: 'login', to: '/login', icon: 'logout'}
                ],
                isLogged: this.checkIfIsLogged()
            }
        },
        created() {
            EventBus.$on('logout', () => {
                this.loggedOut()
                this.isLogged = this.checkIfIsLogged()
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
                    return false
                }
            }
        }

    }
</script>

<style scoped>
    .header {
        position: fixed;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 0; /* top left corner should start at topmost spot */
        width: 100vw; /* take up the full browser width */
        z-index: 200; /* high z index so other content scrolls underneath */
        height: 100px; /* define height for content */
    }
</style>
