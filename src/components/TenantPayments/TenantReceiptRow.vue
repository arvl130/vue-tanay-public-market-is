<script setup>
import ImageModal from "../modals/ImageModal.vue";
import { onMounted, ref } from "vue";
import getDownloadURLfromImagePath from "../../composables/tenants/getDownloadURLfromImagePath";
import listenForTicketsByReceiptUID from "../../composables/verify-payments/listenForTicketsByReceiptUID";
import TicketModal from "../VerifyPayments/TicketModal.vue";

const props = defineProps({
  receipt: Object,
});

const imageUrl = ref(null);
const isImageModalVisible = ref(false);

onMounted(async () => {
  const imagePath = props.receipt.image_path;
  imageUrl.value = await getDownloadURLfromImagePath(imagePath);
});

/* Monitor if we have tickets */
const tickets = listenForTicketsByReceiptUID(props.receipt.uid);
const isTicketModalVisible = ref(false);
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2 mt-2 items-center"
  >
    <div class="text-center truncate text-ellipsis">
      {{ receipt.uid }}
    </div>
    <div class="text-center">
      {{ receipt.amount }}
    </div>
    <div class="text-center">
      {{ receipt.stores.join(", ") }}
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

    <label class="font-bold">Amount</label>
    <div class="mb-3 text-2xl">₱{{ receipt.amount.toFixed(2) }}</div>

    <div class="flex justify-center gap-8">
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="isImageModalVisible = true"
        v-if="imageUrl"
      >
        View Image
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
