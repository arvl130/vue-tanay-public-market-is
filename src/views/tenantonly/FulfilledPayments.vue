<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import DocumentIcon from "../../assets/icons/DocumentIcon.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import FulfilledPaymentRow from "../../components/FulfilledPayments/FulfilledPaymentRow.vue";
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";
import getFulfilledPaymentsOfTenant from "../../composables/tenants/getFulfilledPaymentsOfTenant";

const fulfilledPaymentsOfTenant = ref([]);

onMounted(async () => {
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  fulfilledPaymentsOfTenant.value = await getFulfilledPaymentsOfTenant(uid);
});
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Tenant Profile Page</p>
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
    <h2 class="font-extrabold text-4xl mb-3">Fulfilled Payments</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Tenant Dashboard' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
      <router-link
        :to="{ name: 'Breakdown of Fulfilled Payments' }"
        class="flex gap-2 bg-gray-200 p-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
      >
        <!-- Document Icon -->
        <DocumentIcon />
        <span>Breakdown of Payments</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto px-6 pt-6">
    <!-- Table for Fulfilled Payments of a Tenant -->
    <div class="grid gap-4 sm:block">
      <!-- Header (payment_uid, due_date, store_num, amount, actions -> [view receipts]) -->
      <div class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">UID</div>
        <div class="text-center font-semibold">Due Date</div>
        <div class="text-center font-semibold">Store Number</div>
        <div class="text-center font-semibold">Amount Paid</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <!-- Rows or Cards of data -->
      <FulfilledPaymentRow
        v-for="fulfilledPayment in fulfilledPaymentsOfTenant"
        :key="fulfilledPayment.uid"
        :fulfilledPayment="fulfilledPayment"
      />
    </div>
  </main>
</template>
