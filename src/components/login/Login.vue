<template>
    <v-form @submit.prevent="login">
        <v-container>
            <v-row>
                <v-col
                        cols="12"
                        md="4"
                >
                    <v-text-field
                            v-model="form.email"
                            type="email"
                            label="E-mail"
                            required
                    ></v-text-field>
                </v-col>
                <v-col
                        cols="12"
                        md="4"
                >
                    <v-text-field
                            v-model="form.password"
                            type="password"
                            label="password"
                            required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-btn color="green" type="submit">
                    Login
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "AppHome",
        data(){
            return{
                form:{
                    email:null,
                    password:null
                }
            }
        },
        methods:{
            login(){
                // eslint-disable-next-line no-console
                axios.post('/api/auth/login', this.form).then(res =>console.log(res.data) )
                // eslint-disable-next-line no-console
                    .catch(err=>console.log(err.response.data))
            }
        }
    }
</script>

<style scoped>

</style>
