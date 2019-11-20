<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <v-form ref="categoryForm" @submit.prevent="submit">
                    <v-text-field
                            label="category name"
                            v-model="form.name"
                            type="text"
                            required
                    ></v-text-field>
                    <v-btn
                            v-if="editSlug"
                            color="teal"
                            type="submit"
                    >update
                    </v-btn>
                    <v-btn
                            v-else
                            color="teal"
                            type="submit"
                    >Create
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10">
                <v-card >
                    <v-toolbar color="indigo" dense dark class="mt-1">
                        <v-toolbar-title>Category</v-toolbar-title>
                    </v-toolbar>
                    <v-list class="pa-3" tile>
                        <div v-for="(category,index) in categories" :key="category.id">
                            <v-list-item >
                                <v-list-item-action>
                                    <v-btn icon small >
                                        <v-icon color="orange" class="material-icons" @click="edit(category,index)">edit</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>{{category.name}}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn color="green darken-1"
                                            text
                                            icon small @click="dialogeMethod(category.slug,index)">
                                        <v-icon color="red" class="material-icons" >delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider></v-divider>
                        </div>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <Dialog @destroy="destroy" @cancelDialog="dialog=false"></Dialog>
        </v-dialog>
    </v-container>
</template>

<script>
    /* eslint-disable */
    import Dialog from "../commonComponent/Dialog";
    import User from "../Mixins/User";

    export default {
        name: "CreateCategory",
        mixins:[User],
        data() {
            return {
                form:{
                    name: null
                },
                categories:[],
                dialog:false,
                slug:null,
                index:null,
                errors:null,
                editSlug:null
            }
        },
        components:{Dialog},
        created(){
            if (!this.admin()){
                this.$router.push('/forum')
            }
            this.categoryFetch()
        },
        computed:{
            /*e :function(){
                return this.editSlug
             }*/
        },
        methods: {
            categoryFetch(){
                return this.$axios.get('http://127.0.0.1:8000/api/category')
                    .then(res => {
                        this.categories = res.data.data
                        return res
                    })
                    .catch(error=>{
                        this.errors=error.response.data.error
                        return Promise.reject(error)
                    })
            },
            submit(){
                this.editSlug? this.update():this.create()
            },
            create() {
                return  this.$axios.post('http://127.0.0.1:8000/api/category', this.form)
                // eslint-disable-next-line,no-unused-vars
                    .then(res => {
                        console.log(res)
                        this.categories.unshift(res.data)
                        this.$refs.categoryForm.reset()

                    })
            },
            destroy(){
                this.$axios.delete(`http://127.0.0.1:8000/api/category/${this.slug}` )
                // eslint-disable-next-line no-console,no-unused-vars
                    .then(res => {
                        this.dialog=false
                        this.categories.splice(this.index,1)
                    })
            },
            update(){
                return  this.$axios.patch(`http://127.0.0.1:8000/api/category/${this.editSlug}`, this.form)
                // eslint-disable-next-line,no-unused-vars
                    .then(res => {
                        console.log(res)
                        this.categories.push(res.data)
                        console.log(this.categories)
                        this.categories=this.getUniqueListBy(this.categories,'id')
                        //console.log(this.categories)
                        this.$refs.categoryForm.reset()

                    })
            },
            dialogeMethod(slug,index){
                this.slug=slug
                this.index=index
                this.dialog=true
            },
            edit(category,index){
                this.form.name=category.name
                this.editSlug=category.slug
                //this.categories.splice(index,1)
               //console.log([...new Set(this.categories)]) //.splice(index,1)

            },
            getUniqueListBy(arr, key) {
                // https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
                return [...new Map(arr.map(item => [item[key], item])).values()]
            }

        }
    }
</script>

<style scoped>

</style>
