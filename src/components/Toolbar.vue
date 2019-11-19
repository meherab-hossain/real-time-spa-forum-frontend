<template>
    <div>
        <v-card height="60px" flat tile color="gray-light-4">
            <v-toolbar dense>
                <v-toolbar-title>Forum Page</v-toolbar-title>

                <v-spacer></v-spacer>
               <!-- <router-link tag="span" to="/forum">
                    <v-btn text> Forum</v-btn>
                </router-link>
                <router-link tag="span" to="/forum" v-if="shows">
                    <v-btn text>Ask Question</v-btn>
                </router-link>
                <router-link tag="span" to="/forum" v-if="shows">
                    <v-btn text>Category</v-btn>
                </router-link>
                <router-link tag="span" to="/forum" v-if="!shows">
                    <v-btn text>Logged in</v-btn>
                </router-link>
                <router-link tag="span" to="/forum" v-if="shows">
                    <v-btn text>Logged out</v-btn>
                </router-link>-->
                <template v-if="shows">
                    <template v-for="item in authMenu">
                        <v-btn  text :key="item.title" :to="item.to">
                            {{item.title}}

                        </v-btn>
                    </template>
                </template>
                <template v-if="!shows">
                    <template v-for="item in unAuthMenu" >
                        <v-btn text   :key="item.title" :to="item.to">
                            {{item.title}}
                        </v-btn>
                    </template>
                </template>
            </v-toolbar>
        </v-card>
    </div>
</template>

<script>
    import User from "./Mixins/User";
    import EventBus from "./Mixins/EventBus";
    export default {
        name: "AppHome",
        mixins:[User],
        data(){
            return{
                menus:[],
                authMenu:[
                    {title:'forum' , to:'/forum'},
                    {title:'Ask Question', to:'/ask'},
                    {title:'category',  to:'/category'},
                    {title:'logout' , to:'/logout'}
                ],
                unAuthMenu:[
                    {title:'forum' , to:'/forum'},
                    {title:'login' , to:'/login'}
                ]
            }
        },
        computed:{
          /*  allItems:function () {
                return this.items.filter((i) =>i.show===true )
            }*/
            shows(){
                if(this.loggedIn()){
                    return true
                }
                else {
                    return false
                }
            }

        },
        created(){
          EventBus.$on('logout',() => {
              this.loggedOut()
              this.$router.push('/forum')
          })
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
