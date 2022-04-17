<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import FulfilledReceiptRow from "../../components/FulfilledPayments/FulfilledReceiptRow.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import getReceiptsForPaymentUID from "../../composables/getReceiptsForPaymentUID";

const route = useRoute();
const payment_uid = route.params.id;

const receipts = ref([]);
onMounted(async () => {
  receipts.value = await getReceiptsForPaymentUID(payment_uid);
});
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Tenant Fullfilled Payment Receipts Page</p>
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
    <h2 class="font-extrabold text-4xl mb-3">Fulfilled Payment Receipts</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Fulfilled Payments' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <!-- Table for Pending Receipts for a Tenant's Specific Payment -->
    <div class="grid gap-4 sm:block">
      <!-- Header (payment_uid, store_num, amount, actions -> [view receipts]) -->
      <div class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">UID</div>
        <div class="text-center font-semibold">Store Number</div>
        <div class="text-center font-semibold">Amount Paid</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <FulfilledReceiptRow
        v-for="receipt in receipts"
        :key="receipt.uid"
        :receipt="receipt"
      />
    </div>
  </main>
</template>
