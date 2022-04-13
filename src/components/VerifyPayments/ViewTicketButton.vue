<script setup>
import { onMounted, ref } from "vue";
import listenForTicketsByReceiptUID from "../../composables/verify-payments/listenForTicketsByReceiptUID";
import TicketModal from "./TicketModal.vue";

const props = defineProps({
  receipt_uid: String,
});

const tickets = listenForTicketsByReceiptUID(props.receipt_uid);

onMounted(() => {
  console.log(props.receipt_uid);
});

const isTicketModalVisible = ref(false);
</script>

<template>
  <div class="flex items-center" v-if="tickets.length > 0">
    <button
      class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
      @click="isTicketModalVisible = true"
    >
      View Ticket
    </button>
    <TicketModal
      v-if="isTicketModalVisible"
      :ticket="tickets[0]"
      @close="isTicketModalVisible = false"
    />
  </div>
  <div v-else>No tickets found.</div>
</template>
