<template>
  <NavBar></NavBar>
  <div>
    <MainHeader></MainHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import MainHeader from "./MainHeader.vue";

export default defineComponent({
  name: "MainPage",
  components: { NavBar, MainHeader },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
