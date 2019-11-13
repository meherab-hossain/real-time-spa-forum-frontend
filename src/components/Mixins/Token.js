export default {
    data(){
        return{
            sign:"http://127.0.0.1:8000/api/auth/login",
            logs:"http://127.0.0.1:8000/api/auth/signup"
        }
    },
    methods:{
        //token payload decode and validation
        isValid(token){
            const payload=this.payload(token)
            if(payload){
                if(payload.iss === this.sign || this.logs){
                    return true
                }else {
                    return false
                }
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
    }
}
