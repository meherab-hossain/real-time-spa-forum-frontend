<template>
    <v-card>
        <v-form ref="categoryForm" @submit.prevent="editMode?update():create()">
            <v-text-field
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
    </v-card>
</template>

<script>
    import EventBus from "../Mixins/EventBus";

    export default {
        name: "CreateCategoryDialog",
        data(){
            return{
                form:{
                  name:null
                },
                editMode:false
            }
        },
        methods:{
            update(){
                EventBus.$emit('update')
            },
            create(){
                EventBus.$emit('destroy')
            },
            closeModal(){
                EventBus.$emit('closeModal')
            }
        }
    }
</script>

<style scoped>

</style>
