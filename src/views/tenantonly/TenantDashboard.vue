<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import { getAuth } from "firebase/auth";
import listenForNoticeLettersReceivedByTenant from "../../composables/manage-letters/listenForNoticeLettersReceivedByTenant";
import WarningIcon from "../../assets/icons/WarningIcon.vue";
import { nextTick, onMounted, reactive, ref } from "vue";
import getStoresByTenantUID from "../../composables/getStoresByTenantUID";
import getTotalCurrentBalanceByTenant from "../../composables/dashboard/getTotalCurrentBalanceByTenant";
import listenForUnverifiedPaymentsByTenant from "../../composables/dashboard/listenForUnverifiedPaymentsByTenant";
import CashIcon from "../../assets/icons/CashIcon.vue";
import getTenant from "../../composables/getTenant";

const auth = getAuth();
const tenant_uid = auth.currentUser.uid;

const noticeLetters = listenForNoticeLettersReceivedByTenant(tenant_uid);
const pendingPayments = listenForUnverifiedPaymentsByTenant(tenant_uid);

// Stores owned by Tenant.
const stores = ref([]);

// Current Balance of tenant.
const totalCurrentBalance = ref(0);
const showCurrentBalance = ref(false);

onMounted(async () => {
  const tenantStores = await getStoresByTenantUID(tenant_uid);
  tenantStores.forEach((store) => {
    if (!stores.value.includes(store.id)) stores.value.push(store.id);
  });

  totalCurrentBalance.value = await getTotalCurrentBalanceByTenant(tenant_uid);
  await nextTick();
  showCurrentBalance.value = true;
});

// Tenant name in Default message
const tenantName = reactive({
  firstName: "",
  lastName: "",
});
const showTenantName = ref(false);
onMounted(async () => {
  const { firstName } = await getTenant(tenant_uid);

  if (firstName) tenantName.firstName = firstName;
  else tenantName.firstName = "";

  await nextTick();
  showTenantName.value = true;
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

  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Admin Dashboard Page</p>
  </div> -->

  <!-- Dashboard widgets -->
  <header
    class="max-w-6xl mx-auto grid gap-4 lg:grid-cols-[1fr_auto_1fr] px-6 pt-8"
  >
    <div>
      <!-- Default message -->
      <div
        v-if="noticeLetters.length === 0 && pendingPayments.length === 0"
        class="hidden lg:flex"
      >
        <div v-if="showTenantName" class="font-bold text-3xl my-auto">
          Good day, {{ `${tenantName.firstName}` }}.
        </div>
      </div>
    </div>
    <!-- Notifications -->
    <div class="grid gap-4">
      <!-- Notice Letters notification -->
      <div v-if="noticeLetters.length > 0" class="max-w-fit mx-auto">
        <div
          class="text-neutral-800 bg-red-200 px-6 py-4 grid"
          style="grid-template-columns: auto 1fr"
        >
          <div class="flex items-center w-12">
            <WarningIcon />
          </div>
          <div>
            <div class="text-xl font-medium">
              You have received a Notice Letter
            </div>
            <div>
              Open the
              <span>
                <router-link
                  class="font-medium hover:underline"
                  :to="{ name: 'Tenant Notice Letters' }"
                  >Notice Letters</router-link
                >
              </span>
              page for more information.
            </div>
          </div>
        </div>
      </div>
      <!-- Pending Payments notification -->
      <div v-if="pendingPayments.length > 0" class="max-w-fit mx-auto">
        <div
          class="text-neutral-800 bg-green-200 px-6 py-4 grid"
          style="grid-template-columns: auto 1fr"
        >
          <div class="flex items-center w-12">
            <CashIcon />
          </div>
          <div>
            <div class="text-xl font-medium">
              You have pending payments on your account
            </div>
            <div>
              Open the
              <span>
                <router-link
                  class="font-medium hover:underline"
                  :to="{ name: 'Pending Payments' }"
                  >Pending Payments</router-link
                >
              </span>
              page for more information.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Account Status widget -->
    <div class="flex justify-between">
      <!-- Default message -->
      <div
        v-if="noticeLetters.length === 0 && pendingPayments.length === 0"
        class="hidden sm:flex lg:hidden"
      >
        <div v-if="showTenantName" class="font-bold text-3xl mt-auto">
          Good day, {{ `${tenantName.firstName}` }}.
        </div>
      </div>
      <div
        class="ml-auto px-6 py-4 bg-cyan-600 text-white sm:max-w-fit shadow-md"
      >
        <div class="mb-3">
          <div class="font-bold">Stores Owned:</div>
          <div class="text-2xl">#{{ stores.join(", #") }}</div>
        </div>
        <div>
          <div class="font-bold">Total Current Balance:</div>
          <div class="text-2xl" v-if="showCurrentBalance">
            ₱{{ totalCurrentBalance.toFixed(2) }}
          </div>
          <div v-else>loading...</div>
        </div>
      </div>
    </div>
  </header>

  <!-- Dashboard buttons -->
  <main
    class="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
  >
    <!-- Payment Updates button -->
    <router-link
      :to="{ name: 'Pending Payments' }"
      class="text-gray-900 bg-gray-100 hover:bg-gray-200 h-72 p-4 shadow hover:shadow-md rounded-lg transition duration-200 text-center text-2xl font-bold grid"
      style="grid-template-rows: 1fr min-content"
    >
      <img
        src="../../assets/img/payment-updates.png"
        alt=""
        class="h-full min-h-0 mx-auto object-contain"
      />
      <div class="">Payment Updates</div>
    </router-link>
    <!-- History button -->
    <router-link
      :to="{ name: 'Fulfilled Payments' }"
      class="text-gray-900 bg-gray-100 hover:bg-gray-200 h-72 p-4 shadow hover:shadow-md rounded-lg transition duration-200 text-center text-2xl font-bold grid"
      style="grid-template-rows: 1fr min-content"
    >
      <img
        src="../../assets/img/history.jpg"
        alt=""
        class="h-full min-h-0 mx-auto object-contain"
      />
      <div class="flex justify-center items-end">History</div>
    </router-link>
    <!-- Notice Letters button -->
    <router-link
      :to="{ name: 'Tenant Notice Letters' }"
      class="text-gray-900 bg-gray-100 hover:bg-gray-200 h-72 p-4 shadow hover:shadow-md rounded-lg transition duration-200 text-center text-2xl font-bold grid"
      style="grid-template-rows: 1fr min-content"
    >
      <img
        src="../../assets/img/notice-letter.png"
        alt=""
        class="h-full min-h-0 mx-auto object-contain"
      />
      <div class="">Notice Letters</div>
    </router-link>
  </main>
</template>
