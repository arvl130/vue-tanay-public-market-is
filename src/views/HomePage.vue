<template>
  <!-- Filler text -->
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Home Page</p>
  </div> -->

  <div class="custom-bg-gradient-cyan-to-blue min-h-screen">
    <!-- Navbar -->
    <nav>
      <div
        class="max-w-6xl mx-auto flex pt-2 justify-between items-center px-3"
      >
        <!-- logo -->
        <div class="flex items-center space-x-3">
          <img src="../assets/img/logo.png" class="h-16 w-16" alt="" />
          <span
            class="hidden sm:inline font-bold text-2xl uppercase text-gray-800"
            >Tanay Public Market</span
          >
        </div>
        <!-- secondary nav -->
        <div class="flex items-center h-16 pl-2 space-x-8">
          <a
            class="hover:underline"
            target="_blank"
            href="https://www.facebook.com/Tanay-Public-Market-105256391098507"
            >Announcements</a
          >
          <router-link class="hover:underline" :to="{ name: 'About' }">
            About Us
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Home page -->
    <main class="grid items-center">
      <!-- Homepage top -->
      <div class="grid grid-cols-[auto_1fr] justify-between items-center">
        <!-- Hero image -->
        <div>
          <img
            src="../assets/img/public-market.jpg"
            class="shadow-md rounded-r-xl hidden sm:inline-block w-[65vw] h-[30rem] object-cover"
            alt=""
          />
        </div>

        <!-- Hero message Desktop -->
        <div class="">
          <div class="max-w-xs mx-auto text-center sm:text-right px-6">
            <div class="flex justify-end">
              <img src="../assets/img/rentie-logo-v5.png" class="w-64 mb-4" />
            </div>
            <div class="mb-3 font-bold text-4xl text-white">Pay. Collect.</div>
            <div class="font-bold text-4xl text-white mb-6">Record.</div>

            <div
              class="mb-6 bg-cyan-600 text-white px-4 py-2 inline-block drop-shadow-lg"
            >
              A website for Tanay Public Market that accepts and records proof
              of rental payment of its tenants.
            </div>

            <div class="flex justify-center sm:justify-end">
              <router-link
                :to="{ name: 'Choose User' }"
                class="px-8 py-2 bg-white text-cyan-500 text-xl font-bold rounded-3xl hover:bg-cyan-500 hover:text-white transition duration-200 drop-shadow-lg"
              >
                Sign in
              </router-link>
            </div>
          </div>
        </div>

        <!-- Hero message Mobile -->
        <!-- <div class="md:hidden text-center mb-6 flex flex-col">
          <div class="flex justify-center">
            <img src="../assets/img/rentie-logo-v5.png" class="w-64 mb-4" />
          </div>
          <div class="font-bold text-4xl text-white ml-4 mb-6">
            Pay. Collect. Record.
          </div>
          <div>
            <router-link
              :to="{ name: 'Choose User' }"
              class="px-8 py-2 bg-white text-cyan-500 text-xl font-bold rounded-3xl mx-auto hover:bg-cyan-500 hover:text-white transition duration-200 drop-shadow-lg"
            >
              Sign in
            </router-link>
          </div>
        </div> -->
      </div>
    </main>
  </div>
</template>

<style scoped>
#app > div {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
