<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import { getAuth } from "firebase/auth";
import listenForNoticeLettersReceivedByTenant from "../../composables/manage-letters/listenForNoticeLettersReceivedByTenant";
import WarningIcon from "../../assets/icons/WarningIcon.vue";

const auth = getAuth();
const tenant_uid = auth.currentUser.uid;

const noticeLetters = listenForNoticeLettersReceivedByTenant(tenant_uid);
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

  <!-- Notifications -->
  <div
    v-if="noticeLetters.length > 0"
    class="max-w-6xl mx-auto px-6 pt-8 max-w-fit"
  >
    <div
      class="text-neutral-800 bg-red-200 px-6 py-4 grid"
      style="grid-template-columns: auto 1fr"
    >
      <div class="flex items-center w-12">
        <WarningIcon />
      </div>
      <div>
        <div class="text-xl font-medium">You have received a Notice Letter</div>
        <div>
          Open the
          <span>
            <router-link
              class="font-medium hover:underline"
              :to="{ name: 'Tenant Notice Letters' }"
              >Notice Letters</router-link
            >
          </span>
          page for more information.
        </div>
      </div>
    </div>
  </div>
  <div v-else class="md:pt-12"></div>

  <!-- Dashboard buttons -->
  <main
    class="max-w-6xl mx-auto px-6 pt-6 md:pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
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
        class="h-full min-h-0 mx-auto object-contain"
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
        class="h-full min-h-0 mx-auto object-contain"
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
        class="h-full min-h-0 mx-auto object-contain"
      />
      <div class="">Notice Letters</div>
    </router-link>
  </main>
</template>
