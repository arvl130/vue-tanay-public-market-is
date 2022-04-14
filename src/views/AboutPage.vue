<script setup>
import NavBar from "../components/NavBar/NavBar.vue";
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">About Page</p>
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

  <main class="max-w-6xl mx-auto px-6 pb-12">
    <img
      src="../assets/img/banner.jpg"
      class="object-cover mb-8 rounded-b-2xl"
    />

    <div class="max-w-2xl mx-auto">
      <h2 class="font-extrabold text-4xl text-center mb-4">About Us</h2>

      <p class="text-justify indent-14 mb-3">
        The <span class="font-bold">Tanay Public Market</span> (TPM) is situated
        1.3 kilometers south of Laguna Lake in Sitio Pasipit, Barangay Plaza
        Aldea, away from the town's municipal building. It was established in
        1994 to replace the original public market site close to Tanay Church,
        which was burned down the same year. The property is 3.0 hectares in
        size and is flanked on all sides by commercial establishments.
        Commodities were divided into sections and buildings, as follows: Dry
        Section - Bldgs. Wet Section - Cl and C1 (part of), A, B1 & B2 & C2
        (part of), to give market-goers/consumers a sense of organization and
        direction. According to data provided by the Municipal Treasury Office,
        the 2020 income of Tanay Public Market decreased by 32.64 percent due to
        the suspension of payments of rental fees on fixed stalls, commercial
        stalls, ambulant vendors, terminal fees, and other fees being
        implemented in the public market, due to the effects of the pandemic on
        market vendors and other users of the facilities within the public
        market.
      </p>
      <p class="text-justify indent-14">
        The following amenities are located inside the public market area:
        Bagsakan Area, which is located at the back of the public market and has
        an approximate lot area of 2,200 sqm. It acts as a pick-up and drop-off
        site for a variety of agricultural commodities supplied by local farmers
        and retailers. Similarly, it functions differently depending on the
        circumstances in the same area; Tanay Grand Central Terminal - terminal
        for various public utility vehicles plying in and out of town
        (approximately 3,800 sqm), Various Retail Stores at the - terminal,
        Commercial Stalls / Spaces within the perimeter of the public market,
        BFP Office / Fire Sub Station - TPM and Rest Rooms, Telephone Stations,
        and so on.
      </p>
    </div>
  </main>
</template>
