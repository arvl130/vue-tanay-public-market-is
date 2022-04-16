<script setup>
import { computed, onMounted, reactive } from "vue";
import getReceiptsForPaymentUID from "../../composables/getReceiptsForPaymentUID";
import getTenantPayment from "../../composables/getPayment";
import unixSecondsToCompleteDate from "../../composables/utils/unixSecondsToCompleteDate";

const props = defineProps({
  payment_uid: String,
});

const payment = reactive({
  uid: props.payment_uid,
  amount: 0,
  formattedDate: "",
  receipts: [],
});

onMounted(async () => {
  const { amount, due_date } = await getTenantPayment(payment.uid);
  payment.amount = amount;
  payment.formattedDate = unixSecondsToCompleteDate(due_date.seconds);
  payment.receipts = await getReceiptsForPaymentUID(payment.uid);
});

const confimedReceipts = computed(() => {
  return payment.receipts.filter((receipt) => {
    if (receipt.status === "confirmed") return true;
    else return false;
  });
});

const totalPaid = computed(() => {
  return payment.receipts.reduce((runningPayment, receipt) => {
    if (receipt.status === "confirmed") return runningPayment + receipt.amount;
    else return runningPayment;
  }, 0);
});

const remainingBalance = computed(() => {
  return payment.amount - totalPaid.value;
});
</script>

<template>
  <div>
    <!-- Payment ID -->
    <div class="text-center bg-cyan-600 text-white font-bold">
      UID: {{ payment_uid }}
    </div>

    <div class="justify-between">
      <!-- List of Receipts -->
      <div
        v-for="receipt in confimedReceipts"
        :key="receipt.uid"
        class="flex justify-between max-w-xs"
      >
        <div>Store #{{ receipt.stores.join(", #") }}</div>
        <div class="font-bold">₱{{ receipt.amount.toFixed(2) }}</div>
      </div>
      <!-- Payment total ([date]): [total paid] -->
      <div
        class="flex justify-between max-w-xs border-t-2 border-gray-600 pt-2"
      >
        <div class="">Payment total ({{ payment.formattedDate }}):</div>
        <div class="font-bold">₱{{ totalPaid.toFixed(2) }}</div>
      </div>
    </div>

    <!-- Balance ([month-year]): [total due] -->
    <div class="flex justify-between max-w-xs border-b-2 border-gray-600 pb-2">
      <div>Balance ({{ payment.formattedDate }}):</div>
      <div class="font-bold">₱{{ payment.amount.toFixed(2) }}</div>
    </div>

    <!-- Remaining balance:     [total_due - total_paid] -->
    <div class="flex justify-between max-w-xs">
      <div>Remaining Balance:</div>
      <div class="font-bold">₱{{ remainingBalance.toFixed(2) }}</div>
    </div>
  </div>
</template>
