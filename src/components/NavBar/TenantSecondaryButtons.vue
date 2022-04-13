<script setup>
import LogoutButton from "../utils/LogoutButton.vue";
</script>

<template>
  <router-link :to="{ name: 'Tenant Profile' }" class="hover:underline">
    Profile
  </router-link>
  <router-link :to="{ name: 'Tenant Settings' }" class="hover:underline">
    Settings
  </router-link>
  <LogoutButton />
</template>
