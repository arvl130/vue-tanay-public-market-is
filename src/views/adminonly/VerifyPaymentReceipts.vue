<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import { useRoute } from "vue-router";
import UnverifiedReceiptRow from "../../components/VerifyPayments/UnverifiedReceiptRow.vue";
import listenForReceiptsWithPaymentUID from "../../composables/verify-payments/listenForReceiptsWithPaymentUID";
import { computed, onMounted, ref } from "vue";
import getPayment from "../../composables/getPayment";
import CheckIcon from "../../assets/icons/CheckIcon.vue";
import SimpleDialogModal from "../../components/modals/SimpleDialogModal.vue";
import setPaymentStatusProto from "../../composables/verify-payments/setPaymentStatus";
import execThenGoto from "../../composables/utils/execThenGoto";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";

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
    if (receipt.status === "confirmed") return runningPayment + receipt.amount;
    else return runningPayment;
  }, 0);
});

const currentBalance = computed(() => {
  return amountDue.value - totalPayment.value;
});

const showConfirmMarkFulfilled = ref(false);

const setPaymentStatus = execThenGoto(setPaymentStatusProto, "Verify Payments");
const onMarkFulfilled = async () => {
  await setPaymentStatus(payment_uid, "fulfilled");
};
</script>

<template>
  <!-- Filler text -->
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Verify Payment Receipts Page</p>
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
    <h2 class="font-extrabold text-4xl mb-3">Verify Payment Receipts</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Verify Payments' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>

      <button
        class="flex gap-2 bg-gray-200 p-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
        v-if="currentBalance <= 0"
        @click="showConfirmMarkFulfilled = true"
      >
        <!-- Document Icon -->
        <CheckIcon />
        <span>Mark Fulfilled</span>
      </button>
    </div>
  </PageHeader>

  <!-- List of Receipts for Payment UID -->
  <main class="max-w-6xl mx-auto px-6 pt-6">
    <!-- Table -->
    <div class="grid gap-2 sm:block">
      <!-- Header -->
      <div class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2">
        <div class="text-center font-semibold">Receipt UID</div>
        <div class="text-center font-semibold">Amount</div>
        <div class="text-center font-semibold">Image</div>
        <div class="text-center font-semibold">Actions</div>
      </div>
      <!-- Rows -->
      <UnverifiedReceiptRow
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
        <span>₱{{ amountDue.toFixed(2) }}</span>
      </div>
      <!-- Total payment -->
      <div class="flex justify-between">
        <label class="font-bold mr-2">Total Payment:</label>
        <span>₱{{ totalPayment.toFixed(2) }}</span>
      </div>
      <!-- Curr balance -->
      <div class="flex justify-between">
        <label class="font-bold mr-2">Current Balance:</label>
        <span>₱{{ currentBalance.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Modal to Confirm Fulfill -->
    <SimpleDialogModal v-if="showConfirmMarkFulfilled">
      <template #header>Confirm Mark Fulfilled</template>
      <template #body
        >Are you sure you want to mark this payment fulfilled? This action
        cannot be undone.</template
      >
      <template #controls>
        <button
          type="button"
          class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          @click="showConfirmMarkFulfilled = false"
        >
          Cancel
        </button>
        <button
          type="button"
          class="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          @click="onMarkFulfilled()"
        >
          Continue
        </button>
      </template>
    </SimpleDialogModal>
  </main>
</template>
