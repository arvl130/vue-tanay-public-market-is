<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import getAdmin from "../composables/getAdmin";
import getReceipt from "../composables/getReceipt";
import getTenant from "../composables/getTenant";
import getTicket from "../composables/getTicket";
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
  <main class="max-w-md mx-auto" v-if="ticketShouldShow">
    <!-- Header -->
    <div class="flex justify-between px-6 mb-2 h-24 items-center">
      <img
        src="../assets/img/coat-of-arms.png"
        alt=""
        class="object-contain h-20 w-20"
      />
      <div class="grid content-center text-center">
        <div class="text-xl tracking-wide font-bold">OFFICIAL RECEIPT</div>
        <div>Republic of the Philippines</div>
        <div>Province of Rizal</div>
      </div>
      <img
        src="../assets/img/province-of-rizal.png"
        alt=""
        class="object-contain h-20 w-20"
      />
    </div>

    <!-- Body -->
    <div>
      <!-- Top -->
      <div class="grid grid-cols-2 mb-2">
        <!-- Date -->
        <div>
          <div class="text-xs tracking-wide uppercase">Date Issued:</div>
          <div>{{ dateIssued }}</div>
        </div>
        <!-- UID -->
        <div>
          <div class="text-xs tracking-wide uppercase">UID:</div>
          <div>{{ ticket_uid }}</div>
        </div>
      </div>
      <div class="grid grid-cols-2 mb-2">
        <!-- Date -->
        <div>
          <div class="text-xs tracking-wide uppercase">Payor:</div>
          <div>{{ `${tenant.firstName} ${tenant.lastName}` }}</div>
        </div>
        <!-- UID -->
        <div class="overflow-hidden">
          <div class="text-xs tracking-wide uppercase">Tenant ID:</div>
          <div class="text-sm">
            {{ ticket.tenant_uid }}
          </div>
        </div>
      </div>

      <!-- Body -->
      <div
        class="grid border-2 border-black"
        style="grid-template-columns: 5fr 3fr"
      >
        <div class="text-center font-bold border-b-2 border-black">Stores</div>
        <div
          class="text-center font-bold border-b-2 border-black border-l-2 border-black"
        >
          Amount
        </div>

        <!-- column for Stores -->
        <div>
          <div
            class="text-center"
            v-for="(store, index) in storesPaid"
            :key="store"
          >
            <div
              class="border-b-2 border-black pr-2"
              v-if="index !== storesPaid.length - 1"
            >
              Store #{{ store }}
            </div>
            <div class="pr-2" v-else>Store #{{ store }}</div>
          </div>
        </div>
        <!-- column for Amount -->
        <div class="border-l-2 border-black">
          <div v-for="(store, index) in storesPaid" :key="store">
            <div class="pl-2" v-if="index === storesPaid.length - 1">
              ₱{{ ticket.amount.toFixed(2) }}
            </div>
            <div class="border-b-2 border-black" v-else>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid border-x-2 border-b-2 border-black mb-4"
      style="grid-template-columns: 5fr 3fr"
    >
      <div class="mr-2 text-right">Total:</div>
      <div class="border-l-2 border-black pl-2">
        ₱{{ ticket.amount.toFixed(2) }}
      </div>
    </div>

    <!-- Bottom -->
    <div class="grid grid-cols-2 mb-2" style="grid-template-columns: 5fr 3fr">
      <!-- Signature -->
      <div>
        <div class="px-12">
          <br />
          <div class="border-b-2 border-black"></div>
        </div>
        <div class="text-xs text-center tracking-wide uppercase">Signature</div>
      </div>
      <!-- Collecting Officer -->
      <div class="text-center">
        <div>{{ `${admin.firstName} ${admin.lastName}` }}</div>
        <div class="text-xs tracking-wide uppercase">Collecting Officer</div>
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
