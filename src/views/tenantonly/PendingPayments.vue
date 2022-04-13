<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import PendingPaymentRow from "../../components/PendingPayments/PendingPaymentRow.vue";
import getPendingPaymentsOfTenant from "../../composables/tenants/getPendingPaymentsOfTenant";
import { onMounted, ref } from "vue";
import { getAuth } from "firebase/auth";

const pendingPaymentsOfTenant = ref([]);

onMounted(async () => {
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  pendingPaymentsOfTenant.value = await getPendingPaymentsOfTenant(uid);
});
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

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Pending Payments</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Tenant Dashboard' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto px-6 pt-6">
    <!-- Table for Pending Payments of a Tenant -->
    <div class="grid gap-4 sm:block">
      <!-- Header (payment_uid, due_date, store_num, amount, actions -> [view receipts]) -->
      <div class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">UID</div>
        <div class="text-center font-semibold">Due Date</div>
        <div class="text-center font-semibold">Store Number</div>
        <div class="text-center font-semibold">Amount Paid</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <PendingPaymentRow
        v-for="pendingPayment in pendingPaymentsOfTenant"
        :key="pendingPayment.uid"
        :pendingPayment="pendingPayment"
      />
    </div>
  </main>
</template>
