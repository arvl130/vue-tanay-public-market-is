<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import getUser from "../composables/getUser";
import getLetter from "../composables/manage-letters/getLetter";
import unixSecondsToWordDate from "../composables/utils/unixSecondsToWordDate";

const route = useRoute();
const letter_uid = route.params.id;

const letterInfo = ref(null);

const dateIssued = ref("loading...");

onMounted(async () => {
  letterInfo.value = await getLetter(letter_uid);
  const { firstName, lastName } = await getUser(letterInfo.value.tenant_uid);
  if (firstName) tenant.firstName = firstName;
  else tenant.lastName = "No data.";
  if (lastName) tenant.lastName = lastName;
  else tenant.lastName = "No data.";

  dateIssued.value = unixSecondsToWordDate(letterInfo.value.timestamp.seconds);
});

const tenant = reactive({
  firstName: "loading...",
  lastName: "loading...",
});

const grandTotalArrears = computed(() => {
  const penalty = letterInfo.value.penalty / 100;
  const penaltyToAdd = parseFloat(letterInfo.value.arrears) * penalty;
  return parseFloat(letterInfo.value.arrears) + penaltyToAdd;
});
</script>

<template>
  <div v-if="letterInfo">
    <!-- Letter -->
    <div class="mb-16 max-w-4xl mx-auto">
      <div class="max-w-3xl px-12 mx-auto">
        <!-- letterhead -->
        <div class="flex mb-4">
          <img
            src="../assets/img/logo.png"
            alt=""
            class="h-28 absolute ml-12 md:inline-block"
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
              {{ `#${letterInfo.stores.join(", #")}` }}
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
              {{ `#${letterInfo.stores.join(", #")}` }}
            </span>
            amounting to
            <span class="underline">
              {{ `₱${letterInfo.arrears}` }}
            </span>
            arrears (with
            <span class="underline">
              {{ `${letterInfo.penalty}%` }}
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
  <div v-else>No notice letter found.</div>
</template>
