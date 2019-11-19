<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <v-form ref="categoryForm" @submit.prevent="create">
                    <v-text-field
                            label="category name"
                            v-model="form.name"
                            type="text"
                            required
                    ></v-text-field>
                    <v-btn
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
                                        <v-icon color="orange" class="material-icons">edit</v-icon>
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
    export default {
        name: "CreateCategory",
        data() {
            return {
                form:{
                    name: null
                },
                categories:{},
                dialog:false,
                slug:null,
                index:null
            }
        },
        components:{Dialog},
        created(){
            this.$axios.get('http://127.0.0.1:8000/api/category')
                .then(res => this.categories = res.data.data)
        },
        methods: {
            create() {
                this.$axios.post('http://127.0.0.1:8000/api/category', this.form)
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
            dialogeMethod(slug,index){
                this.slug=slug
                this.index=index
                this.dialog=true
            }

        }
    }
</script>

<style scoped>

</style>
