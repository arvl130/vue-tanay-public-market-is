<script setup>
import { onMounted, ref } from "vue";
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import AddButton from "../../assets/icons/AddButton.vue";
import getTenants from "../../composables/getTenants";
import TenantRow from "../../components/ManageTenants/TenantRow.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";

const tenants = ref([]);

onMounted(async () => {
  tenants.value = await getTenants();
});
</script>

<template>
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
    <h2 class="font-extrabold text-4xl mb-3">Manage Tenants</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Admin Dashboard' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
      <router-link
        :to="{ name: 'New Tenant' }"
        class="flex gap-2 bg-gray-200 px-4 py-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
      >
        <!-- Add Icon -->
        <AddButton />
        <span>New Tenant</span>
      </router-link>
    </div>
  </PageHeader>

  <!-- List of Tenants -->
  <main class="max-w-6xl mx-auto p-6">
    <!-- Table -->
    <div class="grid gap-4 sm:block">
      <!-- Header -->
      <div class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">Name</div>
        <div class="text-center font-semibold">Stores Held</div>
        <div class="text-center font-semibold">Sections</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <!-- Row -->
      <TenantRow v-for="tenant in tenants" :key="tenant.uid" :tenant="tenant" />
    </div>
  </main>
</template>
