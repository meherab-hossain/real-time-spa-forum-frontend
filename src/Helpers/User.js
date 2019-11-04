

// eslint-disable-next-line no-unused-vars
class User{
    login(data){
        let that=this
        // eslint-disable-next-line no-console
        that.$axios.post('http://127.0.0.1:8000/api/auth/login', data).then(res =>console.log(res.data) )
        // eslint-disable-next-line no-console
            .catch(err=>console.log(err.response.data))
    }
}


