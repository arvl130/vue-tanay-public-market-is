<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
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
      <TenantSecondaryButtons />
    </template>
  </NavBar>

  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Admin Dashboard Page</p>
  </div> -->

  <!-- Dashboard buttons -->
  <main
    class="max-w-6xl mx-auto px-6 pt-6 md:pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
  >
    <!-- Payment Updates button -->
    <router-link
      :to="{ name: 'Pending Payments' }"
      class="text-gray-900 bg-gray-100 hover:bg-gray-200 h-72 p-4 shadow hover:shadow-md rounded-lg transition duration-200 text-center text-2xl font-bold grid"
      style="grid-template-rows: 1fr min-content"
    >
      <img
        src="../../assets/img/payment-updates.png"
        alt=""
        class="h-full mx-auto object-contain"
      />
      <div class="">Payment Updates</div>
    </router-link>
    <!-- History button -->
    <router-link
      :to="{ name: 'Fulfilled Payments' }"
      class="text-gray-900 bg-gray-100 hover:bg-gray-200 h-72 p-4 shadow hover:shadow-md rounded-lg transition duration-200 text-center text-2xl font-bold grid"
      style="grid-template-rows: 1fr min-content"
    >
      <img
        src="../../assets/img/history.jpg"
        alt=""
        class="h-full mx-auto object-contain"
      />
      <div class="flex justify-center items-end">History</div>
    </router-link>
    <!-- Notice Letters button -->
    <router-link
      :to="{ name: 'Tenant Notice Letters' }"
      class="text-gray-900 bg-gray-100 hover:bg-gray-200 h-72 p-4 shadow hover:shadow-md rounded-lg transition duration-200 text-center text-2xl font-bold grid"
      style="grid-template-rows: 1fr min-content"
    >
      <img
        src="../../assets/img/notice-letter.png"
        alt=""
        class="h-full mx-auto object-contain"
      />
      <div class="">Notice Letters</div>
    </router-link>
  </main>
</template>
