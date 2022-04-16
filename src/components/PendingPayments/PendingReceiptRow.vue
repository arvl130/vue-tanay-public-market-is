<script setup>
import { onMounted, ref } from "vue";
import getDownloadURLfromImagePath from "../../composables/tenants/getDownloadURLfromImagePath";
import listenForTicketsByReceiptUID from "../../composables/verify-payments/listenForTicketsByReceiptUID";
import setReceiptStatus from "../../composables/verify-payments/setReceiptStatus";
import ImageModal from "../modals/ImageModal.vue";
import TicketModal from "../VerifyPayments/TicketModal.vue";

const props = defineProps({
  receipt: Object,
});

const imageUrl = ref(null);

onMounted(async () => {
  const imagePath = props.receipt.image_path;
  imageUrl.value = await getDownloadURLfromImagePath(imagePath);
});

const isImageModalVisible = ref(false);

const onResubmit = async () => {
  await setReceiptStatus(props.receipt.uid, "submitted");
};

/* Monitor if we have tickets */
const tickets = listenForTicketsByReceiptUID(props.receipt.uid);
const isTicketModalVisible = ref(false);
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2 mt-2 items-center text-center"
  >
    <div class="truncate text-ellipsis">{{ receipt.uid }}</div>
    <div>{{ receipt.stores.join(", ") }}</div>
    <div>₱{{ receipt.amount.toFixed(2) }}</div>
    <div>
      <div v-if="receipt.status === 'submitted'">
        Waiting for admin to confirm your payment
      </div>
      <div v-else-if="receipt.status === 'for resubmission'">
        For Resubmission
      </div>
      <div v-else>
        {{ receipt.status }}
      </div>
    </div>
    <div class="grid justify-center gap-4">
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="isImageModalVisible = true"
        v-if="imageUrl"
      >
        View Image
      </button>
      <router-link
        :to="{
          name: 'Edit Receipt',
          params: {
            payment_uid: receipt.payment_uid,
            receipt_uid: receipt.uid,
          },
        }"
        class="font-medium bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        v-if="receipt.status !== 'confirmed'"
      >
        Edit Receipt
      </router-link>
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="onResubmit"
        v-if="receipt.status === 'for resubmission'"
      >
        Resubmit
      </button>
      <!-- Button for Ticket -->
      <div v-if="tickets.length > 0">
        <button
          class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
          @click="isTicketModalVisible = true"
          v-if="receipt.status === 'confirmed'"
        >
          View Ticket
        </button>
      </div>
    </div>
  </div>
  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2">
    <label class="font-bold">Receipt UID:</label>
    <div class="mb-3 text-2xl truncate text-ellipsis">{{ receipt.uid }}</div>

    <label class="font-bold">Stores:</label>
    <div class="mb-3 text-2xl">{{ receipt.stores.join(", ") }}</div>

    <label class="font-bold">Amount Paid:</label>
    <div class="mb-3 text-2xl">₱{{ receipt.amount.toFixed(2) }}</div>

    <label class="font-bold">Status:</label>
    <div class="mb-3 text-lg">
      <div v-if="receipt.status === 'submitted'">
        Waiting for admin to confirm your payment
      </div>
      <div v-else-if="receipt.status === 'for resubmission'">
        For Resubmission
      </div>
      <div v-else>
        {{ receipt.status }}
      </div>
    </div>
    <div class="flex justify-center gap-8">
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="isImageModalVisible = true"
        v-if="imageUrl"
      >
        View Image
      </button>
      <router-link
        :to="{
          name: 'Edit Receipt',
          params: {
            payment_uid: receipt.payment_uid,
            receipt_uid: receipt.uid,
          },
        }"
        class="font-medium text-center bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        v-if="receipt.status !== 'confirmed'"
      >
        Edit Receipt
      </router-link>
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="onResubmit"
        v-if="receipt.status === 'for resubmission'"
      >
        Resubmit
      </button>
      <!-- Button for Ticket -->
      <div v-if="tickets.length > 0">
        <button
          class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
          @click="isTicketModalVisible = true"
          v-if="receipt.status === 'confirmed'"
        >
          View Ticket
        </button>
      </div>
    </div>
  </div>

  <ImageModal
    :imageUrl="imageUrl"
    :receipt_uid="receipt.uid"
    v-show="isImageModalVisible"
    @close="isImageModalVisible = false"
  />

  <TicketModal
    v-if="isTicketModalVisible"
    :ticket="tickets[0]"
    @close="isTicketModalVisible = false"
  />
</template>
