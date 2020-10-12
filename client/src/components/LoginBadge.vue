<template>
    <div id="LoginBadge">

        <div class="media" v-if="session.user">
        <div class="media-left">
            <figure class="image">
            <img :src="session.user.profile" alt="Placeholder image">
            </figure>
        </div>
        <div class="media-content">
            <p class="has-text-weight-bold">{{session.user.name}}</p>
            <p class="is-size-7">@{{session.user.handle}}</p>
        </div>
        </div>


        <div class="buttons" v-else>
          <a class="button">
            <strong>Sign up</strong>
          </a>
            <router-link to="/login"  class="button is-light" >
                Log in
            </router-link>
        </div>
    </div>
</template>

<script>
import session from "@/models/session";

export default {
    data: ()=> ({
        session
    })
}
</script>

<style>
    .media .image img {
        width: auto;
    }
    .media-content {
        line-height: .95rem;
    }
</style>