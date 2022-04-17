<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import { getAuth } from "firebase/auth";
import NoticeLetterEntry from "../../components/NoticeLetters/TenantNoticeLetterEntry.vue";
import listenForNoticeLettersReceivedByTenant from "../../composables/manage-letters/listenForNoticeLettersReceivedByTenant";

const auth = getAuth();
const tenant_uid = auth.currentUser.uid;

const noticeLetters = listenForNoticeLettersReceivedByTenant(tenant_uid);
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Admin Notice Letters</p>
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
    <h2 class="font-extrabold text-4xl mb-3">Notice Letters</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Tenant Dashboard' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <!-- List of Notice Letters sent by Admin -->
  <main class="max-w-6xl mx-auto p-6">
    <!-- Table -->
    <div class="grid gap-4 sm:block">
      <!-- Header -->
      <div class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">UID</div>
        <div class="text-center font-semibold">Date Sent</div>
        <div class="text-center font-semibold">Sent By</div>
        <div class="text-center font-semibold">Tenant Name</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <!-- Entries -->
      <NoticeLetterEntry
        v-for="letter in noticeLetters"
        :key="letter.uid"
        :letter="letter"
      />
      <!-- <TenantRow v-for="tenant in tenants" :key="tenant.uid" :tenant="tenant" /> -->
    </div>
  </main>
</template>
