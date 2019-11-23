<template>
    <v-card outlined dark height="200px">
        <v-form ref="categoryFormDialog" @submit.prevent="editMode?update():create()">
            <v-card-text>
                    <v-flex class="mt-4">
                        <v-text-field
                                label="category name"
                                v-model="form.name"
                                type="text"
                                required
                        ></v-text-field>
                    </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        color="green darken-1"
                        outlined
                        @click="closeModal"
                >
                    cancel
                </v-btn>

                <v-btn
                        color="green darken-1"
                        outlined
                        type="submit"
                >
                    {{editMode?'update':'create'}}
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    /* eslint-disable */


    import EventBus from "../Mixins/EventBus";

    export default {
        name: "CreateCategoryDialog",
        data() {
            return {
                form: {
                    name: null
                },
                editSlug:null
            }
        },
        props: {
            editMode: {
                type: Boolean,
                default: false
            },
            categoryName: {
                type: String,
                default: null
            },

        },
        created(){
           /* console.log('event')
            EventBus.$on('setCategoryName',(data)=>{
                console.log(data)
                this.form.name=data.name
                this.editSlug=data.slug
            })*/
        },
        methods: {
            update() {
                this.$emit('update',this.editSlug,this.form)
            },
            create() {
                console.log('dialog')
                this.$emit('create',this.form)
                setTimeout(()=>{
                    this.$refs.categoryFormDialog.reset()
                },10)
            },
            closeModal() {
               // console.log('createCategorydd')
                this.$emit('closeModal')
                this.$refs.categoryFormDialog.reset()
            },
            setCategoryName(category){
               // console.log(category)
                this.form.name=category.name
                this.editSlug=category.slug
            }
        }
    }
</script>

<style scoped>

</style>
