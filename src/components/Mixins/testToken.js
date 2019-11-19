import User from "./User";
export default {
    data(){
        return{
            token:false
        }


    },
    mixins:[User],
    methods:{
        changetoken(){
            if(this.getToken()){
                this.token=true
            }else
                this.token=false
        }
    }
}
