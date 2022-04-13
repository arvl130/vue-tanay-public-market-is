<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import UpdatePhoto from "../../components/TenantProfileSettings/UpdatePhoto.vue";
import UpdateName from "../../components/TenantProfileSettings/UpdateName.vue";
import UpdateGender from "../../components/TenantProfileSettings/UpdateGender.vue";
import UpdateUsername from "../../components/TenantProfileSettings/TenantUpdateUsername.vue";
import UpdatePhone from "../../components/TenantProfileSettings/UpdatePhone.vue";
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Tenant Profile Page</p>
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
      <TenantSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Account Profile</h2>
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
    <h3 class="font-bold text-3xl">Basic Info</h3>
    <UpdatePhoto />
    <UpdateName />
    <UpdateGender />
    <h3 class="font-bold text-3xl mt-6">Contact Info</h3>
    <UpdateUsername />
    <UpdatePhone />
  </main>
</template>
