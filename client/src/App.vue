<template>
  <section class="section">
    <div class="container">
      <Nav />
      <router-view/>
    </div>
  </section>
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
