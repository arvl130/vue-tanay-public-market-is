<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import getAdmin from "../composables/getAdmin";
import getReceipt from "../composables/getReceipt";
import getTenant from "../composables/getTenant";
import getTicket from "../composables/getTicket";
import currencyToWords from "../composables/utils/currencyToWords";
import unixSecondsToWordDate from "../composables/utils/unixSecondsToWordDate";

const route = useRoute();
const ticket_uid = route.params.id;
const ticket = reactive({
  amount: 0,
  date_issued: null,
  receipt_uid: "",
  payment_uid: "",
  tenant_uid: "",
  admin_uid: "",
});

const dateIssued = ref("loading ...");

const tenant = reactive({
  firstName: "",
  lastName: "",
});

const admin = reactive({
  firstName: "",
  lastName: "",
});

const storesPaid = ref([]);
const amountInWords = ref("");

const ticketShouldShow = ref(false);

onMounted(async () => {
  const {
    amount,
    date_issued,
    receipt_uid,
    payment_uid,
    tenant_uid,
    admin_uid,
  } = await getTicket(ticket_uid);

  ticket.amount = amount;
  ticket.date_issued = date_issued;
  ticket.receipt_uid = receipt_uid;
  ticket.payment_uid = payment_uid;
  ticket.tenant_uid = tenant_uid;
  ticket.admin_uid = admin_uid;

  let currency = {
    country: "Philippine", // country Name
    majorSingle: "Peso", // Major Unit Single
    majorPlural: "Pesos", // Major Unit Plural
    minorSingle: "Centavo", // Minor Sub-Unit Single
    minorPlural: "Centavos", // Minor Sub-Unit Plural
    fraction: 2, // Decimal Places
  };

  if (amount) amountInWords.value = currencyToWords(amount, currency);

  if (ticket.date_issued) {
    dateIssued.value = unixSecondsToWordDate(ticket.date_issued.seconds);
  } else {
    dateIssued.value = "";
  }

  const { firstName: t_firstName, lastName: t_lastName } = await getTenant(
    tenant_uid
  );

  if (t_firstName) tenant.firstName = t_firstName;
  if (t_lastName) tenant.lastName = t_lastName;

  const { firstName: a_firstName, lastName: a_lastName } = await getAdmin(
    admin_uid
  );

  if (a_firstName) admin.firstName = a_firstName;
  if (a_lastName) admin.lastName = a_lastName;

  const { stores } = await getReceipt(receipt_uid);
  storesPaid.value = stores;

  ticketShouldShow.value = true;
  await nextTick();
  window.print();
});
</script>

<template>
  <!-- Receipt -->
  <main
    class="max-w-2xl mx-auto border-2 border-black mb-12"
    v-if="ticketShouldShow"
    style="font-family: Helvetica, sans-serif"
  >
    <!-- Header -->
    <div
      class="flex justify-between border-b-2 border-black px-12 items-center"
    >
      <img
        src="../assets/img/coat-of-arms.png"
        alt=""
        class="object-contain h-20 w-20"
      />
      <div class="grid content-center text-center text-xl leading-9">
        <div>OFFICIAL RECEIPT</div>
        <div>Republic of the Philippines</div>
        <div>Province of Rizal</div>
      </div>
      <img
        src="../assets/img/province-of-rizal.png"
        alt=""
        class="object-contain h-20 w-20"
      />
    </div>

    <!-- Layer 1 -->
    <div class="grid grid-cols-2 px-2 border-b-2 border-black">
      <div class="border-r-2 border-black">
        <p class="pt-2 pb-4">Accountable Form No. __</p>
        <p class="leading-4">Revived January 1992</p>
      </div>
      <div class="pt-1 font-bold text-xl text-center">ORIGINAL</div>
    </div>

    <div class="grid grid-cols-2 border-b-2 border-black">
      <div class="border-r-2 border-black px-2 pt-4 pb-1">
        DATE <span class="font-bold text-xl">{{ dateIssued }}</span>
      </div>
      <div class="pl-2 pt-3">
        <span class="font-bold text-xl">No. RZL </span>
        <span class="border-b-2 border-black"
          >&nbsp;&nbsp;{{ ticket_uid }}&nbsp;&nbsp;</span
        >
      </div>
    </div>

    <div
      class="grid grid-cols-[3fr_1fr] auto-rows-[7rem] border-b-2 border-black"
    >
      <div class="border-r-2 border-black pl-3 pt-1 text-xl">
        <div>PAYOR</div>
        <div class="text-4xl font-bold">
          {{ `${tenant.firstName} ${tenant.lastName}` }}
        </div>
      </div>
      <div class="pl-5 pt-1 text-xl">FUND</div>
    </div>

    <div
      class="grid grid-cols-[2fr_1fr_1fr] border-b-2 border-black text-center"
    >
      <div class="border-r-2 border-black pt-1 text-xl">
        Nature of Collection
      </div>
      <div class="border-r-2 border-black pt-1 text-md">ACCOUNT<br />CODE</div>
      <div class="pt-1 text-md">AMOUNT</div>
    </div>

    <div class="grid grid-cols-[2fr_1fr_1fr]">
      <!-- Nature of Collection column -->
      <div class="border-r-2 border-black">
        <div class="border-b-2 px-1 py-1 border-black text-right font-bold">
          Payment for Store #{{ storesPaid.join(", #") }}
        </div>
        <div
          class="border-b-2 px-1 py-1 border-black text-right"
          v-for="row in Array(5)"
          :key="row"
        >
          <br />
        </div>
      </div>
      <!-- Amount Code column -->
      <div class="border-r-2 border-black text-md">
        <div
          class="border-b-2 px-1 py-1 border-black text-right"
          v-for="row in Array(6)"
          :key="row"
        >
          <br />
        </div>
      </div>
      <!-- Amount column -->
      <div>
        <div class="border-b-2 border-black pl-5 pr-1 py-1 font-bold">
          ₱ {{ ticket.amount.toFixed(2) }}
        </div>
        <div
          class="border-b-2 pl-5 pr-1 py-1 border-black text-right"
          v-for="row in Array(4)"
          :key="row"
        >
          <br />
        </div>
        <div class="border-b-2 border-black pl-5 pr-1 py-1 font-bold">
          ₱ {{ ticket.amount.toFixed(2) }}
        </div>
      </div>
    </div>

    <div class="border-b-2 border-black">
      <p class="text pl-2 pt-2 pb-3">AMOUNT IN WORDS</p>
    </div>

    <div class="border-b-2 border-black">
      <p class="pl-2 pt-2 pb-2 font-bold text-xl">
        {{ amountInWords }}
      </p>
    </div>

    <div class="grid grid-cols-[2fr_1fr_1fr_1fr]">
      <div class="border-b-2 border-black">
        <ul class="list-disc pl-12 pt-1 leading-5">
          <li>CASH</li>
          <li>CHECK</li>
          <li>MONEY ORDER</li>
        </ul>
      </div>
      <div class="border-l-2 border-black text-center">
        <div class="border-b-2 border-black py-1">Drawer Bank</div>
        <div class="border-b-2 border-black py-1"><br /></div>
        <div class="border-b-2 border-black py-1"><br /></div>
      </div>
      <div class="border-l-2 border-black text-center">
        <div class="border-b-2 border-black py-1">Number</div>
        <div class="border-b-2 border-black py-1"><br /></div>
        <div class="border-b-2 border-black py-1"><br /></div>
      </div>
      <div class="border-l-2 border-black text-center">
        <div class="border-b-2 border-black py-1">Date</div>
        <div class="border-b-2 border-black py-1"><br /></div>
        <div class="border-b-2 border-black py-1"><br /></div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="grid grid-cols-2 mb-2" style="grid-template-columns: 5fr 3fr">
      <!-- Collecting Officer -->
      <div class="pl-3 pt-1">Received the amount stated above</div>
      <!-- Signature -->
      <div>
        <div class="px-3 text-center pt-12 font-bold">
          {{ `${admin.firstName} ${admin.lastName}` }}
          <br />
          <div class="border-b-2 border-black"></div>
        </div>
        <div class="text-sm text-center tracking-wide">Collecting Officer</div>
      </div>
    </div>
  </main>
  <div
    v-else
    class="flex justify-center items-center min-h-screen text-4xl text-neutral-800 font-bold"
  >
    Please wait...
  </div>
</template>
