<script setup>
import LogoutButton from "../../components/utils/LogoutButton.vue";
</script>

<template>
  <router-link :to="{ name: 'Admin Profile' }" class="hover:underline">
    Profile
  </router-link>
  <router-link :to="{ name: 'Admin Settings' }" class="hover:underline">
    Settings
  </router-link>
  <LogoutButton />
</template>
