<template>
  <div class="">
      <Nav />
      <div class="container">
          <Notifications /> 
          <router-view/>
      </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Notifications from "@/components/Notifications";

export default {
    components: {
        Nav, Notifications
    }
}
</script>

<style lang="scss">

</style>
