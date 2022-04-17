<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import DocumentIcon from "../../assets/icons/DocumentIcon.vue";
import UnverifiedPaymentRow from "../../components/VerifyPayments/UnverifiedPaymentRow.vue";
import listenForUnverifiedPayments from "../../composables/verify-payments/listenForUnverifiedPayments";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";

const unverifiedTenantPayments = listenForUnverifiedPayments();
</script>

<template>
  <!-- Filler text -->
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
      <AdminSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Verify Payments</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Admin Dashboard' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
      <router-link
        :to="{ name: 'Breakdown of Unverified Payments' }"
        class="flex gap-2 bg-gray-200 p-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
      >
        <!-- Document Icon -->
        <DocumentIcon />
        <span>Breakdown of Payments</span>
      </router-link>
    </div>
  </PageHeader>

  <!-- List of Unverified Payments -->
  <main class="max-w-6xl mx-auto p-6">
    <!-- Table -->
    <div class="grid gap-5 sm:block">
      <!-- Header -->
      <div class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">Payment UID</div>
        <div class="text-center font-semibold">Due Date</div>
        <div class="text-center font-semibold">Tenant Name</div>
        <div class="text-center font-semibold">Stores</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <!-- Rows -->
      <UnverifiedPaymentRow
        v-for="payment in unverifiedTenantPayments"
        :key="payment.uid"
        :payment="payment"
      />
    </div>
  </main>
</template>
