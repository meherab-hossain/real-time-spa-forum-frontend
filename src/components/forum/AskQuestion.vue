<template>
    <v-container>
        <v-form @submit.prevent="create">

            <v-text-field
                    label="Title"
                    v-model="form.title"
                    type="text"
                    required
            ></v-text-field>
            {{form.category_id}}
            <v-select
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    v-model="form.category_id"
                    label="Category"
                    autocomplete
            ></v-select>

            <vue-simplemde v-model="form.body" ref="markdownEditor" />

            <v-btn
                    :disabled="validation"
                    color="green"
                    type="submit"
            >Create</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    /* eslint-disable */
   import md from 'marked'
    export default {
        data(){
            return {
                form :{
                    title:null,
                    category_id:null,
                    body:null
                },
                categories:[],
                errors:{}
            }
        },
        created(){
            this.categoryFetch()
        },
        computed:{
            validation(){
                if (!(this.form.title && this.form.body && this.form.category_id)){
                    return true
                }else{
                    return false
                }
            }
        },
        methods:{
            create(){
               return  this.$axios.post('http://127.0.0.1:8000/api/question',this.form)
                    .then(res => {
                        this.$router.push(res.data.path)
                        return res
                    })
                    .catch(error =>{
                        this.errors = error.response.data.error
                        return Promise.reject(error)
                    })
            },
            categoryFetch(){
                this.$axios.get('http://127.0.0.1:8000/api/category')
                    .then(res => this.categories = res.data.data)
            }
        }
    }
</script>

<style>
</style>
