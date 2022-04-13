<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import AddButton from "../../assets/icons/AddButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import PendingReceiptRow from "../../components/PendingPayments/PendingReceiptRow.vue";
import { useRoute } from "vue-router";
import listenForReceiptsWithPaymentUID from "../../composables/verify-payments/listenForReceiptsWithPaymentUID";
import { computed, onMounted, ref } from "vue";
import getPayment from "../../composables/getPayment";

const route = useRoute();
const payment_uid = route.params.id;
const amountDue = ref(0);

const receipts = listenForReceiptsWithPaymentUID(payment_uid);

onMounted(async () => {
  const { amount } = await getPayment(payment_uid);
  amountDue.value = amount;
});

const totalPayment = computed(() => {
  return receipts.value.reduce((runningPayment, receipt) => {
    return runningPayment + receipt.amount;
  }, 0);
});

const currentBalance = computed(() => {
  return amountDue.value - totalPayment.value;
});
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Tenant Pending Payment Receipts Page</p>
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
    <h2 class="font-extrabold text-4xl mb-3">Pending Payment Receipts</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Pending Payments' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
      <router-link
        :to="{ name: 'New Receipt', params: { id: payment_uid } }"
        class="flex gap-2 bg-gray-200 px-4 py-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
        v-if="currentBalance > 0"
      >
        <!-- Add Icon -->
        <AddButton />
        <span>New Receipt</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto px-6 pt-6">
    <!-- Table for Pending Receipts for a Tenant's Specific Payment -->
    <div class="grid gap-4 sm:block">
      <!-- Header (payment_uid, store_num, amount, status, actions -> [view receipts]) -->
      <div class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">UID</div>
        <div class="text-center font-semibold">Store Number</div>
        <div class="text-center font-semibold">Amount Paid</div>
        <div class="text-center font-semibold">Status</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <PendingReceiptRow
        v-for="receipt in receipts"
        :key="receipt.uid"
        :receipt="receipt"
      />
    </div>

    <!-- Payment status  -->
    <div class="ml-auto grid pt-6 text-xl w-fit">
      <!-- Amount due -->
      <div class="flex justify-between">
        <label class="font-bold mr-2">Amount due:</label>
        <span>{{ amountDue }}</span>
      </div>
      <!-- Total payment -->
      <div class="flex justify-between">
        <label class="font-bold mr-2">Total Payment:</label>
        <span>{{ totalPayment }}</span>
      </div>
      <!-- Curr balance -->
      <div class="flex justify-between">
        <label class="font-bold mr-2">Current Balance:</label>
        <span>{{ currentBalance }}</span>
      </div>
    </div>
  </main>
</template>
