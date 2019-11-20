/* eslint-disable */
import Token from "./Token";
import AppStorage from "./AppStorage";
import EventBus from "./EventBus";
export default {

    mixins:[Token,AppStorage],
    methods: {
        user(data) {
            // eslint-disable-next-line no-console
            this.$axios.post('http://127.0.0.1:8000/api/auth/login', data).then(res => {
                this.responseAfterLogin(res)
                EventBus.$emit('login')
            })

                .catch(err => {
                    console.log(err.response.data)
                })
        },
        responseAfterLogin(res) {
            const access_token = res.data.access_token
            const username = res.data.user
            if (this.isValid(access_token)) {
                this.store(access_token, username)
            }
        },
        //to verify user logged in use has token or not
        hasToken() {
            const storeToken = this.getToken();
            if (storeToken) {
                return this.isValid(storeToken) ? true : false
            }
            return false
        },
        loggedIn() {

            return this.hasToken()
            // eslint-disable-next-line no-console,no-unreachable
            console.log('logged in')
        },
        loggedOut() {
            return this.clear()
        },
        userName() {
            if (this.loggedIn()) {
                return this.getUser()
            }
        },
        userId() {
            if (this.loggedIn()) {
                const payload = this.payload(this.getToken())
                return payload.sub
            }
        },
        userQuestion(id) {
            if (this.userId() === id) {
                return true
            } else {
                return false
            }
        },
        admin() {
            return this.userId() === 21

        }
    }
}


