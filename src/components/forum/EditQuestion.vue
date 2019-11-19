<template>
    <v-container fluid>
        <v-card>
            <v-form @submit.prevent="update" class="pa-5">
                <v-row dense>
                    <v-col>
                        <v-text-field
                                label="Title"
                                v-model="form.title"
                                type="text"
                                required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12">
                        <vue-simplemde v-model="form.body" ref="markdownEditor"/>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-btn icon small type="submit">
                        <v-icon color="teal" class="material-icons">update</v-icon>
                    </v-btn>
                    <v-btn icon small>
                        <v-icon class="material-icons" @click="cancel">cancel</v-icon>
                    </v-btn>
                </v-card-actions>

            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    /* eslint-disable */

    import EventBus from "../Mixins/EventBus";

    export default {
        name: "EditQuestion",
        props:['data'],
        data() {
            return {
                form: {
                    title: null,
                    body: null
                },
                categories: {},
                errors: {}
            }
        },
        created() {
            this.form=this.data
        },
        methods:{
            cancel(){
                EventBus.$emit('cancelEditing')
            },
            update(){
                this.$axios.patch(`http://127.0.0.1:8000/api/question/${this.$route.params.slug}`,this.form)
                // eslint-disable-next-line no-unused-vars
                    .then(res=>{
                        this.cancel()
                    })
                    .catch(error=>console.log(error.response.data))
            }
        }
    }
</script>

<style scoped>

</style>
