<template>
    <v-container>
        <v-row>
            <v-col cols="10">
                <v-card >
                    <v-toolbar color="indigo" dense dark class="mt-1">
                        <v-toolbar-title>Category</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn @click="categoryDialog=true">create new category</v-btn>
                    </v-toolbar>
                    <v-list class="pa-3" tile>
                        <div v-for="(category,index) in categories" :key="category.id">
                            <v-list-item >
                                <v-list-item-action>
                                    <v-btn icon small >
                                        <v-icon color="orange" class="material-icons" @click="edit(category)">edit</v-icon>
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



                <v-dialog
                        v-model="categoryDialog"
                        class="pa-4"
                        max-width="400"
                        persistent
                >
                    <CreateCategoryDialog ref="categoryForm"
                                          :editMode="editMode"
                                          @closeModal="closeModal" @create="create"
                                          @update="update">

                    </CreateCategoryDialog>
                    <!--<v-card>
                        <div>
                            <v-flex class="ma-2">
                                <v-form ref="categoryFormDialog" @submit.prevent="editMode?update():create()">
                                    <v-text-field
                                            color="pink"
                                            label="category name"
                                            v-model="form.name"
                                            type="text"
                                            required
                                    ></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                                color="green darken-1"
                                                text
                                                @click="closeModal"
                                        >
                                            cancel
                                        </v-btn>

                                        <v-btn
                                                color="green darken-1"
                                                type="submit"
                                        >
                                            {{editMode?'update':'create'}}
                                        </v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-flex>
                        </div>
                    </v-card>-->
                </v-dialog>


    </v-container>
</template>

<script>
    /* eslint-disable */
    import Dialog from "../commonComponent/Dialog";
    import User from "../Mixins/User";
    import CreateCategoryDialog from "../commonComponent/CreateCategoryDialog";
    import EventBus from "../Mixins/EventBus";

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
                editSlug:null,
                editMode:false,
                categoryDialog:false,

            }
        },
        components:{CreateCategoryDialog, Dialog},
        created(){
            if (!this.admin()){
                this.$router.push('/forum')
            }
            this.categoryFetch()
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
            /*submit(){
                this.editMode? this.update():this.create()
            },*/
            create(form) {
                this.categoryDialog=false
                return  this.$axios.post('http://127.0.0.1:8000/api/category', form)
                // eslint-disable-next-line,no-unused-vars
                    .then(res => {
                        console.log(res)
                        this.categories.unshift(res.data)


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
            update(editslug,form){
                this.categoryDialog=false
                return  this.$axios.patch(`http://127.0.0.1:8000/api/category/${editslug}`, form)
                // eslint-disable-next-line,no-unused-vars
                    .then(res => {
                        console.log(res)
                        this.categories.push(res.data)
                        console.log(this.categories)
                        this.categories=this.getUniqueListBy(this.categories,'id')
                        //console.log(this.categories)
                        //this.$refs.categoryFormDialog.reset()
                        this.editMode=false
                    })
            },
            dialogeMethod(slug,index){
                this.slug=slug
                this.index=index
                this.dialog=true
            },
            edit(category){
                this.editMode=true
                this.categoryDialog=true
                console.log(category)
                this.$nextTick(()=>{
                    this.$refs.categoryForm.setCategoryName(category)
                })

                //EventBus.$emit('setCategoryName',category)
                //this.categoryName=category.name
                //this.editSlug=category.slug


                //this.categories.splice(index,1)
               //console.log([...new Set(this.categories)]) //.splice(index,1)

            },
            getUniqueListBy(arr, key) {
                // https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
                return [...new Map(arr.map(item => [item[key], item])).values()]
            },
            closeModal(){
                console.log('createCategory')
                this.categoryDialog = false
                this.editMode=false
            }

        }
    }
</script>

<style scoped>

</style>
