<template>
    <div class="pl-4 ma-2">
        <ShowReply
                v-for="reply in replies"
                :key="reply.id"
                :data="reply">

        </ShowReply>
    </div>

</template>

<script>
    import ShowReply from "./ShowReply";

    export default {
        name: "FetchReplies",
        props: ['replies'],
        components: {ShowReply}
    }
</script>

<style scoped>

</style>
