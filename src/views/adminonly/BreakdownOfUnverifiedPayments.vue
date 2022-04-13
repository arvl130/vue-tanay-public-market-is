<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import { onMounted, ref } from "vue";
import UnverifiedPaymentCard from "../../components/BreakdownOfUnverifiedPayments/UnverifiedPaymentCard.vue";
import getTenantUIDsWithUnfulfilledPaymentsWithAtleastOneReceipt from "../../composables/verify-payments/getTenantUIDsWithUnfulfilledPaymentsWithAtleastOneReceipt";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";

const tenantUIDsWIthUnfulfilledPaymentsWithAtleastOneReceipt = ref([]);

onMounted(async () => {
  tenantUIDsWIthUnfulfilledPaymentsWithAtleastOneReceipt.value =
    await getTenantUIDsWithUnfulfilledPaymentsWithAtleastOneReceipt();
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
      <AdminSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">
      Breakdown of Unverified Payments
    </h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Verify Payments' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <!-- Breakdown of Unverified Payments -->
  <main class="max-w-6xl mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Cards -->
    <UnverifiedPaymentCard
      v-for="tenant_uid in tenantUIDsWIthUnfulfilledPaymentsWithAtleastOneReceipt"
      :key="tenant_uid"
      :tenant_uid="tenant_uid"
    />
  </main>
</template>
