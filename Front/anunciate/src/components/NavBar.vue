<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="#">anUNciate</MDBNavbarBrand>
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav right class="mb-2 mb-lg-0">
        <MDBNavbarItem to="#" active>Inicio</MDBNavbarItem>
        <MDBNavbarItem href="#">Buscar</MDBNavbarItem>
        <MDBNavbarItem href="#">Nosotros</MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
    <MDBNavbarNav>
      <!-- Dropdown -->
      <MDBDropdown v-model="dropdown2">
        <MDBDropdownToggle
          tag="a"
          class="nav-link"
          @click="dropdown2 = !dropdown2"
          >Usuario
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem href="#">Mi cuenta</MDBDropdownItem>
          <MDBDropdownItem href="#">Ajustes</MDBDropdownItem>
          <MDBDropdownItem href="#">Cerrar sesión</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarNav>
  </MDBNavbar>
</template>

<script setup lang="ts">
import {
  MDBBtn,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

const collapse1 = ref(false);
const dropdown2 = ref(false);
</script>

<style></style>
