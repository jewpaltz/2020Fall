<template>
<div class="card">
  <div class="card-image">
    <figure class="image">
      <img :src="post.url">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48 ">
          <img :src="post.owner.profile" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{post.owner.name}}</p>
        <p class="subtitle is-6">@{{post.owner.handle}}</p>
      </div>
    </div>

    <div class="content">
      {{post.message}}

      <time datetime="2016-1-1">11:09 PM - {{i}} Jan 2016</time>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        post: Object,
        i: Number
    }
}
</script>

<style>
    time {
      font-size: smaller;
      font-style: italic;
      float: right;
    }
    .card .card-content .media {
      margin: 0;
    }
</style>