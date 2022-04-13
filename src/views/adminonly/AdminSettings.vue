<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import UpdateName from "../../components/TenantProfileSettings/UpdateName.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Tenant Settings Page</p>
  </div> -->
  <NavBar>
    <template #primary>
      <router-link
        :to="{ name: 'Home' }"
        class="hidden sm:inline font-bold text-2xl uppercase text-gray-800 hover:underline"
      >
        Tanay Public Market
      </router-link>
    </template>
    <template #secondary>
      <AdminSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Account Settings</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Tenant Dashboard' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto px-6 pt-3 pb-6">
    <UpdateName />
    <div
      class="mt-3 grid px-12 py-3 bg-gray-300"
      style="grid-template-columns: 2fr 3fr 1fr"
    >
      <router-link
        class="font-bold hover:underline"
        :to="{ name: 'Admin Change Password' }"
        >Change Password</router-link
      >
    </div>
  </main>
</template>
