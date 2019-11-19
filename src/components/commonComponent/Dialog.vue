<template>
   <div>
       <v-card>
           <v-card-title class="headline">Are you sure???</v-card-title>

           <v-card-text>
               you want to delete this category???
           </v-card-text>

           <v-card-actions>
               <v-spacer></v-spacer>

               <v-btn
                       color="green darken-1"
                       text
                       @click="cancel"
                       outlined
               >
                   <span class="text-capitalize" >Cancel</span>
               </v-btn>

               <v-btn
                       color="red darken-1"
                       text
                       @click="destroy()"
                       outlined
               >
                   <span class="text-capitalize" >Delete</span>
               </v-btn>
           </v-card-actions>
       </v-card>
   </div>
</template>

<script>
    export default {
        name: "Dialog",
        methods:{
            destroy(){
                this.$emit('destroy')
            },
            cancel(){
                this.$emit('cancelDialog')
            }
        }
    }
</script>

<style scoped>

</style>
