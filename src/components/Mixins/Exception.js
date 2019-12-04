//Token is expired
import User from "./User";
import AppStorage from "./AppStorage";
export default {
    mixins:[User,AppStorage],
    methods:{
        handles(error){
            this.isExpired(error.response.data.error)
        },
        isExpired(error){
            if(error === 'Token is expired'){
                this.loggedOut()
            }
        }
    }
}
