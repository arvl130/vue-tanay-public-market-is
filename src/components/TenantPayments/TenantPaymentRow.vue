<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import getReceiptsForPaymentUID from "../../composables/getReceiptsForPaymentUID";
import unixSecondsToCompleteDate from "../../composables/utils/unixSecondsToCompleteDate";

const route = useRoute();
const tenant_uid = route.params.id;

const props = defineProps({
  payment: Object,
});

const formatted_date = ref(null);
const receipts = ref([]);

onMounted(async () => {
  formatted_date.value = unixSecondsToCompleteDate(
    props.payment.due_date.seconds
  );
  receipts.value = await getReceiptsForPaymentUID(props.payment.uid);
});
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2 mt-2 items-center text-center"
  >
    <!-- Payment UID -->
    <div class="truncate">{{ payment.uid }}</div>
    <!-- Due Date -->
    <div>{{ formatted_date }}</div>
    <!-- Description -->
    <div v-if="payment.description">{{ payment.description }}</div>
    <div v-else class="italic">no description</div>
    <!-- Amount -->
    <div>{{ payment.amount }}</div>
    <!-- Receipts -->
    <div class="grid justify-center">
      <router-link
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        :to="{
          name: 'Tenant Payment Receipts',
          params: { tenant_uid, payment_uid: payment.uid },
        }"
      >
        View Receipts
      </router-link>
    </div>
  </div>
  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2">
    <label class="font-bold">Payment UID:</label>
    <div class="mb-3 text-2xl truncate">{{ payment.uid }}</div>
    <label class="font-bold">Due date:</label>
    <div class="mb-3 text-2xl">{{ formatted_date }}</div>
    <label class="font-bold">Description:</label>
    <div class="mb-3 text-2xl">{{ payment.description }}</div>
    <label class="font-bold">Actions:</label>
    <div class="flex justify-center mt-3">
      <router-link
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        :to="{
          name: 'Tenant Payment Receipts',
          params: { tenant_uid, payment_uid: payment.uid },
        }"
      >
        View Receipts
      </router-link>
    </div>
  </div>
</template>
