<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import TenantReceiptRow from "../../components/TenantPayments/TenantReceiptRow.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import getReceiptsForPaymentUID from "../../composables/getReceiptsForPaymentUID";

const route = useRoute();
const tenant_uid = route.params.tenant_uid;
const payment_uid = route.params.payment_uid;

const receipts = ref([]);

onMounted(async () => {
  receipts.value = await getReceiptsForPaymentUID(payment_uid);
});
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Tenant Payment Receipts Page</p>
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
    <h2 class="font-extrabold text-4xl mb-3">Tenant Payment Receipts</h2>
    <router-link
      :to="{ name: 'Tenant Payments', params: { id: tenant_uid } }"
      class="flex gap-2"
    >
      <!-- Back Icon -->
      <BackButton />
      <span>Back</span>
    </router-link>
  </PageHeader>

  <!-- List of Receipts for Tenant Payments -->
  <main class="max-w-6xl mx-auto p-6">
    <!-- Table -->
    <div class="grid gap-4 sm:block">
      <!-- Header -->
      <div class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">Receipt UID</div>
        <div class="text-center font-semibold">Stores</div>
        <div class="text-center font-semibold">Amount</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <TenantReceiptRow
        v-for="receipt in receipts"
        :key="receipt.id"
        :receipt="receipt"
      />
    </div>
  </main>
</template>
