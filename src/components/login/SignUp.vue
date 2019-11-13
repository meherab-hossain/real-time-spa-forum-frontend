<template>
    <v-container>
        <v-form @submit.prevent="signUp">
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                            v-model="form.name"
                            type="text"
                            label="Name"
                            required
                    ></v-text-field>
                    <span class="red--text" v-if="errors.name">{{errors.name[0]}}</span>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                            v-model="form.email"
                            type="email"
                            label="E-mail"
                            required
                    ></v-text-field>
                    <span class="red--text" v-if="errors.email">{{errors.email[0]}}</span>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                            v-model="form.password"
                            type="password"
                            label="password"
                            required
                    ></v-text-field>
                    <span class="red--text" v-if="errors.password">{{errors.password[0]}}</span>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                            v-model="form.password_confirmation"
                            type="password"
                            label="confirm password"
                            required
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="1">
                    <v-btn color="green" type="submit">
                        Sign up
                    </v-btn>
                </v-col>
                <v-col cols="12" md="1">
                    <router-link to="/login">
                        <v-btn  color="blue">Login</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-form>

    </v-container>
</template>

<script>
   import User from "../Mixins/User";
    export default {
        name:"SignUp",
        data(){
            return {
                form :{
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null
                },
                errors:{}
            }
        },
        mixins:[User],
        created(){
            if (this.loggedIn()){
                this.$router.push('/forum')
            }
        },
        methods:{
            signUp(){
                this.$axios.post('http://127.0.0.1:8000/api/auth/signup',this.form)
                    .then(res=>{
                       this.responseAfterLogin(res)
                        this.$router.push('/forum')
                    })
                    .catch(error => this.errors = error.response.data.errors)
            }
        }
    }
</script>

<style>
</style>
<style scoped>

</style>



