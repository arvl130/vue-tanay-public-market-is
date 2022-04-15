<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import getUser from "../../composables/getUser";
import getLetter from "../../composables/manage-letters/getLetter";
import unixSecondsToWordDate from "../../composables/utils/unixSecondsToWordDate";

const props = defineProps({
  letter_uid: String,
});

const letter = reactive({
  arrears: 0,
  penalty: 0,
  stores: [],
  timestamp: null,
  tenant_uid: "",
  admin_uid: "",
});

const tenant = reactive({
  firstName: "loading...",
  lastName: "loading...",
});

const dateIssued = ref("loading...");

onMounted(async () => {
  const { arrears, penalty, stores, timestamp, tenant_uid, admin_uid } =
    await getLetter(props.letter_uid);
  letter.arrears = arrears;
  letter.penalty = penalty;
  letter.stores = stores;
  letter.timestamp = timestamp;
  letter.tenant_uid = tenant_uid;
  letter.admin_uid = admin_uid;

  const { firstName, lastName } = await getUser(letter.tenant_uid);
  if (firstName) tenant.firstName = firstName;
  else tenant.lastName = "No data.";
  if (lastName) tenant.lastName = lastName;
  else tenant.lastName = "No data.";

  dateIssued.value = unixSecondsToWordDate(letter.timestamp.seconds);
});

const grandTotalArrears = computed(() => {
  const penalty = letter.penalty / 100;
  const penaltyToAdd = parseFloat(letter.arrears) * penalty;
  return parseFloat(letter.arrears) + penaltyToAdd;
});
</script>

<template>
  <div class="max-w-6xl mx-auto sm:px-6 sm:pt-6">
    <!-- Letter -->
    <div class="mb-6 sm:mb-16 max-w-4xl mx-auto shadow-2xl">
      <div class="max-w-3xl py-10 sm:py-20 px-6 sm:px-12 mx-auto">
        <!-- letterhead -->
        <div class="flex mb-4">
          <img
            src="../../assets/img/logo.webp"
            alt=""
            class="h-28 absolute ml-16 hidden md:inline-block"
          />
          <div class="h-28 grid content-center mx-auto text-center">
            <div>REPUBLIC OF THE PHILIPPINES</div>
            <div>PROVINCE OF RIZAL</div>
            <div>MUNICIPALITY OF TANAY</div>
          </div>
          <div></div>
        </div>
        <!-- Office name -->
        <div class="flex justify-center font-bold mb-4">
          OFFICE OF THE PUBLIC MARKET
        </div>
        <!-- Date Address -->
        <div class="mb-8">
          <div class="mb-8">{{ dateIssued }}</div>
          <div>
            <span class="underline">
              Mr./Ms.
              {{ `${tenant.firstName} ${tenant.lastName}` }}
            </span>
          </div>
          <div>
            Commercial Stall
            <span class="underline">
              {{ `#${letter.stores.join(", #")}` }}
            </span>
          </div>
          <div>Tanay Public Market</div>
          <div>Tanay, Rizal</div>
        </div>
        <!-- Body -->
        <div>
          <p class="mb-8">
            Dear, Mr./Ms.
            <span class="underline">
              {{ tenant.lastName }}
            </span>
          </p>
          <p class="text-justify mb-8">
            Attached herewith the statement of account of Tanay Public Market
            Commercial Stall
            <span class="underline">
              {{ `#${letter.stores.join(", #")}` }}
            </span>
            amounting to
            <span class="underline">
              {{ `₱${letter.arrears}` }}
            </span>
            arrears (with
            <span class="underline">
              {{ `${letter.penalty}%` }}
            </span>
            penalty) with the grand total amount of
            <span class="underline">
              {{ `₱${grandTotalArrears}` }}
            </span>
            at Tanay Public Market is now due.
          </p>
          <p class="text-justify mb-8">
            This is also with connection to TAX ORDINANCE NO. 3 SERIES OF 1998
            Article VII- DELIQUENCY IN PAYMENT OF MONTHLY RENTAL A. In case of
            default in payment of monthly rental by the SECOND PARTY for three
            (3) consecutive months, the FIRST PARTY shall have the right to
            close down the stall and business, upon prior notice to, of the
            SECOND PARTY. The stall maybe allowed to commercially operate again
            only after payment of all ones by the SECOND PARTY.
          </p>
          <p class="text-justify mb-8">
            We respectfully request you to settle the amount immediately to
            avoid further concerns in your rental fee.
          </p>
          <p class="mb-8">Very truly yours,</p>
          <p>JEFFREY M. PINO, DPA EnP</p>
          <p>LEIPO/Market in charged</p>
        </div>
      </div>
    </div>
  </div>
</template>
