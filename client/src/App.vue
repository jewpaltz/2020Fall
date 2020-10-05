<template>
  <div class="">
      <Nav />
      <div class="container">
          <router-view/>
      </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
    components: {
        Nav
    }
}
</script>

<style lang="scss">

</style>
