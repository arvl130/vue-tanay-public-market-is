<script setup>
import ImageModal from "../modals/ImageModal.vue";
import SimpleDialogModal from "../modals/SimpleDialogModal.vue";
import TicketModal from "./TicketModal.vue";
import { onMounted, ref } from "vue";
import getReceipt from "../../composables/getReceipt";
import getDownloadURLfromImagePath from "../../composables/tenants/getDownloadURLfromImagePath";
import setReceiptStatus from "../../composables/verify-payments/setReceiptStatus";
import generateTicketForReceipt from "../../composables/verify-payments/generateTicketForReceipt";
import listenForTicketsByReceiptUID from "../../composables/verify-payments/listenForTicketsByReceiptUID";

const props = defineProps({
  receipt: Object,
});

const downloadUrl = ref("#");

onMounted(async () => {
  const { image_path } = await getReceipt(props.receipt.uid);
  const download_url = await getDownloadURLfromImagePath(image_path);
  downloadUrl.value = download_url;
});

// action for Confirming
const onConfirm = async () => {
  isSetConfirmModalVisible.value = false;
  await setReceiptStatus(props.receipt.uid, "confirmed");
  await generateTicketForReceipt(props.receipt);
};

// action for Marking for resubmission
const onMarkResub = async () => {
  await setReceiptStatus(props.receipt.uid, "for resubmission");
  isSetResubModalVisible.value = false;
};

const imageUrl = ref(null);

onMounted(async () => {
  const imagePath = props.receipt.image_path;
  imageUrl.value = await getDownloadURLfromImagePath(imagePath);
});

/* Monitor if we have tickets */
const tickets = listenForTicketsByReceiptUID(props.receipt.uid);

const isImageModalVisible = ref(false);
const isSetConfirmModalVisible = ref(false);
const isSetResubModalVisible = ref(false);
const isTicketModalVisible = ref(false);
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2 mt-2 items-center"
  >
    <!-- Receipt UID -->
    <div class="text-center">{{ receipt.uid }}</div>
    <!-- Receipt Amount -->
    <div class="text-center">₱{{ receipt.amount.toFixed(2) }}</div>
    <!-- Image -->
    <div class="text-center">
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        @click="isImageModalVisible = true"
      >
        View Image
      </button>
      <!-- {{ receipt.image_url }} -->
    </div>
    <!-- Actions -->
    <div class="space-y-2 text-center" v-if="receipt.status === 'submitted'">
      <button
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        @click="isSetConfirmModalVisible = true"
      >
        Confirm Receipt
      </button>
      <button
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        @click="isSetResubModalVisible = true"
      >
        Mark for Resubmission
      </button>
    </div>
    <div class="flex justify-center" v-else-if="receipt.status === 'confirmed'">
      <!-- Button for Ticket -->
      <button
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        @click="isTicketModalVisible = true"
        v-if="tickets.length > 0"
      >
        View Ticket
      </button>
      <div v-else>No tickets found.</div>
    </div>
    <div
      class="flex justify-center text-center"
      v-else-if="receipt.status === 'for resubmission'"
    >
      <span
        class="border border-gray-400 text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-2xl select-none"
      >
        For Resubmission
      </span>
    </div>
    <div v-else>Unrecognized receipt status</div>
  </div>
  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2">
    <label class="font-bold">Receipt UID:</label>
    <div class="mb-3 text-2xl">{{ receipt.uid }}</div>

    <label class="font-bold mr-3">Image:</label>
    <button
      class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 mb-3"
      @click="isImageModalVisible = true"
    >
      View Image
    </button>

    <!-- Actions -->
    <div
      class="flex justify-center gap-8"
      v-if="receipt.status === 'submitted'"
    >
      <button
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        @click="isSetConfirmModalVisible = true"
      >
        Confirm Receipt
      </button>
      <button
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        @click="isSetResubModalVisible = true"
      >
        Mark for Resubmission
      </button>
    </div>
    <div v-else-if="receipt.status === 'confirmed'">
      <!-- Button for Ticket -->
      <button
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        @click="isTicketModalVisible = true"
        v-if="tickets.length > 0"
      >
        View Ticket
      </button>
      <div v-else>No tickets found.</div>
    </div>
    <div v-else-if="receipt.status === 'for resubmission'">
      For Resubmission
    </div>
    <div v-else>Unrecognized receipt status</div>
  </div>

  <!-- Modal to show image of receipt -->
  <ImageModal
    :imageUrl="imageUrl"
    :receipt_uid="receipt.uid"
    v-show="isImageModalVisible"
    @close="isImageModalVisible = false"
  />

  <!-- Modal for Confirm button -->
  <SimpleDialogModal v-if="isSetConfirmModalVisible">
    <template #header>Confirm Receipt</template>
    <template #body>
      Are you sure you want to confirm this receipt? This action cannot be
      undone.
    </template>
    <template #controls>
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
        @click="isSetConfirmModalVisible = false"
      >
        Cancel
      </button>
      <button
        type="button"
        class="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
        @click="onConfirm()"
      >
        Continue
      </button>
    </template>
  </SimpleDialogModal>

  <!-- Modal for Set For Resubmission button -->
  <SimpleDialogModal v-if="isSetResubModalVisible">
    <template #header>Mark For Resubmission Receipt</template>
    <template #body>
      Are you sure you want to mark this receipt For Resubmission? This action
      cannot be undone.
    </template>
    <template #controls>
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
        @click="isSetResubModalVisible = false"
      >
        Cancel
      </button>
      <button
        type="button"
        class="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
        @click="onMarkResub()"
      >
        Continue
      </button>
    </template>
  </SimpleDialogModal>

  <TicketModal
    v-if="isTicketModalVisible"
    :ticket="tickets[0]"
    @close="isTicketModalVisible = false"
  />
</template>
