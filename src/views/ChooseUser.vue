<script setup>
import NavBar from "../components/NavBar/NavBar.vue";
</script>

<template>
  <!-- Filler text -->
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Choose a User Page</p>
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
      <router-link :to="{ name: 'Home' }" class="hover:underline">
        Home
      </router-link>
      <router-link :to="{ name: 'About' }" class="hover:underline">
        About Us
      </router-link>
    </template>
  </NavBar>

  <main class="max-w-6xl mx-auto px-6">
    <h2
      class="uppercase tracking-widest font-extrabold text-5xl text-center mt-8"
    >
      Tanay Public Market
    </h2>
    <div class="hidden lg:block mt-3 text-center text-xl">Which are you?</div>
    <!-- <div class="lg:hidden px-8 pt-8">
      <img
        src="../assets/img/public-market.webp"
        class="block md:max-w-lg mx-auto rounded-lg"
        alt=""
      />
    </div> -->

    <div class="mt-3 text-center text-2xl font-bold lg:mt-0 lg:hidden">
      Are you an?
    </div>
    <div class="flex lg:justify-center mt-3 mb-6">
      <!-- Choose Admin button -->
      <router-link
        :to="{ name: 'Admin Login' }"
        class="w-48 mx-auto lg:w-64 p-4 flex justify-center items-center custom-bg-gradient-cyan-to-blue grid"
        style="grid-template-rows: 1fr min-content"
      >
        <img
          src="../assets/img/admin.png"
          class="h-full mx-auto object-contain"
        />
        <div class="flex justify-center items-end">
          <span class="font-bold lg:text-3xl py-3">Admin</span>
        </div>
      </router-link>
      <div class="hidden lg:block p-8">
        <img
          src="../assets/img/public-market.webp"
          class="block max-w-md rounded-lg"
          alt=""
        />
      </div>
      <div
        class="flex items-center text-2xl px-3 md:text-4xl font-bold lg:hidden"
      >
        OR
      </div>

      <!-- Choose Tenant button -->
      <router-link
        :to="{ name: 'Tenant Login' }"
        class="w-48 mx-auto lg:w-64 p-4 flex justify-center items-center custom-bg-gradient-cyan-to-blue grid"
        style="grid-template-rows: 1fr min-content"
      >
        <img
          src="../assets/img/tenant.png"
          class="h-full mx-auto object-contain"
        />
        <div class="flex justify-center items-end">
          <span class="font-bold lg:text-3xl py-3">Tenant</span>
        </div>
      </router-link>
    </div>
    <!-- Privacy Policy and Terms & Conditions -->
    <div class="flex justify-center gap-4 mb-6">
      <router-link class="hover:underline" :to="{ name: 'Privacy Policy' }">
        Privacy Policy
      </router-link>
      <router-link class="hover:underline" :to="{ name: 'Terms & Conditions' }">
        Terms & Conditions
      </router-link>
    </div>
  </main>
</template>
