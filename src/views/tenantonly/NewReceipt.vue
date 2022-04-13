<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import { getAuth } from "firebase/auth";
import getTenant from "../../composables/getTenant";
import getPayment from "../../composables/getPayment";
import unixSecondsToCompleteDate from "../../composables/utils/unixSecondsToCompleteDate";
import uploadReceiptImage from "../../composables/tenants/uploadReceiptImage";
import submitNewReceipt from "../../composables/tenants/submitNewReceipt";
import listenForReceiptsWithPaymentUID from "../../composables/verify-payments/listenForReceiptsWithPaymentUID";
import getStores from "../../composables/getStores";

const route = useRoute();
const payment_uid = route.params.id;

const tenant = reactive({
  firstName: "loading...",
  lastName: "",
  storesOwned: [],
});

const dueDate = ref("");

const newReceipt = reactive({
  amount: 0,
  stores: [],
  description: "",
  image_path: null,
  payment_uid,
  tenant_uid: "",
  status: "submitted",
});

onMounted(async () => {
  const auth = getAuth();
  const tenant_uid = auth.currentUser.uid;

  const { due_date, stores } = await getPayment(payment_uid);
  dueDate.value = unixSecondsToCompleteDate(due_date.seconds);
  newReceipt.tenant_uid = tenant_uid;
  tenant.storesOwned = await getStores(stores);

  const { firstName, lastName } = await getTenant(tenant_uid);
  tenant.firstName = firstName;
  tenant.lastName = lastName;
});

const router = useRouter();
const receiptFile = ref();
const onSubmit = async () => {
  if (!isSubmitButtonDisabled.value) {
    const { fullPath } = await uploadReceiptImage(receiptFile.value.files[0]);
    newReceipt.image_path = fullPath;
    submitNewReceipt({ ...newReceipt });
    router.push({
      name: "Pending Payment Receipts",
      params: {
        id: payment_uid,
      },
    });
  }
};

// Max value for amount
const amountDue = ref(1);

const receipts = listenForReceiptsWithPaymentUID(payment_uid);

onMounted(async () => {
  const { amount } = await getPayment(payment_uid);
  amountDue.value = amount;
});

const totalPayment = computed(() => {
  return receipts.value.reduce((runningPayment, receipt) => {
    return runningPayment + receipt.amount;
  }, 0);
});

const maxAmountValue = computed(() => {
  return amountDue.value - totalPayment.value;
});

const filesAreChosen = ref(false);
const checkForChangedFiles = (e) => {
  if (e.target.files && e.target.files.length > 0) {
    filesAreChosen.value = true;
  } else {
    filesAreChosen.value = false;
  }
};

const isSubmitButtonDisabled = computed(() => {
  if (newReceipt.amount > maxAmountValue.value) return true;
  if (newReceipt.amount <= 0) return true;
  if (newReceipt.stores.length === 0) return true;
  if (!receiptFile.value) return true;
  if (!filesAreChosen.value) return true;
  return false;
});
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Tenant Profile Page</p>
  </div> -->

  <NavBar>
    <template #primary>
      <router-link
        :to="{ name: 'Home' }"
        class="hidden sm:inline font-bold text-2xl uppercase text-gray-800 hover:underline"
      >
        Tanay Public Market
      </router-link>
    </template>
    <template #secondary>
      <TenantSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Submit New Receipt</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link
        :to="{ name: 'Pending Payment Receipts', params: { id: payment_uid } }"
        class="flex gap-2"
      >
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto px-6 pt-6">
    <form class="grid">
      <div>
        <label class="font-bold text-lg">Store Holder:</label>
        <span class="text-lg ml-1">
          {{ `${tenant.firstName} ${tenant.lastName}` }}
        </span>
      </div>
      <div>
        <label class="font-bold text-lg">Due Date:</label>
        <span class="text-lg ml-1"> {{ dueDate }} </span>
      </div>
      <label class="font-bold text-lg">Amount:</label>
      <input
        type="number"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        min="0"
        :max="maxAmountValue"
        v-model="newReceipt.amount"
        @keydown.enter.prevent
      />
      <label class="font-bold text-lg">Stores:</label>
      <div class="mb-3">
        <select
          v-if="tenant.storesOwned.length > 0"
          class="px-3 py-2 border border-gray-400"
          v-model="newReceipt.stores"
          multiple
          :size="tenant.storesOwned.length"
        >
          <option
            v-for="store in tenant.storesOwned"
            :key="store.id"
            :value="store.id"
          >
            {{ store.id }} - {{ store.section }}
          </option>
        </select>
        <span v-else class="italic">No stores available</span>
      </div>
      <label class="font-bold text-lg">Description:</label>
      <textarea
        v-model="newReceipt.description"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">Receipt Photo:</label>
      <input
        type="file"
        accept="image/*"
        class="text-sm"
        ref="receiptFile"
        @change="checkForChangedFiles"
      />
      <div class="text-right mb-6">
        <button
          type="button"
          class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          :class="{
            'bg-slate-300': isSubmitButtonDisabled,
            'text-slate-500': isSubmitButtonDisabled,
            'pointer-events-none': isSubmitButtonDisabled,
          }"
          @click="onSubmit()"
        >
          Submit Receipt
        </button>
      </div>
    </form>
  </main>
</template>
