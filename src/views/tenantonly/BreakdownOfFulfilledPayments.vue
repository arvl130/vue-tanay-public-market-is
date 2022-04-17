<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import FulfilledPaymentCard from "../../components/BreakdownOfFulfilledPayments/FulfilledPaymentCard.vue";
import { onMounted, ref } from "vue";
import getFulfilledPaymentsOfTenant from "../../composables/tenants/getFulfilledPaymentsOfTenant";
import { getAuth } from "firebase/auth";
import getTenant from "../../composables/getTenant";

const fulfilledPayments = ref([]);
const tenantName = ref("loading ...");

onMounted(async () => {
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  fulfilledPayments.value = await getFulfilledPaymentsOfTenant(uid);

  const { firstName, lastName } = await getTenant(uid);
  if (firstName && lastName) tenantName.value = `${firstName} ${lastName}`;
  else tenantName.value = null;
});
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Breakdown Of Unverified Payments Page</p>
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
    <h2 class="font-extrabold text-4xl mb-3">
      Breakdown of Fulfilled Payments
    </h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Fulfilled Payments' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <!-- Breakdown of Fulfilled Payments -->
  <main class="max-w-6xl mx-auto p-6">
    <!-- name of tenant -->
    <div class="text-2xl mb-3" v-if="tenantName">
      <span class="font-bold text-3xl">{{ tenantName }}</span>
    </div>
    <div v-else>No data for tenant name.</div>
    <!-- Cards -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <FulfilledPaymentCard
        v-for="payment in fulfilledPayments"
        :key="payment"
        :payment="payment"
      />
    </div>
  </main>
</template>
