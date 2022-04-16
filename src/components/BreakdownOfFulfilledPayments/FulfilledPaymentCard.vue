<script setup>
import { computed, onMounted, ref } from "vue";
import getReceiptsForPaymentUID from "../../composables/getReceiptsForPaymentUID";
import unixSecondsToMonthOfWithYearFormat from "../../composables/utils/unixSecondsToMonthNameWithYearFormat";
import unixSecondsToWordDate from "../../composables/utils/unixSecondsToWordDate";

const props = defineProps({
  payment: Object,
});

// receipts for each payment
const receipts = ref([]);

// total payment
const totalPayment = computed(() => {
  return receipts.value.reduce((prevAmonut, receipt) => {
    return prevAmonut + receipt.amount;
  }, 0);
});

// month with year
const monthYear = ref("");

// formatted date
const formattedDate = ref("");

// total balance
const totalBalance = ref(0);

// remaining balance
const remainingBalance = computed(() => {
  return totalBalance.value - totalPayment.value;
});

onMounted(async () => {
  // load month with year
  monthYear.value = unixSecondsToMonthOfWithYearFormat(
    props.payment.due_date.seconds
  );

  // load formatted date
  formattedDate.value = unixSecondsToWordDate(props.payment.due_date.seconds);

  // load receipts for given payment
  receipts.value = await getReceiptsForPaymentUID(props.payment.uid);

  // load total balance
  totalBalance.value = props.payment.amount;
});
</script>

<template>
  <div class="px-4 py-2 bg-gray-200">
    <div class="text-center bg-cyan-600 text-white font-bold mb-1 mt-1">
      UID: {{ payment.uid }}
    </div>
    <!-- Receipts: -->
    <div
      v-for="receipt in receipts"
      :key="receipt.uid"
      class="flex justify-between max-w-xs"
    >
      <!-- Store num - amount -->
      <div>Store {{ receipt.stores.join(", ") }}</div>
      <div class="font-bold">₱{{ receipt.amount.toFixed(2) }}</div>
    </div>

    <!-- Total Payment (month, date, year) -->
    <div class="flex justify-between max-w-xs border-t-2 border-gray-600 pt-2">
      <div>Total Payment ({{ formattedDate }}):</div>
      <div class="font-bold">₱{{ totalPayment.toFixed(2) }}</div>
    </div>

    <!-- Total Balance (month, year) -->
    <div class="flex justify-between max-w-xs border-b-2 border-gray-600 pb-2">
      <div>Total Balance ({{ monthYear }}):</div>
      <div class="font-bold">₱{{ totalBalance.toFixed(2) }}</div>
    </div>
    <!-- Remaining Balance -->
    <div class="flex justify-between max-w-xs">
      <div>Remaining Balance:</div>
      <div class="font-bold">₱{{ remainingBalance.toFixed(2) }}</div>
    </div>
  </div>
</template>
