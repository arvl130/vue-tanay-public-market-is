<script setup>
import { onMounted, ref } from "vue";
import unixSecondsToCompleteDate from "../../composables/utils/unixSecondsToCompleteDate";

const props = defineProps({
  pendingPayment: Object,
});

const formatted_date = ref([]);

onMounted(() => {
  formatted_date.value = unixSecondsToCompleteDate(
    props.pendingPayment.due_date.seconds
  );
});
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2 mt-2 items-center text-center"
  >
    <div>{{ formatted_date }}</div>
    <div>{{ pendingPayment.stores.join(", ") }}</div>
    <div>₱{{ pendingPayment.amount.toFixed(2) }}</div>
    <div>
      <router-link
        :to="{
          name: 'Pending Payment Receipts',
          params: { id: pendingPayment.uid },
        }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
      >
        View Uploads
      </router-link>
    </div>
  </div>
  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2">
    <label class="font-bold">Due Date:</label>
    <div class="mb-3 text-2xl">{{ formatted_date }}</div>

    <label class="font-bold">Store Number:</label>
    <div class="mb-3 text-2xl">{{ pendingPayment.stores.join(", ") }}</div>

    <label class="font-bold">Amount:</label>
    <div class="mb-3 text-2xl">{{ pendingPayment.amount }}</div>
    <div class="flex justify-center gap-8">
      <router-link
        :to="{
          name: 'Pending Payment Receipts',
          params: { id: pendingPayment.uid },
        }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
      >
        View Uploads
      </router-link>
    </div>
  </div>
</template>
