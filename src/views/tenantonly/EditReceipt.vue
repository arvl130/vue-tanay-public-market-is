<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, reactive, ref, watch } from "vue";
import getReceipt from "../../composables/getReceipt";
import getTenant from "../../composables/getTenant";
import uploadReceiptImage from "../../composables/tenants/uploadReceiptImage";
import editSubmittedReceipt from "../../composables/tenants/editSubmittedReceipt";
import deleteRemoteFile from "../../composables/tenants/deleteRemoteFile";
import unixSecondsToCompleteDate from "../../composables/utils/unixSecondsToCompleteDate";
import getPayment from "../../composables/getPayment";
import deleteReceipt from "../../composables/tenants/deleteReceipt";
import SimpleDialogModal from "../../components/modals/SimpleDialogModal.vue";
import listenForReceiptsWithPaymentUID from "../../composables/verify-payments/listenForReceiptsWithPaymentUID";
import getStores from "../../composables/getStores";

const route = useRoute();
const payment_uid = route.params.payment_uid;
const receipt_uid = route.params.receipt_uid;

const tenant = reactive({
  firstName: "loading...",
  lastName: "",
  storesOwned: [],
});

const currReceipt = reactive({
  amount: 0,
  stores: [],
  description: "",
  image_path: null,
  payment_uid,
  tenant_uid: "",
  status: "submitted",
});

const originalImagePath = ref(null);
const dueDate = ref("");

onMounted(async () => {
  const {
    amount,
    stores,
    description,
    image_path,
    payment_uid,
    tenant_uid,
    status,
  } = await getReceipt(receipt_uid);
  currReceipt.amount = amount;
  currReceipt.stores = stores;
  currReceipt.description = description || "";
  currReceipt.image_path = image_path || null;
  originalImagePath.value = image_path || null;
  currReceipt.payment_uid = payment_uid;
  currReceipt.tenant_uid = tenant_uid;
  currReceipt.status = status;

  const payment = await getPayment(payment_uid);
  dueDate.value = unixSecondsToCompleteDate(payment.due_date.seconds);
  tenant.storesOwned = await getStores(payment.stores);

  const { firstName, lastName } = await getTenant(tenant_uid);
  tenant.firstName = firstName;
  tenant.lastName = lastName;
});

const receiptFile = ref();

const router = useRouter();
const onSubmit = async () => {
  if (!isUpdateButtonDisabled.value) {
    // If there is a selected file
    if (receiptFile.value.files && receiptFile.value.files.length > 0) {
      // delete remote file
      await deleteRemoteFile(originalImagePath.value);

      // upload new file
      const { fullPath } = await uploadReceiptImage(receiptFile.value.files[0]);
      currReceipt.image_path = fullPath;
    }

    // record to database
    editSubmittedReceipt(receipt_uid, { ...currReceipt });

    router.push({
      name: "Pending Payment Receipts",
      params: {
        id: payment_uid,
      },
    });
  }
};

const onDelete = async () => {
  // If there is an image uploaded
  if (currReceipt.image_path) {
    // delete it
    await deleteRemoteFile(currReceipt.image_path);
  }

  await deleteReceipt(receipt_uid);
  document.querySelector("body").classList = [];
  router.push({
    name: "Pending Payment Receipts",
    params: { id: payment_uid },
  });
};

const showDeleteModal = ref(false);

watch(showDeleteModal, (refNow) => {
  if (refNow === true) {
    document.querySelector("body").classList.add("overflow-y-hidden");
  } else {
    document.querySelector("body").classList = [];
  }
});

// Form input straints

// Max value for amount
const amountDue = ref(0);

const receipts = listenForReceiptsWithPaymentUID(payment_uid);

onMounted(async () => {
  const { amount } = await getPayment(payment_uid);
  amountDue.value = amount;
});

const totalPayment = computed(() => {
  return receipts.value.reduce((runningPayment, receipt) => {
    if (receipt.uid === receipt_uid) return runningPayment;
    else return runningPayment + receipt.amount;
  }, 0);
});

const maxAmountValue = computed(() => {
  return amountDue.value - totalPayment.value;
});

const filesAreCorrectSize = ref(true);
const onReceiptInputChanged = (e) => {
  if (e.target.files && e.target.files.length > 1) {
    filesAreCorrectSize.value = false;
  } else if (
    e.target.files &&
    e.target.files.length === 1 &&
    // Do not accept files equal or larger than 2 MiB
    e.target.files[0].size >= 2 * 1024 * 1024
  ) {
    filesAreCorrectSize.value = false;
  } else {
    filesAreCorrectSize.value = true;
  }
};

const isUpdateButtonDisabled = computed(() => {
  if (currReceipt.amount > maxAmountValue.value) return true;
  if (currReceipt.amount <= 0) return true;
  if (currReceipt.stores.length === 0) return true;
  if (!receiptFile.value) return true;
  if (!filesAreCorrectSize.value) return true;
  return false;
});
</script>

<template>
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
    <h2 class="font-extrabold text-4xl mb-3">Edit Submitted Receipt</h2>
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

  <main class="max-w-6xl mx-auto p-6">
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
        v-model="currReceipt.amount"
        @keydown.enter.prevent
      />
      <label class="font-bold text-lg">Stores:</label>
      <div class="mb-3">
        <select
          v-if="tenant.storesOwned.length > 0"
          class="px-3 py-2 border border-gray-400"
          v-model="currReceipt.stores"
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
        v-model="currReceipt.description"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="text-lg">
        <span class="font-bold">Receipt Photo: </span>
        <span class="text-sm italic mb-3">Maximum file size: 2MiB</span>
      </label>
      <input
        type="file"
        accept="image/*"
        class="text-sm mb-3"
        ref="receiptFile"
        @change="onReceiptInputChanged"
      />
      <div class="flex justify-between">
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          @click="showDeleteModal = true"
        >
          Delete Receipt
        </button>

        <button
          @click="onSubmit()"
          type="button"
          class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          :class="{
            'bg-slate-300': isUpdateButtonDisabled,
            'text-slate-500': isUpdateButtonDisabled,
            'pointer-events-none': isUpdateButtonDisabled,
          }"
        >
          Edit Receipt
        </button>
      </div>
    </form>
  </main>

  <!-- Confirm Delete modal -->
  <SimpleDialogModal v-show="showDeleteModal">
    <template #header>Confirm Delete Receipt</template>
    <template #body>
      The following action will delete this receipt entry. Continue?
    </template>
    <template #controls>
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
        @click="showDeleteModal = false"
      >
        Cancel
      </button>
      <button
        type="button"
        class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
        @click="onDelete()"
      >
        Yes, delete it.
      </button>
    </template>
  </SimpleDialogModal>
</template>
