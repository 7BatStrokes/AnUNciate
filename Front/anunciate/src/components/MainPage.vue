<template>
  <NavBar></NavBar>
  <div>
    <MainHeader></MainHeader>
  </div>
  <div>
    <ProductList></ProductList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import MainHeader from "./MainHeader.vue";
import ProductList from "./ProductList.vue";

export default defineComponent({
  name: "MainPage",
  components: { NavBar, MainHeader, ProductList },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
