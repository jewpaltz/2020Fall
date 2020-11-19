<template>
  <div class="page">
      <h2 class="title is-2">Feed Page</h2>

        <div class="columns">
            <div class="column is-one-quarter" @mouseenter="error">
                <Sidebar />
            </div>
            <div class="column is-one-half">
                <Post v-for=" (x, i) in posts " 
                      :key="i"
                      :i="i"
                      :post="x" /> 
            </div>
            <div class="column is-one-quarter" @mouseenter="error">
                <Sidebar />
            </div>
        </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Post from "@/components/Post";
import { getPosts } from "@/models/feed";
import session from "@/models/session";

export default {
    data(){
        return {
            posts: []
        }
    },
    async created(){
        this.posts = await getPosts();
    },
    components: {
        Sidebar, Post
    },
    methods: {
        error(){
            //session.addNotification('Something went wrong.', 'danger')
        }
    }
}
</script>

<style>
    .card {
        margin-bottom: 30px ;
    }
</style>