<template>
  <div class="page">
      <h2 class="title is-2">Feed Page</h2>

        <div class="columns">
            <div class="column is-one-quarter" @mouseenter="error">
                <Sidebar />
            </div>
            <div class="column is-one-half">

                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Add a picture
                        </p>
                    </header>
                    <p class="card-content">

                        <figure v-for="p in fbPics" :key="p.id" class="image is-64x64" @click.prevent="add(p)">
                            <img :src="p.picture" alt="" />
                        </figure>
                    </p>
                </div>

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
            posts: [],
            fbPics: []
        }
    },
    async created(){
        this.posts = await getPosts();
        FB.api("me/photos?fields=link,images,picture", x=>{
            this.fbPics = x.data
            console.log(x)
        })
    },
    components: {
        Sidebar, Post
    },
    methods: {
        error(){
            //session.addNotification('Something went wrong.', 'danger')
        },
        add(p){
            this.posts.push({
                URL: p.images[0].source
            })
        }
    }
}
</script>

<style>
    .card {
        margin-bottom: 30px ;
    }
</style>