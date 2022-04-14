<script setup>
import { onMounted, ref } from "vue";
import getAdmin from "../../composables/getAdmin";
import getTenant from "../../composables/getTenant";
import unixSecondsToWordDate from "../../composables/utils/unixSecondsToWordDate";
import SimpleDialogModal from "../modals/SimpleDialogModal.vue";

const props = defineProps({
  ticket: Object,
});

const tenantName = ref("loading...");
const adminName = ref("loading...");
const dateIssued = ref("loading ...");
const amountPaid = ref("loading ...");

const emit = defineEmits(["close"]);

onMounted(async () => {
  const tenant = await getTenant(props.ticket.tenant_uid);
  if (tenant.firstName && tenant.lastName) {
    tenantName.value = `${tenant.firstName} ${tenant.lastName}`;
  } else if (tenant.firstName) {
    tenantName.value = tenant.firstName;
  } else if (tenant.lastName) {
    tenantName.value = tenant.lastName;
  } else {
    adminName.value = "";
  }

  const admin = await getAdmin(props.ticket.admin_uid);
  if (admin.firstName && admin.lastName) {
    adminName.value = `${admin.firstName} ${admin.lastName}`;
  } else if (admin.firstName) {
    adminName.value = admin.firstName;
  } else if (admin.lastName) {
    adminName.value = admin.lastName;
  } else {
    adminName.value = "";
  }

  dateIssued.value = unixSecondsToWordDate(props.ticket.date_issued.seconds);
  amountPaid.value = `₱${props.ticket.amount}`;
});
</script>

<template>
  <SimpleDialogModal>
    <template #header>Confirmation Ticket</template>
    <template #body>
      <!-- UID -->
      <div><span class="font-bold">UID:</span> {{ ticket.uid }}</div>
      <!-- Tenant name (Payor) -->
      <div>
        <span class="font-bold">Payor: </span>
        <span v-if="tenantName">{{ tenantName }}</span>
        <span v-else class="italic">N/A</span>
      </div>
      <!-- Admin name (Collector) -->
      <div>
        <span class="font-bold">Collector: </span>
        <span v-if="adminName">{{ adminName }}</span>
        <span v-else class="italic">N/A</span>
      </div>
      <!-- Date issued -->
      <div><span class="font-bold">Date issued:</span> {{ dateIssued }}</div>
      <!-- Amount paid -->
      <div><span class="font-bold">Amount paid:</span> {{ amountPaid }}</div>
    </template>
    <template #controls>
      <button
        class="rounded bg-gray-200 hover:bg-gray-300 px-2 py-1"
        @click="emit('close')"
      >
        Close
      </button>
      <router-link
        :to="{ name: 'Print Ticket', params: { id: ticket.uid } }"
        class="rounded font-medium bg-gray-200 hover:bg-gray-300 px-2 py-1"
      >
        Print
      </router-link>
    </template>
  </SimpleDialogModal>
</template>
