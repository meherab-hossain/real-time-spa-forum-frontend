<template>
    <div>
        <v-form @submit.prevent="login">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                                v-model="form.email"
                                type="email"
                                label="E-mail"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                                v-model="form.password"
                                type="password"
                                label="password"
                                required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="1">
                        <v-btn :disabled="validation" color="green" type="submit">
                            Login
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="1">
                        <router-link to="/signup">
                            <v-btn color="blue">sign up</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
    import user from '../Mixins/User'

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    email: null,
                    password: null
                },
            }
        },
        mixins: [user],
        created() {
            if (this.loggedIn()) {
                this.$router.push('/forum')
            }
        },
        computed: {
            validation() {
                if (!(this.form.email && this.form.password)) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            login() {
                this.user(this.form)
            }
        }
    }
</script>

<style scoped>

</style>
