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
                let that=this
                // eslint-disable-next-line no-console
                that.$axios.post('http://127.0.0.1:8000/api/auth/login', this.form)
                // eslint-disable-next-line no-console
                    .then(res => {
                        that.responseAfterLogin(res)
                    })
                // eslint-disable-next-line no-console
                    .catch(err=>console.log(err.response.data))
            },
            responseAfterLogin(res){
                const access_token=res.data.access_token
                const username=res.data.user
                if(this.isValid(access_token)){
                    this.store(access_token,username)
                }
            },
            //token store set and get part
            storeToken(token){
                localStorage.setItem('token',token)
            },
            storeUser(user){
                localStorage.setItem('user',user)
            },
            store(token,user){
                this.storeToken(token)
                this.storeUser(user)
            },
            clear(){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            },
            getToken(){
                return localStorage.getItem('token')
            },
            getUser(){
                return localStorage.getItem('user')
            },

            //token payload decode and validation

            isValid(token){
                const payload=this.payload(token)
                if(payload){
                    return payload.iss === "http://127.0.0.1:8000/api/auth/login"
                }
                return false
            },
            payload(token){
                const payload=token.split('.')[1]
                return this.decode(payload)
            },
            decode(payload){
                return JSON.parse(atob(payload))
            },

            //to verify user logged in use has token or not
            hasToken(){
                const storeToken=this.getToken();
                if(storeToken){
                    return this.isValid(storeToken) ? true : false
                }
                return false
            },
            loggedIn(){
                return this.hasToken()
            },
            loggedOut(){
                return this.clear()
            },
            userName(){
                if(this.loggedIn()){
                    return this.getUser()
                }
            },
            userId(){
              if(this.loggedIn()){
                  const payload=this.payload(this.getToken())
                  return payload.sub
              }
            }
        }
    }
</script>

<style scoped>

</style>
