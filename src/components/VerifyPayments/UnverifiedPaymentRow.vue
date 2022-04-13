<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import getReceiptsForPaymentUID from "../../composables/getReceiptsForPaymentUID";
import getTenant from "../../composables/getTenant";
import unixSecondsToCompleteDate from "../../composables/utils/unixSecondsToCompleteDate";

const props = defineProps({
  payment: Object,
});

const unverifiedPayment = reactive({
  uid: props.payment.uid,
  formattedDate: "",
  tenantName: "",
  stores: props.payment.stores,
});

const receipts = ref([]);

onMounted(async () => {
  unverifiedPayment.formattedDate = unixSecondsToCompleteDate(
    props.payment.due_date.seconds
  );

  const { firstName, lastName } = await getTenant(props.payment.tenant_uid);
  unverifiedPayment.tenantName = `${lastName}, ${firstName}`;

  receipts.value = await getReceiptsForPaymentUID(props.payment.uid);
});

const showComponent = computed(() => {
  if (receipts.value.length > 0) return true;
  else return false;
});
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2 mt-2 items-center text-center"
    v-if="showComponent"
  >
    <div class="truncate">{{ unverifiedPayment.uid }}</div>

    <div>
      {{ unverifiedPayment.formattedDate }}
    </div>

    <div>{{ unverifiedPayment.tenantName }}</div>

    <div v-if="unverifiedPayment.stores.length > 0">
      {{ unverifiedPayment.stores.join(", ") }}
    </div>
    <div class="italic" v-else>no data</div>

    <div>
      <router-link
        :to="{
          name: 'Verify Payment Receipts',
          params: { id: unverifiedPayment.uid },
        }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
      >
        View Receipts
      </router-link>
    </div>
  </div>

  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2" v-if="showComponent">
    <label class="font-bold">Payment UID:</label>
    <div class="mb-3 text-2xl">{{ unverifiedPayment.uid }}</div>

    <label class="font-bold">Due date:</label>
    <div class="mb-3 text-2xl">{{ unverifiedPayment.formattedDate }}</div>

    <label class="font-bold">Tenant name:</label>
    <div class="mb-3 text-2xl">
      {{ unverifiedPayment.tenantName }}
    </div>

    <label class="font-bold">Stores:</label>
    <div class="mb-3 text-2xl" v-if="unverifiedPayment.stores.length > 0">
      {{ unverifiedPayment.stores.join(", ") }}
    </div>
    <div class="mb-3 italic text-2xl" v-else>no data</div>

    <div class="flex justify-center gap-8">
      <router-link
        :to="{
          name: 'Verify Payment Receipts',
          params: { id: unverifiedPayment.uid },
        }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
      >
        View Receipts
      </router-link>
    </div>
  </div>
</template>
