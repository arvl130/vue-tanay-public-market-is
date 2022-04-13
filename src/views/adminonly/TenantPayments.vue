<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantPaymentRow from "../../components/TenantPayments/TenantPaymentRow.vue";
import getPaymentsByTenantUID from "../../composables/getPaymentsByTenantUID";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";

const paymentsFulfilled = ref([]);
const paymentsNotFulfilled = ref([]);

const route = useRoute();
const tenant_uid = route.params.id;

onMounted(async () => {
  paymentsFulfilled.value = await getPaymentsByTenantUID(tenant_uid);
  paymentsNotFulfilled.value = await getPaymentsByTenantUID(tenant_uid, false);
});

const pendingTab = ref();
const fulfilledTab = ref();
const currentTab = ref("pending");

const payments = computed(() => {
  if (currentTab.value === "fulfilled") return paymentsFulfilled.value;
  if (currentTab.value === "pending") return paymentsNotFulfilled.value;
  else return [];
});

const chooseTab = (choice) => {
  switch (choice) {
    case "fulfilled":
      pendingTab.value.classList.remove("active-tab");
      fulfilledTab.value.classList.add("active-tab");
      currentTab.value = choice;
      break;
    case "pending":
      fulfilledTab.value.classList.remove("active-tab");
      pendingTab.value.classList.add("active-tab");
      currentTab.value = choice;
      break;
  }
};
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
      <AdminSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Tenant Payments</h2>
    <div class="flex justify-between">
      <router-link :to="{ name: 'Manage Tenants' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
      <div class="flex justify-between">
        <div
          class="px-3 py-1 bg-gray-100 hover:bg-gray-200 active-tab"
          ref="pendingTab"
          @click="chooseTab('pending')"
        >
          Pending
        </div>
        <div
          class="px-3 py-1 bg-gray-100 hover:bg-gray-200"
          ref="fulfilledTab"
          @click="chooseTab('fulfilled')"
        >
          Fulfilled
        </div>
      </div>
    </div>
  </PageHeader>

  <!-- List of Tenant Payments (can filter by Fulfilled or !Fulfilled) -->
  <main class="max-w-6xl mx-auto px-6 pt-6">
    <!-- Table -->
    <div class="grid gap-4 sm:block">
      <!-- Header -->
      <div class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">Payment UID</div>
        <div class="text-center font-semibold">Due Date</div>
        <div class="text-center font-semibold">Description</div>
        <div class="text-center font-semibold">Amount</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <TenantPaymentRow
        v-for="payment in payments"
        :key="payment.id"
        :payment="payment"
      />
    </div>
  </main>
</template>

<style>
.active-tab {
  @apply bg-cyan-600 hover:bg-cyan-700 text-white font-medium !important;
}
</style>
