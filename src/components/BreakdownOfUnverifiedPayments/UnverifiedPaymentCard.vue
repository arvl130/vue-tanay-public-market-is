<script setup>
import { onMounted, reactive, ref } from "vue";
import getTenant from "../../composables/getTenant";
import getUnfulfilledPaymentUIDsWithReceiptsByTenant from "../../composables/verify-payments/getUnfulfilledPaymentUIDsWithReceiptsByTenant";
import UnverifiedPaymentCardPaymentEntry from "./UnverifiedPaymentCardPaymentEntry.vue";

const props = defineProps({
  tenant_uid: String,
});

const tenant = reactive({
  firstName: "",
  lastName: "",
});

const unfulfilledPaymentUIDsWithReceipts = ref([]);

onMounted(async () => {
  const { firstName, lastName } = await getTenant(props.tenant_uid);
  tenant.firstName = firstName;
  tenant.lastName = lastName;
  unfulfilledPaymentUIDsWithReceipts.value =
    await getUnfulfilledPaymentUIDsWithReceiptsByTenant(props.tenant_uid);
});
</script>

<template>
  <div class="px-4 py-2 bg-gray-200">
    <label class="font-bold">Name:</label>
    <div class="mb-3 text-2xl">
      {{ `${tenant.lastName}, ${tenant.firstName}` }}
    </div>
    <div class="font-bold mb-1">Payments:</div>
    <div class="space-y-2" v-if="unfulfilledPaymentUIDsWithReceipts.length > 0">
      <!-- List of Unfulfilled Payments by this tenant -->
      <UnverifiedPaymentCardPaymentEntry
        v-for="payment_uid in unfulfilledPaymentUIDsWithReceipts"
        :key="payment_uid"
        :payment_uid="payment_uid"
      />
    </div>
    <div class="text-center italic" v-else>No submitted receipts found</div>
  </div>
</template>
