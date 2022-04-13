<script setup>
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";

const username = ref("");
const auth = getAuth();
onMounted(async () => {
  username.value = auth.currentUser.email.split("@")[0];
});
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden mt-3 sm:grid px-12 py-3 bg-gray-300"
    style="grid-template-columns: 2fr 3fr 1fr"
  >
    <div class="font-bold flex items-center">Username</div>
    <div>{{ username }}</div>
    <router-link
      class="font-bold hover:underline"
      :to="{ name: 'Tenant Change Username' }"
      >Change</router-link
    >
  </div>
  <!-- Mobile: card -->
  <div class="sm:hidden mt-3 px-12 py-3 bg-gray-300">
    <div class="font-bold flex items-center">Username</div>
    <div>{{ username }}</div>
    <router-link
      class="font-bold hover:underline"
      :to="{ name: 'Tenant Change Username' }"
      >Change</router-link
    >
  </div>
</template>
