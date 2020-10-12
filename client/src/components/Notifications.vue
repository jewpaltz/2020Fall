<template>
<div id="notifications">
    <div    v-for="(x,i) in session.notifications" :key="i"
            class="notification"
            :class="`is-${x.type}`">
        <button class="delete" @click="deleteNotification(i)"></button>
        {{x.text}}
    </div>
</div>
</template>

<script>
import session from "@/models/session";

export default {
    data: ()=> ({
        session
    }),
    methods: {
        deleteNotification(i){
            session.deleteNotification(i);
        }
    }
}
</script>

<style>
    #notifications {
        padding: 0 30px;
    }
    .notification {
        margin: 15px;
    }
</style>